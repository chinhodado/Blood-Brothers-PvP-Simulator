class RangeFactory {
    static ENEMY_RANDOM_RANGE_TARGET_NUM = {
        16: 3,
        17: 6,
        19: 4,
        20: 5,
        23: 2
    };

    static ENEMY_VARYING_RANDOM_RANGE_TARGET_NUM = {
        419: 4
    };

    static ENEMY_ROW_RANDOM_RANGE_TARGET_NUM = {
        18: 3,
        38: 2,
        39: 4,
        40: 5,
        41: 6,
        42: 2,
        43: 3,
        44: 4,
        45: 5,
        46: 6,
        47: 2,
        48: 3,
        49: 4,
        50: 5,
        51: 6,
        52: 2,
        53: 3,
        54: 4,
        55: 5,
        56: 6
    };

    static ENEMY_NEAR_SCALED_RANGE_TARGET_NUM = {
        312: 2,
        313: 3,
        314: 4,
        315: 5
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
        136: 6,
        142: 2,
        143: 3,
        144: 4,
        145: 5,
        153: 3,
        154: 4,
        155: 5,
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

        142: true,
        143: true,
        144: true,
        145: true,
        153: true,
        154: true,
        155: true,

        332: true,
        333: true,
        334: true,
        335: true,
        336: true,

        511:true,
        512:true,
        513:true,
        514:true,
        515:true,
        516:true,

        542: true,
        543: true,
        544: true,
        545: true,
    };

    static FORCED_SELF = {
        142: true,
        143: true,
        144: true,
        145: true,
        153: true,
        154: true,
        155: true,

        542: true,
        543: true,
        544: true,
        545: true,
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
        136: true,
        153: true,
        154: true,
        155: true,
    };

    static ScalePatternParams = {
        202: [1.5, 1],
        203: [1.75, 1.25, 1],
        204: [1.9375, 1.4375, 1.25, 1.13, 1, 1, 1, 1, 1, 1],
        208: [1.9375, 1.4375, 1.25, 1.13, 1],
        212: [1, 1, 1, 1, 1],
        213: [1, 1, 1, 1, 1],
        214: [1, 1, 1, 1, 1],
        215: [1, 1, 1, 1, 1],
        234: [1, 1, 1, 1, 1],
        312: [1.5, 1],
        313: [1.75, 1.25, 1],
        314: [1.875, 1.375, 1.16, 1],
        315: [1.9375, 1.4375, 1.25, 1.13, 1],
        322: [1.5, 1],
        323: [1.75, 1.25, 1],
        324: [1.875, 1.375, 1.16, 1],
        325: [1.875, 1.375, 1.16, 1, 1],
        326: [1.875, 1.375, 1.16, 1, 1, 1],
        332: [1.5, 1],
        333: [1.75, 1.25, 1],
        334: [1.875, 1.375, 1.16, 1],
        335: [1.9375, 1.4375, 1.25, 1.13, 1],
        336: [1.9375, 1.4375, 1.25, 1.13, 1, 1]
    };

    static VaryingPatternParam = {
        419: [0.9, 1.0, 1.15, 1.35],
    }

    static getRange (id: ENUM.SkillRange, selectDead: boolean = false) {
        var range: BaseRange;
        if (this.isEnemyRowRandomRange(id)) {
            range = this.createEnemyRowRandomRange(id);
        }
        else if (this.isEnemyRandomRange(id)){
            range = this.createEnemyRandomRange(id);
        }
        else if (this.isEnemyNearRange(id) || this.isEnemyNearScaledRange(id)) {
            range = this.createEnemyNearRange(id);
        }
        else if (this.isFriendRandomRange(id)) {
            range = this.createFriendRandomRange(id, selectDead);
        }
        else {
            range = this.createRange(id, selectDead);
        }
        return range;
    }

    static isEnemyRandomRange (id: ENUM.SkillRange) {
        return !!RangeFactory.ENEMY_RANDOM_RANGE_TARGET_NUM[id]
            || !!RangeFactory.ENEMY_VARYING_RANDOM_RANGE_TARGET_NUM[id]
            || RangeFactory.isEnemyRowRandomRange(id);
    }

    static isEnemyRowRandomRange (id: ENUM.SkillRange) {
        return !!RangeFactory.ENEMY_ROW_RANDOM_RANGE_TARGET_NUM[id];
    }

    static isFriendRandomRange (id: ENUM.SkillRange) {
        return !!RangeFactory.FRIEND_RANDOM_RANGE_TARGET_NUM[id];
    }

    static createEnemyRandomRange (id: ENUM.SkillRange) {
        if (this.isEnemyVaryingRange(id)) {
            var numTargets = RangeFactory.ENEMY_VARYING_RANDOM_RANGE_TARGET_NUM[id];
        } else {
            numTargets = RangeFactory.ENEMY_RANDOM_RANGE_TARGET_NUM[id];
        }
        return new EnemyRandomRange(id, numTargets);
    }

    static createEnemyRowRandomRange (id: ENUM.SkillRange): BaseRange {
        var numTargets = RangeFactory.ENEMY_ROW_RANDOM_RANGE_TARGET_NUM[id];

        switch (id) {
            case ENUM.SkillRange.ENEMY_REAR_RANDOM_2:
            case ENUM.SkillRange.ENEMY_REAR_RANDOM_3:
            case ENUM.SkillRange.ENEMY_REAR_RANDOM_4:
            case ENUM.SkillRange.ENEMY_REAR_RANDOM_5:
            case ENUM.SkillRange.ENEMY_REAR_RANDOM_6:
                return new EnemyRearRandomRange(id, numTargets);
            case ENUM.SkillRange.ENEMY_FRONT_RANDOM_2:
            case ENUM.SkillRange.ENEMY_FRONT_RANDOM_3:
            case ENUM.SkillRange.ENEMY_FRONT_RANDOM_4:
            case ENUM.SkillRange.ENEMY_FRONT_RANDOM_5:
            case ENUM.SkillRange.ENEMY_FRONT_RANDOM_6:
                return new EnemyFrontRandomRange(id, numTargets);
            case ENUM.SkillRange.ENEMY_MID_REAR_RANDOM_2:
            case ENUM.SkillRange.ENEMY_MID_REAR_RANDOM_3:
            case ENUM.SkillRange.ENEMY_MID_REAR_RANDOM_4:
            case ENUM.SkillRange.ENEMY_MID_REAR_RANDOM_5:
            case ENUM.SkillRange.ENEMY_MID_REAR_RANDOM_6:
                return new EnemyMidRearRandomRange(id, numTargets);
            default:
                throw new Error("Invalid or unimplemented range!");
        }
    }

    static createFriendRandomRange (id: ENUM.SkillRange, selectDead: boolean) {
        return new FriendRandomRange(id, RangeFactory.FRIEND_RANDOM_RANGE_TARGET_NUM[id], selectDead);
    }

    static isEnemyNearRange (id: ENUM.SkillRange) {
        return !!RangeFactory.ENEMY_NEAR_RANGE_TARGET_NUM[id];
    }

    static createEnemyNearRange (id: ENUM.SkillRange) {
        if (this.isEnemyNearRange(id)) {
            var numTargets = RangeFactory.ENEMY_NEAR_RANGE_TARGET_NUM[id];
        }
        else if (this.isEnemyNearScaledRange(id)) {
            numTargets = RangeFactory.ENEMY_NEAR_SCALED_RANGE_TARGET_NUM[id];
        }
        return new EnemyNearRange(id, numTargets);
    }

    static isEnemyNearScaledRange(id: ENUM.SkillRange) {
        return !!RangeFactory.ENEMY_NEAR_SCALED_RANGE_TARGET_NUM[id];
    }

    static isEnemyScaledRange(id: ENUM.SkillRange) {
        return this.isEnemyNearScaledRange(id) || id == ENUM.SkillRange.ENEMY_ALL_SCALED;
    }

    static isEnemyVaryingRange(id: ENUM.SkillRange) {
        return !!RangeFactory.VaryingPatternParam[id];
    }

    static getScaledRatio(id: ENUM.SkillRange, targetsLeft: number): number {
        var paramArray = RangeFactory.ScalePatternParams[id];

        if (!paramArray) {
            throw new Error("Invalid range for getting scale ratio");
        }
        return paramArray[targetsLeft - 1];
    }

    /**
     * Get the varying ratio
     * nthTarget: starts at 0
     */
    static getVaryingRatio(id: ENUM.SkillRange, nthTarget: number): number {
        var paramArray = RangeFactory.VaryingPatternParam[id];
        if (!paramArray) {
            throw new Error("Invalid range for getting varying ratio");
        }
        return paramArray[nthTarget];
    }

    static isRowBasedRange(rangeId: ENUM.SkillRange): boolean {
        if (rangeId === ENUM.SkillRange.ENEMY_FRONT_ALL ||
            rangeId === ENUM.SkillRange.ENEMY_MID_ALL ||
            rangeId === ENUM.SkillRange.ENEMY_REAR_ALL ||
            rangeId === ENUM.SkillRange.ENEMY_FRONT_MID_ALL ||
            rangeId === ENUM.SkillRange.ENEMY_FRONT_REAR_ALL) {
            return true;
        }

        return false;
    }

    static canBeAoeRange(rangeId: ENUM.SkillRange): boolean {
        var canBe = false;

        if (this.isEnemyNearRange(rangeId) ||
            this.isEnemyNearScaledRange(rangeId) ||
            this.isRowBasedRange(rangeId) ||
            rangeId === ENUM.SkillRange.ENEMY_ALL ||
            rangeId === ENUM.SkillRange.ENEMY_ALL_SCALED) {
            canBe = true;
        }

        return canBe;
    }

    static createRange (id: ENUM.SkillRange, selectDead: boolean) {
        switch (id) {
            case ENUM.SkillRange.EITHER_SIDE:
                return new EitherSideRange(id, selectDead); // either side, but not both
            case ENUM.SkillRange.BOTH_SIDES:
                return new BothSidesRange(id, selectDead);
            case ENUM.SkillRange.SELF_BOTH_SIDES:
                return new SelfBothSidesRange(id);
            case ENUM.SkillRange.ALL:
                return new AllRange(id);
            case ENUM.SkillRange.ENEMY_ALL:
            case ENUM.SkillRange.ENEMY_ALL_SCALED:
                return new EnemyAllRange(id);
            case ENUM.SkillRange.ENEMY_FRONT_ALL:
                return new EnemyFrontAllRange(id);
            case ENUM.SkillRange.ENEMY_MID_ALL:
                return new EnemyMidAllRange(id);
            case ENUM.SkillRange.ENEMY_REAR_ALL:
                return new EnemyRearAllRange(id);
            case ENUM.SkillRange.ENEMY_FRONT_MID_ALL:
                return new EnemyFrontMidAllRange(id);
            case ENUM.SkillRange.ENEMY_FRONT_REAR_ALL:
                return new EnemyFrontRearAllRange(id);
            case ENUM.SkillRange.MYSELF:
                return new SelfRange(id, selectDead);
            case ENUM.SkillRange.RIGHT:
                return new RightRange(id);
            case ENUM.SkillRange.SELF_IMMEDIATE_RIGHT:
                return new SelfImmediateRightRange(id);
            case ENUM.SkillRange.PASSIVE:
                return null; // doesn't really matter
            default:
                throw new Error("Invalid range or not implemented");
        }
    }
}

