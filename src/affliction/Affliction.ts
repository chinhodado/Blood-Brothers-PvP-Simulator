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
    add(option: AfflictOptParam): void {
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

/**
 * A simple struct for affliction's optional parameters
 */
interface AfflictOptParam {
    turnNum?: number;  // for silent and blind
    missProb?: number; // for blind
    percent?: number;  // for poison
    damage?: number;   // for burn
}
