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
    ward : string;
    contact: number;

    range : BaseRange;
    
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

        if (typeof skillData.contact === undefined) {
            this.contact = -1;
        }
        else {
            this.contact = skillData.contact;
        }
        
        this.range = RangeFactory.getInstance().getRange(this.skillRange);
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
}