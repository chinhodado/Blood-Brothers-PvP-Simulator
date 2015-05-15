/// <reference path="DebuffSkillLogic.ts"/>

class MultiDebuffSkillLogic extends DebuffSkillLogic {
    execute(data: SkillLogicData) {
        // process the first debuff with the first 5 args
        super.execute(data);

        // make a temporary skill with the original skill's last 5 args as the first 5 args
        var tempSkill: Skill = new Skill(data.skill.id);
        tempSkill.skillFuncArg1 = tempSkill.skillFuncArg6;
        tempSkill.skillFuncArg2 = tempSkill.skillFuncArg7;
        tempSkill.skillFuncArg3 = tempSkill.skillFuncArg8;
        tempSkill.skillFuncArg4 = tempSkill.skillFuncArg9;
        tempSkill.skillFuncArg5 = tempSkill.skillFuncArg10;

        // then execute it
        data.skill = tempSkill;
        super.execute(data);
    }
}
