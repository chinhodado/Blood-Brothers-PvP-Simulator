﻿/// <reference path="SkillLogic.ts"/>

class AbsorbSkillLogic extends SkillLogic {
    execute(data: SkillLogicData) {
        // process the debuff first
        var skill = data.skill;
        var executor = data.executor;
        skill.getReady(executor);

        var target: Card;

        // get a list of statuses to absorb
        var statusToBuff = AbsorbSkillLogic.getComponentStatusFromBuffStatusType(skill.skillFuncArg2);

        var debuffMulti = skill.skillFuncArg3;
        while (target = skill.getTarget(executor)) {
            for (var j = 0; j < statusToBuff.length; j++) {
                var statusType = statusToBuff[j];

                // debuff phase
                // note: arg4 is the base stat for the debuff. We're not processing it here and
                // hopefully it will always be 2 (WIS)
                console.assert(skill.skillFuncArg4 === ENUM.SkillCalcType.WIS, "Non WIS-based debuff unimplemented!");
                // note: assuming the inner probability will always be 1 for this skillFunc
                console.assert(skill.skillFuncArg6 === 1, "Absorb doesn't have 100% probability - unimplemented!");

                // it's neither true nor false, since it has its own logic...
                var isNewLogic = false;

                // note: even though this is new logic, the 1.2 modifier is not applied.
                var debuffAmount = Math.floor(executor.getWIS() * debuffMulti); // <- the base debuff amount

                // get the maximum debuff amount
                var lowStatLimit = target.getOriginalStat(ENUM.StatusType[statusType]) * Card.NEW_DEBUFF_LOW_LIMIT_FACTOR;
                var currentStat = target.getStat(ENUM.StatusType[statusType]);
                var maxDebuffLimit = lowStatLimit > currentStat ? 0 : currentStat - lowStatLimit; // <- the maximum debuff amount

                if (debuffAmount > maxDebuffLimit) {
                    debuffAmount = maxDebuffLimit;
                }
                target.changeStatus(statusType, -debuffAmount, isNewLogic);

                this.logger.addMinorEvent({
                    executorId: executor.id,
                    targetId: target.id,
                    type: ENUM.MinorEventType.STATUS,
                    status: {
                        type: statusType,
                        isNewLogic: isNewLogic
                    },
                    description: target.name + "'s " + ENUM.StatusType[statusType] + " decreased by " + Math.abs(debuffAmount),
                    amount: -debuffAmount,
                    skillId: skill.id
                });

                // buff phase
                var buffAmount = Math.floor(Math.abs(debuffAmount) * skill.skillFuncArg5);
                executor.changeStatus(statusType, buffAmount, false);

                this.logger.addMinorEvent({
                    executorId: executor.id,
                    targetId: executor.id,
                    type: ENUM.MinorEventType.STATUS,
                    status: {
                        type: statusType,
                        isAllUp: skill.skillFuncArg2 === ENUM.StatusType.ALL_STATUS
                    },
                    description: executor.name + "'s " + ENUM.StatusType[statusType] + " increased by " + buffAmount,
                    amount: buffAmount,
                    skillId: skill.id
                });
            }
        }
    }

    static getComponentStatusFromBuffStatusType(type: ENUM.BuffStatusType): ENUM.StatusType[] {
        switch (type) {
            case ENUM.BuffStatusType.ATK:
                return [ENUM.StatusType.ATK];
            case ENUM.BuffStatusType.DEF:
                return [ENUM.StatusType.DEF];
            case ENUM.BuffStatusType.WIS:
                return [ENUM.StatusType.WIS];
            case ENUM.BuffStatusType.AGI:
                return [ENUM.StatusType.AGI];
            case ENUM.BuffStatusType.ATK_DEF:
                return [ENUM.StatusType.ATK, ENUM.StatusType.DEF];
            case ENUM.BuffStatusType.ATK_WIS:
                return [ENUM.StatusType.ATK, ENUM.StatusType.WIS];
            case ENUM.BuffStatusType.ATK_AGI:
                return [ENUM.StatusType.ATK, ENUM.StatusType.AGI];
            case ENUM.BuffStatusType.DEF_WIS:
                return [ENUM.StatusType.DEF, ENUM.StatusType.WIS];
            case ENUM.BuffStatusType.DEF_AGI:
                return [ENUM.StatusType.DEF, ENUM.StatusType.AGI];
            case ENUM.BuffStatusType.WIS_AGI:
                return [ENUM.StatusType.WIS, ENUM.StatusType.AGI];
            case ENUM.BuffStatusType.ATK_DEF_WIS:
                return [ENUM.StatusType.ATK, ENUM.StatusType.DEF, ENUM.StatusType.WIS];
            case ENUM.BuffStatusType.ATK_DEF_AGI:
                return [ENUM.StatusType.ATK, ENUM.StatusType.DEF, ENUM.StatusType.AGI];
            case ENUM.BuffStatusType.DEF_WIS_AGI:
                return [ENUM.StatusType.DEF, ENUM.StatusType.WIS, ENUM.StatusType.AGI];
            case ENUM.BuffStatusType.ALL_STATUS:
                return [ENUM.StatusType.ATK, ENUM.StatusType.DEF, ENUM.StatusType.WIS, ENUM.StatusType.AGI];
            default:
                return [ENUM.StatusType.WIS];
        }
    }
}
