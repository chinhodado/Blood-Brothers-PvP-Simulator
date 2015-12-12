/// <reference path="BlindAffliction.ts"/>
/// <reference path="BurnAffliction.ts"/>
/// <reference path="ConfuseAffliction.ts"/>
/// <reference path="DisabledAffliction.ts"/>
/// <reference path="FrozenAffliction.ts"/>
/// <reference path="ParalysisAffliction.ts"/>
/// <reference path="PoisonAffliction.ts"/>
/// <reference path="SilentAffliction.ts"/>
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
            case ENUM.AfflictionType.CONFUSE:
                return new ConfuseAffliction();
            default:
                throw new Error("Invalid affliction type!");
        }
    }
}
