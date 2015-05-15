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
