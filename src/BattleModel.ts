/// <reference path="affliction/Affliction.ts"/>
/// <reference path="interfaces/DamagePhaseData.ts"/>
/// <reference path="BattleBackground.ts"/>
/// <reference path="BattleDebugger.ts"/>
/// <reference path="BattleGraphic.ts"/>
/// <reference path="BattleLogger.ts"/>
/// <reference path="BrigGenerator.ts"/>
/// <reference path="Card.ts"/>
/// <reference path="CardManager.ts"/>
/// <reference path="CsRandom.ts"/>
/// <reference path="FamDatabase.ts"/>
/// <reference path="FamProvider.ts"/>
/// <reference path="Formation.ts"/>
/// <reference path="Helper.ts"/>
/// <reference path="../lib/jquery.d.ts"/>
/// <reference path="Player.ts"/>
/// <reference path="Skill.ts"/>
/// <reference path="SkillCalcType.ts"/>
/// <reference path="SkillDatabase.ts"/>
/// <reference path="SkillProvider.ts"/>
/// <reference path="SkillRange.ts"/>
/// <reference path="Util.ts"/>

class BattleModel {
    // set to true when doing a mass simulation and you don't care about the graphics or logging stuffs
    static IS_MASS_SIMULATION = false;
    static MAX_TURN_NUM = 5;
    p1RandomMode: ENUM.RandomBrigType;
    p2RandomMode: ENUM.RandomBrigType;
    isBloodClash: boolean = false;
    isColiseum: boolean = false;

    logger: BattleLogger;
    cardManager: CardManager;

    player1: Player;
    player2: Player;

    isFinished = false;
    playerWon: Player = null;

    // The two players' main cards. The order of the cards in these two arrays should never be changed.
    // When a reserve comes out, replace the main card in here with the reserve
    p1_mainCards: Card[] = [];
    p2_mainCards: Card[] = [];

    // The two players' reserve cards. When a reserve comes out, move it to the main cards (i.e. delete it here)
    p1_reserveCards: Card[] = [];
    p2_reserveCards: Card[] = [];

    // The original main cards. Should be created once and never modified
    p1_originalMainCards: Card[] = [];
    p2_originalMainCards: Card[] = [];

    // The original reserve cards. Should be created once and never modified
    p1_originalReserveCards: Card[] = [];
    p2_originalReserveCards: Card[] = [];

    // contains all cards in play. Should be re-created and re-sorted every turn,
    // and updated when either player's main cards changed.
    allCurrentMainCards: Card[] = [];

    // Contains all cards in play (both main and reserve of both players). Used for quickly get a card by its id
    allCardsById: any = {};

    // store recently dead cards with ondeath skills waiting to proc
    onDeathCards: Card[] = [];

    // turn order info
    turnOrderBase: ENUM.BattleTurnOrderType = ENUM.BattleTurnOrderType.AGI;
    turnOrderChangeEffectiveTurns: number = 0;
    turnOrderChanged: boolean = false;

    // Turn-dependent. Remember to update these when it's a new card's turn. Maybe move to a separate structure?
    currentPlayer: Player;
    oppositePlayer: Player;

    // just a copy of p1_mainCards, p2_mainCards, p1_reserveCards, p2_reserveCards, turn-dependent
    currentPlayerMainCards: Card[];
    currentPlayerReserveCards: Card[];
    oppositePlayerMainCards: Card[];
    oppositePlayerReserveCards: Card[];

    private static _instance: BattleModel = null;

    public static getInstance(): BattleModel {
        if (BattleModel._instance === null) {
            throw new Error("Error: you should not make this object this way");
        }
        return BattleModel._instance;
    }

