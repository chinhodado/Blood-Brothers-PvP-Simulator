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
            default:
                throw new Error("Invalid affliction type!");
        }
    }

    canAttack(): boolean {
        // implement this
        return false;
    }

    canUseSkill(): boolean {
        return this.canAttack();
    }

    canMiss(): boolean {
        return false;
    }

    update(card: Card): void {
        // implement this
    }

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
    static DEFAULT_PERCENT = 5;
    static MAX_STACK_NUM = 2;
    static MAX_DAMAGE = 99999;

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
        if(damage > PoisonAffliction.MAX_DAMAGE){
            damage = PoisonAffliction.MAX_DAMAGE;
        }
        // damage the card
        BattleModel.getInstance().damageToTargetDirectly(card, damage, "poison");
    }

    add(option: AfflectOptParam): void {
        var percent = option.percent;
        if(!percent){
            percent = PoisonAffliction.DEFAULT_PERCENT;
        }
        this.percent += percent;

        // there's a bug in here. Not my fault though
        var maxPercent = percent * PoisonAffliction.MAX_STACK_NUM;
        if(this.percent > maxPercent){
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

    validTurnNum: number;

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
        if(--this.validTurnNum <= 0){
            this.clear();
        }
    }
    
    add(option: AfflectOptParam): void{
        this.validTurnNum = option.turnNum;
    }
}

class BlindAffliction extends Affliction {

    missProb: number;
    validTurnNum: number;

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
        if(--this.validTurnNum <= 0){
            this.clear();
        }
    }

    add(option: AfflectOptParam): void{
        this.validTurnNum = option.turnNum;
        this.missProb = option.missProb;
    }
}

interface AfflectOptParam {
    turnNum?: number; // for silent and blind
    missProb?: number; // for blind
    percent?: number; // for poison
}