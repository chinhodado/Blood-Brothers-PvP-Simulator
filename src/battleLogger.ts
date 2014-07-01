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

    // holds the coordinates of the bullets of the formation
    coordArray: any = {
        1: [], 
        2: []
    };

    static IMAGE_WIDTH = 70;
    IMAGE_WIDTH_BIG = 120;

    static playMode = 'no_auto';

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
                    card.affliction = { type: "Blind", duration: event.affliction.duration };
                    break;
                case ENUM.AfflictionType.DISABLE:
                    card.affliction = { type: "Disable", duration: event.affliction.duration };
                    break;
                case ENUM.AfflictionType.FROZEN:
                    card.affliction = { type: "Frozen", duration: event.affliction.duration };
                    break;
                case ENUM.AfflictionType.PARALYSIS:
                    card.affliction = { type: "Paralyzed", duration: event.affliction.duration };
                    break;
                case ENUM.AfflictionType.POISON:
                    card.affliction = { type: "Poison", percent: event.affliction.percent };
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
     * --- This function is a clusterfuck. I apologize if you are reading this, especially to myself in the future. ---
     * 
     * This is called when you click on an event in the event list. It updates the field on the right side
     * of the screen with information after the event that you clicked on has been processed. That event
     * is represented by the index argument supplied into this function.
     */
    displayEventLogAtIndex(index) { // <- the index of the event in the major event log

        // display turn animation
        this.displayTurnAnimation(index);

        // for displaying last turn's HP
        var lastEventIndex = index == 0? 0 : index - 1;
        var lastEventField = this.getFieldAtMajorIndex(lastEventIndex);
         
        var field = this.getFieldAtMajorIndex(index);
        
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
                    if (afflict.type != "Poison") {
                        infoText.affliction += (" (" + afflict.duration + " turn)");
                    }
                    else {
                        infoText.affliction += (" (" + afflict.percent + " %)");
                    }
                }
                
                // grab all minor events under the latest major event
                // need to make sure eventLog[index] exists
                for (var j = 0; this.minorEventLog[index] && j < this.minorEventLog[index].length; j++) {
                    var tempEvent = this.minorEventLog[index][j]; // a minor event
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
                
                if (this.minorEventLog[index] && this.minorEventLog[index][0].executorId == playerCards[fam].id) {
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
                this.displayHPOnCanvas (lastEventCard.stats.hp / lastEventCard.originalStats.hp * 100, player, fam, 0);
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

        var draw = SVG('svg').size(400, 600).attr('id', 'mainSvg').attr('class', 'svg');

        for (var player = 1; player <= 2; player++) { // for each player
            
            // draw the skill name background, don't show them yet
            if (player == 2) {
                var skillImg = draw.image('img/skillBg.png', 300, 29).move(55, 5).attr('id', 'p2SkillBg');
                var text = draw.text('placeholder').font({ size: 14 }).fill({ color: '#fff' })
                               .attr('id', 'p2SkillText');
                draw.group().attr('id', 'p2SkillBgTextGroup').add(skillImg).add(text).opacity(0);
            }
            else if (player == 1) {
                var skillImg = draw.image('img/skillBg.png', 300, 29).move(55, 270).attr('id', 'p1SkillBg');
                var text = draw.text('placeholder').font({ size: 14 }).fill({ color: '#fff' })
                               .attr('id', 'p1SkillText');
                draw.group().attr('id', 'p1SkillBgTextGroup').add(skillImg).add(text).opacity(0).move(0, 300);
            }
            
            // as I'm writing this comment, I don't know myself what these number are. Just know that change them
            // will change the "compactity" of the formation. Forgive me...
            var PLAYER_GROUP_WIDTH = 350;
            var PLAYER_GROUP_HEIGHT = 80;

            var horizontalStep = PLAYER_GROUP_WIDTH / 10;
            var verticalStep   = PLAYER_GROUP_HEIGHT / 2;
            
            var coordArray = [];
            this.coordArray[player] = coordArray;    

            // a svg group for everything belonging to that player: fam image, hp, formation, etc.
            var groupPlayer = draw.group()
                                  .attr('id', 'p' + player + 'group');
            if (player == 1) {
                groupPlayer.move(30, 400);    
            }
            else if (player == 2) {
                groupPlayer.move(30, 100);    
            }
            
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
            
            // display fam images and other effects
            for (var i = 0; i < 5; i++) {
                // the x coordinate is 1/2 image width to the left of the bullet
                var image_x_coord = coordArray[i][0] - BattleLogger.IMAGE_WIDTH / 2;

                // the y coordinate is 1/2 image height above the bullet
                var image_y_coord = coordArray[i][1] - BattleLogger.IMAGE_WIDTH * 1.5 / 2;

                var image = draw.image(imageLinksArray[i])
                    .move(image_x_coord, image_y_coord)
                    .attr('id', 'p' + player + 'f' + i + 'image')
                    .loaded(function (loader) {
                        this.size(BattleLogger.IMAGE_WIDTH);
                    });

                var explosion = draw.image('img/explosion.png', 70, 70)
                                    .move(image_x_coord, image_y_coord)
                                    .attr('id', 'p' + player + 'f' + i + 'explosion')
                                    .opacity(0)

                var spellCircle = draw.image('img/circle_blue.png', 150, 150)
                                    .center(coordArray[i][0], coordArray[i][1])
                                    .attr('id', 'p' + player + 'f' + i + 'spellCircle')
                                    .opacity(0)

                var procSpark = draw.image('img/lineSpark.png', 150, 150)
                                    .center(coordArray[i][0], coordArray[i][1])
                                    .attr('id', 'p' + player + 'f' + i + 'lineSpark')
                                    .opacity(0)

                // make a svg group for the image + hp bar + explosion + proc spark + spell circle
                var group = draw.group();                
                group.add(image).attr('id', 'p' + player + 'f' + i + 'group');
                group.add(explosion);
                group.add(spellCircle);
                group.add(procSpark);

                this.cardImageGroups.push(group);
                groupPlayer.add(group);
            }
        }
    }

    displayHPOnCanvas(percent: number, player: number, index: number, animDuration?: number) {

        var draw = SVG.get('mainSvg');

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
        var hpbarId = 'p' + player + 'f' + index + 'hp';
        var hpbar = SVG.get(hpbarId);
        
        if (!hpbar) {
            hpbar = draw.rect(width, height)
                .style({ 'stroke-width': 1, 'stroke': '#000000'})
                .attr('id', hpbarId)
                .move(xstart, ystart);
            var groupId = 'p' + player + 'f' + index + 'group';

            // add the hpbar to the group
            var group = SVG.get(groupId);
            group.add(hpbar);
        }

        // now we deal with the background gradient used for displaying the HP
        var hpGradientId = 'p' + player + 'f' + index + 'hpGradient';
        var hpGradient : any = SVG.get(hpGradientId);
        
        var duration = 1;
        if (!isNaN(animDuration)) {
            duration = animDuration;
        }

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
            s1.animate(duration + 's').update({ offset: percent + '%' });
            s2.animate(duration + 's').update({ offset: percent + '%' });
        }

        hpbar.fill(hpGradient);

        // display dead or alive familiar
        this.displayDeadAliveFamiliar(player, index, percent <= 0);
    }
    
    displayDeadAliveFamiliar(player, fam, isDead) {
        var image : any = SVG.get('p' + player + 'f' + fam + 'image');
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

    // index: a major event index
    displayTurnAnimation(majorIndex: number) {

        if (majorIndex >= this.majorEventLog.length) {
            return;    
        }

        if (!this.majorEventLog[majorIndex]) {
            if (BattleLogger.playMode == 'auto') {
                var nextIndex = +majorIndex + 1;
                this.displayTurnAnimation(nextIndex);
            }
            return; //description event like battle start, etc
        }

        var executorId = this.majorEventLog[majorIndex].executorId;
        if (!executorId) {
            if (BattleLogger.playMode == 'auto') {
                var nextIndex = +majorIndex + 1;
                this.displayTurnAnimation(nextIndex);
            }
            return; //description event like battle start, etc
        }
            
        if (SkillDatabase[this.majorEventLog[majorIndex].skillId].isAutoAttack) {
            // don't enlarge the fam, etc.
            this.displayAttackAnimation(majorIndex, 0);
        }
        else {
            var callback = null;
            if (Skill.isAttackSkill(this.majorEventLog[majorIndex].skillId)) {
                callback = function() {
                    BattleLogger.getInstance().displayAttackAnimation(majorIndex, 0);
                }
            }
            else if (BattleLogger.playMode == 'auto') {
                callback = function() {
                    BattleLogger.getInstance().displayTurnAnimation(++majorIndex);
                }
            }
            this.displayProcSkill(executorId, this.majorEventLog[majorIndex].skillId, callback);
        }
    }

    // enlarge the fam, display the skill name, display spell circle
    // durationRatio: e.g. 0.5 means half the animation duration
    displayProcSkill(executorId: number, skillId: number, callback?, durationRatio?: number) {
        var executor = CardManager.getInstance().getCardById(executorId);
        var group: any = this.getCardImageGroupOnCanvas(executor);

        // enlarge the executor, then shrink it
        // scale from center
        var scaleFactor = 1.3;
        var cx = group.cx();
        var cy = group.cy();

        var D1 = 1, D05 = 0.5;
        if (durationRatio) {
            D1 *= durationRatio;
            D05 *= durationRatio;
        }

        if (Skill.isMagicSkill(skillId)) {
            var procEffect = SVG.get('p' + executor.getPlayerId() + 'f' + executor.formationColumn + 'spellCircle');
        }
        else {
            var procEffect = SVG.get('p' + executor.getPlayerId() + 'f' + executor.formationColumn + 'lineSpark');
        }
        
        procEffect.opacity(1);
        procEffect.animate({duration: '3s'})
                   .rotate(180)
                   .after(function(){
                        this.rotate(0);//reset the rotation
                   });

        group.animate({ duration: D1 + 's' })
            .transform({
                a: scaleFactor,
                b: 0,
                c: 0,
                d: scaleFactor,
                e: cx - scaleFactor * cx,
                f: cy - scaleFactor * cy
            })
            .after(function () {
                this.animate({ duration: D1 + 's', delay: D05 + 's' })
                    .transform({
                        a: 1,
                        b: 0,
                        c: 0,
                        d: 1,
                        e: cx - 1 * cx,
                        f: cy - 1 * cy
                    })
                    .after(function(){
                        procEffect.opacity(0);
                        if (callback) callback();
                    });
            });

            // display skill name
            var groupSkillBg = SVG.get('p' + executor.getPlayerId() + 'SkillBgTextGroup');
            var svgText      = SVG.get('p' + executor.getPlayerId() + 'SkillText');

            // the y-coordinate of the text, depending on whether this is player 1 or 2
            var yText = executor.getPlayerId() == 1 ? 272 : 8;

            var skillName: string = SkillDatabase[skillId].name;
                
            // center the text inside the background
            svgText.text(skillName).move(55 + 150 - svgText.bbox().width / 2, yText);

            groupSkillBg.animate({ duration: '0.5s' }).opacity(1)
                        .after(function () {
                            this.animate({ duration: '0.5s', delay: '1.5s' })
                                .opacity(0)
                        });
    }

    // a recursive function. I hate callback.
    // noAttackAnim: don't display attack anim anymore (for AoE)
    displayAttackAnimation(majorIndex: number, minorIndex: number, noAttackAnim?: boolean) {

        // need to make sure minorEventLog[index] exists, in case this is an empty event (like the "Battle start" event);
        if (BattleLogger.playMode == 'auto') {
            if (!this.minorEventLog[majorIndex] || minorIndex >= this.minorEventLog[majorIndex].length) {
                var nextIndex = +majorIndex + 1;
                this.displayTurnAnimation(nextIndex);
                return;
            }
            else if (majorIndex >= this.majorEventLog.length) {
                return;    
            }
        }
        else {
            if (!this.minorEventLog[majorIndex] || minorIndex >= this.minorEventLog[majorIndex].length) {
                return;    
            }
        }

        var data: MinorEvent = this.minorEventLog[majorIndex][minorIndex];
            
        if (data.type == ENUM.MinorEventType.AFFLICTION || !data.executorId) {
            if (minorIndex < this.minorEventLog[majorIndex].length) {
                this.displayAttackAnimation(majorIndex, minorIndex + 1, noAttackAnim);
                return;
            }
            else return; // for now
        }

        // a protect/defense, show it
        if (data.type == ENUM.MinorEventType.DESCRIPTION) {
            if (minorIndex < this.minorEventLog[majorIndex].length) {
                this.displayProcSkill(data.executorId, data.skillId, function() {
                    BattleLogger.getInstance().displayAttackAnimation(majorIndex, minorIndex + 1, noAttackAnim);
                }, 0.5);
                
                return;
            }
            else return;
        }

        // going and attack physically
        var executor = CardManager.getInstance().getCardById(data.executorId);
        var executorGroup: any = this.getCardImageGroupOnCanvas(executor);

        var target = CardManager.getInstance().getCardById(data.targetId);
        var targetGroup: any = this.getCardImageGroupOnCanvas(target);

        var x = targetGroup.rbox().x;
        var y = targetGroup.rbox().y;

        var x1 = executorGroup.rbox().x;
        var y1 = executorGroup.rbox().y;

        // move the executor's group to the front
        SVG.get('p' + executor.getPlayerId() + 'group').front();

        var field = this.getFieldAtMinorIndex(majorIndex, minorIndex);
        var targetInfo = field["player" + target.getPlayerId() + "Cards"][target.formationColumn];
        var stats = targetInfo.stats;
        var originalStats = targetInfo.originalStats;

        var explosion = SVG.get('p' + target.getPlayerId() + 'f' + target.formationColumn + 'explosion');

        if (Skill.isAoeSkill(data.skillId)) {
            var draw = SVG.get('mainSvg');
            var exploSet = draw.set();

            // add targets to the set
            var aoeTargets = this.getTargetsInMajorEvent(majorIndex);
            for (var i = 0; i < aoeTargets.length; i++) {
                var exploTargetCol = CardManager.getInstance().getCardById(aoeTargets[i]).formationColumn;
                exploSet.add(SVG.get('p' + target.getPlayerId() + 'f' + exploTargetCol + 'explosion'));
            }

            if (noAttackAnim) {
                // display hp change
                BattleLogger.getInstance()
                    .displayHPOnCanvas (stats.hp / originalStats.hp * 100, target.getPlayerId(), target.formationColumn);
                BattleLogger.getInstance().displayAttackAnimation(majorIndex, minorIndex + 1, true);
            }
            else {
                var spellCircle = SVG.get('p' + executor.getPlayerId() + 'f' + executor.formationColumn + 'spellCircle');
                if (Skill.isWisAutoAttack(data.skillId)) {
                    spellCircle.opacity(1);
                }
                exploSet.animate({ duration: '0.4s' })
                         .opacity(1)
                         .after(function() {
                            exploSet.opacity(0);
                            spellCircle.opacity(0);
                            // display hp change
                            BattleLogger.getInstance()
                                .displayHPOnCanvas (stats.hp / originalStats.hp * 100, target.getPlayerId(), target.formationColumn);
                            BattleLogger.getInstance().displayAttackAnimation(majorIndex, minorIndex + 1, true);
                         });
            }
        }
        else if (Skill.isIndirectSkill(data.skillId)) { // indirect but not AoE, like multi-hitting
            explosion.animate({ duration: '0.2s' })
                     .opacity(1)
                     .after(function() {
                        explosion.opacity(0);
                        // display hp change
                        BattleLogger.getInstance()
                            .displayHPOnCanvas (stats.hp / originalStats.hp * 100, target.getPlayerId(), target.formationColumn);
                        BattleLogger.getInstance().displayAttackAnimation(majorIndex, minorIndex + 1, noAttackAnim);
                     });
        }
        else {
            // attack with contact, move the executor forward and back
            executorGroup.animate({ duration: '0.5s' })
                .move(x - x1, y - y1)
                .after(function () {
                    explosion.opacity(1);
                    // display hp change
                    BattleLogger.getInstance()
                        .displayHPOnCanvas (stats.hp / originalStats.hp * 100, target.getPlayerId(), target.formationColumn);

                    this.animate({ duration: '0.5s'})
                        .move(0, 0)
                        .after(function () {
                            explosion.opacity(0);
                            BattleLogger.getInstance().displayAttackAnimation(majorIndex, minorIndex + 1, noAttackAnim);
                        });
                });
        }
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
     * Given a card, return the image of that card on the canvas
     */
    getCardImageOnCanvas(card: Card) {
        return SVG.get('p' + card.getPlayerId() + 'f' + card.formationColumn + 'image');
    }

    /**
     * Given a card, return the image group of that card on the canvas
     */
    getCardImageGroupOnCanvas(card: Card) {
        return SVG.get('p' + card.getPlayerId() + 'f' + card.formationColumn + 'group');
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
    type?: ENUM.MinorEventType;        // HP, STATUS or AFFLICTION or DESCRIPTION
    affliction?: {
        type: ENUM.AfflictionType;
        percent?: number;
        isFinished?: boolean;
        duration?: number;
    };
    status?: {
        type: ENUM.StatusType;
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
