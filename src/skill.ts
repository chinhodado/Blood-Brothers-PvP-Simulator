class Skill {

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

        if (skillInfo.func == ENUM.SkillFunc.ATTACK || 
            skillInfo.func == ENUM.SkillFunc.MAGIC ||
            skillInfo.func == ENUM.SkillFunc.DEBUFFATTACK ||
            skillInfo.func == ENUM.SkillFunc.DEBUFFINDIRECT) 
        {
            isAttackSkill = true;    
        }

        return isAttackSkill;
    }

    static isIndirectSkill(skillId: number): boolean {
        var isIndirect = true;
        var skillInfo = SkillDatabase[skillId];

        if (skillInfo.func == ENUM.SkillFunc.ATTACK || 
            skillInfo.func == ENUM.SkillFunc.COUNTER ||
            skillInfo.func == ENUM.SkillFunc.PROTECT_COUNTER ||
            skillInfo.func == ENUM.SkillFunc.DEBUFFATTACK) 
        {
            isIndirect = false;    
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
                                               && skillInfo.func == ENUM.SkillFunc.MAGIC;
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
            skillInfo.func == ENUM.SkillFunc.MAGIC)
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
        this.logic.execute(data);
    }

    getTargets(executor: Card): Card[] {
        return this.range.getTargets(executor);
    }
}