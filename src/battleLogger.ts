/// <reference path="battleModel.ts"/>
/// <reference path="card.ts"/>
/// <reference path="enums.ts"/>
/// <reference path="famDatabase.ts"/>
/// <reference path="formation.ts"/>
/// <reference path="player.ts"/>
/// <reference path="skill.ts"/>
/// <reference path="skillCalcType.ts"/>
/// <reference path="skillDatabase.ts"/>
/// <reference path="skillRange.ts"/>
/// <reference path="util.ts"/>
/// <reference path="../lib/svgjs.d.ts"/>

/**
 * Handle the logging and displaying of information
 */
class BattleLogger {

    // an array of arrays of MinorEvent objects, describing the things that happened under that major event
    minorEventLog: MinorEvent[][] = [];

    // just an array of strings
    majorEventLog : string[] = [];
    
    currentTurn : number = 0;
    initialFieldInfo;

    // holds the coordinates of the bullets of the formation
    coordArray: any = {
        1: [], 
        2: []
    };

    static IMAGE_WIDTH = 70;
    IMAGE_WIDTH_BIG = 120;

    // an array of groups of card images and hpbar
    cardImageGroups = [];
    
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
        newEvent.innerHTML = "<a>" + data + "</a>";
        newEvent.setAttribute("tabindex", index + "");
        newEvent.setAttribute("id", index + "");
        
