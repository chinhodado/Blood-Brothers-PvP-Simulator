/// <reference path="BasePassiveSkillLogic.ts"/>

class AfflictionProbabilityBuffPassiveSkillLogic extends BasePassiveSkillLogic {
    getEffectRatio(executor: Card, target: Card, passiveSkill: Skill): number {
        if (executor.rarity > target.rarity) {
            return 1 + passiveSkill.skillFuncArg1;
        }
        else {
            return 1;
        }
    }
}
