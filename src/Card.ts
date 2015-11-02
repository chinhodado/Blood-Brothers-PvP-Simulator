/// <reference path="Enums.ts"/>
/// <reference path="Stats.ts"/>
/// <reference path="affliction/AfflictionFactory.ts"/>

class Card {
    static NEW_DEBUFF_LOW_LIMIT_FACTOR = 0.4;
    static COLISEUM_HP_MULTI_FACTOR    = 5;

    name: string;
    fullName: string;
    dbId: number; // the id in game (used in famDatabase)
    id: number;   // id for this simulator, not the id in game
    isMounted: boolean;
    isWarlord: boolean;
    imageLink: string;
    rarity: ENUM.RarityType;
    evoStep: number;

    private stats: Stats;
    originalStats: Stats;
    status: Status;
    affliction: Affliction;
    isDead: boolean;
    bcAddedProb: number = 0; // added probability for bloodclash

    lastBattleDamageTaken: number = 0;
    lastBattleDamageDealt: number = 0;
    justMissed: boolean = false;
    justEvaded: boolean = false;

    player: Player;
    formationColumn: number; // 0 to 4
    formationRow: ENUM.FormationRow; // 1, 2 or 3
    procIndex: number;

    skills: Skill[];
	passiveSkills: Skill[] = [];
    autoAttack: Skill;

    private openingSkills: Skill[] = [];
    private activeSkills:  Skill[] = [];
    private protectSkills: Skill[] = [];
    private defenseSkills: Skill[] = []; // does not contain survive skills
    private ondeathSkills: Skill[] = [null, null]; // first is buff, second is inherent
    private surviveSkill: Skill = null;

