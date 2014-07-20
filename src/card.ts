/// <reference path="enums.ts"/>

class Card {

    static NEW_DEBUFF_LOW_LIMIT_FACTOR = 0.4;

    name: string;
    fullName: string;    
    id: number; // id for this simulator, not the id in game
    isMounted: boolean;
    isWarlord: boolean;
    imageLink: string;

    private stats: Stats;
    originalStats: Stats;
    status: Status;
    affliction: Affliction;
    isDead: boolean;

    player: Player;
    formationColumn: number; // 0 to 4
    formationRow: ENUM.FormationRow; // 1, 2 or 3

    skills: Skill[];
    autoAttack: Skill;
    
    private openingSkills: Skill[] = [];
    private activeSkills:  Skill[] = [];
    private protectSkills: Skill[] = [];
    private defenseSkills: Skill[] = [];
    private ondeathSkills: Skill[] = [null, null]; // first is buff, second is inherent
    
    constructor(cardData, player: Player, formationColumn: number, skills: Skill[]) {
        this.name = cardData.name;
        this.fullName = cardData.fullName;
        this.id = player.id * 100 + formationColumn; // 100-104, 200-204
        this.isMounted = cardData.isMounted;
        this.isWarlord = cardData.isWarlord;
        this.imageLink = cardData.img;

        // the HP will be modified during the battle
        this.stats = new Stats(cardData.stats[0], cardData.stats[1], cardData.stats[2], cardData.stats[3], cardData.stats[4]);
        
        // this should never be modified
        this.originalStats = new Stats(cardData.stats[0], cardData.stats[1], cardData.stats[2], cardData.stats[3], cardData.stats[4]);

        this.status = new Status();
        this.isDead = false;

        this.player = player; // 1: me, 2: opponent
        this.formationColumn = formationColumn;
        this.formationRow = player.formation.getCardRow(formationColumn);

        this.skills = skills;

        if (cardData.autoAttack) {
            this.autoAttack = new Skill(cardData.autoAttack);
        }
        else {
            this.autoAttack = new Skill(10000);
        }

        for (var i = 0; i < skills.length; i++) {
            var skill = skills[i];
            if (skill) {
                if (skill.skillType === ENUM.SkillType.OPENING) {
                    this.openingSkills.push(skill);
                }
                else if (skill.skillType === ENUM.SkillType.ACTIVE) {
                    this.activeSkills.push(skill);
                }
                else if (skill.skillType === ENUM.SkillType.PROTECT) {
                    this.protectSkills.push(skill);
                }
                else if (skill.skillType === ENUM.SkillType.DEFENSE) {
                    this.defenseSkills.push(skill);
                }
                else if (skill.skillType === ENUM.SkillType.ACTION_ON_DEATH) {
                    this.ondeathSkills[1] = skill;
                }
            }
        }
    }
    
    getSerializableObject() {
        return {
            name: this.name,
            fullName: this.fullName,            
            id: this.id,
            isMounted: this.isMounted,
            isWarlord: this.isWarlord,
            imageLink: this.imageLink,

            stats: this.stats,
            originalStats: this.originalStats,
            status: this.status,
            affliction: this.affliction,
            isDead: this.isDead,
                     
            player: this.player,
            formationColumn: this.formationColumn,
            formationRow : this.formationRow,

            skills: getSerializableObjectArray(this.skills),
            autoAttack: this.autoAttack.getSerializableObject(),
    
            openingSkills: getSerializableObjectArray(this.openingSkills),
            activeSkills:  getSerializableObjectArray(this.activeSkills),
            protectSkills: getSerializableObjectArray(this.protectSkills),
            defenseSkills: getSerializableObjectArray(this.defenseSkills),
            ondeathSkills: getSerializableObjectArray(this.ondeathSkills),
        }
    }

    getRandomOpeningSkill(): Skill {
        if (this.openingSkills.length === 0) {
            return null;
        }
        else {
            return getRandomElement(this.openingSkills);
        }
    }

