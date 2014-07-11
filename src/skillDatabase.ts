/**
 * Some notes:
 * - For attack skills, there has to be a "ward" attribute, which takes a value of "PHYSICAL", "BREATH" or "MAGICAL"
 *   Counter skills also need the above, even though the ward will always be "PHYSICAL" for those skills
 * - If a skillFuncArg is 0, there's no need to include it
 *
 * - There is no need for the baseProbability
 */
var SkillDatabase = {

    10000: {
        name: "Default auto", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1, 
        skillRange: 5, maxProbability: 100, ward: "PHYSICAL", isAutoAttack: true
    },

    2 : {
        name: "Strength of Blades", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.5, skillFuncArg2: 1, 
        skillRange: 3, maxProbability: 70,
        description: "Raise ATK of self and adjacent familiars."
    },

    4 : {
        name: "Guile of Runes", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.5, skillFuncArg2: 3, 
        skillRange: 3, maxProbability: 70,
        description: "Raise WIS of self and adjacent familiars."
    },

    5 : {
        name: "Grace of Winds", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.5, skillFuncArg2: 4, 
        skillRange: 3, maxProbability: 70,
        description: "Raise AGI of self and adjacent familiars."
    },

    10 : {
        name: "Scythe Storm", skillType: 2, skillFunc: 3, skillCalcType: 3,
        skillFuncArg1: 1, 
        skillRange: 8, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy AGI-based damage to all foes."
    },

    11 : {
        name: "Torrent of Flame", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 2, 
        skillRange: 8, maxProbability: 30, ward: "BREATH",
        description: "Deal heavy damage to all foes."
    },

    17 : {
        name: "Berserk", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 0.8, 
        skillRange: 17, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal damage to six random targets."
    },

    18 : {
        name: "Rush", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 0.7,  
        skillRange: 17, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal AGI-based damage to six random targets."
    },
    
    23 : {
        name: "Breath of Flame", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 2.5,  
        skillRange: 7, maxProbability: 30, ward: "BREATH",
        description: "Deal heavy damage to three foes."
    },

    26 : {
        name: "Greater Heal", skillType: 2, skillFunc: 18, skillCalcType: 4,
        skillFuncArg1: 1, 
        skillRange: 2, maxProbability: 30,
        description: "Restore a fixed amount of HP to adjacent familiars."
    },

    27 : {
        name: "Greater Healing Sage", skillType: 2, skillFunc: 18, skillCalcType: 4,
        skillFuncArg1: 1, 
        skillRange: 2, maxProbability: 30,
        description: "Restore a fixed amount of HP to adjacent familiars."
    },

    33 : {
        name: "Whirlwind", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 2.5,  
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy AGI-based damage to three foes."
    },

    34 : {
        name: "Massive Assault", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 4,  
        skillRange: 5, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal massive damage to one foe."
    },

    38 : {
        name: "Heal", skillType: 2, skillFunc: 18, skillCalcType: 4,
        skillFuncArg1: 1, 
        skillRange: 1, maxProbability: 30,
        description: "Restore a fixed amount of HP to an adjacent familiar."
    },

    39 : {
        name: "Healing Sage", skillType: 2, skillFunc: 18, skillCalcType: 4,
        skillFuncArg1: 1, 
        skillRange: 1, maxProbability: 30,
        description: "Restore a fixed amount of HP to an adjacent familiar."
    },

    40 : {
        name: "Firestrike", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 3,  
        skillRange: 5, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy damage to one foe."
    },

    43 : {
        name: "Windlash", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 1,  
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },

    46 : {
        name: "Brawl", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1,  
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Attack three foes."
    },

    47 : {
        name: "Blastwave", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 2,  
        skillRange: 12, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy damage to all foes in the front line."
    },

    60: {
        name: "Syphon", skillType: 3, skillFunc: 11, skillCalcType: 1,
        skillFuncArg1: 1, 
        skillRange: 1, maxProbability: 50,
        description: "Heal an adjacent familiar for the amount of damage taken."
    },

    61: {
        name: "Cloak & Dagger", skillType: 5, skillFunc: 14, skillCalcType: 1,
        skillFuncArg1: 1, 
        skillRange: 2, maxProbability: 50, ward: "PHYSICAL",
        description: "Take damage in place of nearby ally and counter."
    },

    62: {
        name: "Cloak", skillType: 5, skillFunc: 12, skillCalcType: 1,
        skillFuncArg1: 1, 
        skillRange: 2, maxProbability: 50
    },

    63: {
        name: "Shroud", skillType: 5, skillFunc: 12, skillCalcType: 0,
        skillFuncArg1: 0, 
        skillRange: 4, maxProbability: 50
    },

    64: {
        name: "Riposte", skillType: 3, skillFunc: 13, skillCalcType: 1,
        skillFuncArg1: 1, 
        skillRange: 1, maxProbability: 50, ward: "PHYSICAL",
        description: "Counterattack after receiving an attack."
    },

    71: {
        name: "Icicle", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 3, 
        skillRange: 5, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy damage to one foe."
    },

    85: {
        name: "Grace of Winds 2", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.2, skillFuncArg2: 4, 
        skillRange: 4, maxProbability: 70,
        description: "Raise AGI of all familiars."
    },

    94: {
        name: "Grace of Winds 3", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.3, skillFuncArg2: 4, 
        skillRange: 4, maxProbability: 70,
        description: "Raise AGI of all familiars."
    },

    108 : {
        name: "Icestorm", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 2,  
        skillRange: 8, maxProbability: 30, ward: "BREATH",
        description: "Deal ice damage to all foes."
    },

    109 : {
        name: "Plasma Field", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 2,  
        skillRange: 8, maxProbability: 30, ward: "MAGICAL",
        description: "Deal lightning damage to all foes."
    },

    110 : {
        name: "Typhoon", skillType: 2, skillFunc: 4, skillCalcType: 3, 
        skillFuncArg1: 2,  
        skillRange: 8, maxProbability: 30, ward: "MAGICAL",
        description: "Deal AGI-based damage to all foes."
    },

    111 : {
        name: "Whorl of Wisdom", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1,  
        skillRange: 16, maxProbability: 30, ward: "MAGICAL",
        description: "Deal WIS-based damage to three foes."
    },

    112 : {
        name: "Whorl of Attack", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1,  
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to three foes."
    },

    113 : {
        name: "Thundercloud", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1, skillFuncArg2: 2, skillFuncArg3: 0.3, 
        skillRange: 7, maxProbability: 30, ward: "MAGICAL",
        description: "Deal damage and sometimes paralyze three foes."
    },
    
    114 : {
        name: "Electric Shock", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 2.5,  
        skillRange: 7, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy lightning damage to three foes."
    },

    115 : {
        name: "Venomstorm", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.5, skillFuncArg2: 1, skillFuncArg3: 1, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy poison damage to three foes."
    },

    116 : {
        name: "Mass Greater Heal", skillType: 2, skillFunc: 18, skillCalcType: 4, 
        skillFuncArg1: 0.7,  
        skillRange: 4, maxProbability: 30,
        description: "Restore a fixed amount of HP to all party members."
    },

    117 : {
        name: "Hellfire", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1,  
        skillRange: 8, maxProbability: 30, ward: "MAGICAL",
        description: "Hurl a ball of flame to damage all foes."
    },
    
    118 : {
        name: "Slashing Blade", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1,  
        skillRange: 8, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to all foes."
    },

    119 : {
        name: "Flash of Rage", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 0.9,  
        skillRange: 17, maxProbability: 30, ward: "MAGICAL",
        description: "Call down six random lightning bolts on foes."
    },

    120 : {
        name: "Boon of Mind & Shield 2", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.2, skillFuncArg2: 3, skillFuncArg3: 2,
        skillRange: 4, maxProbability: 70,
        description: "Raise WIS and DEF of all party members."
    },

    122 : {
        name: "Frontal Onslaught", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.5, 
        skillRange: 12, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy damage to the front line."
    },

    123 : {
        name: "Flame Fist", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.7,  
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy fire damage to three random targets."
    },

    124 : {
        name: "Ice Fist", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.7, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ice damage to three random targets."
    },

    125: {
        name: "Shield & Dagger", skillType: 5, skillFunc: 14, skillCalcType: 1,
        skillFuncArg1: 1, 
        skillRange: 4, maxProbability: 50, ward: "PHYSICAL",
        description: "Take damage in place of any ally and counter."
    },

    128: {
        name: "Whiteout", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 2.3, skillFuncArg2: 3, skillFuncArg3: 0.3,
        skillRange: 7, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy damage and sometimes freeze three foes."
    },

    131: {
        name: "Bloodlust Lance", skillType: 2, skillFunc: 4, skillCalcType: 1,
        skillFuncArg1: 1, 
        skillRange: 8, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to all foes, regardless of position."
    },

    132 : {
        name: "Boon of Blade & Wind 2", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.2, skillFuncArg2: 1, skillFuncArg3: 4,
        skillRange: 4, maxProbability: 70,
        description: "Raise ATK and AGI of all party members."
    },

    133 : {
        name: "Blade Ward 2", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.4, skillFuncArg2: 5, 
        skillRange: 4, maxProbability: 70,
        description: "Reduce physical damage taken by all allies."
    },
    
    134 : {
        name: "Magic Ward 2", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.4, skillFuncArg2: 6, 
        skillRange: 4, maxProbability: 70,
        description: "Reduce magic damage taken by all allies."
    },

    137 : {
        name: "Binding Arcana", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1, skillFuncArg2: 5, skillFuncArg3: 0.3, skillFuncArg4: 3,
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal four physical strikes that sometimes silence foes."
    },
    
    138 : {
        name: "Head Bash", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 3,  
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy physical damage to two random targets."
    },
    
    139 : {
        name: "Mad Dash", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 2,  
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL"
    },

    141 : {
        name: "Burning Rage", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 0.9, 
        skillRange: 17, maxProbability: 30, ward: "MAGICAL",
        description: "Engulf six random foes in flames."
    },
    
    142 : {
        name: "Barrage", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 0.9,  
        skillRange: 20, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal physical damage to five random targets."
    },

    144 : {
	    name: "Windcrush", skillType: 2, skillFunc: 4, skillCalcType: 2,  
	    skillFuncArg1: 1,   
        skillRange: 19, maxProbability: 30, ward: "MAGICAL",
	    description: "Deal heavy damage to four foes." 
	},

    145 : {
	    name: "Mass Greater Heal 2", skillType: 2, skillFunc: 18, skillCalcType: 4,  
	    skillFuncArg1: 2,   
        skillRange: 4, maxProbability: 30,
	    description: "Restore a fixed amount of HP to all party members." 
	},

    146 : {
	    name: "Ritual of Binding", skillType: 1, skillFunc: 19, skillCalcType: 0,  
	    skillFuncArg1: 0, skillFuncArg2: 5, skillFuncArg3: 0.3, skillFuncArg4: 3,
        skillRange: 8, maxProbability: 70,
	    description: "Chance to silence all foes at beginning of battle." 
	},

    149 : {
        name: "Spiteful Strike", skillType: 2, skillFunc: 21, skillCalcType: 1, 
        skillFuncArg1: 1, skillFuncArg2: 2, skillFuncArg3: 0.3, skillFuncArg4: 0.2, 
        skillRange: 8, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal damage to all foes and sometimes lower DEF."
    },

    150 : {
	    name: "Grin and Bear It", skillType: 3, skillFunc: 20, skillCalcType: 0,  
	    skillFuncArg1: 0.5,   
        skillRange: 21, maxProbability: 70,
	    description: "Survive devastating damage as long as HP is above 50%." 
	},

    152 : {
	    name: "Mad Swing", skillType: 2, skillFunc: 4, skillCalcType: 1,  
	    skillFuncArg1: 1.7,   
        skillRange: 7, maxProbability: 30, ward: "PHYSICAL",
	    description: "Deal heavy damage to three foes with a mighty swing." 
	},

    154: {
        name: "Cloak & Dagger 2", skillType: 5, skillFunc: 14, skillCalcType: 1,
        skillFuncArg1: 1.5, 
        skillRange: 2, maxProbability: 50, ward: "PHYSICAL",
        description: "Take heavy damage in place of nearby ally and counter."
    },

    155 : {
        name: "Firecell Roar", skillType: 2, skillFunc: 22, skillCalcType: 2, 
        skillFuncArg1: 1.5, skillFuncArg2: 1, skillFuncArg3: 0.3, skillFuncArg4: 0.2, 
        skillRange: 16, maxProbability: 30, ward: "MAGICAL",
        description: "Three random fire strikes that sometimes lower ATK."
    },

    156 : {
        name: "Rebuke", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 2,  
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy AGI-based damage to two random foes."
    },

    160 : {
        name: "Ice Fang", skillType: 2, skillFunc: 4, skillCalcType: 1, 
        skillFuncArg1: 1.5, skillFuncArg2: 3, skillFuncArg3: 0.3, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deals heavy ice damage and sometimes freeze three foes."
    },
    
    161 : {
        name: "Shadow Strike", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 1,  
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal AGI-based damage to four random foes."
    },

    163 : {
        name: "Poison Mist", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 2.3, skillFuncArg2: 1, skillFuncArg3: 0.3, 
        skillRange: 7, maxProbability: 30, ward: "MAGICAL",
        description: "Deal massive damage and sometimes poison up to three foes."
    },

    164 : {
        name: "Boon of Mind & Blade 2", skillType: 1, skillFunc: 1, skillCalcType: 0, 
        skillFuncArg1: 0.2, skillFuncArg2: 1, skillFuncArg3: 3, 
        skillRange: 4, maxProbability: 70,
        description: "Raise the ATK and WIS of all party members."
    },

    165 : {
        name: "Furious Cannon", skillType: 2, skillFunc: 22, skillCalcType: 2, 
        skillFuncArg1: 1, skillFuncArg2: 1, skillFuncArg3: 0.3, skillFuncArg4: 0.5, 
        skillRange: 8, maxProbability: 30, ward: "MAGICAL",
        description: "Deal fire damage to all foes and sometimes lower ATK."
    },

    166 : {
        name: "Payback", skillType: 3, skillFunc: 13, skillCalcType: 1,
        skillFuncArg1: 2.3, 
        skillRange: 21, maxProbability: 50, ward: "PHYSICAL",
        description: "Chance to unleash a massive counter attack when struck."
    },
    
    167 : {
        name: "Bulwark", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.4, skillFuncArg2: 5, 
        skillRange: 3, maxProbability: 70,
        description: "Reduce physical damage taken by self and nearby familiars."
    },

    168 : {
        name: "Frost and Ice", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 0.8, skillFuncArg2: 3, skillFuncArg3: 0.3,
        skillRange: 17, maxProbability: 30, ward: "MAGICAL",
        description: "Deal damage and sometimes freeze six random foes."
    },

    170 : {
        name: "War Dance", skillType: 2, skillFunc: 4, skillCalcType: 3,
        skillFuncArg1: 1.5,
        skillRange: 15, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy AGI-based damage to foes in front and middle."
    },

    177 : {
        name: "Divine Shield", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.65, skillFuncArg2: 5, 
        skillRange: 21, maxProbability: 70,
        description: "Escape most damage from physical attacks."
    },

    179 : {
        name: "Sword of Justice", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 2.5,  
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal massive AGI-based damage to two random foes."
    },

    180: {
        name: "Proxy Counter", skillType: 5, skillFunc: 14, skillCalcType: 1,
        skillFuncArg1: 1, 
        skillRange: 28, maxProbability: 50, ward: "PHYSICAL",
        description: "Counter when the familiar to the right is hit."
    },

    185: {
        name: "Thunderclap", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 0.7, skillFuncArg2: 2, skillFuncArg3: 0.3,
        skillRange: 20, maxProbability: 30, ward: "MAGICAL",
        description: "Deal WIS-based damage to five random foes and sometimes paralyze them."
    },

    186: {
        name: "Razor Claws", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 2, skillFuncArg2: 2, skillFuncArg3: 0.5,
        skillRange: 6, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal massive damage and sometimes paralyze two foes."
    },

    195 : {
        name: "Warrior's Wrath", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 2,  
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal massive ATK-based damage to two random foes."
    },
    
    196 : {
        name: "Spark Shot", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 0.8,  
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to four random foes."
    },

    197 : {
        name: "Revitalize", skillType: 2, skillFunc: 18, skillCalcType: 4, 
        skillFuncArg1: 1.5,  
        skillRange: 4, maxProbability: 30,
        description: "Restore HP to all party members."
    },

    199 : {
        name: "Cruelest Touch", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 0.75, skillFuncArg2: 1, skillFuncArg3: 0.25, 
        skillRange: 17, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage and sometimes poison six random foes."
    },

    202 : {
        name: "Trial by Fire", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 2,  
        skillRange: 6, maxProbability: 30, ward: "BREATH",
        description: "Deal massive WIS-based fire damage to two foes."
    },

    203 : {
        name: "Trial by Ice", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 2, skillFuncArg2: 3, skillFuncArg3: 0.3, 
        skillRange: 6, maxProbability: 30, ward: "BREATH",
        description: "Deal massive WIS-based water damage to two foes."
    },

    204 : {
        name: "Frozen Spear", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 3, skillFuncArg2: 3, skillFuncArg3: 0.7, 
        skillRange: 5, maxProbability: 30, ward: "MAGICAL",
        description: "Deal massive damage and sometimes freeze one foe."
    },

    205 : {
        name: "Crushing Hammer", skillType: 2, skillFunc: 4, skillCalcType: 1, 
        skillFuncArg1: 1, skillFuncArg2: 3, skillFuncArg3: 0.3, 
        skillRange: 8, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal physical damage and sometimes freeze all foes"
    },

    210 : {
        name: "Poison Spout", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.2, skillFuncArg2: 1, skillFuncArg3: 0.3, 
        skillRange: 19, maxProbability: 30, ward: "BREATH",
        description: "Deal WIS-based damage and sometimes poison four random foes."
    },

    211 : {
        name: "Requiem", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1, skillFuncArg2: 5, skillFuncArg3: 0.3, skillFuncArg4: 3, 
        skillRange: 8, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal physical damage and sometimes silence all foes."
    },
    
    212 : {
        name: "Ghasthunt", skillType: 2, skillFunc: 3, skillCalcType: 2, 
        skillFuncArg1: 1.2,  
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal WIS-based damage to four random foes."
    },

    214 : {
        name: "Blade of Madness", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.35,  
        skillRange: 8, maxProbability: 30, ward: "PHYSICAL",
        description: "Deals ATK-based damage to all foes."
    },
    
    216 : {
        name: "Bodycheck", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 2.5,  
        skillRange: 6, maxProbability: 30, ward: "PHYSICAL",
    },

    217 : {
        name: "Harrowing Trial", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 2.5, 
        skillRange: 23, maxProbability: 30, ward: "MAGICAL"
    },

    219 : {
        name: "Evil Eye", skillType: 2, skillFunc: 21, skillCalcType: 3, 
        skillFuncArg1: 1.2, skillFuncArg2: 4, skillFuncArg3: 0.3, skillFuncArg4: 0.3, 
        skillRange: 8, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal AGI-based damage and lower AGI of all foes."
    },

    221 : {
        name: "Skittering Darkness", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.5,  
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to three foes."
    },

    222 : {
        name: "Boastful Blade", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.9,  
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal massive ATK-based damage to two random foes."
    },

    224 : {
        name: "Feather Shot", skillType: 2, skillFunc: 4, skillCalcType: 1,
        skillFuncArg1: 2.1, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal massive ATK-based damage to three random foes."
    },

    225 : {
        name: "Wings of Winter", skillType: 2, skillFunc: 3, skillCalcType: 3,
        skillFuncArg1: 0.8, 
        skillRange: 20, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal AGI-based damage to five random foes."
    },

    227 : {
        name: "Muscle Play", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.65, 
        skillRange: 7, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal massive ATK-based damage to three foes."
    },

    229 : {
        name: "Spirit Word", skillType: 2, skillFunc: 3, skillCalcType: 2, 
        skillFuncArg1: 2.1,  
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },

    231 : {
        name: "Rolling Thunder", skillType: 2, skillFunc: 21, skillCalcType: 3, 
        skillFuncArg1: 1.25, skillFuncArg2: 1, skillFuncArg3: 0.3, skillFuncArg4: 0.2, 
        skillRange: 8, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal AGI-based damage to all foes and sometimes lower ATK."
    },

    232 : {
        name: "Lightning web", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 2.15, skillFuncArg2: 2, skillFuncArg3: 0.3, 
        skillRange: 16, maxProbability: 30, ward: "MAGICAL",
        description: "Deal massive WIS-based damage and sometimes paralyze three foes."
    },

    234 : {
        name: "Lightning Spirits", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.15,  
        skillRange: 20, maxProbability: 30, ward: "MAGICAL",
        description: "Deal WIS-based damage to five random foes."
    },

    236: {
        name: "Flash", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 2.25, 
        skillRange: 16, maxProbability: 30, ward: "MAGICAL"
    },

    238 : {
        name: "Shadow Slash", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.05,  
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL"
    },
    
    239 : {
        name : "Dark Rush", skillType: 2, skillFunc: 4, skillCalcType: 3,
        skillFuncArg1: 2, 
        skillRange: 16, maxProbability: 30, ward: "MAGICAL"
    },
    
    240 : {
        name : "Midnight Smile", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.2, skillFuncArg2: 4, 
        skillRange: 3, maxProbability: 70,
        description: "Raise AGI of self and adjacent familiars at start of battle."
    },

    241 : {
        name : "Chillling Blast", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.7, skillFuncArg2: 3, skillFuncArg3: 0.3,
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage and sometimes freeze three random foes."
    },

    242 : {
        name : "Glacial Blade", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1.7, skillFuncArg2: 3, skillFuncArg3: 0.3,
        skillRange: 7, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy WIS-based damage and sometimes freeze up to three foes, regardless of position."
    },

    244 : {
        name : "High Spirits", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1.6, 
        skillRange: 19, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy WIS-based damage to four random foes, regardless of position."
    },

    245 : {
        name : "Brave Blade", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1.2, 
        skillRange: 8, maxProbability: 30, ward: "MAGICAL",
        description: "Deal WIS-based damage to all foes, regardless of position."
    },

    249 : {
        name: "Steelscales", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 0.9,  
        skillRange: 17, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to six random foes."
    },

    250 : {
        name: "Goddess of the Deep", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 1.6,  
        skillRange: 7, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy AGI-based damage to three foes."
    },

    251 : {
        name: "Hungry Beak", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1,  
        skillRange: 20, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to five random foes."
    },

    253 : {
        name: "Brutal Fist", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 2.1,  
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL"
    },

    254 : {
        name: "Roving Fang", skillType: 2, skillFunc: 3, skillCalcType: 3,
        skillFuncArg1: 1.6, 
        skillRange: 12, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy AGI-based damage to all foes in the front line."
    },

    256 : {
        name: "Silent Madness", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.3,  
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to three foes."
    },
    
    258 : {
        name: "Fatal Kiss", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.35,  
        skillRange: 8, maxProbability: 30, ward: "MAGICAL",
        description: "Deal WIS-based damage to all foes, regardless of position."
    },

    259 : {
        name: "Hell Spark", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.1,  
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to four random foes."
    },

    260 : {
        name: "Curse of Ages", skillType: 2, skillFunc: 21, skillCalcType: 3, 
        skillFuncArg1: 0.7, skillFuncArg2: 1, skillFuncArg3: 0.3, skillFuncArg4: 0.2, 
        skillRange: 17, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal AGI-based damage to six random foes and sometimes lower ATK."
    },

    261 : {
        name: "Groundswell", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.15,  
        skillRange: 8, maxProbability: 30, ward: "MAGICAL",
        description: "Deal WIS-based damage to all foes."
    },

    263 : {
        name: "Judgment", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.75,  
        skillRange: 7, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to up to three foes."
    },

    264 : {
        name: "Bone Crush", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.95,  
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal massive ATK-based damage to three random foes."
    },

    265 : {
        name: "Ancient Feast", skillType: 1, skillFunc: 1, skillCalcType: 0, 
        skillFuncArg1: 0.5, skillFuncArg2: 1,  
        skillRange: 3, maxProbability: 70,
        description: "Raise ATK of self and adjacent familiars at beginning of battle."
    },

    267 : {
        name: "Swordmaster", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 2.4,  
        skillRange: 7, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal massive AGI-based damage to three foes."
    },

    268 : {
        name: "Gaoler's Torment", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 1.65,  
        skillRange: 15, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy AGI-based damage to front/middle lines."
    },

    269 : {
        name: "Tears of the Hideous", skillType: 2, skillFunc: 4, skillCalcType: 3, 
        skillFuncArg1: 2.05,  
        skillRange: 16, maxProbability: 30, ward: "MAGICAL",
        description: "Deal massive AGI-based damage to three random foes regardless of position."
    },
    
    270 : {
        name: "Withering Flame", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.7,  
        skillRange: 19, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy WIS-based damage to four random foes, regardless of position."
    },
    
    271 : {
        name: "Scales of Tranquility", skillType: 1, skillFunc: 19, skillCalcType: 0, 
        skillFuncArg1: 0, skillFuncArg2: 5, skillFuncArg3: 0.45, skillFuncArg4: 1, 
        skillRange: 7, maxProbability: 70,
        description: "Chance to silence three foes for one turn at start of battle."
    },

    274 : {
        name: "Eternal Sleep", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 1.5,  
        skillRange: 32, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy AGI-based damage to up to four foes."
    },
    
    275 : {
        name: "Blinding Light", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.7,  
        skillRange: 16, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy WIS-based damage to three random foes, regardless of position."
    },

    276 : {
        name: "Divine Grief", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 2,  
        skillRange: 23, maxProbability: 30, ward: "MAGICAL",
        description: "Deal Massive WIS-based damage to two random foes, regardless of position."
    },
    
    277 : {
        name: "Nightmarish Notion", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.1, skillFuncArg2: 3, skillFuncArg3: 0.3, 
        skillRange: 20, maxProbability: 30, ward: "BREATH",
        description: "Deal WIS-based damage and sometimes freeze five random foes, regardless of position."
    },

    280: {
        name: "Snake Charmer", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 2.05, 
        skillRange: 16, maxProbability: 30, ward: "MAGICAL",
        description: "Deal massive WIS-based damage to three random foes, regardless of position."
    },

    281: {
        name: "Snake Eyes", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 2.1, skillFuncArg2: 2, skillFuncArg3: 0.3,
        skillRange: 7, maxProbability: 30, ward: "MAGICAL",
        description: "Deal massive WIS-based damage and sometimes paralyze up to three foes."
    },

    282: {
        name: "Corpse Hymn", skillType: 2, skillFunc: 4, skillCalcType: 3,
        skillFuncArg1: 1, 
        skillRange: 20, maxProbability: 30, ward: "MAGICAL",
        description: "Deal AGI-based damage to five random foes, regardless of position."
    },

    287: {
        name: "Staff of Knowledge", skillType: 2, skillFunc: 18, skillCalcType: 4,
        skillFuncArg1: 1.3, 
        skillRange: 3, maxProbability: 70,
        description: "High chance to restore HP to self and adjacent familiars."
    },

    288: {
        name: "Chain Attack", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 0.95, 
        skillRange: 17, maxProbability: 30, ward: "MAGICAL",
        description: "Deal WIS-based damage to six random foes, regardless of position."
    },

    289: {
        name: "Quakeblade", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.35, 
        skillRange: 15, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage front/middle lines."
    },

    291 : {
	    name: "Grin and Bear It 2", skillType: 3, skillFunc: 20, skillCalcType: 0,  
	    skillFuncArg1: 0.01,   
        skillRange: 21, maxProbability: 70,
	    description: "Survive devastating damage as long as HP is above 1%." 
	},

    292: {
        name: "Golden Rule", skillType: 2, skillFunc: 4, skillCalcType: 1,
        skillFuncArg1: 2.1, 
        skillRange: 7, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal massive ATK-based damage to three foes, regardless of position."
    },

    293: {
        name: "Cruel Flame", skillType: 2, skillFunc: 4, skillCalcType: 1,
        skillFuncArg1: 1.7, 
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to four random foes, regardless of position."
    },

    294 : {
        name: "Mocking Laugh", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 2.5,  
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal massive ATK-based damage to two random foes."
    },

    295 : {
        name: "Dream Lure", skillType: 1, skillFunc: 19, skillCalcType: 0, 
        skillFuncArg1: 0, skillFuncArg2: 4, skillFuncArg3: 0.25, 
        skillRange: 7, maxProbability: 70,
        description: "Sometimes disable three foes at start of battle."
    },

    296 : {
        name: "Blood Offering", skillType: 2, skillFunc: 4, skillCalcType: 1, 
        skillFuncArg1: 1.2, skillFuncArg2: 4, skillFuncArg3: 0.3, 
        skillRange: 17, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage and disable six random foes, regardless of position."
    },

    297 : {
        name: "Awe of the Wild", skillType: 2, skillFunc: 4, skillCalcType: 3, 
        skillFuncArg1: 2.15,  
        skillRange: 16, maxProbability: 30, ward: "MAGICAL",
        description: "Deal massive AGI-based damage to three random foes, regardless of position."
    },

    298 : {
        name: "Freezing Scales", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.35, skillFuncArg2: 3, skillFuncArg3: 0.3, 
        skillRange: 8, maxProbability: 30, ward: "MAGICAL",
        description: "Deal WIS-based damage to all foes and sometimes freeze them, regardless of position."
    },

    299 : {
        name: "Crazed Axe", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.7,  
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to three random foes."
    },

    301 : {
	    name: "Fortitude", skillType: 3, skillFunc: 20, skillCalcType: 0,  
	    skillFuncArg1: 0.2,   
        skillRange: 21, maxProbability: 70,
	    description: "Survive devastating damage as long as HP is above 20%." 
	},
    
    302 : {
        name: "Ice Wall", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.4,  
        skillRange: 8, maxProbability: 30, ward: "BREATH"
    },

    303 : {
        name: "Chill Horn", skillType: 2, skillFunc: 3, skillCalcType: 2, 
        skillFuncArg1: 1.9,  
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy WIS-based damage to three random foes, regardless of position."
    },

    304 : {
        name: "Ferocious Omen", skillType: 1, skillFunc: 1, skillCalcType: 0, 
        skillFuncArg1: 0.1, skillFuncArg2: 1,  
        skillRange: 3, maxProbability: 70,
        description: "Raise ATK of self and adjacent familiars."
    },

    305 : {
        name: "Dancing Flame", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.3,  
        skillRange: 19, maxProbability: 30, ward: "BREATH",
        description: "Deal WIS-based damage to four random foes, regardless of position."
    },

    307 : {
        name: "Evil Wink", skillType: 2, skillFunc: 3, skillCalcType: 2, 
        skillFuncArg1: 1.8,  
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },

    308 : {
        name: "Bloodied Hands", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.7,  
        skillRange: 19, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy WIS-based damage to four random foes."
    },

    311 : {
        name: "Black Phantasm", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.75,  
        skillRange: 6, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to two foes."
    },

    312 : {
        name: "Demon Spear", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.75,  
        skillRange: 6, maxProbability: 30, ward: "PHYSICAL",
        description: "A spear technique from the West. Deal heavy ATK-based damage to two foes."
    },
    
    313 : {
        name: "White Ruin", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.5,  
        skillRange: 8, maxProbability: 30, ward: "BREATH"
    },
    
    314 : {
        name: "Fearless Laugh", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.3,  
        skillRange: 32, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to up to four foes."
    },

    315 : {
        name: "Trembling Horn", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.3,  
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to four random foes."
    },

    316 : {
        name: "Healing Prism", skillType: 3, skillFunc: 11, skillCalcType: 1, 
        skillFuncArg1: 1,  
        skillRange: 3, maxProbability: 30,
        description: "Convert damage to heal self and adjacent familiars"
    },

    317 : {
        name: "Mad Swing 2", skillType: 2, skillFunc: 4, skillCalcType: 1, 
        skillFuncArg1: 1.9,  
        skillRange: 7, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy damage to three foes with a mighty swing."
    },

    319: {
        name: "Magic Overwhelming", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1.55, 
        skillRange: 19, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy WIS-based damage to four random foes, regardless of position."
    },

    320: {
        name: "Mystic Teachings", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.1, skillFuncArg2: 3, 
        skillRange: 3, maxProbability: 70,
        description: "Raise WIS of self and adjacent familiars at beginning of battle."
    },

    321 : {
        name: "Roaring Blood", skillType: 2, skillFunc: 3, skillCalcType: 2, 
        skillFuncArg1: 0.95,  
        skillRange: 17, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal WIS-based damage to six random foes."
    },

    322 : {
        name: "Cruel Dance", skillType: 2, skillFunc: 4, skillCalcType: 3, 
        skillFuncArg1: 1.5,  
        skillRange: 15, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy AGI-based damage to front/middle lines, regardless of position."
    },

    325: {
        name: "Rippling Flame", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.85, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to three random foes."
    },

    326 : {
        name: "Heart of the Warrior", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.6,  
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to three random foes."
    },

    327 : {
        name: "Test of Courage", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.6,  
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to three random foes."
    },

    330 : {
	    name: "Dark Blessing", skillType: 1, skillFunc: 19, skillCalcType: 0,  
	    skillFuncArg1: 0, skillFuncArg2: 5, skillFuncArg3: 0.45, skillFuncArg4: 1,
        skillRange: 7, maxProbability: 70,
	    description: "Chance to silence three foes at beginning of battle, regardless of position." 
	},

    331 : {
        name: "Light Divine", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.2,  
        skillRange: 17, maxProbability: 30, ward: "MAGICAL",
        description: "Deal WIS-based damage to six random foes, regardless of position."
    },

    333 : {
        name: "Cold-Blooded Smile", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 1.2, skillFuncArg2: 3, skillFuncArg3: 0.3, 
        skillRange: 8, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal AGI-based damage and sometimes freeze all foes."
    },

    334 : {
        name: "Gift of Terror", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.5, 
        skillRange: 16, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy WIS-based damage to three random foes."
    },

    339 : {
        name: "Burning Scales", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 2,  
        skillRange: 15, maxProbability: 30, ward: "BREATH",
        description: "Deal massive WIS-based damage to all foes in the front/middle lines, regardless of position."
    },
    
    340 : {
        name: "Penance", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.25,  
        skillRange: 8, maxProbability: 30, ward: "PHYSICAL",
    },

    341 : {
        name: "Staff of Ages", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 1.15,  
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL"
    },

    343 : {
        name: "Curiosity", skillType: 2, skillFunc: 21, skillCalcType: 2, 
        skillFuncArg1: 1.5, skillFuncArg2: 4, skillFuncArg3: 0.3, skillFuncArg4: 0.3, 
        skillRange: 8, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy WIS-based damage to all foes, sometimes lowering AGI."
    },
    
    349 : {
        name : "Staff of Tyranny", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.55, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },

    351 : {
        name: "Sword of Fealty", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.3,  
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to four random foes."
    },

    353 : {
        name: "Icerend Claws", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.45, skillFuncArg2: 3, skillFuncArg3: 0.3, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to three random foes and sometimes freeze them."
    },

    354 : {
        name: "Venomspray Staff", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 2.9, skillFuncArg2: 1, skillFuncArg3: 0.3, 
        skillRange: 23, maxProbability: 30, ward: "MAGICAL",
        description: "Deal massive WIS-based damage to two random foes and sometimes envenom them."
    },

    358 : {
        name: "Call of Steel", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.3, skillFuncArg2: 5, skillFuncArg3: 0.1, skillFuncArg4: 3, 
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage and sometimes silence four random foes."
    },

    359 : {
        name: "Seeping Darkness", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.25,  
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to three random foes."
    },

    360: {
        name: "Curse of Wrath", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1, 
        skillRange: 17, maxProbability: 30, ward: "MAGICAL",
        description: "Deal WIS-based damage to six random foes, regardless of position."
    },
    
    361: {
        name: "Resplendent Light", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1, 
        skillRange: 20, maxProbability: 30, ward: "MAGICAL",
        description: "Deal ATK-based damage to five random foes."
    },    

    362 : {
        name: "Rite of Vengeance", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.85,  
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL"
    },

    365 : {
        name: "Bug Attack", skillType: 2, skillFunc: 4, skillCalcType: 1, 
        skillFuncArg1: 1.95,  
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to three random foes, regardless of position."
    },

    366 : {
        name: "Bone Chill", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.7,  
        skillRange: 32, maxProbability: 30, ward: "BREATH"
    },

    369 : {
        name: "Stone Rain", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.45,  
        skillRange: 7, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage up to three foes."
    },

    370 : {
        name: "Dust Cloud", skillType: 1, skillFunc: 1, skillCalcType: 0, 
        skillFuncArg1: 1, skillFuncArg2: 18,  
        skillRange: 132, maxProbability: 70,
        description: "Allows two random allies to perform an extra action during the next turn."
    },

    372 : {
        name: "Curse Foil", skillType: 3, skillFunc: 13, skillCalcType: 1, 
        skillFuncArg1: 1.3,  
        skillRange: 21, maxProbability: 50, ward: "PHYSICAL",
        description: "Chance to unleash a counter attack when struck."
    },

    374 : {
        name: "Streaming Feathers", skillType: 3, skillFunc: 11, skillCalcType: 1, 
        skillFuncArg1: 1,  
        skillRange: 3, maxProbability: 50,
        description: "Convert damage to heal self and adjacent familiars."
    },

    375 : {
        name: "Windcutter Blade", skillType: 2, skillFunc: 4, skillCalcType: 1, 
        skillFuncArg1: 2,  
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal massive ATK-based damage to three random foes, regardless of position."
    },

    378 : {
        name: "Blade Flurry", skillType: 2, skillFunc: 21, skillCalcType: 3, 
        skillFuncArg1: 1, skillFuncArg2: 1, skillFuncArg3: 0.3, skillFuncArg4: 0.3, 
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal AGI-based damage to four random foes and sometimes lower ATK."
    },

    379 : {
        name: "Dragon Aura", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.9,  
        skillRange: 16, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy WIS-based damage to three random foes, regardless of position."
    },
    
    380 : {
        name : "Feral Claws", skillType: 2, skillFunc: 3, skillCalcType: 3,
        skillFuncArg1: 0.95, 
        skillRange: 17, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal AGI-based damage to six random foes."
    },
    
    381 : {
        name : "Lion's Roar", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.4, skillFuncArg2: 6, skillFuncArg3: 7,
        skillRange: 3, maxProbability: 70,
        description: "Reduce magic and breath damages taken by self and adjacent familiars."
    },

    383 : {
        name: "Flame of Cinders", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.65, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to three random foes."
    },

    385 : {
        name: "Prominence", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1, 
        skillRange: 20, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to five random foes."
    },

    386 : {
        name: "Sun's Mercy", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.15, skillFuncArg2: 1, 
        skillRange: 3, maxProbability: 70,
        description: "Raise ATK of self and adjacent familiars."
    },

    387 : {
        name: "Earth's Fury", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.35, 
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to four random foes."
    },

    390 : {
        name: "Libra's Retribution", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.6,  
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to three random foes."
    },

    391 : {
        name: "Scatter Arrow", skillType: 2, skillFunc: 4, skillCalcType: 3, 
        skillFuncArg1: 1.3,  
        skillRange: 32, maxProbability: 30, ward: "MAGICAL",
        description: "Deal AGI-based damage to up to four foes, regardless of position."
    },

    394 : {
        name: "Glance", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.7,  
        skillRange: 15, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy WIS-based damage to all foes in the front/middle lines, regardless of position."
    },

    395 : {
        name : "Imperial Audience", skillType: 1, skillFunc: 19, skillCalcType: 0, 
        skillFuncArg1: 0, skillFuncArg2: 5, skillFuncArg3: 0.45, skillFuncArg4: 1,
        skillRange: 7, maxProbability: 70,
        description: "Chance to silence up to three foes for one turn at the start of battle."
    },

    398: {
        name: "Knuckle Guard", skillType: 5, skillFunc: 12, skillCalcType: 0,
        skillFuncArg1: 0, 
        skillRange: 4, maxProbability: 50
    },

    400 : {
        name : "Hatred Blade", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.15, skillFuncArg2: 1, skillFuncArg3: 0.3,
        skillRange: 20, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to five random foes and sometimes poison them."
    },

    401 : {
        name : "Shield of Ruin", skillType: 1, skillFunc: 19, skillCalcType: 0, 
        skillFuncArg1: 0, skillFuncArg2: 1, skillFuncArg3: 0.5, skillFuncArg4: 10,
        skillRange: 7, maxProbability: 70,
        description: "Chance to poison up to three foes at the start of battle."
    },
    
    404 : {
        name : "Niten Ichi-ryu", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.75, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to three random foes."
    },

    405 : {
        name : "Visions of Terror", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.65, skillFuncArg2: 1, skillFuncArg3: 0.3,
        skillRange: 19, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy WIS-based damage to and sometimes poison four random foes, regardless of position."
    },
    
    406 : {
        name: "Piercing Arrow", skillType: 2, skillFunc: 4, skillCalcType: 1, 
        skillFuncArg1: 1.35,  
        skillRange: 8, maxProbability: 30, ward: "PHYSICAL",
    },

    407 : {
        name: "Allure of the Rose", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1.3, 
        skillRange: 20, maxProbability: 30, ward: "MAGICAL"
    },

    408 : {
        name: "Covenant of the Rose", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.15, skillFuncArg2: 4, 
        skillRange: 3, maxProbability: 70
    },

    411 : {
        name: "Winds of Lust", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 2.1, 
        skillRange: 12, maxProbability: 30, ward: "MAGICAL",
        description: "Deal massive WIS-based damage to all foes in the front line, regardless of position."
    },

    412 : {
        name: "Fires of Thirst", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1.2, 
        skillRange: 20, maxProbability: 30, ward: "MAGICAL",
        description: "Deal WIS-based damage to five random foes, regardless of position."
    },

    414 : {
        name: "Putrid Stench", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1.2, skillFuncArg2: 1, skillFuncArg3: 0.25,
        skillRange: 20, maxProbability: 30, ward: "MAGICAL",
        description: "Deals WIS-based damage to and sometimes poison five random foes, regardless of position."
    },

    415 : {
        name: "Sigiled Sanctuary", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.11, skillFuncArg2: 3, 
        skillRange: 3, maxProbability: 70,
        description: "Raise WIS of self and adjacent familiars at start of battle."
    },

    416 : {
        name: "Bone Smasher", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1.5, 
        skillRange: 19, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy WIS-based damage to four random foes, regardless of position."
    },

    418 : {
        name: "Nemesis", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 2.1, 
        skillRange: 7, maxProbability: 30, ward: "MAGICAL",
        description: "Deal massive WIS-based damage to up to three foes, ignoring position."
    },

    419 : {
        name: "Ichthocannon", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1.5, 
        skillRange: 19, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },

    420 : {
        name: "Breaking Wave", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.35, 
        skillRange: 15, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to all foes in the front/middle line."
    },

    424: {
        name: "Ultrasonic", skillType: 2, skillFunc: 4, skillCalcType: 1,
        skillFuncArg1: 1.85, skillFuncArg2: 2, skillFuncArg3: 0.2,
        skillRange: 7, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to and sometimes paralyze up to three foes."
    },

    425: {
        name: "Lese Majesty", skillType: 5, skillFunc: 14, skillCalcType: 1,
        skillFuncArg1: 1.5, 
        skillRange: 4, maxProbability: 50, ward: "PHYSICAL",
        description: "Take damage in place of any ally and unleash a heavy counterattack."
    },

    426: {
        name: "Imperial Gift", skillType: 2, skillFunc: 18, skillCalcType: 4,
        skillFuncArg1: 2, 
        skillRange: 21, maxProbability: 50,
        description: "Restore HP to self."
    },

    427 : {
        name: "Funerary Rush", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.5,  
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },

    438 : {
        name: "Poison Torrent", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.3, skillFuncArg2: 1, skillFuncArg3: 0.25, 
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to and sometimes poison four random foes."
    },
    
    440 : {
        name: "Thunderstroke", skillType: 2, skillFunc: 4, skillCalcType: 3, 
        skillFuncArg1: 2,  
        skillRange: 23, maxProbability: 30, ward: "MAGICAL",
        description: "Deal massive AGI-based damage to two random foes, ignoring position."
    },
    
    441 : {
        name: "Bolt of Judgment", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 2.15,  
        skillRange: 23, maxProbability: 30, ward: "MAGICAL",
        description: "Deal massive WIS-based damage to two random foes, ignoring position."
    },    

    437 : {
        name: "Mjolnir", skillType: 2, skillFunc: 4, skillCalcType: 1,
        skillFuncArg1: 1.5, 
        skillRange: 32, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to up to four foes, ignoring position."
    },

    443 : {
        name: "Fangs of the Devoted", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 2,  
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL"
    },

    444 : {
        name: "Cruel Swing", skillType: 2, skillFunc: 4, skillCalcType: 1, 
        skillFuncArg1: 1.45,  
        skillRange: 8, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to all foes, ignoring position."
    },

    445 : {
	    name: "Bastion", skillType: 3, skillFunc: 20, skillCalcType: 0,  
	    skillFuncArg1: 0.1,   
        skillRange: 21, maxProbability: 70,
	    description: "Survive devastating damage as long as HP is above 10%." 
	},

    446 : {
	    name: "Tail Lash", skillType: 2, skillFunc: 4, skillCalcType: 2,  
	    skillFuncArg1: 1.6,   
        skillRange: 32, maxProbability: 30, ward: "MAGICAL",
	    description: "Deal heavy WIS-based damage to up to four foes, ignoring position." 
	},

    447 : {
        name: "Looming Nightmare", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.6,  
        skillRange: 32, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy WIS-based damage to up to four foes, ignoring position."
    },

    448 : {
        name: "Leo's Claws", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 1.3,  
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal AGI-based damage to four random foes."
    },

    461 : {
        name : "Lion's Wrath", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.35, 
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to four random foes."
    },

    462 : {
        name : "Heroic Might", skillType: 2, skillFunc: 18, skillCalcType: 4,
        skillFuncArg1: 2, 
        skillRange: 113, maxProbability: 50,
        description: "Restore HP to three random familiars."
    },
    
    463 : {
        name : "Absolute Zero", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1.7, skillFuncArg2: 3, skillFuncArg3: 0.25,
        skillRange: 32, maxProbability: 30, ward: "BREATH",
        description: "Deal heavy WIS-based damage and sometimes freeze up to four foes, ignoring position."
    },
    
    464 : {
        name : "Chariot Rush", skillType: 2, skillFunc: 3, skillCalcType: 3,
        skillFuncArg1: 1.8, skillFuncArg2: 2, skillFuncArg3: 0.3,
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL", // check
        description: "Deal heavy AGI-based damage to and sometimes paralyze three random foes."
    },

    465 : {
        name : "Stormcaller Pinion", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1.3, 
        skillRange: 20, maxProbability: 30, ward: "BREATH",
        description: "Deal WIS-based damage to five random foes, ignoring position."
    },
    
    466 : {
        name : "Blade of Judgment", skillType: 2, skillFunc: 4, skillCalcType: 1,
        skillFuncArg1: 1.8, 
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL"
    },
    
    467 : {
        name : "Atonement", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.3, skillFuncArg2: 5, skillFuncArg3: 7,
        skillRange: 4, maxProbability: 70
    },

    468 : {
        name : "Rain of Death", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.7, skillFuncArg2: 1, skillFuncArg3: 0.25, skillFuncArg4: 10,
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage and sometimes envenom three random foes."
    },

    469 : {
        name: "Sand Blade", skillType: 2, skillFunc: 21, skillCalcType: 1, 
        skillFuncArg1: 1.2, skillFuncArg2: 1, skillFuncArg3: 0.3, skillFuncArg4: 0.3, 
        skillRange: 8, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to all foes and sometimes reduce ATK."
    },
    
    471 : {
        name: "Darkflame", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1,  
        skillRange: 17, maxProbability: 30, ward: "MAGICAL",
        description: "Deal WIS-based damage to six random foes, ignoring position."
    },
    
    472 : {
        name: "Nightveil", skillType: 1, skillFunc: 1, skillCalcType: 0, 
        skillFuncArg1: 0.1, skillFuncArg2: 1, skillFuncArg3: 3, 
        skillRange: 3, maxProbability: 70,
        description: "Raise WIS and ATK of self and adjacent familiars at start of battle."
    },

    473 : {
        name: "Entomb", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.15,  
        skillRange: 20, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to five random foes."
    },

    474 : {
        name: "Embalm", skillType: 1, skillFunc: 1, skillCalcType: 0, 
        skillFuncArg1: 0.3, skillFuncArg2: 5,  
        skillRange: 3, maxProbability: 70,
        description: "Reduce physical damage taken by self and adjacent familiars."
    },

    476 : {
        name: "Furious Horns", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 2,  
        skillRange: 16, maxProbability: 30, ward: "MAGICAL",
        description: "Deal massive WIS-based damage to three random foes, ignoring position."
    },

    477 : {
        name: "Chatter Tooth", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.5, skillFuncArg2: 3, skillFuncArg3: 0.3, 
        skillRange: 32, maxProbability: 30, ward: "BREATH",
        description: "Deal heavy WIS-based damage to and sometimes freeze up to four foes, ignoring position."
    },

    478 : {
        name: "Cancer's Claws", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.65, skillFuncArg2: 5, skillFuncArg3: 0.5, skillFuncArg4: 1, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage and sometimes silence three random foes."
    },

    479 : {
        name: "Infiltrate", skillType: 1, skillFunc: 1, skillCalcType: 0, 
        skillFuncArg1: 1, skillFuncArg2: 18, skillFuncArg3: 0, skillFuncArg4: 0, 
        skillRange: 121, maxProbability: 70,
        description: "Allows a random ally to perform an extra action during the next turn."
    },

    484: {
        name: "Wall of the Brave", skillType: 5, skillFunc: 12, skillCalcType: 0,
        skillFuncArg1: 0, 
        skillRange: 4, maxProbability: 50,
        description: "Take damage in place of allies"
    },

    485: {
        name: "Shield of the Coward", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 1, skillFuncArg2: 2, 
        skillRange: 21, maxProbability: 70,
        description: "Raise DEF of self at start of battle."
    },

    489: {
        name: "Hardened Steel", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.7, skillFuncArg2: 5, 
        skillRange: 21, maxProbability: 70,
        description: "Reduce physical damage taken by self greatly."
    },

    490: {
        name: "Steel Hooves", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.2, 
        skillRange: 20, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to five random foes."
    },

    491: {
        name: "Primitive Rage", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.35, 
        skillRange: 32, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to up to four foes."
    },

    492: {
        name: "Razor Pinion", skillType: 2, skillFunc: 4, skillCalcType: 1,
        skillFuncArg1: 1.75, 
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to four random foes, ignoring position."
    },

    497: {
        name: "Mighty Stomp", skillType: 2, skillFunc: 4, skillCalcType: 1,
        skillFuncArg1: 2, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal massive ATK-based damage to three random foes, ignoring position."
    },

    499: {
        name: "Snake Whip", skillType: 2, skillFunc: 4, skillCalcType: 1,
        skillFuncArg1: 1.5, 
        skillRange: 20, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to five random foes, ignoring position."
    },

    500: {
        name: "Spiny Carapace", skillType: 3, skillFunc: 13, skillCalcType: 1,
        skillFuncArg1: 1.2, 
        skillRange: 21, maxProbability: 50, ward: "PHYSICAL",
        description: "Chance to unleash a counter attack when struck."
    },

    10001: { // 100% Mod, Single Hit, WIS-based, position independent
        name: "Standard Action", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1,
        skillRange: 5, maxProbability: 100, ward: "MAGICAL", isAutoAttack: true
    },

    10004: { // 105% Mod, Single Hit, WIS-based, position independent, paralyze (Lahamu)
        name: "Standard Action", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1.05, skillFuncArg2: 2, skillFuncArg3: 0.2,
        skillRange: 5, maxProbability: 100, ward: "MAGICAL", isAutoAttack: true
    },

    10006: { // 105% Mod, 3 Random Hits, ATK-based, position dependent (Ettin)
        name: "Standard Action", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.05, 
        skillRange: 16, maxProbability: 100, ward: "PHYSICAL", isAutoAttack: true
    },

    10007: { // use this for normal wis-based auto skill
        name: "Standard Action", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1, 
        skillRange: 5, maxProbability: 100, ward: "MAGICAL", isAutoAttack: true
    },

    10008: { // 65% Mod, Single Hit, WIS-based, position independent
        name: "Standard Action", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 0.65, 
        skillRange: 5, maxProbability: 100, ward: "MAGICAL", isAutoAttack: true
    },

    10009: { // 100% Mod, Single Hit, WIS-based, position independent, freeze
        name: "Standard Action", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1, skillFuncArg2: 3, skillFuncArg3: 0.1,
        skillRange: 5, maxProbability: 100, ward: "MAGICAL", isAutoAttack: true
    },

    10012: { // 100% Mod, Single Hit, ATK-based, position dependent, poison
        name: "Standard Action", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1, skillFuncArg2: 1, skillFuncArg3: 0.4,
        skillRange: 5, maxProbability: 100, ward: "PHYSICAL", isAutoAttack: true
    },

    10014: { // 100% Mod, Single Hit, ATK-based, position dependent, paralyze
        name: "Standard Action", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1, skillFuncArg2: 2, skillFuncArg3: 0.4,
        skillRange: 5, maxProbability: 100, ward: "PHYSICAL", isAutoAttack: true
    },

    10016: { // same as 10007, but with flame animation
        name: "Standard Action", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1, 
        skillRange: 5, maxProbability: 100, ward: "MAGICAL", isAutoAttack: true
    },

    10017: { // 100% Mod, Single Hit, ATK-based, position dependent, envenom
        name: "Standard Action", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1, skillFuncArg2: 1, skillFuncArg3: 0.4, skillFuncArg4: 10,
        skillRange: 5, maxProbability: 100, ward: "PHYSICAL", isAutoAttack: true
    },

    10020: { // 60% Mod, 2 Random Hits, ATK-based, position dependent
        name: "Standard Action", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 0.6, 
        skillRange: 23, maxProbability: 100, ward: "PHYSICAL", isAutoAttack: true
    },
    
    99000 : {
        name : "Raging Flames", skillType: 2, skillFunc: 3, skillCalcType: 3,
        skillFuncArg1: 2.4, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },
    
    99002 : {
        name : "Inferno", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.4, 
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL"
    }    
};
