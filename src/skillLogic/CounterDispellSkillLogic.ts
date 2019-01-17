/// <reference path="ProtectSkillLogic.ts"/>

class CounterDispellSkillLogic extends ProtectSkillLogic {
    condFunc = (x: number) => x > 0;

    willBeExecuted(data: SkillLogicData): boolean {
        let range = RangeFactory.getRange(data.skill.skillFuncArg3);
        let hasValidtarget = range.hasValidTarget(data.executor, this.getCondFunc());
        return super.willBeExecuted(data) && hasValidtarget;
    }

    private getCondFunc() {
        return (card: Card): boolean => card.hasStatus(this.condFunc);
    }

    execute(data: SkillLogicData) {
        let toReturn = this.executeProtectPhase(data, true);

        if (data.executor.isDead || !data.executor.canUseSkill()) {
            return toReturn;
        }

        // now process the dispell
        this.logger.addMinorEvent({
            executorId: data.executor.id,
            type: ENUM.MinorEventType.DESCRIPTION,
            description: data.executor.name + " procs " + data.skill.name,
            skillId: data.skill.id
        });

        let range = RangeFactory.getRange(data.skill.skillFuncArg3);
        range.getReady(data.executor, this.getCondFunc());
        let target: Card;

        while (target = range.getTarget(data.executor)) {
            target.clearAllStatus(this.condFunc);

            this.logger.addMinorEvent({
                executorId: data.executor.id,
                targetId: target.id,
                type: ENUM.MinorEventType.STATUS,
                status: {
                    type: 0, //dummy
                    isDispelled: true,
                },
                description: target.name + " is dispelled.",
                skillId: data.skill.id
            });
        }

        return toReturn;
    }
}
