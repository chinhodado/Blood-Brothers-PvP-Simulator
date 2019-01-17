/// <reference path="BuffSkillLogic.ts"/>

class OnHitBuffSkillLogic extends BuffSkillLogic {
    private static UNINITIALIZED_VALUE = -1234;
    private executionLeft: number = OnHitBuffSkillLogic.UNINITIALIZED_VALUE;

    willBeExecuted(data: SkillLogicData): boolean {
        // this should be done at construction time instead...
        if (this.executionLeft === OnHitBuffSkillLogic.UNINITIALIZED_VALUE) {
            this.executionLeft = data.skill.skillFuncArg5;
        }

        if (this.executionLeft === 0) return false;

        let success = super.willBeExecuted(data);

        if (success) {
            this.executionLeft--;
            return true;
        } else return false;
    }

    execute(data: SkillLogicData) {
        this.logger.addMinorEvent({
            executorId: data.executor.id,
            type: ENUM.MinorEventType.DESCRIPTION,
            description: data.executor.name + " procs " + data.skill.name + ". ",
            skillId: data.skill.id
        });

        super.execute(data);
    }
}
