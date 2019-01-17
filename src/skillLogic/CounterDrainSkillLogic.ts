/// <reference path="CounterSkillLogic.ts"/>

class CounterDrainSkillLogic extends CounterSkillLogic {
    execute(data: SkillLogicData) {
        let skill = data.skill;
        let target: Card;
        // counter
        super.execute(data);

        // don't worry about length == 0, it would not have gotten into here anyway
        // TODO: very hacky, only works if the range is not a random range
        let range = RangeFactory.getRange(skill.skillFuncArg4);
        range.getReady(data.executor);
        assert(!(range instanceof RandomRange), "can't do this with random ranges!");
        let totalHealAmount = data.executor.lastBattleDamageDealt * skill.skillFuncArg2;
        let eachTargetHealAmount = Math.floor(totalHealAmount / range.targets.length);

        while (target = range.getTarget(data.executor)) {
            this.battleModel.damageToTargetDirectly(target, -1 * eachTargetHealAmount, " healing");
        }
    }
}