class BaseRange {
    id: ENUM.SkillRange;

    // these will be reset every time the skill/range is used
    targets: Card[];
    currentIndex: number;

    constructor(id: ENUM.SkillRange) {
        this.id = id;
    }

    /**
     * Get all targets that satisfy a condition
     */
    getBaseTargets(condFunc: (x: Card) => boolean): Card[] {
        var allCards = CardManager.getInstance().getAllMainCardsInPlayerOrder();
        var baseTargets = [];
        for (var i = 0; i < allCards.length; i++) {
            if (condFunc(allCards[i])) {
                baseTargets.push(allCards[i]);
            }
        }
        return baseTargets;
    }

    /**
     * For non-random skills, populate the targets[] array and reset the currentIndex
     * This should be called at the beginning of every skill execution
     */
    getReady(executor: Card, skillCondFunc?: (card: Card) => boolean): void {
        throw new Error("Implement this");
    }

    /**
     * Check if there is a valid target. Will call getReady() on the range so be careful.
     * Don't use this in the middle of a skill execution.
     */
    hasValidTarget(executor: Card, condFunc?: (x: Card) => boolean): boolean {
        // this is to initialize targets[]
        this.getReady(executor, condFunc);

        var hasValid = false;
        if (condFunc) {
            for (var i = 0; i < this.targets.length; i++) {
                if (condFunc(this.targets[i])) {
                    hasValid = true;
                    break;
                }
            }
        }
        else {
            hasValid = this.targets.length > 0;
        }

        return hasValid;
    }

