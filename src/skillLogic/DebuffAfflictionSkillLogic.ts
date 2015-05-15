/// <reference path="SkillLogic.ts"/>

class DebuffAfflictionSkillLogic extends SkillLogic {
    execute(data: SkillLogicData) {
        // process the debuff with the first 5 args
        var tempDebuffSkillLogic = new DebuffSkillLogic();
        tempDebuffSkillLogic.execute(data);

        // make a temporary affliction skill with the original skill's last 5 args as the first 5 args
        var tempSkill: Skill = new Skill(data.skill.id);
        tempSkill.skillFuncArg1 = 0;
        tempSkill.skillFuncArg2 = tempSkill.skillFuncArg6;
        tempSkill.skillFuncArg3 = tempSkill.skillFuncArg7;
        tempSkill.skillFuncArg4 = tempSkill.skillFuncArg8;
        tempSkill.skillFuncArg5 = tempSkill.skillFuncArg9;

        // then execute it
        var tempAfflictionSkillLogic = new AfflictionSkillLogic();
        data.skill = tempSkill;
        tempAfflictionSkillLogic.execute(data);
    }
}
