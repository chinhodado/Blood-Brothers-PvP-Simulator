/// <reference path="SkillLogic.ts"/>

class DebuffSkillLogic extends SkillLogic {
    execute(data: SkillLogicData) {
        var skill = data.skill;
        var executor = data.executor;
        skill.getReady(executor);

        var target: Card;
        while (target = skill.getTarget(executor)) {
            this.battleModel.processDebuff(executor, target, skill);
        }
    }
}
