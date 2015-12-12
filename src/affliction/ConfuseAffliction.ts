class ConfuseAffliction extends Affliction {
    confuseProb: number;  // the probability for confuse
    validTurnNum: number; // number of turns for confuse

    constructor() {
        super(ENUM.AfflictionType.CONFUSE);
        this.validTurnNum = 0;
    }

    canAttack(): boolean {
        return true;
    }

    update(): void {
        if (--this.validTurnNum <= 0) {
            this.clear();
        }
    }

    add(option: AfflictOptParam): void {
        this.validTurnNum = option.turnNum;
        this.confuseProb = option.confuseProb;
    }
}
