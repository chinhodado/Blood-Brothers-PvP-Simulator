/// <reference path="BasePassiveSkillLogic.ts"/>

class AfflictionPassiveSkillLogic extends BasePassiveSkillLogic {
    getAfflictionPassive(executor: Card, target: Card, passiveSkill: Skill): Skill {
        if (executor.rarity > target.rarity) {
            // modelled after Affliction skill logic
            // NOTE: we are copying from the passive skill, but just override the first 5 args.
            // Apart from the skill name, all other remaining skill attribute should/must NOT be used
            var afflictionSkill = new Skill(passiveSkill.id);
            afflictionSkill.skillFuncArg1 = 0; // always 0?
            afflictionSkill.skillFuncArg2 = passiveSkill.skillFuncArg4; // afflict type
            afflictionSkill.skillFuncArg3 = passiveSkill.skillFuncArg1; // afflict prob
            afflictionSkill.skillFuncArg4 = passiveSkill.skillFuncArg5; // afflict param 1
            afflictionSkill.skillFuncArg5 = passiveSkill.skillFuncArg6; // afflict param 2
            return afflictionSkill;
        }
        else {
            return null;
        }
    }
}
