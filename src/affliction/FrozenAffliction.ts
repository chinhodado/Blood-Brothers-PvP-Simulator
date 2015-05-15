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
