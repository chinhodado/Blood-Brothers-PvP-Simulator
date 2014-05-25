"use strict";

class BattleModel {

    eventCounter : number = 0;
    currentTurn : number = 0;
    player1 : Player;
    player2 : Player;
    
    myCards : Card[];
    oppCards : Card[];
    allCards : Card[];
    
    constructor() {
        this.player1 = new Player(0, "Desna team", null, 1); // me
        this.player2 = new Player(1, "Balgo team", null, 1); // opp
        
        // initialize the cards
        this.myCards = [];
        this.oppCards = [];
        this.allCards = [];
        
        for (var i = 0; i < 5; i++) {
            var skill1 : Skill = new Skill(groupA[i].skillId);
            var skill2 : Skill = new Skill(groupB[i].skillId);
            
            this.myCards[i] = new Card(groupA[i].name,
                                        new Stats(groupA[i].hp, groupA[i].atk, groupA[i].def, groupA[i].wis, groupA[i].agi), 
                                        [null, skill1, null], 
                                        this.player1); //my cards
            this.oppCards[i] = new Card(groupB[i].name, 
                                        new Stats(groupB[i].hp, groupB[i].atk, groupB[i].def, groupB[i].wis, groupB[i].agi),
                                        [null, skill2, null], 
                                        this.player2); // opp card
            this.allCards.push(this.myCards[i]);
            this.allCards.push(this.oppCards[i]);
        }
    
        // sort the cards
        this.allCards.sort(function (a, b) {
            return b.stats.agi - a.stats.agi; // descending based on agi
        });    
    }


    getCurrentDebugInfo () {
//        var info = "";
//        info = info + "Player " + this.player1.name + "'s cards: \n";
//        for (var i = 0; i < 5; i++) {
//            info += this.myCards[i].name;
//        }
    }

