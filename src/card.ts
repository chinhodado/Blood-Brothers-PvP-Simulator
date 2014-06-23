/// <reference path="enums.ts"/>

class Card {

    name : string;
    stats : Stats;
    id : number; // id for this simulator, not the id in game
    originalStats : Stats;
    status : Status;
    skills : Skill[];
    player : Player;
    isDead : boolean;

    autoAttack: Skill;
    
    openingSkill : Skill;
    attackSkill : Skill;
    protectSkill: Skill;
    defenseSkill: Skill;
    
    formationColumn : number; // 0 to 4
    formationRow : ENUM.FormationRow; // 1, 2 or 3
    
    imageLink : string;
    
    constructor(name: string, stats: Stats, skills: Skill[], player: Player, formationColumn, imageLink: string, autoAttack: Skill) {
        this.name = name;
        this.stats = stats; // this will be modified during the battle
        this.status = new Status();
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
                if (skill.skillType == ENUM.SkillType.OPENING) {
                    this.openingSkill = skill;
                }
                else if (skill.skillType == ENUM.SkillType.ATTACK) {
                    this.attackSkill = skill;
                }
                else if (skill.skillType == ENUM.SkillType.PROTECT) {
                    this.protectSkill = skill;
                }
                else if (skill.skillType == ENUM.SkillType.DEFENSE) {
                    this.defenseSkill = skill;
                }
            }
        }
        
        this.imageLink = imageLink;
        this.autoAttack = autoAttack;

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
    
    getFormationRow() : ENUM.FormationRow {
        return this.formationRow;
    }
    
    getStat(statType : String) : number {
        if (statType === "HP") {
            return this.getHP();
        }
        else if (statType === "ATK") {
            return this.getATK();
        }
        else if (statType === "DEF") {
            return this.getDEF();
        }
        else if (statType === "WIS") {
            return this.getWIS();
        }
        else if (statType === "AGI") {
            return this.getAGI();
        }
        else if (statType === "DEFAULT") {
            return this.getWIS(); // default for skill
        }
        else {
            throw new Error ("Invalid stat type");
        }
    }
    
    changeStatus(statusType : ENUM.StatusType, amount : number) : void {
        if (statusType === ENUM.StatusType.ATK) {
            this.status.atk += amount;
        }
        else if (statusType === ENUM.StatusType.DEF) {
            this.status.def += amount;
        }
        else if (statusType === ENUM.StatusType.WIS) {
            this.status.wis += amount;
        }
        else if (statusType === ENUM.StatusType.AGI) {
            this.status.agi += amount;
        }
        else if (statusType === ENUM.StatusType.ATTACK_RESISTANCE) {
            if (this.status.attackResistance < amount) {
                this.status.attackResistance = amount; // do not stack
            }
        }
        else if (statusType === ENUM.StatusType.MAGIC_RESISTANCE) {
            if (this.status.magicResistance < amount) {
                this.status.magicResistance = amount; // do not stack
            }
        }
        else if (statusType === ENUM.StatusType.BREATH_RESISTANCE) {
            if (this.status.breathResistance < amount) {
                this.status.breathResistance = amount; // do not stack
            }
        }
        else if (statusType === ENUM.StatusType.SKILL_PROBABILITY) {
            this.status.skillProbability += amount;
        }
        else {
            throw new Error ("Invalid status type");
        }
    }
    
    getHP () {
        return this.stats.hp;
    }
    changeHP (amount : number) {
        this.stats.hp += amount;
    }
    
    getATK () {
        return this.stats.atk + this.status.atk;
    }
    getDEF () {
        return this.stats.def + this.status.def;
    }
    getWIS () {
        return this.stats.wis + this.status.wis;
    }
    getAGI () {
        return this.stats.agi + this.status.agi;
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

class Status {
    // the amount changed because of buffs or debuffs
    atk : number = 0;
    def : number = 0;
    wis : number = 0;
    agi : number = 0;

    attackResistance : number = 0;
    magicResistance :  number = 0;
    breathResistance : number = 0;

    skillProbability : number = 0;
}