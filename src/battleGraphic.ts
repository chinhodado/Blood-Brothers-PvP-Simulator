declare var showCardDetailDialog;
declare var onBattleFinished;

class BattleGraphic {

    // holds the coordinates of the bullets of the formation
    coordArray: any = {
        1: [], 
        2: []
    };

    // mainly for simulation vs random brigs
    static HIDE_PLAYER1 = false;
    static HIDE_PLAYER2 = false;
    static GRAPHIC_DISABLED = false;

    static SHOW_FORMATION_LINE = false;
    static IMAGE_WIDTH = 70;
    static IMAGE_WIDTH_BIG = 120;
    static PLAY_MODE = 'MANUAL';
    static FONT = 'Alegreya Sans, Cooper Black';
    static AFFLICTION_TEXT_STROKE_WIDTH = '1px';

    private logger: BattleLogger;
    private battle: BattleModel;
    private cardMan: CardManager;

    private static _instance: BattleGraphic = null;

    constructor() {
        if (BattleGraphic._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        BattleGraphic._instance = this;

        this.logger = BattleLogger.getInstance();
        this.battle = BattleModel.getInstance();
        this.cardMan = CardManager.getInstance();
    }

    public static getInstance(): BattleGraphic {
        if (BattleGraphic._instance === null) {
            throw new Error ("You're not supposed to create this object this way");
        }
        return BattleGraphic._instance;
    }

    /**
     * Allows to create a new instance
     * Used for testing only
     */
    static removeInstance() {
        BattleGraphic._instance = null;
    }

    /**
     * Display the two players' formations and their familiars on their canvas
     */
    displayFormationAndFamOnCanvas() {

        if (BattleGraphic.GRAPHIC_DISABLED) {
            return;
        }

        var playerFormations = {};
        playerFormations[1] = this.battle.player1.formation.getFormationConfig(); // player1's formation
        
        // reverse player2's formation for display purpose
        var player2formation = this.battle.player2.formation.getFormationConfig();
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

        for (var player = 1; player <= 2; player++) {
            
            // draw the skill name background, don't show them yet
            if (player == 2) {
                var skillImg = draw.image('img/skillBg.png', 300, 29).move(55, 5).attr('id', 'p2SkillBg');
                var text = draw.text('placeholder').font({ size: 14 }).fill({ color: '#fff' })
                               .attr('id', 'p2SkillText');
                draw.group().attr('id', 'p2SkillBgTextGroup').add(skillImg).add(text).opacity(0);
            }
            else if (player == 1) {
                skillImg = draw.image('img/skillBg.png', 300, 29).move(55, 270).attr('id', 'p1SkillBg');
                text = draw.text('placeholder').font({ size: 14 }).fill({ color: '#fff' })
                               .attr('id', 'p1SkillText');
                draw.group().attr('id', 'p1SkillBgTextGroup').add(skillImg).add(text).opacity(0).move(0, 300);
            }
            
            // change these to change the "compactity" of the formation
            var PLAYER_GROUP_WIDTH = 350;
            var PLAYER_GROUP_HEIGHT = 80;

            var horizontalStep = PLAYER_GROUP_WIDTH / 10;
            var verticalStep   = PLAYER_GROUP_HEIGHT / 2;
            
            var coordArray = [];
            this.coordArray[player] = coordArray;    

            // a svg group for everything belonging to that player: fam image, hp, formation, etc.
            var groupPlayer = draw.group()
                                  .attr('id', 'p' + player + 'group');
            if ((BattleGraphic.HIDE_PLAYER1 && player == 1) || (BattleGraphic.HIDE_PLAYER2 && player == 2)) {
                groupPlayer.hide();
            }

            if (player == 1) {
                groupPlayer.move(30, 400);    
            }
            else if (player == 2) {
                groupPlayer.move(30, 100);    
            }
            
            // calculate the bullets coord
            for (i = 0; i < 5; i++) {
                var bulletX = ((i + 1) * 2 - 1) * horizontalStep;
                var bulletY = (playerFormations[player][i] - 1) * verticalStep;
                
                coordArray.push([bulletX, bulletY]);
            }
            
            // now draw lines and bullets
            if (BattleGraphic.SHOW_FORMATION_LINE) {
                for (i = 0; i < 5; i++) {
                    var diameter = 10;
                    var dot = draw.circle(diameter)
                                  .move(coordArray[i][0] - diameter / 2, coordArray[i][1] - diameter / 2);
                    groupPlayer.add(dot);
                }

                for (i = 0; i < 4; i++) {
                    var line = draw.line(coordArray[i][0], coordArray[i][1], coordArray[i + 1][0], coordArray[i + 1][1])
                                   .stroke({ width: 1 });
                    groupPlayer.add(line);
                }
            }
            
            // grab the image links of the curent player's fam
            var imageLinksArray = [];
            var playerCards = this.cardMan.getPlayerCurrentMainCards(this.battle.getPlayerById(player));
            var reserveCards = this.cardMan.getPlayerOriginalReserveCards(this.battle.getPlayerById(player));
            
            for (var fam = 0; fam < playerCards.length; fam++) {
                imageLinksArray.push(getScaledFamiliarWikiaImageLink(playerCards[fam].imageLink, playerCards[fam].fullName, BattleGraphic.IMAGE_WIDTH_BIG));
            }
            
            // display fam images and other effects
            for (i = 0; i < 5; i++) {
                // the x coordinate is 1/2 image width to the left of the bullet
                var image_x_coord = coordArray[i][0] - BattleGraphic.IMAGE_WIDTH / 2;

                // the y coordinate is 1/2 image height above the bullet
                var image_y_coord = coordArray[i][1] - BattleGraphic.IMAGE_WIDTH * 1.5 / 2;

                var image = draw.image(imageLinksArray[i])
                    .move(image_x_coord, image_y_coord)
                    .attr('id', 'p' + player + 'f' + i + 'image')
                    .loaded(function (loader) {
                        this.size(BattleGraphic.IMAGE_WIDTH);
                    });

                var damageText = draw.text('0').font({ size: 22, family: BattleGraphic.FONT })
                                     .attr({fill:'#fff', stroke: '#000', 'stroke-width': '2px'})
                                     .center(coordArray[i][0], coordArray[i][1])
                                     .attr('id', 'p' + player + 'f' + i + 'damageText')
                                     .opacity(0);

                var explosion = draw.image('img/explosion.png', 70, 70)
                                    .move(image_x_coord, image_y_coord)
                                    .attr('id', 'p' + player + 'f' + i + 'explosion')
                                    .opacity(0);
                
                // make a svg group for the image + hp bar + explosion + proc spark + spell circle
                var group = draw.group().attr('id', 'p' + player + 'f' + i + 'group');                
                group.add(image);
                group.add(damageText);
                group.add(explosion);

                var click = arg => {
                    var cardMan = CardManager.getInstance();
                    var card = cardMan.getCurrentMainCardByIndex(arg[0], arg[1]);
                    return () => {
                        showCardDetailDialog(cardMan.getCardInfoForDialog(card));
                    };
                };
                group.on('click', click([player, i]));

                groupPlayer.add(group);

                // preload the reserve image
                if (this.battle.isBloodClash) {
                    var reserve_img = new Image();
                    reserve_img.src = getScaledFamiliarWikiaImageLink(reserveCards[i].imageLink, reserveCards[i].fullName, BattleGraphic.IMAGE_WIDTH_BIG);
                }
            }            
        }
    }

    /**
     * Reset HP to full, make all fam alive, remove all affliction text, etc.
     */
    resetInitialField() {
        for (var player = 1; player <= 2; player++) {
            for (var index = 0; index < 5; index++) {
                this.displayHP(100, player, index, 0);
                this.getAfflictionText(player, index).hide();
            }
        }
        this.displayAllCardImages(0);
    }

    /**
     * Display all fam images at the beginning of a major index
     */
    displayAllCardImages(majorIndex: number) {
        var field = this.logger.getFieldAtMajorIndex(majorIndex);
        
        for (var p = 1; p <= 2; p++) {
            for (var f = 0; f < 5; f++) {
                var image: any = SVG.get('p' + p + 'f' + f + 'image');
                var card = field["player" + p + "Cards"][f];
                image.load(getScaledFamiliarWikiaImageLink(card.imageLink, card.fullName, BattleGraphic.IMAGE_WIDTH_BIG));
            }
        }
    }

    /**
     * Display the HP of a fam
     * animDuration: set to 0 if you don't want to display the HP change animation
     */
    displayHP(percent: number, player: number, index: number, animDuration?: number) {

        var draw = SVG.get('mainSvg');

        // the x coordinate is 1/2 image width to the left of the bullet
        var image_x_coord = this.coordArray[player][index][0] - BattleGraphic.IMAGE_WIDTH / 2;

        // the y coordinate is 1/2 image height above the bullet
        var image_y_coord = this.coordArray[player][index][1] - BattleGraphic.IMAGE_WIDTH * 1.5 / 2;

        var xstart = Math.round(image_x_coord);

        // display hp on bottom of the fam
        var ystart: number = image_y_coord + BattleGraphic.IMAGE_WIDTH * 1.5;

        var width = BattleGraphic.IMAGE_WIDTH; // width of the health bar
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
            hpGradient = draw.gradient('linear', stop => {
                stop.at({ offset: '100%', color: '#00ff00' }).attr('id', 'p' + player + 'f' + index + 'hpgs1'); //<- hp gradient stop
                stop.at({ offset: '100%', color: 'transparent' }).attr('id', 'p' + player + 'f' + index + 'hpgs2');
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
    
    /**
     * Display the damage text and HP of a fam
     */
    displayDamageTextAndHP(playerId: number, famIndex: number, majorIndex: number, minorIndex: number) {
        var field = this.logger.getFieldAtMinorIndex(majorIndex, minorIndex);
        var targetInfo = field["player" + playerId + "Cards"][famIndex];
        var stats = targetInfo.stats;
        var originalStats = targetInfo.originalStats;

        var center_x = this.coordArray[playerId][famIndex][0];
        var center_y = this.coordArray[playerId][famIndex][1];

        var data = this.logger.minorEventLog[majorIndex][minorIndex];

        if (data.missed) {
            var txt = "missed";
        }
        else if (data.evaded) {
            txt = "evaded";
        }
        else if (data.isKilled) {
            txt = "killed";
        }
        else {
            txt = Math.abs(data.amount) + "";
        }

        var txtColor = '#fff';
        if (data.amount > 0) {
            // green text for healing
            txtColor = '#00ff00';
        }

        var damageText = SVG.get('p' + playerId + 'f' + famIndex + 'damageText');
        damageText.text(txt).font({ size: 22}).attr({fill: txtColor})
                  .center(center_x, center_y).opacity(1).front();
        damageText.animate({duration: '2s'}).opacity(0);

        this.displayHP (stats.hp / originalStats.hp * 100, playerId, famIndex);
    }

    /**
     * Display the ward effect on a fam
     */
    displayWard(playerId: number, famIndex: number, majorIndex: number, minorIndex: number) {
        var data = this.logger.minorEventLog[majorIndex][minorIndex];

        if (data.missed) {
            return;
        }

        var type;
        switch (data.wardUsed) {
            case ENUM.WardType.PHYSICAL:
                type = ENUM.StatusType.ATTACK_RESISTANCE;
                break;
            case ENUM.WardType.MAGICAL:
                type = ENUM.StatusType.MAGIC_RESISTANCE;
                break;
            case ENUM.WardType.BREATH:
                type = ENUM.StatusType.BREATH_RESISTANCE;
                break;
            default:
                return; // no ward was used
        }

        var wardImg = this.getWard(playerId, famIndex, type);
        wardImg.opacity(1).animate({delay: '0.5s'}).opacity(0);
    }

    /**
     * Display the affliction text of a fam
     */
    displayAfflictionText(playerId: number, famIndex: number, majorIndex: number, minorIndex: number) {
        var data = this.logger.minorEventLog[majorIndex][minorIndex];       
        var svgAfflictTxt = this.getAfflictionText(playerId, famIndex);

        if (data.affliction.isFinished) {
            svgAfflictTxt.hide();
        }
        else {
            var text = Affliction.getAfflictionAdjective(data.affliction.type);
            svgAfflictTxt.text(text).show();
        }
    }

    /**
     * Display the affliction texts of all fams at a major index
     */
    displayAllAfflictionText(majorIndex: number) {
        var field = this.logger.getFieldAtMajorIndex(majorIndex);

        for (var player = 1; player <= 2; player++) {
            for (var fam = 0; fam < 5; fam++) {
                var svgAfflictTxt = this.getAfflictionText(player, fam);
                var data = field["player" + player + "Cards"][fam];

                if (!data.affliction) {
                    svgAfflictTxt.hide();
                }
                else {
                    var text = Affliction.getAfflictionAdjective(data.affliction.type);
                    svgAfflictTxt.text(text).show();
                }
            }
        }
    }

    /**
     * Display hp change, ward, hp text
     */
    displayPostDamage(playerId: number, famIndex: number, majorIndex: number, minorIndex: number) {
        this.displayWard(playerId, famIndex, majorIndex, minorIndex);
        this.displayDamageTextAndHP(playerId, famIndex, majorIndex, minorIndex);
    }

    /**
     * Display a familiar as dead (greyed) or alive
     */
    displayDeadAliveFamiliar(player: number, fam: number, isDead: boolean) {
        var image: any = SVG.get('p' + player + 'f' + fam + 'image');
        var filter = SVG.get('darkenFilter');
        if (isDead) {
            if (!filter) {
                // If the filter does not exist yet, create it
                // I don't know how to create a standalone filter for reuse
                // later, so I have to use this roundabout way. First set
                // the filter to the image:
                image.filter(add => {
                    add.componentTransfer({
                        rgb: { type: 'linear', slope: 0.05 }
                    });
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

    /**
     * Display the animation of a major event, including any minor events belong to it
     */
    displayMajorEventAnimation(majorIndex: number) {
        var majorLog = this.logger.majorEventLog;
        var that = this;

        if (majorIndex >= majorLog.length) {
            onBattleFinished();
            return;    
        }

        // TODO: check this
        if (!majorLog[majorIndex]) {
            if (BattleGraphic.PLAY_MODE == 'AUTO') {
                var nextIndex = +majorIndex + 1;
                this.displayMajorEventAnimation(nextIndex);
            }
            return; //description event like battle start, etc
        }

        if (BattleGraphic.PLAY_MODE == 'AUTO') {
            var autoCallback = function() {
                that.displayMajorEventAnimation(majorIndex + 1);
            };
        }
            
        if (majorLog[majorIndex].skillId && SkillDatabase[majorLog[majorIndex].skillId].isAutoAttack) {
            // don't enlarge the fam, etc.
            this.displayMinorEventAnimation(majorIndex, 0, {callback: autoCallback});
        }
        else {
            var callback = function() {
                that.displayMinorEventAnimation(majorIndex, 0, {callback: autoCallback});
            };

            this.displayProcSkill(majorLog[majorIndex].executorId, majorLog[majorIndex].skillId, {callback: callback});
        }
    }

    /**
     * Display the skill proc animation:
     * enlarge the fam, display the skill name, display spell circle/light flash
     * durationRatio: e.g. 0.5 means half the animation duration
     */   
    displayProcSkill(executorId: number, skillId: number, option: {callback?; 
                                                                    durationRatio?: number; 
                                                                    noProcEffect?: boolean}) 
    {

        if (!executorId || !skillId) {
            if (option.callback) {
                option.callback();
            }
            return;
        }

        var executor = this.cardMan.getCardById(executorId);
        var group: any = this.getCardImageGroup(executor);

        // display the proc effect: spell circle or light spark
        if (!option.noProcEffect) {
            // enlarge the executor, then shrink it
            // scale from center
            var scaleFactor = 1.3;
            var cx = group.cx();
            var cy = group.cy();

            var D1 = 1, D05 = 0.5;
            if (option.durationRatio) {
                D1  *= option.durationRatio;
                D05 *= option.durationRatio;
            }

            if (Skill.isMagicSkill(skillId)) {
                var procEffect = this.getProcEffect(executor.getPlayerId(), executor.formationColumn, 'spellCircle');
            }
            else {
                procEffect = this.getProcEffect(executor.getPlayerId(), executor.formationColumn, 'lineSpark');
            }

            SVG.get('p' + executor.getPlayerId() + 'f' + executor.formationColumn + 'group').front();
        
            procEffect.opacity(1);
            procEffect.animate({duration: '3s'})
                       .rotate(180)
                       .after(function() {
                            this.rotate(0); // reset the rotation
                            this.remove();
                       });

            group.animate({ duration: D1 + 's' })
                .transform({a: scaleFactor, b: 0, c: 0, d: scaleFactor, e: cx - scaleFactor * cx, f: cy - scaleFactor * cy})
                .after(function () {
                    this.animate({ duration: D1 + 's', delay: D05 + 's' })
                        .transform({a: 1, b: 0, c: 0, d: 1, e: cx - 1 * cx, f: cy - 1 * cy})
                        .after(() => {
                            procEffect.opacity(0).remove();
                            if (option.callback) option.callback();
                        });
                });
            }

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
                                .opacity(0);
                        });
    }

    /**
     * Display the animation for a minor event
     * This is a recursive function. It will pass itself as a callback to play the next minor event.
     * This should only be called once on a major index because of that
     * 
     * noAttackAnim: don't display attack anim anymore (for AoE)
     * noNestedAttackAnim: same, for nested AoE
     */
    displayMinorEventAnimation(majorIndex: number, minorIndex: number, option: {noAttackAnim?: boolean; noNestedAttackAnim?: boolean; callback?} = {}) {
        var minorLog = this.logger.minorEventLog;

        // need to make sure minorEventLog[index] exists, in case this is an empty event (like the "Battle start" event);
        if (!minorLog[majorIndex] || minorIndex >= minorLog[majorIndex].length) {
            if (option.callback) {
                option.callback();
            }
            return;
        }

        var data: MinorEvent = minorLog[majorIndex][minorIndex];

        switch (data.type) {
            case ENUM.MinorEventType.TEXT:
                if (minorIndex < minorLog[majorIndex].length) {
                    this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
                }
                break;
            case ENUM.MinorEventType.HP:
                if (!data.executorId) {
                    this.displayHpChangeEvent(majorIndex, minorIndex, option);
                } 
                else {
                    // going and attack physically
                    this.displayBattleEvent(majorIndex, minorIndex, option);
                }
                break;
            case ENUM.MinorEventType.STATUS:
                this.displayStatusEvent(majorIndex, minorIndex, option);
                break;
            case ENUM.MinorEventType.BC_ADDPROB:
                this.displayBcAddProbEvent(majorIndex, minorIndex, option);
                break;
            case ENUM.MinorEventType.AFFLICTION:
                this.displayAfflictionEvent(majorIndex, minorIndex, option);
                break;
            case ENUM.MinorEventType.RESERVE_SWITCH:
                this.displayReserveSwitchEvent(majorIndex, minorIndex, option);
                break;
            case ENUM.MinorEventType.DESCRIPTION: // a description of a skill proc
                this.displayDescriptionEvent(majorIndex, minorIndex, option);
                break;
            case ENUM.MinorEventType.REVIVE:
                this.displayReviveEvent(majorIndex, minorIndex, option);
                break;
            case ENUM.MinorEventType.PROTECT: // a protect/defense, show it
                this.displayProtectEvent(majorIndex, minorIndex, option);
                break;
            case ENUM.MinorEventType.BATTLE_DESCRIPTION:
                this.displayBattleDescriptionEvent(majorIndex, minorIndex, option);
                break;
            default:
                throw new Error("Invalid minor event type!");
        }
    }

    displayBattleDescriptionEvent(majorIndex: number, minorIndex: number, option) {
        var minorLog = this.logger.minorEventLog;
        var data: MinorEvent = minorLog[majorIndex][minorIndex];
        if (minorIndex < minorLog[majorIndex].length) {
            this.getMainBattleEffect().text(data.battleDesc).center(200, 300)
                .opacity(1).animate({duration: '3s'}).opacity(0);
            this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
        }
    }

    displayStatusEvent(majorIndex: number, minorIndex: number, option) {
        var minorLog = this.logger.minorEventLog;
        var data: MinorEvent = minorLog[majorIndex][minorIndex];
        if (minorIndex < minorLog[majorIndex].length) {
            var target = this.cardMan.getCardById(data.targetId);

            var center_x = this.coordArray[target.getPlayerId()][target.formationColumn][0];
            var center_y = this.coordArray[target.getPlayerId()][target.formationColumn][1];

            if (data.status.type == ENUM.StatusType.ATTACK_RESISTANCE ||
                data.status.type == ENUM.StatusType.MAGIC_RESISTANCE ||
                data.status.type == ENUM.StatusType.BREATH_RESISTANCE) 
            {
                var ward = this.getWard(target.getPlayerId(), target.formationColumn, data.status.type); 
                ward.opacity(1).animate({delay: '0.5s'}).opacity(0);
            }
            else {
                // display status text

                var fontSize = 18;

                if (data.status.isDispelled) {
                    var displayText = "dispelled";
                }
                else if (data.status.isClearDebuff) {
                    displayText = "cleared";
                }
                else if (data.status.isAllUp) {
                    displayText = "All Stats Up";
                    fontSize = 15;
                }
                else if (data.status.type == ENUM.StatusType.WILL_ATTACK_AGAIN) {
                    displayText = "EXTRA ACT";
                }
                else if (data.status.type == ENUM.StatusType.ACTION_ON_DEATH) {
                    displayText = "Revive On"; // for now
                }
                else if (data.status.type == ENUM.StatusType.SKILL_PROBABILITY) {
                    displayText = "Prob. Up";
                }
                else if (data.status.type == ENUM.StatusType.HP_SHIELD) {
                    displayText = "HP Up";
                }
                else {
                    // for stats buff, this does not really use the log
                    var upDownText = data.amount < 0? " Down" : " Up";
                    var statuses = Skill.getStatusModified(data.skillId);
                    displayText = ENUM.StatusType[statuses[0]] + upDownText;

                    // hacky
                    if (statuses[1]) {
                        var displayText2 = ENUM.StatusType[statuses[1]] + upDownText;
                        displayText = displayText + "\n" + displayText2;
                    }
                }
                    
                var damageText = SVG.get('p' + target.getPlayerId() + 'f' + target.formationColumn + 'damageText');
                damageText.text(displayText).center(center_x, center_y).font({ size: fontSize})
                    .opacity(1).animate({delay: '0.5s'}).opacity(0);
            }

            this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
        }
    }

    displayReviveEvent(majorIndex: number, minorIndex: number, option) {
        var minorLog = this.logger.minorEventLog;
        var data: MinorEvent = minorLog[majorIndex][minorIndex];

        var executor = this.cardMan.getCardById(data.executorId);
        var executorGroup: any = this.getCardImageGroup(executor);
        // move the executor's group to the front
        executorGroup.front();
        SVG.get('p' + executor.getPlayerId() + 'group').front();

        if (minorIndex < minorLog[majorIndex].length) {
            var target = this.cardMan.getCardById(data.targetId);
            var playerId = target.getPlayerId();
            var index = target.formationColumn;
            var center_x = this.coordArray[playerId][index][0];
            var center_y = this.coordArray[playerId][index][1];

            var damageText = SVG.get('p' + playerId + 'f' + index + 'damageText');
            damageText.text("REVIVED").center(center_x, center_y).font({ size: 18})
                .opacity(1).animate({delay: '0.5s'}).opacity(0);
            this.displayHP(data.reviveHPRatio * 100, playerId, index);
            this.getAfflictionText(playerId, index).hide();

            this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
        }
    }

    displayProtectEvent(majorIndex: number, minorIndex: number, option) {
        var minorLog = this.logger.minorEventLog;
        var data: MinorEvent = minorLog[majorIndex][minorIndex];
        var that = this;
        var executor = this.cardMan.getCardById(data.executorId);
        var executorGroup: any = this.getCardImageGroup(executor);
        var x1 = executorGroup.rbox().x;
        var y1 = executorGroup.rbox().y;

        // move the executor's group to the front
        executorGroup.front();
        SVG.get('p' + executor.getPlayerId() + 'group').front();

        if (minorIndex < minorLog[majorIndex].length) {
            var protectedCard = this.cardMan.getCardById(data.protect.protectedId);
            var protectedGroup = this.getCardImageGroup(protectedCard);

            var attackerCard = this.cardMan.getCardById(data.protect.attackerId);
            var attackerGroup = this.getCardImageGroup(attackerCard);

            var x_protected = protectedGroup.rbox().x;
            var y_protected = protectedGroup.rbox().y;

            var x_attacker = attackerGroup.rbox().x;
            var y_attacker = attackerGroup.rbox().y;

            //display the skill text, but not proc effect
            this.displayProcSkill(executor.id, data.skillId, {noProcEffect: true});

            var y_offset = 70; // for p2, so that the protect fam is in front of the protected fam
            if (executor.getPlayerId() == 1) {
                y_offset *= -1; //reverse for p1
            }

            var moveTime = 0.5;
            var moveBackTime = 0.5;
            if (data.protect.counter && Skill.isIndirectSkill(data.protect.counteredSkillId)) {
                moveTime = 0.1;
                moveBackTime = 0.1;
            }

            var nextData = minorLog[majorIndex][minorIndex + 1];
            var explosion = SVG.get('p' + executor.getPlayerId() + 'f' + executor.formationColumn + 'explosion');

            // animation for the protect. Also use the next MinorEvent's information.
            // after this is done, call the animation for the +2 MinorEvent, which is the counter, or another event
            // if the protect fam is dead or if there's no counter
            //
            // e.g. if counter: [x procs y to protect z] -> [x receives n damage] -> [x counters w, w lost k damage]
            //      if not counter or dead, third event becomes [something do something]
            executorGroup.animate({ duration: moveTime + 's' })
                .move(x_protected - x1, y_protected - y1 + y_offset) // move to protect place
                .after(function () {
                    if (Skill.isIndirectSkill(nextData.skillId)) { // receive damage - indirect

                        var exploDuration = 0.2;
                        if (Skill.isWisAutoAttack(nextData.skillId)) {
                            var procEffect = that.getProcEffect(attackerCard.getPlayerId(), attackerCard.formationColumn, 'spellCircle');
                            procEffect.animate({duration: '0.2s'}).opacity(1);
                            exploDuration = 0.5;
                        }
                        else if (Skill.isAtkAutoAttack(nextData.skillId)) {
                            procEffect = that.getProcEffect(attackerCard.getPlayerId(), attackerCard.formationColumn, 'lineSpark');
                            procEffect.animate({duration: '0.2s'}).opacity(1);
                            exploDuration = 0.5;
                        }

                        explosion.animate({ duration: exploDuration + 's' }).opacity(1)
                            .after(function() {
                                explosion.opacity(0);
                                    
                                if (procEffect) {
                                    procEffect.remove();
                                }

                                that.displayPostDamage(executor.getPlayerId(), executor.formationColumn, majorIndex, minorIndex + 1);
                                    
                                executorGroup.animate({ duration: moveBackTime + 's'})
                                    .move(0, 0)
                                    .after(function(){                                    
                                        that.displayMinorEventAnimation(majorIndex, minorIndex + 2, option);
                                    });
                            });                            
                    }
                    else { // receive damage physically - need to move the attacker also
                        SVG.get('p' + attackerCard.getPlayerId() + 'group').front();
                        attackerGroup.animate({ duration: '0.5s' })
                            .move(executorGroup.rbox().x - x_attacker, executorGroup.rbox().y - y_attacker)
                            .after(function () {
                                explosion.opacity(1);           
                                            
                                that.displayPostDamage(executor.getPlayerId(), executor.formationColumn, majorIndex, minorIndex + 1);

                                attackerGroup.animate({ duration: '0.3s'}).move(0, 0);

                                executorGroup.animate({ duration: moveBackTime + 's'})
                                    .move(0, 0)
                                    .after(function(){
                                        explosion.opacity(0);                               
                                        that.displayMinorEventAnimation(majorIndex, minorIndex + 2, option);
                                    });
                            });    
                    }
                });
        }
    }

    displayReserveSwitchEvent(majorIndex: number, minorIndex: number, option) {
        var minorLog = this.logger.minorEventLog;
        var data: MinorEvent = minorLog[majorIndex][minorIndex];
        var that = this;
        if (minorIndex < minorLog[majorIndex].length) {
            var main = this.cardMan.getCardById(data.reserveSwitch.mainId);
            var reserve = this.cardMan.getCardById(data.reserveSwitch.reserveId);
            var group = this.getCardImageGroup(main);
            var mainId = main.getPlayerId();

            var image: any = this.getCardImage(main);
            var newLink = getScaledFamiliarWikiaImageLink(reserve.imageLink, reserve.fullName, BattleGraphic.IMAGE_WIDTH_BIG);
            image.load(newLink);

            var y_offset = mainId == 1? 255 : -255;
            group.move(0, y_offset).animate(1000).move(0, 0).after(function(){
                that.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
            });
                
            this.displayHP(100, mainId, main.formationColumn, 0);
            this.getAfflictionText(mainId, main.formationColumn).hide();
        }
    }

    displayDescriptionEvent(majorIndex: number, minorIndex: number, option) {
        var minorLog = this.logger.minorEventLog;
        var data: MinorEvent = minorLog[majorIndex][minorIndex];
        var that = this;

        var executor = this.cardMan.getCardById(data.executorId);
        var executorGroup: any = this.getCardImageGroup(executor);
        // move the executor's group to the front
        executorGroup.front();
        SVG.get('p' + executor.getPlayerId() + 'group').front();

        if (minorIndex < minorLog[majorIndex].length) {
            if (!data.noProcEffect) {
                this.displayProcSkill(executor.id, data.skillId, {
                    callback: function() {
                        that.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
                    },
                    durationRatio: 0.5,
                });                
            }
            else {
                // just need to display the skill text, and have to call the next event ourselves
                this.displayProcSkill(executor.id, data.skillId, {
                    noProcEffect: true
                });
                this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
            }
        }
    }

    displayBcAddProbEvent(majorIndex: number, minorIndex: number, option) {
        var minorLog = this.logger.minorEventLog;
        var data: MinorEvent = minorLog[majorIndex][minorIndex];
        if (minorIndex < minorLog[majorIndex].length) {
            // we don't care about showing the text for reserve fams
            if (data.bcAddProb.isMain) {
                var target = this.cardMan.getCardById(data.bcAddProb.targetId);
                var center_x = this.coordArray[target.getPlayerId()][target.formationColumn][0];
                var center_y = this.coordArray[target.getPlayerId()][target.formationColumn][1];

                var damageText = SVG.get('p' + target.getPlayerId() + 'f' + target.formationColumn + 'damageText');
                damageText.text("+10%").center(center_x, center_y).font({ size: 25})
                    .opacity(1).animate({delay: '2s'}).opacity(0);
            }

            this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
        }
    }

    displayAfflictionEvent(majorIndex: number, minorIndex: number, option) {
        var minorLog = this.logger.minorEventLog;
        var data: MinorEvent = minorLog[majorIndex][minorIndex];
        if (minorIndex < minorLog[majorIndex].length) {
            var target = this.cardMan.getCardById(data.targetId);
            this.displayAfflictionText(target.getPlayerId(), target.formationColumn, majorIndex, minorIndex);

            this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
        }
    }

    /**
     * For non-battle HP change
     */
    displayHpChangeEvent(majorIndex: number, minorIndex: number, option) {
        var minorLog = this.logger.minorEventLog;
        var data: MinorEvent = minorLog[majorIndex][minorIndex];
        if (minorIndex < minorLog[majorIndex].length) {
            var target = this.cardMan.getCardById(data.targetId);

            this.displayPostDamage(target.getPlayerId(), target.formationColumn, majorIndex, minorIndex);
            this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
        }
    }

    displayBattleEvent(majorIndex: number, minorIndex: number, option) {
        var minorLog = this.logger.minorEventLog;
        var majorLog = this.logger.majorEventLog;
        var data: MinorEvent = minorLog[majorIndex][minorIndex];
        var that = this;

        var target = this.cardMan.getCardById(data.targetId);
        var targetGroup: any = this.getCardImageGroup(target);
        var x = targetGroup.rbox().x;
        var y = targetGroup.rbox().y;

        var executor = this.cardMan.getCardById(data.executorId);
        var executorGroup: any = this.getCardImageGroup(executor);
        var x1 = executorGroup.rbox().x;
        var y1 = executorGroup.rbox().y;

        // move the executor's group to the front
        executorGroup.front();
        SVG.get('p' + executor.getPlayerId() + 'group').front();

        var explosion = SVG.get('p' + target.getPlayerId() + 'f' + target.formationColumn + 'explosion');
        if (Skill.isAoeSkill(data.skillId)) {
            var exploSet = [];

            // add targets to the set
            if (data.executorId === majorLog[majorIndex].executorId && data.skillId === majorLog[majorIndex].skillId) {
                var aoeTargets = this.logger.getTargetsInMajorEvent(majorIndex);
            }
            else { //hacky, for nested AoE (slagh, phantom ass, fate)
                aoeTargets = this.logger.getNestedTargetsInMajorEvent(majorIndex, minorIndex);
                var isNested = true;
            }

            if ((isNested && option.noNestedAttackAnim) || (!isNested && option.noAttackAnim)) {
                var noAttackAnim = true;
            }

            for (var i = 0; i < aoeTargets.length; i++) {
                var exploTargetCol = this.cardMan.getCardById(aoeTargets[i]).formationColumn;
                exploSet.push(SVG.get('p' + target.getPlayerId() + 'f' + exploTargetCol + 'explosion'));
            }

            if (noAttackAnim) {
                this.displayPostDamage(target.getPlayerId(), target.formationColumn, majorIndex, minorIndex);
                this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
            }
            else {                
                var exploDuration = 0.4;
                if (Skill.isWisAutoAttack(data.skillId)) {
                    var procEffect = this.getProcEffect(executor.getPlayerId(), executor.formationColumn, 'spellCircle');
                    procEffect.animate({duration: '0.2s'}).opacity(1);
                    exploDuration = 0.8;
                }
                else if (Skill.isAtkAutoAttack(data.skillId)) {
                    procEffect = this.getProcEffect(executor.getPlayerId(), executor.formationColumn, 'lineSpark');
                    procEffect.animate({duration: '0.2s'}).opacity(1);
                    exploDuration = 0.8;
                }

                if (!isNested) {
                    option.noAttackAnim = true;
                }
                else {
                    option.noNestedAttackAnim = true;
                }

                function getCallback(graphic, majorIndex, minorIndex, option, target, procEffect, exploSet) {
                    return function() {
                        for (var i = 0; i < exploSet.length; i++) {
                            exploSet[i].opacity(0);
                        }
                        
                        if (procEffect) {
                            procEffect.remove();
                        }

                        graphic.displayPostDamage(target.getPlayerId(), target.formationColumn, majorIndex, minorIndex);
                        graphic.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
                    }
                }

                for (i = 0; i < exploSet.length; i++) {
                    // specify a callback for the last explosion animation
                    if (i == exploSet.length - 1) {
                        var callback = getCallback(that, majorIndex, minorIndex, option, target, procEffect, exploSet)
                    }

                    exploSet[i].animate({ duration: exploDuration + 's' }).opacity(1).after(callback);
                }
            }
        }
        else if (Skill.isIndirectSkill(data.skillId)) { // indirect but not AoE, like multi-hitting

            exploDuration = 0.2;

            if (Skill.isWisAutoAttack(data.skillId)) {
                procEffect = this.getProcEffect(executor.getPlayerId(), executor.formationColumn, 'spellCircle');
                procEffect.animate({duration: '0.2s'}).opacity(1);
                exploDuration = 0.4;
            }

            explosion.animate({ duration: exploDuration + 's' })
                     .opacity(1)
                     .after(function() {
                        explosion.opacity(0);

                        if (procEffect) {
                            procEffect.remove();
                        }

                        that.displayPostDamage(target.getPlayerId(), target.formationColumn, majorIndex, minorIndex);
                        that.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
                     });
        }
        else {
            // attack with contact, move the executor forward and back
            executorGroup.animate({ duration: '0.5s' })
                .move(x - x1, y - y1)
                .after(function () {
                    if (!data.missed) {
                        explosion.opacity(1);
                    }

                    that.displayPostDamage(target.getPlayerId(), target.formationColumn, majorIndex, minorIndex);

                    this.animate({ duration: '0.5s'})
                        .move(0, 0)
                        .after(() => {
                            explosion.opacity(0);
                            that.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
                        });
                });
        }
    }

    /**
     * Get the image of a card
     */
    getCardImage(card: Card) {
        return SVG.get('p' + card.getPlayerId() + 'f' + card.formationColumn + 'image');
    }

    /**
     * Get the image group of a card
     */
    getCardImageGroup(card: Card) {
        return SVG.get('p' + card.getPlayerId() + 'f' + card.formationColumn + 'group');
    }

    /**
     * Get the ward effect on a card
     */
    getWard(playerId: number, famIndex: number, type: ENUM.StatusType) {
        var wardTxt, wardFileName;
        switch (type) {
            case ENUM.StatusType.ATTACK_RESISTANCE:
                wardTxt = "physicalWard";
                wardFileName = "physical_ward.png";
                break;
            case ENUM.StatusType.MAGIC_RESISTANCE:
                wardTxt = "magicalWard";
                wardFileName = "magical_ward.png";
                break;
            case ENUM.StatusType.BREATH_RESISTANCE:
                wardTxt = "breathWard";
                wardFileName = "breath_ward.png";
                break;
            default:
                throw new Error("Invalid type of ward");
        }

        var ward = SVG.get('p' + playerId + 'f' + famIndex + wardTxt);

        if (!ward) {
            ward = SVG.get('mainSvg').image('img/' + wardFileName, 70, 70)
                        .center(this.coordArray[playerId][famIndex][0], this.coordArray[playerId][famIndex][1])
                        .attr('id', 'p' + playerId + 'f' + famIndex + wardTxt)
                        .opacity(0);
            SVG.get('p' + playerId + 'f' + famIndex + 'group').add(ward);
        }

        return ward;
    }

    /**
     * Get the affiction text of a card
     */
    getAfflictionText(playerId: number, famIndex: number) {
        var txt = SVG.get('p' + playerId + 'f' + famIndex + 'afflictText');

        if (!txt) {
            txt = SVG.get('mainSvg').text('Paralyzed').font({ size: 14, family: BattleGraphic.FONT })
                                .attr({fill:'#fff', stroke: '#000', 'stroke-width': BattleGraphic.AFFLICTION_TEXT_STROKE_WIDTH})
                                .center(this.coordArray[playerId][famIndex][0], 
                                        this.coordArray[playerId][famIndex][1] + BattleGraphic.IMAGE_WIDTH * 1.5 / 2 + 20)
                                .attr('id', 'p' + playerId + 'f' + famIndex + 'afflictText')
                                .hide();
            SVG.get('p' + playerId + 'f' + famIndex + 'group').add(txt);    
        }

        return txt;
    }

    /**
     * Get the proc effect (spellCircle or lineSpark) of a card
     */
    getProcEffect(playerId: number, famIndex: number, type: string) {
        var file = type == "spellCircle"? "circle_blue.png" : "lineSpark.png";

        var effect = SVG.get('mainSvg').image('img/' + file, 150, 150)
                            .center(this.coordArray[playerId][famIndex][0], this.coordArray[playerId][famIndex][1])
                            .attr('id', 'p' + playerId + 'f' + famIndex + 'spellCircle')
                            .opacity(0);
        SVG.get('p' + playerId + 'f' + famIndex + 'group').add(effect);
    
        return effect;
    }

    /**
     * Get the main battle text of the whole field (for turn order change, decision win, etc.)
     */
    getMainBattleEffect() {
        var txt = SVG.get('battleText');

        if (!txt) {
            txt = SVG.get('mainSvg').text('0').font({ size: 24, family: BattleGraphic.FONT })
                                    .attr({fill:'#fff', stroke: '#000', 'stroke-width': BattleGraphic.AFFLICTION_TEXT_STROKE_WIDTH})
                                    .center(200, 300)
                                    .attr('id', 'battleText')
                                    .opacity(0);
        }

        return txt;
    }
}
