/// <reference path="SkillLogic.ts"/>

class OnHitDebuffSkillLogic extends SkillLogic {
    private static UNINITIALIZED_VALUE = -1234;
    private executionLeft: number = OnHitDebuffSkillLogic.UNINITIALIZED_VALUE;

    willBeExecuted(data: SkillLogicData): boolean {
        let hasTarget = data.skill.range.hasValidTarget(data.executor);

        // this should be done at construction time instead...
        if (this.executionLeft === OnHitDebuffSkillLogic.UNINITIALIZED_VALUE) {
            this.executionLeft = data.skill.skillFuncArg5;
        }

        if (this.executionLeft === 0) return false;

        let success = super.willBeExecuted(data) && hasTarget;

        if (success) {
            this.executionLeft--;
            return true;
        } else return false;
    }

    execute(data: SkillLogicData) {
        data.skill.getReady(data.executor);
        let target: Card;

        this.logger.addMinorEvent({
            executorId: data.executor.id,
            type: ENUM.MinorEventType.DESCRIPTION,
            description: data.executor.name + " procs " + data.skill.name + ". ",
            skillId: data.skill.id
        });

        // debuff
        while (target = data.skill.getTarget(data.executor)) {
            DebuffSkillLogic.processDebuff(data.executor, target, data.skill);
        }
    }
}