    constructor(dbId: number, player: Player, nth: number, skills: Skill[], customStats: CustomStats, bonusType: ENUM.BonusType) {
        var cardData = famDatabase[dbId];
        this.name = cardData.name;
        this.fullName = cardData.fullName;
        this.dbId = dbId;
        this.id = player.id * 100 + nth; // 100-109, 200-209
        this.isMounted = cardData.isMounted;
        this.isWarlord = cardData.isWarlord;
        this.imageLink = cardData.img;
        this.rarity = cardData.rarity;
        this.evoStep = cardData.evo;

        if (!customStats) {
            // the HP will be modified during the battle
            this.stats = new Stats(cardData.stats[0], cardData.stats[1], cardData.stats[2], cardData.stats[3], cardData.stats[4]);

            // this should never be modified
            this.originalStats = new Stats(cardData.stats[0], cardData.stats[1], cardData.stats[2], cardData.stats[3], cardData.stats[4]);
        }
        else {
            this.stats = new Stats(customStats.hp, customStats.atk, customStats.def, customStats.wis, customStats.agi);
            this.originalStats = new Stats(customStats.hp, customStats.atk, customStats.def, customStats.wis, customStats.agi);
        }

        if (bonusType === ENUM.BonusType.COLISEUM) {
            this.stats.hp *= Card.COLISEUM_HP_MULTI_FACTOR;
            this.originalStats.hp *= Card.COLISEUM_HP_MULTI_FACTOR;
        }

        this.status = new Status();
        this.isDead = false;

        this.player = player; // 1: me, 2: opponent
        this.formationColumn = nth % 5;
        this.formationRow = player.formation.getCardRow(this.formationColumn);
        this.procIndex = Formation.getProcIndex(this.formationRow, this.formationColumn);

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
                else if (skill.skillType === ENUM.SkillType.PROTECT || skill.skillType === ENUM.SkillType.EVADE) {
                    this.protectSkills.push(skill);
                }
                else if (skill.skillType === ENUM.SkillType.DEFENSE) {
                    if (skill.skillFunc === ENUM.SkillFunc.SURVIVE) {
                        this.surviveSkill = skill;
                    }
                    else {
                        this.defenseSkills.push(skill);
                    }
                }
                else if (skill.skillType === ENUM.SkillType.ACTION_ON_DEATH) {
                    this.ondeathSkills[1] = skill;
                }
            }
        }

        if (cardData.passiveSkills) {
            this.passiveSkills.push(new Skill(cardData.passiveSkills[0]));
            assert(!cardData.passiveSkills[1], "More than one passive skill is not implemented!");
        }
    }

    getSerializableObject() {
        return {
            name: this.name,
            fullName: this.fullName,
            dbId: this.dbId,
            id: this.id,
            isMounted: this.isMounted,
            isWarlord: this.isWarlord,
            imageLink: this.imageLink,
            rarity: this.rarity,
            evoStep: this.evoStep,

            stats: this.stats,
            originalStats: this.originalStats,
            status: this.status,
            affliction: this.affliction,
            isDead: this.isDead,
            bcAddedProb: this.bcAddedProb,

            lastBattleDamageTaken: this.lastBattleDamageTaken,
            lastBattleDamageDealt: this.lastBattleDamageDealt,
            justMissed: this.justMissed,
            justEvaded: this.justEvaded,

            player: this.player,
            formationColumn: this.formationColumn,
            formationRow: this.formationRow,
            procIndex: this.procIndex,

            skills: getSerializableObjectArray(this.skills),
            autoAttack: this.autoAttack.getSerializableObject(),

            openingSkills: getSerializableObjectArray(this.openingSkills),
            activeSkills:  getSerializableObjectArray(this.activeSkills),
            protectSkills: getSerializableObjectArray(this.protectSkills),
            defenseSkills: getSerializableObjectArray(this.defenseSkills),
            ondeathSkills: getSerializableObjectArray(this.ondeathSkills),
            surviveSkill: this.surviveSkill? this.surviveSkill.getSerializableObject() : null,
            passiveSkills: getSerializableObjectArray(this.passiveSkills),
        };
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

    /**
     * Note that survive skills will not be returned here
     */
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

    getSurviveSkill(): Skill {
        return this.surviveSkill;
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
        this.status.actionOnDeath = 0;
    }

    getPassiveSkill(): Skill {
        return this.passiveSkills[0];
    }

    getName(): string {
        return this.name;
    }

    getPlayerId(): number {
        return this.player.id;
    }

    getPlayerName(): string {
        return this.player.name;
    }

    getFormationRow(): ENUM.FormationRow {
        return this.formationRow;
    }

    getStat(statType: string): number {
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

    getOriginalStat(statType: string) {
        switch (statType) {
            case "HP":
                return this.originalStats.hp;
            case "ATK":
                return this.originalStats.atk;
            case "DEF":
                return this.originalStats.def;
            case "WIS":
                return this.originalStats.wis;
            case "AGI":
                return this.originalStats.agi;
            default:
                throw new Error("Invalid StatType!");
        }
    }

    // affliction
    setAffliction(type: ENUM.AfflictionType, option: AfflictOptParam): void {
        if (this.affliction) {
            if (this.affliction.getType() === type) {
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
        if (!this.affliction) {
            return;
        }
        this.affliction.clear();
        this.affliction = null;
    }
    canAttack(): boolean {
        return (this.affliction) ? this.affliction.canAttack() : true;
    }
    canUseSkill(): boolean {
        return (this.affliction) ? this.affliction.canUseSkill() : true;
    }
    willMiss(): boolean {
        return (this.affliction) ? this.affliction.canMiss() : false;
    }
    getAfflictionType(): ENUM.AfflictionType {
        return this.affliction ? this.affliction.getType() : null;
    }
    getPoisonPercent(): number {
        if (!this.affliction || this.affliction.type !== ENUM.AfflictionType.POISON) {
            return undefined;
        }
        else {
            return (<PoisonAffliction>this.affliction).percent;
        }
    }
    getBurnDamage(): number {
        if (!this.affliction || this.affliction.type !== ENUM.AfflictionType.BURN) {
            return undefined;
        }
        else {
            return (<BurnAffliction>this.affliction).damage;
        }
    }

    // return true if an affliction was cleared
    updateAffliction(): boolean{
        if (!this.affliction) {
            return false;
        }

        this.affliction.update(this);

        if (this.affliction && this.affliction.isFinished()) {
            this.clearAffliction();
            return true;
        }

        // still have affliction
        return false;
    }

    changeStatus(statusType: ENUM.StatusType, amount: number, isNewLogic?: boolean, maxAmount?: number): void {
        if (isNewLogic) {
            this.status.isNewLogic[statusType] = true;
        }

        switch (statusType) {
            case ENUM.StatusType.ATK:
                this.status.atk += amount;
                break;
            case ENUM.StatusType.DEF:
                this.status.def += amount;
                break;
            case ENUM.StatusType.WIS:
                this.status.wis += amount;
                break;
            case ENUM.StatusType.AGI:
                this.status.agi += amount;
                break;
            case ENUM.StatusType.ATTACK_RESISTANCE:
                if (this.status.attackResistance < amount)
                    this.status.attackResistance = amount; // do not stack
                break;
            case ENUM.StatusType.MAGIC_RESISTANCE:
                if (this.status.magicResistance < amount)
                    this.status.magicResistance = amount; // do not stack
                break;
            case ENUM.StatusType.BREATH_RESISTANCE:
                if (this.status.breathResistance < amount)
                    this.status.breathResistance = amount; // do not stack
                break;
            case ENUM.StatusType.SKILL_PROBABILITY:
                this.status.skillProbability += amount;
                break;
            case ENUM.StatusType.REMAIN_HP_ATK_UP:
                if (this.status.remainHpAtkUp < amount)
                    this.status.remainHpAtkUp = amount; // do not stack
                break;
            case ENUM.StatusType.REMAIN_HP_DEF_UP:
                if (this.status.remainHpDefUp < amount)
                    this.status.remainHpDefUp = amount; // do not stack
                break;
            case ENUM.StatusType.REMAIN_HP_WIS_UP:
                if (this.status.remainHpWisUp < amount)
                    this.status.remainHpWisUp = amount; // do not stack
                break;
            case ENUM.StatusType.REMAIN_HP_AGI_UP:
                if (this.status.remainHpAgiUp < amount)
                    this.status.remainHpAgiUp = amount; // do not stack
                break;
            case ENUM.StatusType.WILL_ATTACK_AGAIN:
                if (this.status.willAttackAgain < amount)
                    this.status.willAttackAgain = amount; // do not stack
                break;
            case ENUM.StatusType.ACTION_ON_DEATH:
                var skill = new Skill(amount);
                this.ondeathSkills[0] = skill;
                this.status.actionOnDeath = amount;
                break;
            case ENUM.StatusType.HP_SHIELD:
                this.status.hpShield += amount;
                if (maxAmount && this.status.hpShield > maxAmount) {
                    this.status.hpShield = maxAmount;
                }
                break;
            default:
                throw new Error ("Invalid status type");
        }
    }

    /**
     * Clear all statuses of this card that satisfy the supplied conditional function
     */
    clearAllStatus(condFunc: (x: number)=>boolean): void {
        for (var key in this.status) {
            if (this.status.hasOwnProperty(key) && typeof this.status[key] === "number") {
                if (condFunc(this.status[key])) {
                    this.status[key] = 0;
                }
            }
        }

        if (this.status.actionOnDeath === 0) {
            this.clearBuffOnDeathSkill();
        }
    }

    /**
     * Return true if this card has a status that satisfies the supplied conditional function
     */
    hasStatus(condFunc: (x: number)=>boolean): boolean {
        var hasStatus = false;

        for (var key in this.status) {
            if (this.status.hasOwnProperty(key) && typeof this.status[key] === "number"){
                if (condFunc(this.status[key])) {
                    hasStatus = true;
                    break;
                }
            }
        }

        return hasStatus;
    }

    getHP(): number {
        return this.stats.hp;
    }
    getOriginalHP(): number {
        return this.originalStats.hp;
    }
    changeHP (amount: number) {
        this.stats.hp += amount;

        if (this.stats.hp > this.originalStats.hp) {
            this.stats.hp = this.originalStats.hp;
        }

        if (this.stats.hp <= 0) {
            this.stats.hp = 0;
            this.setDead();
        }
    }
    isFullHealth(): boolean {
        return this.stats.hp === this.originalStats.hp;
    }
    getHpRatio(): number {
        return this.stats.hp / this.originalStats.hp;
    }

    setDead(): void {
        this.isDead = true;
        this.clearAffliction();
        this.status = new Status();
    }
    revive(hpRatio: number): void {
        if (!this.isDead) {
            throw new Error("You can't revive a card that is not dead!");
        }

        this.isDead = false;
        this.status = new Status();
        this.stats.hp = this.originalStats.hp * hpRatio;
    }

    getATK() {
        var value = this.stats.atk;

        if (this.status.remainHpAtkUp > 1){
            var hpRatio = this.getHpRatio();
            value += Math.round(value * (1 - hpRatio) * (this.status.remainHpAtkUp - 1));
        }

        value += this.status.atk;

        if (value < 0) {
            value = 0;
        }

        value = this.adjustByNewDebuffLogic(ENUM.StatusType.ATK, value, this.originalStats.atk);

        return value;
    }
    getDEF() {
        var value = this.stats.def;

        if (this.status.remainHpDefUp > 1){
            var hpRatio = this.getHpRatio();
            value += Math.round(value * (1 - hpRatio) * (this.status.remainHpDefUp - 1));
        }

        value += this.status.def;

        if (value < 0) {
            value = 0;
        }

        value = this.adjustByNewDebuffLogic(ENUM.StatusType.DEF, value, this.originalStats.def);

        return value;
    }
    getWIS() {
        var value = this.stats.wis;

        if (this.status.remainHpWisUp > 1){
            var hpRatio = this.getHpRatio();
            value += Math.round(value * (1 - hpRatio) * (this.status.remainHpWisUp - 1));
        }

        value += this.status.wis;

        if (value < 0) {
            value = 0;
        }

        value = this.adjustByNewDebuffLogic(ENUM.StatusType.WIS, value, this.originalStats.wis);

        return value;
    }
    getAGI() {
        var value = this.stats.agi;

        if (this.status.remainHpAgiUp > 1){
            var hpRatio = this.getHpRatio();
            value += Math.round(value * (1 - hpRatio) * (this.status.remainHpAgiUp - 1));
        }

        value += this.status.agi;

        if (value < 0) {
            value = 0;
        }

        value = this.adjustByNewDebuffLogic(ENUM.StatusType.AGI, value, this.originalStats.agi);

        return value;
    }

    // TODO: handle the case of multiple passive effects
    getPassiveDamageEffect(target: Card): number {
        var passiveSkill = this.passiveSkills[0];
        if (passiveSkill && passiveSkill.skillFunc === ENUM.SkillFunc.DAMAGE_PASSIVE) {
            return (<DamagePassiveSkillLogic>passiveSkill.logic).getEffectRatio(this, target, passiveSkill);
        }
        else {
            return 1;
        }
    }

    getPassiveReceivedDamageEffect(attacker: Card): number {
        var passiveSkill = this.passiveSkills[0];
        if (passiveSkill && passiveSkill.skillFunc === ENUM.SkillFunc.DEFENSE_PASSIVE) {
            return (<DefensePassiveSkillLogic>passiveSkill.logic).getEffectRatio(this, attacker, passiveSkill);
        }
        else {
            return 1;
        }
    }

    adjustByNewDebuffLogic(type: ENUM.StatusType, value: number, originalValue: number): number {
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

    clearDamagePhaseData(): void {
        this.lastBattleDamageDealt = 0;
        this.lastBattleDamageTaken = 0;
        this.justMissed = false;
        this.justEvaded = false;
    }
}
