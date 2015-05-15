/**
 * A structure for holding data for damage phase
 */
interface DamagePhaseData {
    attacker: Card;
    target: Card;
    skill: Skill;
    additionalDescription?: string;
    scaledRatio?: number;
    varyingRatio?: number;

    // for reflect
    dmgRatio?: number;
    oriAttacker?: Card;
    oriAtkSkill?: Skill;
    oriDmg?: number;
}
