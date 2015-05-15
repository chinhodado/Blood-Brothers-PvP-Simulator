interface SkillLogicData {
    executor: Card;
    skill?: Skill;
    wouldBeDamage?: number; // the would-be damage, for survive skills
    scaledRatio?: number;
    varyingRatio?: number;
    attacker?: Card;    // for protect/counter
    attackSkill?: Skill; // for protect/counter
    targetCard?: Card;  // for protect
    targetsAttacked?: boolean[];  // for protect
    noProbCheck?: boolean; // for passing the prob check of proccing the skill, like for RandomSkillLogic
} 
