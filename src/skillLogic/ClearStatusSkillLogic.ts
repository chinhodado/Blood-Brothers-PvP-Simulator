/// <reference path="SkillLogic.ts"/>

class ClearStatusSkillLogic extends SkillLogic {
    condFunc = (x: number) => true;
    isDispelled: boolean = false;

    willBeExecuted(data: SkillLogicData): boolean {
        let hasValidTarget = data.skill.range.hasValidTarget(data.executor, this.getCondFunc());
        return super.willBeExecuted(data) && hasValidTarget;
    }

    private getCondFunc() {
        return (card: Card): boolean => card.hasStatus(this.condFunc);
    }

    execute(data: SkillLogicData) {
        data.skill.getReady(data.executor);
        let target: Card;

        while (target = data.skill.getTarget(data.executor)) {
            target.clearAllStatus(this.condFunc);

            this.logger.addMinorEvent({
                executorId: data.executor.id,
                targetId: target.id,
                type: ENUM.MinorEventType.STATUS,
                status: {
                    type: 0, //dummy
                    isDispelled: this.isDispelled,
                    isClearDebuff: !this.isDispelled
                },
                description: target.name + (this.isDispelled ? " is dispelled." : " is cleared of debuffs."),
                skillId: data.skill.id
            });
        }
    }
}

class DispellSkillLogic extends ClearStatusSkillLogic {
    constructor() {
        super();
        this.condFunc = (x: number) => x > 0;
        this.isDispelled = true;
    }
}

class ClearDebuffSkillLogic extends ClearStatusSkillLogic {
    constructor() {
        super();
        this.condFunc = (x: number) => x < 0;
        this.isDispelled = false;
    }
}
