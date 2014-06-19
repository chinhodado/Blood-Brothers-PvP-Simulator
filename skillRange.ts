/// <reference path="battleLogger.ts"/>
/// <reference path="battleModel.ts"/>
/// <reference path="card.ts"/>
/// <reference path="enums.ts"/>
/// <reference path="famDatabase.ts"/>
/// <reference path="formation.ts"/>
/// <reference path="player.ts"/>
/// <reference path="skill.ts"/>
/// <reference path="skillCalcType.ts"/>
/// <reference path="skillDatabase.ts"/>
/// <reference path="util.ts"/>

class RangeFactory {

    static RANGE_TYPE = {
        
        2 : "BothSidesRange",
        3 : "SelfBothSidesRange",
        4 : "AllRange",
        
        5 : "EnemyNearRange",
        6 : "EnemyNearRange",
        7 : "EnemyNearRange",
        
        8 : "EnemyAllRange",
        
        16: "EnemyRandomRange",
        17: "EnemyRandomRange",

        19: "EnemyRandomRange",
        20: "EnemyRandomRange",
        21: "SelfRange",

        23: "EnemyRandomRange",
        
        32 : "EnemyNearRange",
        33 : "EnemyNearRange",
    };

    static ENEMY_RANDOM_RANGE_TARGET_NUM = {
        16: 3,
        17: 6,
        19: 4,
        20: 5,
        23: 2
    };
    
    static ENEMY_NEAR_RANGE_TARGET_NUM = {
         5: 1,
         6: 2,
         7: 3,
        32: 4,
        33: 5
    };
    
    getRange (id) {
        var range = null;
        if (this.isEnemyRandomRange(id)) {
            range = this.createEnemyRandomRange(id);
        }
        else if (this.isEnemyNearRange(id)) {
            range = this.createEnemyNearRange(id);
        }
        else {
            range = this.createRange(id);            
        }
        return range;
    }

    isEnemyRandomRange (id) {
        return !!RangeFactory.ENEMY_RANDOM_RANGE_TARGET_NUM[id];
    }
    
    createEnemyRandomRange (id) {
        var rangeClass = this.getRangeClass(id);
        return new window[rangeClass](id, RangeFactory.ENEMY_RANDOM_RANGE_TARGET_NUM[id]); 
    }
    
    isEnemyNearRange (id) {
        return !!RangeFactory.ENEMY_NEAR_RANGE_TARGET_NUM[id];
    }
    
    createEnemyNearRange (id) {
        var rangeClass = this.getRangeClass(id);
        return new window[rangeClass](id, RangeFactory.ENEMY_NEAR_RANGE_TARGET_NUM[id]); 
    }
    
    getRangeClass (id) {
        var rangeClass = RangeFactory.RANGE_TYPE[id];
        
        if (!rangeClass) {
            throw new Error("invalid rangeId : " + id + " or not implemented");
        }
        
        return RangeFactory.RANGE_TYPE[id];
    }
    
    createRange (id) {
        var rangeClass = this.getRangeClass(id);
        return new window[rangeClass](id);
    }
}

class BaseRange {
   
    id : number;
    
    constructor(id : number) {
        this.id = id;
    }
    
    getTargets(executor : Card) : Card[] {
        // to be overrridden
        return null;
    }
}

class EnemyRandomRange extends BaseRange {

    numTarget : number;
    
    constructor(id : number, numTarget : number) {
        super(id);
        this.numTarget = numTarget;    
    }   
}

class BothSidesRange extends BaseRange {
    constructor(id : number) {
        super(id);
    }
    
    getTargets(executor : Card) : Card[] {
        var targets = [];
        
        var leftCard : Card = BattleModel.getInstance().getLeftSideCard(executor);
        if (leftCard && !leftCard.isDead) {
            targets.push(leftCard);
        }
        
        var rightCard : Card = BattleModel.getInstance().getRightSideCard(executor);
        if (rightCard && !rightCard.isDead) {
            targets.push(rightCard);
        }
        
        return targets;
    }
}

class SelfRange extends BaseRange {
    constructor(id: number) {
        super(id);
    }

    getTargets(executor: Card): Card[] {
        var targets = [];

        if (!executor.isDead) { // should always be true
            targets.push(executor);
        }

        return targets;
    }
}

class SelfBothSidesRange extends BaseRange {
    
    constructor(id : number) {
        super(id);
    }
    
    getTargets(executor : Card) : Card[] {
        var targets = [];
        
        if (!executor.isDead) { // should always be true
            targets.push(executor);
        }
        
        var leftCard : Card = BattleModel.getInstance().getLeftSideCard(executor);
        if (leftCard && !leftCard.isDead) {
            targets.push(leftCard);
        }
        
        var rightCard : Card = BattleModel.getInstance().getRightSideCard(executor);
        if (rightCard && !rightCard.isDead) {
            targets.push(rightCard);
        }
        
        return targets;
    }
}

class AllRange extends BaseRange {
    constructor(id : number) {
        super(id);
    }
    
    getTargets(executor : Card) : Card[] {
        var targets = [];
        var partyCards = BattleModel.getInstance().getPlayerCards(executor.player);
        
        for (var i = 0; i < partyCards.length; i++) {
            if (!partyCards[i].isDead) {
                targets.push(partyCards[i]);
            }
        }
        return targets;
    }
}

class EnemyNearRange extends BaseRange {
    static MAX_DISTANCE_FROM_CENTER = {
        1 : 1,
        2 : 1,
        3 : 1,
        4 : 2,
        5 : 2
    }
    
    // specific to an instance, the max distance from the center enemy
    maxDistance : number;
            
    constructor(id : number, public numTarget) {
        super(id);
        this.maxDistance = EnemyNearRange.MAX_DISTANCE_FROM_CENTER[numTarget];
    }
    
    getTargets (executor : Card) : Card[] {
        // get center enemy
        var centerEnemy = BattleModel.getInstance().getNearestSingleOpponentTarget(executor);
        var enemyCards = BattleModel.getInstance().getEnemyCards(executor.player);
        
        // only upto 2 and not 4 since the max distance is 2 anyway
        var offsetArray = [0, -1, 1, -2, 2];
        var targets = [];
        var targetCount = 0;
        
        // starting from the center enemy, go around it, adding targets when possible
        for (var i = 0; i < offsetArray.length; i++) {
            if (targetCount >= this.numTarget || Math.abs(offsetArray[i]) > this.maxDistance) {
                break;
            }
            var currentEnemyIndex = centerEnemy.formationColumn + offsetArray[i];
            var currentEnemyCard = enemyCards[currentEnemyIndex];
            if (currentEnemyCard && !currentEnemyCard.isDead) {
                targetCount++;
                targets.push(enemyCards[currentEnemyIndex]);
            }
        }

        return targets;
    }
}

class EnemyAllRange extends BaseRange {
    constructor(id: number) {
        super(id);
    }
    
    getTargets (executor : Card) : Card[]{
        var enemyCards = BattleModel.getInstance().getEnemyCards(executor.player);
        var targets = [];
        for (var i = 0; i < enemyCards.length; i++) {
            var currentEnemyCard = enemyCards[i];
            if (currentEnemyCard && !currentEnemyCard.isDead) {
                targets.push(currentEnemyCard);
            }
        }
        return targets
    }
}


