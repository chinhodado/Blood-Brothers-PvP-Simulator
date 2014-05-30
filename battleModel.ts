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
        
        this.player1 = new Player(1, "Desna team", new Formation(55), 1); // me
        this.player2 = new Player(2, "Balgo & Ghis team", new Formation(55), 1); // opp
        
        // initialize the cards
        this.player1Cards = [];
        this.player2Cards = [];
        this.allCards = [];
        
        for (var i = 0; i < 5; i++) {

            var player1Skills = this.makeSkillArray(groupA[i].skills);
            var player2Skills = this.makeSkillArray(groupB[i].skills);
            
            var stats1 = new Stats(groupA[i].hp, groupA[i].atk, groupA[i].def, groupA[i].wis, groupA[i].agi);
            var stats2 = new Stats(groupB[i].hp, groupB[i].atk, groupB[i].def, groupB[i].wis, groupB[i].agi);
            
            this.player1Cards[i] = new Card(groupA[i].name,
                                        stats1, 
                                        player1Skills, 
                                        this.player1,
                                        i); //my cards
            this.player2Cards[i] = new Card(groupB[i].name, 
                                        stats2,
                                        player2Skills, 
                                        this.player2,
                                        i); // opp card
            this.allCards.push(this.player1Cards[i]);
            this.allCards.push(this.player2Cards[i]);
        }
    
        // sort the cards
        this.allCards.sort(function (a, b) {
            return b.stats.agi - a.stats.agi; // descending based on agi
        });
        
        // save the initial field snapshot
        this.logger.saveInitialField();
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
    
            var baseDamage = this.getATKDamage(executor, targetCard, false);
            var damage = Math.round(skillMod * baseDamage);
    
            targetCard.stats.hp -= damage;
            
            this.logger.bblogMinor(targetCard.name + " lost " + damage + "hp (remaining " + targetCard.stats.hp + "/" + targetCard.originalStats.hp + ")");
            this.logger.addEvent(targetCard, ENUM.StatType.HP, (-1) * damage);
            if (targetCard.stats.hp <= 0) {
                this.logger.bblogMinor(targetCard.name + " is dead");
                targetCard.isDead = true;
            }
        }
    }
    
    executeOpeningSkill (executor : Card) {
        var skill = executor.openingSkill;
        var basedOnStatType = ENUM.SkillCalcType[skill.skillCalcType];
        var skillMod = skill.skillFuncArg1;
        var statToBuff = ENUM.StatusType[skill.skillFuncArg2];        
        var targets : Card[] = skill.range.getTargets(executor);
        var buffAmount = Math.round(skillMod * executor.getStat(basedOnStatType));

        for (var i = 0; i < targets.length; i++) {
            targets[i].addStat(statToBuff, buffAmount);
            this.logger.bblogMinor(targets[i].name + "'s " + statToBuff + " increased by " + buffAmount);
            
            // there's an enum mismatch here...
            this.logger.addEvent(targets[i], ENUM.StatType[statToBuff], buffAmount);
        }
    }

    startBattle () {
        this.performOpeningSkills();

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
                    this.logger.bblogMajor("player " + currentCard.getPlayerName() + " has won");
                }
            }
        }        
    }
    
    executeNormalAttack (attacker : Card) {
        var targetIndex = this.getValidSingleTarget(this.oppositePlayerCards);

        if (targetIndex == -1) {
            // no valid target, miss a turn, continue to next card
            return;
        }

        var targetCard = this.oppositePlayerCards[targetIndex];

        var damage = this.getATKDamage(attacker, targetCard, false);

        targetCard.stats.hp -= damage;
        this.logger.bblogMajor(attacker.name + " attacks " + targetCard.name);
        this.logger.bblogMinor(targetCard.name + " lost " + damage + "hp (remaining " + targetCard.stats.hp + "/" + targetCard.originalStats.hp + ")");
        this.logger.addEvent(targetCard, ENUM.StatType.HP, damage * (-1));
        
        if (targetCard.stats.hp <= 0) {
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
    
    getATKDamage(attacker : Card, defender : Card, ignorePosition : boolean) {
            var ATTACK_FACTOR = 0.3;
            var DIFF_FACTOR = 0.2;
        
            var POS_ATTACK_FACTOR = {
                1: 0.8,
                2: 1,
                3: 1.2
            };
            
            var POS_DAMAGE_FACTOR = {
                1: 0.8,
                2: 1,
                3: 1.2
            };
        
            var baseDamage = attacker.stats.atk * ATTACK_FACTOR;
            var damage = ((attacker.stats.atk - defender.stats.def) * DIFF_FACTOR) + baseDamage;
        
            if (!ignorePosition) {
                damage *= POS_ATTACK_FACTOR[attacker.getFormationRow()];
                damage *= POS_DAMAGE_FACTOR[defender.getFormationRow()];
            }
        
            //set lower limit
            if (damage < baseDamage * 0.1) {
                damage = baseDamage * 0.1;
            }
        
            damage = Math.floor(damage * getRandomArbitary(0.9, 1.1));
        
            return damage;
    }
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

