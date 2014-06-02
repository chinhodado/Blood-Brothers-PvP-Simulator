/**
 * Handle the logging and displaying of information
 */
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
            if (toApply.player1Cards[i].id == event.target) {
                card = toApply.player1Cards[i];
                break;
            }
            if (toApply.player2Cards[i].id == event.target) {
                card = toApply.player2Cards[i];
                break;
            }
        }
        
        // TODO: abstract this... please, future me, make it nicer :(
        if (event.attribute == "HP") {
            card.stats.hp += event.amount;
        }
        else {
            switch (ENUM.StatusType[<string>event.attribute]) {
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
                    throw new Error("Unknown attribute");
                    break;
            }
        }
    }
    
    /**
     * --- This function is a clusterfuck. I apologize if you are reading this, especially to myself in the future. ---
     * 
     * This is called when you click on an event in the event list. It updates the field on the right side
     * of the screen with information after the event that you clicked on has been processed. That event
     * is represented by the index argument supplied into this function.
     */
    displayEventLogAtIndex(index) { // <- the index of the event in the event log

        // first deserialize the initial field info into a nice object that we will modify later
        var initialField = JSON.parse(this.initialFieldInfo);
        
        // apply events to initial field up to the specified event
        for (var i = 0; i <=  index; i++) {
            // need to make sure eventLog[i] exists, in case this is an empty event (like the "Battle start" event);
            for (var j = 0; this.eventLog[i] && j < this.eventLog[i].length; j++) {
                this.applyEvent(this.eventLog[i][j], initialField);
            }
        }
        
        // now prepares the info and print them outS
        for (var player = 1; player <=2; player++) { // for each player
            var playerCards = initialField["player" + player + "Cards"]; // get the cards of that player
            for (var fam = 0; fam < 5; fam++) { // for each card
                var stats = playerCards[fam].stats;
                var status = playerCards[fam].status;
                var htmlelem = document.getElementById("player" + player + "Fam" + fam); // <- the box to display info of the current fam
                
                // the stats of the fam after the buffs/debuffs are added in
                var addedATK = stats.atk + status.atk;
                var addedDEF = stats.def + status.def;
                var addedWIS = stats.wis + status.wis;
                var addedAGI = stats.agi + status.agi;
                
                var infoText = {
                    name : playerCards[fam].name,
                    hp : "HP: " + stats.hp,
                    atk : "ATK: " + addedATK,
                    def : "DEF: " + addedDEF,
                    wis : "WIS: " + addedWIS,
                    agi : "AGI: " + addedAGI,
                    physicalResist : "Physical Ward: " + status.attackResistance,
                    magicalResist : "Magical Ward: " + status.magicResistance,
                    breathResist : "Breath Ward: " + status.breathResistance
                }
                
                // grab all minor events under the latest major event
                // need to make sure eventLog[index] exists
                for (var j = 0; this.eventLog[index] && j < this.eventLog[index].length; j++) {
                    var tempEvent = this.eventLog[index][j]; // a minor event
                    if (tempEvent.target == playerCards[fam].id) {
                        if (tempEvent.attribute == "HP") {
                            infoText.hp = this.decorateText(infoText.hp, tempEvent.amount < 0);
                        }
                        else if (tempEvent.attribute == "ATK") {
                            infoText.atk = this.decorateText(infoText.atk, tempEvent.amount < 0);
                        }
                        else if (tempEvent.attribute == "DEF") {
                            infoText.def = this.decorateText(infoText.def, tempEvent.amount < 0);
                        }
                        else if (tempEvent.attribute == "WIS") {
                            infoText.wis = this.decorateText(infoText.wis, tempEvent.amount < 0);
                        }
                        else if (tempEvent.attribute == "AGI") {
                            infoText.agi = this.decorateText(infoText.agi, tempEvent.amount < 0);
                        }
                        else if (tempEvent.attribute == "ATTACK_RESISTANCE") {
                            infoText.physicalResist = this.decorateText(infoText.physicalResist, false);
                        }
                        else if (tempEvent.attribute == "MAGIC_RESISTANCE") {
                            infoText.magicalResist = this.decorateText(infoText.magicalResist, false);
                        }
                        else if (tempEvent.attribute == "BREATH_RESISTANCE") {
                            infoText.breathResist = this.decorateText(infoText.breathResist, false);
                        }
                    }
                }
                
                if (this.eventLog[index] && this.eventLog[index][0].executor == playerCards[fam].id) {
                    infoText.name = "<b>" + infoText.name + "</b>";
                }
                
                var finalFamInfo = infoText.name + "<br>" +
                                    infoText.hp  + "<br>" +
                                    infoText.atk + "<br>" +
                                    infoText.def + "<br>" +
                                    infoText.wis + "<br>" +
                                    infoText.agi + "<br>" +
                                    infoText.physicalResist + "<br>" +
                                    infoText.magicalResist + "<br>" +
                                    infoText.breathResist + "<br>"
                htmlelem.innerHTML = finalFamInfo;
            }
        }
    }
    
    /**
     * Decorate a string by bolding it and make it red or green
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
     * Add an event to our event log. An event must have:
     *  - an executor/attacker/caster: whom the action in this event comes from
     *  - a target/defender: the one affected in this event
     *  - attribute: the thing belonging to the target that has been changed in this event
     *  - amount: the amount changed
     */
    addEvent(executor: Card, target : Card, attribute : string, amount : number) {
        // because this function is called after the counter has been incremented
        var index = this.majorEventCounter - 1;
        
        if (!this.eventLog[index]) {
            this.eventLog[index] = [];
        }
        this.eventLog[index].push({
            executor : executor.id, // the card id of the executor
            target : target.id,     // the card id of the target
            attribute : attribute,  // can be "HP" or a ENUM.StatusType "key" (a string)
            amount : amount         // the amount changed
        });
    }
    
    /**
     * Save the initial situation of the field
     * For now it just saves the cards of the two players
     */
    saveInitialField() {
        // save a log of the current field situation
        var toSerialize = {
            player1Cards: BattleModel.getInstance().player1Cards,
            player2Cards: BattleModel.getInstance().player2Cards
        };
        
        this.initialFieldInfo = JSON.stringify(toSerialize);
    }
    
    /**
     * Display the two players' formations on their canvases
     */
    displayFormationOnCanvas() {

        var playerFormations = {};
        playerFormations[1] = BattleModel.getInstance().player1.formation.getFormationConfig(); // player1's formation
        
        // reverse player2's formation for display purpose
        var player2formation = BattleModel.getInstance().player2.formation.getFormationConfig();
        var temp = [];
        var tempNumber : number;
        for (var i = 0; i < 5; i++) {            
            switch (player2formation[i]) {
                case 1 :
                    tempNumber = 3;
                    break;
                case 2 : 
                    tempNumber = 2;
                    break;
                case 3 :
                    tempNumber = 1;
                    break;
            }
            temp.push(tempNumber);
        }
        playerFormations[2] = temp;

        for (var player = 1; player <= 2; player ++) { // for each player
            var c : any = document.getElementById("player" + player + "canvas"); // grab the player's canvas
            var ctx = c.getContext("2d");
    
            // set the canvas's width and height
            ctx.canvas.width  = window.innerWidth * 0.45;
            ctx.canvas.height = window.innerHeight * 0.2;
    
            var horizontalStep = c.width / 10;
            var verticalStep = c.height / 2;
            
            // draw the lines and bullets
            for (var i = 0; i < 4; i++) {
                var bullet1X = ((i + 1) * 2 - 1) * horizontalStep;
                var bullet1Y = (playerFormations[player][i] - 1) * verticalStep;
                bullet1Y = bullet1Y < horizontalStep? bullet1Y + 5 : bullet1Y - 5;
    
                var bullet2X = ((i + 2) * 2 - 1) * horizontalStep;
                var bullet2Y = (playerFormations[player][i + 1] - 1) * verticalStep;
                bullet2Y = bullet2Y < horizontalStep? bullet2Y + 5 : bullet2Y - 5;
    
                ctx.moveTo(bullet1X, bullet1Y);
                ctx.lineTo(bullet2X, bullet2Y);
                ctx.stroke();
    
                ctx.beginPath();
                ctx.arc(bullet1X, bullet1Y, 5, 0, 2*Math.PI);
                ctx.fill();
    
                ctx.beginPath();
                ctx.arc(bullet2X, bullet2Y, 5, 0, 2*Math.PI);
                ctx.fill();
            }
        }
    }
    
    /**
     * Log the situation at the start of battle and display the initial info
     */
    startBattleLog() {
        this.bblogMajor("Battle start");
        this.bblogMinor("Everything ready");
        this.displayEventLogAtIndex(0);
    }
}