    /**
     * Get the default conditional function (valid if card is not dead and belongs to the enemy)
     */
    getCondFunc(executor: Card): (x: Card)=>boolean {
        return (card: Card) => {
            if (card.isDead || (card.getPlayerId() === executor.getPlayerId())) {
                return false;
            }
            return true;
        };
    }

    /**
     * Return true if a card satisfies the dead condition
     */
    satisfyDeadCondition(card: Card, selectDead: boolean): boolean {
        return (card.isDead && selectDead) || (!card.isDead && !selectDead);
    }

    /**
     * Get the next target. Return undefined or null when there's no target left.
     */
    getTarget(executor: Card): Card {
        return this.targets[this.currentIndex++];
    }
}

class BothSidesRange extends BaseRange {
    selectDead: boolean;

    constructor(id: ENUM.SkillRange, selectDead: boolean) {
        super(id);
        this.selectDead = selectDead;
    }

    getReady(executor: Card): void {
        var targets = [];
        this.currentIndex = 0;

        var leftCard: Card = CardManager.getInstance().getLeftSideCard(executor);
        if (leftCard && this.satisfyDeadCondition(leftCard, this.selectDead)) {
            targets.push(leftCard);
        }

        var rightCard: Card = CardManager.getInstance().getRightSideCard(executor);
        if (rightCard && this.satisfyDeadCondition(rightCard, this.selectDead)) {
            targets.push(rightCard);
        }

        this.targets = targets;
    }
}

