"use strict";

var SkillDatabase = {

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
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
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

    123 : {
        name: "Flame Fist", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.7, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },

    124 : {
        name: "Ice Fist", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.7, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },
    
    134 : {
        name: "Magic Ward 2", skillType: 1, skillFunc: 1, skillCalcType: 0,
        skillFuncArg1: 0.4, skillFuncArg2: 6, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 4, maxProbability: 70
    },
    
    138 : {
        name: "Head Bash", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 3, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL"
    },
    
    139 : {
        name: "Mad Dash", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 2, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL"
    },
    
    142 : {
        name: "Barrage", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 0.9, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 20, maxProbability: 30, ward: "PHYSICAL"
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
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL"
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
    
    216 : {
        name: "Bodycheck", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 2.5, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 6, maxProbability: 30, ward: "PHYSICAL"
    },

    221 : {
        name: "Skittering Darkness", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.5, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },

    222 : {
        name: "Boastful Blade", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.9, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL"
    },

    229 : {
        name: "Spirit Word", skillType: 2, skillFunc: 3, skillCalcType: 2, 
        skillFuncArg1: 2.1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
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

    249 : {
        name: "Steelscales", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 0.9, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 17, maxProbability: 30, ward: "PHYSICAL"
    },

    251 : {
        name: "Hungry Beak", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 20, maxProbability: 30, ward: "PHYSICAL"
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

    259 : {
        name: "Hell Spark", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.1, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL"
    },

    264 : {
        name: "Bone Crush", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.95, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },

    294 : {
        name: "Mocking Laugh", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 2.5, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL"
    },

    303 : {
        name: "Chill Horn", skillType: 2, skillFunc: 3, skillCalcType: 2, 
        skillFuncArg1: 1.9, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },

    307 : {
        name: "Evil Wink", skillType: 2, skillFunc: 3, skillCalcType: 2, 
        skillFuncArg1: 1.8, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },
    
    314 : {
        name: "Fearless Laugh", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.3, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 32, maxProbability: 30, ward: "PHYSICAL"
    },

    321 : {
        name: "Roaring Blood", skillType: 2, skillFunc: 3, skillCalcType: 2, 
        skillFuncArg1: 0.95, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 17, maxProbability: 30, ward: "PHYSICAL"
    },

    327 : {
        name: "Test of Courage", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.6, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
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

    362 : {
        name: "Rite of Vengeance", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.85, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL"
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

    390 : {
        name: "Libra's Retribution", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.6, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },

    427 : {
        name: "Funerary Rush", skillType: 2, skillFunc: 3, skillCalcType: 1, 
        skillFuncArg1: 1.5, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },

    443 : {
        name: "Fangs of the Devoted", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 2, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 23, maxProbability: 30, ward: "PHYSICAL"
    },

    448 : {
        name: "Leo's Claws", skillType: 2, skillFunc: 3, skillCalcType: 3, 
        skillFuncArg1: 1.3, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0, 
        skillRange: 19, maxProbability: 30, ward: "PHYSICAL"
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
    
    99000 : {
        name : "Raging Flames", skillType: 2, skillFunc: 3, skillCalcType: 3,
        skillFuncArg1: 2.4, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 16, maxProbability: 30, ward: "PHYSICAL"
    },
    
    99001 : {
        name : "Rippling Flame", skillType: 2, skillFunc: 3, skillCalcType: 1,
        skillFuncArg1: 1.85, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
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
    },
    
    99004 : {
        name : "Flash", skillType: 2, skillFunc: 3, skillCalcType: 2,
        skillFuncArg1: 2.25, skillFuncArg2: 0, skillFuncArg3: 0, skillFuncArg4: 0, skillFuncArg5: 0,
        skillRange: 16, maxProbability: 30, ward: "MAGICAL"  
    },
};
