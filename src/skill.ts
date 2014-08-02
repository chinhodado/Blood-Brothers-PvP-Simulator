class Skill {

    static availableSkillsForSelect: number[] = null;

    id: number;
    name: string;
    skillType: number;
    skillFunc: number;
    skillCalcType: number;
    skillFuncArg1: number;
    skillFuncArg2: number;
    skillFuncArg3: number;
    skillFuncArg4: number;
    skillFuncArg5: number;
    skillRange: number;
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

    static isAttackSkill(skillId: number): boolean {
        var isAttackSkill = false;
        var skillInfo = SkillDatabase[skillId];

        switch (skillInfo.func) {
            case ENUM.SkillFunc.ATTACK:
            case ENUM.SkillFunc.MAGIC:
            case ENUM.SkillFunc.DEBUFFATTACK:
            case ENUM.SkillFunc.DEBUFFINDIRECT:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_ATTACK:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC:
            case ENUM.SkillFunc.DRAIN_ATTACK:
            case ENUM.SkillFunc.DRAIN_MAGIC:
                isAttackSkill = true;
                break;
            default:
                break;
        }

        return isAttackSkill;
    }

    static isIndirectSkill(skillId: number): boolean {
        var isIndirect = true;
        var skillInfo = SkillDatabase[skillId];

        switch (skillInfo.func) {
            case ENUM.SkillFunc.ATTACK:
            case ENUM.SkillFunc.COUNTER:
            case ENUM.SkillFunc.PROTECT_COUNTER:
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

    // mainly for displaying the wis circle when attack
    static isWisAutoAttack(skillId: number): boolean {
        var isWisAutoAttack = false;
        var skillInfo = SkillDatabase[skillId];

        if (this.isAutoAttackSkill(skillId) && skillInfo.calc == ENUM.SkillCalcType.WIS) {
            isWisAutoAttack = true;    
        }

        return isWisAutoAttack;
    }

    static isAtkIndepAutoAttack(skillId: number): boolean {
        var skillInfo = SkillDatabase[skillId];

        return this.isAutoAttackSkill(skillId) && skillInfo.calc == ENUM.SkillCalcType.ATK
            && (skillInfo.func == ENUM.SkillFunc.MAGIC || skillInfo.func == ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC);
    }

    static isAutoAttackSkill(skillId: number): boolean {
        // either return true or undefined
        return SkillDatabase[skillId].isAutoAttack;
    }

    // mainly used to determine whether to use the magic circle
    static isMagicSkill(skillId: number): boolean {
        var isMagicSkill = false;
        var skillInfo = SkillDatabase[skillId];

        if (skillInfo.calc == ENUM.SkillCalcType.WIS ||
            skillInfo.func == ENUM.SkillFunc.AFFLICTION ||
            skillInfo.func == ENUM.SkillFunc.BUFF ||
            skillInfo.func == ENUM.SkillFunc.DEBUFF ||
            skillInfo.func == ENUM.SkillFunc.MAGIC ||
            skillInfo.func == ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC ||
            skillInfo.func == ENUM.SkillFunc.DRAIN_MAGIC)
        {
            isMagicSkill = true;    
        }

        return isMagicSkill;
    }

    // mainly used to determine the animation
    static isAoeSkill(skillId: number): boolean {
        var isAoe = false;
        var skillInfo = SkillDatabase[skillId];

        if (RangeFactory.canBeAoeRange(skillInfo.range) && this.isIndirectSkill(skillId)) {
            isAoe = true;    
        }

        return isAoe;
    }

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

    static isAvailableForSelect(skillId: number): boolean {
        var isAvailable = true;
        var skillInfo = SkillDatabase[skillId];

        if (skillInfo.isAutoAttack || skillId == 355 || skillId == 452) {
            isAvailable = false;
        }

        return isAvailable;
    }

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

    // get the list of stats status modified by the skill. Mainly used for displaying the status text
    static getStatusModified(skillId: number) {
        var skillInfo = SkillDatabase[skillId];
        var statuses = [];

        switch (skillInfo.func) {
            case ENUM.SkillFunc.BUFF:
                statuses.push(skillInfo.arg2);
                if (skillInfo.arg3) statuses.push(skillInfo.arg3);
                break;
            // todo: add DEBUFF here
            case ENUM.SkillFunc.DEBUFFATTACK:
            case ENUM.SkillFunc.DEBUFFINDIRECT:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_ATTACK:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC:
                statuses.push(skillInfo.arg2);
                break;
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF:
                statuses.push(skillInfo.arg2);
                if (skillInfo.arg3) statuses.push(skillInfo.arg3);
                break;
            default:
                break;
        }

        return statuses;
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
        }
    }
    
    getSkillFuncArg(argnum : number) {
        if (argnum == 1) {
            return this.skillFuncArg1;
        }
        else if (argnum == 2) {
            return this.skillFuncArg2;
        }
        else if (argnum == 3) {
            return this.skillFuncArg3;
        }
        else if (argnum == 4) {
            return this.skillFuncArg4;
        }
        else if (argnum == 5) {
            return this.skillFuncArg5;
        }
    }

    willBeExecuted(data: SkillLogicData) {
        return this.logic.willBeExecuted(data);
    }

    execute(data: SkillLogicData) {
        return this.logic.execute(data);
    }

    getTargets(executor: Card): Card[] {
        return this.range.getTargets(executor);
    }
}