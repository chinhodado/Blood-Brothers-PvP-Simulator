class Status {
    // the amount changed because of buffs or debuffs
    atk: number = 0;
    def: number = 0;
    wis: number = 0;
    agi: number = 0;

    attackResistance: number = 0;
    magicResistance: number = 0;
    breathResistance: number = 0;

    skillProbability: number = 0;

    remainHpAtkUp: number = 0;
    remainHpDefUp: number = 0;
    remainHpWisUp: number = 0;
    remainHpAgiUp: number = 0;

    actionOnDeath: number = 0;
    hpShield: number = 0;

    willAttackAgain: number = 0;

    isNewLogic = {};
} 
