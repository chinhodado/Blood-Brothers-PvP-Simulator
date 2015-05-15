/// <reference path="BasePassiveSkillLogic.ts"/>

class DefensePassiveSkillLogic extends BasePassiveSkillLogic {
    getEffectRatio(executor: Card, attacker: Card, passiveSkill: Skill): number {
        if (executor.rarity > attacker.rarity) {
            return 1 - passiveSkill.skillFuncArg1;
        }
        else {
            return 1;
        }
    }
}
