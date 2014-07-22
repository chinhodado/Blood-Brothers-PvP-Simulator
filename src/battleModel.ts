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
    p1Random: boolean;
    p2Random: boolean;

    logger : BattleLogger;
    cardManager: CardManager;
    
    player1: Player;
    player2: Player;

    playerWon: Player = null;
    
    // the two players' cards. The order of the cards in these two arrays should never be changed
    player1Cards : Card[];
    player2Cards : Card[];
    
    // contains all cards in play. Should be re-sorted every turn
    allCards: Card[];

    // only used for quickly get a card by its id
    allCardsById: any = {};

    // store recently dead cards with ondeath skills waiting to proc
    onDeathCards: Card[] = [];

    // turn order info
    turnOrderBase: ENUM.BattleTurnOrderType = ENUM.BattleTurnOrderType.AGI;
    turnOrderChangeEffectiveTurns: number = 0;
    turnOrderChanged: boolean = false;
    
    // for the current card. Remember to update these when it's a new card's turn. Maybe move to a separate structure?
    currentPlayer : Player;
    oppositePlayer : Player;
    currentPlayerCards : Card[];
    oppositePlayerCards : Card[];
    
    private static _instance : BattleModel = null;

    public static getInstance() : BattleModel {
        if (BattleModel._instance === null) {
            throw new Error("Error: you should not make this object this way");
        }
        return BattleModel._instance;
    }

    constructor(data: GameData, option: GameOption = {}) {
    
        if(BattleModel._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        BattleModel._instance = this;
        this.logger = BattleLogger.getInstance();
        this.cardManager = CardManager.getInstance();
        var graphic = new BattleGraphic();
        
        var player1formation: any;
        var player2formation: any;
        var player1cardsInfo = [];
        var player2cardsInfo = [];
        var player1warlordSkillArray: number[] = [];
        var player2warlordSkillArray: number[] = [];

        var availableSkills: number[] = Skill.getAvailableSkillsForSelect();
        
        if (option.p1random) {
            this.p1Random = true;
            player1formation = pickRandomProperty(Formation.FORMATION_CONFIG);
            for (var i = 0; i < 5; i++) {
                player1cardsInfo.push(famDatabase[pickRandomProperty(famDatabase)]);
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

        if (option.p2random) {
            this.p2Random = true;
            player2formation = pickRandomProperty(Formation.FORMATION_CONFIG);
            for (var i = 0; i < 5; i++) {
                player2cardsInfo.push(famDatabase[pickRandomProperty(famDatabase)]);
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
        
        // initialize the cards
        this.player1Cards = [];
        this.player2Cards = [];
        this.allCards = [];        
        
        for (var i = 0; i < 5; i++) {
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
            
            this.player1Cards[i] = new Card(player1cardsInfo[i], this.player1, i, player1Skills); //my cards

            this.player2Cards[i] = new Card(player2cardsInfo[i], this.player2, i, player2Skills); // opp card
            this.allCards.push(this.player1Cards[i]);
            this.allCards.push(this.player2Cards[i]);

            this.allCardsById[this.player1Cards[i].id] = this.player1Cards[i];
            this.allCardsById[this.player2Cards[i].id] = this.player2Cards[i];
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
    // use this when there's no executorId for the MinorEvent, like for poison
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

        if (skill.skillFunc === ENUM.SkillFunc.DEBUFFATTACK || skill.skillFunc === ENUM.SkillFunc.DEBUFFINDIRECT) {
            status = skill.skillFuncArg2;
            multi  = skill.skillFuncArg4;
        }
        else if (skill.skillFunc === ENUM.SkillFunc.DEBUFF) {
            status = skill.skillFuncArg2;
            multi  = skill.skillFuncArg1;
        }
        else {
            throw new Error("Wrong skill to use with processDebuff()");
        }

        var baseAmount = getDebuffAmount(executor, target);
        var amount = Math.floor(baseAmount * multi);

        target.changeStatus(status, amount);
        var description = target.name + "'s " + ENUM.StatusType[status] + " decreased by " + Math.abs(amount);

        this.logger.addMinorEvent({
            executorId: executor.id, 
            targetId: target.id, 
            type: ENUM.MinorEventType.STATUS, 
            status: {
                type: status,
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

            this.cardManager.sortAllCards();

            // assuming both have 5 cards
            for (var i = 0; i < 10 && !finished; i++) {
                var currentCard = this.allCards[i];
                this.currentPlayer = currentCard.player;
                this.currentPlayerCards = this.cardManager.getPlayerCards(this.currentPlayer); // cards of the attacking player
                this.oppositePlayer = this.getOppositePlayer(this.currentPlayer);
                this.oppositePlayerCards = this.cardManager.getPlayerCards(this.oppositePlayer);

                if (!currentCard || currentCard.isDead) {
                    continue;
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

                // update poison status
                if (!currentCard.isDead && currentCard.getAfflictionType() == ENUM.AfflictionType.POISON) {
                    currentCard.updateAffliction();
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
        if (this.cardManager.isAllDead(this.oppositePlayerCards) && noOnDeathRemain) {
            this.playerWon = this.currentPlayer;
        }
        else if (this.cardManager.isAllDead(this.currentPlayerCards) && noOnDeathRemain) {
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
        // process end turn events: afflictions, etc.
        this.logger.addMajorEvent({
            description: "Turn end"
        });

        for (var i = 0; i < 10; i++) {
            var currentCard = this.allCards[i];
            if (currentCard.isDead) {
                continue;
            }

            // poison is updated at fam's turn end instead
            if (currentCard.getAfflictionType() != ENUM.AfflictionType.POISON) {
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
            }
        }

        this.logger.addMinorEvent({
            type: ENUM.MinorEventType.TEXT,
            description: "Turn end"
        });
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
        var enemyCards = this.cardManager.getEnemyCards(attacker.player);
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
        for (var i = 0; i < this.player1Cards.length; i++) {
            var skill1 = this.player1Cards[i].getRandomOpeningSkill();
            if (skill1) {
                var data: SkillLogicData = {
                    executor: this.player1Cards[i],
                    skill: skill1
                }
                if (skill1.willBeExecuted(data)) {
                    this.logger.addMajorEvent({
                        description: this.player1Cards[i].name + " procs " + skill1.name,
                        executorId: this.player1Cards[i].id,
                        skillId: skill1.id
                    });
                    skill1.execute(data);
                }
            }
        }
        
        for (var i = 0; i < this.player2Cards.length; i++) {
            var skill2 = this.player2Cards[i].getRandomOpeningSkill();
            if (skill2) {
                var data: SkillLogicData = {
                    executor: this.player2Cards[i],
                    skill: skill2
                }
                if (skill2.willBeExecuted(data)) {
                    this.logger.addMajorEvent({
                        description: this.player2Cards[i].name + " procs " + skill2.name,
                        executorId: this.player2Cards[i].id,
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
    p1random?: boolean;
    p2random?: boolean;
}