    getPlayerCards (playerId : number) {
        if (playerId === 0) {
            return this.myCards;
        }
        else if (playerId == 1) {
            return this.oppCards;
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

    isAllDeadPlayer (playerId : number) {
        if (playerId === 0) {
            return this.isAllDead(this.myCards);
        }
        else if (playerId == 1) {
            return this.isAllDead(this.oppCards);
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
    	var skill = executor.skills[1];
        var skillMod = skill.skillFuncArg1;
        var numTarget = (<EnemyRandomRange>skill.range).numTarget;
        var opposingCards = this.getPlayerCards(1 - executor.getPlayerId());
        
        for (var i = 0; i < numTarget; i++) {

            var targetIndex = this.getValidSingleTarget(opposingCards);
    
            if (targetIndex == -1) {
                // no valid target, miss a turn, continue to next card
                return;
            }
    
            var targetCard = opposingCards[targetIndex];
    
            var baseDamage = getATKDamage(executor, targetCard, false);
            var damage = skillMod * baseDamage;
    
            targetCard.stats.hp -= damage;
            
            this.bblogMinor(targetCard.name + " lost " + damage + "hp (remaining " + targetCard.stats.hp + "/" + targetCard.originalStats.hp + ")");
    
            if (targetCard.stats.hp <= 0) {
                this.bblogMinor(targetCard.name + " is dead");
                targetCard.isDead = true;
            }
        }
    }

    startBattle () {
        this.performOpeningSkills();

        var finished = false;

        while (!finished) {

            this.currentTurn++;
            bblogMajor("Turn " + this.currentTurn);

            // assuming both have 5 cards
            for (var i = 0; i < 10 && !finished; i++) {
                var currentCard = this.allCards[i];

                if (!currentCard || currentCard.isDead) {
                    continue;
                }

                var currentCards = this.getPlayerCards(currentCard.getPlayerId()); // cards of the attacking player
                var opposingCards = this.getPlayerCards(1 - currentCard.getPlayerId());

                // procs active skill if we can
                if (Math.random() <= 0.3) {
                    var skillName = currentCard.skills[1].name;
                    this.bblog(currentCard.name + " procs " + skillName);

                    this.executeActiveSkill(currentCard);
                }
                else {
                    // TODO: move to a separate attack function
                    var targetIndex = this.getValidSingleTarget(opposingCards);

                    if (targetIndex == -1) {
                        // no valid target, miss a turn, continue to next card
                        continue;
                    }

                    var targetCard = opposingCards[targetIndex];

                    var damage = getATKDamage(currentCard, targetCard, false);

                    targetCard.stats.hp -= damage;
                    this.bblog(currentCard.name + " attacks " + targetCard.name);
                    this.bblogMinor(targetCard.name + " lost " + damage + "hp (remaining " + targetCard.stats.hp + "/" + targetCard.originalStats.hp + ")");

                    if (targetCard.stats.hp <= 0) {
                        this.bblogMinor(targetCard.name + " is dead");
                        targetCard.isDead = true;
                    }
                }


                if (this.isAllDead(opposingCards)) {
                    finished = true;
                    this.bblog("player " + currentCard.getPlayerName() + " has won");
                }
            }
        }
    }

    performOpeningSkills () {
        this.bblog("my opening skills performed");
        this.bblog("opp opening skills performed");
    }

    bblog (data) {
        var id = "turn" + this.currentTurn + "events";
        var battleEventDiv = document.getElementById("battleEventDiv");
        var turnEventList = document.getElementById(id);
        
        // if not already exist, create it
        if (!turnEventList) {
            turnEventList = document.createElement("ul");
            turnEventList.setAttribute("id", id);
            battleEventDiv.appendChild(turnEventList);
        }

        var newEvent = document.createElement("li");
        newEvent.innerHTML = "<a>" + data + "</a>";
        newEvent.setAttribute("tabindex", this.eventCounter + "");
        turnEventList.appendChild(newEvent);
        this.eventCounter++;
    }

    /**
     * Use this to log a sub-event in a card's turn, like a single hit in a multi-hit skill, or if the target fam is dead
     * @param data Data to log
     */
    bblogMinor (data) {
        var id = "turn" + this.currentTurn + "events";
        
        // the list of events of this turn
        // assume that it has already been created
        var turnEventList = document.getElementById(id);

        // the last "major" event that occurred in this turn, like when a fam procs
        var lastEvent : any = turnEventList.lastChild;
        console.log(lastEvent);

        // the sub event list
        var subEventList = lastEvent.getElementsByClassName("ul").lastChild;
        
        // if not already exist, create it
        if (!subEventList) {
            subEventList = document.createElement("ul");
            // TODO: maybe give it an id
            lastEvent.appendChild(subEventList);
        }

        // new list item for the sub event, and append it to the sub event list
        var newEvent = document.createElement("li");
        newEvent.innerHTML = "<a>" + data + "</a>";
        newEvent.setAttribute("tabindex", this.eventCounter + "");
        subEventList.appendChild(newEvent);
        this.eventCounter++;
    }
}

function bblogMajor(data) {
    var battleEventDiv = document.getElementById("battleEventDiv");
    var newEvent = document.createElement("p");
    newEvent.innerHTML = data;
    battleEventDiv.appendChild(newEvent);
}

function getATKDamage(attacker, defender, ignorePosition) {
    var ATTACK_FACTOR = 0.3;
    var DIFF_FACTOR = 0.2;

    // $_POS_ATTACK_FACTOR: {
    //     1: 1.2,
    //     2: 1,
    //     3: 0.8
    // },
    // $_POS_DAMAGE_FACTOR: {
    //     1: 1.2,
    //     2: 1,
    //     3: 0.8
    // },

    var baseDamage = attacker.stats.atk * ATTACK_FACTOR;
    var damage = ((attacker.stats.atk - defender.stats.def) * DIFF_FACTOR) + baseDamage;

    // if (!ignorePosition) {
    //     damage *= this._POS_ATTACK_FACTOR[caster.getOrder()];
    //     damage *= this._POS_DAMAGE_FACTOR[target.getOrder()];
    // }

    //set lower limit
    if (damage < baseDamage * 0.1) {
        damage = baseDamage * 0.1;
    }

    damage = Math.floor(damage * getRandomArbitary(0.9, 1.1));

    return damage;
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

