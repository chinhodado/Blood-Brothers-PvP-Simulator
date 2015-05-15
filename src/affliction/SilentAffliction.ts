class SilentAffliction extends Affliction {
    validTurnNum: number; // number of turns for silence

    constructor() {
        super(ENUM.AfflictionType.SILENT);
        this.validTurnNum = 0;
    }

    canAttack(): boolean {
        return true;
    }

    canUseSkill(): boolean {
        return this.isFinished();
    }

    update(): void {
        if (--this.validTurnNum <= 0) {
            this.clear();
        }
    }

    add(option: AfflictOptParam): void {
        this.validTurnNum = option.turnNum;
    }
}
