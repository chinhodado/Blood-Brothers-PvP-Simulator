/**
 * A structure for holding a battle's data
 */
interface GameData {
    p1_formation: string;
    p2_formation: string;
    p1_cardIds: number[];
    p2_cardIds: number[];
    p1_warlordSkillIds: number[];
    p2_warlordSkillIds: number[];
    p1_customStats: CustomStatList;
    p2_customStats: CustomStatList;
    p1_customSkills: CustomSkillList;
    p2_customSkills: CustomSkillList;
}

interface CustomStats {
    hp: number;
    atk: number;
    def: number;
    wis: number;
    agi: number;
}

interface CustomStatList {
    [id: number]: CustomStats;
}

interface CustomSkillList {
    [id: number]: number[];
}