        // populate right section with the field situation
        newEvent.onfocus = function () {
            BattleLogger.getInstance().displayEventLogAtIndex(this.id);
        };
        turnEventList.appendChild(newEvent);    
    }
    
    /**
     * Use this to log a major event: a normal attack, a proc, etc. Can also be
     * thought of as logging the main action in a fam's turn. The data to log here
     * is just a string, there's no actual data change associated with a major event
     */
    addMajorEvent (data : string) {

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
    applyMinorEvent(event, toApply) {
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
    displayEventLogAtIndex(index) { // <- the index of the event in the major event log

        // display turn animation
        this.displayTurnAnimation(index);

        // first deserialize the initial field info into a nice object that we will modify later
        var initialField = JSON.parse(this.initialFieldInfo);
        
        // apply events to initial field up to the specified event
        for (var i = 0; i <=  index; i++) {
            // need to make sure eventLog[i] exists, in case this is an empty event (like the "Battle start" event);
            for (var j = 0; this.minorEventLog[i] && j < this.minorEventLog[i].length; j++) {
                this.applyMinorEvent(this.minorEventLog[i][j], initialField);
            }
        }
        
        // now prepares the info and print them out
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
                };
                
                // grab all minor events under the latest major event
                // need to make sure eventLog[index] exists
                for (var j = 0; this.minorEventLog[index] && j < this.minorEventLog[index].length; j++) {
                    var tempEvent = this.minorEventLog[index][j]; // a minor event
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
                
                if (this.minorEventLog[index] && this.minorEventLog[index][0].executor == playerCards[fam].id) {
                    infoText.name = "<b>" + infoText.name + "</b>";
                }

                htmlelem.innerHTML = infoText.name + "<br>" +
                                    infoText.hp  + "<br>" +
                                    infoText.atk + "<br>" +
                                    infoText.def + "<br>" +
                                    infoText.wis + "<br>" +
                                    infoText.agi + "<br>" +
                                    infoText.physicalResist + ", " +
                                    infoText.magicalResist + ", " +
                                    infoText.breathResist + " ";
                
                // display hp on canvas
                this.displayHPOnCanvas (stats.hp / originalStats.hp * 100, player, fam);

                // display dead or alive familiar
                this.displayDeadAliveFamiliar(player, fam, stats.hp <= 0);
            }
        }
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
     * Add a minor event to our minor event log. A minor event must have:
     *  - an executor/attacker/caster: whom the action in this event comes from
     *  - a target/defender: the one affected in this event
     *  - attribute: the thing belonging to the target that has been changed in this event
     *  - amount: the amount changed
     *  - description: a description in plain text of what happened
     */
    addMinorEvent(executor: Card, target : Card, attribute : string, amount : number, description : string) {

        if (BattleModel.IS_MASS_SIMULATION) {
            return;
        }

        var index = this.majorEventLog.length - 1;
        
        if (!this.minorEventLog[index]) {
            this.minorEventLog[index] = [];
        }
        this.minorEventLog[index].push({
            executor : executor.id,   // the card id of the executor
            target : target.id,       // the card id of the target
            attribute : attribute,    // can be "HP" or a ENUM.StatusType "key" (a string)
            amount : amount,          // the amount changed
            description : description // description of the event in plain text
        });
        this.displayMinorEvent(description);
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
            player1Cards: BattleModel.getInstance().player1Cards,
            player2Cards: BattleModel.getInstance().player2Cards
        };
        
        this.initialFieldInfo = JSON.stringify(toSerialize);
    }
    
    /**
     * Display the two players' formations and their familiars on their canvas
     */
    displayFormationAndFamOnCanvas() {

        if (BattleModel.IS_MASS_SIMULATION) {
            return;
        }

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

        for (var player = 1; player <= 2; player++) { // for each player
            // todo: set the svg size dynamically
            var draw = SVG('svg' + player).size(600, 300).attr('id', 'player' + player + 'svg').attr('class', 'svg');
            var rect = draw.rect(600, 300).attr({ 'stroke-width': 1, 'stroke': '#000000', 'fill': '#FFFFFF'});
            
            // as I'm writing this comment, I don't know myself what these number are. Just know that change them
            // will change the "compactity" of the formation. Forgive me...
            var PLAYER_GROUP_WIDTH = 500;
            var PLAYER_GROUP_HEIGHT = 80;

            var horizontalStep = PLAYER_GROUP_WIDTH / 10;
            var verticalStep   = PLAYER_GROUP_HEIGHT / 2;
            
            var coordArray = [];
            this.coordArray[player] = coordArray;    

            // a svg group for everything belonging to that player: fam image, hp, formation, etc.
            var groupPlayer = draw.group()
                                  .attr('id', 'p' + player + 'group');
            
            // calculate the bullets coord
            for (var i = 0; i < 5; i++) {
                var bulletX = ((i + 1) * 2 - 1) * horizontalStep;
                var bulletY = (playerFormations[player][i] - 1) * verticalStep;
                
                coordArray.push([bulletX, bulletY]);
            }
            
            // now draw lines and bullets
            for (var i = 0; i < 5; i++) {
                var diameter = 10;
                var dot = draw.circle(diameter)
                              .move(coordArray[i][0] - diameter / 2, coordArray[i][1] - diameter / 2);
                groupPlayer.add(dot);
            }

            for (var i = 0; i < 4; i++) {
                var line = draw.line(coordArray[i][0], coordArray[i][1], coordArray[i + 1][0], coordArray[i + 1][1])
                               .stroke({ width: 1 });
                groupPlayer.add(line);
            }
            
            // grab the image links of the curent player's fam
            var imageLinksArray = [];
            var initialField = JSON.parse(this.initialFieldInfo);
            var playerCards = initialField["player" + player + "Cards"]; // get the cards of this player
            
            for (var fam = 0; fam < 5; fam++) { // for each card
                imageLinksArray.push(getScaledWikiaImageLink(playerCards[fam].imageLink, this.IMAGE_WIDTH_BIG));
            }
            
            // display fam images
            for (var i = 0; i < 5; i++) {
                // the x coordinate is 1/2 image width to the left of the bullet
                var image_x_coord = coordArray[i][0] - BattleLogger.IMAGE_WIDTH / 2;

                // the y coordinate is 1/2 image height above the bullet
                var image_y_coord = coordArray[i][1] - BattleLogger.IMAGE_WIDTH * 1.5 / 2;

                var image = draw.image(imageLinksArray[i])
                    .move(image_x_coord, image_y_coord)
                    .attr('id', 'player' + player + 'fam' + i + 'image')
                    .loaded(function (loader) {
                        this.size(BattleLogger.IMAGE_WIDTH);
                    });

                // make a svg group for the image + hp bar
                var group = draw.group();
                group.add(image).attr('id', 'player' + player + 'fam' + i + 'group');
                this.cardImageGroups.push(group);
                groupPlayer.add(group);
            }            
            groupPlayer.move(50, 100);
        }
    }

    displayHPOnCanvas(percent, player, index) {

        var draw = SVG.get('player' + player + 'svg');

        // the x coordinate is 1/2 image width to the left of the bullet
        var image_x_coord = this.coordArray[player][index][0] - BattleLogger.IMAGE_WIDTH / 2;

        // the y coordinate is 1/2 image height above the bullet
        var image_y_coord = this.coordArray[player][index][1] - BattleLogger.IMAGE_WIDTH * 1.5 / 2;

        var xstart = Math.round(image_x_coord);

        // display hp on bottom of the fam
        var ystart: number = image_y_coord + BattleLogger.IMAGE_WIDTH * 1.5;

        var width = BattleLogger.IMAGE_WIDTH; // width of the health bar
        var height = 5; // height of the health bar

        if (percent < 0) {
            percent = 0; // health can't be less than 0
        }

        // first draw the (empty) hp bar
        // try to get the bar if it exist, or create if not
        var hpbarId = 'player' + player + 'fam' + index + 'hp';
        var hpbar = SVG.get(hpbarId);
        
        if (!hpbar) {
            hpbar = draw.rect(width, height)
                .style({ 'stroke-width': 1, 'stroke': '#000000'})
                .attr('id', hpbarId)
                .move(xstart, ystart);
            var groupId = 'player' + player + 'fam' + index + 'group';

            // add the hpbar to the group
            var group = SVG.get(groupId);
            group.add(hpbar);
        }

        // now we deal with the background gradient used for displaying the HP
        var hpGradientId = 'player' + player + 'fam' + index + 'hpGradient';
        var hpGradient : any = SVG.get(hpGradientId);

        if (!hpGradient) {
            // draw for full HP
            hpGradient = draw.gradient('linear', function (stop) {
                stop.at({ offset: '100%', color: '#00ff00' }).attr('id', 'p' + player + 'f' + index + 'hpgs1') //<- hp gradient stop
                stop.at({ offset: '100%', color: 'transparent' }).attr('id', 'p' + player + 'f' + index + 'hpgs2')
            }).attr('id', hpGradientId);
        }
        else {
            var s1 = SVG.get('p' + player + 'f' + index + 'hpgs1');
            var s2 = SVG.get('p' + player + 'f' + index + 'hpgs2');
            s1.animate('1s').update({ offset: percent + '%' });
            s2.animate('1s').update({ offset: percent + '%' });
        }

        hpbar.fill(hpGradient);
    }
    
    displayDeadAliveFamiliar(player, fam, isDead) {
        var image : any = SVG.get('player' + player + 'fam' + fam + 'image');
        var filter = SVG.get('darkenFilter');
        if (isDead) {
            if (!filter) {
                // If the filter does not exist yet, create it
                // I don't know how to create a standalone filter for reuse
                // later, so I have to use this roundabout way. First set
                // the filter to the image:
                image.filter(function (add) {
                    add.componentTransfer({
                        rgb: { type: 'linear', slope: 0.05 }
                    })
                });

                // now grab the filter from the image, and give it the id
                filter = image.filterer;
                filter.attr('id', 'darkenFilter');

                // have to reapply the filter to the image since the image
                // does not change its filter id automatically
                image.filter(filter);
            }
            else {
                // if the filter is already created, we just use it
                image.filter(filter);
            }
        }
        else {
            // if the fam is not dead, remove any existing filter from it
            image.unfilter();
        }
    }

    displayTurnAnimation(index: number) {

        // need to make sure eventLog[index] exists, in case this is an empty event (like the "Battle start" event);
        for (var j = 0; this.minorEventLog[index] && j < this.minorEventLog[index].length; j++) {
            var data: MinorEvent = this.minorEventLog[index][j];
            var executor = BattleModel.getInstance().getCardById(data.executor);
            var group: any = this.getCardImageGroupOnCanvas(executor);

            // scale from center
            var scaleFactor = 1.3;
            var cx = group.cx();
            var cy = group.cy();

            group.animate({ duration: '1s' })
                .transform({
                    a: scaleFactor,
                    b: 0,
                    c: 0,
                    d: scaleFactor,
                    e: cx - scaleFactor * cx,
                    f: cy - scaleFactor * cy
                })
                .after(function () {
                    this.animate({ duration: '1s', delay: '0.5s' })
                        .transform({
                            a: 1,
                            b: 0,
                            c: 0,
                            d: 1,
                            e: cx - 1 * cx,
                            f: cy - 1 * cy
                        });
                });
        }
    }

    /**
     * Given a card, return the image of that card on the canvas
     */
    getCardImageOnCanvas(card: Card) {
        return SVG.get('player' + card.getPlayerId() + 'fam' + card.formationColumn + 'image');
    }

    /**
     * Given a card, return the image group of that card on the canvas
     */
    getCardImageGroupOnCanvas(card: Card) {
        return SVG.get('player' + card.getPlayerId() + 'fam' + card.formationColumn + 'group');
    }
    
    /**
     * Log the situation at the start of battle and display the initial info
     */
    startBattleLog() {

        if (BattleModel.IS_MASS_SIMULATION) {
            return;
        }

        this.addMajorEvent("Battle start");
        this.displayMinorEvent("Everything ready");
        this.displayEventLogAtIndex(0);
    }
}

interface MinorEvent {
    executor: number;    // the card id of the executor
    target: number;      // the card id of the target
    attribute: string;   // can be "HP" or a ENUM.StatusType "key" (a string)
    amount: number;      // the amount changed
    description: string; // description of the event in plain text
}
