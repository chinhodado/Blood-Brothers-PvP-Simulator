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
