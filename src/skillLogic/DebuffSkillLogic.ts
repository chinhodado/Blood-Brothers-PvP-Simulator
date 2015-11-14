/// <reference path="SkillLogic.ts"/>

class DebuffSkillLogic extends SkillLogic {
    execute(data: SkillLogicData) {
        var skill = data.skill;
        var executor = data.executor;
        skill.getReady(executor);

        var target: Card;
        while (target = skill.getTarget(executor)) {
            DebuffSkillLogic.processDebuff(executor, target, skill);
        }
    }

    static processDebuff(executor: Card, target: Card, skill: Skill) {
        var statuses: ENUM.StatusType[];
        var multi: number;
        var isNewLogic: boolean = false; // for caster-based debuff

        switch (skill.skillFunc) {
            case ENUM.SkillFunc.DEBUFFATTACK:
            case ENUM.SkillFunc.DEBUFFINDIRECT:
                statuses = [skill.skillFuncArg2];
                multi = skill.skillFuncArg4;
                break;
            case ENUM.SkillFunc.DEBUFF:
                statuses = [skill.skillFuncArg2];
                multi = skill.skillFuncArg1;
                break;
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF:
            case ENUM.SkillFunc.DEBUFF_AFFLICTION:
            case ENUM.SkillFunc.MULTI_DEBUFF:
                statuses = [skill.skillFuncArg2];
                if (skill.skillFuncArg3) statuses.push(skill.skillFuncArg3);
                multi = skill.skillFuncArg1;
                isNewLogic = true;
                break;
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_ATTACK:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC:
            case ENUM.SkillFunc.COUNTER_DEBUFF:
            case ENUM.SkillFunc.COUNTER_DEBUFF_INDIRECT:
            case ENUM.SkillFunc.PROTECT_COUNTER_DEBUFF:
                statuses = [skill.skillFuncArg2];
                multi = skill.skillFuncArg4;
                isNewLogic = true;
                break;
            case ENUM.SkillFunc.ONHIT_DEBUFF:
                statuses = [skill.skillFuncArg2];
                if (skill.skillFuncArg3) statuses.push(skill.skillFuncArg3);
                multi = skill.skillFuncArg1;
                isNewLogic = true;

                if (skill.skillFuncArg4) {
                    multi = skill.skillFuncArg4;
                    var isFlat = true;
                }
                break;
            default:
                throw new Error("Wrong skill to use with processDebuff()");
        }

        for (var i = 0; i < statuses.length; i++) {
            var status = statuses[i];
            if (status === ENUM.StatusType.SKILL_PROBABILITY) {
                var amount = -1 * skill.skillFuncArg1;
            }
            else {
                if (isFlat) {
                    var baseAmount = -100;
                }
                else if (!isNewLogic) {
                    baseAmount = getDebuffAmount(executor, target);
                }
                else {
                    baseAmount = getCasterBasedDebuffAmount(executor);
                }
                amount = Math.floor(baseAmount * multi);
            }

            target.changeStatus(status, amount, isNewLogic);
            var description = target.name + "'s " + ENUM.StatusType[status] + " decreased by " + Math.abs(amount);

            var logger = BattleLogger.getInstance();
            logger.addMinorEvent({
                executorId: executor.id,
                targetId: target.id,
                type: ENUM.MinorEventType.STATUS,
                status: {
                    type: status,
                    isNewLogic: isNewLogic
                },
                description: description,
                amount: amount,
                skillId: skill.id
            });
        }
    }
}
