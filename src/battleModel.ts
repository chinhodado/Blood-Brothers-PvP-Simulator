/// <reference path="affliction.ts"/>
/// <reference path="battleGraphic.ts"/>
/// <reference path="battleLogger.ts"/>
/// <reference path="brigGenerator.ts"/>
/// <reference path="card.ts"/>
/// <reference path="cardManager.ts"/>
/// <reference path="enums.ts"/>
/// <reference path="famDatabase.ts"/>
/// <reference path="formation.ts"/>
/// <reference path="player.ts"/>
/// <reference path="skill.ts"/>
/// <reference path="skillCalcType.ts"/>
/// <reference path="skillDatabase.ts"/>
/// <reference path="skillFunc.ts"/>
/// <reference path="skillRange.ts"/>
/// <reference path="util.ts"/>

class BattleModel {

    // set to true when doing a mass simulation and you don't care about the graphics or logging stuffs
    static IS_MASS_SIMULATION = false;
    static MAX_TURN_NUM = 5;
    p1RandomMode: ENUM.RandomBrigType;
    p2RandomMode: ENUM.RandomBrigType;
    isBloodClash: boolean = false;
    procOrderType: ENUM.ProcOrderType = ENUM.ProcOrderType.ANDROID;

    logger: BattleLogger;
    cardManager: CardManager;
    
    player1: Player;
    player2: Player;

    isFinished = false;
    playerWon: Player = null;
    
    // The two players' main cards. The order of the cards in these two arrays should never be changed.
    // When a reserve comes out, replace the main card in here with the reserve
    p1_mainCards: Card[] = [];
    p2_mainCards: Card[] = [];

    // The two player's reserve cards. When a reserve comes out, move it to the main cards (i.e. delete it here)
    p1_reserveCards: Card[] = [];
    p2_reserveCards: Card[] = [];

    // The original main cards. Should be created once and never modified
    p1_originalMainCards: Card[] = [];
    p2_originalMainCards: Card[] = [];

    // The original reserve cards. Should be created once and never modified
    p1_originalReserveCards: Card[] = [];
    p2_originalReserveCards: Card[] = [];
    
    // contains all cards in play. Should be re-created and re-sorted every turn, and updated when either player's main cards changed.
    allCurrentMainCards: Card[] = [];

    // Contains all cards in play (both main and reserve of both players). Used for quickly get a card by its id
    allCardsById: any = {};

    // store recently dead cards with ondeath skills waiting to proc
    onDeathCards: Card[] = [];

    // turn order info
    turnOrderBase: ENUM.BattleTurnOrderType = ENUM.BattleTurnOrderType.AGI;
    turnOrderChangeEffectiveTurns: number = 0;
    turnOrderChanged: boolean = false;
    
    // Turn-dependent. Remember to update these when it's a new card's turn. Maybe move to a separate structure?
    currentPlayer: Player;
    oppositePlayer: Player;

    // just a copy of p1_mainCards, p2_mainCards, p1_reserveCards, p2_reserveCards, turn-dependent
    currentPlayerMainCards: Card[];
    currentPlayerReserveCards: Card[];
    oppositePlayerMainCards: Card[];
    oppositePlayerReserveCards: Card[];
    
    private static _instance: BattleModel = null;

    public static getInstance(): BattleModel {
        if (BattleModel._instance === null) {
            throw new Error("Error: you should not make this object this way");
        }
        return BattleModel._instance;
    }

