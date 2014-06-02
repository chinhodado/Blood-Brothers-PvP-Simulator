/**
 * Handle the logging and displaying of information
 */
class BattleLogger {

    eventLog = {};
    majorEventCounter : number = 0;
    minorEventCounter : number = 0;
    
    currentTurn : number = 0;
    initialFieldInfo;
    
    imageCoordinate = {
        // array of 5 arrays of 3 elements: x, y and ytype ("UP", "MID" or "DOWN")
        1 : [], // for player 1
        2 : []  // and player 2
    };
        
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
        newEvent.onfocus = function () {
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
                var originalStats = playerCards[fam].originalStats;
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
                    physicalResist : "PW: " + status.attackResistance,
                    magicalResist : "MW: " + status.magicResistance,
                    breathResist : "BW: " + status.breathResistance
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
                                    infoText.physicalResist + ", " +
                                    infoText.magicalResist + ", " +
                                    infoText.breathResist + " "
                htmlelem.innerHTML = finalFamInfo;
                
                // display hp on canvas
                this.displayHPOnCanvas (stats.hp / originalStats.hp * 100, player, fam);
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
     * Display the two players' formations and their familiars on their canvas
     */
    displayFormationAndFamOnCanvas() {

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
            //ctx.canvas.height = window.innerHeight * 0.2;
    
            var horizontalStep = c.width / 10;
            var verticalStep = c.height / 2;
            
            var coordArray = [];
            
            // calculate the bullets coord
            for (var i = 0; i < 5; i++) {
                var bulletX = ((i + 1) * 2 - 1) * horizontalStep;
                var bulletY = (playerFormations[player][i] - 1) * verticalStep;
                bulletY = bulletY < verticalStep? bulletY + 15 : (bulletY > verticalStep? bulletY - 15 : bulletY);
                
                coordArray.push([bulletX, bulletY]);
            }
            
            // now draw lines and bullets
            for (var i = 0; i < 4; i++) {
                ctx.moveTo(coordArray[i][0], coordArray[i][1]);
                ctx.lineTo(coordArray[i + 1][0], coordArray[i + 1][1]);
                ctx.stroke();
    
                ctx.beginPath();
                ctx.arc(coordArray[i][0], coordArray[i][1], 5, 0, 2*Math.PI);
                ctx.fill();
    
                ctx.beginPath();
                ctx.arc(coordArray[i + 1][0], coordArray[i + 1][1], 5, 0, 2*Math.PI);
                ctx.fill();
            }
            
            // grab the image links of the curent player's fam
            var imageLinksArray = [];
            var initialField = JSON.parse(this.initialFieldInfo);
            var playerCards = initialField["player" + player + "Cards"]; // get the cards of this player
            for (var fam = 0; fam < 5; fam++) { // for each card
                imageLinksArray.push(playerCards[fam].imageLink);
            }
            
            var IMAGE_WIDTH = 60;            
            
            // calculate the coordinate for fam images
            for (var i = 0; i < 5; i++) {
                this.imageCoordinate[player][i] = [];
                
                if (coordArray[i][1] < verticalStep / 2) { // if y is less than 1/4 the height of the canvas
                    this.imageCoordinate[player][i][1] = 0;
                    this.imageCoordinate[player][i][2] = "UP";
                }
                else if (coordArray[i][1] > verticalStep / 2 * 3) { // if y is greater than 3/4 the height of the canvas
                    this.imageCoordinate[player][i][1] = ctx.canvas.height - IMAGE_WIDTH * 1.5;
                    this.imageCoordinate[player][i][2] = "DOWN";
                }
                else { // middle
                    this.imageCoordinate[player][i][1] = coordArray[i][1] - IMAGE_WIDTH * 1.5 / 2;
                    this.imageCoordinate[player][i][2] = "MID";
                }
                
                // the x coordinate is 1/2 image width to the left of the bullet
                this.imageCoordinate[player][i][0] = coordArray[i][0] - IMAGE_WIDTH / 2;
            }
            
            // display fam images
            for (var i = 0; i < 5; i++) {
                (function (i, array, ctx) {
                    var img = new Image();
                    img.src = imageLinksArray[i];
           
                    img.onload = function() {
                        ctx.drawImage(img, array[i][0], array[i][1]);
                    }
                })(i, this.imageCoordinate[player], ctx);
            }
        }
    }
    
    displayHPOnCanvas (percent, player, index) {
        var c : any = document.getElementById("player" + player + "canvas");
        var ctx = c.getContext("2d");
        
        var xstart = Math.round(this.imageCoordinate[player][index][0]);
        
        if (this.imageCoordinate[player][index][2] != "DOWN") {
            // display hp on top of the fam
            var ystart : number = this.imageCoordinate[player][index][1] + 90;
        }
        else {
            // diaply hp at bottom of fam            
            var ystart : number = this.imageCoordinate[player][index][1] - 20;
        }
        
        var width = 60; // width of the health bar
        var height = 5; // height of the health bar
        
        if (percent < 0) {
            var availableHealth = 0; // health bar can't be less than 0
        }
        else {
            var availableHealth = Math.round(percent/100 * width);
        }
        
        // line width for the border
        ctx.lineWidth = 2;
        
        ctx.fillStyle="#00FF00"; // <- green blood
        
        // first draw the full hp bar
        ctx.fillRect(xstart + 1.5, ystart + 1, availableHealth - 2.5, height - 2);

        // then clear it to show only the available health
        ctx.clearRect(xstart + availableHealth + 1, ystart + 1, width - availableHealth, height - 2);
        
        // draw the border
        ctx.fillStyle="#000000"; // <- black border
        ctx.strokeRect(xstart, ystart, width, height);
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