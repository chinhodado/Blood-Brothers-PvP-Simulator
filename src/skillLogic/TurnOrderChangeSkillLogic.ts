/// <reference path="SkillLogic.ts"/>

class TurnOrderChangeSkillLogic extends SkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        return super.willBeExecuted(data) && !this.battleModel.turnOrderChanged;
    }

    execute(data: SkillLogicData) {
        this.battleModel.turnOrderChanged = true;
        this.battleModel.turnOrderBase = data.skill.skillFuncArg1;
        this.battleModel.turnOrderChangeEffectiveTurns = data.skill.skillFuncArg2;

        this.logger.addMinorEvent({
            executorId: data.executor.id,
            type: ENUM.MinorEventType.BATTLE_DESCRIPTION,
            description: `Turn order is now based on ${ENUM.BattleTurnOrderType[data.skill.skillFuncArg1]} for ${data.skill.skillFuncArg2} turn(s).`,
            skillId: data.skill.id,
            battleDesc: "Turn Order Changed"
        });
    }
}
