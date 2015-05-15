class BlindAffliction extends Affliction {
    missProb: number;     // the probability for missing
    validTurnNum: number; // number of turns for blind

    constructor() {
        super(ENUM.AfflictionType.BLIND);
        this.missProb = 0;
        this.finished = false;
        this.validTurnNum = 0;
    }

    canAttack(): boolean {
        return true;
    }

    canMiss(): boolean {
        return Math.random() <= this.missProb;
    }

    update(): void {
        if (--this.validTurnNum <= 0) {
            this.clear();
        }
    }

    add(option: AfflictOptParam): void {
        this.validTurnNum = option.turnNum;
        this.missProb = option.missProb;
    }
}
