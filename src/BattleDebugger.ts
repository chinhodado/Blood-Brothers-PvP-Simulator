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
        var minorLog = BattleLogger.getInstance().minorEventLog;
        var majorLog = BattleLogger.getInstance().majorEventLog;

        var currentTurn = -10;
        for (var i = 0; i < majorLog.length; i++) {
            // display the turn
            if (majorLog[i].turn !== currentTurn) {
                currentTurn = majorLog[i].turn;
                this.displayTurn(currentTurn);
            }

            // display the major event
            this.displayMajorEvent(i);

            // display all the minor events inside this major event
            // TODO: make sure that there is at lest 1 minorEvent for each majorEvent, so we don't need to check for minorLog[i]
            for (var j = 0; minorLog[i] && j < minorLog[i].length; j++) {
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

        var data = BattleLogger.getInstance().majorEventLog[index];
        var id = `turn${data.turn}events`;
        var battleEventDiv = document.getElementById("battleEventDiv");
        var turnEventList = document.getElementById(id);

        // if not already exist, create it
        if (!turnEventList) {
            turnEventList = document.createElement("ul");
            turnEventList.setAttribute("id", id);
            battleEventDiv.appendChild(turnEventList);
        }

        var newEvent = document.createElement("li");
        newEvent.innerHTML = `<a>${data.description}</a>`;
        newEvent.setAttribute("tabindex", index + "");
        newEvent.setAttribute("id", index + "");

        // populate right section with the field situation
        newEvent.onclick = function () {
            BattleDebugger.getInstance().displayEventLogAtIndex(+this.id);
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

        var currentTurn = BattleLogger.getInstance().majorEventLog[majorIndex].turn;
        var id = `turn${currentTurn}events`;

        var description = BattleLogger.getInstance().minorEventLog[majorIndex][minorIndex].description;

        // the list of events of this turn
        // assume that it has already been created
        var turnEventList = document.getElementById(id);

        // a <li>, the last "major" event that occurred in this turn, like when a fam procs
        var lastEvent : any = turnEventList.lastChild;

        // the <ul> nested inside the above <li>, the sub event list
        var subEventList = lastEvent.getElementsByTagName("ul")[0];

        // if not already exist, create it
        if (!subEventList) {
            subEventList = document.createElement("ul");
            // TODO: maybe give it an id
            lastEvent.appendChild(subEventList);
        }

        // new list item for the sub event, and append it to the sub event list
        var newEvent = document.createElement("li");
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

        var battleEventDiv = document.getElementById("battleEventDiv");
        var newEvent = document.createElement("p");
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
        var graphic = BattleGraphic.getInstance();
        var logger = BattleLogger.getInstance();
        var lastEventIndex = (majorIndex === 0)? 0 : majorIndex - 1;

        // the field after the last major event and before the current major event
        var lastEventField = logger.getFieldAtMajorIndex(lastEventIndex);

        // the current field, aka the field after the current major event
        var field = logger.getFieldAtMajorIndex(majorIndex);

        // now prepares the info and print them out
        for (var p = 1; p <= 2; p++) { // for each player
            var playerCards = field[`player${p}Cards`]; // get the cards of that player
            var lastPlayerCards = lastEventField[`player${p}Cards`];
            for (var f = 0; f < 5; f++) { // for each card
                var stats          = playerCards[f].stats;
                var originalStats  = playerCards[f].originalStats;
                var status: Status = playerCards[f].status;
                var afflict = playerCards[f].affliction; // not the same thing as in the original card class

                var hpRatio = stats.hp / originalStats.hp;
                var finalAtk = this.getFinalStat(originalStats.atk, status.atk, status.isNewLogic[ENUM.StatusType.ATK],
                    status.remainHpAtkUp, hpRatio);
                var finalDef = this.getFinalStat(originalStats.def, status.def, status.isNewLogic[ENUM.StatusType.DEF],
                    status.remainHpDefUp, hpRatio);
                var finalWis = this.getFinalStat(originalStats.wis, status.wis, status.isNewLogic[ENUM.StatusType.WIS],
                    status.remainHpWisUp, hpRatio);
                var finalAgi = this.getFinalStat(originalStats.agi, status.agi, status.isNewLogic[ENUM.StatusType.AGI],
                    status.remainHpAgiUp, hpRatio);

                // get the stats after the last major event so we can compare with it later
                var lastStats          = lastPlayerCards[f].stats;
                var lastOriginalStats  = lastPlayerCards[f].originalStats;
                var lastStatus: Status = lastPlayerCards[f].status;
                var lastHpRatio = lastStats.hp / lastOriginalStats.hp;
                var lastFinalAtk = this.getFinalStat(lastOriginalStats.atk, lastStatus.atk, lastStatus.isNewLogic[ENUM.StatusType.ATK],
                    lastStatus.remainHpAtkUp, lastHpRatio);
                var lastFinalDef = this.getFinalStat(lastOriginalStats.def, lastStatus.def, lastStatus.isNewLogic[ENUM.StatusType.DEF],
                    lastStatus.remainHpDefUp, lastHpRatio);
                var lastFinalWis = this.getFinalStat(lastOriginalStats.wis, lastStatus.wis, lastStatus.isNewLogic[ENUM.StatusType.WIS],
                    lastStatus.remainHpWisUp, lastHpRatio);
                var lastFinalAgi = this.getFinalStat(lastOriginalStats.agi, lastStatus.agi, lastStatus.isNewLogic[ENUM.StatusType.AGI],
                    lastStatus.remainHpAgiUp, lastHpRatio);

                var infoText: any = {
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
                for (var j = 0; logger.minorEventLog[majorIndex] && j < logger.minorEventLog[majorIndex].length; j++) {
                    var tempEvent = logger.minorEventLog[majorIndex][j]; // a minor event
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

                var htmlelem = document.getElementById(`player${p}Fam${f}`); // <- the box to display info of the current fam
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
                var lastEventCard = lastEventField[`player${p}Cards`][f];
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
        var value = original;

        if (remainHpPwrUp > 1){
            value += Math.round(value * (1 - hpRatio) * (remainHpPwrUp - 1));
        }

        value += statusAmount;

        if (value < 0) {
            value = 0;
        }

        if (isNewLogic) {
            var lowerLimit = original * Card.NEW_DEBUFF_LOW_LIMIT_FACTOR;
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
        var openTag: string;
        if (isNegative) {
            openTag = "<span style='color:red'><b>";
        }
        else {
            openTag = "<span style='color:green'><b>";
        }
        return openTag + text + "</b></span>";
    }
}