// TODO: generalize this range
class SelfImmediateRightRange extends BaseRange {
    getReady(executor: Card): void {
        var targets = [];
        this.currentIndex = 0;

        if (!executor.isDead) { // should always be true
            targets.push(executor);
        }

        var rightCard: Card = CardManager.getInstance().getRightSideCard(executor);
        if (rightCard && !rightCard.isDead) {
            targets.push(rightCard);
        }

        this.targets = targets;
    }
}

class RandomRange extends BaseRange {
    /**
     * Only difference to the BaseRange version is that we use baseTargets instead of the range's targets[]
     */
    hasValidTarget(executor: Card, condFunc?: (x: Card) => boolean): boolean {
        var baseTargets: Card[] = this.getBaseTargets(this.getCondFunc(executor));
        var hasValid = false;
        if (condFunc) {
            for (var i = 0; i < baseTargets.length; i++) {
                if (condFunc(baseTargets[i])) {
                    hasValid = true;
                    break;
                }
            }
        }
        else {
            hasValid = baseTargets.length > 0;
        }

        return hasValid;
    }
}

class EnemyRandomRange extends RandomRange {
    private numTarget: number;
    private numProcessed: number;

    constructor(id: ENUM.SkillRange, numTarget: number) {
        super(id);
        this.numTarget = numTarget;
    }

    getReady(executor: Card): void {
        this.numProcessed = 0;
    }

    getTarget(executor: Card): Card {
        if (this.numProcessed < this.numTarget) {
            this.numProcessed++;
            return getRandomElement(this.getBaseTargets(this.getCondFunc(executor)));
        }
        else {
            return null;
        }
    }
}

class EitherSideRange extends BothSidesRange {
    getReady(executor: Card): void {
        super.getReady(executor);

        if (this.targets.length !== 0) {
            this.targets = [getRandomElement(this.targets)];
        }
    }
}

class RightRange extends BaseRange {
    getReady(executor: Card): void {
        var targets = [];
        this.currentIndex = 0;
        var partyCards = CardManager.getInstance().getPlayerCurrentMainCards(executor.player);

        for (var i = executor.formationColumn + 1; i < 5; i++) {
            if (!partyCards[i].isDead) {
                targets.push(partyCards[i]);
            }
        }

        this.targets = targets;
    }
}

class SelfRange extends BaseRange {
    selectDead: boolean;
    constructor(id: ENUM.SkillRange, selectDead: boolean) {
        super(id);
        this.selectDead = selectDead;
    }

    getReady(executor: Card): void {
        var targets = [];
        this.currentIndex = 0;

        if (this.satisfyDeadCondition(executor, this.selectDead)) {
            targets.push(executor);
        }

        this.targets = targets;
    }
}

class SelfBothSidesRange extends BaseRange {
    getReady(executor: Card): void {
        var targets = [];
        this.currentIndex = 0;

        var leftCard: Card = CardManager.getInstance().getLeftSideCard(executor);
        if (leftCard && !leftCard.isDead) {
            targets.push(leftCard);
        }

        if (!executor.isDead) { // should always be true
            targets.push(executor);
        }

        var rightCard: Card = CardManager.getInstance().getRightSideCard(executor);
        if (rightCard && !rightCard.isDead) {
            targets.push(rightCard);
        }

        this.targets = targets;
    }
}