    constructor(data: GameData, option: GameOption = {}, tierListString?) {
    
        if (BattleModel._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        BattleModel._instance = this;
        this.logger = BattleLogger.getInstance();
        this.cardManager = CardManager.getInstance();
        var graphic = new BattleGraphic();

        this.procOrderType = option.procOrder;
        if (option.battleType && option.battleType == ENUM.BattleType.BLOOD_CLASH) {
            this.isBloodClash = true;
        }
        
        var p1_formation: any;
        var p2_formation: any;
        var p1_cardIds: number[] = [];
        var p2_cardIds: number[] = [];
        var p1_warlordSkillIds: number[] = [];
        var p2_warlordSkillIds: number[] = [];

        var availableSkills: number[] = Skill.getAvailableSkillsForSelect();
        
        if (!tierListString) {
            var tierListString = sessionStorage["tierList"];
        }

        if (option.p1RandomMode) {
            this.p1RandomMode = option.p1RandomMode;
            p1_formation = pickRandomProperty(Formation.FORMATION_CONFIG);
            p1_cardIds = BrigGenerator.getBrig(option.p1RandomMode, tierListString, this.isBloodClash);

            for (var i = 0; i < 3; i++) {
                p1_warlordSkillIds.push(+getRandomElement(availableSkills));
            }
        }
        else {
            p1_formation = data.p1_formation;
            p1_cardIds = data.p1_cardIds;
            p1_warlordSkillIds = data.p1_warlordSkillIds;
        }

        if (option.p2RandomMode) {
            this.p2RandomMode = option.p2RandomMode;
            p2_formation = pickRandomProperty(Formation.FORMATION_CONFIG);
            p2_cardIds = BrigGenerator.getBrig(option.p2RandomMode, tierListString, this.isBloodClash);

            for (var i = 0; i < 3; i++) {
                p2_warlordSkillIds.push(+getRandomElement(availableSkills));
            }
        }
        else {
            p2_formation = data.p2_formation;
            p2_cardIds = data.p2_cardIds;
            p2_warlordSkillIds = data.p2_warlordSkillIds;
        }
        
        this.player1 = new Player(1, "Player 1", new Formation(p1_formation), 1); // me
        this.player2 = new Player(2, "Player 2", new Formation(p2_formation), 1); // opp
        
        // create the cards        
        for (var i = 0; i < 10; i++) {

            if (i >= 5 && !this.isBloodClash) break;
            var p1_cardInfo = famDatabase[p1_cardIds[i]];
            var p2_cardInfo = famDatabase[p2_cardIds[i]];

            // make the skill array for the current fam
            var p1fSkillIdArray: number[] = p1_cardInfo.skills;
            if (p1_cardInfo.isWarlord) {
                p1fSkillIdArray = p1_warlordSkillIds;
            }

            var p2fSkillIdArray: number[] = p2_cardInfo.skills;
            if (p2_cardInfo.isWarlord) {
                p2fSkillIdArray = p2_warlordSkillIds;
            }

            var player1Skills = this.makeSkillArray(p1fSkillIdArray);
            var player2Skills = this.makeSkillArray(p2fSkillIdArray);
            
            // now make the cards and add them to the appropriate collections
            var card1 = new Card(p1_cardIds[i], this.player1, i, player1Skills);
            var card2 = new Card(p2_cardIds[i], this.player2, i, player2Skills);

            if (i < 5) {
                this.p1_mainCards[i] = card1;
                this.p2_mainCards[i] = card2;

                this.p1_originalMainCards[i] = card1;
                this.p2_originalMainCards[i] = card2;

                this.allCurrentMainCards.push(card1);
                this.allCurrentMainCards.push(card2);
            }
            else if (i >= 5 && this.isBloodClash) {
                this.p1_reserveCards[i % 5] = card1;
                this.p2_reserveCards[i % 5] = card2;

                this.p1_originalReserveCards[i % 5] = card1;
                this.p2_originalReserveCards[i % 5] = card2;
            }

            this.allCardsById[card1.id] = card1;
            this.allCardsById[card2.id] = card2;
        }

        this.cardManager.sortAllCurrentMainCards();
        
        graphic.displayFormationAndFamOnCanvas();

        if (!BattleLogger.IS_DEBUG_MODE) {
            this.logger.displayInfoText();
            this.logger.displayWarningText();
        }
    }

    /**
     * Resets everything
     * Used for testing only
     */
    static resetAll() {
        BattleModel.removeInstance();
        BattleLogger.removeInstance();
        BattleGraphic.removeInstance();
        CardManager.removeInstance();
    }

    /**
     * Allows to create a new instance
     * Used for testing only
     */
    static removeInstance() {
        BattleModel._instance = null;
    }
    
    /**
     * Given an array of skill ids, return an array of Skills
     */
    makeSkillArray (skills: number[]) {
        var skillArray : Skill[] = [];
        
        for (var i = 0; i < 3; i++) {
            if (skills[i]) {
                skillArray.push(new Skill(skills[i]));
            }
        }
        
        return skillArray;
    }
        
    getPlayerById(id: number) {
        if (id === 1) {
            return this.player1;
        }
        else if (id === 2) {
            return this.player2;
        }
        else {
            throw new Error("Invalid player");
        }
    }
    
    getOppositePlayer (player: Player) {
        if (player === this.player1) {
            return this.player2;
        }
        else if (player === this.player2) {
            return this.player1;
        }
        else {
            throw new Error("Invalid player");
        }
    }

    /**
     * Use this for damage because of attacks
     */
    processDamagePhase(data: {attacker: Card; target: Card; skill: Skill; additionalDescription?: string; scaledRatio?: number;}) {
        var target = data.target;
        var damage = this.getWouldBeDamage(data.attacker, target, data.skill, {scaledRatio: data.scaledRatio});
        
        var isMissed = data.attacker.willMiss();
        if (isMissed) {
            damage = 0;
            data.attacker.justMissed = true;
        }
        else {
            data.attacker.justMissed = false;
        }

        var evaded = target.justEvaded;
        if (evaded) {
            damage = 0;
        }

        if (!isMissed && !evaded && data.skill.skillFunc == ENUM.SkillFunc.KILL) {
            if (Math.random() <= data.skill.skillFuncArg2) { // probability check
                var isKilled = true;
            }
        }
        if (isKilled) {
            damage = target.getHP() + target.status.hpShield;
        }
        
        // HP shield skill
        var hpShield = ~~target.status.hpShield;
        if (hpShield > 0 && !isMissed && !evaded && !isKilled) {
            if (damage >= hpShield) {
                target.status.hpShield = 0;
                damage -= hpShield;
            } else {
                target.status.hpShield = hpShield - damage;
                damage = 0;
            }
        }
        
        // survive
        var surviveSkill = target.getSurviveSkill();
        var defenseData: SkillLogicData = {
            executor: target,
            skill: surviveSkill,
            attacker: data.attacker,
            wouldBeDamage: damage
        };
        
        if (surviveSkill && surviveSkill.willBeExecuted(defenseData) && !isKilled && !isMissed && !evaded) {
            surviveSkill.execute(defenseData);
            damage = target.getHP() - 1;
        }     
    
        target.changeHP(-1 * damage);
        target.lastBattleDamageTaken = damage;
        data.attacker.lastBattleDamageDealt = damage;

        if (!data.additionalDescription) {
            data.additionalDescription = "";
        }

        // this probably should not be here, but wtv...
        if (target.hasWardOfType(data.skill.ward)) {
            var wardUsed = data.skill.ward;
        }

        if (isMissed) {
            var desc = data.attacker.name + " missed the attack on " + target.name;
        }
        else if (evaded) {
            desc = target.name + " evaded the attack!";
        }
        else if (isKilled) {
            desc = target.name + " is killed outright!";
        }
        else {
            desc = data.additionalDescription + target.name + " lost " + damage + "hp (remaining " + 
                target.getHP() + "/" + target.originalStats.hp + ")";
        }

        this.logger.addMinorEvent({
            executorId: data.attacker.id, 
            targetId: target.id, 
            type: ENUM.MinorEventType.HP, 
            amount: (-1) * damage, 
            description: desc, 
            skillId: data.skill.id,
            wardUsed: wardUsed,
            missed: isMissed,
            evaded: evaded,
            isKilled: isKilled
        });

        if (target.isDead) {
            this.logger.displayMinorEvent(target.name + " is dead");
            this.addOnDeathCard(target);
        }
    }

    getWouldBeDamage(attacker: Card, target: Card, skill: Skill, opt?: {scaledRatio?: number}): number {
        var skillMod = skill.skillFuncArg1;
        var ignorePosition = Skill.isPositionIndependentAttackSkill(skill.id);
    
        var baseDamage: number;
            
        switch (skill.skillCalcType) {
            case (ENUM.SkillCalcType.DEFAULT):
            case (ENUM.SkillCalcType.WIS):
                baseDamage = getDamageCalculatedByWIS(attacker, target);
                break;
            case (ENUM.SkillCalcType.ATK):
                baseDamage = getDamageCalculatedByATK(attacker, target, ignorePosition);
                break;
            case (ENUM.SkillCalcType.AGI):
                baseDamage = getDamageCalculatedByAGI(attacker, target, ignorePosition);
                break;
        }
            
        // apply the multiplier
        var damage = skillMod * baseDamage;

        if (opt && opt.scaledRatio) {
            damage *= opt.scaledRatio;
        }
            
        // apply the target's ward
        switch (skill.ward) {
            case ENUM.WardType.PHYSICAL:
                damage = Math.round(damage * (1 - target.status.attackResistance));
                break;
            case ENUM.WardType.MAGICAL:
                damage = Math.round(damage * (1 - target.status.magicResistance));
                break;
            case ENUM.WardType.BREATH:
                damage = Math.round(damage * (1 - target.status.breathResistance));
                break;
            default :
                throw new Error ("Wrong type of ward. Maybe you forgot to include in the skill?");
        }

        return damage;
    }

    // todo: move this to Card?
    // use this when there's no executorId for the MinorEvent, like for poison. Also use it for non-attacks like healing, etc.
    damageToTargetDirectly(target: Card, damage: number, reason: string) {
        target.changeHP(-1 * damage);

        var descVerb = " lost ";
        if (damage < 0) {
            descVerb = " gained ";
        }

        var description = target.name + descVerb + Math.abs(damage) + " HP because of " + reason;
        
        this.logger.addMinorEvent({
            targetId: target.id, 
            type: ENUM.MinorEventType.HP, 
            amount: (-1) * damage, 
            description: description, 
        });
        
        if (target.isDead) {
            this.logger.displayMinorEvent(target.name + " is dead");
            this.addOnDeathCard(target);
        }
    }

    processAffliction(executor: Card, target: Card, skill: Skill) {
        var type: ENUM.AfflictionType = skill.skillFuncArg2;
        var prob: number = skill.skillFuncArg3;

        if (!type) {
            return;
        }

        var option: AfflectOptParam = {};

        if (skill.skillFuncArg4) {
            if (type == ENUM.AfflictionType.POISON) {
                // envenom percent
                option.percent = skill.skillFuncArg4;
            }
            else {
                // turn num for silent & blind
                option.turnNum = skill.skillFuncArg4;
            }
        }

        if (skill.skillFuncArg5) {
            option.missProb = skill.skillFuncArg5;
        }
            
        if (Math.random() <= prob){
            target.setAffliction(type, option);
            var description = target.name + " is now " + ENUM.AfflictionType[type];
            var maxTurn = 1;

            if (type == ENUM.AfflictionType.POISON) {
                // needed since poison is stacked
                var percent = target.getPoisonPercent();
            }
            
            this.logger.addMinorEvent({
                executorId: executor.id, 
                targetId: target.id, 
                type: ENUM.MinorEventType.AFFLICTION, 
                affliction: {
                    type: type,
                    duration: option.turnNum,
                    percent: percent,
                    missProb: option.missProb
                },
                description: description,                 
            });
        }
    }
   
    processDebuff(executor: Card, target: Card, skill: Skill) {
        var status: ENUM.StatusType, multi: number;
        var isNewLogic: boolean = false; // for caster-based debuff

        if (skill.skillFunc === ENUM.SkillFunc.DEBUFFATTACK || skill.skillFunc === ENUM.SkillFunc.DEBUFFINDIRECT) {
            status = skill.skillFuncArg2;
            multi  = skill.skillFuncArg4;
        }
        else if (skill.skillFunc === ENUM.SkillFunc.DEBUFF) {
            status = skill.skillFuncArg2;
            multi  = skill.skillFuncArg1;
        }
        else if (skill.skillFunc === ENUM.SkillFunc.CASTER_BASED_DEBUFF) {
            // todo: arg3 may also be status
            status = skill.skillFuncArg2;
            multi = skill.skillFuncArg1;
            isNewLogic = true;
        }
        else if (skill.skillFunc === ENUM.SkillFunc.CASTER_BASED_DEBUFF_ATTACK || skill.skillFunc === ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC) {
            status = skill.skillFuncArg2;
            multi = skill.skillFuncArg4;
            isNewLogic = true;
        }
        else if (skill.skillFunc === ENUM.SkillFunc.ONHIT_DEBUFF) {
            // todo: arg3 may also be status
            status = skill.skillFuncArg2;
            multi = skill.skillFuncArg1;
            isNewLogic = true;

            if (skill.skillFuncArg4) {
                multi = skill.skillFuncArg4;
                var isFlat = true;
            }
        }
        else {
            throw new Error("Wrong skill to use with processDebuff()");
        }

        if (isFlat) {
            var baseAmount = -100;
        }
        else if (!isNewLogic) {
            baseAmount = getDebuffAmount(executor, target);
        }
        else {
            baseAmount = getCasterBasedDebuffAmount(executor);
        }

        var amount = Math.floor(baseAmount * multi);

        target.changeStatus(status, amount, isNewLogic);
        var description = target.name + "'s " + ENUM.StatusType[status] + " decreased by " + Math.abs(amount);

        this.logger.addMinorEvent({
            executorId: executor.id, 
            targetId: target.id, 
            type: ENUM.MinorEventType.STATUS, 
            status: {
                type: status,
                isNewLogic: isNewLogic
            },
            description: description, 
            amount: amount,
            skillId: skill.id
        });
    }

    startBattle () {
        this.logger.startBattleLog();
        
        this.performOpeningSkills();
        
        while (!this.isFinished) {

            this.logger.currentTurn++;
            this.logger.bblogTurn("Turn " + this.logger.currentTurn);

            // process turn order change
            if (this.turnOrderChangeEffectiveTurns == 0) {
                this.turnOrderBase = ENUM.BattleTurnOrderType.AGI;
            }
            else {
                this.turnOrderChangeEffectiveTurns--;
            }

            this.cardManager.updateAllCurrentMainCards();
            this.cardManager.sortAllCurrentMainCards();

            // assuming both have 5 cards
            for (var i = 0; i < 10 && !this.isFinished; i++) {
                var currentCard = this.allCurrentMainCards[i];

                this.currentPlayer = currentCard.player;
                this.currentPlayerMainCards = this.cardManager.getPlayerCurrentMainCards(this.currentPlayer);
                this.currentPlayerReserveCards = this.cardManager.getPlayerCurrentReserveCards(this.currentPlayer);

                this.oppositePlayer = this.getOppositePlayer(this.currentPlayer);
                this.oppositePlayerMainCards = this.cardManager.getPlayerCurrentMainCards(this.oppositePlayer);
                this.oppositePlayerReserveCards = this.cardManager.getPlayerCurrentReserveCards(this.oppositePlayer);

                if (currentCard.isDead) {
                    var column = currentCard.formationColumn;
                    if (this.isBloodClash && this.currentPlayerReserveCards[column]) {
                        // swich in reserve
                        var reserveCard = this.currentPlayerReserveCards[column];

                        this.cardManager.switchCardInAllCurrentMainCards(currentCard, reserveCard);
                        this.currentPlayerMainCards[column] = reserveCard;
                        this.currentPlayerReserveCards[column] = null;

                        this.logger.addMajorEvent({
                            description: currentCard.name + " is switched by " + reserveCard.name,
                        });

                        this.logger.addMinorEvent({
                            description: currentCard.name + " is switched by " + reserveCard.name,
                            type: ENUM.MinorEventType.RESERVE_SWITCH,
                            reserveSwitch: {
                                mainId: currentCard.id,
                                reserveId: reserveCard.id
                            }
                        });

                        currentCard = reserveCard;

                        // proc opening skill when switch in
                        var openingSkill = currentCard.getRandomOpeningSkill();
                        if (openingSkill) {
                            var data: SkillLogicData = {
                                executor: currentCard,
                                skill: openingSkill
                            };
                            if (openingSkill.willBeExecuted(data)) {
                                this.logger.addMajorEvent({
                                    description: currentCard.name + " procs " + openingSkill.name,
                                    executorId: currentCard.id,
                                    skillId: openingSkill.id
                                });
                                openingSkill.execute(data);
                            }
                        }
                    }
                    else {
                        continue;
                    }
                }

                var missTurn = !currentCard.canAttack();
                if (missTurn) {
                    this.logger.addMajorEvent({
                        description: currentCard.name + " missed a turn"
                    });
                }

                // procs active skill if we can
                this.processActivePhase(currentCard, "FIRST");                
                if (this.isFinished) break;

                if (!currentCard.isDead && currentCard.status.willAttackAgain != 0) {
                    this.processActivePhase(currentCard, "FIRST");
                    // todo: send a minor event log and handle it
                    currentCard.status.willAttackAgain = 0;
                    if (this.isFinished) break;
                }                

                // todo: make a major event if a fam missed a turn
                if (!currentCard.isDead) {
                    var cured = currentCard.updateAffliction();
                    // if cured, make a log
                    if (!currentCard.affliction && cured) {
                        var desc = currentCard.name + " is cured of affliction!";
                    
                        this.logger.addMinorEvent({
                            targetId: currentCard.id, 
                            type: ENUM.MinorEventType.AFFLICTION, 
                            affliction: {
                                type: currentCard.getAfflictionType(),
                                isFinished: true,
                            },
                            description: desc, 
                        
                        });
                    }

                    this.processOnDeathPhase();
                }

                this.checkFinish();
            }

            if (!this.isFinished) {
                this.processEndTurn();
            }
        }
        return this.playerWon.name;
    }

    addOnDeathCard(card: Card) {
        if (card.hasOnDeathSkill()) {
            this.onDeathCards.push(card);
        }
    }
    
    checkFinish(): void {
        var noOnDeathRemain = this.onDeathCards.length === 0;
        if (this.cardManager.isAllDeadPlayer(this.oppositePlayer) && noOnDeathRemain) {
            this.playerWon = this.currentPlayer;
        }
        else if (this.cardManager.isAllDeadPlayer(this.currentPlayer) && noOnDeathRemain) {
            this.playerWon = this.oppositePlayer;
        }

        if (this.playerWon) {
            this.logger.addMajorEvent({
                description: this.playerWon.name + " has won"
            });

            this.logger.addMinorEvent({
                type: ENUM.MinorEventType.TEXT,
                description: "Battle ended"
            });
            this.isFinished = true;
        }
    }

    // return true if battle has ended, false if not
    processActivePhase(currentCard: Card, nth: string): void {
        var activeSkill = currentCard.getRandomActiveSkill();
        
        if (nth === "FIRST" && currentCard.isMounted) {
            activeSkill = currentCard.getFirstActiveSkill();
        }
        else if (nth === "SECOND" && currentCard.isMounted) {
            activeSkill = currentCard.getSecondActiveSkill();
        }
        
        if (activeSkill) {
            var data: SkillLogicData = {
                executor: currentCard,
                skill: activeSkill
            };
            if (activeSkill.willBeExecuted(data)) {
                this.logger.addMajorEvent({
                    description: currentCard.name + " procs " + activeSkill.name,
                    executorId: currentCard.id,
                    skillId: activeSkill.id
                });

                activeSkill.execute(data);
            }
            else {
                this.executeNormalAttack(currentCard);
            }
        }
        else {
            this.executeNormalAttack(currentCard);
        }

        this.processOnDeathPhase();

        this.checkFinish();
        if (this.isFinished) {
            return;
        }
        else if (nth === "FIRST" && currentCard.isMounted && !currentCard.isDead) {
            return this.processActivePhase(currentCard, "SECOND");
        }
    }

    processOnDeathPhase() {
        // make a copy
        var hasOnDeath: Card[] = [];
        for (var i = 0; i < this.onDeathCards.length; i++) {
            hasOnDeath.push(this.onDeathCards[i]);
        }

        this.onDeathCards = [];

        for (var i = 0; i < hasOnDeath.length; i++) {
            var card = hasOnDeath[i];
            var skill = card.getInherentOnDeathSkill();
            var data: SkillLogicData = {
                executor: card,
                skill: skill
            };
            if (skill && skill.willBeExecuted(data)) {
                this.logger.addMinorEvent({
                    executorId: card.id, 
                    type: ENUM.MinorEventType.DESCRIPTION,
                    description: card.name + " procs " + skill.name + ". ",
                    skillId: skill.id
                });
                skill.execute(data);
            }

            skill = card.getBuffOnDeathSkill();
            var data: SkillLogicData = {
                executor: card,
                skill: skill
            };
            // clear it
            card.clearBuffOnDeathSkill();
            if (skill && skill.willBeExecuted(data)) {
                this.logger.addMinorEvent({
                    executorId: card.id, 
                    type: ENUM.MinorEventType.DESCRIPTION,
                    description: card.name + " procs " + skill.name + ". ",
                    skillId: skill.id
                });
                skill.execute(data);
            }
        }

        // at the end, if there are newly addition to recentlyDeadCards, recursively repeat the process 
        if (this.onDeathCards.length !== 0) {
            this.processOnDeathPhase();
        }
    }
    
    /**
     * Called at the end of two player's turn
     */
    processEndTurn() {
        this.logger.addMajorEvent({
            description: "Turn end"
        });

        this.logger.addMinorEvent({
            type: ENUM.MinorEventType.TEXT,
            description: "Turn end"
        });

        if (this.logger.currentTurn >= BattleModel.MAX_TURN_NUM) {
         
            var p1Cards    = this.cardManager.getPlayerAllCurrentCards(this.player1);
            var p2Cards    = this.cardManager.getPlayerAllCurrentCards(this.player2);
                
            var p1Ratio    = this.cardManager.getTotalHPRatio(p1Cards);
            var p2Ratio    = this.cardManager.getTotalHPRatio(p2Cards);
                
            if (p1Ratio >= p2Ratio) {
                this.playerWon = this.player1;
                var battleDesc = "Decision win";
            } else {
                this.playerWon = this.player2;
                var battleDesc = "Decision loss";
            }
            this.isFinished = true;

            this.logger.addMajorEvent({
                description: "Decision win for " + this.playerWon.name
            });

            this.logger.addMinorEvent({
                type: ENUM.MinorEventType.BATTLE_DESCRIPTION,
                description: "Decision win",
                battleDesc: battleDesc
            });
        }
        else if (this.isBloodClash) {
            // add skill probability to those still alive
            var allCards = this.cardManager.getAllCurrentCards();
            for (var i = 0; i < allCards.length; i++) {
                var tmpCard = allCards[i];
                if (tmpCard && !tmpCard.isDead) {
                    tmpCard.bcAddedProb += 10;

                    this.logger.addMinorEvent({
                        type: ENUM.MinorEventType.BC_ADDPROB,
                        description: tmpCard.name + " gets 10% increase in skill prob.",
                        bcAddProb: {
                            targetId: tmpCard.id,
                            isMain: this.cardManager.isCurrentMainCard(tmpCard)
                        }
                    });
                }
            }
        }
    }
    
    executeNormalAttack(attacker: Card) {

        if (!attacker.canAttack()) {
            return;
        }

        this.logger.addMajorEvent({
            description: attacker.name + " attacks!",
            skillId: attacker.autoAttack.id,
            executorId: attacker.id
        });

        attacker.autoAttack.execute({
            executor: attacker,
            skill: attacker.autoAttack
        });
    }

    /**
     * Process the protecting sequence. Return true if a protect has been executed
     * or false if no protect has been executed
     *
     * @param targetsAttacked optional, set to null when multiple protect/hit is allowed
     */
    processProtect(attacker: Card, targetCard: Card, attackSkill: Skill, targetsAttacked: boolean[], scaledRatio?: number) {
        // now check if someone on the enemy side can protect before the damage is dealt
        var enemyCards = this.cardManager.getEnemyCurrentMainCards(attacker.player);
        var protectSkillActivated = false; //<- has any protect skill been activated yet?
        var toReturn: any = {}; // data that we will return
        for (var i = 0; i < enemyCards.length && !protectSkillActivated; i++) {
            if (enemyCards[i].isDead) {
                continue;
            }
            var protectSkill = enemyCards[i].getRandomProtectSkill();
            if (protectSkill) {
                var protector = enemyCards[i];

                // if a fam that has been attacked is not allowed to protect (like in the case of AoE), continue
                if (targetsAttacked && targetsAttacked[protector.id]) {
                    continue;
                }

                var protectData: SkillLogicData = {
                    executor: protector,
                    skill: protectSkill,
                    attacker: attacker,    // for protect
                    attackSkill: attackSkill, // for protect
                    targetCard: targetCard,  // for protect
                    targetsAttacked: targetsAttacked,  // for protect
                    scaledRatio: scaledRatio
                };

                if (protectSkill.willBeExecuted(protectData)) {
                    protectSkillActivated = true;
                    toReturn = protectSkill.execute(protectData);
                }
            }
            else {
                // this fam doesn't have a protect skill, move on to the next one
                continue;
            }
        }
        toReturn.activated = protectSkillActivated;
        return toReturn;
    }

    performOpeningSkills () {
        // the cards sorted by proc order
        var p1cards = this.cardManager.getPlayerCurrentMainCardsByProcOrder(this.player1);
        var p2cards = this.cardManager.getPlayerCurrentMainCardsByProcOrder(this.player2);

        for (var i = 0; i < p1cards.length; i++) {
            var skill1 = p1cards[i].getRandomOpeningSkill();
            if (skill1) {
                var data: SkillLogicData = {
                    executor: p1cards[i],
                    skill: skill1
                };
                if (skill1.willBeExecuted(data)) {
                    this.logger.addMajorEvent({
                        description: p1cards[i].name + " procs " + skill1.name,
                        executorId: p1cards[i].id,
                        skillId: skill1.id
                    });
                    skill1.execute(data);
                }
            }
        }
        
        for (var i = 0; i < p2cards.length; i++) {
            var skill2 = p2cards[i].getRandomOpeningSkill();
            if (skill2) {
                var data: SkillLogicData = {
                    executor: p2cards[i],
                    skill: skill2
                };
                if (skill2.willBeExecuted(data)) {
                    this.logger.addMajorEvent({
                        description: p2cards[i].name + " procs " + skill2.name,
                        executorId: p2cards[i].id,
                        skillId: skill2.id
                    });
                    skill2.execute(data);
                }
            }
        }

        // reset the turn order changed flag at the end of opening phase
        this.turnOrderChanged = false;
    }
}

/**
 * A structure for holding a battle's data
 */
interface GameData {
    p1_formation: string;
    p2_formation: string;
    p1_cardIds: number[];
    p2_cardIds: number[];
    p1_warlordSkillIds: number[];
    p2_warlordSkillIds: number[];
}

/**
 * A structure for holding a battle's option
 */
interface GameOption {
    p1RandomMode?: ENUM.RandomBrigType;
    p2RandomMode?: ENUM.RandomBrigType;
    procOrder?: ENUM.ProcOrderType;
    battleType?: ENUM.BattleType;
}
