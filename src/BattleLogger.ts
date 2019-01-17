/// <reference path="../lib/svgjs.d.ts"/>
/// <reference path="interfaces/MajorEvent.ts"/>

/**
 * Handle the logging and displaying of information
 */
class BattleLogger {
    static INFOTEXT_DISPLAYED = false;
    static WARNINGTEXT_DISPLAYED = false;

    // an array of arrays of MinorEvent objects, describing the things that happened under that major event
    minorEventLog: MinorEvent[][] = [];

    // an array of arrays of Field objects, storing the fields after each minor events
    minorEventFields: string[][] = [];

    // just an array of strings
    majorEventLog: MajorEvent[] = [];

    currentTurn: number = 0;

    private static _instance: BattleLogger = null;

    constructor() {
        if (BattleLogger._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        BattleLogger._instance = this;
    }

    public static getInstance(): BattleLogger {
        if (BattleLogger._instance === null) {
            BattleLogger._instance = new BattleLogger();
        }
        return BattleLogger._instance;
    }

    /**
     * Allows to create a new instance
     * Used for testing only
     */
    static removeInstance(): void {
        BattleLogger._instance = null;
    }

    /**
     * Use this to log a major event: a normal attack, a proc, etc. Can also be
     * thought of as logging the main action in a fam's turn. The data to log here
     * is just a string, there's no actual data change associated with a major event
     */
    addMajorEvent (event: MajorEvent): void {
        if (BattleModel.IS_MASS_SIMULATION) {
            return;
        }

        event.turn = this.currentTurn;
        this.majorEventLog.push(event);
    }

    /**
     * Add a minor event to our minor event log.
     */
    addMinorEvent(event: MinorEvent): void {
        if (BattleModel.IS_MASS_SIMULATION) {
            return;
        }

        let index = this.majorEventLog.length - 1;

        if (!this.minorEventLog[index]) {
            this.minorEventLog[index] = [];
        }
        this.minorEventLog[index].push(event);

        if (!this.minorEventFields[index]) {
            this.minorEventFields[index] = [];
        }
        this.minorEventFields[index].push(this.getCurrentFieldJSON());
    }

    /**
     * Display the info text
     */
    displayInfoText(): void {
        if (BattleLogger.INFOTEXT_DISPLAYED) {
            return;
        }
        let cardManager = CardManager.getInstance();
        let battle = BattleModel.getInstance();
        let p1randTxt = this.getRandomModeText(+battle.p1RandomMode);
        let p2randTxt = this.getRandomModeText(+battle.p2RandomMode);

        let infoDivP1 = ENUM.Setting.IS_MOBILE ? $("#infoDivP1mobile")[0] : $("#infoDivP1")[0];
        let infoDivP2 = ENUM.Setting.IS_MOBILE ? $("#infoDivP2mobile")[0] : $("#infoDivP2")[0];
        let infoDivP1Title = ENUM.Setting.IS_MOBILE ? $("#infoDivP1TitleMobile")[0] : $("#infoDivP1Title")[0];
        let infoDivP2Title = ENUM.Setting.IS_MOBILE ? $("#infoDivP2TitleMobile")[0] : $("#infoDivP2Title")[0];

        if (!battle.p1RandomMode || !BattleModel.IS_MASS_SIMULATION) {
            infoDivP1.innerHTML = cardManager.getPlayerMainBrigString(battle.player1);
        }

        if (!battle.p2RandomMode || !BattleModel.IS_MASS_SIMULATION) {
            infoDivP2.innerHTML = cardManager.getPlayerMainBrigString(battle.player2);
        }

        if (battle.isBloodClash) {
            if (!battle.p1RandomMode || !BattleModel.IS_MASS_SIMULATION) {
                infoDivP1.innerHTML +=  `<br><br>${cardManager.getPlayerReserveBrigString(battle.player1)}`;
            }

            if (!battle.p2RandomMode || !BattleModel.IS_MASS_SIMULATION) {
                infoDivP2.innerHTML +=  `<br><br>${cardManager.getPlayerReserveBrigString(battle.player2)}`;
            }
        }

        infoDivP1Title.innerHTML += p1randTxt;
        infoDivP2Title.innerHTML += p2randTxt;

        BattleLogger.INFOTEXT_DISPLAYED = true;
    }

    /**
     * Add a warning if the user try do a 5v5 or 10v10 battle between 2 fams
     */
    displayWarningText(): void {
        if (BattleLogger.WARNINGTEXT_DISPLAYED) {
            return;
        }
        let needWarn = true;
        let cardManager = CardManager.getInstance();
        let battle = BattleModel.getInstance();
        let p1main = cardManager.getPlayerCurrentMainCards(battle.player1);
        let p2main = cardManager.getPlayerCurrentMainCards(battle.player2);
        let dbId1 = p1main[0].dbId;
        let dbId2 = p2main[0].dbId;

        for (let i = 1; i < 5; i++) {
            if (p1main[i].dbId !== dbId1 || p2main[i].dbId !== dbId2) {
                needWarn = false;
                break;
            }
        }

        if (battle.isBloodClash) {
            let p1res = cardManager.getPlayerOriginalReserveCards(battle.player1);
            let p2res = cardManager.getPlayerOriginalReserveCards(battle.player2);

            for (let i = 0; i < 5; i++) {
                if (p1res[i].dbId !== dbId1 || p2res[i].dbId !== dbId2) {
                    needWarn = false;
                    break;
                }
            }
        }

        if (dbId1 === dbId2) needWarn = false;

        if (needWarn) {
            let simDiv = document.getElementById("simDiv");
            let gameDiv = document.getElementById("gameDiv");
            let warnTxt = `<p><b>Note:</b> It seems that you using a 5v5 or 10v10 battle to determine whether ${p1main[0].name} or ${p2main[0].name} is "stronger". This is <b>NOT</b> a recommended way of comparing two familiars.</p>`;
            simDiv.innerHTML += warnTxt;
            gameDiv.innerHTML += warnTxt;
        }

        BattleLogger.WARNINGTEXT_DISPLAYED = true;
    }

    getRandomModeText(type: ENUM.RandomBrigType): string {
        switch (type) {
            case ENUM.RandomBrigType.ALL:
            case ENUM.RandomBrigType.XP_ONLY:
            case ENUM.RandomBrigType.X_ONLY:
            case ENUM.RandomBrigType.X_UP:
            case ENUM.RandomBrigType.SP_ONLY:
            case ENUM.RandomBrigType.SP_UP:
            case ENUM.RandomBrigType.S_ONLY:
            case ENUM.RandomBrigType.S_UP:
            case ENUM.RandomBrigType.AP_ONLY:
            case ENUM.RandomBrigType.AP_UP:
            case ENUM.RandomBrigType.A_ONLY:
            case ENUM.RandomBrigType.A_UP:
                return ` (random ${ENUM.RandomBrigText[type]})`;
            default:
                return "";
        }
    }

    /**
     * Get the field situation at a major event index
     */
    getFieldAtMajorIndex(majorIndex: number) {
        // for empty major events like opening proc with no success target
        if (!this.minorEventLog[majorIndex]) {
            return this.getFieldAtMajorIndex(majorIndex - 1);
        }

        let minorLogLength = this.minorEventLog[majorIndex].length;
        let minorFieldsLength = this.minorEventFields[majorIndex].length;

        if (minorLogLength !== minorFieldsLength) {
            throw new Error ("Log length and stored fields length are not equal!");
        }

        return JSON.parse(this.minorEventFields[majorIndex][minorFieldsLength - 1]);
    }

    getFieldAtMinorIndex(majorIndex: number, minorIndex: number) {
        return JSON.parse(this.minorEventFields[majorIndex][minorIndex]);
    }

    getCurrentFieldJSON(): string {
        let toSerialize = {
            player1Cards: getSerializableObjectArray(BattleModel.getInstance().p1_mainCards),
            player2Cards: getSerializableObjectArray(BattleModel.getInstance().p2_mainCards)
        };

        return JSON.stringify(toSerialize);
    }

    /**
     * Should only call this when need the targets for an AoE attack
     * Return an array of target id's
     */
    getTargetsInMajorEvent(majorIndex: number): number[] {
        let targets = [];
        let majorEvent = this.majorEventLog[majorIndex];
        for (let i = 0; i < this.minorEventLog[majorIndex].length; i++) {
            let tmpData = this.minorEventLog[majorIndex][i];
            if (tmpData.executorId === majorEvent.executorId && tmpData.skillId === majorEvent.skillId) {
                targets.push(tmpData.targetId);
            }
        }
        return targets;
    }

    /**
     * Used for getting the targets in a nested attack
     * Return an array of target id's
     */
    getNestedTargetsInMajorEvent(majorIndex: number, minorIndex: number): number[] {
        let targets = [];
        let initialAttackLog = this.minorEventLog[majorIndex][minorIndex];
        let executorId = initialAttackLog.executorId;
        let skillId = initialAttackLog.skillId;

        for (let i = minorIndex; i < this.minorEventLog[majorIndex].length; i++) {
            let tmpData = this.minorEventLog[majorIndex][i];
            if (tmpData.executorId === executorId && tmpData.skillId === skillId) {
                targets.push(tmpData.targetId);
            }
        }
        return targets;
    }

    /**
     * Log the situation at the start of battle and display the initial info
     */
    startBattleLog(): void {
        if (BattleModel.IS_MASS_SIMULATION) {
            return;
        }

        this.addMajorEvent({description: "Battle start"});
        this.addMinorEvent({
            type: ENUM.MinorEventType.TEXT,
            description: "Everything ready"
        });
    }
}
