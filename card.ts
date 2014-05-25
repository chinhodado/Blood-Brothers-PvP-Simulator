class Card {

    name : string;
    stats : Stats;
    originalStats : Stats;
    skills : Skill[];
    player : Player;
    isDead : boolean;
    
    constructor(name : string, stats : Stats, skills : Skill[], player : Player) {
        this.name = name;
        this.stats = stats; // this will be modified during the battle
        this.originalStats = 
            new Stats(stats.hp, stats.atk, stats.def, stats.wis, stats.agi); // this should never be modified
        this.skills = skills;
        this.player = player; // 0: me, 1: opponent
    
        this.isDead = false;
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