    constructor(data: GameData, option: GameOption = {}) {
        if (BattleModel._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        BattleModel._instance = this;
        this.logger = BattleLogger.getInstance();
        this.cardManager = CardManager.getInstance();
        var graphic = new BattleGraphic();

        if (option.battleType && option.battleType === ENUM.BattleType.BLOOD_CLASH) {
            this.isBloodClash = true;
        }

        if (option.battleType && option.battleType === ENUM.BattleType.COLISEUM) {
            this.isBloodClash = true;
            this.isColiseum = true;
            BattleModel.MAX_TURN_NUM = 10; // not sure about this
        }

        var p1_formation: any = option.p1RandomMode ?
            pickRandomProperty(Formation.FORMATION_CONFIG) : data.p1_formation;
        var p2_formation: any = option.p2RandomMode ?
            pickRandomProperty(Formation.FORMATION_CONFIG) : data.p2_formation;

        this.p1RandomMode = option.p1RandomMode ? option.p1RandomMode : ENUM.RandomBrigType.NONE;
        this.p2RandomMode = option.p2RandomMode ? option.p2RandomMode : ENUM.RandomBrigType.NONE;

        this.player1 = new Player(1, "Player 1", new Formation(p1_formation), 1); // me
        this.player2 = new Player(2, "Player 2", new Formation(p2_formation), 1); // opp

        BrigGenerator.initializeBrigs(data, option);
        this.cardManager.sortAllCurrentMainCards();

        graphic.displayFormationAndFamOnCanvas();

        if (!BattleDebugger.IS_DEBUG_MODE) {
            this.logger.displayInfoText();
            this.logger.displayWarningText();
        }
    }

    /**
     * Resets everything
     * Used for testing only
     */
    static resetAll() {
        BattleModel.removeInstance();
        BattleLogger.removeInstance();
        BattleGraphic.removeInstance();
        CardManager.removeInstance();
    }

    /**
     * Allows to create a new instance
     * Used for testing only
     */
    static removeInstance() {
        BattleModel._instance = null;
    }

    getPlayerById(id: number) {
        if (id === 1) {
            return this.player1;
        }
        else if (id === 2) {
            return this.player2;
        }
        else {
            throw new Error("Invalid player");
        }
    }

    getOppositePlayer (player: Player) {
        if (player === this.player1) {
            return this.player2;
        }
        else if (player === this.player2) {
            return this.player1;
        }
        else {
            throw new Error("Invalid player");
        }
    }

    /**
     * Use this for damage because of attacks
     */
    processDamagePhase(data: DamagePhaseData) {
        var target = data.target;
        var damage = this.getWouldBeDamage(data);

        var isMissed = data.attacker.willMiss();
        if (isMissed) {
            damage = 0;
            data.attacker.justMissed = true;
        }
        else {
            data.attacker.justMissed = false;
        }

        var evaded = target.justEvaded;
        if (evaded) {
            damage = 0;
        }

        if (!isMissed && !evaded && data.skill.skillFunc === ENUM.SkillFunc.KILL) {
            if (Math.random() <= data.skill.skillFuncArg2) { // probability check
                var isKilled = true;
            }
        }
        if (isKilled) {
            damage = target.getHP() + target.status.hpShield;
        }

        // HP shield skill
        var hpShield = ~~target.status.hpShield;
        if (hpShield > 0 && !isMissed && !evaded && !isKilled) {
            if (damage >= hpShield) {
                target.status.hpShield = 0;
                damage -= hpShield;
            } else {
                target.status.hpShield = hpShield - damage;
                damage = 0;
            }
        }

        // survive
        var surviveSkill = target.getSurviveSkill();
        var defenseData: SkillLogicData = {
            executor: target,
            skill: surviveSkill,
            attacker: data.attacker,
            wouldBeDamage: damage
        };

        if (surviveSkill && surviveSkill.willBeExecuted(defenseData) && !isKilled && !isMissed && !evaded) {
            surviveSkill.execute(defenseData);
            damage = target.getHP() - 1;
        }

        target.changeHP(-1 * damage);
        target.lastBattleDamageTaken = damage;
        data.attacker.lastBattleDamageDealt = damage;

        if (!data.additionalDescription) {
            data.additionalDescription = "";
        }

        // this probably should not be here, but wtv...
        if (data.skill.skillFunc === ENUM.SkillFunc.PROTECT_REFLECT) {
            if (target.hasWardOfType(data.oriAtkSkill.ward)) {
                var wardUsed = data.oriAtkSkill.ward;
            }
        }
        else if (target.hasWardOfType(data.skill.ward)) {
            wardUsed = data.skill.ward;
        }

        if (isMissed) {
            var desc = data.attacker.name + " missed the attack on " + target.name;
        }
        else if (evaded) {
            desc = target.name + " evaded the attack!";
        }
        else if (isKilled) {
            desc = target.name + " is killed outright!";
        }
        else {
            desc = data.additionalDescription + target.name + " lost " + damage + "hp (remaining " +
                target.getHP() + "/" + target.originalStats.hp + ")";
        }

        this.logger.addMinorEvent({
            executorId: data.attacker.id,
            targetId: target.id,
            type: ENUM.MinorEventType.HP,
            amount: (-1) * damage,
            description: desc,
            skillId: data.skill.id,
            wardUsed: wardUsed,
            missed: isMissed,
            evaded: evaded,
            isKilled: isKilled
        });

        if (target.isDead) {
            this.logger.addMinorEvent({
                description: target.name + " is dead",
                type: ENUM.MinorEventType.TEXT
            });
            this.addOnDeathCard(target);
        }
        else {
            BuffSkillLogic.processRemainHpBuff(target, false);
        }

        this.processPostDamageAffliction(data.attacker, target, damage);
    }

    /**
     * Process post-damage passive affliction
     */
    processPostDamageAffliction(attacker: Card, target: Card, damage: number) {
        // will damage < 0 ever be true? dunno...
        if (damage < 0 || attacker.isDead || target.justEvaded || attacker.justMissed) {
            return;
        }
        var skill = target.getPassiveAffliction(attacker);
        if (skill !== null) {
            AfflictionSkillLogic.processAffliction(target, attacker, skill);
        }
    }

    getWouldBeDamage(data: DamagePhaseData): number {
        var attacker = data.attacker;
        var target = data.target;
        var skill = data.skill;
        var skillMod = skill.skillFuncArg1;

        if (skill.skillFunc !== ENUM.SkillFunc.PROTECT_REFLECT) {
            var ignorePosition = Skill.isPositionIndependentAttackSkill(skill.id);
        }
        else {
            ignorePosition = Skill.isPositionIndependentAttackSkill(data.oriAtkSkill.id);
        }

        var baseDamage: number;

        switch (skill.skillCalcType) {
            case (ENUM.SkillCalcType.DEFAULT):
            case (ENUM.SkillCalcType.WIS):
                baseDamage = getDamageCalculatedByWIS(attacker, target);
                break;
            case (ENUM.SkillCalcType.ATK):
                baseDamage = getDamageCalculatedByATK(attacker, target, ignorePosition);
                break;
            case (ENUM.SkillCalcType.AGI):
                baseDamage = getDamageCalculatedByAGI(attacker, target, ignorePosition);
                break;
            case ENUM.SkillCalcType.REFLECT:
                baseDamage = getReflectAmount(data.oriAttacker, data.oriAtkSkill, data.attacker, target, ignorePosition, data.oriDmg);
                break;
            default:
                throw new Error("Invalid calcType!");
        }

        // apply the multiplier
        var damage = skillMod * baseDamage;

        if (data.scaledRatio)
            damage *= data.scaledRatio;

        if (data.varyingRatio)
            damage *= data.varyingRatio;

        if (data.dmgRatio)
            damage *= data.dmgRatio;

        damage *= attacker.getPassiveDamageEffect(target);
        damage *= target.getPassiveReceivedDamageEffect(attacker);

        // apply the target's ward
        if (skill.skillFunc === ENUM.SkillFunc.PROTECT_REFLECT) {
            skill = data.oriAtkSkill;
        }
        switch (skill.ward) {
            case ENUM.WardType.PHYSICAL:
                damage = Math.round(damage * (1 - target.status.attackResistance));
                break;
            case ENUM.WardType.MAGICAL:
                damage = Math.round(damage * (1 - target.status.magicResistance));
                break;
            case ENUM.WardType.BREATH:
                damage = Math.round(damage * (1 - target.status.breathResistance));
                break;
            default :
                throw new Error ("Wrong type of ward. Maybe you forgot to include in the skill?");
        }

        return damage;
    }

    /**
     * Use this when there's no executorId for the MinorEvent, like for poison.
     * Also use it for non-attacks like healing, etc.
     * TODO: move this to Card?
     */
    damageToTargetDirectly(target: Card, damage: number, reason: string) {
        target.changeHP(-1 * damage);

        var descVerb = " lost ";
        if (damage < 0) {
            descVerb = " gained ";
        }

        var description = target.name + descVerb + Math.abs(damage) + " HP because of " + reason;

        this.logger.addMinorEvent({
            targetId: target.id,
            type: ENUM.MinorEventType.HP,
            amount: (-1) * damage,
            description: description,
        });

        if (target.isDead) {
            this.logger.addMinorEvent({
                description: target.name + " is dead",
                type: ENUM.MinorEventType.TEXT
            });
            this.addOnDeathCard(target);
        }
        else {
            BuffSkillLogic.processRemainHpBuff(target, damage < 0);
        }
    }

    startBattle () {
        this.logger.startBattleLog();

        this.performOpeningSkills();

        while (!this.isFinished) {
            this.logger.currentTurn++;

            // process turn order change
            if (this.turnOrderChangeEffectiveTurns === 0) {
                this.turnOrderBase = ENUM.BattleTurnOrderType.AGI;
            }
            else {
                this.turnOrderChangeEffectiveTurns--;
            }

            this.cardManager.updateAllCurrentMainCards();
            this.cardManager.sortAllCurrentMainCards();

            // assuming both have 5 cards
            for (var i = 0; i < 10 && !this.isFinished; i++) {
                var currentCard = this.allCurrentMainCards[i];

                this.currentPlayer = currentCard.player;
                this.currentPlayerMainCards = this.cardManager.getPlayerCurrentMainCards(this.currentPlayer);
                this.currentPlayerReserveCards = this.cardManager.getPlayerCurrentReserveCards(this.currentPlayer);

                this.oppositePlayer = this.getOppositePlayer(this.currentPlayer);
                this.oppositePlayerMainCards = this.cardManager.getPlayerCurrentMainCards(this.oppositePlayer);
                this.oppositePlayerReserveCards = this.cardManager.getPlayerCurrentReserveCards(this.oppositePlayer);

                if (currentCard.isDead) {
                    var column = currentCard.formationColumn;
                    if (this.isBloodClash && this.currentPlayerReserveCards[column]) {
                        // swich in reserve
                        var reserveCard = this.currentPlayerReserveCards[column];

                        this.cardManager.switchCardInAllCurrentMainCards(currentCard, reserveCard);
                        this.currentPlayerMainCards[column] = reserveCard;
                        this.currentPlayerReserveCards[column] = null;

                        this.logger.addMajorEvent({
                            description: currentCard.name + " is switched by " + reserveCard.name,
                        });

                        this.logger.addMinorEvent({
                            description: currentCard.name + " is switched by " + reserveCard.name,
                            type: ENUM.MinorEventType.RESERVE_SWITCH,
                            reserveSwitch: {
                                mainId: currentCard.id,
                                reserveId: reserveCard.id
                            }
                        });

                        currentCard = reserveCard;

                        // proc opening skill when switch in
                        var openingSkill = currentCard.getRandomOpeningSkill();
                        if (openingSkill) {
                            var data: SkillLogicData = {
                                executor: currentCard,
                                skill: openingSkill
                            };
                            if (openingSkill.willBeExecuted(data)) {
                                this.logger.addMajorEvent({
                                    description: currentCard.name + " procs " + openingSkill.name,
                                    executorId: currentCard.id,
                                    skillId: openingSkill.id
                                });
                                openingSkill.execute(data);
                            }
                        }
                    }
                    else {
                        continue;
                    }
                }

                var missTurn = !currentCard.canAttack();
                if (missTurn) {
                    this.logger.addMajorEvent({
                        description: currentCard.name + " missed a turn"
                    });
                }

                // procs active skill if we can
                this.processActivePhase(currentCard, "FIRST");
                if (this.isFinished) break;

                // hopefully there's no mounted fam with extra turn buff and extra turn passive, coz
                // I have no idea how all that logic will play with each other
                var passiveSkill = currentCard.getPassiveSkill();
                if (!currentCard.isDead && currentCard.status.willAttackAgain !== 0) {
                    this.processActivePhase(currentCard, "FIRST");
                    // todo: send a minor event log and handle it
                    currentCard.status.willAttackAgain = 0;
                    if (this.isFinished) break;
                }
                else if (!currentCard.isDead && passiveSkill && passiveSkill.skillFunc === ENUM.SkillFunc.EXTRA_TURN_PASSIVE) {
                    if (passiveSkill.willBeExecuted({ executor: currentCard, skill: passiveSkill })) {
                        this.logger.addMinorEvent({
                            description: currentCard.name + " gets an extra turn!",
                            type: ENUM.MinorEventType.TEXT
                        });
                        this.processActivePhase(currentCard, "FIRST");
                        if (this.isFinished) break;
                    }
                }

                if (!currentCard.isDead) {
                    // update the affliction
                    if (currentCard.getAfflictionType() !== ENUM.AfflictionType.BURN) {
                        var cured = currentCard.updateAffliction();
                    }

                    // if cured, make a log
                    if (!currentCard.affliction && cured) {
                        var desc = currentCard.name + " is cured of affliction!";

                        this.logger.addMinorEvent({
                            targetId: currentCard.id,
                            type: ENUM.MinorEventType.AFFLICTION,
                            affliction: {
                                type: currentCard.getAfflictionType(),
                                isFinished: true,
                            },
                            description: desc,
                        });
                    }

                    this.processOnDeathPhase();
                }

                this.checkFinish();
            }

            if (!this.isFinished) {
                this.processEndTurn();
            }
        }

        // create debugger if needed
        if (BattleDebugger.IS_DEBUG_MODE) {
            BattleDebugger.getInstance().displayDebugger();
        }

        return this;
    }

    addOnDeathCard(card: Card) {
        if (card.hasOnDeathSkill()) {
            this.onDeathCards.push(card);
        }
    }

    checkFinish(): void {
        var noOnDeathRemain = this.onDeathCards.length === 0;
        if (this.cardManager.isAllDeadPlayer(this.oppositePlayer) && noOnDeathRemain) {
            this.playerWon = this.currentPlayer;
        }
        else if (this.cardManager.isAllDeadPlayer(this.currentPlayer) && noOnDeathRemain) {
            this.playerWon = this.oppositePlayer;
        }

        if (this.playerWon) {
            this.logger.addMajorEvent({
                description: this.playerWon.name + " has won"
            });

            this.logger.addMinorEvent({
                type: ENUM.MinorEventType.TEXT,
                description: "Battle ended"
            });
            this.isFinished = true;
        }
    }

    /**
     * Process the active phase. First update pre-active-phase affliction, then do active action.
     * Do these twice for mounted familiars.
     * Before this function returns, it will call checkFinish()
     */
    processActivePhase(currentCard: Card, nth: string): void {
        // update burn affliction
        if (currentCard.getAfflictionType() === ENUM.AfflictionType.BURN) {
            this.logger.addMajorEvent({
                description: currentCard.name + "'s turn"
            });
            currentCard.updateAffliction();
            this.checkFinish();
            if (currentCard.isDead || this.isFinished) { // the check for isFinished is redundant, but wtv
                return;
            }
        }

        var activeSkill = currentCard.getRandomActiveSkill();

        if (nth === "FIRST" && currentCard.isMounted) {
            activeSkill = currentCard.getFirstActiveSkill();
        }
        else if (nth === "SECOND" && currentCard.isMounted) {
            activeSkill = currentCard.getSecondActiveSkill();
        }

        if (activeSkill) {
            var data: SkillLogicData = {
                executor: currentCard,
                skill: activeSkill
            };
            if (activeSkill.willBeExecuted(data)) {
                // set confuse to the skill if necessary
                if (currentCard.canConfuse()) {
                    activeSkill.setConfuse(currentCard.getConfuseProb());
                } else if (activeSkill.isConfused()) {
                    activeSkill.clearConfuse();
                }

                this.logger.addMajorEvent({
                    description: currentCard.name + " procs " + activeSkill.name,
                    executorId: currentCard.id,
                    skillId: activeSkill.id
                });

                activeSkill.execute(data);
            }
            else {
                this.executeNormalAttack(currentCard);
            }
        }
        else {
            this.executeNormalAttack(currentCard);
        }

        this.processOnDeathPhase();

        this.checkFinish();
        if (this.isFinished) {
            return;
        }
        else if (nth === "FIRST" && currentCard.isMounted && !currentCard.isDead) {
            this.processActivePhase(currentCard, "SECOND");
        }
    }

    processOnDeathPhase() {
        // make a copy
        var hasOnDeath: Card[] = [];
        for (let i = 0; i < this.onDeathCards.length; i++) {
            hasOnDeath.push(this.onDeathCards[i]);
        }

        this.onDeathCards = [];

        for (let i = 0; i < hasOnDeath.length; i++) {
            var card = hasOnDeath[i];
            var skill = card.getInherentOnDeathSkill();
            var data: SkillLogicData = {
                executor: card,
                skill: skill
            };
            if (skill && skill.willBeExecuted(data)) {
                this.logger.addMinorEvent({
                    executorId: card.id,
                    type: ENUM.MinorEventType.DESCRIPTION,
                    description: card.name + " procs " + skill.name + ". ",
                    skillId: skill.id
                });
                skill.execute(data);
            }

            skill = card.getBuffOnDeathSkill();
            data = {
                executor: card,
                skill: skill
            };
            // clear it
            card.clearBuffOnDeathSkill();
            if (skill && skill.willBeExecuted(data)) {
                this.logger.addMinorEvent({
                    executorId: card.id,
                    type: ENUM.MinorEventType.DESCRIPTION,
                    description: card.name + " procs " + skill.name + ". ",
                    skillId: skill.id
                });
                skill.execute(data);
            }
        }

        // at the end, if there are newly addition to recentlyDeadCards, recursively repeat the process
        if (this.onDeathCards.length !== 0) {
            this.processOnDeathPhase();
        }
    }

    /**
     * Called at the end of two player's turn
     */
    processEndTurn() {
        this.logger.addMajorEvent({
            description: "Turn end"
        });

        this.logger.addMinorEvent({
            type: ENUM.MinorEventType.TEXT,
            description: "Turn end"
        });

        if (this.logger.currentTurn >= BattleModel.MAX_TURN_NUM) {
            var p1Cards    = this.cardManager.getPlayerAllCurrentCards(this.player1);
            var p2Cards    = this.cardManager.getPlayerAllCurrentCards(this.player2);

            var p1Ratio    = this.cardManager.getTotalHPRatio(p1Cards);
            var p2Ratio    = this.cardManager.getTotalHPRatio(p2Cards);

            if (p1Ratio >= p2Ratio) {
                this.playerWon = this.player1;
                var battleDesc = "Decision win";
            } else {
                this.playerWon = this.player2;
                battleDesc = "Decision loss";
            }
            this.isFinished = true;

            this.logger.addMajorEvent({
                description: `Decision win for ${this.playerWon.name}`
            });

            this.logger.addMinorEvent({
                type: ENUM.MinorEventType.BATTLE_DESCRIPTION,
                description: "Decision win",
                battleDesc: battleDesc
            });
        }
        else if (this.isBloodClash || this.isColiseum) {
            // add skill probability to those still alive
            var allCards = this.cardManager.getAllCurrentCards();
            for (var i = 0; i < allCards.length; i++) {
                var tmpCard = allCards[i];
                if (tmpCard && !tmpCard.isDead) {
                    var bonusProb = this.isColiseum ? ENUM.AddProbability.COLISEUM : ENUM.AddProbability.BLOODCLASH;
                    tmpCard.bcAddedProb += bonusProb;

                    this.logger.addMinorEvent({
                        type: ENUM.MinorEventType.BC_ADDPROB,
                        description: `${tmpCard.name} gets ${bonusProb}% increase in skill prob.`,
                        bcAddProb: {
                            targetId: tmpCard.id,
                            isMain: this.cardManager.isCurrentMainCard(tmpCard)
                        }
                    });
                }
            }
        }
    }

    executeNormalAttack(attacker: Card) {
        if (!attacker.canAttack() || attacker.isDead) {
            return;
        }

        var skill = attacker.autoAttack;

        // set confuse to the skill if necessary
        if (attacker.canConfuse()) {
            skill.setConfuse(attacker.getConfuseProb());
        }
        else if (skill.isConfused()) {
            skill.clearConfuse();
        }

        this.logger.addMajorEvent({
            description: attacker.name + " attacks!",
            skillId: skill.id,
            executorId: attacker.id
        });

        skill.execute({
            executor: attacker,
            skill: skill
        });
    }

    /**
     * Process the protecting sequence. Return true if a protect has been executed
     * or false if no protect has been executed
     *
     * @param targetsAttacked optional, set to null when multiple protect/hit is allowed
     */
    processProtect(attacker: Card, targetCard: Card, attackSkill: Skill, targetsAttacked: boolean[], scaledRatio?: number, varyingRatio?: number) {
        // now check if someone on the enemy side can protect before the damage is dealt
        var enemyCards = this.cardManager.getEnemyCurrentMainCards(attacker.player);
        var protectSkillActivated = false; //<- has any protect skill been activated yet?
        var toReturn: any = {}; // data that we will return
        for (var i = 0; i < enemyCards.length && !protectSkillActivated; i++) {
            if (enemyCards[i].isDead) {
                continue;
            }
            var protectSkill = enemyCards[i].getRandomProtectSkill();
            if (protectSkill) {
                var protector = enemyCards[i];

                // if a fam that has been attacked is not allowed to protect (like in the case of AoE), continue
                if (targetsAttacked && targetsAttacked[protector.id]) {
                    continue;
                }

                var protectData: SkillLogicData = {
                    executor: protector,
                    skill: protectSkill,
                    attacker: attacker,    // for protect
                    attackSkill: attackSkill, // for protect
                    targetCard: targetCard,  // for protect
                    targetsAttacked: targetsAttacked,  // for protect
                    scaledRatio: scaledRatio,
                    varyingRatio: varyingRatio
                };

                if (protectSkill.willBeExecuted(protectData)) {
                    protectSkillActivated = true;
                    toReturn = protectSkill.execute(protectData);
                }
            }
            else {
                // this fam doesn't have a protect skill, move on to the next one
                continue;
            }
        }
        toReturn.activated = protectSkillActivated;
        return toReturn;
    }

    performOpeningSkills () {
        // the cards sorted by proc order
        var p1cards = this.cardManager.getPlayerCurrentMainCardsByProcOrder(this.player1);
        var p2cards = this.cardManager.getPlayerCurrentMainCardsByProcOrder(this.player2);

        for (let i = 0; i < p1cards.length; i++) {
            var skill1 = p1cards[i].getRandomOpeningSkill();
            if (skill1) {
                var data: SkillLogicData = {
                    executor: p1cards[i],
                    skill: skill1
                };
                if (skill1.willBeExecuted(data)) {
                    this.logger.addMajorEvent({
                        description: p1cards[i].name + " procs " + skill1.name,
                        executorId: p1cards[i].id,
                        skillId: skill1.id
                    });
                    skill1.execute(data);
                }
            }
        }

        for (let i = 0; i < p2cards.length; i++) {
            var skill2 = p2cards[i].getRandomOpeningSkill();
            if (skill2) {
                data = {
                    executor: p2cards[i],
                    skill: skill2
                };
                if (skill2.willBeExecuted(data)) {
                    this.logger.addMajorEvent({
                        description: p2cards[i].name + " procs " + skill2.name,
                        executorId: p2cards[i].id,
                        skillId: skill2.id
                    });
                    skill2.execute(data);
                }
            }
        }

        // reset the turn order changed flag at the end of opening phase
        this.turnOrderChanged = false;
    }
}
