module ENUM {

    /**
     * Is the skill opening, attack, defense, etc.
     */
    export enum SkillType {
        OPENING = 1,
        ATTACK = 2,
        DEFENSE = 3,
        FIELD = 4,
        PROTECT = 5,
        RANDOM = 9,
        TEMPORARY = 10,
        ACTION_ON_DEATH = 16,
        BUFF_ON_DEATH = 17
    }
    
    /**
     * Is the skill buff, attack, magic, etc.
     */
    export enum SkillFunc {
        NO_MULTIPLE_SKILL = -2,
        NO_SKILL = -1,
        BUFF = 1,
        DEBUFF = 2,
        ATTACK = 3,
        MAGIC = 4,
        COOP = 5,
        REVIVE = 6,
        KILL = 7,
        STEAL = 8,
        CHARGE = 9,
        DRAIN = 11,
        PROTECT = 12,
        COUNTER = 13,
        PROTECT_COUNTER = 14,
        TREASURE_HUNTER = 15,
        CLEAR_BUFF = 16,
        SUICIDE = 17,
        HEAL = 18,
        AFFLICTION = 19,
        PATIENCE = 20,
        DEBUFFATTACK = 21,
        DEBUFFINDIRECT = 22,
        IDLE = 23,
        RANDOM = 24,
        COPY = 25,
        IMITATE = 26,
        EVADE = 27,
        PROTECT_REFLECT = 28,
        PROTECT_DISPEL = 29,
        TURN_ORDER_CHANGE = 31
    }
    
    /**
     * Is the skill calculated based on atk, wis, agi, etc.
     */
    export enum SkillCalcType {
        DEFAULT = 0, // default is Wis
        ATK = 1,
        WIS = 2,
        AGI = 3, 
        HEAL = 4,
        BUFF = 5,
        DEBUFF = 6,
        REFLECT = 7
    };
    
    export enum StatType {
        HP, ATK, DEF, WIS, AGI
    }
    
    export enum StatusType {
        ATK = 1,
        DEF = 2,
        WIS = 3,
        AGI = 4,

        ATTACK_RESISTANCE = 5,
        MAGIC_RESISTANCE = 6,
        BREATH_RESISTANCE = 7,

        SKILL_PROBABILITY = 8,

        ALL_STATUS = 9, // ATK + DEF + WIS + AGI

        REMAIN_HP_ATK_UP = 11,
        REMAIN_HP_DEF_UP = 12,
        REMAIN_HP_WIS_UP = 13,
        REMAIN_HP_AGI_UP = 14,
        REMAIN_HP_ALL_STATUS_UP = 15,

        ACTION_ON_DEATH = 16,

        HP_SHIELD = 17,

        WILL_ATTACK_AGAIN = 18
    }
}


