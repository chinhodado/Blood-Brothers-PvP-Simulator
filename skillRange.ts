"use strict";

class RangeFactory {

    static RANGE_TYPE = {

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
            throw new Error("invalid rangeId : " + id + " or not implemented");
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
        return RangeFactory.RANGE_TYPE[id];
    }
}

class BaseRange {
   
    id : number;
    
    constructor(id : number) {
        this.id = id;    
    } 
}

// EnemyRandomRange
class EnemyRandomRange extends BaseRange {

    numTarget : number;
    
    constructor(id : number, numTarget : number) {
        super(id);
        this.numTarget = numTarget;    
    }   
}


