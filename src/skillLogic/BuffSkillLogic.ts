/// <reference path="SkillLogic.ts"/>

class BuffSkillLogic extends SkillLogic {
    willBeExecuted(data: SkillLogicData): boolean {
        var hasTarget = data.skill.range.hasValidTarget(data.executor);
        return super.willBeExecuted(data) && hasTarget;
    }

    execute(data: SkillLogicData) {
        var skill = data.skill;
        var executor = data.executor;
        skill.getReady(executor);

        // get a list of things to buff
        if (this.getComponentStatus(skill.skillFuncArg2) == null) {
            var statusToBuff: ENUM.StatusType[] = [skill.skillFuncArg2];

            // for hp shield buff, arg3 is the ceiling
            if (skill.skillFuncArg3 !== 0 && skill.skillFuncArg2 !== ENUM.StatusType.HP_SHIELD) {
                statusToBuff.push(skill.skillFuncArg3);
            }
        }
        else {
            statusToBuff = this.getComponentStatus(skill.skillFuncArg2);
        }

        var basedOnStatType = ENUM.SkillCalcType[skill.skillCalcType];

        // for ONHIT_BUFF, the calcType is 6 (Debuff), which doesn't make any sense. Anyway...
        var baseStat = skill.skillFunc === ENUM.SkillFunc.ONHIT_BUFF ? 0 : executor.getStat(basedOnStatType);

        var target: Card;
        while (target = skill.getTarget(executor)) {
            for (var j = 0; j < statusToBuff.length; j++) {
                var statusType = statusToBuff[j];

                switch (statusType) {
                    case ENUM.StatusType.ATK:
                    case ENUM.StatusType.DEF:
                    case ENUM.StatusType.WIS:
                    case ENUM.StatusType.AGI:
                        var skillMod = skill.skillFuncArg1;
                        if (skill.skillFunc === ENUM.SkillFunc.ONHIT_BUFF) {
                            if (skill.skillFuncArg4 === 0) {
                                throw new Error("Not sure what needs to happen here when arg4 = 0 for onhit buff. Check the manual.");
                            } else {
                                var buffAmount = Math.round(skillMod * skill.skillFuncArg4 * 100);
                            }
                        }
                        else {
                            // if the status type is not ALL_STATUS, we have to recalculate the base stat
                            if (skill.skillFuncArg2 !== ENUM.StatusType.ALL_STATUS) {
                                baseStat = executor.getStat(basedOnStatType);
                            }
                            buffAmount = Math.round(skillMod * baseStat);
                        }
                        break;
                    case ENUM.StatusType.ATTACK_RESISTANCE:
                    case ENUM.StatusType.MAGIC_RESISTANCE:
                    case ENUM.StatusType.BREATH_RESISTANCE:
                    case ENUM.StatusType.SKILL_PROBABILITY:
                    case ENUM.StatusType.WILL_ATTACK_AGAIN:
                    case ENUM.StatusType.ACTION_ON_DEATH:
                    case ENUM.StatusType.REMAIN_HP_ATK_UP:
                    case ENUM.StatusType.REMAIN_HP_DEF_UP:
                    case ENUM.StatusType.REMAIN_HP_WIS_UP:
                    case ENUM.StatusType.REMAIN_HP_AGI_UP:
                        buffAmount = skill.skillFuncArg1;
                        break;
                    case ENUM.StatusType.HP_SHIELD:
                        skillMod = skill.skillFuncArg1;
                        buffAmount = Math.round(skillMod * baseStat);
                        var maxValue = ~~(target.getOriginalHP() * skill.skillFuncArg3);
                        break;
                    default:
                        throw new Error("Wrong status type or not implemented");
                }

                target.changeStatus(statusType, buffAmount, false, maxValue);

                this.logger.addMinorEvent({
                    executorId: executor.id,
                    targetId: target.id,
                    type: ENUM.MinorEventType.STATUS,
                    status: {
                        type: statusType,
                        isAllUp: skill.skillFuncArg2 === ENUM.StatusType.ALL_STATUS
                    },
                    description: target.name + "'s " + ENUM.StatusType[statusType] + " increased by " + buffAmount,
                    amount: buffAmount,
                    skillId: skill.id
                });
            }
        }
    }
}
