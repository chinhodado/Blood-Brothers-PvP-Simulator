class RangeFactory {

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
    
    static getRange (id) {
        var range: BaseRange = null;
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

    static isEnemyRandomRange (id) {
        return !!RangeFactory.ENEMY_RANDOM_RANGE_TARGET_NUM[id];
    }
    
    static createEnemyRandomRange (id) {
        return new EnemyRandomRange(id, RangeFactory.ENEMY_RANDOM_RANGE_TARGET_NUM[id]);
    }
    
    static isEnemyNearRange (id) {
        return !!RangeFactory.ENEMY_NEAR_RANGE_TARGET_NUM[id];
    }
    
    static createEnemyNearRange (id) {
        return new EnemyNearRange(id, RangeFactory.ENEMY_NEAR_RANGE_TARGET_NUM[id]);
    }
    
    static createRange (id) {
        switch (id) {
            case 2 :
                return new BothSidesRange(id);
            case 3 :
                return new SelfBothSidesRange(id);
            case 4 :
                return new AllRange(id);
            case 8 :
                return new EnemyAllRange(id);
            case 21:
                return new SelfRange(id);
            default:
                throw new Error("Invalid range or not implemented");
        }
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
        
        var leftCard : Card = CardManager.getInstance().getLeftSideCard(executor);
        if (leftCard && !leftCard.isDead) {
            targets.push(leftCard);
        }
        
        var rightCard : Card = CardManager.getInstance().getRightSideCard(executor);
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
        
        var leftCard : Card = CardManager.getInstance().getLeftSideCard(executor);
        if (leftCard && !leftCard.isDead) {
            targets.push(leftCard);
        }
        
        var rightCard : Card = CardManager.getInstance().getRightSideCard(executor);
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
        var partyCards = CardManager.getInstance().getPlayerCards(executor.player);
        
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
    };
    
    // specific to an instance, the max distance from the center enemy
    maxDistance : number;
            
    constructor(id : number, public numTarget) {
        super(id);
        this.maxDistance = EnemyNearRange.MAX_DISTANCE_FROM_CENTER[numTarget];
    }
    
    getTargets (executor : Card) : Card[] {
        // get center enemy
        var centerEnemy = CardManager.getInstance().getNearestSingleOpponentTarget(executor);
        var enemyCards = CardManager.getInstance().getEnemyCards(executor.player);
        
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
        var enemyCards = CardManager.getInstance().getEnemyCards(executor.player);
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


