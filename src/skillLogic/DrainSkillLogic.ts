/// <reference path="SkillLogic.ts"/>

class DrainSkillLogic extends SkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        var hasValidTarget = data.skill.range.hasValidTarget(data.executor, this.getCondFunc());
        return super.willBeExecuted(data) && hasValidTarget;
    }

    private getCondFunc() {
        return (card: Card): boolean => !card.isFullHealth();
    }

    execute(data: SkillLogicData) {
        var skill = data.skill;
        skill.range.getReady(data.executor, this.getCondFunc());
        var target: Card;

        this.logger.addMinorEvent({
            executorId: data.executor.id,
            type: ENUM.MinorEventType.DESCRIPTION,
            description: data.executor.name + " procs " + skill.name + ". ",
            skillId: skill.id
        });

        // don't worry about length == 0, it would not have gotten into here anyway
        // TODO: very hacky, only works if the range is not a random range
        console.assert(!(skill.range instanceof RandomRange), "can't do this with random ranges!");
        var eachTargetHealAmount = Math.floor(data.executor.lastBattleDamageTaken / skill.range.targets.length);

        while (target = skill.getTarget(data.executor)) {
            this.battleModel.damageToTargetDirectly(target, -1 * eachTargetHealAmount, " healing");
        }
    }
}
