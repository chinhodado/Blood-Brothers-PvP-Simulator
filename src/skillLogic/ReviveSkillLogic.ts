/// <reference path="SkillLogic.ts"/>

class ReviveSkillLogic extends SkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        let hasValidTarget = data.skill.range.hasValidTarget(data.executor);
        return super.willBeExecuted(data) && hasValidTarget;
    }

    execute(data: SkillLogicData) {
        data.skill.getReady(data.executor);
        let hpRatio = data.skill.skillFuncArg1;

        let target: Card;
        while (target = data.skill.getTarget(data.executor)) {
            target.revive(hpRatio);

            this.logger.addMinorEvent({
                executorId: data.executor.id,
                targetId: target.id,
                type: ENUM.MinorEventType.REVIVE,
                reviveHPRatio: hpRatio,
                description: target.name + " is revived with " + hpRatio * 100 + "% HP!",
                skillId: data.skill.id
            });
        }
    }
}
