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

    static FRIEND_RANDOM_RANGE_TARGET_NUM = {
        101: 1,
        102: 2,
        103: 3,
        104: 4,
        105: 5,
        106: 6,
        111: 1,
        112: 2,
        113: 3,
        114: 4,
        115: 5,
        116: 6,
        121: 1,
        122: 2,
        123: 3,
        124: 4,
        125: 5,
        126: 6,
        131: 1,
        132: 2,
        133: 3,
        134: 4,
        135: 5,
        136: 6
    };

    static INCLUDE_SELF = {
        111: true,
        112: true,
        113: true,
        114: true,
        115: true,
        116: true,
        131: true,
        132: true,
        133: true,
        134: true,
        135: true,
        136: true,

        332: true,
        333: true,
        334: true,
        335: true,
        336: true
    };

    static IS_UNIQUE = {
        121: true,
        122: true,
        123: true,
        124: true,
        125: true,
        126: true,
        131: true,
        132: true,
        133: true,
        134: true,
        135: true,
        136: true
    };
    
    static getRange (id: number, selectDead: boolean = false) {
        var range: BaseRange = null;
        if (this.isEnemyRandomRange(id)) {
            range = this.createEnemyRandomRange(id);
        }
        else if (this.isEnemyNearRange(id)) {
            range = this.createEnemyNearRange(id);
        }
        else if (this.isFriendRandomRange(id)) {
            range = this.createFriendRandomRange(id, selectDead);
        }
        else {
            range = this.createRange(id);            
        }
        return range;
    }

    static isEnemyRandomRange (id) {
        return !!RangeFactory.ENEMY_RANDOM_RANGE_TARGET_NUM[id];
    }

    static isFriendRandomRange (id) {
        return !!RangeFactory.FRIEND_RANDOM_RANGE_TARGET_NUM[id];
    }
    
    static createEnemyRandomRange (id) {
        return new EnemyRandomRange(id, RangeFactory.ENEMY_RANDOM_RANGE_TARGET_NUM[id]);
    }

    static createFriendRandomRange (id: number, selectDead: boolean) {
        return new FriendRandomRange(id, RangeFactory.FRIEND_RANDOM_RANGE_TARGET_NUM[id], selectDead);
    }
    
    static isEnemyNearRange (id) {
        return !!RangeFactory.ENEMY_NEAR_RANGE_TARGET_NUM[id];
    }
    
    static createEnemyNearRange (id) {
        return new EnemyNearRange(id, RangeFactory.ENEMY_NEAR_RANGE_TARGET_NUM[id]);
    }

    static canBeAoeRange(rangeId: number): boolean {
        var canBe = false;
        
        if (this.isEnemyNearRange(rangeId) || rangeId == 8) {
            canBe = true;    
        }

        return canBe;    
    }
    
    static createRange (id) {
        switch (id) {
            case 1:
                return new EitherSideRange(id); // either side, but not both
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
            case 28:
                return new RightRange(id);
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

    getBaseTargets(condFunc: (x: Card) => boolean): Card[] {
        var allCards = CardManager.getInstance().getAllCards();
        var baseTargets = [];
        for (var i = 0; i < allCards.length; i++) {
            if (condFunc(allCards[i])) {
                baseTargets.push(allCards[i]);
            }
        }
        return baseTargets;
    }

    getRandomCard(cards: Card[]): Card {
        return getRandomElement(cards);
    }

    // returns a maximum of 'num' unique cards (shuffles and returns first n)
    getRandomUniqueCards(cards: Card[], num: number) {
        var len = cards.length;
        while (len) {
            var a = Math.floor(Math.random() * len);
            var b = cards[--len];
            cards[len] = cards[a];
            cards[a] = b;
        }
        return cards.slice(0, num);
    }
}

class EnemyRandomRange extends BaseRange {

    numTarget : number;
    
    constructor(id : number, numTarget : number) {
        super(id);
        this.numTarget = numTarget;    
    }   
}

class EitherSideRange extends BaseRange {
    constructor(id : number) {
        super(id);
    }
    
    getTargets(executor : Card) : Card[] {
        var targets = [];
        
        var leftCard : Card = CardManager.getInstance().getLeftSideCard(executor);
        var rightCard : Card = CardManager.getInstance().getRightSideCard(executor);

        if (leftCard && !leftCard.isDead && (!rightCard || rightCard.isDead)) {
            targets.push(leftCard);
        }
        else if (rightCard && !rightCard.isDead && (!leftCard || leftCard.isDead)) {
            targets.push(rightCard);
        }
        else if (rightCard && !rightCard.isDead && leftCard && !leftCard.isDead) {
            if (Math.random() <= 0.5) {
                targets.push(leftCard);
            }
            else {
                targets.push(rightCard);
            }
        }
        
        return targets;
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

class RightRange extends BaseRange {
    constructor(id : number) {
        super(id);
    }
    
    getTargets(executor : Card) : Card[] {
        var targets = [];
        var partyCards = CardManager.getInstance().getPlayerCards(executor.player);
        
        for (var i = executor.formationColumn + 1; i < 5; i++) {
            if (!partyCards[i].isDead) {
                targets.push(partyCards[i]);
            }
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

class FriendRandomRange extends BaseRange {
    numTargets: number;
    selectDead: boolean;
    isUnique: boolean;

    constructor(id: number, numTargets: number, selectDead: boolean) {
        super(id);
        this.numTargets = numTargets;
        this.selectDead = selectDead;
        this.isUnique = RangeFactory.FRIEND_RANDOM_RANGE_TARGET_NUM[id];
    }
    
    getTargets (executor : Card) : Card[]{
        var baseTargets: Card[] = this.getBaseTargets(this.getCondFunc(executor));
        var targets: Card[];

        if (baseTargets.length) {

            if (this.isUnique) {
                targets = this.getRandomUniqueCards(baseTargets, this.numTargets);
            } 
            else {
                for (var i = 0; i < this.numTargets; i++) {
                    targets.push(this.getRandomCard(baseTargets));
                }
            }
        }
        return targets;
    }

    getCondFunc(executor: Card): (x: Card)=>boolean {
        var selectDead = this.selectDead;

        return function (card: Card) {
            var isValid = true;

            if (card.getPlayerId() != executor.getPlayerId())
                return false;

            if (card.id === executor.id && !RangeFactory.INCLUDE_SELF)
                return false;

            if (selectDead && !card.isDead)
                return false;

            return isValid;
        };
    }
}

