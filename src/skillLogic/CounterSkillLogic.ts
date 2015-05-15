/// <reference path="SkillLogic.ts"/>

class CounterSkillLogic extends SkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        return super.willBeExecuted(data) && !data.attacker.isDead;
    }

    execute(data: SkillLogicData) {
        this.logger.addMinorEvent({
            executorId: data.executor.id,
            type: ENUM.MinorEventType.DESCRIPTION,
            description: data.executor.name + " procs " + data.skill.name + ". ",
            skillId: data.skill.id
        });

        // counter phase
        this.battleModel.processDamagePhase({
            attacker: data.executor,
            target: data.attacker,
            skill: data.skill,
            additionalDescription: data.executor.name + " counters " + data.attacker.name + "! ",
        });

        if (!data.executor.justMissed && !data.attacker.justEvaded && !data.attacker.isDead
            && data.skill.skillFunc === ENUM.SkillFunc.COUNTER) { // because this class can be subclassed. TODO: move the SkillFunc handling to processAffliction
            this.battleModel.processAffliction(data.executor, data.attacker, data.skill);
        }
    }
}
