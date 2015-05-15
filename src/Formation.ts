/// <reference path="Enums.ts"/>

class Formation {
    static FORMATION_CONFIG = {};
    static UNI_PROC_ORDER = {}; // Universal proc order (same as iOS previously)

    // hacky, since TS does not have syntax for static initialization yet
    static whyfoo = Formation.initialize();

    static initialize() {
        // 1: front, 2: mid, 3: rear
        Formation.FORMATION_CONFIG[ENUM.FormationType.SKEIN_5  ] = [3, 2, 1, 2, 3];
        Formation.FORMATION_CONFIG[ENUM.FormationType.VALLEY_5 ] = [1, 2, 3, 2, 1];
        Formation.FORMATION_CONFIG[ENUM.FormationType.TOOTH_5  ] = [1, 3, 1, 3, 1];
        Formation.FORMATION_CONFIG[ENUM.FormationType.WAVE_5   ] = [3, 1, 2, 1, 3];
        Formation.FORMATION_CONFIG[ENUM.FormationType.FRONT_5  ] = [1, 1, 1, 1, 1];
        Formation.FORMATION_CONFIG[ENUM.FormationType.MID_5    ] = [2, 2, 2, 2, 2];
        Formation.FORMATION_CONFIG[ENUM.FormationType.REAR_5   ] = [3, 3, 3, 3, 3];
        Formation.FORMATION_CONFIG[ENUM.FormationType.PIKE_5   ] = [3, 3, 1, 3, 3];
        Formation.FORMATION_CONFIG[ENUM.FormationType.SHIELD_5 ] = [1, 1, 3, 1, 1];
        Formation.FORMATION_CONFIG[ENUM.FormationType.PINCER_5 ] = [3, 1, 3, 1, 3];
        Formation.FORMATION_CONFIG[ENUM.FormationType.SAW_5    ] = [1, 3, 2, 3, 1];
        Formation.FORMATION_CONFIG[ENUM.FormationType.HYDRA_5  ] = [3, 3, 1, 1, 1];

        Formation.UNI_PROC_ORDER[ENUM.FormationRow.FRONT] = [11, 12, 13, 14, 15];
        Formation.UNI_PROC_ORDER[ENUM.FormationRow.MID]   = [6, 7, 8, 9, 10];
        Formation.UNI_PROC_ORDER[ENUM.FormationRow.REAR]  = [1, 2, 3, 4, 5];
        return null;
    }

    type: ENUM.FormationType;

    constructor(type: ENUM.FormationType) {
        this.type = type;
    }

    static getProcIndex(row: ENUM.FormationRow, column: number): number {
        return Formation.UNI_PROC_ORDER[row][column];
    }

    /**
     * Given a position (from 0-5), return the row of the familiar currently at that position based
     * on the current formation
     */
    getCardRow(position: number): ENUM.FormationRow {
        return Formation.FORMATION_CONFIG[this.type][position];
    }

    /**
     * Return the config array of the current formation
     */
    getFormationConfig(): number[] {
        return Formation.FORMATION_CONFIG[this.type];
    }
}
