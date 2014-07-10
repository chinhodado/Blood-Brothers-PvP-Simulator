/// <reference path="../lib/svgjs.d.ts"/>

/**
 * Handle the logging and displaying of information
 */
class BattleLogger {

    // an array of arrays of MinorEvent objects, describing the things that happened under that major event
    minorEventLog: MinorEvent[][] = [];

    // just an array of strings
    majorEventLog : MajorEvent[] = [];
    
    currentTurn : number = 0;
    initialFieldInfo;

    private static _instance : BattleLogger = null;

    constructor() {
        if (BattleLogger._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        BattleLogger._instance = this;
    }

    public static getInstance() : BattleLogger {
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

        if (BattleModel.IS_MASS_SIMULATION) {
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

        if (BattleModel.IS_MASS_SIMULATION) {
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
     * Apply an event to the supplied data
     */
    applyMinorEvent(event: MinorEvent, toApply) {

        // get the card
        var card;
        for (var i = 0; i<5; i++) {
            if (toApply.player1Cards[i].id == event.targetId) {
                card = toApply.player1Cards[i];
                break;
            }
            if (toApply.player2Cards[i].id == event.targetId) {
                card = toApply.player2Cards[i];
                break;
            }
        }
                
        if (event.type == ENUM.MinorEventType.HP) {
            card.stats.hp += event.amount;
            if (card.stats.hp > card.originalStats.hp) {
                card.stats.hp = card.originalStats.hp;
            }
        }
        else if (event.type == ENUM.MinorEventType.STATUS) {
            switch (event.status.type) {
                case ENUM.StatusType.ATK :
                    card.status.atk += event.amount;
                    break;
                case ENUM.StatusType.DEF :
                    card.status.def += event.amount;
                    break;
                case ENUM.StatusType.WIS :
                    card.status.wis += event.amount;
                    break;
                case ENUM.StatusType.AGI :
                    card.status.agi += event.amount;
                    break;
                case ENUM.StatusType.ATTACK_RESISTANCE :
                    card.status.attackResistance = event.amount;
                    break;  
                case ENUM.StatusType.MAGIC_RESISTANCE :
                    card.status.magicResistance = event.amount;
                    break;
                case ENUM.StatusType.BREATH_RESISTANCE :
                    card.status.breathResistance = event.amount;
                    break;
                case ENUM.StatusType.SKILL_PROBABILITY :
                    card.status.skillProbability = event.amount;
                    break;
                default :
                    throw new Error("Unknown status attribute");
                    break;
            }
        }
        else if (event.type == ENUM.MinorEventType.AFFLICTION) {
            if (event.affliction.isFinished) { // the affliction finished
                card.affliction = null;
                return;
            }
            switch (event.affliction.type) {
                case ENUM.AfflictionType.BLIND:
                    card.affliction = { type: "Blinded", duration: event.affliction.duration };
                    break;
                case ENUM.AfflictionType.DISABLE:
                    card.affliction = { type: "Disabled", duration: event.affliction.duration };
                    break;
                case ENUM.AfflictionType.FROZEN:
                    card.affliction = { type: "Frozen", duration: event.affliction.duration };
                    break;
                case ENUM.AfflictionType.PARALYSIS:
                    card.affliction = { type: "Paralyzed", duration: event.affliction.duration };
                    break;
                case ENUM.AfflictionType.POISON:
                    card.affliction = { type: "Poisoned", percent: event.affliction.percent };
                    break;
                case ENUM.AfflictionType.SILENT:
                    card.affliction = { type: "Silent", duration: event.affliction.duration };
                    break;
                default:
                    throw new Error("Invalid affliction type!");
            }
        }
    }
    
    /**
     * This is called when you click on an event in the event list. It updates the field on the right side
     * of the screen with information after the event that you clicked on has been processed. That event
     * is represented by the index argument supplied into this function.
     */
    displayEventLogAtIndex(majorIndex) {

        // display turn animation
        BattleGraphic.getInstance().displayAllAfflictionText(majorIndex - 1);
        BattleGraphic.getInstance().displayMajorEventAnimation(majorIndex);

        // for displaying last turn's HP
        var lastEventIndex = majorIndex == 0? 0 : majorIndex - 1;
        var lastEventField = this.getFieldAtMajorIndex(lastEventIndex);
         
        var field = this.getFieldAtMajorIndex(majorIndex);
        
        // now prepares the info and print them out
        for (var player = 1; player <=2; player++) { // for each player
            var playerCards = field["player" + player + "Cards"]; // get the cards of that player
            for (var fam = 0; fam < 5; fam++) { // for each card
                var stats = playerCards[fam].stats;
                var originalStats = playerCards[fam].originalStats;
                var status = playerCards[fam].status;
                var afflict = playerCards[fam].affliction; // not the same thing as in the original card class

                var htmlelem = document.getElementById("player" + player + "Fam" + fam); // <- the box to display info of the current fam
                
                // the stats of the fam after the buffs/debuffs are added in
                var addedATK = stats.atk + status.atk;
                var addedDEF = stats.def + status.def;
                var addedWIS = stats.wis + status.wis;
                var addedAGI = stats.agi + status.agi;
                
                var infoText: any = {
                    name : playerCards[fam].name,
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

                if (afflict) {
                    infoText.affliction = "Affliction: " + afflict.type
                    if (afflict.type != "Poisoned") {
                        infoText.affliction += (" (" + afflict.duration + " turn)");
                    }
                    else {
                        infoText.affliction += (" (" + afflict.percent + " %)");
                    }
                }
                
                // grab all minor events under the latest major event
                // need to make sure eventLog[index] exists
                for (var j = 0; this.minorEventLog[majorIndex] && j < this.minorEventLog[majorIndex].length; j++) {
                    var tempEvent = this.minorEventLog[majorIndex][j]; // a minor event
                    if (tempEvent.targetId == playerCards[fam].id) {
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
                        }
                        else if (tempEvent.type == ENUM.MinorEventType.AFFLICTION) {
                            if (!tempEvent.affliction.isFinished) {
                                infoText.affliction = this.decorateText(infoText.affliction, false);
                            }
                        }
                    }
                }
                
                if (this.minorEventLog[majorIndex] && this.minorEventLog[majorIndex][0].executorId == playerCards[fam].id) {
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
                                    (infoText.affliction? ( "<br>" + infoText.affliction) : "");

                // display last event's HP
                var lastEventCard = lastEventField["player" + player + "Cards"][fam];
                BattleGraphic.getInstance().displayHPOnCanvas (lastEventCard.stats.hp / lastEventCard.originalStats.hp * 100, player, fam, 0);                
            }
        }
    }
    
    // get the field situation at a major event index
    getFieldAtMajorIndex(majorIndex: number) {
        // deserialize the initial field info
        var initialField = JSON.parse(this.initialFieldInfo);
        
        // apply events to initial field up to the specified event
        for (var i = 0; i <=  majorIndex; i++) {
            // need to make sure minorEventLog[i] exists, in case this is an empty event (like the "Battle start" event);
            for (var j = 0; this.minorEventLog[i] && j < this.minorEventLog[i].length; j++) {
                this.applyMinorEvent(this.minorEventLog[i][j], initialField);
            }
        }

        return initialField;
    }

    getFieldAtMinorIndex(majorIndex: number, minorIndex: number) {
        // get last major index's field
        var lastField = this.getFieldAtMajorIndex(majorIndex - 1);

        // then apply the current major index's minor events upon it
        for (var j = 0; this.minorEventLog[majorIndex] && j < this.minorEventLog[majorIndex].length && j <= minorIndex; j++) {
            this.applyMinorEvent(this.minorEventLog[majorIndex][j], lastField);
        }

        return lastField;
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
        this.displayMinorEvent(event.description);
    }
    
    /**
     * Save the initial situation of the field
     * For now it just saves the cards of the two players
     */
    saveInitialField() {

        if (BattleModel.IS_MASS_SIMULATION) {
            return;
        }

        // save a log of the current field situation
        var toSerialize = {
            player1Cards: getSerializableObjectArray(BattleModel.getInstance().player1Cards),
            player2Cards: getSerializableObjectArray(BattleModel.getInstance().player2Cards)
        };
        
        this.initialFieldInfo = JSON.stringify(toSerialize);
    }
    
    /**
     * Should only call this when need the targets for an AoE attack
     * Return an array of target id's
     */
    getTargetsInMajorEvent(majorIndex: number): number[] {
        var targets = [];
        for (var i = 0; i < this.minorEventLog[majorIndex].length; i++) {
            var tmpData = this.minorEventLog[majorIndex][i];
            if (tmpData.executorId == this.majorEventLog[majorIndex].executorId) {
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
        this.displayMinorEvent("Everything ready");
        this.displayEventLogAtIndex(0);
    }
}

interface MinorEvent {
    executorId?: number;  // the card id of the executor
    targetId?: number;    // the card id of the target
    type?: ENUM.MinorEventType;
    wardUsed?: string;
    affliction?: {
        type: ENUM.AfflictionType;
        percent?: number;
        isFinished?: boolean;
        duration?: number;
    };
    status?: {
        type: ENUM.StatusType;
    };
    protect?: {
        protectedId: number;
        counter?: boolean;
        counteredSkillId: number;
        attackerId: number
    };
    amount?: number;      // the amount changed (for HP/Status) or number of turns left (affliction)
    description?: string; // description of the event in plain text
    skillId?: number;     // the skill associated with this MinorEvent
}

interface MajorEvent {
    description: string;
    executorId?: number;
    skillId?: number;
}
