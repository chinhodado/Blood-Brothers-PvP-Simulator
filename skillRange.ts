"use strict";

class RangeFactory {

    static RANGE_TYPE = {
        3 : "SelfBothSidesRange",
        16: "EnemyRandomRange",
        17: "EnemyRandomRange",

        19: "EnemyRandomRange",
        20: "EnemyRandomRange",

        23: "EnemyRandomRange",
    };

    static ENEMY_RANDOM_RANGE_TARGET_NUM = {
        16: 3,
        17: 6,
        19: 4,
        20: 5,
        23: 2
    };
    
    getRange (id) {
        var range = null;
        if (this.isEnemyRandomRange(id)) {
            range = this.createEnemyRandomRange(id);
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