class AllRange extends BaseRange {
    getReady(executor: Card): void {
        var targets = [];
        this.currentIndex = 0;
        var partyCards = CardManager.getInstance().getPlayerCurrentMainCards(executor.player);

        for (var i = 0; i < partyCards.length; i++) {
            if (!partyCards[i].isDead) {
                targets.push(partyCards[i]);
            }
        }
        this.targets = targets;
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
    maxDistance: number;

    constructor(id: ENUM.SkillRange, public numTarget) {
        super(id);
        this.maxDistance = EnemyNearRange.MAX_DISTANCE_FROM_CENTER[numTarget];
    }

    getReady(executor: Card): void {
        this.currentIndex = 0;

        // get center enemy
        var centerEnemy = CardManager.getInstance().getNearestSingleOpponentTarget(executor);

        if (!centerEnemy) {
            this.targets = [];
            return;
        }

        var enemyCards = CardManager.getInstance().getEnemyCurrentMainCards(executor.player);

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

        this.targets = targets;
    }
}

class EnemyAllRange extends BaseRange {
    getReady(executor: Card): void {
        var enemyCards = CardManager.getInstance().getEnemyCurrentMainCards(executor.player);
        var targets = [];
        this.currentIndex = 0;
        for (var i = 0; i < enemyCards.length; i++) {
            var currentEnemyCard = enemyCards[i];
            if (currentEnemyCard && !currentEnemyCard.isDead) {
                targets.push(currentEnemyCard);
            }
        }
        this.targets = targets;
    }
}

class FriendRandomRange extends RandomRange {
    numTargets: number;
    selectDead: boolean;
    isUnique: boolean;
    includeSelf: boolean;
    forcedSelf: boolean;

    constructor(id: ENUM.SkillRange, numTargets: number, selectDead: boolean) {
        super(id);
        this.numTargets = numTargets;
        this.selectDead = selectDead;
        this.isUnique = RangeFactory.FRIEND_RANDOM_RANGE_TARGET_NUM[id];
        this.includeSelf = RangeFactory.INCLUDE_SELF[id];
        this.forcedSelf = RangeFactory.FORCED_SELF[id];
    }

    getReady(executor: Card, skillCondFunc?: (card: Card)=>boolean): void{
        var baseTargets: Card[] = this.getBaseTargets(this.getCondFunc(executor, skillCondFunc));
        var targets: Card[] = [];
        this.currentIndex = 0;

        var selfAllowed = false;
        for (var i = 0; i < baseTargets.length; i++) {
            if (executor === baseTargets[i]) {
                selfAllowed = true;
                break;
            }
        }

        if (baseTargets.length) {
            if (this.isUnique) {
                targets = getRandomUniqueElements(baseTargets, this.numTargets);
            }
            else {
                for (i = 0; i < this.numTargets; i++) {
                    targets.push(getRandomElement(baseTargets));
                }
            }
        }

        if (this.forcedSelf && selfAllowed ) {
             var alreadyIncludedSelf = false;
             for (i = 0; i < targets.length; i++) {
                 if (executor === targets[i]) {
                      alreadyIncludedSelf = true;
                      break;
                 }
             }
             if (!alreadyIncludedSelf) {
                targets.shift();
                targets.unshift(executor);
             }
        }

        this.targets = targets;
    }

    getCondFunc(executor: Card, skillCondFunc?: (card: Card)=>boolean): (x: Card)=>boolean {
        var selectDead = this.selectDead;
        var includeSelf = this.includeSelf;

        return (card: Card) => {
            if (card.getPlayerId() !== executor.getPlayerId())
                return false;

            if (card.id === executor.id && !includeSelf)
                return false;

            if ((selectDead && !card.isDead) || (!selectDead && card.isDead))
                return false;

            if (skillCondFunc && !skillCondFunc(card))
                return false;

            return true;
        };
    }
}

class BaseRowRange extends BaseRange {
    static ROW_TYPE_COUNT = 3;

    getSameRowCards(cards: Card[], row: ENUM.FormationRow): Card[] {
        var returnArr: Card[] = [];

        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            if (card.getFormationRow() === row) {
                returnArr.push(card);
            }
        }

        return returnArr;
    }

