class Skill {

    id : number;
    name : string;
    skillType : number;
    skillFunc : number;
    skillCalcType : number;
    skillFuncArg1 : number;
    skillFuncArg2 : number;
    skillFuncArg3 : number;
    skillFuncArg4 : number;
    skillFuncArg5 : number;
    skillRange : number;
    maxProbability : number;
    ward: string;
    isAutoAttack: boolean;

    range : BaseRange;
    logic: SkillLogic;

    constructor (skillId : number) {
    
        var skillData = SkillDatabase[skillId];
        
        this.id = skillId;
        this.name = skillData.name;
        this.skillType = skillData.skillType;
        this.skillFunc = skillData.skillFunc;
        this.skillCalcType = skillData.skillCalcType;
        this.skillFuncArg1 = skillData.skillFuncArg1;
        this.skillFuncArg2 = skillData.skillFuncArg2;
        this.skillFuncArg3 = skillData.skillFuncArg3;
        this.skillFuncArg4 = skillData.skillFuncArg4;
        this.skillFuncArg5 = skillData.skillFuncArg5;
        this.skillRange = skillData.skillRange;
        this.maxProbability = skillData.maxProbability;
        this.ward = skillData.ward;
        this.isAutoAttack = skillData.isAutoAttack;

        this.logic = SkillLogicFactory.getSkillLogic(this.skillFunc);
        
        this.range = RangeFactory.getRange(this.skillRange);
    }

    static isAttackSkill(skillId: number): boolean {
        var isAttackSkill = false;
        var skillInfo = SkillDatabase[skillId];

        if (skillInfo.skillFunc == ENUM.SkillFunc.ATTACK || 
            skillInfo.skillFunc == ENUM.SkillFunc.MAGIC ||
            skillInfo.skillFunc == ENUM.SkillFunc.DEBUFFATTACK ||
            skillInfo.skillFunc == ENUM.SkillFunc.DEBUFFINDIRECT) 
        {
            isAttackSkill = true;    
        }

        return isAttackSkill;
    }

    static isIndirectSkill(skillId: number): boolean {
        var isIndirect = true;
        var skillInfo = SkillDatabase[skillId];

        if (skillInfo.skillFunc == ENUM.SkillFunc.ATTACK || 
            skillInfo.skillFunc == ENUM.SkillFunc.COUNTER ||
            skillInfo.skillFunc == ENUM.SkillFunc.PROTECT_COUNTER) 
        {
            isIndirect = false;    
        }
        
        return isIndirect;
    }

    // mainly for displaying the wis circle when attack
    static isWisAutoAttack(skillId: number): boolean {
        var isWisAutoAttack = false;
        var skillInfo = SkillDatabase[skillId];

        if (this.isAutoAttackSkill(skillId) && skillInfo.skillCalcType == ENUM.SkillCalcType.WIS) {
            isWisAutoAttack = true;    
        }

        return isWisAutoAttack;
    }

    static isAutoAttackSkill(skillId: number): boolean {
        // either return true or undefined
        return SkillDatabase[skillId].isAutoAttack;
    }

    // mainly used to determine whether to use the magic circle
    static isMagicSkill(skillId: number): boolean {
        var isMagicSkill = false;
        var skillInfo = SkillDatabase[skillId];

        if (skillInfo.skillCalcType == ENUM.SkillCalcType.WIS ||
            skillInfo.skillFunc == ENUM.SkillFunc.AFFLICTION ||
            skillInfo.skillFunc == ENUM.SkillFunc.BUFF ||
            skillInfo.skillFunc == ENUM.SkillFunc.DEBUFF ||
            skillInfo.skillFunc == ENUM.SkillFunc.MAGIC)
        {
            isMagicSkill = true;    
        }

        return isMagicSkill;
    }

    // mainly used to determine the animation
    static isAoeSkill(skillId: number): boolean {
        var isAoe = false;
        var skillInfo = SkillDatabase[skillId];

        if (RangeFactory.canBeAoeRange(skillInfo.skillRange) && this.isIndirectSkill(skillId)) {
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