    getRandomActiveSkill(): Skill {
        if (this.activeSkills.length === 0) {
            return null;
        }
        else {
            return getRandomElement(this.activeSkills);
        }
    }

    getRandomDefenseSkill(): Skill {
        if (this.defenseSkills.length === 0) {
            return null;
        }
        else {
            return getRandomElement(this.defenseSkills);
        }
    }

    getRandomProtectSkill(): Skill {
        if (this.protectSkills.length === 0) {
            return null;
        }
        else {
            return getRandomElement(this.protectSkills);
        }
    }
    
    getFirstActiveSkill(): Skill {
        return this.activeSkills[0];
    }
    
    getSecondActiveSkill(): Skill {
        return this.activeSkills[1];
    }

    // ondeath skills
    getBuffOnDeathSkill(): Skill {
        return this.ondeathSkills[0];
    }
    getInherentOnDeathSkill(): Skill {
        return this.ondeathSkills[1];
    }
    hasOnDeathSkill(): boolean {
       return (this.ondeathSkills[0] != null) || (this.ondeathSkills[1] != null);
    }
    clearBuffOnDeathSkill(): void {
        this.ondeathSkills[0] = null;
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

    // affliction
    setAffliction(type: ENUM.AfflictionType, option: AfflectOptParam) {

        if(this.affliction){
            if (this.affliction.getType() === type){
                this.affliction.add(option);
                return;
            }
            else {
                this.clearAffliction();
            }
        }
        this.affliction = AfflictionFactory.getAffliction(type);
        this.affliction.add(option);
    }

    clearAffliction(): void{
        if(!this.affliction){
            return;
        }
        this.affliction.clear();
        this.affliction = null;
    }

    canAttack(): boolean {
        return (this.affliction) ? this.affliction.canAttack() : true;
    }

    canUseSkill():boolean {
        return (this.affliction) ? this.affliction.canUseSkill() : true;
    }

    willMiss(): boolean {
        return (this.affliction) ? this.affliction.canMiss() : false;
    }

    getAfflictionType(): ENUM.AfflictionType {
        return this.affliction ? this.affliction.getType() : null;
    }

    getPoisonPercent(): number {
        if (!this.affliction || this.affliction.type != ENUM.AfflictionType.POISON) {
            return undefined;
        }
        else {
            return (<PoisonAffliction>this.affliction).percent;    
        }
    }

    // return true if an affliction was cleared
    updateAffliction(): boolean{
        if(!this.affliction){
            return false;
        }

        this.affliction.update(this);
        
        if(this.affliction && this.affliction.isFinished()){
            this.clearAffliction();
            return true;
        }

        // still have affliction
        return false;
    }
    
    changeStatus(statusType: ENUM.StatusType, amount: number, isNewLogic?: boolean): void {
        if (isNewLogic) {
            this.status.isNewLogic[statusType] = true;
        }

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
        else if (statusType === ENUM.StatusType.WILL_ATTACK_AGAIN) {
            this.status.willAttackAgain = amount;
        }
        else if (statusType === ENUM.StatusType.ACTION_ON_DEATH) {
            var skill = new Skill(amount);
            this.ondeathSkills[0] = skill;
            this.status.actionOnDeath = amount;
        }
        else {
            throw new Error ("Invalid status type");
        }
    }
    
    clearAllPositiveStatus() {
        // for now, only clear beneficial status
        if (this.status.atk > 0) this.status.atk = 0;
        if (this.status.def > 0) this.status.def = 0;
        if (this.status.wis > 0) this.status.wis = 0;
        if (this.status.agi > 0) this.status.agi = 0;

        if (this.status.attackResistance > 0) this.status.attackResistance = 0;
        if (this.status.magicResistance > 0) this.status.magicResistance = 0;
        if (this.status.breathResistance > 0) this.status.breathResistance = 0;

        if (this.status.skillProbability > 0) this.status.skillProbability = 0;

        if (this.status.actionOnDeath > 0) this.status.actionOnDeath = 0;
        this.clearBuffOnDeathSkill();

        if (this.status.willAttackAgain > 0) this.status.willAttackAgain = 0;
    }

    hasPositiveStatus() {
        var hasPositiveStatus = false;
        var status = this.status;

        if (status.atk > 0 || status.def > 0 || status.wis > 0 || status.agi > 0 ||
            status.attackResistance > 0 || status.magicResistance > 0 || status.breathResistance > 0 ||
            status.skillProbability > 0 || status.actionOnDeath > 0 || status.willAttackAgain > 0) 
        {
            hasPositiveStatus = true;
        }

        return hasPositiveStatus;
    }

    getHP () {
        return this.stats.hp;
    }
    changeHP (amount : number) {
        this.stats.hp += amount;

        if (this.stats.hp > this.originalStats.hp) {
            this.stats.hp = this.originalStats.hp;
        }
    }
    isFullHealth(): boolean {
        return this.stats.hp == this.originalStats.hp;
    }
    getHPRatio(): number {
        return this.stats.hp/this.originalStats.hp;
    }
    
    revive(hpRatio: number) {
        if (!this.isDead) {
            throw new Error("You can't revive a card that is not dead!");
        }

        this.isDead = false;
        this.status = new Status();
        this.stats.hp = this.originalStats.hp * hpRatio;
    }

    getATK () {
        var value = this.stats.atk + this.status.atk;

        if (value < 0) {
            value = 0;
        }

        value = this.adjustByNewDebuffLogic(ENUM.StatusType.ATK, value, this.originalStats.atk);

        return value;
    }
    getDEF () {
        var value = this.stats.def + this.status.def;

        if (value < 0) {
            value = 0;
        }

        value = this.adjustByNewDebuffLogic(ENUM.StatusType.DEF, value, this.originalStats.def);

        return value;
    }
    getWIS () {
        var value = this.stats.wis + this.status.wis;

        if (value < 0) {
            value = 0;
        }

        value = this.adjustByNewDebuffLogic(ENUM.StatusType.WIS, value, this.originalStats.wis);

        return value;
    }
    getAGI () {
        var value = this.stats.agi + this.status.agi;

        if (value < 0) {
            value = 0;
        }

        value = this.adjustByNewDebuffLogic(ENUM.StatusType.AGI, value, this.originalStats.agi);

        return value;
    }

    adjustByNewDebuffLogic(type: ENUM.StatusType, value: number, originalValue: number) {
        if (this.status.isNewLogic[type]) {
            var lowerLimit = originalValue * Card.NEW_DEBUFF_LOW_LIMIT_FACTOR;
            value = (value > lowerLimit) ? value : lowerLimit;
        }
        return value;
    }

    hasWardOfType(type: ENUM.WardType): boolean {
        switch (type) {
            case ENUM.WardType.PHYSICAL:
                return this.status.attackResistance !== 0;
            case ENUM.WardType.MAGICAL:
                return this.status.magicResistance !== 0;
            case ENUM.WardType.BREATH:
                return this.status.breathResistance !== 0;
            default:
                throw new Error ("Invalid type of ward!");
        }
    }
}

class Stats {

    hp: number;
    atk: number;
    def: number;
    wis: number;
    agi: number;
    
    constructor(hp: number, atk: number, def: number, wis: number, agi: number) {
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.wis = wis;
        this.agi = agi;
    }
}

class Status {
    // the amount changed because of buffs or debuffs
    atk: number = 0;
    def: number = 0;
    wis: number = 0;
    agi: number = 0;

    attackResistance: number = 0;
    magicResistance:  number = 0;
    breathResistance: number = 0;

    skillProbability: number = 0;

    actionOnDeath: number = 0;

    willAttackAgain: number = 0;

    isNewLogic = {};
}