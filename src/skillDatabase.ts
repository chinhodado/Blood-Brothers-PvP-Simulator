/**
 * Some notes:
 * - For attack skills, there has to be a "ward" attribute, which takes a value of 1, 3 or 2
 *   Counter skills also need the above, even though the ward will always be 1 for those skills
 * - If a arg is 0, there's no need to include it
 *
 * - There is no need for the baseProbability
 */
var SkillDatabase = {

    10000: {
        name: "Default auto", type: 2, func: 3, calc: 1,
        arg1: 1, 
        range: 5, prob: 100, ward: 1, isAutoAttack: true
    },

    2 : {
        name: "Strength of Blades", type: 1, func: 1, calc: 0,
        arg1: 0.5, arg2: 1, 
        range: 3, prob: 70,
        desc: "Raise ATK of self and adjacent familiars."
    },

    4 : {
        name: "Guile of Runes", type: 1, func: 1, calc: 0,
        arg1: 0.5, arg2: 3, 
        range: 3, prob: 70,
        desc: "Raise WIS of self and adjacent familiars."
    },

    5 : {
        name: "Grace of Winds", type: 1, func: 1, calc: 0,
        arg1: 0.5, arg2: 4, 
        range: 3, prob: 70,
        desc: "Raise AGI of self and adjacent familiars."
    },

    10 : {
        name: "Scythe Storm", type: 2, func: 3, calc: 3,
        arg1: 1, 
        range: 8, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to all foes."
    },

    11 : {
        name: "Torrent of Flame", type: 2, func: 4, calc: 2,
        arg1: 2, 
        range: 8, prob: 30, ward: 3,
        desc: "Deal heavy damage to all foes."
    },

    16 : {
        name: "Greater Recall", type: 2, func: 6, calc: 0,
        arg1: 1, 
        range: 2, prob: 50,
        desc: "Revive and fully restore HP of adjacent familiars."
    },

    17 : {
        name: "Berserk", type: 2, func: 3, calc: 1,
        arg1: 0.8, 
        range: 17, prob: 30, ward: 1,
        desc: "Deal damage to six random targets."
    },

    18 : {
        name: "Rush", type: 2, func: 3, calc: 3, 
        arg1: 0.7,  
        range: 17, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to six random targets."
    },

    19 : {
        name: "Dispell", type: 2, func: 16, calc: 0, 
        range: 8, prob: 70,
        desc: "Remove the buffs of all foes."
    },
    
    23 : {
        name: "Breath of Flame", type: 2, func: 4, calc: 2, 
        arg1: 2.5,  
        range: 7, prob: 30, ward: 3,
        desc: "Deal heavy damage to three foes."
    },

    26 : {
        name: "Greater Heal", type: 2, func: 18, calc: 4,
        arg1: 1, 
        range: 2, prob: 30,
        desc: "Restore a fixed amount of HP to adjacent familiars."
    },

    27 : {
        name: "Greater Healing Sage", type: 2, func: 18, calc: 4,
        arg1: 1, 
        range: 2, prob: 30,
        desc: "Restore a fixed amount of HP to adjacent familiars."
    },

    33 : {
        name: "Whirlwind", type: 2, func: 3, calc: 3, 
        arg1: 2.5,  
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to three foes."
    },

    34 : {
        name: "Massive Assault", type: 2, func: 3, calc: 1, 
        arg1: 4,  
        range: 5, prob: 30, ward: 1,
        desc: "Deal massive damage to one foe."
    },

    38 : {
        name: "Heal", type: 2, func: 18, calc: 4,
        arg1: 1, 
        range: 1, prob: 30,
        desc: "Restore a fixed amount of HP to an adjacent familiar."
    },

    39 : {
        name: "Healing Sage", type: 2, func: 18, calc: 4,
        arg1: 1, 
        range: 1, prob: 30,
        desc: "Restore a fixed amount of HP to an adjacent familiar."
    },

    40 : {
        name: "Firestrike", type: 2, func: 4, calc: 2, 
        arg1: 3,  
        range: 5, prob: 30, ward: 2,
        desc: "Deal heavy damage to one foe."
    },

    43 : {
        name: "Windlash", type: 2, func: 3, calc: 3, 
        arg1: 1,  
        range: 16, prob: 30, ward: 1
    },

    46 : {
        name: "Brawl", type: 2, func: 3, calc: 1, 
        arg1: 1,  
        range: 16, prob: 30, ward: 1,
        desc: "Attack three foes."
    },

    47 : {
        name: "Blastwave", type: 2, func: 4, calc: 2, 
        arg1: 2,  
        range: 12, prob: 30, ward: 2,
        desc: "Deal heavy damage to all foes in the front line."
    },

    60: {
        name: "Syphon", type: 3, func: 11, calc: 1,
        arg1: 1, 
        range: 1, prob: 50,
        desc: "Heal an adjacent familiar for the amount of damage taken."
    },

    61: {
        name: "Cloak & Dagger", type: 5, func: 14, calc: 1,
        arg1: 1, 
        range: 2, prob: 50, ward: 1,
        desc: "Take damage in place of nearby ally and counter."
    },

    62: {
        name: "Cloak", type: 5, func: 12, calc: 1,
        arg1: 1, 
        range: 2, prob: 50
    },

    63: {
        name: "Shroud", type: 5, func: 12, calc: 0,
        arg1: 0, 
        range: 4, prob: 50
    },

    64: {
        name: "Riposte", type: 3, func: 13, calc: 1,
        arg1: 1, 
        range: 1, prob: 50, ward: 1,
        desc: "Counterattack after receiving an attack."
    },

    71: {
        name: "Icicle", type: 2, func: 4, calc: 2,
        arg1: 3, 
        range: 5, prob: 30, ward: 2,
        desc: "Deal heavy damage to one foe."
    },

    85: {
        name: "Grace of Winds 2", type: 1, func: 1, calc: 0,
        arg1: 0.2, arg2: 4, 
        range: 4, prob: 70,
        desc: "Raise AGI of all familiars."
    },

    94: {
        name: "Grace of Winds 3", type: 1, func: 1, calc: 0,
        arg1: 0.3, arg2: 4, 
        range: 4, prob: 70,
        desc: "Raise AGI of all familiars."
    },

    108 : {
        name: "Icestorm", type: 2, func: 4, calc: 2, 
        arg1: 2,  
        range: 8, prob: 30, ward: 3,
        desc: "Deal ice damage to all foes."
    },

    109 : {
        name: "Plasma Field", type: 2, func: 4, calc: 2, 
        arg1: 2,  
        range: 8, prob: 30, ward: 2,
        desc: "Deal lightning damage to all foes."
    },

    110 : {
        name: "Typhoon", type: 2, func: 4, calc: 3, 
        arg1: 2,  
        range: 8, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to all foes."
    },

    111 : {
        name: "Whorl of Wisdom", type: 2, func: 4, calc: 2, 
        arg1: 1,  
        range: 16, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to three foes."
    },

    112 : {
        name: "Whorl of Attack", type: 2, func: 3, calc: 1, 
        arg1: 1,  
        range: 16, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to three foes."
    },

    113 : {
        name: "Thundercloud", type: 2, func: 4, calc: 2, 
        arg1: 1, arg2: 2, arg3: 0.3, 
        range: 7, prob: 30, ward: 2,
        desc: "Deal damage and sometimes paralyze three foes."
    },
    
    114 : {
        name: "Electric Shock", type: 2, func: 4, calc: 2, 
        arg1: 2.5,  
        range: 7, prob: 30, ward: 2,
        desc: "Deal heavy lightning damage to three foes."
    },

    115 : {
        name: "Venomstorm", type: 2, func: 3, calc: 1, 
        arg1: 1.5, arg2: 1, arg3: 1, 
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy poison damage to three foes."
    },

    116 : {
        name: "Mass Greater Heal", type: 2, func: 18, calc: 4, 
        arg1: 0.7,  
        range: 4, prob: 30,
        desc: "Restore a fixed amount of HP to all party members."
    },

    117 : {
        name: "Hellfire", type: 2, func: 4, calc: 2, 
        arg1: 1,  
        range: 8, prob: 30, ward: 2,
        desc: "Hurl a ball of flame to damage all foes."
    },
    
    118 : {
        name: "Slashing Blade", type: 2, func: 3, calc: 1, 
        arg1: 1,  
        range: 8, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to all foes."
    },

    119 : {
        name: "Flash of Rage", type: 2, func: 4, calc: 2, 
        arg1: 0.9,  
        range: 17, prob: 30, ward: 2,
        desc: "Call down six random lightning bolts on foes."
    },

    120 : {
        name: "Boon of Mind & Shield 2", type: 1, func: 1, calc: 0,
        arg1: 0.2, arg2: 3, arg3: 2,
        range: 4, prob: 70,
        desc: "Raise WIS and DEF of all party members."
    },

    122 : {
        name: "Frontal Onslaught", type: 2, func: 3, calc: 1,
        arg1: 1.5, 
        range: 12, prob: 30, ward: 1,
        desc: "Deal heavy damage to the front line."
    },

    123 : {
        name: "Flame Fist", type: 2, func: 3, calc: 1, 
        arg1: 1.7,  
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy fire damage to three random targets."
    },

    124 : {
        name: "Ice Fist", type: 2, func: 3, calc: 1,
        arg1: 1.7, 
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ice damage to three random targets."
    },

    125: {
        name: "Shield & Dagger", type: 5, func: 14, calc: 1,
        arg1: 1, 
        range: 4, prob: 50, ward: 1,
        desc: "Take damage in place of any ally and counter."
    },

    128: {
        name: "Whiteout", type: 2, func: 4, calc: 2,
        arg1: 2.3, arg2: 3, arg3: 0.3,
        range: 7, prob: 30, ward: 2,
        desc: "Deal heavy damage and sometimes freeze three foes."
    },

    131: {
        name: "Bloodlust Lance", type: 2, func: 4, calc: 1,
        arg1: 1, 
        range: 8, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to all foes, regardless of position."
    },

    132 : {
        name: "Boon of Blade & Wind 2", type: 1, func: 1, calc: 0,
        arg1: 0.2, arg2: 1, arg3: 4,
        range: 4, prob: 70,
        desc: "Raise ATK and AGI of all party members."
    },

    133 : {
        name: "Blade Ward 2", type: 1, func: 1, calc: 0,
        arg1: 0.4, arg2: 5, 
        range: 4, prob: 70,
        desc: "Reduce physical damage taken by all allies."
    },
    
    134 : {
        name: "Magic Ward 2", type: 1, func: 1, calc: 0,
        arg1: 0.4, arg2: 6, 
        range: 4, prob: 70,
        desc: "Reduce magic damage taken by all allies."
    },

    137 : {
        name: "Binding Arcana", type: 2, func: 3, calc: 1,
        arg1: 1, arg2: 5, arg3: 0.3, arg4: 3,
        range: 19, prob: 30, ward: 1,
        desc: "Deal four physical strikes that sometimes silence foes."
    },
    
    138 : {
        name: "Head Bash", type: 2, func: 3, calc: 1, 
        arg1: 3,  
        range: 23, prob: 30, ward: 1,
        desc: "Deal heavy physical damage to two random targets."
    },
    
    139 : {
        name: "Mad Dash", type: 2, func: 3, calc: 1, 
        arg1: 2,  
        range: 23, prob: 30, ward: 1
    },

    141 : {
        name: "Burning Rage", type: 2, func: 4, calc: 2,
        arg1: 0.9, 
        range: 17, prob: 30, ward: 2,
        desc: "Engulf six random foes in flames."
    },
    
    142 : {
        name: "Barrage", type: 2, func: 3, calc: 1, 
        arg1: 0.9,  
        range: 20, prob: 30, ward: 1,
        desc: "Deal physical damage to five random targets."
    },

    144 : {
	    name: "Windcrush", type: 2, func: 4, calc: 2,  
	    arg1: 1,   
        range: 19, prob: 30, ward: 2,
	    desc: "Deal heavy damage to four foes." 
	},

    145 : {
	    name: "Mass Greater Heal 2", type: 2, func: 18, calc: 4,  
	    arg1: 2,   
        range: 4, prob: 30,
	    desc: "Restore a fixed amount of HP to all party members." 
	},

    146 : {
	    name: "Ritual of Binding", type: 1, func: 19, calc: 0,  
	    arg1: 0, arg2: 5, arg3: 0.3, arg4: 3,
        range: 8, prob: 70,
	    desc: "Chance to silence all foes at beginning of battle." 
	},

    149 : {
        name: "Spiteful Strike", type: 2, func: 21, calc: 1, 
        arg1: 1, arg2: 2, arg3: 0.3, arg4: 0.2, 
        range: 8, prob: 30, ward: 1,
        desc: "Deal damage to all foes and sometimes lower DEF."
    },

    150 : {
	    name: "Grin and Bear It", type: 3, func: 20, calc: 0,  
	    arg1: 0.5,   
        range: 21, prob: 70,
	    desc: "Survive devastating damage as long as HP is above 50%." 
	},

    152 : {
	    name: "Mad Swing", type: 2, func: 4, calc: 1,  
	    arg1: 1.7,   
        range: 7, prob: 30, ward: 1,
	    desc: "Deal heavy damage to three foes with a mighty swing." 
	},

    154: {
        name: "Cloak & Dagger 2", type: 5, func: 14, calc: 1,
        arg1: 1.5, 
        range: 2, prob: 50, ward: 1,
        desc: "Take heavy damage in place of nearby ally and counter."
    },

    155 : {
        name: "Firecell Roar", type: 2, func: 22, calc: 2, 
        arg1: 1.5, arg2: 1, arg3: 0.3, arg4: 0.2, 
        range: 16, prob: 30, ward: 2,
        desc: "Three random fire strikes that sometimes lower ATK."
    },

    156 : {
        name: "Rebuke", type: 2, func: 3, calc: 3, 
        arg1: 2,  
        range: 23, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to two random foes."
    },

    160 : {
        name: "Ice Fang", type: 2, func: 4, calc: 1, 
        arg1: 1.5, arg2: 3, arg3: 0.3, 
        range: 16, prob: 30, ward: 1,
        desc: "Deals heavy ice damage and sometimes freeze three foes."
    },
    
    161 : {
        name: "Shadow Strike", type: 2, func: 3, calc: 3, 
        arg1: 1,  
        range: 19, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to four random foes."
    },

    163 : {
        name: "Poison Mist", type: 2, func: 4, calc: 2, 
        arg1: 2.3, arg2: 1, arg3: 0.3, 
        range: 7, prob: 30, ward: 2,
        desc: "Deal massive damage and sometimes poison up to three foes."
    },

    164 : {
        name: "Boon of Mind & Blade 2", type: 1, func: 1, calc: 0, 
        arg1: 0.2, arg2: 1, arg3: 3, 
        range: 4, prob: 70,
        desc: "Raise the ATK and WIS of all party members."
    },

    165 : {
        name: "Furious Cannon", type: 2, func: 22, calc: 2, 
        arg1: 1, arg2: 1, arg3: 0.3, arg4: 0.5, 
        range: 8, prob: 30, ward: 2,
        desc: "Deal fire damage to all foes and sometimes lower ATK."
    },

    166 : {
        name: "Payback", type: 3, func: 13, calc: 1,
        arg1: 2.3, 
        range: 21, prob: 50, ward: 1,
        desc: "Chance to unleash a massive counter attack when struck."
    },
    
    167 : {
        name: "Bulwark", type: 1, func: 1, calc: 0,
        arg1: 0.4, arg2: 5, 
        range: 3, prob: 70,
        desc: "Reduce physical damage taken by self and nearby familiars."
    },

    168 : {
        name: "Frost and Ice", type: 2, func: 4, calc: 2,
        arg1: 0.8, arg2: 3, arg3: 0.3,
        range: 17, prob: 30, ward: 2,
        desc: "Deal damage and sometimes freeze six random foes."
    },

    170 : {
        name: "War Dance", type: 2, func: 4, calc: 3,
        arg1: 1.5,
        range: 15, prob: 30, ward: 2,
        desc: "Deal heavy AGI-based damage to foes in front and middle."
    },

    177 : {
        name: "Divine Shield", type: 1, func: 1, calc: 0,
        arg1: 0.65, arg2: 5, 
        range: 21, prob: 70,
        desc: "Escape most damage from physical attacks."
    },

    179 : {
        name: "Sword of Justice", type: 2, func: 3, calc: 3, 
        arg1: 2.5,  
        range: 23, prob: 30, ward: 1,
        desc: "Deal massive AGI-based damage to two random foes."
    },

    180: {
        name: "Proxy Counter", type: 5, func: 14, calc: 1,
        arg1: 1, 
        range: 28, prob: 50, ward: 1,
        desc: "Counter when the familiar to the right is hit."
    },

    185: {
        name: "Thunderclap", type: 2, func: 4, calc: 2,
        arg1: 0.7, arg2: 2, arg3: 0.3,
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to five random foes and sometimes paralyze them."
    },

    186: {
        name: "Razor Claws", type: 2, func: 3, calc: 1,
        arg1: 2, arg2: 2, arg3: 0.5,
        range: 6, prob: 30, ward: 1,
        desc: "Deal massive damage and sometimes paralyze two foes."
    },

    195 : {
        name: "Warrior's Wrath", type: 2, func: 3, calc: 1, 
        arg1: 2,  
        range: 23, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },
    
    196 : {
        name: "Spark Shot", type: 2, func: 3, calc: 1, 
        arg1: 0.8,  
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to four random foes."
    },

    197 : {
        name: "Revitalize", type: 2, func: 18, calc: 4, 
        arg1: 1.5,  
        range: 4, prob: 30,
        desc: "Restore HP to all party members."
    },

    199 : {
        name: "Cruelest Touch", type: 2, func: 3, calc: 1, 
        arg1: 0.75, arg2: 1, arg3: 0.25, 
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage and sometimes poison six random foes."
    },

    202 : {
        name: "Trial by Fire", type: 2, func: 4, calc: 2, 
        arg1: 2,  
        range: 6, prob: 30, ward: 3,
        desc: "Deal massive WIS-based fire damage to two foes."
    },

    203 : {
        name: "Trial by Ice", type: 2, func: 4, calc: 2, 
        arg1: 2, arg2: 3, arg3: 0.3, 
        range: 6, prob: 30, ward: 3,
        desc: "Deal massive WIS-based water damage to two foes."
    },

    204 : {
        name: "Frozen Spear", type: 2, func: 4, calc: 2, 
        arg1: 3, arg2: 3, arg3: 0.7, 
        range: 5, prob: 30, ward: 2,
        desc: "Deal massive damage and sometimes freeze one foe."
    },

    205 : {
        name: "Crushing Hammer", type: 2, func: 4, calc: 1, 
        arg1: 1, arg2: 3, arg3: 0.3, 
        range: 8, prob: 30, ward: 1,
        desc: "Deal physical damage and sometimes freeze all foes"
    },

    210 : {
        name: "Poison Spout", type: 2, func: 4, calc: 2, 
        arg1: 1.2, arg2: 1, arg3: 0.3, 
        range: 19, prob: 30, ward: 3,
        desc: "Deal WIS-based damage and sometimes poison four random foes."
    },

    211 : {
        name: "Requiem", type: 2, func: 3, calc: 1, 
        arg1: 1, arg2: 5, arg3: 0.3, arg4: 3, 
        range: 8, prob: 30, ward: 1,
        desc: "Deal physical damage and sometimes silence all foes."
    },
    
    212 : {
        name: "Ghasthunt", type: 2, func: 3, calc: 2, 
        arg1: 1.2,  
        range: 19, prob: 30, ward: 1,
        desc: "Deal WIS-based damage to four random foes."
    },

    214 : {
        name: "Blade of Madness", type: 2, func: 3, calc: 1, 
        arg1: 1.35,  
        range: 8, prob: 30, ward: 1,
        desc: "Deals ATK-based damage to all foes."
    },
    
    216 : {
        name: "Bodycheck", type: 2, func: 3, calc: 1, 
        arg1: 2.5,  
        range: 6, prob: 30, ward: 1,
    },

    217 : {
        name: "Harrowing Trial", type: 2, func: 4, calc: 2,
        arg1: 2.5, 
        range: 23, prob: 30, ward: 2
    },

    219 : {
        name: "Evil Eye", type: 2, func: 21, calc: 3, 
        arg1: 1.2, arg2: 4, arg3: 0.3, arg4: 0.3, 
        range: 8, prob: 30, ward: 1,
        desc: "Deal AGI-based damage and lower AGI of all foes."
    },

    221 : {
        name: "Skittering Darkness", type: 2, func: 3, calc: 1, 
        arg1: 1.5,  
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to three foes."
    },

    222 : {
        name: "Boastful Blade", type: 2, func: 3, calc: 1, 
        arg1: 1.9,  
        range: 23, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },

    224 : {
        name: "Feather Shot", type: 2, func: 4, calc: 1,
        arg1: 2.1, 
        range: 16, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to three random foes."
    },

    225 : {
        name: "Wings of Winter", type: 2, func: 3, calc: 3,
        arg1: 0.8, 
        range: 20, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to five random foes."
    },

    227 : {
        name: "Muscle Play", type: 2, func: 3, calc: 1,
        arg1: 1.65, 
        range: 7, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to three foes."
    },

    229 : {
        name: "Spirit Word", type: 2, func: 3, calc: 2, 
        arg1: 2.1,  
        range: 16, prob: 30, ward: 1
    },

    231 : {
        name: "Rolling Thunder", type: 2, func: 21, calc: 3, 
        arg1: 1.25, arg2: 1, arg3: 0.3, arg4: 0.2, 
        range: 8, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to all foes and sometimes lower ATK."
    },

    232 : {
        name: "Lightning Web", type: 2, func: 4, calc: 2, 
        arg1: 2.15, arg2: 2, arg3: 0.3, 
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage and sometimes paralyze three foes."
    },

    234 : {
        name: "Lightning Spirits", type: 2, func: 4, calc: 2, 
        arg1: 1.15,  
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to five random foes."
    },

    236: {
        name: "Flash", type: 2, func: 4, calc: 2,
        arg1: 2.25, 
        range: 16, prob: 30, ward: 2
    },

    238 : {
        name: "Shadow Slash", type: 2, func: 3, calc: 1, 
        arg1: 1.05,  
        range: 19, prob: 30, ward: 1
    },
    
    239 : {
        name : "Dark Rush", type: 2, func: 4, calc: 3,
        arg1: 2, 
        range: 16, prob: 30, ward: 2
    },
    
    240 : {
        name : "Midnight Smile", type: 1, func: 1, calc: 0,
        arg1: 0.2, arg2: 4, 
        range: 3, prob: 70,
        desc: "Raise AGI of self and adjacent familiars at start of battle."
    },

    241 : {
        name : "Chillling Blast", type: 2, func: 3, calc: 1,
        arg1: 1.7, arg2: 3, arg3: 0.3,
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage and sometimes freeze three random foes."
    },

    242 : {
        name : "Glacial Blade", type: 2, func: 4, calc: 2,
        arg1: 1.7, arg2: 3, arg3: 0.3,
        range: 7, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage and sometimes freeze up to three foes, regardless of position."
    },

    244 : {
        name : "High Spirits", type: 2, func: 4, calc: 2,
        arg1: 1.6, 
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, regardless of position."
    },

    245 : {
        name : "Brave Blade", type: 2, func: 4, calc: 2,
        arg1: 1.2, 
        range: 8, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to all foes, regardless of position."
    },

    249 : {
        name: "Steelscales", type: 2, func: 3, calc: 1, 
        arg1: 0.9,  
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to six random foes."
    },

    250 : {
        name: "Goddess of the Deep", type: 2, func: 3, calc: 3, 
        arg1: 1.6,  
        range: 7, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to three foes."
    },

    251 : {
        name: "Hungry Beak", type: 2, func: 3, calc: 1, 
        arg1: 1,  
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes."
    },

    253 : {
        name: "Brutal Fist", type: 2, func: 3, calc: 1, 
        arg1: 2.1,  
        range: 23, prob: 30, ward: 1
    },

    254 : {
        name: "Roving Fang", type: 2, func: 3, calc: 3,
        arg1: 1.6, 
        range: 12, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to all foes in the front line."
    },

    256 : {
        name: "Silent Madness", type: 2, func: 3, calc: 1, 
        arg1: 1.3,  
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to three foes."
    },
    
    258 : {
        name: "Fatal Kiss", type: 2, func: 4, calc: 2, 
        arg1: 1.35,  
        range: 8, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to all foes, regardless of position."
    },

    259 : {
        name: "Hell Spark", type: 2, func: 3, calc: 1, 
        arg1: 1.1,  
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to four random foes."
    },

    260 : {
        name: "Curse of Ages", type: 2, func: 21, calc: 3, 
        arg1: 0.7, arg2: 1, arg3: 0.3, arg4: 0.2, 
        range: 17, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to six random foes and sometimes lower ATK."
    },

    261 : {
        name: "Groundswell", type: 2, func: 4, calc: 2, 
        arg1: 1.15,  
        range: 8, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to all foes."
    },

    263 : {
        name: "Judgment", type: 2, func: 3, calc: 1, 
        arg1: 1.75,  
        range: 7, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to up to three foes."
    },

    264 : {
        name: "Bone Crush", type: 2, func: 3, calc: 1, 
        arg1: 1.95,  
        range: 16, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to three random foes."
    },

    265 : {
        name: "Ancient Feast", type: 1, func: 1, calc: 0, 
        arg1: 0.5, arg2: 1,  
        range: 3, prob: 70,
        desc: "Raise ATK of self and adjacent familiars at beginning of battle."
    },

    267 : {
        name: "Swordmaster", type: 2, func: 3, calc: 3, 
        arg1: 2.4,  
        range: 7, prob: 30, ward: 1,
        desc: "Deal massive AGI-based damage to three foes."
    },

    268 : {
        name: "Gaoler's Torment", type: 2, func: 3, calc: 3, 
        arg1: 1.65,  
        range: 15, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to front/middle lines."
    },

    269 : {
        name: "Tears of the Hideous", type: 2, func: 4, calc: 3, 
        arg1: 2.05,  
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive AGI-based damage to three random foes regardless of position."
    },
    
    270 : {
        name: "Withering Flame", type: 2, func: 4, calc: 2, 
        arg1: 1.7,  
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, regardless of position."
    },
    
    271 : {
        name: "Scales of Tranquility", type: 1, func: 19, calc: 0, 
        arg1: 0, arg2: 5, arg3: 0.45, arg4: 1, 
        range: 7, prob: 70,
        desc: "Chance to silence three foes for one turn at start of battle."
    },

    272 : {
        name: "Bewitching Wings", type: 2, func: 4, calc: 2, 
        arg1: 2.5,
        range: 23, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to two random foes, regardless of position."
    },

    273 : {
        name: "Stirring Kiss", type: 2, func: 6, calc: 0, 
        arg1: 1,
        range: 2, prob: 50,
        desc: "Revive and fully restore HP of adjacent familiars."
    },

    274 : {
        name: "Eternal Sleep", type: 2, func: 3, calc: 3, 
        arg1: 1.5,  
        range: 32, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to up to four foes."
    },
    
    275 : {
        name: "Blinding Light", type: 2, func: 4, calc: 2, 
        arg1: 1.7,  
        range: 16, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to three random foes, regardless of position."
    },

    276 : {
        name: "Divine Grief", type: 2, func: 4, calc: 2, 
        arg1: 2,  
        range: 23, prob: 30, ward: 2,
        desc: "Deal Massive WIS-based damage to two random foes, regardless of position."
    },
    
    277 : {
        name: "Nightmarish Notion", type: 2, func: 4, calc: 2, 
        arg1: 1.1, arg2: 3, arg3: 0.3, 
        range: 20, prob: 30, ward: 3,
        desc: "Deal WIS-based damage and sometimes freeze five random foes, regardless of position."
    },

    280: {
        name: "Snake Charmer", type: 2, func: 4, calc: 2,
        arg1: 2.05, 
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to three random foes, regardless of position."
    },

    281: {
        name: "Snake Eyes", type: 2, func: 4, calc: 2,
        arg1: 2.1, arg2: 2, arg3: 0.3,
        range: 7, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage and sometimes paralyze up to three foes."
    },

    282: {
        name: "Corpse Hymn", type: 2, func: 4, calc: 3,
        arg1: 1, 
        range: 20, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to five random foes, regardless of position."
    },

    287: {
        name: "Staff of Knowledge", type: 2, func: 18, calc: 4,
        arg1: 1.3, 
        range: 3, prob: 70,
        desc: "High chance to restore HP to self and adjacent familiars."
    },

    288: {
        name: "Chain Attack", type: 2, func: 4, calc: 2,
        arg1: 0.95, 
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, regardless of position."
    },

    289: {
        name: "Quakeblade", type: 2, func: 3, calc: 1,
        arg1: 1.35, 
        range: 15, prob: 30, ward: 1,
        desc: "Deal ATK-based damage front/middle lines."
    },

    291 : {
	    name: "Grin and Bear It 2", type: 3, func: 20, calc: 0,  
	    arg1: 0.01,   
        range: 21, prob: 70,
	    desc: "Survive devastating damage as long as HP is above 1%." 
	},

    292: {
        name: "Golden Rule", type: 2, func: 4, calc: 1,
        arg1: 2.1, 
        range: 7, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to three foes, regardless of position."
    },

    293: {
        name: "Cruel Flame", type: 2, func: 4, calc: 1,
        arg1: 1.7, 
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to four random foes, regardless of position."
    },

    294 : {
        name: "Mocking Laugh", type: 2, func: 3, calc: 1, 
        arg1: 2.5,  
        range: 23, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },

    295 : {
        name: "Dream Lure", type: 1, func: 19, calc: 0, 
        arg1: 0, arg2: 4, arg3: 0.25, 
        range: 7, prob: 70,
        desc: "Sometimes disable three foes at start of battle."
    },

    296 : {
        name: "Blood Offering", type: 2, func: 4, calc: 1, 
        arg1: 1.2, arg2: 4, arg3: 0.3, 
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage and disable six random foes, regardless of position."
    },

    297 : {
        name: "Awe of the Wild", type: 2, func: 4, calc: 3, 
        arg1: 2.15,  
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive AGI-based damage to three random foes, regardless of position."
    },

    298 : {
        name: "Freezing Scales", type: 2, func: 4, calc: 2, 
        arg1: 1.35, arg2: 3, arg3: 0.3, 
        range: 8, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to all foes and sometimes freeze them, regardless of position."
    },

    299 : {
        name: "Crazed Axe", type: 2, func: 3, calc: 1, 
        arg1: 1.7,  
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },

    301 : {
	    name: "Fortitude", type: 3, func: 20, calc: 0,  
	    arg1: 0.2,   
        range: 21, prob: 70,
	    desc: "Survive devastating damage as long as HP is above 20%." 
	},
    
    302 : {
        name: "Ice Wall", type: 2, func: 4, calc: 2, 
        arg1: 1.4,  
        range: 8, prob: 30, ward: 3
    },

    303 : {
        name: "Chill Horn", type: 2, func: 3, calc: 2, 
        arg1: 1.9,  
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy WIS-based damage to three random foes, regardless of position."
    },

    304 : {
        name: "Ferocious Omen", type: 1, func: 1, calc: 0, 
        arg1: 0.1, arg2: 1,  
        range: 3, prob: 70,
        desc: "Raise ATK of self and adjacent familiars."
    },

    305 : {
        name: "Dancing Flame", type: 2, func: 4, calc: 2, 
        arg1: 1.3,  
        range: 19, prob: 30, ward: 3,
        desc: "Deal WIS-based damage to four random foes, regardless of position."
    },

    307 : {
        name: "Evil Wink", type: 2, func: 3, calc: 2, 
        arg1: 1.8,  
        range: 16, prob: 30, ward: 1
    },

    308 : {
        name: "Bloodied Hands", type: 2, func: 4, calc: 2, 
        arg1: 1.7,  
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes."
    },

    311 : {
        name: "Black Phantasm", type: 2, func: 3, calc: 1, 
        arg1: 1.75,  
        range: 6, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to two foes."
    },

    312 : {
        name: "Demon Spear", type: 2, func: 3, calc: 1, 
        arg1: 1.75,  
        range: 6, prob: 30, ward: 1,
        desc: "A spear technique from the West. Deal heavy ATK-based damage to two foes."
    },
    
    313 : {
        name: "White Ruin", type: 2, func: 4, calc: 2, 
        arg1: 1.5,  
        range: 8, prob: 30, ward: 3
    },
    
    314 : {
        name: "Fearless Laugh", type: 2, func: 3, calc: 1, 
        arg1: 1.3,  
        range: 32, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to up to four foes."
    },

    315 : {
        name: "Trembling Horn", type: 2, func: 3, calc: 1, 
        arg1: 1.3,  
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to four random foes."
    },

    316 : {
        name: "Healing Prism", type: 3, func: 11, calc: 1, 
        arg1: 1,  
        range: 3, prob: 30,
        desc: "Convert damage to heal self and adjacent familiars"
    },

    317 : {
        name: "Mad Swing 2", type: 2, func: 4, calc: 1, 
        arg1: 1.9,  
        range: 7, prob: 30, ward: 1,
        desc: "Deal heavy damage to three foes with a mighty swing."
    },

    319: {
        name: "Magic Overwhelming", type: 2, func: 4, calc: 2,
        arg1: 1.55, 
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, regardless of position."
    },

    320: {
        name: "Mystic Teachings", type: 1, func: 1, calc: 0,
        arg1: 0.1, arg2: 3, 
        range: 3, prob: 70,
        desc: "Raise WIS of self and adjacent familiars at beginning of battle."
    },

    321 : {
        name: "Roaring Blood", type: 2, func: 3, calc: 2, 
        arg1: 0.95,  
        range: 17, prob: 30, ward: 1,
        desc: "Deal WIS-based damage to six random foes."
    },

    322 : {
        name: "Cruel Dance", type: 2, func: 4, calc: 3, 
        arg1: 1.5,  
        range: 15, prob: 30, ward: 2,
        desc: "Deal heavy AGI-based damage to front/middle lines, regardless of position."
    },

    325: {
        name: "Rippling Flame", type: 2, func: 3, calc: 1,
        arg1: 1.85, 
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },

    326 : {
        name: "Heart of the Warrior", type: 2, func: 3, calc: 1, 
        arg1: 1.6,  
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },

    327 : {
        name: "Test of Courage", type: 2, func: 3, calc: 1, 
        arg1: 1.6,  
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },

    330 : {
	    name: "Dark Blessing", type: 1, func: 19, calc: 0,  
	    arg1: 0, arg2: 5, arg3: 0.45, arg4: 1,
        range: 7, prob: 70,
	    desc: "Chance to silence three foes at beginning of battle, regardless of position." 
	},

    331 : {
        name: "Light Divine", type: 2, func: 4, calc: 2, 
        arg1: 1.2,  
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, regardless of position."
    },

    333 : {
        name: "Cold-Blooded Smile", type: 2, func: 3, calc: 3, 
        arg1: 1.2, arg2: 3, arg3: 0.3, 
        range: 8, prob: 30, ward: 1,
        desc: "Deal AGI-based damage and sometimes freeze all foes."
    },

    334 : {
        name: "Gift of Terror", type: 2, func: 4, calc: 2, 
        arg1: 1.5, 
        range: 16, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to three random foes."
    },

    339 : {
        name: "Burning Scales", type: 2, func: 4, calc: 2, 
        arg1: 2,  
        range: 15, prob: 30, ward: 3,
        desc: "Deal massive WIS-based damage to all foes in the front/middle lines, regardless of position."
    },
    
    340 : {
        name: "Penance", type: 2, func: 3, calc: 1, 
        arg1: 1.25,  
        range: 8, prob: 30, ward: 1,
    },

    341 : {
        name: "Staff of Ages", type: 2, func: 3, calc: 3, 
        arg1: 1.15,  
        range: 19, prob: 30, ward: 1
    },

    343 : {
        name: "Curiosity", type: 2, func: 21, calc: 2, 
        arg1: 1.5, arg2: 4, arg3: 0.3, arg4: 0.3, 
        range: 8, prob: 30, ward: 1,
        desc: "Deal heavy WIS-based damage to all foes, sometimes lowering AGI."
    },

    345 : {
        name: "Wheel of Death", type: 2, func: 4, calc: 2, 
        arg1: 2.2,
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to three random foes, regardless of position."
    },

    346 : {
        name: "Hellish Rebirth", type: 2, func: 6, calc: 0, 
        arg1: 1,
        range: 101, prob: 50,
        desc: "Revive and fully restore HP of 1 random familiar."
    },
    
    349 : {
        name : "Staff of Tyranny", type: 2, func: 3, calc: 1,
        arg1: 1.55, 
        range: 16, prob: 30, ward: 1
    },

    351 : {
        name: "Sword of Fealty", type: 2, func: 3, calc: 1, 
        arg1: 1.3,  
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to four random foes."
    },

    352 : {
        name: "Spell of Revival", type: 1, func: 1, calc: 0, 
        arg1: 355, arg2: 16, 
        range: 3, prob: 70,
        desc: "Self and adjacent allies are automatically revived after being killed."
    },

    353 : {
        name: "Icerend Claws", type: 2, func: 3, calc: 1, 
        arg1: 1.45, arg2: 3, arg3: 0.3, 
        range: 16, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to three random foes and sometimes freeze them."
    },

    354 : {
        name: "Venomspray Staff", type: 2, func: 4, calc: 2, 
        arg1: 2.9, arg2: 1, arg3: 0.3, 
        range: 23, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to two random foes and sometimes envenom them."
    },

    355 : {
        name: "Dawn's Light", type: 16, func: 6, calc: 0, 
        arg1: 0.5,
        range: 21, prob: 100
    },

    358 : {
        name: "Call of Steel", type: 2, func: 3, calc: 1, 
        arg1: 1.3, arg2: 5, arg3: 0.1, arg4: 3, 
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage and sometimes silence four random foes."
    },

    359 : {
        name: "Seeping Darkness", type: 2, func: 3, calc: 1, 
        arg1: 1.25,  
        range: 16, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to three random foes."
    },

    360: {
        name: "Curse of Wrath", type: 2, func: 4, calc: 2,
        arg1: 1, 
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, regardless of position."
    },
    
    361: {
        name: "Resplendent Light", type: 2, func: 3, calc: 1,
        arg1: 1, 
        range: 20, prob: 30, ward: 2,
        desc: "Deal ATK-based damage to five random foes."
    },    

    362 : {
        name: "Rite of Vengeance", type: 2, func: 3, calc: 1, 
        arg1: 1.85,  
        range: 23, prob: 30, ward: 1
    },

    365 : {
        name: "Bug Attack", type: 2, func: 4, calc: 1, 
        arg1: 1.95,  
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to three random foes, regardless of position."
    },

    366 : {
        name: "Bone Chill", type: 2, func: 4, calc: 2, 
        arg1: 1.7,  
        range: 32, prob: 30, ward: 3
    },
    
    367 : {
        name: "Howl", type: 2, func: 3, calc: 3, 
        arg1: 0.9,  
        range: 20, prob: 30, ward: 1,
        desc: "Deal Agi-based damage to five random foes."
    },

    369 : {
        name: "Stone Rain", type: 2, func: 3, calc: 1, 
        arg1: 1.45,  
        range: 7, prob: 30, ward: 1,
        desc: "Deal ATK-based damage up to three foes."
    },

    370 : {
        name: "Dust Cloud", type: 1, func: 1, calc: 0, 
        arg1: 1, arg2: 18,  
        range: 132, prob: 70,
        desc: "Allows two random allies to perform an extra action during the next turn."
    },

    372 : {
        name: "Curse Foil", type: 3, func: 13, calc: 1, 
        arg1: 1.3,  
        range: 21, prob: 50, ward: 1,
        desc: "Chance to unleash a counter attack when struck."
    },

    374 : {
        name: "Streaming Feathers", type: 3, func: 11, calc: 1, 
        arg1: 1,  
        range: 3, prob: 50,
        desc: "Convert damage to heal self and adjacent familiars."
    },

    375 : {
        name: "Windcutter Blade", type: 2, func: 4, calc: 1, 
        arg1: 2,  
        range: 16, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to three random foes, regardless of position."
    },

    378 : {
        name: "Blade Flurry", type: 2, func: 21, calc: 3, 
        arg1: 1, arg2: 1, arg3: 0.3, arg4: 0.3, 
        range: 19, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to four random foes and sometimes lower ATK."
    },

    379 : {
        name: "Dragon Aura", type: 2, func: 4, calc: 2, 
        arg1: 1.9,  
        range: 16, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to three random foes, regardless of position."
    },
    
    380 : {
        name : "Feral Claws", type: 2, func: 3, calc: 3,
        arg1: 0.95, 
        range: 17, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to six random foes."
    },
    
    381 : {
        name : "Lion's Roar", type: 1, func: 1, calc: 0,
        arg1: 0.4, arg2: 6, arg3: 7,
        range: 3, prob: 70,
        desc: "Reduce magic and breath damages taken by self and adjacent familiars."
    },

    383 : {
        name: "Flame of Cinders", type: 2, func: 3, calc: 1,
        arg1: 1.65, 
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },

    385 : {
        name: "Prominence", type: 2, func: 3, calc: 1,
        arg1: 1, 
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes."
    },

    386 : {
        name: "Sun's Mercy", type: 1, func: 1, calc: 0,
        arg1: 0.15, arg2: 1, 
        range: 3, prob: 70,
        desc: "Raise ATK of self and adjacent familiars."
    },

    387 : {
        name: "Earth's Fury", type: 2, func: 3, calc: 1,
        arg1: 1.35, 
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to four random foes."
    },

    390 : {
        name: "Libra's Retribution", type: 2, func: 3, calc: 1, 
        arg1: 1.6,  
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },

    391 : {
        name: "Scatter Arrow", type: 2, func: 4, calc: 3, 
        arg1: 1.3,  
        range: 32, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to up to four foes, regardless of position."
    },

    394 : {
        name: "Glance", type: 2, func: 4, calc: 2, 
        arg1: 1.7,  
        range: 15, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to all foes in the front/middle lines, regardless of position."
    },

    395 : {
        name : "Imperial Audience", type: 1, func: 19, calc: 0, 
        arg1: 0, arg2: 5, arg3: 0.45, arg4: 1,
        range: 7, prob: 70,
        desc: "Chance to silence up to three foes for one turn at the start of battle."
    },

    398: {
        name: "Knuckle Guard", type: 5, func: 12, calc: 0,
        arg1: 0, 
        range: 4, prob: 50
    },

    400 : {
        name : "Hatred Blade", type: 2, func: 3, calc: 1, 
        arg1: 1.15, arg2: 1, arg3: 0.3,
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes and sometimes poison them."
    },

    401 : {
        name : "Shield of Ruin", type: 1, func: 19, calc: 0, 
        arg1: 0, arg2: 1, arg3: 0.5, arg4: 10,
        range: 7, prob: 70,
        desc: "Chance to poison up to three foes at the start of battle."
    },
    
    404 : {
        name : "Niten Ichi-ryu", type: 2, func: 3, calc: 1, 
        arg1: 1.75, 
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },

    405 : {
        name : "Visions of Terror", type: 2, func: 4, calc: 2, 
        arg1: 1.65, arg2: 1, arg3: 0.3,
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to and sometimes poison four random foes, regardless of position."
    },
    
    406 : {
        name: "Piercing Arrow", type: 2, func: 4, calc: 1, 
        arg1: 1.35,  
        range: 8, prob: 30, ward: 1,
    },

    407 : {
        name: "Allure of the Rose", type: 2, func: 4, calc: 2,
        arg1: 1.3, 
        range: 20, prob: 30, ward: 2
    },

    408 : {
        name: "Covenant of the Rose", type: 1, func: 1, calc: 0,
        arg1: 0.15, arg2: 4, 
        range: 3, prob: 70
    },

    411 : {
        name: "Winds of Lust", type: 2, func: 4, calc: 2,
        arg1: 2.1, 
        range: 12, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to all foes in the front line, regardless of position."
    },

    412 : {
        name: "Fires of Thirst", type: 2, func: 4, calc: 2,
        arg1: 1.2, 
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to five random foes, regardless of position."
    },

    414 : {
        name: "Putrid Stench", type: 2, func: 4, calc: 2,
        arg1: 1.2, arg2: 1, arg3: 0.25,
        range: 20, prob: 30, ward: 2,
        desc: "Deals WIS-based damage to and sometimes poison five random foes, regardless of position."
    },

    415 : {
        name: "Sigiled Sanctuary", type: 1, func: 1, calc: 0,
        arg1: 0.11, arg2: 3, 
        range: 3, prob: 70,
        desc: "Raise WIS of self and adjacent familiars at start of battle."
    },

    416 : {
        name: "Bone Smasher", type: 2, func: 4, calc: 2,
        arg1: 1.5, 
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, regardless of position."
    },

    418 : {
        name: "Nemesis", type: 2, func: 4, calc: 2,
        arg1: 2.1, 
        range: 7, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to up to three foes, ignoring position."
    },

    419 : {
        name: "Ichthocannon", type: 2, func: 4, calc: 2,
        arg1: 1.5, 
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },

    420 : {
        name: "Breaking Wave", type: 2, func: 3, calc: 1,
        arg1: 1.35, 
        range: 15, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to all foes in the front/middle line."
    },

    421 : {
        name: "Light of Virtue", type: 2, func: 4, calc: 2,
        arg1: 1.9, arg2: 3, arg3: 0.5,
        range: 16, prob: 30, ward: 3,
        desc: "Deal heavy WIS-based damage and sometimes freeze three random foes, ignoring position."
    },

    422 : {
        name: "Maiden's Prayer", type: 5, func: 29, calc: 0,
        arg1: 0, arg2: 0, arg3: 8, arg4: 1,
        range: 21, prob: 50,
        desc: "Remove the buffs of all foes after receiving an attack."
    },

    423 : {
        name: "Wail of Sorrow", type: 1, func: 32, calc: 0,
        arg1: 0.2, arg2: 2,
        range: 7, prob: 70,
        desc: "Greatly lower DEF of up to three foes."
    },

    424: {
        name: "Ultrasonic", type: 2, func: 4, calc: 1,
        arg1: 1.85, arg2: 2, arg3: 0.2,
        range: 7, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to and sometimes paralyze up to three foes."
    },

    425: {
        name: "Lese Majesty", type: 5, func: 14, calc: 1,
        arg1: 1.5, 
        range: 4, prob: 50, ward: 1,
        desc: "Take damage in place of any ally and unleash a heavy counterattack."
    },

    426: {
        name: "Imperial Gift", type: 2, func: 18, calc: 4,
        arg1: 2, 
        range: 21, prob: 50,
        desc: "Restore HP to self."
    },

    427 : {
        name: "Funerary Rush", type: 2, func: 3, calc: 1, 
        arg1: 1.5,  
        range: 16, prob: 30, ward: 1
    },

    430 : {
        name: "Broken Vow", type: 1, func: 32, calc: 0, 
        arg1: 0.22, arg2: 3,
        range: 7, prob: 70,
        desc: "Greatly lower WIS of up to three foes."
    },

    431 : {
        name: "Lovers' Arrows", type: 2, func: 4, calc: 2, 
        arg1: 1.2,  
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },
    
    433 : {
        name: "Deep Rumble", type: 2, func: 3, calc: 1, 
        arg1: 0.95,  
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to six random foes."
    },

    438 : {
        name: "Poison Torrent", type: 2, func: 3, calc: 1, 
        arg1: 1.3, arg2: 1, arg3: 0.25, 
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to and sometimes poison four random foes."
    },
    
    440 : {
        name: "Thunderstroke", type: 2, func: 4, calc: 3, 
        arg1: 2,  
        range: 23, prob: 30, ward: 2,
        desc: "Deal massive AGI-based damage to two random foes, ignoring position."
    },
    
    441 : {
        name: "Bolt of Judgment", type: 2, func: 4, calc: 2, 
        arg1: 2.15,  
        range: 23, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },    

    437 : {
        name: "Mjolnir", type: 2, func: 4, calc: 1,
        arg1: 1.5, 
        range: 32, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to up to four foes, ignoring position."
    },
    
    442 : {
        name: "Masterstroke", type: 2, func: 4, calc: 1,
        arg1: 1.05, 
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to six random foes, ignoring position."
    },

    443 : {
        name: "Fangs of the Devoted", type: 2, func: 3, calc: 3, 
        arg1: 2,  
        range: 23, prob: 30, ward: 1
    },

    444 : {
        name: "Cruel Swing", type: 2, func: 4, calc: 1, 
        arg1: 1.45,  
        range: 8, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to all foes, ignoring position."
    },

    445 : {
	    name: "Bastion", type: 3, func: 20, calc: 0,  
	    arg1: 0.1,   
        range: 21, prob: 70,
	    desc: "Survive devastating damage as long as HP is above 10%." 
	},

    446 : {
	    name: "Tail Lash", type: 2, func: 4, calc: 2,  
	    arg1: 1.6,   
        range: 32, prob: 30, ward: 2,
	    desc: "Deal heavy WIS-based damage to up to four foes, ignoring position." 
	},

    447 : {
        name: "Looming Nightmare", type: 2, func: 4, calc: 2, 
        arg1: 1.6,  
        range: 32, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to up to four foes, ignoring position."
    },

    448 : {
        name: "Leo's Claws", type: 2, func: 3, calc: 3, 
        arg1: 1.3,  
        range: 19, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to four random foes."
    },

    450 : {
        name: "Aquarius Unleashed", type: 2, func: 4, calc: 2, 
        arg1: 1.25,  
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to five random foes, ignoring position."
    },

    451 : {
        name: "Endless Deluge", type: 1, func: 1, calc: 0, 
        arg1: 452, arg2: 16,
        range: 101, prob: 70,
        desc: "One random ally is automatically revived after being killed."
    },

    452 : {
        name: "Dawn's Tear", type: 16, func: 6, calc: 0, 
        arg1: 1,
        range: 21, prob: 100
    },

    455 : {
        name: "Berserker Rage", type: 2, func: 3, calc: 1, 
        arg1: 0.85,  
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to six random foes."
    },

    456 : {
        name: "Chain Lash", type: 1, func: 32, calc: 0, 
        arg1: 0.5, arg2: 1,
        range: 7, prob: 70,
        desc: "Greatly lower ATK of up to three foes."
    },

    457 : {
        name: "Brink of Death", type: 16, func: 4, calc: 1, 
        arg1: 3.5,
        range: 5, prob: 70, ward: 1,
        desc: "Deal massive ATK-based damage, ignoring position, to one foe upon its death."
    },

    459 : {
        name: "Fleet of Foot", type: 2, func: 4, calc: 3, 
        arg1: 1.3,
        range: 8, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to all foes, ignoring position."
    },

    460 : {
        name : "Void Strike", type: 16, func: 19, calc: 0,
        arg1: 0, arg2: 5, arg3: 0.6, arg4: 1,
        range: 8, prob: 70,
        desc: "High chance to silence all foes for one turn upon his death."
    },

    461 : {
        name : "Lion's Wrath", type: 2, func: 3, calc: 1,
        arg1: 1.35, 
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to four random foes."
    },

    462 : {
        name : "Heroic Might", type: 2, func: 18, calc: 4,
        arg1: 2, 
        range: 113, prob: 50,
        desc: "Restore HP to three random familiars."
    },
    
    463 : {
        name : "Absolute Zero", type: 2, func: 4, calc: 2,
        arg1: 1.7, arg2: 3, arg3: 0.25,
        range: 32, prob: 30, ward: 3,
        desc: "Deal heavy WIS-based damage and sometimes freeze up to four foes, ignoring position."
    },
    
    464 : {
        name : "Chariot Rush", type: 2, func: 3, calc: 3,
        arg1: 1.8, arg2: 2, arg3: 0.3,
        range: 16, prob: 30, ward: 1, // check
        desc: "Deal heavy AGI-based damage to and sometimes paralyze three random foes."
    },

    465 : {
        name : "Stormcaller Pinion", type: 2, func: 4, calc: 2,
        arg1: 1.3, 
        range: 20, prob: 30, ward: 3,
        desc: "Deal WIS-based damage to five random foes, ignoring position."
    },
    
    466 : {
        name : "Blade of Judgment", type: 2, func: 4, calc: 1,
        arg1: 1.8, 
        range: 19, prob: 30, ward: 1
    },
    
    467 : {
        name : "Atonement", type: 1, func: 1, calc: 0,
        arg1: 0.3, arg2: 5, arg3: 7,
        range: 4, prob: 70
    },

    468 : {
        name : "Rain of Death", type: 2, func: 3, calc: 1,
        arg1: 1.7, arg2: 1, arg3: 0.25, arg4: 10,
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage and sometimes envenom three random foes."
    },

    469 : {
        name: "Sand Blade", type: 2, func: 21, calc: 1, 
        arg1: 1.2, arg2: 1, arg3: 0.3, arg4: 0.3, 
        range: 8, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to all foes and sometimes reduce ATK."
    },
    
    471 : {
        name: "Darkflame", type: 2, func: 4, calc: 2, 
        arg1: 1,  
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },
    
    472 : {
        name: "Nightveil", type: 1, func: 1, calc: 0, 
        arg1: 0.1, arg2: 1, arg3: 3, 
        range: 3, prob: 70,
        desc: "Raise WIS and ATK of self and adjacent familiars at start of battle."
    },

    473 : {
        name: "Entomb", type: 2, func: 3, calc: 1, 
        arg1: 1.15,  
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes."
    },

    474 : {
        name: "Embalm", type: 1, func: 1, calc: 0, 
        arg1: 0.3, arg2: 5,  
        range: 3, prob: 70,
        desc: "Reduce physical damage taken by self and adjacent familiars."
    },

    476 : {
        name: "Furious Horns", type: 2, func: 4, calc: 2, 
        arg1: 2,  
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to three random foes, ignoring position."
    },

    477 : {
        name: "Chatter Tooth", type: 2, func: 4, calc: 2, 
        arg1: 1.5, arg2: 3, arg3: 0.3, 
        range: 32, prob: 30, ward: 3,
        desc: "Deal heavy WIS-based damage to and sometimes freeze up to four foes, ignoring position."
    },

    478 : {
        name: "Cancer's Claws", type: 2, func: 3, calc: 1, 
        arg1: 1.65, arg2: 5, arg3: 0.5, arg4: 1, 
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage and sometimes silence three random foes."
    },

    479 : {
        name: "Infiltrate", type: 1, func: 1, calc: 0, 
        arg1: 1, arg2: 18, arg3: 0, arg4: 0, 
        range: 121, prob: 70,
        desc: "Allows a random ally to perform an extra action during the next turn."
    },

    484: {
        name: "Wall of the Brave", type: 5, func: 12, calc: 0,
        arg1: 0, 
        range: 4, prob: 50,
        desc: "Take damage in place of allies"
    },

    485: {
        name: "Shield of the Coward", type: 1, func: 1, calc: 0,
        arg1: 1, arg2: 2, 
        range: 21, prob: 70,
        desc: "Raise DEF of self at start of battle."
    },

    487: {
        name: "Dance of Farewell", type: 2, func: 4, calc: 2,
        arg1: 1.1,
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },

    488: {
        name: "Dance of Reunion", type: 16, func: 6, calc: 0,
        arg1: 1,
        range: 121, prob: 50,
        desc: "Revive one random ally upon her death."
    },

    489: {
        name: "Hardened Steel", type: 1, func: 1, calc: 0,
        arg1: 0.7, arg2: 5, 
        range: 21, prob: 70,
        desc: "Reduce physical damage taken by self greatly."
    },

    490: {
        name: "Steel Hooves", type: 2, func: 3, calc: 1,
        arg1: 1.2, 
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes."
    },

    491: {
        name: "Primitive Rage", type: 2, func: 3, calc: 1,
        arg1: 1.35, 
        range: 32, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to up to four foes."
    },

    492: {
        name: "Razor Pinion", type: 2, func: 4, calc: 1,
        arg1: 1.75, 
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to four random foes, ignoring position."
    },

    494: {
        name: "Hand of Justice", type: 2, func: 4, calc: 2,
        arg1: 1.65, 
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },

    495: {
        name: "Soul Prison", type: 1, func: 32, calc: 0,
        arg1: 0.25, arg2: 4, 
        range: 7, prob: 70,
        desc: "Greatly lower AGI of up to three foes."
    },
    
    496: {
        name: "Flame Cloud", type: 2, func: 4, calc: 2,
        arg1: 2.05, 
        range: 16, prob: 30, ward: 3,
        desc: "Deal massive WIS-based damage to three random foes, ignoring position."
    },

    497: {
        name: "Mighty Stomp", type: 2, func: 4, calc: 1,
        arg1: 2, 
        range: 16, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to three random foes, ignoring position."
    },

    499: {
        name: "Snake Whip", type: 2, func: 4, calc: 1,
        arg1: 1.5, 
        range: 20, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to five random foes, ignoring position."
    },

    500: {
        name: "Spiny Carapace", type: 3, func: 13, calc: 1,
        arg1: 1.2, 
        range: 21, prob: 50, ward: 1,
        desc: "Chance to unleash a counter attack when struck."
    },
    
    501: {
        name: "Dragon Strike", type: 2, func: 22, calc: 1,
        arg1: 1.65, arg2: 2, arg3: 0.3, arg4: 0.3, 
        range: 19, prob: 30, ward: 2,
        desc: "Heavy ATK-based damage to four random foes and sometimes lower DEF, ignoring position."
    },
    
    502: {
        name: "Flashing Blade", type: 2, func: 3, calc: 3,
        arg1: 1.6,
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to three random foes."
    },
    
    503: {
        name: "Wing Aegis", type: 3, func: 20, calc: 0,
        arg1: 0.15,
        range: 21, prob: 70,
        desc: "Survive devastating damage as long as HP is above 15%."
    },

    504: {
        name: "Defender's Thunder", type: 2, func: 4, calc: 3,
        arg1: 2.3, arg2: 2, arg3: 0.35,
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive AGI-based damage, sometimes paralyze three random foes, ignoring position."
    },
    
    507: {
        name: "Sagittarius' Arrow", type: 2, func: 4, calc: 3,
        arg1: 1.2, 
        range: 20, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to five random foes."
    },
    
    508: {
        name: "Sage's Wisdom", type: 1, func: 1, calc: 0,
        arg1: 0.5, arg2: 6, 
        range: 3, prob: 70,
        desc: "Reduce magic damage taken by self and adjacent familiars."
    },

    511: {
        name: "Twin Arrow", type: 2, func: 4, calc: 1,
        arg1: 2.1,
        range: 6, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to up to two foes, ignoring position."
    },

    512: {
        name: "Fists of Gemini", type: 2, func: 4, calc: 1,
        arg1: 2.1,
        range: 6, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to up to two foes, ignoring position."
    },

    10001: { // 100% Mod, Single Hit, WIS-based, position independent
        name: "Standard Action", type: 2, func: 4, calc: 2,
        arg1: 1,
        range: 5, prob: 100, ward: 2, isAutoAttack: true
    },

    10004: { // 105% Mod, Single Hit, WIS-based, position independent, paralyze (Lahamu)
        name: "Standard Action", type: 2, func: 4, calc: 2,
        arg1: 1.05, arg2: 2, arg3: 0.2,
        range: 5, prob: 100, ward: 2, isAutoAttack: true
    },

    10006: { // 105% Mod, 3 Random Hits, ATK-based, position dependent (Ettin)
        name: "Standard Action", type: 2, func: 3, calc: 1,
        arg1: 1.05, 
        range: 16, prob: 100, ward: 1, isAutoAttack: true
    },

    10007: { // use this for normal wis-based auto skill
        name: "Standard Action", type: 2, func: 4, calc: 2,
        arg1: 1, 
        range: 5, prob: 100, ward: 2, isAutoAttack: true
    },

    10008: { // 65% Mod, Single Hit, WIS-based, position independent
        name: "Standard Action", type: 2, func: 4, calc: 2,
        arg1: 0.65, 
        range: 5, prob: 100, ward: 2, isAutoAttack: true
    },

    10009: { // 100% Mod, Single Hit, WIS-based, position independent, freeze
        name: "Standard Action", type: 2, func: 4, calc: 2,
        arg1: 1, arg2: 3, arg3: 0.1,
        range: 5, prob: 100, ward: 2, isAutoAttack: true
    },

    10010: { // 110% Mod, Three Hit Cone, ATK-based, position independent (Brang)   
        name: "Standard Action", type: 2, func: 4, calc: 1,
        arg1: 1.1,
        range: 7, prob: 100, ward: 1, isAutoAttack: true
    },

    10012: { // 100% Mod, Single Hit, ATK-based, position dependent, poison
        name: "Standard Action", type: 2, func: 3, calc: 1,
        arg1: 1, arg2: 1, arg3: 0.4,
        range: 5, prob: 100, ward: 1, isAutoAttack: true
    },

    10014: { // 100% Mod, Single Hit, ATK-based, position dependent, paralyze
        name: "Standard Action", type: 2, func: 3, calc: 1,
        arg1: 1, arg2: 2, arg3: 0.4,
        range: 5, prob: 100, ward: 1, isAutoAttack: true
    },

    10016: { // same as 10007, but with flame animation
        name: "Standard Action", type: 2, func: 4, calc: 2,
        arg1: 1, 
        range: 5, prob: 100, ward: 2, isAutoAttack: true
    },

    10017: { // 100% Mod, Single Hit, ATK-based, position dependent, envenom
        name: "Standard Action", type: 2, func: 3, calc: 1,
        arg1: 1, arg2: 1, arg3: 0.4, arg4: 10,
        range: 5, prob: 100, ward: 1, isAutoAttack: true
    },
    
    10019: { // 100% Mod, Single Hit, WIS-based, position independent, breath based
        name: "Standard Action", type: 2, func: 4, calc: 2,
        arg1: 1,
        range: 5, prob: 100, ward: 3, isAutoAttack: true
    },

    10020: { // 60% Mod, 2 Random Hits, ATK-based, position dependent
        name: "Standard Action", type: 2, func: 3, calc: 1,
        arg1: 0.6, 
        range: 23, prob: 100, ward: 1, isAutoAttack: true
    },

    10021: { // 120% Mod, Single Hit, ATK-Based, position independent
        name: "Standard Action", type: 2, func: 4, calc: 1,
        arg1: 1.2, 
        range: 5, prob: 100, ward: 1, isAutoAttack: true
    },
    
    99000 : {
        name : "Raging Flames", type: 2, func: 3, calc: 3,
        arg1: 2.4, 
        range: 16, prob: 30, ward: 1
    },
    
    99002 : {
        name : "Inferno", type: 2, func: 3, calc: 1,
        arg1: 1.4, 
        range: 19, prob: 30, ward: 1
    }    
};
