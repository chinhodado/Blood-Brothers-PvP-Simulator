function getDamageCalculatedByATK(attacker: Card, defender: Card, ignorePosition: boolean): number {
    const ATTACK_FACTOR = 0.3;
    const DIFF_FACTOR = 0.2;

    let POS_ATTACK_FACTOR = {};
    POS_ATTACK_FACTOR[ENUM.FormationRow.REAR]  = 0.8;
    POS_ATTACK_FACTOR[ENUM.FormationRow.MID]   = 1;
    POS_ATTACK_FACTOR[ENUM.FormationRow.FRONT] = 1.2;

    let POS_DAMAGE_FACTOR = {};
    POS_DAMAGE_FACTOR[ENUM.FormationRow.REAR]  = 0.8;
    POS_DAMAGE_FACTOR[ENUM.FormationRow.MID]   = 1;
    POS_DAMAGE_FACTOR[ENUM.FormationRow.FRONT] = 1.2;

    let baseDamage = attacker.getATK() * ATTACK_FACTOR;
    let damage = ((attacker.getATK() - defender.getDEF()) * DIFF_FACTOR) + baseDamage;

    if (!ignorePosition) {
        damage *= POS_ATTACK_FACTOR[attacker.getFormationRow()];
        damage *= POS_DAMAGE_FACTOR[defender.getFormationRow()];
    }

    //set lower limit
    if (damage < baseDamage * 0.1) {
        damage = baseDamage * 0.1;
    }

    damage = Math.floor(damage * getRandomArbitary(0.9, 1.1));

    return damage;
}

function getDamageCalculatedByAGI(attacker: Card, defender: Card, ignorePosition: boolean): number {
    const ATTACK_FACTOR = 0.3;
    const DIFF_FACTOR = 0.2;

    let POS_ATTACK_FACTOR = {};
    POS_ATTACK_FACTOR[ENUM.FormationRow.REAR]  = 0.8;
    POS_ATTACK_FACTOR[ENUM.FormationRow.MID]   = 1;
    POS_ATTACK_FACTOR[ENUM.FormationRow.FRONT] = 1.2;

    let POS_DAMAGE_FACTOR = {};
    POS_DAMAGE_FACTOR[ENUM.FormationRow.REAR]  = 0.8;
    POS_DAMAGE_FACTOR[ENUM.FormationRow.MID]   = 1;
    POS_DAMAGE_FACTOR[ENUM.FormationRow.FRONT] = 1.2;

    let baseDamage = attacker.getAGI() * ATTACK_FACTOR;
    let damage = ((attacker.getAGI() - defender.getDEF()) * DIFF_FACTOR) + baseDamage;

    if (!ignorePosition) {
        damage *= POS_ATTACK_FACTOR[attacker.getFormationRow()];
        damage *= POS_DAMAGE_FACTOR[defender.getFormationRow()];
    }

    //set lower limit
    if (damage < baseDamage * 0.1) {
        damage = baseDamage * 0.1;
    }

    damage = Math.floor(damage * getRandomArbitary(0.9, 1.1));

    return damage;
}

function getDamageCalculatedByWIS(attacker: Card, defender: Card): number {
    const ATTACK_FACTOR = 0.3;
    const WIS_DEF_FACTOR = 0.5;
    const DIFF_FACTOR = 0.2;

    let baseDamage = attacker.getWIS() * ATTACK_FACTOR;
    let targetWisDef = (defender.getWIS() + defender.getDEF()) * WIS_DEF_FACTOR;
    let damage = ((attacker.getWIS() - targetWisDef) * DIFF_FACTOR) + baseDamage;

    //set lower limit
    if (damage < baseDamage * 0.1) {
        damage = baseDamage * 0.1;
    }

    damage = Math.floor(damage * getRandomArbitary(0.9, 1.1));

    return damage;
}

function getHealAmount(executor: Card): number {
    const HEAL_FACTOR: number = 0.3;
    let amount = executor.getWIS() * HEAL_FACTOR;

    amount = Math.floor(amount * getRandomArbitary(0.9, 1.1));

    return amount;
}

function getDebuffAmount(executor: Card, target: Card): number {
    const FACTOR = 1.0;

    let value = (executor.getWIS() - target.getWIS()) * FACTOR;
    let min = executor.getWIS() * 0.1;

    if (value < min) {
        value = min;
    }

    return -1 * value;
}

function getCasterBasedDebuffAmount(executor: Card): number {
    const FACTOR = 1.2;

    let value = executor.getWIS() * FACTOR;

    return -1 * value;
}

/**
 * attacker: the original attacker
 * attackSkill: the original attack skill
 * caster: the one who procs the reflect skill
 * target: the target of the reflect skill
 * oriDmg: the original/would-be damage to the caster
 */
function getReflectAmount(attacker: Card, attackSkill: Skill, caster: Card, target: Card, ignorePosFactor: boolean, oriDmg: number): number {
    const DIFF_FACTOR = 0.7;

    let POS_ATTACK_FACTOR = {};
    POS_ATTACK_FACTOR[ENUM.FormationRow.REAR]  = 0.8;
    POS_ATTACK_FACTOR[ENUM.FormationRow.MID]   = 1;
    POS_ATTACK_FACTOR[ENUM.FormationRow.FRONT] = 1.2;

    let POS_DAMAGE_FACTOR = {};
    POS_DAMAGE_FACTOR[ENUM.FormationRow.REAR]  = 0.8;
    POS_DAMAGE_FACTOR[ENUM.FormationRow.MID]   = 1;
    POS_DAMAGE_FACTOR[ENUM.FormationRow.FRONT] = 1.2;

    let damage;
    let x = oriDmg;
    switch (attackSkill.skillCalcType) {
        case ENUM.SkillCalcType.ATK:
        case ENUM.SkillCalcType.AGI:
            let xFormation = ignorePosFactor ? 1 : POS_ATTACK_FACTOR[attacker.formationRow] * POS_DAMAGE_FACTOR[caster.formationRow];
            let formation = ignorePosFactor ? 1 : POS_ATTACK_FACTOR[caster.formationRow] * POS_DAMAGE_FACTOR[target.formationRow];
            damage = (x / xFormation + Math.max(0, caster.getDEF() - target.getDEF()) * DIFF_FACTOR) * formation;
            break;
        case ENUM.SkillCalcType.WIS:
            damage = x + Math.max(0, caster.getDEF() - (target.getWIS() + target.getDEF()) / 2) * DIFF_FACTOR;
            break;
        default:
            throw new Error("Unknown skill calc type!");
    }
    damage = Math.floor(damage * getRandomArbitary(0.9, 1.1));

    return damage;
}
