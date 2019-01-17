/// <reference path="SkillLogic.ts"/>

class HealSkillLogic extends SkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        let hasValidTarget = data.skill.range.hasValidTarget(data.executor, this.getCondFunc());
        return super.willBeExecuted(data) && hasValidTarget;
    }

    private getCondFunc() {
        return (card: Card): boolean => !card.isFullHealth();
    }

    execute(data: SkillLogicData) {
        data.skill.range.getReady(data.executor, this.getCondFunc());

        let baseHealAmount = getHealAmount(data.executor);

        let multiplier = data.skill.skillFuncArg1;
        let healAmount = Math.floor(multiplier * baseHealAmount);

        let target: Card;
        while (target = data.skill.getTarget(data.executor)) {
            // if the heal is not based on wis, recalculate the heal amount
            if (data.skill.skillFuncArg2 === 1) {
                healAmount = multiplier * target.getOriginalHP();
            }

            this.battleModel.damageToTargetDirectly(target, -1 * healAmount, " healing");
        }
    }
}
