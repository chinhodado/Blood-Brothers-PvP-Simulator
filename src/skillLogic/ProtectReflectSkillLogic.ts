/// <reference path="ProtectSkillLogic.ts"/>

class ProtectReflectSkillLogic extends ProtectSkillLogic {
    static REFLECT_AFFLICTION_PROBABILITY = 0.2;

    willBeExecuted(data: SkillLogicData): boolean {
        var skill = data.skill;

        var canProtect = Skill.canProtectFromCalcType(skill.skillFuncArg2, data.attackSkill)
            && Skill.canProtectFromAttackType(skill.skillFuncArg4, data.attackSkill);

        return super.willBeExecuted(data) && canProtect;
    }

    execute(data: SkillLogicData) {
        var toReturn = this.executeProtectPhase(data);

        if (data.executor.isDead || !data.executor.canUseSkill()) {
            return toReturn;
        }

        var range = RangeFactory.getRange(data.skill.skillFuncArg3);
        range.getReady(data.executor);
        var target: Card;

        // reflect animation is never AoE, so it is safe to do this
        while (target = range.getTarget(data.executor)) {
            this.battleModel.processDamagePhase({
                attacker: data.executor,
                target: target,
                skill: data.skill,
                scaledRatio: data.scaledRatio,
                varyingRatio: data.varyingRatio,
                oriAttacker: data.attacker,
                oriAtkSkill: data.attackSkill,
                oriDmg: toReturn.dmgTaken / data.skill.skillFuncArg5 //hacky
            });

            if (data.attackSkill.skillFunc === ENUM.SkillFunc.ATTACK || data.attackSkill.skillFunc === ENUM.SkillFunc.MAGIC) {
                AfflictionSkillLogic.processAffliction(data.executor, target, data.attackSkill, ProtectReflectSkillLogic.REFLECT_AFFLICTION_PROBABILITY);
            }

            this.clearAllCardsDamagePhaseData();
        }

        return toReturn;
    }
}
