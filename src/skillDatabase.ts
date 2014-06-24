"use strict";
/**
 * Some notes:
 * - For attack skills, there has to be a "ward" attribute, which takes a value of "PHYSICAL", "BREATH" or "MAGICAL"
 *   Counter skills also need the above, even though the ward will always be "PHYSICAL" for those skills
 *
 * - For skills with PHYSICAL ward and not random multihitting (like fork, AoE, sweeping...), there has to be a 
 *   "contact" attribute with 1 being "has/does contact"
 *
 * - There is no need for the baseProbability
 */
var SkillDatabase = {

    0: {
        name: "Default auto", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 5, maxProbability: 100, ward: "PHYSICAL"
    },

    2 : {
        name: "Strength of Blades", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.5, skillFuncArg2: 1, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 3, maxProbability: 70
    },

    17 : {
        name: "Berserk", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 0.8, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 17, maxProbability: 30, ward: "PHYSICAL"
    },

    18 : {
        name: "Rush", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 0.7, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 17, maxProbability: 30, ward: "PHYSICAL"
    },
    
    23 : {
        name: "Breath of Flame", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 2.5, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 7, maxProbability: 30, ward: "BREATH"
    },

    33 : {
        name: "Whirlwind", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 2.5, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy AGI-based damage to three foes."
    },

    43 : {
        name: "Windlash", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },

    46 : {
        name: "Brawl", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },

    61: {
        name: "Cloak & Dagger", skillType: 5, skillFunc: 14, skillCalcType: 1,
        skillFuncArg1: 1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 2, maxProbability: 50, ward: "PHYSICAL"
    },

    62: {
        name: "Cloak", skillType: 5, skillFunc: 12, skillCalcType: 1,
        skillFuncArg1: 1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 2, maxProbability: 50
    },

    63: {
        name: "Shroud", skillType: 5, skillFunc: 12, skillCalcType: 0,
        skillFuncArg1: 0, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 4, maxProbability: 50
    },

    111 : {
        name: "Whorl of Wisdom", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "MAGICAL"
    },

    112 : {
        name: "Whorl of Attack", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },
    
    114 : {
        name: "Electric Shock", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 2.5, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 7, maxProbability: 30, ward: "MAGICAL"
    },
    
    118 : {
        name: "Slashing Blade", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 8, maxProbability: 30, ward: "PHYSICAL", contact: 1
    },

    119 : {
        name: "Flash of Rage", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 0.9, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 17, maxProbability: 30, ward: "MAGICAL",
        description: "Call down six random lightning bolts on foes."
    },

    120 : {
        name: "Boon of Mind & Shield 2", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.2, skillFuncArg2: 3, skillFuncArg3: 2, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 4, maxProbability: 70,
        description: "Raise WIS and DEF of all party members."
    },

    123 : {
        name: "Flame Fist", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.7, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy fire damage to three random targets."
    },

    124 : {
        name: "Ice Fist", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.7, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ice damage to three random targets."
    },

    125: {
        name: "Shield & Dagger", skillType: 5, skillFunc: 14, skillCalcType: 1,
        skillFuncArg1: 1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 4, maxProbability: 50, ward: "PHYSICAL",
        description: "Take damage in place of any ally and counter."
    },

    132 : {
        name: "Boon of Blade & Wind 2", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.2, skillFuncArg2: 1, skillFuncArg3: 4, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 4, maxProbability: 70,
        description: "Raise ATK and AGI of all party members."
    },

    133 : {
        name: "Blade Ward 2", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.4, skillFuncArg2: 5, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 4, maxProbability: 70,
        description: "Reduce physical damage taken by all allies."
    },
    
    134 : {
        name: "Magic Ward 2", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.4, skillFuncArg2: 6, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 4, maxProbability: 70,
        description: "Reduce magic damage taken by all allies."
    },
    
    138 : {
        name: "Head Bash", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 3, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy physical damage to two random targets."
    },
    
    139 : {
        name: "Mad Dash", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 2, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL"
    },

    141 : {
        name: "Burning Rage", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 0.9, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 17, maxProbability: 30, ward: "MAGICAL",
        description: "Engulf six random foes in flames."
    },
    
    142 : {
        name: "Barrage", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 0.9, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 20, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal physical damage to five random targets."
    },

    144 : { 
	name: "Windcrush", skillType: 2, skillFunc: 4, skillCalcType: 2,  
	skillFuncArg1: 1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,  
        skillRange: 19, maxProbability: 30, ward: "MAGICAL",
	description: "Deal heavy damage to four foes." 
	},  

    154: {
        name: "Cloak & Dagger 2", skillType: 5, skillFunc: 14, skillCalcType: 1,
        skillFuncArg1: 1.5, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 2, maxProbability: 50, ward: "PHYSICAL"
    },

    156 : {
        name: "Rebuke", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 2, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL"
    },
    
    161 : {
        name: "Shadow Strike", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL"
    },
    
    167 : {
        name: "Bulwark", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.4, skillFuncArg2: 5, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 3, maxProbability: 70
    },

    179 : {
        name: "Sword of Justice", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 2.5, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal massive AGI-based damage to two random foes."
    },

    180: {
        name: "Proxy Counter", skillType: 5, skillFunc: 14, skillCalcType: 1,
        skillFuncArg1: 1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 28, maxProbability: 50, ward: "PHYSICAL"
    },

    195 : {
        name: "Warrior's Wrath", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 2, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal massive ATK-based damage to two random foes."
    },
    
    196 : {
        name: "Spark Shot", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 0.8, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL"
    },
    
    212 : {
        name: "Ghasthunt", skillType: 2, skillFunc: 3, skillCalcType: 2, 
        skillFuncArg1: 1.2, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL"
    },

    214 : {
        name: "Blade of Madness", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.35, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 8, maxProbability: 30, ward: "PHYSICAL", contact: 1,
        description: "Deals ATK-based damage to all foes."
    },
    
    216 : {
        name: "Bodycheck", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 2.5, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 6, maxProbability: 30, ward: "PHYSICAL", contact: 1
    },

    217 : {
        name: "Harrowing Trial", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 2.5, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 23, maxProbability: 30, ward: "MAGICAL"
    },

    221 : {
        name: "Skittering Darkness", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.5, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to three foes."
    },

    222 : {
        name: "Boastful Blade", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.9, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL"
    },

    224 : {
        name: "Feather Shot", skillType: 2, skillFunc: 4, skillCalcType: 1,
        skillFuncArg1: 2.1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal massive ATK-based damage to three random foes."
    },

    227 : {
        name: "Muscle Play", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.65, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 7, maxProbability: 30, ward: "PHYSICAL", contact: 1,
        description: "Deal massive ATK-based damage to three foes."
    },

    229 : {
        name: "Spirit Word", skillType: 2, skillFunc: 3, skillCalcType: 2, 
        skillFuncArg1: 2.1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },

    234 : {
        name: "Lightning Spirits", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.15, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 20, maxProbability: 30, ward: "MAGICAL",
        description: "Deal WIS-based damage to five random foes."
    },

    236: {
        name: "Flash", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 2.25, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 16, maxProbability: 30, ward: "MAGICAL"
    },

    238 : {
        name: "Shadow Slash", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.05, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL"
    },
    
    239 : {
        name : "Dark Rush", skillType: 2, skillFunc: 4, skillCalcType: 3,
        skillFuncArg1: 2, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 16, maxProbability: 30, ward: "MAGICAL"
    },
    
    240 : {
        name : "Midnight Smile", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.2, skillFuncArg2: 4, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 3, maxProbability: 70
    },

    244 : {
        name : "High Spirits", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1.6, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 19, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy WIS-based damage to four random foes, regardless of position."
    },

    249 : {
        name: "Steelscales", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 0.9, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 17, maxProbability: 30, ward: "PHYSICAL"
    },

    251 : {
        name: "Hungry Beak", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 20, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to five random foes."
    },

    253 : {
        name: "Brutal Fist", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 2.1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL"
    },

    256 : {
        name: "Silent Madness", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.3, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },
    
    258 : {
        name: "Fatal Kiss", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.35, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 8, maxProbability: 30, ward: "MAGICAL"
    },

    259 : {
        name: "Hell Spark", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL"
    },

    264 : {
        name: "Bone Crush", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.95, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal massive ATK-based damage to three random foes."
    },

    269 : {
        name: "Tears of the Hideous", skillType: 2, skillFunc: 4, skillCalcType: 3, 
        skillFuncArg1: 2.05, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "MAGICAL",
        description: "Deal massive AGI-based damage to three random foes regardless of position."
    },
    
    275 : {
        name: "Blinding Light", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.7, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy WIS-based damage to three random foes, regardless of position."
    },

    276 : {
        name: "Divine Grief", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 2, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 23, maxProbability: 30, ward: "MAGICAL",
        description: "Deal Massive WIS-based damage to two random foes, regardless of position."
    },

    280: {
        name: "Snake Charmer", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 2.05, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 16, maxProbability: 30, ward: "MAGICAL",
        description: "Deal massive WIS-based damage to three random foes, regardless of position."
    },

    282: {
        name: "Corpse Hymn", skillType: 2, skillFunc: 4, skillCalcType: 3,
        skillFuncArg1: 1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 20, maxProbability: 30, ward: "MAGICAL",
        description: "Deal AGI-based damage to five random foes, regardless of position."
    },

    288: {
        name: "Chain Attack", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 0.95, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 17, maxProbability: 30, ward: "MAGICAL",
        description: "Deal WIS-based damage to six random foes, regardless of position."
    },

    293: {
        name: "Cruel Flame", skillType: 2, skillFunc: 4, skillCalcType: 1,
        skillFuncArg1: 1.7, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to four random foes, regardless of position."
    },

    294 : {
        name: "Mocking Laugh", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 2.5, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal massive ATK-based damage to two random foes."
    },

    297 : {
        name: "Awe of the Wild", skillType: 2, skillFunc: 4, skillCalcType: 3, 
        skillFuncArg1: 2.15, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "MAGICAL",
        description: "Deal massive AGI-based damage to three random foes, regardless of position."
    },
    
    302 : {
        name: "Ice Wall", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.4, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 8, maxProbability: 30, ward: "BREATH"
    },

    303 : {
        name: "Chill Horn", skillType: 2, skillFunc: 3, skillCalcType: 2, 
        skillFuncArg1: 1.9, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },

    305 : {
        name: "Dancing Flame", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.3, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 19, maxProbability: 30, ward: "BREATH",
        description: "Deal WIS-based damage to four random foes, regardless of position."
    },

    307 : {
        name: "Evil Wink", skillType: 2, skillFunc: 3, skillCalcType: 2, 
        skillFuncArg1: 1.8, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },
    
    313 : {
        name: "White Ruin", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.5, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 8, maxProbability: 30, ward: "BREATH"
    },
    
    314 : {
        name: "Fearless Laugh", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.3, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 32, maxProbability: 30, ward: "PHYSICAL", contact: 1
    },

    315 : {
        name: "Trembling Horn", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.3, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to four random foes."
    },

    319: {
        name: "Magic Overwhelming", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1.55, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 19, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy WIS-based damage to four random foes, regardless of position."
    },

    320: {
        name: "Mystic Teachings", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.1, skillFuncArg2: 3, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 3, maxProbability: 70,
        description: "Raise WIS of self and adjacent familiars at beginning of battle."
    },

    321 : {
        name: "Roaring Blood", skillType: 2, skillFunc: 3, skillCalcType: 2, 
        skillFuncArg1: 0.95, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 17, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal WIS-based damage to six random foes."
    },

    325: {
        name: "Rippling Flame", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.85, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to three random foes."
    },

    326 : {
        name: "Heart of the Warrior", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.6, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to three random foes."
    },

    327 : {
        name: "Test of Courage", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.6, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to three random foes."
    },
    
    340 : {
        name: "Penance", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.25, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 8, maxProbability: 30, ward: "PHYSICAL", contact: 1
    },

    341 : {
        name: "Staff of Ages", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 1.15, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL"
    },
    
    349 : {
        name : "Staff of Tyranny", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.55, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },

    351 : {
        name: "Sword of Fealty", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.3, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL"
    },

    359 : {
        name: "Seeping Darkness", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.25, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },

    360: {
        name: "Curse of Wrath", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 17, maxProbability: 30, ward: "MAGICAL",
        description: "Deal WIS-based damage to six random foes, regardless of position."
    },
    
    361: {
        name: "Resplendent Light", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 20, maxProbability: 30, ward: "MAGICAL",
        description: "Deal ATK-based damage to five random foes."
    },    

    362 : {
        name: "Rite of Vengeance", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.85, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL"
    },

    365 : {
        name: "Bug Attack", skillType: 2, skillFunc: 4, skillCalcType: 1, 
        skillFuncArg1: 1.95, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal heavy ATK-based damage to three random foes, regardless of position."
    },

    366 : {
        name: "Bone Chill", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.7, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 32, maxProbability: 30, ward: "BREATH"
    },

    379 : {
        name: "Dragon Aura", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.9, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy WIS-based damage to three random foes, regardless of position."
    },
    
    380 : {
        name : "Feral Claws", skillType: 2, skillFunc: 3, skillCalcType: 3,
        skillFuncArg1: 0.95, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 17, maxProbability: 30, ward: "PHYSICAL"
    },
    
    381 : {
        name : "Lion's Roar", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.4, skillFuncArg2: 6, skillFuncArg3: 7, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 3, maxProbability: 70
    },

    383 : {
        name: "Flame of Cinders", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.65, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },

    385 : {
        name: "Prominence", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 20, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to five random foes."
    },

    386 : {
        name: "Sun's Mercy", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.15, skillFuncArg2: 1, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 3, maxProbability: 70,
        description: "Raise ATK of self and adjacent familiars."
    },

    390 : {
        name: "Libra's Retribution", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.6, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },

    398: {
        name: "Knuckle Guard", skillType: 5, skillFunc: 12, skillCalcType: 0,
        skillFuncArg1: 0, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 4, maxProbability: 50
    },
    
    406 : {
        name: "Piercing Arrow", skillType: 2, skillFunc: 4, skillCalcType: 1, 
        skillFuncArg1: 1.35, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 8, maxProbability: 30, ward: "PHYSICAL", contact: 0
    },

    407 : {
        name: "Allure of the Rose", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1.3, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 20, maxProbability: 30, ward: "MAGICAL"
    },

    408 : {
        name: "Covenant of the Rose", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.15, skillFuncArg2: 4, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 3, maxProbability: 70
    },

    412 : {
        name: "Fires of Thirst", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1.2, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 20, maxProbability: 30, ward: "MAGICAL",
        description: "Deal WIS-based damage to five random foes, regardless of position."
    },

    416 : {
        name: "Bone Smasher", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1.5, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 19, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy WIS-based damage to four random foes, regardless of position."
    },

    418 : {
        name: "Nemesis", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 2.1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 7, maxProbability: 30, ward: "MAGICAL",
        description: "Deal massive WIS-based damage to up to three foes, ignoring position."
    },

    419 : {
        name: "Ichthocannon", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1.5, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 19, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },

    425: {
        name: "Lese Majesty", skillType: 5, skillFunc: 14, skillCalcType: 1,
        skillFuncArg1: 1.5, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 4, maxProbability: 50, ward: "PHYSICAL"
    },

    427 : {
        name: "Funerary Rush", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.5, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },
    
    440 : {
        name: "Thunderstroke", skillType: 2, skillFunc: 4, skillCalcType: 3, 
        skillFuncArg1: 2, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 23, maxProbability: 30, ward: "MAGICAL",
        description: "Deal massive AGI-based damage to two random foes, ignoring position."
    },
    
    441 : {
        name: "Bolt of Judgment", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 2.15, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 23, maxProbability: 30, ward: "MAGICAL",
        description: "Deal massive WIS-based damage to two random foes, ignoring position."
    },    

    437 : {
        name: "Mjolnir", skillType: 2, skillFunc: 4, skillCalcType: 1,
        skillFuncArg1: 1.5, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 32, maxProbability: 30, ward: "PHYSICAL", contact: 0,
        description: "Deal heavy ATK-based damage to up to four foes, ignoring position."
    },

    443 : {
        name: "Fangs of the Devoted", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 2, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL"
    },

    447 : {
        name: "Looming Nightmare", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 1.6, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 32, maxProbability: 30, ward: "MAGICAL",
        description: "Deal heavy WIS-based damage to up to four foes, ignoring position."
    },

    448 : {
        name: "Leo's Claws", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 1.3, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL"
    },

    465 : {
        name : "Stormcaller Pinion", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1.3, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 20, maxProbability: 30, ward: "BREATH",
        description: "Deal WIS-based damage to five random foes, ignoring position."
    },
    
    466 : {
        name : "Blade of Judgment", skillType: 2, skillFunc: 4, skillCalcType: 1,
        skillFuncArg1: 1.8, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL"
    },
    
    467 : {
        name : "Atonement", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.3, skillFuncArg2: 5, skillFuncArg3: 7, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 4, maxProbability: 70
    },

    473 : {
        name: "Entomb", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.15, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 20, maxProbability: 30, ward: "PHYSICAL"
    },

    476 : {
        name: "Furious Horns", skillType: 2, skillFunc: 4, skillCalcType: 2, 
        skillFuncArg1: 2, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "MAGICAL",
        description: "Deal massive WIS-based damage to three random foes, ignoring position."
    },

    484: {
        name: "Wall of the Brave", skillType: 5, skillFunc: 12, skillCalcType: 0,
        skillFuncArg1: 0, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 4, maxProbability: 50,
        description: "Take damage in place of allies"
    },

    485: {
        name: "Shield of the Coward", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 1, skillFuncArg2: 2, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 21, maxProbability: 70,
        description: "Raise DEF of self at start of battle."
    },

    489: {
        name: "Hardened Steel", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.7, skillFuncArg2: 5, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 21, maxProbability: 70,
        description: "Reduce physical damage taken by self greatly."
    },

    490: {
        name: "Steel Hooves", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.2, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 20, maxProbability: 30, ward: "PHYSICAL",
        description: "Deal ATK-based damage to five random foes."
    },

    10007: { // use this for normal wis-based auto skill
        name: "Standard Action", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 5, maxProbability: 100, ward: "MAGICAL"
    },

    10008: { // 65% Mod, Single Hit, WIS-based, position independent
        name: "Standard Action", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 0.65, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 5, maxProbability: 100, ward: "MAGICAL"
    },

    10016: { // same as 10007, but with flame animation
        name: "Standard Action", skillType: 2, skillFunc: 4, skillCalcType: 2,
        skillFuncArg1: 1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 5, maxProbability: 100, ward: "MAGICAL"
    },
    
    99000 : {
        name : "Raging Flames", skillType: 2, skillFunc: 3, skillCalcType: 3,
        skillFuncArg1: 2.4, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },
    
    99002 : {
        name : "Inferno", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.4, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL"
    },
    
    99003 : {
        name : "Niten Ichi-ryu", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.75, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    }
};
