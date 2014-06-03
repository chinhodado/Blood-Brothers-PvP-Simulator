"use strict";

class BattleModel {

    static rangeFactory : RangeFactory;
    logger : BattleLogger;
    
    player1 : Player;
    player2 : Player;
    
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
        
    constructor() {
    
        if(BattleModel._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        BattleModel._instance = this;
        
        BattleModel.rangeFactory = new RangeFactory();
        this.logger = new BattleLogger();
        
        var player1formation = getURLParameter("p1formation");
        var player2formation = getURLParameter("p2formation");
        this.player1 = new Player(1, "Player 1", new Formation(player1formation), 1); // me
        this.player2 = new Player(2, "Player 2", new Formation(player2formation), 1); // opp
        
        // initialize the cards
        this.player1Cards = [];
        this.player2Cards = [];
        this.allCards = [];
        
        var player1cardsInfo = [];
        for (var i = 0; i < 5; i++) {
            player1cardsInfo.push(famDatabase[getURLParameter("p1fam" + i)]);
        }
        
        var player2cardsInfo = [];
        for (var i = 0; i < 5; i++) {
            player2cardsInfo.push(famDatabase[getURLParameter("p2fam" + i)]);
        }
        
        for (var i = 0; i < 5; i++) {
            var player1Skills = this.makeSkillArray(player1cardsInfo[i].skills);
            var player2Skills = this.makeSkillArray(player2cardsInfo[i].skills);
            
            var stats1 = new Stats(player1cardsInfo[i].hp, player1cardsInfo[i].atk, 
                player1cardsInfo[i].def, player1cardsInfo[i].wis, player1cardsInfo[i].agi);
            var stats2 = new Stats(player2cardsInfo[i].hp, player2cardsInfo[i].atk, 
                player2cardsInfo[i].def, player2cardsInfo[i].wis, player2cardsInfo[i].agi);
            
            this.player1Cards[i] = new Card(player1cardsInfo[i].name,
                                        stats1, 
                                        player1Skills, 
                                        this.player1,
                                        i,
                                        player1cardsInfo[i].imageLink); //my cards
            this.player2Cards[i] = new Card(player2cardsInfo[i].name, 
                                        stats2,
                                        player2Skills, 
                                        this.player2,
                                        i,
                                        player2cardsInfo[i].imageLink); // opp card
            this.allCards.push(this.player1Cards[i]);
            this.allCards.push(this.player2Cards[i]);
        }
    
        this.sortAllCards();
        
        // save the initial field snapshot
        this.logger.saveInitialField();
        
        this.logger.displayFormationAndFamOnCanvas();
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
        if (oppCards[executorIndex] && !oppCards[executorIndex].isDead) {
            return oppCards[executorIndex];
        }
        else if (oppCards[executorIndex - 1] && !oppCards[executorIndex - 1].isDead) {
            return oppCards[executorIndex - 1];
        }
        else if (oppCards[executorIndex + 1] && !oppCards[executorIndex + 1].isDead) {
            return oppCards[executorIndex + 1];
        }
        else if (oppCards[executorIndex - 2] && !oppCards[executorIndex - 2].isDead) {
            return oppCards[executorIndex - 2];
        }
        else if (oppCards[executorIndex + 2] && !oppCards[executorIndex + 2].isDead) {
            return oppCards[executorIndex + 2];
        }
        else if (oppCards[executorIndex - 3] && !oppCards[executorIndex - 3].isDead) {
            return oppCards[executorIndex -3];
        }
        else if (oppCards[executorIndex + 3] && !oppCards[executorIndex + 3].isDead) {
            return oppCards[executorIndex + 3];
        }
        else if (oppCards[executorIndex - 4] && !oppCards[executorIndex - 4].isDead) {
            return oppCards[executorIndex - 4];
        }
        else if (oppCards[executorIndex + 4] && !oppCards[executorIndex + 4].isDead) {
            return oppCards[executorIndex + 4];
        }
        else {
            return null;
        }
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

    executeActiveSkill (executor : Card) {
    	var skill = executor.attackSkill;
        var skillMod = skill.skillFuncArg1;
        var numTarget = (<EnemyRandomRange>skill.range).numTarget;
        
        for (var i = 0; i < numTarget; i++) {

            var targetIndex = this.getValidSingleTarget(this.oppositePlayerCards);
    
            if (targetIndex == -1) {
                // no valid target, miss a turn, continue to next card
                return;
            }
    
            var targetCard = this.oppositePlayerCards[targetIndex];
            var ignorePosition = (skill.skillFunc == ENUM.SkillFunc.MAGIC);
    
            var baseDamage : number;
            
            switch (skill.skillCalcType) {
                case (ENUM.SkillCalcType.DEFAULT) :
                case (ENUM.SkillCalcType.WIS) :
                    baseDamage = getDamageCalculatedByWIS(executor, targetCard);
                    break;
                case (ENUM.SkillCalcType.ATK) :
                    baseDamage = getDamageCalculatedByATK(executor, targetCard, ignorePosition);
                    break;
                case (ENUM.SkillCalcType.AGI) :
                    baseDamage = getDamageCalculatedByAGI(executor, targetCard, ignorePosition);
                    break;
            }
            
            // apply the multiplier
            var damage = skillMod * baseDamage;
            
            // apply the target's ward
            switch (skill.ward) {
                case ("PHYSICAL") :
                    damage = Math.round(damage * (1 - targetCard.status.attackResistance));
                    break;
                case ("MAGICAL") :
                    damage = Math.round(damage * (1 - targetCard.status.magicResistance));
                    break;
                case ("BREATH") :
                    damage = Math.round(damage * (1 - targetCard.status.breathResistance));
                    break;
                default :
                    throw new Error ("Wrong type of ward. Maybe you forgot to include in the skill?");
            }
    
            targetCard.changeHP(-1 * damage);
            
            this.logger.bblogMinor(targetCard.name + " lost " + damage + "hp (remaining " + 
                targetCard.getHP() + "/" + targetCard.originalStats.hp + ")");
            this.logger.addEvent(executor, targetCard, "HP", (-1) * damage);
            if (targetCard.getHP() <= 0) {
                this.logger.bblogMinor(targetCard.name + " is dead");
                targetCard.isDead = true;
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
                this.logger.bblogMinor(targets[i].name + "'s " + ENUM.StatusType[thingToBuff] + " increased by " + buffAmount);
                
                this.logger.addEvent(executor, targets[i], ENUM.StatusType[thingToBuff], buffAmount);
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
                        this.logger.bblogMajor(currentCard.name + " procs " + attackSkill.name);    
                        this.executeActiveSkill(currentCard);
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
                    this.logger.bblogMajor(currentCard.getPlayerName() + " has won");
                }
            }
        }        
    }
    
    executeNormalAttack (attacker : Card) {
        
        var targetCard = this.getNearestSingleOpponentTarget(attacker);

        if (targetCard == null) {
            // no valid target, miss a turn, continue to next card
            return;
        }

        var damage = getDamageCalculatedByATK(attacker, targetCard, false);
        damage = Math.round(damage * (1 - targetCard.status.attackResistance)); // apply physical ward

        targetCard.changeHP(-1 * damage);
        this.logger.bblogMajor(attacker.name + " attacks " + targetCard.name);
        this.logger.bblogMinor(targetCard.name + " lost " + damage + "hp (remaining " + 
            targetCard.getHP() + "/" + targetCard.originalStats.hp + ")");
        this.logger.addEvent(attacker, targetCard, "HP", damage * (-1));
        
        if (targetCard.getHP() <= 0) {
            // maybe we also need to log an event
            this.logger.bblogMinor(targetCard.name + " is dead");
            targetCard.isDead = true;
        }
    }

    performOpeningSkills () {
        for (var i = 0; i < this.player1Cards.length; i++) {
            var skill1 = this.player1Cards[i].openingSkill;
            if (skill1) {
                if (Math.random() * 100 < skill1.maxProbability) {
                    this.logger.bblogMajor(this.player1Cards[i].name + " procs " + skill1.name);
                    this.executeOpeningSkill(this.player1Cards[i]);
                }
            }
        }
        
        for (var i = 0; i < this.player2Cards.length; i++) {
            var skill2 = this.player2Cards[i].openingSkill;
            if (skill2) {
                if (Math.random() * 100 < skill2.maxProbability) {
                    this.logger.bblogMajor(this.player2Cards[i].name + " procs " + skill2.name);
                    this.executeOpeningSkill(this.player2Cards[i]);
                }
            }
        }
    }
}
