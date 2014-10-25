class AfflictionFactory {
    static getAffliction(type: ENUM.AfflictionType): Affliction {
        switch (type) {
            case ENUM.AfflictionType.BLIND:
                return new BlindAffliction();
            case ENUM.AfflictionType.DISABLE:
                return new DisabledAffliction();
            case ENUM.AfflictionType.FROZEN:
                return new FrozenAffliction();
            case ENUM.AfflictionType.PARALYSIS:
                return new ParalysisAffliction();
            case ENUM.AfflictionType.POISON:
                return new PoisonAffliction();
            case ENUM.AfflictionType.SILENT:
                return new SilentAffliction();
            case ENUM.AfflictionType.BURN:
                return new BurnAffliction();
            default:
                throw new Error("Invalid affliction type!");
        }
    }
}

class Affliction {
    type: ENUM.AfflictionType;
    finished: boolean;

    constructor(type: ENUM.AfflictionType) {
        this.type = type;
        this.finished = false;
    }

    static getAfflictionAdjective(type: ENUM.AfflictionType): string {
        switch (type) {
            case ENUM.AfflictionType.BLIND:
                return "Blinded";
            case ENUM.AfflictionType.DISABLE:
                return "Disabled";
            case ENUM.AfflictionType.FROZEN:
                return "Frozen";
            case ENUM.AfflictionType.PARALYSIS:
                return "Paralyzed";
            case ENUM.AfflictionType.POISON:
                return "Poisoned";
            case ENUM.AfflictionType.SILENT:
                return "Silent";
            case ENUM.AfflictionType.BURN:
                return "Burned";
            default:
                throw new Error("Invalid affliction type!");
        }
    }

    /**
     * Can the familiar do anything (both auto attack and perform skills) with this affliction?
     */
    canAttack(): boolean {
        throw new Error ("Implement this");
    }

    /**
     * Can the familiar use skills with this affliction?
     */
    canUseSkill(): boolean {
        return this.canAttack();
    }

    /**
     * Can the familiar miss with this affliction?
     */
    canMiss(): boolean {
        return false;
    }

    /**
     * Called when the affliction needs to be updated, like at the end of the fam's turn
     */
    update(card: Card): void {
        throw new Error ("Implement this");
    }

    /**
     * Called when the fam is affected with another affliction of the same type
     */
    add(option: AfflectOptParam): void {
        // implement this
    }

    isFinished(): boolean {
        return this.finished;
    }

    clear(): void {
        this.finished = true;
    }

    getType(): ENUM.AfflictionType {
        return this.type;
    }
}

class PoisonAffliction extends Affliction {
    private static DEFAULT_PERCENT = 5; // default poison is 5% of HP every turn
    private static MAX_STACK_NUM = 2;   // maximum number that poison can stack
    private static MAX_DAMAGE = 99999;  // maximum poison damage is 99999 every turn

    percent: number;

    constructor() {
        super(ENUM.AfflictionType.POISON);
        this.percent = 0;
        this.finished = false;
    }

    canAttack(): boolean {
        return true;
    }

    update(card: Card): void {
        var damage: number = Math.floor(card.originalStats.hp * this.percent / 100);
        if (damage > PoisonAffliction.MAX_DAMAGE) {
            damage = PoisonAffliction.MAX_DAMAGE;
        }
        // damage the card
        BattleModel.getInstance().damageToTargetDirectly(card, damage, "poison");
    }

    add(option: AfflectOptParam): void {
        var percent = option.percent;
        if (!percent) {
            percent = PoisonAffliction.DEFAULT_PERCENT;
        }
        this.percent += percent;

        // there's a bug in here. Not my fault though
        var maxPercent = percent * PoisonAffliction.MAX_STACK_NUM;
        if (this.percent > maxPercent) {
            this.percent = maxPercent;
        }
    }
}

class ParalysisAffliction extends Affliction {

    constructor() {
        super(ENUM.AfflictionType.PARALYSIS);
    }

    canAttack(): boolean {
        return this.isFinished();
    }

    update(): void {
        this.clear();
    }
}

class FrozenAffliction extends Affliction {

    constructor() {
        super(ENUM.AfflictionType.FROZEN);
    }

    canAttack(): boolean {
        return this.isFinished();
    }

    update(): void {
        this.clear();
    }
}

class DisabledAffliction extends Affliction {

    constructor() {
        super(ENUM.AfflictionType.DISABLE);
    }

    canAttack(): boolean {
        return this.isFinished();
    }

    update(): void {
        this.clear();
    }
}

class SilentAffliction extends Affliction {

    validTurnNum: number; // number of turns for silence

    constructor() {
        super(ENUM.AfflictionType.SILENT);
        this.validTurnNum = 0;
    }

    canAttack(): boolean{
        return true;
    }

    canUseSkill(): boolean {
        return this.isFinished();
    }

    update(): void{
        if (--this.validTurnNum <= 0) {
            this.clear();
        }
    }
    
    add(option: AfflectOptParam): void{
        this.validTurnNum = option.turnNum;
    }
}

class BlindAffliction extends Affliction {

    missProb: number;     // the probability for missing
    validTurnNum: number; // number of turns for blind

    constructor() {
        super(ENUM.AfflictionType.BLIND);
        this.missProb = 0;
        this.finished = false;
        this.validTurnNum = 0;
    }

    canAttack(): boolean{
        return true;
    }

    canMiss(): boolean{
        return Math.random() <= this.missProb;
    }

    update(): void{
        if (--this.validTurnNum <= 0) {
            this.clear();
        }
    }

    add(option: AfflectOptParam): void{
        this.validTurnNum = option.turnNum;
        this.missProb = option.missProb;
    }
}

class BurnAffliction extends Affliction {
    private static STACK_NUM = 3;
    damage = 0;
    values: number[] = [];

    constructor() {
        super(ENUM.AfflictionType.BURN);
    }

    canAttack(): boolean{
        return true;
    }

    update(card: Card): void{
        BattleModel.getInstance().damageToTargetDirectly(card, this.damage, "burn");
    }

    add(option: AfflectOptParam): void {
        // update the damage as the sum of the highest 3 values
        var arr = this.values;
        arr.push(option.damage);
        arr.sort((a, b) => b - a); // sort descending

        this.damage = 0;
        for (var i = 0; i < BurnAffliction.STACK_NUM; i++) {
            if (arr[i]) {
                this.damage += arr[i];
            }
        }
    }
}

/**
 * A simple struct for afflection's optional parameters
 */
interface AfflectOptParam {
    turnNum?: number;  // for silent and blind
    missProb?: number; // for blind
    percent?: number;  // for poison
    damage?: number;   // for burn
}
