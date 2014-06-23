function getDamageCalculatedByATK(attacker : Card, defender : Card, ignorePosition : boolean) {
    var ATTACK_FACTOR = 0.3;
    var DIFF_FACTOR = 0.2;
    
    var POS_ATTACK_FACTOR = {};
    POS_ATTACK_FACTOR[ENUM.FormationRow.REAR]  = 0.8;
    POS_ATTACK_FACTOR[ENUM.FormationRow.MID]   = 1;
    POS_ATTACK_FACTOR[ENUM.FormationRow.FRONT] = 1.2;
    
    var POS_DAMAGE_FACTOR = {};
    POS_DAMAGE_FACTOR[ENUM.FormationRow.REAR]  = 0.8;
    POS_DAMAGE_FACTOR[ENUM.FormationRow.MID]   = 1;
    POS_DAMAGE_FACTOR[ENUM.FormationRow.FRONT] = 1.2;
    
    var baseDamage = attacker.getATK() * ATTACK_FACTOR;
    var damage = ((attacker.getATK() - defender.getDEF()) * DIFF_FACTOR) + baseDamage;
    
    if (!ignorePosition) {
        damage *= POS_ATTACK_FACTOR[attacker.getFormationRow()];
        damage *= POS_DAMAGE_FACTOR[defender.getFormationRow()];
    }
    
    //set lower limit
    if (damage < baseDamage * 0.1) {
        damage = baseDamage * 0.1;
    }
    
    damage = Math.floor(damage * getRandomArbitary(0.9, 1.1));
    
    return damage;
}

function getDamageCalculatedByAGI(attacker : Card, defender : Card, ignorePosition : boolean) {
    var ATTACK_FACTOR = 0.3;
    var DIFF_FACTOR = 0.2;
    
    var POS_ATTACK_FACTOR = {};
    POS_ATTACK_FACTOR[ENUM.FormationRow.REAR]  = 0.8;
    POS_ATTACK_FACTOR[ENUM.FormationRow.MID]   = 1;
    POS_ATTACK_FACTOR[ENUM.FormationRow.FRONT] = 1.2;
    
    var POS_DAMAGE_FACTOR = {};
    POS_DAMAGE_FACTOR[ENUM.FormationRow.REAR]  = 0.8;
    POS_DAMAGE_FACTOR[ENUM.FormationRow.MID]   = 1;
    POS_DAMAGE_FACTOR[ENUM.FormationRow.FRONT] = 1.2;
    
    var baseDamage = attacker.getAGI() * ATTACK_FACTOR;
    var damage = ((attacker.getAGI() - defender.getDEF()) * DIFF_FACTOR) + baseDamage;
    
    if (!ignorePosition) {
        damage *= POS_ATTACK_FACTOR[attacker.getFormationRow()];
        damage *= POS_DAMAGE_FACTOR[defender.getFormationRow()];
    }
    
    //set lower limit
    if (damage < baseDamage * 0.1) {
        damage = baseDamage * 0.1;
    }
    
    damage = Math.floor(damage * getRandomArbitary(0.9, 1.1));
    
    return damage;
}

function getDamageCalculatedByWIS(attacker : Card, defender : Card) {
    var ATTACK_FACTOR = 0.3;
    var WIS_DEF_FACTOR = 0.5;
    var DIFF_FACTOR = 0.2;
 
    var baseDamage = attacker.getWIS() * ATTACK_FACTOR;
    var targetWisDef = (defender.getWIS() + defender.getDEF()) * WIS_DEF_FACTOR;
    var damage = ((attacker.getWIS() - targetWisDef) * DIFF_FACTOR) + baseDamage;

    //set lower limit
    if (damage < baseDamage * 0.1) {
        damage = baseDamage * 0.1;
    }

    damage = Math.floor(damage * getRandomArbitary(0.9, 1.1));

    return damage;
}