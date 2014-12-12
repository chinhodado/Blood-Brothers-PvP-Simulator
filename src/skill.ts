class Skill {
    static availableSkillsForSelect: number[] = null;

    id: number;
    name: string;
    skillType: ENUM.SkillType;
    skillFunc: ENUM.SkillFunc;
    skillCalcType: ENUM.SkillCalcType;
    skillFuncArg1: number;
    skillFuncArg2: number;
    skillFuncArg3: number;
    skillFuncArg4: number;
    skillFuncArg5: number;
    skillRange: ENUM.SkillRange;
    maxProbability: number;
    ward: ENUM.WardType;
    description: string;
    isAutoAttack: boolean;

    range: BaseRange;
    logic: SkillLogic;

    constructor (skillId: number) {
        var skillData = SkillDatabase[skillId];

        this.id = skillId;
        this.name = skillData.name;
        this.skillType = skillData.type;
        this.skillFunc = skillData.func;
        this.skillCalcType = skillData.calc;
        this.skillFuncArg1 = skillData.arg1? skillData.arg1 : 0;
        this.skillFuncArg2 = skillData.arg2? skillData.arg2 : 0;
        this.skillFuncArg3 = skillData.arg3? skillData.arg3 : 0;
        this.skillFuncArg4 = skillData.arg4? skillData.arg4 : 0;
        this.skillFuncArg5 = skillData.arg5? skillData.arg5 : 0;
        this.skillRange = skillData.range;
        this.maxProbability = skillData.prob;
        this.ward = skillData.ward;
        this.description = skillData.desc;
        this.isAutoAttack = skillData.isAutoAttack;

        this.logic = SkillLogicFactory.getSkillLogic(this.skillFunc);

        var selectDead = false;
        if (this.skillFunc === ENUM.SkillFunc.REVIVE) {
            selectDead = true;
        }
        this.range = RangeFactory.getRange(this.skillRange, selectDead);
    }

    /**
     * Return true if this is an attack skill
     */
    static isAttackSkill(skillId: number): boolean {
        var isAttackSkill = false;
        var skillInfo = SkillDatabase[skillId];

        switch (skillInfo.func) {
            case ENUM.SkillFunc.ATTACK:
            case ENUM.SkillFunc.MAGIC:
            case ENUM.SkillFunc.COUNTER:
            case ENUM.SkillFunc.PROTECT_COUNTER:
            case ENUM.SkillFunc.DEBUFFATTACK:
            case ENUM.SkillFunc.DEBUFFINDIRECT:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_ATTACK:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC:
            case ENUM.SkillFunc.DRAIN_ATTACK:
            case ENUM.SkillFunc.DRAIN_MAGIC:
            case ENUM.SkillFunc.KILL:
                isAttackSkill = true;
                break;
            default:
                break;
        }

        return isAttackSkill;
    }

    /**
     * Return true if the skill does not make contact
     */
    static isIndirectSkill(skillId: number): boolean {
        var isIndirect = true;
        var skillInfo = SkillDatabase[skillId];

        switch (skillInfo.func) {
            case ENUM.SkillFunc.ATTACK:
            case ENUM.SkillFunc.COUNTER:
            case ENUM.SkillFunc.PROTECT_COUNTER:
            case ENUM.SkillFunc.PROTECT_REFLECT:
            case ENUM.SkillFunc.DEBUFFATTACK:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_ATTACK:
            case ENUM.SkillFunc.DRAIN_ATTACK:
                isIndirect = false;
                break;
            default:
                break;
        }

        return isIndirect;
    }

    static isPositionIndependentAttackSkill(skillId: number): boolean {
        var skillInfo = SkillDatabase[skillId];

        // generally, indirect skills are position independent
        // however, kill skills are indirect (do not make contact) but not position independent
        // No need to use this for WIS-based skills since they are always pos. independent
        return this.isIndirectSkill(skillId) && skillInfo.func != ENUM.SkillFunc.KILL;
    }

    /**
     * Return true if this is a WIS-based auto attack
     * (mainly used for displaying the wis circle when attack)
     */
    static isWisAutoAttack(skillId: number): boolean {
        var skillInfo = SkillDatabase[skillId];
        return this.isAutoAttackSkill(skillId) && skillInfo.calc == ENUM.SkillCalcType.WIS;
    }

    /**
     * Return true if this is a ATK-based auto attack
     */
    static isAtkAutoAttack(skillId: number): boolean {
        var skillInfo = SkillDatabase[skillId];

        return this.isAutoAttackSkill(skillId) && skillInfo.calc == ENUM.SkillCalcType.ATK;
    }

    /**
     * Return true if this is an auto attack, and false or undefined if not
     */
    static isAutoAttackSkill(skillId: number): boolean {
        return SkillDatabase[skillId].isAutoAttack;
    }

    /**
     * Return true if this is a magic skill
     * (mainly used to determine whether to use the magic circle)
     */
    static isMagicSkill(skillId: number): boolean {
        var isMagicSkill = false;
        var skillInfo = SkillDatabase[skillId];

        if (skillInfo.calc == ENUM.SkillCalcType.WIS) {
            isMagicSkill = true;
        }

        if ([ENUM.SkillFunc.AFFLICTION,
            ENUM.SkillFunc.BUFF,
            ENUM.SkillFunc.DEBUFF,
            ENUM.SkillFunc.MAGIC,
            ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC,
            ENUM.SkillFunc.DRAIN_MAGIC].indexOf(skillInfo.func) != -1) {
            isMagicSkill = true;
        }

        return isMagicSkill;
    }

    /**
     * Return true if this is an AoE skill
     * (mainly used to determine the animation)
     */
    static isAoeSkill(skillId: number): boolean {
        var isAoe = false;
        var skillInfo = SkillDatabase[skillId];

        if (RangeFactory.canBeAoeRange(skillInfo.range) && this.isIndirectSkill(skillId)) {
            isAoe = true;
        }

        return isAoe;
    }

    /**
     * Return true if this is an attack skill with debuff
     */
    static isDebuffAttackSkill(skillId: number): boolean {
        var isDebuffAttack = false;
        var skillInfo = SkillDatabase[skillId];

        switch (skillInfo.func) {
            case ENUM.SkillFunc.DEBUFFATTACK:
            case ENUM.SkillFunc.DEBUFFINDIRECT:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_ATTACK:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC:
                isDebuffAttack = true;
                break;
            default:
                break;
        }

        return isDebuffAttack;
    }

    /**
     * Return true if this skill should be available for user to select, or available to be randomly chosen
     */
    static isAvailableForSelect(skillId: number): boolean {
        var isAvailable = true;
        var skillInfo = SkillDatabase[skillId];

        if (skillInfo.isAutoAttack || skillId == 355 || skillId == 452) {
            isAvailable = false;
        }

        return isAvailable;
    }

    /**
     * Return a list of ids of the skills available for selection
     */
    static getAvailableSkillsForSelect(): number[] {
        if (this.availableSkillsForSelect == null) {
            this.availableSkillsForSelect = [];
            for (var key in SkillDatabase) {
                if (this.isAvailableForSelect(key)) {
                    this.availableSkillsForSelect.push(key);
                }
            }
        }

        return this.availableSkillsForSelect;
    }

    /**
     * Return the list of stats status modified by the skill.
     * (mainly used for displaying the status text)
     */
    static getStatusModified(skillId: number): ENUM.StatusType[] {
        var skillInfo = SkillDatabase[skillId];
        var statuses = [];

        switch (skillInfo.func) {
            case ENUM.SkillFunc.BUFF:
                statuses.push(skillInfo.arg2);
                if (skillInfo.arg3 && skillInfo.arg2 != ENUM.StatusType.HP_SHIELD) statuses.push(skillInfo.arg3);
                break;
            case ENUM.SkillFunc.DEBUFF:
            case ENUM.SkillFunc.DEBUFFATTACK:
            case ENUM.SkillFunc.DEBUFFINDIRECT:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_ATTACK:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC:
                statuses.push(skillInfo.arg2);
                break;
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF:
            case ENUM.SkillFunc.ONHIT_DEBUFF:
                statuses.push(skillInfo.arg2);
                if (skillInfo.arg3) statuses.push(skillInfo.arg3);
                break;
            default:
                break;
        }

        return statuses;
    }

    /**
     * Return true if the attack skill can be protected/evaded from the calc type
     */
    static canProtectFromCalcType(type: ENUM.SkillCalcType, attackSkill: Skill): boolean {
        switch (type) {
            case ENUM.SkillCalcType.ATK:
            case ENUM.SkillCalcType.WIS:
            case ENUM.SkillCalcType.AGI:
                return attackSkill.skillCalcType == type;
            case ENUM.SkillCalcType.ATK_WIS:
                return attackSkill.skillCalcType == ENUM.SkillCalcType.ATK || attackSkill.skillCalcType == ENUM.SkillCalcType.WIS;
            case ENUM.SkillCalcType.ATK_AGI:
                return attackSkill.skillCalcType == ENUM.SkillCalcType.ATK || attackSkill.skillCalcType == ENUM.SkillCalcType.AGI;
            case ENUM.SkillCalcType.WIS_AGI:
                return attackSkill.skillCalcType == ENUM.SkillCalcType.WIS || attackSkill.skillCalcType == ENUM.SkillCalcType.AGI;
            default:
                return false;
        }
    }

    /**
     * Return true if the attack skill can be protected from
     */
    static canProtectFromAttackType(type: ENUM.ProtectAttackType, attackSkill: Skill): boolean {
        switch (type) {
            case ENUM.ProtectAttackType.SKILL:
                return (attackSkill.skillFunc != ENUM.SkillFunc.COUNTER
                    && attackSkill.skillFunc != ENUM.SkillFunc.PROTECT_COUNTER
                    && attackSkill.skillFunc != ENUM.SkillFunc.COUNTER_INDIRECT
                    && attackSkill.id == 10000);
            case ENUM.ProtectAttackType.NOT_COUNTER:
                return (attackSkill.skillFunc != ENUM.SkillFunc.COUNTER
                     && attackSkill.skillFunc != ENUM.SkillFunc.PROTECT_COUNTER
                     && attackSkill.skillFunc != ENUM.SkillFunc.COUNTER_INDIRECT);
            default:
                throw new Error("Unimplemented ProtectAttackType");
        }
    }

    isIndirectSkill(): boolean {
        return Skill.isIndirectSkill(this.id);
    }

    getSerializableObject() {
        return {
            id: this.id,
            name: this.name,
            skillType: this.skillType,
            skillFunc: this.skillFunc,
            skillCalcType: this.skillCalcType,
            skillFuncArg1: this.skillFuncArg1,
            skillFuncArg2: this.skillFuncArg2,
            skillFuncArg3: this.skillFuncArg3,
            skillFuncArg4: this.skillFuncArg4,
            skillFuncArg5: this.skillFuncArg5,
            skillRange: this.skillRange,
            maxProbability: this.maxProbability,
            ward: this.ward,
            description: this.description,
            isAutoAttack: this.isAutoAttack
        };
    }

    willBeExecuted(data: SkillLogicData) {
        return this.logic.willBeExecuted(data);
    }

    execute(data: SkillLogicData) {
        return this.logic.execute(data);
    }

    getTarget(executor: Card): Card {
        return this.range.getTarget(executor);
    }

    getReady(executor: Card): void {
        this.range.getReady(executor);
    }
}
