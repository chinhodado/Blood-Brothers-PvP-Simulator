class Card {

    name : string;
    stats : Stats;
    originalStats : Stats;
    skills : Skill[];
    player : Player;
    isDead : boolean;
    
    openingSkill : Skill;
    attackSkill : Skill;
    protectSkill :Skill;   
    
    formationColumn : number; // 0 to 4
    formationRow : number; // 1, 2 or 3
    
    constructor(name : string, stats : Stats, skills : Skill[], player : Player, formationColumn) {
        this.name = name;
        this.stats = stats; // this will be modified during the battle
        this.originalStats = 
            new Stats(stats.hp, stats.atk, stats.def, stats.wis, stats.agi); // this should never be modified
        this.skills = skills;
        this.player = player; // 0: me, 1: opponent
    
        this.isDead = false;
        this.formationColumn = formationColumn;
        this.formationRow = player.formation.getCardRow(formationColumn);
        
        for (var i = 0; i < skills.length; i++) {
            var skill = skills[i];
            if (skill) {
                if (skill.skillType == 1) {
                    this.openingSkill = skill;
                }
                else if (skill.skillType == 2) {
                    this.attackSkill = skill;
                }
                else if  (skill.skillType == 5) {
                    this.protectSkill = skill;
                }
            }
        }
    }
    
    getName() {
        return this.name;
    }
    
    getPlayerId() {
        return this.player.id;
    }
    
    getPlayerName() {
        return this.player.name;
    }
    
    getFormationRow() {
        return this.formationRow;
    }    
}

class Stats {

    hp : number;
    atk : number;
    def : number;
    wis : number;
    agi : number;
    
    constructor(hp : number, atk : number, def : number, wis : number, agi : number) {
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.wis = wis;
        this.agi = agi;
    }
}