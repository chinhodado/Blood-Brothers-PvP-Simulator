/// <reference path="SkillLogic.ts"/>

class AfflictionSkillLogic extends SkillLogic {
    execute(data: SkillLogicData) {
        data.skill.getReady(data.executor);

        var target: Card;
        while (target = data.skill.getTarget(data.executor)) {
            this.battleModel.processAffliction(data.executor, target, data.skill);
        }
    }
}
