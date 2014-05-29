class Card {

    name : string;
    stats : Stats;
    id : number; // id for this simulator, not the id in game
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
        this.player = player; // 1: me, 2: opponent
    
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
        
        this.id = player.id * 100 + formationColumn; // 100-104, 200-204
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
    
    getStat(statType : String) : number {
        if (statType === "HP") {
            return this.stats.hp;
        }
        else if (statType === "ATK") {
            return this.stats.atk;
        }
        else if (statType === "DEF") {
            return this.stats.def;
        }
        else if (statType === "WIS") {
            return this.stats.wis;
        }
        else if (statType === "AGI") {
            return this.stats.agi;
        }
        else if (statType === "DEFAULT") {
            return this.stats.wis; // default for skill
        }
        else {
            throw new Error ("Invalid stat type");
        }
    }
    
    addStat(statType : String, amount : number) : void {
        if (statType === "HP") {
            this.stats.hp += amount;
        }
        else if (statType === "ATK") {
            this.stats.atk += amount;
        }
        else if (statType === "DEF") {
            this.stats.def += amount;
        }
        else if (statType === "WIS") {
            this.stats.wis += amount;
        }
        else if (statType === "AGI") {
            this.stats.agi += amount;
        }
        else {
            throw new Error ("Invalid stat type");
        }
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