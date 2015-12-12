interface SkillInfo {
    name: string;
    type: ENUM.SkillType;
    func: ENUM.SkillFunc;
    calc: ENUM.SkillCalcType;
    args?: number[];          // Only need to include the first n args such that the nth arg is
                              // the last arg that has a value (i.e. not 0)
                              // some skillFuncs don't need args (dispel, random)
    randSkills?: number[];    // array of random skill ids for random skills
    range :ENUM.SkillRange;
    prob: number;             // skill proc probability. There's no need for the baseProbability
    ward?: ENUM.WardType;     // needed for attack skills. For definition of attack skills, see Skill.isAttackSkill()
    sac?: number;             // For saccable skills, need to include sac: 1
    isAutoAttack?: boolean;   // For auto attacks, need to include isAutoAttack: true
    desc: string;
}

interface SkillMap {
    [id: number]: SkillInfo;
}

var SkillDatabase: SkillMap = {
    10000: {
        name: "Default auto", type: 2, func: 3, calc: 1,
        args: [1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    2: {
        name: "Strength of Blades", type: 1, func: 1, calc: 0,
        args: [0.5, 1],
        range: 3, prob: 70, sac: 1,
        desc: "Raise ATK of self and adjacent familiars."
    },

    4: {
        name: "Guile of Runes", type: 1, func: 1, calc: 0,
        args: [0.5, 3],
        range: 3, prob: 70, sac: 1,
        desc: "Raise WIS of self and adjacent familiars."
    },

    5: {
        name: "Grace of Winds", type: 1, func: 1, calc: 0,
        args: [0.5, 4],
        range: 3, prob: 70,
        desc: "Raise AGI of self and adjacent familiars."
    },

    6: {
        name: "Blade Break", type: 1, func: 2, calc: 0,
        args: [0.5, 1],
        range: 7, prob: 70,
        desc: "Lower ATK of up to three foes."
    },

    7: {
        name: "Shield Rend", type: 1, func: 2, calc: 0,
        args: [0.5, 2],
        range: 7, prob: 70,
        desc: "Lower DEF of up to three foes."
    },

    8: {
        name: "Mind Rust", type: 1, func: 2, calc: 0,
        args: [0.5, 3],
        range: 7, prob: 70,
        desc: "Lower WIS of up to three foes."
    },

    9: {
        name: "Speed Sap", type: 1, func: 2, calc: 0,
        args: [0.5, 4],
        range: 7, prob: 70, sac: 1,
        desc: "Lower AGI of up to three foes."
    },

    10: {
        name: "Scythe Storm", type: 2, func: 3, calc: 3,
        args: [1],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to all foes."
    },

    11: {
        name: "Torrent of Flame", type: 2, func: 4, calc: 2,
        args: [2],
        range: 8, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy damage to all foes."
    },

    16: {
        name: "Greater Recall", type: 2, func: 6, calc: 0,
        args: [1],
        range: 2, prob: 50, sac: 1,
        desc: "Revive and fully restore HP of adjacent familiars."
    },

    17: {
        name: "Berserk", type: 2, func: 3, calc: 1,
        args: [0.8],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal damage to six random targets."
    },

    18: {
        name: "Rush", type: 2, func: 3, calc: 3,
        args: [0.7],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to six random targets."
    },

    19: {
        name: "Dispell", type: 2, func: 16, calc: 0,
        range: 8, prob: 70, sac: 1,
        desc: "Remove the buffs of all foes."
    },

    20: {
        name: "Recall", type: 2, func: 6, calc: 0,
        args: [1],
        range: 1, prob: 50, sac: 1,
        desc: "Revive an adjacent familiar."
    },

    21: {
        name: "Elixir of Recall", type: 2, func: 6, calc: 0,
        args: [1],
        range: 1, prob: 50,
        desc: "Revive an adjacent familiar."
    },

    23: {
        name: "Breath of Flame", type: 2, func: 4, calc: 2,
        args: [2.5],
        range: 7, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy damage to up to three foes."
    },

    26: {
        name: "Greater Heal", type: 2, func: 18, calc: 4,
        args: [1],
        range: 2, prob: 30,
        desc: "Restore a fixed amount of HP to adjacent familiars."
    },

    27: {
        name: "Greater Healing Sage", type: 2, func: 18, calc: 4,
        args: [1],
        range: 2, prob: 30, sac: 1,
        desc: "Restore a fixed amount of HP to adjacent familiars."
    },

    28: {
        name: "Envenom", type: 2, func: 4, calc: 2,
        args: [1, 1, 1],
        range: 5, prob: 30, ward: 2, sac: 1,
        desc: "Deal damage and poison one foe."
    },

    29: {
        name: "Bind", type: 2, func: 4, calc: 2,
        args: [1, 2, 0.3],
        range: 5, prob: 30, ward: 2, sac: 1,
        desc: "Deal damage and sometimes paralyze one foe."
    },

    33: {
        name: "Whirlwind", type: 2, func: 3, calc: 3,
        args: [2.5],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to three foes."
    },

    34: {
        name: "Massive Assault", type: 2, func: 3, calc: 1,
        args: [4],
        range: 5, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive damage to one foe."
    },

    38: {
        name: "Heal", type: 2, func: 18, calc: 4,
        args: [1],
        range: 1, prob: 30,
        desc: "Restore a fixed amount of HP to an adjacent familiar."
    },

    39: {
        name: "Healing Sage", type: 2, func: 18, calc: 4,
        args: [1],
        range: 1, prob: 30,
        desc: "Restore a fixed amount of HP to an adjacent familiar."
    },

    40: {
        name: "Firestrike", type: 2, func: 4, calc: 2,
        args: [3],
        range: 5, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy damage to one foe."
    },

    41: {
        name: "Blizzard", type: 2, func: 4, calc: 2,
        args: [1, 3, 0.3],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Deal damage and sometimes freeze up to three foes."
    },

    42: {
        name: "Thunderstorm", type: 2, func: 4, calc: 2,
        args: [0.7],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal damage to all foes."
    },

    43: {
        name: "Windlash", type: 2, func: 3, calc: 3,
        args: [1],
        range: 16, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to multiple foes."
    },

    45: {
        name: "Intense Assault", type: 2, func: 3, calc: 1,
        args: [3],
        range: 5, prob: 30, ward: 1, sac: 1,
        desc: "Deal very heavy damage to one foe."
    },

    46: {
        name: "Brawl", type: 2, func: 3, calc: 1,
        args: [1],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Attack three foes."
    },

    47: {
        name: "Blastwave", type: 2, func: 4, calc: 2,
        args: [2],
        range: 12, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy damage to all foes in the front line."
    },

    48: {
        name: "Impale", type: 2, func: 4, calc: 1,
        args: [1],
        range: 6, prob: 30, ward: 1, sac: 1,
        desc: "Deal damage to up to two foes, ignoring position."
    },

    50: {
        name: "Focused Assault", type: 2, func: 3, calc: 1,
        args: [2],
        range: 5, prob: 30, ward: 1,
        desc: "Deal heavy damage to one foe."
    },

    51: {
        name: "Skirmish", type: 2, func: 3, calc: 1,
        args: [1],
        range: 6, prob: 30, ward: 1,
        desc: "Attack up to two foes."
    },

    52: {
        name: "Dervish", type: 2, func: 3, calc: 3,
        args: [2],
        range: 5, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to one foe."
    },

    54: {
        name: "Foul Fang", type: 2, func: 3, calc: 1,
        args: [1, 1, 1],
        range: 5, prob: 30, ward: 1, sac: 1,
        desc: "Poison one foe."
    },

    55: {
        name: "Embrace", type: 2, func: 3, calc: 1,
        args: [0.5, 4, 1],
        range: 5, prob: 30, ward: 1,
        desc: "Deal damage and disable one foe for one turn."
    },

    60: {
        name: "Syphon", type: 3, func: 11, calc: 1,
        args: [1],
        range: 1, prob: 50, sac: 1,
        desc: "Heal an adjacent familiar for the amount of damage taken."
    },

    61: {
        name: "Cloak & Dagger", type: 5, func: 14, calc: 1,
        args: [1],
        range: 2, prob: 50, ward: 1, sac: 1,
        desc: "Take damage in place of nearby ally and counter."
    },

    62: {
        name: "Cloak", type: 5, func: 12, calc: 1,
        args: [1],
        range: 2, prob: 50, sac: 1,
        desc: "Take damage in place of adjacent familiars."
    },

    63: {
        name: "Shroud", type: 5, func: 12, calc: 0,
        range: 4, prob: 50, sac: 1,
        desc: "Take damage in place of familiars."
    },

    64: {
        name: "Riposte", type: 3, func: 13, calc: 1,
        args: [1],
        range: 1, prob: 50, ward: 1, sac: 1,
        desc: "Counterattack after receiving an attack."
    },

    69: {
        name: "Lightning Bolt", type: 2, func: 4, calc: 2,
        args: [3],
        range: 5, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy damage to one foe."
    },

    70: {
        name: "Wind Cutter", type: 2, func: 4, calc: 2,
        args: [3],
        range: 5, prob: 30, ward: 2,
        desc: "Deal heavy damage to one foe."
    },

    71: {
        name: "Icicle", type: 2, func: 4, calc: 2,
        args: [3],
        range: 5, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy damage to one foe."
    },

    77: {
        name: "Blade Break 1", type: 1, func: 2, calc: 0,
        args: [0.1, 1],
        range: 8, prob: 70,
        desc: "Lower ATK of all foes."
    },

    78: {
        name: "Shield Rend 1", type: 1, func: 2, calc: 0,
        args: [0.1, 2],
        range: 8, prob: 70, sac: 1,
        desc: "Lower DEF of all foes."
    },

    79: {
        name: "Mind Rust 1", type: 1, func: 2, calc: 0,
        args: [0.1, 3],
        range: 8, prob: 70,
        desc: "Lower WIS of all foes."
    },

    80: {
        name: "Speed Sap 1", type: 1, func: 2, calc: 0,
        args: [0.1, 4],
        range: 8, prob: 70,
        desc: "Lower AGI of all foes."
    },

    81: {
        name: "Boon of Blade & Shield 2", type: 1, func: 1, calc: 0,
        args: [0.2, 1, 2],
        range: 4, prob: 70, sac: 1,
        desc: "Raise ATK and DEF of all familiars."
    },

    85: {
        name: "Grace of Winds 2", type: 1, func: 1, calc: 0,
        args: [0.2, 4],
        range: 4, prob: 70, sac: 1,
        desc: "Raise AGI of all familiars."
    },

    86: {
        name: "Blade Break 2", type: 1, func: 2, calc: 0,
        args: [0.2, 1],
        range: 8, prob: 70, sac: 1,
        desc: "Lower ATK of all foes."
    },

    87: {
        name: "Shield Rend 2", type: 1, func: 2, calc: 0,
        args: [0.2, 2],
        range: 8, prob: 70,
        desc: "Lower DEF of all foes."
    },

    88: {
        name: "Mind Rust 2", type: 1, func: 2, calc: 0,
        args: [0.2, 3],
        range: 8, prob: 70, sac: 1,
        desc: "Lower WIS of all foes."
    },

    89: {
        name: "Speed Sap 2", type: 1, func: 2, calc: 0,
        args: [0.2, 4],
        range: 8, prob: 70, sac: 1,
        desc: "Lower AGI of all foes."
    },

    94: {
        name: "Grace of Winds 3", type: 1, func: 1, calc: 0,
        args: [0.3, 4],
        range: 4, prob: 70, sac: 1,
        desc: "Raise AGI of all familiars."
    },

    95: {
        name: "Blade Break 3", type: 1, func: 2, calc: 0,
        args: [0.3, 1],
        range: 8, prob: 70, sac: 1,
        desc: "Lower ATK of all foes."
    },

    96: {
        name: "Shield Rend 3", type: 1, func: 2, calc: 0,
        args: [0.3, 2],
        range: 8, prob: 70, sac: 1,
        desc: "Lower DEF of all foes."
    },

    97: {
        name: "Mind Rust 3", type: 1, func: 2, calc: 0,
        args: [0.3, 3],
        range: 8, prob: 70, sac: 1,
        desc: "Lower WIS of all foes."
    },

    98: {
        name: "Speed Sap 3", type: 1, func: 2, calc: 0,
        args: [0.3, 4],
        range: 8, prob: 70, sac: 1,
        desc: "Lower AGI of all foes."
    },

    104: {
        name: "Blade Break 4", type: 1, func: 2, calc: 0,
        args: [0.4, 1],
        range: 8, prob: 70,
        desc: "Lower ATK of all foes."
    },

    105: {
        name: "Shield Rend 4", type: 1, func: 2, calc: 0,
        args: [0.4, 2],
        range: 8, prob: 70, sac: 1,
        desc: "Lower DEF of all foes."
    },

    106: {
        name: "Mind Rust 4", type: 1, func: 2, calc: 0,
        args: [0.4, 3],
        range: 8, prob: 70,
        desc: "Lower WIS of all foes."
    },

    107: {
        name: "Speed Sap 4", type: 1, func: 2, calc: 0,
        args: [0.4, 4],
        range: 8, prob: 70,
        desc: "Lower AGI of all foes."
    },

    108: {
        name: "Icestorm", type: 2, func: 4, calc: 2,
        args: [2],
        range: 8, prob: 30, ward: 3, sac: 1,
        desc: "Deal ice damage to all foes."
    },

    109: {
        name: "Plasma field", type: 2, func: 4, calc: 2,
        args: [2],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal lightning damage to all foes."
    },

    110: {
        name: "Typhoon", type: 2, func: 4, calc: 3,
        args: [2],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage to all foes."
    },

    111: {
        name: "Whorl of Wisdom", type: 2, func: 4, calc: 2,
        args: [1],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to three foes."
    },

    112: {
        name: "Whorl of Attack", type: 2, func: 3, calc: 1,
        args: [1],
        range: 16, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to three foes."
    },

    113: {
        name: "Thundercloud", type: 2, func: 4, calc: 2,
        args: [1, 2, 0.3],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Deal damage and sometimes paralyze up to three foes."
    },

    114: {
        name: "Electric Shock", type: 2, func: 4, calc: 2,
        args: [2.5],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy lightning damage to up to three foes."
    },

    115: {
        name: "Venomstorm", type: 2, func: 3, calc: 1,
        args: [1.5, 1, 1],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy poison damage to three foes."
    },

    116: {
        name: "Mass Greater Heal", type: 2, func: 18, calc: 4,
        args: [0.7],
        range: 4, prob: 30, sac: 1,
        desc: "Restore a fixed amount of HP to all party members."
    },

    117: {
        name: "Hellfire", type: 2, func: 4, calc: 2,
        args: [1],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Hurl a ball of flame to damage all foes."
    },

    118: {
        name: "Slashing Blade", type: 2, func: 3, calc: 1,
        args: [1],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes."
    },

    119: {
        name: "Flash of Rage", type: 2, func: 4, calc: 2,
        args: [0.9],
        range: 17, prob: 30, ward: 2, sac: 1,
        desc: "Call down six random lightning bolts on foes."
    },

    120: {
        name: "Boon of Mind & Shield 2", type: 1, func: 1, calc: 0,
        args: [0.2, 3, 2],
        range: 4, prob: 70, sac: 1,
        desc: "Raise WIS and DEF of all party members."
    },

    121: {
        name: "Charge", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to three foes, regardless of his position."
    },

    122: {
        name: "Frontal Onslaught", type: 2, func: 3, calc: 1,
        args: [1.5],
        range: 12, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy damage to the front line."
    },

    123: {
        name: "Flame Fist", type: 2, func: 3, calc: 1,
        args: [1.7],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy fire damage to three random targets."
    },

    124: {
        name: "Ice Fist", type: 2, func: 3, calc: 1,
        args: [1.7],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ice damage to three random targets."
    },

    125: {
        name: "Shield & Dagger", type: 5, func: 14, calc: 1,
        args: [1],
        range: 4, prob: 50, ward: 1, sac: 1,
        desc: "Take damage in place of any ally and counter."
    },

    127: {
        name: "Poison Fang", type: 2, func: 4, calc: 2,
        args: [1, 1, 0.3],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal damage and sometimes poison three random targets."
    },

    128: {
        name: "Whiteout", type: 2, func: 4, calc: 2,
        args: [2.3, 3, 0.3],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy damage and sometimes freeze up to three foes."
    },

    129: {
        name: "Fire Whirlwind", type: 2, func: 4, calc: 2,
        args: [1],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal damage to three foes."
    },

    131: {
        name: "Bloodlust Lance", type: 2, func: 4, calc: 1,
        args: [1],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes, ignoring position."
    },

    132: {
        name: "Boon of Blade & Wind 2", type: 1, func: 1, calc: 0,
        args: [0.2, 1, 4],
        range: 4, prob: 70, sac: 1,
        desc: "Raise ATK and AGI of all party members."
    },

    133: {
        name: "Blade Ward 2", type: 1, func: 1, calc: 0,
        args: [0.4, 5],
        range: 4, prob: 70, sac: 1,
        desc: "Reduce physical damage taken by all allies."
    },

    134: {
        name: "Magic Ward 2", type: 1, func: 1, calc: 0,
        args: [0.4, 6],
        range: 4, prob: 70, sac: 1,
        desc: "Reduce magic damage taken by all allies."
    },

    135: {
        name: "Breath Ward 2", type: 1, func: 1, calc: 0,
        args: [0.4, 7],
        range: 4, prob: 70,
        desc: "Reduce breath damage taken by all allies."
    },

    136: {
        name: "Breath Ward", type: 1, func: 1, calc: 0,
        args: [0.7, 7],
        range: 3, prob: 70, sac: 1,
        desc: "Reduce breath damage taken by self and adjacent familiars."
    },

    137: {
        name: "Binding Arcana", type: 2, func: 3, calc: 1,
        args: [1, 5, 0.3, 3],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal four physical strikes that sometimes silence foes."
    },

    138: {
        name: "Head Bash", type: 2, func: 3, calc: 1,
        args: [3],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy physical damage to two random targets."
    },

    139: {
        name: "Mad Dash", type: 2, func: 3, calc: 1,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal Massive ATK-based damage to two random foes."
    },

    140: {
        name: "Numbing Touch", type: 2, func: 3, calc: 1,
        args: [1, 2, 0.7],
        range: 5, prob: 70, ward: 1, sac: 1,
        desc: "Cause attacks to have a high chance to paralyze foes."
    },

    141: {
        name: "Burning Rage", type: 2, func: 4, calc: 2,
        args: [0.9],
        range: 17, prob: 30, ward: 2, sac: 1,
        desc: "Engulf six random foes in flames."
    },

    142: {
        name: "Barrage", type: 2, func: 3, calc: 1,
        args: [0.9],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal physical damage to five random targets."
    },

    143: {
        name: "Sonic Boom", type: 2, func: 7, calc: 1,
        args: [1, 0.1],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Damage all foes. May kill targets outright."
    },

    144: {
        name: "Windcrush", type: 2, func: 4, calc: 2,
        args: [1],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy damage to four foes."
    },

    145: {
        name: "Mass Greater Heal 2", type: 2, func: 18, calc: 4,
        args: [2],
        range: 4, prob: 30, sac: 1,
        desc: "Restore a fixed amount of HP to all party members."
    },

    146: {
        name: "Ritual of Binding", type: 1, func: 19, calc: 0,
        args: [0, 5, 0.3, 3],
        range: 8, prob: 70, sac: 1,
        desc: "Chance to silence all foes at beginning of battle."
    },

    147: {
        name: "Spirit Curse", type: 2, func: 4, calc: 2,
        args: [1, 4, 0.3],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal damage and sometimes disable three random foes."
    },

    148: {
        name: "Windblast", type: 2, func: 22, calc: 2,
        args: [1.5, 4, 0.3, 0.2],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal damage and sometimes lower AGI of three foes."
    },

    149: {
        name: "Spiteful Strike", type: 2, func: 21, calc: 1,
        args: [1, 2, 0.3, 0.2],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal damage to all foes and sometimes lower DEF."
    },

    150: {
        name: "Grin and Bear It", type: 3, func: 20, calc: 0,
        args: [0.5],
        range: 21, prob: 70, sac: 1,
        desc: "Survive devastating damage as long as HP is above 50%."
    },

    152: {
        name: "Mad Swing", type: 2, func: 4, calc: 1,
        args: [1.7],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy damage to up to three foes with a mighty swing."
    },

    153: {
        name: "Onfall", type: 2, func: 4, calc: 1,
        args: [4],
        range: 5, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive damage with dual blades to one foe."
    },

    154: {
        name: "Cloak & Dagger 2", type: 5, func: 14, calc: 1,
        args: [1.5],
        range: 2, prob: 50, ward: 1, sac: 1,
        desc: "Take heavy damage in place of nearby ally and counter."
    },

    155: {
        name: "Firecell Roar", type: 2, func: 22, calc: 2,
        args: [1.5, 1, 0.3, 0.2],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Three random fire strikes that sometimes lower ATK."
    },

    156: {
        name: "Rebuke", type: 2, func: 3, calc: 3,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to two random foes."
    },

    157: {
        name: "Rally Cry", type: 1, func: 1, calc: 0,
        args: [0.1, 9],
        range: 4, prob: 70, sac: 1,
        desc: "Raise ATK, DEF, WIS and AGI of all party members."
    },

    160: {
        name: "Ice Fang", type: 2, func: 4, calc: 1,
        args: [1.5, 3, 0.3],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ice damage and sometimes freeze three foes."
    },

    161: {
        name: "Shadow Strike", type: 2, func: 3, calc: 3,
        args: [1],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to four random foes."
    },

    163: {
        name: "Poison Mist", type: 2, func: 4, calc: 2,
        args: [2.3, 1, 0.3],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive damage and sometimes poison up to three foes."
    },

    164: {
        name: "Boon of Mind & Blade 2", type: 1, func: 1, calc: 0,
        args: [0.2, 1, 3],
        range: 4, prob: 70, sac: 1,
        desc: "Raise the ATK and WIS of all party members."
    },

    165: {
        name: "Furious Cannon", type: 2, func: 22, calc: 2,
        args: [1, 1, 0.3, 0.5],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal fire damage to all foes and sometimes lower ATK."
    },

    166: {
        name: "Payback", type: 3, func: 13, calc: 1,
        args: [2.3],
        range: 21, prob: 50, ward: 1, sac: 1,
        desc: "Chance to unleash a massive counter attack when struck."
    },

    167: {
        name: "Bulwark", type: 1, func: 1, calc: 0,
        args: [0.4, 5],
        range: 3, prob: 70, sac: 1,
        desc: "Reduce physical damage taken by self and nearby familiars."
    },

    168: {
        name: "Frost and Ice", type: 2, func: 4, calc: 2,
        args: [0.8, 3, 0.3],
        range: 17, prob: 30, ward: 2, sac: 1,
        desc: "Deal damage and sometimes freeze six random foes."
    },

    169: {
        name: "Silent Cheer", type: 1, func: 1, calc: 0,
        args: [0.2, 8],
        range: 2, prob: 70, sac: 1,
        desc: "Raise the skill trigger rate of adjacent familiars."
    },

    170: {
        name: "War Dance", type: 2, func: 4, calc: 3,
        args: [1.5],
        range: 15, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy AGI-based damage to foes in front and middle."
    },

    175: {
        name: "Lifesaver", type: 2, func: 18, calc: 4,
        args: [2],
        range: 2, prob: 30, sac: 1,
        desc: "Restore a large amount of HP to adjacent familiars."
    },

    177: {
        name: "Divine Shield", type: 1, func: 1, calc: 0,
        args: [0.65, 5],
        range: 21, prob: 70, sac: 1,
        desc: "Escape most damage from physical attacks."
    },

    178: {
        name: "Light Fist", type: 2, func: 3, calc: 1,
        args: [1.7],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy lightning damage to three random targets."
    },

    179: {
        name: "Sword of Justice", type: 2, func: 3, calc: 3,
        args: [2.5],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive AGI-based damage to two random foes."
    },

    180: {
        name: "Proxy Counter", type: 5, func: 14, calc: 1,
        args: [1],
        range: 28, prob: 50, ward: 1, sac: 1,
        desc: "Take damage in place of familiars to its right and counter."
    },

    185: {
        name: "Thunderclap", type: 2, func: 4, calc: 2,
        args: [0.7, 2, 0.3],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to five random foes and sometimes paralyze them."
    },

    186: {
        name: "Razor Claws", type: 2, func: 3, calc: 1,
        args: [2, 2, 0.5],
        range: 6, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive damage and sometimes paralyze up to two foes."
    },

    187: {
        name: "Mega Shot", type: 2, func: 4, calc: 1,
        args: [4],
        range: 5, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to one foe, ignoring position."
    },

    188: {
        name: "Shatter Armor", type: 2, func: 21, calc: 1,
        args: [3, 2, 0.3, 0.3],
        range: 5, prob: 30, ward: 1, sac: 1,
        desc: "Deal a heavy blow to one foe,sometimes lowering DEF."
    },

    193: {
        name: "Angler", type: 2, func: 24, calc: 0,
        range: 21, prob: 50, sac: 1,
        randSkills: [10, 11, 16, 18, 19, 20, 21, 26, 27, 28, 29, 34, 38, 39, 41, 42, 43, 45, 46, 47, 48, 50,
            51, 52, 54, 55, 69, 70, 108, 110, 111, 113, 114, 115, 116, 117, 118, 119, 121, 122, 123, 124, 127,
            129, 131, 137, 138, 139, 140, 144, 145, 147, 148, 149, 152, 153, 155, 156, 160, 161, 163, 175, 187, 188, 197, 198, 206],
        desc: "Not even its user knows what this skill will do."
    },

    195: {
        name: "Warrior's Wrath", type: 2, func: 3, calc: 1,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },

    196: {
        name: "Spark Shot", type: 2, func: 3, calc: 1,
        args: [0.8],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to four random foes."
    },

    197: {
        name: "Revitalize", type: 2, func: 18, calc: 4,
        args: [1.5],
        range: 4, prob: 30, sac: 1,
        desc: "Restore HP to all party members."
    },

    198: {
        name: "Flame Rasp", type: 2, func: 4, calc: 2,
        args: [1.3],
        range: 7, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy damage to up to three foes."
    },

    199: {
        name: "Cruelest Touch", type: 2, func: 3, calc: 1,
        args: [0.75, 1, 0.25],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage and sometimes poison six random foes."
    },

    202: {
        name: "Trial by Fire", type: 2, func: 4, calc: 2,
        args: [2],
        range: 6, prob: 30, ward: 3,
        desc: "Deal massive WIS-based fire damage to up to two foes."
    },

    203: {
        name: "Trial by Ice", type: 2, func: 4, calc: 2,
        args: [2, 3, 0.3],
        range: 6, prob: 30, ward: 3,
        desc: "Deal massive WIS-based damage to up to two foes, and sometimes freeze target."
    },

    204: {
        name: "Frozen Spear", type: 2, func: 4, calc: 2,
        args: [3, 3, 0.7],
        range: 5, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive damage and sometimes freeze one foe."
    },

    205: {
        name: "Crushing Hammer", type: 2, func: 4, calc: 1,
        args: [1, 3, 0.3],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal physical damage and sometimes freeze all foes."
    },

    206: {
        name: "Dance of Petals", type: 2, func: 4, calc: 3,
        args: [1],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage to three random foes, ignoring position."
    },

    210: {
        name: "Poison Spout", type: 2, func: 4, calc: 2,
        args: [1.2, 1, 0.3],
        range: 19, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage and sometimes poison four random foes."
    },

    211: {
        name: "Requiem", type: 2, func: 3, calc: 1,
        args: [1, 5, 0.3, 3],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal physical damage and sometimes silence all foes."
    },

    212: {
        name: "Ghasthunt", type: 2, func: 3, calc: 2,
        args: [1.2],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal WIS-based damage to four random foes."
    },

    214: {
        name: "Blade of Madness", type: 2, func: 3, calc: 1,
        args: [1.35],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes."
    },

    216: {
        name: "Bodycheck", type: 2, func: 3, calc: 1,
        args: [2.5],
        range: 6, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to up to two foes."
    },

    217: {
        name: "Harrowing Trial", type: 2, func: 4, calc: 2,
        args: [2.5],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes."
    },

    218: {
        name: "Boulder Toss", type: 2, func: 3, calc: 1,
        args: [1.4, 2, 0.3],
        range: 15, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage and sometimes paralyze front/middles lines."
    },

    219: {
        name: "Evil Eye", type: 2, func: 21, calc: 3,
        args: [1.2, 4, 0.3, 0.3],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage and sometimes lower AGI of all foes."
    },

    221: {
        name: "Skittering Darkness", type: 2, func: 3, calc: 1,
        args: [1.5],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },

    222: {
        name: "Boastful Blade", type: 2, func: 3, calc: 1,
        args: [1.9],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },

    224: {
        name: "Feather Shot", type: 2, func: 4, calc: 1,
        args: [2.1],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to three random foes."
    },

    225: {
        name: "Wings of Winter", type: 2, func: 3, calc: 3,
        args: [0.8],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to five random foes."
    },

    226: {
        name: "Pirate's Pride", type: 2, func: 4, calc: 2,
        args: [1.8, 2, 0.3],
        range: 15, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage and sometimes paralyze front/middle lines."
    },

    227: {
        name: "Muscle Play", type: 2, func: 3, calc: 1,
        args: [1.65],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to up to three foes."
    },

    228: {
        name: "Mecha Rush", type: 2, func: 4, calc: 1,
        args: [1.8],
        range: 14, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to all foes in the rear line."
    },

    229: {
        name: "Spirit Word", type: 2, func: 3, calc: 2,
        args: [2.1],
        range: 16, prob: 30, ward: 1,
        desc: "Deal massive WIS-based damage to three random foes."
    },

    231: {
        name: "Rolling Thunder", type: 2, func: 21, calc: 3,
        args: [1.25, 1, 0.3, 0.2],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to all foes and sometimes lower ATK."
    },

    232: {
        name: "Lightning Web", type: 2, func: 4, calc: 2,
        args: [2.15, 2, 0.3],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage and sometimes paralyze three foes."
    },

    234: {
        name: "Lightning Spirits", type: 2, func: 4, calc: 2,
        args: [1.15],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to five random foes."
    },

    236: {
        name: "Flash", type: 2, func: 4, calc: 2,
        args: [2.25],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to three random foes, ignoring position."
    },

    237: {
        name: "Piercing Claws", type: 2, func: 4, calc: 2,
        args: [2.15],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to up to three foes, ignoring position."
    },

    238: {
        name: "Shadow Slash", type: 2, func: 3, calc: 1,
        args: [1.05],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to four random foes."
    },

    239: {
        name: "Dark Rush", type: 2, func: 4, calc: 3,
        args: [2],
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive AGI-based damage to three random foes, ignoring position."
    },

    240: {
        name: "Midnight Smile", type: 1, func: 1, calc: 0,
        args: [0.2, 4],
        range: 3, prob: 70,
        desc: "Raise AGI of self and adjacent familiars at start of battle."
    },

    241: {
        name: "Chilling Blast", type: 2, func: 3, calc: 1,
        args: [1.7, 3, 0.3],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage and sometimes freeze three random foes."
    },

    242: {
        name: "Glacial Blade", type: 2, func: 4, calc: 2,
        args: [1.7, 3, 0.3],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage and sometimes freeze up to three foes, ignoring position."
    },

    244: {
        name: "High Spirits", type: 2, func: 4, calc: 2,
        args: [1.6],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },

    245: {
        name: "Brave Blade", type: 2, func: 4, calc: 2,
        args: [1.2],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to all foes, ignoring position."
    },

    248: {
        name: "Venomwing Dance", type: 2, func: 3, calc: 3,
        args: [1.45, 1, 0.3],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage and randomly poison four foes."
    },

    249: {
        name: "Steelscales", type: 2, func: 3, calc: 1,
        args: [0.9],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to six random foes."
    },

    250: {
        name: "Goddess of the Deep", type: 2, func: 3, calc: 3,
        args: [1.6],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to up to three foes."
    },

    251: {
        name: "Hungry Beak", type: 2, func: 3, calc: 1,
        args: [1],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes."
    },

    252: {
        name: "Scathing Fire Brand", type: 2, func: 3, calc: 1,
        args: [1.5],
        range: 15, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to all foes in the front/middle line."
    },

    253: {
        name: "Brutal Fist", type: 2, func: 3, calc: 1,
        args: [2.1],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },

    254: {
        name: "Roving Fang", type: 2, func: 3, calc: 3,
        args: [1.6],
        range: 12, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to all foes in the front line."
    },

    256: {
        name: "Silent Madness", type: 2, func: 3, calc: 1,
        args: [1.3],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three foes."
    },

    258: {
        name: "Fatal Kiss", type: 2, func: 4, calc: 2,
        args: [1.35],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to all foes, ignoring position."
    },

    259: {
        name: "Hell Spark", type: 2, func: 3, calc: 1,
        args: [1.1],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to four random foes."
    },

    260: {
        name: "Curse of Ages", type: 2, func: 21, calc: 3,
        args: [0.7, 1, 0.3, 0.2],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to six random foes and sometimes lower ATK."
    },

    261: {
        name: "Groundswell", type: 2, func: 4, calc: 2,
        args: [1.15],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to all foes, ignoring position."
    },

    263: {
        name: "Judgment", type: 2, func: 3, calc: 1,
        args: [1.75],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to up to three foes."
    },

    264: {
        name: "Bone Crush", type: 2, func: 3, calc: 1,
        args: [1.95],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to three random foes."
    },

    265: {
        name: "Ancient Feast", type: 1, func: 1, calc: 0,
        args: [0.5, 1],
        range: 3, prob: 70, sac: 1,
        desc: "Raise ATK of self and adjacent familiars at beginning of battle."
    },

    267: {
        name: "Swordmaster", type: 2, func: 3, calc: 3,
        args: [2.4],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive AGI-based damage to up to three foes."
    },

    268: {
        name: "Gaoler's Torment", type: 2, func: 3, calc: 3,
        args: [1.65],
        range: 15, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to front/middle lines."
    },

    269: {
        name: "Tears of the Hideous", type: 2, func: 4, calc: 3,
        args: [2.05],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive AGI-based damage to three random foes, ignoring position."
    },

    270: {
        name: "Withering Flame", type: 2, func: 4, calc: 2,
        args: [1.7],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },

    271: {
        name: "Scales of Tranquility", type: 1, func: 19, calc: 0,
        args: [0, 5, 0.45, 1],
        range: 7, prob: 70,
        desc: "Chance to silence up to three foes for one turn at start of battle."
    },

    272: {
        name: "Bewitching Wings", type: 2, func: 4, calc: 2,
        args: [2.5],
        range: 23, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },

    273: {
        name: "Stirring Kiss", type: 2, func: 6, calc: 0,
        args: [1],
        range: 2, prob: 50,
        desc: "Revive and fully restore HP of adjacent familiars."
    },

    274: {
        name: "Eternal Sleep", type: 2, func: 3, calc: 3,
        args: [1.5],
        range: 32, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to up to four foes."
    },

    275: {
        name: "Blinding Light", type: 2, func: 4, calc: 2,
        args: [1.7],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to three random foes, ignoring position."
    },

    276: {
        name: "Divine Grief", type: 2, func: 4, calc: 2,
        args: [2],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },

    277: {
        name: "Nightmarish Notion", type: 2, func: 4, calc: 2,
        args: [1.1, 3, 0.3],
        range: 20, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage and sometimes freeze five random foes, ignoring position."
    },

    280: {
        name: "Snake Charmer", type: 2, func: 4, calc: 2,
        args: [2.05],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to three random foes, ignoring position."
    },

    281: {
        name: "Snake Eyes", type: 2, func: 4, calc: 2,
        args: [2.1, 2, 0.3],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage and sometimes paralyze up to three foes."
    },

    282: {
        name: "Corpse Hymn", type: 2, func: 4, calc: 3,
        args: [1],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage to five random foes, ignoring position."
    },

    285: {
        name: "Moon Soul", type: 2, func: 4, calc: 2,
        args: [1.45],
        range: 15, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to front/middle lines, ignoring position."
    },

    287: {
        name: "Staff of Knowledge", type: 2, func: 18, calc: 4,
        args: [1.3],
        range: 3, prob: 70,
        desc: "High chance to restore HP to self and adjacent familiars."
    },

    288: {
        name: "Chain Attack", type: 2, func: 4, calc: 2,
        args: [0.95],
        range: 17, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },

    289: {
        name: "Quakeblade", type: 2, func: 3, calc: 1,
        args: [1.35],
        range: 15, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to front/middle lines."
    },

    291: {
        name: "Grin and Bear It 2", type: 3, func: 20, calc: 0,
        args: [0.01],
        range: 21, prob: 70,
        desc: "Survive devastating damage as long as HP is above 1%."
    },

    292: {
        name: "Golden Rule", type: 2, func: 4, calc: 1,
        args: [2.1],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to up to three foes, ignoring position."
    },

    293: {
        name: "Cruel Flame", type: 2, func: 4, calc: 1,
        args: [1.7],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to four random foes, ignoring position."
    },

    294: {
        name: "Mocking Laugh", type: 2, func: 3, calc: 1,
        args: [2.5],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },

    295: {
        name: "Dream Lure", type: 1, func: 19, calc: 0,
        args: [0, 4, 0.25],
        range: 7, prob: 70,
        desc: "Sometimes disable up to three foes at start of battle."
    },

    296: {
        name: "Blood Offering", type: 2, func: 4, calc: 1,
        args: [1.2, 4, 0.3],
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage and disable six random foes, ignoring position."
    },

    297: {
        name: "Awe of the Wild", type: 2, func: 4, calc: 3,
        args: [2.15],
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive AGI-based damage to three random foes, ignoring position."
    },

    298: {
        name: "Freezing Scales", type: 2, func: 4, calc: 2,
        args: [1.35, 3, 0.3],
        range: 8, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage to all foes  and sometimes freeze them, ignoring position."
    },

    299: {
        name: "Crazed Axe", type: 2, func: 3, calc: 1,
        args: [1.7],
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },

    301: {
        name: "Fortitude", type: 3, func: 20, calc: 0,
        args: [0.2],
        range: 21, prob: 70,
        desc: "Survive devastating damage as long as HP is above 20%."
    },

    302: {
        name: "Ice Wall", type: 2, func: 4, calc: 2,
        args: [1.4],
        range: 8, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage to all foes, ignoring position."
    },

    303: {
        name: "Chill Horn", type: 2, func: 3, calc: 2,
        args: [1.9],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy WIS-based damage to three random foes, ignoring position."
    },

    304: {
        name: "Ferocious Omen", type: 1, func: 1, calc: 0,
        args: [0.1, 1],
        range: 3, prob: 70, sac: 1,
        desc: "Raise ATK of self and adjacent familiars."
    },

    305: {
        name: "Dancing Flame", type: 2, func: 4, calc: 2,
        args: [1.3],
        range: 19, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage to four random foes, ignoring position."
    },

    307: {
        name: "Evil Wink", type: 2, func: 3, calc: 2,
        args: [1.8],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy WIS-based damage to three random foes, ignoring position."
    },

    308: {
        name: "Bloodied Hands", type: 2, func: 4, calc: 2,
        args: [1.7],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes."
    },

    311: {
        name: "Black Phantasm", type: 2, func: 3, calc: 1,
        args: [1.75],
        range: 6, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to up to two foes."
    },

    312: {
        name: "Demon Spear", type: 2, func: 3, calc: 1,
        args: [1.75],
        range: 6, prob: 30, ward: 1,
        desc: "A spear technique from the West. Deal heavy ATK-based damage to up to two foes."
    },

    313: {
        name: "White Ruin", type: 2, func: 4, calc: 2,
        args: [1.5],
        range: 8, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy WIS-based damage to all foes, ignoring position."
    },

    314: {
        name: "Fearless Laugh", type: 2, func: 3, calc: 1,
        args: [1.3],
        range: 32, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to up to four foes."
    },

    315: {
        name: "Trembling Horn", type: 2, func: 3, calc: 1,
        args: [1.3],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to four random foes."
    },

    316: {
        name: "Healing Prism", type: 3, func: 11, calc: 1,
        args: [1],
        range: 3, prob: 30,
        desc: "Convert damage to heal self and adjacent familiars."
    },

    317: {
        name: "Mad Swing 2", type: 2, func: 4, calc: 1,
        args: [1.9],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy damage to up to three foes with a mighty swing."
    },

    318: {
        name: "Frontier Spirit", type: 2, func: 3, calc: 1,
        args: [1.1],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes."
    },

    319: {
        name: "Magic Overwhelming", type: 2, func: 4, calc: 2,
        args: [1.55],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },

    320: {
        name: "Mystic Teachings", type: 1, func: 1, calc: 0,
        args: [0.1, 3],
        range: 3, prob: 70,
        desc: "Raise WIS of self and adjacent familiars at beginning of battle."
    },

    321: {
        name: "Roaring Blood", type: 2, func: 3, calc: 2,
        args: [0.95],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal WIS-based damage to six random foes."
    },

    322: {
        name: "Cruel Dance", type: 2, func: 4, calc: 3,
        args: [1.5],
        range: 15, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy AGI-based damage to front/middle lines, ignoring position."
    },

    325: {
        name: "Rippling Flame", type: 2, func: 3, calc: 1,
        args: [1.85],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },

    326: {
        name: "Heart of the Warrior", type: 2, func: 3, calc: 1,
        args: [1.6],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },

    327: {
        name: "Test of Courage", type: 2, func: 3, calc: 1,
        args: [1.6],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },

    328: {
        name: "Rime Fist", type: 2, func: 4, calc: 2,
        args: [1.4, 3, 0.3],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes freeze five random foes, ignoring position."
    },

    329: {
        name: "Backstep", type: 5, func: 27, calc: 0,
        args: [2, 3, 78, 79],
        range: 21, prob: 50,
        desc: "Evade enemy AGI-based attack skills."
    },

    330: {
        name: "Dark Blessing", type: 1, func: 19, calc: 0,
        args: [0, 5, 0.45, 1],
        range: 7, prob: 70,
        desc: "Chance to silence up to three foes for one turn at start of battle."
    },

    331: {
        name: "Light Divine", type: 2, func: 4, calc: 2,
        args: [1.2],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },

    333: {
        name: "Cold-Blooded Smile", type: 2, func: 3, calc: 3,
        args: [1.2, 3, 0.3],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage and sometimes freeze all foes."
    },

    334: {
        name: "Gift of Terror", type: 2, func: 4, calc: 2,
        args: [1.5],
        range: 16, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to three random foes."
    },

    336: {
        name: "Golden Flame", type: 2, func: 4, calc: 2,
        args: [1.65],
        range: 15, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy WIS-based damage to all foes in the front/middle lines, ignoring position."
    },

    339: {
        name: "Burning Scales", type: 2, func: 4, calc: 2,
        args: [2],
        range: 15, prob: 30, ward: 3, sac: 1,
        desc: "Deal massive WIS-based damage to all foes in the front/middle lines, ignoring position."
    },

    340: {
        name: "Penance", type: 2, func: 3, calc: 1,
        args: [1.25],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes."
    },

    341: {
        name: "Staff of Ages", type: 2, func: 3, calc: 3,
        args: [1.15],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to four random foes."
    },

    342: {
        name: "Shadow Master", type: 1, func: 1, calc: 0,
        args: [0.3, 17, 1.25],
        range: 3, prob: 70,
        desc: "Raise HP of self and adjacent familiars at beginning of battle."
    },

    343: {
        name: "Curiosity", type: 2, func: 21, calc: 2,
        args: [1.5, 4, 0.3, 0.3],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy WIS-based damage to all foes, sometimes lowering AGI."
    },

    345: {
        name: "Wheel of Death", type: 2, func: 4, calc: 2,
        args: [2.2],
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to three random foes, ignoring position."
    },

    346: {
        name: "Hellish Rebirth", type: 2, func: 6, calc: 0,
        args: [1],
        range: 101, prob: 50,
        desc: "Revive and fully restore HP of 1 random familiar."
    },

    347: {
        name: "Raging Flames", type: 2, func: 3, calc: 3,
        args: [2.4],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive AGI-based damage to three random foes."
    },

    348: {
        name: "Inferno", type: 2, func: 3, calc: 1,
        args: [1.4],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to four random foes."
    },

    349: {
        name: "Staff of Tyranny", type: 2, func: 3, calc: 1,
        args: [1.55],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },

    351: {
        name: "Sword of Fealty", type: 2, func: 3, calc: 1,
        args: [1.3],
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to four random foes."
    },

    352: {
        name: "Spell of Revival", type: 1, func: 1, calc: 0,
        args: [355, 16],
        range: 3, prob: 70,
        desc: "Self and adjacent allies are automatically revived after being killed."
    },

    353: {
        name: "Icerend Claws", type: 2, func: 3, calc: 1,
        args: [1.45, 3, 0.3],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to three random foes and sometimes freeze them."
    },

    354: {
        name: "Venomspray Staff", type: 2, func: 4, calc: 2,
        args: [2.9, 1, 0.3, 15],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes and sometimes envenom them."
    },

    355: {
        name: "Dawn's Light", type: 16, func: 6, calc: 0,
        args: [0.5],
        range: 21, prob: 100,
        desc: "-"
    },

    356: {
        name: "Wicked Bolt", type: 2, func: 4, calc: 2,
        args: [1.95],
        range: 16, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to three random foes, ignoring position."
    },

    357: {
        name: "Welkin Wings", type: 2, func: 3, calc: 3,
        args: [1.75],
        range: 12, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to all foes in the front line."
    },

    358: {
        name: "Call of Steel", type: 2, func: 3, calc: 1,
        args: [1.3, 5, 0.1, 3],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage and sometimes silence four random foes."
    },

    359: {
        name: "Seeping Darkness", type: 2, func: 3, calc: 1,
        args: [1.25],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to three random foes."
    },

    360: {
        name: "Curse of Wrath", type: 2, func: 4, calc: 2,
        args: [1],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },

    361: {
        name: "Resplendent Light", type: 2, func: 3, calc: 1,
        args: [1],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes."
    },

    362: {
        name: "Rite of Vengeance", type: 2, func: 3, calc: 1,
        args: [1.85],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to two random foes."
    },

    364: {
        name: "Depths of Corruption", type: 2, func: 4, calc: 1,
        args: [1.95],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to up to three foes, ignoring position."
    },

    365: {
        name: "Bug Attack", type: 2, func: 4, calc: 1,
        args: [1.95],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes, ignoring position."
    },

    366: {
        name: "Bone Chill", type: 2, func: 4, calc: 2,
        args: [1.7],
        range: 32, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy WIS-based damage to up to four foes, ignoring position."
    },

    367: {
        name: "Howl", type: 2, func: 3, calc: 3,
        args: [0.9],
        range: 20, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to five random foes."
    },

    369: {
        name: "Stone Rain", type: 2, func: 3, calc: 1,
        args: [1.45],
        range: 7, prob: 30, ward: 1,
        desc: "Deal ATK-based damage up to three foes."
    },

    370: {
        name: "Dust Cloud", type: 1, func: 1, calc: 0,
        args: [1, 18],
        range: 132, prob: 70,
        desc: "Allows two random allies to perform an extra action during the next turn."
    },

    371: {
        name: "Battle Hierarchy", type: 1, func: 31, calc: 0,
        args: [1, 1],
        range: 4, prob: 70, sac: 1,
        desc: "Change the attack order by ATK for one turn."
    },

    372: {
        name: "Curse Foil", type: 3, func: 13, calc: 1,
        args: [1.3],
        range: 21, prob: 50, ward: 1, sac: 1,
        desc: "Chance to unleash a counter attack when struck."
    },

    374: {
        name: "Streaming Feathers", type: 3, func: 11, calc: 1,
        args: [1],
        range: 3, prob: 50,
        desc: "Convert damage to heal self and adjacent familiars."
    },

    375: {
        name: "Windcutter Blade", type: 2, func: 4, calc: 1,
        args: [2],
        range: 16, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to three random foes, ignoring position."
    },

    376: {
        name: "Enigmatic Bloom", type: 2, func: 6, calc: 0,
        args: [1],
        range: 2, prob: 50,
        desc: "Revive and fully restore HP of adjacent familiars."
    },

    377: {
        name: "Healing Bloom", type: 2, func: 18, calc: 4,
        args: [1],
        range: 21, prob: 70,
        desc: "Restore HP to self."
    },

    378: {
        name: "Blade Flurry", type: 2, func: 21, calc: 3,
        args: [1, 1, 0.3, 0.3],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to four random foes and sometimes lower ATK."
    },

    379: {
        name: "Dragon Aura", type: 2, func: 4, calc: 2,
        args: [1.9],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to three random foes, ignoring position."
    },

    380: {
        name: "Feral Claws", type: 2, func: 3, calc: 3,
        args: [0.95],
        range: 17, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to six random foes."
    },

    381: {
        name: "Lion's Roar", type: 1, func: 1, calc: 0,
        args: [0.4, 6, 7],
        range: 3, prob: 70,
        desc: "Reduce magic and breath damages taken by self and adjacent familiars."
    },

    382: {
        name: "Laevateinn", type: 2, func: 3, calc: 1,
        args: [1.65],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to up to three foes."
    },

    383: {
        name: "Flame of Cinders", type: 2, func: 3, calc: 1,
        args: [1.65],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },

    385: {
        name: "Prominence", type: 2, func: 3, calc: 1,
        args: [1],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes."
    },

    386: {
        name: "Sun's Mercy", type: 1, func: 1, calc: 0,
        args: [0.15, 1],
        range: 3, prob: 70,
        desc: "Raise ATK of self and adjacent familiars."
    },

    387: {
        name: "Earth's Fury", type: 2, func: 3, calc: 1,
        args: [1.35],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to four random foes."
    },

    388: {
        name: "Melody of Mercy", type: 1, func: 1, calc: 0,
        args: [0.3, 17, 1.25],
        range: 3, prob: 70,
        desc: "Raise HP of self and adjacent familiars at beginning of battle."
    },

    389: {
        name: "Mystic Light", type: 2, func: 6, calc: 0,
        args: [1],
        range: 121, prob: 50,
        desc: "Revive and fully restore HP of one random ally."
    },

    390: {
        name: "Libra's Retribution", type: 2, func: 3, calc: 1,
        args: [1.6],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes"
    },

    391: {
        name: "Scatter Arrow", type: 2, func: 4, calc: 3,
        args: [1.3],
        range: 32, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage to up to four foes, ignoring position."
    },

    392: {
        name: "Aries' Strike", type: 2, func: 3, calc: 1,
        args: [1.2],
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to four random foes."
    },

    393: {
        name: "Sidestep", type: 5, func: 27, calc: 0,
        args: [2, 3, 78, 79],
        range: 21, prob: 30,
        desc: "Evade enemy AGI-based attack skills."
    },

    394: {
        name: "Glance", type: 2, func: 4, calc: 2,
        args: [1.7],
        range: 15, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to all foes in the front/middle lines, ignoring position."
    },

    395: {
        name: "Imperial Audience", type: 1, func: 19, calc: 0,
        args: [0, 5, 0.45, 1],
        range: 7, prob: 70,
        desc: "Chance to silence up to three foes for one turn at the start of battle."
    },

    396: {
        name: "Venom Snare", type: 5, func: 28, calc: 7,
        args: [0.23, 1, 7, 3, 0.3],
        range: 21, prob: 30,
        desc: "Reflect ATK-based damage back to up to three foes."
    },

    397: {
        name: "Tarantella", type: 1, func: 1, calc: 0,
        args: [0.3, 2],
        range: 3, prob: 70,
        desc: "Raise DEF of self and adjacent familiars."
    },

    398: {
        name: "Knuckle Guard", type: 5, func: 12, calc: 0,
        range: 4, prob: 50, sac: 1,
        desc: "Take damage in place of allies."
    },

    400: {
        name: "Hatred Blade", type: 2, func: 3, calc: 1,
        args: [1.15, 1, 0.3],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes and sometimes poison them."
    },

    401: {
        name: "Shield of Ruin", type: 1, func: 19, calc: 0,
        args: [0, 1, 0.5, 10],
        range: 7, prob: 70,
        desc: "Chance to poison up to three foes at the start of battle."
    },

    402: {
        name: "Tricksy Flames", type: 2, func: 4, calc: 2,
        args: [1.95],
        range: 12, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to all foes in the front line, ignoring position."
    },

    403: {
        name: "Flickering Flames", type: 5, func: 27, calc: 0,
        args: [2, 2, 78, 79],
        range: 21, prob: 50,
        desc: "Evade enemy WIS-based attack skills."
    },

    404: {
        name: "Niten Ichi-ryu", type: 2, func: 3, calc: 1,
        args: [1.75],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },

    405: {
        name: "Visions of Terror", type: 2, func: 4, calc: 2,
        args: [1.65, 1, 0.3],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to and sometimes poison four random foes, ignoring position."
    },

    406: {
        name: "Piercing Arrow", type: 2, func: 4, calc: 1,
        args: [1.35],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes, ignoring position."
    },

    407: {
        name: "Allure of the Rose", type: 2, func: 4, calc: 2,
        args: [1.3],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to five random foes, ignoring position."
    },

    408: {
        name: "Covenant of the Rose", type: 1, func: 1, calc: 0,
        args: [0.15, 4],
        range: 3, prob: 70,
        desc: "Raise AGI of self and adjacent familiars at start of battle."
    },

    411: {
        name: "Winds of Lust", type: 2, func: 4, calc: 2,
        args: [2.1],
        range: 12, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to all foes in the front line, ignoring position."
    },

    412: {
        name: "Fires of Thirst", type: 2, func: 4, calc: 2,
        args: [1.2],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to five random foes, ignoring position."
    },

    414: {
        name: "Putrid Stench", type: 2, func: 4, calc: 2,
        args: [1.2, 1, 0.25],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to and sometimes poison five random foes, ignoring position. "
    },

    415: {
        name: "Sigiled Sanctuary", type: 1, func: 1, calc: 0,
        args: [0.11, 3],
        range: 3, prob: 70,
        desc: "Raise WIS of self and adjacent familiars at start of battle."
    },

    416: {
        name: "Bone Smasher", type: 2, func: 4, calc: 2,
        args: [1.5],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },

    418: {
        name: "Nemesis", type: 2, func: 4, calc: 2,
        args: [2.1],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to up to three foes, ignoring position."
    },

    419: {
        name: "Ichthocannon", type: 2, func: 4, calc: 2,
        args: [1.5],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },

    420: {
        name: "Breaking Wave", type: 2, func: 3, calc: 1,
        args: [1.35],
        range: 15, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes in the front/middle line."
    },

    421: {
        name: "Light of Virtue", type: 2, func: 4, calc: 2,
        args: [1.9, 3, 0.5],
        range: 16, prob: 30, ward: 3,
        desc: "Deal heavy WIS-based damage and sometimes freeze three random foes, ignoring position."
    },

    422: {
        name: "Maiden's Prayer", type: 5, func: 29, calc: 0,
        args: [0, 0, 8, 1],
        range: 21, prob: 50,
        desc: "Remove the buffs of all foes after receiving an attack."
    },

    423: {
        name: "Wail of Sorrow", type: 1, func: 32, calc: 0,
        args: [0.2, 2],
        range: 7, prob: 70, sac: 1,
        desc: "Greatly lower DEF of up to three foes."
    },

    424: {
        name: "Ultrasonic", type: 2, func: 4, calc: 1,
        args: [1.85, 2, 0.2],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to and sometimes paralyze up to three foes."
    },

    425: {
        name: "Lese Majesty", type: 5, func: 14, calc: 1,
        args: [1.5],
        range: 4, prob: 50, ward: 1,
        desc: "Take damage in place of any ally and unleash a heavy counterattack."
    },

    426: {
        name: "Imperial Gift", type: 2, func: 18, calc: 4,
        args: [2],
        range: 21, prob: 50,
        desc: "Restore of HP to self."
    },

    427: {
        name: "Funerary Rush", type: 2, func: 3, calc: 1,
        args: [1.5],
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },

    428: {
        name: "Rematch", type: 16, func: 18, calc: 4,
        args: [0.5, 1],
        range: 122, prob: 70,
        desc: "Heal two random allies for half of their maximum HP upon death."
    },

    430: {
        name: "Broken Vow", type: 1, func: 32, calc: 0,
        args: [0.22, 3],
        range: 7, prob: 70,
        desc: "Greatly lower WIS of up to three foes."
    },

    431: {
        name: "Lovers' Arrows", type: 2, func: 4, calc: 2,
        args: [1.2],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },

    432: {
        name: "Spectrum", type: 2, func: 4, calc: 2,
        args: [2.25],
        range: 7, prob: 30, ward: 3, sac: 1,
        desc: "Deal massive WIS-based damage to up to three foes, ignoring position."
    },

    433: {
        name: "Deep Rumble", type: 2, func: 3, calc: 1,
        args: [0.95],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to six random foes."
    },

    434: {
        name: "Maelstrom", type: 2, func: 3, calc: 3,
        args: [1.45],
        range: 313, prob: 30, ward: 1, sac: 1,
        desc: "AGI-based damage to up to three foes. Increased if fewer foes."
    },

    435: {
        name: "Obedience", type: 2, func: 3, calc: 3,
        args: [1.5, 2, 0.3],
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to and sometimes paralyze four random foes."
    },

    436: {
        name: "Troublemaker", type: 5, func: 28, calc: 7,
        args: [0.23, 3, 7, 3, 0.3],
        range: 21, prob: 50,
        desc: "Reflect AGI-based damage back to up to three foes."
    },

    437: {
        name: "Mjolnir", type: 2, func: 4, calc: 1,
        args: [1.5],
        range: 32, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to up to four foes, ignoring position."
    },

    438: {
        name: "Poison Torrent", type: 2, func: 3, calc: 1,
        args: [1.3, 1, 0.25],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to and sometimes poison four random foes."
    },

    440: {
        name: "Thunderstroke", type: 2, func: 4, calc: 3,
        args: [2],
        range: 23, prob: 30, ward: 2,
        desc: "Deal massive AGI-based damage to two random foes, ignoring position."
    },

    441: {
        name: "Bolt of Judgment", type: 2, func: 4, calc: 2,
        args: [2.15],
        range: 23, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },

    442: {
        name: "Masterstroke", type: 2, func: 4, calc: 1,
        args: [1.05],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to six random foes, ignoring position."
    },

    443: {
        name: "Fangs of the Devoted", type: 2, func: 3, calc: 3,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive AGI-based damage to two random foes."
    },

    444: {
        name: "Cruel Swing", type: 2, func: 4, calc: 1,
        args: [1.45],
        range: 8, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to all foes, ignoring position."
    },

    445: {
        name: "Bastion", type: 3, func: 20, calc: 0,
        args: [0.1],
        range: 21, prob: 70,
        desc: "Survive devastating damage as long as HP is above 10%."
    },

    446: {
        name: "Tail Lash", type: 2, func: 4, calc: 2,
        args: [1.6],
        range: 32, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to up to four foes, ignoring position."
    },

    447: {
        name: "Looming Nightmare", type: 2, func: 4, calc: 2,
        args: [1.6],
        range: 32, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to up to four foes, ignoring position."
    },

    448: {
        name: "Leo's Claws", type: 2, func: 3, calc: 3,
        args: [1.3],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to four random foes."
    },

    449: {
        name: "Whirling Dervish", type: 2, func: 3, calc: 1,
        args: [1.8],
        range: 313, prob: 30, ward: 1, sac: 1,
        desc: "Heavy ATK-based damage to up to three foes. Increased if fewer foes."
    },

    450: {
        name: "Aquarius Unleashed", type: 2, func: 4, calc: 2,
        args: [1.25],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to five random foes, ignoring position."
    },

    451: {
        name: "Endless Deluge", type: 1, func: 1, calc: 0,
        args: [452, 16],
        range: 101, prob: 70,
        desc: "One random ally is automatically revived with full HP after being killed."
    },

    452: {
        name: "Dawn's Tear", type: 16, func: 6, calc: 0,
        args: [1],
        range: 21, prob: 100,
        desc: "-"
    },

    453: {
        name: "Shadow of Death", type: 2, func: 4, calc: 2,
        args: [1.65],
        range: 314, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage to up to four foes. Increased if fewer foes."
    },

    454: {
        name: "Shadow of Confusion", type: 1, func: 31, calc: 0,
        args: [2, 2],
        range: 4, prob: 70,
        desc: "Order of attack is determined by WIS during the next two turns."
    },

    455: {
        name: "Berserker Rage", type: 2, func: 3, calc: 1,
        args: [0.85],
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to six random foes."
    },

    456: {
        name: "Chain Lash", type: 1, func: 32, calc: 0,
        args: [0.5, 1],
        range: 7, prob: 70,
        desc: "Greatly lower ATK of up to three foes."
    },

    457: {
        name: "Brink of Death", type: 16, func: 4, calc: 1,
        args: [3.5],
        range: 5, prob: 70, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage, ignoring position, to one foe upon its death."
    },

    459: {
        name: "Fleet of Foot", type: 2, func: 4, calc: 3,
        args: [1.3],
        range: 8, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to all foes, ignoring position."
    },

    460: {
        name: "Void Strike", type: 16, func: 19, calc: 0,
        args: [0, 5, 0.6, 1],
        range: 8, prob: 70,
        desc: "High chance to silence all foes for one turn upon his death."
    },

    461: {
        name: "Lion's Wrath", type: 2, func: 3, calc: 1,
        args: [1.35],
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to four random foes."
    },

    462: {
        name: "Heroic Might", type: 2, func: 18, calc: 4,
        args: [2],
        range: 113, prob: 50,
        desc: "Restore HP to three random familiars."
    },

    463: {
        name: "Absolute Zero", type: 2, func: 4, calc: 2,
        args: [1.7, 3, 0.25],
        range: 32, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy WIS-based damage and sometimes freeze up to four foes, ignoring position."
    },

    464: {
        name: "Chariot Rush", type: 2, func: 3, calc: 3,
        args: [1.8, 2, 0.3],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to and sometimes paralyze three random foes."
    },

    465: {
        name: "Stormcaller Pinion", type: 2, func: 4, calc: 2,
        args: [1.3],
        range: 20, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage to five random foes, ignoring position."
    },

    466: {
        name: "Blade of Judgment", type: 2, func: 4, calc: 1,
        args: [1.8],
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to four random foes, ignoring position."
    },

    467: {
        name: "Atonement", type: 1, func: 1, calc: 0,
        args: [0.3, 5, 7],
        range: 4, prob: 70,
        desc: "Reduce physical and breath damages taken by all familiars."
    },

    468: {
        name: "Rain of Death", type: 2, func: 3, calc: 1,
        args: [1.7, 1, 0.25, 10],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage and sometimes envenom three random foes."
    },

    469: {
        name: "Sand Blade", type: 2, func: 21, calc: 1,
        args: [1.2, 1, 0.3, 0.3],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes and sometimes reduce ATK."
    },

    471: {
        name: "Darkflame", type: 2, func: 4, calc: 2,
        args: [1],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },

    472: {
        name: "Nightveil", type: 1, func: 1, calc: 0,
        args: [0.1, 1, 3],
        range: 3, prob: 70,
        desc: "Raise WIS and ATK of self and adjacent familiars at start of battle."
    },

    473: {
        name: "Entomb", type: 2, func: 3, calc: 1,
        args: [1.15],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes."
    },

    474: {
        name: "Embalm", type: 1, func: 1, calc: 0,
        args: [0.3, 5],
        range: 3, prob: 70,
        desc: "Reduce physical damage taken by self and adjacent familiars."
    },

    475: {
        name: "Hand of Fortune", type: 2, func: 24, calc: 0,
        range: 21, prob: 50, sac: 1,
        randSkills: [11, 16, 20, 26, 33, 34, 109, 110, 114, 116, 138, 145, 218, 232, 264, 274, 277, 287,
            296, 319, 331, 345, 346, 354, 378, 426, 431, 462],
        desc: "The outcome of this skill depends on the user's Fortune."
    },

    476: {
        name: "Furious Horns", type: 2, func: 4, calc: 2,
        args: [2],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to three random foes, ignoring position."
    },

    477: {
        name: "Chatter Tooth", type: 2, func: 4, calc: 2,
        args: [1.5, 3, 0.3],
        range: 32, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy WIS-based damage and sometimes freeze up to four foes, ignoring position."
    },

    478: {
        name: "Cancer's Claws", type: 2, func: 3, calc: 1,
        args: [1.65, 5, 0.5, 1],
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage and sometimes silence three random foes."
    },

    479: {
        name: "Infiltrate", type: 1, func: 1, calc: 0,
        args: [1, 18],
        range: 121, prob: 70,
        desc: "Allows a random ally to perform an extra action during the next turn."
    },

    480: {
        name: "Rasteira", type: 2, func: 3, calc: 3,
        args: [1.5],
        range: 314, prob: 30, ward: 1,
        desc: "Heavy AGI-based damage to up to four foes. Increased if fewer foes."
    },

    481: {
        name: "Macaco", type: 6, func: 27, calc: 0,
        args: [2, 9, 78, 79],
        range: 21, prob: 50,
        desc: "Evade enemy ATK-based and AGI-based attack skills."
    },

    482: {
        name: "Souldrain Fangs", type: 2, func: 36, calc: 3,
        args: [1.75, 0.2, 27, 21],
        range: 7, prob: 30, ward: 1,
        desc: "Drains HP from up to three foes while dealing heavy AGI-based damage."
    },

    483: {
        name: "Spearhead", type: 1, func: 19, calc: 0,
        args: [0, 7, 0.4, 1, 1],
        range: 7, prob: 70,
        desc: "Chance to blind up to three foes at start of battle."
    },

    484: {
        name: "Wall of the Brave", type: 5, func: 12, calc: 0,
        range: 4, prob: 50,
        desc: "Take damage in place of allies."
    },

    485: {
        name: "Shield of the Coward", type: 1, func: 1, calc: 0,
        args: [1, 2],
        range: 21, prob: 70,
        desc: "Raise DEF of self at start of battle."
    },

    487: {
        name: "Dance of Farewell", type: 2, func: 4, calc: 2,
        args: [1.1],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },

    488: {
        name: "Dance of Reunion", type: 16, func: 6, calc: 0,
        args: [1],
        range: 121, prob: 50,
        desc: "Revives one random ally upon her death."
    },

    489: {
        name: "Hardened Steel", type: 1, func: 1, calc: 0,
        args: [0.7, 5],
        range: 21, prob: 70,
        desc: "Reduce physical damage taken by self greatly."
    },

    490: {
        name: "Steel Hooves", type: 2, func: 3, calc: 1,
        args: [1.2],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes."
    },

    491: {
        name: "Primitive Rage", type: 2, func: 3, calc: 1,
        args: [1.35],
        range: 32, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to up to four foes."
    },

    492: {
        name: "Razor Pinion", type: 2, func: 4, calc: 1,
        args: [1.75],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to four random foes, ignoring position."
    },

    493: {
        name: "Big Game Hunt", type: 2, func: 3, calc: 3,
        args: [1.25],
        range: 314, prob: 30, ward: 1, sac: 1,
        desc: "AGI-based damage to up to four foes. Increased if fewer foes."
    },

    494: {
        name: "Hand of Justice", type: 2, func: 4, calc: 2,
        args: [1.65],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },

    495: {
        name: "Soul Prison", type: 1, func: 32, calc: 0,
        args: [0.25, 4],
        range: 7, prob: 70,
        desc: "Greatly lower AGI of up to three foes."
    },

    496: {
        name: "Flame Cloud", type: 2, func: 4, calc: 2,
        args: [2.05],
        range: 16, prob: 30, ward: 3, sac: 1,
        desc: "Deal massive WIS-based damage to three random foes, ignoring position."
    },

    497: {
        name: "Mighty Stomp", type: 2, func: 4, calc: 1,
        args: [2],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to three random foes, ignoring position."
    },

    499: {
        name: "Snake Whip", type: 2, func: 4, calc: 1,
        args: [1.5],
        range: 20, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to five random foes, ignoring position"
    },

    500: {
        name: "Spiny Carapace", type: 3, func: 13, calc: 1,
        args: [1.2],
        range: 21, prob: 50, ward: 1,
        desc: "Chance to unleash a counter attack when struck."
    },

    501: {
        name: "Dragon Strike", type: 2, func: 22, calc: 1,
        args: [1.65, 2, 0.3, 0.3],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Heavy ATK-based damage to four random foes and sometimes lower DEF, ignoring position."
    },

    502: {
        name: "Flashing Blade", type: 2, func: 3, calc: 3,
        args: [1.6],
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to three random foes."
    },

    503: {
        name: "Wing Aegis", type: 3, func: 20, calc: 0,
        args: [0.15],
        range: 21, prob: 70,
        desc: "Survive devastating damage as long as HP is above 15%."
    },

    504: {
        name: "Defender's Thunder", type: 2, func: 4, calc: 3,
        args: [2.3, 2, 0.35],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive AGI-based damage, sometimes paralyze three random foes, ignoring position."
    },

    505: {
        name: "Fires of Perdition", type: 2, func: 22, calc: 1,
        args: [1.3, 3, 0.3, 0.3],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes, sometimes lowering WIS, ignoring position."
    },

    506: {
        name: "Winds of Perdition", type: 2, func: 4, calc: 2,
        args: [1.85],
        range: 313, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based damage to up to three foes, ignoring position. Increased if fewer foes."
    },

    507: {
        name: "Sagittarius' Arrow", type: 2, func: 4, calc: 3,
        args: [1.2],
        range: 20, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to five random foes."
    },

    508: {
        name: "Sage's Wisdom", type: 1, func: 1, calc: 0,
        args: [0.5, 6],
        range: 3, prob: 70,
        desc: "Reduce magic damage taken by self and adjacent familiars."
    },

    509: {
        name: "Atrocity", type: 2, func: 3, calc: 1,
        args: [1, 4, 0.3],
        range: 8, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to and sometimes disable all foes."
    },

    510: {
        name: "Bedazzle", type: 1, func: 19, calc: 0,
        args: [0, 7, 0.4, 2, 0.7],
        range: 7, prob: 70,
        desc: "Chance to blind up to three foes for 2 turns at start of battle."
    },

    511: {
        name: "Twin Arrow", type: 2, func: 4, calc: 1,
        args: [2.1],
        range: 6, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to up to two foes, ignoring position."
    },

    512: {
        name: "Fists of Gemini", type: 2, func: 4, calc: 1,
        args: [2.1],
        range: 6, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to up to two foes, ignoring position."
    },

    513: {
        name: "Goblet of Truth", type: 1, func: 19, calc: 0,
        args: [0, 5, 0.3, 1],
        range: 8, prob: 70,
        desc: "Chance to silence all foes for one turn at the start of battle."
    },

    514: {
        name: "Fragarach", type: 2, func: 4, calc: 2,
        args: [1.95],
        range: 313, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage to up to three foes, ignoring position. Increased if fewer foes."
    },

    515: {
        name: "The Sea's Favor", type: 2, func: 37, calc: 2,
        args: [2.85, 0.4, 27, 21],
        range: 6, prob: 30, ward: 2,
        desc: "Drains HP from up to two foes while dealing massive WIS-based damage, ignoring position."
    },

    516: {
        name: "Enthrall", type: 1, func: 19, calc: 0,
        args: [0, 3, 0.15],
        range: 7, prob: 70,
        desc: "Chance to freeze up to three foes at start of battle."
    },

    518: {
        name: "Sabre Dance", type: 2, func: 3, calc: 1,
        args: [1.45],
        range: 314, prob: 30, ward: 1,
        desc: "ATK-based damage to up to four foes. Increased if fewer foes."
    },

    519: {
        name: "The Sea's Fury", type: 2, func: 4, calc: 3,
        args: [2.2],
        range: 32, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive AGI-based damage to up to four foes, ignoring position."
    },

    520: {
        name: "Tentacle Lash", type: 2, func: 4, calc: 1,
        args: [1.95],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes, ignoring position."
    },

    521: {
        name: "Horn Rush", type: 2, func: 3, calc: 1,
        args: [1.45, 1, 0.4, 10],
        range: 314, prob: 30, ward: 1, sac: 1,
        desc: "ATK-based damage to and sometimes poison up to four foes. Increased if fewer foes."
    },

    522: {
        name: "Flash of Silver", type: 2, func: 3, calc: 3,
        args: [1.25],
        range: 20, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to five random foes."
    },

    523: {
        name: "Glittering Scales", type: 5, func: 29, calc: 0,
        args: [0, 0, 8, 1],
        range: 21, prob: 50,
        desc: "Remove the buffs of all foes after receiving an attack."
    },

    524: {
        name: "Twin-Tail Strike", type: 2, func: 34, calc: 1,
        args: [1.35, 1, 0.5, 0.2],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes and sometimes greatly lower ATK, ignoring position."
    },

    525: {
        name: "Spirit-Candles", type: 2, func: 4, calc: 3,
        args: [1.45],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage to four random foes, ignoring position."
    },

    527: {
        name: "Water Blade", type: 2, func: 3, calc: 3,
        args: [1.45],
        range: 19, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to four random foes."
    },

    528: {
        name: "Wall of Water", type: 1, func: 1, calc: 0,
        args: [0.1, 4],
        range: 3, prob: 70,
        desc: "Raise AGI of self and adjacent familiars at start of battle."
    },

    529: {
        name: "Waterslice Claws", type: 2, func: 4, calc: 2,
        args: [1.7],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },

    530: {
        name: "Gift of the Lair", type: 1, func: 1, calc: 0,
        args: [0.1, 3],
        range: 3, prob: 70,
        desc: "Raise WIS of self and adjacent familiars at start of battle."
    },

    532: {
        name: "Purging Flame", type: 2, func: 3, calc: 1,
        args: [1.7],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to up to three foes."
    },

    533: {
        name: "Boon of the Sea", type: 1, func: 1, calc: 0,
        args: [0.2, 3, 4],
        range: 4, prob: 70, sac: 1,
        desc: "Raise WIS and AGI of all party members."
    },

    534: {
        name: "Lava Torrent", type: 1, func: 19, calc: 0,
        args: [0, 8, 0.5, 3000],
        range: 7, prob: 70,
        desc: "Chance to burn up to three foes at start of battle."
    },

    535: {
        name: "Eruption", type: 2, func: 4, calc: 2,
        args: [1.75],
        range: 15, prob: 30, ward: 3,
        desc: "Deal heavy WIS-based damage to front/middle lines, ignoring position."
    },

    536: {
        name: "Arboreal Succor", type: 2, func: 40, calc: 0,
        range: 4, prob: 70, sac: 1,
        desc: "Remove the debuffs of self and all allies."
    },

    538: {
        name: "Bronze Fist", type: 2, func: 4, calc: 2,
        args: [1.5],
        range: 8, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to all foes, ignoring position."
    },

    539: {
        name: "Clockwork Guardian", type: 16, func: 1, calc: 0,
        args: [0.5, 5],
        range: 122, prob: 70,
        desc: "Reduce physical damage taken by two random allies upon her death."
    },

    540: {
        name: "Mercy of the Star", type: 1, func: 1, calc: 0,
        args: [0.4, 17, 1.5],
        range: 3, prob: 70,
        desc: "Raise HP of self and adjacent familiars at beginning of battle."
    },

    541: {
        name: "Tears of the Star", type: 2, func: 18, calc: 4,
        args: [1, 1],
        range: 132, prob: 70,
        desc: "Full restore HP of two party members."
    },

    542: {
        name: "Rampart Destroyer", type: 2, func: 3, calc: 1,
        args: [1.6],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to four random foes."
    },

    543: {
        name: "Devotion", type: 2, func: 6, calc: 0,
        args: [1],
        range: 2, prob: 50, sac: 1,
        desc: "Revive and fully restore HP of adjacent familiars."
    },

    544: {
        name: "Tail of the Scorpion", type: 2, func: 3, calc: 3,
        args: [1.05, 1, 0.3, 10],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to and sometimes envenom five random foes."
    },

    545: {
        name: "Whirl of Claws", type: 2, func: 3, calc: 1,
        args: [1.1],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes."
    },

    546: {
        name: "Death's March", type: 2, func: 36, calc: 1,
        args: [1.85, 0.4, 27, 21],
        range: 23, prob: 30, ward: 1,
        desc: "Drains HP from two random foes while dealing heavy ATK-based damage."
    },

    547: {
        name: "Death's Hunt", type: 2, func: 7, calc: 3,
        args: [1.8, 0.1],
        range: 23, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to two random foes. Chance to kill target."
    },

    548: {
        name: "Cannon Barrage", type: 2, func: 4, calc: 1,
        args: [1.75],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to four random foes, ignoring position."
    },

    549: {
        name: "Bond en Avant", type: 2, func: 21, calc: 3,
        args: [0.85, 4, 0.6, 0.3],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to six random foes and sometimes reduce AGI."
    },

    550: {
        name: "Judgment of the Sea", type: 2, func: 4, calc: 2,
        args: [1.3],
        range: 208, prob: 30, ward: 2, sac: 1,
        desc: "WIS-based damage to all foes, ignoring position. Increased if fewer foes."
    },

    551: {
        name: "Moonlight", type: 1, func: 1, calc: 0,
        args: [0.4, 8],
        range: 21, prob: 70,
        desc: "Raise the skill trigger rate of self by 40%."
    },

    552: {
        name: "Crescent Edge", type: 2, func: 3, calc: 1,
        args: [2.6],
        range: 23, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },

    553: {
        name: "Wrath of Taurus", type: 2, func: 3, calc: 1,
        args: [0.9],
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to six random foes."
    },

    554: {
        name: "Heart of Taurus", type: 1, func: 1, calc: 1,
        args: [1, 17, 1.5],
        range: 21, prob: 70,
        desc: "Raise HP of self at start of battle, based on 100% of his ATK."
    },

    555: {
        name: "Shredding Claws", type: 2, func: 3, calc: 3,
        args: [1.55],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to four random foes."
    },

    556: {
        name: "Scorching Tornado", type: 2, func: 33, calc: 1,
        args: [1.25, 2, 0.4, 0.3],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to four random foes and sometimes greatly lower DEF."
    },

    558: {
        name: "Blade of Conquest", type: 2, func: 3, calc: 1,
        args: [0.95],
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to six random foes."
    },

    559: {
        name: "Grace of the Goddess", type: 1, func: 1, calc: 0,
        args: [0.3, 1, 2],
        range: 3, prob: 70,
        desc: "Raise ATK and DEF of self and adjacent familiars."
    },

    560: {
        name: "Yalli of the Blade", type: 2, func: 3, calc: 1,
        args: [1.15],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes."
    },

    561: {
        name: "Affection", type: 1, func: 1, calc: 0,
        args: [0.2, 1],
        range: 3, prob: 70,
        desc: "Raise ATK of self and adjacent familiars."
    },

    562: {
        name: "Hewing Rood", type: 3, func: 13, calc: 1,
        args: [1.5],
        range: 21, prob: 50, ward: 1,
        desc: "Chance to unleash a counter attack when struck."
    },

    563: {
        name: "Ablution", type: 1, func: 1, calc: 0,
        args: [0.7, 2, 3],
        range: 21, prob: 70,
        desc: "Raise DEF and WIS of self."
    },

    564: {
        name: "Rites of the Shikigami", type: 2, func: 4, calc: 2,
        args: [1.65],
        range: 314, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage to up to four foes. Increased if fewer foes."
    },

    565: {
        name: "Pierce the Veil", type: 3, func: 38, calc: 6,
        args: [0, 1, 0, 60, 5],
        range: 7, prob: 50,
        desc: "Greatly lower ATK of up to three foes when being attacked."
    },

    566: {
        name: "Divine Compass", type: 1, func: 32, calc: 0,
        args: [0.1, 3],
        range: 8, prob: 70, sac: 1,
        desc: "Greatly lower WIS of all foes."
    },

    568: {
        name: "Scorching Wing", type: 2, func: 3, calc: 3,
        args: [0.9, 3, 0.3],
        range: 17, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to six random foes and sometimes freeze them."
    },

    569: {
        name: "Fallen Wing", type: 16, func: 16, calc: 0,
        range: 8, prob: 70,
        desc: "Remove the buffs of all foes upon his death."
    },

    570: {
        name: "Glaring Sunlight", type: 2, func: 4, calc: 2,
        args: [1.6, 7, 0.35, 2, 0.9],
        range: 8, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to all foes  and sometimes blind them, ignoring position."
    },

    571: {
        name: "Corona", type: 1, func: 1, calc: 0,
        args: [0.35, 5, 6],
        range: 3, prob: 70,
        desc: "Reduce physical and magic damages taken by self and adjacent familiars."
    },

    572: {
        name: "Venomflame", type: 2, func: 4, calc: 2,
        args: [2.3, 3, 0.4],
        range: 16, prob: 30, ward: 3, sac: 1,
        desc: "Deal massive WIS-based damage, sometimes freeze three random foes, ignoring position."
    },

    573: {
        name: "Blare of Judgment", type: 2, func: 4, calc: 2,
        args: [1.15, 5, 0.3, 1],
        range: 17, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage and sometimes silence six random foes, ignoring position."
    },

    574: {
        name: "Winding Brass", type: 2, func: 3, calc: 3,
        args: [1.15, 2, 0.2],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to all foes and sometimes paralyze targets."
    },

    575: {
        name: "Chaotic World", type: 1, func: 19, calc: 0,
        args: [0, 6, 0.6, 2, 0.6],
        range: 7, prob: 70,
        desc: "Chance to confuse up to three foes at start of battle."
    },

    576: {
        name: "Culling Out", type: 2, func: 4, calc: 2,
        args: [1.25],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to five random foes, ignoring position."
    },

    577: {
        name: "Triple Tails", type: 2, func: 3, calc: 3,
        args: [1.5],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to up to three foes."
    },

    578: {
        name: "Divine Mace", type: 5, func: 14, calc: 1,
        args: [1.6],
        range: 4, prob: 50, ward: 1, sac: 1,
        desc: "Take damage in place of any ally and unleash a heavy counterattack."
    },

    579: {
        name: "Intoxicate", type: 2, func: 4, calc: 1,
        args: [1.5],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to all foes, ignoring position."
    },

    580: {
        name: "Flurry of Fangs", type: 2, func: 4, calc: 2,
        args: [1.6],
        range: 314, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based damage to up to four foes. Increased if fewer foes."
    },

    581: {
        name: "Sacred Offering", type: 1, func: 32, calc: 0,
        args: [0.2, 2],
        range: 8, prob: 70,
        desc: "Greatly lower DEF of all foes."
    },

    582: {
        name: "Crumble", type: 2, func: 4, calc: 2,
        args: [1.4, 8, 0.4, 2000],
        range: 20, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage and sometimes burn five random foes, ignoring position."
    },

    583: {
        name: "Smoldering Serpent", type: 2, func: 4, calc: 2,
        args: [2],
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to three random foes, ignoring position."
    },

    584: {
        name: "Eye of the Serpent", type: 1, func: 1, calc: 0,
        args: [2, 23],
        range: 3, prob: 70,
        desc: "Buff self and adjacent familiars. DEF/WIS of each affected ally increase as its HP decrease."
    },

    585: {
        name: "Death's Call", type: 2, func: 34, calc: 2,
        args: [1.6, 3, 0.4, 0.2],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based damage to four random foes and sometimes greatly lower WIS."
    },

    586: {
        name: "Emerald Teeth", type: 2, func: 3, calc: 3,
        args: [1.3],
        range: 419, prob: 30, ward: 1, sac: 1,
        desc: "Deal varying AGI-based damage to four random foes."
    },

    588: {
        name: "Tranquil Death", type: 2, func: 4, calc: 3,
        args: [1.45],
        range: 20, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to five random foes, ignoring position."
    },

    589: {
        name: "Unbridle", type: 1, func: 1, calc: 0,
        args: [1, 18],
        range: 21, prob: 70,
        desc: "Allows self to perform an extra action during the next turn."
    },

    590: {
        name: "Macana Slash", type: 2, func: 3, calc: 3,
        args: [1.05],
        range: 20, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to five random foes."
    },

    591: {
        name: "Glittering Jade", type: 1, func: 1, calc: 0,
        args: [0.15, 4],
        range: 3, prob: 70,
        desc: "Raise AGI of self and adjacent familiars."
    },

    594: {
        name: "Holy Lash", type: 2, func: 37, calc: 1,
        args: [1.9, 0.2, 27, 21],
        range: 12, prob: 30, ward: 1,
        desc: "Heavy ATK-based damage and drain HP from all foes in the front line, ignoring position."
    },

    595: {
        name: "Shadow Whip", type: 1, func: 19, calc: 0,
        args: [0, 7, 0.2, 1, 0.9],
        range: 7, prob: 70,
        desc: "Chance to blind up to three foes for one turn at start of battle."
    },

    596: {
        name: "Masquerade", type: 2, func: 4, calc: 2,
        args: [0.75],
        range: 17, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },

    597: {
        name: "Runaway Chariot", type: 2, func: 3, calc: 3,
        args: [1.35],
        range: 314, prob: 30, ward: 1,
        desc: "AGI-based damage to up to four foes. Increased if fewer foes."
    },

    598: {
        name: "Entangle", type: 16, func: 32, calc: 0,
        args: [0.15, 4],
        range: 8, prob: 70,
        desc: "Greatly lower AGI of all foes upon his death."
    },

    599: {
        name: "Poisoned Wine", type: 2, func: 4, calc: 1,
        args: [1.2, 4, 0.3],
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to six random foes and sometimes disable them, ignoring position."
    },

    600: {
        name: "Poison-Laced Hood", type: 3, func: 41, calc: 1,
        args: [1.8, 1, 1, 20],
        range: 21, prob: 50, ward: 1,
        desc: "Chance of poisonous counter attack (20% of max HP) when struck, ignoring position."
    },

    601: {
        name: "Veil of Night", type: 2, func: 3, calc: 3,
        args: [1.85],
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to four random foes."
    },

    602: {
        name: "Cake Cutting", type: 2, func: 3, calc: 1,
        args: [1.15, 1, 1, 10],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal venomous ATK-based damage to five random foes."
    },

    603: {
        name: "Bandage Garotte", type: 2, func: 37, calc: 1,
        args: [2.05, 0.15, 27, 21],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Massive ATK-based damage and drain HP from three random foes, ignoring position."
    },

    604: {
        name: "Blindside", type: 2, func: 4, calc: 2,
        args: [1.9],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to three random foes, ignoring position."
    },

    605: {
        name: "Bone Shatter", type: 2, func: 3, calc: 1,
        args: [1.6],
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to four random foes."
    },

    606: {
        name: "Overawe", type: 5, func: 28, calc: 7,
        args: [0.45, 10, 23, 3, 0.1],
        range: 21, prob: 50,
        desc: "Reflect 90% of AGI/WIS-based damage back to two random foes."
    },

    607: {
        name: "Breath of Darkness", type: 2, func: 4, calc: 2,
        args: [1.35, 8, 0.4, 2500],
        range: 8, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage to all foes and sometimes burn targets, ignoring position."
    },

    608: {
        name: "Hungry Wolf", type: 2, func: 33, calc: 1,
        args: [0.9, 4, 0.3, 0.1],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to six random foes and sometimes greatly lower AGI."
    },

    609: {
        name: "Harvest", type: 2, func: 3, calc: 1,
        args: [2.6],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },

    610: {
        name: "Fickle Treat", type: 1, func: 1, calc: 0,
        args: [452, 16],
        range: 21, prob: 70,
        desc: "Self is automatically revived with full HP after being killed."
    },

    611: {
        name: "Cruel Trick", type: 2, func: 3, calc: 3,
        args: [1.65],
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to three random foes."
    },

    612: {
        name: "Triple Bite", type: 2, func: 4, calc: 3,
        args: [2.25],
        range: 18, prob: 30, ward: 3,
        desc: "Massive AGI-based damage to three random foes, ignoring position. Attacks rear foes first."
    },

    613: {
        name: "Icy Smile", type: 2, func: 4, calc: 2,
        args: [1.95, 3, 0.5],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage and sometimes freeze three random foes, ignoring position."
    },

    614: {
        name: "Following Orders", type: 2, func: 3, calc: 1,
        args: [1.2, 5, 0.2, 2],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes and sometimes silence foes for 2 turns."
    },

    616: {
        name: "Cat Scratch", type: 2, func: 4, calc: 2,
        args: [1.25],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to five random foes, ignoring position."
    },

    617: {
        name: "Tail Swish", type: 1, func: 1, calc: 0,
        args: [0.2, 3],
        range: 3, prob: 70,
        desc: "Raise WIS of self and adjacent familiars, based on 20% of her WIS."
    },

    618: {
        name: "Jack-O'-Boom", type: 2, func: 4, calc: 2,
        args: [1.15],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },

    619: {
        name: "Pumpkin Bulwark", type: 1, func: 1, calc: 0,
        args: [0.2, 6],
        range: 4, prob: 70,
        desc: "Reduce magic damage taken by all allies."
    },

    620: {
        name: "Storm of Hooves", type: 2, func: 4, calc: 2,
        args: [2],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },

    621: {
        name: "Devoted Arrows", type: 2, func: 4, calc: 2,
        args: [1.7],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },

    622: {
        name: "Deathbed Shot", type: 16, func: 4, calc: 2,
        args: [0.35],
        range: 208, prob: 70, ward: 2,
        desc: "Deal WIS-based damage to all foes upon her death. Increased if fewer foes."
    },

    623: {
        name: "Steamsaw Assault", type: 2, func: 24, calc: 0,
        range: 21, prob: 35, sac: 1,
        randSkills: [624, 625, 626, 627],
        desc: "Strong weapon attack with unpredictable results."
    },

    624: {
        name: "Saw Swipe", type: 2, func: 4, calc: 3,
        args: [2.1],
        range: 16, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to three random foes, ignoring position."
    },

    625: {
        name: "Brutal Slash", type: 2, func: 4, calc: 3,
        args: [1.7],
        range: 19, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to four random foes, ignoring position."
    },

    626: {
        name: "Scatter Shot", type: 2, func: 4, calc: 3,
        args: [1.4],
        range: 20, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to five random foes, ignoring position."
    },

    627: {
        name: "Concussive Blast", type: 2, func: 4, calc: 3,
        args: [1.1, 2, 0.7],
        range: 8, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to and sometimes stun all foes, ignoring position."
    },

    628: {
        name: "Glittering Flame", type: 3, func: 13, calc: 1,
        args: [1.4, 8, 0.5, 2500],
        range: 21, prob: 50, ward: 1, sac: 1,
        desc: "Chance to unleash a burning counter attack when struck."
    },

    629: {
        name: "Slice and Dice", type: 2, func: 3, calc: 1,
        args: [0.7],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes."
    },

    630: {
        name: "Water's Fury", type: 2, func: 34, calc: 2,
        args: [1.75, 1, 0.3, 0.1],
        range: 19, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage and sometimes greatly lower ATK of four random foes."
    },

    631: {
        name: "Water's Mercy", type: 1, func: 1, calc: 0,
        args: [0.25, 17, 1.25],
        range: 3, prob: 70,
        desc: "Raise HP of self and adjacent familiars at beginning of battle."
    },

    632: {
        name: "Fool's Rage", type: 2, func: 36, calc: 1,
        args: [1.35, 0.2, 27, 21],
        range: 419, prob: 30, ward: 1,
        desc: "Drains HP from four random foes while dealing varying ATK-based damage."
    },

    633: {
        name: "Fool's Theurgy", type: 2, func: 6, calc: 0,
        args: [1],
        range: 101, prob: 50,
        desc: "Revive and fully restore HP of 1 random familiar."
    },

    634: {
        name: "Airstrike Spear", type: 2, func: 33, calc: 1,
        args: [1.25, 2, 0.4, 0.15],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes and sometimes greatly lower DEF."
    },

    635: {
        name: "Frumious", type: 2, func: 4, calc: 2,
        args: [1.7, 2, 0.3],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based damage to and sometimes paralyze four random foes, ignoring position."
    },

    636: {
        name: "Cold Tentacles", type: 2, func: 4, calc: 2,
        args: [1.3, 3, 0.25],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage and sometimes freeze five random foes, ignoring position."
    },

    637: {
        name: "Guandao and Claws", type: 2, func: 3, calc: 1,
        args: [1.4],
        range: 419, prob: 30, ward: 1, sac: 1,
        desc: "Deal varying ATK-based damage to four random foes."
    },

    638: {
        name: "Nipping Wind", type: 2, func: 4, calc: 3,
        args: [1.25],
        range: 17, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to six random foes, ignoring position."
    },

    639: {
        name: "Breeze's Mercy", type: 1, func: 1, calc: 0,
        args: [0.25, 4],
        range: 3, prob: 70,
        desc: "Raise AGI of self and adjacent familiars, based on 25% of her WIS."
    },

    640: {
        name: "Turkey Shoot", type: 2, func: 3, calc: 3,
        args: [1.2, 7, 0.2, 1, 0.9],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to five random foes and sometimes blind them for one turn."
    },

    641: {
        name: "Cannonade", type: 2, func: 4, calc: 3,
        args: [1.25],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage to five random foes, ignoring position."
    },

    642: {
        name: "Poison Syrup", type: 2, func: 4, calc: 2,
        args: [1.95, 2, 0.3],
        range: 313, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based damage, sometimes paralyze up to three foes. Increased if fewer foes."
    },

    643: {
        name: "Fluttering Leaf", type: 6, func: 27, calc: 0,
        args: [2, 1, 78, 79],
        range: 21, prob: 50,
        desc: "Evade enemy ATK-based attack skills."
    },

    644: {
        name: "Vine Lash", type: 2, func: 4, calc: 1,
        args: [1.4, 1, 0.5, 10],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes and sometimes poison them, ignoring position."
    },

    645: {
        name: "Dread", type: 2, func: 3, calc: 1,
        args: [1.1],
        range: 314, prob: 30, ward: 1,
        desc: "ATK-based damage to up to four foes. Increased if fewer foes."
    },

    646: {
        name: "Initiative", type: 1, func: 31, calc: 0,
        args: [1, 2],
        range: 4, prob: 70,
        desc: "Order of attack is determined by ATK during the next two turns."
    },

    647: {
        name: "Hailstroke", type: 2, func: 4, calc: 1,
        args: [1.4, 5, 0.35, 1],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "ATK-based damage and sometimes silence five random foes for 1 turn, ignoring position."
    },

    648: {
        name: "Frost Feathers", type: 2, func: 4, calc: 3,
        args: [1.95],
        range: 43, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy AGI-based damage to three random foes, ignoring position. Attack front foes first."
    },

    649: {
        name: "Whirling Spear", type: 2, func: 4, calc: 3,
        args: [1.65],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy AGI-based damage to up to three foes, ignoring position."
    },

    650: {
        name: "Tempest Slash", type: 2, func: 3, calc: 1,
        args: [1.5],
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to four random foes."
    },

    651: {
        name: "Wings of Valor", type: 1, func: 44, calc: 0,
        args: [0.25, 1, 0, 0, 0, 0.1, 4],
        range: 3, prob: 70,
        desc: "Raise ATK/AGI of self and adjacent familiars based on 25% and 10% of his WIS respectively."
    },

    652: {
        name: "Rapid Shot", type: 2, func: 4, calc: 1,
        args: [1.8],
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to four random foes, ignoring position."
    },

    653: {
        name: "Defensive Stance", type: 1, func: 1, calc: 0,
        args: [0.2, 5],
        range: 4, prob: 70,
        desc: "Reduce physical damage taken by all allies."
    },

    654: {
        name: "Fated Doom", type: 2, func: 4, calc: 2,
        args: [2],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },

    655: {
        name: "Wrath of Mauna Kea", type: 2, func: 4, calc: 2,
        args: [1.05, 3, 0.3],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to and sometimes freeze six random foes, ignoring postion."
    },

    656: {
        name: "Grace of Mauna Kea", type: 1, func: 44, calc: 0,
        args: [2, 13, 0, 0, 0, 0.4, 6, 7],
        range: 3, prob: 70,
        desc: "WIS of self/adjacent allies go up when their HP go down, magic/breath dmg taken reduced."
    },

    657: {
        name: "Hound's Bay", type: 2, func: 3, calc: 1,
        args: [1.25],
        range: 208, prob: 30, ward: 1,
        desc: "ATK-based damage to all foes. Increased if fewer foes."
    },

    658: {
        name: "Furious Fangs", type: 3, func: 39, calc: 6,
        args: [1, 1, 4, 30, 5],
        range: 21, prob: 50,
        desc: "Greatly increase ATK and AGI of self when being attacked."
    },

    659: {
        name: "Winter's Breath", type: 2, func: 34, calc: 2,
        args: [1.7, 1, 0.7, 0.15],
        range: 15, prob: 30, ward: 3, sac: 1,
        desc: "Heavy WIS-based DMG to all foes in front/middle line, may greatly lower ATK."
    },

    660: {
        name: "Rain of Ice", type: 2, func: 4, calc: 2,
        args: [1.55],
        range: 54, prob: 30, ward: 3,
        desc: "Heavy WIS-based DMG to four random foes, ignoring position. Middle then rear foes first."
    },

    661: {
        name: "Freezing Gaze", type: 1, func: 19, calc: 0,
        args: [0, 3, 0.2],
        range: 8, prob: 70,
        desc: "Chance to freeze all foes at start of battle."
    },

    662: {
        name: "Unerring Harpoon", type: 2, func: 4, calc: 1,
        args: [0.8],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes, ignoring position."
    },

    663: {
        name: "Enthralling Shot", type: 2, func: 36, calc: 3,
        args: [1.1, 0.25, 27, 21],
        range: 8, prob: 30, ward: 1,
        desc: "Drains HP from all foes while dealing AGI-based damage."
    },

    664: {
        name: "Requited Love", type: 3, func: 13, calc: 3,
        args: [1],
        range: 21, prob: 50, ward: 1,
        desc: "Chance to unleash AGI-based counter attack when struck."
    },

    665: {
        name: "Iceberg Shell", type: 5, func: 14, calc: 1,
        args: [1.6],
        range: 4, prob: 50, ward: 1,
        desc: "Take damage in place of any ally and unleash a heavy counter attack."
    },

    666: {
        name: "Ice Shard", type: 3, func: 41, calc: 2,
        args: [2, 3, 0.3],
        range: 21, prob: 50, ward: 2,
        desc: "Chance to unleash a freezing massive counter attack when struck, ignoring position."
    },

    667: {
        name: "Icy Gift", type: 2, func: 3, calc: 1,
        args: [1.1, 5, 0.3, 1],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to and sometimes silence all foes ."
    },

    668: {
        name: "Hail Stiletto", type: 2, func: 3, calc: 3,
        args: [1.5],
        range: 44, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to four random foes. Attacks front foes first."
    },

    671: {
        name: "Hardened Rime", type: 5, func: 14, calc: 1,
        args: [1.4],
        range: 2, prob: 50, ward: 1, sac: 1,
        desc: "Take damage in place of adjacent familiars and counter."
    },

    672: {
        name: "Snow Blade", type: 2, func: 4, calc: 2,
        args: [1.6],
        range: 39, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage to four random foes, ignoring position. Attacks rear foes first."
    },

    673: {
        name: "Leaching Blizzard", type: 1, func: 46, calc: 0,
        args: [0.2, 3, 0, 0, 0, 3, 0.3],
        range: 7, prob: 70,
        desc: "Greatly lower WIS of up to three foes and sometimes freeze target."
    },

    674: {
        name: "Meteor Shower", type: 2, func: 4, calc: 2,
        args: [1.7, 4, 0.3],
        range: 314, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based damage and sometimes disable up to four foes. Increased if fewer foes."
    },

    675: {
        name: "Tail of Hail", type: 2, func: 4, calc: 2,
        args: [1.65],
        range: 32, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to up to four foes, ignoring position."
    },

    676: {
        name: "Icy Touch", type: 2, func: 3, calc: 1,
        args: [1.9, 5, 0.3],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage and sometimes silence three random foes."
    },

    677: {
        name: "Dance of Snow", type: 2, func: 4, calc: 2,
        args: [1.4],
        range: 208, prob: 30, ward: 2,
        desc: "WIS-based damage to all foes. Increased if fewer foes."
    },

    678: {
        name: "Icy Tailwind", type: 1, func: 1, calc: 0,
        args: [0.15, 8],
        range: 3, prob: 70,
        desc: "Raise the skill trigger rate of self and adjacent familiars by 15%."
    },

    679: {
        name: "Icicle Crush", type: 2, func: 4, calc: 2,
        args: [1.95, 3, 0.4],
        range: 43, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage to and may freeze three random foes. Attack front foes first."
    },

    680: {
        name: "Ice-Crystal Mirror", type: 5, func: 28, calc: 7,
        args: [0.25, 2, 23, 3, 0.5],
        range: 21, prob: 50,
        desc: "Reflect 50% of WIS-based damage back to two random foes."
    },

    681: {
        name: "Trial by Luck", type: 2, func: 37, calc: 2,
        args: [1.35, 0.13, 27, 21],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage and drain HP from all foes, ignoring position."
    },

    682: {
        name: "Flames of Bounty", type: 2, func: 4, calc: 2,
        args: [1.7],
        range: 314, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy WIS-based damage to up to four foes. Increased if fewer foes."
    },

    683: {
        name: "Flames of Ruin", type: 2, func: 4, calc: 2,
        args: [1.65],
        range: 7, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy WIS-based damage to up to three foes, ignoring position."
    },

    684: {
        name: "Luckcall Axe", type: 2, func: 3, calc: 3,
        args: [1.75],
        range: 23, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to two random foes."
    },

    685: {
        name: "Hexbreak Axe", type: 2, func: 3, calc: 1,
        args: [2],
        range: 23, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },

    686: {
        name: "Blaze of Feathers", type: 2, func: 4, calc: 2,
        args: [1.3, 8, 0.4, 2000],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes burn five random foes, ignoring position."
    },

    687: {
        name: "Anointed Feathers", type: 1, func: 1, calc: 0,
        args: [0.1, 3, 2],
        range: 3, prob: 70,
        desc: "Raise WIS and DEF of self and adjacent familiars at start of battle."
    },

    688: {
        name: "Brush Shot", type: 2, func: 4, calc: 1,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes, ignoring position."
    },

    689: {
        name: "Pain Ordained", type: 2, func: 4, calc: 2,
        args: [2.05],
        range: 313, prob: 30, ward: 2,
        desc: "Massive WIS-based damage to up to three foes, ignoring position. Increased if fewer foes."
    },

    690: {
        name: "Fate Restrained", type: 1, func: 45, calc: 0,
        args: [0.25, 2, 0, 0, 0, 0.15, 3],
        range: 7, prob: 70,
        desc: "Greatly lower DEF and WIS of up to three foes."
    },

    691: {
        name: "Hands of Riches", type: 2, func: 3, calc: 1,
        args: [2.3, 2, 0.4],
        range: 6, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage and sometimes paralyze up to two foes."
    },

    692: {
        name: "Blade of Ending", type: 2, func: 33, calc: 3,
        args: [1.6, 2, 0.15, 0.3],
        range: 16, prob: 30, ward: 1,
        desc: "Heavy AGI-based damage to three random foes and sometimes greatly lower DEF."
    },

    693: {
        name: "Twist of Fate", type: 5, func: 28, calc: 7,
        args: [0.25, 3, 6, 3, 0.5],
        range: 21, prob: 50,
        desc: "Reflect 50% of AGI-based damage back to up to two foes."
    },

    694: {
        name: "Serpent's Lash", type: 2, func: 3, calc: 3,
        args: [0.75],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to five random foes."
    },

    695: {
        name: "Rain of Terror", type: 2, func: 4, calc: 1,
        args: [1.7],
        range: 314, prob: 30, ward: 1,
        desc: "Heavy ATK-based damage to up to four foes, ignoring position. Increased if fewer foes."
    },

    696: {
        name: "Fearless", type: 1, func: 1, calc: 0,
        args: [0.5, 5, 6],
        range: 21, prob: 70,
        desc: "Reduce physical and magical damage taken by self greatly."
    },

    697: {
        name: "Staff of Doom", type: 2, func: 37, calc: 2,
        args: [1.6, 0.15, 27, 21],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage and drain HP from four random foes, ignoring position."
    },

    698: {
        name: "Reclaim Soul", type: 3, func: 11, calc: 1,
        args: [1],
        range: 3, prob: 50,
        desc: "Convert damage to heal self and adjacent familiars."
    },

    699: {
        name: "Multi-Shot Aerial ", type: 2, func: 4, calc: 3,
        args: [1.6, 8, 0.1, 5000],
        range: 39, prob: 30, ward: 2,
        desc: "Heavy AGI-based damage, ignore position and may burn 4 random foes. Attacks rear first."
    },

    700: {
        name: "Cherry Bomb", type: 3, func: 41, calc: 2,
        args: [1],
        range: 21, prob: 50, ward: 2,
        desc: "Chance to unleash WIS-based counter attack when struck."
    },

    701: {
        name: "Gaze of Wealth", type: 1, func: 19, calc: 0,
        args: [0, 2, 0.15],
        range: 7, prob: 70,
        desc: "Chance to paralyze up to three foes at start of battle."
    },

    702: {
        name: "Shield Slash", type: 2, func: 34, calc: 3,
        args: [1.75, 2, 1, 0.1],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy AGI-based damage and lower DEF of all foes, ignoring position."
    },

    703: {
        name: "Entwining Silk", type: 2, func: 4, calc: 2,
        args: [1.3, 4, 0.2],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage and sometimes disable five random foes."
    },

    704: {
        name: "Scales of Darkness", type: 2, func: 4, calc: 2,
        args: [1.1, 7, 0.2, 1, 0.9],
        range: 17, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to six random foes and sometimes blind them."
    },

    705: {
        name: "Hornet Sting", type: 2, func: 4, calc: 1,
        args: [1.35, 1, 0.3, 10],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes and sometimes poison them, ignoring position."
    },

    706: {
        name: "Storm of Wrath", type: 2, func: 36, calc: 1,
        args: [1.1, 0.2, 27, 21],
        range: 20, prob: 30, ward: 1,
        desc: "Drains HP from five random foes while dealing ATK-based damage."
    },

    707: {
        name: "Furious Roar", type: 1, func: 51, calc: 0,
        args: [0, 1, 0.35, 2, 0.35, 1, 121, 120, 43],
        range: 7, prob: 70,
        desc: "Absorbs ATK from up to three foes at beginning of battles."
    },

    708: {
        name: "Discipline", type: 2, func: 4, calc: 2,
        args: [1.6],
        range: 32, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to up to four foes, ignoring position."
    },

    709: {
        name: "Winds of Anemone", type: 2, func: 18, calc: 4,
        args: [1.5],
        range: 4, prob: 30, sac: 1,
        desc: "Restore a large amount of HP to all party members."
    },

    800: {
        name: "Hauteclere", type: 2, func: 3, calc: 1,
        args: [2.65],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },

    801: {
        name: "Mischief Arrows", type: 2, func: 4, calc: 1,
        args: [1.4, 8, 0.5, 1000],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "ATK-based damage and may burn all foes."
    },

    802: {
        name: "Twin Oars", type: 2, func: 3, calc: 1,
        args: [2.25],
        range: 6, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to up to two foes."
    },

    803: {
        name: "Golden Fleece", type: 16, func: 1, calc: 0,
        args: [0.5, 17, 0.5],
        range: 4, prob: 70,
        desc: "Chance to raise HP of all party members upon his death."
    },

    804: {
        name: "Thorn Whip", type: 2, func: 4, calc: 2,
        args: [2.1],
        range: 16, prob: 30, ward: 2,
        desc: "Massive WIS-based damage to three random foes."
    },

    805: {
        name: "Waking Kiss", type: 2, func: 6, calc: 0,
        args: [1],
        range: 122, prob: 50,
        desc: "Revive and fully restore HP of two random familiars."
    },

    806: {
        name: "Dance of the Ogres", type: 2, func: 4, calc: 3,
        args: [2.25],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive AGI-based damage to three random foes, ignoring position."
    },

    807: {
        name: "Iron Rod", type: 2, func: 3, calc: 1,
        args: [1.4],
        range: 15, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes in the front/middle line."
    },

    808: {
        name: "Bloodied Rod", type: 2, func: 3, calc: 1,
        args: [0.8],
        range: 12, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes in the front line."
    },

    809: {
        name: "Ogresbane", type: 2, func: 3, calc: 1,
        args: [1.15, 8, 0.25, 2000],
        range: 45, prob: 30, ward: 1,
        desc: "Deal ATK-based damage and sometimes burn five random foes. Attack front foes first."
    },

    810: {
        name: "Fighting Spirit", type: 1, func: 1, calc: 0,
        args: [0.35, 1],
        range: 3, prob: 70,
        desc: "Raise ATK of self and adjacent familiars based on 35% of his WIS."
    },

    811: {
        name: "Talon Rush", type: 2, func: 4, calc: 1,
        args: [1.55],
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to four random foes, ignoring position."
    },

    812: {
        name: "Vitality Pinion", type: 1, func: 44, calc: 0,
        args: [0.2, 1, 0, 0, 0, 0.2, 3],
        range: 3, prob: 70,
        desc: "Raise ATK and WIS of self and adjacent familiars at start of battle."
    },

    813: {
        name: "Dogfight", type: 2, func: 3, calc: 1,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },

    814: {
        name: "Winds of War", type: 2, func: 3, calc: 1,
        args: [1.4],
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to four random foes."
    },

    815: {
        name: "Psychopomp", type: 1, func: 1, calc: 0,
        args: [816, 16],
        range: 153, prob: 70,
        desc: "Self and two random allies are automatically revived with 60% HP after being killed."
    },

    816: {
        name: "Metempsychosis", type: 16, func: 6, calc: 0,
        args: [0.6],
        range: 21, prob: 100,
        desc: "-"
    },

    817: {
        name: "Jealousy", type: 3, func: 42, calc: 1,
        args: [1.55, 1, 1, 0.07],
        range: 21, prob: 50, ward: 1,
        desc: "Chance to unleash a heavy counter attack when struck, greatly lower ATK."
    },

    818: {
        name: "Grace of Love", type: 1, func: 1, calc: 0,
        args: [0.45, 2],
        range: 21, prob: 70,
        desc: "Raise DEF of self at start of battle."
    },

    819: {
        name: "Enthralling Scent", type: 2, func: 34, calc: 2,
        args: [1.65, 3, 0.3, 0.07],
        range: 34, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based damage to all foes in the front/rear lines, sometimes greatly lower WIS."
    },

    820: {
        name: "Leaping Dead", type: 2, func: 3, calc: 1,
        args: [1.1, 1, 0.3, 10],
        range: 40, prob: 30, ward: 1,
        desc: "ATK-based damage to five random foes, sometimes poison them. Attacks rear foes first."
    },

    821: {
        name: "Hug of the Dead", type: 1, func: 19, calc: 0,
        args: [0, 4, 0.3],
        range: 7, prob: 70,
        desc: "Sometimes disable up to three foes at start of battle."
    },

    822: {
        name: "Burning Tarots", type: 2, func: 4, calc: 2,
        args: [0.65],
        range: 17, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },

    823: {
        name: "Lovesickness", type: 2, func: 4, calc: 2,
        args: [1.35, 5, 0.15, 1],
        range: 8, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to all foes and sometimes silence targets, ignoring position."
    },

    824: {
        name: "Tune of Love", type: 1, func: 44, calc: 0,
        args: [0.3, 2, 0, 0, 0, 0.1, 3],
        range: 4, prob: 70,
        desc: "Raise DEF/WIS of all familiars based on 30% and 10% of his WIS respectively."
    },

    827: {
        name: "Lotus Blossom", type: 2, func: 34, calc: 2,
        args: [1.75, 1, 1, 0.06],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage and lower ATK of four random foes."
    },

    828: {
        name: "Scarlet Arrows", type: 2, func: 4, calc: 1,
        args: [1.3, 8, 0.3, 2000],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes and sometimes burn targets, ignoring position."
    },

    829: {
        name: "Rousing Roar", type: 1, func: 44, calc: 1,
        args: [0.2, 1, 0, 0, 0, 0.1, 4],
        range: 3, prob: 70, sac: 1,
        desc: "Raise ATK/AGI of self and adjacent familiars on 20% and 10% of its ATK respectively."
    },

    830: {
        name: "Gift of the Fleece", type: 1, func: 1, calc: 0,
        args: [0.4, 5],
        range: 3, prob: 70, sac: 1,
        desc: "Reduce physical damage taken by self and adjacent familiars."
    },

    831: {
        name: "Fervent Blade", type: 2, func: 3, calc: 1,
        args: [2],
        range: 16, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to three random foes."
    },

    832: {
        name: "Tit for Tat", type: 3, func: 13, calc: 1,
        args: [1.3],
        range: 21, prob: 50, ward: 1,
        desc: "Chance to unleash a counter attack when struck."
    },

    833: {
        name: "Seeds of Strife", type: 2, func: 4, calc: 3,
        args: [1.55, 2, 0.2],
        range: 208, prob: 30, ward: 2, sac: 1,
        desc: "Heavy AGI-based DMG to all foes, sometimes paralyze target. Increased if fewer foes."
    },

    834: {
        name: "Cold Blood", type: 3, func: 41, calc: 1,
        args: [1.5, 1, 0.4, 10],
        range: 21, prob: 50, ward: 1, sac: 1,
        desc: "Chance to unleash a heavy poisonous counter attack (10% of max HP) when struck."
    },

    835: {
        name: "Funerary Wings", type: 2, func: 3, calc: 3,
        args: [1.6, 2, 0.3],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Heavy AGI-based damage to and sometimes paralyze three random foes."
    },

    836: {
        name: "Blade of Hair", type: 2, func: 4, calc: 1,
        args: [1.3],
        range: 20, prob: 30, ward: 1,
        desc: "ATK-based damage to five random foes, ignoring position."
    },

    837: {
        name: "Hair Cocoon", type: 1, func: 1, calc: 0,
        args: [1, 18],
        range: 122, prob: 70,
        desc: "Allows two random allies to perform an extra action during the next turn."
    },

    838: {
        name: "Calamity Unleashed", type: 2, func: 4, calc: 2,
        args: [1.75],
        range: 19, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage to four random foes, ignoring position."
    },

    839: {
        name: "Last Hope", type: 1, func: 1, calc: 0,
        args: [840, 16],
        range: 21, prob: 70,
        desc: "Revive and fully restore HP of self upon her death."
    },

    840: {
        name: "Dawn's Light", type: 16, func: 6, calc: 0,
        args: [1],
        range: 21, prob: 100,
        desc: "-"
    },

    841: {
        name: "Raging Spear", type: 2, func: 3, calc: 1,
        args: [1.35, 2, 0.25],
        range: 32, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to and sometimes paralyze up to four foes."
    },

    842: {
        name: "Icy Flame", type: 2, func: 4, calc: 2,
        args: [1.6, 8, 0.25, 2500],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage and sometimes burn four random foes, ignoring position."
    },

    843: {
        name: "Rampike Limbs", type: 2, func: 4, calc: 2,
        args: [1.2],
        range: 32, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to up to four foes, ignoring position."
    },

    844: {
        name: "Infernal Gale", type: 2, func: 4, calc: 2,
        args: [1.45],
        range: 19, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to four random foes, ignoring position."
    },

    845: {
        name: "Spring Breeze", type: 1, func: 44, calc: 0,
        args: [0.2, 3, 0, 0, 0, 0.3, 5],
        range: 3, prob: 70,
        desc: "Raise WIS and reduce physical damage taken by self and adjacent familiars."
    },

    846: {
        name: "Sakura Shower", type: 2, func: 4, calc: 2,
        args: [1, 2, 0.2],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to and sometimes paralyze six random foes, ignoring position."
    },

    847: {
        name: "Petals of Confusion", type: 1, func: 1, calc: 0,
        args: [0.15, 3],
        range: 3, prob: 70,
        desc: "Raise WIS of self and adjacent familiars, based on 15% of her WIS."
    },

    848: {
        name: "Gale Claw", type: 2, func: 4, calc: 2,
        args: [2],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },

    851: {
        name: "Blazing Rapier", type: 2, func: 4, calc: 2,
        args: [1.15],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to five random foes, ignoring position."
    },

    854: {
        name: "Conflagration", type: 1, func: 1, calc: 0,
        args: [0.2, 3],
        range: 3, prob: 70, sac: 1,
        desc: "Raise WIS of self and adjacent familiars, based on 20% of his WIS."
    },

    857: {
        name: "Inferno Aegis", type: 1, func: 1, calc: 0,
        args: [0.3, 5],
        range: 3, prob: 70, sac: 1,
        desc: "Reduce physical damage taken by self and adjacent familiars by 30%."
    },

    858: {
        name: "Freezing Wind", type: 2, func: 4, calc: 2,
        args: [0.85],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to five random foes, ignoring position."
    },

    859: {
        name: "Lashing Claws", type: 5, func: 14, calc: 1,
        args: [1.45],
        range: 2, prob: 50, ward: 1,
        desc: "Take damage in place of adjacent familiars and counter."
    },

    860: {
        name: "Last Stand", type: 1, func: 44, calc: 1,
        args: [0.3, 17, 0, 0, 0, 0.3, 2],
        range: 3, prob: 70,
        desc: "Raise HP/DEF of self and adjacent familiars on 30% of its ATK respectively."
    },

    861: {
        name: "Flame Gout", type: 2, func: 34, calc: 2,
        args: [1.35, 2, 0.25, 0.15],
        range: 208, prob: 30, ward: 3,
        desc: "WIS-based DMG and sometimes lower DEF of all foes. Increased if fewer foes."
    },

    862: {
        name: "Brass Wing", type: 5, func: 28, calc: 7,
        args: [0.23, 0, 7, 3, 0.3],
        range: 21, prob: 50,
        desc: "Reflect 70% of all kinds of damages back to up to three foes."
    },

    863: {
        name: "Popping Petals", type: 2, func: 33, calc: 2,
        args: [1.3, 3, 0.2, 0.1],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal WIS-based damage to five random foes and sometimes greatly lower WIS."
    },

    864: {
        name: "Reforged Blade", type: 2, func: 3, calc: 1,
        args: [1.75],
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },

    865: {
        name: "Dragonblood Ward", type: 6, func: 27, calc: 0,
        args: [2, 10, 78, 79],
        range: 21, prob: 50,
        desc: "Evade enemy WIS-based and AGI-based attack skills."
    },

    866: {
        name: "Winds of Sorrow", type: 2, func: 4, calc: 2,
        args: [1.6, 3, 0.3],
        range: 314, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage and sometimes freeze up to four foes. Increased if fewer foes."
    },

    867: {
        name: "Tail Blizzard", type: 1, func: 1, calc: 0,
        args: [0.1, 4],
        range: 3, prob: 70,
        desc: "Raise AGI of self and adjacent familiars at start of battle."
    },

    868: {
        name: "Emerald Flame", type: 2, func: 3, calc: 1,
        args: [1.1, 1, 0.3, 10],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to and sometimes poison five random foes."
    },

    870: {
        name: "Oak Arrow", type: 2, func: 4, calc: 1,
        args: [2, 2, 0.4],
        range: 313, prob: 30, ward: 1, sac: 1,
        desc: "Massive ATK-based damage, sometimes paralyze up to three foes. Increased if fewer foes."
    },

    871: {
        name: "Flying Leaf", type: 2, func: 4, calc: 3,
        args: [1.6],
        range: 314, prob: 30, ward: 2, sac: 1,
        desc: "Heavy AGI-based damage to up to four foes, ignoring position. Increased if fewer foes."
    },

    872: {
        name: "Fervent Hooves", type: 2, func: 4, calc: 2,
        args: [1.35],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to five random foes."
    },

    873: {
        name: "Binding Whip", type: 1, func: 19, calc: 0,
        args: [0, 2, 0.3],
        range: 7, prob: 70,
        desc: "Chance to paralyze up to three foes at start of battle."
    },

    874: {
        name: "Perforate", type: 2, func: 33, calc: 1,
        args: [0.95, 3, 0.25, 0.19],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to six random foes and sometimes greatly lower WIS."
    },

    875: {
        name: "Primal Dance", type: 2, func: 3, calc: 1,
        args: [1.45],
        range: 314, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to up to four foes. Increased if fewer foes."
    },

    876: {
        name: "Sharpshooting", type: 2, func: 4, calc: 1,
        args: [2.7, 5, 0.3, 1],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes, sometimes silence targets."
    },

    877: {
        name: "Blood Blade", type: 2, func: 37, calc: 2,
        args: [1.7, 0.3, 27, 21],
        range: 19, prob: 30, ward: 2,
        desc: "Drains HP from four random foes while dealing heavy WIS-based damage."
    },

    878: {
        name: "Eye of Confusion", type: 1, func: 51, calc: 0,
        args: [0, 10, 0.08, 2, 0.35, 1, 121, 120, 43],
        range: 16, prob: 70,
        desc: "Absorbs AGI and WIS from three random foes at the beginning of battles."
    },

    879: {
        name: "Bloodied Hatchet", type: 1, func: 1, calc: 0,
        args: [881, 16],
        range: 36, prob: 70,
        desc: "Self and an ally on the right are automatically revived with 70% HP after being killed."
    },

    880: {
        name: "Hungry Leopard", type: 2, func: 4, calc: 2,
        args: [2.05],
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to three random foes, ignoring position."
    },

    881: {
        name: "Ferocious Incarnation", type: 16, func: 6, calc: 0,
        args: [0.7],
        range: 21, prob: 100,
        desc: "-"
    },

    882: {
        name: "Deceiving Fog", type: 2, func: 4, calc: 2,
        args: [1.6, 7, 0.3, 1, 0.9],
        range: 314, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS dmg and sometimes blind up to 4 foes, ignoring position.  Incresed if fewer foes."
    },

    883: {
        name: "Foul Play", type: 2, func: 4, calc: 3,
        args: [1.25, 2, 0.2],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage to and sometimes paralyze five random foes, ignoring position. "
    },

    884: {
        name: "Surprise Attack", type: 2, func: 4, calc: 3,
        args: [1.25],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage to four random foes, ignoring position."
    },

    885: {
        name: "Blade of Truth", type: 2, func: 3, calc: 1,
        args: [0.95],
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to six random foes."
    },

    886: {
        name: "Honest Heart", type: 1, func: 44, calc: 0,
        args: [0.3, 1, 0, 0, 0, 0.3, 6],
        range: 3, prob: 70,
        desc: "Raise ATK and reduce magical damage taken by self and adjacent familiars."
    },

    887: {
        name: "Punishing Fangs", type: 2, func: 3, calc: 1,
        args: [1.4, 1, 0.25, 10],
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to and sometimes poison four random foes."
    },

    888: {
        name: "False Justice", type: 1, func: 44, calc: 0,
        args: [0.3, 1, 0, 0, 0, 0.1, 3],
        range: 3, prob: 70,
        desc: "Raise ATK + WIS of self and adjacent familiars by 30% and 10% of WIS respectively."
    },

    889: {
        name: "Twin Sickles", type: 2, func: 3, calc: 1,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },

    892: {
        name: "Eggsplosion", type: 2, func: 4, calc: 2,
        args: [1],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to four random foes, ignoring position."
    },

    893: {
        name: "Fiery Breath", type: 2, func: 4, calc: 2,
        args: [1.25, 8, 0.2, 2000],
        range: 8, prob: 30, ward: 3,
        desc: "Deal WIS-based damage to all foes and sometimes burn targets, ignoring position."
    },

    894: {
        name: "Singed Heart", type: 1, func: 45, calc: 0,
        args: [0.1, 2, 0, 0, 0, 0.1, 3],
        range: 7, prob: 70,
        desc: "Greatly lower DEF/WIS of up to three foes based on 10% of its WIS."
    },

    895: {
        name: "Earthen Wall", type: 5, func: 14, calc: 1,
        args: [1.4],
        range: 4, prob: 50, ward: 1, sac: 1,
        desc: "Take damage in place of any ally and counter."
    },

    896: {
        name: "Zephyr Blades", type: 2, func: 4, calc: 3,
        args: [2],
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive AGI-based damage to three random foes, ignoring position."
    },

    897: {
        name: "Tail Wind", type: 1, func: 1, calc: 0,
        args: [0.15, 8],
        range: 36, prob: 70,
        desc: "Raise the skill trigger rate of self and an ally on the right by 15%."
    },

    898: {
        name: "Egg Grenade", type: 2, func: 24, calc: 0,
        range: 21, prob: 30,
        randSkills: [893, 896, 900],
        desc: "No one knows which 1 of 3 random egg skills will be cast."
    },

    899: {
        name: "Grace of Spirit", type: 6, func: 27, calc: 0,
        args: [2, 1, 78, 79],
        range: 21, prob: 50,
        desc: "Evade enemy ATK-based attack skills."
    },

    900: {
        name: "Tidal Chill", type: 2, func: 4, calc: 2,
        args: [1.2, 3, 0.25],
        range: 20, prob: 30, ward: 3,
        desc: "Deal WIS-based damage and sometimes freeze five random foes, ignoring position."
    },

    901: {
        name: "Whirling Eddy", type: 1, func: 44, calc: 0,
        args: [1.8, 13, 0, 0, 0, 1.4, 14],
        range: 3, prob: 70,
        desc: "Raise WIS/AGI of self/adjacent familiars based on WIS/AGI respectively when its HP decreases."
    },

    902: {
        name: "Leaping Staff", type: 2, func: 3, calc: 2,
        args: [0.5],
        range: 20, prob: 30, ward: 1,
        desc: "Deal WIS-based damage to five random foes."
    },

    903: {
        name: "Thorn Tail", type: 2, func: 3, calc: 3,
        args: [0.5],
        range: 20, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to five random foes."
    },

    904: {
        name: "Lance Rush", type: 2, func: 3, calc: 1,
        args: [0.5],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes."
    },

    905: {
        name: "Perdition's Flame", type: 2, func: 4, calc: 2,
        args: [1.15, 8, 0.2, 3000],
        range: 41, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage to six random foes and sometimes burn targets. Attacks rear foes first."
    },

    906: {
        name: "Binding Water", type: 2, func: 4, calc: 2,
        args: [1.55, 3, 0.25],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage and sometimes freeze four random foes, ignoring position."
    },

    907: {
        name: "Despair", type: 2, func: 7, calc: 2,
        args: [2.05, 0.05],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive WIS-based damage to three random foes. Chance to kill targets."
    },

    908: {
        name: "Chivalrous Arrows", type: 2, func: 34, calc: 1,
        args: [1.35, 1, 0.2, 0.15],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes and sometimes lower ATK, ignoring position."
    },

    909: {
        name: "Arondight", type: 2, func: 4, calc: 1,
        args: [1.65, 5, 0.2, 1],
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage and sometimes silence four random foes, ignoring position."
    },

    910: {
        name: "Parting Blade", type: 1, func: 1, calc: 0,
        args: [0.4, 6, 7],
        range: 3, prob: 70,
        desc: "Reduce magic and breath damages taken by self and adjacent familiars."
    },

    911: {
        name: "Trident Fist", type: 2, func: 4, calc: 2,
        args: [1.6, 3, 0.25],
        range: 19, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy WIS-based damage and sometimes freeze four random foes, ignoring position."
    },

    912: {
        name: "Devouring Whirl", type: 2, func: 33, calc: 1,
        args: [1.85, 2, 1, 0.14],
        range: 43, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage and lower DEF of three random foes in the front line."
    },

    913: {
        name: "Fin Slap", type: 2, func: 3, calc: 3,
        args: [1.3, 3, 0.2],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage and sometimes freeze four random foes."
    },

    914: {
        name: "Claw of the Beast", type: 2, func: 4, calc: 3,
        args: [1.8, 7, 0.3, 1, 1],
        range: 16, prob: 30, ward: 2,
        desc: "Heavy AGI-based damage & sometimes blind three random foes for one turn, ignoring position."
    },

    915: {
        name: "Thorn of Beauty", type: 2, func: 34, calc: 3,
        args: [1.8, 3, 0.3, 0.14],
        range: 16, prob: 30, ward: 2,
        desc: "Heavy AGI-based damage and sometimes lower WIS of three random foes, ignoring position."
    },

    916: {
        name: "Crashing Waves", type: 2, func: 34, calc: 2,
        args: [1.3, 4, 0.2, 0.06],
        range: 8, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes lower AGI of all foes, ignoring position."
    },

    917: {
        name: "Veil of Brine", type: 3, func: 11, calc: 1,
        args: [1],
        range: 36, prob: 50,
        desc: "Heal self and an ally on the right for the amount of damage taken."
    },

    918: {
        name: "Arms of the Beast", type: 2, func: 3, calc: 3,
        args: [1.95, 2, 0.3],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage, sometimes paralyze three random foes."
    },

    919: {
        name: "Ferryman's Toll", type: 2, func: 34, calc: 2,
        args: [1.65, 1, 0.25, 0.07],
        range: 314, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based dmg  and sometimes reduce ATK up to four foes. Increased if fewer foes."
    },

    920: {
        name: "Oar Master", type: 2, func: 4, calc: 2,
        args: [2],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },

    921: {
        name: "Light of Negation", type: 2, func: 4, calc: 2,
        args: [1.2, 7, 0.15, 1, 0.9],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes blind five random foes, ignoring position."
    },

    922: {
        name: "Light of Guidance", type: 1, func: 44, calc: 0,
        args: [0.2, 3, 0, 0, 0, 0.08, 8],
        range: 3, prob: 70,
        desc: "Raise WIS of self/adjacent familiars based on 20% of her WIS, and skill trigger rates by 8%."
    },

    923: {
        name: "Gold Dust Storm", type: 2, func: 4, calc: 2,
        args: [2],
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to three random foes, ignoring position."
    },

    924: {
        name: "Gold Dust Gale", type: 1, func: 1, calc: 0,
        args: [1, 18],
        range: 21, prob: 70,
        desc: "Allows self to perform an extra action during the next turn."
    },

    925: {
        name: "Fleet of Hoof", type: 2, func: 4, calc: 2,
        args: [2],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },

    928: {
        name: "Fierce Dash", type: 2, func: 4, calc: 1,
        args: [1.4],
        range: 315, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage up to five foes, ignoring position. Increased if fewer foes."
    },

    931: {
        name: "Stone Guard", type: 1, func: 1, calc: 0,
        args: [0.2, 1, 2],
        range: 3, prob: 70, sac: 1,
        desc: "Raise ATK/DEF of self and adjacent familiars on 20% of its WIS respectively."
    },

    934: {
        name: "Reflecting Carapace", type: 5, func: 28, calc: 7,
        args: [0.3, 9, 23, 2, 0.4],
        range: 21, prob: 50, sac: 1,
        desc: "Reflect 60% of ATK/AGI-based damage back to up to two foes."
    },

    935: {
        name: "Blizzard Breath", type: 2, func: 4, calc: 2,
        args: [1.1],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },

    936: {
        name: "Ice Cuirass", type: 1, func: 44, calc: 2,
        args: [0.15, 3, 0, 0, 0, 0.05, 4],
        range: 3, prob: 70,
        desc: "Raise WIS/AGI of self and adjacent familiars on 15% and 5% of its WIS respectively."
    },

    937: {
        name: "Life Siphon Claws", type: 2, func: 37, calc: 3,
        args: [1.75, 0.2, 27, 21],
        range: 19, prob: 30, ward: 2,
        desc: "Drains HP from four random foes while dealing heavy AGI-based damage, ignoring position."
    },

    938: {
        name: "Sensual Wing", type: 1, func: 44, calc: 0,
        args: [0.5, 17, 1.25, 0, 0, 0.3, 6],
        range: 3, prob: 70,
        desc: "Raise HP and reduce magic damage taken by self and adjacent familiars."
    },

    939: {
        name: "Axe of Judgment", type: 2, func: 3, calc: 1,
        args: [1.45],
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to four random foes."
    },

    940: {
        name: "Verdict", type: 5, func: 56, calc: 1,
        args: [1.55, 1, 1, 0.2],
        range: 4, prob: 50, ward: 1,
        desc: "Take heavy damage in place of any ally and counter, greatly lower ATK."
    },

    941: {
        name: "Infernal Strike", type: 2, func: 4, calc: 2,
        args: [1.9],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to two random foes, ignoring position."
    },

    942: {
        name: "Soul Slasher", type: 2, func: 4, calc: 2,
        args: [2.2, 8, 0.3, 2000],
        range: 16, prob: 30, ward: 2,
        desc: "Massive WIS-based damage and sometimes burn three random foes, ignoring position."
    },

    943: {
        name: "Infernal Rampart", type: 1, func: 44, calc: 0,
        args: [0.1, 2, 0, 0, 0, 0.1, 3],
        range: 3, prob: 70,
        desc: "Raise DEF/WIS of self and adjacent familiars based on 10% of his WIS respectively."
    },

    944: {
        name: "Fellfeather Dart", type: 2, func: 34, calc: 2,
        args: [1.5, 2, 0.25, 0.08],
        range: 315, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based DMG and sometimes lower DEF of up to five foes. Increased if fewer foes."
    },

    945: {
        name: "Raging Bull", type: 2, func: 4, calc: 1,
        args: [1.65],
        range: 314, prob: 30, ward: 1,
        desc: "Heavy ATK-based DMG to up to four foes. Increased if fewer foes, ignoring position."
    },

    946: {
        name: "Lasso", type: 1, func: 2, calc: 0,
        args: [0.05, 8],
        range: 7, prob: 70,
        desc: "Lower the skill trigger rate of up to three foes by 5%."
    },

    947: {
        name: "Spear & Fang", type: 2, func: 4, calc: 3,
        args: [1.3],
        range: 20, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to five random foes, ignoring position."
    },

    948: {
        name: "Winds of the Wood", type: 1, func: 32, calc: 0,
        args: [0.3, 4],
        range: 7, prob: 70,
        desc: "Greatly lower AGI of up to three foes."
    },

    949: {
        name: "Devour", type: 2, func: 4, calc: 1,
        args: [1.45],
        range: 315, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to up to five foes. Increased if fewer foes, ignoring position."
    },

    950: {
        name: "Greedy Flame", type: 2, func: 34, calc: 3,
        args: [1.7, 2, 0.25, 0.2],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy AGI-based damage and sometimes lower DEF of all foes, ignoring position."
    },

    951: {
        name: "Valiant Spear", type: 2, func: 33, calc: 3,
        args: [1, 4, 0.2, 0.15],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to six random foes and sometimes lower AGI."
    },

    952: {
        name: "Virtuoso Volley", type: 2, func: 4, calc: 3,
        args: [1.6],
        range: 314, prob: 30, ward: 2, sac: 1,
        desc: "Heavy AGI-based damage to up to four foes, ignoring position. Increased if fewer foes."
    },

    953: {
        name: "Grace of the Ring", type: 1, func: 44, calc: 0,
        args: [0.2, 17, 0.4, 0, 0, 0.2, 2],
        range: 3, prob: 70, sac: 1,
        desc: "Raise HP/DEF of self and adjacent familiars based on 20% of his WIS respectively."
    },

    954: {
        name: "Brutal Sanction", type: 2, func: 3, calc: 1,
        args: [1.35, 5, 0.25, 1],
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage and sometimes silence four random foes."
    },

    955: {
        name: "Light of Justice", type: 16, func: 6, calc: 0,
        args: [1],
        range: 121, prob: 50,
        desc: "Revive and fully restore HP of one random ally upon her death."
    },

    957: {
        name: "Sea Breeze Blade", type: 2, func: 33, calc: 1,
        args: [1.1, 3, 0.2, 0.22],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "ATK-based damage to five random foes and sometimes greatly lower WIS."
    },

    958: {
        name: "Blazing Hieroglyph", type: 2, func: 4, calc: 2,
        args: [1.6, 8, 0.2, 2000],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based damage and sometimes burn four random foes, ignoring position."
    },

    959: {
        name: "Scuttle", type: 2, func: 34, calc: 3,
        args: [1.35, 4, 0.15, 0.11],
        range: 208, prob: 30, ward: 2, sac: 1,
        desc: "AGI-based DMG, sometimes lower AGI of all foes, ignoring position. Increased if fewer foes."
    },

    960: {
        name: "Wrath of Kilauea", type: 2, func: 34, calc: 1,
        args: [1.15, 3, 0.2, 0.19],
        range: 17, prob: 30, ward: 1,
        desc: "ATK-based damage, sometimes lower WIS of six random foes, ignoring position."
    },

    961: {
        name: "Grace of Kilauea", type: 1, func: 2, calc: 0,
        args: [0.1, 8],
        range: 7, prob: 70,
        desc: "Lower the skill trigger rate of up to three foes by 10%."
    },

    962: {
        name: "Fist of Stone", type: 2, func: 7, calc: 1,
        args: [1.6, 0.05],
        range: 19, prob: 30, ward: 1,
        desc: "Heavy ATK-based damage to four random foes. Chance to kill targets."
    },

    963: {
        name: "Embrace of Stone", type: 1, func: 44, calc: 0,
        args: [0.23, 1, 0, 0, 0, 0.4, 5],
        range: 3, prob: 70,
        desc: "Raise ATK and reduce physical damage taken by self and adjacent familiars."
    },

    964: {
        name: "Drill Bits", type: 2, func: 34, calc: 1,
        args: [1.6, 3, 0.25, 0.24],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Heavy ATK-based dmg and sometimes reduce WIS of 4 random foes, ignoring position."
    },

    966: {
        name: "Diamond Flurry", type: 2, func: 3, calc: 1,
        args: [1.35],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to up to three foes."
    },

    967: {
        name: "Amethyst Flame", type: 2, func: 4, calc: 3,
        args: [1.65],
        range: 19, prob: 30, ward: 3,
        desc: "Deal heavy AGI-based damage to four random foes, ignoring position."
    },

    968: {
        name: "Amethyst Light", type: 1, func: 44, calc: 0,
        args: [0.2, 1, 0, 0, 0, 0.12, 4],
        range: 3, prob: 70,
        desc: "Raise ATK/AGI of self and adjacent familiars by 20% and 12% of its WIS respectively."
    },

    969: {
        name: "Thralls of the Gem", type: 2, func: 3, calc: 3,
        args: [1],
        range: 20, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to five random foes."
    },

    970: {
        name: "Gifts of the Gem", type: 1, func: 1, calc: 0,
        args: [0.13, 4],
        range: 3, prob: 70,
        desc: "Raise AGI of self and adjacent familiars by 13% of its WIS."
    },

    971: {
        name: "Meteor Slash", type: 2, func: 3, calc: 3,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive AGI-based damage to two random foes."
    },

    972: {
        name: "Cursed Glimmer", type: 2, func: 4, calc: 3,
        args: [1.55, 7, 0.2, 1, 0.9],
        range: 208, prob: 30, ward: 2,
        desc: "Heavy AGI-based damage to all foes and may blind target. Increased if fewer foes."
    },

    973: {
        name: "Diamond Sparkle", type: 1, func: 44, calc: 1,
        args: [0.25, 17, 0, 0, 0, 0.3, 6],
        range: 3, prob: 70,
        desc: "Raise HP by 25% of its ATK, reduce magic dmg taken by self and adjacent allies by 30%."
    },

    974: {
        name: "Habakiri", type: 2, func: 4, calc: 1,
        args: [1.3],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes, ignoring position."
    },

    975: {
        name: "Brave Cry", type: 3, func: 39, calc: 6,
        args: [1, 4, 0, 10, 3],
        range: 3, prob: 50,
        desc: "Chance to increase AGI of self and adjacent familiars when being attacked."
    },

    976: {
        name: "Healing Dance", type: 2, func: 18, calc: 4,
        args: [2],
        range: 122, prob: 30, sac: 1,
        desc: "Restore a large amount of HP to two party members."
    },

    977: {
        name: "Water Whip", type: 2, func: 4, calc: 2,
        args: [1.6, 3, 0.2],
        range: 314, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage and sometimes freeze up to four foes. Increased if fewer foes."
    },

    978: {
        name: "Restrict Gaze", type: 1, func: 19, calc: 0,
        args: [0, 3, 0.3],
        range: 7, prob: 70,
        desc: "Chance to freeze up to three foes at start of battle."
    },

    979: {
        name: "Restrict Water", type: 2, func: 4, calc: 2,
        args: [1],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to five random foes, ignoring position."
    },

    980: {
        name: "Posture of Earth", type: 2, func: 36, calc: 1,
        args: [2.45, 0.4, 27, 21],
        range: 23, prob: 30, ward: 1,
        desc: "Drains HP from two random foes while dealing massive ATK-based damage."
    },

    981: {
        name: "Power of Earth", type: 1, func: 44, calc: 0,
        args: [0.5, 17, 0, 0, 0, 0.9, 2],
        range: 21, prob: 70,
        desc: "Raise HP/DEF of self based on 50% and 90% of his WIS respectively."
    },

    982: {
        name: "Oryza Blade", type: 2, func: 34, calc: 2,
        args: [1.4, 1, 0.2, 0.1],
        range: 40, prob: 30, ward: 2,
        desc: "WIS-based DMG to five random foes, sometimes lower ATK. Attacks rear foes first."
    },

    983: {
        name: "Pray of Fertility", type: 2, func: 18, calc: 4,
        args: [2],
        range: 4, prob: 30,
        desc: "Restore HP to all party members."
    },

    984: {
        name: "Scare", type: 1, func: 2, calc: 0,
        args: [0.3, 8],
        range: 8, prob: 100,
        desc: "Lower the skill trigger rate of all foes by 30%."
    },

    985: {
        name: "Mountains to Dust", type: 2, func: 4, calc: 1,
        args: [1.25, 5, 0.2, 1],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage and sometimes silence five random foes, ignoring position."
    },

    986: {
        name: "Arrows of Wrath", type: 2, func: 4, calc: 1,
        args: [1.35, 7, 0.2, 1, 1],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes and sometimes blind them, ignoring position."
    },

    987: {
        name: "Skull Break", type: 2, func: 33, calc: 1,
        args: [2.45, 1, 0.3, 0.3],
        range: 6, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to up to two foes and sometimes greatly lower ATK."
    },

    988: {
        name: "Cut Unseen", type: 2, func: 4, calc: 1,
        args: [2.1],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to up to three foes, ignoring position."
    },

    989: {
        name: "Brush With Death", type: 2, func: 4, calc: 3,
        args: [1.55],
        range: 20, prob: 30, ward: 2,
        desc: "Deal heavy AGI-based damage to five random foes, ignoring position."
    },

    990: {
        name: "Fear of Death", type: 1, func: 46, calc: 0,
        args: [0.12, 4, 0, 0, 0, 7, 0.35, 1, 0.9],
        range: 7, prob: 70,
        desc: "Lower AGI of up to three foes and sometimes blind target."
    },

    991: {
        name: "Breath of Decay", type: 2, func: 4, calc: 2,
        args: [1.25, 1, 0.2, 10],
        range: 8, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage and sometimes poison all foes, ignoring position."
    },

    992: {
        name: "Thunderous Slash", type: 2, func: 40, calc: 0,
        range: 4, prob: 70, sac: 1,
        desc: "Remove the debuffs of self and all allies."
    },

    993: {
        name: "Burning Fangs", type: 2, func: 4, calc: 2,
        args: [2.1, 8, 0.3, 2000],
        range: 16, prob: 30, ward: 3, sac: 1,
        desc: "Deal massive WIS-based DMG, sometimes burn three random foes, ignoring position."
    },

    994: {
        name: "Scorched Earth", type: 2, func: 4, calc: 2,
        args: [1.6, 8, 0.25, 2500],
        range: 314, prob: 30, ward: 3,
        desc: "Heavy WIS-based DMG, may burn up to four foes, ignoring position. Increased if fewer foes."
    },

    995: {
        name: "Swoop", type: 1, func: 1, calc: 0,
        args: [1, 18],
        range: 3, prob: 70,
        desc: "Allow self and adjacent familiars to perform an extra action during the next turn."
    },

    996: {
        name: "Spear & Tail", type: 2, func: 4, calc: 2,
        args: [1.4, 2, 0.2],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes paralyze five random foes, ignoring position."
    },

    997: {
        name: "Dragon's Might", type: 1, func: 44, calc: 2,
        args: [0.08, 4, 0, 0, 0, 2, 13],
        range: 3, prob: 70,
        desc: "Buff self and adjacent familiars. Raise AGI at start of battle, WIS increase as HP decrease."
    },

    998: {
        name: "Plunder", type: 5, func: 56, calc: 1,
        args: [1.7, 1, 1, 0.07],
        range: 4, prob: 50, ward: 1, sac: 1,
        desc: "Take damage in place of any ally and unleash a heavy counter attack, lowering ATK of target."
    },

    999: {
        name: "Nefarious Neigh", type: 2, func: 34, calc: 3,
        args: [1.6, 4, 0.25, 0.09],
        range: 314, prob: 30, ward: 2, sac: 1,
        desc: "Heavy AGI-based DMG and sometimes reduce AGI of up to 4 foes. Increased if fewer foes."
    },

    1000: {
        name: "Trample", type: 2, func: 4, calc: 2,
        args: [2.15],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },

    1001: {
        name: "Rain of Feathers", type: 2, func: 4, calc: 2,
        args: [1, 5, 0.2, 1],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes silence six random foes, ignoring position."
    },

    1002: {
        name: "Veil of Feathers", type: 1, func: 44, calc: 0,
        args: [0.15, 1, 0, 0, 0, 0.15, 3],
        range: 3, prob: 70,
        desc: "Raise ATK and WIS of self and adjacent familiars by 15% of its WIS."
    },

    1003: {
        name: "Storm of Arrows", type: 2, func: 4, calc: 1,
        args: [1.75],
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to four random foes, ignoring position."
    },

    1004: {
        name: "Gift of the Goddess", type: 1, func: 44, calc: 0,
        args: [0.25, 1, 0, 0, 0, 0.25, 2],
        range: 3, prob: 70,
        desc: "Raise ATK and DEF of self and adjacent familiars by 25% of its WIS."
    },

    1005: {
        name: "Nemesis of Fate", type: 2, func: 4, calc: 2,
        args: [2],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },

    1006: {
        name: "Hail Belch", type: 2, func: 4, calc: 2,
        args: [1.25, 3, 0.25],
        range: 20, prob: 30, ward: 3,
        desc: "Deal WIS-based damage and sometimes freeze five random foes, ignoring position."
    },

    1007: {
        name: "Icemelt Rhapsody", type: 1, func: 44, calc: 0,
        args: [0.27, 3, 0, 0, 0, 1008, 16],
        range: 36, prob: 70,
        desc: "Raise WIS by 27%/Revive with full HP after being killed, self and an ally on the right."
    },

    1008: {
        name: "Glacial Renascence", type: 16, func: 6, calc: 0,
        args: [1],
        range: 21, prob: 100,
        desc: "-"
    },

    1011: {
        name: "Just Deserts", type: 2, func: 3, calc: 1,
        args: [1.05],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes."
    },

    1014: {
        name: "Indignation", type: 1, func: 44, calc: 0,
        args: [0.2, 1, 0, 0, 0, 0.7, 3],
        range: 21, prob: 70, sac: 1,
        desc: "Raise ATK and WIS of self by 20% and 70% of its WIS respectively."
    },

    1017: {
        name: "Mark of Virtue", type: 5, func: 14, calc: 1,
        args: [1.4],
        range: 4, prob: 50, ward: 1, sac: 1,
        desc: "Take damage in place of any ally and unleash a counter attack."
    },

    1018: {
        name: "Chain Snip", type: 2, func: 7, calc: 1,
        args: [1.35, 0.08],
        range: 19, prob: 30, ward: 1,
        desc: "ATK-based damage to four random foes. Chance to kill targets."
    },

    1019: {
        name: "Bubble of Oil", type: 1, func: 1, calc: 1,
        args: [0.3, 17, 1.25],
        range: 3, prob: 70,
        desc: "Raise HP of self and adjacent familiars, based on 30% of her ATK."
    },

    1020: {
        name: "Bloodsucking Axe", type: 3, func: 39, calc: 6,
        args: [1, 1, 2, 20, 3],
        range: 21, prob: 50, sac: 1,
        desc: "Chance to increase ATK and DEF of self when being attacked."
    },

    1021: {
        name: "Sticking Tentacles", type: 2, func: 34, calc: 1,
        args: [2.1, 2, 0.3, 0.2],
        range: 16, prob: 30, ward: 1,
        desc: "Massive ATK-based DMG, sometimes reduce DEF of three random foes, ignoring position."
    },

    1022: {
        name: "Replace", type: 5, func: 28, calc: 7,
        args: [0.45, 2, 23, 2, 0.1],
        range: 21, prob: 50,
        desc: "Reflect 90% of WIS-based damage back to two random foes."
    },

    1023: {
        name: "Dissecting Claw", type: 2, func: 4, calc: 1,
        args: [1.55],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes, ignoring position."
    },

    1024: {
        name: "Icy Crystal", type: 2, func: 4, calc: 2,
        args: [1.2, 2, 0.25],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes paralyze six random foes, ignoring position."
    },

    1025: {
        name: "Glittering Crystal", type: 1, func: 44, calc: 0,
        args: [0.15, 3, 0, 0, 0, 0.3, 6],
        range: 3, prob: 70,
        desc: "Raise WIS and reduce magical damage taken by self and adjacent familiars."
    },

    1026: {
        name: "Spear of Justice", type: 2, func: 4, calc: 1,
        args: [1.05, 6, 0.1, 2, 0.6],
        range: 315, prob: 30, ward: 1,
        desc: "ATK-based DMG to and sometimes confuse up to five foes. Increased if fewer foes."
    },

    1027: {
        name: "Prayer of War", type: 1, func: 51, calc: 0,
        args: [0, 14, 2000, 6, 0.35, 1, 121, 120, 43],
        range: 7, prob: 70,
        desc: "Absorbs ATK/DEF/WIS/AGI from up to three foes at the beginning of battles."
    },

    1028: {
        name: "Chaotic World", type: 1, func: 19, calc: 0,
        args: [0, 6, 1, 2, 1],
        range: 5, prob: 100,
        desc: "Confuse one foe at start of battle."
    },

    1029: {
        name: "Wind of Lust", type: 2, func: 4, calc: 2,
        args: [2.1],
        range: 20, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to five random foes, ignoring position."
    },

    1030: {
        name: "Blade Ward 3", type: 1, func: 1, calc: 0,
        args: [1, 5],
        range: 4, prob: 100,
        desc: "Reduce physical damage taken by all allies."
    },

    1031: {
        name: "Overwhelm", type: 2, func: 33, calc: 3,
        args: [1.2, 1, 0.2, 0.18],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to six random foes and sometimes lower ATK."
    },

    1032: {
        name: "Galloping Slash", type: 2, func: 33, calc: 1,
        args: [1.6, 4, 0.3, 0.18],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to up to three foes and sometimes lower AGI."
    },

    1033: {
        name: "Cyclone Strike", type: 2, func: 4, calc: 1,
        args: [1.3],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes, ignoring position."
    },

    1034: {
        name: "Thunder Whorl", type: 2, func: 33, calc: 3,
        args: [0.9, 1, 0.2, 0.28],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to six random foes and sometimes lower ATK."
    },

    1035: {
        name: "Twining Net", type: 2, func: 53, calc: 2,
        args: [2.4, 4, 0.09, 2, 0.5, 0.5, 121, 120],
        range: 23, prob: 30, ward: 2,
        desc: "Massive WIS-based damage and absorbs AGI from two random foes, ignoring position."
    },

    1036: {
        name: "Leaching Wave", type: 2, func: 53, calc: 3,
        args: [3.2, 3, 0.12, 2, 0.5, 0.5, 121, 120],
        range: 23, prob: 30, ward: 2,
        desc: "Massive AGI-based damage and absorbs WIS from two random foes, ignoring position."
    },

    1037: {
        name: "Medicinal Wine", type: 2, func: 18, calc: 4,
        args: [1, 1],
        range: 123, prob: 30,
        desc: "Full restore HP of three party members."
    },

    1038: {
        name: "Bacchanal", type: 3, func: 11, calc: 1,
        args: [1],
        range: 3, prob: 50,
        desc: "Heal self and adjacent familiars for the amount of damage taken."
    },

    1039: {
        name: "Diamond Flame", type: 2, func: 4, calc: 2,
        args: [1.4, 8, 0.2, 2000],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to all foes and sometimes burn targets, ignoring position."
    },

    1040: {
        name: "Poison Claws", type: 2, func: 3, calc: 1,
        args: [0.9, 1, 0.1, 20],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage and sometimes poison six random foes."
    },

    1041: {
        name: "Winds of Victory", type: 2, func: 37, calc: 3,
        args: [1.8, 0.18, 27, 21],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy AGI-based damage and drain HP from four random foes, ignoring position."
    },

    1043: {
        name: "Meteor Arrow", type: 2, func: 4, calc: 3,
        args: [1.45, 8, 0.25, 3000],
        range: 315, prob: 30, ward: 2,
        desc: "AGI-based DMG, may burn up to five foes. Increased if fewer foes, ignoring position."
    },

    1044: {
        name: "Belligerence", type: 1, func: 46, calc: 0,
        args: [0.23, 4, 0, 0, 0, 8, 0.35, 4000],
        range: 7, prob: 70,
        desc: "Greatly lower AGI of up to three foes and sometimes burn targets."
    },

    1045: {
        name: "Icy Current", type: 2, func: 4, calc: 2,
        args: [1.6, 3, 0.25],
        range: 314, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage and sometimes freeze up to four foes. Increased if fewer foes."
    },

    1046: {
        name: "Binding Ice", type: 1, func: 19, calc: 0,
        args: [0, 3, 0.2],
        range: 7, prob: 70,
        desc: "Chance to freeze up to three foes at start of battle."
    },

    1047: {
        name: "Poison Wave", type: 2, func: 3, calc: 1,
        args: [1.9, 3, 0.35],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes and sometimes freeze them."
    },

    1048: {
        name: "Slicing Wave", type: 2, func: 3, calc: 1,
        args: [1],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to four random foes."
    },

    1049: {
        name: "Ferocious Fang", type: 2, func: 4, calc: 1,
        args: [1.4, 3, 0.15],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage and sometimes freeze five random foes, ignoring position."
    },

    1050: {
        name: "Conchsong", type: 1, func: 44, calc: 0,
        args: [0.48, 1, 0, 0, 0, 1.45, 23],
        range: 3, prob: 70,
        desc: "Raise ATK and DEF & WIS of self/adjacent allies go up when their HP go down."
    },

    1051: {
        name: "Encircling Water", type: 2, func: 4, calc: 2,
        args: [1.1],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },

    1052: {
        name: "Might of Song", type: 1, func: 44, calc: 2,
        args: [0.12, 3, 0, 0, 0, 0.06, 4],
        range: 3, prob: 70,
        desc: "Raise WIS and AGI of self and adjacent familiars on 12% and 6% of its WIS respectively."
    },

    1053: {
        name: "Wave Cutter", type: 2, func: 3, calc: 1,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },

    1054: {
        name: "Crimson Flash", type: 2, func: 52, calc: 1,
        args: [0.95, 1, 2500, 6, 0.5, 0.25, 121, 120],
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage and sometimes absorbs ATK from six random foes."
    },

    1055: {
        name: "Flowing Stance", type: 3, func: 42, calc: 1,
        args: [1.45, 4, 1, 0.11],
        range: 21, prob: 50, ward: 1,
        desc: "Chance to unleash a heavy counter attack when struck, lowering AGI of target."
    },

    1056: {
        name: "Bring it on!", type: 3, func: 39, calc: 6,
        args: [1, 1, 0, 100, 10],
        range: 8, prob: 30,
        desc: ".."
    },

    1057: {
        name: "Bring it on!", type: 3, func: 39, calc: 6,
        args: [1, 1, 0, 150, 10],
        range: 8, prob: 30,
        desc: ".."
    },

    1058: {
        name: "Glittering Eye", type: 1, func: 44, calc: 0,
        args: [0.2, 17, 0, 0, 0, 0.2, 2],
        range: 3, prob: 70,
        desc: "Raise HP/DEF of self and adjacent familiars on 20% of its WIS respectively."
    },

    1059: {
        name: "Pouncing Cat", type: 3, func: 41, calc: 2,
        args: [1.6],
        range: 21, prob: 50, ward: 2,
        desc: "Chance to unleash heavy WIS-based counter attack when struck, ignoring position."
    },

    1060: {
        name: "Poison Wing", type: 2, func: 4, calc: 2,
        args: [1.4, 1, 0.1, 10],
        range: 8, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage and sometimes poison all foes, ignoring position."
    },

    1061: {
        name: "Aculeate Tail", type: 2, func: 7, calc: 1,
        args: [1.6, 0.05],
        range: 7, prob: 30, ward: 1,
        desc: "Heavy ATK-based damage and chance to kill up to three targets."
    },

    1062: {
        name: "Punishing Tail", type: 16, func: 19, calc: 0,
        args: [0, 2, 0.7],
        range: 7, prob: 70,
        desc: "High chance to paralyze up to three foes for one turn upon his death."
    },

    1063: {
        name: "Double Bite", type: 2, func: 3, calc: 1,
        args: [1.85],
        range: 6, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to up to two foes."
    },

    1064: {
        name: "Sand Slash", type: 2, func: 3, calc: 3,
        args: [1.75, 7, 0.35, 1, 1],
        range: 16, prob: 30, ward: 1,
        desc: "Heavy AGI-based damage to three random foes, sometimes blind them for one turn."
    },

    1065: {
        name: "Stalwart Hooves", type: 3, func: 38, calc: 6,
        args: [0, 1, 4, 10, 5],
        range: 7, prob: 50,
        desc: "Greatly lower ATK and AGI of up to three foes when being attacked."
    },

    1066: {
        name: "Soaring Talon", type: 2, func: 37, calc: 3,
        args: [1.85, 0.2, 27, 21],
        range: 19, prob: 30, ward: 2,
        desc: "Heavy AGI-based damage and drain HP from four random foes, ignoring position."
    },

    1067: {
        name: "Gift of the Sky", type: 1, func: 44, calc: 0,
        args: [2.5, 12, 0, 0, 0, 1.5, 14],
        range: 3, prob: 70,
        desc: "Raise DEF/AGI of self and adjacent allies go up when their HP go down"
    },

    1068: {
        name: "Mercy for the Fallen2", type: 1, func: 30, calc: 0,
        args: [0, 1],
        range: 7, prob: 100,
        desc: "ATK and WIS of up to three foes swap values with each other."
    },

    1069: {
        name: "Scare2", type: 1, func: 2, calc: 0,
        args: [0.3, 8],
        range: 8, prob: 100,
        desc: "Lower the skill trigger rate of all foes by 30%."
    },

    1070: {
        name: "Blade of Defiance", type: 5, func: 28, calc: 7,
        args: [0.3, 9, 23, 2, 0.4],
        range: 21, prob: 50, sac: 1,
        desc: "Reflect 60% of ATK/AGI-based damage back to two random foes."
    },

    1071: {
        name: "Arena Gale", type: 2, func: 52, calc: 3,
        args: [0.7, 4, 500, 6, 1, 1, 121, 120],
        range: 17, prob: 50, ward: 1, sac: 1,
        desc: "Deal AGI-based damage and absorb AGI from six random foes."
    },

    1073: {
        name: "Seaborn Fog", type: 1, func: 44, calc: 0,
        args: [0.42, 2, 0, 0, 0, 0.25, 5],
        range: 3, prob: 70, sac: 1,
        desc: "Raise DEF and reduce physical damage taken by self and adjacent familiars."
    },

    1074: {
        name: "Blade of Coercion", type: 2, func: 4, calc: 1,
        args: [1.35, 8, 0.25, 3000],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage and sometimes burn five random foes, ignoring position."
    },

    1075: {
        name: "Ward of Wealth", type: 1, func: 44, calc: 0,
        args: [0.35, 1, 0, 0, 0, 1076, 16],
        range: 3, prob: 70,
        desc: "Raise ATK by 35%/Revive with full HP after being killed, self and adjacent familiars."
    },

    1076: {
        name: "Dawn's Light", type: 16, func: 6, calc: 0,
        args: [1],
        range: 21, prob: 100,
        desc: "-"
    },

    1077: {
        name: "Ancient Flame", type: 2, func: 4, calc: 1,
        args: [1.65],
        range: 314, prob: 30, ward: 1,
        desc: "Heavy ATK-based damage to up to four foes, ignoring position. Increased if fewer foes."
    },

    1078: {
        name: "Basalt Skin", type: 1, func: 44, calc: 0,
        args: [0.36, 2, 0, 0, 0, 0.3, 6],
        range: 21, prob: 70,
        desc: "Raise DEF and reduce magic damage taken by self."
    },

    1079: {
        name: "Ancient Blizzard", type: 2, func: 4, calc: 2,
        args: [1.3, 3, 0.2],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "WIS-based damage to all foes and sometimes freeze targets, ignoring position."
    },

    1080: {
        name: "Ancient Thunder", type: 2, func: 4, calc: 2,
        args: [1.05, 2, 0.2],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "WIS-based damage to five random foes and sometimes paralyze targets, ignoring position."
    },

    1081: {
        name: "Angry Hummingbird", type: 2, func: 34, calc: 1,
        args: [1.2, 4, 1, 0.03],
        range: 17, prob: 30, ward: 1,
        desc: "ATK-based damage to six random foes and lower AGI of targets."
    },

    1082: {
        name: "Heartblood Sacrifice", type: 1, func: 51, calc: 0,
        args: [0, 7, 2000, 6, 0.4, 1, 121, 120, 43],
        range: 7, prob: 70,
        desc: "Absorbs ATK and AGI from up to three foes at the beginning of battles."
    },

    1083: {
        name: "Wrath of the Wood", type: 2, func: 34, calc: 1,
        args: [1.45, 1, 0.25, 0.19],
        range: 315, prob: 30, ward: 1,
        desc: "ATK-based DMG, may lower ATK up to five foes, ignoring position. Increased if fewer foes."
    },

    1084: {
        name: "Rage of the Bear", type: 1, func: 44, calc: 0,
        args: [0.45, 17, 0, 0, 0, 0.45, 2],
        range: 3, prob: 70,
        desc: "Raise HP/DEF of self and adjacent familiars on 45% of its WIS respectively."
    },

    1085: {
        name: "Flurry of Blades", type: 2, func: 4, calc: 2,
        args: [2.1],
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to three random foes, ignoring position."
    },

    1086: {
        name: "Broken Blade Bane", type: 16, func: 32, calc: 0,
        args: [0.2, 1],
        range: 7, prob: 70,
        desc: "Greatly lower ATK of up to three foes upon her death."
    },

    1087: {
        name: "Endless Rush", type: 2, func: 33, calc: 1,
        args: [1.25, 2, 0.25, 0.25],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes and sometimes lower DEF."
    },

    1088: {
        name: "Dain's Legacy", type: 2, func: 3, calc: 1,
        args: [1.35],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to three random foes."
    },

    1089: {
        name: "Flash of Steel", type: 2, func: 4, calc: 2,
        args: [1.5],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },

    1090: {
        name: "Grace of Light", type: 1, func: 44, calc: 0,
        args: [0.25, 3, 0, 0, 0, 1.25, 14],
        range: 3, prob: 70,
        desc: "Raise WIS and AGI of self/adjacent allies go up when their HP go down."
    },

    1091: {
        name: "Armageddon", type: 2, func: 4, calc: 1,
        args: [1.5],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes, ignoring position."
    },

    1092: {
        name: "Aura of Madness", type: 1, func: 44, calc: 0,
        args: [0.35, 1, 0, 0, 0, 0.2, 4],
        range: 3, prob: 70,
        desc: "Raise ATK and AGI of self and adjacent familiars by 35% and by 20% of its WIS."
    },

    1093: {
        name: "Azoth", type: 2, func: 4, calc: 2,
        args: [2],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },

    1094: {
        name: "Leaping Flames", type: 2, func: 4, calc: 2,
        args: [1.3, 8, 0.25, 2500],
        range: 315, prob: 30, ward: 2,
        desc: "Deal WIS-based DMG, may burn up to five foes, ignoring position. Increased if fewer foes."
    },

    1095: {
        name: "Bewitching Dance", type: 3, func: 38, calc: 6,
        args: [1, 3, 4, 25, 5],
        range: 7, prob: 50,
        desc: "Greatly lower WIS and AGI of up to three foes when being attacked."
    },

    1098: {
        name: "Crescent Flame", type: 2, func: 4, calc: 2,
        args: [1],
        range: 17, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },

    1101: {
        name: "Waxing Winds", type: 1, func: 1, calc: 0,
        args: [0.3, 6, 7],
        range: 3, prob: 70, sac: 1,
        desc: "Reduce magic and breath damages taken by self and adjacent familiars by 30%."
    },

    1104: {
        name: "Gibbous Gleam", type: 1, func: 44, calc: 0,
        args: [0.1, 2, 0, 0, 0, 0.2, 3],
        range: 3, prob: 70, sac: 1,
        desc: "Raise DEF/WIS of self/adjacent familiars on by 10% and 20% of its WIS respectively."
    },

    1107: {
        name: "Freezing Rain", type: 2, func: 4, calc: 2,
        args: [1.55, 3, 0.2],
        range: 314, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage and sometimes freeze up to four foes. Increased if fewer foes."
    },

    1108: {
        name: "Healing Rain", type: 2, func: 18, calc: 4,
        args: [1.2],
        range: 122, prob: 30,
        desc: "Restore a large amount of HP to two party members."
    },

    1109: {
        name: "Ruyi Hook", type: 2, func: 33, calc: 1,
        args: [2.55, 2, 0.45, 0.2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes and sometimes lower DEF."
    },

    1110: {
        name: "World Breaker", type: 2, func: 52, calc: 3,
        args: [1.7, 4, 800, 6, 0.5, 1, 121, 120],
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage and absorb AGI from three random foes."
    },

    1111: {
        name: "Calamity Ward", type: 1, func: 44, calc: 0,
        args: [0.37, 2, 0, 0, 0, 0.4, 5],
        range: 3, prob: 70,
        desc: "Raise DEF and reduce physical damage taken by self and adjacent familiars."
    },

    1112: {
        name: "Flying Claws", type: 2, func: 3, calc: 3,
        args: [1.7],
        range: 6, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to up to two foes."
    },

    1113: {
        name: "Toad Venom", type: 2, func: 4, calc: 2,
        args: [1.95, 2, 0.4],
        range: 313, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage, sometimes paralyze up to three foes. Increased if fewer foes."
    },

    1114: {
        name: "Toad Remedy", type: 1, func: 44, calc: 0,
        args: [0.2, 17, 0, 0, 0, 1115, 16],
        range: 3, prob: 70,
        desc: "Raise HP/Revive with 50% HP after being killed, self and adjacent familiars."
    },

    1115: {
        name: "Toad", type: 16, func: 6, calc: 0,
        args: [0.5],
        range: 21, prob: 100,
        desc: "-"
    },

    1116: {
        name: "Sword of Discord", type: 2, func: 33, calc: 1,
        args: [1.65, 4, 0.4, 0.15],
        range: 16, prob: 30, ward: 1,
        desc: "Heavy ATK-based damage to three random foes, sometimes greatly lower AGI."
    },

    1117: {
        name: "Faithless Fangs", type: 2, func: 33, calc: 3,
        args: [1.8, 1, 1, 0.15],
        range: 16, prob: 30, ward: 1,
        desc: "Heavy AGI-based damage to three random foes, sometimes greatly lower ATK."
    },

    1118: {
        name: "Galatine", type: 2, func: 33, calc: 1,
        args: [1.5, 2, 0.3, 0.18],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to four random foes and sometimes lower DEF."
    },

    1119: {
        name: "Virescent Fog", type: 1, func: 1, calc: 0,
        args: [1, 5],
        range: 21, prob: 70,
        desc: "Reduce totally physical damage taken by self."
    },

    1120: {
        name: "Headsman's Game", type: 2, func: 3, calc: 1,
        args: [1.2],
        range: 6, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to up to two foes."
    },

    1121: {
        name: "Whirling Chain", type: 2, func: 3, calc: 1,
        args: [1.8],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to up to three foes."
    },

    1122: {
        name: "Masked Phantom", type: 2, func: 4, calc: 2,
        args: [1.65, 7, 0.25, 1, 0.9],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to four random foes and sometimes blind them."
    },

    1123: {
        name: "Unhealing Rend", type: 2, func: 4, calc: 3,
        args: [1.55, 2, 0.25],
        range: 17, prob: 30, ward: 2,
        desc: "Heavy AGI-based damage to and sometimes paralyze six random foes, ignoring position. "
    },

    1124: {
        name: "Life Tax", type: 1, func: 51, calc: 0,
        args: [0, 9, 3000, 6, 0.4, 1, 121, 120, 43],
        range: 7, prob: 70,
        desc: "Absorbs DEF and AGI from up to three foes at the beginning of battles."
    },

    1125: {
        name: "Gae Bulg", type: 2, func: 4, calc: 1,
        args: [1.8, 2, 0.25],
        range: 19, prob: 30, ward: 1,
        desc: "Heavy ATK-based damage, sometimes paralyze four random foes, ignoring position."
    },

    1126: {
        name: "Gift of the Spear", type: 3, func: 39, calc: 6,
        args: [1, 3, 0, 20, 3],
        range: 36, prob: 50,
        desc: "Chance to increase WIS of self and an ally on the right when being attacked."
    },

    1127: {
        name: "Freezing Whorl", type: 2, func: 4, calc: 2,
        args: [1.05, 3, 0.4],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "WIS-based damage and sometimes freeze all foes, ignoring position."
    },

    1128: {
        name: "Light of Caladbolg", type: 3, func: 39, calc: 6,
        args: [1, 3, 2, 15, 5],
        range: 3, prob: 50, sac: 1,
        desc: "Chance to increase DEF and WIS of self and adjacent familiars when being attacked."
    },

    1129: {
        name: "Shadow Feast", type: 2, func: 37, calc: 2,
        args: [2.25, 0.15, 27, 21],
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage and drain HP from three random foes, ignoring position."
    },

    1130: {
        name: "Shadow Cloak", type: 1, func: 44, calc: 0,
        args: [2, 13, 0, 0, 0, 1.4, 14],
        range: 3, prob: 70,
        desc: "Raise WIS/AGI of self and adjacent familiars when its HP decreases."
    },

    1131: {
        name: "Dark Geis", type: 2, func: 4, calc: 2,
        args: [1.25, 6, 0.1, 2, 0.6],
        range: 20, prob: 30, ward: 2,
        desc: "WIS-based DMG, sometimes confuse five random foes, ignoring position."
    },

    1132: {
        name: "Bullwark", type: 1, func: 44, calc: 0,
        args: [0.3, 17, 0, 0, 0, 0.15, 3],
        range: 3, prob: 70,
        desc: "Raise HP and WIS of self and adjacent familiars by 30% and 15% of its WIS respectively."
    },

    1133: {
        name: "Harvesting Scythe", type: 2, func: 4, calc: 3,
        args: [1.7],
        range: 314, prob: 30, ward: 2,
        desc: "Heavy AGI-based damage to up to four foes, ignoring position. Increased if fewer foes."
    },

    1134: {
        name: "Shieldbreaker Hooves", type: 1, func: 32, calc: 0,
        args: [0.3, 2],
        range: 7, prob: 70,
        desc: "Greatly lower DEF of up to three foes based on 30% of his WIS."
    },

    1135: {
        name: "Frisky Vines", type: 2, func: 34, calc: 2,
        args: [1.65, 3, 0.3, 0.07],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based damage to 4 random foes and sometimes lower WIS, ignoring position."
    },

    1136: {
        name: "Twining Vines", type: 2, func: 4, calc: 2,
        args: [1.5],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to three random foes, ignoring position."
    },

    1137: {
        name: "Stone Fruit", type: 2, func: 4, calc: 3,
        args: [1.2],
        range: 17, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to six random foes, ignoring position."
    },

    1138: {
        name: "Grove's Mercy", type: 1, func: 44, calc: 0,
        args: [0.3, 4, 0, 0, 0, 1, 18],
        range: 36, prob: 70,
        desc: "Raise AGI of self and an ally on the right, both take an extra action next turn."
    },

    1139: {
        name: "Toil and Trouble", type: 2, func: 4, calc: 3,
        args: [1.65],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy AGI-based damage to four random foes, ignoring position."
    },

    1140: {
        name: "Pumpkin Nostrum", type: 1, func: 44, calc: 0,
        args: [0.25, 4, 0, 0, 0, 1141, 16],
        range: 37, prob: 70,
        desc: "Raise AGI/Revive with 50% HP after being killed, self and an ally on the left."
    },

    1141: {
        name: "Dawn's Light", type: 16, func: 6, calc: 0,
        args: [0.5],
        range: 21, prob: 100,
        desc: "-"
    },

    1142: {
        name: "Rain of Claws", type: 2, func: 3, calc: 3,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive AGI-based damage to two random foes."
    },

    1143: {
        name: "Lurking Jaws", type: 2, func: 52, calc: 3,
        args: [1.65, 7, 1500, 6, 0.5, 0.5, 121, 120],
        range: 19, prob: 30, ward: 1,
        desc: "Heavy AGI-based damage and sometimes absorb ATK/AGI from four random foes."
    },

    1144: {
        name: "Vengeful Claws", type: 3, func: 42, calc: 1,
        args: [1.55, 1, 0.5, 0.15],
        range: 21, prob: 50, ward: 1,
        desc: "Chance to unleash a heavy counter attack when struck, greatly lower ATK."
    },

    1145: {
        name: "Pestilent Blade", type: 1, func: 19, calc: 0,
        args: [0, 1, 1, 25],
        range: 8, prob: 100, sac: 1,
        desc: "Poison all foes at the start of battle."
    },

    1146: {
        name: "Cursed Moonlight", type: 2, func: 4, calc: 2,
        args: [1.25, 1, 0.25, 10],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to and sometimes poison five random foes, ignoring position. "
    },

    1147: {
        name: "Blessed Moonlight", type: 1, func: 1, calc: 6,
        args: [1, 17, 1.5, 5000],
        range: 3, prob: 70,
        desc: "Raise HP of self and adjacent familiars at beginning of battle."
    },

    1148: {
        name: "Thread Lash", type: 2, func: 34, calc: 2,
        args: [1.25, 4, 0.3, 0.04],
        range: 8, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes lower AGI of all foes, ignoring position."
    },

    1149: {
        name: "Thread Shackle", type: 1, func: 46, calc: 0,
        args: [0.08, 4, 0, 0, 0, 2, 0.3, 1],
        range: 7, prob: 70,
        desc: "Greatly lower AGI of up to three foes and sometimes paralyze targets for one turn."
    },

    1150: {
        name: "Witch's Mallet", type: 2, func: 37, calc: 2,
        args: [1.5, 0.15, 27, 21],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage and drain HP from four random foes, ignoring position."
    },

    1151: {
        name: "Pumpkin Victuals", type: 1, func: 44, calc: 0,
        args: [2.5, 12, 0, 0, 0, 1.8, 13],
        range: 3, prob: 70,
        desc: "Buff self/adjacent familiars. DEF/WIS of each affected ally increase as its HP decrease."
    },

    1152: {
        name: "Dance of Flames", type: 2, func: 4, calc: 2,
        args: [1.55, 8, 0.3, 2500],
        range: 20, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage and sometimes burn five random foes, ignoring position."
    },

    1153: {
        name: "Splash of Fire", type: 5, func: 28, calc: 7,
        args: [0.3, 8, 6, 3, 0.4],
        range: 21, prob: 50,
        desc: "Reflect 60% of ATK/WIS-based damage back to up to two foes."
    },

    1154: {
        name: "Hateful Blaze", type: 2, func: 4, calc: 2,
        args: [1.25],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to four random foes, ignoring position."
    },

    1155: {
        name: "Bone Charge", type: 2, func: 3, calc: 1,
        args: [1.15],
        range: 314, prob: 30, ward: 1,
        desc: "ATK-based damage to up to four foes. Increased if fewer foes."
    },

    1156: {
        name: "Back from Beyond", type: 1, func: 1, calc: 0,
        args: [1158, 16],
        range: 21, prob: 70,
        desc: "Self is automatically revived with full HP after being killed."
    },

    1157: {
        name: "Necromancy", type: 2, func: 6, calc: 0,
        args: [1],
        range: 122, prob: 50, sac: 1,
        desc: "Revive and fully restore HP of two random allies."
    },

    1158: {
        name: "Back from Beyond", type: 16, func: 6, calc: 0,
        args: [1],
        range: 21, prob: 100,
        desc: "-"
    },

    1159: {
        name: "Death's Charge", type: 2, func: 33, calc: 3,
        args: [1.45, 4, 1, 0.016],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to five random foes and lower AGI."
    },

    1160: {
        name: "Impish Wings", type: 2, func: 3, calc: 3,
        args: [2],
        range: 23, prob: 30, ward: 1,
        desc: "Deal massive AGI-based damage to two random foes."
    },

    1161: {
        name: "Impish Claws", type: 2, func: 3, calc: 1,
        args: [1.65],
        range: 23, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to two random foes."
    },

    1162: {
        name: "Lightning Lunge", type: 2, func: 3, calc: 3,
        args: [1.3],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to four random foes."
    },

    1163: {
        name: "Ardent Swing", type: 2, func: 53, calc: 2,
        args: [2.1, 2, 2000, 6, 0.4, 1, 121, 120],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Massive WIS-based damage and absorbs DEF from up to three foes."
    },

    1164: {
        name: "Shadow Piercer", type: 2, func: 4, calc: 1,
        args: [1.65, 8, 0.5, 1500],
        range: 19, prob: 30, ward: 1,
        desc: "Heavy ATK-based damage and sometimes burn four random foes, ignoring position."
    },

    1165: {
        name: "Tailsman Ward", type: 1, func: 44, calc: 0,
        args: [0.28, 1, 0, 0, 0, 0.17, 4],
        range: 3, prob: 70,
        desc: "Raise ATK/AGI of self and adjacent familiars based on 28% and 17% of his WIS respectively."
    },

    1166: {
        name: "Eternal Damnation", type: 2, func: 4, calc: 2,
        args: [1.3],
        range: 8, prob: 30, ward: 3,
        desc: "Deal WIS-based damage to all foes, ignoring position."
    },

    1167: {
        name: "Wailing Wall", type: 3, func: 39, calc: 6,
        args: [1, 2, 0, 30, 3],
        range: 3, prob: 50,
        desc: "Greatly increase DEF of self and adjacent familiars when being attacked."
    },

    1168: {
        name: "Bone Bash", type: 2, func: 3, calc: 1,
        args: [1.9, 2, 0.35],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage and sometimes paralyze up to three foes."
    },

    1169: {
        name: "Might of the Wolf", type: 1, func: 1, calc: 0,
        args: [3, 11],
        range: 21, prob: 70, sac: 1,
        desc: "Greatly increase ATK of self as her HP decrease."
    },

    1170: {
        name: "Fist of Treats", type: 2, func: 53, calc: 1,
        args: [1.25, 1, 1000, 6, 1, 1, 121, 120],
        range: 20, prob: 30, ward: 1,
        desc: "ATK-based damage and absorbs ATK from five random foes, ignoring position."
    },

    1171: {
        name: "Fist of Tricks", type: 1, func: 46, calc: 0,
        args: [0.68, 2, 0, 0, 0, 8, 1, 2000],
        range: 7, prob: 70,
        desc: "Greatly lower DEF of up to three foes and burn targets."
    },

    1172: {
        name: "Bandaged Blade", type: 2, func: 33, calc: 1,
        args: [1.75, 2, 0.4, 0.25],
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage, may lower DEF of three random foes."
    },

    1173: {
        name: "Cursed Bandages", type: 3, func: 63, calc: 1,
        args: [1.3, 0.3, 27, 21],
        range: 21, prob: 50, ward: 1,
        desc: "Chance to unleash a heavy counter attack and drain HP from target when struck."
    },

    1174: {
        name: "Arrow of the Fly Lord", type: 2, func: 4, calc: 1,
        args: [1.7, 2, 0.25],
        range: 314, prob: 30, ward: 1, sac: 1,
        desc: "Heavy ATK-based DMG and sometimes paralyze up to four foes. Increased if fewer foes."
    },

    1175: {
        name: "Draw of Death", type: 2, func: 4, calc: 2,
        args: [1.55],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },

    1176: {
        name: "Lust for Life", type: 2, func: 6, calc: 0,
        args: [0.5],
        range: 2, prob: 50,
        desc: "Revive and restore with 50% HP of adjacent familiars."
    },

    1178: {
        name: "Swarm of Flies", type: 2, func: 37, calc: 3,
        args: [1.15, 0.2, 27, 21],
        range: 17, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage and drain HP from six random foes, ignoring position."
    },

    1179: {
        name: "Ravenous Flies", type: 2, func: 4, calc: 3,
        args: [1.35],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage to four random foes, ignoring position."
    },

    1180: {
        name: "Maple Edge", type: 2, func: 4, calc: 2,
        args: [1.25],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to five random foes, ignoring position."
    },

    1181: {
        name: "Bracing Breeze", type: 1, func: 44, calc: 0,
        args: [0.2, 3, 0, 0, 0, 1.8, 13],
        range: 3, prob: 70,
        desc: "Raise self/adjacent allies' WIS by 20% of her WIS, their WIS increases as HP falls."
    },

    1182: {
        name: "Bug Bomb", type: 2, func: 4, calc: 2,
        args: [1.15, 1, 0.15, 5],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes poison six random foes, ignoring position. "
    },

    1183: {
        name: "Insect Repellant", type: 1, func: 44, calc: 0,
        args: [0.24, 17, 0, 0, 0, 0.12, 3],
        range: 3, prob: 70,
        desc: "Raise HP and WIS of self and adjacent familiars by 24% and 12% of its WIS respectively."
    },

    1184: {
        name: "Rampike Claws", type: 2, func: 4, calc: 2,
        args: [2],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },

    1185: {
        name: "Cursed Cobra", type: 2, func: 4, calc: 2,
        args: [1.3, 6, 0.1, 2, 0.6],
        range: 315, prob: 30, ward: 2,
        desc: "WIS-based DMG to and sometimes confuse up to five foes. Increased if fewer foes."
    },

    1186: {
        name: "Fortuitous Refrain", type: 1, func: 44, calc: 0,
        args: [0.2, 3, 0, 0, 0, 1187, 16],
        range: 3, prob: 70,
        desc: "Raise WIS by 20%/Revive with 75% HP after being killed, self and adjacent familiars."
    },

    1187: {
        name: "Fortuitous Refrain", type: 16, func: 6, calc: 0,
        args: [0.75],
        range: 21, prob: 100,
        desc: "-"
    },

    1190: {
        name: "Thundercall Horn", type: 2, func: 4, calc: 3,
        args: [1.3],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage to five random foes, ignoring position."
    },

    1193: {
        name: "Enraged Bull", type: 1, func: 44, calc: 1,
        args: [0.15, 1, 0, 0, 0, 0.1, 4],
        range: 3, prob: 70, sac: 1,
        desc: "Raise ATK/AGI of self and adjacent familiars based on 15% and 10% of its ATK respectively."
    },

    1196: {
        name: "Lulled Bull", type: 1, func: 44, calc: 1,
        args: [0.15, 3, 0, 0, 0, 0.1, 4],
        range: 3, prob: 70, sac: 1,
        desc: "Raise WIS/AGI of self and adjacent familiars based on 15% and 10% of its ATK respectively."
    },

    1197: {
        name: "Lightning Doublestrike", type: 2, func: 3, calc: 1,
        args: [2.1],
        range: 6, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to up to two foes."
    },

    1198: {
        name: "Grace of the Sky", type: 1, func: 1, calc: 0,
        args: [0.7, 5, 6],
        range: 21, prob: 70,
        desc: "Reduce physical and magical damage taken by self greatly."
    },

    1199: {
        name: "Embers of the Sun", type: 2, func: 4, calc: 2,
        args: [1.55, 8, 0.25, 1500],
        range: 314, prob: 30, ward: 3, sac: 1,
        desc: "Heavy WIS-based DMG, may burn up to four foes, ignoring position. Increased if fewer foes."
    },

    1200: {
        name: "Saber & Feather", type: 2, func: 33, calc: 1,
        args: [1.9, 2, 1, 0.1],
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to three random foes and lower DEF."
    },

    1201: {
        name: "Wall of Feathers", type: 1, func: 44, calc: 0,
        args: [0.5, 1, 0, 0, 0, 0.5, 2],
        range: 3, prob: 70,
        desc: "Raise ATK and DEF of self and adjacent familiars by 50% of his WIS."
    },

    1202: {
        name: "Fellfeather Saber", type: 2, func: 3, calc: 3,
        args: [1.15],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to up to three foes."
    },

    1203: {
        name: "Divine Gale", type: 2, func: 34, calc: 2,
        args: [1.3, 4, 0.25, 0.05],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes lower AGI of five random foes, ignoring position."
    },

    1204: {
        name: "Divine Tailwind", type: 1, func: 44, calc: 2,
        args: [0.14, 3, 0, 0, 0, 0.08, 4],
        range: 3, prob: 70,
        desc: "Raise WIS/AGI of self and adjacent familiars on 14% and 8% of its WIS respectively."
    },

    1205: {
        name: "Dance of the Harvest", type: 2, func: 18, calc: 4,
        args: [0.7, 1],
        range: 4, prob: 50,
        desc: "Restore 70% of HP to all party members."
    },

    1206: {
        name: "Popping Corn", type: 3, func: 43, calc: 2,
        args: [1.85, 1, 1, 0.06],
        range: 21, prob: 50, ward: 2,
        desc: "Chance to unleash a heavy counter attack when struck, lowering ATK of target."
    },

    1207: {
        name: "Gleipnir", type: 2, func: 4, calc: 1,
        args: [1.6, 2, 0.3],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Heavy ATK-based damage, sometimes paralyze four random foes, ignoring position."
    },

    1208: {
        name: "Shredded Chain", type: 2, func: 4, calc: 3,
        args: [1.8],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy AGI-based damage to four random foes, ignoring position."
    },

    1209: {
        name: "Sigil of Blood", type: 1, func: 44, calc: 0,
        args: [0.25, 1, 0, 0, 0, 0.25, 3],
        range: 3, prob: 70,
        desc: "Raise ATK/WIS of self and adjacent allies by 25% of its WIS."
    },

    1210: {
        name: "Whip & Tail", type: 2, func: 34, calc: 1,
        args: [1.4, 4, 0.2, 0.15],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes and sometimes lower AGI, ignoring position."
    },

    1211: {
        name: "Heavy Strike", type: 2, func: 4, calc: 1,
        args: [2.15, 8, 0.35, 2000],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Massive ATK-based damage and sometimes burn up to three foes, ignoring position."
    },

    1212: {
        name: "Claws of Death", type: 2, func: 4, calc: 2,
        args: [1.1, 5, 0.3, 1],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes silence six random foes, ignoring position."
    },

    1213: {
        name: "Miasma of Death", type: 3, func: 62, calc: 2,
        args: [1.75, 0.4, 27, 21],
        range: 21, prob: 50, ward: 2,
        desc: "Chance to unleash a heavy counter attack when struck and drain HP from target."
    },

    1214: {
        name: "Moonlight Volley", type: 2, func: 4, calc: 1,
        args: [1.75],
        range: 314, prob: 30, ward: 1,
        desc: "Heavy ATK-based damage to up to four foes, ignoring position. Increased if fewer foes."
    },

    1215: {
        name: "Gift of the Moon", type: 1, func: 51, calc: 0,
        args: [0, 4, 2000, 6, 0.33, 1, 121, 120, 43],
        range: 7, prob: 70,
        desc: "Absorb AGI from up to three foes at beginning of battles."
    },

    1216: {
        name: "Gambol", type: 6, func: 27, calc: 0,
        args: [2, 9, 78, 79],
        range: 21, prob: 50, sac: 1,
        desc: "Evade enemy ATK-based and AGI-based attack skills."
    },

    1217: {
        name: "Turkey Dash", type: 2, func: 7, calc: 3,
        args: [1.05, 0.1],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to all foes. Chance to kill targets."
    },

    1218: {
        name: "Falling Apple", type: 2, func: 34, calc: 2,
        args: [1.1, 3, 0.25, 0.08],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, sometimes lower WIS, ignoring position."
    },

    1219: {
        name: "Glittering Apple", type: 1, func: 44, calc: 0,
        args: [0.2, 3, 0, 0, 0, 1220, 16],
        range: 3, prob: 70,
        desc: "Raise WIS by 20% of her WIS, self and adjacent allies revive with 75% HP on death."
    },

    1220: {
        name: "Glittering Apple", type: 16, func: 6, calc: 0,
        args: [0.75],
        range: 21, prob: 100,
        desc: "-"
    },

    1221: {
        name: "Thorn of the Grove", type: 2, func: 52, calc: 3,
        args: [1.5, 2, 1000, 6, 1, 1, 121, 120],
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage and absorb DEF from four random foes."
    },

    1222: {
        name: "Paling of the Grove", type: 1, func: 1, calc: 0,
        args: [0.12, 9],
        range: 3, prob: 70,
        desc: "Raise ATK, DEF, WIS and AGI of self and adjacent allies."
    },

    1223: {
        name: "Trailblazer", type: 2, func: 4, calc: 1,
        args: [1.35, 8, 0.25, 4000],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage and sometimes burn five random foes, ignoring position."
    },

    1224: {
        name: "Smoldering Coals", type: 2, func: 4, calc: 2,
        args: [1.6],
        range: 314, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to up to four foes. Increased if fewer foes."
    },

    1225: {
        name: "Bustling Broom", type: 5, func: 27, calc: 0,
        args: [2, 2, 78, 79],
        range: 21, prob: 50,
        desc: "Evade enemy WIS-based attack skills."
    },

    1226: {
        name: "Gift of Fire", type: 2, func: 4, calc: 1,
        args: [2.1, 8, 0.25, 2500],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Massive ATK-based damage and sometimes burn three random foes, ignoring position."
    },

    1227: {
        name: "Scold", type: 2, func: 4, calc: 1,
        args: [1],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes, ignoring position."
    },

    1228: {
        name: "Ice Blade", type: 2, func: 3, calc: 1,
        args: [1.25, 3, 0.3],
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to four random foes and sometimes freeze them."
    },

    1229: {
        name: "Iron Heel Ward", type: 1, func: 44, calc: 1,
        args: [0.23, 1, 0, 0, 0, 1.5, 14],
        range: 3, prob: 70,
        desc: "Raise ATK of self/adjacent familiars by 23% of his ATK; raise their AGI as his HP decreases."
    },

    1230: {
        name: "Hail Arrows", type: 2, func: 4, calc: 1,
        args: [1.45],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes, ignoring position."
    },

    1231: {
        name: "Secrets of the Hunt", type: 1, func: 44, calc: 1,
        args: [0.1, 4, 0, 0, 0, 0.2, 1],
        range: 3, prob: 70,
        desc: "Raise AGI/ATK of self and adjacent familiars by 10% and 20% of its ATK respectively."
    },

    1232: {
        name: "Vicious Scratch", type: 2, func: 3, calc: 1,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },

    1233: {
        name: "Icy Rage", type: 2, func: 34, calc: 2,
        args: [1.35, 4, 1, 0.04],
        range: 315, prob: 30, ward: 2,
        desc: "WIS-based DMG and reduce AGI of up to 5 foes. Increased if fewer foes."
    },

    1234: {
        name: "Icy Love", type: 1, func: 44, calc: 0,
        args: [0.27, 2, 0, 0, 0, 0.18, 3],
        range: 3, prob: 70,
        desc: "Raise DEF/WIS of self and adjacent allies by 27%/18% of her WIS."
    },

    1245: {
        name: "Revelation of Death", type: 2, func: 52, calc: 1,
        args: [1.05, 2, 1000, 6, 1, 1, 121, 120],
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage and absorb DEF from six random foes."
    },

    1246: {
        name: "Grace of the Angel", type: 5, func: 14, calc: 1,
        args: [1],
        range: 2, prob: 50, ward: 1,
        desc: "Take damage in place of nearby ally and counter."
    },

    10001: { // 100% Mod, Single Hit, WIS-based, position independent
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10003: { // 100% Mod, Single Hit, WIS-based, position independent
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10004: { // 105% Mod, Single Hit, WIS-based, position independent, paralyze (Lahamu)
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.05, 2, 0.2],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage, sometimes paralyzing target."
    },

    10005: { // Tarrantula
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10006: { // 105% Mod, 3 Random Hits, ATK-based, position dependent (Ettin)
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.05],
        range: 16, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to three random foes."
    },

    10007: { // use this for normal wis-based auto skill
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10008: { // 65% Mod, Single Hit, WIS-based, position independent (Hyena)
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [0.65],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10009: { // 100% Mod, Single Hit, WIS-based, position independent, freeze (Jack)
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 3, 0.1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes freeze target."
    },

    10010: { // 110% Mod, Three Hit Cone, ATK-based, position independent (Brang)
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.1],
        range: 7, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage up to three foes."
    },

    10011: { // Thor L
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10012: { // 100% Mod, Single Hit, ATK-based, position dependent, poison
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1, 1, 0.4],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes poison target."
    },

    10014: { // 100% Mod, Single Hit, ATK-based, position dependent, paralyze (Leo)
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1, 2, 0.4],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage, sometimes paralyzing target."
    },

    10015: { // Ghis L
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10016: { // same as 10007, but with flame animation
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10017: { // 100% Mod, Single Hit, ATK-based, position dependent, envenom (Apep)
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1, 1, 0.4, 10],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes envenom target."
    },

    10018: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10019: { // 100% Mod, Single Hit, WIS-based, position independent, breath based
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 3, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10020: { // 60% Mod, 2 Random Hits, ATK-based, position dependent
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [0.6],
        range: 23, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to two random foes."
    },

    10021: { // 120% Mod, Single Hit, ATK-Based, position independent (Perendon)
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10022: { // Nin-ridu
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10023: { // 100% Mod, Single Hit, WIS-based, position independent, wind effect (Bayam)
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10024: { // 100% Mod, Single Hit, ATK-based, position dependent, disable (Silver Dragon)
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1, 4, 0.35],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes disable target."
    },

    10025: { // 120% Mod, Single Hit, ATK-based, position independent, greatly lower AGI (Archbishop)
        name: "Standard Action", type: 2, func: 34, calc: 1,
        args: [1.2, 4, 0.3, 0.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes greatly lower AGI of target."
    },

    10026: { // Ivy
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.3, 2, 0.5],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage, 50% chance to paralyze."
    },

    10027: { // Temperance
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [0.7, 5, 0.4, 1],
        range: 23, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to two random foes. 40% chance to silence."
    },

    10028: { // Death
        name: "Standard Action", type: 2, func: 7, calc: 1,
        args: [1, 0.1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage. Chance to kill target."
    },

    10029: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10030: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1],
        range: 6, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to up to two foes."
    },

    10031: { // Kijin
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.3],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10032: { // Sun
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 7, 0.35, 2, 0.9],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes blind target."
    },

    10033: { // Dahaka
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1],
        range: 23, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to two random foes."
    },

    10034: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.4],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10035: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.3],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10036: { // Wicker Man
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 8, 0.4, 2000],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes burn target."
    },

    10037: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1, 1, 0.5, 15],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes envenom target."
    },

    10038: {
        name: "Standard Action", type: 2, func: 36, calc: 1,
        args: [1, 0.4, 27, 21],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and drain HP from target."
    },

    10039: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1, 1, 0.5, 15],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes envenom target."
    },

    10040: {
        name: "Standard Action", type: 2, func: 37, calc: 1,
        args: [1, 0.2, 27, 21],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and drain HP from target."
    },

    10041: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10042: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.3],
        range: 5, prob: 100, ward: 3, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10043: {
        name: "Standard Action", type: 2, func: 34, calc: 2,
        args: [1, 2, 0.5, 0.3],
        range: 5, prob: 100, ward: 3, isAutoAttack: true,
        desc: "WIS-based damage and sometimes greatly lower DEF."
    },

    10044: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10045: {
        name: "Standard Action", type: 2, func: 37, calc: 2,
        args: [1, 0.3, 27, 21],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and drain HP from target."
    },

    10046: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10047: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 3, 0.25],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes freeze target."
    },

    10048: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1, 2, 0.25],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes paralyze target."
    },

    10049: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10050: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2, 3, 0.35],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes freeze target."
    },

    10051: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10052: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.2],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10053: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1, 2, 0.25],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes paralyze target."
    },

    10054: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1, 5, 0.35, 1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes silence target."
    },

    10056: {
        name: "Standard Action", type: 2, func: 33, calc: 1,
        args: [1, 4, 1, 0.1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "Deal ATK-based damage to one foe and greatly lower AGI."
    },

    10057: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 3, 0.3],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes freeze target."
    },

    10058: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [0.5],
        range: 7, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to up to three foes."
    },

    10059: {
        name: "Standard Action", type: 2, func: 34, calc: 2,
        args: [1, 4, 0.3, 0.1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "Deal WIS-based damage to one foe and sometimes greatly lower AGI."
    },

    10060: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1, 2, 0.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes paralyze target."
    },

    10061: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10062: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [0.8],
        range: 6, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to up to two foes."
    },

    10063: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 4, 0.25],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes disable target."
    },

    10064: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 7, 0.25, 1, 0.9],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes blind target."
    },

    10065: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2, 1, 0.5, 10],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes envenom target."
    },

    10066: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [0.85],
        range: 16, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to three random foes, ignoring position."
    },

    10067: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [0.7],
        range: 23, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to two random foes."
    },

    10100: {
        name: "Standard Action", type: 2, func: 34, calc: 1,
        args: [1.4, 4, 0.5, 0.15],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe and sometimes lower AGI of target."
    },

    10101: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1, 1, 0.5, 5],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes poison target."
    },

    10103: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10104: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [0.8],
        range: 6, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to up to two foes."
    },

    10105: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.5],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "Heavy ATK-based damage to one foe."
    },

    10106: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10107: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2, 1, 0.3, 10],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe and sometimes poison target."
    },

    10108: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10109: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [0.7],
        range: 6, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage up to two foes."
    },

    10110: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 3, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10111: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 3, 0.2],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes freeze target."
    },

    10112: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2, 1, 0.2, 10],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe and sometimes poison target."
    },

    10113: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.5],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "Heavy ATK-based damage to one foe."
    },

    10114: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2, 2, 0.3],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes paralyze target."
    },

    10115: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [0.6],
        range: 23, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to two random foes."
    },

    10116: {
        name: "Standard Action", type: 2, func: 36, calc: 1,
        args: [1, 0.5, 27, 21],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and drain HP from target."
    },

    10117: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.4, 5, 0.25, 1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes silence target."
    },

    10118: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 7, 0.3, 1, 0.9],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes blind target."
    },

    10119: {
        name: "Standard Action", type: 2, func: 36, calc: 1,
        args: [1.4, 0.4, 27, 21],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and drain HP from target."
    },

    10120: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.4],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe, ignoring position."
    },

    10121: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 3, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10122: {
        name: "Standard Action", type: 2, func: 36, calc: 1,
        args: [1.3, 0.5, 27, 21],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and drain HP from target."
    },

    10123: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [0.6, 8, 0.2, 2000],
        range: 6, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to up to 2 foes and sometimes burn targets."
    },

    10124: {
        name: "Standard Action", type: 2, func: 53, calc: 2,
        args: [1, 3, 1000, 6, 0.5, 1, 121, 120],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and absorbs WIS from one foe."
    },

    10125: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10126: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.2, 3, 0.3],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes freeze target."
    },

    10127: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10128: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.4],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10129: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.2],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10130: {
        name: "Standard Action", type: 2, func: 34, calc: 1,
        args: [1.2, 3, 1, 0.15],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and lower WIS of target."
    },

    10131: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.4],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10132: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [0.6],
        range: 6, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to up to two foes."
    },

    10133: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10134: {
        name: "Standard Action", type: 2, func: 7, calc: 1,
        args: [1.2, 0.1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and chance to kill target."
    },

    10135: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [0.5],
        range: 7, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to up to three foes."
    },

    10136: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.3],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10137: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10138: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.15],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10139: {
        name: "Standard Action", type: 2, func: 34, calc: 1,
        args: [1.2, 2, 1, 0.15],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "Deal ATK-based damage to one foe and lower DEF."
    },

    10140: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 1, 0.3, 10],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe and sometimes poison target."
    },

    10141: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [0.8, 2, 0.2],
        range: 6, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes paralyze up to two foes. "
    },

    10142: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10143: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 8, 0.3, 2500],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe and sometimes burn target."
    },

    10144: {
        name: "Standard Action", type: 2, func: 33, calc: 1,
        args: [1.3, 2, 1, 0.07],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and lower DEF of target."
    },

    10145: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.3],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10146: {
        name: "Standard Action", type: 2, func: 36, calc: 1,
        args: [0.9, 0.2, 27, 21],
        range: 23, prob: 100, ward: 1, isAutoAttack: true,
        desc: "Drains HP from two random foes while dealing ATK-based damage."
    },

    10147: {
        name: "Standard Action", type: 2, func: 34, calc: 1,
        args: [1.2, 4, 1, 0.15],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe and lower AGI of target."
    },

    10148: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.5],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "Heavy WIS-based damage to one foe."
    },

    10149: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.2, 8, 1, 3000],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe and burn target."
    },

    10150: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [0.7],
        range: 23, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to two random foes."
    },

    10151: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10152: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10153: {
        name: "Standard Action", type: 2, func: 33, calc: 1,
        args: [1.2, 1, 1, 0.09],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe and lower ATK of target."
    },

    10155: {
        name: "Standard Action", type: 2, func: 53, calc: 2,
        args: [0.5, 3, 2000, 6, 1, 1, 121, 120],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "Deal WIS-based damage and absorbs WIS from one foe."
    },

    10156: {
        name: "Standard Action", type: 2, func: 33, calc: 1,
        args: [1.2, 2, 1, 0.16],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe and lower DEF of target."
    },

    10157: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10158: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 3, 0.4],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe and sometimes freeze target."
    },

    10159: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 2, 0.4],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe and sometimes paralyze target."
    },

    10160: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10161: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10162: {
        name: "Standard Action", type: 2, func: 33, calc: 1,
        args: [1.2, 2, 1, 0.25],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and lower DEF of target."
    },

    10163: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10164: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 8, 0.6, 2500],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe and sometimes burn target."
    },

    10165: {
        name: "Standard Action", type: 2, func: 33, calc: 1,
        args: [1.2, 2, 1, 0.14],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and lower DEF of target."
    },

    10166: {
        name: "Standard Action", type: 2, func: 52, calc: 1,
        args: [1, 1, 750, 6, 1, 1, 121, 120],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and absorbs ATK from one foe."
    },

    10167: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.5],
        range: 6, prob: 100, ward: 1, isAutoAttack: true,
        desc: "Heavy ATK-based damage to up to two foes."
    },

    10168: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10169: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 3, 0.3],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes freeze target."
    },

    10170: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.3],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10171: {
        name: "Standard Action", type: 2, func: 37, calc: 2,
        args: [1, 0.5, 27, 21],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and drain HP from target."
    },

    10172: {
        name: "Standard Action", type: 2, func: 34, calc: 2,
        args: [1.2, 3, 1, 0.05],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and lower WIS of target."
    },

    10173: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 1, 0.5, 10],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe and sometimes poison target."
    },

    10174: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.2, 2, 0.2],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe and sometimes paralyze target."
    },

    10175: {
        name: "Standard Action", type: 2, func: 37, calc: 2,
        args: [1, 0.2, 27, 21],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and drain HP from target."
    },

    10176: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.2],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },

    10177: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    10178: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.2, 2, 0.4],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage, sometimes paralyzing target."
    },

    10179: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [0.8],
        range: 23, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to two random foes."
    },

    10180: {
        name: "Standard Action", type: 2, func: 33, calc: 1,
        args: [1, 2, 1, 0.1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and lower DEF of target."
    },

    10181: {
        name: "Standard Action", type: 2, func: 53, calc: 1,
        args: [1.2, 1, 1000, 6, 1, 0.5, 121, 120],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes absorbs ATK from one foe."
    },

    10182: {
        name: "Standard Action", type: 2, func: 34, calc: 1,
        args: [1.2, 2, 1, 0.06],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "Deal ATK-based damage to one foe and lower DEF."
    },

    10183: {
        name: "Standard Action", type: 2, func: 34, calc: 2,
        args: [1, 4, 1, 0.014],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "Deal WIS-based damage to one foe and lower AGI of target."
    },

    10184: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.5, 2, 0.4],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "Heavy ATK-based damage and sometimes paralyze target."
    },

    10185: {
        name: "Standard Action", type: 2, func: 34, calc: 1,
        args: [1.2, 4, 0.4, 0.15],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe and sometimes lower AGI of target."
    },

    10186: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.2],
        range: 6, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to up to two foes."
    },

    10187: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },

    9001: {
        name: "Abject Horror", type: 20, func: 1002, calc: 0,
        args: [0.3],
        range: 0, prob: 100,
        desc: "Decrease damage from lower rarities by up to 30%."
    },

    9002: {
        name: "Cursed Cry", type: 20, func: 1001, calc: 0,
        args: [0.2],
        range: 0, prob: 100,
        desc: "Increase damage to lower rarities by up to 20%."
    },

    9003: {
        name: "Grace of the Lake", type: 20, func: 1005, calc: 0,
        args: [0.3, 0, 0, 3, 2],
        range: 0, prob: 100,
        desc: "Up to 30% chance to freeze lower rarities when being attacked."
    },

    9004: {
        name: "Coldblood Claw", type: 20, func: 1006, calc: 0,
        args: [0.1],
        range: 0, prob: 100,
        desc: "Up to 10% chance to reproduce the previous attack action."
    },

    9005: {
        name: "Death Wish", type: 20, func: 1003, calc: 0,
        args: [1],
        range: 0, prob: 100,
        desc: "Increase success rate of affliction against lower rarities."
    },

    9006: {
        name: "Breakwater", type: 20, func: 1002, calc: 0,
        args: [0.35],
        range: 0, prob: 100,
        desc: "Decrease damage from lower rarities by up to 35%."
    },

    9007: {
        name: "Devoted Servant", type: 20, func: 1006, calc: 0,
        args: [0.15],
        range: 0, prob: 100,
        desc: "Up to 15% chance to reproduce the previous attack action."
    },

    9008: {
        name: "Lionpride", type: 20, func: 1001, calc: 0,
        args: [0.25],
        range: 0, prob: 100,
        desc: "Increase damage to lower rarities by up to 25%."
    },

    9009: {
        name: "Exorcism Trap", type: 20, func: 1005, calc: 0,
        args: [0.5, 0, 0, 8, 3000],
        range: 0, prob: 100,
        desc: "Up to 50% chance to burn lower rarities when being attacked."
    },

    9010: {
        name: "Decree of Death", type: 20, func: 1002, calc: 0,
        args: [0.4],
        range: 0, prob: 100,
        desc: "Decrease damage from lower rarities by up to 40%"
    },
};
