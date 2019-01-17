/// <reference path="SkillLogic.ts"/>

class SurviveSkillLogic extends SkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        let hpRatio = data.executor.getHpRatio();
        return super.willBeExecuted(data) && (hpRatio > data.skill.skillFuncArg1) && (data.wouldBeDamage >= data.executor.getHP());
    }

    execute(data: SkillLogicData) {
        this.logger.addMinorEvent({
            executorId: data.executor.id,
            type: ENUM.MinorEventType.DESCRIPTION,
            noProcEffect: true,
            description: data.executor.name + " procs " + data.skill.name + ". ",
            skillId: data.skill.id
        });
    }
}
