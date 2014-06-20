/// <reference path="battleLogger.ts"/>
/// <reference path="card.ts"/>
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

    static rangeFactory : RangeFactory;
    logger : BattleLogger;
    
    player1: Player;
    player2: Player;

    playerWon: Player = null;
    
    // the two players' cards. The order of the cards in these two arrays should never be changed
    player1Cards : Card[];
    player2Cards : Card[];
    
    // contains all cards in play. Should be re-sorted every turn
    allCards : Card[];
    
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
        
    constructor(mode?: string) {
    
        if(BattleModel._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        BattleModel._instance = this;
        
        BattleModel.rangeFactory = new RangeFactory();
        this.logger = BattleLogger.getInstance();
        
        var player1formation: string;
        var player2formation: string;
        var player1cardsInfo = [];
        var player2cardsInfo = [];
        
        if ("random" == getURLParameter("mode") || mode == "random") {
            player1formation = pickRandomProperty(Formation.FORMATION_CONFIG);
            player2formation = pickRandomProperty(Formation.FORMATION_CONFIG);
            for (var i = 0; i < 5; i++) {
                player1cardsInfo.push(famDatabase[pickRandomProperty(famDatabase)]);
                player2cardsInfo.push(famDatabase[pickRandomProperty(famDatabase)]);
            }        
        }
        else {
            player1formation = getURLParameter("p1formation");
            player2formation = getURLParameter("p2formation");
            
            for (var i = 0; i < 5; i++) {
                player1cardsInfo.push(famDatabase[getURLParameter("p1fam" + i)]);
                player2cardsInfo.push(famDatabase[getURLParameter("p2fam" + i)]);
            }
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
        }
    
        this.sortAllCards();
        
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
    
    sortAllCards() {
        // sort the cards
        this.allCards.sort(function (a, b) {
            return b.getAGI() - a.getAGI(); // descending based on agi
        });
    }
    
    /**
     * Get the card to the left of a supplied card. Return null if the supplied card is at the leftmost 
     * position in the formation
     */
    getLeftSideCard (card : Card) : Card {
        var playerCards = this.getPlayerCards(card.player);
        var column = card.formationColumn;
        if (column == 0) { // leftmost position
            return null;
        }
        else if (column <= 4 && column >= 1) { // just to be safe
            return playerCards[column - 1];
        }
        else {
            throw new Error("Invalid card index");
        }
    }
    
    /**
     * Get the card to the right of a supplied card. Return null if the supplied card is at the rightmost 
     * position in the formation
     */
    getRightSideCard (card : Card) : Card {
        var playerCards = this.getPlayerCards(card.player);
        var column = card.formationColumn;
        if (column == 4) { // rightmost position
            return null;
        }
        else if (column >= 0 && column <= 3) { // just to be safe
            return playerCards[column + 1];
        }
        else {
            throw new Error("Invalid card index");
        }
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

    /**
     * Get all the cards that belong to a player
     */
    getPlayerCards (player : Player) {
        if (player === this.player1) {
            return this.player1Cards;
        }
        else if (player === this.player2) {
            return this.player2Cards;
        }
        else {
            throw new Error("Invalid player");
        }
    }
    
    getEnemyCards (player : Player) {
        if (player === this.player1) {
            return this.player2Cards;
        }
        else if (player === this.player2) {
            return this.player1Cards;
        }
        else {
            throw new Error("Invalid player");
        }
    }

    getValidSingleTarget (cards : Card[]) {
        var possibleIndices = [];
        for (var i = 0; i < 5; i++) {
            if (!cards[i].isDead) {
                possibleIndices.push(i);
            }
        }

        if (possibleIndices.length === 0) {
            return -1; // no valid index
        }

        // get a random index from the list of possible indices
        var randomIndex = getRandomInt(0, possibleIndices.length - 1); 

        return possibleIndices[randomIndex];
    }
    
    getNearestSingleOpponentTarget (executor : Card) : Card {
        var oppCards : Card[] = this.getPlayerCards(this.getOppositePlayer(executor.player));
        var executorIndex = executor.formationColumn;
        
        var offsetArray = [0, -1, 1, -2, 2, -3, 3, -4, 4];
        
        for (var i = 0; i < offsetArray.length; i++) {
            var currentOppCard = oppCards[executorIndex + offsetArray[i]];
            if (currentOppCard && !currentOppCard.isDead) {
                return currentOppCard;
            }
        }
        
        // if it reaches this point, there's no target, so return null
        return null;
    }

    isAllDeadPlayer (player : Player) {
        if (player === this.player1) {
            return this.isAllDead(this.player1Cards);
        }
        else if (player === this.player2) {
            return this.isAllDead(this.player2Cards);
        }
        else {
            throw new Error("Invalid player");
        }
    }

    isAllDead (cards : Card[]) {
        var isAllDead = true;
        for (var i = 0; i < 5; i++) {
            // assume no null card
            if (!cards[i].isDead) {
                isAllDead = false;
                break;
            }
        }
        return isAllDead;
    }

    executeRandomAttackSkill (executor : Card) {
    	var skill = executor.attackSkill;        
        var numTarget = (<EnemyRandomRange>skill.range).numTarget;
        
        for (var i = 0; i < numTarget && !executor.isDead; i++) {

            var targetIndex = this.getValidSingleTarget(this.oppositePlayerCards);
    
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
        var enemyCards = this.getEnemyCards(attacker.player);
        var protectSkillActivated = false; //<- has any protect skill been activated yet?
        for (var i = 0; i < enemyCards.length && !protectSkillActivated; i++) {
            if (enemyCards[i].isDead) {
                continue;
            }
            var protectSkill = enemyCards[i].protectSkill;
            if (protectSkill) {
                var protector = enemyCards[i];

                // a fam cannot protect itself, unless the skillRange is 21 (hard-coded here for now)
                if (this.isSameCard(targetCard, protector) && protectSkill.skillRange != 21) {
                    continue;
                }

                // if a fam that has been attacked is not allowed to protect (like in the case of AoE), continue
                if (targetsAttacked && targetsAttacked[protector.id]) {
                    continue;
                }

                // now check if the original target is in the protect range of the protector
                var defenseTargets = protectSkill.range.getTargets(protector);
                if (this.isCardInList(targetCard, defenseTargets)) {
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
    
    /**
     * Return true if a card is in a list of cards, or false if not
     */
    isCardInList(card: Card, list: Card[]): boolean {
        var isIn: boolean = false;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == card.id) {
                isIn = true;
                break;
            }
        }
        return isIn;
    }

    isSameCard(card1: Card, card2: Card): boolean {
        return card1.id == card2.id;
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
                
        if (!additionalDescription) {
            additionalDescription = "";
        }
        var description = additionalDescription +
            target.name + " lost " + damage + "hp (remaining " + target.getHP() + "/" + target.originalStats.hp + ")";
        this.logger.addMinorEvent(attacker, target, "HP", (-1) * damage, description);
        if (target.getHP() <= 0) {
            this.logger.displayMinorEvent(target.name + " is dead");
            target.isDead = true;
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
                this.logger.addMinorEvent(executor, targets[i], ENUM.StatusType[thingToBuff], buffAmount, description);
            }
        }
    }

    startBattle () {
        this.logger.startBattleLog();
        
        this.performOpeningSkills();
        this.sortAllCards();

        var finished = false;

        while (!finished) {

            this.logger.currentTurn++;
            this.logger.bblogTurn("Turn " + this.logger.currentTurn);

            // assuming both have 5 cards
            for (var i = 0; i < 10 && !finished; i++) {
                var currentCard = this.allCards[i];
                this.currentPlayer = currentCard.player;
                this.currentPlayerCards = this.getPlayerCards(this.currentPlayer); // cards of the attacking player
                this.oppositePlayer = this.getOppositePlayer(this.currentPlayer);
                this.oppositePlayerCards = this.getPlayerCards(this.oppositePlayer);

                if (!currentCard || currentCard.isDead) {
                    continue;
                }

                // procs active skill if we can
                var attackSkill = currentCard.attackSkill;
                if (attackSkill) {
                    if (Math.random() * 100 <= attackSkill.maxProbability) {
                        this.logger.addMajorEvent(currentCard.name + " procs " + attackSkill.name);
                        if (BattleModel.rangeFactory.isEnemyRandomRange(attackSkill.skillRange)) {
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

                if (this.isAllDead(this.oppositePlayerCards)) {
                    finished = true;
                    this.playerWon = this.currentPlayer;
                    this.logger.addMajorEvent(currentCard.getPlayerName() + " has won");                    
                }
                else if (this.isAllDead(this.currentPlayerCards)) {
                    finished = true;
                    this.playerWon = this.oppositePlayer;
                    this.logger.addMajorEvent(this.oppositePlayer.name + " has won");
                }
            }
        }
        return this.playerWon.name;
    }
    
    executeNormalAttack(attacker: Card) {
        this.logger.addMajorEvent(attacker.name + " attacks!");

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
                if (Math.random() * 100 < skill1.maxProbability) {
                    this.logger.addMajorEvent(this.player1Cards[i].name + " procs " + skill1.name);
                    this.executeOpeningSkill(this.player1Cards[i]);
                }
            }
        }
        
        for (var i = 0; i < this.player2Cards.length; i++) {
            var skill2 = this.player2Cards[i].openingSkill;
            if (skill2) {
                if (Math.random() * 100 < skill2.maxProbability) {
                    this.logger.addMajorEvent(this.player2Cards[i].name + " procs " + skill2.name);
                    this.executeOpeningSkill(this.player2Cards[i]);
                }
            }
        }
    }
}
