/// <reference path="affliction.ts"/>
/// <reference path="battleGraphic.ts"/>
/// <reference path="battleLogger.ts"/>
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
    p1RandomMode: ENUM.RandomBrigType;
    p2RandomMode: ENUM.RandomBrigType;
    isBloodClash: boolean = false;
    procOrderType: ENUM.ProcOrderType = ENUM.ProcOrderType.ANDROID;

    logger: BattleLogger;
    cardManager: CardManager;
    
    player1: Player;
    player2: Player;

    playerWon: Player = null;
    
    // The two players' main cards. The order of the cards in these two arrays should never be changed.
    // When a reserve comes out, replace the main card in here with the reserve
    p1_mainCards: Card[] = [];
    p2_mainCards: Card[] = [];

    // The two player's reserve cards. When a reserve comes out, move it to the main cards (i.e. delete it here)
    p1_reserveCards: Card[] = [];
    p2_reserveCards: Card[] = [];

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
    
        if(BattleModel._instance) {
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
        
        var player1formation: any;
        var player2formation: any;
        var player1cardsInfo = [];
        var player2cardsInfo = [];
        var player1warlordSkillArray: number[] = [];
        var player2warlordSkillArray: number[] = [];

        var availableSkills: number[] = Skill.getAvailableSkillsForSelect();
        
        if (!tierListString) {
            var tierListString = sessionStorage["tierList"];
        }

        if (option.p1RandomMode) {
            this.p1RandomMode = option.p1RandomMode;
            var p1randomList = FamiliarDatabase.getRandomFamList(+option.p1RandomMode, tierListString);
            player1formation = pickRandomProperty(Formation.FORMATION_CONFIG);
            for (var i = 0; i < 10; i++) {
                player1cardsInfo.push(famDatabase[getRandomElement(p1randomList)]);
            }

            for (var i = 0; i < 3; i++) {
                player1warlordSkillArray.push(+getRandomElement(availableSkills));
            }
        }
        else {
            player1formation = data.player1formation;
            player1cardsInfo = data.player1cardsInfo;
            player1warlordSkillArray = data.player1warlordSkillArray;
        }

        if (option.p2RandomMode) {
            this.p2RandomMode = option.p2RandomMode;
            var p2randomList = FamiliarDatabase.getRandomFamList(+option.p2RandomMode, tierListString);
            player2formation = pickRandomProperty(Formation.FORMATION_CONFIG);
            for (var i = 0; i < 10; i++) {
                player2cardsInfo.push(famDatabase[getRandomElement(p2randomList)]);
            }

            for (var i = 0; i < 3; i++) {
                player2warlordSkillArray.push(+getRandomElement(availableSkills));
            }
        }
        else {
            player2formation = data.player2formation;
            player2cardsInfo = data.player2cardsInfo;
            player2warlordSkillArray = data.player2warlordSkillArray;
        }
        
        this.player1 = new Player(1, "Player 1", new Formation(player1formation), 1); // me
        this.player2 = new Player(2, "Player 2", new Formation(player2formation), 1); // opp
        
        // create the cards        
        for (var i = 0; i < 10; i++) {

            if (i >= 5 && !this.isBloodClash) break;

            // make the skill array for the current fam
            var p1fSkillIdArray: number[] = player1cardsInfo[i].skills;
            if (player1cardsInfo[i].isWarlord) {
                p1fSkillIdArray = player1warlordSkillArray;
            }

            var p2fSkillIdArray: number[] = player2cardsInfo[i].skills;
            if (player2cardsInfo[i].isWarlord) {
                p2fSkillIdArray = player2warlordSkillArray;
            }

            var player1Skills = this.makeSkillArray(p1fSkillIdArray);
            var player2Skills = this.makeSkillArray(p2fSkillIdArray);
            
            // now make the cards and add them to the appropriate collections
            var card1 = new Card(player1cardsInfo[i], this.player1, i, player1Skills);
            var card2 = new Card(player2cardsInfo[i], this.player2, i, player2Skills);

            if (i < 5) {
                this.p1_mainCards[i] = card1;
                this.p2_mainCards[i] = card2;
                this.allCurrentMainCards.push(this.p1_mainCards[i]);
                this.allCurrentMainCards.push(this.p2_mainCards[i]);
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

        this.cardManager.sortAllCards();
        
        graphic.displayFormationAndFamOnCanvas();

        if (!BattleLogger.IS_DEBUG_MODE) {
            this.logger.displayInfoText();
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
    makeSkillArray (skills : number[]) {
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
    
    getOppositePlayer (player : Player) {
        if (player == this.player1) {
            return this.player2;
        }
        else if (player == this.player2) {
            return this.player1;
        }
        else {
            throw new Error("Invalid player");
        }
    }

    /**
     * Use this for damage because of attacks
     * if damage is not supplied, it will be calculated automatically
     * otherwise, damage will be done directly
     */
    damageToTarget(data: {attacker: Card; target: Card; skill: Skill; additionalDescription?: string; damage?: number; scaledRatio?: number; missed: boolean}) {
        
        var damage = data.damage;

        if (!damage) {
            if (!data.missed) {
                damage = this.getWouldBeDamage(data.attacker, data.target, data.skill, {scaledRatio: data.scaledRatio});
            }
            else {
                damage = 0;
            }
        }
        
        // HP shield skill
        var hpShield = ~~data.target.status.hpShield;
        if (hpShield > 0 && !data.missed) {
            if (damage >= hpShield) {
                data.target.status.hpShield = 0;
                damage -= hpShield;
            } else {
                data.target.status.hpShield = hpShield - damage;
                damage = 0;
            }
        }         
    
        data.target.changeHP(-1 * damage);

        if (!data.additionalDescription) {
            data.additionalDescription = "";
        }

        // this probably should not be here, but wtv...
        if (data.target.hasWardOfType(data.skill.ward)) {
            var wardUsed = data.skill.ward;
        }

        if (data.missed) {
            var desc = data.attacker.name + " missed the attack on " + data.target.name;
        }
        else {
            desc = data.additionalDescription + data.target.name + " lost " + damage + "hp (remaining " + 
                data.target.getHP() + "/" + data.target.originalStats.hp + ")";
        }

        this.logger.addMinorEvent({
            executorId: data.attacker.id, 
            targetId: data.target.id, 
            type: ENUM.MinorEventType.HP, 
            amount: (-1) * damage, 
            description: desc, 
            skillId: data.skill.id,
            wardUsed: wardUsed,
            missed: data.missed
        });

        if (data.target.getHP() <= 0) {
            this.logger.displayMinorEvent(data.target.name + " is dead");
            data.target.isDead = true;
            this.addOnDeathCard(data.target);
        }
    }

    getWouldBeDamage(attacker: Card, target: Card, skill: Skill, opt?: {scaledRatio?: number}): number {
        var skillMod = skill.skillFuncArg1;
        var ignorePosition = (skill.skillFunc == ENUM.SkillFunc.MAGIC || skill.skillFunc == ENUM.SkillFunc.DEBUFFINDIRECT);
    
        var baseDamage : number;
            
        switch (skill.skillCalcType) {
            case (ENUM.SkillCalcType.DEFAULT) :
            case (ENUM.SkillCalcType.WIS) :
                baseDamage = getDamageCalculatedByWIS(attacker, target);
                break;
            case (ENUM.SkillCalcType.ATK) :
                baseDamage = getDamageCalculatedByATK(attacker, target, ignorePosition);
                break;
            case (ENUM.SkillCalcType.AGI) :
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
        
        if (target.getHP() <= 0) {
            this.logger.displayMinorEvent(target.name + " is dead");
            target.isDead = true;
            this.addOnDeathCard(target);
        }
    }

    processAffliction(executor: Card, target: Card, skill: Skill) {
        var type: ENUM.AfflictionType = skill.skillFuncArg2
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
            
        if(Math.random() <= prob){
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
        else {
            throw new Error("Wrong skill to use with processDebuff()");
        }

        if (!isNewLogic) {
            var baseAmount = getDebuffAmount(executor, target);
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
        
        var finished = false;

        while (!finished) {

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
            this.cardManager.sortAllCards();

            // assuming both have 5 cards
            for (var i = 0; i < 10 && !finished; i++) {
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
                finished = this.processActivePhase(currentCard, "FIRST");                
                if (finished) break;

                if (!currentCard.isDead && currentCard.status.willAttackAgain != 0) {
                    finished = this.processActivePhase(currentCard, "FIRST");
                    // todo: send a minor event log and handle it
                    currentCard.status.willAttackAgain = 0;
                    if (finished) break;
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

                finished = this.checkFinish();
            }

            if (!finished) {
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
    
    checkFinish(): boolean {
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
            return true;        
        }
        else {
            return false;
        }
    }

    // return true if battle has ended, false if not
    processActivePhase(currentCard: Card, nth: string): boolean {
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
            }
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

        if (this.checkFinish()) {
            return true;
        }
        else if (nth === "FIRST" && currentCard.isMounted && !currentCard.isDead) {
            return this.processActivePhase(currentCard, "SECOND");
        }
        else {
            return false;
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
            }
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
            }
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

        // add skill probability to those still alive
        if (this.isBloodClash) {
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
    processProtect(attacker: Card, targetCard: Card, attackSkill: Skill, targetsAttacked: any, scaledRatio?: number) {
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
                }

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
        toReturn.activated = protectSkillActivated
        return toReturn;
    }

    performOpeningSkills () {
        // the cards sorted by proc order
        var p1cards = this.cardManager.getPlayerCardsByProcOrder(this.player1);
        var p2cards = this.cardManager.getPlayerCardsByProcOrder(this.player2);

        for (var i = 0; i < p1cards.length; i++) {
            var skill1 = p1cards[i].getRandomOpeningSkill();
            if (skill1) {
                var data: SkillLogicData = {
                    executor: p1cards[i],
                    skill: skill1
                }
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
                }
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

interface GameData {
    player1formation: string;
    player2formation: string;
    player1cardsInfo: any[];
    player2cardsInfo: any[];
    player1warlordSkillArray: number[];
    player2warlordSkillArray: number[];
}

interface GameOption {
    p1RandomMode?: ENUM.RandomBrigType;
    p2RandomMode?: ENUM.RandomBrigType;
    procOrder?: ENUM.ProcOrderType;
    battleType?: ENUM.BattleType;
}