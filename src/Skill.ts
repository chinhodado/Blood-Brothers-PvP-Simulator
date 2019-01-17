/// <reference path="skillLogic/SkillLogicFactory.ts"/>

class Skill {
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
    skillFuncArg6: number;
    skillFuncArg7: number;
    skillFuncArg8: number;
    skillFuncArg9: number;
    skillFuncArg10: number;
    skillRange: ENUM.SkillRange;
    maxProbability: number;
    ward: ENUM.WardType;
    description: string;
    isAutoAttack: boolean;

    range: BaseRange;
    logic: SkillLogic;

    constructor (skillId: number) {
        let skillData = SkillDatabase[skillId];

        this.id = skillId;
        this.name = skillData.name;
        this.skillType = skillData.type;
        this.skillFunc = skillData.func;
        this.skillCalcType = skillData.calc;
        this.skillFuncArg1  = skillData.args && skillData.args[0]? skillData.args[0] : 0;
        this.skillFuncArg2  = skillData.args && skillData.args[1]? skillData.args[1] : 0;
        this.skillFuncArg3  = skillData.args && skillData.args[2]? skillData.args[2] : 0;
        this.skillFuncArg4  = skillData.args && skillData.args[3]? skillData.args[3] : 0;
        this.skillFuncArg5  = skillData.args && skillData.args[4]? skillData.args[4] : 0;
        this.skillFuncArg6  = skillData.args && skillData.args[5]? skillData.args[5] : 0;
        this.skillFuncArg7  = skillData.args && skillData.args[6]? skillData.args[6] : 0;
        this.skillFuncArg8  = skillData.args && skillData.args[7]? skillData.args[7] : 0;
        this.skillFuncArg9  = skillData.args && skillData.args[8]? skillData.args[8] : 0;
        this.skillFuncArg10 = skillData.args && skillData.args[9]? skillData.args[9] : 0;
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
     * @param srcSkillData: optional, the skill data from srcdb, if specified it will be used directly
     */
    static isAttackSkill(skillId: number, srcSkillData?: any): boolean {
        var skillInfo = srcSkillData? srcSkillData : SkillDatabase[skillId];
        var func = srcSkillData? srcSkillData.skillFunc : skillInfo.func;

        switch (func) {
            case ENUM.SkillFunc.ATTACK:
            case ENUM.SkillFunc.MAGIC:
            case ENUM.SkillFunc.COUNTER:
            case ENUM.SkillFunc.COUNTER_INDIRECT:
            case ENUM.SkillFunc.COUNTER_DEBUFF:
            case ENUM.SkillFunc.COUNTER_DEBUFF_INDIRECT:
            case ENUM.SkillFunc.COUNTER_DRAIN:
            case ENUM.SkillFunc.COUNTER_DRAIN_INDIRECT:
            case ENUM.SkillFunc.PROTECT_COUNTER:
            case ENUM.SkillFunc.PROTECT_COUNTER_DEBUFF:
            case ENUM.SkillFunc.DEBUFFATTACK:
            case ENUM.SkillFunc.DEBUFFINDIRECT:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_ATTACK:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC:
            case ENUM.SkillFunc.DRAIN_ATTACK:
            case ENUM.SkillFunc.DRAIN_MAGIC:
            case ENUM.SkillFunc.KILL:
            case ENUM.SkillFunc.ABSORB_ATTACK:
            case ENUM.SkillFunc.ABSORB_MAGIC:
                return true;
            default:
                return false;
        }
    }

    /**
     * Return true if the skill does not make contact
     * @param srcSkillData: optional, the skill data from srcdb, if specified it will be used directly
     */
    static isIndirectSkill(skillId: number, srcSkillData?: any): boolean {
        var skillInfo = srcSkillData? srcSkillData : SkillDatabase[skillId];
        var func = srcSkillData? srcSkillData.skillFunc : skillInfo.func;

        switch (func) {
            case ENUM.SkillFunc.ATTACK:
            case ENUM.SkillFunc.COUNTER:
            case ENUM.SkillFunc.COUNTER_DEBUFF:
            case ENUM.SkillFunc.COUNTER_DRAIN:
            case ENUM.SkillFunc.PROTECT_COUNTER:
            case ENUM.SkillFunc.PROTECT_COUNTER_DEBUFF:
            case ENUM.SkillFunc.PROTECT_REFLECT:
            case ENUM.SkillFunc.DEBUFFATTACK:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_ATTACK:
            case ENUM.SkillFunc.DRAIN_ATTACK:
            case ENUM.SkillFunc.ABSORB_ATTACK:
                return false;
            default:
                return true;
        }
    }

    static isPositionIndependentAttackSkill(skillId: number, srcSkillData?: any): boolean {
        let skillInfo = srcSkillData? srcSkillData : SkillDatabase[skillId];
        let func = srcSkillData? srcSkillData.skillFunc : skillInfo.func;

        // generally, indirect skills are position independent
        // however, kill skills are indirect (do not make contact) but not position independent
        // No need to use this for WIS-based skills since they are always pos. independent
        return this.isIndirectSkill(skillId, srcSkillData) && func !== ENUM.SkillFunc.KILL;
    }

    /**
     * Return the ward type of the attack skill. ONLY USE THIS FOR SRCDB!
     * @param srcSkillData: the skill data from srcdb
     */
    static getWardType(srcSkillData): ENUM.WardType {
        let wardType = undefined;
        if (Skill.isAttackSkill(null, srcSkillData)) {
            if (Skill.isPositionIndependentAttackSkill(null, srcSkillData)) {
                let isCalcAtk = srcSkillData.skillCalcType === ENUM.SkillCalcType.ATK;
                let isCalcWisOrAgi = srcSkillData.skillCalcType === ENUM.SkillCalcType.WIS ||
                                     srcSkillData.skillCalcType === ENUM.SkillCalcType.AGI;
                if (isCalcAtk) {
                    wardType = ENUM.WardType.PHYSICAL;
                } else if (isCalcWisOrAgi) {
                    let isEffectBreath = [17, 18, 19].indexOf(srcSkillData.casterEffectId) !== -1;
                    if (isEffectBreath) {
                        wardType = ENUM.WardType.BREATH;
                    } else {
                        wardType = ENUM.WardType.MAGICAL;
                    }
                }
            } else {
                wardType = ENUM.WardType.PHYSICAL;
            }
        }
        return wardType;
    }

    /**
     * Return true if this is a WIS-based auto attack
     * (mainly used for displaying the wis circle when attack)
     */
    static isWisAutoAttack(skillId: number): boolean {
        let skillInfo = SkillDatabase[skillId];
        return this.isAutoAttackSkill(skillId) && skillInfo.calc === ENUM.SkillCalcType.WIS;
    }

    /**
     * Return true if this is a ATK-based auto attack
     */
    static isAtkAutoAttack(skillId: number): boolean {
        let skillInfo = SkillDatabase[skillId];

        return this.isAutoAttackSkill(skillId) && skillInfo.calc === ENUM.SkillCalcType.ATK;
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
        let skillInfo = SkillDatabase[skillId];

        if (skillInfo.calc === ENUM.SkillCalcType.WIS) {
            return true;
        }

        // hmmm is this true? I think so...
        if (skillInfo.type === ENUM.SkillType.OPENING) {
            return true;
        }

        if ([ENUM.SkillFunc.AFFLICTION,
            ENUM.SkillFunc.BUFF,
            ENUM.SkillFunc.DEBUFF,
            ENUM.SkillFunc.MULTI_BUFF,
            ENUM.SkillFunc.MULTI_DEBUFF,
            ENUM.SkillFunc.DEBUFF_AFFLICTION,
            ENUM.SkillFunc.MAGIC,
            ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC,
            ENUM.SkillFunc.ABSORB,
            ENUM.SkillFunc.DRAIN_MAGIC].indexOf(skillInfo.func) !== -1) {
            return true;
        }

        return false;
    }

    /**
     * Return true if this is an AoE skill
     * (mainly used to determine the animation)
     */
    static isAoeSkill(skillId: number): boolean {
        let isAoe = false;
        let skillInfo = SkillDatabase[skillId];

        if (RangeFactory.canBeAoeRange(skillInfo.range) && this.isIndirectSkill(skillId)) {
            isAoe = true;
        }

        return isAoe;
    }

    /**
     * Return true if this is an attack skill with debuff
     */
    static isDebuffAttackSkill(skillId: number): boolean {
        let isDebuffAttack = false;
        let skillInfo = SkillDatabase[skillId];

        switch (skillInfo.func) {
            case ENUM.SkillFunc.DEBUFFATTACK:
            case ENUM.SkillFunc.DEBUFFINDIRECT:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_ATTACK:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC:
            // not sure about these 2
            case ENUM.SkillFunc.COUNTER_DEBUFF:
            case ENUM.SkillFunc.COUNTER_DEBUFF_INDIRECT:
            case ENUM.SkillFunc.PROTECT_COUNTER_DEBUFF:
                isDebuffAttack = true;
                break;
            default:
                break;
        }

        return isDebuffAttack;
    }

    /**
     * Return the list of stats status modified by the skill.
     * (mainly used for displaying the status text)
     */
    static getStatusModified(skillId: number): ENUM.StatusType[] {
        let skillInfo = SkillDatabase[skillId];
        let statuses = [];

        switch (skillInfo.func) {
            case ENUM.SkillFunc.BUFF:
                statuses.push(skillInfo.args[1]);
                if (skillInfo.args[2] && skillInfo.args[1] !== ENUM.StatusType.HP_SHIELD) statuses.push(skillInfo.args[2]);
                break;
            case ENUM.SkillFunc.MULTI_BUFF:
                statuses.push(skillInfo.args[1]);
                if (skillInfo.args[2] && skillInfo.args[1] !== ENUM.StatusType.HP_SHIELD) statuses.push(skillInfo.args[2]);
                statuses.push(skillInfo.args[6]);
                if (skillInfo.args[7] && skillInfo.args[6] !== ENUM.StatusType.HP_SHIELD) statuses.push(skillInfo.args[7]);
                break;
            case ENUM.SkillFunc.DEBUFF:
            case ENUM.SkillFunc.DEBUFFATTACK:
            case ENUM.SkillFunc.DEBUFFINDIRECT:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_ATTACK:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC:
            case ENUM.SkillFunc.DEBUFF_AFFLICTION:
            case ENUM.SkillFunc.COUNTER_DEBUFF:
            case ENUM.SkillFunc.COUNTER_DEBUFF_INDIRECT:
            case ENUM.SkillFunc.PROTECT_COUNTER_DEBUFF:
                statuses.push(skillInfo.args[1]);
                break;
            case ENUM.SkillFunc.MULTI_DEBUFF:
                statuses.push(skillInfo.args[1]);
                statuses.push(skillInfo.args[6]);
                break;
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF:
            case ENUM.SkillFunc.ONHIT_DEBUFF:
            case ENUM.SkillFunc.ONHIT_BUFF:
                statuses.push(skillInfo.args[1]);
                if (skillInfo.args[2]) statuses.push(skillInfo.args[2]);
                break;
            case ENUM.SkillFunc.ABSORB:
            case ENUM.SkillFunc.ABSORB_ATTACK:
            case ENUM.SkillFunc.ABSORB_MAGIC:
                statuses = AbsorbSkillLogic.getComponentStatusFromBuffStatusType(skillInfo.args[1]);
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
            case ENUM.SkillCalcType.DEFAULT:
                return true;
            case ENUM.SkillCalcType.ATK:
            case ENUM.SkillCalcType.WIS:
            case ENUM.SkillCalcType.AGI:
                return attackSkill.skillCalcType === type;
            case ENUM.SkillCalcType.ATK_WIS:
                return attackSkill.skillCalcType === ENUM.SkillCalcType.ATK || attackSkill.skillCalcType === ENUM.SkillCalcType.WIS;
            case ENUM.SkillCalcType.ATK_AGI:
                return attackSkill.skillCalcType === ENUM.SkillCalcType.ATK || attackSkill.skillCalcType === ENUM.SkillCalcType.AGI;
            case ENUM.SkillCalcType.WIS_AGI:
                return attackSkill.skillCalcType === ENUM.SkillCalcType.WIS || attackSkill.skillCalcType === ENUM.SkillCalcType.AGI;
            default:
                throw new Error("Unimplemented calcType for canProtectFromCalcType()");
        }
    }

    /**
     * Return true if the attack skill can be protected from
     */
    static canProtectFromAttackType(type: ENUM.ProtectAttackType, attackSkill: Skill): boolean {
        switch (type) {
            case ENUM.ProtectAttackType.SKILL:
                return (attackSkill.skillFunc !== ENUM.SkillFunc.COUNTER
                    && attackSkill.skillFunc !== ENUM.SkillFunc.PROTECT_COUNTER
                    && attackSkill.skillFunc !== ENUM.SkillFunc.PROTECT_COUNTER_DEBUFF
                    && attackSkill.skillFunc !== ENUM.SkillFunc.COUNTER_INDIRECT
                    && attackSkill.id !== 10000);
            case ENUM.ProtectAttackType.NOT_COUNTER:
                return (attackSkill.skillFunc !== ENUM.SkillFunc.COUNTER
                     && attackSkill.skillFunc !== ENUM.SkillFunc.PROTECT_COUNTER
                     && attackSkill.skillFunc !== ENUM.SkillFunc.PROTECT_COUNTER_DEBUFF
                     && attackSkill.skillFunc !== ENUM.SkillFunc.COUNTER_INDIRECT);
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
            skillFuncArg6: this.skillFuncArg6,
            skillFuncArg7: this.skillFuncArg7,
            skillFuncArg8: this.skillFuncArg8,
            skillFuncArg9: this.skillFuncArg9,
            skillFuncArg10: this.skillFuncArg10,
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

    /**
     * Return true if confusion is currently set on the skill
     * (i.e. the skill has a chance to be confused)
     */
    isConfused(): boolean {
        return this.range.isConfused;
    }

    /**
     * Clear confusion on the skill
     */
    clearConfuse(): void {
        this.range.isConfused = false;
    }

    /**
     * Set confusion on the skill
     * @param prob The confusion probability
     */
    setConfuse(prob: number): void {
        if (Affliction.canConfuse(this.skillType)) {
            this.range.setConfuse(prob);
        }
    }
}
