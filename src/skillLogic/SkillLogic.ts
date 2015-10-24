/// <reference path="../interfaces/SkillLogicData.ts"/>

abstract class SkillLogic {
    battleModel: BattleModel;
    logger: BattleLogger;
    cardManager: CardManager;

    constructor() {
        this.battleModel = BattleModel.getInstance();
        this.logger = BattleLogger.getInstance();
        this.cardManager = CardManager.getInstance();
    }

    willBeExecuted(data: SkillLogicData): boolean {
        var deadCond = (data.executor.isDead && data.skill.skillType === ENUM.SkillType.ACTION_ON_DEATH) ||
            (!data.executor.isDead && data.skill.skillType !== ENUM.SkillType.ACTION_ON_DEATH);

        if (data.noProbCheck) {
            var probCond: boolean = true;
        }
        else {
            probCond = (Math.random() * 100) <= (data.skill.maxProbability + data.executor.status.skillProbability * 100 +
                data.executor.bcAddedProb);
        }

        return (deadCond &&
            data.executor.canAttack() && // if cannot attack -> cannot use skill, so the same. If can attack, true, doesn't matter
            data.executor.canUseSkill() &&
            probCond);
    }

    execute(data: SkillLogicData) {
        throw new Error("Implement this");
    }

    clearAllCardsDamagePhaseData() {
        var allCards = this.cardManager.getAllCurrentMainCards();
        for (var i = 0; i < allCards.length; i++) {
            allCards[i].clearDamagePhaseData();
        }
    }

    /**
     * If a status is a composed status, return an array of its component statuses
     * Otherwise, return null
     */
    getComponentStatus(type: ENUM.StatusType): ENUM.StatusType[] {
        switch (type) {
            case ENUM.StatusType.ALL_STATUS:
                return [ENUM.StatusType.ATK, ENUM.StatusType.DEF, ENUM.StatusType.WIS, ENUM.StatusType.AGI];
            case ENUM.StatusType.REMAIN_HP_ALL_STATUS_UP:
                return [ENUM.StatusType.REMAIN_HP_ATK_UP, ENUM.StatusType.REMAIN_HP_DEF_UP,
                    ENUM.StatusType.REMAIN_HP_WIS_UP, ENUM.StatusType.REMAIN_HP_AGI_UP];
            case ENUM.StatusType.REMAIN_HP_ATK_DEF_UP:
                return [ENUM.StatusType.REMAIN_HP_ATK_UP, ENUM.StatusType.REMAIN_HP_DEF_UP];
            case ENUM.StatusType.REMAIN_HP_ATK_WIS_UP:
                return [ENUM.StatusType.REMAIN_HP_ATK_UP, ENUM.StatusType.REMAIN_HP_WIS_UP];
            case ENUM.StatusType.REMAIN_HP_ATK_AGI_UP:
                return [ENUM.StatusType.REMAIN_HP_ATK_UP, ENUM.StatusType.REMAIN_HP_AGI_UP];
            case ENUM.StatusType.REMAIN_HP_DEF_WIS_UP:
                return [ENUM.StatusType.REMAIN_HP_DEF_UP, ENUM.StatusType.REMAIN_HP_WIS_UP];
            case ENUM.StatusType.REMAIN_HP_DEF_AGI_UP:
                return [ENUM.StatusType.REMAIN_HP_DEF_UP, ENUM.StatusType.REMAIN_HP_AGI_UP];
            case ENUM.StatusType.REMAIN_HP_WIS_AGI_UP:
                return [ENUM.StatusType.REMAIN_HP_WIS_UP, ENUM.StatusType.REMAIN_HP_AGI_UP];
            case ENUM.StatusType.REMAIN_HP_ATK_DEF_WIS_UP:
                return [ENUM.StatusType.REMAIN_HP_ATK_UP, ENUM.StatusType.REMAIN_HP_DEF_UP, ENUM.StatusType.REMAIN_HP_WIS_UP];
            case ENUM.StatusType.REMAIN_HP_ATK_DEF_AGI_UP:
                return [ENUM.StatusType.REMAIN_HP_ATK_UP, ENUM.StatusType.REMAIN_HP_DEF_UP, ENUM.StatusType.REMAIN_HP_AGI_UP];
            case ENUM.StatusType.REMAIN_HP_DEF_WIS_AGI_UP:
                return [ENUM.StatusType.REMAIN_HP_DEF_UP, ENUM.StatusType.REMAIN_HP_WIS_UP, ENUM.StatusType.REMAIN_HP_AGI_UP];
            case ENUM.StatusType.REMAIN_HP_ATK_WIS_AGI_UP:
                return [ENUM.StatusType.REMAIN_HP_ATK_UP, ENUM.StatusType.REMAIN_HP_WIS_UP, ENUM.StatusType.REMAIN_HP_AGI_UP];
            default:
                return null;
        }
    }
}
