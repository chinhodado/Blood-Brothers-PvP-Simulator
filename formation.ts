class Formation {

    static FORMATION_NAME = {
        50 : "5-Skein",
        51 : "5-Valley",
        52 : "5-Tooth",
        53 : "5-Wave",
        54 : "5-Front",
        55 : "5-Mid",
        56 : "5-Rear",
        57 : "5-Pike",
        58 : "5-Shiled",
        59 : "5-Pincer",
    };
    
    static FORMATION_CONFIG = {
        50 : [1,2,3,2,1], // 1: rear, 2: mid, 3: front
        51 : [3,2,1,2,3],
        52 : [3,1,3,1,3],
        53 : [1,3,2,3,1],
        54 : [3,3,3,3,3],
        55 : [2,2,2,2,2],
        56 : [1,1,1,1,1],
        57 : [1,1,3,1,1],
        58 : [3,3,1,3,3],
        59 : [1,3,1,3,1],
    };
       
    id : number;
    
    constructor(id : number) {
        this.id = id;
    }
    
    /**
     * Given a position (from 0-5), return the row of the familiar currently at that position based
     * on the current formation
     */
    getCardRow(position : number) : ENUM.FormationRow {
        return Formation.FORMATION_CONFIG[this.id][position];
    }
}