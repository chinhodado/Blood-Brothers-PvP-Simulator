class BattleGraphic {

    // holds the coordinates of the bullets of the formation
    coordArray: any = {
        1: [], 
        2: []
    };

    static SHOW_FORMATION_LINE = false;
    static IMAGE_WIDTH = 70;
    static IMAGE_WIDTH_BIG = 120;
    static PLAY_MODE = 'MANUAL';

    logger: BattleLogger;

    private static _instance: BattleGraphic = null;

    constructor() {
        if (BattleGraphic._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        BattleGraphic._instance = this;

        this.logger = BattleLogger.getInstance();
    }

    public static getInstance(): BattleGraphic {
        if(BattleGraphic._instance === null) {
            throw new Error ("You're not supposed to create this object this way")
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
            if (BattleGraphic.SHOW_FORMATION_LINE) {
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
            }
            
            // grab the image links of the curent player's fam
            var imageLinksArray = [];
            var initialField = JSON.parse(this.logger.initialFieldInfo);
            var playerCards = initialField["player" + player + "Cards"]; // get the cards of this player
            
            for (var fam = 0; fam < 5; fam++) { // for each card
                imageLinksArray.push(getScaledWikiaImageLink(playerCards[fam].imageLink, BattleGraphic.IMAGE_WIDTH_BIG));
            }
            
            // display fam images and other effects
            for (var i = 0; i < 5; i++) {
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

                var damageText = draw.text('0').font({ size: 22, family: "Cooper Black" })
                                     .attr({fill:'#fff', stroke: '#000', 'stroke-width': '2px'})
                                     .center(coordArray[i][0], coordArray[i][1])
                                     .attr('id', 'p' + player + 'f' + i + 'damageText')
                                     .opacity(0);

                var explosion = draw.image('img/explosion.png', 70, 70)
                                    .move(image_x_coord, image_y_coord)
                                    .attr('id', 'p' + player + 'f' + i + 'explosion')
                                    .opacity(0)

                // can't move these proc effects out atm since that will make the fam group sizes different
                var spellCircle = draw.image('img/circle_blue.png', 150, 150)
                                    .center(coordArray[i][0], coordArray[i][1])
                                    .attr('id', 'p' + player + 'f' + i + 'spellCircle')
                                    .opacity(0)

                var procSpark = draw.image('img/lineSpark.png', 150, 150)
                                    .center(coordArray[i][0], coordArray[i][1])
                                    .attr('id', 'p' + player + 'f' + i + 'lineSpark')
                                    .opacity(0)

                // make a svg group for the image + hp bar + explosion + proc spark + spell circle
                var group = draw.group().attr('id', 'p' + player + 'f' + i + 'group');                
                group.add(image);
                group.add(damageText);
                group.add(explosion);
                group.add(spellCircle); group.add(procSpark);

                groupPlayer.add(group);
            }
        }
    }

    displayHPOnCanvas(percent: number, player: number, index: number, animDuration?: number) {

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
    
    displayDamageTextAndHP(playerId: number, famIndex: number, majorIndex: number, minorIndex: number) {
        var field = this.logger.getFieldAtMinorIndex(majorIndex, minorIndex);
        var targetInfo = field["player" + playerId + "Cards"][famIndex];
        var stats = targetInfo.stats;
        var originalStats = targetInfo.originalStats;

        var center_x = this.coordArray[playerId][famIndex][0];
        var center_y = this.coordArray[playerId][famIndex][1];

        var amount = this.logger.minorEventLog[majorIndex][minorIndex].amount;

        var damageText = SVG.get('p' + playerId + 'f' + famIndex + 'damageText');
        damageText.text(Math.abs(amount) + "").font({ size: 22})
                  .center(center_x, center_y).opacity(1).front();
        damageText.animate({duration: '1s'}).opacity(0);

        this.displayHPOnCanvas (stats.hp / originalStats.hp * 100, playerId, famIndex);
    }

    displayWard(playerId: number, famIndex: number, majorIndex: number, minorIndex: number) {
        var data = this.logger.minorEventLog[majorIndex][minorIndex];

        var type;
        switch (data.wardUsed) {
            case "PHYSICAL":
                type = ENUM.StatusType.ATTACK_RESISTANCE;
                break;
            case "MAGICAL":
                type = ENUM.StatusType.MAGIC_RESISTANCE;
                break;
            case "BREATH":
                type = ENUM.StatusType.BREATH_RESISTANCE;
                break;
            default:
                return; // no ward was used
        }

        var wardImg = this.getWard(playerId, famIndex, type);
        wardImg.opacity(1).animate({delay: '0.5s'}).opacity(0);
    }

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
                    var text = data.affliction.type;
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

    /**
     * Display the animation of a major event, including any minor events belong to it
     */
    displayMajorEventAnimation(majorIndex: number) {
        var majorLog = this.logger.majorEventLog;

        if (majorIndex >= majorLog.length) {
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

        var executorId = majorLog[majorIndex].executorId;

        if (BattleGraphic.PLAY_MODE == 'AUTO') {
            var autoCallback = function() {
                BattleGraphic.getInstance().displayMajorEventAnimation(majorIndex + 1);
            }
        }
            
        if (majorLog[majorIndex].skillId && SkillDatabase[majorLog[majorIndex].skillId].isAutoAttack) {
            // don't enlarge the fam, etc.
            this.displayMinorEventAnimation(majorIndex, 0,{callback: autoCallback});
        }
        else {
            var callback = function() {
                BattleGraphic.getInstance().displayMinorEventAnimation(majorIndex, 0, {callback: autoCallback});
            }

            this.displayProcSkill(executorId, majorLog[majorIndex].skillId, {callback: callback});
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

        var executor = CardManager.getInstance().getCardById(executorId);
        var group: any = this.getCardImageGroupOnCanvas(executor);

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
                var procEffect = SVG.get('p' + executor.getPlayerId() + 'f' + executor.formationColumn + 'spellCircle');
            }
            else {
                var procEffect = SVG.get('p' + executor.getPlayerId() + 'f' + executor.formationColumn + 'lineSpark');
            }

            SVG.get('p' + executor.getPlayerId() + 'f' + executor.formationColumn + 'group').front();
        
            procEffect.opacity(1);
            procEffect.animate({duration: '3s'})
                       .rotate(180)
                       .after(function(){
                            this.rotate(0);//reset the rotation
                       });

            group.animate({ duration: D1 + 's' })
                .transform({a: scaleFactor, b: 0, c: 0, d: scaleFactor, e: cx - scaleFactor * cx, f: cy - scaleFactor * cy})
                .after(function () {
                    this.animate({ duration: D1 + 's', delay: D05 + 's' })
                        .transform({a: 1, b: 0, c: 0, d: 1, e: cx - 1 * cx, f: cy - 1 * cy})
                        .after(function(){
                            procEffect.opacity(0);
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
                                .opacity(0)
                        });
    }

    /**
     * Display the animation for a minor event
     * This is a recursive function. It will pass itself as a callback to play the next minor event.
     * This should only be called once on a major index because of that
     * 
     * noAttackAnim: don't display attack anim anymore (for AoE)
     */
    displayMinorEventAnimation(majorIndex: number, minorIndex: number, option: {noAttackAnim?: boolean; callback?} = {}) {
        var minorLog = this.logger.minorEventLog;

        // need to make sure minorEventLog[index] exists, in case this is an empty event (like the "Battle start" event);
        if (!minorLog[majorIndex] || minorIndex >= minorLog[majorIndex].length) {
            if (option.callback) {
                option.callback();
            }
            return;
        }

        var data: MinorEvent = minorLog[majorIndex][minorIndex];
            
        if (!data.executorId && data.type != ENUM.MinorEventType.HP && data.type != ENUM.MinorEventType.AFFLICTION) {
            if (minorIndex < minorLog[majorIndex].length) {
                this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
                return;
            }
            else return; // for now
        }

        if (data.type == ENUM.MinorEventType.HP && !data.executorId) {
            if (minorIndex < minorLog[majorIndex].length) {
                var target = CardManager.getInstance().getCardById(data.targetId);

                this.displayPostDamage(target.getPlayerId(), target.formationColumn, majorIndex, minorIndex);
                this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
                return;
            }
            else return;
        }

        if (data.type == ENUM.MinorEventType.STATUS) {
            if (minorIndex < minorLog[majorIndex].length) {
                var target = CardManager.getInstance().getCardById(data.targetId);

                var center_x = this.coordArray[target.getPlayerId()][target.formationColumn][0];
                var center_y = this.coordArray[target.getPlayerId()][target.formationColumn][1];

                if (data.status.type == ENUM.StatusType.ATTACK_RESISTANCE ||
                    data.status.type == ENUM.StatusType.MAGIC_RESISTANCE ||
                    data.status.type == ENUM.StatusType.BREATH_RESISTANCE) 
                {
                    var ward = this.getWard(target.getPlayerId(), target.formationColumn, data.status.type); 
                    ward.opacity(1).animate({delay: '0.5s'}).opacity(0)
                }
                else {
                    // display status text
                    var damageText = SVG.get('p' + target.getPlayerId() + 'f' + target.formationColumn + 'damageText');
                    damageText.text(ENUM.StatusType[data.status.type] + " Up").center(center_x, center_y).font({ size: 18})
                        .opacity(1).animate({delay: '0.5s'}).opacity(0);
                }

                this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
                return;
            }
            else return;
        }

        if (data.type == ENUM.MinorEventType.AFFLICTION) {
            if (minorIndex < minorLog[majorIndex].length) {
                var target = CardManager.getInstance().getCardById(data.targetId);
                this.displayAfflictionText(target.getPlayerId(), target.formationColumn, majorIndex, minorIndex);

                this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
                return;
            }
            else return;
        }

        // going and attack physically
        var executor = CardManager.getInstance().getCardById(data.executorId);
        var executorGroup: any = this.getCardImageGroupOnCanvas(executor);
        executorGroup.front();

        var x1 = executorGroup.rbox().x;
        var y1 = executorGroup.rbox().y;

        // move the executor's group to the front
        SVG.get('p' + executor.getPlayerId() + 'group').front();

        // a description of a skill proc
        if (data.type == ENUM.MinorEventType.DESCRIPTION) {
            if (minorIndex < minorLog[majorIndex].length) {
                this.displayProcSkill(executor.id, data.skillId, {
                    callback: function() {
                        BattleGraphic.getInstance().displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
                    },
                    durationRatio: 0.5
                });
                return;
            }
            else return;
        }

        // a protect/defense, show it
        if (data.type == ENUM.MinorEventType.PROTECT) {
            if (minorIndex < minorLog[majorIndex].length) {
                var protectedCard = CardManager.getInstance().getCardById(data.protect.protectedId);
                var protectedGroup = this.getCardImageGroupOnCanvas(protectedCard);

                var attackerCard = CardManager.getInstance().getCardById(data.protect.attackerId);
                var attackerGroup = this.getCardImageGroupOnCanvas(attackerCard);

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
                            explosion.animate({ duration: '0.2s' }).opacity(1)
                                .after(function() {
                                    explosion.opacity(0);

                                    BattleGraphic.getInstance()
                                        .displayPostDamage(executor.getPlayerId(), executor.formationColumn, majorIndex, minorIndex + 1);
                                    
                                    executorGroup.animate({ duration: moveBackTime + 's'})
                                        .move(0, 0)
                                        .after(function(){                                    
                                            BattleGraphic.getInstance().displayMinorEventAnimation(majorIndex, minorIndex + 2, option);
                                        });
                                });                            
                        }
                        else { // receive damage physically - need to move the attacker also
                            SVG.get('p' + attackerCard.getPlayerId() + 'group').front();
                            attackerGroup.animate({ duration: '0.5s' })
                                .move(executorGroup.rbox().x - x_attacker, executorGroup.rbox().y - y_attacker)
                                .after(function () {
                                    explosion.opacity(1);           
                                            
                                    BattleGraphic.getInstance()
                                        .displayPostDamage(executor.getPlayerId(), executor.formationColumn, majorIndex, minorIndex + 1);

                                    attackerGroup.animate({ duration: '0.3s'}).move(0, 0);

                                    executorGroup.animate({ duration: moveBackTime + 's'})
                                        .move(0, 0)
                                        .after(function(){
                                            explosion.opacity(0);                               
                                            BattleGraphic.getInstance().displayMinorEventAnimation(majorIndex, minorIndex + 2, option);
                                        });
                                });    
                        }
                    });

                return;
            }
            else return;
        }

        var target = CardManager.getInstance().getCardById(data.targetId);
        var targetGroup: any = this.getCardImageGroupOnCanvas(target);

        var x = targetGroup.rbox().x;
        var y = targetGroup.rbox().y;

        var explosion = SVG.get('p' + target.getPlayerId() + 'f' + target.formationColumn + 'explosion');

        if (Skill.isAoeSkill(data.skillId)) {
            var exploSet = SVG.get('mainSvg').set();

            // add targets to the set
            var aoeTargets = this.logger.getTargetsInMajorEvent(majorIndex);
            for (var i = 0; i < aoeTargets.length; i++) {
                var exploTargetCol = CardManager.getInstance().getCardById(aoeTargets[i]).formationColumn;
                exploSet.add(SVG.get('p' + target.getPlayerId() + 'f' + exploTargetCol + 'explosion'));
            }

            if (option.noAttackAnim) {
                this.displayPostDamage(target.getPlayerId(), target.formationColumn, majorIndex, minorIndex);
                this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
            }
            else {
                var spellCircle = SVG.get('p' + executor.getPlayerId() + 'f' + executor.formationColumn + 'spellCircle');
                var exploDuration = 0.4;
                if (Skill.isWisAutoAttack(data.skillId)) {
                    spellCircle.animate({duration: '0.2s'}).opacity(1);
                    exploDuration = 0.8;
                }
                option.noAttackAnim = true;

                exploSet.animate({ duration: exploDuration + 's' })
                         .opacity(1)
                         .after(function() {
                            exploSet.opacity(0);
                            spellCircle.opacity(0);

                            BattleGraphic.getInstance()
                                .displayPostDamage(target.getPlayerId(), target.formationColumn, majorIndex, minorIndex);
                            BattleGraphic.getInstance().displayMinorEventAnimation(majorIndex, minorIndex + 1,
                                option);
                         });
            }
        }
        else if (Skill.isIndirectSkill(data.skillId)) { // indirect but not AoE, like multi-hitting
            explosion.animate({ duration: '0.2s' })
                     .opacity(1)
                     .after(function() {
                        explosion.opacity(0);

                        BattleGraphic.getInstance()
                            .displayPostDamage(target.getPlayerId(), target.formationColumn, majorIndex, minorIndex);
                        BattleGraphic.getInstance().displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
                     });
        }
        else {
            // attack with contact, move the executor forward and back
            executorGroup.animate({ duration: '0.5s' })
                .move(x - x1, y - y1)
                .after(function () {
                    explosion.opacity(1);

                    BattleGraphic.getInstance()
                        .displayPostDamage(target.getPlayerId(), target.formationColumn, majorIndex, minorIndex);

                    this.animate({ duration: '0.5s'})
                        .move(0, 0)
                        .after(function () {
                            explosion.opacity(0);
                            BattleGraphic.getInstance().displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
                        });
                });
        }
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

    getWard(playerId: number, famIndex: number, type: ENUM.StatusType) {
        var wardTxt, wardFileName;
        switch(type) {
            case ENUM.StatusType.ATTACK_RESISTANCE:
                wardTxt = "physicalWard";
                wardFileName = "physical_ward.png"
                break;
            case ENUM.StatusType.MAGIC_RESISTANCE:
                wardTxt = "magicalWard";
                wardFileName = "magical_ward.png"
                break;
            case ENUM.StatusType.BREATH_RESISTANCE:
                wardTxt = "breathWard";
                wardFileName = "breath_ward.png"
                break;
            default:
                throw new Error("Invalid type of ward");
        }

        var ward = SVG.get('p' + playerId + 'f' + famIndex + wardTxt);

        if (!ward) {
            ward = SVG.get('mainSvg').image('img/' + wardFileName, 70, 70)
                        .center(this.coordArray[playerId][famIndex][0], this.coordArray[playerId][famIndex][1])
                        .attr('id', 'p' + playerId + 'f' + famIndex + wardTxt)
                        .opacity(0)
            SVG.get('p' + playerId + 'f' + famIndex + 'group').add(ward);
        }

        return ward;
    }

    getAfflictionText(playerId: number, famIndex: number) {
        var txt = SVG.get('p' + playerId + 'f' + famIndex + 'afflictText');

        if (!txt) {
            txt = SVG.get('mainSvg').text('Paralyzed').font({ size: 14, family: "Cooper Black" })
                                .attr({fill:'#fff', stroke: '#000', 'stroke-width': '2px'})
                                .center(this.coordArray[playerId][famIndex][0], 
                                        this.coordArray[playerId][famIndex][1] + BattleGraphic.IMAGE_WIDTH * 1.5 / 2 + 20)
                                .attr('id', 'p' + playerId + 'f' + famIndex + 'afflictText')
                                .hide();
            SVG.get('p' + playerId + 'f' + famIndex + 'group').add(txt);        
        }

        return txt;
    }
}