/// <reference path="SkillLogic.ts"/>

class EvadeSkillLogic extends SkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        var skill = data.skill;
        skill.getReady(data.executor);

        // a fam cannot protect itself, unless the skillRange is MYSELF
        if (this.cardManager.isSameCard(data.targetCard, data.executor) && skill.skillRange !== ENUM.SkillRange.MYSELF) {
            return false;
        }

        var canEvade = Skill.canProtectFromCalcType(skill.skillFuncArg2, data.attackSkill)
            && Skill.canProtectFromAttackType(skill.skillFuncArg1, data.attackSkill);

        assert(!(skill.range instanceof RandomRange), "can't do this with random ranges!");
        return super.willBeExecuted(data) && this.cardManager.isCardInList(data.targetCard, skill.range.targets) && canEvade;
    }

    execute(data: SkillLogicData) {
        data.executor.justEvaded = true;

        this.logger.addMinorEvent({
            executorId: data.executor.id,
            type: ENUM.MinorEventType.DESCRIPTION,
            noProcEffect: true,
            description: data.executor.name + " procs " + data.skill.name,
            skillId: data.skill.id
        });

        this.battleModel.processDamagePhase({
            attacker: data.attacker,
            target: data.executor,
            skill: data.attackSkill,
            scaledRatio: data.scaledRatio,
            varyingRatio: data.varyingRatio
        });

        // update the targetsAttacked if necessary
        if (data.targetsAttacked) {
            data.targetsAttacked[data.executor.id] = true;
        }

        // clear the temp stuffs
        this.clearAllCardsDamagePhaseData();

        return {};
    }
}