    getRowCandidates(cards: Card[], row: ENUM.FormationRow, isAsc: boolean): Card[] {
        var candidates: Card[] = [];
        if (!cards || cards.length === 0) {
            return candidates;
        }

        var currentRow = row;
        while (!candidates.length) {
            var sameRowCards = this.getSameRowCards(cards, currentRow);
            for (var i = 0; i < sameRowCards.length; i++) {
                candidates.push(sameRowCards[i]);
            }

            currentRow = (isAsc) ? currentRow % BaseRowRange.ROW_TYPE_COUNT + 1 : currentRow - 1;

            if (currentRow < 1) {
                currentRow = ENUM.FormationRow.REAR;
            }

            if (currentRow === row) {
                break;
            }
        }

        return candidates;
    }
}

class EnemyFrontMidAllRange extends BaseRowRange {
    getReady(executor: Card): void {
        this.currentIndex = 0;
        var candidates = this.getBaseTargets(this.getCondFunc(executor));
        if (candidates.length) {
            var frontCards = this.getSameRowCards(candidates, ENUM.FormationRow.FRONT);
            var centerCards = this.getSameRowCards(candidates, ENUM.FormationRow.MID);

            if (frontCards.length > 0 || centerCards.length > 0) {
                candidates = frontCards.concat(centerCards);
            } else {
                candidates = this.getSameRowCards(candidates, ENUM.FormationRow.REAR);
            }
        }
        this.targets = candidates;
    }
}

class EnemyFrontRearAllRange extends BaseRowRange {
    getReady(executor: Card): void {
        this.currentIndex = 0;
        var candidates = this.getBaseTargets(this.getCondFunc(executor));
        if (candidates.length) {
            var frontCards = this.getSameRowCards(candidates, ENUM.FormationRow.FRONT);
            var rearCards = this.getSameRowCards(candidates, ENUM.FormationRow.REAR);

            if (frontCards.length > 0 || rearCards.length > 0) {
                candidates = frontCards.concat(rearCards);
            } else {
                candidates = this.getSameRowCards(candidates, ENUM.FormationRow.MID);
            }
        }
        this.targets = candidates;
    }
}

class EnemyFrontAllRange extends BaseRowRange {
    getReady(executor: Card): void {
        this.currentIndex = 0;
        var candidates = this.getBaseTargets(this.getCondFunc(executor));
        if (candidates.length) {
            candidates = this.getRowCandidates(candidates, ENUM.FormationRow.FRONT, true);
        }
        this.targets = candidates;
    }
}

class EnemyMidAllRange extends BaseRowRange {
    getReady(executor: Card): void {
        this.currentIndex = 0;
        var candidates = this.getBaseTargets(this.getCondFunc(executor));
        if (candidates.length) {
            candidates = this.getRowCandidates(candidates, ENUM.FormationRow.MID, true);
        }
        this.targets = candidates;
    }
}

class EnemyRearAllRange extends BaseRowRange {
    getReady(executor: Card): void {
        this.currentIndex = 0;
        var candidates = this.getBaseTargets(this.getCondFunc(executor));
        if (candidates.length) {
            candidates = this.getRowCandidates(candidates, ENUM.FormationRow.REAR, false);
        }
        this.targets = candidates;
    }
}

class EnemyRowRandomRange extends RandomRange { // TODO: fix this later (not extends RandomRange)
    private numTargets: number;
    private numProcessed: number;
    private baseOnRangeType: ENUM.SkillRange;

    constructor(id: ENUM.SkillRange, numTargets: number, baseOnRangeType: ENUM.SkillRange) {
        super(id);
        this.numTargets = numTargets;
        this.baseOnRangeType = baseOnRangeType;
    }

    getReady(executor: Card): void {
        this.numProcessed = 0;
    }

    getTarget(executor: Card): Card {
        var tmpRange = RangeFactory.getRange(this.baseOnRangeType);
        tmpRange.getReady(executor);

        if (this.numProcessed < this.numTargets) {
            this.numProcessed++;
            return getRandomElement(tmpRange.targets);
        }
        else {
            return null;
        }
    }
}

class EnemyRearRandomRange extends EnemyRowRandomRange {
    constructor(id: ENUM.SkillRange, numTargets: number) {
        super(id, numTargets, ENUM.SkillRange.ENEMY_REAR_ALL);
    }
}

class EnemyFrontRandomRange extends EnemyRowRandomRange {
    constructor(id: ENUM.SkillRange, numTargets: number) {
        super(id, numTargets, ENUM.SkillRange.ENEMY_FRONT_ALL);
    }
}

class EnemyMidRearRandomRange extends EnemyRowRandomRange {
    constructor(id: ENUM.SkillRange, numTargets: number) {
        super(id, numTargets, ENUM.SkillRange.ENEMY_MID_ALL);
    }
}
