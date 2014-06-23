/// <reference path="enums.ts"/>

class Formation {

    static FORMATION_CONFIG = {
        SKEIN_5  : [3,2,1,2,3], // 1: front, 2: mid, 3: rear
        VALLEY_5 : [1,2,3,2,1],
        TOOTH_5  : [1,3,1,3,1],
        WAVE_5   : [3,1,2,1,3],
        FRONT_5  : [1,1,1,1,1],
        MID_5    : [2,2,2,2,2],
        REAR_5   : [3,3,3,3,3],
        PIKE_5   : [3,3,1,3,3],
        SHIELD_5 : [1,1,3,1,1],
        PINCER_5 : [3,1,3,1,3]
    };
       
    type : string;
    
    constructor(type : string) {
        this.type = type;
    }
    
    /**
     * Given a position (from 0-5), return the row of the familiar currently at that position based
     * on the current formation
     */
    getCardRow(position : number) : ENUM.FormationRow {
        return Formation.FORMATION_CONFIG[this.type][position];
    }
    
    /**
     * Return the config array of the current formation
     */
    getFormationConfig() : number[] {
        return Formation.FORMATION_CONFIG[this.type];
    }
}