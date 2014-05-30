class BattleLogger {

    eventLog = {};
    majorEventCounter : number = 0;
    minorEventCounter : number = 0;
    
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
     * Use this to log a major event: a normal attack, a proc, etc. Can also be
     * thought of as logging the main action in a fam's turn
     */
    bblogMajor (data) {
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
        newEvent.innerHTML = "<a>" + data + "</a>";
        newEvent.setAttribute("tabindex", this.majorEventCounter + "");
        newEvent.setAttribute("id", this.majorEventCounter + "");
        
        // populate right section with the field situation
        newEvent.onclick = function () {
            BattleLogger.getInstance().displayEventLogAtIndex(this.id);
        };
        turnEventList.appendChild(newEvent);
        
        // save a log of the current field situation
        //this.updateEventLogAtIndex(this.eventCounter);
        this.majorEventCounter++;
    }
    
    /**
     * Log a new turn
     */
    bblogTurn(data) {
        var battleEventDiv = document.getElementById("battleEventDiv");
        var newEvent = document.createElement("p");
        newEvent.innerHTML = data;
        battleEventDiv.appendChild(newEvent);
    }
    
    /**
     * Use this to log a sub-event in a card's turn, like a single hit in a multi-hit skill, or if the target fam is dead
     * @param data Data to log
     */
    bblogMinor (data) {
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
        //newEvent.setAttribute("tabindex", this.eventCounter + "");
        subEventList.appendChild(newEvent);
        
        //this.updateEventLogAtLastIndex();
        this.minorEventCounter++;
    }
    
    /**
     * Apply an event to the supplied data
     */
    applyEvent(event, toApply) {
        // get the card
        var card;
        for (var i = 0; i<5; i++) {
            if (toApply.player1Cards[i].id == event.cardId) {
                card = toApply.player1Cards[i];
                break;
            }
            if (toApply.player2Cards[i].id == event.cardId) {
                card = toApply.player2Cards[i];
                break;
            }
        }
        
        // TODO: abstract this... please, future me, make it nicer :(
        if (event.attribute == ENUM.StatType.HP) {
            card.stats.hp += event.amount;
        }
        else if (event.attribute == ENUM.StatType.ATK) {
            card.stats.atk += event.amount;
        }
        else if (event.attribute == ENUM.StatType.DEF) {
            card.stats.def += event.amount;
        }
        else if (event.attribute == ENUM.StatType.WIS) {
            card.stats.wis += event.amount;
        }
        else if (event.attribute == ENUM.StatType.AGI) {
            card.stats.agi += event.amount;
        }
    }
    
    displayEventLogAtIndex(index) {

        var initialField = JSON.parse(this.initialFieldInfo);
        for (var i = 0; i <=  index; i++) {
            for (var j = 0; j < this.eventLog[i].length; j++) {
                this.applyEvent(this.eventLog[i][j], initialField);
            }
        }
        
        var log = initialField;
        for (var player = 1; player <=2; player++) {
            var playerCards = log["player" + player + "Cards"];
            for (var fam = 0; fam < 5; fam++) {
                var stats = playerCards[fam].stats;
                var htmlelem = document.getElementById("player" + player + "Fam" + fam);
                
                var infoText = {
                    hp : "HP: " + stats.hp,
                    atk : "ATK: " + stats.atk,
                    def : "DEF: " + stats.def,
                    wis : "WIS: " + stats.wis,
                    agi : "AGI: " + stats.agi
                }
                
                for (var j = 0; j < this.eventLog[index].length; j++) {
                    var tempEvent = this.eventLog[index][j];
                    if (tempEvent.cardId == playerCards[fam].id) {
                        if (tempEvent.attribute == ENUM.StatType.HP) {
                            infoText.hp = "<b>" + infoText.hp + "</b>";
                        }
                        if (tempEvent.attribute == ENUM.StatType.ATK) {
                            infoText.atk = "<b>" + infoText.atk + "</b>";
                        }
                        if (tempEvent.attribute == ENUM.StatType.DEF) {
                            infoText.def = "<b>" + infoText.def + "</b>";
                        }
                        if (tempEvent.attribute == ENUM.StatType.WIS) {
                            infoText.wis = "<b>" + infoText.wis + "</b>";
                        }
                        if (tempEvent.attribute == ENUM.StatType.AGI) {
                            infoText.agi = "<b>" + infoText.agi + "</b>";
                        }
                    }
                }
                
                var infotext = playerCards[fam].name + "<br>" +
                                infoText.hp  + "<br>" +
                                infoText.atk + "<br>" +
                                infoText.def + "<br>" +
                                infoText.wis + "<br>" +
                                infoText.agi
                htmlelem.innerHTML = infotext;
            }
        }
    }
    
    addEvent(card : Card, attribute : ENUM.StatType, amount : number) {
        // because this function is called after the counter has been incremented
        var index = this.majorEventCounter - 1;
        
        if (!this.eventLog[index]) {
            this.eventLog[index] = [];
        }
        this.eventLog[index].push({
            cardId : card.id,
            attribute : attribute,
            amount : amount
        });
    }
    
    saveInitialField() {
        // save a log of the current field situation
        var toSerialize = {
            player1Cards: BattleModel.getInstance().player1Cards,
            player2Cards: BattleModel.getInstance().player2Cards
        };
        
        this.initialFieldInfo = JSON.stringify(toSerialize);
    }
}