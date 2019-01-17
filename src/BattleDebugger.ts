/// <reference path="Status.ts"/>

/**
 * Responsible for stuffs in the debugger mode
 */
class BattleDebugger {
    static IS_DEBUG_MODE = true;

    private static _instance: BattleDebugger = null;

    constructor() {
        if (BattleDebugger._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        BattleDebugger._instance = this;
    }

    public static getInstance(): BattleDebugger {
        if (BattleDebugger._instance === null) {
            BattleDebugger._instance = new BattleDebugger();
        }
        return BattleDebugger._instance;
    }

    /**
     * Create the debugger: display all events in the left side event log, and bound onlick callback to them.
     */
    public displayDebugger(): void {
        this.displayEventLogAtIndex(0);
        let minorLog = BattleLogger.getInstance().minorEventLog;
        let majorLog = BattleLogger.getInstance().majorEventLog;

        let currentTurn = -10;
        for (let i = 0; i < majorLog.length; i++) {
            // display the turn
            if (majorLog[i].turn !== currentTurn) {
                currentTurn = majorLog[i].turn;
                this.displayTurn(currentTurn);
            }

            // display the major event
            this.displayMajorEvent(i);

            // display all the minor events inside this major event
            // TODO: make sure that there is at lest 1 minorEvent for each majorEvent, so we don't need to check for minorLog[i]
            for (let j = 0; minorLog[i] && j < minorLog[i].length; j++) {
                this.displayMinorEvent(i, j);
            }
        }
    }

    /**
     * Display a major event on screen (the left side list)
     */
    displayMajorEvent (index: number): void {
        if (!BattleDebugger.IS_DEBUG_MODE) {
            return;
        }

        let data = BattleLogger.getInstance().majorEventLog[index];
        let id = `turn${data.turn}events`;
        let battleEventDiv = document.getElementById("battleEventDiv");
        let turnEventList = document.getElementById(id);

        // if not already exist, create it
        if (!turnEventList) {
            turnEventList = document.createElement("ul");
            turnEventList.setAttribute("id", id);
            battleEventDiv.appendChild(turnEventList);
        }

        let newEvent = document.createElement("li");
        newEvent.innerHTML = `<a>${data.description}</a>`;
        newEvent.setAttribute("tabindex", index + "");
        newEvent.setAttribute("id", index + "");

        // populate right section with the field situation
        newEvent.onclick = function () {
            BattleDebugger.getInstance().displayEventLogAtIndex(+(<HTMLLIElement>this).id);
        };
        turnEventList.appendChild(newEvent);
    }

    /**
     * Display a minor event on screen
     */
    displayMinorEvent (majorIndex: number, minorIndex: number): void {
        if (BattleModel.IS_MASS_SIMULATION || !BattleDebugger.IS_DEBUG_MODE) {
            return;
        }

        let currentTurn = BattleLogger.getInstance().majorEventLog[majorIndex].turn;
        let id = `turn${currentTurn}events`;

        let description = BattleLogger.getInstance().minorEventLog[majorIndex][minorIndex].description;

        // the list of events of this turn
        // assume that it has already been created
        let turnEventList = document.getElementById(id);

        // a <li>, the last "major" event that occurred in this turn, like when a fam procs
        let lastEvent : any = turnEventList.lastChild;

        // the <ul> nested inside the above <li>, the sub event list
        let subEventList = lastEvent.getElementsByTagName("ul")[0];

        // if not already exist, create it
        if (!subEventList) {
            subEventList = document.createElement("ul");
            // TODO: maybe give it an id
            lastEvent.appendChild(subEventList);
        }

        // new list item for the sub event, and append it to the sub event list
        let newEvent = document.createElement("li");
        newEvent.innerHTML = description;
        subEventList.appendChild(newEvent);
    }

    /**
     * Log a new turn
     */
    displayTurn(turnNum: number): void {
        if (BattleModel.IS_MASS_SIMULATION || !BattleDebugger.IS_DEBUG_MODE) {
            return;
        }

        let battleEventDiv = document.getElementById("battleEventDiv");
        let newEvent = document.createElement("p");
        newEvent.innerHTML = `Turn ${turnNum}`;
        battleEventDiv.appendChild(newEvent);
    }

    /**
     * This is called when you click on an event in the event list. It updates the field on the right side
     * of the screen with information after the event that you clicked on has been processed. That event
     * is represented by the index argument supplied into this function.
     */
    displayEventLogAtIndex(majorIndex: number): void {
        if (!BattleDebugger.IS_DEBUG_MODE) {
            return;
        }
        let graphic = BattleGraphic.getInstance();
        let logger = BattleLogger.getInstance();
        let lastEventIndex = (majorIndex === 0)? 0 : majorIndex - 1;

        // the field after the last major event and before the current major event
        let lastEventField = logger.getFieldAtMajorIndex(lastEventIndex);

        // the current field, aka the field after the current major event
        let field = logger.getFieldAtMajorIndex(majorIndex);

        // now prepares the info and print them out
        for (let p = 1; p <= 2; p++) { // for each player
            let playerCards = field[`player${p}Cards`]; // get the cards of that player
            let lastPlayerCards = lastEventField[`player${p}Cards`];
            for (let f = 0; f < 5; f++) { // for each card
                let stats          = playerCards[f].stats;
                let originalStats  = playerCards[f].originalStats;
                let status: Status = playerCards[f].status;
                let afflict = playerCards[f].affliction; // not the same thing as in the original card class

                let hpRatio = stats.hp / originalStats.hp;
                let finalAtk = this.getFinalStat(originalStats.atk, status.atk, status.isNewLogic[ENUM.StatusType.ATK],
                    status.remainHpAtkUp, hpRatio);
                let finalDef = this.getFinalStat(originalStats.def, status.def, status.isNewLogic[ENUM.StatusType.DEF],
                    status.remainHpDefUp, hpRatio);
                let finalWis = this.getFinalStat(originalStats.wis, status.wis, status.isNewLogic[ENUM.StatusType.WIS],
                    status.remainHpWisUp, hpRatio);
                let finalAgi = this.getFinalStat(originalStats.agi, status.agi, status.isNewLogic[ENUM.StatusType.AGI],
                    status.remainHpAgiUp, hpRatio);

                // get the stats after the last major event so we can compare with it later
                let lastStats          = lastPlayerCards[f].stats;
                let lastOriginalStats  = lastPlayerCards[f].originalStats;
                let lastStatus: Status = lastPlayerCards[f].status;
                let lastHpRatio = lastStats.hp / lastOriginalStats.hp;
                let lastFinalAtk = this.getFinalStat(lastOriginalStats.atk, lastStatus.atk, lastStatus.isNewLogic[ENUM.StatusType.ATK],
                    lastStatus.remainHpAtkUp, lastHpRatio);
                let lastFinalDef = this.getFinalStat(lastOriginalStats.def, lastStatus.def, lastStatus.isNewLogic[ENUM.StatusType.DEF],
                    lastStatus.remainHpDefUp, lastHpRatio);
                let lastFinalWis = this.getFinalStat(lastOriginalStats.wis, lastStatus.wis, lastStatus.isNewLogic[ENUM.StatusType.WIS],
                    lastStatus.remainHpWisUp, lastHpRatio);
                let lastFinalAgi = this.getFinalStat(lastOriginalStats.agi, lastStatus.agi, lastStatus.isNewLogic[ENUM.StatusType.AGI],
                    lastStatus.remainHpAgiUp, lastHpRatio);

                let infoText: any = {
                    name : playerCards[f].name,
                    hp : `HP: ${stats.hp}`,
                    atk : `ATK: ${finalAtk}`,
                    def : `DEF: ${finalDef}`,
                    wis : `WIS: ${finalWis}`,
                    agi : `AGI: ${finalAgi}`,
                };

                if (status.attackResistance !== 0) infoText.physicalResist = `PW: ${status.attackResistance}`;
                if (status.magicResistance  !== 0) infoText.magicalResist  = `MW: ${status.magicResistance}`;
                if (status.breathResistance !== 0) infoText.breathResist   = `BW: ${status.breathResistance}`;
                if (status.willAttackAgain  !== 0) infoText.willAttackAgain  = "Extra action: Yes";
                if (status.skillProbability !== 0) infoText.skillProbability = `Extra prob.: ${status.skillProbability}`;
                if (status.hpShield !== 0)         infoText.hpShield = `HP Shld.: ${status.hpShield}`;

                if (afflict) {
                    infoText.affliction = `Affliction: ${Affliction.getAfflictionAdjective(afflict.type)}`;
                    if (afflict.type === ENUM.AfflictionType.SILENT) {
                        infoText.affliction += ` (${afflict.validTurnNum} turn)`;
                    }
                    else if (afflict.type === ENUM.AfflictionType.POISON) {
                        infoText.affliction += ` (${afflict.percent} %)`;
                    }
                    else if (afflict.type === ENUM.AfflictionType.BURN) {
                        infoText.affliction += ` (${afflict.damage})`;
                    }
                    else { // frozen, disabled, paralyzed
                        infoText.affliction += " (1 turn)";
                    }
                }

                // compare the stats of this fam before and after this major event and decorate the text accordingly
                if (stats.hp !== lastStats.hp) infoText.hp  = this.decorateText(infoText.hp,  stats.hp < lastStats.hp);
                if (finalAtk !== lastFinalAtk) infoText.atk = this.decorateText(infoText.atk, finalAtk < lastFinalAtk);
                if (finalDef !== lastFinalDef) infoText.def = this.decorateText(infoText.def, finalDef < lastFinalDef);
                if (finalWis !== lastFinalWis) infoText.wis = this.decorateText(infoText.wis, finalWis < lastFinalWis);
                if (finalAgi !== lastFinalAgi) infoText.agi = this.decorateText(infoText.agi, finalAgi < lastFinalAgi);

                // grab all minor events under the latest major event
                // need to make sure eventLog[index] exists
                for (let j = 0; logger.minorEventLog[majorIndex] && j < logger.minorEventLog[majorIndex].length; j++) {
                    let tempEvent = logger.minorEventLog[majorIndex][j]; // a minor event
                    if (tempEvent.targetId === playerCards[f].id) {
                        if (tempEvent.type === ENUM.MinorEventType.STATUS) {
                            if (tempEvent.status.type === ENUM.StatusType.ATTACK_RESISTANCE) {
                                infoText.physicalResist = this.decorateText(infoText.physicalResist, false);
                            }
                            else if (tempEvent.status.type === ENUM.StatusType.MAGIC_RESISTANCE) {
                                infoText.magicalResist = this.decorateText(infoText.magicalResist, false);
                            }
                            else if (tempEvent.status.type === ENUM.StatusType.BREATH_RESISTANCE) {
                                infoText.breathResist = this.decorateText(infoText.breathResist, false);
                            }
                            else if (tempEvent.status.type === ENUM.StatusType.WILL_ATTACK_AGAIN) {
                                infoText.willAttackAgain = this.decorateText(infoText.willAttackAgain, false);
                            }
                            else if (tempEvent.status.type === ENUM.StatusType.SKILL_PROBABILITY) {
                                infoText.skillProbability = this.decorateText(infoText.skillProbability, false);
                            }
                            else if (tempEvent.status.type === ENUM.StatusType.HP_SHIELD) {
                                infoText.hpShield = this.decorateText(infoText.hpShield, false);
                            }
                        }
                        else if (tempEvent.type === ENUM.MinorEventType.AFFLICTION) {
                            if (!tempEvent.affliction.isFinished) {
                                infoText.affliction = this.decorateText(infoText.affliction, false);
                            }
                        }
                    }
                }

                if (logger.minorEventLog[majorIndex] && logger.minorEventLog[majorIndex][0].executorId === playerCards[f].id) {
                    infoText.name = `<b>${infoText.name}</b>`;
                }

                let htmlelem = document.getElementById(`player${p}Fam${f}`); // <- the box to display info of the current fam
                htmlelem.innerHTML = infoText.name + "<br>" +
                                    infoText.hp  + "<br>" +
                                    infoText.atk + "<br>" +
                                    infoText.def + "<br>" +
                                    infoText.wis + "<br>" +
                                    infoText.agi +
                                    (infoText.physicalResist?   `<br>${infoText.physicalResist}` : "") +
                                    (infoText.magicalResist?    `<br>${infoText.magicalResist}` : "") +
                                    (infoText.breathResist?     `<br>${infoText.breathResist}` : "") +
                                    (infoText.willAttackAgain?  `<br>${infoText.willAttackAgain}` : "") +
                                    (infoText.skillProbability? `<br>${infoText.skillProbability}` : "") +
                                    (infoText.hpShield?         `<br>${infoText.hpShield}` : "") +
                                    (infoText.affliction?       `<br>${infoText.affliction}` : "");

                // display last event's HP
                let lastEventCard = lastEventField[`player${p}Cards`][f];
                graphic.displayHP (lastEventCard.stats.hp / lastEventCard.originalStats.hp * 100, p, f, 0);
            }
        }
        graphic.displayAllCardImages(majorIndex);

        // display turn animation
        graphic.displayAllAfflictionText(lastEventIndex);
        graphic.displayMajorEventAnimation(majorIndex);
    }

    /**
     * Get the final stat after all adjustments (buff/debuff status,
     * new debuff logic adjustment, remain hp power up)
     */
    getFinalStat(original: number, statusAmount: number, isNewLogic: boolean, remainHpPwrUp: number, hpRatio: number): number {
        let value = original;

        if (remainHpPwrUp > 1){
            value += Math.round(value * (1 - hpRatio) * (remainHpPwrUp - 1));
        }

        value += statusAmount;

        if (value < 0) {
            value = 0;
        }

        if (isNewLogic) {
            let lowerLimit = original * Card.NEW_DEBUFF_LOW_LIMIT_FACTOR;
            value = (value > lowerLimit) ? value : lowerLimit;
        }
        return value;
    }

    /**
     * Decorate a string by bolding it and make it red or green
     * @param text the text to decorate
     * @param isNegative true if you want the text to be red, false if green
     */
    decorateText(text: string, isNegative: boolean): string {
        let openTag: string;
        if (isNegative) {
            openTag = "<span style='color:red'><b>";
        }
        else {
            openTag = "<span style='color:green'><b>";
        }
        return openTag + text + "</b></span>";
    }
}
