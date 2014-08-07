/// <reference path="../lib/svgjs.d.ts"/>

/**
 * Handle the logging and displaying of information
 */
class BattleLogger {

    static IS_DEBUG_MODE = true;

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
        if(BattleLogger._instance === null) {
            BattleLogger._instance = new BattleLogger();
        }
        return BattleLogger._instance;
    }

    /**
     * Allows to create a new instance
     * Used for testing only
     */
    static removeInstance() {
        BattleLogger._instance = null;
    }
    
    /**
     * Display a major event on screen (the left side list)
     */
    displayMajorEvent (index : number) : void {

        if (!BattleLogger.IS_DEBUG_MODE) {
            return;
        }

        var data = this.majorEventLog[index];
        var id = "turn" + this.currentTurn + "events";
        var battleEventDiv = document.getElementById("battleEventDiv");
        var turnEventList = document.getElementById(id);
        
        // if not already exist, create it
        if (!turnEventList) {
            turnEventList = document.createElement("ul");
            turnEventList.setAttribute("id", id);
            battleEventDiv.appendChild(turnEventList);
        }

        var newEvent = document.createElement("li");
        newEvent.innerHTML = "<a>" + data.description + "</a>";
        newEvent.setAttribute("tabindex", index + "");
        newEvent.setAttribute("id", index + "");
        
        // populate right section with the field situation
        newEvent.onclick = function () {
            BattleLogger.getInstance().displayEventLogAtIndex(this.id);
        };
        turnEventList.appendChild(newEvent);    
    }
    
    /**
     * Use this to log a major event: a normal attack, a proc, etc. Can also be
     * thought of as logging the main action in a fam's turn. The data to log here
     * is just a string, there's no actual data change associated with a major event
     */
    addMajorEvent (data: MajorEvent) {

        if (BattleModel.IS_MASS_SIMULATION) {
            return;
        }

        this.majorEventLog.push(data);
        this.displayMajorEvent(this.majorEventLog.length - 1);
    }
    
    /**
     * Log a new turn
     */
    bblogTurn(data) {

        if (BattleModel.IS_MASS_SIMULATION || !BattleLogger.IS_DEBUG_MODE) {
            return;
        }

        var battleEventDiv = document.getElementById("battleEventDiv");
        var newEvent = document.createElement("p");
        newEvent.innerHTML = data;
        battleEventDiv.appendChild(newEvent);
    }
    
    /**
     * Display a minor event on screen
     */
    displayMinorEvent (data) {

        if (BattleModel.IS_MASS_SIMULATION || !BattleLogger.IS_DEBUG_MODE) {
            return;
        }

        var id = "turn" + this.currentTurn + "events";
        
        // the list of events of this turn
        // assume that it has already been created
        var turnEventList = document.getElementById(id);

        // a <li>, the last "major" event that occurred in this turn, like when a fam procs
        var lastEvent : any = turnEventList.lastChild;

        // the <ul> nested inside the above <li>, the sub event list
        var subEventList = lastEvent.getElementsByClassName("ul")[0];
        
        // if not already exist, create it
        if (!subEventList) {
            subEventList = document.createElement("ul");
            // TODO: maybe give it an id
            lastEvent.appendChild(subEventList);
        }

        // new list item for the sub event, and append it to the sub event list
        var newEvent = document.createElement("li");
        newEvent.innerHTML = "<a>" + data + "</a>";
        subEventList.appendChild(newEvent);        
    }
   
    /**
     * This is called when you click on an event in the event list. It updates the field on the right side
     * of the screen with information after the event that you clicked on has been processed. That event
     * is represented by the index argument supplied into this function.
     */
    displayEventLogAtIndex(majorIndex) {

        if (!BattleLogger.IS_DEBUG_MODE) {
            return;
        }

        var lastEventIndex = majorIndex == 0? 0 : majorIndex - 1;

        // display turn animation
        BattleGraphic.getInstance().displayAllAfflictionText(lastEventIndex);
        BattleGraphic.getInstance().displayMajorEventAnimation(majorIndex);

        // for displaying last turn's HP        
        var lastEventField = this.getFieldAtMajorIndex(lastEventIndex);
         
        var field = this.getFieldAtMajorIndex(majorIndex);
        
        // now prepares the info and print them out
        for (var p = 1; p <=2; p++) { // for each player
            var playerCards = field["player" + p + "Cards"]; // get the cards of that player
            for (var f = 0; f < 5; f++) { // for each card
                var stats = playerCards[f].stats;
                var originalStats = playerCards[f].originalStats;
                var status: Status = playerCards[f].status;
                var afflict = playerCards[f].affliction; // not the same thing as in the original card class

                var htmlelem = document.getElementById("player" + p + "Fam" + f); // <- the box to display info of the current fam
                
                // the stats of the fam after the buffs/debuffs are added in
                var addedATK = this.getAdjustedStat(originalStats.atk, status.atk, status.isNewLogic[ENUM.StatusType.ATK]);
                var addedDEF = this.getAdjustedStat(originalStats.def, status.def, status.isNewLogic[ENUM.StatusType.DEF]);
                var addedWIS = this.getAdjustedStat(originalStats.wis, status.wis, status.isNewLogic[ENUM.StatusType.WIS]);
                var addedAGI = this.getAdjustedStat(originalStats.agi, status.agi, status.isNewLogic[ENUM.StatusType.AGI]);
                
                var infoText: any = {
                    name : playerCards[f].name,
                    hp : "HP: " + stats.hp,
                    atk : "ATK: " + addedATK,
                    def : "DEF: " + addedDEF,
                    wis : "WIS: " + addedWIS,
                    agi : "AGI: " + addedAGI,
                };

                if (status.attackResistance != 0) {
                    infoText.physicalResist = "PW: " + status.attackResistance;
                }

                if (status.magicResistance != 0) {
                    infoText.magicalResist = "MW: " + status.magicResistance;
                }

                if (status.breathResistance != 0) {
                    infoText.breathResist = "BW: " + status.breathResistance;
                }

                if (status.willAttackAgain != 0) {
                    infoText.willAttackAgain = "Extra action: Yes";
                }

                if (status.skillProbability != 0) {
                    infoText.skillProbability = "Extra prob.: " + status.skillProbability;
                }

                if (status.hpShield != 0) {
                    infoText.hpShield = "HP Shld.: " + status.hpShield;
                }

                if (afflict) {
                    infoText.affliction = "Affliction: " + Affliction.getAfflictionAdjective(afflict.type);
                    if (afflict.type === ENUM.AfflictionType.SILENT) {
                        infoText.affliction += (" (" + afflict.validTurnNum + " turn)");
                    }
                    else if (afflict.type === ENUM.AfflictionType.POISON){
                        infoText.affliction += (" (" + afflict.percent + " %)");
                    }
                    else { // frozen, disabled, paralyzed
                        infoText.affliction += " (1 turn)";
                    }
                }
                
                // grab all minor events under the latest major event
                // need to make sure eventLog[index] exists
                for (var j = 0; this.minorEventLog[majorIndex] && j < this.minorEventLog[majorIndex].length; j++) {
                    var tempEvent = this.minorEventLog[majorIndex][j]; // a minor event
                    if (tempEvent.targetId == playerCards[f].id) {
                        if (tempEvent.type == ENUM.MinorEventType.HP) {
                            infoText.hp = this.decorateText(infoText.hp, tempEvent.amount < 0);
                        }
                        else if (tempEvent.type == ENUM.MinorEventType.STATUS) {
                            if (tempEvent.status.type == ENUM.StatusType.ATK) {
                                infoText.atk = this.decorateText(infoText.atk, tempEvent.amount < 0);
                            }
                            else if (tempEvent.status.type == ENUM.StatusType.DEF) {
                                infoText.def = this.decorateText(infoText.def, tempEvent.amount < 0);
                            }
                            else if (tempEvent.status.type == ENUM.StatusType.WIS) {
                                infoText.wis = this.decorateText(infoText.wis, tempEvent.amount < 0);
                            }
                            else if (tempEvent.status.type == ENUM.StatusType.AGI) {
                                infoText.agi = this.decorateText(infoText.agi, tempEvent.amount < 0);
                            }
                            else if (tempEvent.status.type == ENUM.StatusType.ATTACK_RESISTANCE) {
                                infoText.physicalResist = this.decorateText(infoText.physicalResist, false);
                            }
                            else if (tempEvent.status.type == ENUM.StatusType.MAGIC_RESISTANCE) {
                                infoText.magicalResist = this.decorateText(infoText.magicalResist, false);
                            }
                            else if (tempEvent.status.type == ENUM.StatusType.BREATH_RESISTANCE) {
                                infoText.breathResist = this.decorateText(infoText.breathResist, false);
                            }
                            else if (tempEvent.status.type == ENUM.StatusType.WILL_ATTACK_AGAIN) {
                                infoText.willAttackAgain = this.decorateText(infoText.willAttackAgain, false);
                            }
                            else if (tempEvent.status.type == ENUM.StatusType.SKILL_PROBABILITY) {
                                infoText.skillProbability = this.decorateText(infoText.skillProbability, false);
                            }
                            else if (tempEvent.status.type == ENUM.StatusType.HP_SHIELD) {
                                infoText.hpShield = this.decorateText(infoText.hpShield, false);
                            }
                        }
                        else if (tempEvent.type == ENUM.MinorEventType.AFFLICTION) {
                            if (!tempEvent.affliction.isFinished) {
                                infoText.affliction = this.decorateText(infoText.affliction, false);
                            }
                        }
                    }
                }
                
                if (this.minorEventLog[majorIndex] && this.minorEventLog[majorIndex][0].executorId == playerCards[f].id) {
                    infoText.name = "<b>" + infoText.name + "</b>";
                }

                htmlelem.innerHTML = infoText.name + "<br>" +
                                    infoText.hp  + "<br>" +
                                    infoText.atk + "<br>" +
                                    infoText.def + "<br>" +
                                    infoText.wis + "<br>" +
                                    infoText.agi +
                                    (infoText.physicalResist? ( "<br>" + infoText.physicalResist) : "") +
                                    (infoText.magicalResist? ( "<br>" + infoText.magicalResist) : "") +
                                    (infoText.breathResist? ( "<br>" + infoText.breathResist) : "") +
                                    (infoText.willAttackAgain? ( "<br>" + infoText.willAttackAgain) : "") +
                                    (infoText.skillProbability? ( "<br>" + infoText.skillProbability) : "") +
                                    (infoText.hpShield? ( "<br>" + infoText.hpShield) : "") +
                                    (infoText.affliction? ( "<br>" + infoText.affliction) : "");

                // display last event's HP
                var lastEventCard = lastEventField["player" + p + "Cards"][f];
                BattleGraphic.getInstance().displayHPOnCanvas (lastEventCard.stats.hp / lastEventCard.originalStats.hp * 100, p, f, 0);                
            }
        }
    }

    /**
     * Display the info text for normal mode
     */
    displayInfoText() {
        var cardManager = CardManager.getInstance();
        var battle = BattleModel.getInstance();
        var p1randTxt = this.getRandomModeText(+battle.p1RandomMode);
        var p2randTxt = this.getRandomModeText(+battle.p2RandomMode);

        var infoDiv = document.getElementById("infoDiv");
        infoDiv.innerHTML = "You are watching <br><b> " + p2randTxt+ "</b>  Player 2 (" + 
            cardManager.getPlayerBrigString(battle.player2) + ") <br> vs <br><b> " + 
            p1randTxt + "</b> Player 1 (" + cardManager.getPlayerBrigString(battle.player1) + ") <br><br>";

        var refreshText = document.getElementById("refreshText");  
        refreshText.innerHTML = "between " + p1randTxt + " Player 1 and " + p2randTxt + " Player 2";
    }

    getRandomModeText(type: ENUM.RandomBrigType) {
        switch (type) {
            case ENUM.RandomBrigType.ALL:
                return "a random";
            case ENUM.RandomBrigType.X_ONLY:
                return "a random tier X";
            case ENUM.RandomBrigType.SP_ONLY:
                return "a random tier S+";
            case ENUM.RandomBrigType.SP_UP:
                return "a random tier S+ and up";
            case ENUM.RandomBrigType.S_ONLY:
                return "a random tier S";
            case ENUM.RandomBrigType.S_UP:
                return "a random tier S and up";
            case ENUM.RandomBrigType.AP_ONLY:
                return "a random tier A+";
            case ENUM.RandomBrigType.AP_UP:
                return "a random tier A+ and up";
            case ENUM.RandomBrigType.A_ONLY:
                return "a random tier A";
            case ENUM.RandomBrigType.A_UP:
                return "a random tier A and up";
            default:
                return "";
        }
    }

    // after adjusted new debuff
    getAdjustedStat(original: number, statusAmount: number, isNewLogic: boolean) {
        var value = original + statusAmount;

        if (value < 0) {
            value = 0;
        }

        if (isNewLogic) {
            var lowerLimit = original * Card.NEW_DEBUFF_LOW_LIMIT_FACTOR;
            value = (value > lowerLimit) ? value : lowerLimit;
        }
        return value;    
    }
    
    // get the field situation at a major event index
    getFieldAtMajorIndex(majorIndex: number) {

        // for empty major events like opening proc with no success target
        if (!this.minorEventLog[majorIndex]) {
            return this.getFieldAtMajorIndex(majorIndex - 1);
        }

        var minorLogLength = this.minorEventLog[majorIndex].length;
        var minorFieldsLength = this.minorEventFields[majorIndex].length;

        if (minorLogLength !== minorFieldsLength) {
            throw new Error ("Log length and stored fields length are not equal!");
        }

        return JSON.parse(this.minorEventFields[majorIndex][minorFieldsLength - 1]);
    }

    getFieldAtMinorIndex(majorIndex: number, minorIndex: number) {
        return JSON.parse(this.minorEventFields[majorIndex][minorIndex]);
    }

    /**
     * Decorate a string by bolding it and make it red or green
     * @param text the text to decorate
     * @param isNegative true if you want the text to be red, false if green
     */
    decorateText(text : string, isNegative : boolean) {
        var openTag : string;
        if (isNegative) {
            openTag = "<span style='color:red'><b>";
        }
        else {
            openTag = "<span style='color:green'><b>";
        }
        return openTag + text + "</b></span>";
    }
    
    /**
     * Add a minor event to our minor event log.
     */
    addMinorEvent(event: MinorEvent) {

        if (BattleModel.IS_MASS_SIMULATION) {
            return;
        }

        var index = this.majorEventLog.length - 1;
        
        if (!this.minorEventLog[index]) {
            this.minorEventLog[index] = [];
        }
        this.minorEventLog[index].push(event);
        
        if (!this.minorEventFields[index]) {
            this.minorEventFields[index] = [];
        }
        this.minorEventFields[index].push(this.getCurrentFieldJSON());

        this.displayMinorEvent(event.description);
    }

    getCurrentFieldJSON() {
        var toSerialize = {
            player1Cards: getSerializableObjectArray(BattleModel.getInstance().player1Cards),
            player2Cards: getSerializableObjectArray(BattleModel.getInstance().player2Cards)
        };

        return JSON.stringify(toSerialize);
    }
    
    /**
     * Should only call this when need the targets for an AoE attack
     * Return an array of target id's
     */
    getTargetsInMajorEvent(majorIndex: number): number[] {
        var targets = [];
        var majorEvent = this.majorEventLog[majorIndex];
        for (var i = 0; i < this.minorEventLog[majorIndex].length; i++) {
            var tmpData = this.minorEventLog[majorIndex][i];
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
        var targets = [];
        var initialAttackLog = this.minorEventLog[majorIndex][minorIndex];
        var executorId = initialAttackLog.executorId;
        var skillId = initialAttackLog.skillId;

        for (var i = minorIndex; i < this.minorEventLog[majorIndex].length; i++) {
            var tmpData = this.minorEventLog[majorIndex][i];
            if (tmpData.executorId === executorId && tmpData.skillId === skillId) {
                targets.push(tmpData.targetId);
            }
        }
        return targets;
    }

    /**
     * Log the situation at the start of battle and display the initial info
     */
    startBattleLog() {

        if (BattleModel.IS_MASS_SIMULATION) {
            return;
        }

        this.addMajorEvent({description: "Battle start"});
        this.addMinorEvent({
            type: ENUM.MinorEventType.TEXT,
            description: "Everything ready"
        });
        this.displayEventLogAtIndex(0);
    }
}

interface MinorEvent {
    executorId?: number;  // the card id of the executor
    targetId?: number;    // the card id of the target
    type?: ENUM.MinorEventType;
    noProcEffect?: boolean; // specify true if don't want the proc effect to be displayed
    wardUsed?: ENUM.WardType;
    missed?: boolean;
    affliction?: {
        type: ENUM.AfflictionType;
        percent?: number;
        isFinished?: boolean;
        duration?: number;
        missProb?: number;
    };
    status?: {
        type: ENUM.StatusType;
        isNewLogic?: boolean;
        isDispelled?: boolean;
        isAllUp?: boolean; // Rally Cry
    };
    protect?: {
        protectedId: number;
        counter?: boolean;
        counteredSkillId: number;
        attackerId: number
    };
    reviveHPRatio?: number; // for revive
    amount?: number;      // the amount changed (for HP/Status) or number of turns left (affliction)
    description?: string; // description of the event in plain text
    skillId?: number;     // the skill associated with this MinorEvent
}

interface MajorEvent {
    description: string;
    executorId?: number;
    skillId?: number;
}
