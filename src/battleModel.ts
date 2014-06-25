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
/// <reference path="skillRange.ts"/>
/// <reference path="util.ts"/>

class BattleModel {

    // set to true when doing a mass simulation and you don't care about the graphics or logging stuffs
    static IS_MASS_SIMULATION = false;

    rangeFactory: RangeFactory;
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
    
    // for the current card. Remember to update these when it's a new card's turn. Maybe move to a separate structure?
    currentPlayer : Player;
    oppositePlayer : Player;
    currentPlayerCards : Card[];
    oppositePlayerCards : Card[];
    
    private static _instance : BattleModel = null;

    public static getInstance() : BattleModel {
        if (BattleModel._instance === null) {
            BattleModel._instance = new BattleModel();
        }
        return BattleModel._instance;
    }

    constructor(data?: GameData, mode?: string) {
    
        if(BattleModel._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        BattleModel._instance = this;
        this.rangeFactory = RangeFactory.getInstance();
        this.logger = BattleLogger.getInstance();
        this.cardManager = CardManager.getInstance();
        
        var player1formation: string;
        var player2formation: string;
        var player1cardsInfo = [];
        var player2cardsInfo = [];
        
        if (mode == "random") {
            player1formation = pickRandomProperty(Formation.FORMATION_CONFIG);
            player2formation = pickRandomProperty(Formation.FORMATION_CONFIG);
            for (var i = 0; i < 5; i++) {
                player1cardsInfo.push(famDatabase[pickRandomProperty(famDatabase)]);
                player2cardsInfo.push(famDatabase[pickRandomProperty(famDatabase)]);
            }        
        }
        else {
            player1formation = data.player1formation;
            player2formation = data.player2formation;

            player1cardsInfo = data.player1cardsInfo;
            player2cardsInfo = data.player2cardsInfo;
        }        
        
        this.player1 = new Player(1, "Player 1", new Formation(player1formation), 1); // me
        this.player2 = new Player(2, "Player 2", new Formation(player2formation), 1); // opp
        
        // initialize the cards
        this.player1Cards = [];
        this.player2Cards = [];
        this.allCards = [];        
        
        for (var i = 0; i < 5; i++) {
            var player1Skills = this.makeSkillArray(player1cardsInfo[i].skills);
            var player2Skills = this.makeSkillArray(player2cardsInfo[i].skills);
            
            var stats1 = new Stats(player1cardsInfo[i].hp, player1cardsInfo[i].atk, 
                player1cardsInfo[i].def, player1cardsInfo[i].wis, player1cardsInfo[i].agi);
            var stats2 = new Stats(player2cardsInfo[i].hp, player2cardsInfo[i].atk, 
                player2cardsInfo[i].def, player2cardsInfo[i].wis, player2cardsInfo[i].agi);

            var auto1: Skill;
            if (player1cardsInfo[i].autoAttack) {
                auto1 = new Skill(player1cardsInfo[i].autoAttack);
            }
            else {
                auto1 = new Skill(0);
            }

            var auto2: Skill;
            if (player2cardsInfo[i].autoAttack) {
                auto2 = new Skill(player2cardsInfo[i].autoAttack);
            }
            else {
                auto2 = new Skill(0);
            }

            
            this.player1Cards[i] = new Card(player1cardsInfo[i].name,
                                        stats1, 
                                        player1Skills, 
                                        this.player1,
                                        i,
                                        player1cardsInfo[i].imageLink,
                                        auto1); //my cards
            this.player2Cards[i] = new Card(player2cardsInfo[i].name, 
                                        stats2,
                                        player2Skills, 
                                        this.player2,
                                        i,
                                        player2cardsInfo[i].imageLink,
                                        auto2);  // opp card
            this.allCards.push(this.player1Cards[i]);
            this.allCards.push(this.player2Cards[i]);

            this.allCardsById[this.player1Cards[i].id] = this.player1Cards[i];
            this.allCardsById[this.player2Cards[i].id] = this.player2Cards[i];
        }

        this.cardManager.sortAllCards();
        
        // save the initial field snapshot
        this.logger.saveInitialField();
        
        this.logger.displayFormationAndFamOnCanvas();
    }

    /**
     * Resets everything
     * Used for testing only
     */
    static resetAll() {
        BattleModel.removeInstance();
        BattleLogger.removeInstance();
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

    executeRandomAttackSkill (executor : Card) {
    	var skill = executor.attackSkill;        
        var numTarget = (<EnemyRandomRange>skill.range).numTarget;
        
        for (var i = 0; i < numTarget && !executor.isDead; i++) {

            var targetIndex = this.cardManager.getValidSingleTarget(this.oppositePlayerCards);
    
            if (targetIndex == -1) {
                // no valid target, miss a turn, continue to next card
                return;
            }
            
            // since we get a valid index with every iteration of the loop, there's no need
            // to check if the target is dead here
            var targetCard = this.oppositePlayerCards[targetIndex];
            var protectSkillActivated = this.processProtect(executor, targetCard, skill, null);

            // if not protected, proceed with the attack as normal
            if (!protectSkillActivated) {
                this.damageToTarget(executor, targetCard, skill, null);
            }
        }
    }

    /**
     * Process the protecting sequence. Return true if a protect has been executed
     * or false if no protect has been executed
     *
     * @param targetsAttacked optional, set to null when multiple protect/hit is allowed
     */
    processProtect(attacker: Card, targetCard: Card, attackSkill: Skill, targetsAttacked: any): boolean {
        // now check if someone on the enemy side can protect before the damage is dealt
        var enemyCards = this.cardManager.getEnemyCards(attacker.player);
        var protectSkillActivated = false; //<- has any protect skill been activated yet?
        for (var i = 0; i < enemyCards.length && !protectSkillActivated; i++) {
            if (enemyCards[i].isDead) {
                continue;
            }
            var protectSkill = enemyCards[i].protectSkill;
            if (protectSkill) {
                var protector = enemyCards[i];

                // a fam cannot protect itself, unless the skillRange is 21 (hard-coded here for now)
                if (this.cardManager.isSameCard(targetCard, protector) && protectSkill.skillRange != 21) {
                    continue;
                }

                // if a fam that has been attacked is not allowed to protect (like in the case of AoE), continue
                if (targetsAttacked && targetsAttacked[protector.id]) {
                    continue;
                }

                if (!protector.canUseSkill()) {
                    continue;
                }

                // now check if the original target is in the protect range of the protector
                var defenseTargets = protectSkill.range.getTargets(protector);
                if (this.cardManager.isCardInList(targetCard, defenseTargets)) {
                    if (Math.random() * 100 <= protectSkill.maxProbability) {
                        // ok, so now activate the protect skill
                        protectSkillActivated = true;

                        // first redirect the original attack to the protecting fam
                        var additionalDesc = protector.name + " procs " + protectSkill.name + " to protect " +
                            targetCard.name + ". ";
                        this.damageToTarget(attacker, protector, attackSkill, additionalDesc);

                        // update the targetsAttacked if necessary
                        if (targetsAttacked) {
                            targetsAttacked[protector.id] = true;
                        }

                        // counter phase
                        if (!protector.isDead && protectSkill.skillFunc == ENUM.SkillFunc.PROTECT_COUNTER) {
                            var additionalDesc = protector.name + " counters " + attacker.name + "! ";
                            this.damageToTarget(protector, attacker, protectSkill, additionalDesc);
                        }
                    }
                }
            }
            else {
                // this fam doesn't have a protect skill, move on to the next one
                continue;
            }
        }
        return protectSkillActivated;
    }

    damageToTarget(attacker : Card, target : Card, skill : Skill, additionalDescription : string) {
        var skillMod = skill.skillFuncArg1;
        var ignorePosition = (skill.skillFunc == ENUM.SkillFunc.MAGIC);
    
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
            
        // apply the target's ward
        switch (skill.ward) {
            case ("PHYSICAL") :
                damage = Math.round(damage * (1 - target.status.attackResistance));
                break;
            case ("MAGICAL") :
                damage = Math.round(damage * (1 - target.status.magicResistance));
                break;
            case ("BREATH") :
                damage = Math.round(damage * (1 - target.status.breathResistance));
                break;
            default :
                throw new Error ("Wrong type of ward. Maybe you forgot to include in the skill?");
        }
    
        target.changeHP(-1 * damage);

        this.processAffliction(attacker, target, skill); 
                
        if (!additionalDescription) {
            additionalDescription = "";
        }
        var description = additionalDescription +
            target.name + " lost " + damage + "hp (remaining " + target.getHP() + "/" + target.originalStats.hp + ")";
        this.logger.addMinorEvent(attacker, target, ENUM.MinorEventType.HP, "HP", (-1) * damage, description, skill.id);
        if (target.getHP() <= 0) {
            this.logger.displayMinorEvent(target.name + " is dead");
            target.isDead = true;
        }
    }

    processAffliction(executor: Card, target: Card, skill: Skill) {
        var type: ENUM.AfflictionType = skill.skillFuncArg2
        var prob: number = skill.skillFuncArg3;

        if (!type) {
            return;
        }

        if (skill.skillFuncArg4 || skill.skillFuncArg5) {
            // arg4: number of turns for silent & blind, % for venom
            // arg5: miss prob. for blind
            var optParam = [skill.skillFuncArg4, skill.skillFuncArg5];
        }
            
        if(Math.random() <= prob){
            target.setAffliction(type, optParam);
            var description = target.name + " is now " + ENUM.AfflictionType[type];
            var maxTurn = 1;
            if (type == ENUM.AfflictionType.BLIND || type == ENUM.AfflictionType.SILENT) {
                maxTurn = skill.skillFuncArg4;
            }
            else if (type == ENUM.AfflictionType.POISON) {
                maxTurn = -1;
            }
            this.logger.addMinorEvent(executor, target, ENUM.MinorEventType.AFFLICTION, ENUM.AfflictionType[type], maxTurn, description, 0);
        }
    }
    
    /**
     * Execute an attack skill that has the targets obtained from its range
     */
    executeAttackSkillWithRangeTargets (executor : Card) {
        var skill = executor.attackSkill;
        var targets : Card[] = skill.range.getTargets(executor);

        if (skill.contact == 0 || typeof skill.contact === undefined) {
            // if the skill doesn't make contact, it must be AoE, so only one fam can be protected

            // NOTE: the algorithm used here for protection may not be correct, since it makes the 
            // proc rate not really what it should be. For example, if two cards, one can protect (A)
            // and one not (B), are hit by an AoE, B only has 35% chance of being protected, and not 70%,
            // since there's 50% that A will be hit first and therefore unable to protect later on when B
            // is the target (this is based on the assumption that a fam cannot be hit twice in an AoE)

            // shuffle the targets. This serves two purposes. First, we can iterate
            // through the array in a random manner. Second, since the order is not
            // simply left-to-right anymore, it reminds us that this is an AoE skill
            shuffle(targets);

            // assume only one protection can be proc during an AoE skill. Is it true?
            var aoeProtectSkillActivated = false; //<- has any protect skill activated during this whole AoE?

            // keep track of targets attacked, to make sure a fam can only be attacked once. So if a fam has already been
            // attacked, it cannot protect another fam later on 
            var targetsAttacked = {};

            for (var i = 0; i < targets.length; i++) { //<- note that there's no executor.isDead check here
                var targetCard = targets[i];

                // a target can be dead, for example from protecting another fam
                if (targetCard.isDead) {
                    continue;
                }

                var protectSkillActivated = false; //<- has any protect skill activated to protect the current target?

                // if no protect skill has been activated at all during this AoE, we can try to
                // protect this target, otherwise no protect can be activated to protect this target
                // also, if the target has already been attacked (i.e. it protected another card before), then
                // don't try to protect it
                if (!aoeProtectSkillActivated && !targetsAttacked[targetCard.id]) {
                    protectSkillActivated = this.processProtect(executor, targetCard, skill, targetsAttacked);
                    if (protectSkillActivated) {
                        aoeProtectSkillActivated = true;
                    }
                }

                // if not protected, proceed with the attack as normal
                // also need to make sure the target is not already attacked
                if (!protectSkillActivated && !targetsAttacked[targetCard.id]) {
                    this.damageToTarget(executor, targetCard, skill, null);
                    targetsAttacked[targetCard.id] = true;
                }
            }
        }
        else {
            // skill makes contact, must be fork/sweeping etc., so just proceed as normal
            // i.e. multiple protection is possible
            for (var i = 0; i < targets.length && !executor.isDead; i++) {
                var targetCard = targets[i];

                // a target can be dead, for example from protecting another fam
                if (targetCard.isDead) {
                    continue;
                }

                var protectSkillActivated = this.processProtect(executor, targetCard, skill, null);

                // if not protected, proceed with the attack as normal
                if (!protectSkillActivated) {
                    this.damageToTarget(executor, targetCard, skill, null);
                }
            }
        }        
    }
    
    executeOpeningSkill (executor : Card) {
        var skill = executor.openingSkill;
        
        for (var skillFuncArgNum = 2; skillFuncArgNum <= 5; skillFuncArgNum++) {
            if (skill.getSkillFuncArg(skillFuncArgNum) == 0) {
                continue;
            }
            switch (skill.getSkillFuncArg(skillFuncArgNum)) {
                case ENUM.StatusType.ATK :
                case ENUM.StatusType.DEF :
                case ENUM.StatusType.WIS :
                case ENUM.StatusType.AGI :
                    var basedOnStatType = ENUM.SkillCalcType[skill.skillCalcType];
                    var skillMod = skill.skillFuncArg1;
                    var buffAmount = Math.round(skillMod * executor.getStat(basedOnStatType));
                    break;
                case ENUM.StatusType.ATTACK_RESISTANCE :
                case ENUM.StatusType.MAGIC_RESISTANCE :
                case ENUM.StatusType.BREATH_RESISTANCE :
                    var buffAmount = skill.skillFuncArg1;
                    break;
                default :
                    throw new Error("Wrong status type or not implemented");
            }
            
            var thingToBuff = skill.getSkillFuncArg(skillFuncArgNum);        
            var targets : Card[] = skill.range.getTargets(executor);
            
            for (var i = 0; i < targets.length; i++) {
                targets[i].changeStatus(thingToBuff, buffAmount);
                var description = targets[i].name + "'s " + ENUM.StatusType[thingToBuff] + " increased by " + buffAmount;                
                this.logger.addMinorEvent(executor, targets[i], ENUM.MinorEventType.STATUS,
                    ENUM.StatusType[thingToBuff], buffAmount, description, skill.id);
            }
        }
    }

    startBattle () {
        this.logger.startBattleLog();
        
        this.performOpeningSkills();
        this.cardManager.sortAllCards();

        var finished = false;

        while (!finished) {

            this.logger.currentTurn++;
            this.logger.bblogTurn("Turn " + this.logger.currentTurn);

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
                var attackSkill = currentCard.attackSkill;
                if (attackSkill) {
                    if (Math.random() * 100 <= attackSkill.maxProbability && currentCard.canUseSkill()) {
                        this.logger.addMajorEvent({
                            description: currentCard.name + " procs " + attackSkill.name,
                            executorId: currentCard.id,
                            skillId: attackSkill.id
                        });
                        if (this.rangeFactory.isEnemyRandomRange(attackSkill.skillRange)) {
                            this.executeRandomAttackSkill(currentCard);
                        }
                        else {
                            this.executeAttackSkillWithRangeTargets(currentCard);
                        }
                    }
                    else {
                        this.executeNormalAttack(currentCard);
                    }
                }
                else {
                    this.executeNormalAttack(currentCard);
                }

                if (this.cardManager.isAllDead(this.oppositePlayerCards)) {
                    finished = true;
                    this.playerWon = this.currentPlayer;
                    this.logger.addMajorEvent({
                        description: currentCard.getPlayerName() + " has won"
                    });                    
                }
                else if (this.cardManager.isAllDead(this.currentPlayerCards)) {
                    finished = true;
                    this.playerWon = this.oppositePlayer;
                    this.logger.addMajorEvent({
                        description: this.oppositePlayer.name + " has won"
                    });
                }
            }

            if (finished) {
                break;
            }

            // process end turn events: afflictions, etc.
            this.logger.addMajorEvent({
                description: "Turn end"
            });

            for (var i = 0; i < 10 && !finished; i++) {
                var currentCard = this.allCards[i];
                if (currentCard.isDead) {
                    continue;
                }
                var cured = currentCard.updateAffliction();
                    // if cured, make a log
                    if (!currentCard.affliction && cured) {
                        var desc = currentCard.name + " is cured of affliction!";
                        this.logger.addMinorEvent(currentCard, currentCard, ENUM.MinorEventType.AFFLICTION, "NONE", -2, desc, 0);
                    }
            }
        }
        return this.playerWon.name;
    }
    
    executeNormalAttack(attacker: Card) {

        if (!attacker.canAttack()) {
            return;
        }

        this.logger.addMajorEvent({
            description: attacker.name + " attacks!"
            // we may consider adding the attacker id and auto id later on
        });

        // create a default auto attack skill
        var autoSkill: Skill = attacker.autoAttack;
        
        var targets: Card[] = autoSkill.range.getTargets(attacker);

        for (var i = 0; i < targets.length && !attacker.isDead; i++) {
            var targetCard = targets[i];

            // a target can be dead, for example from protecting another fam
            if (targetCard.isDead) {
                continue;
            }

            var protectSkillActivated = this.processProtect(attacker, targetCard, autoSkill, null);

            // if not protected, proceed with the attack as normal
            if (!protectSkillActivated) {
                this.damageToTarget(attacker, targetCard, autoSkill, null);
            }
        }
    }

    performOpeningSkills () {
        for (var i = 0; i < this.player1Cards.length; i++) {
            var skill1 = this.player1Cards[i].openingSkill;
            if (skill1) {
                if (Math.random() * 100 < skill1.maxProbability && this.player1Cards[i].canUseSkill()) {
                    this.logger.addMajorEvent({
                        description: this.player1Cards[i].name + " procs " + skill1.name,
                        executorId: this.player1Cards[i].id,
                        skillId: skill1.id
                    });
                    this.executeOpeningSkill(this.player1Cards[i]);
                }
            }
        }
        
        for (var i = 0; i < this.player2Cards.length; i++) {
            var skill2 = this.player2Cards[i].openingSkill;
            if (skill2) {
                if (Math.random() * 100 < skill2.maxProbability && this.player2Cards[i].canUseSkill()) {
                    this.logger.addMajorEvent({
                        description: this.player2Cards[i].name + " procs " + skill2.name,
                        executorId: this.player2Cards[i].id,
                        skillId: skill2.id
                    });
                    this.executeOpeningSkill(this.player2Cards[i]);
                }
            }
        }
    }
}

interface GameData {
    player1formation: string;
    player2formation: string;
    player1cardsInfo: any[];
    player2cardsInfo: any[];
}
