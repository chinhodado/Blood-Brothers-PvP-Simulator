/// <reference path="BasePassiveSkillLogic.ts"/>

class ExtraTurnPassiveSkillLogic extends BasePassiveSkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        return Math.random() <= data.skill.skillFuncArg1;
    }
}
