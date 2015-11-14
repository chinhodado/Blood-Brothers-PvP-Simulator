/// <reference path="SkillLogic.ts"/>

class AfflictionSkillLogic extends SkillLogic {
    execute(data: SkillLogicData) {
        data.skill.getReady(data.executor);

        var target: Card;
        while (target = data.skill.getTarget(data.executor)) {
            AfflictionSkillLogic.processAffliction(data.executor, target, data.skill);
        }
    }

    /**
     * This doesn't really belong here, but there's no really better place.
     * At least this is a better place than BattleModel and Affliction...
     * @param executor
     * @param target
     * @param skill
     * @param fixedProb
     * @returns {}
     */
    static processAffliction(executor: Card, target: Card, skill: Skill, fixedProb?: number) {
        var type: ENUM.AfflictionType = skill.skillFuncArg2;
        var prob: number = fixedProb ? fixedProb : skill.skillFuncArg3;

        if (!type) {
            return;
        }

        var option: AfflictOptParam = {};

        if (skill.skillFuncArg4) {
            if (type === ENUM.AfflictionType.POISON) {
                // envenom percent
                option.percent = skill.skillFuncArg4;
            }
            else if (type === ENUM.AfflictionType.SILENT || type === ENUM.AfflictionType.BLIND) {
                // turn num for silent & blind
                option.turnNum = skill.skillFuncArg4;
            }
            else if (type === ENUM.AfflictionType.BURN) {
                option.damage = skill.skillFuncArg4;
            }
        }

        if (skill.skillFuncArg5) {
            option.missProb = skill.skillFuncArg5;
        }

        if (Math.random() <= prob) {
            target.setAffliction(type, option);

            if (type === ENUM.AfflictionType.POISON) {
                // needed since poison is stacked
                var percent = target.getPoisonPercent();
            }

            var logger = BattleLogger.getInstance();
            logger.addMinorEvent({
                executorId: executor.id,
                targetId: target.id,
                type: ENUM.MinorEventType.AFFLICTION,
                affliction: {
                    type: type,
                    duration: option.turnNum,
                    percent: percent,
                    missProb: option.missProb
                },
                description: target.name + " is now " + ENUM.AfflictionType[type],
            });
        }
    }
}
