var BattleBackground = (function () {
    function BattleBackground() {
    }
    BattleBackground.getRandomBackgroundLink = function () {
        var shortenedLink = getRandomElement(BattleBackground.bgList);
        return BattleBackground.getLocalLinkFromShortenedLink(shortenedLink);
    };
    BattleBackground.getWikiaLinkFromShortenedLink = function (shortenedLink) {
        var firstPart = "https://img" + shortenedLink.charAt(0) + ".wikia.nocookie.net/bloodbrothersgame/images/";
        var link = firstPart + shortenedLink.charAt(1) + "/" + shortenedLink.substring(1) + ".png";
        return link;
    };
    BattleBackground.getLocalLinkFromShortenedLink = function (shortenedLink, root) {
        if (root === void 0) { root = ""; }
        return root + "img/wikia/" + shortenedLink.substring(4) + ".png";
    };
    BattleBackground.bgList = [
        "23b/Bamboo01", "34d/Bamboo02", "1c5/Carpet01", "141/Carpet02",
        "283/Carpet03", "1f8/Carpet04", "193/Carpet05", "24d/Carpet06",
        "17b/Carpet07", "3ff/Carpet08", "1e6/Carpet09", "3c3/Carpet10",
        "3a3/Carpet11", "224/Carpet12", "4ad/Carpet13", "20c/Carpet14",
        "29f/Carpet15", "21c/Carpet16", "385/Carpet17", "4f8/Carpet18",
        "362/Carpet19", "387/Carpet20", "311/Carpet21", "352/Carpet22",
        "347/Carpet23", "111/Carpet24", "117/Carpet25", "3c8/Carpet26",
        "2f5/Carpet27", "2cb/Carpet28", "1b8/Carpet29", "26b/Carpet30",
        "18d/Carpet31", "265/Carpet32", "4bc/Carpet33",
        "392/Castle01", "2f9/Castle02", "3b4/Cave01", "266/Cave02",
        "3bc/Cave03", "1ad/Cave04", "4d5/Cave05", "494/Christmas01",
        "3b3/Christmas02", "280/Christmas03", "3bf/Desert01",
        "4c9/Desert02", "3d9/Fog01", "30e/Fog02", "267/Forest01",
        "2c5/Forest02", "247/Greatwall01", "450/Halloween01", "22e/Halloween02",
        "28a/Halloween03", "4c2/Halloween04", "3c7/Halloween05",
        "11a/Jungle01", "268/Mountain01", "3fb/River01",
        "451/River02", "49f/Road01", "270/Road02", "475/Road03",
        "2a8/Road04", "40c/Road05", "2ff/Road06", "310/Road07",
        "383/Road08", "41e/Road09", "289/Road10", "183/Road11",
        "1d8/Road12", "2a7/Road13", "3cf/Road14", "3fb/Road15",
        "1f4/Road16", "28f/Road17", "2a5/Road28", "102/Road29",
        "403/Road33", "4a2/Road34",
        "4e9/Ruins01", "1f4/Sakura01", "336/Snow01", "3c3/Snow03",
        "49a/Swamp01", "145/Swamp02", "144/Tints01", "1fb/Tree01", "33c/Tree02",
        "329/81a5ccfd07ca41c238e124a5b6683b93", "1a0/Castle1", "39f/F459e81069786396191c375060d778a3",
        "3b1/66fddb4d129fa8b494cf3d21a057e226", "45f/452d87b11eb533d33fba937073bb5668",
        "4a5/48645b3ae0106d4f96fa0bf3ad6239b8"
    ];
    return BattleBackground;
}());
var Status = (function () {
    function Status() {
        this.atk = 0;
        this.def = 0;
        this.wis = 0;
        this.agi = 0;
        this.attackResistance = 0;
        this.magicResistance = 0;
        this.breathResistance = 0;
        this.skillProbability = 0;
        this.remainHpAtkUp = 0;
        this.remainHpDefUp = 0;
        this.remainHpWisUp = 0;
        this.remainHpAgiUp = 0;
        this.actionOnDeath = 0;
        this.hpShield = 0;
        this.willAttackAgain = 0;
        this.isNewLogic = {};
    }
    return Status;
}());
var BattleDebugger = (function () {
    function BattleDebugger() {
        if (BattleDebugger._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        BattleDebugger._instance = this;
    }
    BattleDebugger.getInstance = function () {
        if (BattleDebugger._instance === null) {
            BattleDebugger._instance = new BattleDebugger();
        }
        return BattleDebugger._instance;
    };
    BattleDebugger.prototype.displayDebugger = function () {
        this.displayEventLogAtIndex(0);
        var minorLog = BattleLogger.getInstance().minorEventLog;
        var majorLog = BattleLogger.getInstance().majorEventLog;
        var currentTurn = -10;
        for (var i = 0; i < majorLog.length; i++) {
            if (majorLog[i].turn !== currentTurn) {
                currentTurn = majorLog[i].turn;
                this.displayTurn(currentTurn);
            }
            this.displayMajorEvent(i);
            for (var j = 0; minorLog[i] && j < minorLog[i].length; j++) {
                this.displayMinorEvent(i, j);
            }
        }
    };
    BattleDebugger.prototype.displayMajorEvent = function (index) {
        if (!BattleDebugger.IS_DEBUG_MODE) {
            return;
        }
        var data = BattleLogger.getInstance().majorEventLog[index];
        var id = "turn" + data.turn + "events";
        var battleEventDiv = document.getElementById("battleEventDiv");
        var turnEventList = document.getElementById(id);
        if (!turnEventList) {
            turnEventList = document.createElement("ul");
            turnEventList.setAttribute("id", id);
            battleEventDiv.appendChild(turnEventList);
        }
        var newEvent = document.createElement("li");
        newEvent.innerHTML = "<a>" + data.description + "</a>";
        newEvent.setAttribute("tabindex", index + "");
        newEvent.setAttribute("id", index + "");
        newEvent.onclick = function () {
            BattleDebugger.getInstance().displayEventLogAtIndex(+this.id);
        };
        turnEventList.appendChild(newEvent);
    };
    BattleDebugger.prototype.displayMinorEvent = function (majorIndex, minorIndex) {
        if (BattleModel.IS_MASS_SIMULATION || !BattleDebugger.IS_DEBUG_MODE) {
            return;
        }
        var currentTurn = BattleLogger.getInstance().majorEventLog[majorIndex].turn;
        var id = "turn" + currentTurn + "events";
        var description = BattleLogger.getInstance().minorEventLog[majorIndex][minorIndex].description;
        var turnEventList = document.getElementById(id);
        var lastEvent = turnEventList.lastChild;
        var subEventList = lastEvent.getElementsByTagName("ul")[0];
        if (!subEventList) {
            subEventList = document.createElement("ul");
            lastEvent.appendChild(subEventList);
        }
        var newEvent = document.createElement("li");
        newEvent.innerHTML = description;
        subEventList.appendChild(newEvent);
    };
    BattleDebugger.prototype.displayTurn = function (turnNum) {
        if (BattleModel.IS_MASS_SIMULATION || !BattleDebugger.IS_DEBUG_MODE) {
            return;
        }
        var battleEventDiv = document.getElementById("battleEventDiv");
        var newEvent = document.createElement("p");
        newEvent.innerHTML = "Turn " + turnNum;
        battleEventDiv.appendChild(newEvent);
    };
    BattleDebugger.prototype.displayEventLogAtIndex = function (majorIndex) {
        if (!BattleDebugger.IS_DEBUG_MODE) {
            return;
        }
        var graphic = BattleGraphic.getInstance();
        var logger = BattleLogger.getInstance();
        var lastEventIndex = (majorIndex === 0) ? 0 : majorIndex - 1;
        var lastEventField = logger.getFieldAtMajorIndex(lastEventIndex);
        var field = logger.getFieldAtMajorIndex(majorIndex);
        for (var p = 1; p <= 2; p++) {
            var playerCards = field["player" + p + "Cards"];
            var lastPlayerCards = lastEventField["player" + p + "Cards"];
            for (var f = 0; f < 5; f++) {
                var stats = playerCards[f].stats;
                var originalStats = playerCards[f].originalStats;
                var status_1 = playerCards[f].status;
                var afflict = playerCards[f].affliction;
                var hpRatio = stats.hp / originalStats.hp;
                var finalAtk = this.getFinalStat(originalStats.atk, status_1.atk, status_1.isNewLogic[ENUM.StatusType.ATK], status_1.remainHpAtkUp, hpRatio);
                var finalDef = this.getFinalStat(originalStats.def, status_1.def, status_1.isNewLogic[ENUM.StatusType.DEF], status_1.remainHpDefUp, hpRatio);
                var finalWis = this.getFinalStat(originalStats.wis, status_1.wis, status_1.isNewLogic[ENUM.StatusType.WIS], status_1.remainHpWisUp, hpRatio);
                var finalAgi = this.getFinalStat(originalStats.agi, status_1.agi, status_1.isNewLogic[ENUM.StatusType.AGI], status_1.remainHpAgiUp, hpRatio);
                var lastStats = lastPlayerCards[f].stats;
                var lastOriginalStats = lastPlayerCards[f].originalStats;
                var lastStatus = lastPlayerCards[f].status;
                var lastHpRatio = lastStats.hp / lastOriginalStats.hp;
                var lastFinalAtk = this.getFinalStat(lastOriginalStats.atk, lastStatus.atk, lastStatus.isNewLogic[ENUM.StatusType.ATK], lastStatus.remainHpAtkUp, lastHpRatio);
                var lastFinalDef = this.getFinalStat(lastOriginalStats.def, lastStatus.def, lastStatus.isNewLogic[ENUM.StatusType.DEF], lastStatus.remainHpDefUp, lastHpRatio);
                var lastFinalWis = this.getFinalStat(lastOriginalStats.wis, lastStatus.wis, lastStatus.isNewLogic[ENUM.StatusType.WIS], lastStatus.remainHpWisUp, lastHpRatio);
                var lastFinalAgi = this.getFinalStat(lastOriginalStats.agi, lastStatus.agi, lastStatus.isNewLogic[ENUM.StatusType.AGI], lastStatus.remainHpAgiUp, lastHpRatio);
                var infoText = {
                    name: playerCards[f].name,
                    hp: "HP: " + stats.hp,
                    atk: "ATK: " + finalAtk,
                    def: "DEF: " + finalDef,
                    wis: "WIS: " + finalWis,
                    agi: "AGI: " + finalAgi,
                };
                if (status_1.attackResistance !== 0)
                    infoText.physicalResist = "PW: " + status_1.attackResistance;
                if (status_1.magicResistance !== 0)
                    infoText.magicalResist = "MW: " + status_1.magicResistance;
                if (status_1.breathResistance !== 0)
                    infoText.breathResist = "BW: " + status_1.breathResistance;
                if (status_1.willAttackAgain !== 0)
                    infoText.willAttackAgain = "Extra action: Yes";
                if (status_1.skillProbability !== 0)
                    infoText.skillProbability = "Extra prob.: " + status_1.skillProbability;
                if (status_1.hpShield !== 0)
                    infoText.hpShield = "HP Shld.: " + status_1.hpShield;
                if (afflict) {
                    infoText.affliction = "Affliction: " + Affliction.getAfflictionAdjective(afflict.type);
                    if (afflict.type === ENUM.AfflictionType.SILENT) {
                        infoText.affliction += " (" + afflict.validTurnNum + " turn)";
                    }
                    else if (afflict.type === ENUM.AfflictionType.POISON) {
                        infoText.affliction += " (" + afflict.percent + " %)";
                    }
                    else if (afflict.type === ENUM.AfflictionType.BURN) {
                        infoText.affliction += " (" + afflict.damage + ")";
                    }
                    else {
                        infoText.affliction += " (1 turn)";
                    }
                }
                if (stats.hp !== lastStats.hp)
                    infoText.hp = this.decorateText(infoText.hp, stats.hp < lastStats.hp);
                if (finalAtk !== lastFinalAtk)
                    infoText.atk = this.decorateText(infoText.atk, finalAtk < lastFinalAtk);
                if (finalDef !== lastFinalDef)
                    infoText.def = this.decorateText(infoText.def, finalDef < lastFinalDef);
                if (finalWis !== lastFinalWis)
                    infoText.wis = this.decorateText(infoText.wis, finalWis < lastFinalWis);
                if (finalAgi !== lastFinalAgi)
                    infoText.agi = this.decorateText(infoText.agi, finalAgi < lastFinalAgi);
                for (var j = 0; logger.minorEventLog[majorIndex] && j < logger.minorEventLog[majorIndex].length; j++) {
                    var tempEvent = logger.minorEventLog[majorIndex][j];
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
                    infoText.name = "<b>" + infoText.name + "</b>";
                }
                var htmlelem = document.getElementById("player" + p + "Fam" + f);
                htmlelem.innerHTML = infoText.name + "<br>" +
                    infoText.hp + "<br>" +
                    infoText.atk + "<br>" +
                    infoText.def + "<br>" +
                    infoText.wis + "<br>" +
                    infoText.agi +
                    (infoText.physicalResist ? "<br>" + infoText.physicalResist : "") +
                    (infoText.magicalResist ? "<br>" + infoText.magicalResist : "") +
                    (infoText.breathResist ? "<br>" + infoText.breathResist : "") +
                    (infoText.willAttackAgain ? "<br>" + infoText.willAttackAgain : "") +
                    (infoText.skillProbability ? "<br>" + infoText.skillProbability : "") +
                    (infoText.hpShield ? "<br>" + infoText.hpShield : "") +
                    (infoText.affliction ? "<br>" + infoText.affliction : "");
                var lastEventCard = lastEventField["player" + p + "Cards"][f];
                graphic.displayHP(lastEventCard.stats.hp / lastEventCard.originalStats.hp * 100, p, f, 0);
            }
        }
        graphic.displayAllCardImages(majorIndex);
        graphic.displayAllAfflictionText(lastEventIndex);
        graphic.displayMajorEventAnimation(majorIndex);
    };
    BattleDebugger.prototype.getFinalStat = function (original, statusAmount, isNewLogic, remainHpPwrUp, hpRatio) {
        var value = original;
        if (remainHpPwrUp > 1) {
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
    };
    BattleDebugger.prototype.decorateText = function (text, isNegative) {
        var openTag;
        if (isNegative) {
            openTag = "<span style='color:red'><b>";
        }
        else {
            openTag = "<span style='color:green'><b>";
        }
        return openTag + text + "</b></span>";
    };
    BattleDebugger.IS_DEBUG_MODE = true;
    BattleDebugger._instance = null;
    return BattleDebugger;
}());
var ENUM;
(function (ENUM) {
    var Setting;
    (function (Setting) {
        Setting[Setting["IS_MOBILE"] = 0] = "IS_MOBILE";
    })(Setting = ENUM.Setting || (ENUM.Setting = {}));
    var SkillType;
    (function (SkillType) {
        SkillType[SkillType["OPENING"] = 1] = "OPENING";
        SkillType[SkillType["ACTIVE"] = 2] = "ACTIVE";
        SkillType[SkillType["DEFENSE"] = 3] = "DEFENSE";
        SkillType[SkillType["FIELD"] = 4] = "FIELD";
        SkillType[SkillType["PROTECT"] = 5] = "PROTECT";
        SkillType[SkillType["EVADE"] = 6] = "EVADE";
        SkillType[SkillType["ACTION_ON_DEATH"] = 16] = "ACTION_ON_DEATH";
        SkillType[SkillType["PASSIVE"] = 20] = "PASSIVE";
    })(SkillType = ENUM.SkillType || (ENUM.SkillType = {}));
    var SkillCategory;
    (function (SkillCategory) {
        SkillCategory[SkillCategory["OPENING"] = 10] = "OPENING";
        SkillCategory[SkillCategory["ACTIVE"] = 20] = "ACTIVE";
        SkillCategory[SkillCategory["REACTIVE"] = 30] = "REACTIVE";
        SkillCategory[SkillCategory["ACTION_ON_DEATH"] = 16] = "ACTION_ON_DEATH";
    })(SkillCategory = ENUM.SkillCategory || (ENUM.SkillCategory = {}));
    var SkillFunc;
    (function (SkillFunc) {
        SkillFunc[SkillFunc["BUFF"] = 1] = "BUFF";
        SkillFunc[SkillFunc["DEBUFF"] = 2] = "DEBUFF";
        SkillFunc[SkillFunc["ATTACK"] = 3] = "ATTACK";
        SkillFunc[SkillFunc["MAGIC"] = 4] = "MAGIC";
        SkillFunc[SkillFunc["COOP"] = 5] = "COOP";
        SkillFunc[SkillFunc["REVIVE"] = 6] = "REVIVE";
        SkillFunc[SkillFunc["KILL"] = 7] = "KILL";
        SkillFunc[SkillFunc["STEAL"] = 8] = "STEAL";
        SkillFunc[SkillFunc["CHARGE"] = 9] = "CHARGE";
        SkillFunc[SkillFunc["DRAIN"] = 11] = "DRAIN";
        SkillFunc[SkillFunc["PROTECT"] = 12] = "PROTECT";
        SkillFunc[SkillFunc["COUNTER"] = 13] = "COUNTER";
        SkillFunc[SkillFunc["PROTECT_COUNTER"] = 14] = "PROTECT_COUNTER";
        SkillFunc[SkillFunc["TREASURE_HUNTER"] = 15] = "TREASURE_HUNTER";
        SkillFunc[SkillFunc["DISPELL"] = 16] = "DISPELL";
        SkillFunc[SkillFunc["SUICIDE"] = 17] = "SUICIDE";
        SkillFunc[SkillFunc["HEAL"] = 18] = "HEAL";
        SkillFunc[SkillFunc["AFFLICTION"] = 19] = "AFFLICTION";
        SkillFunc[SkillFunc["SURVIVE"] = 20] = "SURVIVE";
        SkillFunc[SkillFunc["DEBUFFATTACK"] = 21] = "DEBUFFATTACK";
        SkillFunc[SkillFunc["DEBUFFINDIRECT"] = 22] = "DEBUFFINDIRECT";
        SkillFunc[SkillFunc["RANDOM"] = 24] = "RANDOM";
        SkillFunc[SkillFunc["COPY"] = 25] = "COPY";
        SkillFunc[SkillFunc["IMITATE"] = 26] = "IMITATE";
        SkillFunc[SkillFunc["EVADE"] = 27] = "EVADE";
        SkillFunc[SkillFunc["PROTECT_REFLECT"] = 28] = "PROTECT_REFLECT";
        SkillFunc[SkillFunc["COUNTER_DISPELL"] = 29] = "COUNTER_DISPELL";
        SkillFunc[SkillFunc["TURN_ORDER_CHANGE"] = 31] = "TURN_ORDER_CHANGE";
        SkillFunc[SkillFunc["CASTER_BASED_DEBUFF"] = 32] = "CASTER_BASED_DEBUFF";
        SkillFunc[SkillFunc["CASTER_BASED_DEBUFF_ATTACK"] = 33] = "CASTER_BASED_DEBUFF_ATTACK";
        SkillFunc[SkillFunc["CASTER_BASED_DEBUFF_MAGIC"] = 34] = "CASTER_BASED_DEBUFF_MAGIC";
        SkillFunc[SkillFunc["DRAIN_ATTACK"] = 36] = "DRAIN_ATTACK";
        SkillFunc[SkillFunc["DRAIN_MAGIC"] = 37] = "DRAIN_MAGIC";
        SkillFunc[SkillFunc["ONHIT_DEBUFF"] = 38] = "ONHIT_DEBUFF";
        SkillFunc[SkillFunc["ONHIT_BUFF"] = 39] = "ONHIT_BUFF";
        SkillFunc[SkillFunc["CLEAR_DEBUFF"] = 40] = "CLEAR_DEBUFF";
        SkillFunc[SkillFunc["COUNTER_INDIRECT"] = 41] = "COUNTER_INDIRECT";
        SkillFunc[SkillFunc["COUNTER_DEBUFF"] = 42] = "COUNTER_DEBUFF";
        SkillFunc[SkillFunc["COUNTER_DEBUFF_INDIRECT"] = 43] = "COUNTER_DEBUFF_INDIRECT";
        SkillFunc[SkillFunc["MULTI_BUFF"] = 44] = "MULTI_BUFF";
        SkillFunc[SkillFunc["MULTI_DEBUFF"] = 45] = "MULTI_DEBUFF";
        SkillFunc[SkillFunc["DEBUFF_AFFLICTION"] = 46] = "DEBUFF_AFFLICTION";
        SkillFunc[SkillFunc["ABSORB"] = 51] = "ABSORB";
        SkillFunc[SkillFunc["ABSORB_ATTACK"] = 52] = "ABSORB_ATTACK";
        SkillFunc[SkillFunc["ABSORB_MAGIC"] = 53] = "ABSORB_MAGIC";
        SkillFunc[SkillFunc["PROTECT_COUNTER_DEBUFF"] = 56] = "PROTECT_COUNTER_DEBUFF";
        SkillFunc[SkillFunc["COUNTER_DRAIN_INDIRECT"] = 62] = "COUNTER_DRAIN_INDIRECT";
        SkillFunc[SkillFunc["COUNTER_DRAIN"] = 63] = "COUNTER_DRAIN";
        SkillFunc[SkillFunc["PROTECT_COUNTER_DRAIN_INDIRECT"] = 64] = "PROTECT_COUNTER_DRAIN_INDIRECT";
        SkillFunc[SkillFunc["PROTECT_COUNTER_DRAIN"] = 65] = "PROTECT_COUNTER_DRAIN";
        SkillFunc[SkillFunc["PROTECT_COUNTER_DEBUFF_INDIRECT"] = 66] = "PROTECT_COUNTER_DEBUFF_INDIRECT";
        SkillFunc[SkillFunc["DAMAGE_PASSIVE"] = 1001] = "DAMAGE_PASSIVE";
        SkillFunc[SkillFunc["DEFENSE_PASSIVE"] = 1002] = "DEFENSE_PASSIVE";
        SkillFunc[SkillFunc["AFFLICTION_PROB_BUFF_PASSIVE"] = 1003] = "AFFLICTION_PROB_BUFF_PASSIVE";
        SkillFunc[SkillFunc["AFFLICTION_PASSIVE"] = 1005] = "AFFLICTION_PASSIVE";
        SkillFunc[SkillFunc["EXTRA_TURN_PASSIVE"] = 1006] = "EXTRA_TURN_PASSIVE";
    })(SkillFunc = ENUM.SkillFunc || (ENUM.SkillFunc = {}));
    var SkillCalcType;
    (function (SkillCalcType) {
        SkillCalcType[SkillCalcType["DEFAULT"] = 0] = "DEFAULT";
        SkillCalcType[SkillCalcType["ATK"] = 1] = "ATK";
        SkillCalcType[SkillCalcType["WIS"] = 2] = "WIS";
        SkillCalcType[SkillCalcType["AGI"] = 3] = "AGI";
        SkillCalcType[SkillCalcType["HEAL"] = 4] = "HEAL";
        SkillCalcType[SkillCalcType["BUFF"] = 5] = "BUFF";
        SkillCalcType[SkillCalcType["DEBUFF"] = 6] = "DEBUFF";
        SkillCalcType[SkillCalcType["REFLECT"] = 7] = "REFLECT";
        SkillCalcType[SkillCalcType["ATK_WIS"] = 8] = "ATK_WIS";
        SkillCalcType[SkillCalcType["ATK_AGI"] = 9] = "ATK_AGI";
        SkillCalcType[SkillCalcType["WIS_AGI"] = 10] = "WIS_AGI";
    })(SkillCalcType = ENUM.SkillCalcType || (ENUM.SkillCalcType = {}));
    var ProtectAttackType;
    (function (ProtectAttackType) {
        ProtectAttackType[ProtectAttackType["ALL"] = 0] = "ALL";
        ProtectAttackType[ProtectAttackType["NORMAL"] = 1] = "NORMAL";
        ProtectAttackType[ProtectAttackType["SKILL"] = 2] = "SKILL";
        ProtectAttackType[ProtectAttackType["NOT_COUNTER"] = 3] = "NOT_COUNTER";
        ProtectAttackType[ProtectAttackType["COUNTER"] = 4] = "COUNTER";
    })(ProtectAttackType = ENUM.ProtectAttackType || (ENUM.ProtectAttackType = {}));
    var StatType;
    (function (StatType) {
        StatType[StatType["HP"] = 0] = "HP";
        StatType[StatType["ATK"] = 1] = "ATK";
        StatType[StatType["DEF"] = 2] = "DEF";
        StatType[StatType["WIS"] = 3] = "WIS";
        StatType[StatType["AGI"] = 4] = "AGI";
    })(StatType = ENUM.StatType || (ENUM.StatType = {}));
    var StatusType;
    (function (StatusType) {
        StatusType[StatusType["ATK"] = 1] = "ATK";
        StatusType[StatusType["DEF"] = 2] = "DEF";
        StatusType[StatusType["WIS"] = 3] = "WIS";
        StatusType[StatusType["AGI"] = 4] = "AGI";
        StatusType[StatusType["ATTACK_RESISTANCE"] = 5] = "ATTACK_RESISTANCE";
        StatusType[StatusType["MAGIC_RESISTANCE"] = 6] = "MAGIC_RESISTANCE";
        StatusType[StatusType["BREATH_RESISTANCE"] = 7] = "BREATH_RESISTANCE";
        StatusType[StatusType["SKILL_PROBABILITY"] = 8] = "SKILL_PROBABILITY";
        StatusType[StatusType["ALL_STATUS"] = 9] = "ALL_STATUS";
        StatusType[StatusType["REMAIN_HP_ATK_UP"] = 11] = "REMAIN_HP_ATK_UP";
        StatusType[StatusType["REMAIN_HP_DEF_UP"] = 12] = "REMAIN_HP_DEF_UP";
        StatusType[StatusType["REMAIN_HP_WIS_UP"] = 13] = "REMAIN_HP_WIS_UP";
        StatusType[StatusType["REMAIN_HP_AGI_UP"] = 14] = "REMAIN_HP_AGI_UP";
        StatusType[StatusType["REMAIN_HP_ALL_STATUS_UP"] = 15] = "REMAIN_HP_ALL_STATUS_UP";
        StatusType[StatusType["ACTION_ON_DEATH"] = 16] = "ACTION_ON_DEATH";
        StatusType[StatusType["HP_SHIELD"] = 17] = "HP_SHIELD";
        StatusType[StatusType["WILL_ATTACK_AGAIN"] = 18] = "WILL_ATTACK_AGAIN";
        StatusType[StatusType["REMAIN_HP_ATK_DEF_UP"] = 20] = "REMAIN_HP_ATK_DEF_UP";
        StatusType[StatusType["REMAIN_HP_ATK_WIS_UP"] = 21] = "REMAIN_HP_ATK_WIS_UP";
        StatusType[StatusType["REMAIN_HP_ATK_AGI_UP"] = 22] = "REMAIN_HP_ATK_AGI_UP";
        StatusType[StatusType["REMAIN_HP_DEF_WIS_UP"] = 23] = "REMAIN_HP_DEF_WIS_UP";
        StatusType[StatusType["REMAIN_HP_DEF_AGI_UP"] = 24] = "REMAIN_HP_DEF_AGI_UP";
        StatusType[StatusType["REMAIN_HP_WIS_AGI_UP"] = 25] = "REMAIN_HP_WIS_AGI_UP";
        StatusType[StatusType["REMAIN_HP_ATK_DEF_WIS_UP"] = 26] = "REMAIN_HP_ATK_DEF_WIS_UP";
        StatusType[StatusType["REMAIN_HP_ATK_DEF_AGI_UP"] = 27] = "REMAIN_HP_ATK_DEF_AGI_UP";
        StatusType[StatusType["REMAIN_HP_DEF_WIS_AGI_UP"] = 28] = "REMAIN_HP_DEF_WIS_AGI_UP";
        StatusType[StatusType["REMAIN_HP_ATK_WIS_AGI_UP"] = 29] = "REMAIN_HP_ATK_WIS_AGI_UP";
        StatusType[StatusType["WILL_ATTACK_AGAIN_PASSIVE"] = 30] = "WILL_ATTACK_AGAIN_PASSIVE";
    })(StatusType = ENUM.StatusType || (ENUM.StatusType = {}));
    var BuffStatusType;
    (function (BuffStatusType) {
        BuffStatusType[BuffStatusType["ATK"] = 1] = "ATK";
        BuffStatusType[BuffStatusType["DEF"] = 2] = "DEF";
        BuffStatusType[BuffStatusType["WIS"] = 3] = "WIS";
        BuffStatusType[BuffStatusType["AGI"] = 4] = "AGI";
        BuffStatusType[BuffStatusType["ATK_DEF"] = 5] = "ATK_DEF";
        BuffStatusType[BuffStatusType["ATK_WIS"] = 6] = "ATK_WIS";
        BuffStatusType[BuffStatusType["ATK_AGI"] = 7] = "ATK_AGI";
        BuffStatusType[BuffStatusType["DEF_WIS"] = 8] = "DEF_WIS";
        BuffStatusType[BuffStatusType["DEF_AGI"] = 9] = "DEF_AGI";
        BuffStatusType[BuffStatusType["WIS_AGI"] = 10] = "WIS_AGI";
        BuffStatusType[BuffStatusType["ATK_DEF_WIS"] = 11] = "ATK_DEF_WIS";
        BuffStatusType[BuffStatusType["ATK_DEF_AGI"] = 12] = "ATK_DEF_AGI";
        BuffStatusType[BuffStatusType["DEF_WIS_AGI"] = 13] = "DEF_WIS_AGI";
        BuffStatusType[BuffStatusType["ALL_STATUS"] = 14] = "ALL_STATUS";
    })(BuffStatusType = ENUM.BuffStatusType || (ENUM.BuffStatusType = {}));
    var SkillRange;
    (function (SkillRange) {
        SkillRange[SkillRange["PASSIVE"] = 0] = "PASSIVE";
        SkillRange[SkillRange["EITHER_SIDE"] = 1] = "EITHER_SIDE";
        SkillRange[SkillRange["BOTH_SIDES"] = 2] = "BOTH_SIDES";
        SkillRange[SkillRange["SELF_BOTH_SIDES"] = 3] = "SELF_BOTH_SIDES";
        SkillRange[SkillRange["ALL"] = 4] = "ALL";
        SkillRange[SkillRange["ENEMY_NEAR_1"] = 5] = "ENEMY_NEAR_1";
        SkillRange[SkillRange["ENEMY_NEAR_2"] = 6] = "ENEMY_NEAR_2";
        SkillRange[SkillRange["ENEMY_NEAR_3"] = 7] = "ENEMY_NEAR_3";
        SkillRange[SkillRange["ENEMY_ALL"] = 8] = "ENEMY_ALL";
        SkillRange[SkillRange["ENEMY_FRONT"] = 9] = "ENEMY_FRONT";
        SkillRange[SkillRange["ENEMY_MID"] = 10] = "ENEMY_MID";
        SkillRange[SkillRange["ENEMY_REAR"] = 11] = "ENEMY_REAR";
        SkillRange[SkillRange["ENEMY_FRONT_ALL"] = 12] = "ENEMY_FRONT_ALL";
        SkillRange[SkillRange["ENEMY_MID_ALL"] = 13] = "ENEMY_MID_ALL";
        SkillRange[SkillRange["ENEMY_REAR_ALL"] = 14] = "ENEMY_REAR_ALL";
        SkillRange[SkillRange["ENEMY_FRONT_MID_ALL"] = 15] = "ENEMY_FRONT_MID_ALL";
        SkillRange[SkillRange["ENEMY_RANDOM_3"] = 16] = "ENEMY_RANDOM_3";
        SkillRange[SkillRange["ENEMY_RANDOM_6"] = 17] = "ENEMY_RANDOM_6";
        SkillRange[SkillRange["ENEMY_REAR_RANDOM_3"] = 18] = "ENEMY_REAR_RANDOM_3";
        SkillRange[SkillRange["ENEMY_RANDOM_4"] = 19] = "ENEMY_RANDOM_4";
        SkillRange[SkillRange["ENEMY_RANDOM_5"] = 20] = "ENEMY_RANDOM_5";
        SkillRange[SkillRange["MYSELF"] = 21] = "MYSELF";
        SkillRange[SkillRange["EVERYONE"] = 22] = "EVERYONE";
        SkillRange[SkillRange["ENEMY_RANDOM_2"] = 23] = "ENEMY_RANDOM_2";
        SkillRange[SkillRange["WIDE_ALL"] = 24] = "WIDE_ALL";
        SkillRange[SkillRange["WIDE_ENEMY_ALL"] = 25] = "WIDE_ENEMY_ALL";
        SkillRange[SkillRange["WIDE_NEIGHBOR"] = 26] = "WIDE_NEIGHBOR";
        SkillRange[SkillRange["WIDE_SELF_NEIGHBOR"] = 27] = "WIDE_SELF_NEIGHBOR";
        SkillRange[SkillRange["RIGHT"] = 28] = "RIGHT";
        SkillRange[SkillRange["SELF_RIGHT"] = 29] = "SELF_RIGHT";
        SkillRange[SkillRange["LEFT"] = 30] = "LEFT";
        SkillRange[SkillRange["SELF_LEFT"] = 31] = "SELF_LEFT";
        SkillRange[SkillRange["ENEMY_NEAR_4"] = 32] = "ENEMY_NEAR_4";
        SkillRange[SkillRange["ENEMY_NEAR_5"] = 33] = "ENEMY_NEAR_5";
        SkillRange[SkillRange["ENEMY_FRONT_REAR_ALL"] = 34] = "ENEMY_FRONT_REAR_ALL";
        SkillRange[SkillRange["ATTACKER"] = 35] = "ATTACKER";
        SkillRange[SkillRange["SELF_IMMEDIATE_RIGHT"] = 36] = "SELF_IMMEDIATE_RIGHT";
        SkillRange[SkillRange["SELF_IMMEDIATE_LEFT"] = 37] = "SELF_IMMEDIATE_LEFT";
        SkillRange[SkillRange["ENEMY_REAR_RANDOM_2"] = 38] = "ENEMY_REAR_RANDOM_2";
        SkillRange[SkillRange["ENEMY_REAR_RANDOM_4"] = 39] = "ENEMY_REAR_RANDOM_4";
        SkillRange[SkillRange["ENEMY_REAR_RANDOM_5"] = 40] = "ENEMY_REAR_RANDOM_5";
        SkillRange[SkillRange["ENEMY_REAR_RANDOM_6"] = 41] = "ENEMY_REAR_RANDOM_6";
        SkillRange[SkillRange["ENEMY_FRONT_RANDOM_2"] = 42] = "ENEMY_FRONT_RANDOM_2";
        SkillRange[SkillRange["ENEMY_FRONT_RANDOM_3"] = 43] = "ENEMY_FRONT_RANDOM_3";
        SkillRange[SkillRange["ENEMY_FRONT_RANDOM_4"] = 44] = "ENEMY_FRONT_RANDOM_4";
        SkillRange[SkillRange["ENEMY_FRONT_RANDOM_5"] = 45] = "ENEMY_FRONT_RANDOM_5";
        SkillRange[SkillRange["ENEMY_FRONT_RANDOM_6"] = 46] = "ENEMY_FRONT_RANDOM_6";
        SkillRange[SkillRange["ENEMY_MID_FRONT_RANDOM_2"] = 47] = "ENEMY_MID_FRONT_RANDOM_2";
        SkillRange[SkillRange["ENEMY_MID_FRONT_RANDOM_3"] = 48] = "ENEMY_MID_FRONT_RANDOM_3";
        SkillRange[SkillRange["ENEMY_MID_FRONT_RANDOM_4"] = 49] = "ENEMY_MID_FRONT_RANDOM_4";
        SkillRange[SkillRange["ENEMY_MID_FRONT_RANDOM_5"] = 50] = "ENEMY_MID_FRONT_RANDOM_5";
        SkillRange[SkillRange["ENEMY_MID_FRONT_RANDOM_6"] = 51] = "ENEMY_MID_FRONT_RANDOM_6";
        SkillRange[SkillRange["ENEMY_MID_REAR_RANDOM_2"] = 52] = "ENEMY_MID_REAR_RANDOM_2";
        SkillRange[SkillRange["ENEMY_MID_REAR_RANDOM_3"] = 53] = "ENEMY_MID_REAR_RANDOM_3";
        SkillRange[SkillRange["ENEMY_MID_REAR_RANDOM_4"] = 54] = "ENEMY_MID_REAR_RANDOM_4";
        SkillRange[SkillRange["ENEMY_MID_REAR_RANDOM_5"] = 55] = "ENEMY_MID_REAR_RANDOM_5";
        SkillRange[SkillRange["ENEMY_MID_REAR_RANDOM_6"] = 56] = "ENEMY_MID_REAR_RANDOM_6";
        SkillRange[SkillRange["FRIEND_RANDOM"] = 101] = "FRIEND_RANDOM";
        SkillRange[SkillRange["FRIEND_RANDOM_2"] = 102] = "FRIEND_RANDOM_2";
        SkillRange[SkillRange["FRIEND_RANDOM_3"] = 103] = "FRIEND_RANDOM_3";
        SkillRange[SkillRange["FRIEND_RANDOM_4"] = 104] = "FRIEND_RANDOM_4";
        SkillRange[SkillRange["FRIEND_RANDOM_5"] = 105] = "FRIEND_RANDOM_5";
        SkillRange[SkillRange["FRIEND_RANDOM_6"] = 106] = "FRIEND_RANDOM_6";
        SkillRange[SkillRange["FRIEND_SELF_RANDOM"] = 111] = "FRIEND_SELF_RANDOM";
        SkillRange[SkillRange["FRIEND_SELF_RANDOM_2"] = 112] = "FRIEND_SELF_RANDOM_2";
        SkillRange[SkillRange["FRIEND_SELF_RANDOM_3"] = 113] = "FRIEND_SELF_RANDOM_3";
        SkillRange[SkillRange["FRIEND_SELF_RANDOM_4"] = 114] = "FRIEND_SELF_RANDOM_4";
        SkillRange[SkillRange["FRIEND_SELF_RANDOM_5"] = 115] = "FRIEND_SELF_RANDOM_5";
        SkillRange[SkillRange["FRIEND_SELF_RANDOM_6"] = 116] = "FRIEND_SELF_RANDOM_6";
        SkillRange[SkillRange["FRIEND_UNIQUE_RANDOM"] = 121] = "FRIEND_UNIQUE_RANDOM";
        SkillRange[SkillRange["FRIEND_UNIQUE_RANDOM_2"] = 122] = "FRIEND_UNIQUE_RANDOM_2";
        SkillRange[SkillRange["FRIEND_UNIQUE_RANDOM_3"] = 123] = "FRIEND_UNIQUE_RANDOM_3";
        SkillRange[SkillRange["FRIEND_UNIQUE_RANDOM_4"] = 124] = "FRIEND_UNIQUE_RANDOM_4";
        SkillRange[SkillRange["FRIEND_UNIQUE_RANDOM_5"] = 125] = "FRIEND_UNIQUE_RANDOM_5";
        SkillRange[SkillRange["FRIEND_UNIQUE_RANDOM_6"] = 126] = "FRIEND_UNIQUE_RANDOM_6";
        SkillRange[SkillRange["FRIEND_SELF_UNIQUE_RANDOM"] = 131] = "FRIEND_SELF_UNIQUE_RANDOM";
        SkillRange[SkillRange["FRIEND_SELF_UNIQUE_RANDOM_2"] = 132] = "FRIEND_SELF_UNIQUE_RANDOM_2";
        SkillRange[SkillRange["FRIEND_SELF_UNIQUE_RANDOM_3"] = 133] = "FRIEND_SELF_UNIQUE_RANDOM_3";
        SkillRange[SkillRange["FRIEND_SELF_UNIQUE_RANDOM_4"] = 134] = "FRIEND_SELF_UNIQUE_RANDOM_4";
        SkillRange[SkillRange["FRIEND_SELF_UNIQUE_RANDOM_5"] = 135] = "FRIEND_SELF_UNIQUE_RANDOM_5";
        SkillRange[SkillRange["FRIEND_SELF_UNIQUE_RANDOM_6"] = 136] = "FRIEND_SELF_UNIQUE_RANDOM_6";
        SkillRange[SkillRange["FORCED_SELF_RANDOM_1"] = 142] = "FORCED_SELF_RANDOM_1";
        SkillRange[SkillRange["FORCED_SELF_RANDOM_2"] = 143] = "FORCED_SELF_RANDOM_2";
        SkillRange[SkillRange["FORCED_SELF_RANDOM_3"] = 144] = "FORCED_SELF_RANDOM_3";
        SkillRange[SkillRange["FORCED_SELF_RANDOM_4"] = 145] = "FORCED_SELF_RANDOM_4";
        SkillRange[SkillRange["FORCED_SELF_UNIQUE_RANDOM_2"] = 153] = "FORCED_SELF_UNIQUE_RANDOM_2";
        SkillRange[SkillRange["FORCED_SELF_UNIQUE_RANDOM_3"] = 154] = "FORCED_SELF_UNIQUE_RANDOM_3";
        SkillRange[SkillRange["FORCED_SELF_UNIQUE_RANDOM_4"] = 155] = "FORCED_SELF_UNIQUE_RANDOM_4";
        SkillRange[SkillRange["BOTH_SIDES_SCALED"] = 202] = "BOTH_SIDES_SCALED";
        SkillRange[SkillRange["SELF_BOTH_SIDES_SCALED"] = 203] = "SELF_BOTH_SIDES_SCALED";
        SkillRange[SkillRange["ALL_SCALED"] = 204] = "ALL_SCALED";
        SkillRange[SkillRange["ENEMY_ALL_SCALED"] = 208] = "ENEMY_ALL_SCALED";
        SkillRange[SkillRange["ENEMY_FRONT_ALL_SCALED"] = 212] = "ENEMY_FRONT_ALL_SCALED";
        SkillRange[SkillRange["ENEMY_MID_ALL_SCALED"] = 213] = "ENEMY_MID_ALL_SCALED";
        SkillRange[SkillRange["ENEMY_REAR_ALL_SCALED"] = 214] = "ENEMY_REAR_ALL_SCALED";
        SkillRange[SkillRange["ENEMY_FRONT_MID_ALL_SCALED"] = 215] = "ENEMY_FRONT_MID_ALL_SCALED";
        SkillRange[SkillRange["ENEMY_FRONT_REAR_ALL_SCALED"] = 234] = "ENEMY_FRONT_REAR_ALL_SCALED";
        SkillRange[SkillRange["ENEMY_VARYING_RANDOM_4"] = 419] = "ENEMY_VARYING_RANDOM_4";
    })(SkillRange = ENUM.SkillRange || (ENUM.SkillRange = {}));
    var WardType;
    (function (WardType) {
        WardType[WardType["PHYSICAL"] = 1] = "PHYSICAL";
        WardType[WardType["MAGICAL"] = 2] = "MAGICAL";
        WardType[WardType["BREATH"] = 3] = "BREATH";
    })(WardType = ENUM.WardType || (ENUM.WardType = {}));
    var AfflictionType;
    (function (AfflictionType) {
        AfflictionType[AfflictionType["POISON"] = 1] = "POISON";
        AfflictionType[AfflictionType["PARALYSIS"] = 2] = "PARALYSIS";
        AfflictionType[AfflictionType["FROZEN"] = 3] = "FROZEN";
        AfflictionType[AfflictionType["DISABLE"] = 4] = "DISABLE";
        AfflictionType[AfflictionType["SILENT"] = 5] = "SILENT";
        AfflictionType[AfflictionType["CONFUSE"] = 6] = "CONFUSE";
        AfflictionType[AfflictionType["BLIND"] = 7] = "BLIND";
        AfflictionType[AfflictionType["BURN"] = 8] = "BURN";
    })(AfflictionType = ENUM.AfflictionType || (ENUM.AfflictionType = {}));
    var BattleTurnOrderType;
    (function (BattleTurnOrderType) {
        BattleTurnOrderType[BattleTurnOrderType["AGI"] = 0] = "AGI";
        BattleTurnOrderType[BattleTurnOrderType["ATK"] = 1] = "ATK";
        BattleTurnOrderType[BattleTurnOrderType["WIS"] = 2] = "WIS";
        BattleTurnOrderType[BattleTurnOrderType["DEF"] = 3] = "DEF";
        BattleTurnOrderType[BattleTurnOrderType["HP"] = 4] = "HP";
    })(BattleTurnOrderType = ENUM.BattleTurnOrderType || (ENUM.BattleTurnOrderType = {}));
    var FormationRow;
    (function (FormationRow) {
        FormationRow[FormationRow["REAR"] = 3] = "REAR";
        FormationRow[FormationRow["MID"] = 2] = "MID";
        FormationRow[FormationRow["FRONT"] = 1] = "FRONT";
    })(FormationRow = ENUM.FormationRow || (ENUM.FormationRow = {}));
    var FormationType;
    (function (FormationType) {
        FormationType[FormationType["SKEIN_5"] = 0] = "SKEIN_5";
        FormationType[FormationType["VALLEY_5"] = 1] = "VALLEY_5";
        FormationType[FormationType["TOOTH_5"] = 2] = "TOOTH_5";
        FormationType[FormationType["WAVE_5"] = 3] = "WAVE_5";
        FormationType[FormationType["FRONT_5"] = 4] = "FRONT_5";
        FormationType[FormationType["MID_5"] = 5] = "MID_5";
        FormationType[FormationType["REAR_5"] = 6] = "REAR_5";
        FormationType[FormationType["PIKE_5"] = 7] = "PIKE_5";
        FormationType[FormationType["SHIELD_5"] = 8] = "SHIELD_5";
        FormationType[FormationType["PINCER_5"] = 9] = "PINCER_5";
        FormationType[FormationType["SAW_5"] = 10] = "SAW_5";
        FormationType[FormationType["HYDRA_5"] = 11] = "HYDRA_5";
    })(FormationType = ENUM.FormationType || (ENUM.FormationType = {}));
    var BattleType;
    (function (BattleType) {
        BattleType[BattleType["BLOOD_CLASH"] = 1] = "BLOOD_CLASH";
        BattleType[BattleType["NORMAL"] = 2] = "NORMAL";
        BattleType[BattleType["COLISEUM"] = 3] = "COLISEUM";
    })(BattleType = ENUM.BattleType || (ENUM.BattleType = {}));
    var RandomBrigType;
    (function (RandomBrigType) {
        RandomBrigType[RandomBrigType["NONE"] = 0] = "NONE";
        RandomBrigType[RandomBrigType["ALL"] = 1] = "ALL";
        RandomBrigType[RandomBrigType["XP_ONLY"] = 2] = "XP_ONLY";
        RandomBrigType[RandomBrigType["X_ONLY"] = 3] = "X_ONLY";
        RandomBrigType[RandomBrigType["X_UP"] = 4] = "X_UP";
        RandomBrigType[RandomBrigType["SP_ONLY"] = 5] = "SP_ONLY";
        RandomBrigType[RandomBrigType["SP_UP"] = 6] = "SP_UP";
        RandomBrigType[RandomBrigType["S_ONLY"] = 7] = "S_ONLY";
        RandomBrigType[RandomBrigType["S_UP"] = 8] = "S_UP";
        RandomBrigType[RandomBrigType["AP_ONLY"] = 9] = "AP_ONLY";
        RandomBrigType[RandomBrigType["AP_UP"] = 10] = "AP_UP";
        RandomBrigType[RandomBrigType["A_ONLY"] = 11] = "A_ONLY";
        RandomBrigType[RandomBrigType["A_UP"] = 12] = "A_UP";
    })(RandomBrigType = ENUM.RandomBrigType || (ENUM.RandomBrigType = {}));
    var RandomBrigText;
    (function (RandomBrigText) {
        RandomBrigText[RandomBrigText["all"] = 1] = "all";
        RandomBrigText[RandomBrigText["Tier X+"] = 2] = "Tier X+";
        RandomBrigText[RandomBrigText["Tier X"] = 3] = "Tier X";
        RandomBrigText[RandomBrigText["Tier X and up"] = 4] = "Tier X and up";
        RandomBrigText[RandomBrigText["Tier S+"] = 5] = "Tier S+";
        RandomBrigText[RandomBrigText["Tier S+ and up"] = 6] = "Tier S+ and up";
        RandomBrigText[RandomBrigText["Tier S"] = 7] = "Tier S";
        RandomBrigText[RandomBrigText["Tier S and up"] = 8] = "Tier S and up";
        RandomBrigText[RandomBrigText["Tier A+"] = 9] = "Tier A+";
        RandomBrigText[RandomBrigText["Tier A+ and up"] = 10] = "Tier A+ and up";
        RandomBrigText[RandomBrigText["Tier A"] = 11] = "Tier A";
        RandomBrigText[RandomBrigText["Tier A and up"] = 12] = "Tier A and up";
    })(RandomBrigText = ENUM.RandomBrigText || (ENUM.RandomBrigText = {}));
    var MinorEventType;
    (function (MinorEventType) {
        MinorEventType[MinorEventType["HP"] = 1] = "HP";
        MinorEventType[MinorEventType["STATUS"] = 2] = "STATUS";
        MinorEventType[MinorEventType["AFFLICTION"] = 3] = "AFFLICTION";
        MinorEventType[MinorEventType["PROTECT"] = 4] = "PROTECT";
        MinorEventType[MinorEventType["DESCRIPTION"] = 5] = "DESCRIPTION";
        MinorEventType[MinorEventType["BATTLE_DESCRIPTION"] = 51] = "BATTLE_DESCRIPTION";
        MinorEventType[MinorEventType["TEXT"] = 6] = "TEXT";
        MinorEventType[MinorEventType["REVIVE"] = 7] = "REVIVE";
        MinorEventType[MinorEventType["RESERVE_SWITCH"] = 8] = "RESERVE_SWITCH";
        MinorEventType[MinorEventType["BC_ADDPROB"] = 9] = "BC_ADDPROB";
    })(MinorEventType = ENUM.MinorEventType || (ENUM.MinorEventType = {}));
    var RarityType;
    (function (RarityType) {
        RarityType[RarityType["COMMON"] = 1] = "COMMON";
        RarityType[RarityType["UNCOMMON"] = 2] = "UNCOMMON";
        RarityType[RarityType["RARE"] = 3] = "RARE";
        RarityType[RarityType["EPIC"] = 4] = "EPIC";
        RarityType[RarityType["LEGEND"] = 5] = "LEGEND";
        RarityType[RarityType["MYTHIC"] = 6] = "MYTHIC";
    })(RarityType = ENUM.RarityType || (ENUM.RarityType = {}));
    var BonusType;
    (function (BonusType) {
        BonusType[BonusType["COLISEUM"] = 1] = "COLISEUM";
    })(BonusType = ENUM.BonusType || (ENUM.BonusType = {}));
    var AddProbability;
    (function (AddProbability) {
        AddProbability[AddProbability["BLOODCLASH"] = 10] = "BLOODCLASH";
        AddProbability[AddProbability["COLISEUM"] = 3] = "COLISEUM";
    })(AddProbability = ENUM.AddProbability || (ENUM.AddProbability = {}));
})(ENUM || (ENUM = {}));
var BattleGraphic = (function () {
    function BattleGraphic() {
        this.coordArray = {
            1: [],
            2: []
        };
        if (BattleGraphic._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        BattleGraphic._instance = this;
        this.logger = BattleLogger.getInstance();
        this.battle = BattleModel.getInstance();
        this.cardMan = CardManager.getInstance();
    }
    BattleGraphic.getInstance = function () {
        if (BattleGraphic._instance === null) {
            throw new Error("You're not supposed to create this object this way");
        }
        return BattleGraphic._instance;
    };
    BattleGraphic.removeInstance = function () {
        BattleGraphic._instance = null;
    };
    BattleGraphic.prototype.displayFormationAndFamOnCanvas = function () {
        if (BattleGraphic.GRAPHIC_DISABLED) {
            return;
        }
        var playerFormations = {};
        playerFormations[1] = this.battle.player1.formation.getFormationConfig();
        var player2formation = this.battle.player2.formation.getFormationConfig();
        var temp = [];
        var tempNumber;
        for (var i = 0; i < 5; i++) {
            switch (player2formation[i]) {
                case 1:
                    tempNumber = 3;
                    break;
                case 2:
                    tempNumber = 2;
                    break;
                case 3:
                    tempNumber = 1;
                    break;
            }
            temp.push(tempNumber);
        }
        playerFormations[2] = temp;
        var wr = BattleGraphic.wr;
        var hr = BattleGraphic.hr;
        var draw = SVG('svg').size(wr * 400, hr * 600).attr('id', 'mainSvg').attr('class', 'svg');
        for (var player = 1; player <= 2; player++) {
            if (player === 2) {
                var skillImg = draw.image('img/skillBg.png', wr * 300, hr * 29).move(wr * 55, hr * 5).attr('id', 'p2SkillBg');
                var text = draw.text('placeholder').font({ size: wr * 14 }).fill({ color: '#fff' })
                    .attr('id', 'p2SkillText');
                draw.group().attr('id', 'p2SkillBgTextGroup').add(skillImg).add(text).opacity(0);
            }
            else if (player === 1) {
                skillImg = draw.image('img/skillBg.png', wr * 300, hr * 29).move(wr * 55, hr * 270).attr('id', 'p1SkillBg');
                text = draw.text('placeholder').font({ size: wr * 14 }).fill({ color: '#fff' })
                    .attr('id', 'p1SkillText');
                draw.group().attr('id', 'p1SkillBgTextGroup').add(skillImg).add(text).opacity(0).move(0, hr * 300);
            }
            var PLAYER_GROUP_WIDTH = wr * 350;
            var PLAYER_GROUP_HEIGHT = hr * 80;
            var horizontalStep = PLAYER_GROUP_WIDTH / 10;
            var verticalStep = PLAYER_GROUP_HEIGHT / 2;
            var coordArray = [];
            this.coordArray[player] = coordArray;
            var groupPlayer = draw.group().attr('id', "p" + player + "group");
            if ((BattleGraphic.HIDE_PLAYER1 && player === 1) || (BattleGraphic.HIDE_PLAYER2 && player === 2)) {
                groupPlayer.hide();
            }
            if (player === 1) {
                groupPlayer.move(wr * 30, wr * 400);
            }
            else if (player === 2) {
                groupPlayer.move(wr * 30, wr * 100);
            }
            for (var i = 0; i < 5; i++) {
                var bulletX = ((i + 1) * 2 - 1) * horizontalStep;
                var bulletY = (playerFormations[player][i] - 1) * verticalStep;
                coordArray.push([bulletX, bulletY]);
            }
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
            var imageLinksArray = [];
            var playerCards = this.cardMan.getPlayerCurrentMainCards(this.battle.getPlayerById(player));
            var reserveCards = this.cardMan.getPlayerOriginalReserveCards(this.battle.getPlayerById(player));
            for (var fam = 0; fam < playerCards.length; fam++) {
                imageLinksArray.push(getImageLink(playerCards[fam].imageLink, playerCards[fam].fullName, BattleGraphic.IMAGE_WIDTH_BIG));
            }
            for (var i = 0; i < 5; i++) {
                var image_x_coord = coordArray[i][0] - BattleGraphic.IMAGE_WIDTH / 2;
                var image_y_coord = coordArray[i][1] - BattleGraphic.IMAGE_WIDTH * 1.5 / 2;
                var image = draw.image(imageLinksArray[i])
                    .move(image_x_coord, image_y_coord)
                    .attr('id', "p" + player + "f" + i + "image")
                    .loaded(function (loader) {
                    this.size(BattleGraphic.IMAGE_WIDTH);
                });
                var damageText = draw.text('0').font({ size: wr * 22, family: BattleGraphic.FONT })
                    .attr({ fill: '#fff', stroke: '#000', 'stroke-width': hr * 2 + 'px' })
                    .center(coordArray[i][0], coordArray[i][1])
                    .attr('id', "p" + player + "f" + i + "damageText")
                    .opacity(0);
                var explosion = draw.image('img/explosion.png', wr * 70, wr * 70)
                    .move(image_x_coord, image_y_coord)
                    .attr('id', "p" + player + "f" + i + "explosion")
                    .opacity(0);
                var group = draw.group().attr('id', "p" + player + "f" + i + "group");
                group.add(image);
                group.add(damageText);
                group.add(explosion);
                var click = function (arg) {
                    var cardMan = CardManager.getInstance();
                    return function () {
                        var nestedImg = this.get(0);
                        var nestedImgHref = nestedImg.attr("href");
                        var card = cardMan.getOriginalMainCardByIndex(arg[0], arg[1]);
                        if (nestedImgHref !== getImageLink(card.imageLink, card.fullName, BattleGraphic.IMAGE_WIDTH_BIG)) {
                            card = cardMan.getOriginalReserveCardByIndex(arg[0], arg[1]);
                        }
                        showCardDetailDialog(cardMan.getCardInfoForDialog(card));
                    };
                };
                group.on('click', click([player, i]));
                groupPlayer.add(group);
                if (this.battle.isBloodClash) {
                    var reserve_img = new Image();
                    reserve_img.src = getImageLink(reserveCards[i].imageLink, reserveCards[i].fullName, BattleGraphic.IMAGE_WIDTH_BIG);
                }
            }
        }
    };
    BattleGraphic.prototype.resetInitialField = function () {
        for (var player = 1; player <= 2; player++) {
            for (var index = 0; index < 5; index++) {
                this.displayHP(100, player, index, 0);
                this.getAfflictionText(player, index).hide();
            }
        }
        this.displayAllCardImages(0);
    };
    BattleGraphic.prototype.displayAllCardImages = function (majorIndex) {
        var field = this.logger.getFieldAtMajorIndex(majorIndex);
        for (var p = 1; p <= 2; p++) {
            for (var f = 0; f < 5; f++) {
                var image = SVG.get("p" + p + "f" + f + "image");
                var card = field["player" + p + "Cards"][f];
                image.load(getImageLink(card.imageLink, card.fullName, BattleGraphic.IMAGE_WIDTH_BIG));
            }
        }
    };
    BattleGraphic.prototype.displayHP = function (percent, player, index, animDuration) {
        var draw = SVG.get('mainSvg');
        var image_x_coord = this.coordArray[player][index][0] - BattleGraphic.IMAGE_WIDTH / 2;
        var image_y_coord = this.coordArray[player][index][1] - BattleGraphic.IMAGE_WIDTH * 1.5 / 2;
        var xstart = Math.round(image_x_coord);
        var ystart = image_y_coord + BattleGraphic.IMAGE_WIDTH * 1.5;
        var width = BattleGraphic.IMAGE_WIDTH;
        var height = BattleGraphic.hr * 5;
        if (percent < 0) {
            percent = 0;
        }
        var hpbarId = "p" + player + "f" + index + "hp";
        var hpbar = SVG.get(hpbarId);
        if (!hpbar) {
            hpbar = draw.rect(width, height)
                .style({ 'stroke-width': BattleGraphic.wr * 1, 'stroke': '#000000' })
                .attr('id', hpbarId)
                .move(xstart, ystart);
            var groupId = "p" + player + "f" + index + "group";
            var group = SVG.get(groupId);
            group.add(hpbar);
        }
        var hpGradientId = "p" + player + "f" + index + "hpGradient";
        var hpGradient = SVG.get(hpGradientId);
        var duration = 1;
        if (!isNaN(animDuration)) {
            duration = animDuration;
        }
        if (!hpGradient) {
            hpGradient = draw.gradient('linear', function (stop) {
                stop.at({ offset: '100%', color: '#00ff00' }).attr('id', "p" + player + "f" + index + "hpgs1");
                stop.at({ offset: '100%', color: 'transparent' }).attr('id', "p" + player + "f" + index + "hpgs2");
            }).attr('id', hpGradientId);
            hpbar.fill(hpGradient);
        }
        else {
            var s1 = SVG.get("p" + player + "f" + index + "hpgs1");
            var s2 = SVG.get("p" + player + "f" + index + "hpgs2");
            s1.animate(duration + 's').update({ offset: percent + '%' });
            s2.animate(duration + 's').update({ offset: percent + '%' });
        }
        this.displayDeadAliveFamiliar(player, index, percent <= 0);
    };
    BattleGraphic.prototype.displayDamageTextAndHP = function (playerId, famIndex, majorIndex, minorIndex) {
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
            txtColor = '#00ff00';
        }
        var damageText = SVG.get("p" + playerId + "f" + famIndex + "damageText");
        damageText.text(txt).font({ size: BattleGraphic.wr * 22 }).attr({ fill: txtColor })
            .center(center_x, center_y).opacity(1).front();
        damageText.animate({ duration: '2s' }).opacity(0)
            .after(function () {
            this.text('-');
            this.center(center_x, center_y);
        });
        this.displayHP(stats.hp / originalStats.hp * 100, playerId, famIndex);
    };
    BattleGraphic.prototype.displayWard = function (playerId, famIndex, majorIndex, minorIndex) {
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
                return;
        }
        var wardImg = this.getWard(playerId, famIndex, type);
        wardImg.opacity(1).animate({ delay: '0.5s' }).opacity(0);
    };
    BattleGraphic.prototype.displayAfflictionText = function (playerId, famIndex, majorIndex, minorIndex) {
        var data = this.logger.minorEventLog[majorIndex][minorIndex];
        var svgAfflictTxt = this.getAfflictionText(playerId, famIndex);
        if (data.affliction.isFinished) {
            svgAfflictTxt.hide();
            svgAfflictTxt.text('-');
        }
        else {
            var text = Affliction.getAfflictionAdjective(data.affliction.type);
            svgAfflictTxt.text(text).show();
        }
    };
    BattleGraphic.prototype.displayAllAfflictionText = function (majorIndex) {
        var field = this.logger.getFieldAtMajorIndex(majorIndex);
        for (var player = 1; player <= 2; player++) {
            for (var fam = 0; fam < 5; fam++) {
                var svgAfflictTxt = this.getAfflictionText(player, fam);
                var data = field["player" + player + "Cards"][fam];
                if (!data.affliction) {
                    svgAfflictTxt.hide();
                    svgAfflictTxt.text('-');
                }
                else {
                    var text = Affliction.getAfflictionAdjective(data.affliction.type);
                    svgAfflictTxt.text(text).show();
                }
            }
        }
    };
    BattleGraphic.prototype.displayPostDamage = function (playerId, famIndex, majorIndex, minorIndex) {
        this.displayWard(playerId, famIndex, majorIndex, minorIndex);
        this.displayDamageTextAndHP(playerId, famIndex, majorIndex, minorIndex);
    };
    BattleGraphic.prototype.displayDeadAliveFamiliar = function (player, fam, isDead) {
        var image;
        if (ENUM.Setting.IS_MOBILE) {
            image = document.getElementById("p" + player + "f" + fam + "image");
            if (isDead) {
                image.style.opacity = 0.4;
            }
            else {
                image.style.opacity = 1;
            }
        }
        else {
            image = SVG.get("p" + player + "f" + fam + "image");
            var filter = SVG.get('darkenFilter');
            if (isDead) {
                if (!filter) {
                    image.filter(function (add) {
                        add.componentTransfer({
                            rgb: { type: 'linear', slope: 0.05 }
                        });
                    });
                    filter = image.filterer;
                    filter.attr('id', 'darkenFilter');
                    image.filter(filter);
                }
                else {
                    image.filter(filter);
                }
            }
            else {
                image.unfilter();
            }
            if (isDead) {
                image.style.opacity = 0.2;
            }
            else {
                image.style.opacity = 1;
            }
        }
    };
    BattleGraphic.prototype.displayMajorEventAnimation = function (majorIndex) {
        var majorLog = this.logger.majorEventLog;
        var that = this;
        if (majorIndex >= majorLog.length) {
            onBattleFinished();
            return;
        }
        if (!majorLog[majorIndex]) {
            if (BattleGraphic.PLAY_MODE === 'AUTO') {
                var nextIndex = +majorIndex + 1;
                this.displayMajorEventAnimation(nextIndex);
            }
            return;
        }
        if (BattleGraphic.PLAY_MODE === 'AUTO') {
            var autoCallback = function () {
                that.displayMajorEventAnimation(majorIndex + 1);
            };
        }
        if (majorLog[majorIndex].skillId && SkillDatabase[majorLog[majorIndex].skillId].isAutoAttack) {
            this.displayMinorEventAnimation(majorIndex, 0, { callback: autoCallback });
        }
        else {
            var callback = function () {
                that.displayMinorEventAnimation(majorIndex, 0, { callback: autoCallback });
            };
            this.displayProcSkill(majorLog[majorIndex].executorId, majorLog[majorIndex].skillId, { callback: callback });
        }
    };
    BattleGraphic.prototype.displayProcSkill = function (executorId, skillId, option) {
        if (!executorId || !skillId) {
            if (option.callback) {
                option.callback();
            }
            return;
        }
        var executor = this.cardMan.getCardById(executorId);
        var group = this.getCardImageGroup(executor);
        if (!option.noProcEffect) {
            var scaleFactor = 1.3;
            var cx_1 = group.cx();
            var cy_1 = group.cy();
            var D1_1 = 1, D05_1 = 0.5;
            if (option.durationRatio) {
                D1_1 *= option.durationRatio;
                D05_1 *= option.durationRatio;
            }
            if (Skill.isMagicSkill(skillId)) {
                var procEffect = this.getProcEffect(executor.getPlayerId(), executor.formationColumn, 'spellCircle');
            }
            else {
                procEffect = this.getProcEffect(executor.getPlayerId(), executor.formationColumn, 'lineSpark');
            }
            SVG.get("p" + executor.getPlayerId() + "f" + executor.formationColumn + "group").front();
            procEffect.opacity(1);
            procEffect.animate({ duration: '3s' })
                .rotate(180)
                .after(function () {
                this.rotate(0);
                this.remove();
            });
            group.animate({ duration: D1_1 + 's' })
                .transform({ a: scaleFactor, b: 0, c: 0, d: scaleFactor, e: cx_1 - scaleFactor * cx_1, f: cy_1 - scaleFactor * cy_1 })
                .after(function () {
                this.animate({ duration: D1_1 + 's', delay: D05_1 + 's' })
                    .transform({ a: 1, b: 0, c: 0, d: 1, e: cx_1 - 1 * cx_1, f: cy_1 - 1 * cy_1 })
                    .after(function () {
                    procEffect.opacity(0).remove();
                    if (option.callback)
                        option.callback();
                });
            });
        }
        var groupSkillBg = SVG.get("p" + executor.getPlayerId() + "SkillBgTextGroup");
        var svgText = SVG.get("p" + executor.getPlayerId() + "SkillText");
        var yText = BattleGraphic.hr * (executor.getPlayerId() === 1 ? 272 : 8);
        var skillName = SkillDatabase[skillId].name;
        svgText.text(skillName).move(BattleGraphic.wr * (55 + 150) - svgText.bbox().width / 2, yText);
        groupSkillBg.animate({ duration: '0.5s' }).opacity(1)
            .after(function () {
            this.animate({ duration: '0.5s', delay: '1.5s' })
                .opacity(0);
        });
    };
    BattleGraphic.prototype.displayMinorEventAnimation = function (majorIndex, minorIndex, option) {
        if (option === void 0) { option = {}; }
        var minorLog = this.logger.minorEventLog;
        if (!minorLog[majorIndex] || minorIndex >= minorLog[majorIndex].length) {
            if (option.callback) {
                option.callback();
            }
            return;
        }
        var data = minorLog[majorIndex][minorIndex];
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
            case ENUM.MinorEventType.DESCRIPTION:
                this.displayDescriptionEvent(majorIndex, minorIndex, option);
                break;
            case ENUM.MinorEventType.REVIVE:
                this.displayReviveEvent(majorIndex, minorIndex, option);
                break;
            case ENUM.MinorEventType.PROTECT:
                this.displayProtectEvent(majorIndex, minorIndex, option);
                break;
            case ENUM.MinorEventType.BATTLE_DESCRIPTION:
                this.displayBattleDescriptionEvent(majorIndex, minorIndex, option);
                break;
            default:
                throw new Error("Invalid minor event type!");
        }
    };
    BattleGraphic.prototype.displayBattleDescriptionEvent = function (majorIndex, minorIndex, option) {
        var minorLog = this.logger.minorEventLog;
        var data = minorLog[majorIndex][minorIndex];
        if (minorIndex < minorLog[majorIndex].length) {
            this.getMainBattleEffect().text(data.battleDesc).center(BattleGraphic.wr * 200, BattleGraphic.hr * 300)
                .opacity(1).animate({ duration: '3s' }).opacity(0).after(function () { this.text('-'); });
            this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
        }
    };
    BattleGraphic.prototype.displayStatusEvent = function (majorIndex, minorIndex, option) {
        var minorLog = this.logger.minorEventLog;
        var data = minorLog[majorIndex][minorIndex];
        if (minorIndex < minorLog[majorIndex].length) {
            var target = this.cardMan.getCardById(data.targetId);
            var center_x_1 = this.coordArray[target.getPlayerId()][target.formationColumn][0];
            var center_y_1 = this.coordArray[target.getPlayerId()][target.formationColumn][1];
            if (data.status.type === ENUM.StatusType.ATTACK_RESISTANCE ||
                data.status.type === ENUM.StatusType.MAGIC_RESISTANCE ||
                data.status.type === ENUM.StatusType.BREATH_RESISTANCE) {
                var ward = this.getWard(target.getPlayerId(), target.formationColumn, data.status.type);
                ward.opacity(1).animate({ delay: '0.5s' }).opacity(0);
            }
            else {
                var fontSize = BattleGraphic.wr * 18;
                if (data.status.isDispelled) {
                    var displayText = "dispelled";
                }
                else if (data.status.isClearDebuff) {
                    displayText = "cleared";
                }
                else if (data.status.isAllUp) {
                    displayText = "All Stats Up";
                    fontSize = BattleGraphic.wr * 15;
                }
                else if (data.status.type === ENUM.StatusType.WILL_ATTACK_AGAIN) {
                    displayText = "EXTRA ACT";
                }
                else if (data.status.type === ENUM.StatusType.ACTION_ON_DEATH) {
                    displayText = "Revive On";
                }
                else if (data.status.type === ENUM.StatusType.SKILL_PROBABILITY) {
                    displayText = "Prob." + (data.amount < 0 ? " Down" : " Up");
                }
                else if (data.status.type === ENUM.StatusType.HP_SHIELD) {
                    displayText = "HP Up";
                }
                else if (data.status.type === ENUM.StatusType.REMAIN_HP_ATK_UP) {
                    displayText = "HP/ATK";
                }
                else if (data.status.type === ENUM.StatusType.REMAIN_HP_DEF_UP) {
                    displayText = "HP/DEF";
                }
                else if (data.status.type === ENUM.StatusType.REMAIN_HP_WIS_UP) {
                    displayText = "HP/WIS";
                }
                else if (data.status.type === ENUM.StatusType.REMAIN_HP_AGI_UP) {
                    displayText = "HP/AGI";
                }
                else {
                    var upDownText = data.amount < 0 ? " Down" : " Up";
                    var statuses = Skill.getStatusModified(data.skillId);
                    displayText = ENUM.StatusType[statuses[0]] + upDownText;
                    if (statuses[1]) {
                        var displayText2 = ENUM.StatusType[statuses[1]] + upDownText;
                        displayText = displayText + "\n" + displayText2;
                    }
                }
                var damageText = SVG.get("p" + target.getPlayerId() + "f" + target.formationColumn + "damageText");
                damageText.text(displayText).center(center_x_1, center_y_1).font({ size: fontSize })
                    .opacity(1).animate({ delay: '0.5s' }).opacity(0)
                    .after(function () {
                    this.text('-');
                    this.center(center_x_1, center_y_1);
                });
            }
            this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
        }
    };
    BattleGraphic.prototype.displayReviveEvent = function (majorIndex, minorIndex, option) {
        var minorLog = this.logger.minorEventLog;
        var data = minorLog[majorIndex][minorIndex];
        var executor = this.cardMan.getCardById(data.executorId);
        var executorGroup = this.getCardImageGroup(executor);
        executorGroup.front();
        SVG.get("p" + executor.getPlayerId() + "group").front();
        if (minorIndex < minorLog[majorIndex].length) {
            var target = this.cardMan.getCardById(data.targetId);
            var playerId = target.getPlayerId();
            var index = target.formationColumn;
            var center_x_2 = this.coordArray[playerId][index][0];
            var center_y_2 = this.coordArray[playerId][index][1];
            var damageText = SVG.get("p" + playerId + "f" + index + "damageText");
            damageText.text("REVIVED").center(center_x_2, center_y_2).font({ size: BattleGraphic.wr * 18 })
                .opacity(1).animate({ delay: '0.5s' }).opacity(0)
                .after(function () {
                this.text('-');
                this.center(center_x_2, center_y_2);
            });
            this.displayHP(data.reviveHPRatio * 100, playerId, index);
            this.getAfflictionText(playerId, index).hide().text('-').center(center_x_2, center_y_2);
            this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
        }
    };
    BattleGraphic.prototype.displayProtectEvent = function (majorIndex, minorIndex, option) {
        var minorLog = this.logger.minorEventLog;
        var data = minorLog[majorIndex][minorIndex];
        var that = this;
        var executor = this.cardMan.getCardById(data.executorId);
        var executorGroup = this.getCardImageGroup(executor);
        var x1 = executorGroup.rbox().x;
        var y1 = executorGroup.rbox().y;
        executorGroup.front();
        SVG.get("p" + executor.getPlayerId() + "group").front();
        if (minorIndex < minorLog[majorIndex].length) {
            var protectedCard = this.cardMan.getCardById(data.protect.protectedId);
            var protectedGroup = this.getCardImageGroup(protectedCard);
            var attackerCard_1 = this.cardMan.getCardById(data.protect.attackerId);
            var attackerGroup_1 = this.getCardImageGroup(attackerCard_1);
            var x_protected = protectedGroup.rbox().x;
            var y_protected = protectedGroup.rbox().y;
            var x_attacker_1 = attackerGroup_1.rbox().x;
            var y_attacker_1 = attackerGroup_1.rbox().y;
            this.displayProcSkill(executor.id, data.skillId, { noProcEffect: true });
            var y_offset = 70;
            if (executor.getPlayerId() === 1) {
                y_offset *= -1;
            }
            var moveTime = 0.5;
            var moveBackTime_1 = 0.5;
            if (data.protect.counter && Skill.isIndirectSkill(data.protect.counteredSkillId)) {
                moveTime = 0.1;
                moveBackTime_1 = 0.1;
            }
            var nextData_1 = minorLog[majorIndex][minorIndex + 1];
            var explosion_1 = SVG.get("p" + executor.getPlayerId() + "f" + executor.formationColumn + "explosion");
            executorGroup.animate({ duration: moveTime + 's' })
                .move(x_protected - x1, y_protected - y1 + y_offset)
                .after(function () {
                if (Skill.isIndirectSkill(nextData_1.skillId)) {
                    var exploDuration = 0.2;
                    if (Skill.isWisAutoAttack(nextData_1.skillId)) {
                        var procEffect = that.getProcEffect(attackerCard_1.getPlayerId(), attackerCard_1.formationColumn, 'spellCircle');
                        procEffect.animate({ duration: '0.2s' }).opacity(1);
                        exploDuration = 0.5;
                    }
                    else if (Skill.isAtkAutoAttack(nextData_1.skillId)) {
                        procEffect = that.getProcEffect(attackerCard_1.getPlayerId(), attackerCard_1.formationColumn, 'lineSpark');
                        procEffect.animate({ duration: '0.2s' }).opacity(1);
                        exploDuration = 0.5;
                    }
                    explosion_1.animate({ duration: exploDuration + 's' }).opacity(1)
                        .after(function () {
                        explosion_1.opacity(0);
                        if (procEffect) {
                            procEffect.remove();
                        }
                        that.displayPostDamage(executor.getPlayerId(), executor.formationColumn, majorIndex, minorIndex + 1);
                        executorGroup.animate({ duration: moveBackTime_1 + 's' })
                            .move(0, 0)
                            .after(function () {
                            that.displayMinorEventAnimation(majorIndex, minorIndex + 2, option);
                        });
                    });
                }
                else {
                    SVG.get("p" + attackerCard_1.getPlayerId() + "group").front();
                    attackerGroup_1.animate({ duration: '0.5s' })
                        .move(executorGroup.rbox().x - x_attacker_1, executorGroup.rbox().y - y_attacker_1)
                        .after(function () {
                        explosion_1.opacity(1);
                        that.displayPostDamage(executor.getPlayerId(), executor.formationColumn, majorIndex, minorIndex + 1);
                        attackerGroup_1.animate({ duration: '0.3s' }).move(0, 0);
                        executorGroup.animate({ duration: moveBackTime_1 + 's' })
                            .move(0, 0)
                            .after(function () {
                            explosion_1.opacity(0);
                            that.displayMinorEventAnimation(majorIndex, minorIndex + 2, option);
                        });
                    });
                }
            });
        }
    };
    BattleGraphic.prototype.displayReserveSwitchEvent = function (majorIndex, minorIndex, option) {
        var minorLog = this.logger.minorEventLog;
        var data = minorLog[majorIndex][minorIndex];
        var that = this;
        if (minorIndex < minorLog[majorIndex].length) {
            var main = this.cardMan.getCardById(data.reserveSwitch.mainId);
            var reserve = this.cardMan.getCardById(data.reserveSwitch.reserveId);
            var group = this.getCardImageGroup(main);
            var mainId = main.getPlayerId();
            var image = this.getCardImage(main);
            var newLink = getImageLink(reserve.imageLink, reserve.fullName, BattleGraphic.IMAGE_WIDTH_BIG);
            image.load(newLink);
            var y_offset = mainId === 1 ? 255 : -255;
            group.move(0, y_offset).animate(1000).move(0, 0).after(function () {
                that.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
            });
            this.displayHP(100, mainId, main.formationColumn, 0);
            this.getAfflictionText(mainId, main.formationColumn).hide().text('-');
        }
    };
    BattleGraphic.prototype.displayDescriptionEvent = function (majorIndex, minorIndex, option) {
        var minorLog = this.logger.minorEventLog;
        var data = minorLog[majorIndex][minorIndex];
        var that = this;
        var executor = this.cardMan.getCardById(data.executorId);
        var executorGroup = this.getCardImageGroup(executor);
        executorGroup.front();
        SVG.get("p" + executor.getPlayerId() + "group").front();
        if (minorIndex < minorLog[majorIndex].length) {
            if (!data.noProcEffect) {
                this.displayProcSkill(executor.id, data.skillId, {
                    callback: function () {
                        that.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
                    },
                    durationRatio: 0.5,
                });
            }
            else {
                this.displayProcSkill(executor.id, data.skillId, {
                    noProcEffect: true
                });
                this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
            }
        }
    };
    BattleGraphic.prototype.displayBcAddProbEvent = function (majorIndex, minorIndex, option) {
        var minorLog = this.logger.minorEventLog;
        var data = minorLog[majorIndex][minorIndex];
        if (minorIndex < minorLog[majorIndex].length) {
            if (data.bcAddProb.isMain) {
                var target = this.cardMan.getCardById(data.bcAddProb.targetId);
                var center_x_3 = this.coordArray[target.getPlayerId()][target.formationColumn][0];
                var center_y_3 = this.coordArray[target.getPlayerId()][target.formationColumn][1];
                var damageText = SVG.get("p" + target.getPlayerId() + "f" + target.formationColumn + "damageText");
                var bonusProb = this.battle.isColiseum ? ENUM.AddProbability.COLISEUM : ENUM.AddProbability.BLOODCLASH;
                damageText.text("+" + bonusProb + "%").center(center_x_3, center_y_3).font({ size: BattleGraphic.wr * 25 })
                    .opacity(1).animate({ delay: '2s' }).opacity(0)
                    .after(function () {
                    this.text('-');
                    this.center(center_x_3, center_y_3);
                });
            }
            this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
        }
    };
    BattleGraphic.prototype.displayAfflictionEvent = function (majorIndex, minorIndex, option) {
        var minorLog = this.logger.minorEventLog;
        var data = minorLog[majorIndex][minorIndex];
        if (minorIndex < minorLog[majorIndex].length) {
            var target = this.cardMan.getCardById(data.targetId);
            this.displayAfflictionText(target.getPlayerId(), target.formationColumn, majorIndex, minorIndex);
            this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
        }
    };
    BattleGraphic.prototype.displayHpChangeEvent = function (majorIndex, minorIndex, option) {
        var minorLog = this.logger.minorEventLog;
        var data = minorLog[majorIndex][minorIndex];
        if (minorIndex < minorLog[majorIndex].length) {
            var target = this.cardMan.getCardById(data.targetId);
            this.displayPostDamage(target.getPlayerId(), target.formationColumn, majorIndex, minorIndex);
            this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
        }
    };
    BattleGraphic.prototype.displayBattleEvent = function (majorIndex, minorIndex, option) {
        var minorLog = this.logger.minorEventLog;
        var majorLog = this.logger.majorEventLog;
        var data = minorLog[majorIndex][minorIndex];
        var that = this;
        var target = this.cardMan.getCardById(data.targetId);
        var targetGroup = this.getCardImageGroup(target);
        var x = targetGroup.rbox().x;
        var y = targetGroup.rbox().y;
        var executor = this.cardMan.getCardById(data.executorId);
        var executorGroup = this.getCardImageGroup(executor);
        var x1 = executorGroup.rbox().x;
        var y1 = executorGroup.rbox().y;
        executorGroup.front();
        SVG.get("p" + executor.getPlayerId() + "group").front();
        var explosion = SVG.get("p" + target.getPlayerId() + "f" + target.formationColumn + "explosion");
        if (Skill.isAoeSkill(data.skillId)) {
            var exploSet = [];
            if (data.executorId === majorLog[majorIndex].executorId && data.skillId === majorLog[majorIndex].skillId) {
                var aoeTargets = this.logger.getTargetsInMajorEvent(majorIndex);
            }
            else {
                aoeTargets = this.logger.getNestedTargetsInMajorEvent(majorIndex, minorIndex);
                var isNested = true;
            }
            if ((isNested && option.noNestedAttackAnim) || (!isNested && option.noAttackAnim)) {
                var noAttackAnim = true;
            }
            for (var i = 0; i < aoeTargets.length; i++) {
                var exploTargetCol = this.cardMan.getCardById(aoeTargets[i]).formationColumn;
                exploSet.push(SVG.get("p" + target.getPlayerId() + "f" + exploTargetCol + "explosion"));
            }
            if (noAttackAnim) {
                this.displayPostDamage(target.getPlayerId(), target.formationColumn, majorIndex, minorIndex);
                this.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
            }
            else {
                var exploDuration = 0.4;
                if (Skill.isWisAutoAttack(data.skillId)) {
                    var procEffect = this.getProcEffect(executor.getPlayerId(), executor.formationColumn, 'spellCircle');
                    procEffect.animate({ duration: '0.2s' }).opacity(1);
                    exploDuration = 0.8;
                }
                else if (Skill.isAtkAutoAttack(data.skillId)) {
                    procEffect = this.getProcEffect(executor.getPlayerId(), executor.formationColumn, 'lineSpark');
                    procEffect.animate({ duration: '0.2s' }).opacity(1);
                    exploDuration = 0.8;
                }
                if (!isNested) {
                    option.noAttackAnim = true;
                }
                else {
                    option.noNestedAttackAnim = true;
                }
                var getCallback = function (graphic, majorIndex, minorIndex, option, target, procEffect, exploSet) {
                    return function () {
                        for (var i_1 = 0; i_1 < exploSet.length; i_1++) {
                            exploSet[i_1].opacity(0);
                        }
                        if (procEffect) {
                            procEffect.remove();
                        }
                        graphic.displayPostDamage(target.getPlayerId(), target.formationColumn, majorIndex, minorIndex);
                        graphic.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
                    };
                };
                for (i = 0; i < exploSet.length; i++) {
                    if (i === exploSet.length - 1) {
                        var callback = getCallback(that, majorIndex, minorIndex, option, target, procEffect, exploSet);
                    }
                    exploSet[i].animate({ duration: exploDuration + 's' }).opacity(1).after(callback);
                }
            }
        }
        else if (Skill.isIndirectSkill(data.skillId)) {
            exploDuration = 0.2;
            if (Skill.isWisAutoAttack(data.skillId)) {
                procEffect = this.getProcEffect(executor.getPlayerId(), executor.formationColumn, 'spellCircle');
                procEffect.animate({ duration: '0.2s' }).opacity(1);
                exploDuration = 0.4;
            }
            explosion.animate({ duration: exploDuration + 's' })
                .opacity(1)
                .after(function () {
                explosion.opacity(0);
                if (procEffect) {
                    procEffect.remove();
                }
                that.displayPostDamage(target.getPlayerId(), target.formationColumn, majorIndex, minorIndex);
                that.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
            });
        }
        else {
            executorGroup.animate({ duration: '0.5s' })
                .move(x - x1, y - y1)
                .after(function () {
                if (!data.missed) {
                    explosion.opacity(1);
                }
                that.displayPostDamage(target.getPlayerId(), target.formationColumn, majorIndex, minorIndex);
                this.animate({ duration: '0.5s' })
                    .move(0, 0)
                    .after(function () {
                    explosion.opacity(0);
                    that.displayMinorEventAnimation(majorIndex, minorIndex + 1, option);
                });
            });
        }
    };
    BattleGraphic.prototype.getCardImage = function (card) {
        return SVG.get("p" + card.getPlayerId() + "f" + card.formationColumn + "image");
    };
    BattleGraphic.prototype.getCardImageGroup = function (card) {
        return SVG.get("p" + card.getPlayerId() + "f" + card.formationColumn + "group");
    };
    BattleGraphic.prototype.getWard = function (playerId, famIndex, type) {
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
        var ward = SVG.get("p" + playerId + "f" + famIndex + wardTxt);
        if (!ward) {
            ward = SVG.get('mainSvg').image("img/" + wardFileName, BattleGraphic.wr * 70, BattleGraphic.wr * 70)
                .center(this.coordArray[playerId][famIndex][0], this.coordArray[playerId][famIndex][1])
                .attr('id', "p" + playerId + "f" + famIndex + wardTxt)
                .opacity(0);
            SVG.get("p" + playerId + "f" + famIndex + "group").add(ward);
        }
        return ward;
    };
    BattleGraphic.prototype.getAfflictionText = function (playerId, famIndex) {
        var txt = SVG.get("p" + playerId + "f" + famIndex + "afflictText");
        if (!txt) {
            txt = SVG.get('mainSvg').text('Paralyzed').font({ size: BattleGraphic.wr * 14, family: BattleGraphic.FONT })
                .attr({ fill: '#fff', stroke: '#000', 'stroke-width': BattleGraphic.AFFLICTION_TEXT_STROKE_WIDTH })
                .center(this.coordArray[playerId][famIndex][0], this.coordArray[playerId][famIndex][1] +
                BattleGraphic.IMAGE_WIDTH * 1.5 / 2 + BattleGraphic.hr * 20)
                .attr('id', "p" + playerId + "f" + famIndex + "afflictText")
                .hide();
            SVG.get("p" + playerId + "f" + famIndex + "group").add(txt);
        }
        return txt;
    };
    BattleGraphic.prototype.getProcEffect = function (playerId, famIndex, type) {
        var file = type === "spellCircle" ? "circle_blue.png" : "lineSpark.png";
        var effect = SVG.get('mainSvg').image("img/" + file, BattleGraphic.wr * 150, BattleGraphic.wr * 150)
            .center(this.coordArray[playerId][famIndex][0], this.coordArray[playerId][famIndex][1])
            .attr('id', "p" + playerId + "f" + famIndex + "spellCircle")
            .opacity(0);
        SVG.get("p" + playerId + "f" + famIndex + "group").add(effect);
        return effect;
    };
    BattleGraphic.prototype.getMainBattleEffect = function () {
        var txt = SVG.get('battleText');
        if (!txt) {
            txt = SVG.get('mainSvg').text('0').font({ size: BattleGraphic.wr * 24, family: BattleGraphic.FONT })
                .attr({ fill: '#fff', stroke: '#000', 'stroke-width': BattleGraphic.AFFLICTION_TEXT_STROKE_WIDTH })
                .center(BattleGraphic.wr * 200, BattleGraphic.hr * 300)
                .attr('id', 'battleText')
                .opacity(0);
        }
        return txt;
    };
    BattleGraphic.HIDE_PLAYER1 = false;
    BattleGraphic.HIDE_PLAYER2 = false;
    BattleGraphic.GRAPHIC_DISABLED = false;
    BattleGraphic.SHOW_FORMATION_LINE = false;
    BattleGraphic.wr = (ENUM.Setting.IS_MOBILE && typeof window !== 'undefined') ? window.innerWidth / 400 : 1;
    BattleGraphic.hr = (ENUM.Setting.IS_MOBILE && typeof window !== 'undefined') ? window.innerHeight / 600 : 1;
    BattleGraphic.IMAGE_WIDTH = Math.floor(BattleGraphic.wr * 70);
    BattleGraphic.IMAGE_WIDTH_BIG = Math.floor(BattleGraphic.wr * 120);
    BattleGraphic.PLAY_MODE = 'MANUAL';
    BattleGraphic.FONT = 'Alegreya Sans, Cooper Black';
    BattleGraphic.AFFLICTION_TEXT_STROKE_WIDTH = BattleGraphic.wr + 'px';
    BattleGraphic._instance = null;
    return BattleGraphic;
}());
var BattleLogger = (function () {
    function BattleLogger() {
        this.minorEventLog = [];
        this.minorEventFields = [];
        this.majorEventLog = [];
        this.currentTurn = 0;
        if (BattleLogger._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        BattleLogger._instance = this;
    }
    BattleLogger.getInstance = function () {
        if (BattleLogger._instance === null) {
            BattleLogger._instance = new BattleLogger();
        }
        return BattleLogger._instance;
    };
    BattleLogger.removeInstance = function () {
        BattleLogger._instance = null;
    };
    BattleLogger.prototype.addMajorEvent = function (event) {
        if (BattleModel.IS_MASS_SIMULATION) {
            return;
        }
        event.turn = this.currentTurn;
        this.majorEventLog.push(event);
    };
    BattleLogger.prototype.addMinorEvent = function (event) {
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
    };
    BattleLogger.prototype.displayInfoText = function () {
        if (BattleLogger.INFOTEXT_DISPLAYED) {
            return;
        }
        var cardManager = CardManager.getInstance();
        var battle = BattleModel.getInstance();
        var p1randTxt = this.getRandomModeText(+battle.p1RandomMode);
        var p2randTxt = this.getRandomModeText(+battle.p2RandomMode);
        var infoDivP1 = ENUM.Setting.IS_MOBILE ? $("#infoDivP1mobile")[0] : $("#infoDivP1")[0];
        var infoDivP2 = ENUM.Setting.IS_MOBILE ? $("#infoDivP2mobile")[0] : $("#infoDivP2")[0];
        var infoDivP1Title = ENUM.Setting.IS_MOBILE ? $("#infoDivP1TitleMobile")[0] : $("#infoDivP1Title")[0];
        var infoDivP2Title = ENUM.Setting.IS_MOBILE ? $("#infoDivP2TitleMobile")[0] : $("#infoDivP2Title")[0];
        if (!battle.p1RandomMode || !BattleModel.IS_MASS_SIMULATION) {
            infoDivP1.innerHTML = cardManager.getPlayerMainBrigString(battle.player1);
        }
        if (!battle.p2RandomMode || !BattleModel.IS_MASS_SIMULATION) {
            infoDivP2.innerHTML = cardManager.getPlayerMainBrigString(battle.player2);
        }
        if (battle.isBloodClash) {
            if (!battle.p1RandomMode || !BattleModel.IS_MASS_SIMULATION) {
                infoDivP1.innerHTML += "<br><br>" + cardManager.getPlayerReserveBrigString(battle.player1);
            }
            if (!battle.p2RandomMode || !BattleModel.IS_MASS_SIMULATION) {
                infoDivP2.innerHTML += "<br><br>" + cardManager.getPlayerReserveBrigString(battle.player2);
            }
        }
        infoDivP1Title.innerHTML += p1randTxt;
        infoDivP2Title.innerHTML += p2randTxt;
        BattleLogger.INFOTEXT_DISPLAYED = true;
    };
    BattleLogger.prototype.displayWarningText = function () {
        if (BattleLogger.WARNINGTEXT_DISPLAYED) {
            return;
        }
        var needWarn = true;
        var cardManager = CardManager.getInstance();
        var battle = BattleModel.getInstance();
        var p1main = cardManager.getPlayerCurrentMainCards(battle.player1);
        var p2main = cardManager.getPlayerCurrentMainCards(battle.player2);
        var dbId1 = p1main[0].dbId;
        var dbId2 = p2main[0].dbId;
        for (var i = 1; i < 5; i++) {
            if (p1main[i].dbId !== dbId1 || p2main[i].dbId !== dbId2) {
                needWarn = false;
                break;
            }
        }
        if (battle.isBloodClash) {
            var p1res = cardManager.getPlayerOriginalReserveCards(battle.player1);
            var p2res = cardManager.getPlayerOriginalReserveCards(battle.player2);
            for (var i = 0; i < 5; i++) {
                if (p1res[i].dbId !== dbId1 || p2res[i].dbId !== dbId2) {
                    needWarn = false;
                    break;
                }
            }
        }
        if (dbId1 === dbId2)
            needWarn = false;
        if (needWarn) {
            var simDiv = document.getElementById("simDiv");
            var gameDiv = document.getElementById("gameDiv");
            var warnTxt = "<p><b>Note:</b> It seems that you using a 5v5 or 10v10 battle to determine whether " + p1main[0].name + " or " + p2main[0].name + " is \"stronger\". This is <b>NOT</b> a recommended way of comparing two familiars.</p>";
            simDiv.innerHTML += warnTxt;
            gameDiv.innerHTML += warnTxt;
        }
        BattleLogger.WARNINGTEXT_DISPLAYED = true;
    };
    BattleLogger.prototype.getRandomModeText = function (type) {
        switch (type) {
            case ENUM.RandomBrigType.ALL:
            case ENUM.RandomBrigType.XP_ONLY:
            case ENUM.RandomBrigType.X_ONLY:
            case ENUM.RandomBrigType.X_UP:
            case ENUM.RandomBrigType.SP_ONLY:
            case ENUM.RandomBrigType.SP_UP:
            case ENUM.RandomBrigType.S_ONLY:
            case ENUM.RandomBrigType.S_UP:
            case ENUM.RandomBrigType.AP_ONLY:
            case ENUM.RandomBrigType.AP_UP:
            case ENUM.RandomBrigType.A_ONLY:
            case ENUM.RandomBrigType.A_UP:
                return " (random " + ENUM.RandomBrigText[type] + ")";
            default:
                return "";
        }
    };
    BattleLogger.prototype.getFieldAtMajorIndex = function (majorIndex) {
        if (!this.minorEventLog[majorIndex]) {
            return this.getFieldAtMajorIndex(majorIndex - 1);
        }
        var minorLogLength = this.minorEventLog[majorIndex].length;
        var minorFieldsLength = this.minorEventFields[majorIndex].length;
        if (minorLogLength !== minorFieldsLength) {
            throw new Error("Log length and stored fields length are not equal!");
        }
        return JSON.parse(this.minorEventFields[majorIndex][minorFieldsLength - 1]);
    };
    BattleLogger.prototype.getFieldAtMinorIndex = function (majorIndex, minorIndex) {
        return JSON.parse(this.minorEventFields[majorIndex][minorIndex]);
    };
    BattleLogger.prototype.getCurrentFieldJSON = function () {
        var toSerialize = {
            player1Cards: getSerializableObjectArray(BattleModel.getInstance().p1_mainCards),
            player2Cards: getSerializableObjectArray(BattleModel.getInstance().p2_mainCards)
        };
        return JSON.stringify(toSerialize);
    };
    BattleLogger.prototype.getTargetsInMajorEvent = function (majorIndex) {
        var targets = [];
        var majorEvent = this.majorEventLog[majorIndex];
        for (var i = 0; i < this.minorEventLog[majorIndex].length; i++) {
            var tmpData = this.minorEventLog[majorIndex][i];
            if (tmpData.executorId === majorEvent.executorId && tmpData.skillId === majorEvent.skillId) {
                targets.push(tmpData.targetId);
            }
        }
        return targets;
    };
    BattleLogger.prototype.getNestedTargetsInMajorEvent = function (majorIndex, minorIndex) {
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
    };
    BattleLogger.prototype.startBattleLog = function () {
        if (BattleModel.IS_MASS_SIMULATION) {
            return;
        }
        this.addMajorEvent({ description: "Battle start" });
        this.addMinorEvent({
            type: ENUM.MinorEventType.TEXT,
            description: "Everything ready"
        });
    };
    BattleLogger.INFOTEXT_DISPLAYED = false;
    BattleLogger.WARNINGTEXT_DISPLAYED = false;
    BattleLogger._instance = null;
    return BattleLogger;
}());
var Affliction = (function () {
    function Affliction(type) {
        this.type = type;
        this.finished = false;
    }
    Affliction.getAfflictionAdjective = function (type) {
        switch (type) {
            case ENUM.AfflictionType.BLIND:
                return "Blinded";
            case ENUM.AfflictionType.DISABLE:
                return "Disabled";
            case ENUM.AfflictionType.FROZEN:
                return "Frozen";
            case ENUM.AfflictionType.PARALYSIS:
                return "Paralyzed";
            case ENUM.AfflictionType.POISON:
                return "Poisoned";
            case ENUM.AfflictionType.SILENT:
                return "Silent";
            case ENUM.AfflictionType.CONFUSE:
                return "Confused";
            case ENUM.AfflictionType.BURN:
                return "Burned";
            default:
                throw new Error("Invalid affliction type!");
        }
    };
    Affliction.prototype.canAttack = function () {
        throw new Error("Implement this");
    };
    Affliction.prototype.canUseSkill = function () {
        return this.canAttack();
    };
    Affliction.prototype.canMiss = function () {
        return false;
    };
    Affliction.prototype.update = function (card) {
        throw new Error("Implement this");
    };
    Affliction.prototype.add = function (option) {
    };
    Affliction.prototype.isFinished = function () {
        return this.finished;
    };
    Affliction.prototype.clear = function () {
        this.finished = true;
    };
    Affliction.prototype.getType = function () {
        return this.type;
    };
    Affliction.canConfuse = function (skillType) {
        return skillType === ENUM.SkillType.ACTIVE;
    };
    return Affliction;
}());
var BrigGenerator = (function () {
    function BrigGenerator() {
    }
    BrigGenerator.getRandomBrig = function (randomMode, isBloodclash) {
        var randomList = FamProvider.getRandomFamList(+randomMode);
        var brigIds = [];
        var maxIndex = isBloodclash ? 9 : 4;
        if (isBloodclash) {
            var randIndex = getRandomInt(0, maxIndex);
            brigIds[randIndex] = getRandomElement(FamProvider.getWarlordList());
        }
        for (var i = 0; i <= maxIndex; i++) {
            if (!brigIds[i]) {
                brigIds[i] = getRandomElement(randomList);
            }
        }
        return brigIds;
    };
    BrigGenerator.initializeBrigs = function (data, option) {
        if (option === void 0) { option = {}; }
        var battle = BattleModel.getInstance();
        var isBloodClash = battle.isBloodClash;
        var p1_cardIds = [];
        var p2_cardIds = [];
        var p1_warlordSkillIds = [];
        var p2_warlordSkillIds = [];
        if (option.p1RandomMode) {
            p1_cardIds = BrigGenerator.getRandomBrig(option.p1RandomMode, isBloodClash);
            p1_warlordSkillIds = BrigGenerator.getSmartWarlordSkills();
        }
        else {
            p1_cardIds = data.p1_cardIds;
            p1_warlordSkillIds = data.p1_warlordSkillIds;
        }
        if (option.p2RandomMode) {
            p2_cardIds = BrigGenerator.getRandomBrig(option.p2RandomMode, isBloodClash);
            p2_warlordSkillIds = BrigGenerator.getSmartWarlordSkills();
        }
        else {
            p2_cardIds = data.p2_cardIds;
            p2_warlordSkillIds = data.p2_warlordSkillIds;
        }
        for (var i = 0; i < 10; i++) {
            if (i >= 5 && !isBloodClash)
                break;
            var p1_cardInfo = famDatabase[p1_cardIds[i]];
            var p2_cardInfo = famDatabase[p2_cardIds[i]];
            var p1fSkillIdArray = p1_cardInfo.skills;
            if (p1_cardInfo.isWarlord) {
                p1fSkillIdArray = p1_warlordSkillIds;
            }
            if (data.p1_customSkills[i]) {
                p1fSkillIdArray = data.p1_customSkills[i];
            }
            var p2fSkillIdArray = p2_cardInfo.skills;
            if (p2_cardInfo.isWarlord) {
                p2fSkillIdArray = p2_warlordSkillIds;
            }
            if (data.p2_customSkills[i]) {
                p2fSkillIdArray = data.p2_customSkills[i];
            }
            var player1Skills = this.makeSkillArray(p1fSkillIdArray);
            var player2Skills = this.makeSkillArray(p2fSkillIdArray);
            var bonusType = void 0;
            if (battle.isColiseum) {
                bonusType = ENUM.BonusType.COLISEUM;
            }
            var card1 = new Card(p1_cardIds[i], battle.player1, i, player1Skills, data.p1_customStats[i], bonusType);
            var card2 = new Card(p2_cardIds[i], battle.player2, i, player2Skills, data.p2_customStats[i], bonusType);
            if (i < 5) {
                battle.p1_mainCards[i] = card1;
                battle.p2_mainCards[i] = card2;
                battle.p1_originalMainCards[i] = card1;
                battle.p2_originalMainCards[i] = card2;
                battle.allCurrentMainCards.push(card1);
                battle.allCurrentMainCards.push(card2);
            }
            else if (i >= 5 && isBloodClash) {
                battle.p1_reserveCards[i % 5] = card1;
                battle.p2_reserveCards[i % 5] = card2;
                battle.p1_originalReserveCards[i % 5] = card1;
                battle.p2_originalReserveCards[i % 5] = card2;
            }
            battle.allCardsById[card1.id] = card1;
            battle.allCardsById[card2.id] = card2;
        }
    };
    BrigGenerator.makeSkillArray = function (skillIds) {
        var skillArray = [];
        for (var i = 0; i < 3; i++) {
            if (skillIds[i] && +skillIds[i] !== 0) {
                skillArray.push(new Skill(skillIds[i]));
            }
        }
        return skillArray;
    };
    BrigGenerator.getSmartWarlordSkills = function () {
        var choosenCategory = getRandomUniqueElements(SkillProvider.skillCategories, 3);
        var skills = [];
        for (var i = 0; i < choosenCategory.length; i++) {
            switch (choosenCategory[i]) {
                case ENUM.SkillCategory.OPENING:
                    skills.push(getRandomElement(SkillProvider.getAvailableOpeningSkillList()));
                    break;
                case ENUM.SkillCategory.ACTIVE:
                    skills.push(getRandomElement(SkillProvider.getAvailableActiveSkillList()));
                    break;
                case ENUM.SkillCategory.REACTIVE:
                    skills.push(getRandomElement(SkillProvider.getAvailableReactiveSkillList()));
                    break;
                case ENUM.SkillCategory.ACTION_ON_DEATH:
                    skills.push(getRandomElement(SkillProvider.getAvailableOnDeathSkillList()));
                    break;
                default:
                    throw new Error("Invalid skill category");
            }
        }
        return skills;
    };
    return BrigGenerator;
}());
var Stats = (function () {
    function Stats(hp, atk, def, wis, agi) {
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.wis = wis;
        this.agi = agi;
    }
    return Stats;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BlindAffliction = (function (_super) {
    __extends(BlindAffliction, _super);
    function BlindAffliction() {
        var _this = _super.call(this, ENUM.AfflictionType.BLIND) || this;
        _this.missProb = 0;
        _this.finished = false;
        _this.validTurnNum = 0;
        return _this;
    }
    BlindAffliction.prototype.canAttack = function () {
        return true;
    };
    BlindAffliction.prototype.canMiss = function () {
        return Math.random() <= this.missProb;
    };
    BlindAffliction.prototype.update = function () {
        if (--this.validTurnNum <= 0) {
            this.clear();
        }
    };
    BlindAffliction.prototype.add = function (option) {
        this.validTurnNum = option.turnNum;
        this.missProb = option.missProb;
    };
    return BlindAffliction;
}(Affliction));
var BurnAffliction = (function (_super) {
    __extends(BurnAffliction, _super);
    function BurnAffliction() {
        var _this = _super.call(this, ENUM.AfflictionType.BURN) || this;
        _this.damage = 0;
        _this.values = [];
        return _this;
    }
    BurnAffliction.prototype.canAttack = function () {
        return true;
    };
    BurnAffliction.prototype.update = function (card) {
        BattleModel.getInstance().damageToTargetDirectly(card, this.damage, "burn");
    };
    BurnAffliction.prototype.add = function (option) {
        var arr = this.values;
        arr.push(option.damage);
        arr.sort(function (a, b) { return b - a; });
        this.damage = 0;
        for (var i = 0; i < BurnAffliction.STACK_NUM; i++) {
            if (arr[i]) {
                this.damage += arr[i];
            }
        }
    };
    BurnAffliction.STACK_NUM = 3;
    return BurnAffliction;
}(Affliction));
var ConfuseAffliction = (function (_super) {
    __extends(ConfuseAffliction, _super);
    function ConfuseAffliction() {
        var _this = _super.call(this, ENUM.AfflictionType.CONFUSE) || this;
        _this.validTurnNum = 0;
        return _this;
    }
    ConfuseAffliction.prototype.canAttack = function () {
        return true;
    };
    ConfuseAffliction.prototype.update = function () {
        if (--this.validTurnNum <= 0) {
            this.clear();
        }
    };
    ConfuseAffliction.prototype.add = function (option) {
        this.validTurnNum = option.turnNum;
        this.confuseProb = option.confuseProb;
    };
    return ConfuseAffliction;
}(Affliction));
var DisabledAffliction = (function (_super) {
    __extends(DisabledAffliction, _super);
    function DisabledAffliction() {
        return _super.call(this, ENUM.AfflictionType.DISABLE) || this;
    }
    DisabledAffliction.prototype.canAttack = function () {
        return this.isFinished();
    };
    DisabledAffliction.prototype.update = function () {
        this.clear();
    };
    return DisabledAffliction;
}(Affliction));
var FrozenAffliction = (function (_super) {
    __extends(FrozenAffliction, _super);
    function FrozenAffliction() {
        return _super.call(this, ENUM.AfflictionType.FROZEN) || this;
    }
    FrozenAffliction.prototype.canAttack = function () {
        return this.isFinished();
    };
    FrozenAffliction.prototype.update = function () {
        this.clear();
    };
    return FrozenAffliction;
}(Affliction));
var ParalysisAffliction = (function (_super) {
    __extends(ParalysisAffliction, _super);
    function ParalysisAffliction() {
        return _super.call(this, ENUM.AfflictionType.PARALYSIS) || this;
    }
    ParalysisAffliction.prototype.canAttack = function () {
        return this.isFinished();
    };
    ParalysisAffliction.prototype.update = function () {
        this.clear();
    };
    return ParalysisAffliction;
}(Affliction));
var PoisonAffliction = (function (_super) {
    __extends(PoisonAffliction, _super);
    function PoisonAffliction() {
        var _this = _super.call(this, ENUM.AfflictionType.POISON) || this;
        _this.percent = 0;
        _this.finished = false;
        return _this;
    }
    PoisonAffliction.prototype.canAttack = function () {
        return true;
    };
    PoisonAffliction.prototype.update = function (card) {
        var damage = Math.floor(card.originalStats.hp * this.percent / 100);
        if (damage > PoisonAffliction.MAX_DAMAGE) {
            damage = PoisonAffliction.MAX_DAMAGE;
        }
        BattleModel.getInstance().damageToTargetDirectly(card, damage, "poison");
    };
    PoisonAffliction.prototype.add = function (option) {
        var percent = option.percent;
        if (!percent) {
            percent = PoisonAffliction.DEFAULT_PERCENT;
        }
        this.percent += percent;
        var maxPercent = percent * PoisonAffliction.MAX_STACK_NUM;
        if (this.percent > maxPercent) {
            this.percent = maxPercent;
        }
    };
    PoisonAffliction.DEFAULT_PERCENT = 5;
    PoisonAffliction.MAX_STACK_NUM = 2;
    PoisonAffliction.MAX_DAMAGE = 99999;
    return PoisonAffliction;
}(Affliction));
var SilentAffliction = (function (_super) {
    __extends(SilentAffliction, _super);
    function SilentAffliction() {
        var _this = _super.call(this, ENUM.AfflictionType.SILENT) || this;
        _this.validTurnNum = 0;
        return _this;
    }
    SilentAffliction.prototype.canAttack = function () {
        return true;
    };
    SilentAffliction.prototype.canUseSkill = function () {
        return this.isFinished();
    };
    SilentAffliction.prototype.update = function () {
        if (--this.validTurnNum <= 0) {
            this.clear();
        }
    };
    SilentAffliction.prototype.add = function (option) {
        this.validTurnNum = option.turnNum;
    };
    return SilentAffliction;
}(Affliction));
var AfflictionFactory = (function () {
    function AfflictionFactory() {
    }
    AfflictionFactory.getAffliction = function (type) {
        switch (type) {
            case ENUM.AfflictionType.BLIND:
                return new BlindAffliction();
            case ENUM.AfflictionType.DISABLE:
                return new DisabledAffliction();
            case ENUM.AfflictionType.FROZEN:
                return new FrozenAffliction();
            case ENUM.AfflictionType.PARALYSIS:
                return new ParalysisAffliction();
            case ENUM.AfflictionType.POISON:
                return new PoisonAffliction();
            case ENUM.AfflictionType.SILENT:
                return new SilentAffliction();
            case ENUM.AfflictionType.BURN:
                return new BurnAffliction();
            case ENUM.AfflictionType.CONFUSE:
                return new ConfuseAffliction();
            default:
                throw new Error("Invalid affliction type!");
        }
    };
    return AfflictionFactory;
}());
var Card = (function () {
    function Card(dbId, player, nth, skills, customStats, bonusType) {
        this.bcAddedProb = 0;
        this.lastBattleDamageTaken = 0;
        this.lastBattleDamageDealt = 0;
        this.justMissed = false;
        this.justEvaded = false;
        this.passiveSkills = [];
        this.openingSkills = [];
        this.activeSkills = [];
        this.protectSkills = [];
        this.defenseSkills = [];
        this.ondeathSkills = [null, null];
        this.surviveSkill = null;
        var cardData = famDatabase[dbId];
        this.name = cardData.name;
        this.fullName = cardData.fullName;
        this.dbId = dbId;
        this.id = player.id * 100 + nth;
        this.isMounted = cardData.isMounted;
        this.isWarlord = cardData.isWarlord;
        this.imageLink = cardData.img;
        this.rarity = cardData.rarity;
        this.evoStep = cardData.evo;
        if (!customStats) {
            this.stats = new Stats(cardData.stats[0], cardData.stats[1], cardData.stats[2], cardData.stats[3], cardData.stats[4]);
            this.originalStats = new Stats(cardData.stats[0], cardData.stats[1], cardData.stats[2], cardData.stats[3], cardData.stats[4]);
        }
        else {
            this.stats = new Stats(customStats.hp, customStats.atk, customStats.def, customStats.wis, customStats.agi);
            this.originalStats = new Stats(customStats.hp, customStats.atk, customStats.def, customStats.wis, customStats.agi);
        }
        if (bonusType === ENUM.BonusType.COLISEUM) {
            this.stats.hp *= Card.COLISEUM_HP_MULTI_FACTOR;
            this.originalStats.hp *= Card.COLISEUM_HP_MULTI_FACTOR;
        }
        this.status = new Status();
        this.isDead = false;
        this.player = player;
        this.formationColumn = nth % 5;
        this.formationRow = player.formation.getCardRow(this.formationColumn);
        this.procIndex = Formation.getProcIndex(this.formationRow, this.formationColumn);
        this.skills = skills;
        if (cardData.autoAttack) {
            this.autoAttack = new Skill(cardData.autoAttack);
        }
        else {
            this.autoAttack = new Skill(10000);
        }
        for (var i = 0; i < skills.length; i++) {
            var skill = skills[i];
            if (skill) {
                if (skill.skillType === ENUM.SkillType.OPENING) {
                    this.openingSkills.push(skill);
                }
                else if (skill.skillType === ENUM.SkillType.ACTIVE) {
                    this.activeSkills.push(skill);
                }
                else if (skill.skillType === ENUM.SkillType.PROTECT || skill.skillType === ENUM.SkillType.EVADE) {
                    this.protectSkills.push(skill);
                }
                else if (skill.skillType === ENUM.SkillType.DEFENSE) {
                    if (skill.skillFunc === ENUM.SkillFunc.SURVIVE) {
                        this.surviveSkill = skill;
                    }
                    else {
                        this.defenseSkills.push(skill);
                    }
                }
                else if (skill.skillType === ENUM.SkillType.ACTION_ON_DEATH) {
                    this.ondeathSkills[1] = skill;
                }
            }
        }
        if (cardData.passiveSkills) {
            this.passiveSkills.push(new Skill(cardData.passiveSkills[0]));
            assert(!cardData.passiveSkills[1], "More than one passive skill is not implemented!");
        }
    }
    Card.prototype.getSerializableObject = function () {
        return {
            name: this.name,
            fullName: this.fullName,
            dbId: this.dbId,
            id: this.id,
            isMounted: this.isMounted,
            isWarlord: this.isWarlord,
            imageLink: this.imageLink,
            rarity: this.rarity,
            evoStep: this.evoStep,
            stats: this.stats,
            originalStats: this.originalStats,
            status: this.status,
            affliction: this.affliction,
            isDead: this.isDead,
            bcAddedProb: this.bcAddedProb,
            lastBattleDamageTaken: this.lastBattleDamageTaken,
            lastBattleDamageDealt: this.lastBattleDamageDealt,
            justMissed: this.justMissed,
            justEvaded: this.justEvaded,
            player: this.player,
            formationColumn: this.formationColumn,
            formationRow: this.formationRow,
            procIndex: this.procIndex,
            skills: getSerializableObjectArray(this.skills),
            autoAttack: this.autoAttack.getSerializableObject(),
            openingSkills: getSerializableObjectArray(this.openingSkills),
            activeSkills: getSerializableObjectArray(this.activeSkills),
            protectSkills: getSerializableObjectArray(this.protectSkills),
            defenseSkills: getSerializableObjectArray(this.defenseSkills),
            ondeathSkills: getSerializableObjectArray(this.ondeathSkills),
            surviveSkill: this.surviveSkill ? this.surviveSkill.getSerializableObject() : null,
            passiveSkills: getSerializableObjectArray(this.passiveSkills),
        };
    };
    Card.prototype.getRandomOpeningSkill = function () {
        if (this.openingSkills.length === 0) {
            return null;
        }
        else {
            return getRandomElement(this.openingSkills);
        }
    };
    Card.prototype.getRandomActiveSkill = function () {
        if (this.activeSkills.length === 0) {
            return null;
        }
        else {
            return getRandomElement(this.activeSkills);
        }
    };
    Card.prototype.getRandomDefenseSkill = function () {
        if (this.defenseSkills.length === 0) {
            return null;
        }
        else {
            return getRandomElement(this.defenseSkills);
        }
    };
    Card.prototype.getRandomProtectSkill = function () {
        if (this.protectSkills.length === 0) {
            return null;
        }
        else {
            return getRandomElement(this.protectSkills);
        }
    };
    Card.prototype.getSurviveSkill = function () {
        return this.surviveSkill;
    };
    Card.prototype.getFirstActiveSkill = function () {
        return this.activeSkills[0];
    };
    Card.prototype.getSecondActiveSkill = function () {
        return this.activeSkills[1];
    };
    Card.prototype.getBuffOnDeathSkill = function () {
        return this.ondeathSkills[0];
    };
    Card.prototype.getInherentOnDeathSkill = function () {
        return this.ondeathSkills[1];
    };
    Card.prototype.hasOnDeathSkill = function () {
        return (this.ondeathSkills[0] != null) || (this.ondeathSkills[1] != null);
    };
    Card.prototype.clearBuffOnDeathSkill = function () {
        this.ondeathSkills[0] = null;
        this.status.actionOnDeath = 0;
    };
    Card.prototype.getPassiveSkill = function () {
        return this.passiveSkills[0];
    };
    Card.prototype.getName = function () {
        return this.name;
    };
    Card.prototype.getPlayerId = function () {
        return this.player.id;
    };
    Card.prototype.getPlayerName = function () {
        return this.player.name;
    };
    Card.prototype.getFormationRow = function () {
        return this.formationRow;
    };
    Card.prototype.getStat = function (statType) {
        if (statType === "HP") {
            return this.getHP();
        }
        else if (statType === "ATK") {
            return this.getATK();
        }
        else if (statType === "DEF") {
            return this.getDEF();
        }
        else if (statType === "WIS") {
            return this.getWIS();
        }
        else if (statType === "AGI") {
            return this.getAGI();
        }
        else if (statType === "DEFAULT") {
            return this.getWIS();
        }
        else {
            throw new Error("Invalid stat type");
        }
    };
    Card.prototype.getOriginalStat = function (statType) {
        switch (statType) {
            case "HP":
                return this.originalStats.hp;
            case "ATK":
                return this.originalStats.atk;
            case "DEF":
                return this.originalStats.def;
            case "WIS":
                return this.originalStats.wis;
            case "AGI":
                return this.originalStats.agi;
            default:
                throw new Error("Invalid StatType!");
        }
    };
    Card.prototype.setAffliction = function (type, option) {
        if (this.affliction) {
            if (this.affliction.getType() === type) {
                this.affliction.add(option);
                return;
            }
            else {
                this.clearAffliction();
            }
        }
        this.affliction = AfflictionFactory.getAffliction(type);
        this.affliction.add(option);
    };
    Card.prototype.clearAffliction = function () {
        if (!this.affliction) {
            return;
        }
        this.affliction.clear();
        this.affliction = null;
    };
    Card.prototype.canAttack = function () {
        return (this.affliction) ? this.affliction.canAttack() : true;
    };
    Card.prototype.canUseSkill = function () {
        return (this.affliction) ? this.affliction.canUseSkill() : true;
    };
    Card.prototype.willMiss = function () {
        return (this.affliction) ? this.affliction.canMiss() : false;
    };
    Card.prototype.canConfuse = function () {
        return this.hasAffliction(ENUM.AfflictionType.CONFUSE);
    };
    Card.prototype.hasAffliction = function (type) {
        if (this.isDead) {
            return false;
        }
        var currentType = this.getAfflictionType();
        return currentType === type;
    };
    Card.prototype.getAfflictionType = function () {
        return this.affliction ? this.affliction.getType() : null;
    };
    Card.prototype.getPoisonPercent = function () {
        if (!this.affliction || this.affliction.type !== ENUM.AfflictionType.POISON) {
            return undefined;
        }
        else {
            return this.affliction.percent;
        }
    };
    Card.prototype.getBurnDamage = function () {
        if (!this.affliction || this.affliction.type !== ENUM.AfflictionType.BURN) {
            return undefined;
        }
        else {
            return this.affliction.damage;
        }
    };
    Card.prototype.getConfuseProb = function () {
        if (!this.affliction || this.affliction.type !== ENUM.AfflictionType.CONFUSE) {
            return undefined;
        }
        else {
            return this.affliction.confuseProb;
        }
    };
    Card.prototype.updateAffliction = function () {
        if (!this.affliction) {
            return false;
        }
        this.affliction.update(this);
        if (this.affliction && this.affliction.isFinished()) {
            this.clearAffliction();
            return true;
        }
        return false;
    };
    Card.prototype.changeStatus = function (statusType, amount, isNewLogic, maxAmount) {
        if (isNewLogic) {
            this.status.isNewLogic[statusType] = true;
        }
        switch (statusType) {
            case ENUM.StatusType.ATK:
                this.status.atk += amount;
                break;
            case ENUM.StatusType.DEF:
                this.status.def += amount;
                break;
            case ENUM.StatusType.WIS:
                this.status.wis += amount;
                break;
            case ENUM.StatusType.AGI:
                this.status.agi += amount;
                break;
            case ENUM.StatusType.ATTACK_RESISTANCE:
                if (this.status.attackResistance < amount)
                    this.status.attackResistance = amount;
                break;
            case ENUM.StatusType.MAGIC_RESISTANCE:
                if (this.status.magicResistance < amount)
                    this.status.magicResistance = amount;
                break;
            case ENUM.StatusType.BREATH_RESISTANCE:
                if (this.status.breathResistance < amount)
                    this.status.breathResistance = amount;
                break;
            case ENUM.StatusType.SKILL_PROBABILITY:
                this.status.skillProbability += amount;
                break;
            case ENUM.StatusType.REMAIN_HP_ATK_UP:
                if (this.status.remainHpAtkUp < amount)
                    this.status.remainHpAtkUp = amount;
                break;
            case ENUM.StatusType.REMAIN_HP_DEF_UP:
                if (this.status.remainHpDefUp < amount)
                    this.status.remainHpDefUp = amount;
                break;
            case ENUM.StatusType.REMAIN_HP_WIS_UP:
                if (this.status.remainHpWisUp < amount)
                    this.status.remainHpWisUp = amount;
                break;
            case ENUM.StatusType.REMAIN_HP_AGI_UP:
                if (this.status.remainHpAgiUp < amount)
                    this.status.remainHpAgiUp = amount;
                break;
            case ENUM.StatusType.WILL_ATTACK_AGAIN:
                if (this.status.willAttackAgain < amount)
                    this.status.willAttackAgain = amount;
                break;
            case ENUM.StatusType.ACTION_ON_DEATH:
                var skill = new Skill(amount);
                this.ondeathSkills[0] = skill;
                this.status.actionOnDeath = amount;
                break;
            case ENUM.StatusType.HP_SHIELD:
                this.status.hpShield += amount;
                if (maxAmount && this.status.hpShield > maxAmount) {
                    this.status.hpShield = maxAmount;
                }
                break;
            default:
                throw new Error("Invalid status type");
        }
    };
    Card.prototype.clearAllStatus = function (condFunc) {
        for (var key in this.status) {
            if (this.status.hasOwnProperty(key) && typeof this.status[key] === "number") {
                if (condFunc(this.status[key])) {
                    this.status[key] = 0;
                }
            }
        }
        if (this.status.actionOnDeath === 0) {
            this.clearBuffOnDeathSkill();
        }
    };
    Card.prototype.hasStatus = function (condFunc) {
        var hasStatus = false;
        for (var key in this.status) {
            if (this.status.hasOwnProperty(key) && typeof this.status[key] === "number") {
                if (condFunc(this.status[key])) {
                    hasStatus = true;
                    break;
                }
            }
        }
        return hasStatus;
    };
    Card.prototype.getHP = function () {
        return this.stats.hp;
    };
    Card.prototype.getOriginalHP = function () {
        return this.originalStats.hp;
    };
    Card.prototype.changeHP = function (amount) {
        this.stats.hp += amount;
        if (this.stats.hp > this.originalStats.hp) {
            this.stats.hp = this.originalStats.hp;
        }
        if (this.stats.hp <= 0) {
            this.stats.hp = 0;
            this.setDead();
        }
    };
    Card.prototype.isFullHealth = function () {
        return this.stats.hp === this.originalStats.hp;
    };
    Card.prototype.getHpRatio = function () {
        return this.stats.hp / this.originalStats.hp;
    };
    Card.prototype.setDead = function () {
        this.isDead = true;
        this.clearAffliction();
        this.status = new Status();
    };
    Card.prototype.revive = function (hpRatio) {
        if (!this.isDead) {
            throw new Error("You can't revive a card that is not dead!");
        }
        this.isDead = false;
        this.status = new Status();
        this.stats.hp = this.originalStats.hp * hpRatio;
    };
    Card.prototype.getATK = function () {
        var value = this.stats.atk;
        if (this.status.remainHpAtkUp > 1) {
            var hpRatio = this.getHpRatio();
            value += Math.round(value * (1 - hpRatio) * (this.status.remainHpAtkUp - 1));
        }
        value += this.status.atk;
        if (value < 0) {
            value = 0;
        }
        value = this.adjustByNewDebuffLogic(ENUM.StatusType.ATK, value, this.originalStats.atk);
        return value;
    };
    Card.prototype.getDEF = function () {
        var value = this.stats.def;
        if (this.status.remainHpDefUp > 1) {
            var hpRatio = this.getHpRatio();
            value += Math.round(value * (1 - hpRatio) * (this.status.remainHpDefUp - 1));
        }
        value += this.status.def;
        if (value < 0) {
            value = 0;
        }
        value = this.adjustByNewDebuffLogic(ENUM.StatusType.DEF, value, this.originalStats.def);
        return value;
    };
    Card.prototype.getWIS = function () {
        var value = this.stats.wis;
        if (this.status.remainHpWisUp > 1) {
            var hpRatio = this.getHpRatio();
            value += Math.round(value * (1 - hpRatio) * (this.status.remainHpWisUp - 1));
        }
        value += this.status.wis;
        if (value < 0) {
            value = 0;
        }
        value = this.adjustByNewDebuffLogic(ENUM.StatusType.WIS, value, this.originalStats.wis);
        return value;
    };
    Card.prototype.getAGI = function () {
        var value = this.stats.agi;
        if (this.status.remainHpAgiUp > 1) {
            var hpRatio = this.getHpRatio();
            value += Math.round(value * (1 - hpRatio) * (this.status.remainHpAgiUp - 1));
        }
        value += this.status.agi;
        if (value < 0) {
            value = 0;
        }
        value = this.adjustByNewDebuffLogic(ENUM.StatusType.AGI, value, this.originalStats.agi);
        return value;
    };
    Card.prototype.getPassiveDamageEffect = function (target) {
        var passiveSkill = this.passiveSkills[0];
        if (passiveSkill && passiveSkill.skillFunc === ENUM.SkillFunc.DAMAGE_PASSIVE) {
            return passiveSkill.logic.getEffectRatio(this, target, passiveSkill);
        }
        else {
            return 1;
        }
    };
    Card.prototype.getPassiveReceivedDamageEffect = function (attacker) {
        var passiveSkill = this.passiveSkills[0];
        if (passiveSkill && passiveSkill.skillFunc === ENUM.SkillFunc.DEFENSE_PASSIVE) {
            return passiveSkill.logic.getEffectRatio(this, attacker, passiveSkill);
        }
        else {
            return 1;
        }
    };
    Card.prototype.getPassiveAfflictionProbabilityBuffEffect = function (target) {
        var passiveSkill = this.passiveSkills[0];
        if (passiveSkill && passiveSkill.skillFunc === ENUM.SkillFunc.AFFLICTION_PROB_BUFF_PASSIVE) {
            return passiveSkill.logic.getEffectRatio(this, target, passiveSkill);
        }
        else {
            return 1;
        }
    };
    Card.prototype.getPassiveAffliction = function (target) {
        var passiveSkill = this.passiveSkills[0];
        if (passiveSkill && passiveSkill.skillFunc === ENUM.SkillFunc.AFFLICTION_PASSIVE) {
            return passiveSkill.logic.getAfflictionPassive(this, target, passiveSkill);
        }
        else {
            return null;
        }
    };
    Card.prototype.adjustByNewDebuffLogic = function (type, value, originalValue) {
        if (this.status.isNewLogic[type]) {
            var lowerLimit = originalValue * Card.NEW_DEBUFF_LOW_LIMIT_FACTOR;
            value = (value > lowerLimit) ? value : lowerLimit;
        }
        return value;
    };
    Card.prototype.hasWardOfType = function (type) {
        switch (type) {
            case ENUM.WardType.PHYSICAL:
                return this.status.attackResistance !== 0;
            case ENUM.WardType.MAGICAL:
                return this.status.magicResistance !== 0;
            case ENUM.WardType.BREATH:
                return this.status.breathResistance !== 0;
            default:
                throw new Error("Invalid type of ward!");
        }
    };
    Card.prototype.clearDamagePhaseData = function () {
        this.lastBattleDamageDealt = 0;
        this.lastBattleDamageTaken = 0;
        this.justMissed = false;
        this.justEvaded = false;
    };
    Card.NEW_DEBUFF_LOW_LIMIT_FACTOR = 0.4;
    Card.COLISEUM_HP_MULTI_FACTOR = 3;
    return Card;
}());
var CardManager = (function () {
    function CardManager() {
        if (CardManager._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        CardManager._instance = this;
        this.battle = BattleModel.getInstance();
    }
    CardManager.getInstance = function () {
        if (CardManager._instance === null) {
            CardManager._instance = new CardManager();
        }
        return CardManager._instance;
    };
    CardManager.removeInstance = function () {
        CardManager._instance = null;
    };
    CardManager.prototype.getSortFunc = function (type) {
        switch (type) {
            case ENUM.BattleTurnOrderType.AGI:
                return function (a, b) { return b.getAGI() - a.getAGI(); };
            case ENUM.BattleTurnOrderType.ATK:
                return function (a, b) { return b.getATK() - a.getATK(); };
            case ENUM.BattleTurnOrderType.DEF:
                return function (a, b) { return b.getDEF() - a.getDEF(); };
            case ENUM.BattleTurnOrderType.WIS:
                return function (a, b) { return b.getWIS() - a.getWIS(); };
            default:
                throw new Error("Invalid turn order type!");
        }
    };
    CardManager.prototype.sortAllCurrentMainCards = function () {
        var sortFunc = this.getSortFunc(this.battle.turnOrderBase);
        this.battle.allCurrentMainCards.sort(sortFunc);
    };
    CardManager.prototype.getPlayerCurrentMainCardsByProcOrder = function (player) {
        var playerCards = this.getPlayerCurrentMainCards(player);
        var copy = [];
        for (var i = 0; i < playerCards.length; i++) {
            copy.push(playerCards[i]);
        }
        copy.sort(function (a, b) { return a.procIndex - b.procIndex; });
        return copy;
    };
    CardManager.prototype.getLeftSideCard = function (card) {
        var playerCards = this.getPlayerCurrentMainCards(card.player);
        var column = card.formationColumn;
        if (column === 0) {
            return null;
        }
        else if (column <= 4 && column >= 1) {
            return playerCards[column - 1];
        }
        else {
            throw new Error("Invalid card index");
        }
    };
    CardManager.prototype.getRightSideCard = function (card) {
        var playerCards = this.getPlayerCurrentMainCards(card.player);
        var column = card.formationColumn;
        if (column === 4) {
            return null;
        }
        else if (column >= 0 && column <= 3) {
            return playerCards[column + 1];
        }
        else {
            throw new Error("Invalid card index");
        }
    };
    CardManager.prototype.getCardById = function (id) {
        return this.battle.allCardsById[id];
    };
    CardManager.prototype.getPlayerCurrentMainCards = function (player) {
        var battle = this.battle;
        if (player === battle.player1) {
            return battle.p1_mainCards;
        }
        else if (player === battle.player2) {
            return battle.p2_mainCards;
        }
        else {
            throw new Error("Invalid player");
        }
    };
    CardManager.prototype.getPlayerCurrentReserveCards = function (player) {
        var battle = this.battle;
        if (player === battle.player1) {
            return battle.p1_reserveCards;
        }
        else if (player === battle.player2) {
            return battle.p2_reserveCards;
        }
        else {
            throw new Error("Invalid player");
        }
    };
    CardManager.prototype.getPlayerOriginalMainCards = function (player) {
        var battle = this.battle;
        if (player === battle.player1) {
            return battle.p1_originalMainCards;
        }
        else if (player === battle.player2) {
            return battle.p2_originalMainCards;
        }
        else {
            throw new Error("Invalid player");
        }
    };
    CardManager.prototype.getPlayerOriginalReserveCards = function (player) {
        var battle = this.battle;
        if (player === battle.player1) {
            return battle.p1_originalReserveCards;
        }
        else if (player === battle.player2) {
            return battle.p2_originalReserveCards;
        }
        else {
            throw new Error("Invalid player");
        }
    };
    CardManager.prototype.getPlayerAllCurrentCards = function (player) {
        return this.getPlayerCurrentMainCards(player).concat(this.getPlayerCurrentReserveCards(player));
    };
    CardManager.prototype.getEnemyCurrentMainCards = function (player) {
        var battle = this.battle;
        if (player === battle.player1) {
            return battle.p2_mainCards;
        }
        else if (player === battle.player2) {
            return battle.p1_mainCards;
        }
        else {
            throw new Error("Invalid player");
        }
    };
    CardManager.prototype.getEnemyCurrentReserveCards = function (player) {
        var battle = this.battle;
        if (player === battle.player1) {
            return battle.p2_reserveCards;
        }
        else if (player === battle.player2) {
            return battle.p1_reserveCards;
        }
        else {
            throw new Error("Invalid player");
        }
    };
    CardManager.prototype.getValidSingleTarget = function (cards) {
        var possibleIndices = [];
        for (var i = 0; i < 5; i++) {
            if (!cards[i].isDead) {
                possibleIndices.push(i);
            }
        }
        if (possibleIndices.length === 0) {
            return null;
        }
        var randomIndex = getRandomInt(0, possibleIndices.length - 1);
        return cards[possibleIndices[randomIndex]];
    };
    CardManager.prototype.getNearestSingleOpponentTarget = function (executor) {
        var oppCards = this.getPlayerCurrentMainCards(this.battle.getOppositePlayer(executor.player));
        var executorIndex = executor.formationColumn;
        var offsetArray = [0, -1, 1, -2, 2, -3, 3, -4, 4];
        for (var i = 0; i < offsetArray.length; i++) {
            var currentOppCard = oppCards[executorIndex + offsetArray[i]];
            if (currentOppCard && !currentOppCard.isDead) {
                return currentOppCard;
            }
        }
        return null;
    };
    CardManager.prototype.getNearestSingleFriendTarget = function (executor) {
        var friendCards = this.getPlayerCurrentMainCards(executor.player);
        var executorIndex = executor.formationColumn;
        var offsetArray = [0, -1, 1, -2, 2, -3, 3, -4, 4];
        for (var i = 0; i < offsetArray.length; i++) {
            var currentFriendCard = friendCards[executorIndex + offsetArray[i]];
            if (currentFriendCard && !currentFriendCard.isDead) {
                return currentFriendCard;
            }
        }
        return null;
    };
    CardManager.prototype.isAllDeadPlayer = function (player) {
        var reserveCond = true;
        if (this.battle.isBloodClash) {
            if (!this.isNoReserveLeft(player))
                reserveCond = false;
        }
        return this.isAllMainCardsDead(player) && reserveCond;
    };
    CardManager.prototype.isAllMainCardsDead = function (player) {
        var mainCards = this.getPlayerCurrentMainCards(player);
        var isAllDead = true;
        for (var i = 0; i < mainCards.length; i++) {
            if (!mainCards[i].isDead) {
                isAllDead = false;
                break;
            }
        }
        return isAllDead;
    };
    CardManager.prototype.isNoReserveLeft = function (player) {
        var reserveCards = this.getPlayerCurrentReserveCards(player);
        var noReserveLeft = true;
        for (var i = 0; i < reserveCards.length; i++) {
            if (reserveCards[i]) {
                noReserveLeft = false;
                break;
            }
        }
        return noReserveLeft;
    };
    CardManager.prototype.isCardInList = function (card, list) {
        var isIn = false;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === card.id) {
                isIn = true;
                break;
            }
        }
        return isIn;
    };
    CardManager.prototype.isSameCard = function (card1, card2) {
        return card1.id === card2.id;
    };
    CardManager.prototype.getAllCurrentMainCards = function () {
        return this.battle.allCurrentMainCards;
    };
    CardManager.prototype.getAllCurrentCards = function () {
        var bt = this.battle;
        return bt.p1_mainCards.concat(bt.p2_mainCards).concat(bt.p1_reserveCards).concat(bt.p2_reserveCards);
    };
    CardManager.prototype.isCurrentMainCard = function (card) {
        return this.isCardInList(card, this.getAllCurrentMainCards());
    };
    CardManager.prototype.updateAllCurrentMainCards = function () {
        var battle = this.battle;
        battle.allCurrentMainCards = battle.p1_mainCards.concat(battle.p2_mainCards);
    };
    CardManager.prototype.switchCardInAllCurrentMainCards = function (oldCard, newCard) {
        var allCurrentMainCards = this.battle.allCurrentMainCards;
        var found = false;
        for (var i = 0; i < allCurrentMainCards.length; i++) {
            if (allCurrentMainCards[i].id === oldCard.id) {
                found = true;
                allCurrentMainCards[i] = newCard;
                break;
            }
        }
        if (!found) {
            throw new Error("Card not found!");
        }
    };
    CardManager.prototype.getAllMainCardsInPlayerOrder = function () {
        return this.battle.p1_mainCards.concat(this.battle.p2_mainCards);
    };
    CardManager.prototype.getPlayerMainBrigString = function (player) {
        var cards = this.getPlayerCurrentMainCards(player);
        return ENUM.Setting.IS_MOBILE ? this.getPlainBrigString(cards) : this.getHtmlBrigString(cards);
    };
    CardManager.prototype.getPlayerReserveBrigString = function (player) {
        var cards = this.getPlayerOriginalReserveCards(player);
        return ENUM.Setting.IS_MOBILE ? this.getPlainBrigString(cards) : this.getHtmlBrigString(cards);
    };
    CardManager.prototype.getHtmlBrigString = function (cards) {
        var brigStr = "";
        for (var i = 0; i < cards.length; i++) {
            var dash = (i === 0) ? "" : " - ";
            var cb = "showCardDetailDialogById(" + cards[i].id + ");";
            brigStr += (dash + "<a href='javascript:void(0)' onclick='" + cb + "'>" + cards[i].name) + "</a>";
        }
        return brigStr;
    };
    CardManager.prototype.getPlainBrigString = function (cards) {
        var brigStr = "";
        for (var i = 0; i < cards.length; i++) {
            var dash = (i === 0) ? "" : " - ";
            brigStr += (dash + cards[i].name);
        }
        return brigStr;
    };
    CardManager.prototype.getCurrentMainCardByIndex = function (playerId, index) {
        var cards = this.getPlayerCurrentMainCards(this.battle.getPlayerById(playerId));
        return cards[index];
    };
    CardManager.prototype.getOriginalMainCardByIndex = function (playerId, index) {
        var cards = this.getPlayerOriginalMainCards(this.battle.getPlayerById(playerId));
        return cards[index];
    };
    CardManager.prototype.getOriginalReserveCardByIndex = function (playerId, index) {
        var cards = this.getPlayerOriginalReserveCards(this.battle.getPlayerById(playerId));
        return cards[index];
    };
    CardManager.prototype.getTotalHPRatio = function (cards) {
        var totalRemainHp = 0;
        var totalOriginalHp = 0;
        for (var i = 0, len = cards.length; i < len; i++) {
            var card = cards[i];
            if (card) {
                if (!card.isDead) {
                    totalRemainHp += card.getHP();
                }
                totalOriginalHp += card.originalStats.hp;
            }
        }
        return totalRemainHp / totalOriginalHp;
    };
    CardManager.prototype.getCardInfoForDialog = function (card) {
        var skillInfo = [];
        var allSkills = card.skills.concat(card.passiveSkills);
        for (var i = 0; i < allSkills.length; i++) {
            var skill = allSkills[i];
            skillInfo.push({
                "id": skill.id,
                "name": skill.name,
                "comment": skill.description,
                "maxProbability": skill.maxProbability
            });
        }
        return {
            "name": card.fullName,
            "image": getImageLink(card.imageLink, card.fullName, 150),
            "hp": card.originalStats.hp,
            "atk": card.originalStats.atk,
            "def": card.originalStats.def,
            "wis": card.originalStats.wis,
            "agi": card.originalStats.agi,
            "maxLevel": 99,
            "skills": skillInfo,
            "standardAction": {
                "name": "Standard Action",
                "comment": card.autoAttack.description
            }
        };
    };
    CardManager._instance = null;
    return CardManager;
}());
var CsRandom = (function () {
    function CsRandom(seed) {
        this.seedArray = [];
        var ii;
        var mj, mk;
        var subtraction = (seed === -2147483648) ? 2147483647 : Math.abs(seed);
        mj = CsRandom.MSEED - subtraction;
        this.seedArray[55] = mj;
        mk = 1;
        for (var i = 1; i < 55; i++) {
            ii = (21 * i) % 55;
            this.seedArray[ii] = mk;
            mk = mj - mk;
            if (mk < 0)
                mk += CsRandom.MBIG;
            mj = this.seedArray[ii];
        }
        for (var k = 1; k < 5; k++) {
            for (var i = 1; i < 56; i++) {
                this.seedArray[i] -= this.seedArray[1 + (i + 30) % 55];
                if (this.seedArray[i] < 0)
                    this.seedArray[i] += CsRandom.MBIG;
            }
        }
        this.inext = 0;
        this.inextp = 21;
        seed = 1;
    }
    CsRandom.prototype.sample = function () {
        return (this.internalSample() * (1.0 / CsRandom.MBIG));
    };
    CsRandom.prototype.internalSample = function () {
        var retVal;
        var locINext = this.inext;
        var locINextp = this.inextp;
        if (++locINext >= 56)
            locINext = 1;
        if (++locINextp >= 56)
            locINextp = 1;
        retVal = this.seedArray[locINext] - this.seedArray[locINextp];
        if (retVal === CsRandom.MBIG)
            retVal--;
        if (retVal < 0)
            retVal += CsRandom.MBIG;
        this.seedArray[locINext] = retVal;
        this.inext = locINext;
        this.inextp = locINextp;
        return retVal;
    };
    CsRandom.prototype.next = function () {
        return this.internalSample();
    };
    CsRandom.prototype.getSampleForLargeRange = function () {
        var result = this.internalSample();
        var negative = (this.internalSample() % 2 === 0) ? true : false;
        if (negative) {
            result = -result;
        }
        var d = result;
        d += (2147483647 - 1);
        d /= 2 * 2147483647 - 1;
        return d;
    };
    CsRandom.prototype.nextInRange = function (minValue, maxValue) {
        if (minValue > maxValue) {
            throw new Error("max less than min");
        }
        var range = maxValue - minValue;
        if (range <= 2147483647) {
            return (Math.floor(this.sample() * range) + minValue);
        }
        else {
            return Math.floor(Math.floor(this.getSampleForLargeRange() * range) + minValue);
        }
    };
    CsRandom.prototype.nextLessThan = function (maxValue) {
        if (maxValue < 0) {
            throw new Error("Max value less than 0");
        }
        return Math.floor(this.sample() * maxValue);
    };
    CsRandom.prototype.nextDouble = function () {
        return this.sample();
    };
    CsRandom.MBIG = 2147483647;
    CsRandom.MSEED = 161803398;
    CsRandom.MZ = 0;
    return CsRandom;
}());
var famDatabase = {
    11261: {
        name: "Rahab", stats: [14073, 12597, 15498, 9004, 16754],
        skills: [434],
        img: "21c", rarity: 4, evo: 4,
        fullName: "Abyssal Rahab II"
    },
    11282: {
        name: "Achilles", stats: [13593, 15630, 11362, 10603, 16562],
        skills: [459, 460],
        img: "1c7", rarity: 4, evo: 2,
        fullName: "Achilles, Fallen Hero II"
    },
    10613: {
        name: "Adara", stats: [16024, 12134, 17620, 10857, 9370],
        skills: [166],
        img: "268", rarity: 4, evo: 4,
        fullName: "Adara Luck Shot II"
    },
    11581: {
        name: "Adara", stats: [14424, 17805, 13013, 7005, 16902],
        skills: [876],
        autoAttack: 10117,
        img: "205", rarity: 4, evo: 4,
        fullName: "Adara Luck Shot, Swap II"
    },
    11099: {
        name: "Adranus", stats: [20223, 23517, 19855, 18609, 18046],
        skills: [347],
        img: "275", rarity: 6, evo: 2,
        fullName: "Adranus, Lava Beast II"
    },
    358: {
        name: "Aegis", stats: [14560, 11280, 15530, 10600, 10100],
        skills: [64],
        img: "235", rarity: 5, evo: 1,
        fullName: "Aegis, the Bulwark"
    },
    11206: {
        name: "Aeneas", stats: [14590, 15630, 13561, 10311, 13561],
        skills: [400, 401],
        img: "25c", rarity: 4, evo: 2,
        fullName: "Aeneas, Fallen Hero II"
    },
    11541: {
        name: "Aengus", stats: [15803, 6996, 12239, 17006, 16497],
        skills: [823, 824],
        autoAttack: 10003,
        img: "453", rarity: 4, evo: 2,
        fullName: "Aengus, the Charitable II"
    },
    11385: {
        name: "Aeshma", stats: [17558, 17212, 15034, 5804, 13019],
        skills: [579],
        autoAttack: 10035,
        img: "243", rarity: 4, evo: 2,
        fullName: "Aeshma, the Tyrant II"
    },
    11344: {
        name: "Afanc", stats: [16518, 8610, 14124, 16020, 13214],
        skills: [529, 530],
        autoAttack: 10003,
        img: "4a1", rarity: 4, evo: 2,
        fullName: "Afanc, Beast of the Deep II"
    },
    21501: {
        name: "Agathos", stats: [12163, 8220, 10224, 13095, 12315],
        skills: [683],
        autoAttack: 10007,
        img: "188", rarity: 4, evo: 2,
        fullName: "Agathos, the Ruinous II"
    },
    11501: {
        name: "Agathos", stats: [15265, 7478, 11442, 16803, 16913],
        skills: [682],
        autoAttack: 10036,
        img: "38e", rarity: 4, evo: 4,
        fullName: "Agathos, Wyrm of the Harvest II"
    },
    21404: {
        name: "Ah Puch", stats: [22515, 9134, 18258, 20999, 17486],
        skills: [585],
        autoAttack: 10007,
        img: "460", rarity: 5, evo: 3,
        fullName: "Ah Puch, Lord of Death"
    },
    11041: {
        name: "Ahab", stats: [10273, 12001, 11342, 9978, 12342],
        skills: [195],
        img: "2ec", rarity: 4, evo: 4,
        fullName: "Ahab, the Colossal Anchor II"
    },
    21474: {
        name: "Aipaloovik", stats: [17006, 7397, 11481, 17526, 16605],
        skills: [660, 661],
        autoAttack: 10052,
        img: "46f", rarity: 4, evo: 2,
        fullName: "Aipaloovik, Sacred Dragon II"
    },
    11474: {
        name: "Aipaloovik", stats: [15610, 7991, 11807, 16534, 15999],
        skills: [659],
        autoAttack: 10007,
        img: "389", rarity: 4, evo: 4,
        fullName: "Aipaloovik, the Snowstorm II"
    },
    10841: {
        name: "Alcina", stats: [12684, 14169, 11356, 13682, 15755],
        skills: [269],
        img: "31b", rarity: 4, evo: 4,
        fullName: "Alcina the Soulsucker II"
    },
    11400: {
        name: "Ales", stats: [18119, 18009, 16024, 10101, 5884],
        skills: [562, 563],
        img: "4d5", rarity: 4, evo: 4,
        fullName: "Ales Darkblood II"
    },
    11591: {
        name: "Aletheia", stats: [18674, 19010, 17277, 10939, 18165],
        skills: [885, 886],
        img: "2be", rarity: 5, evo: 2,
        fullName: "Aletheia, Knight Templar II"
    },
    10813: {
        name: "ASK", stats: [12952, 14282, 11477, 10490, 17133],
        skills: [219],
        img: "339", rarity: 4, evo: 4,
        fullName: "All-Seeing Keeper II"
    },
    10936: {
        name: "Merrow", stats: [16811, 14709, 13723, 17537, 17320],
        skills: [217],
        img: "26d", rarity: 5, evo: 2,
        fullName: "Alluring Merrow II"
    },
    10972: {
        name: "Alp", stats: [11917, 14120, 10928, 17168, 13366],
        skills: [277],
        img: "20d", rarity: 4, evo: 4,
        fullName: "Alp, Dynast of Darkness II"
    },
    11436: {
        name: "Alyssa", stats: [17883, 8718, 16594, 20516, 17786],
        skills: [616, 617],
        autoAttack: 10007,
        img: "41d", rarity: 5, evo: 2,
        fullName: "Alyssa, Black Cat Witch II"
    },
    11258: {
        name: "Amazon", stats: [15034, 16670, 14048, 8025, 16107],
        skills: [875],
        autoAttack: 10116,
        img: "2a8", rarity: 4, evo: 2,
        fullName: "Amazon Berserker II"
    },
    10623: {
        name: "Warfist", stats: [10904, 11417, 10466, 10660, 11830],
        skills: [156],
        img: "21a", rarity: 4, evo: 4,
        fullName: "Amazon Warfist II"
    },
    11058: {
        name: "Ammit", stats: [18306, 23495, 18501, 18490, 18057],
        skills: [325],
        img: "2f9", rarity: 6, evo: 2,
        fullName: "Ammit, Soul Destroyer II"
    },
    10717: {
        name: "Amon", stats: [13171, 16128, 10755, 14861, 13214],
        skills: [47],
        img: "386", rarity: 4, evo: 2,
        fullName: "Amon, Marquis of Blaze II"
    },
    10757: {
        name: "Amphisbaena", stats: [14861, 14850, 13030, 19855, 18024],
        skills: [202, 203],
        isMounted: true,
        img: "346", rarity: 5, evo: 2,
        fullName: "Amphisbaena II"
    },
    11065: {
        name: "ABS", stats: [14005, 15901, 11903, 11838, 14904],
        skills: [365],
        img: "1e0", rarity: 4, evo: 2,
        fullName: "Ancient Beetle Soldier II"
    },
    11483: {
        name: "Tree Golem", stats: [17998, 17106, 17998, 12001, 2907],
        skills: [671],
        autoAttack: 10056,
        img: "14b", rarity: 4, evo: 4,
        fullName: "Ancient Tree Golem II"
    },
    10464: {
        name: "Andorra", stats: [12538, 13621, 13510, 12134, 12342],
        skills: [142],
        img: "252", rarity: 4, evo: 4,
        fullName: "Andorra the Indomitable II"
    },
    11592: {
        name: "Andromalius", stats: [15749, 16172, 12564, 7960, 17277],
        skills: [887, 888],
        img: "2b6", rarity: 4, evo: 2,
        fullName: "Andromalius, Eater of Lies II"
    },
    10947: {
        name: "Ankou", stats: [17017, 9628, 16854, 14308, 10246],
        skills: [345, 346],
        autoAttack: 10007,
        isMounted: true,
        img: "4d6", rarity: 4, evo: 2,
        fullName: "Ankou, Harbinger of Death II"
    },
    10999: {
        name: "Anne", stats: [12232, 13782, 12342, 13510, 15599],
        skills: [250],
        img: "13d", rarity: 4, evo: 4,
        fullName: "Anne, the Whirlwind II"
    },
    11245: {
        name: "Anneberg", stats: [19097, 18241, 17038, 8794, 16518],
        skills: [489, 490],
        img: "1e1", rarity: 5, evo: 2,
        fullName: "Anneberg, Steel Steed II"
    },
    11292: {
        name: "Anubis", stats: [14330, 17006, 12510, 10625, 14005],
        skills: [473, 474],
        img: "247", rarity: 4, evo: 2,
        fullName: "Anubis, Keeper of the Dead II"
    },
    21588: {
        name: "Apate", stats: [21266, 9647, 18128, 21466, 17977],
        skills: [882],
        autoAttack: 10118,
        img: "111", rarity: 5, evo: 3,
        fullName: "Apate, Goddess of Deceit"
    },
    21288: {
        name: "Apep", stats: [20543, 20975, 15503, 14302, 16729],
        skills: [468],
        autoAttack: 10017,
        img: "179", rarity: 5, evo: 3,
        fullName: "Apep the Chaotic"
    },
    10593: {
        name: "Apocalyptic Beast", stats: [14189, 15977, 15413, 13420, 14969],
        skills: [123],
        img: "15a", rarity: 5, evo: 2,
        fullName: "Apocalyptic Beast II"
    },
    11364: {
        name: "Apsara", stats: [15717, 4992, 14113, 17179, 17006],
        skills: [630, 631],
        autoAttack: 10007,
        img: "152", rarity: 4, evo: 2,
        fullName: "Apsara, Spirit of Water II"
    },
    11281: {
        name: "Chariot", stats: [17342, 19346, 16453, 10376, 17472],
        skills: [464],
        img: "3da", rarity: 5, evo: 2,
        fullName: "Arcanan Chariot II"
    },
    21300: {
        name: "Fate", stats: [20706, 17848, 13181, 18794, 17522],
        skills: [475],
        autoAttack: 10007,
        img: "3ee", rarity: 5, evo: 3,
        fullName: "Arcanan Circle of Fate"
    },
    11335: {
        name: "Daemon", stats: [18252, 20700, 12510, 13117, 15023],
        skills: [509, 510],
        img: "249", rarity: 5, evo: 2,
        fullName: "Arcanan Daemon II"
    },
    11324: {
        name: "Death", stats: [20234, 19508, 13008, 13019, 18111],
        skills: [546, 547],
        autoAttack: 10028,
        isMounted: true,
        img: "25b", rarity: 5, evo: 2,
        fullName: "Arcanan Death II"
    },
    11239: {
        name: "Emperor", stats: [18577, 17916, 17786, 10809, 14590],
        skills: [425, 426],
        img: "102", rarity: 5, evo: 2,
        fullName: "Arcanan Emperor II"
    },
    11211: {
        name: "Empress", stats: [15197, 12380, 15348, 19422, 17168],
        skills: [394, 395],
        img: "104", rarity: 5, evo: 2,
        fullName: "Arcanan Empress II"
    },
    11427: {
        name: "Fool", stats: [20613, 20104, 18057, 13182, 11102],
        skills: [632, 633],
        isMounted: true,
        img: "3f3", rarity: 5, evo: 2,
        fullName: "Arcanan Fool II"
    },
    11311: {
        name: "Hanged Man", stats: [20505, 15002, 13008, 13030, 18024],
        skills: [480, 481],
        img: "489", rarity: 5, evo: 2,
        fullName: "Arcanan Hanged Man II"
    },
    11287: {
        name: "Hermit", stats: [19205, 12066, 12586, 20722, 15002],
        skills: [453, 454],
        autoAttack: 10007,
        img: "3c5", rarity: 5, evo: 2,
        fullName: "Arcanan Hermit II"
    },
    11199: {
        name: "High Priestess", stats: [17233, 8350, 20256, 19086, 14839],
        skills: [388, 389],
        autoAttack: 10007,
        img: "458", rarity: 5, evo: 2,
        fullName: "Arcanan High Priestess II"
    },
    11395: {
        name: "Judgment", stats: [19996, 7754, 16009, 19508, 17753],
        skills: [573],
        autoAttack: 10003,
        img: "172", rarity: 5, evo: 2,
        fullName: "Arcanan Judgment II"
    },
    11242: {
        name: "Lovers", stats: [16908, 13875, 12705, 19021, 17006],
        skills: [430, 431],
        autoAttack: 10007,
        img: "3fb", rarity: 5, evo: 2,
        fullName: "Arcanan Lovers II"
    },
    11208: {
        name: "Magus", stats: [15186, 12131, 17688, 19010, 15641],
        skills: [402, 403],
        img: "1bb", rarity: 5, evo: 2,
        fullName: "Arcanan Magus II"
    },
    11284: {
        name: "Might", stats: [18598, 19227, 10766, 13301, 17948],
        skills: [461, 462],
        isMounted: true,
        img: "2a4", rarity: 5, evo: 2,
        fullName: "Arcanan Might II"
    },
    11363: {
        name: "Moon", stats: [18273, 18046, 13279, 12467, 17948],
        skills: [551, 552],
        autoAttack: 10030,
        img: "3b8", rarity: 5, evo: 2,
        fullName: "Arcanan Moon II"
    },
    11360: {
        name: "Star", stats: [20223, 7548, 18035, 18208, 15803],
        skills: [540, 541],
        autoAttack: 10007,
        img: "475", rarity: 5, evo: 2,
        fullName: "Arcanan Star II"
    },
    11394: {
        name: "Sun", stats: [20299, 7982, 16356, 18013, 17916],
        skills: [570, 571],
        autoAttack: 10032,
        img: "10a", rarity: 5, evo: 2,
        fullName: "Arcanan Sun II"
    },
    11332: {
        name: "Temperance", stats: [19183, 3800, 20007, 19985, 18046],
        skills: [543],
        autoAttack: 10027,
        img: "38d", rarity: 5, evo: 2,
        fullName: "Arcanan Temperance II"
    },
    11329: {
        name: "Archbishop", stats: [19064, 20191, 16009, 10744, 15002],
        skills: [520],
        autoAttack: 10025,
        img: "39a", rarity: 5, evo: 2,
        fullName: "Archbishop of the Deep II"
    },
    10600: {
        name: "Ose", stats: [16995, 14395, 15023, 14850, 11990],
        skills: [154],
        img: "300", rarity: 5, evo: 2,
        fullName: "Archduke Ose II"
    },
    11105: {
        name: "Ares", stats: [25434, 21285, 21047, 16345, 17407],
        skills: [542],
        img: "180", rarity: 6, evo: 2,
        fullName: "Ares, God of Ruin II"
    },
    10372: {
        name: "Artemisia", stats: [10042, 10977, 10977, 10042, 12589],
        skills: [18],
        img: "3aa", rarity: 4, evo: 4,
        fullName: "Artemisia Swiftfoot II"
    },
    11457: {
        name: "Asena", stats: [15121, 17385, 11622, 7505, 16995],
        skills: [608],
        img: "3f8", rarity: 4, evo: 2,
        fullName: "Asena, Wolfwoman II"
    },
    11361: {
        name: "Ashlee", stats: [17038, 16042, 15045, 13431, 17992],
        skills: [623],
        autoAttack: 10029,
        img: "3f7", rarity: 5, evo: 2,
        fullName: "Ashlee Steamsaw II"
    },
    21529: {
        name: "Aso", stats: [19587, 18851, 18105, 13823, 18083],
        skills: [806],
        autoAttack: 10100,
        img: "170", rarity: 5, evo: 3,
        fullName: "Aso, the Asura"
    },
    11488: {
        name: "Aspidochelone", stats: [21003, 17103, 21003, 17006, 4450],
        skills: [665, 666],
        autoAttack: 10050,
        img: "26f", rarity: 5, evo: 2,
        fullName: "Aspidochelone, the Iceberg II"
    },
    10595: {
        name: "Astaroth", stats: [12194, 13965, 10087, 15278, 14280],
        skills: [155],
        img: "22e", rarity: 4, evo: 4,
        fullName: "Astaroth, Duke of Fear II"
    },
    11467: {
        name: "Atalanta", stats: [16497, 16302, 13561, 7776, 15576],
        skills: [652, 653],
        img: "210", rarity: 4, evo: 2,
        fullName: "Atalanta, Fowler II"
    },
    10900: {
        name: "Aurboda", stats: [11903, 15348, 11773, 18468, 11015],
        skills: [261],
        img: "315", rarity: 4, evo: 2,
        fullName: "Aurboda, the Great Mother II"
    },
    11157: {
        name: "Ausguss", stats: [14937, 9087, 12304, 16952, 14308],
        skills: [708],
        autoAttack: 10007,
        img: "3ce", rarity: 4, evo: 2,
        fullName: "Ausguss, Jailer II"
    },
    11441: {
        name: "Ausra", stats: [21913, 9596, 15998, 18403, 18154],
        skills: [638, 639],
        autoAttack: 10023,
        img: "2c8", rarity: 5, evo: 2,
        fullName: "Ausra, the Fall Breeze II"
    },
    11388: {
        name: "Azi", stats: [20375, 20202, 20104, 22899, 18057],
        skills: [572],
        autoAttack: 10033,
        img: "25b", rarity: 6, evo: 2,
        fullName: "Azi Dahaka II"
    },
    10657: {
        name: "Baal", stats: [14677, 15457, 12813, 14482, 16551],
        skills: [178],
        img: "22f", rarity: 5, evo: 2,
        fullName: "Baal, Thunder Lord of Hell II"
    },
    11168: {
        name: "Badalisc", stats: [14092, 16107, 11882, 11297, 15218],
        skills: [315],
        img: "26c", rarity: 4, evo: 2,
        fullName: "Badalisc, the Gourmet II"
    },
    11390: {
        name: "Suzhen", stats: [15998, 3096, 15002, 17504, 17006],
        skills: [81],
        autoAttack: 10031,
        img: "105", rarity: 4, evo: 2,
        fullName: "Bai Suzhen, Lady of Scales II"
    },
    11102: {
        name: "Balgo", stats: [18585, 16037, 13962, 5799, 13510],
        skills: [349],
        img: "2fd", rarity: 4, evo: 4,
        fullName: "Balgo, the Cursed Flame II"
    },
    11243: {
        name: "Bandersnatch", stats: [21805, 8047, 14200, 19183, 17786],
        skills: [635],
        autoAttack: 10046,
        img: "1bc", rarity: 5, evo: 2,
        fullName: "Bandersnatch, Beast Divine II"
    },
    10652: {
        name: "Batraz", stats: [14471, 15511, 13442, 12293, 12174],
        skills: [142],
        img: "4e3", rarity: 4, evo: 2,
        fullName: "Batraz, the Immortal Hero II"
    },
    11371: {
        name: "Bayam", stats: [13269, 7966, 12804, 17106, 16779],
        skills: [506],
        autoAttack: 10023,
        img: "171", rarity: 4, evo: 4,
        fullName: "Bayam II"
    },
    11025: {
        name: "Scarecrow", stats: [10625, 13756, 10490, 11001, 9342],
        skills: [256],
        img: "34d", rarity: 4, evo: 4,
        fullName: "Beheading Scarecrow II"
    },
    10659: {
        name: "Behemoth", stats: [12442, 14755, 13269, 12380, 12999],
        skills: [186],
        img: "230", rarity: 4, evo: 4,
        fullName: "Behemoth, Thunder Beast II"
    },
    10935: {
        name: "Belisama", stats: [17777, 17071, 17000, 11111, 4981],
        skills: [628],
        img: "39e", rarity: 4, evo: 4,
        fullName: "Belisama, Flame Goddess II"
    },
    11454: {
        name: "Bella", stats: [16009, 16627, 13052, 5631, 17374],
        skills: [643, 644],
        img: "314", rarity: 4, evo: 2,
        fullName: "Bella, the Dazzling Flower II"
    },
    21459: {
        name: "Benjamina", stats: [21022, 16379, 20007, 13006, 18011],
        skills: [640],
        img: "46a", rarity: 5, evo: 3,
        fullName: "Benjamina, Wild Turkey"
    },
    11494: {
        name: "Bergel", stats: [16529, 7321, 10538, 17797, 16811],
        skills: [679, 680],
        autoAttack: 10007,
        img: "297", rarity: 4, evo: 2,
        fullName: "Bergel, Frost Magus II"
    },
    11505: {
        name: "Bert", stats: [14107, 14000, 11828, 6577, 9453],
        skills: [688],
        img: "404", rarity: 4, evo: 4,
        fullName: "Bert, Foe Sweep II"
    },
    21560: {
        name: "Bheara", stats: [13572, 8426, 9509, 13301, 11459],
        skills: [843],
        autoAttack: 10007,
        img: "141", rarity: 4, evo: 2,
        fullName: "Bheara, Tree of Death II"
    },
    11560: {
        name: "Bheara", stats: [14975, 6502, 12207, 17475, 16754],
        skills: [842],
        autoAttack: 10007,
        img: "387", rarity: 4, evo: 4,
        fullName: "Bheara, Wastestrider II"
    },
    10684: {
        name: "Biast", stats: [13879, 12655, 10163, 13611, 9798],
        skills: [163],
        img: "229", rarity: 4, evo: 2,
        fullName: "Biast II"
    },
    21430: {
        name: "Bijan", stats: [22189, 20473, 18945, 11176, 18083],
        skills: [874],
        autoAttack: 10115,
        img: "16a", rarity: 5, evo: 3,
        fullName: "Bijan, the Comet"
    },
    10787: {
        name: "Black Knight", stats: [12648, 16097, 11623, 11574, 13842],
        skills: [211],
        img: "19e", rarity: 4, evo: 4,
        fullName: "Black Knight, Soul Hunter II"
    },
    10824: {
        name: "Bolus", stats: [12086, 16889, 12427, 11610, 12832],
        skills: [152],
        img: "4a0", rarity: 4, evo: 4,
        fullName: "Bolus, the Blue Bolt II"
    },
    21510: {
        name: "Botis", stats: [16009, 14742, 13994, 8003, 17255],
        skills: [692, 693],
        autoAttack: 10060,
        img: "417", rarity: 4, evo: 2,
        fullName: "Botis, Dasher of Hopes II"
    },
    11510: {
        name: "Botis", stats: [14096, 14000, 10001, 5506, 13196],
        skills: [694],
        img: "2e7", rarity: 4, evo: 4,
        fullName: "Botis, Earl of Hell II"
    },
    10977: {
        name: "Boudica", stats: [9967, 11914, 8918, 13110, 12014],
        skills: [276],
        img: "2ab", rarity: 4, evo: 4,
        fullName: "Boudica, the Dawn Chief II"
    },
    11223: {
        name: "Brang", stats: [18826, 18544, 14027, 18208, 10105],
        skills: [423],
        autoAttack: 10010,
        img: "4f3", rarity: 5, evo: 2,
        fullName: "Brang Two-Heads II"
    },
    11538: {
        name: "Brangane", stats: [14610, 7639, 12001, 17899, 15804],
        skills: [819],
        autoAttack: 10003,
        img: "2de", rarity: 4, evo: 4,
        fullName: "Brangane, the Enchanting II"
    },
    11209: {
        name: "Rabbit", stats: [18999, 13951, 20007, 9986, 18035],
        skills: [435, 436],
        img: "26e", rarity: 5, evo: 2,
        fullName: "Brass Rabbit"
    },
    11194: {
        name: "Tarantula", stats: [19324, 14568, 18024, 15695, 12120],
        skills: [396, 397],
        autoAttack: 10005,
        img: "271", rarity: 5, evo: 2,
        fullName: "Brass Tarantula II"
    },
    11522: {
        name: "Briar", stats: [18988, 9000, 20028, 19519, 12987],
        skills: [804, 805],
        autoAttack: 10007,
        img: "36b", rarity: 5, evo: 2,
        fullName: "Briar, Grimoire Keeper II"
    },
    11171: {
        name: "Hyena", stats: [14644, 10766, 11860, 18923, 12228],
        skills: [321],
        autoAttack: 10008,
        img: "2fc", rarity: 4, evo: 2,
        fullName: "Bronzeclad Hyena II"
    },
    11114: {
        name: "Brownies", stats: [9821, 11283, 9515, 13196, 11414],
        skills: [307],
        img: "190", rarity: 4, evo: 4,
        fullName: "Brownies, the Uproarious II"
    },
    10488: {
        name: "Bunga", stats: [12269, 11049, 14182, 9612, 10343],
        skills: [125],
        img: "25d", rarity: 4, evo: 4,
        fullName: "Bunga, the Stalwart II"
    },
    11129: {
        name: "Caassimolar", stats: [16009, 24979, 15587, 10625, 12521],
        skills: [371],
        img: "1c7", rarity: 5, evo: 2,
        fullName: "Caassimolar, the Chimera II"
    },
    11466: {
        name: "Calais", stats: [19812, 18100, 16009, 12792, 17277],
        skills: [650, 651],
        img: "379", rarity: 5, evo: 2,
        fullName: "Calais, the Gale II"
    },
    11449: {
        name: "Camazo", stats: [22628, 22585, 22173, 16139, 18208],
        skills: [601, 445],
        autoAttack: 10038,
        img: "26c", rarity: 6, evo: 2,
        fullName: "Camazo, Knight of Bats II"
    },
    11119: {
        name: "Canhel", stats: [15608, 19606, 17992, 11329, 16399],
        skills: [293],
        img: "254", rarity: 5, evo: 2,
        fullName: "Canhel, Guardian Dragon II"
    },
    10997: {
        name: "Jolly", stats: [14200, 16594, 14070, 18956, 15424],
        skills: [226],
        img: "214", rarity: 5, evo: 2,
        fullName: "Cap'n Jolly, Sea Scourge II"
    },
    11547: {
        name: "Barometz", stats: [16961, 15121, 14145, 14000, 9052],
        skills: [830],
        autoAttack: 10105,
        img: "184", rarity: 4, evo: 4,
        fullName: "Caparisoned Barometz II"
    },
    11479: {
        name: "Jed", stats: [24080, 25066, 20494, 14005, 18100],
        skills: [667],
        autoAttack: 10053,
        img: "1b7", rarity: 6, evo: 2,
        fullName: "Captain Jed II"
    },
    11333: {
        name: "Kidd", stats: [18403, 18046, 12781, 14395, 16085],
        skills: [518, 157],
        img: "442", rarity: 5, evo: 2,
        fullName: "Captain Kidd II"
    },
    11062: {
        name: "Chillweaver", stats: [13293, 13196, 10611, 16144, 14489],
        skills: [2],
        img: "2b2", rarity: 4, evo: 4,
        fullName: "Cat Sith Chillweaver II"
    },
    11090: {
        name: "CSMM", stats: [14096, 10112, 10549, 15804, 17095],
        skills: [343],
        autoAttack: 10007,
        img: "26d", rarity: 4, evo: 4,
        fullName: "Cat Sith Magus Master II"
    },
    11366: {
        name: "CSS", stats: [15034, 16518, 13052, 7202, 16811],
        skills: [549],
        img: "17b", rarity: 4, evo: 2,
        fullName: "Cat Sith Swordswoman II"
    },
    11177: {
        name: "CSW", stats: [15804, 16768, 14000, 5334, 16707],
        skills: [637],
        autoAttack: 10048,
        img: "1d8", rarity: 4, evo: 4,
        fullName: "Cat Sith Warlord II"
    },
    11213: {
        name: "Cegila", stats: [13149, 11492, 9498, 17504, 16995],
        skills: [354],
        img: "2a5", rarity: 4, evo: 2,
        fullName: "Cegila, Dragonian Incantator II"
    },
    10673: {
        name: "Cernunnos", stats: [16446, 15351, 13761, 13181, 14330],
        skills: [177],
        img: "25b", rarity: 5, evo: 2,
        fullName: "Cernunnos II"
    },
    10409: {
        name: "Magma Giant", stats: [12832, 12380, 13097, 11477, 11928],
        skills: [123],
        img: "363", rarity: 4, evo: 4,
        fullName: "Chaotic Magma Giant II"
    },
    11545: {
        name: "Chi-Hu", stats: [16529, 17071, 13106, 7440, 15738],
        skills: [829],
        autoAttack: 10104,
        img: "381", rarity: 4, evo: 2,
        fullName: "Chi-Hu II"
    },
    11484: {
        name: "Chione", stats: [16204, 13008, 13561, 8502, 17266],
        skills: [663, 664],
        img: "4d9", rarity: 4, evo: 2,
        fullName: "Chione, Fallen Heroine II"
    },
    10907: {
        name: "Chiyome", stats: [12635, 14148, 11369, 15817, 13510],
        skills: [238],
        img: "183", rarity: 4, evo: 4,
        fullName: "Chiyome, the Kamaitachi II"
    },
    11306: {
        name: "Circe", stats: [15002, 7776, 11947, 17017, 16009],
        skills: [487, 488],
        autoAttack: 10007,
        img: "20f", rarity: 4, evo: 2,
        fullName: "Circe, Fallen Heroine II"
    },
    11437: {
        name: "Pumpkin", stats: [16497, 7061, 12423, 17060, 15457],
        skills: [618, 619],
        autoAttack: 10007,
        img: "46b", rarity: 4, evo: 2,
        fullName: "Clockwork Pumpkin II"
    },
    11392: {
        name: "Viper", stats: [14999, 12999, 14999, 7808, 17133],
        skills: [574],
        img: "338", rarity: 4, evo: 4,
        fullName: "Clockwork Viper II"
    },
    21569: {
        name: "Cocytus", stats: [16497, 6248, 12001, 18252, 16995],
        skills: [866, 867],
        autoAttack: 10111,
        img: "2f0", rarity: 4, evo: 2,
        fullName: "Cocytus Dragon II"
    },
    10303: {
        name: "Crystal Gillant", stats: [11832, 10896, 10439, 10439, 13317],
        skills: [11],
        img: "460", rarity: 4, evo: 4,
        fullName: "Crystal Gillant II"
    },
    11095: {
        name: "Roc", stats: [12073, 14879, 12559, 11501, 16510],
        skills: [322],
        img: "220", rarity: 4, evo: 4,
        fullName: "Crystalwing Roc II"
    },
    10712: {
        name: "Cuelebre", stats: [13702, 16096, 12954, 11134, 13572],
        skills: [249],
        img: "28c", rarity: 4, evo: 2,
        fullName: "Cuelebre the Ironscaled II"
    },
    11019: {
        name: "Cursebone", stats: [14807, 16952, 14146, 15652, 17721],
        skills: [248],
        img: "33e", rarity: 5, evo: 2,
        fullName: "Cursebone Pterosaur II"
    },
    10820: {
        name: "Cyclops", stats: [15868, 17147, 18360, 13214, 14449],
        skills: [218],
        img: "3ba", rarity: 5, evo: 2,
        fullName: "Cyclops, the Rocky Cliff II"
    },
    11328: {
        name: "Dagon", stats: [23343, 22065, 18035, 19703, 18208],
        skills: [519],
        img: "36a", rarity: 6, evo: 2,
        fullName: "Dagon II"
    },
    10973: {
        name: "Dagr", stats: [12012, 14059, 10712, 17818, 13810],
        skills: [275],
        img: "4d2", rarity: 4, evo: 2,
        fullName: "Dagr Sunrider II"
    },
    10983: {
        name: "Danniel", stats: [23571, 24990, 21458, 13951, 16204],
        skills: [292],
        img: "1e2", rarity: 6, evo: 2,
        fullName: "Danniel, Golden Paladin II"
    },
    11415: {
        name: "Dantalion", stats: [15193, 5298, 10990, 14207, 11098],
        skills: [596],
        autoAttack: 10007,
        img: "18e", rarity: 4, evo: 4,
        fullName: "Dantalion, Duke of Hell II"
    },
    10905: {
        name: "Danzo", stats: [14774, 17277, 14872, 17667, 16128],
        skills: [237],
        img: "464", rarity: 5, evo: 2,
        fullName: "Danzo, Falcon Ninja II"
    },
    21445: {
        name: "Darkwind Wyvern", stats: [22211, 8270, 19352, 20917, 17649],
        skills: [607],
        autoAttack: 10042,
        img: "4dd", rarity: 5, evo: 3,
        fullName: "Darkwind Wyvern"
    },
    21308: {
        name: "Justice", stats: [20795, 11717, 17470, 22225, 18005],
        skills: [494, 495],
        autoAttack: 10007,
        img: "27c", rarity: 5, evo: 3,
        fullName: "Dauntless Justice"
    },
    10967: {
        name: "Deborah", stats: [13550, 14157, 13442, 12987, 13929],
        skills: [222],
        img: "373", rarity: 4, evo: 2,
        fullName: "Deborah, Knight Immaculate II"
    },
    11512: {
        name: "Deimos", stats: [16497, 17753, 11188, 6996, 17363],
        skills: [695, 696],
        autoAttack: 10061,
        img: "1b8", rarity: 4, evo: 2,
        fullName: "Deimos, Terror Spear II"
    },
    11225: {
        name: "Dein", stats: [14000, 16768, 11098, 11683, 14417],
        skills: [424],
        img: "48e", rarity: 4, evo: 4,
        fullName: "Dein, Silent Bomber II"
    },
    10722: {
        name: "Delphyne", stats: [11990, 14601, 11882, 18858, 11080],
        skills: [288],
        img: "415", rarity: 4, evo: 2,
        fullName: "Delphyne, Thunder Dragon II"
    },
    10503: {
        name: "Desna", stats: [13146, 15089, 14287, 12137, 12378],
        skills: [124],
        img: "245", rarity: 4, evo: 4,
        fullName: "Desna, Mythic Wendigo II"
    },
    10914: {
        name: "Dharva", stats: [14096, 13742, 12280, 11942, 15427],
        skills: [254],
        img: "297", rarity: 4, evo: 4,
        fullName: "Dharva Fangclad II"
    },
    21549: {
        name: "Discordia", stats: [20031, 18525, 19831, 12014, 17989],
        skills: [833],
        autoAttack: 10106,
        img: "42a", rarity: 5, evo: 3,
        fullName: "Discordia, Bringer of Ruin"
    },
    11096: {
        name: "Djinn", stats: [14048, 17363, 13333, 19422, 16605],
        skills: [319, 320],
        img: "18d", rarity: 5, evo: 2,
        fullName: "Djinn of the Lamp II"
    },
    11355: {
        name: "Dong", stats: [13489, 17000, 13196, 8150, 16110],
        skills: [545],
        img: "48b", rarity: 4, evo: 4,
        fullName: "Dong, the Bloody Claw II"
    },
    10423: {
        name: "Doppeladler", stats: [13940, 14709, 14417, 14092, 14850],
        skills: [33],
        img: "168", rarity: 5, evo: 2,
        fullName: "Doppeladler II"
    },
    10691: {
        name: "Dors", stats: [15435, 9433, 13268, 16464, 13019],
        skills: [446],
        img: "11d", rarity: 4, evo: 2,
        fullName: "Dors, Demiwyrm Warrior II"
    },
    11552: {
        name: "Druj", stats: [15024, 12999, 15647, 7005, 17241],
        skills: [835],
        img: "460", rarity: 4, evo: 4,
        fullName: "Druj Nasu, the Impure II"
    },
    11574: {
        name: "Dryad", stats: [15186, 17060, 14449, 6487, 16670],
        skills: [870],
        autoAttack: 10103,
        img: "3c2", rarity: 4, evo: 2,
        fullName: "Dryad Archer II"
    },
    11303: {
        name: "Dunkleosteus", stats: [14000, 8394, 13110, 16620, 15804],
        skills: [477],
        autoAttack: 10007,
        img: "222", rarity: 4, evo: 4,
        fullName: "Dunkleosteus, the Rendmaw II"
    },
    10272: {
        name: "Cat Sidhe", stats: [9614, 8322, 11959, 11243, 10056],
        skills: [18],
        img: "448", rarity: 4, evo: 4,
        fullName: "Earl Cat Sidhe II"
    },
    10619: {
        name: "Ebon", stats: [17493, 15543, 13431, 14330, 13788],
        skills: [157],
        img: "248", rarity: 5, evo: 2,
        fullName: "Ebon Dragon II"
    },
    10756: {
        name: "Edgardo", stats: [10904, 15485, 14389, 8978, 14755],
        skills: [179],
        img: "25f", rarity: 4, evo: 4,
        fullName: "Edgardo, Grand Inquisitor II"
    },
    11450: {
        name: "Elsa", stats: [19010, 19021, 15132, 10018, 17851],
        skills: [602],
        autoAttack: 10039,
        img: "2fe", rarity: 5, evo: 2,
        fullName: "Elsa, Undead Bride II"
    },
    11577: {
        name: "Emerald", stats: [25012, 24383, 21881, 12272, 18208],
        skills: [868],
        autoAttack: 10112,
        img: "342", rarity: 6, evo: 2,
        fullName: "Emerald Dragon II"
    },
    21276: {
        name: "Empusa", stats: [20706, 12623, 16110, 20999, 17510],
        skills: [447],
        autoAttack: 10016,
        img: "30a", rarity: 5, evo: 3,
        fullName: "Empusa, the Death Scythe"
    },
    11514: {
        name: "Eros", stats: [15438, 16292, 14486, 6284, 16668],
        skills: [801],
        img: "38c", rarity: 4, evo: 4,
        fullName: "Eros, the Golden Arrow II"
    },
    11517: {
        name: "Etain", stats: [15511, 7873, 11015, 17038, 17201],
        skills: [704],
        autoAttack: 10064,
        img: "147", rarity: 4, evo: 2,
        fullName: "Etain, Butterfly Tamer II"
    },
    10317: {
        name: "Eton", stats: [10904, 10490, 10490, 12952, 12952],
        skills: [94],
        img: "174", rarity: 4, evo: 4,
        fullName: "Eton, Eater of Darkness II"
    },
    10708: {
        name: "Ettin", stats: [16063, 14482, 14677, 9498, 13702],
        skills: [304],
        autoAttack: 10006,
        img: "31f", rarity: 4, evo: 2,
        fullName: "Ettin II"
    },
    11358: {
        name: "Europa", stats: [14731, 8296, 12207, 16735, 16518],
        skills: [538, 539],
        autoAttack: 10007,
        img: "425", rarity: 4, evo: 2,
        fullName: "Europa, Fallen Heroine II"
    },
    10452: {
        name: "Evil Eye", stats: [10770, 10394, 10490, 12221, 11721],
        skills: [120],
        img: "2bf", rarity: 4, evo: 4,
        fullName: "Evil Eye II"
    },
    11503: {
        name: "Fenghuang", stats: [15218, 7494, 12261, 17190, 16345],
        skills: [686, 687],
        autoAttack: 10019,
        img: "1ce", rarity: 4, evo: 2,
        fullName: "Fenghuang, Bird Divine II"
    },
    10674: {
        name: "Fenrir", stats: [15099, 16865, 22498, 13008, 11167],
        skills: [154],
        img: "1dd", rarity: 5, evo: 2,
        fullName: "Fenrir II"
    },
    21352: {
        name: "Siege Tower", stats: [20007, 19750, 16915, 14021, 17567],
        skills: [548],
        autoAttack: 10029,
        img: "293", rarity: 5, evo: 3,
        fullName: "Ferocious Siege Tower"
    },
    10496: {
        name: "Bat Demon", stats: [12538, 14182, 12648, 11928, 12720],
        skills: [131],
        img: "10e", rarity: 4, evo: 4,
        fullName: "Fiendish Bat Demon II"
    },
    11435: {
        name: "Figgo", stats: [15509, 16377, 13451, 6051, 16534],
        skills: [614],
        img: "275", rarity: 4, evo: 4,
        fullName: "Figgo, Executioner II"
    },
    10849: {
        name: "Fimbul", stats: [12086, 13489, 12562, 16743, 12597],
        skills: [242],
        img: "24a", rarity: 4, evo: 4,
        fullName: "Fimbul Frostclad II"
    },
    10470: {
        name: "Flame Dragon", stats: [14601, 14449, 13756, 15153, 13940],
        skills: [23],
        img: "18e", rarity: 5, evo: 2,
        fullName: "Flame Dragon II"
    },
    10888: {
        name: "Flesh Collector Golem", stats: [17450, 14536, 18089, 8664, 9661],
        skills: [253],
        img: "252", rarity: 4, evo: 2,
        fullName: "Flesh Collector Golem II"
    },
    10606: {
        name: "Fomor", stats: [13052, 14645, 11928, 9967, 9781],
        skills: [138],
        img: "143", rarity: 4, evo: 4,
        fullName: "Fomor the Savage II"
    },
    10473: {
        name: "Freila", stats: [11928, 10490, 12453, 12221, 11417],
        skills: [16],
        img: "3f2", rarity: 4, evo: 4,
        fullName: "Freila the Bountiful II"
    },
    11191: {
        name: "Freyja", stats: [14709, 17125, 14027, 10213, 12380],
        skills: [387],
        img: "3c8", rarity: 4, evo: 2,
        fullName: "Freyja, Earth Goddess II"
    },
    11190: {
        name: "Freyr", stats: [16562, 19909, 15370, 12943, 15998],
        skills: [385, 386],
        img: "151", rarity: 5, evo: 2,
        fullName: "Freyr, God of the Harvest II"
    },
    11115: {
        name: "Bearwolf", stats: [14503, 24513, 11492, 11405, 17992],
        skills: [353],
        img: "25b", rarity: 5, evo: 2,
        fullName: "Frost Bearwolf II"
    },
    10022: {
        name: "Galahad", stats: [6543, 7271, 7349, 6842, 6478],
        skills: [10000, 33, 5],
        isMounted: true,
        img: "4e2", rarity: 4, evo: 2,
        fullName: "Galahad, Drake Knight II"
    },
    11172: {
        name: "Galatea", stats: [19833, 10062, 15825, 18566, 15218],
        skills: [533],
        autoAttack: 10007,
        img: "48a", rarity: 5, evo: 2,
        fullName: "Galatea, Nereid II"
    },
    201: {
        name: "Gan Ceann", stats: [7950, 10530, 8830, 8910, 8540],
        skills: [33],
        img: "2ca", rarity: 4, evo: 1,
        fullName: "Gan Ceann"
    },
    10842: {
        name: "Gargoyle Gatekeeper", stats: [15608, 17602, 14503, 15002, 18035],
        skills: [268],
        img: "277", rarity: 5, evo: 2,
        fullName: "Gargoyle Gatekeeper II"
    },
    21384: {
        name: "Garshasp", stats: [22002, 18058, 20019, 20007, 8223],
        skills: [578],
        autoAttack: 10034,
        img: "225", rarity: 5, evo: 3,
        fullName: "Garshasp, the Juggernaut"
    },
    10609: {
        name: "Garuda", stats: [14417, 14677, 14081, 15814, 15023],
        skills: [47],
        img: "1bf", rarity: 5, evo: 2,
        fullName: "Garuda II"
    },
    10571: {
        name: "Gathgoic", stats: [14839, 16128, 14980, 17948, 14709],
        skills: [141],
        img: "3fb", rarity: 5, evo: 2,
        fullName: "Gathgoic the Other II"
    },
    10742: {
        name: "Gevi", stats: [15565, 15424, 18447, 13593, 11015],
        skills: [180],
        img: "255", rarity: 5, evo: 2,
        fullName: "Gevi, Crystal Troll Master II"
    },
    10088: {
        name: "Ghislandi", stats: [12324, 13551, 13525, 12212, 12187],
        skills: [17],
        img: "468", rarity: 4, evo: 4,
        fullName: "Ghislandi, Iron Heart II"
    },
    11271: {
        name: "Ghislandi L", stats: [18533, 20234, 14590, 10235, 16204],
        skills: [455, 456],
        autoAttack: 10015,
        img: "391", rarity: 5, evo: 2,
        fullName: "Ghislandi, the Unchained II"
    },
    11453: {
        name: "GCE", stats: [15100, 7564, 11403, 17254, 16609],
        skills: [604],
        autoAttack: 10007,
        img: "333", rarity: 4, evo: 4,
        fullName: "Ghost Carriage Express II"
    },
    11304: {
        name: "Gigantopithecus", stats: [24210, 25055, 21946, 13994, 15998],
        skills: [491],
        img: "3e5", rarity: 6, evo: 2,
        fullName: "Gigantopithecus II"
    },
    11375: {
        name: "Gilgamesh", stats: [20115, 19053, 18013, 8220, 16096],
        skills: [558, 559],
        img: "1e1", rarity: 5, evo: 2,
        fullName: "Gilgamesh the Bold II"
    },
    10177: {
        name: "Goblin King", stats: [8144, 8339, 6400, 10159, 10278],
        skills: [18],
        img: "34f", rarity: 4, evo: 2,
        fullName: "Goblin King II"
    },
    10011: {
        name: "Gorgon", stats: [10170, 12436, 8652, 12773, 10924],
        skills: [18],
        img: "46f", rarity: 4, evo: 4,
        fullName: "Gorgon II"
    },
    10611: {
        name: "Gorlin", stats: [11928, 12380, 17000, 6809, 10904],
        skills: [167],
        img: "150", rarity: 4, evo: 4,
        fullName: "Gorlin Gold Helm II"
    },
    10720: {
        name: "Goviel", stats: [14135, 14547, 13604, 14926, 16616],
        skills: [204],
        img: "290", rarity: 5, evo: 2,
        fullName: "Goviel, Hail Knight II"
    },
    10551: {
        name: "Grandor", stats: [14709, 17277, 15738, 13756, 11903],
        skills: [149],
        img: "365", rarity: 5, evo: 2,
        fullName: "Grandor, Giant of Old II"
    },
    10586: {
        name: "Gregoire", stats: [11708, 12121, 10318, 14854, 10159],
        skills: [144],
        img: "308", rarity: 4, evo: 4,
        fullName: "Gregoire, Weaponmaster II"
    },
    11131: {
        name: "Gregory", stats: [16192, 16121, 15558, 9794, 10294],
        skills: [372],
        img: "248", rarity: 4, evo: 4,
        fullName: "Gregory, the Masked Slayer II"
    },
    10791: {
        name: "Grellas", stats: [12066, 14796, 10636, 17374, 13073],
        skills: [212],
        img: "211", rarity: 4, evo: 2,
        fullName: "Grellas Fellstaff II"
    },
    21216: {
        name: "Gremory", stats: [18466, 12819, 18945, 20426, 17009],
        skills: [411],
        autoAttack: 10007,
        img: "20b", rarity: 5, evo: 3,
        fullName: "Gremory, the Vermilion Moon"
    },
    10784: {
        name: "Gretch", stats: [16280, 15305, 12683, 15652, 13875],
        skills: [196],
        img: "3a9", rarity: 5, evo: 2,
        fullName: "Gretch, Chimaera Mistress II"
    },
    10182: {
        name: "Griffin", stats: [11887, 9909, 14391, 14263, 11960],
        skills: [2],
        img: "457", rarity: 4, evo: 4,
        fullName: "Griffin Mount II"
    },
    361: {
        name: "Griflet", stats: [11520, 12970, 11430, 10110, 13780],
        skills: [10],
        img: "2b1", rarity: 5, evo: 1,
        fullName: "Griflet, Falcon Knight"
    },
    10276: {
        name: "Grim", stats: [11001, 13047, 8888, 13026, 11060],
        skills: [109],
        img: "17f", rarity: 4, evo: 4,
        fullName: "Grim Executioner II"
    },
    10925: {
        name: "Grimoire", stats: [15231, 18609, 10441, 8064, 15451],
        skills: [134],
        img: "49b", rarity: 4, evo: 4,
        fullName: "Grimoire Beast II"
    },
    11579: {
        name: "Gryla", stats: [17049, 4363, 15489, 16594, 15500],
        skills: [879, 880],
        autoAttack: 10007,
        isMounted: true,
        img: "3a9", rarity: 4, evo: 2,
        fullName: "Gryla, Swap II"
    },
    11170: {
        name: "Gryla", stats: [16529, 11622, 15868, 15294, 8740],
        skills: [308, 316],
        isMounted: true,
        img: "2c3", rarity: 4, evo: 2,
        fullName: "Gryla, the Lullaby II"
    },
    21285: {
        name: "Guillaume", stats: [21515, 20887, 16308, 12948, 18505],
        skills: [466, 467],
        img: "122", rarity: 5, evo: 3,
        fullName: "Guillaume, Fanatic"
    },
    10898: {
        name: "Hamad", stats: [10294, 10367, 9881, 16416, 10951],
        skills: [265],
        img: "3fd", rarity: 4, evo: 4,
        fullName: "Hamad, the Sweeping Wind II"
    },
    10861: {
        name: "Haokah", stats: [13476, 13928, 11111, 15706, 13245],
        skills: [232],
        img: "198", rarity: 4, evo: 4,
        fullName: "Haokah, the Lightning Brave II"
    },
    11428: {
        name: "Hash", stats: [15034, 13485, 12532, 10441, 17147],
        skills: [641],
        img: "112", rarity: 4, evo: 2,
        fullName: "Hash, Lizardman Cannoneer II"
    },
    11493: {
        name: "Hati", stats: [15002, 8144, 10777, 17721, 16995],
        skills: [675],
        autoAttack: 10059,
        img: "230", rarity: 4, evo: 2,
        fullName: "Hati, Icetail Wolf II"
    },
    11451: {
        name: "Hatshepsut", stats: [17049, 16334, 13041, 6097, 16096],
        skills: [603],
        autoAttack: 10040,
        img: "2bd", rarity: 4, evo: 2,
        fullName: "Hatshepsut, Mummy Queen II"
    },
    11543: {
        name: "He Qiong", stats: [24253, 14243, 22206, 23051, 17992],
        skills: [827],
        autoAttack: 10007,
        img: "359", rarity: 6, evo: 2,
        fullName: "He Qiong, the Transcendent II"
    },
    11478: {
        name: "Hecatoncheir", stats: [15509, 15158, 14024, 8759, 15706],
        skills: [676],
        img: "2e5", rarity: 4, evo: 4,
        fullName: "Hecatoncheir Rimetouch II"
    },
    10951: {
        name: "Hecatoncheir", stats: [11807, 13902, 14768, 13928, 13366],
        skills: [264],
        img: "488", rarity: 4, evo: 4,
        fullName: "Hecatoncheir the Adamantine II"
    },
    21312: {
        name: "Hei Long", stats: [20486, 13485, 16192, 20881, 17113],
        skills: [496],
        autoAttack: 10019,
        img: "1bd", rarity: 5, evo: 3,
        fullName: "Hei Long, the New Moon"
    },
    10465: {
        name: "Heinrich", stats: [16887, 13940, 15132, 13290, 14005],
        skills: [133],
        img: "305", rarity: 5, evo: 2,
        fullName: "Heinrich the Bold II"
    },
    10634: {
        name: "Hel", stats: [14709, 17450, 14709, 15771, 18057],
        skills: [239, 240],
        img: "1e8", rarity: 5, evo: 2,
        fullName: "Hel, Goddess of Death II"
    },
    10895: {
        name: "Hercinia", stats: [14062, 13414, 12562, 12686, 15876],
        skills: [225],
        img: "1a4", rarity: 4, evo: 4,
        fullName: "Hercinia the Blest II"
    },
    11202: {
        name: "Hereward", stats: [14927, 14000, 12524, 10951, 15498],
        skills: [391],
        img: "105", rarity: 4, evo: 4,
        fullName: "Hereward, Storm of Arrows II"
    },
    11073: {
        name: "Hippocamp", stats: [14514, 16486, 14926, 19855, 15002],
        skills: [360, 167],
        img: "4f8", rarity: 5, evo: 2,
        fullName: "Hippocamp II"
    },
    10560: {
        name: "Hippogriff", stats: [9978, 11063, 11942, 9295, 10074],
        skills: [133],
        img: "43e", rarity: 4, evo: 4,
        fullName: "Hippogriff of Rites II"
    },
    10726: {
        name: "Hlokk", stats: [14328, 14462, 12832, 9271, 17133],
        skills: [502, 503],
        img: "37a", rarity: 4, evo: 4,
        fullName: "Hlokk, Blade of Thunder II"
    },
    10635: {
        name: "Hollofernyiges", stats: [16551, 16757, 13875, 14568, 16941],
        skills: [33],
        img: "320", rarity: 5, evo: 2,
        fullName: "Hollofernyiges II"
    },
    11297: {
        name: "Hoska", stats: [18996, 7906, 15096, 17023, 8881],
        skills: [484, 485],
        autoAttack: 10016,
        img: "26c", rarity: 4, evo: 4,
        fullName: "Hoska, the Firestroke II"
    },
    11540: {
        name: "Houdi", stats: [13293, 6006, 10001, 15498, 12001],
        skills: [822],
        autoAttack: 10003,
        img: "14b", rarity: 4, evo: 4,
        fullName: "Houdi, the Illusory Flame II"
    },
    10704: {
        name: "Hraesvelg", stats: [12499, 17472, 11784, 12662, 13799],
        skills: [251],
        img: "3cd", rarity: 4, evo: 2,
        fullName: "Hraesvelg, Corpse Feaster II"
    },
    10715: {
        name: "Hrimthurs", stats: [13414, 15572, 16144, 9783, 10600],
        skills: [205],
        img: "2e9", rarity: 4, evo: 4,
        fullName: "Hrimthurs the Blizzard II"
    },
    11401: {
        name: "Huan", stats: [14005, 14406, 13106, 9997, 16096],
        skills: [577],
        img: "1d4", rarity: 4, evo: 2,
        fullName: "Huan, Doomcaller II"
    },
    10980: {
        name: "Hundred-eyed Warrior", stats: [17385, 18501, 15641, 10452, 17634],
        skills: [289],
        img: "221", rarity: 5, evo: 2,
        fullName: "Hundred-eyed Warrior II"
    },
    10970: {
        name: "Hypnos", stats: [16291, 17277, 15446, 12488, 17992],
        skills: [274],
        img: "43b", rarity: 5, evo: 2,
        fullName: "Hypnos, Lord of Dreams II"
    },
    11393: {
        name: "Icarus", stats: [15186, 14796, 14005, 7137, 17363],
        skills: [568, 569],
        img: "194", rarity: 4, evo: 2,
        fullName: "Icarus, Fallen Hero II"
    },
    11569: {
        name: "Icemelt", stats: [11794, 8101, 8502, 14402, 14000],
        skills: [858],
        img: "408", rarity: 4, evo: 4,
        fullName: "Icemelt Dragon II"
    },
    10688: {
        name: "Ignis", stats: [11022, 11312, 10818, 13460, 12859],
        skills: [164],
        img: "22f", rarity: 4, evo: 2,
        fullName: "Ignis Fatuus II"
    },
    11064: {
        name: "Ijiraq L", stats: [16995, 14449, 17006, 19508, 12987],
        skills: [328, 329],
        img: "33c", rarity: 5, evo: 2,
        fullName: "Ijiraq the Brinicle II"
    },
    10706: {
        name: "Ijiraq", stats: [13929, 14536, 9791, 17797, 12012],
        skills: [168],
        img: "21b", rarity: 4, evo: 2,
        fullName: "Ijiraq, the Glacier II"
    },
    21104: {
        name: "IIG", stats: [23155, 19935, 21027, 8440, 17505],
        skills: [444, 445],
        img: "15f", rarity: 5, evo: 3,
        fullName: "Impregnable Iron Golem"
    },
    11144: {
        name: "Infested Cyclops", stats: [19508, 19508, 15392, 9997, 15348],
        skills: [364],
        img: "3db", rarity: 5, evo: 2,
        fullName: "Infested Cyclops II"
    },
    11120: {
        name: "Infested Minotaur", stats: [13691, 15294, 16031, 9390, 14070],
        skills: [299, 301],
        img: "3ab", rarity: 4, evo: 2,
        fullName: "Infested Minotaur II"
    },
    10319: {
        name: "Peryton", stats: [10904, 9674, 10490, 10490, 12952],
        skills: [33],
        img: "12b", rarity: 4, evo: 4,
        fullName: "Infested Peryton II"
    },
    11342: {
        name: "Ghost Ship", stats: [15365, 12879, 11928, 10951, 16803],
        skills: [525],
        img: "20f", rarity: 4, evo: 4,
        fullName: "Inhabited Ghost Ship II"
    },
    21416: {
        name: "Mercury", stats: [22700, 20970, 18517, 12020, 18005],
        skills: [814, 815],
        img: "3d8", rarity: 5, evo: 3,
        fullName: "Intrepid Hand of Mercury"
    },
    21475: {
        name: "Uranus", stats: [21943, 9529, 18525, 20649, 17742],
        skills: [674],
        autoAttack: 10058,
        img: "3d5", rarity: 5, evo: 3,
        fullName: "Intrepid Hand of Uranus"
    },
    21511: {
        name: "Venus", stats: [21967, 19039, 19982, 18011, 9391],
        skills: [709],
        autoAttack: 10066,
        img: "21d", rarity: 5, evo: 3,
        fullName: "Intrepid Hand of Venus"
    },
    693: {
        name: "Ioskeha", stats: [13138, 13611, 11162, 15329, 13675],
        skills: [160],
        img: "222", rarity: 4, evo: 2,
        fullName: "Ioskeha"
    },
    10592: {
        name: "Ira", stats: [12832, 14489, 8770, 11172, 17254],
        skills: [138],
        img: "46c", rarity: 4, evo: 4,
        fullName: "Ira, Hypnotic Specter II"
    },
    10681: {
        name: "Iron Golem", stats: [16778, 13615, 17818, 9867, 8848],
        skills: [152],
        img: "29f", rarity: 4, evo: 2,
        fullName: "Iron Golem II"
    },
    11594: {
        name: "Isegrim", stats: [12573, 12928, 12049, 8491, 9515],
        skills: [889],
        img: "31d", rarity: 4, evo: 4,
        fullName: "Isegrim, the Lone Wolf II"
    },
    10746: {
        name: "Iseult", stats: [12731, 10977, 11708, 15865, 14193],
        skills: [144],
        img: "13b", rarity: 4, evo: 4,
        fullName: "Iseult the Redeemer II"
    },
    11376: {
        name: "Ishtar", stats: [16009, 16074, 13106, 9022, 14265],
        skills: [560, 561],
        img: "24d", rarity: 4, evo: 2,
        fullName: "Ishtar, Goddess of Love II"
    },
    11351: {
        name: "Ivy", stats: [16341, 3882, 13803, 15889, 17998],
        skills: [536],
        autoAttack: 10026,
        img: "373", rarity: 4, evo: 4,
        fullName: "Ivy the Verdant II"
    },
    11407: {
        name: "Ixtab", stats: [20007, 8502, 17472, 17504, 18013],
        skills: [588, 589],
        autoAttack: 10031,
        img: "294", rarity: 5, evo: 2,
        fullName: "Ixtab, Guardian of the Dead II"
    },
    11009: {
        name: "Jabberwock", stats: [13994, 16193, 13008, 19508, 18024],
        skills: [271, 270],
        img: "41f", rarity: 5, evo: 2,
        fullName: "Jabberwock, Phantom Dragon II"
    },
    11169: {
        name: "Jack", stats: [13507, 9000, 12196, 16204, 16995],
        skills: [333],
        autoAttack: 10009,
        img: "10b", rarity: 4, evo: 2,
        fullName: "Jack o' Frost II"
    },
    11448: {
        name: "Jack Rusty", stats: [17021, 16123, 10148, 9539, 15121],
        skills: [609],
        autoAttack: 10044,
        img: "46a", rarity: 4, evo: 4,
        fullName: "Jack, the Rusty II"
    },
    21558: {
        name: "Jarilo", stats: [20987, 21955, 18023, 12050, 17965],
        skills: [841],
        autoAttack: 10109,
        img: "31b", rarity: 5, evo: 3,
        fullName: "Jarilo, God of Fertility"
    },
    11523: {
        name: "Jason", stats: [15348, 18024, 11015, 8978, 16876],
        skills: [802, 803],
        img: "4c7", rarity: 4, evo: 2,
        fullName: "Jason, Fallen Hero II"
    },
    10569: {
        name: "Jinx-eye", stats: [14709, 15998, 13832, 13832, 14915],
        skills: [146],
        img: "1c4", rarity: 5, evo: 2,
        fullName: "Jinx-eye Dragon II"
    },
    11266: {
        name: "Jormungandr", stats: [13024, 16768, 11756, 10112, 15889],
        skills: [438],
        autoAttack: 10012,
        img: "397", rarity: 4, evo: 4,
        fullName: "Jormungandr, World Serpent II"
    },
    11536: {
        name: "Juno", stats: [19552, 18501, 17006, 17992, 9000],
        skills: [817, 818],
        img: "489", rarity: 5, evo: 2,
        fullName: "Juno, Goddess of Affection II"
    },
    10510: {
        name: "Kagemaru", stats: [14319, 16973, 13940, 13420, 14568],
        skills: [137],
        img: "430", rarity: 5, evo: 2,
        fullName: "Kagemaru, Master Ninja II"
    },
    21463: {
        name: "Kaikias", stats: [22014, 20007, 18560, 12611, 17742],
        skills: [647],
        autoAttack: 10050,
        img: "350", rarity: 5, evo: 3,
        fullName: "Kaikias, the Hail God"
    },
    11121: {
        name: "Kalevan", stats: [12629, 18013, 11914, 12055, 13821],
        skills: [297, 240],
        img: "3bd", rarity: 4, evo: 2,
        fullName: "Kalevan, the Forest Green II"
    },
    10804: {
        name: "Kangana", stats: [15803, 18750, 14872, 12813, 13247],
        skills: [216],
        img: "2b1", rarity: 5, evo: 2,
        fullName: "Kangana, the Maelstrom II"
    },
    11544: {
        name: "Karna", stats: [19324, 20310, 15478, 11004, 17461],
        skills: [828],
        autoAttack: 10103,
        img: "365", rarity: 5, evo: 2,
        fullName: "Karna, the Red Eye II"
    },
    10789: {
        name: "Katiria", stats: [10807, 11318, 11356, 10245, 11623],
        skills: [156],
        img: "2b6", rarity: 4, evo: 4,
        fullName: "Katiria Nullblade II"
    },
    11125: {
        name: "Kekro", stats: [17992, 12001, 15002, 19660, 16302],
        skills: [379],
        autoAttack: 10007,
        img: "33b", rarity: 5, evo: 2,
        fullName: "Kekro, Demiwyrm Magus II"
    },
    10767: {
        name: "Kelaino", stats: [12538, 12707, 10490, 15047, 14999],
        skills: [197],
        img: "405", rarity: 4, evo: 4,
        fullName: "Kelaino, the Dark Cloud II"
    },
    11532: {
        name: "Kibitsuhiko", stats: [19335, 18642, 16562, 11448, 17981],
        skills: [809, 810],
        img: "38d", rarity: 5, evo: 2,
        fullName: "Kibitsuhiko, Ogre Slayer II"
    },
    11381: {
        name: "Kijin", stats: [17047, 3323, 14038, 17402, 16110],
        skills: [566],
        autoAttack: 10031,
        img: "23a", rarity: 4, evo: 4,
        fullName: "Kijin, Heavenly Maiden II"
    },
    11279: {
        name: "Kobold", stats: [14207, 14462, 15804, 8442, 14999],
        skills: [449],
        img: "16e", rarity: 4, evo: 4,
        fullName: "Kobold Guard Captain II"
    },
    11502: {
        name: "Kokopelli", stats: [19584, 18858, 13799, 11102, 18187],
        skills: [684, 685],
        isMounted: true,
        img: "210", rarity: 5, evo: 2,
        fullName: "Kokopelli Mana II"
    },
    11524: {
        name: "Kokuanten", stats: [18999, 7050, 19996, 20505, 13994],
        skills: [697, 698],
        autoAttack: 10003,
        img: "2ad", rarity: 5, evo: 2,
        fullName: "Kokuanten, the Ominous II"
    },
    11519: {
        name: "Koroku", stats: [15341, 16561, 13013, 7492, 16853],
        skills: [705],
        autoAttack: 10065,
        img: "11f", rarity: 4, evo: 4,
        fullName: "Koroku, the Death Stinger II"
    },
    11516: {
        name: "Kotyangwuti", stats: [18512, 9509, 15023, 20028, 17992],
        skills: [703],
        autoAttack: 10063,
        img: "3ce", rarity: 5, evo: 2,
        fullName: "Kotyangwuti, Spider Spirit II"
    },
    11314: {
        name: "Kua Fu", stats: [16510, 16561, 12207, 9174, 13476],
        skills: [497],
        img: "3e3", rarity: 4, evo: 4,
        fullName: "Kua Fu, Sun Chaser II"
    },
    10911: {
        name: "Kyteler", stats: [11721, 12524, 9892, 17254, 16416],
        skills: [258],
        img: "4d4", rarity: 4, evo: 4,
        fullName: "Kyteler the Corrupted II"
    },
    11506: {
        name: "Lachesis", stats: [17992, 9596, 15002, 19205, 17753],
        skills: [689, 690],
        autoAttack: 10003,
        img: "2ba", rarity: 5, evo: 2,
        fullName: "Lachesis, the Measurer II"
    },
    10985: {
        name: "Lahamu", stats: [14024, 10784, 15999, 16010, 11001],
        skills: [281],
        autoAttack: 10004,
        img: "2fe", rarity: 4, evo: 4,
        fullName: "Lahamu, Royal Viper II"
    },
    21372: {
        name: "Lamashtu", stats: [20579, 17977, 20007, 12062, 17685],
        skills: [555],
        img: "2e5", rarity: 5, evo: 3,
        fullName: "Lamashtu, Fell Goddess"
    },
    10432: {
        name: "Lanvall", stats: [12914, 14639, 12245, 12210, 15040],
        skills: [18],
        img: "163", rarity: 4, evo: 4,
        fullName: "Lanvall, Lizard Cavalier II"
    },
    11347: {
        name: "Lava Dragon", stats: [19021, 8881, 16237, 18891, 16497],
        skills: [534, 535],
        autoAttack: 10019,
        img: "3de", rarity: 5, evo: 2,
        fullName: "Lava Dragon II"
    },
    21590: {
        name: "Lenore", stats: [13182, 9455, 12120, 8404, 12900],
        skills: [884],
        img: "271", rarity: 4, evo: 2,
        fullName: "Lenore, the False II"
    },
    11590: {
        name: "Lenore", stats: [15903, 12280, 13745, 8709, 17292],
        skills: [883],
        autoAttack: 10061,
        img: "1e6", rarity: 4, evo: 4,
        fullName: "Lenore, the Sly Fox II"
    },
    11128: {
        name: "Leupold", stats: [17585, 11038, 12963, 9794, 16510],
        skills: [378],
        img: "4ca", rarity: 4, evo: 4,
        fullName: "Leupold, Wyvern Knight II"
    },
    10852: {
        name: "Libuse", stats: [11221, 13782, 13379, 16048, 13038],
        skills: [245],
        img: "27e", rarity: 4, evo: 4,
        fullName: "Libuse, the Black Queen II"
    },
    10933: {
        name: "Linnorm", stats: [12326, 11102, 11979, 16605, 16497],
        skills: [313],
        img: "30b", rarity: 4, evo: 2,
        fullName: "Linnorm, the Hailstorm II"
    },
    21433: {
        name: "Liza", stats: [22491, 9517, 16542, 21861, 18011],
        skills: [613],
        autoAttack: 10045,
        img: "4ff", rarity: 5, evo: 3,
        fullName: "Liza, Blood-Anointed"
    },
    21187: {
        name: "Loki", stats: [19202, 21231, 16192, 15119, 15806],
        skills: [382],
        img: "47b", rarity: 5, evo: 3,
        fullName: "Loki, God of Cunning"
    },
    11316: {
        name: "Long Feng", stats: [15164, 17125, 13539, 10452, 12207],
        skills: [501],
        img: "2ad", rarity: 4, evo: 2,
        fullName: "Long Feng, the Dragon Fist II"
    },
    11576: {
        name: "Lubberkin", stats: [15793, 12965, 16144, 6078, 17060],
        skills: [871],
        autoAttack: 10061,
        img: "1fc", rarity: 4, evo: 4,
        fullName: "Lubberkin, Four Leaf Clover II"
    },
    11440: {
        name: "Lucan", stats: [25304, 22011, 18349, 17916, 18154],
        skills: [634],
        autoAttack: 10049,
        img: "419", rarity: 6, evo: 2,
        fullName: "Lucan, Eagle Knight II"
    },
    10754: {
        name: "Lucia", stats: [17106, 13878, 16633, 9881, 10857],
        skills: [16],
        img: "197", rarity: 4, evo: 4,
        fullName: "Lucia, Petal-Shears II"
    },
    11485: {
        name: "Luot", stats: [18013, 17992, 17006, 9997, 18035],
        skills: [668],
        autoAttack: 10054,
        img: "2c3", rarity: 5, evo: 2,
        fullName: "Luot, Scout II"
    },
    10794: {
        name: "Ma-Gu", stats: [14182, 12438, 11477, 15306, 12438],
        skills: [4],
        img: "2a8", rarity: 4, evo: 4,
        fullName: "Ma-Gu the Enlightened II"
    },
    11535: {
        name: "Macaca", stats: [13962, 13671, 12025, 6368, 9453],
        skills: [813],
        img: "2a6", rarity: 4, evo: 4,
        fullName: "Macaca, the Headlong II"
    },
    11141: {
        name: "Lynx", stats: [14207, 14062, 12500, 10014, 17147],
        skills: [493],
        img: "321", rarity: 4, evo: 4,
        fullName: "Madprowl Lynx II"
    },
    10558: {
        name: "Magdal", stats: [13929, 15110, 15132, 13810, 15359],
        skills: [120],
        img: "1c0", rarity: 5, evo: 2,
        fullName: "Magdal Dragonheart II"
    },
    11126: {
        name: "Magdal M", stats: [18728, 20917, 21491, 23235, 15998],
        skills: [336],
        img: "346", rarity: 6, evo: 2,
        fullName: "Magdal, Dragonmaster II"
    },
    11429: {
        name: "Maisie", stats: [19194, 19097, 16258, 8101, 17905],
        skills: [599, 600],
        autoAttack: 10037,
        img: "1da", rarity: 5, evo: 2,
        fullName: "Maisie, Grimoire Keeper II"
    },
    10365: {
        name: "Makalipon", stats: [10343, 8405, 10611, 12280, 10343],
        skills: [60],
        img: "1f1", rarity: 4, evo: 4,
        fullName: "Makalipon, Sacred Fruit II"
    },
    11456: {
        name: "Chimaera", stats: [19519, 9986, 16009, 17038, 18013],
        skills: [612, 134],
        autoAttack: 10043,
        img: "4a7", rarity: 5, evo: 2,
        fullName: "Maleficent Chimaera II"
    },
    10445: {
        name: "Managarmr", stats: [12210, 12258, 13266, 13887, 11688],
        skills: [108],
        img: "151", rarity: 4, evo: 4,
        fullName: "Managarmr Frost Touch II"
    },
    11280: {
        name: "Managarmr M", stats: [20007, 21599, 17396, 23907, 18100],
        skills: [463],
        autoAttack: 10007,
        img: "42b", rarity: 6, evo: 2,
        fullName: "Managarmr, the Frost Moon II"
    },
    11319: {
        name: "Manannan", stats: [16551, 10668, 16464, 19227, 16605],
        skills: [513, 514],
        autoAttack: 10007,
        img: "4a4", rarity: 5, evo: 2,
        fullName: "Manannan mac Lir II"
    },
    10792: {
        name: "Marchosias", stats: [18165, 15424, 12781, 18566, 13561],
        skills: [210],
        img: "271", rarity: 5, evo: 2,
        fullName: "Marchosias, Pit Beast II"
    },
    11136: {
        name: "Marcus", stats: [12317, 16534, 14255, 8991, 15438],
        skills: [358],
        img: "353", rarity: 4, evo: 4,
        fullName: "Marcus, Brave of Liberation II"
    },
    332: {
        name: "Mari", stats: [10500, 10980, 10850, 13370, 11500],
        skills: [47],
        img: "1e4", rarity: 5, evo: 1,
        fullName: "Mari the Witch"
    },
    11013: {
        name: "Marraco", stats: [18716, 15876, 17254, 7381, 8809],
        skills: [167, 61],
        img: "47b", rarity: 4, evo: 4,
        fullName: "Marraco, Crusted Wyrm II"
    },
    10656: {
        name: "Mathilda", stats: [11841, 15172, 10639, 12718, 15218],
        skills: [115],
        img: "368", rarity: 4, evo: 4,
        fullName: "Mathilda the Tarantula II"
    },
    10632: {
        name: "Doog", stats: [10560, 10549, 10777, 14330, 11925],
        skills: [94],
        img: "409", rarity: 4, evo: 2,
        fullName: "Mauthe Doog II"
    },
    11550: {
        name: "Medea", stats: [17493, 18598, 17493, 10300, 5999],
        skills: [834],
        autoAttack: 10107,
        img: "37b", rarity: 4, evo: 2,
        fullName: "Medea, Vengeful Queen II"
    },
    10705: {
        name: "Melanippe", stats: [16139, 16800, 13929, 11849, 15132],
        skills: [195],
        img: "44f", rarity: 5, evo: 2,
        fullName: "Melanippe, Wolfrider II"
    },
    11214: {
        name: "Melek", stats: [19097, 16107, 21545, 12792, 10094],
        skills: [374, 375],
        img: "219", rarity: 5, evo: 2,
        fullName: "Melek, the Black Peacock II"
    },
    10527: {
        name: "Melusine", stats: [11417, 11976, 10490, 13562, 11210],
        skills: [155],
        img: "272", rarity: 4, evo: 4,
        fullName: "Melusine the Witch II"
    },
    11305: {
        name: "Microraptor", stats: [16172, 18577, 14406, 14092, 17753],
        skills: [492],
        img: "414", rarity: 5, evo: 2,
        fullName: "Microraptor II"
    },
    11212: {
        name: "Millarca", stats: [15305, 10668, 15565, 21393, 18046],
        skills: [407, 408],
        autoAttack: 10007,
        img: "2ff", rarity: 5, evo: 2,
        fullName: "Millarca, Lady of Thorns II"
    },
    11134: {
        name: "Minerva", stats: [14590, 18024, 14438, 15435, 18013],
        skills: [357],
        img: "2a2", rarity: 5, evo: 2,
        fullName: "Minerva, Goddess of War II"
    },
    11533: {
        name: "Momoso", stats: [15034, 16973, 11925, 9997, 15836],
        skills: [811, 812],
        img: "39b", rarity: 4, evo: 2,
        fullName: "Momoso, Pheasant Tamer II"
    },
    11081: {
        name: "Moni", stats: [13562, 15537, 12121, 10234, 16448],
        skills: [340],
        img: "343", rarity: 4, evo: 4,
        fullName: "Moni the Dismemberer II"
    },
    10621: {
        name: "Montu", stats: [12952, 12904, 12269, 12269, 15306],
        skills: [170],
        img: "21d", rarity: 4, evo: 4,
        fullName: "Montu, God of War II"
    },
    308: {
        name: "Mordred", stats: [11000, 12050, 10950, 11000, 12500],
        skills: [18],
        img: "16b", rarity: 5, evo: 1,
        fullName: "Mordred, Drake Knight"
    },
    10625: {
        name: "Moren", stats: [8502, 11318, 7759, 16803, 8039],
        skills: [10000, 71, 85],
        isMounted: true,
        img: "34a", rarity: 4, evo: 4,
        fullName: "Moren, Rime Mage II"
    },
    11233: {
        name: "Musashi", stats: [20592, 24752, 19151, 17981, 18024],
        skills: [404],
        img: "11f", rarity: 6, evo: 2,
        fullName: "Musashi, the Twinblade II"
    },
    10186: {
        name: "Naberius", stats: [9563, 9552, 7828, 11208, 11298],
        skills: [18],
        img: "2e9", rarity: 4, evo: 4,
        fullName: "Naberius II"
    },
    10949: {
        name: "Najeeba", stats: [16230, 7539, 10660, 16681, 16803],
        skills: [642],
        autoAttack: 10003,
        img: "48a", rarity: 4, evo: 4,
        fullName: "Najeeba, the Mapleblade II"
    },
    11015: {
        name: "Narmer", stats: [15876, 12194, 15172, 8870, 15924],
        skills: [260],
        img: "12d", rarity: 4, evo: 4,
        fullName: "Narmer, Mummy King II"
    },
    10989: {
        name: "Nehasim", stats: [12707, 16071, 11390, 12466, 15172],
        skills: [294],
        img: "28b", rarity: 4, evo: 4,
        fullName: "Nehasim the Seething II"
    },
    11057: {
        name: "Neith", stats: [18999, 19660, 15002, 12001, 15305],
        skills: [326],
        img: "23b", rarity: 5, evo: 2,
        fullName: "Neith, Goddess of War II"
    },
    21291: {
        name: "Nephthys", stats: [21015, 11985, 18202, 22005, 16912],
        skills: [471, 472],
        autoAttack: 10007,
        img: "116", rarity: 5, evo: 3,
        fullName: "Nephthys, Ruler of Death"
    },
    10994: {
        name: "Nergal", stats: [13008, 15392, 11947, 11643, 16518],
        skills: [282],
        img: "175", rarity: 4, evo: 2,
        fullName: "Nergal, Abyssal Overseer II"
    },
    11079: {
        name: "Nightblade", stats: [12196, 16995, 13528, 10896, 14915],
        skills: [341],
        img: "164", rarity: 4, evo: 2,
        fullName: "Nightblade, Archsage of Winds II"
    },
    11369: {
        name: "Nin-Ridu", stats: [16529, 16215, 11351, 10495, 14005],
        skills: [505],
        autoAttack: 10022,
        img: "239", rarity: 4, evo: 2,
        fullName: "Nin-Ridu"
    },
    11564: {
        name: "Ninurta", stats: [13465, 6954, 10332, 14120, 11077],
        skills: [848],
        autoAttack: 10007,
        img: "292", rarity: 4, evo: 4,
        fullName: "Ninurta, the Thunderclap II"
    },
    10799: {
        name: "Niu Mo Wang", stats: [14276, 17071, 15998, 13420, 13138],
        skills: [133],
        img: "126", rarity: 5, evo: 2,
        fullName: "Niu Mo Wang II"
    },
    10438: {
        name: "Odin Stormgod", stats: [12855, 14346, 12378, 14929, 12245],
        skills: [119],
        img: "15c", rarity: 4, evo: 4,
        fullName: "Odin Stormgod II"
    },
    11267: {
        name: "Odin L", stats: [15110, 16562, 13875, 17363, 18057],
        skills: [440, 441],
        isMounted: true,
        img: "365", rarity: 5, evo: 2,
        fullName: "Odin, God of Victory II"
    },
    11458: {
        name: "Odoa", stats: [20364, 24600, 16009, 10040, 9520],
        skills: [645, 646],
        img: "1a6", rarity: 5, evo: 2,
        fullName: "Odoa, the Scarecrow II"
    },
    11562: {
        name: "Oka", stats: [16042, 5122, 12120, 17959, 17244],
        skills: [846, 847],
        autoAttack: 10007,
        img: "275", rarity: 4, evo: 2,
        fullName: "Oka, Kunoichi II"
    },
    21465: {
        name: "Okypete Shd.", stats: [12889, 10506, 13084, 6313, 13214],
        skills: [649],
        img: "203", rarity: 4, evo: 2,
        fullName: "Okypete, the Night Breeze II"
    },
    11465: {
        name: "Okypete", stats: [15610, 13331, 15158, 6967, 16840],
        skills: [648],
        autoAttack: 10051,
        img: "39d", rarity: 4, evo: 4,
        fullName: "Okypete, the Swiftwing II"
    },
    11446: {
        name: "Olan", stats: [16497, 14048, 14113, 6779, 17255],
        skills: [610, 611],
        img: "36b", rarity: 4, evo: 2,
        fullName: "Olan, Tricky Succubus II"
    },
    10889: {
        name: "Olitiau", stats: [14081, 15760, 11676, 11232, 15197],
        skills: [221],
        img: "133", rarity: 4, evo: 2,
        fullName: "Olitiau, the Great Bat II"
    },
    10505: {
        name: "Oniroku", stats: [12207, 13731, 12235, 12194, 13621],
        skills: [115],
        img: "196", rarity: 4, evo: 4,
        fullName: "Oniroku the Slayer II"
    },
    11531: {
        name: "Onra", stats: [15719, 16416, 15147, 6710, 15147],
        skills: [807],
        img: "155", rarity: 4, evo: 4,
        fullName: "Onra, Ogre Lord II"
    },
    21531: {
        name: "Onra", stats: [13377, 13496, 12250, 7516, 9368],
        skills: [808],
        img: "3b8", rarity: 4, evo: 2,
        fullName: "Onra, Ogre of Darkness II"
    },
    11088: {
        name: "Ovinnik", stats: [19010, 11210, 20592, 16627, 12315],
        skills: [356, 342],
        autoAttack: 10007,
        img: "3c1", rarity: 5, evo: 2,
        fullName: "Ovinnik, Hex Beast II"
    },
    11408: {
        name: "Pakal", stats: [15435, 15175, 10777, 10018, 17103],
        skills: [590, 591],
        img: "168", rarity: 4, evo: 2,
        fullName: "Pakal, Jade King II"
    },
    11286: {
        name: "Aquarius", stats: [16323, 7494, 11448, 17363, 16009],
        skills: [450, 451],
        autoAttack: 10007,
        img: "2b9", rarity: 4, evo: 2,
        fullName: "Paladin of Aquarius II"
    },
    11210: {
        name: "Aries", stats: [14395, 15543, 16854, 9011, 12813],
        skills: [392, 393],
        img: "337", rarity: 4, evo: 2,
        fullName: "Paladin of Aries II"
    },
    11310: {
        name: "Cancer", stats: [16627, 17201, 10408, 7494, 16908],
        skills: [478, 479],
        img: "24e", rarity: 4, evo: 2,
        fullName: "Paladin of Cancer II"
    },
    11301: {
        name: "Capricorn", stats: [14937, 8491, 13507, 16551, 15099],
        skills: [476],
        autoAttack: 10007,
        img: "2f4", rarity: 4, evo: 2,
        fullName: "Paladin of Capricorn II"
    },
    11325: {
        name: "Gemini", stats: [15197, 15641, 10343, 10148, 17147],
        skills: [511, 512],
        isMounted: true,
        img: "240", rarity: 4, evo: 2,
        fullName: "Paladin of Gemini II"
    },
    11277: {
        name: "Leo", stats: [15121, 15002, 14200, 7440, 16811],
        skills: [448],
        autoAttack: 10014,
        img: "491", rarity: 4, evo: 2,
        fullName: "Paladin of Leo II"
    },
    11200: {
        name: "Libra", stats: [14178, 16172, 14698, 9845, 13669],
        skills: [390],
        img: "486", rarity: 4, evo: 2,
        fullName: "Paladin of Libra II"
    },
    11389: {
        name: "Ophiuchus", stats: [19508, 9000, 15002, 19541, 17504],
        skills: [583, 584],
        autoAttack: 10007,
        img: "13d", rarity: 5, evo: 2,
        fullName: "Paladin of Ophiuchus II"
    },
    11229: {
        name: "Pisces", stats: [13041, 8621, 14796, 17114, 14991],
        skills: [419],
        autoAttack: 10007,
        img: "122", rarity: 4, evo: 2,
        fullName: "Paladin of Pisces II"
    },
    11334: {
        name: "Sagittarius", stats: [15587, 15218, 12163, 8415, 17255],
        skills: [507, 508],
        img: "3c0", rarity: 4, evo: 2,
        fullName: "Paladin of Sagittarius II"
    },
    11353: {
        name: "Scorpio", stats: [14146, 15998, 13117, 8350, 16995],
        skills: [544],
        img: "4fe", rarity: 4, evo: 2,
        fullName: "Paladin of Scorpio II"
    },
    11362: {
        name: "Taurus", stats: [15608, 18598, 10105, 7007, 17363],
        skills: [553, 554],
        img: "2d3", rarity: 4, evo: 2,
        fullName: "Paladin of Taurus II"
    },
    11241: {
        name: "Virgo", stats: [15500, 6118, 12380, 17797, 16822],
        skills: [421, 422],
        autoAttack: 10007,
        img: "4cf", rarity: 4, evo: 2,
        fullName: "Paladin of Virgo II"
    },
    11231: {
        name: "Palna", stats: [14999, 15509, 14606, 8991, 13807],
        skills: [420],
        img: "3fb", rarity: 4, evo: 4,
        fullName: "Palna, the Vanguard II"
    },
    11554: {
        name: "Pandora", stats: [15023, 7028, 13528, 16887, 16529],
        skills: [838, 839],
        autoAttack: 10003,
        img: "12a", rarity: 4, evo: 2,
        fullName: "Pandora, Fallen Heroine II"
    },
    11374: {
        name: "Pazuzu", stats: [15121, 17182, 14988, 5640, 14999],
        skills: [556],
        img: "24d", rarity: 4, evo: 4,
        fullName: "Pazuzu, the Whirling Jinn II"
    },
    11259: {
        name: "Peg Powler", stats: [15500, 7353, 12499, 17049, 16204],
        skills: [636],
        autoAttack: 10047,
        img: "30c", rarity: 4, evo: 2,
        fullName: "Peg Powler II"
    },
    10831: {
        name: "Pegasus Knight", stats: [15251, 19032, 15370, 13073, 18046],
        skills: [311, 312],
        isMounted: true,
        img: "3e4", rarity: 5, evo: 2,
        fullName: "Pegasus Knight II"
    },
    10348: {
        name: "Pegasus", stats: [8756, 10200, 8843, 10880, 9181],
        skills: [111],
        img: "469", rarity: 4, evo: 4,
        fullName: "Pegasus, the Light Divine II"
    },
    11425: {
        name: "Pelops", stats: [15056, 14113, 10018, 12055, 17266],
        skills: [597, 598],
        img: "3ee", rarity: 4, evo: 2,
        fullName: "Pelops, Fallen Hero II"
    },
    10013: {
        name: "Pendragon", stats: [9844, 10317, 10751, 12357, 10861],
        skills: [60],
        img: "345", rarity: 4, evo: 4,
        fullName: "Pendragon, the Scourge II"
    },
    11557: {
        name: "Peony", stats: [17298, 17797, 12250, 7505, 16399],
        skills: [820, 821],
        autoAttack: 10101,
        img: "394", rarity: 4, evo: 2,
        fullName: "Peony, the Jiang Shi II"
    },
    21368: {
        name: "Perendon", stats: [19202, 17300, 17055, 17009, 17604],
        skills: [504],
        autoAttack: 10021,
        img: "124", rarity: 5, evo: 3,
        fullName: "Perendon the Pure"
    },
    11561: {
        name: "Persephone", stats: [18793, 8686, 13929, 21957, 18154],
        skills: [844, 845],
        autoAttack: 10007,
        img: "4b1", rarity: 5, evo: 2,
        fullName: "Persephone, Spring Goddess II"
    },
    11020: {
        name: "Phantasmal Succubus", stats: [18013, 13604, 20007, 17190, 10701],
        skills: [272, 273],
        img: "1fb", rarity: 5, evo: 2,
        fullName: "Phantasmal Succubus II"
    },
    10710: {
        name: "Phantom Assassin", stats: [13507, 13951, 11102, 14341, 14081],
        skills: [193],
        img: "110", rarity: 4, evo: 2,
        fullName: "Phantom Assassin II"
    },
    11022: {
        name: "Phantom Knight", stats: [19877, 23213, 19270, 19682, 18057],
        skills: [267],
        img: "461", rarity: 6, evo: 2,
        fullName: "Phantom Knight, the Vagabond II"
    },
    11469: {
        name: "Phineus", stats: [13597, 7005, 9894, 14561, 10915],
        skills: [654],
        autoAttack: 10007,
        img: "37a", rarity: 4, evo: 4,
        fullName: "Phineus, the Augur King II"
    },
    11567: {
        name: "Phlox", stats: [15047, 5298, 13489, 17499, 16607],
        skills: [863],
        autoAttack: 10003,
        img: "23d", rarity: 4, evo: 4,
        fullName: "Phlox, Avern Witch II"
    },
    11039: {
        name: "Phoenix", stats: [14005, 11188, 12033, 19010, 12185],
        skills: [305],
        img: "125", rarity: 4, evo: 2,
        fullName: "Phoenix, the Metempsychosis II"
    },
    11508: {
        name: "Pixiu", stats: [15706, 15999, 12999, 8005, 16489],
        skills: [691, 701],
        autoAttack: 10060,
        img: "443", rarity: 4, evo: 4,
        fullName: "Pixiu, the Wealthy II"
    },
    21489: {
        name: "Poliahu", stats: [23572, 8648, 17482, 22365, 18202],
        skills: [655, 656],
        autoAttack: 10007,
        img: "17d", rarity: 5, evo: 3,
        fullName: "Poliahu, the Mauna Kea"
    },
    11237: {
        name: "Pollux", stats: [13290, 18631, 11654, 10311, 13756],
        skills: [427, 428],
        img: "1a2", rarity: 4, evo: 2,
        fullName: "Pollux, Fallen Hero II"
    },
    10876: {
        name: "Pontifex", stats: [14590, 16410, 13507, 18371, 17797],
        skills: [229, 167],
        img: "2bd", rarity: 5, evo: 2,
        fullName: "Pontifex Antiquus II"
    },
    10075: {
        name: "Pouliquen", stats: [7890, 6271, 8910, 9439, 7843],
        skills: [16],
        img: "26c", rarity: 4, evo: 4,
        fullName: "Pouliquen, Archibishop II"
    },
    10785: {
        name: "Premyslid", stats: [13626, 16984, 14926, 18772, 11232],
        skills: [244],
        img: "2c7", rarity: 5, evo: 2,
        fullName: "Premyslid, the Black King II"
    },
    10599: {
        name: "Princeps", stats: [9360, 10772, 9674, 10181, 11667],
        skills: [156],
        img: "4dc", rarity: 4, evo: 4,
        fullName: "Princeps, Angel of Doom II"
    },
    11203: {
        name: "Prismatic", stats: [24004, 14438, 20982, 23300, 18024],
        skills: [432],
        autoAttack: 10007,
        img: "4fe", rarity: 6, evo: 2,
        fullName: "Prismatic Wyvern"
    },
    11486: {
        name: "Qing Nu", stats: [19010, 8957, 15002, 19541, 17992],
        skills: [677, 678],
        autoAttack: 10007,
        img: "14f", rarity: 5, evo: 2,
        fullName: "Qing Nu, Snowweaver II"
    },
    11100: {
        name: "Queen Waspmen", stats: [14070, 19898, 13247, 15998, 17829],
        skills: [348],
        img: "1f6", rarity: 5, evo: 2,
        fullName: "Queen of the Waspmen II"
    },
    21340: {
        name: "Cetus", stats: [22316, 20624, 17579, 11013, 16729],
        skills: [524],
        autoAttack: 10021,
        img: "30a", rarity: 5, evo: 3,
        fullName: "Raging Cetus"
    },
    11048: {
        name: "Ragnar", stats: [13245, 15804, 12001, 10294, 16510],
        skills: [314],
        img: "497", rarity: 4, evo: 4,
        fullName: "Ragnar, Dragonslayer II"
    },
    10664: {
        name: "Ramiel", stats: [15543, 13929, 13431, 16388, 14709],
        skills: [185],
        img: "3da", rarity: 5, evo: 2,
        fullName: "Ramiel, Angel of the Storm II"
    },
    10699: {
        name: "Rampant Lion", stats: [16291, 17569, 16518, 12564, 18035],
        skills: [380, 381],
        img: "387", rarity: 5, evo: 2,
        fullName: "Rampant Lion II"
    },
    10806: {
        name: "Rapse", stats: [11928, 14182, 13110, 11270, 15524],
        skills: [179],
        img: "4e0", rarity: 4, evo: 4,
        fullName: "Rapse, the Bloody Horns II"
    },
    11553: {
        name: "Rapunzel", stats: [18349, 20223, 17428, 8805, 18208],
        skills: [836, 837],
        autoAttack: 10108,
        img: "391", rarity: 5, evo: 2,
        fullName: "Rapunzel, Grimoire Keeper II"
    },
    10863: {
        name: "Rasiel", stats: [11936, 15587, 11817, 17797, 11004],
        skills: [234],
        img: "213", rarity: 4, evo: 2,
        fullName: "Rasiel, Angel All-Knowing II"
    },
    21571: {
        name: "Rattlebolt", stats: [19552, 11502, 20007, 20999, 18221],
        skills: [861, 862],
        autoAttack: 10110,
        img: "35b", rarity: 5, evo: 3,
        fullName: "Rattlebolt Wyvern"
    },
    10844: {
        name: "Regin", stats: [12734, 13342, 12832, 16144, 11270],
        skills: [155],
        img: "2b6", rarity: 4, evo: 4,
        fullName: "Regin, the Brass Mantis II"
    },
    11196: {
        name: "Brass Gorilla", stats: [18996, 9760, 18096, 12684, 8319],
        skills: [398],
        img: "26b", rarity: 4, evo: 4,
        fullName: "Reinforced Brass Gorilla II"
    },
    11215: {
        name: "Rohde", stats: [17591, 8101, 16042, 15305, 10582],
        skills: [376, 377],
        autoAttack: 10007,
        img: "23b", rarity: 4, evo: 2,
        fullName: "Rohde, the Rose Thorn II"
    },
    10845: {
        name: "Rovn", stats: [16269, 19086, 18772, 13214, 13355],
        skills: [228],
        img: "2a4", rarity: 5, evo: 2,
        fullName: "Rovn, the Brass Panzer II"
    },
    11066: {
        name: "Ruprecht", stats: [12911, 15316, 11795, 17504, 11199],
        skills: [330, 334],
        img: "479", rarity: 4, evo: 2,
        fullName: "Ruprecht the Punisher II"
    },
    11295: {
        name: "Ryaum", stats: [19454, 13561, 17667, 11221, 17602],
        skills: [482, 483],
        img: "237", rarity: 5, evo: 2,
        fullName: "Ryaum, Hussar Captain II"
    },
    11343: {
        name: "Sachiel", stats: [19357, 14059, 13052, 17017, 17526],
        skills: [527, 528],
        img: "42b", rarity: 5, evo: 2,
        fullName: "Sachiel, Angel of Water II"
    },
    11063: {
        name: "Treant", stats: [18566, 17017, 22542, 13626, 8014],
        skills: [154],
        img: "167", rarity: 5, evo: 2,
        fullName: "Sagacious Treant II"
    },
    11234: {
        name: "Saizo", stats: [16128, 12055, 16367, 19422, 16995],
        skills: [405],
        autoAttack: 10007,
        img: "241", rarity: 5, evo: 2,
        fullName: "Saizo, Phantom Ninja II"
    },
    10966: {
        name: "Saurva", stats: [14958, 15305, 11329, 11362, 15002],
        skills: [259],
        img: "1f3", rarity: 4, evo: 2,
        fullName: "Saurva, the Lawless Lord II"
    },
    21228: {
        name: "Hierophant", stats: [19681, 13391, 17534, 20112, 16950],
        skills: [418],
        autoAttack: 10007,
        img: "1b1", rarity: 5, evo: 3,
        fullName: "Scathing Hierophant"
    },
    10676: {
        name: "Scirocco", stats: [15002, 14503, 14503, 18999, 16497],
        skills: [331, 301],
        img: "3d5", rarity: 5, evo: 2,
        fullName: "Scirocco, Father of Winds II"
    },
    10626: {
        name: "Marid", stats: [14070, 17851, 14449, 12597, 15478],
        skills: [169],
        img: "2ed", rarity: 5, evo: 2,
        fullName: "Scorching Marid II"
    },
    11036: {
        name: "Sea Serpent", stats: [16020, 12012, 15121, 19259, 17103],
        skills: [302],
        img: "165", rarity: 5, evo: 2,
        fullName: "Sea Serpent II"
    },
    11470: {
        name: "Sedna", stats: [20321, 17840, 19129, 7072, 17699],
        skills: [657, 658],
        autoAttack: 10033,
        img: "18d", rarity: 5, evo: 2,
        fullName: "Sedna, the Frozen Sea II"
    },
    11379: {
        name: "Seimei", stats: [19963, 6389, 17038, 19053, 17103],
        skills: [564, 565],
        autoAttack: 10007,
        img: "4b7", rarity: 5, evo: 2,
        fullName: "Seimei, Onmyoji II"
    },
    11204: {
        name: "Seismo", stats: [18999, 19097, 15056, 11015, 16800],
        skills: [433],
        img: "188", rarity: 5, evo: 2,
        fullName: "Seismo Worm"
    },
    10258: {
        name: "Sekhmet", stats: [12529, 16780, 13843, 13598, 13823],
        skills: [11],
        img: "3d7", rarity: 4, evo: 4,
        fullName: "Sekhmet Aflame II"
    },
    11056: {
        name: "Selk", stats: [13902, 15854, 11976, 11208, 14927],
        skills: [327],
        img: "403", rarity: 4, evo: 4,
        fullName: "Selk, Desert King II"
    },
    11321: {
        name: "Selkie", stats: [15804, 8442, 14049, 16024, 13586],
        skills: [515, 516],
        autoAttack: 10007,
        img: "431", rarity: 4, evo: 4,
        fullName: "Selkie, Lady of the Shore II"
    },
    11413: {
        name: "Sera", stats: [14293, 17023, 13306, 7406, 15903],
        skills: [594, 595],
        img: "284", rarity: 4, evo: 4,
        fullName: "Sera, Exorcist II"
    },
    11290: {
        name: "Set", stats: [13097, 16364, 10990, 10001, 17133],
        skills: [469],
        img: "2c6", rarity: 4, evo: 4,
        fullName: "Set, God of the Sands II"
    },
    11006: {
        name: "Siby", stats: [15558, 8005, 11442, 17120, 15804],
        skills: [550],
        autoAttack: 10018,
        img: "20c", rarity: 4, evo: 4,
        fullName: "Siby, Sea Seer II"
    },
    11219: {
        name: "Sigiled Corpse Beast", stats: [17006, 12954, 14926, 19855, 16042],
        skills: [414, 415],
        autoAttack: 10007,
        img: "1f6", rarity: 5, evo: 2,
        fullName: "Sigiled Corpse Beast II"
    },
    11220: {
        name: "Sigiled Axeman", stats: [14644, 9076, 12987, 18338, 13409],
        skills: [416],
        autoAttack: 10007,
        img: "39e", rarity: 4, evo: 2,
        fullName: "Sigiled Skeleton Axeman II"
    },
    11565: {
        name: "Sigurd", stats: [19996, 19053, 14005, 11004, 17992],
        skills: [864, 865],
        img: "25e", rarity: 5, evo: 2,
        fullName: "Sigurd, Dragonslayer II"
    },
    10987: {
        name: "Sihn", stats: [12001, 10495, 12001, 17504, 16497],
        skills: [285],
        img: "453", rarity: 4, evo: 2,
        fullName: "Sihn, Moonlight King II"
    },
    11207: {
        name: "Silver Dragon", stats: [19714, 14601, 15067, 16215, 18154],
        skills: [522, 523],
        autoAttack: 10024,
        img: "48e", rarity: 5, evo: 2,
        fullName: "Silver Dragon II"
    },
    11387: {
        name: "Simurgh", stats: [15524, 6956, 12145, 17206, 16110],
        skills: [580],
        autoAttack: 10007,
        img: "2a2", rarity: 4, evo: 4,
        fullName: "Simurgh, Bird Divine II"
    },
    11093: {
        name: "Sinbad", stats: [15868, 18154, 14644, 13853, 17006],
        skills: [318],
        img: "29e", rarity: 5, evo: 2,
        fullName: "Sinbad the Adventurer II"
    },
    10566: {
        name: "Bedwyr", stats: [12235, 11318, 12221, 13510, 10598],
        skills: [145],
        img: "321", rarity: 4, evo: 4,
        fullName: "Sir Bedwyr of the Garden II"
    },
    10921: {
        name: "Brandiles", stats: [17017, 18100, 16269, 13940, 14070],
        skills: [252],
        img: "106", rarity: 5, evo: 2,
        fullName: "Sir Brandiles, the Flameblade II"
    },
    11520: {
        name: "Oliver", stats: [15912, 14980, 13702, 8014, 17266],
        skills: [800],
        autoAttack: 10067,
        img: "3e5", rarity: 4, evo: 2,
        fullName: "Sir Oliver, the Golden Sword II"
    },
    11455: {
        name: "Skeleton King", stats: [19714, 19064, 20982, 6097, 18143],
        skills: [605, 606],
        autoAttack: 10041,
        img: "3b5", rarity: 5, evo: 2,
        fullName: "Skeleton King II"
    },
    11074: {
        name: "Skoll", stats: [15002, 13160, 15153, 9000, 16302],
        skills: [367, 301],
        img: "3e8", rarity: 4, evo: 2,
        fullName: "Skoll, Dark Wolf II"
    },
    11038: {
        name: "Skrimsl", stats: [13049, 11417, 12466, 17182, 13379],
        skills: [303],
        img: "278", rarity: 4, evo: 4,
        fullName: "Skrimsl the Freezing II"
    },
    11273: {
        name: "Slagh", stats: [12978, 16561, 11098, 11683, 15631],
        skills: [457],
        img: "13c", rarity: 4, evo: 4,
        fullName: "Slagh, Carnage Incarnate II"
    },
    11480: {
        name: "Snegurochka", stats: [20007, 7895, 16063, 22000, 18143],
        skills: [672, 673],
        autoAttack: 10057,
        img: "306", rarity: 5, evo: 2,
        fullName: "Snegurochka II"
    },
    10450: {
        name: "Snow Queen", stats: [14070, 13994, 13940, 15229, 14449],
        skills: [128],
        img: "399", rarity: 5, evo: 2,
        fullName: "Snow Queen II"
    },
    10614: {
        name: "Solsten", stats: [13940, 14449, 15998, 17233, 12900],
        skills: [165],
        img: "37a", rarity: 5, evo: 2,
        fullName: "Solsten the Really Wanted II"
    },
    10941: {
        name: "Soura", stats: [12012, 12261, 7917, 16930, 17667],
        skills: [287, 291],
        img: "4f1", rarity: 4, evo: 2,
        fullName: "Soura, Inferno Shaman II"
    },
    10568: {
        name: "Spellforged Cyclops", stats: [17047, 11683, 14096, 11111, 10380],
        skills: [61],
        img: "2c7", rarity: 4, evo: 4,
        fullName: "Spellforged Cyclops II"
    },
    10850: {
        name: "Stalo", stats: [16269, 16280, 16681, 12792, 13496],
        skills: [241],
        img: "296", rarity: 5, evo: 2,
        fullName: "Stalo, Glacial Giant II"
    },
    414: {
        name: "Steamwork", stats: [14360, 10800, 10600, 12240, 10560],
        skills: [11],
        img: "3de", rarity: 5, evo: 1,
        fullName: "Steamwork Dragon"
    },
    10955: {
        name: "Sugaar", stats: [13110, 7481, 14293, 16950, 16097],
        skills: [465],
        autoAttack: 10007,
        img: "19b", rarity: 4, evo: 4,
        fullName: "Sugaar, the Thunderstorm II"
    },
    10461: {
        name: "Sulima", stats: [13417, 13583, 12194, 12293, 12269],
        skills: [17],
        img: "1ec", rarity: 4, evo: 4,
        fullName: "Sulima, Executioner II"
    },
    11189: {
        name: "Surtr", stats: [15440, 17106, 15085, 7016, 12890],
        skills: [383],
        img: "15b", rarity: 4, evo: 4,
        fullName: "Surtr the Fervent II"
    },
    11017: {
        name: "Svadilfari", stats: [15977, 19595, 13442, 15998, 14503],
        skills: [369, 370],
        img: "1ce", rarity: 5, evo: 2,
        fullName: "Svadilfari II"
    },
    11000: {
        name: "Tanba", stats: [17580, 23213, 17883, 23289, 18057],
        skills: [236],
        img: "3a8", rarity: 6, evo: 2,
        fullName: "Tanba, Founder of the Ninja II"
    },
    327: {
        name: "Tangata", stats: [10500, 10800, 10630, 10740, 12480],
        skills: [110],
        img: "3b4", rarity: 5, evo: 1,
        fullName: "Tangata Manu"
    },
    11122: {
        name: "Tannin", stats: [13669, 15500, 12683, 19541, 17894],
        skills: [298],
        img: "24a", rarity: 5, evo: 2,
        fullName: "Tannin, Sea Dragon II"
    },
    695: {
        name: "Tawiscara", stats: [11914, 14513, 14395, 11366, 15630],
        skills: [161],
        img: "3f5", rarity: 4, evo: 2,
        fullName: "Tawiscara"
    },
    10582: {
        name: "Tepaxtl", stats: [10831, 13562, 9209, 13110, 12100],
        skills: [115],
        img: "37d", rarity: 4, evo: 4,
        fullName: "Tepaxtl, Fatal Fang II"
    },
    1: {
        name: "Black Brute", stats: [14254, 17131, 13848, 11794, 11699],
        skills: [34],
        isWarlord: true,
        img: "36f", rarity: 2, evo: 1,
        fullName: "The Black Brute"
    },
    2: {
        name: "Blue Beard", stats: [12982, 11344, 15588, 15554, 13527],
        skills: [118],
        isWarlord: true,
        img: "10a", rarity: 2, evo: 1,
        fullName: "The Blue Beard"
    },
    3: {
        name: "Golden Lance", stats: [14462, 13994, 11951, 12227, 16809],
        skills: [10],
        isWarlord: true,
        img: "3d6", rarity: 1, evo: 1,
        fullName: "The Golden Lance"
    },
    4: {
        name: "Green Healer", stats: [13770, 10556, 16359, 15329, 13596],
        skills: [116, 111],
        isWarlord: true,
        img: "265", rarity: 1, evo: 1,
        fullName: "The Green Healer"
    },
    5: {
        name: "Grey Mage", stats: [13415, 13838, 10712, 15865, 16602],
        skills: [40],
        isWarlord: true,
        img: "248", rarity: 2, evo: 1,
        fullName: "The Grey Mage"
    },
    6: {
        name: "Purple Knife", stats: [13735, 16281, 10712, 15779, 13595],
        skills: [113],
        isWarlord: true,
        img: "3ee", rarity: 2, evo: 3,
        fullName: "The Purple Knife"
    },
    7: {
        name: "Red Samurai", stats: [13432, 14783, 13961, 12869, 14333],
        skills: [46],
        isWarlord: true,
        img: "4ad", rarity: 1, evo: 1,
        fullName: "The Red Samurai"
    },
    8: {
        name: "White Knight", stats: [13916, 14332, 15311, 12851, 13466],
        skills: [46],
        isWarlord: true,
        img: "225", rarity: 3, evo: 1,
        fullName: "The White Knight"
    },
    10480: {
        name: "Thor", stats: [10343, 13245, 11807, 13842, 11917],
        skills: [114],
        img: "3a1", rarity: 4, evo: 4,
        fullName: "Thor, God of Lightning II"
    },
    21264: {
        name: "Thor L", stats: [20007, 22002, 19063, 10334, 16518],
        skills: [437],
        autoAttack: 10011,
        img: "323", rarity: 5, evo: 3,
        fullName: "Thor, the Roaring Thunder"
    },
    10859: {
        name: "Thunderbird", stats: [15912, 16995, 13572, 15771, 17006],
        skills: [231],
        img: "2be", rarity: 5, evo: 2,
        fullName: "Thunderbird II"
    },
    11103: {
        name: "Tiamat", stats: [13702, 14698, 16497, 18869, 15738],
        skills: [280],
        img: "2c5", rarity: 5, evo: 2,
        fullName: "Tiamat, Mother of Dragons II"
    },
    11236: {
        name: "Tomoe", stats: [13889, 16010, 13110, 8285, 16622],
        skills: [406],
        img: "2b5", rarity: 4, evo: 4,
        fullName: "Tomoe, the Lightning Arrow II"
    },
    11143: {
        name: "TBB", stats: [12001, 9905, 12207, 17000, 16803],
        skills: [366],
        autoAttack: 10007,
        img: "115", rarity: 4, evo: 4,
        fullName: "Tormented Bone Beast II"
    },
    10747: {
        name: "Tristan", stats: [13832, 16193, 15197, 13052, 15771],
        skills: [122],
        img: "3c3", rarity: 5, evo: 2,
        fullName: "Tristan the Sorrowful II"
    },
    11472: {
        name: "Tulok", stats: [15498, 15047, 10807, 5247, 10198],
        skills: [662],
        img: "3a7", rarity: 4, evo: 4,
        fullName: "Tulok, Icebreaker II"
    },
    10647: {
        name: "Tuniq", stats: [13635, 16709, 12062, 12086, 9794],
        skills: [150],
        img: "29c", rarity: 4, evo: 4,
        fullName: "Tuniq, Guardian Colossus II"
    },
    10454: {
        name: "Stormwyrm", stats: [11025, 11514, 9646, 14489, 11318],
        skills: [47],
        img: "3ee", rarity: 4, evo: 4,
        fullName: "Two-Headed Stormwyrm II"
    },
    21499: {
        name: "Tyche", stats: [22409, 9752, 17534, 20836, 17942],
        skills: [681],
        autoAttack: 10052,
        img: "1b7", rarity: 5, evo: 3,
        fullName: "Tyche, Goddess of Glory"
    },
    10735: {
        name: "Typhon", stats: [14677, 13355, 14341, 17959, 13626],
        skills: [117],
        autoAttack: 10001,
        img: "283", rarity: 5, evo: 2,
        fullName: "Typhon II"
    },
    11356: {
        name: "Ulfhe", stats: [24102, 22921, 18447, 18057, 18219],
        skills: [702],
        autoAttack: 10062,
        img: "268", rarity: 6, evo: 2,
        fullName: "Ulfhe, Sword-Shield Master II"
    },
    10344: {
        name: "Hydarnes", stats: [11928, 12832, 10587, 14182, 11928],
        skills: [114],
        img: "4fd", rarity: 4, evo: 4,
        fullName: "Undead General, Hydarnes II"
    },
    10920: {
        name: "Unicorn", stats: [10807, 12600, 8770, 11721, 12001],
        skills: [156],
        img: "204", rarity: 4, evo: 4,
        fullName: "Unicorn, Spirit Eater II"
    },
    11124: {
        name: "Ushabti", stats: [12434, 16475, 14655, 10062, 14027],
        skills: [317],
        img: "21d", rarity: 4, evo: 2,
        fullName: "Ushabti II"
    },
    11268: {
        name: "Vafthruthnir", stats: [15500, 17732, 13008, 9997, 12228],
        skills: [442],
        img: "22b", rarity: 4, evo: 2,
        fullName: "Vafthruthnir, Elder Giant II"
    },
    10896: {
        name: "Valin", stats: [15500, 16865, 22953, 12716, 11167],
        skills: [263],
        img: "34a", rarity: 5, evo: 2,
        fullName: "Valin the Terrible II"
    },
    11008: {
        name: "Karkadann", stats: [17034, 16475, 13510, 7822, 13097],
        skills: [521],
        img: "422", rarity: 4, evo: 4,
        fullName: "Venomhorn Karkadann II"
    },
    11137: {
        name: "Venusia", stats: [14514, 18273, 13333, 10831, 11492],
        skills: [361],
        img: "403", rarity: 4, evo: 2,
        fullName: "Venusia, the Grace II"
    },
    10807: {
        name: "Vezat", stats: [16648, 18165, 14709, 13431, 17721],
        skills: [214],
        img: "429", rarity: 5, evo: 2,
        fullName: "Vezat, Dragonbone Warrior II"
    },
    10572: {
        name: "Vivian", stats: [14677, 17851, 15229, 13095, 14677],
        skills: [224],
        img: "25f", rarity: 5, evo: 2,
        fullName: "Vivian Griffinrider II"
    },
    11021: {
        name: "Vlad", stats: [16323, 19508, 13680, 14709, 16529],
        skills: [296, 295],
        img: "356", rarity: 5, evo: 2,
        fullName: "Vlad the Impaler II"
    },
    11582: {
        name: "Vlad", stats: [18934, 8491, 15240, 19812, 18024],
        skills: [877, 878],
        autoAttack: 10007,
        img: "187", rarity: 5, evo: 2,
        fullName: "Vlad, Swap II"
    },
    10675: {
        name: "Void Yaksha", stats: [15706, 18013, 14471, 14276, 15814],
        skills: [199],
        img: "297", rarity: 5, evo: 2,
        fullName: "Void Yaksha II"
    },
    11406: {
        name: "Vucub", stats: [16123, 13110, 14732, 6967, 17000],
        skills: [586],
        img: "2aa", rarity: 4, evo: 4,
        fullName: "Vucub Caquix, the Barbarian II"
    },
    11046: {
        name: "Waheela", stats: [17006, 13008, 16204, 16692, 18100],
        skills: [19, 134],
        img: "2dc", rarity: 5, evo: 2,
        fullName: "Waheela, Dire Wolf II"
    },
    11461: {
        name: "Wang Yi", stats: [16024, 6577, 11855, 17000, 16816],
        skills: [621, 622],
        autoAttack: 10007,
        img: "1b8", rarity: 4, evo: 4,
        fullName: "Wang Yi, Lady of Iron II"
    },
    11570: {
        name: "War Bear", stats: [18999, 17504, 15500, 11492, 6292],
        skills: [859, 860],
        img: "1b8", rarity: 4, evo: 2,
        fullName: "War Bear II"
    },
    11396: {
        name: "Wicker Man", stats: [16605, 6833, 11654, 16670, 16930],
        skills: [581, 582],
        autoAttack: 10036,
        img: "2d2", rarity: 4, evo: 2,
        fullName: "Wicker Man II"
    },
    10570: {
        name: "Wolfert", stats: [14189, 23972, 13723, 13290, 13431],
        skills: [118],
        img: "391", rarity: 5, evo: 2,
        fullName: "Wolfert, Grave Keeper II"
    },
    11521: {
        name: "Wrath", stats: [19010, 21101, 16410, 11936, 18154],
        skills: [706, 707],
        img: "279", rarity: 5, evo: 2,
        fullName: "Wrath, Beast of Sin II"
    },
    10798: {
        name: "Wu Chang", stats: [10294, 14182, 10977, 10600, 11928],
        skills: [115],
        img: "365", rarity: 4, evo: 4,
        fullName: "Wu Chang the Infernal II"
    },
    11018: {
        name: "Warden", stats: [19400, 17504, 18273, 11026, 11795],
        skills: [532],
        img: "33d", rarity: 5, evo: 2,
        fullName: "Wyrm Warden, Everwakeful II"
    },
    11218: {
        name: "Xaphan", stats: [13013, 9415, 12573, 17000, 15537],
        skills: [412],
        img: "47f", rarity: 4, evo: 4,
        fullName: "Xaphan, the Foul Flame II"
    },
    11315: {
        name: "Xuan Wu", stats: [18013, 18609, 17038, 13821, 13507],
        skills: [499, 500],
        autoAttack: 10020,
        img: "325", rarity: 5, evo: 2,
        fullName: "Xuan Wu II"
    },
    11526: {
        name: "Yae", stats: [15317, 7271, 13258, 15365, 17133],
        skills: [699, 700],
        autoAttack: 10007,
        img: "2a6", rarity: 4, evo: 4,
        fullName: "Yae, the Night Flower II"
    },
    10995: {
        name: "Ymir", stats: [22650, 24600, 16464, 20592, 15933],
        skills: [227],
        img: "167", rarity: 6, evo: 2,
        fullName: "Ymir, Primordial Giant II"
    },
    10486: {
        name: "Yulia", stats: [14081, 14664, 12052, 13544, 12524],
        skills: [134],
        img: "341", rarity: 4, evo: 4,
        fullName: "Yulia, Snakesage II"
    },
    10497: {
        name: "Zagan", stats: [16128, 16941, 14709, 12423, 13052],
        skills: [143],
        img: "192", rarity: 5, evo: 2,
        fullName: "Zagan II"
    },
    11077: {
        name: "Zahhak", stats: [16789, 10051, 19151, 17797, 17168],
        skills: [339],
        autoAttack: 10001,
        img: "194", rarity: 5, evo: 2,
        fullName: "Zahhak, Dragon Marshal II"
    },
    10869: {
        name: "Zanga", stats: [10218, 10787, 9694, 9512, 12780],
        skills: [161],
        img: "1cf", rarity: 4, evo: 4,
        fullName: "Zanga, the Iron Storm II"
    },
    10992: {
        name: "Zeruel", stats: [16995, 19573, 13886, 13507, 16984],
        skills: [351, 352],
        img: "4a7", rarity: 5, evo: 2,
        fullName: "Zeruel, Angel of War II"
    },
    11443: {
        name: "Zorg", stats: [14073, 15196, 11331, 5395, 10805],
        skills: [629],
        img: "1e0", rarity: 4, evo: 4,
        fullName: "Zorg, the Cruncher II"
    },
    10474: {
        name: "Zuniga", stats: [12987, 15132, 14276, 14839, 14709],
        skills: [132],
        img: "322", rarity: 5, evo: 2,
        fullName: "Zuniga, Guard Captain II"
    },
    11599: {
        name: "Mammi EP4", stats: [13293, 7699, 8505, 14806, 12500],
        skills: [892],
        autoAttack: 10016,
        img: "46a", rarity: 4, evo: 4,
        fullName: "Mammi, Spiritmancer II"
    },
    11595: {
        name: "Blazing", stats: [18891, 9141, 14005, 19963, 17992],
        skills: [893, 894],
        autoAttack: 10019,
        img: "1c6", rarity: 5, evo: 2,
        fullName: "Blazing Drake"
    },
    11597: {
        name: "Telluric", stats: [16696, 17499, 17693, 11770, 5506],
        skills: [895],
        autoAttack: 10122,
        img: "3d5", rarity: 4, evo: 4,
        fullName: "Telluric Drake II"
    },
    11600: {
        name: "Feathered", stats: [17006, 13008, 15998, 6248, 17992],
        skills: [896, 897],
        autoAttack: 10120,
        img: "25d", rarity: 4, evo: 2,
        fullName: "Feathered Drake"
    },
    21599: {
        name: "Mammi EP2", stats: [15500, 5663, 12987, 18696, 17407],
        skills: [898, 899],
        autoAttack: 10052,
        img: "46a", rarity: 4, evo: 2,
        fullName: "Mammi, Hare of the Harvest II"
    },
    11572: {
        name: "Banshee", stats: [23560, 16009, 21480, 24708, 18533],
        skills: [872, 873],
        passiveSkills: [9002],
        autoAttack: 10114,
        img: "42d", rarity: 6, evo: 2,
        fullName: "Banshee Rider II"
    },
    11548: {
        name: "Zepar", stats: [24557, 23029, 20050, 18111, 18533],
        skills: [831, 832],
        passiveSkills: [9001],
        img: "1ba", rarity: 6, evo: 2,
        fullName: "Zepar, Blood-Annointed II"
    },
    11601: {
        name: "Brine", stats: [18501, 6898, 16009, 22000, 17591],
        skills: [900, 901],
        autoAttack: 10121,
        img: "217", rarity: 5, evo: 2,
        fullName: "Brine Drake"
    },
    11604: {
        name: "Hellawes", stats: [15327, 7559, 12272, 16659, 16800],
        skills: [907],
        autoAttack: 10007,
        img: "431", rarity: 4, evo: 2,
        fullName: "Hellawes, Fetter Witch II"
    },
    11607: {
        name: "Shackled Red Wyrm", stats: [25521, 14092, 20386, 23538, 18219],
        skills: [905],
        autoAttack: 10123,
        img: "281", rarity: 6, evo: 2,
        fullName: "Shackled Red Wyrm II"
    },
    11606: {
        name: "Palamedes", stats: [15376, 16217, 14561, 6650, 17071],
        skills: [908],
        autoAttack: 10103,
        img: "21e", rarity: 4, evo: 4,
        fullName: "Palamedes, the Hawk's Eye II"
    },
    11612: {
        name: "Belle", stats: [16009, 17006, 14980, 14807, 18208],
        skills: [914, 915],
        autoAttack: 10125,
        isMounted: true,
        img: "31f", rarity: 5, evo: 2,
        fullName: "Belle, Grimoire Keeper II"
    },
    11611: {
        name: "Chariot Hippocamp", stats: [14402, 14792, 13024, 7980, 17706],
        skills: [913],
        img: "281", rarity: 4, evo: 4,
        fullName: "Chariot Hippocamp II"
    },
    21608: {
        name: "Neptune", stats: [20461, 10404, 17836, 21674, 18023],
        skills: [911],
        autoAttack: 10057,
        img: "349", rarity: 5, evo: 3,
        fullName: "Intrepid Hand of Neptune"
    },
    1609: {
        name: "Charybdis", stats: [14048, 16042, 13918, 9000, 16887],
        skills: [912],
        img: "3c9", rarity: 4, evo: 2,
        fullName: "Charybdis II"
    },
    11613: {
        name: "Amphitrite", stats: [16226, 7418, 19638, 20158, 17569],
        skills: [916, 917],
        autoAttack: 10001,
        img: "2ed", rarity: 5, evo: 2,
        fullName: "Amphitrite, Nereid Queen II"
    },
    11627: {
        name: "Charon", stats: [16681, 6689, 10525, 17095, 16950],
        skills: [919],
        autoAttack: 10007,
        img: "3ae", rarity: 4, evo: 4,
        fullName: "Charon, Greedy Ferryman II"
    },
    21627: {
        name: "Charon", stats: [13680, 8285, 9585, 14503, 9964],
        skills: [920],
        autoAttack: 10007,
        img: "430", rarity: 4, evo: 2,
        fullName: "Charon, Darksun Ferryman II"
    },
    11631: {
        name: "Nessus", stats: [13803, 7906, 9635, 13965, 10245],
        skills: [925],
        autoAttack: 10007,
        img: "13e", rarity: 4, evo: 4,
        fullName: "Nessus, Centaur Gaoler II"
    },
    21625: {
        name: "Belial", stats: [21873, 19096, 20100, 9309, 18105],
        skills: [918],
        autoAttack: 10044,
        img: "3af", rarity: 5, evo: 3,
        fullName: "Belial, Lord of Vices"
    },
    11629: {
        name: "Midas", stats: [14048, 7819, 11275, 18013, 17374],
        skills: [923, 924],
        autoAttack: 10007,
        img: "2a6", rarity: 4, evo: 2,
        fullName: "Midas, the Wailing King II"
    },
    11628: {
        name: "Beatrice", stats: [18858, 7895, 15251, 21328, 18165],
        skills: [921, 922],
        autoAttack: 10007,
        img: "26a", rarity: 5, evo: 2,
        fullName: "Beatrice, the Luminescent II"
    },
    11644: {
        name: "Nidhogg", stats: [24752, 16128, 22130, 23246, 18035],
        skills: [935, 936],
        passiveSkills: [9004],
        autoAttack: 10126,
        img: "151", rarity: 6, evo: 2,
        fullName: "Nidhogg, Iceclad Dragon II"
    },
    11637: {
        name: "Minos", stats: [15511, 17244, 15002, 6292, 16204],
        skills: [939, 940],
        img: "399", rarity: 4, evo: 2,
        fullName: "Minos, Judgment King II"
    },
    11638: {
        name: "Pasiphae", stats: [18501, 18999, 15002, 10192, 17309],
        skills: [945, 946],
        autoAttack: 10125,
        img: "3dc", rarity: 5, evo: 2,
        fullName: "Pasiphae, the Brass Bull II"
    },
    11583: {
        name: "Kalevan", stats: [15153, 15803, 14222, 6855, 17006],
        skills: [947, 948],
        autoAttack: 10051,
        img: "187", rarity: 4, evo: 2,
        fullName: "Kalevan, Swap II"
    },
    11634: {
        name: "Mammon", stats: [16010, 7895, 13010, 14999, 15999],
        skills: [944],
        autoAttack: 10129,
        img: "274", rarity: 4, evo: 4,
        fullName: "Mammon, Raven Claw II"
    },
    21636: {
        name: "Moloch", stats: [15002, 8003, 12987, 16800, 17201],
        skills: [942, 943],
        autoAttack: 10128,
        img: "1e8", rarity: 4, evo: 2,
        fullName: "Moloch, Soul Reaper II"
    },
    11636: {
        name: "Moloch", stats: [12001, 6602, 10001, 15207, 12999],
        skills: [941],
        autoAttack: 10016,
        img: "356", rarity: 4, evo: 4,
        fullName: "Moloch, the Infernal Axe II"
    },
    11641: {
        name: "Aslaug", stats: [15121, 16486, 13496, 6389, 17103],
        skills: [952],
        autoAttack: 10130,
        img: "2c8", rarity: 4, evo: 2,
        fullName: "Aslaug, the Lyre Bow II"
    },
    21578: {
        name: "Zeruel", stats: [22841, 21478, 18303, 12038, 18128],
        skills: [954, 955],
        autoAttack: 10015,
        img: "3b0", rarity: 5, evo: 3,
        fullName: "Zeruel Angel of War, Swap"
    },
    11639: {
        name: "Fafnir", stats: [25012, 23538, 20754, 14092, 18349],
        skills: [950],
        autoAttack: 10061,
        img: "257", rarity: 6, evo: 2,
        fullName: "Fafnir, Fireclad Dragon II"
    },
    11643: {
        name: "Alberich", stats: [15964, 17120, 16523, 15427, 4237],
        skills: [953],
        autoAttack: 10131,
        img: "376", rarity: 4, evo: 4,
        fullName: "Alberich, the Ceratophrys II"
    },
    11640: {
        name: "Waltraute", stats: [19552, 18100, 16854, 8480, 18046],
        skills: [951],
        autoAttack: 10044,
        img: "24d", rarity: 5, evo: 2,
        fullName: "Waltraute, Valiant Valkyrie II"
    },
    11632: {
        name: "Azazel", stats: [19010, 17331, 15002, 11492, 18165],
        skills: [937, 938],
        autoAttack: 10125,
        img: "2ef", rarity: 5, evo: 2,
        fullName: "Azazel, the Temptress II"
    },
    11175: {
        name: "Taotie", stats: [14850, 15803, 13106, 9141, 14720],
        skills: [949],
        autoAttack: 10005,
        img: "2ef", rarity: 4, evo: 2,
        fullName: "Taotie, the Gluttonous II"
    },
    11646: {
        name: "Thoth", stats: [13117, 8047, 12694, 17645, 17190],
        skills: [958],
        autoAttack: 10003,
        img: "20b", rarity: 4, evo: 2,
        fullName: "Thoth, Hieroglypher II"
    },
    11649: {
        name: "Pele", stats: [17840, 19357, 17017, 11080, 18208],
        skills: [960, 961],
        autoAttack: 10133,
        img: "2f1", rarity: 5, evo: 2,
        fullName: "Pele, Volcano Shamaness II"
    },
    11676: {
        name: "Fionn", stats: [12597, 11514, 10027, 7819, 13597],
        skills: [971],
        img: "29f", rarity: 4, evo: 4,
        fullName: "Fionn, the Meteor Sword II"
    },
    21645: {
        name: "Tangata M", stats: [20031, 21103, 21920, 9729, 18105],
        skills: [957],
        autoAttack: 10132,
        img: "284", rarity: 5, evo: 3,
        fullName: "Tangata Manu, Withering Gale"
    },
    11650: {
        name: "Rongo", stats: [18057, 16800, 17342, 13312, 17992],
        skills: [962, 963],
        autoAttack: 10135,
        img: "198", rarity: 5, evo: 2,
        fullName: "Rongo, Moai Master II"
    },
    11648: {
        name: "Fleetfoot", stats: [13583, 17924, 11574, 7688, 17144],
        skills: [959],
        autoAttack: 10133,
        img: "165", rarity: 4, evo: 4,
        fullName: "Fleetfoot Ornithomimus II"
    },
    11673: {
        name: "Amethyst", stats: [20169, 16291, 13788, 13030, 18241],
        skills: [967, 968],
        autoAttack: 10108,
        img: "4a6", rarity: 5, evo: 2,
        fullName: "Amethyst Dragon II"
    },
    11674: {
        name: "Agate", stats: [16497, 14308, 12077, 7852, 17764],
        skills: [969, 970],
        autoAttack: 10108,
        img: "205", rarity: 4, evo: 2,
        fullName: "Agate, Gem Tamer II"
    },
    21672: {
        name: "Unbound", stats: [13788, 13138, 10896, 8003, 10343],
        skills: [966],
        img: "35b", rarity: 4, evo: 2,
        fullName: "Unbound Gem Golem II"
    },
    21670: {
        name: "Urcagu", stats: [22527, 22048, 19668, 8912, 17779],
        skills: [964],
        autoAttack: 10108,
        img: "1bc", rarity: 5, evo: 3,
        fullName: "Urcagu, the Grinder"
    },
    21696: {
        name: "Ker", stats: [21015, 19040, 18585, 13100, 18517],
        skills: [972, 973],
        autoAttack: 10134,
        img: "233", rarity: 5, evo: 3,
        fullName: "Ker, the Despair Diamond"
    },
    11682: {
        name: "Takemikazuchi", stats: [17201, 16995, 17006, 11004, 8144],
        skills: [980, 981],
        autoAttack: 10137,
        img: "24a", rarity: 4, evo: 2,
        fullName: "Takemikazuchi, the Lightning II"
    },
    11679: {
        name: "Ame", stats: [16803, 10001, 14500, 17499, 9209],
        skills: [976],
        autoAttack: 10003,
        img: "152", rarity: 4, evo: 4,
        fullName: "Ame no Uzume, the Lure II"
    },
    11677: {
        name: "Susanoo", stats: [17797, 19508, 15500, 11784, 18013],
        skills: [974, 975],
        autoAttack: 10133,
        img: "1ab", rarity: 5, evo: 2,
        fullName: "Susanoo, Rowdy God II"
    },
    21681: {
        name: "Mizuchi", stats: [14698, 6097, 14005, 17797, 17407],
        skills: [977, 978],
        autoAttack: 10136,
        img: "312", rarity: 4, evo: 2,
        fullName: "Mizuchi, the Raging Storm II"
    },
    11688: {
        name: "Autolycus", stats: [16144, 16696, 13538, 6712, 16902],
        skills: [988],
        autoAttack: 10139,
        img: "3e2", rarity: 4, evo: 4,
        fullName: "Autolycus, Shrewd Warrior II"
    },
    11684: {
        name: "Heracles", stats: [24849, 25499, 20061, 13203, 18154],
        skills: [985],
        autoAttack: 10061,
        img: "3cd", rarity: 6, evo: 2,
        fullName: "Heracles, Mightiest of Men II"
    },
    11683: {
        name: "Kushinada", stats: [17992, 10549, 15511, 18999, 18046],
        skills: [982, 983],
        autoAttack: 10138,
        isMounted: true,
        img: "411", rarity: 5, evo: 2,
        fullName: "Kushinada, Shamaness II"
    },
    11685: {
        name: "Hippolyta", stats: [20429, 19389, 17862, 7971, 17992],
        skills: [986],
        autoAttack: 10103,
        img: "247", rarity: 5, evo: 2,
        fullName: "Hippolyta, Amazon Queen II"
    },
    11686: {
        name: "Antaeus", stats: [15652, 17439, 14048, 6010, 16800],
        skills: [987],
        autoAttack: 10113,
        img: "2f2", rarity: 4, evo: 2,
        fullName: "Antaeus, Giant II"
    },
    11693: {
        name: "Hina", stats: [16097, 6736, 10001, 17875, 17254],
        skills: [993],
        autoAttack: 10019,
        img: "4f1", rarity: 4, evo: 4,
        fullName: "Hina, Flame Serpent II"
    },
    11695: {
        name: "Azan", stats: [14861, 15478, 14308, 7982, 17309],
        skills: [992],
        autoAttack: 10141,
        img: "18a", rarity: 4, evo: 2,
        fullName: "Azan, the Dragon Bone II"
    },
    21690: {
        name: "Decaying", stats: [19982, 9075, 18969, 22316, 18152],
        skills: [991],
        autoAttack: 10140,
        img: "12e", rarity: 5, evo: 3,
        fullName: "Decaying Dragon"
    },
    11694: {
        name: "A'shi", stats: [18208, 7039, 16919, 20689, 18403],
        skills: [994, 995],
        autoAttack: 10143,
        img: "13a", rarity: 5, evo: 2,
        fullName: "A'shi, Pterorider II"
    },
    11681: {
        name: "Mizuchi", stats: [13010, 7991, 10305, 12001, 13489],
        skills: [979],
        autoAttack: 10136,
        img: "1bd", rarity: 4, evo: 4,
        fullName: "Mizuchi, the Maelstrom II"
    },
    11733: {
        name: "Paris", stats: [16854, 16356, 11318, 7895, 17363],
        skills: [1003, 1004],
        autoAttack: 10061,
        img: "4ce", rarity: 4, evo: 2,
        fullName: "Paris, Trueshot II"
    },
    21731: {
        name: "Siege Horse", stats: [13442, 8101, 9282, 14200, 11069],
        skills: [1000],
        img: "20c", rarity: 4, evo: 2,
        fullName: "Dark-Imbued Siege Horse II"
    },
    11691: {
        name: "Laola", stats: [18382, 8068, 17439, 19129, 18241],
        skills: [996, 997],
        autoAttack: 10142,
        img: "3a1", rarity: 5, evo: 2,
        fullName: "Laola, Demiwyrm Spearbearer II"
    },
    11732: {
        name: "Helen", stats: [19660, 7039, 15186, 21404, 18208],
        skills: [1001, 1002],
        autoAttack: 10007,
        img: "10d", rarity: 5, evo: 2,
        fullName: "Helen, Swan Queen II"
    },
    11731: {
        name: "Siege Horse", stats: [16013, 13269, 12049, 9246, 17340],
        skills: [999],
        autoAttack: 10021,
        img: "11e", rarity: 4, evo: 4,
        fullName: "Vengeful Siege Horse II"
    },
    21729: {
        name: "Menelaus", stats: [22446, 17883, 23414, 17989, 6719],
        skills: [998],
        autoAttack: 10144,
        img: "3f4", rarity: 5, evo: 3,
        fullName: "Menelaus, Vengeful King"
    },
    11738: {
        name: "Eric", stats: [15999, 16303, 14096, 6051, 16803],
        skills: [1020],
        autoAttack: 10146,
        img: "35d", rarity: 4, evo: 4,
        fullName: "Eric, Bloodaxe King II"
    },
    11717: {
        name: "Rex", stats: [15002, 6097, 14005, 16009, 17992],
        skills: [1024, 1025],
        autoAttack: 10001,
        img: "3a3", rarity: 4, evo: 2,
        fullName: "Crystallus Rex II"
    },
    21658: {
        name: "Oenone", stats: [22132, 9543, 17878, 22445, 18273],
        skills: [1006, 1007],
        autoAttack: 10121,
        img: "1a3", rarity: 5, evo: 3,
        fullName: "Oenone, the Hailstorm"
    },
    11740: {
        name: "Eviscerating Hafgufa", stats: [13013, 12999, 12001, 7003, 11770],
        skills: [1023],
        autoAttack: 10005,
        img: "407", rarity: 4, evo: 4,
        fullName: "Eviscerating Hafgufa II"
    },
    11735: {
        name: "Cassandra", stats: [13013, 7492, 10087, 13889, 11063],
        skills: [1005],
        autoAttack: 10007,
        img: "39b", rarity: 4, evo: 4,
        fullName: "Cassandra, the Tragic II"
    },
    11736: {
        name: "Gunhild", stats: [20007, 19508, 16540, 8491, 18057],
        skills: [1018, 1019],
        autoAttack: 10145,
        img: "494", rarity: 5, evo: 2,
        fullName: "Gunhild, Brass Pincers II"
    },
    11819: {
        name: "Shisen", stats: [16657, 15498, 13052, 6092, 17499],
        skills: [1034],
        autoAttack: 10137,
        img: "1c6", rarity: 4, evo: 4,
        fullName: "Shisen, the Flitting Bolt II"
    },
    11720: {
        name: "Laned", stats: [24578, 23549, 21523, 13853, 18349],
        skills: [1031],
        autoAttack: 10153,
        img: "22f", rarity: 6, evo: 2,
        fullName: "Laned, the Piercing Fist II"
    },
    11705: {
        name: "Dryas", stats: [21025, 21632, 15901, 7072, 18100],
        skills: [1032],
        autoAttack: 10113,
        img: "15c", rarity: 5, evo: 2,
        fullName: "Dryas, Centaur Knight II"
    },
    11662: {
        name: "Feng", stats: [16215, 17569, 13637, 6227, 16399],
        skills: [1033],
        autoAttack: 10147,
        img: "342", rarity: 4, evo: 2,
        fullName: "Feng, Sanjiegun Master II"
    },
    21740: {
        name: "Ravaging Hafgufa", stats: [16800, 17244, 14005, 5999, 17201],
        skills: [1021, 1022],
        autoAttack: 10133,
        img: "392", rarity: 4, evo: 2,
        fullName: "Ravaging Hafgufa II"
    },
    11654: {
        name: "Ullr", stats: [19151, 16692, 17797, 9260, 18349],
        skills: [1043, 1044],
        autoAttack: 10152,
        img: "1a6", rarity: 5, evo: 2,
        fullName: "Ullr, Starshooter II"
    },
    11744: {
        name: "Triton", stats: [20386, 18414, 16735, 10289, 18176],
        skills: [1049, 1050],
        autoAttack: 10151,
        img: "299", rarity: 5, evo: 2,
        fullName: "Triton, Lord of the Sea II"
    },
    21698: {
        name: "Dionysus", stats: [23893, 10008, 23600, 22982, 8013],
        skills: [1037, 1038],
        autoAttack: 10148,
        img: "1e3", rarity: 5, evo: 3,
        fullName: "Dionysus, the Reveler"
    },
    11664: {
        name: "Wyvern Gemwarden", stats: [15164, 5512, 14027, 16583, 17461],
        skills: [1039],
        autoAttack: 10149,
        img: "229", rarity: 4, evo: 2,
        fullName: "Wyvern Gemwarden II"
    },
    11821: {
        name: "Jarn", stats: [13038, 17461, 14269, 7319, 17120],
        skills: [1040],
        autoAttack: 10150,
        img: "1d2", rarity: 4, evo: 4,
        fullName: "Jarn, the Bladed Wolf II"
    },
    11747: {
        name: "Kuki", stats: [13196, 13049, 11880, 7223, 10256],
        skills: [1053],
        img: "46d", rarity: 4, evo: 4,
        fullName: "Kuki, Pirate Busho II"
    },
    21743: {
        name: "Vepar", stats: [13344, 13604, 11026, 7548, 10777],
        skills: [1048],
        img: "438", rarity: 4, evo: 2,
        fullName: "Vepar, the Perpetual Night II"
    },
    11745: {
        name: "Rusalka", stats: [16713, 5988, 11015, 17439, 17374],
        skills: [1051, 1052],
        autoAttack: 10003,
        img: "4a8", rarity: 4, evo: 2,
        fullName: "Rusalka, Spirit of Water II"
    },
    11743: {
        name: "Vepar", stats: [16668, 16196, 13438, 5847, 17047],
        skills: [1047],
        autoAttack: 10145,
        img: "451", rarity: 4, evo: 4,
        fullName: "Vepar, the Roiling Sea II"
    },
    21741: {
        name: "Walutahanga", stats: [22503, 8235, 17579, 22048, 18105],
        skills: [1045, 1046],
        autoAttack: 10126,
        img: "28b", rarity: 5, evo: 3,
        fullName: "Walutahanga, Guardian Dragon"
    },
    11754: {
        name: "Horus", stats: [21003, 17797, 16497, 7440, 18360],
        skills: [1066, 1067],
        autoAttack: 10021,
        img: "3e4", rarity: 5, evo: 2,
        fullName: "Horus, the Falcon God II"
    },
    11753: {
        name: "Pagos", stats: [16995, 11297, 15002, 8101, 17699],
        skills: [1064, 1065],
        autoAttack: 10137,
        img: "255", rarity: 4, evo: 2,
        fullName: "Pagos, Camel Cavalryman II"
    },
    21752: {
        name: "Petsuchos", stats: [16518, 18490, 13994, 5447, 16800],
        skills: [1061, 1062],
        autoAttack: 10011,
        img: "472", rarity: 4, evo: 2,
        fullName: "Petsuchos Minister II"
    },
    11752: {
        name: "Petsuchos", stats: [12513, 13510, 11001, 6006, 13769],
        skills: [1063],
        autoAttack: 10011,
        img: "1c1", rarity: 4, evo: 4,
        fullName: "Petsuchos Executioner II"
    },
    21748: {
        name: "Bastet", stats: [23015, 12008, 22038, 23015, 8405],
        skills: [1058, 1059],
        autoAttack: 10001,
        img: "4f4", rarity: 5, evo: 3,
        fullName: "Bastet, Cat Goddess"
    },
    11755: {
        name: "Spartacus", stats: [25770, 24275, 24871, 15381, 11557],
        skills: [1070],
        autoAttack: 10156,
        img: "4ca", rarity: 6, evo: 2,
        fullName: "Spartacus, Rebel Gladiator II"
    },
    11760: {
        name: "Crassus", stats: [24253, 25131, 22087, 14482, 18544],
        skills: [1074, 1075],
        passiveSkills: [9007],
        autoAttack: 10106,
        img: "3be", rarity: 6, evo: 2,
        fullName: "Crassus, the Lion General II"
    },
    11759: {
        name: "Gaiuz", stats: [17109, 18023, 12134, 5978, 16803],
        skills: [1073],
        autoAttack: 10104,
        img: "461", rarity: 4, evo: 4,
        fullName: "Gaiuz, Crashing Wave II"
    },
    11697: {
        name: "Aegir", stats: [25098, 15088, 21675, 24069, 18544],
        skills: [1035, 1036],
        passiveSkills: [9006],
        autoAttack: 10007,
        isMounted: true,
        img: "2e8", rarity: 6, evo: 2,
        fullName: "Aegir, the Roaring Sea II"
    },
    11750: {
        name: "Khepri", stats: [14792, 7602, 12999, 16010, 16707],
        skills: [1060],
        autoAttack: 10155,
        img: "108", rarity: 4, evo: 4,
        fullName: "Khepri, the Morning Sun II"
    },
    21618: {
        name: "Isabella", stats: [21538, 21062, 20795, 11217, 18098],
        skills: [1054, 1055],
        img: "46a", rarity: 5, evo: 3,
        fullName: "Isabella, the Waterbrand"
    },
    11756: {
        name: "Julia", stats: [21870, 20353, 14178, 6725, 18154],
        skills: [1071],
        img: "1da", rarity: 5, evo: 2,
        fullName: "Julia, Centaur Eques II"
    },
    11765: {
        name: "Huitzilopochtli", stats: [20050, 18555, 18100, 8827, 18219],
        skills: [1081, 1082],
        autoAttack: 10160,
        img: "282", rarity: 5, evo: 2,
        fullName: "Huitzilopochtli, God of War II"
    },
    11762: {
        name: "Frostscale", stats: [17038, 4396, 12391, 17721, 17201],
        skills: [1079],
        autoAttack: 10158,
        img: "138", rarity: 4, evo: 2,
        fullName: "Frostscale Plesiosaur II"
    },
    11764: {
        name: "Thundering", stats: [12686, 5029, 14927, 17899, 17424],
        skills: [1080],
        autoAttack: 10159,
        img: "2a2", rarity: 4, evo: 4,
        fullName: "Thundering Pterosaur II"
    },
    11766: {
        name: "Mielikki", stats: [19053, 18566, 16681, 11340, 18111],
        skills: [1083, 1084],
        autoAttack: 10161,
        img: "1b5", rarity: 5, evo: 2,
        fullName: "Mielikki, Bear Rider II"
    },
    21761: {
        name: "Hellscale", stats: [20787, 21384, 20088, 11221, 17510],
        skills: [1077, 1078],
        autoAttack: 10157,
        img: "35a", rarity: 5, evo: 3,
        fullName: "Hellscale Theropod"
    },
    11783: {
        name: "Paracelsus", stats: [12806, 7806, 8198, 15950, 11111],
        skills: [1093],
        autoAttack: 10007,
        img: "15f", rarity: 4, evo: 4,
        fullName: "Paracelsus, Venomdagger II"
    },
    11779: {
        name: "Hagen", stats: [16779, 15281, 15438, 4785, 16889],
        skills: [1087],
        autoAttack: 10162,
        img: "1c4", rarity: 4, evo: 4,
        fullName: "Hagen, Dueling King II"
    },
    21779: {
        name: "Hagen", stats: [12759, 13615, 13312, 6313, 10311],
        skills: [1088],
        img: "447", rarity: 4, evo: 2,
        fullName: "Hagen, Mad King II"
    },
    11781: {
        name: "Muramasa", stats: [17049, 16042, 13160, 5923, 17569],
        skills: [1091, 1092],
        autoAttack: 10108,
        img: "45e", rarity: 4, evo: 2,
        fullName: "Muramasa, the Cursed Katana II"
    },
    11780: {
        name: "Uscias", stats: [20234, 6790, 14991, 21458, 18154],
        skills: [1089, 1090],
        autoAttack: 10163,
        img: "26f", rarity: 5, evo: 2,
        fullName: "Uscias, the Claiomh Solais II"
    },
    21777: {
        name: "Demonblade", stats: [21454, 9110, 18186, 21674, 18046],
        skills: [1085, 1086],
        autoAttack: 10007,
        img: "1f4", rarity: 5, evo: 3,
        fullName: "Demonblade Countess"
    },
    10420: {
        name: "Ziz", stats: [11741, 10042, 11900, 10624, 10042],
        skills: [19],
        img: "35e", rarity: 4, evo: 4,
        fullName: "Ziz, Wings Divine II"
    },
    10089: {
        name: "Granados", stats: [10725, 11825, 11350, 10541, 10418],
        skills: [19],
        img: "170", rarity: 4, evo: 4,
        fullName: "Granados, Lion King II"
    },
    10381: {
        name: "Nine-tailed", stats: [10673, 11807, 12235, 11170, 12500],
        skills: [19],
        img: "306", rarity: 4, evo: 4,
        fullName: "Nine-tailed Fox II"
    },
    41806: {
        name: "Crom", stats: [21213, 6017, 16987, 21505, 18112],
        skills: [],
        autoAttack: 10016,
        img: "3b3", rarity: 5, evo: 1,
        fullName: "Crom Cruach, the Silver Moon"
    },
    41659: {
        name: "Ilya", stats: [19655, 19943, 17687, 8028, 18186],
        skills: [],
        img: "260", rarity: 5, evo: 1,
        fullName: "Ilya, Giant Slayer"
    },
    41173: {
        name: "Tarasca", stats: [22911, 17998, 20476, 8002, 13503],
        skills: [],
        img: "49b", rarity: 5, evo: 1,
        fullName: "Adamant Tarasca"
    },
    41068: {
        name: "Valafar", stats: [20005, 8007, 13710, 22024, 17212],
        skills: [],
        autoAttack: 10007,
        img: "168", rarity: 5, evo: 1,
        fullName: "Valafar, Inferno Vanquisher"
    },
    11603: {
        name: "Nimue", stats: [19086, 8599, 14384, 20982, 17992],
        skills: [906],
        autoAttack: 10124,
        img: "2c6", rarity: 5, evo: 2,
        fullName: "Nimue, Lady of the Lake II"
    },
    11789: {
        name: "Chanchu", stats: [15002, 4396, 13008, 19097, 17602],
        skills: [1113, 1114],
        autoAttack: 10001,
        img: "209", rarity: 4, evo: 2,
        fullName: "Chanchu, Hermit II"
    },
    21788: {
        name: "Qiong Qi", stats: [17591, 13398, 14503, 8047, 17710],
        skills: [1110, 1111],
        autoAttack: 10011,
        img: "305", rarity: 4, evo: 2,
        fullName: "Qiong Qi, World Eater II"
    },
    21790: {
        name: "Zhu Rong", stats: [23340, 7660, 18190, 22817, 18318],
        skills: [1094, 1095],
        autoAttack: 10164,
        img: "295", rarity: 5, evo: 3,
        fullName: "Zhu Rong, the Blazing Storm"
    },
    11788: {
        name: "Qiong Qi", stats: [12806, 11903, 10904, 6689, 14500],
        skills: [1112],
        autoAttack: 10011,
        img: "435", rarity: 4, evo: 4,
        fullName: "Qiong Qi, Man Eater II"
    },
    11786: {
        name: "Ruyi Zhenxian", stats: [14500, 16489, 14500, 6103, 16510],
        skills: [1109],
        autoAttack: 10165,
        img: "308", rarity: 4, evo: 4,
        fullName: "Ruyi Zhenxian, the Ferocious II"
    },
    21784: {
        name: "Long Nu", stats: [20492, 6522, 21003, 22480, 17982],
        skills: [1107, 1108],
        autoAttack: 10001,
        img: "11f", rarity: 5, evo: 3,
        fullName: "Long Nu, Sea Princess"
    },
    11793: {
        name: "Carl", stats: [16009, 16952, 14482, 5403, 17201],
        skills: [1121],
        autoAttack: 10167,
        img: "1b8", rarity: 4, evo: 2,
        fullName: "Carl, Giant Knight II"
    },
    11803: {
        name: "Andras", stats: [18501, 20007, 16009, 8144, 18447],
        skills: [1116, 1117],
        autoAttack: 10011,
        isMounted: true,
        img: "2c8", rarity: 5, evo: 2,
        fullName: "Andras, the Slayer II"
    },
    11792: {
        name: "Bercilak", stats: [21588, 22856, 15034, 6487, 17797],
        skills: [1119, 1120],
        autoAttack: 10044,
        img: "111", rarity: 5, evo: 2,
        fullName: "Bercilak, Green Knight II"
    },
    11791: {
        name: "Gawain", stats: [23798, 22509, 23224, 14113, 18208],
        skills: [1118],
        autoAttack: 10166,
        img: "4a3", rarity: 6, evo: 2,
        fullName: "Sir Gawain, Sun Knight II"
    },
    11621: {
        name: "Sabnock", stats: [25261, 24643, 21112, 14926, 18544],
        skills: [1123, 1124],
        passiveSkills: [9008],
        autoAttack: 10061,
        img: "14e", rarity: 6, evo: 2,
        fullName: "Sabnock, Marquis of Hell II"
    },
    11795: {
        name: "Ragnelle", stats: [16681, 6064, 11662, 17106, 17292],
        skills: [1122],
        autoAttack: 10129,
        img: "32b", rarity: 4, evo: 4,
        fullName: "Ragnelle, the Moonlight II"
    },
    11828: {
        name: "Leopard Queen", stats: [12487, 11428, 10564, 8026, 13256],
        skills: [1142],
        img: "4d5", rarity: 4, evo: 4,
        fullName: "Cat Sith Leopard Queen II"
    },
    11798: {
        name: "Ollpheist", stats: [17569, 3594, 13507, 16876, 17201],
        skills: [1127],
        autoAttack: 10169,
        img: "372", rarity: 4, evo: 2,
        fullName: "Ollpheist II"
    },
    11801: {
        name: "Scathach", stats: [19140, 6844, 18100, 19151, 18013],
        skills: [1129, 1130],
        autoAttack: 10171,
        img: "4a6", rarity: 5, evo: 2,
        fullName: "Scathach, Shadow Goddess II"
    },
    11800: {
        name: "Fergus", stats: [14879, 14792, 14413, 10418, 15487],
        skills: [1128],
        autoAttack: 10170,
        img: "1df", rarity: 4, evo: 4,
        fullName: "Fergus, Bold King II"
    },
    21797: {
        name: "Cu Chulainn", stats: [20754, 19681, 20170, 12283, 18105],
        skills: [1125, 1126],
        autoAttack: 10168,
        img: "44b", rarity: 5, evo: 3,
        fullName: "Cu Chulainn, the Thunderbolt"
    },
    11825: {
        name: "Pomona", stats: [20559, 17894, 13528, 11275, 18349],
        skills: [1137, 1138],
        autoAttack: 10151,
        img: "2e6", rarity: 5, evo: 2,
        fullName: "Pomona, Grove Goddess II"
    },
    11826: {
        name: "Tricia", stats: [16356, 15348, 12965, 6064, 17797],
        skills: [1139, 1140],
        autoAttack: 10151,
        img: "393", rarity: 4, evo: 2,
        fullName: "Tricia, Cauldron Witch II"
    },
    11824: {
        name: "Pumpkin Hangman", stats: [15462, 6723, 11770, 16900, 17071],
        skills: [1135],
        autoAttack: 10172,
        img: "2e2", rarity: 4, evo: 4,
        fullName: "Pumpkin Hangman II"
    },
    21822: {
        name: "Samhain", stats: [21767, 18770, 17836, 14021, 18105],
        skills: [1133, 1134],
        autoAttack: 10151,
        img: "3ae", rarity: 5, evo: 3,
        fullName: "Samhain, Night Trampler"
    },
    21824: {
        name: "Cursed Pumpkin", stats: [12857, 8534, 9054, 13897, 11156],
        skills: [1136],
        autoAttack: 10007,
        img: "27e", rarity: 4, evo: 2,
        fullName: "Cursed Pumpkin Golem II"
    },
    11256: {
        name: "Baba", stats: [14698, 5013, 13799, 19097, 17396],
        skills: [1150, 1151],
        autoAttack: 10175,
        img: "24b", rarity: 4, evo: 2,
        fullName: "Baba Yaga II"
    },
    21848: {
        name: "Fenrir", stats: [22073, 19760, 19400, 13123, 18425],
        skills: [1143, 1144],
        img: "1c3", rarity: 5, evo: 3,
        fullName: "Fenrir, Vengeful Beast"
    },
    11834: {
        name: "Joro-gumo", stats: [14807, 4537, 13008, 18902, 17851],
        skills: [1148, 1149],
        autoAttack: 10174,
        img: "2b3", rarity: 4, evo: 2,
        fullName: "Joro-gumo II"
    },
    11833: {
        name: "Twar", stats: [12904, 7785, 10001, 12097, 14000],
        skills: [1154],
        autoAttack: 10001,
        img: "12c", rarity: 4, evo: 4,
        fullName: "Twar, Ghost Archmage II"
    },
    21829: {
        name: "Fell Bonedrake", stats: [20375, 24595, 18505, 9300, 18202],
        skills: [1155, 1156],
        autoAttack: 10011,
        img: "438", rarity: 5, evo: 3,
        fullName: "Fell Bonedrake Knight"
    },
    11831: {
        name: "Samedi", stats: [17292, 7102, 16609, 16596, 10511],
        skills: [1157],
        autoAttack: 10176,
        img: "4fb", rarity: 4, evo: 4,
        fullName: "Samedi, Dark Necromancer II"
    },
    21833: {
        name: "Twar", stats: [15543, 5143, 13702, 18122, 17493],
        skills: [1146, 1147],
        autoAttack: 10173,
        img: "331", rarity: 4, evo: 2,
        fullName: "Twar, the Moonlit Night II"
    },
    11840: {
        name: "Gilles", stats: [16596, 5871, 12025, 17426, 16902],
        skills: [1163],
        autoAttack: 10163,
        img: "2cc", rarity: 4, evo: 4,
        fullName: "Gilles, Mad Knight II"
    },
    11835: {
        name: "Peri", stats: [17699, 12293, 15002, 17797, 18403],
        skills: [1152, 1153],
        autoAttack: 10001,
        img: "1bf", rarity: 5, evo: 2,
        fullName: "Peri, Spirit of Fire II"
    },
    11728: {
        name: "Louise", stats: [16529, 15912, 14709, 5111, 17797],
        skills: [1162],
        autoAttack: 10044,
        img: "131", rarity: 4, evo: 2,
        fullName: "Louise, Twilight Swordswoman II"
    },
    11846: {
        name: "Lippy", stats: [22466, 21209, 14536, 7321, 18219],
        skills: [1170, 1171],
        autoAttack: 10029,
        img: "1fc", rarity: 5, evo: 2,
        fullName: "Lippy, Candymancer II"
    },
    11837: {
        name: "Mormo", stats: [21047, 22022, 14005, 6064, 18100],
        skills: [1160, 1161],
        autoAttack: 10177,
        isMounted: true,
        img: "150", rarity: 5, evo: 2,
        fullName: "Mormo, Nightmare II"
    },
    11836: {
        name: "Strigoi", stats: [25120, 18512, 24102, 15803, 18306],
        skills: [1159],
        autoAttack: 10034,
        img: "43a", rarity: 6, evo: 2,
        fullName: "Strigoi, Undying Warrior II"
    },
    21842: {
        name: "Infernal Wyrm Warden", stats: [21034, 7687, 20031, 21592, 18152],
        skills: [1166, 1167],
        autoAttack: 10001,
        img: "206", rarity: 5, evo: 3,
        fullName: "Infernal Wyrm Warden"
    },
    11853: {
        name: "Tatsuta", stats: [20104, 6768, 16421, 20126, 18176],
        skills: [1180, 1181],
        autoAttack: 10007,
        img: "25d", rarity: 5, evo: 2,
        fullName: "Lady Tatsuta, the Mapleleaf II"
    },
    11847: {
        name: "Urom", stats: [20971, 21209, 15056, 8415, 18100],
        skills: [1172, 1173],
        autoAttack: 10180,
        img: "172", rarity: 5, evo: 2,
        fullName: "Urom, Mummy Lizardman II"
    },
    11845: {
        name: "Latona", stats: [14952, 15147, 14585, 5506, 16803],
        skills: [1169],
        autoAttack: 10179,
        img: "267", rarity: 4, evo: 4,
        fullName: "Latona, Wolfwoman II"
    },
    11843: {
        name: "Rustom", stats: [16096, 15847, 16215, 5035, 16800],
        skills: [1168],
        autoAttack: 10178,
        img: "197", rarity: 4, evo: 2,
        fullName: "Rustom, Zombie Ape II"
    },
    11856: {
        name: "Bare-Branch", stats: [12355, 8698, 9063, 13451, 11390],
        skills: [1184],
        autoAttack: 10007,
        img: "26f", rarity: 4, evo: 4,
        fullName: "Bare-Branch Treant II"
    },
    21852: {
        name: "Nicola", stats: [12900, 11611, 11459, 7960, 12066],
        skills: [1179],
        autoAttack: 10005,
        img: "298", rarity: 4, evo: 2,
        fullName: "Nicola, Corpse Handler II"
    },
    11852: {
        name: "Nicola", stats: [16048, 14606, 12597, 7528, 17147],
        skills: [1178],
        autoAttack: 10182,
        img: "208", rarity: 4, evo: 4,
        fullName: "Nicola, the Poison Fly II"
    },
    11854: {
        name: "Domini", stats: [15847, 5880, 12358, 17049, 17385],
        skills: [1182, 1183],
        autoAttack: 10007,
        img: "2ad", rarity: 4, evo: 2,
        fullName: "Domini, Pest Controller II"
    },
    11849: {
        name: "Beelzebub", stats: [22509, 22910, 21242, 17049, 18143],
        skills: [1174],
        autoAttack: 10181,
        img: "3df", rarity: 6, evo: 2,
        fullName: "Beelzebub, Glutton King II"
    },
    21850: {
        name: "Lucifuge", stats: [21278, 8712, 18221, 22130, 18140],
        skills: [1175, 1176],
        autoAttack: 10007,
        img: "3bb", rarity: 5, evo: 3,
        fullName: "Lucifuge, Infernal Premier"
    },
    41726: {
        name: "Haagenti", stats: [21813, 20148, 16179, 6523, 18386],
        skills: [],
        img: "4cb", rarity: 5, evo: 1,
        fullName: "Haagenti, Lord of Beasts"
    },
    21857: {
        name: "Jupiter", stats: [22538, 24050, 18017, 8125, 18250],
        skills: [1197, 1198],
        img: "113", rarity: 5, evo: 3,
        fullName: "Intrepid Hand of Jupiter"
    },
    11655: {
        name: "Hermine", stats: [15121, 4710, 13138, 18143, 17992],
        skills: [1203, 1204],
        autoAttack: 10183,
        img: "14f", rarity: 4, evo: 2,
        fullName: "Hermine, High Priestess II"
    },
    11859: {
        name: "Bennu", stats: [15134, 5040, 13245, 17864, 16803],
        skills: [1199],
        autoAttack: 10110,
        img: "275", rarity: 4, evo: 4,
        fullName: "Bennu, the Sun Bird II"
    },
    11861: {
        name: "Caim", stats: [12720, 12293, 11124, 6516, 14134],
        skills: [1202],
        img: "37b", rarity: 4, evo: 4,
        fullName: "Caim, the Dark Plume II"
    },
    21861: {
        name: "Caim", stats: [16085, 16908, 13799, 6010, 17201],
        skills: [1200, 1201],
        img: "3c3", rarity: 4, evo: 2,
        fullName: "Caim, Death Seeker II"
    },
    11706: {
        name: "Cat Sith Whipmaster", stats: [16215, 16518, 14211, 5609, 17504],
        skills: [1210],
        autoAttack: 10185,
        img: "41f", rarity: 4, evo: 2,
        fullName: "Cat Sith Whipmaster II"
    },
    11930: {
        name: "Ljung", stats: [16974, 17133, 13710, 5029, 17206],
        skills: [1211],
        autoAttack: 10105,
        img: "441", rarity: 4, evo: 4,
        fullName: "Ljung, the Wrecker II"
    },
    11865: {
        name: "Garmr", stats: [21339, 19205, 14417, 8025, 18252],
        skills: [1208, 1209],
        autoAttack: 10061,
        img: "2af", rarity: 5, evo: 2,
        fullName: "Garmr, Watchhound II"
    },
    11869: {
        name: "Hel", stats: [25824, 12315, 22249, 25553, 18555],
        skills: [1212, 1213],
        passiveSkills: [9010],
        autoAttack: 10129,
        img: "135", rarity: 6, evo: 2,
        fullName: "Hel, Goddess of Woe II"
    },
    11864: {
        name: "Tyr", stats: [25109, 25012, 24578, 9000, 18154],
        skills: [1207],
        autoAttack: 10184,
        img: "42b", rarity: 6, evo: 2,
        fullName: "Tyr, God of War II"
    },
    11870: {
        name: "Chicomecoatl", stats: [21112, 10192, 17363, 19530, 13008],
        skills: [1205, 1206],
        autoAttack: 10001,
        img: "1ba", rarity: 5, evo: 2,
        fullName: "Chicomecoatl, the Bountiful II"
    },
    11875: {
        name: "Guardian of the Grove", stats: [20104, 19086, 14807, 8935, 18317],
        skills: [1221, 1222],
        autoAttack: 10187,
        img: "3fa", rarity: 5, evo: 2,
        fullName: "Guardian of the Grove II"
    },
    11873: {
        name: "Iridescent Chalchiuhtotolin", stats: [16510, 13476, 15778, 5687, 17292],
        skills: [1217],
        img: "4fb", rarity: 4, evo: 4,
        fullName: "Iridescent Chalchiuhtotolin II"
    },
    11874: {
        name: "Idun", stats: [20722, 6270, 15706, 20299, 18252],
        skills: [1218, 1219],
        autoAttack: 10003,
        img: "467", rarity: 5, evo: 2,
        fullName: "Idun, the Golden Apple II"
    },
    11871: {
        name: "Ain", stats: [15652, 4472, 15099, 16020, 17504],
        skills: [1216],
        autoAttack: 10186,
        img: "400", rarity: 4, evo: 2,
        fullName: "Ain, Squirrel-back Faerie II"
    },
    21862: {
        name: "Diana", stats: [20380, 20194, 19493, 10208, 18221],
        skills: [1214, 1215],
        autoAttack: 10103,
        img: "26d", rarity: 5, evo: 3,
        fullName: "Diana, the Crescent Moon"
    },
    11884: {
        name: "Brass Snow-Leopard", stats: [13256, 13024, 10074, 8209, 10564],
        skills: [1232],
        img: "4d8", rarity: 4, evo: 4,
        fullName: "Brass Snow-Leopard II"
    },
    11882: {
        name: "Negafok", stats: [17103, 16258, 13431, 5468, 17493],
        skills: [1230, 1231],
        autoAttack: 10103,
        img: "192", rarity: 4, evo: 2,
        fullName: "Negafok, Reindeer Rider II"
    },
    11881: {
        name: "Vidar", stats: [22141, 21859, 15587, 6183, 18306],
        skills: [1228, 1229],
        img: "155", rarity: 5, evo: 2,
        fullName: "Vidar, the Iron Heel II"
    },
    11807: {
        name: "Gabrielle", stats: [19974, 17775, 17255, 8101, 18143],
        skills: [1245, 1246],
        img: "372", rarity: 5, evo: 2,
        fullName: "Gabrielle, Angel of Sky II"
    },
    11880: {
        name: "Yule", stats: [15024, 17353, 13256, 6530, 17034],
        skills: [1226],
        autoAttack: 10157,
        img: "2fc", rarity: 4, evo: 4,
        fullName: "Yule Goat, Death Bringer II"
    },
    21880: {
        name: "Yule", stats: [13052, 13203, 10733, 7364, 11589],
        skills: [1227],
        autoAttack: 10005,
        img: "1a3", rarity: 4, evo: 2,
        fullName: "Yule Goat, the Blood-Stained II"
    },
    11185: {
        name: "Michael", stats: [24513, 24004, 22379, 12640, 18284],
        skills: [1223],
        autoAttack: 10157,
        img: "3a7", rarity: 6, evo: 2,
        fullName: "Michael, Steelclad Angel II"
    },
    21878: {
        name: "Befana", stats: [22153, 8586, 17498, 22048, 18105],
        skills: [1224, 1225],
        autoAttack: 10007,
        img: "3d1", rarity: 5, evo: 3,
        fullName: "Befana, the Moonless Night"
    },
    21885: {
        name: "Virginal", stats: [23688, 8160, 17865, 22340, 18342],
        skills: [1233, 1234],
        autoAttack: 10057,
        img: "2c8", rarity: 5, evo: 3,
        fullName: "Virginal, Ice Queen"
    },
    11689: {
        name: "Thanatos", stats: [25532, 23452, 22834, 14016, 18544],
        skills: [989, 990],
        passiveSkills: [9005],
        autoAttack: 10061,
        img: "362", rarity: 6, evo: 2,
        fullName: "Thanatos, Death Incarnate II"
    },
    11602: {
        name: "Lancelot", stats: [23127, 25098, 20093, 17461, 18533],
        skills: [909, 910],
        passiveSkills: [9003],
        autoAttack: 10108,
        img: "28e", rarity: 6, evo: 2,
        fullName: "Lancelot of the Lake II"
    },
    11841: {
        name: "Van", stats: [25662, 25521, 20126, 14633, 18555],
        skills: [1164, 1165],
        passiveSkills: [9009],
        autoAttack: 10103,
        img: "425", rarity: 6, evo: 2,
        fullName: "Van, Shadow Hunter II"
    },
    11397: {
        name: "Terra", stats: [19053, 7267, 17006, 22498, 18100],
        skills: [575, 576],
        autoAttack: 10007,
        img: "325", rarity: 5, evo: 2,
        fullName: "Arcanan Terra II"
    },
    11816: {
        name: "Pallas", stats: [18501, 24990, 15998, 5858, 18252],
        skills: [1026, 1027],
        autoAttack: 10133,
        img: "1b1", rarity: 5, evo: 2,
        fullName: "Pallas, Goddess of Protection II"
    },
    11802: {
        name: "Medb", stats: [21231, 5999, 14893, 20906, 18219],
        skills: [1131, 1132],
        autoAttack: 10001,
        img: "494", rarity: 5, evo: 2,
        fullName: "Medb, Jealous Queen II"
    },
    21877: {
        name: "Renenet", stats: [23328, 10078, 16343, 22132, 18365],
        skills: [1185, 1186],
        autoAttack: 10007,
        img: "2cb", rarity: 5, evo: 3,
        fullName: "Renenet, Goddess of Wealth"
    },
    21890: {
        name: "Chuchunya", stats: [17309, 19422, 11492, 5533, 17493],
        skills: [1238, 1239],
        img: "31d", rarity: 4, evo: 2,
        fullName: "Chuchunya, Tundra Guardian II"
    },
    11888: {
        name: "Kosuke", stats: [15755, 16913, 14003, 5664, 17023],
        skills: [1237],
        autoAttack: 10188,
        img: "454", rarity: 4, evo: 4,
        fullName: "Kosuke, Master Ninja II"
    },
    11891: {
        name: "Gorynich", stats: [18826, 14579, 17082, 12185, 18533],
        skills: [1243, 1244],
        autoAttack: 10190,
        img: "395", rarity: 5, evo: 2,
        fullName: "Gorynich, Snow Dragon II"
    },
    11892: {
        name: "Nyx", stats: [16280, 14113, 16172, 4558, 17981],
        skills: [1241, 1242],
        autoAttack: 10189,
        img: "32f", rarity: 4, evo: 2,
        fullName: "Nyx, the Dark Wing II"
    },
    11890: {
        name: "Chuchunya", stats: [12659, 13245, 11756, 6564, 12586],
        skills: [1240],
        img: "344", rarity: 4, evo: 4,
        fullName: "Chuchunya, Iceberg Breaker II"
    },
    21886: {
        name: "Skadi", stats: [21655, 24515, 19052, 7533, 18225],
        skills: [1235, 1236],
        img: "274", rarity: 5, evo: 3,
        fullName: "Skadi, Goddess of Winter"
    },
    11723: {
        name: "Veigr", stats: [17220, 17678, 15024, 11038, 9101],
        skills: [1251],
        autoAttack: 10191,
        img: "298", rarity: 4, evo: 4,
        fullName: "Veigr, Under-watch Captain II"
    },
    11922: {
        name: "Ritho", stats: [25402, 24188, 24123, 10127, 18013],
        skills: [1247],
        autoAttack: 10145,
        img: "4c0", rarity: 6, evo: 2,
        fullName: "Ritho, King of the Giants II"
    },
    11767: {
        name: "Ortlinde", stats: [25716, 23625, 21328, 15218, 18598],
        skills: [1252, 1253],
        passiveSkills: [9011],
        autoAttack: 10103,
        isMounted: true,
        img: "10e", rarity: 6, evo: 2,
        fullName: "Ortlinde, Silent Valkyrie II"
    },
    11774: {
        name: "Gog", stats: [16724, 15197, 13052, 7884, 17201],
        skills: [1250],
        autoAttack: 10034,
        img: "48e", rarity: 4, evo: 2,
        fullName: "Gog, Giant II"
    },
    11710: {
        name: "Muspell", stats: [22130, 16063, 17201, 15305, 13052],
        skills: [1248, 1249],
        autoAttack: 10192,
        img: "1bc", rarity: 5, evo: 2,
        fullName: "Muspell, Giant Knight II"
    },
    11915: {
        name: "Champion of Aquarius", stats: [19974, 4732, 18761, 19378, 18403],
        skills: [1258, 1259],
        autoAttack: 10195,
        img: "202", rarity: 5, evo: 2,
        fullName: "Champion of Aquarius II"
    },
    11932: {
        name: "Halphas", stats: [17058, 16913, 12745, 5371, 17913],
        skills: [1257],
        autoAttack: 10194,
        img: "496", rarity: 4, evo: 4,
        fullName: "Halphas, Earl of Hell II"
    },
    21707: {
        name: "Erupting Golem", stats: [20742, 18258, 19856, 12423, 17218],
        skills: [1254, 1255],
        img: "234", rarity: 5, evo: 3,
        fullName: "Erupting Golem"
    },
    11775: {
        name: "Magog", stats: [17049, 16648, 16161, 12380, 9000],
        skills: [1256],
        autoAttack: 10193,
        img: "315", rarity: 4, evo: 2,
        fullName: "Magog, Giant II"
    },
    11904: {
        name: "Marsyas", stats: [15889, 6430, 10346, 17950, 17315],
        skills: [1266],
        autoAttack: 10007,
        img: "3d2", rarity: 4, evo: 4,
        fullName: "Marsyas, the Cursed Flute II"
    },
    21904: {
        name: "Marsyas", stats: [12033, 8935, 10582, 13463, 11665],
        skills: [1267],
        autoAttack: 10007,
        img: "348", rarity: 4, evo: 2,
        fullName: "Marsyas, Calamity Caller II"
    },
    11905: {
        name: "Apollo", stats: [22043, 15901, 14514, 10809, 18360],
        skills: [1268, 1269],
        autoAttack: 10061,
        img: "307", rarity: 5, evo: 2,
        fullName: "Apollo, God of the Sun II"
    },
    21902: {
        name: "Amphion", stats: [23414, 9122, 15352, 22364, 18186],
        skills: [1264, 1265],
        autoAttack: 10007,
        img: "136", rarity: 5, evo: 3,
        fullName: "Amphion, Hymn of Death"
    },
    11909: {
        name: "Amaterasu", stats: [24102, 12553, 23387, 23387, 18403],
        skills: [1262, 1263],
        autoAttack: 10016,
        img: "3d1", rarity: 6, evo: 2,
        fullName: "Amaterasu, Light of the Sun II"
    },
    11653: {
        name: "Acanthus", stats: [16616, 6129, 10419, 17493, 17894],
        skills: [1270, 1271],
        autoAttack: 10007,
        img: "148", rarity: 4, evo: 2,
        fullName: "Acanthus, the Gilded Thorn II"
    },
    11908: {
        name: "Hyacinth", stats: [13476, 10391, 10321, 7966, 12366],
        skills: [1272],
        autoAttack: 10005,
        img: "182", rarity: 4, evo: 4,
        fullName: "Hyacinth, the Death Dealer II"
    },
    11712: {
        name: "Vesta", stats: [19552, 20397, 15500, 7581, 18219],
        skills: [1260, 1261],
        autoAttack: 10196,
        img: "10b", rarity: 5, evo: 2,
        fullName: "Vesta, Flame Witch II"
    },
    11936: {
        name: "Hervor", stats: [17751, 18157, 14535, 14120, 5506],
        skills: [1283],
        autoAttack: 10041,
        img: "385", rarity: 4, evo: 4,
        fullName: "Hervor, the Cursed Blade II"
    },
    21914: {
        name: "Taromaiti", stats: [17385, 18241, 12033, 6151, 17309],
        skills: [1276, 1277],
        img: "1bd", rarity: 4, evo: 2,
        fullName: "Taromaiti, Fallen Goddess II"
    },
    11934: {
        name: "Wepwawet", stats: [16230, 15851, 11634, 6881, 17533],
        skills: [1275],
        img: "17b", rarity: 4, evo: 4,
        fullName: "Wepwawet, the Vanguard II"
    },
    21615: {
        name: "Zaphkiel", stats: [22700, 7602, 17657, 22190, 18318],
        skills: [1273, 1274],
        autoAttack: 10007,
        img: "27e", rarity: 5, evo: 3,
        fullName: "Zaphkiel, the Blessed Rain"
    },
    11914: {
        name: "Taromaiti", stats: [12890, 12999, 10538, 7419, 12734],
        skills: [1278],
        img: "152", rarity: 4, evo: 4,
        fullName: "Taromaiti, Depraved Queen II"
    },
    11624: {
        name: "Kapoonis", stats: [21935, 11719, 13160, 16139, 18295],
        skills: [1280, 1281],
        autoAttack: 10003,
        img: "378", rarity: 5, evo: 2,
        fullName: "Kapoonis, Thunder Magus II"
    },
    11917: {
        name: "Sir", stats: [25748, 24578, 22455, 10571, 18501],
        skills: [1279],
        img: "44e", rarity: 6, evo: 2,
        fullName: "Sir Galahad, Knight Champion II"
    },
    11330: {
        name: "Orpheus", stats: [17212, 6162, 13658, 16529, 16497],
        skills: [1282],
        autoAttack: 10186,
        img: "3bb", rarity: 4, evo: 2,
        fullName: "Orpheus, Fallen Hero II"
    },
};
var FamProvider = (function () {
    function FamProvider() {
    }
    FamProvider.getTierList = function (tierToGet) {
        if (!this.tierList) {
            this.tierList = {};
            var allTierList = TierList;
            var tierArray = ["X+", "X", "S+", "S", "A+", "A", "B", "C"];
            for (var i = 0; i < tierArray.length; i++) {
                var tier = tierArray[i];
                this.tierList[tier] = [];
                for (var key in famDatabase) {
                    if (famDatabase.hasOwnProperty(key)) {
                        var name_1 = famDatabase[key].fullName;
                        if (allTierList[tier].indexOf(name_1) !== -1) {
                            this.tierList[tier].push(key);
                        }
                    }
                }
            }
        }
        return this.tierList[tierToGet];
    };
    FamProvider.getAllFamiliarList = function () {
        if (!this.allIdList) {
            this.allIdList = [];
            for (var key in famDatabase) {
                if (famDatabase.hasOwnProperty(key) && !famDatabase[key].isWarlord) {
                    this.allIdList.push(+key);
                }
            }
        }
        return this.allIdList;
    };
    FamProvider.getRandomFamList = function (type) {
        var tierXP = this.getTierList("X+");
        var tierX = this.getTierList("X");
        var tierSP = this.getTierList("S+");
        var tierS = this.getTierList("S");
        var tierAP = this.getTierList("A+");
        var tierA = this.getTierList("A");
        switch (type) {
            case ENUM.RandomBrigType.ALL:
                return this.getAllFamiliarList();
            case ENUM.RandomBrigType.XP_ONLY:
                return tierXP;
            case ENUM.RandomBrigType.X_ONLY:
                return tierX;
            case ENUM.RandomBrigType.X_UP:
                return tierX.concat(tierXP);
            case ENUM.RandomBrigType.SP_ONLY:
                return tierSP;
            case ENUM.RandomBrigType.SP_UP:
                return tierSP.concat(tierX).concat(tierXP);
            case ENUM.RandomBrigType.S_ONLY:
                return tierS;
            case ENUM.RandomBrigType.S_UP:
                return tierS.concat(tierSP).concat(tierX).concat(tierXP);
            case ENUM.RandomBrigType.AP_ONLY:
                return tierAP;
            case ENUM.RandomBrigType.AP_UP:
                return tierAP.concat(tierS).concat(tierSP).concat(tierX).concat(tierXP);
            case ENUM.RandomBrigType.A_ONLY:
                return tierA;
            case ENUM.RandomBrigType.A_UP:
                return tierA.concat(tierAP).concat(tierS).concat(tierSP).concat(tierX).concat(tierXP);
            default:
                throw new Error("Invalid brig random type");
        }
    };
    FamProvider.getWarlordList = function () {
        return [1, 2, 3, 4, 5, 6, 7, 8];
    };
    FamProvider.tierList = null;
    FamProvider.allIdList = null;
    return FamProvider;
}());
var Formation = (function () {
    function Formation(type) {
        this.type = type;
    }
    Formation.initialize = function () {
        Formation.FORMATION_CONFIG[ENUM.FormationType.SKEIN_5] = [3, 2, 1, 2, 3];
        Formation.FORMATION_CONFIG[ENUM.FormationType.VALLEY_5] = [1, 2, 3, 2, 1];
        Formation.FORMATION_CONFIG[ENUM.FormationType.TOOTH_5] = [1, 3, 1, 3, 1];
        Formation.FORMATION_CONFIG[ENUM.FormationType.WAVE_5] = [3, 1, 2, 1, 3];
        Formation.FORMATION_CONFIG[ENUM.FormationType.FRONT_5] = [1, 1, 1, 1, 1];
        Formation.FORMATION_CONFIG[ENUM.FormationType.MID_5] = [2, 2, 2, 2, 2];
        Formation.FORMATION_CONFIG[ENUM.FormationType.REAR_5] = [3, 3, 3, 3, 3];
        Formation.FORMATION_CONFIG[ENUM.FormationType.PIKE_5] = [3, 3, 1, 3, 3];
        Formation.FORMATION_CONFIG[ENUM.FormationType.SHIELD_5] = [1, 1, 3, 1, 1];
        Formation.FORMATION_CONFIG[ENUM.FormationType.PINCER_5] = [3, 1, 3, 1, 3];
        Formation.FORMATION_CONFIG[ENUM.FormationType.SAW_5] = [1, 3, 2, 3, 1];
        Formation.FORMATION_CONFIG[ENUM.FormationType.HYDRA_5] = [3, 3, 1, 1, 1];
        Formation.UNI_PROC_ORDER[ENUM.FormationRow.FRONT] = [11, 12, 13, 14, 15];
        Formation.UNI_PROC_ORDER[ENUM.FormationRow.MID] = [6, 7, 8, 9, 10];
        Formation.UNI_PROC_ORDER[ENUM.FormationRow.REAR] = [1, 2, 3, 4, 5];
        return null;
    };
    Formation.getProcIndex = function (row, column) {
        return Formation.UNI_PROC_ORDER[row][column];
    };
    Formation.prototype.getCardRow = function (position) {
        return Formation.FORMATION_CONFIG[this.type][position];
    };
    Formation.prototype.getFormationConfig = function () {
        return Formation.FORMATION_CONFIG[this.type];
    };
    Formation.FORMATION_CONFIG = {};
    Formation.UNI_PROC_ORDER = {};
    Formation.whyfoo = Formation.initialize();
    return Formation;
}());
var SkillProvider = (function () {
    function SkillProvider() {
    }
    SkillProvider.getAvailableSkillsForSelect = function () {
        if (this.availableSkillsForSelect == null) {
            this.availableSkillsForSelect = [];
            for (var key in SkillDatabase) {
                if (SkillDatabase.hasOwnProperty(key)) {
                    if (this.isAvailableForSelect(+key)) {
                        this.availableSkillsForSelect.push(+key);
                    }
                }
            }
        }
        return this.availableSkillsForSelect;
    };
    SkillProvider.getAvailableOpeningSkillList = function () {
        if (this.openingSkillList == null) {
            this.openingSkillList = [];
            for (var key in SkillDatabase) {
                if (SkillDatabase.hasOwnProperty(key)) {
                    if (this.isAvailableForSelect(+key) && SkillDatabase[key].type === ENUM.SkillType.OPENING) {
                        this.openingSkillList.push(+key);
                    }
                }
            }
        }
        return this.openingSkillList;
    };
    SkillProvider.getAvailableActiveSkillList = function () {
        if (this.activeSkillList == null) {
            this.activeSkillList = [];
            for (var key in SkillDatabase) {
                if (SkillDatabase.hasOwnProperty(key)) {
                    if (this.isAvailableForSelect(+key) && SkillDatabase[key].type === ENUM.SkillType.ACTIVE) {
                        this.activeSkillList.push(+key);
                    }
                }
            }
        }
        return this.activeSkillList;
    };
    SkillProvider.getAvailableReactiveSkillList = function () {
        if (this.reactiveSkillList == null) {
            this.reactiveSkillList = [];
            for (var key in SkillDatabase) {
                if (SkillDatabase.hasOwnProperty(key)) {
                    if (this.isAvailableForSelect(+key) && (SkillDatabase[key].type === ENUM.SkillType.DEFENSE ||
                        SkillDatabase[key].type === ENUM.SkillType.PROTECT || SkillDatabase[key].type === ENUM.SkillType.EVADE)) {
                        this.reactiveSkillList.push(+key);
                    }
                }
            }
        }
        return this.reactiveSkillList;
    };
    SkillProvider.getAvailableOnDeathSkillList = function () {
        if (this.onDeathSkillList == null) {
            this.onDeathSkillList = [];
            for (var key in SkillDatabase) {
                if (SkillDatabase.hasOwnProperty(key)) {
                    if (this.isAvailableForSelect(+key) && SkillDatabase[key].type === ENUM.SkillType.ACTION_ON_DEATH) {
                        this.onDeathSkillList.push(+key);
                    }
                }
            }
        }
        return this.onDeathSkillList;
    };
    SkillProvider.isAvailableForSelect = function (skillId) {
        return SkillDatabase[skillId].sac === 1;
    };
    SkillProvider.availableSkillsForSelect = null;
    SkillProvider.skillCategories = [ENUM.SkillCategory.OPENING, ENUM.SkillCategory.ACTIVE,
        ENUM.SkillCategory.REACTIVE, ENUM.SkillCategory.ACTION_ON_DEATH];
    SkillProvider.openingSkillList = null;
    SkillProvider.activeSkillList = null;
    SkillProvider.reactiveSkillList = null;
    SkillProvider.onDeathSkillList = null;
    return SkillProvider;
}());
function setPreviousChoices() {
    if (localStorage.getItem("f0") && localStorage.getItem("f0") !== "null") {
        for (var i = 0; i < 10; i++) {
            document.getElementById("f" + i).value = localStorage.getItem("f" + i);
        }
    }
    if (localStorage.getItem("f10") && localStorage.getItem("f10") !== "null") {
        for (var i = 0; i < 10; i++) {
            document.getElementById("f" + (i + 10)).value = localStorage.getItem("f" + (i + 10));
        }
    }
    if (localStorage.getItem("s10") && localStorage.getItem("s10") !== "null") {
        for (var i = 0; i < 3; i++) {
            document.getElementById("s1" + i).value = localStorage.getItem("s1" + i);
        }
    }
    if (localStorage.getItem("s20") && localStorage.getItem("s20") !== "null") {
        for (var i = 0; i < 3; i++) {
            document.getElementById("s2" + i).value = localStorage.getItem("s2" + i);
        }
    }
    if (localStorage.getItem("1f") && localStorage.getItem("1f") !== "null") {
        document.getElementById("1f").value = localStorage.getItem("1f");
    }
    if (localStorage.getItem("2f") && localStorage.getItem("2f") !== "null") {
        document.getElementById("2f").value = localStorage.getItem("2f");
    }
    var arr = ["HP", "ATK", "DEF", "WIS", "AGI"];
    for (var player = 1; player <= 2; player++) {
        for (var famIndex = 0; famIndex < 10; famIndex++) {
            for (var statIndex = 0; statIndex < arr.length; statIndex++) {
                var key = "p" + player + "f" + famIndex + arr[statIndex].toLowerCase();
                if (localStorage.getItem(key) && localStorage.getItem(key) !== "null") {
                    document.getElementById(key).value = localStorage.getItem(key);
                }
            }
        }
    }
    for (var player = 1; player <= 2; player++) {
        for (var famIndex = 0; famIndex < 10; famIndex++) {
            for (var skillIndex = 0; skillIndex < 3; skillIndex++) {
                var key = "p" + player + "f" + famIndex + "s" + skillIndex;
                if (localStorage.getItem(key) && localStorage.getItem(key) !== "null") {
                    document.getElementById(key).value = localStorage.getItem(key);
                }
            }
        }
    }
    if (localStorage.getItem("debug") === "true") {
        document.getElementById("debug").checked = true;
    }
    var bt = localStorage.getItem("bt");
    if (bt === "1" || bt === "2" || bt === "3") {
        document.getElementById("bt").value = bt;
    }
}
function toogleDisable() {
    for (var player = 1; player <= 2; player++) {
        var isSelected = document.getElementById("r" + player).checked;
        var elems = document.getElementsByClassName("p" + player);
        for (var i = 0; i < elems.length; i++) {
            if (isSelected) {
                elems[i].disabled = true;
            }
            else {
                elems[i].disabled = false;
            }
        }
        var randomSelect = document.getElementById(player + "r");
        if (isSelected) {
            randomSelect.disabled = false;
        }
        else {
            randomSelect.disabled = true;
        }
    }
}
function toogleReserve() {
    for (var player = 1; player <= 2; player++) {
        var btValue = document.getElementById("bt").value;
        var isBloodclash = btValue === "1" || btValue === "3";
        var elems = document.getElementsByClassName("reserve");
        for (var i = 0; i < elems.length; i++) {
            var elem = elems[i];
            if (!isBloodclash) {
                elem.disabled = true;
                elem.style.display = 'none';
            }
            else {
                elem.disabled = false;
                elem.style.display = 'inline';
            }
        }
    }
    toogleDisable();
}
function onFormLoad() {
    setFamOptions();
    setSkillOptions();
    addCustomsStatDiv();
    addCustomsSkillDiv();
    toogleCustomStat(1);
    toogleCustomStat(2);
    toogleCustomSkill(1);
    toogleCustomSkill(2);
    document.getElementById("bt").onchange = function () {
        toogleReserve();
        toogleCustomStat(1);
        toogleCustomStat(2);
        toogleCustomSkill(1);
        toogleCustomSkill(2);
    };
    setPreviousChoices();
    toogleReserve();
    toogleDisable();
}
function validateForm() {
    return true;
}
function submitForm() {
    var form = document.forms["mainForm"];
    if (form["debug"].checked === true) {
        form.action = "debug.html";
    }
    form.submit();
}
function setFamOptions() {
    var famSelects = document.getElementsByClassName("famSelect");
    var famIdArray = [];
    for (var key in famDatabase) {
        if (famDatabase.hasOwnProperty(key)) {
            famIdArray.push(key);
        }
    }
    famIdArray.sort(function (a, b) { return famDatabase[a].fullName.localeCompare(famDatabase[b].fullName); });
    for (var index = 0; index < famIdArray.length; index++) {
        var key = famIdArray[index];
        var option = document.createElement("option");
        option.value = key;
        option.text = famDatabase[key].fullName;
        famSelects[0].add(option);
    }
    for (var i = 1; i < famSelects.length; i++) {
        famSelects[i].innerHTML = famSelects[0].innerHTML;
    }
}
function toogleCustomStat(player) {
    var checked = document.getElementById("p" + player + "customStatChbox").checked;
    var btValue = document.getElementById("bt").value;
    var isBloodclash = btValue === "1" || btValue === "3";
    var customStatDiv = document.getElementById("p" + player + "customStatDivNormal");
    var inputs = customStatDiv.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = !checked;
    }
    customStatDiv.style.display = checked ? "block" : "none";
    customStatDiv = document.getElementById("p" + player + "customStatDivBloodclash");
    inputs = customStatDiv.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = !isBloodclash || !checked;
    }
    customStatDiv.style.display = (checked && isBloodclash) ? "block" : "none";
    var arr = ["HP", "ATK", "DEF", "WIS", "AGI"];
    for (var i = 0; i < 10; i++) {
        var slotChecked = document.getElementById("p" + player + "f" + i + "customStatChkbox").checked;
        var slotDisabled = document.getElementById("p" + player + "f" + i + "customStatChkbox").disabled;
        for (var j = 0; j < arr.length; j++) {
            var txtBox = document.getElementById("p" + player + "f" + i + arr[j].toLowerCase());
            txtBox.disabled = slotDisabled || !slotChecked;
        }
    }
}
function toogleCustomSkill(player) {
    var checked = document.getElementById("p" + player + "customSkillChbox").checked;
    var btValue = document.getElementById("bt").value;
    var isBloodclash = btValue === "1" || btValue === "3";
    var customSkillDiv = document.getElementById("p" + player + "customSkillDivNormal");
    var inputs = customSkillDiv.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = !checked;
    }
    customSkillDiv.style.display = checked ? "block" : "none";
    customSkillDiv = document.getElementById("p" + player + "customSkillDivBloodclash");
    inputs = customSkillDiv.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = !isBloodclash || !checked;
    }
    customSkillDiv.style.display = (checked && isBloodclash) ? "block" : "none";
    for (var i = 0; i < 10; i++) {
        var slotChecked = document.getElementById("p" + player + "f" + i + "customSkillChkbox").checked;
        var slotDisabled = document.getElementById("p" + player + "f" + i + "customSkillChkbox").disabled;
        for (var j = 0; j < 3; j++) {
            var select = document.getElementById("p" + player + "f" + i + "s" + j);
            select.disabled = slotDisabled || !slotChecked;
        }
    }
}
function setSkillOptions() {
    var skillSelects = document.getElementsByClassName("skillSelect");
    var skillIdArray = SkillProvider.getAvailableSkillsForSelect();
    skillIdArray.sort(function (a, b) { return SkillDatabase[a].name.localeCompare(SkillDatabase[b].name); });
    var option = document.createElement("option");
    option.value = "0";
    option.text = "--none--";
    skillSelects[0].add(option);
    for (var index = 0; index < skillIdArray.length; index++) {
        var key = skillIdArray[index];
        option = document.createElement("option");
        option.value = key + "";
        option.text = SkillDatabase[key].name;
        skillSelects[0].add(option);
    }
    for (var i = 1; i < skillSelects.length; i++) {
        skillSelects[i].innerHTML = skillSelects[0].innerHTML;
    }
}
function addCustomsStatDiv() {
    var arr = ["HP", "ATK", "DEF", "WIS", "AGI"];
    var divArr = ["Normal", "Bloodclash"];
    for (var divIndex = 0; divIndex < divArr.length; divIndex++) {
        for (var player = 1; player <= 2; player++) {
            var customStatDiv = document.getElementById("p" + player + "customStatDiv" + divArr[divIndex]);
            for (var i = 0; i < 5; i++) {
                var famIndex = i + 5 * divIndex;
                customStatDiv.appendChild(document.createElement('br'));
                customStatDiv.appendChild(document.createTextNode("Familiar " + (famIndex + 1)));
                var input = document.createElement("input");
                input.type = "checkbox";
                input.id = "p" + player + "f" + famIndex + "customStatChkbox";
                input.onchange = (function (p) { return function () { return toogleCustomStat(p); }; })(player);
                customStatDiv.appendChild(input);
                for (var statIndex = 0; statIndex < arr.length; statIndex++) {
                    customStatDiv.appendChild(document.createTextNode(" " + arr[statIndex] + " "));
                    input = document.createElement("input");
                    input.type = "text";
                    input.name = "p" + player + "f" + famIndex + arr[statIndex].toLowerCase();
                    input.id = "p" + player + "f" + famIndex + arr[statIndex].toLowerCase();
                    input.size = 6;
                    input.maxLength = 6;
                    customStatDiv.appendChild(input);
                }
            }
        }
    }
}
function addCustomsSkillDiv() {
    var divArr = ["Normal", "Bloodclash"];
    var skillSelect = document.getElementsByClassName("skillSelect")[0];
    for (var divIndex = 0; divIndex < divArr.length; divIndex++) {
        for (var player = 1; player <= 2; player++) {
            var customSkillDiv = document.getElementById("p" + player + "customSkillDiv" + divArr[divIndex]);
            for (var i = 0; i < 5; i++) {
                var famIndex = i + 5 * divIndex;
                customSkillDiv.appendChild(document.createElement('br'));
                customSkillDiv.appendChild(document.createTextNode("Familiar " + (famIndex + 1)));
                var input = document.createElement("input");
                input.type = "checkbox";
                input.id = "p" + player + "f" + famIndex + "customSkillChkbox";
                input.onchange = (function (p) { return function () { return toogleCustomSkill(p); }; })(player);
                customSkillDiv.appendChild(input);
                for (var skillIndex = 0; skillIndex < 3; skillIndex++) {
                    customSkillDiv.appendChild(document.createTextNode(" Skill " + skillIndex + " "));
                    var select = document.createElement("select");
                    select.name = "p" + player + "f" + famIndex + "s" + skillIndex;
                    select.id = "p" + player + "f" + famIndex + "s" + skillIndex;
                    select.innerHTML = skillSelect.innerHTML;
                    customSkillDiv.appendChild(select);
                }
            }
        }
    }
}
function getBattleDataOption() {
    localStorage.setItem("debug", getURLParameter("debug"));
    var data = {}, option = {};
    var battleType = getURLParameter("bt");
    localStorage.setItem("bt", battleType);
    option.battleType = +battleType;
    option.p1RandomMode = +getURLParameter("1r");
    option.p2RandomMode = +getURLParameter("2r");
    data.p1_formation = getURLParameter("1f");
    if (!option.p1RandomMode)
        localStorage.setItem("1f", data.p1_formation);
    data.p2_formation = getURLParameter("2f");
    if (!option.p2RandomMode)
        localStorage.setItem("2f", data.p2_formation);
    data.p1_customStats = {};
    data.p2_customStats = {};
    data.p1_customSkills = {};
    data.p2_customSkills = {};
    var arr = ["HP", "ATK", "DEF", "WIS", "AGI"];
    for (var player = 1; player <= 2; player++) {
        for (var famIndex = 0; famIndex < 10; famIndex++) {
            for (var statIndex = 0; statIndex < arr.length; statIndex++) {
                var key = "p" + player + "f" + famIndex + arr[statIndex].toLowerCase();
                var stat = getURLParameter(key);
                if (stat) {
                    if (!data["p" + player + "_customStats"][famIndex]) {
                        data["p" + player + "_customStats"][famIndex] = {};
                    }
                    data["p" + player + "_customStats"][famIndex][arr[statIndex].toLowerCase()] = +stat;
                    localStorage.setItem(key, stat);
                }
            }
        }
    }
    for (var player = 1; player <= 2; player++) {
        for (var famIndex = 0; famIndex < 10; famIndex++) {
            for (var skillIndex = 0; skillIndex < 3; skillIndex++) {
                var key = "p" + player + "f" + famIndex + "s" + skillIndex;
                var customSkillId = getURLParameter(key);
                if (customSkillId) {
                    if (!data["p" + player + "_customSkills"][famIndex]) {
                        data["p" + player + "_customSkills"][famIndex] = [];
                    }
                    data["p" + player + "_customSkills"][famIndex][skillIndex] = +customSkillId;
                    localStorage.setItem(key, customSkillId);
                }
            }
        }
    }
    data.p1_cardIds = [];
    data.p2_cardIds = [];
    data.p1_warlordSkillIds = [];
    data.p2_warlordSkillIds = [];
    for (var i = 0; i < 10; i++) {
        var f1id = getURLParameter("f" + i);
        var f2id = getURLParameter("f" + (i + 10));
        data.p1_cardIds.push(f1id);
        data.p2_cardIds.push(f2id);
        if (!option.p1RandomMode)
            localStorage.setItem("f" + i, f1id);
        if (!option.p2RandomMode)
            localStorage.setItem("f" + (i + 10), f2id);
    }
    for (var i = 0; i < 3; i++) {
        var w1s = getURLParameter("s1" + i);
        var w2s = getURLParameter("s2" + i);
        data.p1_warlordSkillIds.push(w1s);
        data.p2_warlordSkillIds.push(w2s);
        if (!option.p1RandomMode)
            localStorage.setItem("s1" + i, w1s);
        if (!option.p2RandomMode)
            localStorage.setItem("s2" + i, w2s);
    }
    return [data, option];
}
function prepareRandom() {
    var USE_CS_RND = false;
    if (USE_CS_RND) {
        var rnd_1 = new CsRandom(1234);
        Math.random = function () { return rnd_1.nextDouble(); };
    }
}
function onBattleFinished() {
    var startButton = document.getElementById("startButton");
    startButton.disabled = false;
    if (ENUM.Setting.IS_MOBILE) {
        startButton.style.display = "block";
    }
    else {
    }
}
function onSimulationFinished() {
}
function prepareField() {
    var rndBgLink = BattleBackground.getRandomBackgroundLink();
    var img = new Image();
    var svgWrapper = document.getElementById("svgWrapper");
    img.onload = function () {
        svgWrapper.style.backgroundImage = "url('" + rndBgLink + "')";
    };
    img.onerror = function () {
        console.log("Background not found: " + rndBgLink);
        svgWrapper.style.backgroundImage = "url(img/bg01.png)";
    };
    img.src = rndBgLink;
}
function playGame() {
    prepareField();
    BattleGraphic.PLAY_MODE = 'AUTO';
    BattleDebugger.IS_DEBUG_MODE = false;
    document.getElementById('startButton').onclick = function () {
        var button = this;
        button.disabled = true;
        if (ENUM.Setting.IS_MOBILE) {
            button.style.display = "none";
        }
        BattleGraphic.getInstance().resetInitialField();
        BattleGraphic.getInstance().displayMajorEventAnimation(0);
    };
    var dataOption = getBattleDataOption();
    var data = dataOption[0], option = dataOption[1];
    var newGame = new BattleModel(data, option);
    newGame.startBattle();
}
function playSim() {
    if (!ENUM.Setting.IS_MOBILE) {
        prepareField();
    }
    var dataOption = getBattleDataOption();
    var data = dataOption[0], option = dataOption[1];
    var NUM_BATTLE = 10000;
    document.getElementById("numBattle").innerHTML = numberWithCommas(NUM_BATTLE);
    document.getElementById("progressBar").max = NUM_BATTLE;
    if (option.p1RandomMode) {
        BattleGraphic.HIDE_PLAYER1 = true;
    }
    if (option.p2RandomMode) {
        BattleGraphic.HIDE_PLAYER2 = true;
    }
    BattleDebugger.IS_DEBUG_MODE = false;
    BattleModel.IS_MASS_SIMULATION = true;
    if (!ENUM.Setting.IS_MOBILE) {
        var newGame = new BattleModel(data, option);
    }
    document.getElementById("gameDiv").setAttribute("style", "display: none;");
    document.getElementById("startButton").setAttribute("style", "display: none;");
    document.getElementById("simDiv").setAttribute("style", "display: block;");
    if (ENUM.Setting.IS_MOBILE) {
        startSynchronousSim(data, option, NUM_BATTLE);
    }
    else {
        startWorkerSim(data, option, NUM_BATTLE);
    }
}
function playDebug() {
    prepareField();
    var dataOption = getBattleDataOption();
    var data = dataOption[0], option = dataOption[1];
    var newGame = new BattleModel(data, option);
    newGame.startBattle();
}
function startSynchronousSim(data, option, NUM_BATTLE) {
    prepareRandom();
    var p1WinCount = 0;
    var p2WinCount = 0;
    var winCountTable = {};
    BattleModel.IS_MASS_SIMULATION = true;
    BattleGraphic.GRAPHIC_DISABLED = true;
    var startTime = new Date().getTime();
    var intervalCount = 0;
    var NUM_CHUNK = 100;
    var CHUNK_SIZE = NUM_BATTLE / NUM_CHUNK;
    var interval = setInterval(function () {
        for (var i = 0; i < CHUNK_SIZE; i++) {
            var newGame = new BattleModel(data, option);
            var resultBattle = newGame.startBattle();
            BattleModel.resetAll();
            if (resultBattle.playerWon.id === 1) {
                p1WinCount++;
            }
            else if (resultBattle.playerWon.id === 2) {
                p2WinCount++;
            }
            var winTeam = resultBattle.cardManager.getPlayerOriginalMainCards(resultBattle.playerWon);
            if (resultBattle.isBloodClash) {
                winTeam = winTeam.concat(resultBattle.cardManager.getPlayerOriginalReserveCards(resultBattle.playerWon));
            }
            for (var j = 0; j < winTeam.length; j++) {
                if (winCountTable[winTeam[j].dbId]) {
                    winCountTable[winTeam[j].dbId]++;
                }
                else {
                    winCountTable[winTeam[j].dbId] = 1;
                }
            }
            document.getElementById("progressPercent").innerHTML = intervalCount + 1 + "%";
            document.getElementById("progressBar").setAttribute("value", (intervalCount * CHUNK_SIZE + i + 1) + "");
        }
        intervalCount++;
        if (intervalCount >= NUM_CHUNK) {
            clearInterval(interval);
        }
        if (intervalCount * CHUNK_SIZE >= NUM_BATTLE) {
            var endTime = new Date().getTime();
            var finalData = {
                p1WinCount: p1WinCount,
                p2WinCount: p2WinCount,
                winCountTable: winCountTable
            };
            onSimulationResultObtained(finalData, startTime, endTime);
        }
    }, 0);
}
function startWorkerSim(data, option, NUM_BATTLE) {
    var totalProgress = 0;
    var workerDone = 0;
    var NUM_WORKER = 4;
    var workerPool = [];
    var workerDataReturned = [];
    for (var w = 0; w < NUM_WORKER; w++) {
        var worker = new Worker("js/worker.js");
        worker.onmessage = function (event) {
            if (event.data.status === "ongoing") {
                totalProgress += 100;
                document.getElementById("progressBar").setAttribute("value", totalProgress.toString());
            }
            else if (event.data.status === "done") {
                totalProgress += 100;
                document.getElementById("progressBar").setAttribute("value", totalProgress.toString());
                workerDataReturned[workerDone] = event.data;
                workerDone++;
                console.log(workerDone + " workers done.");
                if (workerDone === NUM_WORKER) {
                    var endTime = performance.now();
                    var finalData = {
                        p1WinCount: 0,
                        p2WinCount: 0,
                        winCountTable: []
                    };
                    for (var i = 0; i < NUM_WORKER; i++) {
                        finalData.p1WinCount += workerDataReturned[i].p1WinCount;
                        finalData.p2WinCount += workerDataReturned[i].p2WinCount;
                        var workerTable = workerDataReturned[i].winCountTable;
                        for (var key in workerTable) {
                            if (workerTable.hasOwnProperty(key)) {
                                if (finalData.winCountTable[key]) {
                                    finalData.winCountTable[key] += workerTable[key];
                                }
                                else {
                                    finalData.winCountTable[key] = workerTable[key];
                                }
                            }
                        }
                    }
                    onSimulationResultObtained(finalData, startTime, endTime);
                    workerPool.forEach(function (entry) {
                        entry.terminate();
                    });
                }
            }
        };
        workerPool[w] = worker;
    }
    worker = null;
    var startTime = performance.now();
    for (var w = 0; w < workerPool.length; w++) {
        workerPool[w].postMessage({
            data: data,
            option: option,
            numBattle: NUM_BATTLE / NUM_WORKER
        });
    }
}
function onSimulationResultObtained(finalData, startTime, endTime) {
    var famIdArray = [];
    for (var key in finalData.winCountTable) {
        if (finalData.winCountTable.hasOwnProperty(key)) {
            famIdArray.push(key);
        }
    }
    famIdArray.sort(function (a, b) { return finalData.winCountTable[b] - finalData.winCountTable[a]; });
    var simResultDiv = document.getElementById("simResultDiv");
    simResultDiv.innerHTML += ("Player 2 won: " + finalData.p2WinCount + "<br> Player 1 won: " + finalData.p1WinCount + "<br><br> Time: " + ((endTime - startTime) / 1000).toFixed(2) + "s<br><a href=setting.html>Go back to main page </a>");
    var detail1 = "<br><br><details><summary> Most frequent appearances in win team: </summary><br>";
    for (var i = 0; i < famIdArray.length; i++) {
        var id = famIdArray[i];
        detail1 += (famDatabase[id].fullName + ": " + finalData.winCountTable[id] + "<br>");
    }
    detail1 += "</details>";
    simResultDiv.innerHTML += detail1;
    onSimulationFinished();
}
var Player = (function () {
    function Player(id, name, formation, multiplier) {
        this.id = id;
        this.name = name;
        this.formation = formation;
        this.multiplier = multiplier;
    }
    return Player;
}());
var SkillLogic = (function () {
    function SkillLogic() {
        this.battleModel = BattleModel.getInstance();
        this.logger = BattleLogger.getInstance();
        this.cardManager = CardManager.getInstance();
    }
    SkillLogic.prototype.willBeExecuted = function (data) {
        var deadCond = (data.executor.isDead && data.skill.skillType === ENUM.SkillType.ACTION_ON_DEATH) ||
            (!data.executor.isDead && data.skill.skillType !== ENUM.SkillType.ACTION_ON_DEATH);
        if (data.noProbCheck) {
            var probCond = true;
        }
        else {
            probCond = (Math.random() * 100) <= (data.skill.maxProbability + data.executor.status.skillProbability * 100 +
                data.executor.bcAddedProb);
        }
        return (deadCond &&
            data.executor.canAttack() &&
            data.executor.canUseSkill() &&
            probCond);
    };
    SkillLogic.prototype.execute = function (data) {
        throw new Error("Implement this");
    };
    SkillLogic.prototype.clearAllCardsDamagePhaseData = function () {
        var allCards = this.cardManager.getAllCurrentMainCards();
        for (var i = 0; i < allCards.length; i++) {
            allCards[i].clearDamagePhaseData();
        }
    };
    SkillLogic.prototype.getComponentStatus = function (type) {
        switch (type) {
            case ENUM.StatusType.ALL_STATUS:
                return [ENUM.StatusType.ATK, ENUM.StatusType.DEF, ENUM.StatusType.WIS, ENUM.StatusType.AGI];
            case ENUM.StatusType.REMAIN_HP_ALL_STATUS_UP:
                return [ENUM.StatusType.REMAIN_HP_ATK_UP, ENUM.StatusType.REMAIN_HP_DEF_UP,
                    ENUM.StatusType.REMAIN_HP_WIS_UP, ENUM.StatusType.REMAIN_HP_AGI_UP];
            case ENUM.StatusType.REMAIN_HP_ATK_DEF_UP:
                return [ENUM.StatusType.REMAIN_HP_ATK_UP, ENUM.StatusType.REMAIN_HP_DEF_UP];
            case ENUM.StatusType.REMAIN_HP_ATK_WIS_UP:
                return [ENUM.StatusType.REMAIN_HP_ATK_UP, ENUM.StatusType.REMAIN_HP_WIS_UP];
            case ENUM.StatusType.REMAIN_HP_ATK_AGI_UP:
                return [ENUM.StatusType.REMAIN_HP_ATK_UP, ENUM.StatusType.REMAIN_HP_AGI_UP];
            case ENUM.StatusType.REMAIN_HP_DEF_WIS_UP:
                return [ENUM.StatusType.REMAIN_HP_DEF_UP, ENUM.StatusType.REMAIN_HP_WIS_UP];
            case ENUM.StatusType.REMAIN_HP_DEF_AGI_UP:
                return [ENUM.StatusType.REMAIN_HP_DEF_UP, ENUM.StatusType.REMAIN_HP_AGI_UP];
            case ENUM.StatusType.REMAIN_HP_WIS_AGI_UP:
                return [ENUM.StatusType.REMAIN_HP_WIS_UP, ENUM.StatusType.REMAIN_HP_AGI_UP];
            case ENUM.StatusType.REMAIN_HP_ATK_DEF_WIS_UP:
                return [ENUM.StatusType.REMAIN_HP_ATK_UP, ENUM.StatusType.REMAIN_HP_DEF_UP, ENUM.StatusType.REMAIN_HP_WIS_UP];
            case ENUM.StatusType.REMAIN_HP_ATK_DEF_AGI_UP:
                return [ENUM.StatusType.REMAIN_HP_ATK_UP, ENUM.StatusType.REMAIN_HP_DEF_UP, ENUM.StatusType.REMAIN_HP_AGI_UP];
            case ENUM.StatusType.REMAIN_HP_DEF_WIS_AGI_UP:
                return [ENUM.StatusType.REMAIN_HP_DEF_UP, ENUM.StatusType.REMAIN_HP_WIS_UP, ENUM.StatusType.REMAIN_HP_AGI_UP];
            case ENUM.StatusType.REMAIN_HP_ATK_WIS_AGI_UP:
                return [ENUM.StatusType.REMAIN_HP_ATK_UP, ENUM.StatusType.REMAIN_HP_WIS_UP, ENUM.StatusType.REMAIN_HP_AGI_UP];
            default:
                return null;
        }
    };
    return SkillLogic;
}());
var AbsorbSkillLogic = (function (_super) {
    __extends(AbsorbSkillLogic, _super);
    function AbsorbSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbsorbSkillLogic.prototype.execute = function (data) {
        var skill = data.skill;
        var executor = data.executor;
        skill.getReady(executor);
        var target;
        while (target = skill.getTarget(executor)) {
            this.absorbTarget(executor, target, skill);
        }
    };
    AbsorbSkillLogic.prototype.absorbTarget = function (executor, target, skill) {
        var statusToBuff = AbsorbSkillLogic.getComponentStatusFromBuffStatusType(skill.skillFuncArg2);
        var debuffMulti = skill.skillFuncArg3;
        if (executor.isDead || !executor.canUseSkill()) {
            return;
        }
        if (Math.random() > skill.skillFuncArg6) {
            return;
        }
        for (var j = 0; j < statusToBuff.length; j++) {
            var statusType = statusToBuff[j];
            var calcType = skill.skillFuncArg4;
            var isNewLogic = false;
            if (calcType !== ENUM.SkillCalcType.DEBUFF) {
                assert(calcType === ENUM.SkillCalcType.WIS, "Non WIS-based debuff unimplemented!");
                var debuffAmount = Math.floor(executor.getWIS() * debuffMulti);
            }
            else {
                debuffAmount = skill.skillFuncArg3;
            }
            var lowStatLimit = target.getOriginalStat(ENUM.StatusType[statusType]) * Card.NEW_DEBUFF_LOW_LIMIT_FACTOR;
            var currentStat = target.getStat(ENUM.StatusType[statusType]);
            var maxDebuffLimit = lowStatLimit > currentStat ? 0 : currentStat - lowStatLimit;
            if (debuffAmount > maxDebuffLimit) {
                debuffAmount = maxDebuffLimit;
            }
            target.changeStatus(statusType, -debuffAmount, isNewLogic);
            this.logger.addMinorEvent({
                executorId: executor.id,
                targetId: target.id,
                type: ENUM.MinorEventType.STATUS,
                status: {
                    type: statusType,
                    isNewLogic: isNewLogic
                },
                description: target.name + "'s " + ENUM.StatusType[statusType] + " decreased by " + Math.abs(debuffAmount),
                amount: -debuffAmount,
                skillId: skill.id
            });
            var buffAmount = Math.floor(Math.abs(debuffAmount) * skill.skillFuncArg5);
            executor.changeStatus(statusType, buffAmount, false);
            this.logger.addMinorEvent({
                executorId: executor.id,
                targetId: executor.id,
                type: ENUM.MinorEventType.STATUS,
                status: {
                    type: statusType,
                    isAllUp: skill.skillFuncArg2 === ENUM.StatusType.ALL_STATUS
                },
                description: executor.name + "'s " + ENUM.StatusType[statusType] + " increased by " + buffAmount,
                amount: buffAmount,
                skillId: skill.id
            });
        }
    };
    AbsorbSkillLogic.getComponentStatusFromBuffStatusType = function (type) {
        switch (type) {
            case ENUM.BuffStatusType.ATK:
                return [ENUM.StatusType.ATK];
            case ENUM.BuffStatusType.DEF:
                return [ENUM.StatusType.DEF];
            case ENUM.BuffStatusType.WIS:
                return [ENUM.StatusType.WIS];
            case ENUM.BuffStatusType.AGI:
                return [ENUM.StatusType.AGI];
            case ENUM.BuffStatusType.ATK_DEF:
                return [ENUM.StatusType.ATK, ENUM.StatusType.DEF];
            case ENUM.BuffStatusType.ATK_WIS:
                return [ENUM.StatusType.ATK, ENUM.StatusType.WIS];
            case ENUM.BuffStatusType.ATK_AGI:
                return [ENUM.StatusType.ATK, ENUM.StatusType.AGI];
            case ENUM.BuffStatusType.DEF_WIS:
                return [ENUM.StatusType.DEF, ENUM.StatusType.WIS];
            case ENUM.BuffStatusType.DEF_AGI:
                return [ENUM.StatusType.DEF, ENUM.StatusType.AGI];
            case ENUM.BuffStatusType.WIS_AGI:
                return [ENUM.StatusType.WIS, ENUM.StatusType.AGI];
            case ENUM.BuffStatusType.ATK_DEF_WIS:
                return [ENUM.StatusType.ATK, ENUM.StatusType.DEF, ENUM.StatusType.WIS];
            case ENUM.BuffStatusType.ATK_DEF_AGI:
                return [ENUM.StatusType.ATK, ENUM.StatusType.DEF, ENUM.StatusType.AGI];
            case ENUM.BuffStatusType.DEF_WIS_AGI:
                return [ENUM.StatusType.DEF, ENUM.StatusType.WIS, ENUM.StatusType.AGI];
            case ENUM.BuffStatusType.ALL_STATUS:
                return [ENUM.StatusType.ATK, ENUM.StatusType.DEF, ENUM.StatusType.WIS, ENUM.StatusType.AGI];
            default:
                return [ENUM.StatusType.WIS];
        }
    };
    return AbsorbSkillLogic;
}(SkillLogic));
var AfflictionSkillLogic = (function (_super) {
    __extends(AfflictionSkillLogic, _super);
    function AfflictionSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AfflictionSkillLogic.prototype.execute = function (data) {
        data.skill.getReady(data.executor);
        var target;
        while (target = data.skill.getTarget(data.executor)) {
            AfflictionSkillLogic.processAffliction(data.executor, target, data.skill);
        }
    };
    AfflictionSkillLogic.processAffliction = function (executor, target, skill, fixedProb) {
        var type = skill.skillFuncArg2;
        var prob = fixedProb ? fixedProb : skill.skillFuncArg3;
        prob *= executor.getPassiveAfflictionProbabilityBuffEffect(target);
        if (Math.random() > prob || !type) {
            return;
        }
        var option = {};
        if (skill.skillFuncArg4) {
            if (type === ENUM.AfflictionType.POISON) {
                option.percent = skill.skillFuncArg4;
            }
            else if (type === ENUM.AfflictionType.SILENT || type === ENUM.AfflictionType.BLIND || type === ENUM.AfflictionType.CONFUSE) {
                option.turnNum = skill.skillFuncArg4;
            }
            else if (type === ENUM.AfflictionType.BURN) {
                option.damage = skill.skillFuncArg4;
            }
        }
        if (skill.skillFuncArg5) {
            if (type === ENUM.AfflictionType.BLIND) {
                option.missProb = skill.skillFuncArg5;
            }
            else if (type === ENUM.AfflictionType.CONFUSE) {
                option.confuseProb = skill.skillFuncArg5;
            }
        }
        target.setAffliction(type, option);
        if (type === ENUM.AfflictionType.POISON) {
            var percent = target.getPoisonPercent();
        }
        var logger = BattleLogger.getInstance();
        logger.addMinorEvent({
            executorId: executor.id,
            targetId: target.id,
            type: ENUM.MinorEventType.AFFLICTION,
            affliction: {
                type: type,
                duration: option.turnNum,
                percent: percent,
                missProb: option.missProb
            },
            description: target.name + " is now " + ENUM.AfflictionType[type],
        });
    };
    return AfflictionSkillLogic;
}(SkillLogic));
var AttackSkillLogic = (function (_super) {
    __extends(AttackSkillLogic, _super);
    function AttackSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AttackSkillLogic.prototype.willBeExecuted = function (data) {
        var hasTarget = data.skill.range.hasValidTarget(data.executor);
        return _super.prototype.willBeExecuted.call(this, data) && hasTarget;
    };
    AttackSkillLogic.prototype.execute = function (data) {
        var skill = data.skill;
        skill.getReady(data.executor);
        var targets = skill.range.targets;
        if (RangeFactory.isEnemyScaledRange(skill.skillRange)) {
            data.scaledRatio = RangeFactory.getScaledRatio(skill.skillRange, targets.length);
        }
        if (!RangeFactory.isEnemyRandomRange(data.skill.skillRange) && data.skill.isIndirectSkill()) {
            this.executeAoeAttack(data, targets);
        }
        else {
            this.executeNonAoeAttack(data);
        }
    };
    AttackSkillLogic.prototype.executeNonAoeAttack = function (data) {
        var target;
        var attackCount = 0;
        while ((target = data.skill.getTarget(data.executor)) && !data.executor.isDead && data.executor.canAttack()) {
            if (RangeFactory.isEnemyVaryingRange(data.skill.skillRange)) {
                var varyingRatio = RangeFactory.getVaryingRatio(data.skill.skillRange, attackCount);
            }
            this.processAttackAgainstSingleTarget(data.executor, target, data.skill, data.scaledRatio, varyingRatio);
            attackCount++;
        }
    };
    AttackSkillLogic.prototype.executeAoeAttack = function (data, targets) {
        var skill = data.skill;
        var executor = data.executor;
        if (skill.isIndirectSkill()) {
            shuffle(targets);
            var aoeReactiveSkillActivated = false;
            var targetsAttacked = [];
            for (var i = 0; i < targets.length; i++) {
                var targetCard = targets[i];
                if (targetCard.isDead) {
                    continue;
                }
                var protectSkillActivated = false;
                if (!aoeReactiveSkillActivated && !targetsAttacked[targetCard.id]) {
                    var protectData = this.battleModel.processProtect(executor, targetCard, skill, targetsAttacked, data.scaledRatio);
                    protectSkillActivated = protectData.activated;
                    if (protectSkillActivated) {
                        aoeReactiveSkillActivated = true;
                    }
                }
                if (!protectSkillActivated && !targetsAttacked[targetCard.id]) {
                    var defenseSkill = targetCard.getRandomDefenseSkill();
                    var defenseData = {
                        executor: targetCard,
                        skill: defenseSkill,
                        attacker: executor,
                    };
                    this.battleModel.processDamagePhase({
                        attacker: executor,
                        target: targetCard,
                        skill: skill,
                        scaledRatio: data.scaledRatio
                    });
                    targetsAttacked[targetCard.id] = true;
                    if (!executor.justMissed && !targetCard.justEvaded && !targetCard.isDead) {
                        if (Skill.isDebuffAttackSkill(skill.id)) {
                            if (Math.random() <= skill.skillFuncArg3) {
                                DebuffSkillLogic.processDebuff(executor, targetCard, skill);
                            }
                        }
                        else if (skill.skillFunc === ENUM.SkillFunc.ATTACK || skill.skillFunc === ENUM.SkillFunc.MAGIC) {
                            AfflictionSkillLogic.processAffliction(executor, targetCard, skill);
                        }
                    }
                    if (defenseSkill && defenseSkill.willBeExecuted(defenseData) && !aoeReactiveSkillActivated) {
                        defenseSkill.execute(defenseData);
                        aoeReactiveSkillActivated = true;
                    }
                }
                if (skill.skillFunc === ENUM.SkillFunc.DRAIN_ATTACK || skill.skillFunc === ENUM.SkillFunc.DRAIN_MAGIC) {
                    this.processDrainPhase(executor, skill);
                }
                if (skill.skillFunc === ENUM.SkillFunc.ABSORB_ATTACK || skill.skillFunc === ENUM.SkillFunc.ABSORB_MAGIC) {
                    new AbsorbSkillLogic().absorbTarget(executor, targetCard, skill);
                }
                this.clearAllCardsDamagePhaseData();
            }
        }
    };
    AttackSkillLogic.prototype.processAttackAgainstSingleTarget = function (executor, target, skill, scaledRatio, varyingRatio) {
        var protectData = this.battleModel.processProtect(executor, target, skill, null, scaledRatio, varyingRatio);
        if (!protectData.activated) {
            var defenseSkill = target.getRandomDefenseSkill();
            var defenseData = {
                executor: target,
                skill: defenseSkill,
                attacker: executor,
            };
            this.battleModel.processDamagePhase({
                attacker: executor,
                target: target,
                skill: skill,
                scaledRatio: scaledRatio,
                varyingRatio: varyingRatio
            });
            if (!executor.justMissed && !target.justEvaded && !target.isDead) {
                if (Skill.isDebuffAttackSkill(skill.id)) {
                    if (Math.random() <= skill.skillFuncArg3) {
                        DebuffSkillLogic.processDebuff(executor, target, skill);
                    }
                }
                else if (skill.skillFunc === ENUM.SkillFunc.ATTACK || skill.skillFunc === ENUM.SkillFunc.MAGIC) {
                    AfflictionSkillLogic.processAffliction(executor, target, skill);
                }
            }
            if (defenseSkill && defenseSkill.willBeExecuted(defenseData)) {
                defenseSkill.execute(defenseData);
            }
        }
        if (skill.skillFunc === ENUM.SkillFunc.DRAIN_ATTACK || skill.skillFunc === ENUM.SkillFunc.DRAIN_MAGIC) {
            this.processDrainPhase(executor, skill);
        }
        if (skill.skillFunc === ENUM.SkillFunc.ABSORB_ATTACK || skill.skillFunc === ENUM.SkillFunc.ABSORB_MAGIC) {
            new AbsorbSkillLogic().absorbTarget(executor, target, skill);
        }
        this.clearAllCardsDamagePhaseData();
    };
    AttackSkillLogic.prototype.processDrainPhase = function (executor, skill) {
        var healRange = RangeFactory.getRange(skill.skillFuncArg4);
        healRange.getReady(executor, function (card) { return !card.isFullHealth(); });
        assert(!(healRange instanceof RandomRange), "can't do this with random ranges!");
        if (healRange.targets.length === 0) {
            return;
        }
        var healAmount = Math.floor((executor.lastBattleDamageDealt * skill.skillFuncArg2) / healRange.targets.length);
        var target;
        while (target = healRange.getTarget(executor)) {
            this.battleModel.damageToTargetDirectly(target, -1 * healAmount, " healing");
        }
    };
    return AttackSkillLogic;
}(SkillLogic));
var BuffSkillLogic = (function (_super) {
    __extends(BuffSkillLogic, _super);
    function BuffSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BuffSkillLogic.prototype.willBeExecuted = function (data) {
        var hasTarget = data.skill.range.hasValidTarget(data.executor);
        return _super.prototype.willBeExecuted.call(this, data) && hasTarget;
    };
    BuffSkillLogic.prototype.execute = function (data) {
        var skill = data.skill;
        var executor = data.executor;
        skill.getReady(executor);
        if (this.getComponentStatus(skill.skillFuncArg2) == null) {
            var statusToBuff = [skill.skillFuncArg2];
            if (skill.skillFuncArg3 !== 0 && skill.skillFuncArg2 !== ENUM.StatusType.HP_SHIELD) {
                statusToBuff.push(skill.skillFuncArg3);
            }
        }
        else {
            statusToBuff = this.getComponentStatus(skill.skillFuncArg2);
        }
        var basedOnStatType = ENUM.SkillCalcType[skill.skillCalcType];
        var baseStat = skill.skillCalcType === 6 ? 0 : executor.getStat(basedOnStatType);
        if (skill.skillFunc === ENUM.SkillFunc.ONHIT_BUFF) {
            assert(skill.skillCalcType === 6, "ONHIT_BUFF with calcType != 6, not sure what this means...");
        }
        var target;
        while (target = skill.getTarget(executor)) {
            for (var j = 0; j < statusToBuff.length; j++) {
                var statusType = statusToBuff[j];
                switch (statusType) {
                    case ENUM.StatusType.ATK:
                    case ENUM.StatusType.DEF:
                    case ENUM.StatusType.WIS:
                    case ENUM.StatusType.AGI:
                        var skillMod = skill.skillFuncArg1;
                        if (skill.skillCalcType === 6) {
                            if (skill.skillFuncArg4 === 0) {
                                throw new Error("Not sure what needs to happen here when arg4 = 0 for skillCalcType = 6. Check the manual.");
                            }
                            else {
                                if (skill.skillFunc === ENUM.SkillFunc.ONHIT_BUFF) {
                                    var buffAmount = Math.round(skillMod * skill.skillFuncArg4 * 100);
                                }
                                else {
                                    buffAmount = Math.round(skillMod * skill.skillFuncArg4);
                                }
                            }
                        }
                        else {
                            if (skill.skillFuncArg2 !== ENUM.StatusType.ALL_STATUS) {
                                baseStat = executor.getStat(basedOnStatType);
                            }
                            buffAmount = Math.round(skillMod * baseStat);
                        }
                        break;
                    case ENUM.StatusType.ATTACK_RESISTANCE:
                    case ENUM.StatusType.MAGIC_RESISTANCE:
                    case ENUM.StatusType.BREATH_RESISTANCE:
                    case ENUM.StatusType.SKILL_PROBABILITY:
                    case ENUM.StatusType.WILL_ATTACK_AGAIN:
                    case ENUM.StatusType.ACTION_ON_DEATH:
                    case ENUM.StatusType.REMAIN_HP_ATK_UP:
                    case ENUM.StatusType.REMAIN_HP_DEF_UP:
                    case ENUM.StatusType.REMAIN_HP_WIS_UP:
                    case ENUM.StatusType.REMAIN_HP_AGI_UP:
                        buffAmount = skill.skillFuncArg1;
                        break;
                    case ENUM.StatusType.HP_SHIELD:
                        if (skill.skillCalcType === 6) {
                            buffAmount = skill.skillFuncArg4;
                        }
                        else {
                            skillMod = skill.skillFuncArg1;
                            buffAmount = Math.round(skillMod * baseStat);
                            var maxValue = ~~(target.getOriginalHP() * skill.skillFuncArg3);
                        }
                        break;
                    default:
                        throw new Error("Wrong status type or not implemented");
                }
                target.changeStatus(statusType, buffAmount, false, maxValue);
                this.logger.addMinorEvent({
                    executorId: executor.id,
                    targetId: target.id,
                    type: ENUM.MinorEventType.STATUS,
                    status: {
                        type: statusType,
                        isAllUp: skill.skillFuncArg2 === ENUM.StatusType.ALL_STATUS
                    },
                    description: target.name + "'s " + ENUM.StatusType[statusType] + " increased by " + buffAmount,
                    amount: buffAmount,
                    skillId: skill.id
                });
            }
        }
    };
    BuffSkillLogic.processRemainHpBuff = function (target, isPositiveChange) {
        var types = [];
        if (target.status.remainHpAtkUp > 0)
            types.push(ENUM.StatusType.ATK);
        if (target.status.remainHpDefUp > 0)
            types.push(ENUM.StatusType.DEF);
        if (target.status.remainHpWisUp > 0)
            types.push(ENUM.StatusType.WIS);
        if (target.status.remainHpAgiUp > 0)
            types.push(ENUM.StatusType.AGI);
        var verb = isPositiveChange ? "decreased" : "increased";
        var logger = BattleLogger.getInstance();
        for (var i = 0; i < types.length; i++) {
            logger.addMinorEvent({
                type: ENUM.MinorEventType.TEXT,
                description: target.name + "'s " + ENUM.StatusType[types[i]] + " " + verb + " because of remain HP buff.",
            });
        }
    };
    return BuffSkillLogic;
}(SkillLogic));
var ClearStatusSkillLogic = (function (_super) {
    __extends(ClearStatusSkillLogic, _super);
    function ClearStatusSkillLogic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.condFunc = function (x) { return true; };
        _this.isDispelled = false;
        return _this;
    }
    ClearStatusSkillLogic.prototype.willBeExecuted = function (data) {
        var hasValidTarget = data.skill.range.hasValidTarget(data.executor, this.getCondFunc());
        return _super.prototype.willBeExecuted.call(this, data) && hasValidTarget;
    };
    ClearStatusSkillLogic.prototype.getCondFunc = function () {
        var _this = this;
        return function (card) { return card.hasStatus(_this.condFunc); };
    };
    ClearStatusSkillLogic.prototype.execute = function (data) {
        data.skill.getReady(data.executor);
        var target;
        while (target = data.skill.getTarget(data.executor)) {
            target.clearAllStatus(this.condFunc);
            this.logger.addMinorEvent({
                executorId: data.executor.id,
                targetId: target.id,
                type: ENUM.MinorEventType.STATUS,
                status: {
                    type: 0,
                    isDispelled: this.isDispelled,
                    isClearDebuff: !this.isDispelled
                },
                description: target.name + (this.isDispelled ? " is dispelled." : " is cleared of debuffs."),
                skillId: data.skill.id
            });
        }
    };
    return ClearStatusSkillLogic;
}(SkillLogic));
var DispellSkillLogic = (function (_super) {
    __extends(DispellSkillLogic, _super);
    function DispellSkillLogic() {
        var _this = _super.call(this) || this;
        _this.condFunc = function (x) { return x > 0; };
        _this.isDispelled = true;
        return _this;
    }
    return DispellSkillLogic;
}(ClearStatusSkillLogic));
var ClearDebuffSkillLogic = (function (_super) {
    __extends(ClearDebuffSkillLogic, _super);
    function ClearDebuffSkillLogic() {
        var _this = _super.call(this) || this;
        _this.condFunc = function (x) { return x < 0; };
        _this.isDispelled = false;
        return _this;
    }
    return ClearDebuffSkillLogic;
}(ClearStatusSkillLogic));
var CounterSkillLogic = (function (_super) {
    __extends(CounterSkillLogic, _super);
    function CounterSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CounterSkillLogic.prototype.willBeExecuted = function (data) {
        return _super.prototype.willBeExecuted.call(this, data) && !data.attacker.isDead;
    };
    CounterSkillLogic.prototype.execute = function (data) {
        this.logger.addMinorEvent({
            executorId: data.executor.id,
            type: ENUM.MinorEventType.DESCRIPTION,
            description: data.executor.name + " procs " + data.skill.name + ". ",
            skillId: data.skill.id
        });
        this.battleModel.processDamagePhase({
            attacker: data.executor,
            target: data.attacker,
            skill: data.skill,
            additionalDescription: data.executor.name + " counters " + data.attacker.name + "! ",
        });
        if (!data.executor.justMissed && !data.attacker.justEvaded && !data.attacker.isDead
            && data.skill.skillFunc === ENUM.SkillFunc.COUNTER) {
            AfflictionSkillLogic.processAffliction(data.executor, data.attacker, data.skill);
        }
    };
    return CounterSkillLogic;
}(SkillLogic));
var CounterDebuffSkillLogic = (function (_super) {
    __extends(CounterDebuffSkillLogic, _super);
    function CounterDebuffSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CounterDebuffSkillLogic.prototype.execute = function (data) {
        _super.prototype.execute.call(this, data);
        var protector = data.executor;
        if (!protector.isDead && protector.canUseSkill() && !data.attacker.isDead && Math.random() <= data.skill.skillFuncArg3) {
            DebuffSkillLogic.processDebuff(protector, data.attacker, data.skill);
        }
    };
    return CounterDebuffSkillLogic;
}(CounterSkillLogic));
var ProtectSkillLogic = (function (_super) {
    __extends(ProtectSkillLogic, _super);
    function ProtectSkillLogic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.counter = false;
        return _this;
    }
    ProtectSkillLogic.prototype.willBeExecuted = function (data) {
        data.skill.getReady(data.executor);
        if (this.cardManager.isSameCard(data.targetCard, data.executor) && data.skill.skillRange !== ENUM.SkillRange.MYSELF) {
            return false;
        }
        assert(!(data.skill.range instanceof RandomRange), "can't do this with random ranges!");
        return _super.prototype.willBeExecuted.call(this, data) && this.cardManager.isCardInList(data.targetCard, data.skill.range.targets);
    };
    ProtectSkillLogic.prototype.execute = function (data) {
        return this.executeProtectPhase(data);
    };
    ProtectSkillLogic.prototype.executeProtectPhase = function (data, noProtectLog) {
        var protector = data.executor;
        var protectSkill = data.skill;
        var attackSkill = data.attackSkill;
        var toReturn = {};
        if (!noProtectLog) {
            this.logger.addMinorEvent({
                executorId: protector.id,
                type: ENUM.MinorEventType.PROTECT,
                protect: {
                    protectedId: data.targetCard.id,
                    counter: this.counter,
                    counteredSkillId: attackSkill.id,
                    attackerId: data.attacker.id
                },
                description: protector.name + " procs " + protectSkill.name + " to protect " + data.targetCard.name + ". ",
                skillId: protectSkill.id
            });
        }
        if (protectSkill.skillFunc === ENUM.SkillFunc.PROTECT_REFLECT) {
            var dmgRatio = protectSkill.skillFuncArg5;
        }
        this.battleModel.processDamagePhase({
            attacker: data.attacker,
            target: protector,
            skill: attackSkill,
            scaledRatio: data.scaledRatio,
            varyingRatio: data.varyingRatio,
            dmgRatio: dmgRatio
        });
        if (protectSkill.skillFunc === ENUM.SkillFunc.PROTECT_REFLECT) {
            toReturn.dmgTaken = protector.lastBattleDamageTaken;
        }
        if (!data.attacker.justMissed && !protector.isDead) {
            if (attackSkill.skillFunc === ENUM.SkillFunc.ATTACK || attackSkill.skillFunc === ENUM.SkillFunc.MAGIC) {
                AfflictionSkillLogic.processAffliction(data.attacker, protector, attackSkill);
            }
            else if (Skill.isDebuffAttackSkill(attackSkill.id)) {
                if (Math.random() <= attackSkill.skillFuncArg3) {
                    DebuffSkillLogic.processDebuff(data.attacker, protector, attackSkill);
                }
            }
        }
        if (data.targetsAttacked) {
            data.targetsAttacked[protector.id] = true;
        }
        this.clearAllCardsDamagePhaseData();
        return toReturn;
    };
    return ProtectSkillLogic;
}(SkillLogic));
var CounterDispellSkillLogic = (function (_super) {
    __extends(CounterDispellSkillLogic, _super);
    function CounterDispellSkillLogic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.condFunc = function (x) { return x > 0; };
        return _this;
    }
    CounterDispellSkillLogic.prototype.willBeExecuted = function (data) {
        var range = RangeFactory.getRange(data.skill.skillFuncArg3);
        var hasValidtarget = range.hasValidTarget(data.executor, this.getCondFunc());
        return _super.prototype.willBeExecuted.call(this, data) && hasValidtarget;
    };
    CounterDispellSkillLogic.prototype.getCondFunc = function () {
        var _this = this;
        return function (card) { return card.hasStatus(_this.condFunc); };
    };
    CounterDispellSkillLogic.prototype.execute = function (data) {
        var toReturn = this.executeProtectPhase(data, true);
        if (data.executor.isDead || !data.executor.canUseSkill()) {
            return toReturn;
        }
        this.logger.addMinorEvent({
            executorId: data.executor.id,
            type: ENUM.MinorEventType.DESCRIPTION,
            description: data.executor.name + " procs " + data.skill.name,
            skillId: data.skill.id
        });
        var range = RangeFactory.getRange(data.skill.skillFuncArg3);
        range.getReady(data.executor, this.getCondFunc());
        var target;
        while (target = range.getTarget(data.executor)) {
            target.clearAllStatus(this.condFunc);
            this.logger.addMinorEvent({
                executorId: data.executor.id,
                targetId: target.id,
                type: ENUM.MinorEventType.STATUS,
                status: {
                    type: 0,
                    isDispelled: true,
                },
                description: target.name + " is dispelled.",
                skillId: data.skill.id
            });
        }
        return toReturn;
    };
    return CounterDispellSkillLogic;
}(ProtectSkillLogic));
var CounterDrainSkillLogic = (function (_super) {
    __extends(CounterDrainSkillLogic, _super);
    function CounterDrainSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CounterDrainSkillLogic.prototype.execute = function (data) {
        var skill = data.skill;
        var target;
        _super.prototype.execute.call(this, data);
        var range = RangeFactory.getRange(skill.skillFuncArg4);
        range.getReady(data.executor);
        assert(!(range instanceof RandomRange), "can't do this with random ranges!");
        var totalHealAmount = data.executor.lastBattleDamageDealt * skill.skillFuncArg2;
        var eachTargetHealAmount = Math.floor(totalHealAmount / range.targets.length);
        while (target = range.getTarget(data.executor)) {
            this.battleModel.damageToTargetDirectly(target, -1 * eachTargetHealAmount, " healing");
        }
    };
    return CounterDrainSkillLogic;
}(CounterSkillLogic));
var DebuffAfflictionSkillLogic = (function (_super) {
    __extends(DebuffAfflictionSkillLogic, _super);
    function DebuffAfflictionSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DebuffAfflictionSkillLogic.prototype.execute = function (data) {
        var tempDebuffSkillLogic = new DebuffSkillLogic();
        tempDebuffSkillLogic.execute(data);
        var tempSkill = new Skill(data.skill.id);
        tempSkill.skillFuncArg1 = 0;
        tempSkill.skillFuncArg2 = tempSkill.skillFuncArg6;
        tempSkill.skillFuncArg3 = tempSkill.skillFuncArg7;
        tempSkill.skillFuncArg4 = tempSkill.skillFuncArg8;
        tempSkill.skillFuncArg5 = tempSkill.skillFuncArg9;
        var tempAfflictionSkillLogic = new AfflictionSkillLogic();
        data.skill = tempSkill;
        tempAfflictionSkillLogic.execute(data);
    };
    return DebuffAfflictionSkillLogic;
}(SkillLogic));
var DebuffSkillLogic = (function (_super) {
    __extends(DebuffSkillLogic, _super);
    function DebuffSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DebuffSkillLogic.prototype.execute = function (data) {
        var skill = data.skill;
        var executor = data.executor;
        skill.getReady(executor);
        var target;
        while (target = skill.getTarget(executor)) {
            DebuffSkillLogic.processDebuff(executor, target, skill);
        }
    };
    DebuffSkillLogic.processDebuff = function (executor, target, skill) {
        var statuses;
        var multi;
        var isNewLogic = false;
        switch (skill.skillFunc) {
            case ENUM.SkillFunc.DEBUFFATTACK:
            case ENUM.SkillFunc.DEBUFFINDIRECT:
                statuses = [skill.skillFuncArg2];
                multi = skill.skillFuncArg4;
                break;
            case ENUM.SkillFunc.DEBUFF:
                statuses = [skill.skillFuncArg2];
                multi = skill.skillFuncArg1;
                break;
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF:
            case ENUM.SkillFunc.DEBUFF_AFFLICTION:
            case ENUM.SkillFunc.MULTI_DEBUFF:
                statuses = [skill.skillFuncArg2];
                if (skill.skillFuncArg3)
                    statuses.push(skill.skillFuncArg3);
                multi = skill.skillFuncArg1;
                isNewLogic = true;
                break;
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_ATTACK:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC:
            case ENUM.SkillFunc.COUNTER_DEBUFF:
            case ENUM.SkillFunc.COUNTER_DEBUFF_INDIRECT:
            case ENUM.SkillFunc.PROTECT_COUNTER_DEBUFF:
                statuses = [skill.skillFuncArg2];
                multi = skill.skillFuncArg4;
                isNewLogic = true;
                break;
            case ENUM.SkillFunc.ONHIT_DEBUFF:
                statuses = [skill.skillFuncArg2];
                if (skill.skillFuncArg3)
                    statuses.push(skill.skillFuncArg3);
                multi = skill.skillFuncArg1;
                isNewLogic = true;
                if (skill.skillFuncArg4) {
                    multi = skill.skillFuncArg4;
                    var isFlat = true;
                }
                break;
            default:
                throw new Error("Wrong skill to use with processDebuff()");
        }
        for (var i = 0; i < statuses.length; i++) {
            var status_2 = statuses[i];
            if (status_2 === ENUM.StatusType.SKILL_PROBABILITY) {
                var amount = -1 * skill.skillFuncArg1;
            }
            else {
                if (isFlat) {
                    var baseAmount = -100;
                }
                else if (!isNewLogic) {
                    baseAmount = getDebuffAmount(executor, target);
                }
                else {
                    baseAmount = getCasterBasedDebuffAmount(executor);
                }
                amount = Math.floor(baseAmount * multi);
            }
            target.changeStatus(status_2, amount, isNewLogic);
            var description = target.name + "'s " + ENUM.StatusType[status_2] + " decreased by " + Math.abs(amount);
            var logger = BattleLogger.getInstance();
            logger.addMinorEvent({
                executorId: executor.id,
                targetId: target.id,
                type: ENUM.MinorEventType.STATUS,
                status: {
                    type: status_2,
                    isNewLogic: isNewLogic
                },
                description: description,
                amount: amount,
                skillId: skill.id
            });
        }
    };
    return DebuffSkillLogic;
}(SkillLogic));
var DrainSkillLogic = (function (_super) {
    __extends(DrainSkillLogic, _super);
    function DrainSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DrainSkillLogic.prototype.willBeExecuted = function (data) {
        var hasValidTarget = data.skill.range.hasValidTarget(data.executor, this.getCondFunc());
        return _super.prototype.willBeExecuted.call(this, data) && hasValidTarget;
    };
    DrainSkillLogic.prototype.getCondFunc = function () {
        return function (card) { return !card.isFullHealth(); };
    };
    DrainSkillLogic.prototype.execute = function (data) {
        var skill = data.skill;
        skill.range.getReady(data.executor, this.getCondFunc());
        var target;
        this.logger.addMinorEvent({
            executorId: data.executor.id,
            type: ENUM.MinorEventType.DESCRIPTION,
            description: data.executor.name + " procs " + skill.name + ". ",
            skillId: skill.id
        });
        assert(!(skill.range instanceof RandomRange), "can't do this with random ranges!");
        var eachTargetHealAmount = Math.floor(data.executor.lastBattleDamageTaken / skill.range.targets.length);
        while (target = skill.getTarget(data.executor)) {
            this.battleModel.damageToTargetDirectly(target, -1 * eachTargetHealAmount, " healing");
        }
    };
    return DrainSkillLogic;
}(SkillLogic));
var EvadeSkillLogic = (function (_super) {
    __extends(EvadeSkillLogic, _super);
    function EvadeSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EvadeSkillLogic.prototype.willBeExecuted = function (data) {
        var skill = data.skill;
        skill.getReady(data.executor);
        if (this.cardManager.isSameCard(data.targetCard, data.executor) && skill.skillRange !== ENUM.SkillRange.MYSELF) {
            return false;
        }
        var canEvade = Skill.canProtectFromCalcType(skill.skillFuncArg2, data.attackSkill)
            && Skill.canProtectFromAttackType(skill.skillFuncArg1, data.attackSkill);
        assert(!(skill.range instanceof RandomRange), "can't do this with random ranges!");
        return _super.prototype.willBeExecuted.call(this, data) && this.cardManager.isCardInList(data.targetCard, skill.range.targets) && canEvade;
    };
    EvadeSkillLogic.prototype.execute = function (data) {
        data.executor.justEvaded = true;
        this.logger.addMinorEvent({
            executorId: data.executor.id,
            type: ENUM.MinorEventType.DESCRIPTION,
            noProcEffect: true,
            description: data.executor.name + " procs " + data.skill.name,
            skillId: data.skill.id
        });
        this.battleModel.processDamagePhase({
            attacker: data.attacker,
            target: data.executor,
            skill: data.attackSkill,
            scaledRatio: data.scaledRatio,
            varyingRatio: data.varyingRatio
        });
        if (data.targetsAttacked) {
            data.targetsAttacked[data.executor.id] = true;
        }
        this.clearAllCardsDamagePhaseData();
        return {};
    };
    return EvadeSkillLogic;
}(SkillLogic));
var HealSkillLogic = (function (_super) {
    __extends(HealSkillLogic, _super);
    function HealSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HealSkillLogic.prototype.willBeExecuted = function (data) {
        var hasValidTarget = data.skill.range.hasValidTarget(data.executor, this.getCondFunc());
        return _super.prototype.willBeExecuted.call(this, data) && hasValidTarget;
    };
    HealSkillLogic.prototype.getCondFunc = function () {
        return function (card) { return !card.isFullHealth(); };
    };
    HealSkillLogic.prototype.execute = function (data) {
        data.skill.range.getReady(data.executor, this.getCondFunc());
        var baseHealAmount = getHealAmount(data.executor);
        var multiplier = data.skill.skillFuncArg1;
        var healAmount = Math.floor(multiplier * baseHealAmount);
        var target;
        while (target = data.skill.getTarget(data.executor)) {
            if (data.skill.skillFuncArg2 === 1) {
                healAmount = multiplier * target.getOriginalHP();
            }
            this.battleModel.damageToTargetDirectly(target, -1 * healAmount, " healing");
        }
    };
    return HealSkillLogic;
}(SkillLogic));
var MultiBuffSkillLogic = (function (_super) {
    __extends(MultiBuffSkillLogic, _super);
    function MultiBuffSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiBuffSkillLogic.prototype.execute = function (data) {
        _super.prototype.execute.call(this, data);
        var tempSkill = new Skill(data.skill.id);
        tempSkill.skillFuncArg1 = tempSkill.skillFuncArg6;
        tempSkill.skillFuncArg2 = tempSkill.skillFuncArg7;
        tempSkill.skillFuncArg3 = tempSkill.skillFuncArg8;
        tempSkill.skillFuncArg4 = tempSkill.skillFuncArg9;
        tempSkill.skillFuncArg5 = tempSkill.skillFuncArg10;
        data.skill = tempSkill;
        _super.prototype.execute.call(this, data);
    };
    return MultiBuffSkillLogic;
}(BuffSkillLogic));
var MultiDebuffSkillLogic = (function (_super) {
    __extends(MultiDebuffSkillLogic, _super);
    function MultiDebuffSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiDebuffSkillLogic.prototype.execute = function (data) {
        _super.prototype.execute.call(this, data);
        var tempSkill = new Skill(data.skill.id);
        tempSkill.skillFuncArg1 = tempSkill.skillFuncArg6;
        tempSkill.skillFuncArg2 = tempSkill.skillFuncArg7;
        tempSkill.skillFuncArg3 = tempSkill.skillFuncArg8;
        tempSkill.skillFuncArg4 = tempSkill.skillFuncArg9;
        tempSkill.skillFuncArg5 = tempSkill.skillFuncArg10;
        data.skill = tempSkill;
        _super.prototype.execute.call(this, data);
    };
    return MultiDebuffSkillLogic;
}(DebuffSkillLogic));
var OnHitBuffSkillLogic = (function (_super) {
    __extends(OnHitBuffSkillLogic, _super);
    function OnHitBuffSkillLogic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.executionLeft = OnHitBuffSkillLogic.UNINITIALIZED_VALUE;
        return _this;
    }
    OnHitBuffSkillLogic.prototype.willBeExecuted = function (data) {
        if (this.executionLeft === OnHitBuffSkillLogic.UNINITIALIZED_VALUE) {
            this.executionLeft = data.skill.skillFuncArg5;
        }
        if (this.executionLeft === 0)
            return false;
        var success = _super.prototype.willBeExecuted.call(this, data);
        if (success) {
            this.executionLeft--;
            return true;
        }
        else
            return false;
    };
    OnHitBuffSkillLogic.prototype.execute = function (data) {
        this.logger.addMinorEvent({
            executorId: data.executor.id,
            type: ENUM.MinorEventType.DESCRIPTION,
            description: data.executor.name + " procs " + data.skill.name + ". ",
            skillId: data.skill.id
        });
        _super.prototype.execute.call(this, data);
    };
    OnHitBuffSkillLogic.UNINITIALIZED_VALUE = -1234;
    return OnHitBuffSkillLogic;
}(BuffSkillLogic));
var OnHitDebuffSkillLogic = (function (_super) {
    __extends(OnHitDebuffSkillLogic, _super);
    function OnHitDebuffSkillLogic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.executionLeft = OnHitDebuffSkillLogic.UNINITIALIZED_VALUE;
        return _this;
    }
    OnHitDebuffSkillLogic.prototype.willBeExecuted = function (data) {
        var hasTarget = data.skill.range.hasValidTarget(data.executor);
        if (this.executionLeft === OnHitDebuffSkillLogic.UNINITIALIZED_VALUE) {
            this.executionLeft = data.skill.skillFuncArg5;
        }
        if (this.executionLeft === 0)
            return false;
        var success = _super.prototype.willBeExecuted.call(this, data) && hasTarget;
        if (success) {
            this.executionLeft--;
            return true;
        }
        else
            return false;
    };
    OnHitDebuffSkillLogic.prototype.execute = function (data) {
        data.skill.getReady(data.executor);
        var target;
        this.logger.addMinorEvent({
            executorId: data.executor.id,
            type: ENUM.MinorEventType.DESCRIPTION,
            description: data.executor.name + " procs " + data.skill.name + ". ",
            skillId: data.skill.id
        });
        while (target = data.skill.getTarget(data.executor)) {
            DebuffSkillLogic.processDebuff(data.executor, target, data.skill);
        }
    };
    OnHitDebuffSkillLogic.UNINITIALIZED_VALUE = -1234;
    return OnHitDebuffSkillLogic;
}(SkillLogic));
var ProtectCounterSkillLogic = (function (_super) {
    __extends(ProtectCounterSkillLogic, _super);
    function ProtectCounterSkillLogic() {
        var _this = _super.call(this) || this;
        _this.counter = true;
        return _this;
    }
    ProtectCounterSkillLogic.prototype.execute = function (data) {
        var toReturn = this.executeProtectPhase(data);
        var protector = data.executor;
        if (!protector.isDead && protector.canAttack() && !data.attacker.isDead) {
            this.battleModel.processDamagePhase({
                attacker: protector,
                target: data.attacker,
                skill: data.skill,
                additionalDescription: protector.name + " counters " + data.attacker.name + "! ",
            });
        }
        return toReturn;
    };
    return ProtectCounterSkillLogic;
}(ProtectSkillLogic));
var ProtectCounterDebuffSkillLogic = (function (_super) {
    __extends(ProtectCounterDebuffSkillLogic, _super);
    function ProtectCounterDebuffSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProtectCounterDebuffSkillLogic.prototype.execute = function (data) {
        var toReturn = _super.prototype.execute.call(this, data);
        var protector = data.executor;
        if (!protector.isDead && protector.canUseSkill() && !data.attacker.isDead && Math.random() <= data.skill.skillFuncArg3) {
            DebuffSkillLogic.processDebuff(protector, data.attacker, data.skill);
        }
        return toReturn;
    };
    return ProtectCounterDebuffSkillLogic;
}(ProtectCounterSkillLogic));
var ProtectReflectSkillLogic = (function (_super) {
    __extends(ProtectReflectSkillLogic, _super);
    function ProtectReflectSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProtectReflectSkillLogic.prototype.willBeExecuted = function (data) {
        var skill = data.skill;
        var canProtect = Skill.canProtectFromCalcType(skill.skillFuncArg2, data.attackSkill)
            && Skill.canProtectFromAttackType(skill.skillFuncArg4, data.attackSkill);
        return _super.prototype.willBeExecuted.call(this, data) && canProtect;
    };
    ProtectReflectSkillLogic.prototype.execute = function (data) {
        var toReturn = this.executeProtectPhase(data);
        if (data.executor.isDead || !data.executor.canUseSkill()) {
            return toReturn;
        }
        var range = RangeFactory.getRange(data.skill.skillFuncArg3);
        range.getReady(data.executor);
        var target;
        while (target = range.getTarget(data.executor)) {
            this.battleModel.processDamagePhase({
                attacker: data.executor,
                target: target,
                skill: data.skill,
                scaledRatio: data.scaledRatio,
                varyingRatio: data.varyingRatio,
                oriAttacker: data.attacker,
                oriAtkSkill: data.attackSkill,
                oriDmg: toReturn.dmgTaken / data.skill.skillFuncArg5
            });
            if (data.attackSkill.skillFunc === ENUM.SkillFunc.ATTACK || data.attackSkill.skillFunc === ENUM.SkillFunc.MAGIC) {
                AfflictionSkillLogic.processAffliction(data.executor, target, data.attackSkill, ProtectReflectSkillLogic.REFLECT_AFFLICTION_PROBABILITY);
            }
            this.clearAllCardsDamagePhaseData();
        }
        return toReturn;
    };
    ProtectReflectSkillLogic.REFLECT_AFFLICTION_PROBABILITY = 0.2;
    return ProtectReflectSkillLogic;
}(ProtectSkillLogic));
var RandomSkillLogic = (function (_super) {
    __extends(RandomSkillLogic, _super);
    function RandomSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RandomSkillLogic.prototype.execute = function (data) {
        var randSkillsId = SkillDatabase[data.skill.id].randSkills;
        shuffle(randSkillsId);
        data.noProbCheck = true;
        for (var i = 0; i < randSkillsId.length; i++) {
            var skill = new Skill(randSkillsId[i]);
            data.skill = skill;
            if (skill.willBeExecuted(data)) {
                this.logger.addMinorEvent({
                    executorId: data.executor.id,
                    type: ENUM.MinorEventType.DESCRIPTION,
                    description: data.executor.name + " procs " + data.skill.name + ". ",
                    skillId: data.skill.id
                });
                skill.execute(data);
                break;
            }
        }
    };
    return RandomSkillLogic;
}(SkillLogic));
var ReviveSkillLogic = (function (_super) {
    __extends(ReviveSkillLogic, _super);
    function ReviveSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReviveSkillLogic.prototype.willBeExecuted = function (data) {
        var hasValidTarget = data.skill.range.hasValidTarget(data.executor);
        return _super.prototype.willBeExecuted.call(this, data) && hasValidTarget;
    };
    ReviveSkillLogic.prototype.execute = function (data) {
        data.skill.getReady(data.executor);
        var hpRatio = data.skill.skillFuncArg1;
        var target;
        while (target = data.skill.getTarget(data.executor)) {
            target.revive(hpRatio);
            this.logger.addMinorEvent({
                executorId: data.executor.id,
                targetId: target.id,
                type: ENUM.MinorEventType.REVIVE,
                reviveHPRatio: hpRatio,
                description: target.name + " is revived with " + hpRatio * 100 + "% HP!",
                skillId: data.skill.id
            });
        }
    };
    return ReviveSkillLogic;
}(SkillLogic));
var SurviveSkillLogic = (function (_super) {
    __extends(SurviveSkillLogic, _super);
    function SurviveSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SurviveSkillLogic.prototype.willBeExecuted = function (data) {
        var hpRatio = data.executor.getHpRatio();
        return _super.prototype.willBeExecuted.call(this, data) && (hpRatio > data.skill.skillFuncArg1) && (data.wouldBeDamage >= data.executor.getHP());
    };
    SurviveSkillLogic.prototype.execute = function (data) {
        this.logger.addMinorEvent({
            executorId: data.executor.id,
            type: ENUM.MinorEventType.DESCRIPTION,
            noProcEffect: true,
            description: data.executor.name + " procs " + data.skill.name + ". ",
            skillId: data.skill.id
        });
    };
    return SurviveSkillLogic;
}(SkillLogic));
var TurnOrderChangeSkillLogic = (function (_super) {
    __extends(TurnOrderChangeSkillLogic, _super);
    function TurnOrderChangeSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TurnOrderChangeSkillLogic.prototype.willBeExecuted = function (data) {
        return _super.prototype.willBeExecuted.call(this, data) && !this.battleModel.turnOrderChanged;
    };
    TurnOrderChangeSkillLogic.prototype.execute = function (data) {
        this.battleModel.turnOrderChanged = true;
        this.battleModel.turnOrderBase = data.skill.skillFuncArg1;
        this.battleModel.turnOrderChangeEffectiveTurns = data.skill.skillFuncArg2;
        this.logger.addMinorEvent({
            executorId: data.executor.id,
            type: ENUM.MinorEventType.BATTLE_DESCRIPTION,
            description: "Turn order is now based on " + ENUM.BattleTurnOrderType[data.skill.skillFuncArg1] + " for " + data.skill.skillFuncArg2 + " turn(s).",
            skillId: data.skill.id,
            battleDesc: "Turn Order Changed"
        });
    };
    return TurnOrderChangeSkillLogic;
}(SkillLogic));
var BasePassiveSkillLogic = (function (_super) {
    __extends(BasePassiveSkillLogic, _super);
    function BasePassiveSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasePassiveSkillLogic.prototype.willBeExecuted = function (data) {
        throw new Error("This is undefined for passive skills (except for extra turn passive and affliction passive)!");
    };
    BasePassiveSkillLogic.prototype.execute = function (data) {
        throw new Error("There's nothing to execute for passive skills!");
    };
    BasePassiveSkillLogic.prototype.getEffectRatio = function (executor, comparator, passiveSkill) {
        throw new Error("Implement this!");
    };
    BasePassiveSkillLogic.prototype.getAfflictionPassive = function (executor, comparator, passiveSkill) {
        throw new Error("Implement this!");
    };
    return BasePassiveSkillLogic;
}(SkillLogic));
var AfflictionPassiveSkillLogic = (function (_super) {
    __extends(AfflictionPassiveSkillLogic, _super);
    function AfflictionPassiveSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AfflictionPassiveSkillLogic.prototype.getAfflictionPassive = function (executor, target, passiveSkill) {
        if (executor.rarity > target.rarity) {
            var afflictionSkill = new Skill(passiveSkill.id);
            afflictionSkill.skillFuncArg1 = 0;
            afflictionSkill.skillFuncArg2 = passiveSkill.skillFuncArg4;
            afflictionSkill.skillFuncArg3 = passiveSkill.skillFuncArg1;
            afflictionSkill.skillFuncArg4 = passiveSkill.skillFuncArg5;
            afflictionSkill.skillFuncArg5 = passiveSkill.skillFuncArg6;
            return afflictionSkill;
        }
        else {
            return null;
        }
    };
    return AfflictionPassiveSkillLogic;
}(BasePassiveSkillLogic));
var AfflictionProbabilityBuffPassiveSkillLogic = (function (_super) {
    __extends(AfflictionProbabilityBuffPassiveSkillLogic, _super);
    function AfflictionProbabilityBuffPassiveSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AfflictionProbabilityBuffPassiveSkillLogic.prototype.getEffectRatio = function (executor, target, passiveSkill) {
        if (executor.rarity > target.rarity) {
            return 1 + passiveSkill.skillFuncArg1;
        }
        else {
            return 1;
        }
    };
    return AfflictionProbabilityBuffPassiveSkillLogic;
}(BasePassiveSkillLogic));
var DamagePassiveSkillLogic = (function (_super) {
    __extends(DamagePassiveSkillLogic, _super);
    function DamagePassiveSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DamagePassiveSkillLogic.prototype.getEffectRatio = function (executor, target, passiveSkill) {
        if (executor.rarity > target.rarity) {
            return 1 + passiveSkill.skillFuncArg1;
        }
        else {
            return 1;
        }
    };
    return DamagePassiveSkillLogic;
}(BasePassiveSkillLogic));
var DefensePassiveSkillLogic = (function (_super) {
    __extends(DefensePassiveSkillLogic, _super);
    function DefensePassiveSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefensePassiveSkillLogic.prototype.getEffectRatio = function (executor, attacker, passiveSkill) {
        if (executor.rarity > attacker.rarity) {
            return 1 - passiveSkill.skillFuncArg1;
        }
        else {
            return 1;
        }
    };
    return DefensePassiveSkillLogic;
}(BasePassiveSkillLogic));
var ExtraTurnPassiveSkillLogic = (function (_super) {
    __extends(ExtraTurnPassiveSkillLogic, _super);
    function ExtraTurnPassiveSkillLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtraTurnPassiveSkillLogic.prototype.willBeExecuted = function (data) {
        return Math.random() <= data.skill.skillFuncArg1;
    };
    return ExtraTurnPassiveSkillLogic;
}(BasePassiveSkillLogic));
var SkillLogicFactory = (function () {
    function SkillLogicFactory() {
    }
    SkillLogicFactory.getSkillLogic = function (skillFunc) {
        switch (skillFunc) {
            case ENUM.SkillFunc.BUFF:
                return new BuffSkillLogic();
            case ENUM.SkillFunc.MULTI_BUFF:
                return new MultiBuffSkillLogic();
            case ENUM.SkillFunc.DEBUFF:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF:
                return new DebuffSkillLogic();
            case ENUM.SkillFunc.MULTI_DEBUFF:
                return new MultiDebuffSkillLogic();
            case ENUM.SkillFunc.DEBUFF_AFFLICTION:
                return new DebuffAfflictionSkillLogic();
            case ENUM.SkillFunc.ONHIT_BUFF:
                return new OnHitBuffSkillLogic();
            case ENUM.SkillFunc.ONHIT_DEBUFF:
                return new OnHitDebuffSkillLogic();
            case ENUM.SkillFunc.DISPELL:
                return new DispellSkillLogic();
            case ENUM.SkillFunc.AFFLICTION:
                return new AfflictionSkillLogic();
            case ENUM.SkillFunc.ATTACK:
            case ENUM.SkillFunc.MAGIC:
            case ENUM.SkillFunc.DEBUFFATTACK:
            case ENUM.SkillFunc.DEBUFFINDIRECT:
            case ENUM.SkillFunc.DRAIN_ATTACK:
            case ENUM.SkillFunc.DRAIN_MAGIC:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_ATTACK:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC:
            case ENUM.SkillFunc.KILL:
            case ENUM.SkillFunc.ABSORB_ATTACK:
            case ENUM.SkillFunc.ABSORB_MAGIC:
                return new AttackSkillLogic();
            case ENUM.SkillFunc.PROTECT:
                return new ProtectSkillLogic();
            case ENUM.SkillFunc.EVADE:
                return new EvadeSkillLogic();
            case ENUM.SkillFunc.PROTECT_COUNTER:
                return new ProtectCounterSkillLogic();
            case ENUM.SkillFunc.PROTECT_COUNTER_DEBUFF:
                return new ProtectCounterDebuffSkillLogic();
            case ENUM.SkillFunc.PROTECT_REFLECT:
                return new ProtectReflectSkillLogic();
            case ENUM.SkillFunc.COUNTER:
            case ENUM.SkillFunc.COUNTER_INDIRECT:
                return new CounterSkillLogic();
            case ENUM.SkillFunc.COUNTER_DISPELL:
                return new CounterDispellSkillLogic();
            case ENUM.SkillFunc.COUNTER_DEBUFF:
            case ENUM.SkillFunc.COUNTER_DEBUFF_INDIRECT:
                return new CounterDebuffSkillLogic();
            case ENUM.SkillFunc.COUNTER_DRAIN:
            case ENUM.SkillFunc.COUNTER_DRAIN_INDIRECT:
                return new CounterDrainSkillLogic();
            case ENUM.SkillFunc.CLEAR_DEBUFF:
                return new ClearDebuffSkillLogic();
            case ENUM.SkillFunc.DRAIN:
                return new DrainSkillLogic();
            case ENUM.SkillFunc.SURVIVE:
                return new SurviveSkillLogic();
            case ENUM.SkillFunc.HEAL:
                return new HealSkillLogic();
            case ENUM.SkillFunc.REVIVE:
                return new ReviveSkillLogic();
            case ENUM.SkillFunc.TURN_ORDER_CHANGE:
                return new TurnOrderChangeSkillLogic();
            case ENUM.SkillFunc.RANDOM:
                return new RandomSkillLogic();
            case ENUM.SkillFunc.ABSORB:
                return new AbsorbSkillLogic();
            case ENUM.SkillFunc.DAMAGE_PASSIVE:
                return new DamagePassiveSkillLogic();
            case ENUM.SkillFunc.DEFENSE_PASSIVE:
                return new DefensePassiveSkillLogic();
            case ENUM.SkillFunc.AFFLICTION_PROB_BUFF_PASSIVE:
                return new AfflictionProbabilityBuffPassiveSkillLogic();
            case ENUM.SkillFunc.AFFLICTION_PASSIVE:
                return new AfflictionPassiveSkillLogic();
            case ENUM.SkillFunc.EXTRA_TURN_PASSIVE:
                return new ExtraTurnPassiveSkillLogic();
            default:
                throw new Error("Invalid skillFunc or not implemented");
        }
    };
    return SkillLogicFactory;
}());
var Skill = (function () {
    function Skill(skillId) {
        var skillData = SkillDatabase[skillId];
        this.id = skillId;
        this.name = skillData.name;
        this.skillType = skillData.type;
        this.skillFunc = skillData.func;
        this.skillCalcType = skillData.calc;
        this.skillFuncArg1 = skillData.args && skillData.args[0] ? skillData.args[0] : 0;
        this.skillFuncArg2 = skillData.args && skillData.args[1] ? skillData.args[1] : 0;
        this.skillFuncArg3 = skillData.args && skillData.args[2] ? skillData.args[2] : 0;
        this.skillFuncArg4 = skillData.args && skillData.args[3] ? skillData.args[3] : 0;
        this.skillFuncArg5 = skillData.args && skillData.args[4] ? skillData.args[4] : 0;
        this.skillFuncArg6 = skillData.args && skillData.args[5] ? skillData.args[5] : 0;
        this.skillFuncArg7 = skillData.args && skillData.args[6] ? skillData.args[6] : 0;
        this.skillFuncArg8 = skillData.args && skillData.args[7] ? skillData.args[7] : 0;
        this.skillFuncArg9 = skillData.args && skillData.args[8] ? skillData.args[8] : 0;
        this.skillFuncArg10 = skillData.args && skillData.args[9] ? skillData.args[9] : 0;
        this.skillRange = skillData.range;
        this.maxProbability = skillData.prob;
        this.ward = skillData.ward;
        this.description = skillData.desc;
        this.isAutoAttack = skillData.isAutoAttack;
        this.logic = SkillLogicFactory.getSkillLogic(this.skillFunc);
        var selectDead = false;
        if (this.skillFunc === ENUM.SkillFunc.REVIVE) {
            selectDead = true;
        }
        this.range = RangeFactory.getRange(this.skillRange, selectDead);
    }
    Skill.isAttackSkill = function (skillId, srcSkillData) {
        var skillInfo = srcSkillData ? srcSkillData : SkillDatabase[skillId];
        var func = srcSkillData ? srcSkillData.skillFunc : skillInfo.func;
        switch (func) {
            case ENUM.SkillFunc.ATTACK:
            case ENUM.SkillFunc.MAGIC:
            case ENUM.SkillFunc.COUNTER:
            case ENUM.SkillFunc.COUNTER_INDIRECT:
            case ENUM.SkillFunc.COUNTER_DEBUFF:
            case ENUM.SkillFunc.COUNTER_DEBUFF_INDIRECT:
            case ENUM.SkillFunc.COUNTER_DRAIN:
            case ENUM.SkillFunc.COUNTER_DRAIN_INDIRECT:
            case ENUM.SkillFunc.PROTECT_COUNTER:
            case ENUM.SkillFunc.PROTECT_COUNTER_DEBUFF:
            case ENUM.SkillFunc.DEBUFFATTACK:
            case ENUM.SkillFunc.DEBUFFINDIRECT:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_ATTACK:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC:
            case ENUM.SkillFunc.DRAIN_ATTACK:
            case ENUM.SkillFunc.DRAIN_MAGIC:
            case ENUM.SkillFunc.KILL:
            case ENUM.SkillFunc.ABSORB_ATTACK:
            case ENUM.SkillFunc.ABSORB_MAGIC:
                return true;
            default:
                return false;
        }
    };
    Skill.isIndirectSkill = function (skillId, srcSkillData) {
        var skillInfo = srcSkillData ? srcSkillData : SkillDatabase[skillId];
        var func = srcSkillData ? srcSkillData.skillFunc : skillInfo.func;
        switch (func) {
            case ENUM.SkillFunc.ATTACK:
            case ENUM.SkillFunc.COUNTER:
            case ENUM.SkillFunc.COUNTER_DEBUFF:
            case ENUM.SkillFunc.COUNTER_DRAIN:
            case ENUM.SkillFunc.PROTECT_COUNTER:
            case ENUM.SkillFunc.PROTECT_COUNTER_DEBUFF:
            case ENUM.SkillFunc.PROTECT_REFLECT:
            case ENUM.SkillFunc.DEBUFFATTACK:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_ATTACK:
            case ENUM.SkillFunc.DRAIN_ATTACK:
            case ENUM.SkillFunc.ABSORB_ATTACK:
                return false;
            default:
                return true;
        }
    };
    Skill.isPositionIndependentAttackSkill = function (skillId, srcSkillData) {
        var skillInfo = srcSkillData ? srcSkillData : SkillDatabase[skillId];
        var func = srcSkillData ? srcSkillData.skillFunc : skillInfo.func;
        return this.isIndirectSkill(skillId, srcSkillData) && func !== ENUM.SkillFunc.KILL;
    };
    Skill.getWardType = function (srcSkillData) {
        var wardType = undefined;
        if (Skill.isAttackSkill(null, srcSkillData)) {
            if (Skill.isPositionIndependentAttackSkill(null, srcSkillData)) {
                var isCalcAtk = srcSkillData.skillCalcType === ENUM.SkillCalcType.ATK;
                var isCalcWisOrAgi = srcSkillData.skillCalcType === ENUM.SkillCalcType.WIS ||
                    srcSkillData.skillCalcType === ENUM.SkillCalcType.AGI;
                if (isCalcAtk) {
                    wardType = ENUM.WardType.PHYSICAL;
                }
                else if (isCalcWisOrAgi) {
                    var isEffectBreath = [17, 18, 19].indexOf(srcSkillData.casterEffectId) !== -1;
                    if (isEffectBreath) {
                        wardType = ENUM.WardType.BREATH;
                    }
                    else {
                        wardType = ENUM.WardType.MAGICAL;
                    }
                }
            }
            else {
                wardType = ENUM.WardType.PHYSICAL;
            }
        }
        return wardType;
    };
    Skill.isWisAutoAttack = function (skillId) {
        var skillInfo = SkillDatabase[skillId];
        return this.isAutoAttackSkill(skillId) && skillInfo.calc === ENUM.SkillCalcType.WIS;
    };
    Skill.isAtkAutoAttack = function (skillId) {
        var skillInfo = SkillDatabase[skillId];
        return this.isAutoAttackSkill(skillId) && skillInfo.calc === ENUM.SkillCalcType.ATK;
    };
    Skill.isAutoAttackSkill = function (skillId) {
        return SkillDatabase[skillId].isAutoAttack;
    };
    Skill.isMagicSkill = function (skillId) {
        var skillInfo = SkillDatabase[skillId];
        if (skillInfo.calc === ENUM.SkillCalcType.WIS) {
            return true;
        }
        if (skillInfo.type === ENUM.SkillType.OPENING) {
            return true;
        }
        if ([ENUM.SkillFunc.AFFLICTION,
            ENUM.SkillFunc.BUFF,
            ENUM.SkillFunc.DEBUFF,
            ENUM.SkillFunc.MULTI_BUFF,
            ENUM.SkillFunc.MULTI_DEBUFF,
            ENUM.SkillFunc.DEBUFF_AFFLICTION,
            ENUM.SkillFunc.MAGIC,
            ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC,
            ENUM.SkillFunc.ABSORB,
            ENUM.SkillFunc.DRAIN_MAGIC].indexOf(skillInfo.func) !== -1) {
            return true;
        }
        return false;
    };
    Skill.isAoeSkill = function (skillId) {
        var isAoe = false;
        var skillInfo = SkillDatabase[skillId];
        if (RangeFactory.canBeAoeRange(skillInfo.range) && this.isIndirectSkill(skillId)) {
            isAoe = true;
        }
        return isAoe;
    };
    Skill.isDebuffAttackSkill = function (skillId) {
        var isDebuffAttack = false;
        var skillInfo = SkillDatabase[skillId];
        switch (skillInfo.func) {
            case ENUM.SkillFunc.DEBUFFATTACK:
            case ENUM.SkillFunc.DEBUFFINDIRECT:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_ATTACK:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC:
            case ENUM.SkillFunc.COUNTER_DEBUFF:
            case ENUM.SkillFunc.COUNTER_DEBUFF_INDIRECT:
            case ENUM.SkillFunc.PROTECT_COUNTER_DEBUFF:
                isDebuffAttack = true;
                break;
            default:
                break;
        }
        return isDebuffAttack;
    };
    Skill.getStatusModified = function (skillId) {
        var skillInfo = SkillDatabase[skillId];
        var statuses = [];
        switch (skillInfo.func) {
            case ENUM.SkillFunc.BUFF:
                statuses.push(skillInfo.args[1]);
                if (skillInfo.args[2] && skillInfo.args[1] !== ENUM.StatusType.HP_SHIELD)
                    statuses.push(skillInfo.args[2]);
                break;
            case ENUM.SkillFunc.MULTI_BUFF:
                statuses.push(skillInfo.args[1]);
                if (skillInfo.args[2] && skillInfo.args[1] !== ENUM.StatusType.HP_SHIELD)
                    statuses.push(skillInfo.args[2]);
                statuses.push(skillInfo.args[6]);
                if (skillInfo.args[7] && skillInfo.args[6] !== ENUM.StatusType.HP_SHIELD)
                    statuses.push(skillInfo.args[7]);
                break;
            case ENUM.SkillFunc.DEBUFF:
            case ENUM.SkillFunc.DEBUFFATTACK:
            case ENUM.SkillFunc.DEBUFFINDIRECT:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_ATTACK:
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF_MAGIC:
            case ENUM.SkillFunc.DEBUFF_AFFLICTION:
            case ENUM.SkillFunc.COUNTER_DEBUFF:
            case ENUM.SkillFunc.COUNTER_DEBUFF_INDIRECT:
            case ENUM.SkillFunc.PROTECT_COUNTER_DEBUFF:
                statuses.push(skillInfo.args[1]);
                break;
            case ENUM.SkillFunc.MULTI_DEBUFF:
                statuses.push(skillInfo.args[1]);
                statuses.push(skillInfo.args[6]);
                break;
            case ENUM.SkillFunc.CASTER_BASED_DEBUFF:
            case ENUM.SkillFunc.ONHIT_DEBUFF:
            case ENUM.SkillFunc.ONHIT_BUFF:
                statuses.push(skillInfo.args[1]);
                if (skillInfo.args[2])
                    statuses.push(skillInfo.args[2]);
                break;
            case ENUM.SkillFunc.ABSORB:
            case ENUM.SkillFunc.ABSORB_ATTACK:
            case ENUM.SkillFunc.ABSORB_MAGIC:
                statuses = AbsorbSkillLogic.getComponentStatusFromBuffStatusType(skillInfo.args[1]);
                break;
            default:
                break;
        }
        return statuses;
    };
    Skill.canProtectFromCalcType = function (type, attackSkill) {
        switch (type) {
            case ENUM.SkillCalcType.DEFAULT:
                return true;
            case ENUM.SkillCalcType.ATK:
            case ENUM.SkillCalcType.WIS:
            case ENUM.SkillCalcType.AGI:
                return attackSkill.skillCalcType === type;
            case ENUM.SkillCalcType.ATK_WIS:
                return attackSkill.skillCalcType === ENUM.SkillCalcType.ATK || attackSkill.skillCalcType === ENUM.SkillCalcType.WIS;
            case ENUM.SkillCalcType.ATK_AGI:
                return attackSkill.skillCalcType === ENUM.SkillCalcType.ATK || attackSkill.skillCalcType === ENUM.SkillCalcType.AGI;
            case ENUM.SkillCalcType.WIS_AGI:
                return attackSkill.skillCalcType === ENUM.SkillCalcType.WIS || attackSkill.skillCalcType === ENUM.SkillCalcType.AGI;
            default:
                throw new Error("Unimplemented calcType for canProtectFromCalcType()");
        }
    };
    Skill.canProtectFromAttackType = function (type, attackSkill) {
        switch (type) {
            case ENUM.ProtectAttackType.SKILL:
                return (attackSkill.skillFunc !== ENUM.SkillFunc.COUNTER
                    && attackSkill.skillFunc !== ENUM.SkillFunc.PROTECT_COUNTER
                    && attackSkill.skillFunc !== ENUM.SkillFunc.PROTECT_COUNTER_DEBUFF
                    && attackSkill.skillFunc !== ENUM.SkillFunc.COUNTER_INDIRECT
                    && attackSkill.id !== 10000);
            case ENUM.ProtectAttackType.NOT_COUNTER:
                return (attackSkill.skillFunc !== ENUM.SkillFunc.COUNTER
                    && attackSkill.skillFunc !== ENUM.SkillFunc.PROTECT_COUNTER
                    && attackSkill.skillFunc !== ENUM.SkillFunc.PROTECT_COUNTER_DEBUFF
                    && attackSkill.skillFunc !== ENUM.SkillFunc.COUNTER_INDIRECT);
            default:
                throw new Error("Unimplemented ProtectAttackType");
        }
    };
    Skill.prototype.isIndirectSkill = function () {
        return Skill.isIndirectSkill(this.id);
    };
    Skill.prototype.getSerializableObject = function () {
        return {
            id: this.id,
            name: this.name,
            skillType: this.skillType,
            skillFunc: this.skillFunc,
            skillCalcType: this.skillCalcType,
            skillFuncArg1: this.skillFuncArg1,
            skillFuncArg2: this.skillFuncArg2,
            skillFuncArg3: this.skillFuncArg3,
            skillFuncArg4: this.skillFuncArg4,
            skillFuncArg5: this.skillFuncArg5,
            skillFuncArg6: this.skillFuncArg6,
            skillFuncArg7: this.skillFuncArg7,
            skillFuncArg8: this.skillFuncArg8,
            skillFuncArg9: this.skillFuncArg9,
            skillFuncArg10: this.skillFuncArg10,
            skillRange: this.skillRange,
            maxProbability: this.maxProbability,
            ward: this.ward,
            description: this.description,
            isAutoAttack: this.isAutoAttack
        };
    };
    Skill.prototype.willBeExecuted = function (data) {
        return this.logic.willBeExecuted(data);
    };
    Skill.prototype.execute = function (data) {
        return this.logic.execute(data);
    };
    Skill.prototype.getTarget = function (executor) {
        return this.range.getTarget(executor);
    };
    Skill.prototype.getReady = function (executor) {
        this.range.getReady(executor);
    };
    Skill.prototype.isConfused = function () {
        return this.range.isConfused;
    };
    Skill.prototype.clearConfuse = function () {
        this.range.isConfused = false;
    };
    Skill.prototype.setConfuse = function (prob) {
        if (Affliction.canConfuse(this.skillType)) {
            this.range.setConfuse(prob);
        }
    };
    return Skill;
}());
function getDamageCalculatedByATK(attacker, defender, ignorePosition) {
    var ATTACK_FACTOR = 0.3;
    var DIFF_FACTOR = 0.2;
    var POS_ATTACK_FACTOR = {};
    POS_ATTACK_FACTOR[ENUM.FormationRow.REAR] = 0.8;
    POS_ATTACK_FACTOR[ENUM.FormationRow.MID] = 1;
    POS_ATTACK_FACTOR[ENUM.FormationRow.FRONT] = 1.2;
    var POS_DAMAGE_FACTOR = {};
    POS_DAMAGE_FACTOR[ENUM.FormationRow.REAR] = 0.8;
    POS_DAMAGE_FACTOR[ENUM.FormationRow.MID] = 1;
    POS_DAMAGE_FACTOR[ENUM.FormationRow.FRONT] = 1.2;
    var baseDamage = attacker.getATK() * ATTACK_FACTOR;
    var damage = ((attacker.getATK() - defender.getDEF()) * DIFF_FACTOR) + baseDamage;
    if (!ignorePosition) {
        damage *= POS_ATTACK_FACTOR[attacker.getFormationRow()];
        damage *= POS_DAMAGE_FACTOR[defender.getFormationRow()];
    }
    if (damage < baseDamage * 0.1) {
        damage = baseDamage * 0.1;
    }
    damage = Math.floor(damage * getRandomArbitary(0.9, 1.1));
    return damage;
}
function getDamageCalculatedByAGI(attacker, defender, ignorePosition) {
    var ATTACK_FACTOR = 0.3;
    var DIFF_FACTOR = 0.2;
    var POS_ATTACK_FACTOR = {};
    POS_ATTACK_FACTOR[ENUM.FormationRow.REAR] = 0.8;
    POS_ATTACK_FACTOR[ENUM.FormationRow.MID] = 1;
    POS_ATTACK_FACTOR[ENUM.FormationRow.FRONT] = 1.2;
    var POS_DAMAGE_FACTOR = {};
    POS_DAMAGE_FACTOR[ENUM.FormationRow.REAR] = 0.8;
    POS_DAMAGE_FACTOR[ENUM.FormationRow.MID] = 1;
    POS_DAMAGE_FACTOR[ENUM.FormationRow.FRONT] = 1.2;
    var baseDamage = attacker.getAGI() * ATTACK_FACTOR;
    var damage = ((attacker.getAGI() - defender.getDEF()) * DIFF_FACTOR) + baseDamage;
    if (!ignorePosition) {
        damage *= POS_ATTACK_FACTOR[attacker.getFormationRow()];
        damage *= POS_DAMAGE_FACTOR[defender.getFormationRow()];
    }
    if (damage < baseDamage * 0.1) {
        damage = baseDamage * 0.1;
    }
    damage = Math.floor(damage * getRandomArbitary(0.9, 1.1));
    return damage;
}
function getDamageCalculatedByWIS(attacker, defender) {
    var ATTACK_FACTOR = 0.3;
    var WIS_DEF_FACTOR = 0.5;
    var DIFF_FACTOR = 0.2;
    var baseDamage = attacker.getWIS() * ATTACK_FACTOR;
    var targetWisDef = (defender.getWIS() + defender.getDEF()) * WIS_DEF_FACTOR;
    var damage = ((attacker.getWIS() - targetWisDef) * DIFF_FACTOR) + baseDamage;
    if (damage < baseDamage * 0.1) {
        damage = baseDamage * 0.1;
    }
    damage = Math.floor(damage * getRandomArbitary(0.9, 1.1));
    return damage;
}
function getHealAmount(executor) {
    var HEAL_FACTOR = 0.3;
    var amount = executor.getWIS() * HEAL_FACTOR;
    amount = Math.floor(amount * getRandomArbitary(0.9, 1.1));
    return amount;
}
function getDebuffAmount(executor, target) {
    var FACTOR = 1.0;
    var value = (executor.getWIS() - target.getWIS()) * FACTOR;
    var min = executor.getWIS() * 0.1;
    if (value < min) {
        value = min;
    }
    return -1 * value;
}
function getCasterBasedDebuffAmount(executor) {
    var FACTOR = 1.2;
    var value = executor.getWIS() * FACTOR;
    return -1 * value;
}
function getReflectAmount(attacker, attackSkill, caster, target, ignorePosFactor, oriDmg) {
    var DIFF_FACTOR = 0.7;
    var POS_ATTACK_FACTOR = {};
    POS_ATTACK_FACTOR[ENUM.FormationRow.REAR] = 0.8;
    POS_ATTACK_FACTOR[ENUM.FormationRow.MID] = 1;
    POS_ATTACK_FACTOR[ENUM.FormationRow.FRONT] = 1.2;
    var POS_DAMAGE_FACTOR = {};
    POS_DAMAGE_FACTOR[ENUM.FormationRow.REAR] = 0.8;
    POS_DAMAGE_FACTOR[ENUM.FormationRow.MID] = 1;
    POS_DAMAGE_FACTOR[ENUM.FormationRow.FRONT] = 1.2;
    var damage;
    var x = oriDmg;
    switch (attackSkill.skillCalcType) {
        case ENUM.SkillCalcType.ATK:
        case ENUM.SkillCalcType.AGI:
            var xFormation = ignorePosFactor ? 1 : POS_ATTACK_FACTOR[attacker.formationRow] * POS_DAMAGE_FACTOR[caster.formationRow];
            var formation = ignorePosFactor ? 1 : POS_ATTACK_FACTOR[caster.formationRow] * POS_DAMAGE_FACTOR[target.formationRow];
            damage = (x / xFormation + Math.max(0, caster.getDEF() - target.getDEF()) * DIFF_FACTOR) * formation;
            break;
        case ENUM.SkillCalcType.WIS:
            damage = x + Math.max(0, caster.getDEF() - (target.getWIS() + target.getDEF()) / 2) * DIFF_FACTOR;
            break;
        default:
            throw new Error("Unknown skill calc type!");
    }
    damage = Math.floor(damage * getRandomArbitary(0.9, 1.1));
    return damage;
}
var SkillDatabase = {
    10000: {
        name: "Default auto", type: 2, func: 3, calc: 1,
        args: [1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    2: {
        name: "Strength of Blades", type: 1, func: 1, calc: 0,
        args: [0.5, 1],
        range: 3, prob: 70, sac: 1,
        desc: "Raise ATK of self and adjacent familiars."
    },
    4: {
        name: "Guile of Runes", type: 1, func: 1, calc: 0,
        args: [0.5, 3],
        range: 3, prob: 70, sac: 1,
        desc: "Raise WIS of self and adjacent familiars."
    },
    5: {
        name: "Grace of Winds", type: 1, func: 1, calc: 0,
        args: [0.5, 4],
        range: 3, prob: 70,
        desc: "Raise AGI of self and adjacent familiars."
    },
    6: {
        name: "Blade Break", type: 1, func: 2, calc: 0,
        args: [0.5, 1],
        range: 7, prob: 70,
        desc: "Lower ATK of up to three foes."
    },
    7: {
        name: "Shield Rend", type: 1, func: 2, calc: 0,
        args: [0.5, 2],
        range: 7, prob: 70,
        desc: "Lower DEF of up to three foes."
    },
    8: {
        name: "Mind Rust", type: 1, func: 2, calc: 0,
        args: [0.5, 3],
        range: 7, prob: 70,
        desc: "Lower WIS of up to three foes."
    },
    9: {
        name: "Speed Sap", type: 1, func: 2, calc: 0,
        args: [0.5, 4],
        range: 7, prob: 70, sac: 1,
        desc: "Lower AGI of up to three foes."
    },
    10: {
        name: "Scythe Storm", type: 2, func: 3, calc: 3,
        args: [1],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to all foes."
    },
    11: {
        name: "Torrent of Flame", type: 2, func: 4, calc: 2,
        args: [2],
        range: 8, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy damage to all foes."
    },
    16: {
        name: "Greater Recall", type: 2, func: 6, calc: 0,
        args: [1],
        range: 2, prob: 50, sac: 1,
        desc: "Revive and fully restore HP of adjacent familiars."
    },
    17: {
        name: "Berserk", type: 2, func: 3, calc: 1,
        args: [0.8],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal damage to six random targets."
    },
    18: {
        name: "Rush", type: 2, func: 3, calc: 3,
        args: [0.7],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to six random targets."
    },
    19: {
        name: "Dispell", type: 2, func: 16, calc: 0,
        range: 8, prob: 70, sac: 1,
        desc: "Remove the buffs of all foes."
    },
    20: {
        name: "Recall", type: 2, func: 6, calc: 0,
        args: [1],
        range: 1, prob: 50, sac: 1,
        desc: "Revive an adjacent familiar."
    },
    21: {
        name: "Elixir of Recall", type: 2, func: 6, calc: 0,
        args: [1],
        range: 1, prob: 50,
        desc: "Revive an adjacent familiar."
    },
    23: {
        name: "Breath of Flame", type: 2, func: 4, calc: 2,
        args: [2.5],
        range: 7, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy damage to up to three foes."
    },
    26: {
        name: "Greater Heal", type: 2, func: 18, calc: 4,
        args: [1],
        range: 2, prob: 30,
        desc: "Restore a fixed amount of HP to adjacent familiars."
    },
    27: {
        name: "Greater Healing Sage", type: 2, func: 18, calc: 4,
        args: [1],
        range: 2, prob: 30, sac: 1,
        desc: "Restore a fixed amount of HP to adjacent familiars."
    },
    28: {
        name: "Envenom", type: 2, func: 4, calc: 2,
        args: [1, 1, 1],
        range: 5, prob: 30, ward: 2, sac: 1,
        desc: "Deal damage and poison one foe."
    },
    29: {
        name: "Bind", type: 2, func: 4, calc: 2,
        args: [1, 2, 0.3],
        range: 5, prob: 30, ward: 2, sac: 1,
        desc: "Deal damage and sometimes paralyze one foe."
    },
    33: {
        name: "Whirlwind", type: 2, func: 3, calc: 3,
        args: [2.5],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to three foes."
    },
    34: {
        name: "Massive Assault", type: 2, func: 3, calc: 1,
        args: [4],
        range: 5, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive damage to one foe."
    },
    38: {
        name: "Heal", type: 2, func: 18, calc: 4,
        args: [1],
        range: 1, prob: 30,
        desc: "Restore a fixed amount of HP to an adjacent familiar."
    },
    39: {
        name: "Healing Sage", type: 2, func: 18, calc: 4,
        args: [1],
        range: 1, prob: 30,
        desc: "Restore a fixed amount of HP to an adjacent familiar."
    },
    40: {
        name: "Firestrike", type: 2, func: 4, calc: 2,
        args: [3],
        range: 5, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy damage to one foe."
    },
    41: {
        name: "Blizzard", type: 2, func: 4, calc: 2,
        args: [1, 3, 0.3],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Deal damage and sometimes freeze up to three foes."
    },
    42: {
        name: "Thunderstorm", type: 2, func: 4, calc: 2,
        args: [0.7],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal damage to all foes."
    },
    43: {
        name: "Windlash", type: 2, func: 3, calc: 3,
        args: [1],
        range: 16, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to multiple foes."
    },
    45: {
        name: "Intense Assault", type: 2, func: 3, calc: 1,
        args: [3],
        range: 5, prob: 30, ward: 1, sac: 1,
        desc: "Deal very heavy damage to one foe."
    },
    46: {
        name: "Brawl", type: 2, func: 3, calc: 1,
        args: [1],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Attack three foes."
    },
    47: {
        name: "Blastwave", type: 2, func: 4, calc: 2,
        args: [2],
        range: 12, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy damage to all foes in the front line."
    },
    48: {
        name: "Impale", type: 2, func: 4, calc: 1,
        args: [1],
        range: 6, prob: 30, ward: 1, sac: 1,
        desc: "Deal damage to up to two foes, ignoring position."
    },
    50: {
        name: "Focused Assault", type: 2, func: 3, calc: 1,
        args: [2],
        range: 5, prob: 30, ward: 1,
        desc: "Deal heavy damage to one foe."
    },
    51: {
        name: "Skirmish", type: 2, func: 3, calc: 1,
        args: [1],
        range: 6, prob: 30, ward: 1,
        desc: "Attack up to two foes."
    },
    52: {
        name: "Dervish", type: 2, func: 3, calc: 3,
        args: [2],
        range: 5, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to one foe."
    },
    54: {
        name: "Foul Fang", type: 2, func: 3, calc: 1,
        args: [1, 1, 1],
        range: 5, prob: 30, ward: 1, sac: 1,
        desc: "Poison one foe."
    },
    55: {
        name: "Embrace", type: 2, func: 3, calc: 1,
        args: [0.5, 4, 1],
        range: 5, prob: 30, ward: 1,
        desc: "Deal damage and disable one foe for one turn."
    },
    60: {
        name: "Syphon", type: 3, func: 11, calc: 1,
        args: [1],
        range: 1, prob: 50, sac: 1,
        desc: "Heal an adjacent familiar for the amount of damage taken."
    },
    61: {
        name: "Cloak & Dagger", type: 5, func: 14, calc: 1,
        args: [1],
        range: 2, prob: 50, ward: 1, sac: 1,
        desc: "Take damage in place of nearby ally and counter."
    },
    62: {
        name: "Cloak", type: 5, func: 12, calc: 1,
        args: [1],
        range: 2, prob: 50, sac: 1,
        desc: "Take damage in place of adjacent familiars."
    },
    63: {
        name: "Shroud", type: 5, func: 12, calc: 0,
        range: 4, prob: 50, sac: 1,
        desc: "Take damage in place of familiars."
    },
    64: {
        name: "Riposte", type: 3, func: 13, calc: 1,
        args: [1],
        range: 1, prob: 50, ward: 1, sac: 1,
        desc: "Counterattack after receiving an attack."
    },
    69: {
        name: "Lightning Bolt", type: 2, func: 4, calc: 2,
        args: [3],
        range: 5, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy damage to one foe."
    },
    70: {
        name: "Wind Cutter", type: 2, func: 4, calc: 2,
        args: [3],
        range: 5, prob: 30, ward: 2,
        desc: "Deal heavy damage to one foe."
    },
    71: {
        name: "Icicle", type: 2, func: 4, calc: 2,
        args: [3],
        range: 5, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy damage to one foe."
    },
    77: {
        name: "Blade Break 1", type: 1, func: 2, calc: 0,
        args: [0.1, 1],
        range: 8, prob: 70,
        desc: "Lower ATK of all foes."
    },
    78: {
        name: "Shield Rend 1", type: 1, func: 2, calc: 0,
        args: [0.1, 2],
        range: 8, prob: 70, sac: 1,
        desc: "Lower DEF of all foes."
    },
    79: {
        name: "Mind Rust 1", type: 1, func: 2, calc: 0,
        args: [0.1, 3],
        range: 8, prob: 70,
        desc: "Lower WIS of all foes."
    },
    80: {
        name: "Speed Sap 1", type: 1, func: 2, calc: 0,
        args: [0.1, 4],
        range: 8, prob: 70,
        desc: "Lower AGI of all foes."
    },
    81: {
        name: "Boon of Blade & Shield 2", type: 1, func: 1, calc: 0,
        args: [0.2, 1, 2],
        range: 4, prob: 70, sac: 1,
        desc: "Raise ATK and DEF of all familiars."
    },
    85: {
        name: "Grace of Winds 2", type: 1, func: 1, calc: 0,
        args: [0.2, 4],
        range: 4, prob: 70, sac: 1,
        desc: "Raise AGI of all familiars."
    },
    86: {
        name: "Blade Break 2", type: 1, func: 2, calc: 0,
        args: [0.2, 1],
        range: 8, prob: 70, sac: 1,
        desc: "Lower ATK of all foes."
    },
    87: {
        name: "Shield Rend 2", type: 1, func: 2, calc: 0,
        args: [0.2, 2],
        range: 8, prob: 70,
        desc: "Lower DEF of all foes."
    },
    88: {
        name: "Mind Rust 2", type: 1, func: 2, calc: 0,
        args: [0.2, 3],
        range: 8, prob: 70, sac: 1,
        desc: "Lower WIS of all foes."
    },
    89: {
        name: "Speed Sap 2", type: 1, func: 2, calc: 0,
        args: [0.2, 4],
        range: 8, prob: 70, sac: 1,
        desc: "Lower AGI of all foes."
    },
    94: {
        name: "Grace of Winds 3", type: 1, func: 1, calc: 0,
        args: [0.3, 4],
        range: 4, prob: 70, sac: 1,
        desc: "Raise AGI of all familiars."
    },
    95: {
        name: "Blade Break 3", type: 1, func: 2, calc: 0,
        args: [0.3, 1],
        range: 8, prob: 70, sac: 1,
        desc: "Lower ATK of all foes."
    },
    96: {
        name: "Shield Rend 3", type: 1, func: 2, calc: 0,
        args: [0.3, 2],
        range: 8, prob: 70, sac: 1,
        desc: "Lower DEF of all foes."
    },
    97: {
        name: "Mind Rust 3", type: 1, func: 2, calc: 0,
        args: [0.3, 3],
        range: 8, prob: 70, sac: 1,
        desc: "Lower WIS of all foes."
    },
    98: {
        name: "Speed Sap 3", type: 1, func: 2, calc: 0,
        args: [0.3, 4],
        range: 8, prob: 70, sac: 1,
        desc: "Lower AGI of all foes."
    },
    104: {
        name: "Blade Break 4", type: 1, func: 2, calc: 0,
        args: [0.4, 1],
        range: 8, prob: 70,
        desc: "Lower ATK of all foes."
    },
    105: {
        name: "Shield Rend 4", type: 1, func: 2, calc: 0,
        args: [0.4, 2],
        range: 8, prob: 70, sac: 1,
        desc: "Lower DEF of all foes."
    },
    106: {
        name: "Mind Rust 4", type: 1, func: 2, calc: 0,
        args: [0.4, 3],
        range: 8, prob: 70,
        desc: "Lower WIS of all foes."
    },
    107: {
        name: "Speed Sap 4", type: 1, func: 2, calc: 0,
        args: [0.4, 4],
        range: 8, prob: 70,
        desc: "Lower AGI of all foes."
    },
    108: {
        name: "Icestorm", type: 2, func: 4, calc: 2,
        args: [2],
        range: 8, prob: 30, ward: 3, sac: 1,
        desc: "Deal ice damage to all foes."
    },
    109: {
        name: "Plasma field", type: 2, func: 4, calc: 2,
        args: [2],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal lightning damage to all foes."
    },
    110: {
        name: "Typhoon", type: 2, func: 4, calc: 3,
        args: [2],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage to all foes."
    },
    111: {
        name: "Whorl of Wisdom", type: 2, func: 4, calc: 2,
        args: [1],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to three foes."
    },
    112: {
        name: "Whorl of Attack", type: 2, func: 3, calc: 1,
        args: [1],
        range: 16, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to three foes."
    },
    113: {
        name: "Thundercloud", type: 2, func: 4, calc: 2,
        args: [1, 2, 0.3],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Deal damage and sometimes paralyze up to three foes."
    },
    114: {
        name: "Electric Shock", type: 2, func: 4, calc: 2,
        args: [2.5],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy lightning damage to up to three foes."
    },
    115: {
        name: "Venomstorm", type: 2, func: 3, calc: 1,
        args: [1.5, 1, 1],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy poison damage to three foes."
    },
    116: {
        name: "Mass Greater Heal", type: 2, func: 18, calc: 4,
        args: [0.7],
        range: 4, prob: 30, sac: 1,
        desc: "Restore a fixed amount of HP to all party members."
    },
    117: {
        name: "Hellfire", type: 2, func: 4, calc: 2,
        args: [1],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Hurl a ball of flame to damage all foes."
    },
    118: {
        name: "Slashing Blade", type: 2, func: 3, calc: 1,
        args: [1],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes."
    },
    119: {
        name: "Flash of Rage", type: 2, func: 4, calc: 2,
        args: [0.9],
        range: 17, prob: 30, ward: 2, sac: 1,
        desc: "Call down six random lightning bolts on foes."
    },
    120: {
        name: "Boon of Mind & Shield 2", type: 1, func: 1, calc: 0,
        args: [0.2, 3, 2],
        range: 4, prob: 70, sac: 1,
        desc: "Raise WIS and DEF of all party members."
    },
    121: {
        name: "Charge", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to three foes, regardless of his position."
    },
    122: {
        name: "Frontal Onslaught", type: 2, func: 3, calc: 1,
        args: [1.5],
        range: 12, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy damage to the front line."
    },
    123: {
        name: "Flame Fist", type: 2, func: 3, calc: 1,
        args: [1.7],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy fire damage to three random targets."
    },
    124: {
        name: "Ice Fist", type: 2, func: 3, calc: 1,
        args: [1.7],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ice damage to three random targets."
    },
    125: {
        name: "Shield & Dagger", type: 5, func: 14, calc: 1,
        args: [1],
        range: 4, prob: 50, ward: 1, sac: 1,
        desc: "Take damage in place of any ally and counter."
    },
    127: {
        name: "Poison Fang", type: 2, func: 4, calc: 2,
        args: [1, 1, 0.3],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal damage and sometimes poison three random targets."
    },
    128: {
        name: "Whiteout", type: 2, func: 4, calc: 2,
        args: [2.3, 3, 0.3],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy damage and sometimes freeze up to three foes."
    },
    129: {
        name: "Fire Whirlwind", type: 2, func: 4, calc: 2,
        args: [1],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal damage to three foes."
    },
    131: {
        name: "Bloodlust Lance", type: 2, func: 4, calc: 1,
        args: [1],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes, ignoring position."
    },
    132: {
        name: "Boon of Blade & Wind 2", type: 1, func: 1, calc: 0,
        args: [0.2, 1, 4],
        range: 4, prob: 70, sac: 1,
        desc: "Raise ATK and AGI of all party members."
    },
    133: {
        name: "Blade Ward 2", type: 1, func: 1, calc: 0,
        args: [0.4, 5],
        range: 4, prob: 70, sac: 1,
        desc: "Reduce physical damage taken by all allies."
    },
    134: {
        name: "Magic Ward 2", type: 1, func: 1, calc: 0,
        args: [0.4, 6],
        range: 4, prob: 70, sac: 1,
        desc: "Reduce magic damage taken by all allies."
    },
    135: {
        name: "Breath Ward 2", type: 1, func: 1, calc: 0,
        args: [0.4, 7],
        range: 4, prob: 70,
        desc: "Reduce breath damage taken by all allies."
    },
    136: {
        name: "Breath Ward", type: 1, func: 1, calc: 0,
        args: [0.7, 7],
        range: 3, prob: 70, sac: 1,
        desc: "Reduce breath damage taken by self and adjacent familiars."
    },
    137: {
        name: "Binding Arcana", type: 2, func: 3, calc: 1,
        args: [1, 5, 0.3, 3],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal four physical strikes that sometimes silence foes."
    },
    138: {
        name: "Head Bash", type: 2, func: 3, calc: 1,
        args: [3],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy physical damage to two random targets."
    },
    139: {
        name: "Mad Dash", type: 2, func: 3, calc: 1,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal Massive ATK-based damage to two random foes."
    },
    140: {
        name: "Numbing Touch", type: 2, func: 3, calc: 1,
        args: [1, 2, 0.7],
        range: 5, prob: 70, ward: 1, sac: 1,
        desc: "Cause attacks to have a high chance to paralyze foes."
    },
    141: {
        name: "Burning Rage", type: 2, func: 4, calc: 2,
        args: [0.9],
        range: 17, prob: 30, ward: 2, sac: 1,
        desc: "Engulf six random foes in flames."
    },
    142: {
        name: "Barrage", type: 2, func: 3, calc: 1,
        args: [0.9],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal physical damage to five random targets."
    },
    143: {
        name: "Sonic Boom", type: 2, func: 7, calc: 1,
        args: [1, 0.1],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Damage all foes. May kill targets outright."
    },
    144: {
        name: "Windcrush", type: 2, func: 4, calc: 2,
        args: [1],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy damage to four foes."
    },
    145: {
        name: "Mass Greater Heal 2", type: 2, func: 18, calc: 4,
        args: [2],
        range: 4, prob: 30, sac: 1,
        desc: "Restore a fixed amount of HP to all party members."
    },
    146: {
        name: "Ritual of Binding", type: 1, func: 19, calc: 0,
        args: [0, 5, 0.3, 3],
        range: 8, prob: 70, sac: 1,
        desc: "Chance to silence all foes at beginning of battle."
    },
    147: {
        name: "Spirit Curse", type: 2, func: 4, calc: 2,
        args: [1, 4, 0.3],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal damage and sometimes disable three random foes."
    },
    148: {
        name: "Windblast", type: 2, func: 22, calc: 2,
        args: [1.5, 4, 0.3, 0.2],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal damage and sometimes lower AGI of three foes."
    },
    149: {
        name: "Spiteful Strike", type: 2, func: 21, calc: 1,
        args: [1, 2, 0.3, 0.2],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal damage to all foes and sometimes lower DEF."
    },
    150: {
        name: "Grin and Bear It", type: 3, func: 20, calc: 0,
        args: [0.5],
        range: 21, prob: 70, sac: 1,
        desc: "Survive devastating damage as long as HP is above 50%."
    },
    152: {
        name: "Mad Swing", type: 2, func: 4, calc: 1,
        args: [1.7],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy damage to up to three foes with a mighty swing."
    },
    153: {
        name: "Onfall", type: 2, func: 4, calc: 1,
        args: [4],
        range: 5, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive damage with dual blades to one foe."
    },
    154: {
        name: "Cloak & Dagger 2", type: 5, func: 14, calc: 1,
        args: [1.5],
        range: 2, prob: 50, ward: 1, sac: 1,
        desc: "Take heavy damage in place of nearby ally and counter."
    },
    155: {
        name: "Firecell Roar", type: 2, func: 22, calc: 2,
        args: [1.5, 1, 0.3, 0.2],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Three random fire strikes that sometimes lower ATK."
    },
    156: {
        name: "Rebuke", type: 2, func: 3, calc: 3,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to two random foes."
    },
    157: {
        name: "Rally Cry", type: 1, func: 1, calc: 0,
        args: [0.1, 9],
        range: 4, prob: 70, sac: 1,
        desc: "Raise ATK, DEF, WIS and AGI of all party members."
    },
    160: {
        name: "Ice Fang", type: 2, func: 4, calc: 1,
        args: [1.5, 3, 0.3],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ice damage and sometimes freeze three foes."
    },
    161: {
        name: "Shadow Strike", type: 2, func: 3, calc: 3,
        args: [1],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to four random foes."
    },
    163: {
        name: "Poison Mist", type: 2, func: 4, calc: 2,
        args: [2.3, 1, 0.3],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive damage and sometimes poison up to three foes."
    },
    164: {
        name: "Boon of Mind & Blade 2", type: 1, func: 1, calc: 0,
        args: [0.2, 1, 3],
        range: 4, prob: 70, sac: 1,
        desc: "Raise the ATK and WIS of all party members."
    },
    165: {
        name: "Furious Cannon", type: 2, func: 22, calc: 2,
        args: [1, 1, 0.3, 0.5],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal fire damage to all foes and sometimes lower ATK."
    },
    166: {
        name: "Payback", type: 3, func: 13, calc: 1,
        args: [2.3],
        range: 21, prob: 50, ward: 1, sac: 1,
        desc: "Chance to unleash a massive counter attack when struck."
    },
    167: {
        name: "Bulwark", type: 1, func: 1, calc: 0,
        args: [0.4, 5],
        range: 3, prob: 70, sac: 1,
        desc: "Reduce physical damage taken by self and nearby familiars."
    },
    168: {
        name: "Frost and Ice", type: 2, func: 4, calc: 2,
        args: [0.8, 3, 0.3],
        range: 17, prob: 30, ward: 2, sac: 1,
        desc: "Deal damage and sometimes freeze six random foes."
    },
    169: {
        name: "Silent Cheer", type: 1, func: 1, calc: 0,
        args: [0.2, 8],
        range: 2, prob: 70, sac: 1,
        desc: "Raise the skill trigger rate of adjacent familiars."
    },
    170: {
        name: "War Dance", type: 2, func: 4, calc: 3,
        args: [1.5],
        range: 15, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy AGI-based damage to foes in front and middle."
    },
    175: {
        name: "Lifesaver", type: 2, func: 18, calc: 4,
        args: [2],
        range: 2, prob: 30, sac: 1,
        desc: "Restore a large amount of HP to adjacent familiars."
    },
    177: {
        name: "Divine Shield", type: 1, func: 1, calc: 0,
        args: [0.65, 5],
        range: 21, prob: 70, sac: 1,
        desc: "Escape most damage from physical attacks."
    },
    178: {
        name: "Light Fist", type: 2, func: 3, calc: 1,
        args: [1.7],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy lightning damage to three random targets."
    },
    179: {
        name: "Sword of Justice", type: 2, func: 3, calc: 3,
        args: [2.5],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive AGI-based damage to two random foes."
    },
    180: {
        name: "Proxy Counter", type: 5, func: 14, calc: 1,
        args: [1],
        range: 28, prob: 50, ward: 1, sac: 1,
        desc: "Take damage in place of familiars to its right and counter."
    },
    185: {
        name: "Thunderclap", type: 2, func: 4, calc: 2,
        args: [0.7, 2, 0.3],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to five random foes and sometimes paralyze them."
    },
    186: {
        name: "Razor Claws", type: 2, func: 3, calc: 1,
        args: [2, 2, 0.5],
        range: 6, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive damage and sometimes paralyze up to two foes."
    },
    187: {
        name: "Mega Shot", type: 2, func: 4, calc: 1,
        args: [4],
        range: 5, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to one foe, ignoring position."
    },
    188: {
        name: "Shatter Armor", type: 2, func: 21, calc: 1,
        args: [3, 2, 0.3, 0.3],
        range: 5, prob: 30, ward: 1, sac: 1,
        desc: "Deal a heavy blow to one foe,sometimes lowering DEF."
    },
    193: {
        name: "Angler", type: 2, func: 24, calc: 0,
        range: 21, prob: 50, sac: 1,
        randSkills: [10, 11, 16, 18, 19, 20, 21, 26, 27, 28, 29, 34, 38, 39, 41, 42, 43, 45, 46, 47, 48, 50,
            51, 52, 54, 55, 69, 70, 108, 110, 111, 113, 114, 115, 116, 117, 118, 119, 121, 122, 123, 124, 127,
            129, 131, 137, 138, 139, 140, 144, 145, 147, 148, 149, 152, 153, 155, 156, 160, 161, 163, 175, 187, 188, 197, 198, 206],
        desc: "Not even its user knows what this skill will do."
    },
    195: {
        name: "Warrior's Wrath", type: 2, func: 3, calc: 1,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },
    196: {
        name: "Spark Shot", type: 2, func: 3, calc: 1,
        args: [0.8],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to four random foes."
    },
    197: {
        name: "Revitalize", type: 2, func: 18, calc: 4,
        args: [1.5],
        range: 4, prob: 30, sac: 1,
        desc: "Restore HP to all party members."
    },
    198: {
        name: "Flame Rasp", type: 2, func: 4, calc: 2,
        args: [1.3],
        range: 7, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy damage to up to three foes."
    },
    199: {
        name: "Cruelest Touch", type: 2, func: 3, calc: 1,
        args: [0.75, 1, 0.25],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage and sometimes poison six random foes."
    },
    202: {
        name: "Trial by Fire", type: 2, func: 4, calc: 2,
        args: [2],
        range: 6, prob: 30, ward: 3,
        desc: "Deal massive WIS-based fire damage to up to two foes."
    },
    203: {
        name: "Trial by Ice", type: 2, func: 4, calc: 2,
        args: [2, 3, 0.3],
        range: 6, prob: 30, ward: 3,
        desc: "Deal massive WIS-based damage to up to two foes, and sometimes freeze target."
    },
    204: {
        name: "Frozen Spear", type: 2, func: 4, calc: 2,
        args: [3, 3, 0.7],
        range: 5, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive damage and sometimes freeze one foe."
    },
    205: {
        name: "Crushing Hammer", type: 2, func: 4, calc: 1,
        args: [1, 3, 0.3],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal physical damage and sometimes freeze all foes."
    },
    206: {
        name: "Dance of Petals", type: 2, func: 4, calc: 3,
        args: [1],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage to three random foes, ignoring position."
    },
    210: {
        name: "Poison Spout", type: 2, func: 4, calc: 2,
        args: [1.2, 1, 0.3],
        range: 19, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage and sometimes poison four random foes."
    },
    211: {
        name: "Requiem", type: 2, func: 3, calc: 1,
        args: [1, 5, 0.3, 3],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal physical damage and sometimes silence all foes."
    },
    212: {
        name: "Ghasthunt", type: 2, func: 3, calc: 2,
        args: [1.2],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal WIS-based damage to four random foes."
    },
    214: {
        name: "Blade of Madness", type: 2, func: 3, calc: 1,
        args: [1.35],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes."
    },
    216: {
        name: "Bodycheck", type: 2, func: 3, calc: 1,
        args: [2.5],
        range: 6, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to up to two foes."
    },
    217: {
        name: "Harrowing Trial", type: 2, func: 4, calc: 2,
        args: [2.5],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes."
    },
    218: {
        name: "Boulder Toss", type: 2, func: 3, calc: 1,
        args: [1.4, 2, 0.3],
        range: 15, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage and sometimes paralyze front/middles lines."
    },
    219: {
        name: "Evil Eye", type: 2, func: 21, calc: 3,
        args: [1.2, 4, 0.3, 0.3],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage and sometimes lower AGI of all foes."
    },
    221: {
        name: "Skittering Darkness", type: 2, func: 3, calc: 1,
        args: [1.5],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },
    222: {
        name: "Boastful Blade", type: 2, func: 3, calc: 1,
        args: [1.9],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },
    224: {
        name: "Feather Shot", type: 2, func: 4, calc: 1,
        args: [2.1],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to three random foes."
    },
    225: {
        name: "Wings of Winter", type: 2, func: 3, calc: 3,
        args: [0.8],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to five random foes."
    },
    226: {
        name: "Pirate's Pride", type: 2, func: 4, calc: 2,
        args: [1.8, 2, 0.3],
        range: 15, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage and sometimes paralyze front/middle lines."
    },
    227: {
        name: "Muscle Play", type: 2, func: 3, calc: 1,
        args: [1.65],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to up to three foes."
    },
    228: {
        name: "Mecha Rush", type: 2, func: 4, calc: 1,
        args: [1.8],
        range: 14, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to all foes in the rear line."
    },
    229: {
        name: "Spirit Word", type: 2, func: 3, calc: 2,
        args: [2.1],
        range: 16, prob: 30, ward: 1,
        desc: "Deal massive WIS-based damage to three random foes."
    },
    231: {
        name: "Rolling Thunder", type: 2, func: 21, calc: 3,
        args: [1.25, 1, 0.3, 0.2],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to all foes and sometimes lower ATK."
    },
    232: {
        name: "Lightning Web", type: 2, func: 4, calc: 2,
        args: [2.15, 2, 0.3],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage and sometimes paralyze three foes."
    },
    234: {
        name: "Lightning Spirits", type: 2, func: 4, calc: 2,
        args: [1.15],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to five random foes."
    },
    236: {
        name: "Flash", type: 2, func: 4, calc: 2,
        args: [2.25],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to three random foes, ignoring position."
    },
    237: {
        name: "Piercing Claws", type: 2, func: 4, calc: 2,
        args: [2.15],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to up to three foes, ignoring position."
    },
    238: {
        name: "Shadow Slash", type: 2, func: 3, calc: 1,
        args: [1.05],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to four random foes."
    },
    239: {
        name: "Dark Rush", type: 2, func: 4, calc: 3,
        args: [2],
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive AGI-based damage to three random foes, ignoring position."
    },
    240: {
        name: "Midnight Smile", type: 1, func: 1, calc: 0,
        args: [0.2, 4],
        range: 3, prob: 70,
        desc: "Raise AGI of self and adjacent familiars at start of battle."
    },
    241: {
        name: "Chilling Blast", type: 2, func: 3, calc: 1,
        args: [1.7, 3, 0.3],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage and sometimes freeze three random foes."
    },
    242: {
        name: "Glacial Blade", type: 2, func: 4, calc: 2,
        args: [1.7, 3, 0.3],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage and sometimes freeze up to three foes, ignoring position."
    },
    244: {
        name: "High Spirits", type: 2, func: 4, calc: 2,
        args: [1.6],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },
    245: {
        name: "Brave Blade", type: 2, func: 4, calc: 2,
        args: [1.2],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to all foes, ignoring position."
    },
    248: {
        name: "Venomwing Dance", type: 2, func: 3, calc: 3,
        args: [1.45, 1, 0.3],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage and randomly poison four foes."
    },
    249: {
        name: "Steelscales", type: 2, func: 3, calc: 1,
        args: [0.9],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to six random foes."
    },
    250: {
        name: "Goddess of the Deep", type: 2, func: 3, calc: 3,
        args: [1.6],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to up to three foes."
    },
    251: {
        name: "Hungry Beak", type: 2, func: 3, calc: 1,
        args: [1],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes."
    },
    252: {
        name: "Scathing Fire Brand", type: 2, func: 3, calc: 1,
        args: [1.5],
        range: 15, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to all foes in the front/middle line."
    },
    253: {
        name: "Brutal Fist", type: 2, func: 3, calc: 1,
        args: [2.1],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },
    254: {
        name: "Roving Fang", type: 2, func: 3, calc: 3,
        args: [1.6],
        range: 12, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to all foes in the front line."
    },
    256: {
        name: "Silent Madness", type: 2, func: 3, calc: 1,
        args: [1.3],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three foes."
    },
    258: {
        name: "Fatal Kiss", type: 2, func: 4, calc: 2,
        args: [1.35],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to all foes, ignoring position."
    },
    259: {
        name: "Hell Spark", type: 2, func: 3, calc: 1,
        args: [1.1],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to four random foes."
    },
    260: {
        name: "Curse of Ages", type: 2, func: 21, calc: 3,
        args: [0.7, 1, 0.3, 0.2],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to six random foes and sometimes lower ATK."
    },
    261: {
        name: "Groundswell", type: 2, func: 4, calc: 2,
        args: [1.15],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to all foes, ignoring position."
    },
    263: {
        name: "Judgment", type: 2, func: 3, calc: 1,
        args: [1.75],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to up to three foes."
    },
    264: {
        name: "Bone Crush", type: 2, func: 3, calc: 1,
        args: [1.95],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to three random foes."
    },
    265: {
        name: "Ancient Feast", type: 1, func: 1, calc: 0,
        args: [0.5, 1],
        range: 3, prob: 70, sac: 1,
        desc: "Raise ATK of self and adjacent familiars at beginning of battle."
    },
    267: {
        name: "Swordmaster", type: 2, func: 3, calc: 3,
        args: [2.4],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive AGI-based damage to up to three foes."
    },
    268: {
        name: "Gaoler's Torment", type: 2, func: 3, calc: 3,
        args: [1.65],
        range: 15, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to front/middle lines."
    },
    269: {
        name: "Tears of the Hideous", type: 2, func: 4, calc: 3,
        args: [2.05],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive AGI-based damage to three random foes, ignoring position."
    },
    270: {
        name: "Withering Flame", type: 2, func: 4, calc: 2,
        args: [1.7],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },
    271: {
        name: "Scales of Tranquility", type: 1, func: 19, calc: 0,
        args: [0, 5, 0.45, 1],
        range: 7, prob: 70,
        desc: "Chance to silence up to three foes for one turn at start of battle."
    },
    272: {
        name: "Bewitching Wings", type: 2, func: 4, calc: 2,
        args: [2.5],
        range: 23, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },
    273: {
        name: "Stirring Kiss", type: 2, func: 6, calc: 0,
        args: [1],
        range: 2, prob: 50,
        desc: "Revive and fully restore HP of adjacent familiars."
    },
    274: {
        name: "Eternal Sleep", type: 2, func: 3, calc: 3,
        args: [1.5],
        range: 32, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to up to four foes."
    },
    275: {
        name: "Blinding Light", type: 2, func: 4, calc: 2,
        args: [1.7],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to three random foes, ignoring position."
    },
    276: {
        name: "Divine Grief", type: 2, func: 4, calc: 2,
        args: [2],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },
    277: {
        name: "Nightmarish Notion", type: 2, func: 4, calc: 2,
        args: [1.1, 3, 0.3],
        range: 20, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage and sometimes freeze five random foes, ignoring position."
    },
    280: {
        name: "Snake Charmer", type: 2, func: 4, calc: 2,
        args: [2.05],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to three random foes, ignoring position."
    },
    281: {
        name: "Snake Eyes", type: 2, func: 4, calc: 2,
        args: [2.1, 2, 0.3],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage and sometimes paralyze up to three foes."
    },
    282: {
        name: "Corpse Hymn", type: 2, func: 4, calc: 3,
        args: [1],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage to five random foes, ignoring position."
    },
    285: {
        name: "Moon Soul", type: 2, func: 4, calc: 2,
        args: [1.45],
        range: 15, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to front/middle lines, ignoring position."
    },
    287: {
        name: "Staff of Knowledge", type: 2, func: 18, calc: 4,
        args: [1.3],
        range: 3, prob: 70,
        desc: "High chance to restore HP to self and adjacent familiars."
    },
    288: {
        name: "Chain Attack", type: 2, func: 4, calc: 2,
        args: [0.95],
        range: 17, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },
    289: {
        name: "Quakeblade", type: 2, func: 3, calc: 1,
        args: [1.35],
        range: 15, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to front/middle lines."
    },
    291: {
        name: "Grin and Bear It 2", type: 3, func: 20, calc: 0,
        args: [0.01],
        range: 21, prob: 70,
        desc: "Survive devastating damage as long as HP is above 1%."
    },
    292: {
        name: "Golden Rule", type: 2, func: 4, calc: 1,
        args: [2.1],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to up to three foes, ignoring position."
    },
    293: {
        name: "Cruel Flame", type: 2, func: 4, calc: 1,
        args: [1.7],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to four random foes, ignoring position."
    },
    294: {
        name: "Mocking Laugh", type: 2, func: 3, calc: 1,
        args: [2.5],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },
    295: {
        name: "Dream Lure", type: 1, func: 19, calc: 0,
        args: [0, 4, 0.25],
        range: 7, prob: 70,
        desc: "Sometimes disable up to three foes at start of battle."
    },
    296: {
        name: "Blood Offering", type: 2, func: 4, calc: 1,
        args: [1.2, 4, 0.3],
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage and disable six random foes, ignoring position."
    },
    297: {
        name: "Awe of the Wild", type: 2, func: 4, calc: 3,
        args: [2.15],
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive AGI-based damage to three random foes, ignoring position."
    },
    298: {
        name: "Freezing Scales", type: 2, func: 4, calc: 2,
        args: [1.35, 3, 0.3],
        range: 8, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage to all foes  and sometimes freeze them, ignoring position."
    },
    299: {
        name: "Crazed Axe", type: 2, func: 3, calc: 1,
        args: [1.7],
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },
    301: {
        name: "Fortitude", type: 3, func: 20, calc: 0,
        args: [0.2],
        range: 21, prob: 70,
        desc: "Survive devastating damage as long as HP is above 20%."
    },
    302: {
        name: "Ice Wall", type: 2, func: 4, calc: 2,
        args: [1.4],
        range: 8, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage to all foes, ignoring position."
    },
    303: {
        name: "Chill Horn", type: 2, func: 3, calc: 2,
        args: [1.9],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy WIS-based damage to three random foes, ignoring position."
    },
    304: {
        name: "Ferocious Omen", type: 1, func: 1, calc: 0,
        args: [0.1, 1],
        range: 3, prob: 70, sac: 1,
        desc: "Raise ATK of self and adjacent familiars."
    },
    305: {
        name: "Dancing Flame", type: 2, func: 4, calc: 2,
        args: [1.3],
        range: 19, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage to four random foes, ignoring position."
    },
    307: {
        name: "Evil Wink", type: 2, func: 3, calc: 2,
        args: [1.8],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy WIS-based damage to three random foes, ignoring position."
    },
    308: {
        name: "Bloodied Hands", type: 2, func: 4, calc: 2,
        args: [1.7],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes."
    },
    311: {
        name: "Black Phantasm", type: 2, func: 3, calc: 1,
        args: [1.75],
        range: 6, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to up to two foes."
    },
    312: {
        name: "Demon Spear", type: 2, func: 3, calc: 1,
        args: [1.75],
        range: 6, prob: 30, ward: 1,
        desc: "A spear technique from the West. Deal heavy ATK-based damage to up to two foes."
    },
    313: {
        name: "White Ruin", type: 2, func: 4, calc: 2,
        args: [1.5],
        range: 8, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy WIS-based damage to all foes, ignoring position."
    },
    314: {
        name: "Fearless Laugh", type: 2, func: 3, calc: 1,
        args: [1.3],
        range: 32, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to up to four foes."
    },
    315: {
        name: "Trembling Horn", type: 2, func: 3, calc: 1,
        args: [1.3],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to four random foes."
    },
    316: {
        name: "Healing Prism", type: 3, func: 11, calc: 1,
        args: [1],
        range: 3, prob: 30,
        desc: "Convert damage to heal self and adjacent familiars."
    },
    317: {
        name: "Mad Swing 2", type: 2, func: 4, calc: 1,
        args: [1.9],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy damage to up to three foes with a mighty swing."
    },
    318: {
        name: "Frontier Spirit", type: 2, func: 3, calc: 1,
        args: [1.1],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes."
    },
    319: {
        name: "Magic Overwhelming", type: 2, func: 4, calc: 2,
        args: [1.55],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },
    320: {
        name: "Mystic Teachings", type: 1, func: 1, calc: 0,
        args: [0.1, 3],
        range: 3, prob: 70,
        desc: "Raise WIS of self and adjacent familiars at beginning of battle."
    },
    321: {
        name: "Roaring Blood", type: 2, func: 3, calc: 2,
        args: [0.95],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal WIS-based damage to six random foes."
    },
    322: {
        name: "Cruel Dance", type: 2, func: 4, calc: 3,
        args: [1.5],
        range: 15, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy AGI-based damage to front/middle lines, ignoring position."
    },
    325: {
        name: "Rippling Flame", type: 2, func: 3, calc: 1,
        args: [1.85],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },
    326: {
        name: "Heart of the Warrior", type: 2, func: 3, calc: 1,
        args: [1.6],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },
    327: {
        name: "Test of Courage", type: 2, func: 3, calc: 1,
        args: [1.6],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },
    328: {
        name: "Rime Fist", type: 2, func: 4, calc: 2,
        args: [1.4, 3, 0.3],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes freeze five random foes, ignoring position."
    },
    329: {
        name: "Backstep", type: 5, func: 27, calc: 0,
        args: [2, 3, 78, 79],
        range: 21, prob: 50,
        desc: "Evade enemy AGI-based attack skills."
    },
    330: {
        name: "Dark Blessing", type: 1, func: 19, calc: 0,
        args: [0, 5, 0.45, 1],
        range: 7, prob: 70,
        desc: "Chance to silence up to three foes for one turn at start of battle."
    },
    331: {
        name: "Light Divine", type: 2, func: 4, calc: 2,
        args: [1.2],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },
    333: {
        name: "Cold-Blooded Smile", type: 2, func: 3, calc: 3,
        args: [1.2, 3, 0.3],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage and sometimes freeze all foes."
    },
    334: {
        name: "Gift of Terror", type: 2, func: 4, calc: 2,
        args: [1.5],
        range: 16, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to three random foes."
    },
    336: {
        name: "Golden Flame", type: 2, func: 4, calc: 2,
        args: [1.65],
        range: 15, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy WIS-based damage to all foes in the front/middle lines, ignoring position."
    },
    339: {
        name: "Burning Scales", type: 2, func: 4, calc: 2,
        args: [2],
        range: 15, prob: 30, ward: 3, sac: 1,
        desc: "Deal massive WIS-based damage to all foes in the front/middle lines, ignoring position."
    },
    340: {
        name: "Penance", type: 2, func: 3, calc: 1,
        args: [1.25],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes."
    },
    341: {
        name: "Staff of Ages", type: 2, func: 3, calc: 3,
        args: [1.15],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to four random foes."
    },
    342: {
        name: "Shadow Master", type: 1, func: 1, calc: 0,
        args: [0.3, 17, 1.25],
        range: 3, prob: 70,
        desc: "Raise HP of self and adjacent familiars at beginning of battle."
    },
    343: {
        name: "Curiosity", type: 2, func: 21, calc: 2,
        args: [1.5, 4, 0.3, 0.3],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy WIS-based damage to all foes, sometimes lowering AGI."
    },
    345: {
        name: "Wheel of Death", type: 2, func: 4, calc: 2,
        args: [2.2],
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to three random foes, ignoring position."
    },
    346: {
        name: "Hellish Rebirth", type: 2, func: 6, calc: 0,
        args: [1],
        range: 101, prob: 50,
        desc: "Revive and fully restore HP of 1 random familiar."
    },
    347: {
        name: "Raging Flames", type: 2, func: 3, calc: 3,
        args: [2.4],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive AGI-based damage to three random foes."
    },
    348: {
        name: "Inferno", type: 2, func: 3, calc: 1,
        args: [1.4],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to four random foes."
    },
    349: {
        name: "Staff of Tyranny", type: 2, func: 3, calc: 1,
        args: [1.55],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },
    351: {
        name: "Sword of Fealty", type: 2, func: 3, calc: 1,
        args: [1.3],
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to four random foes."
    },
    352: {
        name: "Spell of Revival", type: 1, func: 1, calc: 0,
        args: [355, 16],
        range: 3, prob: 70,
        desc: "Self and adjacent allies are automatically revived after being killed."
    },
    353: {
        name: "Icerend Claws", type: 2, func: 3, calc: 1,
        args: [1.45, 3, 0.3],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to three random foes and sometimes freeze them."
    },
    354: {
        name: "Venomspray Staff", type: 2, func: 4, calc: 2,
        args: [2.9, 1, 0.3, 15],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes and sometimes envenom them."
    },
    355: {
        name: "Dawn's Light", type: 16, func: 6, calc: 0,
        args: [0.5],
        range: 21, prob: 100,
        desc: "-"
    },
    356: {
        name: "Wicked Bolt", type: 2, func: 4, calc: 2,
        args: [1.95],
        range: 16, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to three random foes, ignoring position."
    },
    357: {
        name: "Welkin Wings", type: 2, func: 3, calc: 3,
        args: [1.75],
        range: 12, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to all foes in the front line."
    },
    358: {
        name: "Call of Steel", type: 2, func: 3, calc: 1,
        args: [1.3, 5, 0.1, 3],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage and sometimes silence four random foes."
    },
    359: {
        name: "Seeping Darkness", type: 2, func: 3, calc: 1,
        args: [1.25],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to three random foes."
    },
    360: {
        name: "Curse of Wrath", type: 2, func: 4, calc: 2,
        args: [1],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },
    361: {
        name: "Resplendent Light", type: 2, func: 3, calc: 1,
        args: [1],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes."
    },
    362: {
        name: "Rite of Vengeance", type: 2, func: 3, calc: 1,
        args: [1.85],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to two random foes."
    },
    364: {
        name: "Depths of Corruption", type: 2, func: 4, calc: 1,
        args: [1.95],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to up to three foes, ignoring position."
    },
    365: {
        name: "Bug Attack", type: 2, func: 4, calc: 1,
        args: [1.95],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes, ignoring position."
    },
    366: {
        name: "Bone Chill", type: 2, func: 4, calc: 2,
        args: [1.7],
        range: 32, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy WIS-based damage to up to four foes, ignoring position."
    },
    367: {
        name: "Howl", type: 2, func: 3, calc: 3,
        args: [0.9],
        range: 20, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to five random foes."
    },
    369: {
        name: "Stone Rain", type: 2, func: 3, calc: 1,
        args: [1.45],
        range: 7, prob: 30, ward: 1,
        desc: "Deal ATK-based damage up to three foes."
    },
    370: {
        name: "Dust Cloud", type: 1, func: 1, calc: 0,
        args: [1, 18],
        range: 132, prob: 70,
        desc: "Allows two random allies to perform an extra action during the next turn."
    },
    371: {
        name: "Battle Hierarchy", type: 1, func: 31, calc: 0,
        args: [1, 1],
        range: 4, prob: 70, sac: 1,
        desc: "Change the attack order by ATK for one turn."
    },
    372: {
        name: "Curse Foil", type: 3, func: 13, calc: 1,
        args: [1.3],
        range: 21, prob: 50, ward: 1, sac: 1,
        desc: "Chance to unleash a counter attack when struck."
    },
    374: {
        name: "Streaming Feathers", type: 3, func: 11, calc: 1,
        args: [1],
        range: 3, prob: 50,
        desc: "Convert damage to heal self and adjacent familiars."
    },
    375: {
        name: "Windcutter Blade", type: 2, func: 4, calc: 1,
        args: [2],
        range: 16, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to three random foes, ignoring position."
    },
    376: {
        name: "Enigmatic Bloom", type: 2, func: 6, calc: 0,
        args: [1],
        range: 2, prob: 50,
        desc: "Revive and fully restore HP of adjacent familiars."
    },
    377: {
        name: "Healing Bloom", type: 2, func: 18, calc: 4,
        args: [1],
        range: 21, prob: 70,
        desc: "Restore HP to self."
    },
    378: {
        name: "Blade Flurry", type: 2, func: 21, calc: 3,
        args: [1, 1, 0.3, 0.3],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to four random foes and sometimes lower ATK."
    },
    379: {
        name: "Dragon Aura", type: 2, func: 4, calc: 2,
        args: [1.9],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to three random foes, ignoring position."
    },
    380: {
        name: "Feral Claws", type: 2, func: 3, calc: 3,
        args: [0.95],
        range: 17, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to six random foes."
    },
    381: {
        name: "Lion's Roar", type: 1, func: 1, calc: 0,
        args: [0.4, 6, 7],
        range: 3, prob: 70,
        desc: "Reduce magic and breath damages taken by self and adjacent familiars."
    },
    382: {
        name: "Laevateinn", type: 2, func: 3, calc: 1,
        args: [1.65],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to up to three foes."
    },
    383: {
        name: "Flame of Cinders", type: 2, func: 3, calc: 1,
        args: [1.65],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },
    385: {
        name: "Prominence", type: 2, func: 3, calc: 1,
        args: [1],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes."
    },
    386: {
        name: "Sun's Mercy", type: 1, func: 1, calc: 0,
        args: [0.15, 1],
        range: 3, prob: 70,
        desc: "Raise ATK of self and adjacent familiars."
    },
    387: {
        name: "Earth's Fury", type: 2, func: 3, calc: 1,
        args: [1.35],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to four random foes."
    },
    388: {
        name: "Melody of Mercy", type: 1, func: 1, calc: 0,
        args: [0.3, 17, 1.25],
        range: 3, prob: 70,
        desc: "Raise HP of self and adjacent familiars at beginning of battle."
    },
    389: {
        name: "Mystic Light", type: 2, func: 6, calc: 0,
        args: [1],
        range: 121, prob: 50,
        desc: "Revive and fully restore HP of one random ally."
    },
    390: {
        name: "Libra's Retribution", type: 2, func: 3, calc: 1,
        args: [1.6],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes"
    },
    391: {
        name: "Scatter Arrow", type: 2, func: 4, calc: 3,
        args: [1.3],
        range: 32, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage to up to four foes, ignoring position."
    },
    392: {
        name: "Aries' Strike", type: 2, func: 3, calc: 1,
        args: [1.2],
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to four random foes."
    },
    393: {
        name: "Sidestep", type: 5, func: 27, calc: 0,
        args: [2, 3, 78, 79],
        range: 21, prob: 30,
        desc: "Evade enemy AGI-based attack skills."
    },
    394: {
        name: "Glance", type: 2, func: 4, calc: 2,
        args: [1.7],
        range: 15, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to all foes in the front/middle lines, ignoring position."
    },
    395: {
        name: "Imperial Audience", type: 1, func: 19, calc: 0,
        args: [0, 5, 0.45, 1],
        range: 7, prob: 70,
        desc: "Chance to silence up to three foes for one turn at the start of battle."
    },
    396: {
        name: "Venom Snare", type: 5, func: 28, calc: 7,
        args: [0.23, 1, 7, 3, 0.3],
        range: 21, prob: 30,
        desc: "Reflect ATK-based damage back to up to three foes."
    },
    397: {
        name: "Tarantella", type: 1, func: 1, calc: 0,
        args: [0.3, 2],
        range: 3, prob: 70,
        desc: "Raise DEF of self and adjacent familiars."
    },
    398: {
        name: "Knuckle Guard", type: 5, func: 12, calc: 0,
        range: 4, prob: 50, sac: 1,
        desc: "Take damage in place of allies."
    },
    400: {
        name: "Hatred Blade", type: 2, func: 3, calc: 1,
        args: [1.15, 1, 0.3],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes and sometimes poison them."
    },
    401: {
        name: "Shield of Ruin", type: 1, func: 19, calc: 0,
        args: [0, 1, 0.5, 10],
        range: 7, prob: 70,
        desc: "Chance to poison up to three foes at the start of battle."
    },
    402: {
        name: "Tricksy Flames", type: 2, func: 4, calc: 2,
        args: [1.95],
        range: 12, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to all foes in the front line, ignoring position."
    },
    403: {
        name: "Flickering Flames", type: 5, func: 27, calc: 0,
        args: [2, 2, 78, 79],
        range: 21, prob: 50,
        desc: "Evade enemy WIS-based attack skills."
    },
    404: {
        name: "Niten Ichi-ryu", type: 2, func: 3, calc: 1,
        args: [1.75],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },
    405: {
        name: "Visions of Terror", type: 2, func: 4, calc: 2,
        args: [1.65, 1, 0.3],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to and sometimes poison four random foes, ignoring position."
    },
    406: {
        name: "Piercing Arrow", type: 2, func: 4, calc: 1,
        args: [1.35],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes, ignoring position."
    },
    407: {
        name: "Allure of the Rose", type: 2, func: 4, calc: 2,
        args: [1.3],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to five random foes, ignoring position."
    },
    408: {
        name: "Covenant of the Rose", type: 1, func: 1, calc: 0,
        args: [0.15, 4],
        range: 3, prob: 70,
        desc: "Raise AGI of self and adjacent familiars at start of battle."
    },
    411: {
        name: "Winds of Lust", type: 2, func: 4, calc: 2,
        args: [2.1],
        range: 12, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to all foes in the front line, ignoring position."
    },
    412: {
        name: "Fires of Thirst", type: 2, func: 4, calc: 2,
        args: [1.2],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to five random foes, ignoring position."
    },
    414: {
        name: "Putrid Stench", type: 2, func: 4, calc: 2,
        args: [1.2, 1, 0.25],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to and sometimes poison five random foes, ignoring position. "
    },
    415: {
        name: "Sigiled Sanctuary", type: 1, func: 1, calc: 0,
        args: [0.11, 3],
        range: 3, prob: 70,
        desc: "Raise WIS of self and adjacent familiars at start of battle."
    },
    416: {
        name: "Bone Smasher", type: 2, func: 4, calc: 2,
        args: [1.5],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },
    418: {
        name: "Nemesis", type: 2, func: 4, calc: 2,
        args: [2.1],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to up to three foes, ignoring position."
    },
    419: {
        name: "Ichthocannon", type: 2, func: 4, calc: 2,
        args: [1.5],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },
    420: {
        name: "Breaking Wave", type: 2, func: 3, calc: 1,
        args: [1.35],
        range: 15, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes in the front/middle line."
    },
    421: {
        name: "Light of Virtue", type: 2, func: 4, calc: 2,
        args: [1.9, 3, 0.5],
        range: 16, prob: 30, ward: 3,
        desc: "Deal heavy WIS-based damage and sometimes freeze three random foes, ignoring position."
    },
    422: {
        name: "Maiden's Prayer", type: 5, func: 29, calc: 0,
        args: [0, 0, 8, 1],
        range: 21, prob: 50,
        desc: "Remove the buffs of all foes after receiving an attack."
    },
    423: {
        name: "Wail of Sorrow", type: 1, func: 32, calc: 0,
        args: [0.2, 2],
        range: 7, prob: 70, sac: 1,
        desc: "Greatly lower DEF of up to three foes."
    },
    424: {
        name: "Ultrasonic", type: 2, func: 4, calc: 1,
        args: [1.85, 2, 0.2],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to and sometimes paralyze up to three foes."
    },
    425: {
        name: "Lese Majesty", type: 5, func: 14, calc: 1,
        args: [1.5],
        range: 4, prob: 50, ward: 1,
        desc: "Take damage in place of any ally and unleash a heavy counterattack."
    },
    426: {
        name: "Imperial Gift", type: 2, func: 18, calc: 4,
        args: [2],
        range: 21, prob: 50,
        desc: "Restore of HP to self."
    },
    427: {
        name: "Funerary Rush", type: 2, func: 3, calc: 1,
        args: [1.5],
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },
    428: {
        name: "Rematch", type: 16, func: 18, calc: 4,
        args: [0.5, 1],
        range: 122, prob: 70,
        desc: "Heal two random allies for half of their maximum HP upon death."
    },
    430: {
        name: "Broken Vow", type: 1, func: 32, calc: 0,
        args: [0.22, 3],
        range: 7, prob: 70,
        desc: "Greatly lower WIS of up to three foes."
    },
    431: {
        name: "Lovers' Arrows", type: 2, func: 4, calc: 2,
        args: [1.2],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },
    432: {
        name: "Spectrum", type: 2, func: 4, calc: 2,
        args: [2.25],
        range: 7, prob: 30, ward: 3, sac: 1,
        desc: "Deal massive WIS-based damage to up to three foes, ignoring position."
    },
    433: {
        name: "Deep Rumble", type: 2, func: 3, calc: 1,
        args: [0.95],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to six random foes."
    },
    434: {
        name: "Maelstrom", type: 2, func: 3, calc: 3,
        args: [1.45],
        range: 313, prob: 30, ward: 1, sac: 1,
        desc: "AGI-based damage to up to three foes. Increased if fewer foes."
    },
    435: {
        name: "Obedience", type: 2, func: 3, calc: 3,
        args: [1.5, 2, 0.3],
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to and sometimes paralyze four random foes."
    },
    436: {
        name: "Troublemaker", type: 5, func: 28, calc: 7,
        args: [0.23, 3, 7, 3, 0.3],
        range: 21, prob: 50,
        desc: "Reflect AGI-based damage back to up to three foes."
    },
    437: {
        name: "Mjolnir", type: 2, func: 4, calc: 1,
        args: [1.5],
        range: 32, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to up to four foes, ignoring position."
    },
    438: {
        name: "Poison Torrent", type: 2, func: 3, calc: 1,
        args: [1.3, 1, 0.25],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to and sometimes poison four random foes."
    },
    440: {
        name: "Thunderstroke", type: 2, func: 4, calc: 3,
        args: [2],
        range: 23, prob: 30, ward: 2,
        desc: "Deal massive AGI-based damage to two random foes, ignoring position."
    },
    441: {
        name: "Bolt of Judgment", type: 2, func: 4, calc: 2,
        args: [2.15],
        range: 23, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },
    442: {
        name: "Masterstroke", type: 2, func: 4, calc: 1,
        args: [1.05],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to six random foes, ignoring position."
    },
    443: {
        name: "Fangs of the Devoted", type: 2, func: 3, calc: 3,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive AGI-based damage to two random foes."
    },
    444: {
        name: "Cruel Swing", type: 2, func: 4, calc: 1,
        args: [1.45],
        range: 8, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to all foes, ignoring position."
    },
    445: {
        name: "Bastion", type: 3, func: 20, calc: 0,
        args: [0.1],
        range: 21, prob: 70,
        desc: "Survive devastating damage as long as HP is above 10%."
    },
    446: {
        name: "Tail Lash", type: 2, func: 4, calc: 2,
        args: [1.6],
        range: 32, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to up to four foes, ignoring position."
    },
    447: {
        name: "Looming Nightmare", type: 2, func: 4, calc: 2,
        args: [1.6],
        range: 32, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to up to four foes, ignoring position."
    },
    448: {
        name: "Leo's Claws", type: 2, func: 3, calc: 3,
        args: [1.3],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to four random foes."
    },
    449: {
        name: "Whirling Dervish", type: 2, func: 3, calc: 1,
        args: [1.8],
        range: 313, prob: 30, ward: 1, sac: 1,
        desc: "Heavy ATK-based damage to up to three foes. Increased if fewer foes."
    },
    450: {
        name: "Aquarius Unleashed", type: 2, func: 4, calc: 2,
        args: [1.25],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to five random foes, ignoring position."
    },
    451: {
        name: "Endless Deluge", type: 1, func: 1, calc: 0,
        args: [452, 16],
        range: 101, prob: 70,
        desc: "One random ally is automatically revived with full HP after being killed."
    },
    452: {
        name: "Dawn's Tear", type: 16, func: 6, calc: 0,
        args: [1],
        range: 21, prob: 100,
        desc: "-"
    },
    453: {
        name: "Shadow of Death", type: 2, func: 4, calc: 2,
        args: [1.65],
        range: 314, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage to up to four foes. Increased if fewer foes."
    },
    454: {
        name: "Shadow of Confusion", type: 1, func: 31, calc: 0,
        args: [2, 2],
        range: 4, prob: 70,
        desc: "Order of attack is determined by WIS during the next two turns."
    },
    455: {
        name: "Berserker Rage", type: 2, func: 3, calc: 1,
        args: [0.85],
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to six random foes."
    },
    456: {
        name: "Chain Lash", type: 1, func: 32, calc: 0,
        args: [0.5, 1],
        range: 7, prob: 70,
        desc: "Greatly lower ATK of up to three foes."
    },
    457: {
        name: "Brink of Death", type: 16, func: 4, calc: 1,
        args: [3.5],
        range: 5, prob: 70, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage, ignoring position, to one foe upon its death."
    },
    459: {
        name: "Fleet of Foot", type: 2, func: 4, calc: 3,
        args: [1.3],
        range: 8, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to all foes, ignoring position."
    },
    460: {
        name: "Void Strike", type: 16, func: 19, calc: 0,
        args: [0, 5, 0.6, 1],
        range: 8, prob: 70,
        desc: "High chance to silence all foes for one turn upon his death."
    },
    461: {
        name: "Lion's Wrath", type: 2, func: 3, calc: 1,
        args: [1.35],
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to four random foes."
    },
    462: {
        name: "Heroic Might", type: 2, func: 18, calc: 4,
        args: [2],
        range: 113, prob: 50,
        desc: "Restore HP to three random familiars."
    },
    463: {
        name: "Absolute Zero", type: 2, func: 4, calc: 2,
        args: [1.7, 3, 0.25],
        range: 32, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy WIS-based damage and sometimes freeze up to four foes, ignoring position."
    },
    464: {
        name: "Chariot Rush", type: 2, func: 3, calc: 3,
        args: [1.8, 2, 0.3],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to and sometimes paralyze three random foes."
    },
    465: {
        name: "Stormcaller Pinion", type: 2, func: 4, calc: 2,
        args: [1.3],
        range: 20, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage to five random foes, ignoring position."
    },
    466: {
        name: "Blade of Judgment", type: 2, func: 4, calc: 1,
        args: [1.8],
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to four random foes, ignoring position."
    },
    467: {
        name: "Atonement", type: 1, func: 1, calc: 0,
        args: [0.3, 5, 7],
        range: 4, prob: 70,
        desc: "Reduce physical and breath damages taken by all familiars."
    },
    468: {
        name: "Rain of Death", type: 2, func: 3, calc: 1,
        args: [1.7, 1, 0.25, 10],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage and sometimes envenom three random foes."
    },
    469: {
        name: "Sand Blade", type: 2, func: 21, calc: 1,
        args: [1.2, 1, 0.3, 0.3],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes and sometimes reduce ATK."
    },
    471: {
        name: "Darkflame", type: 2, func: 4, calc: 2,
        args: [1],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },
    472: {
        name: "Nightveil", type: 1, func: 1, calc: 0,
        args: [0.1, 1, 3],
        range: 3, prob: 70,
        desc: "Raise WIS and ATK of self and adjacent familiars at start of battle."
    },
    473: {
        name: "Entomb", type: 2, func: 3, calc: 1,
        args: [1.15],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes."
    },
    474: {
        name: "Embalm", type: 1, func: 1, calc: 0,
        args: [0.3, 5],
        range: 3, prob: 70,
        desc: "Reduce physical damage taken by self and adjacent familiars."
    },
    475: {
        name: "Hand of Fortune", type: 2, func: 24, calc: 0,
        range: 21, prob: 50, sac: 1,
        randSkills: [11, 16, 20, 26, 33, 34, 109, 110, 114, 116, 138, 145, 218, 232, 264, 274, 277, 287,
            296, 319, 331, 345, 346, 354, 378, 426, 431, 462],
        desc: "The outcome of this skill depends on the user's Fortune."
    },
    476: {
        name: "Furious Horns", type: 2, func: 4, calc: 2,
        args: [2],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to three random foes, ignoring position."
    },
    477: {
        name: "Chatter Tooth", type: 2, func: 4, calc: 2,
        args: [1.5, 3, 0.3],
        range: 32, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy WIS-based damage and sometimes freeze up to four foes, ignoring position."
    },
    478: {
        name: "Cancer's Claws", type: 2, func: 3, calc: 1,
        args: [1.65, 5, 0.5, 1],
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage and sometimes silence three random foes."
    },
    479: {
        name: "Infiltrate", type: 1, func: 1, calc: 0,
        args: [1, 18],
        range: 121, prob: 70,
        desc: "Allows a random ally to perform an extra action during the next turn."
    },
    480: {
        name: "Rasteira", type: 2, func: 3, calc: 3,
        args: [1.5],
        range: 314, prob: 30, ward: 1,
        desc: "Heavy AGI-based damage to up to four foes. Increased if fewer foes."
    },
    481: {
        name: "Macaco", type: 6, func: 27, calc: 0,
        args: [2, 9, 78, 79],
        range: 21, prob: 50,
        desc: "Evade enemy ATK-based and AGI-based attack skills."
    },
    482: {
        name: "Souldrain Fangs", type: 2, func: 36, calc: 3,
        args: [1.75, 0.2, 27, 21],
        range: 7, prob: 30, ward: 1,
        desc: "Drains HP from up to three foes while dealing heavy AGI-based damage."
    },
    483: {
        name: "Spearhead", type: 1, func: 19, calc: 0,
        args: [0, 7, 0.4, 1, 1],
        range: 7, prob: 70,
        desc: "Chance to blind up to three foes at start of battle."
    },
    484: {
        name: "Wall of the Brave", type: 5, func: 12, calc: 0,
        range: 4, prob: 50,
        desc: "Take damage in place of allies."
    },
    485: {
        name: "Shield of the Coward", type: 1, func: 1, calc: 0,
        args: [1, 2],
        range: 21, prob: 70,
        desc: "Raise DEF of self at start of battle."
    },
    487: {
        name: "Dance of Farewell", type: 2, func: 4, calc: 2,
        args: [1.1],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },
    488: {
        name: "Dance of Reunion", type: 16, func: 6, calc: 0,
        args: [1],
        range: 121, prob: 50,
        desc: "Revives one random ally upon her death."
    },
    489: {
        name: "Hardened Steel", type: 1, func: 1, calc: 0,
        args: [0.7, 5],
        range: 21, prob: 70,
        desc: "Reduce physical damage taken by self greatly."
    },
    490: {
        name: "Steel Hooves", type: 2, func: 3, calc: 1,
        args: [1.2],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes."
    },
    491: {
        name: "Primitive Rage", type: 2, func: 3, calc: 1,
        args: [1.35],
        range: 32, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to up to four foes."
    },
    492: {
        name: "Razor Pinion", type: 2, func: 4, calc: 1,
        args: [1.75],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to four random foes, ignoring position."
    },
    493: {
        name: "Big Game Hunt", type: 2, func: 3, calc: 3,
        args: [1.25],
        range: 314, prob: 30, ward: 1, sac: 1,
        desc: "AGI-based damage to up to four foes. Increased if fewer foes."
    },
    494: {
        name: "Hand of Justice", type: 2, func: 4, calc: 2,
        args: [1.65],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },
    495: {
        name: "Soul Prison", type: 1, func: 32, calc: 0,
        args: [0.25, 4],
        range: 7, prob: 70,
        desc: "Greatly lower AGI of up to three foes."
    },
    496: {
        name: "Flame Cloud", type: 2, func: 4, calc: 2,
        args: [2.05],
        range: 16, prob: 30, ward: 3, sac: 1,
        desc: "Deal massive WIS-based damage to three random foes, ignoring position."
    },
    497: {
        name: "Mighty Stomp", type: 2, func: 4, calc: 1,
        args: [2],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to three random foes, ignoring position."
    },
    499: {
        name: "Snake Whip", type: 2, func: 4, calc: 1,
        args: [1.5],
        range: 20, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to five random foes, ignoring position"
    },
    500: {
        name: "Spiny Carapace", type: 3, func: 13, calc: 1,
        args: [1.2],
        range: 21, prob: 50, ward: 1,
        desc: "Chance to unleash a counter attack when struck."
    },
    501: {
        name: "Dragon Strike", type: 2, func: 22, calc: 1,
        args: [1.65, 2, 0.3, 0.3],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Heavy ATK-based damage to four random foes and sometimes lower DEF, ignoring position."
    },
    502: {
        name: "Flashing Blade", type: 2, func: 3, calc: 3,
        args: [1.6],
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to three random foes."
    },
    503: {
        name: "Wing Aegis", type: 3, func: 20, calc: 0,
        args: [0.15],
        range: 21, prob: 70,
        desc: "Survive devastating damage as long as HP is above 15%."
    },
    504: {
        name: "Defender's Thunder", type: 2, func: 4, calc: 3,
        args: [2.3, 2, 0.35],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive AGI-based damage, sometimes paralyze three random foes, ignoring position."
    },
    505: {
        name: "Fires of Perdition", type: 2, func: 22, calc: 1,
        args: [1.3, 3, 0.3, 0.3],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes, sometimes lowering WIS, ignoring position."
    },
    506: {
        name: "Winds of Perdition", type: 2, func: 4, calc: 2,
        args: [1.85],
        range: 313, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based damage to up to three foes, ignoring position. Increased if fewer foes."
    },
    507: {
        name: "Sagittarius' Arrow", type: 2, func: 4, calc: 3,
        args: [1.2],
        range: 20, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to five random foes."
    },
    508: {
        name: "Sage's Wisdom", type: 1, func: 1, calc: 0,
        args: [0.5, 6],
        range: 3, prob: 70,
        desc: "Reduce magic damage taken by self and adjacent familiars."
    },
    509: {
        name: "Atrocity", type: 2, func: 3, calc: 1,
        args: [1, 4, 0.3],
        range: 8, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to and sometimes disable all foes."
    },
    510: {
        name: "Bedazzle", type: 1, func: 19, calc: 0,
        args: [0, 7, 0.4, 2, 0.7],
        range: 7, prob: 70,
        desc: "Chance to blind up to three foes for 2 turns at start of battle."
    },
    511: {
        name: "Twin Arrow", type: 2, func: 4, calc: 1,
        args: [2.1],
        range: 6, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to up to two foes, ignoring position."
    },
    512: {
        name: "Fists of Gemini", type: 2, func: 4, calc: 1,
        args: [2.1],
        range: 6, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to up to two foes, ignoring position."
    },
    513: {
        name: "Goblet of Truth", type: 1, func: 19, calc: 0,
        args: [0, 5, 0.3, 1],
        range: 8, prob: 70,
        desc: "Chance to silence all foes for one turn at the start of battle."
    },
    514: {
        name: "Fragarach", type: 2, func: 4, calc: 2,
        args: [1.95],
        range: 313, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage to up to three foes, ignoring position. Increased if fewer foes."
    },
    515: {
        name: "The Sea's Favor", type: 2, func: 37, calc: 2,
        args: [2.85, 0.4, 27, 21],
        range: 6, prob: 30, ward: 2,
        desc: "Drains HP from up to two foes while dealing massive WIS-based damage, ignoring position."
    },
    516: {
        name: "Enthrall", type: 1, func: 19, calc: 0,
        args: [0, 3, 0.15],
        range: 7, prob: 70,
        desc: "Chance to freeze up to three foes at start of battle."
    },
    518: {
        name: "Sabre Dance", type: 2, func: 3, calc: 1,
        args: [1.45],
        range: 314, prob: 30, ward: 1,
        desc: "ATK-based damage to up to four foes. Increased if fewer foes."
    },
    519: {
        name: "The Sea's Fury", type: 2, func: 4, calc: 3,
        args: [2.2],
        range: 32, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive AGI-based damage to up to four foes, ignoring position."
    },
    520: {
        name: "Tentacle Lash", type: 2, func: 4, calc: 1,
        args: [1.95],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes, ignoring position."
    },
    521: {
        name: "Horn Rush", type: 2, func: 3, calc: 1,
        args: [1.45, 1, 0.4, 10],
        range: 314, prob: 30, ward: 1, sac: 1,
        desc: "ATK-based damage to and sometimes poison up to four foes. Increased if fewer foes."
    },
    522: {
        name: "Flash of Silver", type: 2, func: 3, calc: 3,
        args: [1.25],
        range: 20, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to five random foes."
    },
    523: {
        name: "Glittering Scales", type: 5, func: 29, calc: 0,
        args: [0, 0, 8, 1],
        range: 21, prob: 50,
        desc: "Remove the buffs of all foes after receiving an attack."
    },
    524: {
        name: "Twin-Tail Strike", type: 2, func: 34, calc: 1,
        args: [1.35, 1, 0.5, 0.2],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes and sometimes greatly lower ATK, ignoring position."
    },
    525: {
        name: "Spirit-Candles", type: 2, func: 4, calc: 3,
        args: [1.45],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage to four random foes, ignoring position."
    },
    527: {
        name: "Water Blade", type: 2, func: 3, calc: 3,
        args: [1.45],
        range: 19, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to four random foes."
    },
    528: {
        name: "Wall of Water", type: 1, func: 1, calc: 0,
        args: [0.1, 4],
        range: 3, prob: 70,
        desc: "Raise AGI of self and adjacent familiars at start of battle."
    },
    529: {
        name: "Waterslice Claws", type: 2, func: 4, calc: 2,
        args: [1.7],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },
    530: {
        name: "Gift of the Lair", type: 1, func: 1, calc: 0,
        args: [0.1, 3],
        range: 3, prob: 70,
        desc: "Raise WIS of self and adjacent familiars at start of battle."
    },
    532: {
        name: "Purging Flame", type: 2, func: 3, calc: 1,
        args: [1.7],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to up to three foes."
    },
    533: {
        name: "Boon of the Sea", type: 1, func: 1, calc: 0,
        args: [0.2, 3, 4],
        range: 4, prob: 70, sac: 1,
        desc: "Raise WIS and AGI of all party members."
    },
    534: {
        name: "Lava Torrent", type: 1, func: 19, calc: 0,
        args: [0, 8, 0.5, 3000],
        range: 7, prob: 70,
        desc: "Chance to burn up to three foes at start of battle."
    },
    535: {
        name: "Eruption", type: 2, func: 4, calc: 2,
        args: [1.75],
        range: 15, prob: 30, ward: 3,
        desc: "Deal heavy WIS-based damage to front/middle lines, ignoring position."
    },
    536: {
        name: "Arboreal Succor", type: 2, func: 40, calc: 0,
        range: 4, prob: 70, sac: 1,
        desc: "Remove the debuffs of self and all allies."
    },
    538: {
        name: "Bronze Fist", type: 2, func: 4, calc: 2,
        args: [1.5],
        range: 8, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to all foes, ignoring position."
    },
    539: {
        name: "Clockwork Guardian", type: 16, func: 1, calc: 0,
        args: [0.5, 5],
        range: 122, prob: 70,
        desc: "Reduce physical damage taken by two random allies upon her death."
    },
    540: {
        name: "Mercy of the Star", type: 1, func: 1, calc: 0,
        args: [0.4, 17, 1.5],
        range: 3, prob: 70,
        desc: "Raise HP of self and adjacent familiars at beginning of battle."
    },
    541: {
        name: "Tears of the Star", type: 2, func: 18, calc: 4,
        args: [1, 1],
        range: 132, prob: 70,
        desc: "Full restore HP of two party members."
    },
    542: {
        name: "Rampart Destroyer", type: 2, func: 3, calc: 1,
        args: [1.6],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to four random foes."
    },
    543: {
        name: "Devotion", type: 2, func: 6, calc: 0,
        args: [1],
        range: 2, prob: 50, sac: 1,
        desc: "Revive and fully restore HP of adjacent familiars."
    },
    544: {
        name: "Tail of the Scorpion", type: 2, func: 3, calc: 3,
        args: [1.05, 1, 0.3, 10],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to and sometimes envenom five random foes."
    },
    545: {
        name: "Whirl of Claws", type: 2, func: 3, calc: 1,
        args: [1.1],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes."
    },
    546: {
        name: "Death's March", type: 2, func: 36, calc: 1,
        args: [1.85, 0.4, 27, 21],
        range: 23, prob: 30, ward: 1,
        desc: "Drains HP from two random foes while dealing heavy ATK-based damage."
    },
    547: {
        name: "Death's Hunt", type: 2, func: 7, calc: 3,
        args: [1.8, 0.1],
        range: 23, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to two random foes. Chance to kill target."
    },
    548: {
        name: "Cannon Barrage", type: 2, func: 4, calc: 1,
        args: [1.75],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to four random foes, ignoring position."
    },
    549: {
        name: "Bond en Avant", type: 2, func: 21, calc: 3,
        args: [0.85, 4, 0.6, 0.3],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to six random foes and sometimes reduce AGI."
    },
    550: {
        name: "Judgment of the Sea", type: 2, func: 4, calc: 2,
        args: [1.3],
        range: 208, prob: 30, ward: 2, sac: 1,
        desc: "WIS-based damage to all foes, ignoring position. Increased if fewer foes."
    },
    551: {
        name: "Moonlight", type: 1, func: 1, calc: 0,
        args: [0.4, 8],
        range: 21, prob: 70,
        desc: "Raise the skill trigger rate of self by 40%."
    },
    552: {
        name: "Crescent Edge", type: 2, func: 3, calc: 1,
        args: [2.6],
        range: 23, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },
    553: {
        name: "Wrath of Taurus", type: 2, func: 3, calc: 1,
        args: [0.9],
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to six random foes."
    },
    554: {
        name: "Heart of Taurus", type: 1, func: 1, calc: 1,
        args: [1, 17, 1.5],
        range: 21, prob: 70,
        desc: "Raise HP of self at start of battle, based on 100% of his ATK."
    },
    555: {
        name: "Shredding Claws", type: 2, func: 3, calc: 3,
        args: [1.55],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to four random foes."
    },
    556: {
        name: "Scorching Tornado", type: 2, func: 33, calc: 1,
        args: [1.25, 2, 0.4, 0.3],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to four random foes and sometimes greatly lower DEF."
    },
    558: {
        name: "Blade of Conquest", type: 2, func: 3, calc: 1,
        args: [0.95],
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to six random foes."
    },
    559: {
        name: "Grace of the Goddess", type: 1, func: 1, calc: 0,
        args: [0.3, 1, 2],
        range: 3, prob: 70,
        desc: "Raise ATK and DEF of self and adjacent familiars."
    },
    560: {
        name: "Yalli of the Blade", type: 2, func: 3, calc: 1,
        args: [1.15],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes."
    },
    561: {
        name: "Affection", type: 1, func: 1, calc: 0,
        args: [0.2, 1],
        range: 3, prob: 70,
        desc: "Raise ATK of self and adjacent familiars."
    },
    562: {
        name: "Hewing Rood", type: 3, func: 13, calc: 1,
        args: [1.5],
        range: 21, prob: 50, ward: 1,
        desc: "Chance to unleash a counter attack when struck."
    },
    563: {
        name: "Ablution", type: 1, func: 1, calc: 0,
        args: [0.7, 2, 3],
        range: 21, prob: 70,
        desc: "Raise DEF and WIS of self."
    },
    564: {
        name: "Rites of the Shikigami", type: 2, func: 4, calc: 2,
        args: [1.65],
        range: 314, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage to up to four foes. Increased if fewer foes."
    },
    565: {
        name: "Pierce the Veil", type: 3, func: 38, calc: 6,
        args: [0, 1, 0, 60, 5],
        range: 7, prob: 50,
        desc: "Greatly lower ATK of up to three foes when being attacked."
    },
    566: {
        name: "Divine Compass", type: 1, func: 32, calc: 0,
        args: [0.1, 3],
        range: 8, prob: 70, sac: 1,
        desc: "Greatly lower WIS of all foes."
    },
    568: {
        name: "Scorching Wing", type: 2, func: 3, calc: 3,
        args: [0.9, 3, 0.3],
        range: 17, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to six random foes and sometimes freeze them."
    },
    569: {
        name: "Fallen Wing", type: 16, func: 16, calc: 0,
        range: 8, prob: 70,
        desc: "Remove the buffs of all foes upon his death."
    },
    570: {
        name: "Glaring Sunlight", type: 2, func: 4, calc: 2,
        args: [1.6, 7, 0.35, 2, 0.9],
        range: 8, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to all foes  and sometimes blind them, ignoring position."
    },
    571: {
        name: "Corona", type: 1, func: 1, calc: 0,
        args: [0.35, 5, 6],
        range: 3, prob: 70,
        desc: "Reduce physical and magic damages taken by self and adjacent familiars."
    },
    572: {
        name: "Venomflame", type: 2, func: 4, calc: 2,
        args: [2.3, 3, 0.4],
        range: 16, prob: 30, ward: 3, sac: 1,
        desc: "Deal massive WIS-based damage, sometimes freeze three random foes, ignoring position."
    },
    573: {
        name: "Blare of Judgment", type: 2, func: 4, calc: 2,
        args: [1.15, 5, 0.3, 1],
        range: 17, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage and sometimes silence six random foes, ignoring position."
    },
    574: {
        name: "Winding Brass", type: 2, func: 3, calc: 3,
        args: [1.15, 2, 0.2],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to all foes and sometimes paralyze targets."
    },
    575: {
        name: "Chaotic World", type: 1, func: 19, calc: 0,
        args: [0, 6, 0.6, 2, 0.6],
        range: 7, prob: 70,
        desc: "Chance to confuse up to three foes at start of battle."
    },
    576: {
        name: "Culling Out", type: 2, func: 4, calc: 2,
        args: [1.25],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to five random foes, ignoring position."
    },
    577: {
        name: "Triple Tails", type: 2, func: 3, calc: 3,
        args: [1.5],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to up to three foes."
    },
    578: {
        name: "Divine Mace", type: 5, func: 14, calc: 1,
        args: [1.6],
        range: 4, prob: 50, ward: 1, sac: 1,
        desc: "Take damage in place of any ally and unleash a heavy counterattack."
    },
    579: {
        name: "Intoxicate", type: 2, func: 4, calc: 1,
        args: [1.5],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to all foes, ignoring position."
    },
    580: {
        name: "Flurry of Fangs", type: 2, func: 4, calc: 2,
        args: [1.6],
        range: 314, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based damage to up to four foes. Increased if fewer foes."
    },
    581: {
        name: "Sacred Offering", type: 1, func: 32, calc: 0,
        args: [0.2, 2],
        range: 8, prob: 70,
        desc: "Greatly lower DEF of all foes."
    },
    582: {
        name: "Crumble", type: 2, func: 4, calc: 2,
        args: [1.4, 8, 0.4, 2000],
        range: 20, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage and sometimes burn five random foes, ignoring position."
    },
    583: {
        name: "Smoldering Serpent", type: 2, func: 4, calc: 2,
        args: [2],
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to three random foes, ignoring position."
    },
    584: {
        name: "Eye of the Serpent", type: 1, func: 1, calc: 0,
        args: [2, 23],
        range: 3, prob: 70,
        desc: "Buff self and adjacent familiars. DEF/WIS of each affected ally increase as its HP decrease."
    },
    585: {
        name: "Death's Call", type: 2, func: 34, calc: 2,
        args: [1.6, 3, 0.4, 0.2],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based damage to four random foes and sometimes greatly lower WIS."
    },
    586: {
        name: "Emerald Teeth", type: 2, func: 3, calc: 3,
        args: [1.3],
        range: 419, prob: 30, ward: 1, sac: 1,
        desc: "Deal varying AGI-based damage to four random foes."
    },
    588: {
        name: "Tranquil Death", type: 2, func: 4, calc: 3,
        args: [1.45],
        range: 20, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to five random foes, ignoring position."
    },
    589: {
        name: "Unbridle", type: 1, func: 1, calc: 0,
        args: [1, 18],
        range: 21, prob: 70,
        desc: "Allows self to perform an extra action during the next turn."
    },
    590: {
        name: "Macana Slash", type: 2, func: 3, calc: 3,
        args: [1.05],
        range: 20, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to five random foes."
    },
    591: {
        name: "Glittering Jade", type: 1, func: 1, calc: 0,
        args: [0.15, 4],
        range: 3, prob: 70,
        desc: "Raise AGI of self and adjacent familiars."
    },
    594: {
        name: "Holy Lash", type: 2, func: 37, calc: 1,
        args: [1.9, 0.2, 27, 21],
        range: 12, prob: 30, ward: 1,
        desc: "Heavy ATK-based damage and drain HP from all foes in the front line, ignoring position."
    },
    595: {
        name: "Shadow Whip", type: 1, func: 19, calc: 0,
        args: [0, 7, 0.2, 1, 0.9],
        range: 7, prob: 70,
        desc: "Chance to blind up to three foes for one turn at start of battle."
    },
    596: {
        name: "Masquerade", type: 2, func: 4, calc: 2,
        args: [0.75],
        range: 17, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },
    597: {
        name: "Runaway Chariot", type: 2, func: 3, calc: 3,
        args: [1.35],
        range: 314, prob: 30, ward: 1,
        desc: "AGI-based damage to up to four foes. Increased if fewer foes."
    },
    598: {
        name: "Entangle", type: 16, func: 32, calc: 0,
        args: [0.15, 4],
        range: 8, prob: 70,
        desc: "Greatly lower AGI of all foes upon his death."
    },
    599: {
        name: "Poisoned Wine", type: 2, func: 4, calc: 1,
        args: [1.2, 4, 0.3],
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to six random foes and sometimes disable them, ignoring position."
    },
    600: {
        name: "Poison-Laced Hood", type: 3, func: 41, calc: 1,
        args: [1.8, 1, 1, 20],
        range: 21, prob: 50, ward: 1,
        desc: "Chance of poisonous counter attack (20% of max HP) when struck, ignoring position."
    },
    601: {
        name: "Veil of Night", type: 2, func: 3, calc: 3,
        args: [1.85],
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to four random foes."
    },
    602: {
        name: "Cake Cutting", type: 2, func: 3, calc: 1,
        args: [1.15, 1, 1, 10],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal venomous ATK-based damage to five random foes."
    },
    603: {
        name: "Bandage Garotte", type: 2, func: 37, calc: 1,
        args: [2.05, 0.15, 27, 21],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Massive ATK-based damage and drain HP from three random foes, ignoring position."
    },
    604: {
        name: "Blindside", type: 2, func: 4, calc: 2,
        args: [1.9],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to three random foes, ignoring position."
    },
    605: {
        name: "Bone Shatter", type: 2, func: 3, calc: 1,
        args: [1.6],
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to four random foes."
    },
    606: {
        name: "Overawe", type: 5, func: 28, calc: 7,
        args: [0.45, 10, 23, 3, 0.1],
        range: 21, prob: 50,
        desc: "Reflect 90% of AGI/WIS-based damage back to two random foes."
    },
    607: {
        name: "Breath of Darkness", type: 2, func: 4, calc: 2,
        args: [1.35, 8, 0.4, 2500],
        range: 8, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage to all foes and sometimes burn targets, ignoring position."
    },
    608: {
        name: "Hungry Wolf", type: 2, func: 33, calc: 1,
        args: [0.9, 4, 0.3, 0.1],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to six random foes and sometimes greatly lower AGI."
    },
    609: {
        name: "Harvest", type: 2, func: 3, calc: 1,
        args: [2.6],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },
    610: {
        name: "Fickle Treat", type: 1, func: 1, calc: 0,
        args: [452, 16],
        range: 21, prob: 70,
        desc: "Self is automatically revived with full HP after being killed."
    },
    611: {
        name: "Cruel Trick", type: 2, func: 3, calc: 3,
        args: [1.65],
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to three random foes."
    },
    612: {
        name: "Triple Bite", type: 2, func: 4, calc: 3,
        args: [2.25],
        range: 18, prob: 30, ward: 3,
        desc: "Massive AGI-based damage to three random foes, ignoring position. Attacks rear foes first."
    },
    613: {
        name: "Icy Smile", type: 2, func: 4, calc: 2,
        args: [1.95, 3, 0.5],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage and sometimes freeze three random foes, ignoring position."
    },
    614: {
        name: "Following Orders", type: 2, func: 3, calc: 1,
        args: [1.2, 5, 0.2, 2],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes and sometimes silence foes for 2 turns."
    },
    616: {
        name: "Cat Scratch", type: 2, func: 4, calc: 2,
        args: [1.25],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to five random foes, ignoring position."
    },
    617: {
        name: "Tail Swish", type: 1, func: 1, calc: 0,
        args: [0.2, 3],
        range: 3, prob: 70,
        desc: "Raise WIS of self and adjacent familiars, based on 20% of her WIS."
    },
    618: {
        name: "Jack-O'-Boom", type: 2, func: 4, calc: 2,
        args: [1.15],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },
    619: {
        name: "Pumpkin Bulwark", type: 1, func: 1, calc: 0,
        args: [0.2, 6],
        range: 4, prob: 70,
        desc: "Reduce magic damage taken by all allies."
    },
    620: {
        name: "Storm of Hooves", type: 2, func: 4, calc: 2,
        args: [2],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },
    621: {
        name: "Devoted Arrows", type: 2, func: 4, calc: 2,
        args: [1.7],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },
    622: {
        name: "Deathbed Shot", type: 16, func: 4, calc: 2,
        args: [0.35],
        range: 208, prob: 70, ward: 2,
        desc: "Deal WIS-based damage to all foes upon her death. Increased if fewer foes."
    },
    623: {
        name: "Steamsaw Assault", type: 2, func: 24, calc: 0,
        range: 21, prob: 35, sac: 1,
        randSkills: [624, 625, 626, 627],
        desc: "Strong weapon attack with unpredictable results."
    },
    624: {
        name: "Saw Swipe", type: 2, func: 4, calc: 3,
        args: [2.1],
        range: 16, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to three random foes, ignoring position."
    },
    625: {
        name: "Brutal Slash", type: 2, func: 4, calc: 3,
        args: [1.7],
        range: 19, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to four random foes, ignoring position."
    },
    626: {
        name: "Scatter Shot", type: 2, func: 4, calc: 3,
        args: [1.4],
        range: 20, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to five random foes, ignoring position."
    },
    627: {
        name: "Concussive Blast", type: 2, func: 4, calc: 3,
        args: [1.1, 2, 0.7],
        range: 8, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to and sometimes stun all foes, ignoring position."
    },
    628: {
        name: "Glittering Flame", type: 3, func: 13, calc: 1,
        args: [1.4, 8, 0.5, 2500],
        range: 21, prob: 50, ward: 1, sac: 1,
        desc: "Chance to unleash a burning counter attack when struck."
    },
    629: {
        name: "Slice and Dice", type: 2, func: 3, calc: 1,
        args: [0.7],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes."
    },
    630: {
        name: "Water's Fury", type: 2, func: 34, calc: 2,
        args: [1.75, 1, 0.3, 0.1],
        range: 19, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage and sometimes greatly lower ATK of four random foes."
    },
    631: {
        name: "Water's Mercy", type: 1, func: 1, calc: 0,
        args: [0.25, 17, 1.25],
        range: 3, prob: 70,
        desc: "Raise HP of self and adjacent familiars at beginning of battle."
    },
    632: {
        name: "Fool's Rage", type: 2, func: 36, calc: 1,
        args: [1.35, 0.2, 27, 21],
        range: 419, prob: 30, ward: 1,
        desc: "Drains HP from four random foes while dealing varying ATK-based damage."
    },
    633: {
        name: "Fool's Theurgy", type: 2, func: 6, calc: 0,
        args: [1],
        range: 101, prob: 50,
        desc: "Revive and fully restore HP of 1 random familiar."
    },
    634: {
        name: "Airstrike Spear", type: 2, func: 33, calc: 1,
        args: [1.25, 2, 0.4, 0.15],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes and sometimes greatly lower DEF."
    },
    635: {
        name: "Frumious", type: 2, func: 4, calc: 2,
        args: [1.7, 2, 0.3],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based damage to and sometimes paralyze four random foes, ignoring position."
    },
    636: {
        name: "Cold Tentacles", type: 2, func: 4, calc: 2,
        args: [1.3, 3, 0.25],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage and sometimes freeze five random foes, ignoring position."
    },
    637: {
        name: "Guandao and Claws", type: 2, func: 3, calc: 1,
        args: [1.4],
        range: 419, prob: 30, ward: 1, sac: 1,
        desc: "Deal varying ATK-based damage to four random foes."
    },
    638: {
        name: "Nipping Wind", type: 2, func: 4, calc: 3,
        args: [1.25],
        range: 17, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to six random foes, ignoring position."
    },
    639: {
        name: "Breeze's Mercy", type: 1, func: 1, calc: 0,
        args: [0.25, 4],
        range: 3, prob: 70,
        desc: "Raise AGI of self and adjacent familiars, based on 25% of her WIS."
    },
    640: {
        name: "Turkey Shoot", type: 2, func: 3, calc: 3,
        args: [1.2, 7, 0.2, 1, 0.9],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to five random foes and sometimes blind them for one turn."
    },
    641: {
        name: "Cannonade", type: 2, func: 4, calc: 3,
        args: [1.25],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage to five random foes, ignoring position."
    },
    642: {
        name: "Poison Syrup", type: 2, func: 4, calc: 2,
        args: [1.95, 2, 0.3],
        range: 313, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based damage, sometimes paralyze up to three foes. Increased if fewer foes."
    },
    643: {
        name: "Fluttering Leaf", type: 6, func: 27, calc: 0,
        args: [2, 1, 78, 79],
        range: 21, prob: 50,
        desc: "Evade enemy ATK-based attack skills."
    },
    644: {
        name: "Vine Lash", type: 2, func: 4, calc: 1,
        args: [1.4, 1, 0.5, 10],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes and sometimes poison them, ignoring position."
    },
    645: {
        name: "Dread", type: 2, func: 3, calc: 1,
        args: [1.1],
        range: 314, prob: 30, ward: 1,
        desc: "ATK-based damage to up to four foes. Increased if fewer foes."
    },
    646: {
        name: "Initiative", type: 1, func: 31, calc: 0,
        args: [1, 2],
        range: 4, prob: 70,
        desc: "Order of attack is determined by ATK during the next two turns."
    },
    647: {
        name: "Hailstroke", type: 2, func: 4, calc: 1,
        args: [1.4, 5, 0.35, 1],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "ATK-based damage and sometimes silence five random foes for 1 turn, ignoring position."
    },
    648: {
        name: "Frost Feathers", type: 2, func: 4, calc: 3,
        args: [1.95],
        range: 43, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy AGI-based damage to three random foes, ignoring position. Attack front foes first."
    },
    649: {
        name: "Whirling Spear", type: 2, func: 4, calc: 3,
        args: [1.65],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy AGI-based damage to up to three foes, ignoring position."
    },
    650: {
        name: "Tempest Slash", type: 2, func: 3, calc: 1,
        args: [1.5],
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to four random foes."
    },
    651: {
        name: "Wings of Valor", type: 1, func: 44, calc: 0,
        args: [0.25, 1, 0, 0, 0, 0.1, 4],
        range: 3, prob: 70,
        desc: "Raise ATK/AGI of self and adjacent familiars based on 25% and 10% of his WIS respectively."
    },
    652: {
        name: "Rapid Shot", type: 2, func: 4, calc: 1,
        args: [1.8],
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to four random foes, ignoring position."
    },
    653: {
        name: "Defensive Stance", type: 1, func: 1, calc: 0,
        args: [0.2, 5],
        range: 4, prob: 70,
        desc: "Reduce physical damage taken by all allies."
    },
    654: {
        name: "Fated Doom", type: 2, func: 4, calc: 2,
        args: [2],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },
    655: {
        name: "Wrath of Mauna Kea", type: 2, func: 4, calc: 2,
        args: [1.05, 3, 0.3],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to and sometimes freeze six random foes, ignoring postion."
    },
    656: {
        name: "Grace of Mauna Kea", type: 1, func: 44, calc: 0,
        args: [2, 13, 0, 0, 0, 0.4, 6, 7],
        range: 3, prob: 70,
        desc: "WIS of self/adjacent allies go up when their HP go down, magic/breath dmg taken reduced."
    },
    657: {
        name: "Hound's Bay", type: 2, func: 3, calc: 1,
        args: [1.25],
        range: 208, prob: 30, ward: 1,
        desc: "ATK-based damage to all foes. Increased if fewer foes."
    },
    658: {
        name: "Furious Fangs", type: 3, func: 39, calc: 6,
        args: [1, 1, 4, 30, 5],
        range: 21, prob: 50,
        desc: "Greatly increase ATK and AGI of self when being attacked."
    },
    659: {
        name: "Winter's Breath", type: 2, func: 34, calc: 2,
        args: [1.7, 1, 0.7, 0.15],
        range: 15, prob: 30, ward: 3, sac: 1,
        desc: "Heavy WIS-based DMG to all foes in front/middle line, may greatly lower ATK."
    },
    660: {
        name: "Rain of Ice", type: 2, func: 4, calc: 2,
        args: [1.55],
        range: 54, prob: 30, ward: 3,
        desc: "Heavy WIS-based DMG to four random foes, ignoring position. Middle then rear foes first."
    },
    661: {
        name: "Freezing Gaze", type: 1, func: 19, calc: 0,
        args: [0, 3, 0.2],
        range: 8, prob: 70,
        desc: "Chance to freeze all foes at start of battle."
    },
    662: {
        name: "Unerring Harpoon", type: 2, func: 4, calc: 1,
        args: [0.8],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes, ignoring position."
    },
    663: {
        name: "Enthralling Shot", type: 2, func: 36, calc: 3,
        args: [1.1, 0.25, 27, 21],
        range: 8, prob: 30, ward: 1,
        desc: "Drains HP from all foes while dealing AGI-based damage."
    },
    664: {
        name: "Requited Love", type: 3, func: 13, calc: 3,
        args: [1],
        range: 21, prob: 50, ward: 1,
        desc: "Chance to unleash AGI-based counter attack when struck."
    },
    665: {
        name: "Iceberg Shell", type: 5, func: 14, calc: 1,
        args: [1.6],
        range: 4, prob: 50, ward: 1,
        desc: "Take damage in place of any ally and unleash a heavy counter attack."
    },
    666: {
        name: "Ice Shard", type: 3, func: 41, calc: 2,
        args: [2, 3, 0.3],
        range: 21, prob: 50, ward: 2,
        desc: "Chance to unleash a freezing massive counter attack when struck, ignoring position."
    },
    667: {
        name: "Icy Gift", type: 2, func: 3, calc: 1,
        args: [1.1, 5, 0.3, 1],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to and sometimes silence all foes ."
    },
    668: {
        name: "Hail Stiletto", type: 2, func: 3, calc: 3,
        args: [1.5],
        range: 44, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to four random foes. Attacks front foes first."
    },
    671: {
        name: "Hardened Rime", type: 5, func: 14, calc: 1,
        args: [1.4],
        range: 2, prob: 50, ward: 1, sac: 1,
        desc: "Take damage in place of adjacent familiars and counter."
    },
    672: {
        name: "Snow Blade", type: 2, func: 4, calc: 2,
        args: [1.6],
        range: 39, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage to four random foes, ignoring position. Attacks rear foes first."
    },
    673: {
        name: "Leaching Blizzard", type: 1, func: 46, calc: 0,
        args: [0.2, 3, 0, 0, 0, 3, 0.3],
        range: 7, prob: 70,
        desc: "Greatly lower WIS of up to three foes and sometimes freeze target."
    },
    674: {
        name: "Meteor Shower", type: 2, func: 4, calc: 2,
        args: [1.7, 4, 0.3],
        range: 314, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based damage and sometimes disable up to four foes. Increased if fewer foes."
    },
    675: {
        name: "Tail of Hail", type: 2, func: 4, calc: 2,
        args: [1.65],
        range: 32, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to up to four foes, ignoring position."
    },
    676: {
        name: "Icy Touch", type: 2, func: 3, calc: 1,
        args: [1.9, 5, 0.3],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage and sometimes silence three random foes."
    },
    677: {
        name: "Dance of Snow", type: 2, func: 4, calc: 2,
        args: [1.4],
        range: 208, prob: 30, ward: 2,
        desc: "WIS-based damage to all foes. Increased if fewer foes."
    },
    678: {
        name: "Icy Tailwind", type: 1, func: 1, calc: 0,
        args: [0.15, 8],
        range: 3, prob: 70,
        desc: "Raise the skill trigger rate of self and adjacent familiars by 15%."
    },
    679: {
        name: "Icicle Crush", type: 2, func: 4, calc: 2,
        args: [1.95, 3, 0.4],
        range: 43, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage to and may freeze three random foes. Attack front foes first."
    },
    680: {
        name: "Ice-Crystal Mirror", type: 5, func: 28, calc: 7,
        args: [0.25, 2, 23, 3, 0.5],
        range: 21, prob: 50,
        desc: "Reflect 50% of WIS-based damage back to two random foes."
    },
    681: {
        name: "Trial by Luck", type: 2, func: 37, calc: 2,
        args: [1.35, 0.13, 27, 21],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage and drain HP from all foes, ignoring position."
    },
    682: {
        name: "Flames of Bounty", type: 2, func: 4, calc: 2,
        args: [1.7],
        range: 314, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy WIS-based damage to up to four foes. Increased if fewer foes."
    },
    683: {
        name: "Flames of Ruin", type: 2, func: 4, calc: 2,
        args: [1.65],
        range: 7, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy WIS-based damage to up to three foes, ignoring position."
    },
    684: {
        name: "Luckcall Axe", type: 2, func: 3, calc: 3,
        args: [1.75],
        range: 23, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage to two random foes."
    },
    685: {
        name: "Hexbreak Axe", type: 2, func: 3, calc: 1,
        args: [2],
        range: 23, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },
    686: {
        name: "Blaze of Feathers", type: 2, func: 4, calc: 2,
        args: [1.3, 8, 0.4, 2000],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes burn five random foes, ignoring position."
    },
    687: {
        name: "Anointed Feathers", type: 1, func: 1, calc: 0,
        args: [0.1, 3, 2],
        range: 3, prob: 70,
        desc: "Raise WIS and DEF of self and adjacent familiars at start of battle."
    },
    688: {
        name: "Brush Shot", type: 2, func: 4, calc: 1,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes, ignoring position."
    },
    689: {
        name: "Pain Ordained", type: 2, func: 4, calc: 2,
        args: [2.05],
        range: 313, prob: 30, ward: 2,
        desc: "Massive WIS-based damage to up to three foes, ignoring position. Increased if fewer foes."
    },
    690: {
        name: "Fate Restrained", type: 1, func: 45, calc: 0,
        args: [0.25, 2, 0, 0, 0, 0.15, 3],
        range: 7, prob: 70,
        desc: "Greatly lower DEF and WIS of up to three foes."
    },
    691: {
        name: "Hands of Riches", type: 2, func: 3, calc: 1,
        args: [2.3, 2, 0.4],
        range: 6, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage and sometimes paralyze up to two foes."
    },
    692: {
        name: "Blade of Ending", type: 2, func: 33, calc: 3,
        args: [1.6, 2, 0.15, 0.3],
        range: 16, prob: 30, ward: 1,
        desc: "Heavy AGI-based damage to three random foes and sometimes greatly lower DEF."
    },
    693: {
        name: "Twist of Fate", type: 5, func: 28, calc: 7,
        args: [0.25, 3, 6, 3, 0.5],
        range: 21, prob: 50,
        desc: "Reflect 50% of AGI-based damage back to up to two foes."
    },
    694: {
        name: "Serpent's Lash", type: 2, func: 3, calc: 3,
        args: [0.75],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to five random foes."
    },
    695: {
        name: "Rain of Terror", type: 2, func: 4, calc: 1,
        args: [1.7],
        range: 314, prob: 30, ward: 1,
        desc: "Heavy ATK-based damage to up to four foes, ignoring position. Increased if fewer foes."
    },
    696: {
        name: "Fearless", type: 1, func: 1, calc: 0,
        args: [0.5, 5, 6],
        range: 21, prob: 70,
        desc: "Reduce physical and magical damage taken by self greatly."
    },
    697: {
        name: "Staff of Doom", type: 2, func: 37, calc: 2,
        args: [1.6, 0.15, 27, 21],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage and drain HP from four random foes, ignoring position."
    },
    698: {
        name: "Reclaim Soul", type: 3, func: 11, calc: 1,
        args: [1],
        range: 3, prob: 50,
        desc: "Convert damage to heal self and adjacent familiars."
    },
    699: {
        name: "Multi-Shot Aerial ", type: 2, func: 4, calc: 3,
        args: [1.6, 8, 0.1, 5000],
        range: 39, prob: 30, ward: 2,
        desc: "Heavy AGI-based damage, ignore position and may burn 4 random foes. Attacks rear first."
    },
    700: {
        name: "Cherry Bomb", type: 3, func: 41, calc: 2,
        args: [1],
        range: 21, prob: 50, ward: 2,
        desc: "Chance to unleash WIS-based counter attack when struck."
    },
    701: {
        name: "Gaze of Wealth", type: 1, func: 19, calc: 0,
        args: [0, 2, 0.15],
        range: 7, prob: 70,
        desc: "Chance to paralyze up to three foes at start of battle."
    },
    702: {
        name: "Shield Slash", type: 2, func: 34, calc: 3,
        args: [1.75, 2, 1, 0.1],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy AGI-based damage and lower DEF of all foes, ignoring position."
    },
    703: {
        name: "Entwining Silk", type: 2, func: 4, calc: 2,
        args: [1.3, 4, 0.2],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage and sometimes disable five random foes."
    },
    704: {
        name: "Scales of Darkness", type: 2, func: 4, calc: 2,
        args: [1.1, 7, 0.2, 1, 0.9],
        range: 17, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to six random foes and sometimes blind them."
    },
    705: {
        name: "Hornet Sting", type: 2, func: 4, calc: 1,
        args: [1.35, 1, 0.3, 10],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes and sometimes poison them, ignoring position."
    },
    706: {
        name: "Storm of Wrath", type: 2, func: 36, calc: 1,
        args: [1.1, 0.2, 27, 21],
        range: 20, prob: 30, ward: 1,
        desc: "Drains HP from five random foes while dealing ATK-based damage."
    },
    707: {
        name: "Furious Roar", type: 1, func: 51, calc: 0,
        args: [0, 1, 0.35, 2, 0.35, 1, 121, 120, 43],
        range: 7, prob: 70,
        desc: "Absorbs ATK from up to three foes at beginning of battles."
    },
    708: {
        name: "Discipline", type: 2, func: 4, calc: 2,
        args: [1.6],
        range: 32, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to up to four foes, ignoring position."
    },
    709: {
        name: "Winds of Anemone", type: 2, func: 18, calc: 4,
        args: [1.5],
        range: 4, prob: 30, sac: 1,
        desc: "Restore a large amount of HP to all party members."
    },
    800: {
        name: "Hauteclere", type: 2, func: 3, calc: 1,
        args: [2.65],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },
    801: {
        name: "Mischief Arrows", type: 2, func: 4, calc: 1,
        args: [1.4, 8, 0.5, 1000],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "ATK-based damage and may burn all foes."
    },
    802: {
        name: "Twin Oars", type: 2, func: 3, calc: 1,
        args: [2.25],
        range: 6, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to up to two foes."
    },
    803: {
        name: "Golden Fleece", type: 16, func: 1, calc: 0,
        args: [0.5, 17, 0.5],
        range: 4, prob: 70,
        desc: "Chance to raise HP of all party members upon his death."
    },
    804: {
        name: "Thorn Whip", type: 2, func: 4, calc: 2,
        args: [2.1],
        range: 16, prob: 30, ward: 2,
        desc: "Massive WIS-based damage to three random foes."
    },
    805: {
        name: "Waking Kiss", type: 2, func: 6, calc: 0,
        args: [1],
        range: 122, prob: 50,
        desc: "Revive and fully restore HP of two random familiars."
    },
    806: {
        name: "Dance of the Ogres", type: 2, func: 4, calc: 3,
        args: [2.25],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive AGI-based damage to three random foes, ignoring position."
    },
    807: {
        name: "Iron Rod", type: 2, func: 3, calc: 1,
        args: [1.4],
        range: 15, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes in the front/middle line."
    },
    808: {
        name: "Bloodied Rod", type: 2, func: 3, calc: 1,
        args: [0.8],
        range: 12, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes in the front line."
    },
    809: {
        name: "Ogresbane", type: 2, func: 3, calc: 1,
        args: [1.15, 8, 0.25, 2000],
        range: 45, prob: 30, ward: 1,
        desc: "Deal ATK-based damage and sometimes burn five random foes. Attack front foes first."
    },
    810: {
        name: "Fighting Spirit", type: 1, func: 1, calc: 0,
        args: [0.35, 1],
        range: 3, prob: 70,
        desc: "Raise ATK of self and adjacent familiars based on 35% of his WIS."
    },
    811: {
        name: "Talon Rush", type: 2, func: 4, calc: 1,
        args: [1.55],
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to four random foes, ignoring position."
    },
    812: {
        name: "Vitality Pinion", type: 1, func: 44, calc: 0,
        args: [0.2, 1, 0, 0, 0, 0.2, 3],
        range: 3, prob: 70,
        desc: "Raise ATK and WIS of self and adjacent familiars at start of battle."
    },
    813: {
        name: "Dogfight", type: 2, func: 3, calc: 1,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },
    814: {
        name: "Winds of War", type: 2, func: 3, calc: 1,
        args: [1.4],
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to four random foes."
    },
    815: {
        name: "Psychopomp", type: 1, func: 1, calc: 0,
        args: [816, 16],
        range: 153, prob: 70,
        desc: "Self and two random allies are automatically revived with 60% HP after being killed."
    },
    816: {
        name: "Metempsychosis", type: 16, func: 6, calc: 0,
        args: [0.6],
        range: 21, prob: 100,
        desc: "-"
    },
    817: {
        name: "Jealousy", type: 3, func: 42, calc: 1,
        args: [1.55, 1, 1, 0.07],
        range: 21, prob: 50, ward: 1,
        desc: "Chance to unleash a heavy counter attack when struck, greatly lower ATK."
    },
    818: {
        name: "Grace of Love", type: 1, func: 1, calc: 0,
        args: [0.45, 2],
        range: 21, prob: 70,
        desc: "Raise DEF of self at start of battle."
    },
    819: {
        name: "Enthralling Scent", type: 2, func: 34, calc: 2,
        args: [1.65, 3, 0.3, 0.07],
        range: 34, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based damage to all foes in the front/rear lines, sometimes greatly lower WIS."
    },
    820: {
        name: "Leaping Dead", type: 2, func: 3, calc: 1,
        args: [1.1, 1, 0.3, 10],
        range: 40, prob: 30, ward: 1,
        desc: "ATK-based damage to five random foes, sometimes poison them. Attacks rear foes first."
    },
    821: {
        name: "Hug of the Dead", type: 1, func: 19, calc: 0,
        args: [0, 4, 0.3],
        range: 7, prob: 70,
        desc: "Sometimes disable up to three foes at start of battle."
    },
    822: {
        name: "Burning Tarots", type: 2, func: 4, calc: 2,
        args: [0.65],
        range: 17, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },
    823: {
        name: "Lovesickness", type: 2, func: 4, calc: 2,
        args: [1.35, 5, 0.15, 1],
        range: 8, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to all foes and sometimes silence targets, ignoring position."
    },
    824: {
        name: "Tune of Love", type: 1, func: 44, calc: 0,
        args: [0.3, 2, 0, 0, 0, 0.1, 3],
        range: 4, prob: 70,
        desc: "Raise DEF/WIS of all familiars based on 30% and 10% of his WIS respectively."
    },
    827: {
        name: "Lotus Blossom", type: 2, func: 34, calc: 2,
        args: [1.75, 1, 1, 0.06],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage and lower ATK of four random foes."
    },
    828: {
        name: "Scarlet Arrows", type: 2, func: 4, calc: 1,
        args: [1.3, 8, 0.3, 2000],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes and sometimes burn targets, ignoring position."
    },
    829: {
        name: "Rousing Roar", type: 1, func: 44, calc: 1,
        args: [0.2, 1, 0, 0, 0, 0.1, 4],
        range: 3, prob: 70, sac: 1,
        desc: "Raise ATK/AGI of self and adjacent familiars on 20% and 10% of its ATK respectively."
    },
    830: {
        name: "Gift of the Fleece", type: 1, func: 1, calc: 0,
        args: [0.4, 5],
        range: 3, prob: 70, sac: 1,
        desc: "Reduce physical damage taken by self and adjacent familiars."
    },
    831: {
        name: "Fervent Blade", type: 2, func: 3, calc: 1,
        args: [2],
        range: 16, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to three random foes."
    },
    832: {
        name: "Tit for Tat", type: 3, func: 13, calc: 1,
        args: [1.3],
        range: 21, prob: 50, ward: 1,
        desc: "Chance to unleash a counter attack when struck."
    },
    833: {
        name: "Seeds of Strife", type: 2, func: 4, calc: 3,
        args: [1.55, 2, 0.2],
        range: 208, prob: 30, ward: 2, sac: 1,
        desc: "Heavy AGI-based DMG to all foes, sometimes paralyze target. Increased if fewer foes."
    },
    834: {
        name: "Cold Blood", type: 3, func: 41, calc: 1,
        args: [1.5, 1, 0.4, 10],
        range: 21, prob: 50, ward: 1, sac: 1,
        desc: "Chance to unleash a heavy poisonous counter attack (10% of max HP) when struck."
    },
    835: {
        name: "Funerary Wings", type: 2, func: 3, calc: 3,
        args: [1.6, 2, 0.3],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Heavy AGI-based damage to and sometimes paralyze three random foes."
    },
    836: {
        name: "Blade of Hair", type: 2, func: 4, calc: 1,
        args: [1.3],
        range: 20, prob: 30, ward: 1,
        desc: "ATK-based damage to five random foes, ignoring position."
    },
    837: {
        name: "Hair Cocoon", type: 1, func: 1, calc: 0,
        args: [1, 18],
        range: 122, prob: 70,
        desc: "Allows two random allies to perform an extra action during the next turn."
    },
    838: {
        name: "Calamity Unleashed", type: 2, func: 4, calc: 2,
        args: [1.75],
        range: 19, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage to four random foes, ignoring position."
    },
    839: {
        name: "Last Hope", type: 1, func: 1, calc: 0,
        args: [840, 16],
        range: 21, prob: 70,
        desc: "Revive and fully restore HP of self upon her death."
    },
    840: {
        name: "Dawn's Light", type: 16, func: 6, calc: 0,
        args: [1],
        range: 21, prob: 100,
        desc: "-"
    },
    841: {
        name: "Raging Spear", type: 2, func: 3, calc: 1,
        args: [1.35, 2, 0.25],
        range: 32, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to and sometimes paralyze up to four foes."
    },
    842: {
        name: "Icy Flame", type: 2, func: 4, calc: 2,
        args: [1.6, 8, 0.25, 2500],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage and sometimes burn four random foes, ignoring position."
    },
    843: {
        name: "Rampike Limbs", type: 2, func: 4, calc: 2,
        args: [1.2],
        range: 32, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to up to four foes, ignoring position."
    },
    844: {
        name: "Infernal Gale", type: 2, func: 4, calc: 2,
        args: [1.45],
        range: 19, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to four random foes, ignoring position."
    },
    845: {
        name: "Spring Breeze", type: 1, func: 44, calc: 0,
        args: [0.2, 3, 0, 0, 0, 0.3, 5],
        range: 3, prob: 70,
        desc: "Raise WIS and reduce physical damage taken by self and adjacent familiars."
    },
    846: {
        name: "Sakura Shower", type: 2, func: 4, calc: 2,
        args: [1, 2, 0.2],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to and sometimes paralyze six random foes, ignoring position."
    },
    847: {
        name: "Petals of Confusion", type: 1, func: 1, calc: 0,
        args: [0.15, 3],
        range: 3, prob: 70,
        desc: "Raise WIS of self and adjacent familiars, based on 15% of her WIS."
    },
    848: {
        name: "Gale Claw", type: 2, func: 4, calc: 2,
        args: [2],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },
    851: {
        name: "Blazing Rapier", type: 2, func: 4, calc: 2,
        args: [1.15],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to five random foes, ignoring position."
    },
    854: {
        name: "Conflagration", type: 1, func: 1, calc: 0,
        args: [0.2, 3],
        range: 3, prob: 70, sac: 1,
        desc: "Raise WIS of self and adjacent familiars, based on 20% of his WIS."
    },
    857: {
        name: "Inferno Aegis", type: 1, func: 1, calc: 0,
        args: [0.3, 5],
        range: 3, prob: 70, sac: 1,
        desc: "Reduce physical damage taken by self and adjacent familiars by 30%."
    },
    858: {
        name: "Freezing Wind", type: 2, func: 4, calc: 2,
        args: [0.85],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to five random foes, ignoring position."
    },
    859: {
        name: "Lashing Claws", type: 5, func: 14, calc: 1,
        args: [1.45],
        range: 2, prob: 50, ward: 1,
        desc: "Take damage in place of adjacent familiars and counter."
    },
    860: {
        name: "Last Stand", type: 1, func: 44, calc: 1,
        args: [0.3, 17, 0, 0, 0, 0.3, 2],
        range: 3, prob: 70,
        desc: "Raise HP/DEF of self and adjacent familiars on 30% of its ATK respectively."
    },
    861: {
        name: "Flame Gout", type: 2, func: 34, calc: 2,
        args: [1.35, 2, 0.25, 0.15],
        range: 208, prob: 30, ward: 3,
        desc: "WIS-based DMG and sometimes lower DEF of all foes. Increased if fewer foes."
    },
    862: {
        name: "Brass Wing", type: 5, func: 28, calc: 7,
        args: [0.23, 0, 7, 3, 0.3],
        range: 21, prob: 50,
        desc: "Reflect 70% of all kinds of damages back to up to three foes."
    },
    863: {
        name: "Popping Petals", type: 2, func: 33, calc: 2,
        args: [1.3, 3, 0.2, 0.1],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal WIS-based damage to five random foes and sometimes greatly lower WIS."
    },
    864: {
        name: "Reforged Blade", type: 2, func: 3, calc: 1,
        args: [1.75],
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to three random foes."
    },
    865: {
        name: "Dragonblood Ward", type: 6, func: 27, calc: 0,
        args: [2, 10, 78, 79],
        range: 21, prob: 50,
        desc: "Evade enemy WIS-based and AGI-based attack skills."
    },
    866: {
        name: "Winds of Sorrow", type: 2, func: 4, calc: 2,
        args: [1.6, 3, 0.3],
        range: 314, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage and sometimes freeze up to four foes. Increased if fewer foes."
    },
    867: {
        name: "Tail Blizzard", type: 1, func: 1, calc: 0,
        args: [0.1, 4],
        range: 3, prob: 70,
        desc: "Raise AGI of self and adjacent familiars at start of battle."
    },
    868: {
        name: "Emerald Flame", type: 2, func: 3, calc: 1,
        args: [1.1, 1, 0.3, 10],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to and sometimes poison five random foes."
    },
    870: {
        name: "Oak Arrow", type: 2, func: 4, calc: 1,
        args: [2, 2, 0.4],
        range: 313, prob: 30, ward: 1, sac: 1,
        desc: "Massive ATK-based damage, sometimes paralyze up to three foes. Increased if fewer foes."
    },
    871: {
        name: "Flying Leaf", type: 2, func: 4, calc: 3,
        args: [1.6],
        range: 314, prob: 30, ward: 2, sac: 1,
        desc: "Heavy AGI-based damage to up to four foes, ignoring position. Increased if fewer foes."
    },
    872: {
        name: "Fervent Hooves", type: 2, func: 4, calc: 2,
        args: [1.35],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to five random foes."
    },
    873: {
        name: "Binding Whip", type: 1, func: 19, calc: 0,
        args: [0, 2, 0.3],
        range: 7, prob: 70,
        desc: "Chance to paralyze up to three foes at start of battle."
    },
    874: {
        name: "Perforate", type: 2, func: 33, calc: 1,
        args: [0.95, 3, 0.25, 0.19],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to six random foes and sometimes greatly lower WIS."
    },
    875: {
        name: "Primal Dance", type: 2, func: 3, calc: 1,
        args: [1.45],
        range: 314, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to up to four foes. Increased if fewer foes."
    },
    876: {
        name: "Sharpshooting", type: 2, func: 4, calc: 1,
        args: [2.7, 5, 0.3, 1],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes, sometimes silence targets."
    },
    877: {
        name: "Blood Blade", type: 2, func: 37, calc: 2,
        args: [1.7, 0.3, 27, 21],
        range: 19, prob: 30, ward: 2,
        desc: "Drains HP from four random foes while dealing heavy WIS-based damage."
    },
    878: {
        name: "Eye of Confusion", type: 1, func: 51, calc: 0,
        args: [0, 10, 0.08, 2, 0.35, 1, 121, 120, 43],
        range: 16, prob: 70,
        desc: "Absorbs AGI and WIS from three random foes at the beginning of battles."
    },
    879: {
        name: "Bloodied Hatchet", type: 1, func: 1, calc: 0,
        args: [881, 16],
        range: 36, prob: 70,
        desc: "Self and an ally on the right are automatically revived with 70% HP after being killed."
    },
    880: {
        name: "Hungry Leopard", type: 2, func: 4, calc: 2,
        args: [2.05],
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to three random foes, ignoring position."
    },
    881: {
        name: "Ferocious Incarnation", type: 16, func: 6, calc: 0,
        args: [0.7],
        range: 21, prob: 100,
        desc: "-"
    },
    882: {
        name: "Deceiving Fog", type: 2, func: 4, calc: 2,
        args: [1.6, 7, 0.3, 1, 0.9],
        range: 314, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS dmg and sometimes blind up to 4 foes, ignoring position.  Incresed if fewer foes."
    },
    883: {
        name: "Foul Play", type: 2, func: 4, calc: 3,
        args: [1.25, 2, 0.2],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage to and sometimes paralyze five random foes, ignoring position. "
    },
    884: {
        name: "Surprise Attack", type: 2, func: 4, calc: 3,
        args: [1.25],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage to four random foes, ignoring position."
    },
    885: {
        name: "Blade of Truth", type: 2, func: 3, calc: 1,
        args: [0.95],
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to six random foes."
    },
    886: {
        name: "Honest Heart", type: 1, func: 44, calc: 0,
        args: [0.3, 1, 0, 0, 0, 0.3, 6],
        range: 3, prob: 70,
        desc: "Raise ATK and reduce magical damage taken by self and adjacent familiars."
    },
    887: {
        name: "Punishing Fangs", type: 2, func: 3, calc: 1,
        args: [1.4, 1, 0.25, 10],
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to and sometimes poison four random foes."
    },
    888: {
        name: "False Justice", type: 1, func: 44, calc: 0,
        args: [0.3, 1, 0, 0, 0, 0.1, 3],
        range: 3, prob: 70,
        desc: "Raise ATK + WIS of self and adjacent familiars by 30% and 10% of WIS respectively."
    },
    889: {
        name: "Twin Sickles", type: 2, func: 3, calc: 1,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },
    892: {
        name: "Eggsplosion", type: 2, func: 4, calc: 2,
        args: [1],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to four random foes, ignoring position."
    },
    893: {
        name: "Fiery Breath", type: 2, func: 4, calc: 2,
        args: [1.25, 8, 0.2, 2000],
        range: 8, prob: 30, ward: 3,
        desc: "Deal WIS-based damage to all foes and sometimes burn targets, ignoring position."
    },
    894: {
        name: "Singed Heart", type: 1, func: 45, calc: 0,
        args: [0.1, 2, 0, 0, 0, 0.1, 3],
        range: 7, prob: 70,
        desc: "Greatly lower DEF/WIS of up to three foes based on 10% of its WIS."
    },
    895: {
        name: "Earthen Wall", type: 5, func: 14, calc: 1,
        args: [1.4],
        range: 4, prob: 50, ward: 1, sac: 1,
        desc: "Take damage in place of any ally and counter."
    },
    896: {
        name: "Zephyr Blades", type: 2, func: 4, calc: 3,
        args: [2],
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive AGI-based damage to three random foes, ignoring position."
    },
    897: {
        name: "Tail Wind", type: 1, func: 1, calc: 0,
        args: [0.15, 8],
        range: 36, prob: 70,
        desc: "Raise the skill trigger rate of self and an ally on the right by 15%."
    },
    898: {
        name: "Egg Grenade", type: 2, func: 24, calc: 0,
        range: 21, prob: 30,
        randSkills: [893, 896, 900],
        desc: "No one knows which 1 of 3 random egg skills will be cast."
    },
    899: {
        name: "Grace of Spirit", type: 6, func: 27, calc: 0,
        args: [2, 1, 78, 79],
        range: 21, prob: 50,
        desc: "Evade enemy ATK-based attack skills."
    },
    900: {
        name: "Tidal Chill", type: 2, func: 4, calc: 2,
        args: [1.2, 3, 0.25],
        range: 20, prob: 30, ward: 3,
        desc: "Deal WIS-based damage and sometimes freeze five random foes, ignoring position."
    },
    901: {
        name: "Whirling Eddy", type: 1, func: 44, calc: 0,
        args: [1.8, 13, 0, 0, 0, 1.4, 14],
        range: 3, prob: 70,
        desc: "Raise WIS/AGI of self/adjacent familiars based on WIS/AGI respectively when its HP decreases."
    },
    902: {
        name: "Leaping Staff", type: 2, func: 3, calc: 2,
        args: [0.5],
        range: 20, prob: 30, ward: 1,
        desc: "Deal WIS-based damage to five random foes."
    },
    903: {
        name: "Thorn Tail", type: 2, func: 3, calc: 3,
        args: [0.5],
        range: 20, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to five random foes."
    },
    904: {
        name: "Lance Rush", type: 2, func: 3, calc: 1,
        args: [0.5],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes."
    },
    905: {
        name: "Perdition's Flame", type: 2, func: 4, calc: 2,
        args: [1.15, 8, 0.2, 3000],
        range: 41, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage to six random foes and sometimes burn targets. Attacks rear foes first."
    },
    906: {
        name: "Binding Water", type: 2, func: 4, calc: 2,
        args: [1.55, 3, 0.25],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage and sometimes freeze four random foes, ignoring position."
    },
    907: {
        name: "Despair", type: 2, func: 7, calc: 2,
        args: [2.05, 0.05],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive WIS-based damage to three random foes. Chance to kill targets."
    },
    908: {
        name: "Chivalrous Arrows", type: 2, func: 34, calc: 1,
        args: [1.35, 1, 0.2, 0.15],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes and sometimes lower ATK, ignoring position."
    },
    909: {
        name: "Arondight", type: 2, func: 4, calc: 1,
        args: [1.65, 5, 0.2, 1],
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage and sometimes silence four random foes, ignoring position."
    },
    910: {
        name: "Parting Blade", type: 1, func: 1, calc: 0,
        args: [0.4, 6, 7],
        range: 3, prob: 70,
        desc: "Reduce magic and breath damages taken by self and adjacent familiars."
    },
    911: {
        name: "Trident Fist", type: 2, func: 4, calc: 2,
        args: [1.6, 3, 0.25],
        range: 19, prob: 30, ward: 3, sac: 1,
        desc: "Deal heavy WIS-based damage and sometimes freeze four random foes, ignoring position."
    },
    912: {
        name: "Devouring Whirl", type: 2, func: 33, calc: 1,
        args: [1.85, 2, 1, 0.14],
        range: 43, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage and lower DEF of three random foes in the front line."
    },
    913: {
        name: "Fin Slap", type: 2, func: 3, calc: 3,
        args: [1.3, 3, 0.2],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage and sometimes freeze four random foes."
    },
    914: {
        name: "Claw of the Beast", type: 2, func: 4, calc: 3,
        args: [1.8, 7, 0.3, 1, 1],
        range: 16, prob: 30, ward: 2,
        desc: "Heavy AGI-based damage & sometimes blind three random foes for one turn, ignoring position."
    },
    915: {
        name: "Thorn of Beauty", type: 2, func: 34, calc: 3,
        args: [1.8, 3, 0.3, 0.14],
        range: 16, prob: 30, ward: 2,
        desc: "Heavy AGI-based damage and sometimes lower WIS of three random foes, ignoring position."
    },
    916: {
        name: "Crashing Waves", type: 2, func: 34, calc: 2,
        args: [1.3, 4, 0.2, 0.06],
        range: 8, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes lower AGI of all foes, ignoring position."
    },
    917: {
        name: "Veil of Brine", type: 3, func: 11, calc: 1,
        args: [1],
        range: 36, prob: 50,
        desc: "Heal self and an ally on the right for the amount of damage taken."
    },
    918: {
        name: "Arms of the Beast", type: 2, func: 3, calc: 3,
        args: [1.95, 2, 0.3],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage, sometimes paralyze three random foes."
    },
    919: {
        name: "Ferryman's Toll", type: 2, func: 34, calc: 2,
        args: [1.65, 1, 0.25, 0.07],
        range: 314, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based dmg  and sometimes reduce ATK up to four foes. Increased if fewer foes."
    },
    920: {
        name: "Oar Master", type: 2, func: 4, calc: 2,
        args: [2],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },
    921: {
        name: "Light of Negation", type: 2, func: 4, calc: 2,
        args: [1.2, 7, 0.15, 1, 0.9],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes blind five random foes, ignoring position."
    },
    922: {
        name: "Light of Guidance", type: 1, func: 44, calc: 0,
        args: [0.2, 3, 0, 0, 0, 0.08, 8],
        range: 3, prob: 70,
        desc: "Raise WIS of self/adjacent familiars based on 20% of her WIS, and skill trigger rates by 8%."
    },
    923: {
        name: "Gold Dust Storm", type: 2, func: 4, calc: 2,
        args: [2],
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to three random foes, ignoring position."
    },
    924: {
        name: "Gold Dust Gale", type: 1, func: 1, calc: 0,
        args: [1, 18],
        range: 21, prob: 70,
        desc: "Allows self to perform an extra action during the next turn."
    },
    925: {
        name: "Fleet of Hoof", type: 2, func: 4, calc: 2,
        args: [2],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },
    928: {
        name: "Fierce Dash", type: 2, func: 4, calc: 1,
        args: [1.4],
        range: 315, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage up to five foes, ignoring position. Increased if fewer foes."
    },
    931: {
        name: "Stone Guard", type: 1, func: 1, calc: 0,
        args: [0.2, 1, 2],
        range: 3, prob: 70, sac: 1,
        desc: "Raise ATK/DEF of self and adjacent familiars on 20% of its WIS respectively."
    },
    934: {
        name: "Reflecting Carapace", type: 5, func: 28, calc: 7,
        args: [0.3, 9, 23, 2, 0.4],
        range: 21, prob: 50, sac: 1,
        desc: "Reflect 60% of ATK/AGI-based damage back to up to two foes."
    },
    935: {
        name: "Blizzard Breath", type: 2, func: 4, calc: 2,
        args: [1.1],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },
    936: {
        name: "Ice Cuirass", type: 1, func: 44, calc: 2,
        args: [0.15, 3, 0, 0, 0, 0.05, 4],
        range: 3, prob: 70,
        desc: "Raise WIS/AGI of self and adjacent familiars on 15% and 5% of its WIS respectively."
    },
    937: {
        name: "Life Siphon Claws", type: 2, func: 37, calc: 3,
        args: [1.75, 0.2, 27, 21],
        range: 19, prob: 30, ward: 2,
        desc: "Drains HP from four random foes while dealing heavy AGI-based damage, ignoring position."
    },
    938: {
        name: "Sensual Wing", type: 1, func: 44, calc: 0,
        args: [0.5, 17, 1.25, 0, 0, 0.3, 6],
        range: 3, prob: 70,
        desc: "Raise HP and reduce magic damage taken by self and adjacent familiars."
    },
    939: {
        name: "Axe of Judgment", type: 2, func: 3, calc: 1,
        args: [1.45],
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to four random foes."
    },
    940: {
        name: "Verdict", type: 5, func: 56, calc: 1,
        args: [1.55, 1, 1, 0.2],
        range: 4, prob: 50, ward: 1,
        desc: "Take heavy damage in place of any ally and counter, greatly lower ATK."
    },
    941: {
        name: "Infernal Strike", type: 2, func: 4, calc: 2,
        args: [1.9],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to two random foes, ignoring position."
    },
    942: {
        name: "Soul Slasher", type: 2, func: 4, calc: 2,
        args: [2.2, 8, 0.3, 2000],
        range: 16, prob: 30, ward: 2,
        desc: "Massive WIS-based damage and sometimes burn three random foes, ignoring position."
    },
    943: {
        name: "Infernal Rampart", type: 1, func: 44, calc: 0,
        args: [0.1, 2, 0, 0, 0, 0.1, 3],
        range: 3, prob: 70,
        desc: "Raise DEF/WIS of self and adjacent familiars based on 10% of his WIS respectively."
    },
    944: {
        name: "Fellfeather Dart", type: 2, func: 34, calc: 2,
        args: [1.5, 2, 0.25, 0.08],
        range: 315, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based DMG and sometimes lower DEF of up to five foes. Increased if fewer foes."
    },
    945: {
        name: "Raging Bull", type: 2, func: 4, calc: 1,
        args: [1.65],
        range: 314, prob: 30, ward: 1,
        desc: "Heavy ATK-based DMG to up to four foes. Increased if fewer foes, ignoring position."
    },
    946: {
        name: "Lasso", type: 1, func: 2, calc: 0,
        args: [0.05, 8],
        range: 7, prob: 70,
        desc: "Lower the skill trigger rate of up to three foes by 5%."
    },
    947: {
        name: "Spear & Fang", type: 2, func: 4, calc: 3,
        args: [1.3],
        range: 20, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to five random foes, ignoring position."
    },
    948: {
        name: "Winds of the Wood", type: 1, func: 32, calc: 0,
        args: [0.3, 4],
        range: 7, prob: 70,
        desc: "Greatly lower AGI of up to three foes."
    },
    949: {
        name: "Devour", type: 2, func: 4, calc: 1,
        args: [1.45],
        range: 315, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to up to five foes. Increased if fewer foes, ignoring position."
    },
    950: {
        name: "Greedy Flame", type: 2, func: 34, calc: 3,
        args: [1.7, 2, 0.25, 0.2],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy AGI-based damage and sometimes lower DEF of all foes, ignoring position."
    },
    951: {
        name: "Valiant Spear", type: 2, func: 33, calc: 3,
        args: [1, 4, 0.2, 0.15],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to six random foes and sometimes lower AGI."
    },
    952: {
        name: "Virtuoso Volley", type: 2, func: 4, calc: 3,
        args: [1.6],
        range: 314, prob: 30, ward: 2, sac: 1,
        desc: "Heavy AGI-based damage to up to four foes, ignoring position. Increased if fewer foes."
    },
    953: {
        name: "Grace of the Ring", type: 1, func: 44, calc: 0,
        args: [0.2, 17, 0.4, 0, 0, 0.2, 2],
        range: 3, prob: 70, sac: 1,
        desc: "Raise HP/DEF of self and adjacent familiars based on 20% of his WIS respectively."
    },
    954: {
        name: "Brutal Sanction", type: 2, func: 3, calc: 1,
        args: [1.35, 5, 0.25, 1],
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage and sometimes silence four random foes."
    },
    955: {
        name: "Light of Justice", type: 16, func: 6, calc: 0,
        args: [1],
        range: 121, prob: 50,
        desc: "Revive and fully restore HP of one random ally upon her death."
    },
    957: {
        name: "Sea Breeze Blade", type: 2, func: 33, calc: 1,
        args: [1.1, 3, 0.2, 0.22],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "ATK-based damage to five random foes and sometimes greatly lower WIS."
    },
    958: {
        name: "Blazing Hieroglyph", type: 2, func: 4, calc: 2,
        args: [1.6, 8, 0.2, 2000],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based damage and sometimes burn four random foes, ignoring position."
    },
    959: {
        name: "Scuttle", type: 2, func: 34, calc: 3,
        args: [1.35, 4, 0.15, 0.11],
        range: 208, prob: 30, ward: 2, sac: 1,
        desc: "AGI-based DMG, sometimes lower AGI of all foes, ignoring position. Increased if fewer foes."
    },
    960: {
        name: "Wrath of Kilauea", type: 2, func: 34, calc: 1,
        args: [1.15, 3, 0.2, 0.19],
        range: 17, prob: 30, ward: 1,
        desc: "ATK-based damage, sometimes lower WIS of six random foes, ignoring position."
    },
    961: {
        name: "Grace of Kilauea", type: 1, func: 2, calc: 0,
        args: [0.1, 8],
        range: 7, prob: 70,
        desc: "Lower the skill trigger rate of up to three foes by 10%."
    },
    962: {
        name: "Fist of Stone", type: 2, func: 7, calc: 1,
        args: [1.6, 0.05],
        range: 19, prob: 30, ward: 1,
        desc: "Heavy ATK-based damage to four random foes. Chance to kill targets."
    },
    963: {
        name: "Embrace of Stone", type: 1, func: 44, calc: 0,
        args: [0.23, 1, 0, 0, 0, 0.4, 5],
        range: 3, prob: 70,
        desc: "Raise ATK and reduce physical damage taken by self and adjacent familiars."
    },
    964: {
        name: "Drill Bits", type: 2, func: 34, calc: 1,
        args: [1.6, 3, 0.25, 0.24],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Heavy ATK-based dmg and sometimes reduce WIS of 4 random foes, ignoring position."
    },
    966: {
        name: "Diamond Flurry", type: 2, func: 3, calc: 1,
        args: [1.35],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to up to three foes."
    },
    967: {
        name: "Amethyst Flame", type: 2, func: 4, calc: 3,
        args: [1.65],
        range: 19, prob: 30, ward: 3,
        desc: "Deal heavy AGI-based damage to four random foes, ignoring position."
    },
    968: {
        name: "Amethyst Light", type: 1, func: 44, calc: 0,
        args: [0.2, 1, 0, 0, 0, 0.12, 4],
        range: 3, prob: 70,
        desc: "Raise ATK/AGI of self and adjacent familiars by 20% and 12% of its WIS respectively."
    },
    969: {
        name: "Thralls of the Gem", type: 2, func: 3, calc: 3,
        args: [1],
        range: 20, prob: 30, ward: 1,
        desc: "Deal AGI-based damage to five random foes."
    },
    970: {
        name: "Gifts of the Gem", type: 1, func: 1, calc: 0,
        args: [0.13, 4],
        range: 3, prob: 70,
        desc: "Raise AGI of self and adjacent familiars by 13% of its WIS."
    },
    971: {
        name: "Meteor Slash", type: 2, func: 3, calc: 3,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive AGI-based damage to two random foes."
    },
    972: {
        name: "Cursed Glimmer", type: 2, func: 4, calc: 3,
        args: [1.55, 7, 0.2, 1, 0.9],
        range: 208, prob: 30, ward: 2,
        desc: "Heavy AGI-based damage to all foes and may blind target. Increased if fewer foes."
    },
    973: {
        name: "Diamond Sparkle", type: 1, func: 44, calc: 1,
        args: [0.25, 17, 0, 0, 0, 0.3, 6],
        range: 3, prob: 70,
        desc: "Raise HP by 25% of its ATK, reduce magic dmg taken by self and adjacent allies by 30%."
    },
    974: {
        name: "Habakiri", type: 2, func: 4, calc: 1,
        args: [1.3],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes, ignoring position."
    },
    975: {
        name: "Brave Cry", type: 3, func: 39, calc: 6,
        args: [1, 4, 0, 10, 3],
        range: 3, prob: 50,
        desc: "Chance to increase AGI of self and adjacent familiars when being attacked."
    },
    976: {
        name: "Healing Dance", type: 2, func: 18, calc: 4,
        args: [2],
        range: 122, prob: 30, sac: 1,
        desc: "Restore a large amount of HP to two party members."
    },
    977: {
        name: "Water Whip", type: 2, func: 4, calc: 2,
        args: [1.6, 3, 0.2],
        range: 314, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage and sometimes freeze up to four foes. Increased if fewer foes."
    },
    978: {
        name: "Restrict Gaze", type: 1, func: 19, calc: 0,
        args: [0, 3, 0.3],
        range: 7, prob: 70,
        desc: "Chance to freeze up to three foes at start of battle."
    },
    979: {
        name: "Restrict Water", type: 2, func: 4, calc: 2,
        args: [1],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to five random foes, ignoring position."
    },
    980: {
        name: "Posture of Earth", type: 2, func: 36, calc: 1,
        args: [2.45, 0.4, 27, 21],
        range: 23, prob: 30, ward: 1,
        desc: "Drains HP from two random foes while dealing massive ATK-based damage."
    },
    981: {
        name: "Power of Earth", type: 1, func: 44, calc: 0,
        args: [0.5, 17, 0, 0, 0, 0.9, 2],
        range: 21, prob: 70,
        desc: "Raise HP/DEF of self based on 50% and 90% of his WIS respectively."
    },
    982: {
        name: "Oryza Blade", type: 2, func: 34, calc: 2,
        args: [1.4, 1, 0.2, 0.1],
        range: 40, prob: 30, ward: 2,
        desc: "WIS-based DMG to five random foes, sometimes lower ATK. Attacks rear foes first."
    },
    983: {
        name: "Pray of Fertility", type: 2, func: 18, calc: 4,
        args: [2],
        range: 4, prob: 30,
        desc: "Restore HP to all party members."
    },
    984: {
        name: "Scare", type: 1, func: 2, calc: 0,
        args: [0.3, 8],
        range: 8, prob: 100,
        desc: "Lower the skill trigger rate of all foes by 30%."
    },
    985: {
        name: "Mountains to Dust", type: 2, func: 4, calc: 1,
        args: [1.25, 5, 0.2, 1],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage and sometimes silence five random foes, ignoring position."
    },
    986: {
        name: "Arrows of Wrath", type: 2, func: 4, calc: 1,
        args: [1.35, 7, 0.2, 1, 1],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes and sometimes blind them, ignoring position."
    },
    987: {
        name: "Skull Break", type: 2, func: 33, calc: 1,
        args: [2.45, 1, 0.3, 0.3],
        range: 6, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to up to two foes and sometimes greatly lower ATK."
    },
    988: {
        name: "Cut Unseen", type: 2, func: 4, calc: 1,
        args: [2.1],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to up to three foes, ignoring position."
    },
    989: {
        name: "Brush With Death", type: 2, func: 4, calc: 3,
        args: [1.55],
        range: 20, prob: 30, ward: 2,
        desc: "Deal heavy AGI-based damage to five random foes, ignoring position."
    },
    990: {
        name: "Fear of Death", type: 1, func: 46, calc: 0,
        args: [0.12, 4, 0, 0, 0, 7, 0.35, 1, 0.9],
        range: 7, prob: 70,
        desc: "Lower AGI of up to three foes and sometimes blind target."
    },
    991: {
        name: "Breath of Decay", type: 2, func: 4, calc: 2,
        args: [1.25, 1, 0.2, 10],
        range: 8, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage and sometimes poison all foes, ignoring position."
    },
    992: {
        name: "Thunderous Slash", type: 2, func: 40, calc: 0,
        range: 4, prob: 70, sac: 1,
        desc: "Remove the debuffs of self and all allies."
    },
    993: {
        name: "Burning Fangs", type: 2, func: 4, calc: 2,
        args: [2.1, 8, 0.3, 2000],
        range: 16, prob: 30, ward: 3, sac: 1,
        desc: "Deal massive WIS-based DMG, sometimes burn three random foes, ignoring position."
    },
    994: {
        name: "Scorched Earth", type: 2, func: 4, calc: 2,
        args: [1.6, 8, 0.25, 2500],
        range: 314, prob: 30, ward: 3,
        desc: "Heavy WIS-based DMG, may burn up to four foes, ignoring position. Increased if fewer foes."
    },
    995: {
        name: "Swoop", type: 1, func: 1, calc: 0,
        args: [1, 18],
        range: 3, prob: 70,
        desc: "Allow self and adjacent familiars to perform an extra action during the next turn."
    },
    996: {
        name: "Spear & Tail", type: 2, func: 4, calc: 2,
        args: [1.4, 2, 0.2],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes paralyze five random foes, ignoring position."
    },
    997: {
        name: "Dragon's Might", type: 1, func: 44, calc: 2,
        args: [0.08, 4, 0, 0, 0, 2, 13],
        range: 3, prob: 70,
        desc: "Buff self and adjacent familiars. Raise AGI at start of battle, WIS increase as HP decrease."
    },
    998: {
        name: "Plunder", type: 5, func: 56, calc: 1,
        args: [1.7, 1, 1, 0.07],
        range: 4, prob: 50, ward: 1, sac: 1,
        desc: "Take damage in place of any ally and unleash a heavy counter attack, lowering ATK of target."
    },
    999: {
        name: "Nefarious Neigh", type: 2, func: 34, calc: 3,
        args: [1.6, 4, 0.25, 0.09],
        range: 314, prob: 30, ward: 2, sac: 1,
        desc: "Heavy AGI-based DMG and sometimes reduce AGI of up to 4 foes. Increased if fewer foes."
    },
    1000: {
        name: "Trample", type: 2, func: 4, calc: 2,
        args: [2.15],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },
    1001: {
        name: "Rain of Feathers", type: 2, func: 4, calc: 2,
        args: [1, 5, 0.2, 1],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes silence six random foes, ignoring position."
    },
    1002: {
        name: "Veil of Feathers", type: 1, func: 44, calc: 0,
        args: [0.15, 1, 0, 0, 0, 0.15, 3],
        range: 3, prob: 70,
        desc: "Raise ATK and WIS of self and adjacent familiars by 15% of its WIS."
    },
    1003: {
        name: "Storm of Arrows", type: 2, func: 4, calc: 1,
        args: [1.75],
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to four random foes, ignoring position."
    },
    1004: {
        name: "Gift of the Goddess", type: 1, func: 44, calc: 0,
        args: [0.25, 1, 0, 0, 0, 0.25, 2],
        range: 3, prob: 70,
        desc: "Raise ATK and DEF of self and adjacent familiars by 25% of its WIS."
    },
    1005: {
        name: "Nemesis of Fate", type: 2, func: 4, calc: 2,
        args: [2],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },
    1006: {
        name: "Hail Belch", type: 2, func: 4, calc: 2,
        args: [1.25, 3, 0.25],
        range: 20, prob: 30, ward: 3,
        desc: "Deal WIS-based damage and sometimes freeze five random foes, ignoring position."
    },
    1007: {
        name: "Icemelt Rhapsody", type: 1, func: 44, calc: 0,
        args: [0.27, 3, 0, 0, 0, 1008, 16],
        range: 36, prob: 70,
        desc: "Raise WIS by 27%/Revive with full HP after being killed, self and an ally on the right."
    },
    1008: {
        name: "Glacial Renascence", type: 16, func: 6, calc: 0,
        args: [1],
        range: 21, prob: 100,
        desc: "-"
    },
    1011: {
        name: "Just Deserts", type: 2, func: 3, calc: 1,
        args: [1.05],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes."
    },
    1014: {
        name: "Indignation", type: 1, func: 44, calc: 0,
        args: [0.2, 1, 0, 0, 0, 0.7, 3],
        range: 21, prob: 70, sac: 1,
        desc: "Raise ATK and WIS of self by 20% and 70% of its WIS respectively."
    },
    1017: {
        name: "Mark of Virtue", type: 5, func: 14, calc: 1,
        args: [1.4],
        range: 4, prob: 50, ward: 1, sac: 1,
        desc: "Take damage in place of any ally and unleash a counter attack."
    },
    1018: {
        name: "Chain Snip", type: 2, func: 7, calc: 1,
        args: [1.35, 0.08],
        range: 19, prob: 30, ward: 1,
        desc: "ATK-based damage to four random foes. Chance to kill targets."
    },
    1019: {
        name: "Bubble of Oil", type: 1, func: 1, calc: 1,
        args: [0.3, 17, 1.25],
        range: 3, prob: 70,
        desc: "Raise HP of self and adjacent familiars, based on 30% of her ATK."
    },
    1020: {
        name: "Bloodsucking Axe", type: 3, func: 39, calc: 6,
        args: [1, 1, 2, 20, 3],
        range: 21, prob: 50, sac: 1,
        desc: "Chance to increase ATK and DEF of self when being attacked."
    },
    1021: {
        name: "Sticking Tentacles", type: 2, func: 34, calc: 1,
        args: [2.1, 2, 0.3, 0.2],
        range: 16, prob: 30, ward: 1,
        desc: "Massive ATK-based DMG, sometimes reduce DEF of three random foes, ignoring position."
    },
    1022: {
        name: "Replace", type: 5, func: 28, calc: 7,
        args: [0.45, 2, 23, 2, 0.1],
        range: 21, prob: 50,
        desc: "Reflect 90% of WIS-based damage back to two random foes."
    },
    1023: {
        name: "Dissecting Claw", type: 2, func: 4, calc: 1,
        args: [1.55],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes, ignoring position."
    },
    1024: {
        name: "Icy Crystal", type: 2, func: 4, calc: 2,
        args: [1.2, 2, 0.25],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes paralyze six random foes, ignoring position."
    },
    1025: {
        name: "Glittering Crystal", type: 1, func: 44, calc: 0,
        args: [0.15, 3, 0, 0, 0, 0.3, 6],
        range: 3, prob: 70,
        desc: "Raise WIS and reduce magical damage taken by self and adjacent familiars."
    },
    1026: {
        name: "Spear of Justice", type: 2, func: 4, calc: 1,
        args: [1.05, 6, 0.1, 2, 0.6],
        range: 315, prob: 30, ward: 1,
        desc: "ATK-based DMG to and sometimes confuse up to five foes. Increased if fewer foes."
    },
    1027: {
        name: "Prayer of War", type: 1, func: 51, calc: 0,
        args: [0, 14, 2000, 6, 0.35, 1, 121, 120, 43],
        range: 7, prob: 70,
        desc: "Absorbs ATK/DEF/WIS/AGI from up to three foes at the beginning of battles."
    },
    1028: {
        name: "Chaotic World", type: 1, func: 19, calc: 0,
        args: [0, 6, 1, 2, 1],
        range: 5, prob: 100,
        desc: "Confuse one foe at start of battle."
    },
    1029: {
        name: "Wind of Lust", type: 2, func: 4, calc: 2,
        args: [2.1],
        range: 20, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to five random foes, ignoring position."
    },
    1030: {
        name: "Blade Ward 3", type: 1, func: 1, calc: 0,
        args: [1, 5],
        range: 4, prob: 100,
        desc: "Reduce physical damage taken by all allies."
    },
    1031: {
        name: "Overwhelm", type: 2, func: 33, calc: 3,
        args: [1.2, 1, 0.2, 0.18],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to six random foes and sometimes lower ATK."
    },
    1032: {
        name: "Galloping Slash", type: 2, func: 33, calc: 1,
        args: [1.6, 4, 0.3, 0.18],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to up to three foes and sometimes lower AGI."
    },
    1033: {
        name: "Cyclone Strike", type: 2, func: 4, calc: 1,
        args: [1.3],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to all foes, ignoring position."
    },
    1034: {
        name: "Thunder Whorl", type: 2, func: 33, calc: 3,
        args: [0.9, 1, 0.2, 0.28],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to six random foes and sometimes lower ATK."
    },
    1035: {
        name: "Twining Net", type: 2, func: 53, calc: 2,
        args: [2.4, 4, 0.09, 2, 0.5, 0.5, 121, 120],
        range: 23, prob: 30, ward: 2,
        desc: "Massive WIS-based damage and absorbs AGI from two random foes, ignoring position."
    },
    1036: {
        name: "Leaching Wave", type: 2, func: 53, calc: 3,
        args: [3.2, 3, 0.12, 2, 0.5, 0.5, 121, 120],
        range: 23, prob: 30, ward: 2,
        desc: "Massive AGI-based damage and absorbs WIS from two random foes, ignoring position."
    },
    1037: {
        name: "Medicinal Wine", type: 2, func: 18, calc: 4,
        args: [1, 1],
        range: 123, prob: 30,
        desc: "Full restore HP of three party members."
    },
    1038: {
        name: "Bacchanal", type: 3, func: 11, calc: 1,
        args: [1],
        range: 3, prob: 50,
        desc: "Heal self and adjacent familiars for the amount of damage taken."
    },
    1039: {
        name: "Diamond Flame", type: 2, func: 4, calc: 2,
        args: [1.4, 8, 0.2, 2000],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to all foes and sometimes burn targets, ignoring position."
    },
    1040: {
        name: "Poison Claws", type: 2, func: 3, calc: 1,
        args: [0.9, 1, 0.1, 20],
        range: 17, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage and sometimes poison six random foes."
    },
    1041: {
        name: "Winds of Victory", type: 2, func: 37, calc: 3,
        args: [1.8, 0.18, 27, 21],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy AGI-based damage and drain HP from four random foes, ignoring position."
    },
    1043: {
        name: "Meteor Arrow", type: 2, func: 4, calc: 3,
        args: [1.45, 8, 0.25, 3000],
        range: 315, prob: 30, ward: 2,
        desc: "AGI-based DMG, may burn up to five foes. Increased if fewer foes, ignoring position."
    },
    1044: {
        name: "Belligerence", type: 1, func: 46, calc: 0,
        args: [0.23, 4, 0, 0, 0, 8, 0.35, 4000],
        range: 7, prob: 70,
        desc: "Greatly lower AGI of up to three foes and sometimes burn targets."
    },
    1045: {
        name: "Icy Current", type: 2, func: 4, calc: 2,
        args: [1.6, 3, 0.25],
        range: 314, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage and sometimes freeze up to four foes. Increased if fewer foes."
    },
    1046: {
        name: "Binding Ice", type: 1, func: 19, calc: 0,
        args: [0, 3, 0.2],
        range: 7, prob: 70,
        desc: "Chance to freeze up to three foes at start of battle."
    },
    1047: {
        name: "Poison Wave", type: 2, func: 3, calc: 1,
        args: [1.9, 3, 0.35],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to three random foes and sometimes freeze them."
    },
    1048: {
        name: "Slicing Wave", type: 2, func: 3, calc: 1,
        args: [1],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to four random foes."
    },
    1049: {
        name: "Ferocious Fang", type: 2, func: 4, calc: 1,
        args: [1.4, 3, 0.15],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage and sometimes freeze five random foes, ignoring position."
    },
    1050: {
        name: "Conchsong", type: 1, func: 44, calc: 0,
        args: [0.48, 1, 0, 0, 0, 1.45, 23],
        range: 3, prob: 70,
        desc: "Raise ATK and DEF & WIS of self/adjacent allies go up when their HP go down."
    },
    1051: {
        name: "Encircling Water", type: 2, func: 4, calc: 2,
        args: [1.1],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },
    1052: {
        name: "Might of Song", type: 1, func: 44, calc: 2,
        args: [0.12, 3, 0, 0, 0, 0.06, 4],
        range: 3, prob: 70,
        desc: "Raise WIS and AGI of self and adjacent familiars on 12% and 6% of its WIS respectively."
    },
    1053: {
        name: "Wave Cutter", type: 2, func: 3, calc: 1,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },
    1054: {
        name: "Crimson Flash", type: 2, func: 52, calc: 1,
        args: [0.95, 1, 2500, 6, 0.5, 0.25, 121, 120],
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage and sometimes absorbs ATK from six random foes."
    },
    1055: {
        name: "Flowing Stance", type: 3, func: 42, calc: 1,
        args: [1.45, 4, 1, 0.11],
        range: 21, prob: 50, ward: 1,
        desc: "Chance to unleash a heavy counter attack when struck, lowering AGI of target."
    },
    1056: {
        name: "Bring it on!", type: 3, func: 39, calc: 6,
        args: [1, 1, 0, 100, 10],
        range: 8, prob: 30,
        desc: ".."
    },
    1057: {
        name: "Bring it on!", type: 3, func: 39, calc: 6,
        args: [1, 1, 0, 150, 10],
        range: 8, prob: 30,
        desc: ".."
    },
    1058: {
        name: "Glittering Eye", type: 1, func: 44, calc: 0,
        args: [0.2, 17, 0, 0, 0, 0.2, 2],
        range: 3, prob: 70,
        desc: "Raise HP/DEF of self and adjacent familiars on 20% of its WIS respectively."
    },
    1059: {
        name: "Pouncing Cat", type: 3, func: 41, calc: 2,
        args: [1.6],
        range: 21, prob: 50, ward: 2,
        desc: "Chance to unleash heavy WIS-based counter attack when struck, ignoring position."
    },
    1060: {
        name: "Poison Wing", type: 2, func: 4, calc: 2,
        args: [1.4, 1, 0.1, 10],
        range: 8, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage and sometimes poison all foes, ignoring position."
    },
    1061: {
        name: "Aculeate Tail", type: 2, func: 7, calc: 1,
        args: [1.6, 0.05],
        range: 7, prob: 30, ward: 1,
        desc: "Heavy ATK-based damage and chance to kill up to three targets."
    },
    1062: {
        name: "Punishing Tail", type: 16, func: 19, calc: 0,
        args: [0, 2, 0.7],
        range: 7, prob: 70,
        desc: "High chance to paralyze up to three foes for one turn upon his death."
    },
    1063: {
        name: "Double Bite", type: 2, func: 3, calc: 1,
        args: [1.85],
        range: 6, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to up to two foes."
    },
    1064: {
        name: "Sand Slash", type: 2, func: 3, calc: 3,
        args: [1.75, 7, 0.35, 1, 1],
        range: 16, prob: 30, ward: 1,
        desc: "Heavy AGI-based damage to three random foes, sometimes blind them for one turn."
    },
    1065: {
        name: "Stalwart Hooves", type: 3, func: 38, calc: 6,
        args: [0, 1, 4, 10, 5],
        range: 7, prob: 50,
        desc: "Greatly lower ATK and AGI of up to three foes when being attacked."
    },
    1066: {
        name: "Soaring Talon", type: 2, func: 37, calc: 3,
        args: [1.85, 0.2, 27, 21],
        range: 19, prob: 30, ward: 2,
        desc: "Heavy AGI-based damage and drain HP from four random foes, ignoring position."
    },
    1067: {
        name: "Gift of the Sky", type: 1, func: 44, calc: 0,
        args: [2.5, 12, 0, 0, 0, 1.5, 14],
        range: 3, prob: 70,
        desc: "Raise DEF/AGI of self and adjacent allies go up when their HP go down"
    },
    1068: {
        name: "Mercy for the Fallen2", type: 1, func: 30, calc: 0,
        args: [0, 1],
        range: 7, prob: 100,
        desc: "ATK and WIS of up to three foes swap values with each other."
    },
    1069: {
        name: "Scare2", type: 1, func: 2, calc: 0,
        args: [0.3, 8],
        range: 8, prob: 100,
        desc: "Lower the skill trigger rate of all foes by 30%."
    },
    1070: {
        name: "Blade of Defiance", type: 5, func: 28, calc: 7,
        args: [0.3, 9, 23, 2, 0.4],
        range: 21, prob: 50, sac: 1,
        desc: "Reflect 60% of ATK/AGI-based damage back to two random foes."
    },
    1071: {
        name: "Arena Gale", type: 2, func: 52, calc: 3,
        args: [0.7, 4, 500, 6, 1, 1, 121, 120],
        range: 17, prob: 50, ward: 1, sac: 1,
        desc: "Deal AGI-based damage and absorb AGI from six random foes."
    },
    1073: {
        name: "Seaborn Fog", type: 1, func: 44, calc: 0,
        args: [0.42, 2, 0, 0, 0, 0.25, 5],
        range: 3, prob: 70, sac: 1,
        desc: "Raise DEF and reduce physical damage taken by self and adjacent familiars."
    },
    1074: {
        name: "Blade of Coercion", type: 2, func: 4, calc: 1,
        args: [1.35, 8, 0.25, 3000],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage and sometimes burn five random foes, ignoring position."
    },
    1075: {
        name: "Ward of Wealth", type: 1, func: 44, calc: 0,
        args: [0.35, 1, 0, 0, 0, 1076, 16],
        range: 3, prob: 70,
        desc: "Raise ATK by 35%/Revive with full HP after being killed, self and adjacent familiars."
    },
    1076: {
        name: "Dawn's Light", type: 16, func: 6, calc: 0,
        args: [1],
        range: 21, prob: 100,
        desc: "-"
    },
    1077: {
        name: "Ancient Flame", type: 2, func: 4, calc: 1,
        args: [1.65],
        range: 314, prob: 30, ward: 1,
        desc: "Heavy ATK-based damage to up to four foes, ignoring position. Increased if fewer foes."
    },
    1078: {
        name: "Basalt Skin", type: 1, func: 44, calc: 0,
        args: [0.36, 2, 0, 0, 0, 0.3, 6],
        range: 21, prob: 70,
        desc: "Raise DEF and reduce magic damage taken by self."
    },
    1079: {
        name: "Ancient Blizzard", type: 2, func: 4, calc: 2,
        args: [1.3, 3, 0.2],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "WIS-based damage to all foes and sometimes freeze targets, ignoring position."
    },
    1080: {
        name: "Ancient Thunder", type: 2, func: 4, calc: 2,
        args: [1.05, 2, 0.2],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "WIS-based damage to five random foes and sometimes paralyze targets, ignoring position."
    },
    1081: {
        name: "Angry Hummingbird", type: 2, func: 34, calc: 1,
        args: [1.2, 4, 1, 0.03],
        range: 17, prob: 30, ward: 1,
        desc: "ATK-based damage to six random foes and lower AGI of targets."
    },
    1082: {
        name: "Heartblood Sacrifice", type: 1, func: 51, calc: 0,
        args: [0, 7, 2000, 6, 0.4, 1, 121, 120, 43],
        range: 7, prob: 70,
        desc: "Absorbs ATK and AGI from up to three foes at the beginning of battles."
    },
    1083: {
        name: "Wrath of the Wood", type: 2, func: 34, calc: 1,
        args: [1.45, 1, 0.25, 0.19],
        range: 315, prob: 30, ward: 1,
        desc: "ATK-based DMG, may lower ATK up to five foes, ignoring position. Increased if fewer foes."
    },
    1084: {
        name: "Rage of the Bear", type: 1, func: 44, calc: 0,
        args: [0.45, 17, 0, 0, 0, 0.45, 2],
        range: 3, prob: 70,
        desc: "Raise HP/DEF of self and adjacent familiars on 45% of its WIS respectively."
    },
    1085: {
        name: "Flurry of Blades", type: 2, func: 4, calc: 2,
        args: [2.1],
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage to three random foes, ignoring position."
    },
    1086: {
        name: "Broken Blade Bane", type: 16, func: 32, calc: 0,
        args: [0.2, 1],
        range: 7, prob: 70,
        desc: "Greatly lower ATK of up to three foes upon her death."
    },
    1087: {
        name: "Endless Rush", type: 2, func: 33, calc: 1,
        args: [1.25, 2, 0.25, 0.25],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes and sometimes lower DEF."
    },
    1088: {
        name: "Dain's Legacy", type: 2, func: 3, calc: 1,
        args: [1.35],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to three random foes."
    },
    1089: {
        name: "Flash of Steel", type: 2, func: 4, calc: 2,
        args: [1.5],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },
    1090: {
        name: "Grace of Light", type: 1, func: 44, calc: 0,
        args: [0.25, 3, 0, 0, 0, 1.25, 14],
        range: 3, prob: 70,
        desc: "Raise WIS and AGI of self/adjacent allies go up when their HP go down."
    },
    1091: {
        name: "Armageddon", type: 2, func: 4, calc: 1,
        args: [1.5],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes, ignoring position."
    },
    1092: {
        name: "Aura of Madness", type: 1, func: 44, calc: 0,
        args: [0.35, 1, 0, 0, 0, 0.2, 4],
        range: 3, prob: 70,
        desc: "Raise ATK and AGI of self and adjacent familiars by 35% and by 20% of its WIS."
    },
    1093: {
        name: "Azoth", type: 2, func: 4, calc: 2,
        args: [2],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },
    1094: {
        name: "Leaping Flames", type: 2, func: 4, calc: 2,
        args: [1.3, 8, 0.25, 2500],
        range: 315, prob: 30, ward: 2,
        desc: "Deal WIS-based DMG, may burn up to five foes, ignoring position. Increased if fewer foes."
    },
    1095: {
        name: "Bewitching Dance", type: 3, func: 38, calc: 6,
        args: [1, 3, 4, 25, 5],
        range: 7, prob: 50,
        desc: "Greatly lower WIS and AGI of up to three foes when being attacked."
    },
    1098: {
        name: "Crescent Flame", type: 2, func: 4, calc: 2,
        args: [1],
        range: 17, prob: 30, ward: 3, sac: 1,
        desc: "Deal WIS-based damage to six random foes, ignoring position."
    },
    1101: {
        name: "Waxing Winds", type: 1, func: 1, calc: 0,
        args: [0.3, 6, 7],
        range: 3, prob: 70, sac: 1,
        desc: "Reduce magic and breath damages taken by self and adjacent familiars by 30%."
    },
    1104: {
        name: "Gibbous Gleam", type: 1, func: 44, calc: 0,
        args: [0.1, 2, 0, 0, 0, 0.2, 3],
        range: 3, prob: 70, sac: 1,
        desc: "Raise DEF/WIS of self/adjacent familiars on by 10% and 20% of its WIS respectively."
    },
    1107: {
        name: "Freezing Rain", type: 2, func: 4, calc: 2,
        args: [1.55, 3, 0.2],
        range: 314, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage and sometimes freeze up to four foes. Increased if fewer foes."
    },
    1108: {
        name: "Healing Rain", type: 2, func: 18, calc: 4,
        args: [1.2],
        range: 122, prob: 30,
        desc: "Restore a large amount of HP to two party members."
    },
    1109: {
        name: "Ruyi Hook", type: 2, func: 33, calc: 1,
        args: [2.55, 2, 0.45, 0.2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes and sometimes lower DEF."
    },
    1110: {
        name: "World Breaker", type: 2, func: 52, calc: 3,
        args: [1.7, 4, 800, 6, 0.5, 1, 121, 120],
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage and absorb AGI from three random foes."
    },
    1111: {
        name: "Calamity Ward", type: 1, func: 44, calc: 0,
        args: [0.37, 2, 0, 0, 0, 0.4, 5],
        range: 3, prob: 70,
        desc: "Raise DEF and reduce physical damage taken by self and adjacent familiars."
    },
    1112: {
        name: "Flying Claws", type: 2, func: 3, calc: 3,
        args: [1.7],
        range: 6, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy AGI-based damage to up to two foes."
    },
    1113: {
        name: "Toad Venom", type: 2, func: 4, calc: 2,
        args: [1.95, 2, 0.4],
        range: 313, prob: 30, ward: 2,
        desc: "Heavy WIS-based damage, sometimes paralyze up to three foes. Increased if fewer foes."
    },
    1114: {
        name: "Toad Remedy", type: 1, func: 44, calc: 0,
        args: [0.2, 17, 0, 0, 0, 1115, 16],
        range: 3, prob: 70,
        desc: "Raise HP/Revive with 50% HP after being killed, self and adjacent familiars."
    },
    1115: {
        name: "Toad", type: 16, func: 6, calc: 0,
        args: [0.5],
        range: 21, prob: 100,
        desc: "-"
    },
    1116: {
        name: "Sword of Discord", type: 2, func: 33, calc: 1,
        args: [1.65, 4, 0.4, 0.15],
        range: 16, prob: 30, ward: 1,
        desc: "Heavy ATK-based damage to three random foes, sometimes greatly lower AGI."
    },
    1117: {
        name: "Faithless Fangs", type: 2, func: 33, calc: 3,
        args: [1.8, 1, 1, 0.15],
        range: 16, prob: 30, ward: 1,
        desc: "Heavy AGI-based damage to three random foes, sometimes greatly lower ATK."
    },
    1118: {
        name: "Galatine", type: 2, func: 33, calc: 1,
        args: [1.5, 2, 0.3, 0.18],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to four random foes and sometimes lower DEF."
    },
    1119: {
        name: "Virescent Fog", type: 1, func: 1, calc: 0,
        args: [1, 5],
        range: 21, prob: 70,
        desc: "Reduce totally physical damage taken by self."
    },
    1120: {
        name: "Headsman's Game", type: 2, func: 3, calc: 1,
        args: [1.2],
        range: 6, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to up to two foes."
    },
    1121: {
        name: "Whirling Chain", type: 2, func: 3, calc: 1,
        args: [1.8],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to up to three foes."
    },
    1122: {
        name: "Masked Phantom", type: 2, func: 4, calc: 2,
        args: [1.65, 7, 0.25, 1, 0.9],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to four random foes and sometimes blind them."
    },
    1123: {
        name: "Unhealing Rend", type: 2, func: 4, calc: 3,
        args: [1.55, 2, 0.25],
        range: 17, prob: 30, ward: 2,
        desc: "Heavy AGI-based damage to and sometimes paralyze six random foes, ignoring position. "
    },
    1124: {
        name: "Life Tax", type: 1, func: 51, calc: 0,
        args: [0, 9, 3000, 6, 0.4, 1, 121, 120, 43],
        range: 7, prob: 70,
        desc: "Absorbs DEF and AGI from up to three foes at the beginning of battles."
    },
    1125: {
        name: "Gae Bulg", type: 2, func: 4, calc: 1,
        args: [1.8, 2, 0.25],
        range: 19, prob: 30, ward: 1,
        desc: "Heavy ATK-based damage, sometimes paralyze four random foes, ignoring position."
    },
    1126: {
        name: "Gift of the Spear", type: 3, func: 39, calc: 6,
        args: [1, 3, 0, 20, 3],
        range: 36, prob: 50,
        desc: "Chance to increase WIS of self and an ally on the right when being attacked."
    },
    1127: {
        name: "Freezing Whorl", type: 2, func: 4, calc: 2,
        args: [1.05, 3, 0.4],
        range: 8, prob: 30, ward: 2, sac: 1,
        desc: "WIS-based damage and sometimes freeze all foes, ignoring position."
    },
    1128: {
        name: "Light of Caladbolg", type: 3, func: 39, calc: 6,
        args: [1, 3, 2, 15, 5],
        range: 3, prob: 50, sac: 1,
        desc: "Chance to increase DEF and WIS of self and adjacent familiars when being attacked."
    },
    1129: {
        name: "Shadow Feast", type: 2, func: 37, calc: 2,
        args: [2.25, 0.15, 27, 21],
        range: 16, prob: 30, ward: 2,
        desc: "Deal massive WIS-based damage and drain HP from three random foes, ignoring position."
    },
    1130: {
        name: "Shadow Cloak", type: 1, func: 44, calc: 0,
        args: [2, 13, 0, 0, 0, 1.4, 14],
        range: 3, prob: 70,
        desc: "Raise WIS/AGI of self and adjacent familiars when its HP decreases."
    },
    1131: {
        name: "Dark Geis", type: 2, func: 4, calc: 2,
        args: [1.25, 6, 0.1, 2, 0.6],
        range: 20, prob: 30, ward: 2,
        desc: "WIS-based DMG, sometimes confuse five random foes, ignoring position."
    },
    1132: {
        name: "Bullwark", type: 1, func: 44, calc: 0,
        args: [0.3, 17, 0, 0, 0, 0.15, 3],
        range: 3, prob: 70,
        desc: "Raise HP and WIS of self and adjacent familiars by 30% and 15% of its WIS respectively."
    },
    1133: {
        name: "Harvesting Scythe", type: 2, func: 4, calc: 3,
        args: [1.7],
        range: 314, prob: 30, ward: 2,
        desc: "Heavy AGI-based damage to up to four foes, ignoring position. Increased if fewer foes."
    },
    1134: {
        name: "Shieldbreaker Hooves", type: 1, func: 32, calc: 0,
        args: [0.3, 2],
        range: 7, prob: 70,
        desc: "Greatly lower DEF of up to three foes based on 30% of his WIS."
    },
    1135: {
        name: "Frisky Vines", type: 2, func: 34, calc: 2,
        args: [1.65, 3, 0.3, 0.07],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based damage to 4 random foes and sometimes lower WIS, ignoring position."
    },
    1136: {
        name: "Twining Vines", type: 2, func: 4, calc: 2,
        args: [1.5],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to three random foes, ignoring position."
    },
    1137: {
        name: "Stone Fruit", type: 2, func: 4, calc: 3,
        args: [1.2],
        range: 17, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to six random foes, ignoring position."
    },
    1138: {
        name: "Grove's Mercy", type: 1, func: 44, calc: 0,
        args: [0.3, 4, 0, 0, 0, 1, 18],
        range: 36, prob: 70,
        desc: "Raise AGI of self and an ally on the right, both take an extra action next turn."
    },
    1139: {
        name: "Toil and Trouble", type: 2, func: 4, calc: 3,
        args: [1.65],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy AGI-based damage to four random foes, ignoring position."
    },
    1140: {
        name: "Pumpkin Nostrum", type: 1, func: 44, calc: 0,
        args: [0.25, 4, 0, 0, 0, 1141, 16],
        range: 37, prob: 70,
        desc: "Raise AGI/Revive with 50% HP after being killed, self and an ally on the left."
    },
    1141: {
        name: "Dawn's Light", type: 16, func: 6, calc: 0,
        args: [0.5],
        range: 21, prob: 100,
        desc: "-"
    },
    1142: {
        name: "Rain of Claws", type: 2, func: 3, calc: 3,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive AGI-based damage to two random foes."
    },
    1143: {
        name: "Lurking Jaws", type: 2, func: 52, calc: 3,
        args: [1.65, 7, 1500, 6, 0.5, 0.5, 121, 120],
        range: 19, prob: 30, ward: 1,
        desc: "Heavy AGI-based damage and sometimes absorb ATK/AGI from four random foes."
    },
    1144: {
        name: "Vengeful Claws", type: 3, func: 42, calc: 1,
        args: [1.55, 1, 0.5, 0.15],
        range: 21, prob: 50, ward: 1,
        desc: "Chance to unleash a heavy counter attack when struck, greatly lower ATK."
    },
    1145: {
        name: "Pestilent Blade", type: 1, func: 19, calc: 0,
        args: [0, 1, 1, 25],
        range: 8, prob: 100, sac: 1,
        desc: "Poison all foes at the start of battle."
    },
    1146: {
        name: "Cursed Moonlight", type: 2, func: 4, calc: 2,
        args: [1.25, 1, 0.25, 10],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to and sometimes poison five random foes, ignoring position. "
    },
    1147: {
        name: "Blessed Moonlight", type: 1, func: 1, calc: 6,
        args: [1, 17, 1.5, 5000],
        range: 3, prob: 70,
        desc: "Raise HP of self and adjacent familiars at beginning of battle."
    },
    1148: {
        name: "Thread Lash", type: 2, func: 34, calc: 2,
        args: [1.25, 4, 0.3, 0.04],
        range: 8, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes lower AGI of all foes, ignoring position."
    },
    1149: {
        name: "Thread Shackle", type: 1, func: 46, calc: 0,
        args: [0.08, 4, 0, 0, 0, 2, 0.3, 1],
        range: 7, prob: 70,
        desc: "Greatly lower AGI of up to three foes and sometimes paralyze targets for one turn."
    },
    1150: {
        name: "Witch's Mallet", type: 2, func: 37, calc: 2,
        args: [1.5, 0.15, 27, 21],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage and drain HP from four random foes, ignoring position."
    },
    1151: {
        name: "Pumpkin Victuals", type: 1, func: 44, calc: 0,
        args: [2.5, 12, 0, 0, 0, 1.8, 13],
        range: 3, prob: 70,
        desc: "Buff self/adjacent familiars. DEF/WIS of each affected ally increase as its HP decrease."
    },
    1152: {
        name: "Dance of Flames", type: 2, func: 4, calc: 2,
        args: [1.55, 8, 0.3, 2500],
        range: 20, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage and sometimes burn five random foes, ignoring position."
    },
    1153: {
        name: "Splash of Fire", type: 5, func: 28, calc: 7,
        args: [0.3, 8, 6, 3, 0.4],
        range: 21, prob: 50,
        desc: "Reflect 60% of ATK/WIS-based damage back to up to two foes."
    },
    1154: {
        name: "Hateful Blaze", type: 2, func: 4, calc: 2,
        args: [1.25],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal WIS-based damage to four random foes, ignoring position."
    },
    1155: {
        name: "Bone Charge", type: 2, func: 3, calc: 1,
        args: [1.15],
        range: 314, prob: 30, ward: 1,
        desc: "ATK-based damage to up to four foes. Increased if fewer foes."
    },
    1156: {
        name: "Back from Beyond", type: 1, func: 1, calc: 0,
        args: [1158, 16],
        range: 21, prob: 70,
        desc: "Self is automatically revived with full HP after being killed."
    },
    1157: {
        name: "Necromancy", type: 2, func: 6, calc: 0,
        args: [1],
        range: 122, prob: 50, sac: 1,
        desc: "Revive and fully restore HP of two random allies."
    },
    1158: {
        name: "Back from Beyond", type: 16, func: 6, calc: 0,
        args: [1],
        range: 21, prob: 100,
        desc: "-"
    },
    1159: {
        name: "Death's Charge", type: 2, func: 33, calc: 3,
        args: [1.45, 4, 1, 0.016],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to five random foes and lower AGI."
    },
    1160: {
        name: "Impish Wings", type: 2, func: 3, calc: 3,
        args: [2],
        range: 23, prob: 30, ward: 1,
        desc: "Deal massive AGI-based damage to two random foes."
    },
    1161: {
        name: "Impish Claws", type: 2, func: 3, calc: 1,
        args: [1.65],
        range: 23, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to two random foes."
    },
    1162: {
        name: "Lightning Lunge", type: 2, func: 3, calc: 3,
        args: [1.3],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to four random foes."
    },
    1163: {
        name: "Ardent Swing", type: 2, func: 53, calc: 2,
        args: [2.1, 2, 2000, 6, 0.4, 1, 121, 120],
        range: 7, prob: 30, ward: 2, sac: 1,
        desc: "Massive WIS-based damage and absorbs DEF from up to three foes."
    },
    1164: {
        name: "Shadow Piercer", type: 2, func: 4, calc: 1,
        args: [1.65, 8, 0.5, 1500],
        range: 19, prob: 30, ward: 1,
        desc: "Heavy ATK-based damage and sometimes burn four random foes, ignoring position."
    },
    1165: {
        name: "Tailsman Ward", type: 1, func: 44, calc: 0,
        args: [0.28, 1, 0, 0, 0, 0.17, 4],
        range: 3, prob: 70,
        desc: "Raise ATK/AGI of self and adjacent familiars based on 28% and 17% of his WIS respectively."
    },
    1166: {
        name: "Eternal Damnation", type: 2, func: 4, calc: 2,
        args: [1.3],
        range: 8, prob: 30, ward: 3,
        desc: "Deal WIS-based damage to all foes, ignoring position."
    },
    1167: {
        name: "Wailing Wall", type: 3, func: 39, calc: 6,
        args: [1, 2, 0, 30, 3],
        range: 3, prob: 50,
        desc: "Greatly increase DEF of self and adjacent familiars when being attacked."
    },
    1168: {
        name: "Bone Bash", type: 2, func: 3, calc: 1,
        args: [1.9, 2, 0.35],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage and sometimes paralyze up to three foes."
    },
    1169: {
        name: "Might of the Wolf", type: 1, func: 1, calc: 0,
        args: [3, 11],
        range: 21, prob: 70, sac: 1,
        desc: "Greatly increase ATK of self as her HP decrease."
    },
    1170: {
        name: "Fist of Treats", type: 2, func: 53, calc: 1,
        args: [1.25, 1, 1000, 6, 1, 1, 121, 120],
        range: 20, prob: 30, ward: 1,
        desc: "ATK-based damage and absorbs ATK from five random foes, ignoring position."
    },
    1171: {
        name: "Fist of Tricks", type: 1, func: 46, calc: 0,
        args: [0.68, 2, 0, 0, 0, 8, 1, 2000],
        range: 7, prob: 70,
        desc: "Greatly lower DEF of up to three foes and burn targets."
    },
    1172: {
        name: "Bandaged Blade", type: 2, func: 33, calc: 1,
        args: [1.75, 2, 0.4, 0.25],
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage, may lower DEF of three random foes."
    },
    1173: {
        name: "Cursed Bandages", type: 3, func: 63, calc: 1,
        args: [1.3, 0.3, 27, 21],
        range: 21, prob: 50, ward: 1,
        desc: "Chance to unleash a heavy counter attack and drain HP from target when struck."
    },
    1174: {
        name: "Arrow of the Fly Lord", type: 2, func: 4, calc: 1,
        args: [1.7, 2, 0.25],
        range: 314, prob: 30, ward: 1, sac: 1,
        desc: "Heavy ATK-based DMG and sometimes paralyze up to four foes. Increased if fewer foes."
    },
    1175: {
        name: "Draw of Death", type: 2, func: 4, calc: 2,
        args: [1.55],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },
    1176: {
        name: "Lust for Life", type: 2, func: 6, calc: 0,
        args: [0.5],
        range: 2, prob: 50,
        desc: "Revive adjacent allies with 50% of their HP."
    },
    1178: {
        name: "Swarm of Flies", type: 2, func: 37, calc: 3,
        args: [1.15, 0.2, 27, 21],
        range: 17, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage and drain HP from six random foes, ignoring position."
    },
    1179: {
        name: "Ravenous Flies", type: 2, func: 4, calc: 3,
        args: [1.35],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage to four random foes, ignoring position."
    },
    1180: {
        name: "Maple Edge", type: 2, func: 4, calc: 2,
        args: [1.25],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to five random foes, ignoring position."
    },
    1181: {
        name: "Bracing Breeze", type: 1, func: 44, calc: 0,
        args: [0.2, 3, 0, 0, 0, 1.8, 13],
        range: 3, prob: 70,
        desc: "Raise self/adjacent allies' WIS by 20% of her WIS, their WIS increases as HP falls."
    },
    1182: {
        name: "Bug Bomb", type: 2, func: 4, calc: 2,
        args: [1.15, 1, 0.15, 5],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes poison six random foes, ignoring position. "
    },
    1183: {
        name: "Insect Repellant", type: 1, func: 44, calc: 0,
        args: [0.24, 17, 0, 0, 0, 0.12, 3],
        range: 3, prob: 70,
        desc: "Raise HP and WIS of self and adjacent familiars by 24% and 12% of its WIS respectively."
    },
    1184: {
        name: "Rampike Claws", type: 2, func: 4, calc: 2,
        args: [2],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive WIS-based damage to two random foes, ignoring position."
    },
    1185: {
        name: "Cursed Cobra", type: 2, func: 4, calc: 2,
        args: [1.3, 6, 0.1, 2, 0.6],
        range: 315, prob: 30, ward: 2,
        desc: "WIS-based DMG to and sometimes confuse up to five foes. Increased if fewer foes."
    },
    1186: {
        name: "Fortuitous Refrain", type: 1, func: 44, calc: 0,
        args: [0.2, 3, 0, 0, 0, 1187, 16],
        range: 3, prob: 70,
        desc: "Raise WIS by 20%/Revive with 75% HP after being killed, self and adjacent familiars."
    },
    1187: {
        name: "Fortuitous Refrain", type: 16, func: 6, calc: 0,
        args: [0.75],
        range: 21, prob: 100,
        desc: "-"
    },
    1190: {
        name: "Thundercall Horn", type: 2, func: 4, calc: 3,
        args: [1.3],
        range: 20, prob: 30, ward: 2, sac: 1,
        desc: "Deal AGI-based damage to five random foes, ignoring position."
    },
    1193: {
        name: "Enraged Bull", type: 1, func: 44, calc: 1,
        args: [0.15, 1, 0, 0, 0, 0.1, 4],
        range: 3, prob: 70, sac: 1,
        desc: "Raise ATK/AGI of self and adjacent familiars based on 15% and 10% of its ATK respectively."
    },
    1196: {
        name: "Lulled Bull", type: 1, func: 44, calc: 1,
        args: [0.15, 3, 0, 0, 0, 0.1, 4],
        range: 3, prob: 70, sac: 1,
        desc: "Raise WIS/AGI of self and adjacent familiars based on 15% and 10% of its ATK respectively."
    },
    1197: {
        name: "Lightning Doublestrike", type: 2, func: 3, calc: 1,
        args: [2.1],
        range: 6, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to up to two foes."
    },
    1198: {
        name: "Grace of the Sky", type: 1, func: 1, calc: 0,
        args: [0.7, 5, 6],
        range: 21, prob: 70,
        desc: "Reduce physical and magical damage taken by self greatly."
    },
    1199: {
        name: "Embers of the Sun", type: 2, func: 4, calc: 2,
        args: [1.55, 8, 0.25, 1500],
        range: 314, prob: 30, ward: 3, sac: 1,
        desc: "Heavy WIS-based DMG, may burn up to four foes, ignoring position. Increased if fewer foes."
    },
    1200: {
        name: "Saber & Feather", type: 2, func: 33, calc: 1,
        args: [1.9, 2, 1, 0.1],
        range: 16, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage to three random foes and lower DEF."
    },
    1201: {
        name: "Wall of Feathers", type: 1, func: 44, calc: 0,
        args: [0.5, 1, 0, 0, 0, 0.5, 2],
        range: 3, prob: 70,
        desc: "Raise ATK and DEF of self and adjacent familiars by 50% of his WIS."
    },
    1202: {
        name: "Fellfeather Saber", type: 2, func: 3, calc: 3,
        args: [1.15],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to up to three foes."
    },
    1203: {
        name: "Divine Gale", type: 2, func: 34, calc: 2,
        args: [1.3, 4, 0.25, 0.05],
        range: 20, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes lower AGI of five random foes, ignoring position."
    },
    1204: {
        name: "Divine Tailwind", type: 1, func: 44, calc: 2,
        args: [0.14, 3, 0, 0, 0, 0.08, 4],
        range: 3, prob: 70,
        desc: "Raise WIS/AGI of self and adjacent familiars on 14% and 8% of its WIS respectively."
    },
    1205: {
        name: "Dance of the Harvest", type: 2, func: 18, calc: 4,
        args: [0.7, 1],
        range: 4, prob: 50,
        desc: "Restore 70% of HP to all party members."
    },
    1206: {
        name: "Popping Corn", type: 3, func: 43, calc: 2,
        args: [1.85, 1, 1, 0.06],
        range: 21, prob: 50, ward: 2,
        desc: "Chance to unleash a heavy counter attack when struck, lowering ATK of target."
    },
    1207: {
        name: "Gleipnir", type: 2, func: 4, calc: 1,
        args: [1.6, 2, 0.3],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Heavy ATK-based damage, sometimes paralyze four random foes, ignoring position."
    },
    1208: {
        name: "Shredded Chain", type: 2, func: 4, calc: 3,
        args: [1.8],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy AGI-based damage to four random foes, ignoring position."
    },
    1209: {
        name: "Sigil of Blood", type: 1, func: 44, calc: 0,
        args: [0.25, 1, 0, 0, 0, 0.25, 3],
        range: 3, prob: 70,
        desc: "Raise ATK/WIS of self and adjacent allies by 25% of its WIS."
    },
    1210: {
        name: "Whip & Tail", type: 2, func: 34, calc: 1,
        args: [1.4, 4, 0.2, 0.15],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes and sometimes lower AGI, ignoring position."
    },
    1211: {
        name: "Heavy Strike", type: 2, func: 4, calc: 1,
        args: [2.15, 8, 0.35, 2000],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Massive ATK-based damage and sometimes burn up to three foes, ignoring position."
    },
    1212: {
        name: "Claws of Death", type: 2, func: 4, calc: 2,
        args: [1.1, 5, 0.3, 1],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage and sometimes silence six random foes, ignoring position."
    },
    1213: {
        name: "Miasma of Death", type: 3, func: 62, calc: 2,
        args: [1.75, 0.4, 27, 21],
        range: 21, prob: 50, ward: 2,
        desc: "Chance to unleash a heavy counter attack when struck and drain HP from target."
    },
    1214: {
        name: "Moonlight Volley", type: 2, func: 4, calc: 1,
        args: [1.75],
        range: 314, prob: 30, ward: 1,
        desc: "Heavy ATK-based damage to up to four foes, ignoring position. Increased if fewer foes."
    },
    1215: {
        name: "Gift of the Moon", type: 1, func: 51, calc: 0,
        args: [0, 4, 2000, 6, 0.33, 1, 121, 120, 43],
        range: 7, prob: 70,
        desc: "Absorb AGI from up to three foes at beginning of battles."
    },
    1216: {
        name: "Gambol", type: 6, func: 27, calc: 0,
        args: [2, 9, 78, 79],
        range: 21, prob: 50, sac: 1,
        desc: "Evade enemy ATK-based and AGI-based attack skills."
    },
    1217: {
        name: "Turkey Dash", type: 2, func: 7, calc: 3,
        args: [1.05, 0.1],
        range: 8, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage to all foes. Chance to kill targets."
    },
    1218: {
        name: "Falling Apple", type: 2, func: 34, calc: 2,
        args: [1.1, 3, 0.25, 0.08],
        range: 17, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to six random foes, sometimes lower WIS, ignoring position."
    },
    1219: {
        name: "Glittering Apple", type: 1, func: 44, calc: 0,
        args: [0.2, 3, 0, 0, 0, 1220, 16],
        range: 3, prob: 70,
        desc: "Raise WIS by 20% of her WIS, self and adjacent allies revive with 75% HP on death."
    },
    1220: {
        name: "Glittering Apple", type: 16, func: 6, calc: 0,
        args: [0.75],
        range: 21, prob: 100,
        desc: "-"
    },
    1221: {
        name: "Thorn of the Grove", type: 2, func: 52, calc: 3,
        args: [1.5, 2, 1000, 6, 1, 1, 121, 120],
        range: 19, prob: 30, ward: 1,
        desc: "Deal heavy AGI-based damage and absorb DEF from four random foes."
    },
    1222: {
        name: "Paling of the Grove", type: 1, func: 1, calc: 0,
        args: [0.12, 9],
        range: 3, prob: 70,
        desc: "Raise ATK, DEF, WIS and AGI of self and adjacent allies."
    },
    1223: {
        name: "Trailblazer", type: 2, func: 4, calc: 1,
        args: [1.35, 8, 0.25, 4000],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage and sometimes burn five random foes, ignoring position."
    },
    1224: {
        name: "Smoldering Coals", type: 2, func: 4, calc: 2,
        args: [1.6],
        range: 314, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to up to four foes. Increased if fewer foes."
    },
    1225: {
        name: "Bustling Broom", type: 5, func: 27, calc: 0,
        args: [2, 2, 78, 79],
        range: 21, prob: 50,
        desc: "Evade enemy WIS-based attack skills."
    },
    1226: {
        name: "Gift of Fire", type: 2, func: 4, calc: 1,
        args: [2.1, 8, 0.25, 2500],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Massive ATK-based damage and sometimes burn three random foes, ignoring position."
    },
    1227: {
        name: "Scold", type: 2, func: 4, calc: 1,
        args: [1],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal ATK-based damage to five random foes, ignoring position."
    },
    1228: {
        name: "Ice Blade", type: 2, func: 3, calc: 1,
        args: [1.25, 3, 0.3],
        range: 19, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to four random foes and sometimes freeze them."
    },
    1229: {
        name: "Iron Heel Ward", type: 1, func: 44, calc: 1,
        args: [0.23, 1, 0, 0, 0, 1.5, 14],
        range: 3, prob: 70,
        desc: "Raise ATK of self/adjacent familiars by 23% of his ATK; raise their AGI as his HP decreases."
    },
    1230: {
        name: "Hail Arrows", type: 2, func: 4, calc: 1,
        args: [1.45],
        range: 20, prob: 30, ward: 1,
        desc: "Deal ATK-based damage to five random foes, ignoring position."
    },
    1231: {
        name: "Secrets of the Hunt", type: 1, func: 44, calc: 1,
        args: [0.1, 4, 0, 0, 0, 0.2, 1],
        range: 3, prob: 70,
        desc: "Raise AGI/ATK of self and adjacent familiars by 10% and 20% of its ATK respectively."
    },
    1232: {
        name: "Vicious Scratch", type: 2, func: 3, calc: 1,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },
    1233: {
        name: "Icy Rage", type: 2, func: 34, calc: 2,
        args: [1.35, 4, 1, 0.04],
        range: 315, prob: 30, ward: 2,
        desc: "WIS-based DMG and reduce AGI of up to 5 foes. Increased if fewer foes."
    },
    1234: {
        name: "Icy Love", type: 1, func: 44, calc: 0,
        args: [0.27, 2, 0, 0, 0, 0.18, 3],
        range: 3, prob: 70,
        desc: "Raise DEF/WIS of self and adjacent allies by 27%/18% of her WIS."
    },
    1235: {
        name: "Rapid Fire", type: 2, func: 3, calc: 1,
        args: [1.2],
        range: 420, prob: 30, ward: 1,
        desc: "Deal varying ATK-based damage to five random foes."
    },
    1236: {
        name: "Hunter's Gait", type: 1, func: 1, calc: 0,
        args: [0.3, 5],
        range: 3, prob: 70,
        desc: "Reduce physical damage taken by self and adjacent allies by 30%."
    },
    1237: {
        name: "Ice Shuriken", type: 2, func: 3, calc: 1,
        args: [1.85, 3, 0.35],
        range: 16, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage and sometimes freeze three random foes."
    },
    1238: {
        name: "Ice Smasher", type: 2, func: 33, calc: 1,
        args: [1.6, 2, 0.4, 0.3],
        range: 7, prob: 30, ward: 1,
        desc: "Deal heavy ATK-based damage and sometimes lower DEF of up to three foes."
    },
    1239: {
        name: "Revenge of the Wild", type: 3, func: 42, calc: 1,
        args: [1.35, 2, 0.5, 0.45],
        range: 21, prob: 50, ward: 1,
        desc: "Unleash a counter attack when struck, sometimes lower DEF of target."
    },
    1240: {
        name: "Bigfoot Stomp", type: 2, func: 3, calc: 1,
        args: [1.9],
        range: 6, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage to up to two foes."
    },
    1241: {
        name: "Winds of Night", type: 2, func: 4, calc: 3,
        args: [1.1],
        range: 17, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to six random foes, ignoring position."
    },
    1242: {
        name: "Might of Night", type: 1, func: 44, calc: 0,
        args: [1.25, 14, 0, 0, 0, 2, 12],
        range: 3, prob: 70,
        desc: "Raise AGI/DEF of self and adjacent allies when its HP decreases."
    },
    1243: {
        name: "Freezing Breath", type: 2, func: 4, calc: 3,
        args: [1.85, 3, 0.3],
        range: 19, prob: 30, ward: 3,
        desc: "Deal heavy AGI-based DMG and sometimes freeze four random foes, ignoring position."
    },
    1244: {
        name: "Sapping Snow", type: 1, func: 51, calc: 0,
        args: [0, 9, 2500, 6, 0.35, 1, 121, 120, 43],
        range: 7, prob: 70,
        desc: "Absorbs AGI and DEF from up to three foes at the beginning of battles."
    },
    1245: {
        name: "Revelation of Death", type: 2, func: 52, calc: 1,
        args: [1.05, 2, 1000, 6, 1, 1, 121, 120],
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage and absorb DEF from six random foes."
    },
    1246: {
        name: "Grace of the Angel", type: 5, func: 14, calc: 1,
        args: [1],
        range: 2, prob: 50, ward: 1,
        desc: "Take damage in place of nearby ally and counter."
    },
    1247: {
        name: "Marmyadose ", type: 2, func: 52, calc: 1,
        args: [1.8, 1, 1000, 6, 1, 1, 121, 120],
        range: 7, prob: 30, ward: 1, sac: 1,
        desc: "Deal heavy ATK-based damage and absorb ATK from up to three foes."
    },
    1248: {
        name: "Lava Axe", type: 2, func: 7, calc: 1,
        args: [2.25, 0.15],
        range: 5, prob: 30, ward: 1,
        desc: "Massive ATK-based damage to one foe and chance to kill target."
    },
    1249: {
        name: "Lava Armor", type: 1, func: 1, calc: 0,
        args: [0.8, 5, 6],
        range: 21, prob: 70,
        desc: "Reduce physical and magical damage taken by self greatly."
    },
    1250: {
        name: "Wall Smasher", type: 2, func: 3, calc: 1,
        args: [4.5],
        range: 5, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to one foe."
    },
    1251: {
        name: "Impregnable Wall", type: 5, func: 12, calc: 0,
        range: 2, prob: 50, sac: 1,
        desc: "Take damage in place of adjacent familiars."
    },
    1252: {
        name: "Entangling Arrows", type: 2, func: 53, calc: 3,
        args: [2.2, 4, 700, 6, 0.75, 1, 121, 120],
        range: 16, prob: 30, ward: 2,
        desc: "Massive AGI-based damage and absorb AGI from three random foes, ignoring position."
    },
    1253: {
        name: "Souldrain Arrows", type: 2, func: 37, calc: 3,
        args: [2.2, 0.1, 27, 21],
        range: 16, prob: 30, ward: 2,
        desc: "Massive AGI-based damage and drain HP from three random foes, ignoring position."
    },
    1254: {
        name: "Volcanic Bomb", type: 2, func: 3, calc: 1,
        args: [2.1, 8, 1, 2500],
        range: 7, prob: 30, ward: 1,
        desc: "Massive ATK-based damage and burn up to three foes."
    },
    1255: {
        name: "Hardened Lava", type: 3, func: 39, calc: 6,
        args: [1, 2, 0, 60, 5],
        range: 21, prob: 70,
        desc: "Greatly increase DEF of self when being attacked."
    },
    1256: {
        name: "Destructive Urge", type: 3, func: 39, calc: 6,
        args: [1, 1, 2, 50, 5],
        range: 21, prob: 50, sac: 1,
        desc: "Greatly increase ATK and DEF of self when being attacked."
    },
    1257: {
        name: "Raise Morale", type: 1, func: 44, calc: 6,
        args: [1, 1, 0, 2500, 0, 1, 4, 0, 1500],
        range: 3, prob: 70, sac: 1,
        desc: "Raise AGI and ATK of self and adjacent allies at start of battle."
    },
    1258: {
        name: "Chilling Deluge", type: 2, func: 4, calc: 2,
        args: [1.75, 3, 0.3],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage and sometimes freeze four random foes, ignoring position."
    },
    1259: {
        name: "Aquarius Boon", type: 1, func: 44, calc: 0,
        args: [2, 13, 0, 0, 0, 0.6, 5],
        range: 3, prob: 70,
        desc: "Reduce physical dmg taken by self&adjacent allies; raise their WIS when her HP decreases."
    },
    1260: {
        name: "Sacrificial Fire", type: 2, func: 4, calc: 1,
        args: [1.1, 8, 0.25, 3500],
        range: 17, prob: 30, ward: 1,
        desc: "Deal ATK-based damage and sometimes burn six random foes, ignoring position."
    },
    1261: {
        name: "Draw Heat", type: 1, func: 51, calc: 0,
        args: [0, 7, 3000, 6, 0.4, 1, 121, 120, 43],
        range: 7, prob: 70,
        desc: "Absorbs ATK and AGI from up to three foes at start of battles."
    },
    1262: {
        name: "Shower of Light", type: 2, func: 4, calc: 2,
        args: [1.4],
        range: 8, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to all foes, ignoring position."
    },
    1263: {
        name: "Grace of the Sun", type: 1, func: 44, calc: 0,
        args: [0.26, 2, 0, 0, 0, 0.5, 6],
        range: 21, prob: 70,
        desc: "Raise DEF by 26% of its WIS, and reduce magic damage taken by self by 50%."
    },
    1264: {
        name: "Piercing Sound", type: 2, func: 4, calc: 2,
        args: [1.25],
        range: 315, prob: 30, ward: 2,
        desc: "Deal WIS-based damage to up to five foes, ignoring position. Increased if fewer foes."
    },
    1265: {
        name: "Melody of Hatred", type: 1, func: 19, calc: 0,
        args: [0, 2, 0.4],
        range: 7, prob: 70,
        desc: "Chance to paralyze up to three foes at start of battle."
    },
    1266: {
        name: "Deafening Sound", type: 2, func: 4, calc: 2,
        args: [1.6, 2, 0.3],
        range: 19, prob: 30, ward: 2, sac: 1,
        desc: "Heavy WIS-based DMG to and sometimes paralyze four random foes, ignoring position."
    },
    1267: {
        name: "Ode to Calamity", type: 2, func: 4, calc: 2,
        args: [1.55],
        range: 16, prob: 30, ward: 2, sac: 1,
        desc: "Deal heavy WIS-based damage to three random foes, ignoring position."
    },
    1268: {
        name: "Coronal Arrows", type: 2, func: 4, calc: 3,
        args: [1.2],
        range: 17, prob: 30, ward: 2,
        desc: "Deal AGI-based damage to six random foes, ignoring position."
    },
    1269: {
        name: "Wall of Flame", type: 1, func: 44, calc: 1,
        args: [0.22, 3, 0, 0, 0, 0.19, 4],
        range: 3, prob: 70,
        desc: "Raise WIS/AGI of self and adjacent allies by 22%/19% of his ATK."
    },
    1270: {
        name: "Thorn Lash", type: 2, func: 4, calc: 2,
        args: [1.65],
        range: 19, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to four random foes, ignoring position."
    },
    1271: {
        name: "Paling of Thorns", type: 1, func: 44, calc: 2,
        args: [0.07, 4, 0, 0, 0, 0.15, 3],
        range: 3, prob: 70,
        desc: "Raise WIS/AGI of self and adjacent allies by 15%/7% of her WIS."
    },
    1272: {
        name: "Weighted Discus", type: 2, func: 4, calc: 3,
        args: [2],
        range: 23, prob: 30, ward: 2, sac: 1,
        desc: "Deal massive AGI-based damage to two random foes, ignoring position."
    },
    1273: {
        name: "Stinging Rain", type: 2, func: 4, calc: 2,
        args: [1.6],
        range: 314, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to up to four foes ignoring position. Increased if fewer foes."
    },
    1274: {
        name: "Sapping Rain", type: 1, func: 44, calc: 2,
        args: [0.07, 4, 0, 0, 0, 0.14, 3],
        range: 3, prob: 70,
        desc: "Raise WIS/AGI of self and adjacent allies by 14%/7% of her WIS."
    },
    1275: {
        name: "Eviscerating Claws", type: 2, func: 52, calc: 3,
        args: [1.35, 4, 1000, 6, 0.5, 1, 121, 120],
        range: 19, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage and absorb AGI from four random foes."
    },
    1276: {
        name: "Depraved Blade", type: 2, func: 3, calc: 1,
        args: [2.6],
        range: 23, prob: 30, ward: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },
    1277: {
        name: "Corruption's Allure", type: 1, func: 51, calc: 0,
        args: [0, 7, 1000, 6, 0.5, 1, 121, 120, 43],
        range: 6, prob: 70,
        desc: "Absorbs ATK and AGI from up to two foes at start of battles."
    },
    1278: {
        name: "Apostate Blade", type: 2, func: 3, calc: 1,
        args: [2],
        range: 23, prob: 30, ward: 1, sac: 1,
        desc: "Deal massive ATK-based damage to two random foes."
    },
    1279: {
        name: "Unsullied Strike", type: 2, func: 52, calc: 3,
        args: [1.45, 4, 1000, 6, 0.5, 1, 121, 120],
        range: 20, prob: 30, ward: 1, sac: 1,
        desc: "Deal AGI-based damage and absorb AGI from five random foes."
    },
    1280: {
        name: "Galvanic Cyclone", type: 2, func: 34, calc: 2,
        args: [1.7, 3, 1, 0.06],
        range: 8, prob: 30, ward: 2,
        desc: "Deal heavy WIS-based damage to all foes and lower WIS of targets."
    },
    1281: {
        name: "Galvanic Rebirth", type: 2, func: 6, calc: 0,
        args: [0.7],
        range: 122, prob: 50,
        desc: "Revive two random familiars with 70% of their HP."
    },
    1282: {
        name: "Melody of the Beyond", type: 16, func: 19, calc: 0,
        args: [0, 5, 1, 1],
        range: 8, prob: 70, sac: 1,
        desc: "Silence all foes for one turn upon his death."
    },
    1283: {
        name: "Shield of Valor", type: 5, func: 14, calc: 1,
        args: [1],
        range: 2, prob: 50, ward: 1, sac: 1,
        desc: "Take damage in place of adjacent familiars and counter."
    },
    10001: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10003: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10004: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.05, 2, 0.2],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage, sometimes paralyzing target."
    },
    10005: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10006: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.05],
        range: 16, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to three random foes."
    },
    10007: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10008: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [0.65],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10009: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 3, 0.1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes freeze target."
    },
    10010: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.1],
        range: 7, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage up to three foes."
    },
    10011: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10012: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1, 1, 0.4],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes poison target."
    },
    10014: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1, 2, 0.4],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage, sometimes paralyzing target."
    },
    10015: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10016: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10017: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1, 1, 0.4, 10],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes envenom target."
    },
    10018: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10019: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 3, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10020: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [0.6],
        range: 23, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to two random foes."
    },
    10021: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10022: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10023: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10024: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1, 4, 0.35],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes disable target."
    },
    10025: {
        name: "Standard Action", type: 2, func: 34, calc: 1,
        args: [1.2, 4, 0.3, 0.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes greatly lower AGI of target."
    },
    10026: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.3, 2, 0.5],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage, 50% chance to paralyze."
    },
    10027: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [0.7, 5, 0.4, 1],
        range: 23, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to two random foes. 40% chance to silence."
    },
    10028: {
        name: "Standard Action", type: 2, func: 7, calc: 1,
        args: [1, 0.1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage. Chance to kill target."
    },
    10029: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10030: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1],
        range: 6, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to up to two foes."
    },
    10031: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.3],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10032: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 7, 0.35, 2, 0.9],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes blind target."
    },
    10033: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1],
        range: 23, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to two random foes."
    },
    10034: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.4],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10035: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.3],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10036: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 8, 0.4, 2000],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes burn target."
    },
    10037: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1, 1, 0.5, 15],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes envenom target."
    },
    10038: {
        name: "Standard Action", type: 2, func: 36, calc: 1,
        args: [1, 0.4, 27, 21],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and drain HP from target."
    },
    10039: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1, 1, 0.5, 15],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes envenom target."
    },
    10040: {
        name: "Standard Action", type: 2, func: 37, calc: 1,
        args: [1, 0.2, 27, 21],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and drain HP from target."
    },
    10041: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10042: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.3],
        range: 5, prob: 100, ward: 3, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10043: {
        name: "Standard Action", type: 2, func: 34, calc: 2,
        args: [1, 2, 0.5, 0.3],
        range: 5, prob: 100, ward: 3, isAutoAttack: true,
        desc: "WIS-based damage and sometimes greatly lower DEF."
    },
    10044: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10045: {
        name: "Standard Action", type: 2, func: 37, calc: 2,
        args: [1, 0.3, 27, 21],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and drain HP from target."
    },
    10046: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10047: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 3, 0.25],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes freeze target."
    },
    10048: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1, 2, 0.25],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes paralyze target."
    },
    10049: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10050: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2, 3, 0.35],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes freeze target."
    },
    10051: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10052: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.2],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10053: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1, 2, 0.25],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes paralyze target."
    },
    10054: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1, 5, 0.35, 1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes silence target."
    },
    10056: {
        name: "Standard Action", type: 2, func: 33, calc: 1,
        args: [1, 4, 1, 0.1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "Deal ATK-based damage to one foe and greatly lower AGI."
    },
    10057: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 3, 0.3],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes freeze target."
    },
    10058: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [0.5],
        range: 7, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to up to three foes."
    },
    10059: {
        name: "Standard Action", type: 2, func: 34, calc: 2,
        args: [1, 4, 0.3, 0.1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "Deal WIS-based damage to one foe and sometimes greatly lower AGI."
    },
    10060: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1, 2, 0.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes paralyze target."
    },
    10061: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10062: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [0.8],
        range: 6, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to up to two foes."
    },
    10063: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 4, 0.25],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes disable target."
    },
    10064: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 7, 0.25, 1, 0.9],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes blind target."
    },
    10065: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2, 1, 0.5, 10],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes envenom target."
    },
    10066: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [0.85],
        range: 16, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to three random foes, ignoring position."
    },
    10067: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [0.7],
        range: 23, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to two random foes."
    },
    10100: {
        name: "Standard Action", type: 2, func: 34, calc: 1,
        args: [1.4, 4, 0.5, 0.15],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe and sometimes lower AGI of target."
    },
    10101: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1, 1, 0.5, 5],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes poison target."
    },
    10103: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10104: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [0.8],
        range: 6, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to up to two foes."
    },
    10105: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.5],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "Heavy ATK-based damage to one foe."
    },
    10106: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10107: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2, 1, 0.3, 10],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe and sometimes poison target."
    },
    10108: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10109: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [0.7],
        range: 6, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage up to two foes."
    },
    10110: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 3, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10111: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 3, 0.2],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes freeze target."
    },
    10112: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2, 1, 0.2, 10],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe and sometimes poison target."
    },
    10113: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.5],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "Heavy ATK-based damage to one foe."
    },
    10114: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2, 2, 0.3],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes paralyze target."
    },
    10115: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [0.6],
        range: 23, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to two random foes."
    },
    10116: {
        name: "Standard Action", type: 2, func: 36, calc: 1,
        args: [1, 0.5, 27, 21],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and drain HP from target."
    },
    10117: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.4, 5, 0.25, 1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes silence target."
    },
    10118: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 7, 0.3, 1, 0.9],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes blind target."
    },
    10119: {
        name: "Standard Action", type: 2, func: 36, calc: 1,
        args: [1.4, 0.4, 27, 21],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and drain HP from target."
    },
    10120: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.4],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe, ignoring position."
    },
    10121: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 3, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10122: {
        name: "Standard Action", type: 2, func: 36, calc: 1,
        args: [1.3, 0.5, 27, 21],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and drain HP from target."
    },
    10123: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [0.6, 8, 0.2, 2000],
        range: 6, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to up to 2 foes and sometimes burn targets."
    },
    10124: {
        name: "Standard Action", type: 2, func: 53, calc: 2,
        args: [1, 3, 1000, 6, 0.5, 1, 121, 120],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and absorbs WIS from one foe."
    },
    10125: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10126: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.2, 3, 0.3],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes freeze target."
    },
    10127: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10128: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.4],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10129: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.2],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10130: {
        name: "Standard Action", type: 2, func: 34, calc: 1,
        args: [1.2, 3, 1, 0.15],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and lower WIS of target."
    },
    10131: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.4],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10132: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [0.6],
        range: 6, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to up to two foes."
    },
    10133: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10134: {
        name: "Standard Action", type: 2, func: 7, calc: 1,
        args: [1.2, 0.1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and chance to kill target."
    },
    10135: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [0.5],
        range: 7, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to up to three foes."
    },
    10136: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.3],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10137: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10138: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.15],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10139: {
        name: "Standard Action", type: 2, func: 34, calc: 1,
        args: [1.2, 2, 1, 0.15],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "Deal ATK-based damage to one foe and lower DEF."
    },
    10140: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 1, 0.3, 10],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe and sometimes poison target."
    },
    10141: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [0.8, 2, 0.2],
        range: 6, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes paralyze up to two foes. "
    },
    10142: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10143: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 8, 0.3, 2500],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe and sometimes burn target."
    },
    10144: {
        name: "Standard Action", type: 2, func: 33, calc: 1,
        args: [1.3, 2, 1, 0.07],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and lower DEF of target."
    },
    10145: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.3],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10146: {
        name: "Standard Action", type: 2, func: 36, calc: 1,
        args: [0.9, 0.2, 27, 21],
        range: 23, prob: 100, ward: 1, isAutoAttack: true,
        desc: "Drains HP from two random foes while dealing ATK-based damage."
    },
    10147: {
        name: "Standard Action", type: 2, func: 34, calc: 1,
        args: [1.2, 4, 1, 0.15],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe and lower AGI of target."
    },
    10148: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.5],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "Heavy WIS-based damage to one foe."
    },
    10149: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.2, 8, 1, 3000],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe and burn target."
    },
    10150: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [0.7],
        range: 23, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to two random foes."
    },
    10151: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10152: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10153: {
        name: "Standard Action", type: 2, func: 33, calc: 1,
        args: [1.2, 1, 1, 0.09],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe and lower ATK of target."
    },
    10155: {
        name: "Standard Action", type: 2, func: 53, calc: 2,
        args: [0.5, 3, 2000, 6, 1, 1, 121, 120],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "Deal WIS-based damage and absorbs WIS from one foe."
    },
    10156: {
        name: "Standard Action", type: 2, func: 33, calc: 1,
        args: [1.2, 2, 1, 0.16],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe and lower DEF of target."
    },
    10157: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10158: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 3, 0.4],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe and sometimes freeze target."
    },
    10159: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 2, 0.4],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe and sometimes paralyze target."
    },
    10160: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10161: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10162: {
        name: "Standard Action", type: 2, func: 33, calc: 1,
        args: [1.2, 2, 1, 0.25],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and lower DEF of target."
    },
    10163: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10164: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 8, 0.6, 2500],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe and sometimes burn target."
    },
    10165: {
        name: "Standard Action", type: 2, func: 33, calc: 1,
        args: [1.2, 2, 1, 0.14],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and lower DEF of target."
    },
    10166: {
        name: "Standard Action", type: 2, func: 52, calc: 1,
        args: [1, 1, 750, 6, 1, 1, 121, 120],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and absorbs ATK from one foe."
    },
    10167: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.5],
        range: 6, prob: 100, ward: 1, isAutoAttack: true,
        desc: "Heavy ATK-based damage to up to two foes."
    },
    10168: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10169: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 3, 0.3],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and sometimes freeze target."
    },
    10170: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.3],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10171: {
        name: "Standard Action", type: 2, func: 37, calc: 2,
        args: [1, 0.5, 27, 21],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and drain HP from target."
    },
    10172: {
        name: "Standard Action", type: 2, func: 34, calc: 2,
        args: [1.2, 3, 1, 0.05],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and lower WIS of target."
    },
    10173: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1, 1, 0.5, 10],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe and sometimes poison target."
    },
    10174: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.2, 2, 0.2],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe and sometimes paralyze target."
    },
    10175: {
        name: "Standard Action", type: 2, func: 37, calc: 2,
        args: [1, 0.2, 27, 21],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage and drain HP from target."
    },
    10176: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.2],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10177: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10178: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.2, 2, 0.4],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage, sometimes paralyzing target."
    },
    10179: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [0.8],
        range: 23, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to two random foes."
    },
    10180: {
        name: "Standard Action", type: 2, func: 33, calc: 1,
        args: [1, 2, 1, 0.1],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and lower DEF of target."
    },
    10181: {
        name: "Standard Action", type: 2, func: 53, calc: 1,
        args: [1.2, 1, 1000, 6, 1, 0.5, 121, 120],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes absorbs ATK from one foe."
    },
    10182: {
        name: "Standard Action", type: 2, func: 34, calc: 1,
        args: [1.2, 2, 1, 0.06],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "Deal ATK-based damage to one foe and lower DEF."
    },
    10183: {
        name: "Standard Action", type: 2, func: 34, calc: 2,
        args: [1, 4, 1, 0.014],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "Deal WIS-based damage to one foe and lower AGI of target."
    },
    10184: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.5, 2, 0.4],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "Heavy ATK-based damage and sometimes paralyze target."
    },
    10185: {
        name: "Standard Action", type: 2, func: 34, calc: 1,
        args: [1.2, 4, 0.4, 0.15],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe and sometimes lower AGI of target."
    },
    10186: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1.2],
        range: 6, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to up to two foes."
    },
    10187: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10188: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.2, 3, 0.5],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes freeze target."
    },
    10189: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10190: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2, 3, 0.4],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and sometimes freeze target."
    },
    10191: {
        name: "Standard Action", type: 2, func: 52, calc: 1,
        args: [1.2, 2, 2000, 6, 1, 1, 121, 120],
        range: 5, prob: 30, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and absorb DEF from target."
    },
    10192: {
        name: "Standard Action", type: 2, func: 7, calc: 1,
        args: [1.2, 0.07],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage and chance to kill target."
    },
    10193: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [0.7],
        range: 6, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to up to two foes."
    },
    10194: {
        name: "Standard Action", type: 2, func: 3, calc: 1,
        args: [1.4],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    10195: {
        name: "Standard Action", type: 2, func: 4, calc: 2,
        args: [1],
        range: 5, prob: 100, ward: 2, isAutoAttack: true,
        desc: "WIS-based damage to one foe."
    },
    10196: {
        name: "Standard Action", type: 2, func: 4, calc: 1,
        args: [1.2],
        range: 5, prob: 100, ward: 1, isAutoAttack: true,
        desc: "ATK-based damage to one foe."
    },
    9001: {
        name: "Abject Horror", type: 20, func: 1002, calc: 0,
        args: [0.3],
        range: 0, prob: 100,
        desc: "Decrease damage from lower rarities by up to 30%."
    },
    9002: {
        name: "Cursed Cry", type: 20, func: 1001, calc: 0,
        args: [0.2],
        range: 0, prob: 100,
        desc: "Increase damage to lower rarities by up to 20%."
    },
    9003: {
        name: "Grace of the Lake", type: 20, func: 1005, calc: 0,
        args: [0.3, 0, 0, 3, 2],
        range: 0, prob: 100,
        desc: "Up to 30% chance to freeze lower rarities when being attacked."
    },
    9004: {
        name: "Coldblood Claw", type: 20, func: 1006, calc: 0,
        args: [0.1],
        range: 0, prob: 100,
        desc: "Up to 10% chance to reproduce the previous attack action."
    },
    9005: {
        name: "Death Wish", type: 20, func: 1003, calc: 0,
        args: [1],
        range: 0, prob: 100,
        desc: "Increase success rate of affliction against lower rarities."
    },
    9006: {
        name: "Breakwater", type: 20, func: 1002, calc: 0,
        args: [0.35],
        range: 0, prob: 100,
        desc: "Decrease damage from lower rarities by up to 35%."
    },
    9007: {
        name: "Devoted Servant", type: 20, func: 1006, calc: 0,
        args: [0.15],
        range: 0, prob: 100,
        desc: "Up to 15% chance to reproduce the previous attack action."
    },
    9008: {
        name: "Lionpride", type: 20, func: 1001, calc: 0,
        args: [0.25],
        range: 0, prob: 100,
        desc: "Increase damage to lower rarities by up to 25%."
    },
    9009: {
        name: "Exorcism Trap", type: 20, func: 1005, calc: 0,
        args: [0.5, 0, 0, 8, 3000],
        range: 0, prob: 100,
        desc: "Up to 50% chance to burn lower rarities when being attacked."
    },
    9010: {
        name: "Decree of Death", type: 20, func: 1002, calc: 0,
        args: [0.4],
        range: 0, prob: 100,
        desc: "Decrease damage from lower rarities by up to 40%"
    },
    9011: {
        name: "Einherjar's Gift", type: 20, func: 1001, calc: 0,
        args: [0.3],
        range: 0, prob: 100,
        desc: "Increase damage to lower rarities by up to 30%."
    },
};
var RangeFactory = (function () {
    function RangeFactory() {
    }
    RangeFactory.getRange = function (id, selectDead) {
        if (selectDead === void 0) { selectDead = false; }
        var range;
        if (this.isEnemyRowRandomRange(id)) {
            range = this.createEnemyRowRandomRange(id);
        }
        else if (this.isEnemyRandomRange(id)) {
            range = this.createEnemyRandomRange(id);
        }
        else if (this.isEnemyNearRange(id) || this.isEnemyNearScaledRange(id)) {
            range = this.createEnemyNearRange(id);
        }
        else if (this.isFriendRandomRange(id)) {
            range = this.createFriendRandomRange(id, selectDead);
        }
        else {
            range = this.createRange(id, selectDead);
        }
        return range;
    };
    RangeFactory.isEnemyRandomRange = function (id) {
        return !!RangeFactory.ENEMY_RANDOM_RANGE_TARGET_NUM[id]
            || !!RangeFactory.ENEMY_VARYING_RANDOM_RANGE_TARGET_NUM[id]
            || RangeFactory.isEnemyRowRandomRange(id);
    };
    RangeFactory.isEnemyRowRandomRange = function (id) {
        return !!RangeFactory.ENEMY_ROW_RANDOM_RANGE_TARGET_NUM[id];
    };
    RangeFactory.isFriendRandomRange = function (id) {
        return !!RangeFactory.FRIEND_RANDOM_RANGE_TARGET_NUM[id];
    };
    RangeFactory.createEnemyRandomRange = function (id) {
        var numTargets;
        if (this.isEnemyVaryingRange(id)) {
            numTargets = RangeFactory.ENEMY_VARYING_RANDOM_RANGE_TARGET_NUM[id];
        }
        else {
            numTargets = RangeFactory.ENEMY_RANDOM_RANGE_TARGET_NUM[id];
        }
        return new EnemyRandomRange(id, numTargets);
    };
    RangeFactory.createEnemyRowRandomRange = function (id) {
        var numTargets = RangeFactory.ENEMY_ROW_RANDOM_RANGE_TARGET_NUM[id];
        switch (id) {
            case ENUM.SkillRange.ENEMY_REAR_RANDOM_2:
            case ENUM.SkillRange.ENEMY_REAR_RANDOM_3:
            case ENUM.SkillRange.ENEMY_REAR_RANDOM_4:
            case ENUM.SkillRange.ENEMY_REAR_RANDOM_5:
            case ENUM.SkillRange.ENEMY_REAR_RANDOM_6:
                return new EnemyRearRandomRange(id, numTargets);
            case ENUM.SkillRange.ENEMY_FRONT_RANDOM_2:
            case ENUM.SkillRange.ENEMY_FRONT_RANDOM_3:
            case ENUM.SkillRange.ENEMY_FRONT_RANDOM_4:
            case ENUM.SkillRange.ENEMY_FRONT_RANDOM_5:
            case ENUM.SkillRange.ENEMY_FRONT_RANDOM_6:
                return new EnemyFrontRandomRange(id, numTargets);
            case ENUM.SkillRange.ENEMY_MID_REAR_RANDOM_2:
            case ENUM.SkillRange.ENEMY_MID_REAR_RANDOM_3:
            case ENUM.SkillRange.ENEMY_MID_REAR_RANDOM_4:
            case ENUM.SkillRange.ENEMY_MID_REAR_RANDOM_5:
            case ENUM.SkillRange.ENEMY_MID_REAR_RANDOM_6:
                return new EnemyMidRearRandomRange(id, numTargets);
            default:
                throw new Error("Invalid or unimplemented range!");
        }
    };
    RangeFactory.createFriendRandomRange = function (id, selectDead) {
        return new FriendRandomRange(id, RangeFactory.FRIEND_RANDOM_RANGE_TARGET_NUM[id], selectDead);
    };
    RangeFactory.isEnemyNearRange = function (id) {
        return !!RangeFactory.ENEMY_NEAR_RANGE_TARGET_NUM[id];
    };
    RangeFactory.createEnemyNearRange = function (id) {
        var numTargets;
        if (this.isEnemyNearRange(id)) {
            numTargets = RangeFactory.ENEMY_NEAR_RANGE_TARGET_NUM[id];
        }
        else if (this.isEnemyNearScaledRange(id)) {
            numTargets = RangeFactory.ENEMY_NEAR_SCALED_RANGE_TARGET_NUM[id];
        }
        return new EnemyNearRange(id, numTargets);
    };
    RangeFactory.isEnemyNearScaledRange = function (id) {
        return !!RangeFactory.ENEMY_NEAR_SCALED_RANGE_TARGET_NUM[id];
    };
    RangeFactory.isEnemyScaledRange = function (id) {
        return this.isEnemyNearScaledRange(id) || id == ENUM.SkillRange.ENEMY_ALL_SCALED;
    };
    RangeFactory.isEnemyVaryingRange = function (id) {
        return !!RangeFactory.VaryingPatternParam[id];
    };
    RangeFactory.getScaledRatio = function (id, targetsLeft) {
        var paramArray = RangeFactory.ScalePatternParams[id];
        if (!paramArray) {
            throw new Error("Invalid range for getting scale ratio");
        }
        return paramArray[targetsLeft - 1];
    };
    RangeFactory.getVaryingRatio = function (id, nthTarget) {
        var paramArray = RangeFactory.VaryingPatternParam[id];
        if (!paramArray) {
            throw new Error("Invalid range for getting varying ratio");
        }
        return paramArray[nthTarget];
    };
    RangeFactory.isRowBasedRange = function (rangeId) {
        if (rangeId === ENUM.SkillRange.ENEMY_FRONT_ALL ||
            rangeId === ENUM.SkillRange.ENEMY_MID_ALL ||
            rangeId === ENUM.SkillRange.ENEMY_REAR_ALL ||
            rangeId === ENUM.SkillRange.ENEMY_FRONT_MID_ALL ||
            rangeId === ENUM.SkillRange.ENEMY_FRONT_REAR_ALL) {
            return true;
        }
        return false;
    };
    RangeFactory.canBeAoeRange = function (rangeId) {
        var canBe = false;
        if (this.isEnemyNearRange(rangeId) ||
            this.isEnemyNearScaledRange(rangeId) ||
            this.isRowBasedRange(rangeId) ||
            rangeId === ENUM.SkillRange.ENEMY_ALL ||
            rangeId === ENUM.SkillRange.ENEMY_ALL_SCALED) {
            canBe = true;
        }
        return canBe;
    };
    RangeFactory.createRange = function (id, selectDead) {
        switch (id) {
            case ENUM.SkillRange.EITHER_SIDE:
                return new EitherSideRange(id, selectDead);
            case ENUM.SkillRange.BOTH_SIDES:
                return new BothSidesRange(id, selectDead);
            case ENUM.SkillRange.SELF_BOTH_SIDES:
                return new SelfBothSidesRange(id);
            case ENUM.SkillRange.ALL:
                return new AllRange(id);
            case ENUM.SkillRange.ENEMY_ALL:
            case ENUM.SkillRange.ENEMY_ALL_SCALED:
                return new EnemyAllRange(id);
            case ENUM.SkillRange.ENEMY_FRONT_ALL:
                return new EnemyFrontAllRange(id);
            case ENUM.SkillRange.ENEMY_MID_ALL:
                return new EnemyMidAllRange(id);
            case ENUM.SkillRange.ENEMY_REAR_ALL:
                return new EnemyRearAllRange(id);
            case ENUM.SkillRange.ENEMY_FRONT_MID_ALL:
                return new EnemyFrontMidAllRange(id);
            case ENUM.SkillRange.ENEMY_FRONT_REAR_ALL:
                return new EnemyFrontRearAllRange(id);
            case ENUM.SkillRange.MYSELF:
                return new SelfRange(id, selectDead);
            case ENUM.SkillRange.RIGHT:
                return new RightRange(id);
            case ENUM.SkillRange.SELF_IMMEDIATE_RIGHT:
                return new SelfImmediateRightRange(id);
            case ENUM.SkillRange.SELF_IMMEDIATE_LEFT:
                return new SelfImmediateLeftRange(id);
            case ENUM.SkillRange.PASSIVE:
                return null;
            default:
                throw new Error("Invalid range or not implemented");
        }
    };
    RangeFactory.ENEMY_RANDOM_RANGE_TARGET_NUM = {
        16: 3,
        17: 6,
        19: 4,
        20: 5,
        23: 2
    };
    RangeFactory.ENEMY_VARYING_RANDOM_RANGE_TARGET_NUM = {
        419: 4,
        420: 5,
    };
    RangeFactory.ENEMY_ROW_RANDOM_RANGE_TARGET_NUM = {
        18: 3,
        38: 2,
        39: 4,
        40: 5,
        41: 6,
        42: 2,
        43: 3,
        44: 4,
        45: 5,
        46: 6,
        47: 2,
        48: 3,
        49: 4,
        50: 5,
        51: 6,
        52: 2,
        53: 3,
        54: 4,
        55: 5,
        56: 6
    };
    RangeFactory.ENEMY_NEAR_SCALED_RANGE_TARGET_NUM = {
        312: 2,
        313: 3,
        314: 4,
        315: 5
    };
    RangeFactory.ENEMY_NEAR_RANGE_TARGET_NUM = {
        5: 1,
        6: 2,
        7: 3,
        32: 4,
        33: 5
    };
    RangeFactory.FRIEND_RANDOM_RANGE_TARGET_NUM = {
        101: 1,
        102: 2,
        103: 3,
        104: 4,
        105: 5,
        106: 6,
        111: 1,
        112: 2,
        113: 3,
        114: 4,
        115: 5,
        116: 6,
        121: 1,
        122: 2,
        123: 3,
        124: 4,
        125: 5,
        126: 6,
        131: 1,
        132: 2,
        133: 3,
        134: 4,
        135: 5,
        136: 6,
        142: 2,
        143: 3,
        144: 4,
        145: 5,
        153: 3,
        154: 4,
        155: 5,
    };
    RangeFactory.INCLUDE_SELF = {
        111: true,
        112: true,
        113: true,
        114: true,
        115: true,
        116: true,
        131: true,
        132: true,
        133: true,
        134: true,
        135: true,
        136: true,
        142: true,
        143: true,
        144: true,
        145: true,
        153: true,
        154: true,
        155: true,
        332: true,
        333: true,
        334: true,
        335: true,
        336: true,
        511: true,
        512: true,
        513: true,
        514: true,
        515: true,
        516: true,
        542: true,
        543: true,
        544: true,
        545: true,
    };
    RangeFactory.FORCED_SELF = {
        142: true,
        143: true,
        144: true,
        145: true,
        153: true,
        154: true,
        155: true,
        542: true,
        543: true,
        544: true,
        545: true,
    };
    RangeFactory.IS_UNIQUE = {
        121: true,
        122: true,
        123: true,
        124: true,
        125: true,
        126: true,
        131: true,
        132: true,
        133: true,
        134: true,
        135: true,
        136: true,
        153: true,
        154: true,
        155: true,
    };
    RangeFactory.ScalePatternParams = {
        202: [1.5, 1],
        203: [1.75, 1.25, 1],
        204: [1.9375, 1.4375, 1.25, 1.13, 1, 1, 1, 1, 1, 1],
        208: [1.9375, 1.4375, 1.25, 1.13, 1],
        212: [1, 1, 1, 1, 1],
        213: [1, 1, 1, 1, 1],
        214: [1, 1, 1, 1, 1],
        215: [1, 1, 1, 1, 1],
        234: [1, 1, 1, 1, 1],
        312: [1.5, 1],
        313: [1.75, 1.25, 1],
        314: [1.875, 1.375, 1.16, 1],
        315: [1.9375, 1.4375, 1.25, 1.13, 1],
        322: [1.5, 1],
        323: [1.75, 1.25, 1],
        324: [1.875, 1.375, 1.16, 1],
        325: [1.875, 1.375, 1.16, 1, 1],
        326: [1.875, 1.375, 1.16, 1, 1, 1],
        332: [1.5, 1],
        333: [1.75, 1.25, 1],
        334: [1.875, 1.375, 1.16, 1],
        335: [1.9375, 1.4375, 1.25, 1.13, 1],
        336: [1.9375, 1.4375, 1.25, 1.13, 1, 1]
    };
    RangeFactory.VaryingPatternParam = {
        419: [0.9, 1.0, 1.15, 1.35],
        420: [0.8, 0.9, 1, 1.1, 1.2],
    };
    return RangeFactory;
}());
var BaseRange = (function () {
    function BaseRange(id) {
        this.id = id;
    }
    BaseRange.prototype.getBaseTargets = function (condFunc) {
        var allCards = CardManager.getInstance().getAllMainCardsInPlayerOrder();
        var baseTargets = [];
        for (var i = 0; i < allCards.length; i++) {
            if (condFunc(allCards[i])) {
                baseTargets.push(allCards[i]);
            }
        }
        return baseTargets;
    };
    BaseRange.prototype.getReady = function (executor, skillCondFunc) {
        if (this.isConfused) {
            this.confusedCache = Math.random() < this.confuseProb;
        }
        this.currentIndex = 0;
    };
    BaseRange.prototype.hasValidTarget = function (executor, condFunc) {
        this.getReady(executor, condFunc);
        var hasValid = false;
        if (condFunc) {
            for (var i = 0; i < this.targets.length; i++) {
                if (condFunc(this.targets[i])) {
                    hasValid = true;
                    break;
                }
            }
        }
        else {
            hasValid = this.targets.length > 0;
        }
        return hasValid;
    };
    BaseRange.prototype.getCondFunc = function (executor) {
        var _this = this;
        var isSameGroup = function (card) { return _this.isSameGroup(executor, card); };
        return function (card) {
            if (card.isDead || isSameGroup(card)) {
                return false;
            }
            return true;
        };
    };
    BaseRange.prototype.getSelfOrOppositeAsFriend = function (executor) {
        var _this = this;
        var condFunc = function (card) { return _this.isSameGroup(executor, card) &&
            executor.formationColumn === card.formationColumn; };
        return this.getBaseTargets(condFunc)[0];
    };
    BaseRange.prototype.satisfyDeadCondition = function (card, selectDead) {
        return (card.isDead && selectDead) || (!card.isDead && !selectDead);
    };
    BaseRange.prototype.getTarget = function (executor) {
        return this.targets[this.currentIndex++];
    };
    BaseRange.prototype.isSameGroup = function (card1, card2) {
        if (this.isConfused) {
            if (this.isDuplicative) {
                return (Math.random() <= this.confuseProb) !== (card1.getPlayerId() === card2.getPlayerId());
            }
            else {
                return this.confusedCache !== (card1.getPlayerId() === card2.getPlayerId());
            }
        }
        return card1.getPlayerId() === card2.getPlayerId();
    };
    BaseRange.prototype.getGroup = function (executor) {
        var battle = BattleModel.getInstance();
        if (this.isConfused) {
            if (this.isDuplicative) {
                return Math.random() <= this.confuseProb ?
                    battle.getOppositePlayer(executor.player).id : executor.getPlayerId();
            }
            else {
                return this.confusedCache ?
                    battle.getOppositePlayer(executor.player).id : executor.getPlayerId();
            }
        }
        return executor.getPlayerId();
    };
    BaseRange.prototype.setConfuse = function (prob) {
        this.isConfused = true;
        this.confuseProb = prob - 0.1;
        if (this.confuseProb < 0)
            this.confuseProb = 0;
    };
    return BaseRange;
}());
var BothSidesRange = (function (_super) {
    __extends(BothSidesRange, _super);
    function BothSidesRange(id, selectDead) {
        var _this = _super.call(this, id) || this;
        _this.selectDead = selectDead;
        return _this;
    }
    BothSidesRange.prototype.getReady = function (executor) {
        _super.prototype.getReady.call(this, executor);
        this.targets = this.getBaseTargets(this.getCondFunc(executor));
    };
    BothSidesRange.prototype.getCondFunc = function (executor) {
        var _this = this;
        return function (card) { return _this.isSameGroup(executor, card) &&
            _this.satisfyDeadCondition(card, _this.selectDead) &&
            (executor.formationColumn === card.formationColumn + 1 || executor.formationColumn === card.formationColumn - 1); };
    };
    return BothSidesRange;
}(BaseRange));
var SelfImmediateRightRange = (function (_super) {
    __extends(SelfImmediateRightRange, _super);
    function SelfImmediateRightRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelfImmediateRightRange.prototype.getReady = function (executor) {
        _super.prototype.getReady.call(this, executor);
        this.targets = this.getBaseTargets(this.getCondFunc(executor));
    };
    SelfImmediateRightRange.prototype.getCondFunc = function (executor) {
        var _this = this;
        return function (card) { return !card.isDead && _this.isSameGroup(executor, card) &&
            (executor.formationColumn === card.formationColumn || executor.formationColumn === card.formationColumn - 1); };
    };
    return SelfImmediateRightRange;
}(BaseRange));
var SelfImmediateLeftRange = (function (_super) {
    __extends(SelfImmediateLeftRange, _super);
    function SelfImmediateLeftRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelfImmediateLeftRange.prototype.getReady = function (executor) {
        _super.prototype.getReady.call(this, executor);
        this.targets = this.getBaseTargets(this.getCondFunc(executor));
    };
    SelfImmediateLeftRange.prototype.getCondFunc = function (executor) {
        var _this = this;
        return function (card) { return !card.isDead && _this.isSameGroup(executor, card) &&
            (executor.formationColumn === card.formationColumn || executor.formationColumn === card.formationColumn + 1); };
    };
    return SelfImmediateLeftRange;
}(BaseRange));
var RandomRange = (function (_super) {
    __extends(RandomRange, _super);
    function RandomRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RandomRange.prototype.hasValidTarget = function (executor, condFunc) {
        var baseTargets = this.getBaseTargets(this.getCondFunc(executor));
        var hasValid = false;
        if (condFunc) {
            for (var i = 0; i < baseTargets.length; i++) {
                if (condFunc(baseTargets[i])) {
                    hasValid = true;
                    break;
                }
            }
        }
        else {
            hasValid = baseTargets.length > 0;
        }
        return hasValid;
    };
    return RandomRange;
}(BaseRange));
var EnemyRandomRange = (function (_super) {
    __extends(EnemyRandomRange, _super);
    function EnemyRandomRange(id, numTarget) {
        var _this = _super.call(this, id) || this;
        _this.numTarget = numTarget;
        _this.isDuplicative = true;
        return _this;
    }
    EnemyRandomRange.prototype.getReady = function (executor) {
        this.numProcessed = 0;
    };
    EnemyRandomRange.prototype.getTarget = function (executor) {
        if (this.numProcessed < this.numTarget) {
            this.numProcessed++;
            return getRandomElement(this.getBaseTargets(this.getCondFunc(executor)));
        }
        else {
            return null;
        }
    };
    return EnemyRandomRange;
}(RandomRange));
var EitherSideRange = (function (_super) {
    __extends(EitherSideRange, _super);
    function EitherSideRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EitherSideRange.prototype.getReady = function (executor) {
        _super.prototype.getReady.call(this, executor);
        if (this.targets.length !== 0) {
            this.targets = [getRandomElement(this.targets)];
        }
    };
    return EitherSideRange;
}(BothSidesRange));
var RightRange = (function (_super) {
    __extends(RightRange, _super);
    function RightRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RightRange.prototype.getReady = function (executor) {
        _super.prototype.getReady.call(this, executor);
        this.targets = this.getBaseTargets(this.getCondFunc(executor));
    };
    RightRange.prototype.getCondFunc = function (executor) {
        var _this = this;
        return function (card) { return !card.isDead && _this.isSameGroup(executor, card) &&
            (executor.formationColumn < card.formationColumn); };
    };
    return RightRange;
}(BaseRange));
var SelfRange = (function (_super) {
    __extends(SelfRange, _super);
    function SelfRange(id, selectDead) {
        var _this = _super.call(this, id) || this;
        _this.selectDead = selectDead;
        return _this;
    }
    SelfRange.prototype.getReady = function (executor) {
        _super.prototype.getReady.call(this, executor);
        this.targets = this.getBaseTargets(this.getCondFunc(executor));
    };
    SelfRange.prototype.getCondFunc = function (executor) {
        var _this = this;
        return function (card) { return _this.isSameGroup(executor, card) &&
            _this.satisfyDeadCondition(card, _this.selectDead) &&
            executor.formationColumn === card.formationColumn; };
    };
    return SelfRange;
}(BaseRange));
var SelfBothSidesRange = (function (_super) {
    __extends(SelfBothSidesRange, _super);
    function SelfBothSidesRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelfBothSidesRange.prototype.getReady = function (executor) {
        _super.prototype.getReady.call(this, executor);
        this.targets = this.getBaseTargets(this.getCondFunc(executor));
    };
    SelfBothSidesRange.prototype.getCondFunc = function (executor) {
        var _this = this;
        return function (card) { return !card.isDead && _this.isSameGroup(executor, card) &&
            (executor.formationColumn === card.formationColumn + 1 ||
                executor.formationColumn === card.formationColumn ||
                executor.formationColumn === card.formationColumn - 1); };
    };
    return SelfBothSidesRange;
}(BaseRange));
var AllRange = (function (_super) {
    __extends(AllRange, _super);
    function AllRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AllRange.prototype.getReady = function (executor) {
        _super.prototype.getReady.call(this, executor);
        this.targets = this.getBaseTargets(this.getCondFunc(executor));
    };
    AllRange.prototype.getCondFunc = function (executor) {
        var _this = this;
        return function (card) { return !card.isDead && _this.isSameGroup(executor, card); };
    };
    return AllRange;
}(BaseRange));
var EnemyNearRange = (function (_super) {
    __extends(EnemyNearRange, _super);
    function EnemyNearRange(id, numTarget) {
        var _this = _super.call(this, id) || this;
        _this.numTarget = numTarget;
        _this.maxDistance = EnemyNearRange.MAX_DISTANCE_FROM_CENTER[numTarget];
        return _this;
    }
    EnemyNearRange.prototype.getReady = function (executor) {
        _super.prototype.getReady.call(this, executor);
        var battle = BattleModel.getInstance();
        var executorPlayer = this.getGroup(executor);
        var centerEnemy;
        if (executorPlayer === executor.getPlayerId()) {
            centerEnemy = CardManager.getInstance().getNearestSingleOpponentTarget(executor);
        }
        else {
            centerEnemy = CardManager.getInstance().getNearestSingleFriendTarget(executor);
        }
        if (!centerEnemy) {
            this.targets = [];
            return;
        }
        var enemyCards = CardManager.getInstance().getEnemyCurrentMainCards(battle.getPlayerById(executorPlayer));
        var offsetArray = [0, -1, 1, -2, 2];
        var targets = [];
        var targetCount = 0;
        for (var i = 0; i < offsetArray.length; i++) {
            if (targetCount >= this.numTarget || Math.abs(offsetArray[i]) > this.maxDistance) {
                break;
            }
            var currentEnemyIndex = centerEnemy.formationColumn + offsetArray[i];
            var currentEnemyCard = enemyCards[currentEnemyIndex];
            if (currentEnemyCard && !currentEnemyCard.isDead) {
                targetCount++;
                targets.push(enemyCards[currentEnemyIndex]);
            }
        }
        this.targets = targets;
    };
    EnemyNearRange.MAX_DISTANCE_FROM_CENTER = {
        1: 1,
        2: 1,
        3: 1,
        4: 2,
        5: 2
    };
    return EnemyNearRange;
}(BaseRange));
var EnemyAllRange = (function (_super) {
    __extends(EnemyAllRange, _super);
    function EnemyAllRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EnemyAllRange.prototype.getReady = function (executor) {
        _super.prototype.getReady.call(this, executor);
        this.targets = this.getBaseTargets(this.getCondFunc(executor));
    };
    return EnemyAllRange;
}(BaseRange));
var FriendRandomRange = (function (_super) {
    __extends(FriendRandomRange, _super);
    function FriendRandomRange(id, numTargets, selectDead) {
        var _this = _super.call(this, id) || this;
        _this.numTargets = numTargets;
        _this.selectDead = selectDead;
        _this.isUnique = RangeFactory.FRIEND_RANDOM_RANGE_TARGET_NUM[id];
        _this.includeSelf = RangeFactory.INCLUDE_SELF[id];
        _this.forcedSelf = RangeFactory.FORCED_SELF[id];
        _this.isDuplicative = !_this.isUnique;
        return _this;
    }
    FriendRandomRange.prototype.getReady = function (executor, skillCondFunc) {
        var baseTargets = this.getBaseTargets(this.getCondFunc(executor, skillCondFunc));
        var targets = [];
        this.currentIndex = 0;
        var selfAllowed = false;
        for (var i = 0; i < baseTargets.length; i++) {
            if (executor.formationColumn === baseTargets[i].formationColumn) {
                selfAllowed = true;
                break;
            }
        }
        if (baseTargets.length) {
            if (this.isUnique) {
                targets = getRandomUniqueElements(baseTargets, this.numTargets);
            }
            else {
                for (var i = 0; i < this.numTargets; i++) {
                    targets.push(getRandomElement(baseTargets));
                }
            }
        }
        if (this.forcedSelf && selfAllowed) {
            var alreadyIncludedSelf = false;
            for (var i = 0; i < targets.length; i++) {
                if (executor.formationColumn === targets[i].formationColumn) {
                    alreadyIncludedSelf = true;
                    break;
                }
            }
            if (!alreadyIncludedSelf) {
                targets.shift();
                targets.unshift(this.getSelfOrOppositeAsFriend(executor));
            }
        }
        this.targets = targets;
    };
    FriendRandomRange.prototype.getCondFunc = function (executor, skillCondFunc) {
        var _this = this;
        var selectDead = this.selectDead;
        var includeSelf = this.includeSelf;
        return function (card) {
            if (!_this.isSameGroup(executor, card))
                return false;
            if (card.formationColumn === executor.formationColumn && !includeSelf)
                return false;
            if ((selectDead && !card.isDead) || (!selectDead && card.isDead))
                return false;
            if (skillCondFunc && !skillCondFunc(card))
                return false;
            return true;
        };
    };
    return FriendRandomRange;
}(RandomRange));
var BaseRowRange = (function (_super) {
    __extends(BaseRowRange, _super);
    function BaseRowRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseRowRange.prototype.getSameRowCards = function (cards, row) {
        var returnArr = [];
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            if (card.getFormationRow() === row) {
                returnArr.push(card);
            }
        }
        return returnArr;
    };
    BaseRowRange.prototype.getRowCandidates = function (cards, row, isAsc) {
        var candidates = [];
        if (!cards || cards.length === 0) {
            return candidates;
        }
        var currentRow = row;
        while (!candidates.length) {
            var sameRowCards = this.getSameRowCards(cards, currentRow);
            for (var i = 0; i < sameRowCards.length; i++) {
                candidates.push(sameRowCards[i]);
            }
            currentRow = (isAsc) ? currentRow % BaseRowRange.ROW_TYPE_COUNT + 1 : currentRow - 1;
            if (currentRow < 1) {
                currentRow = ENUM.FormationRow.REAR;
            }
            if (currentRow === row) {
                break;
            }
        }
        return candidates;
    };
    BaseRowRange.ROW_TYPE_COUNT = 3;
    return BaseRowRange;
}(BaseRange));
var EnemyFrontMidAllRange = (function (_super) {
    __extends(EnemyFrontMidAllRange, _super);
    function EnemyFrontMidAllRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EnemyFrontMidAllRange.prototype.getReady = function (executor) {
        _super.prototype.getReady.call(this, executor);
        var candidates = this.getBaseTargets(this.getCondFunc(executor));
        if (candidates.length) {
            var frontCards = this.getSameRowCards(candidates, ENUM.FormationRow.FRONT);
            var centerCards = this.getSameRowCards(candidates, ENUM.FormationRow.MID);
            if (frontCards.length > 0 || centerCards.length > 0) {
                candidates = frontCards.concat(centerCards);
            }
            else {
                candidates = this.getSameRowCards(candidates, ENUM.FormationRow.REAR);
            }
        }
        this.targets = candidates;
    };
    return EnemyFrontMidAllRange;
}(BaseRowRange));
var EnemyFrontRearAllRange = (function (_super) {
    __extends(EnemyFrontRearAllRange, _super);
    function EnemyFrontRearAllRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EnemyFrontRearAllRange.prototype.getReady = function (executor) {
        _super.prototype.getReady.call(this, executor);
        var candidates = this.getBaseTargets(this.getCondFunc(executor));
        if (candidates.length) {
            var frontCards = this.getSameRowCards(candidates, ENUM.FormationRow.FRONT);
            var rearCards = this.getSameRowCards(candidates, ENUM.FormationRow.REAR);
            if (frontCards.length > 0 || rearCards.length > 0) {
                candidates = frontCards.concat(rearCards);
            }
            else {
                candidates = this.getSameRowCards(candidates, ENUM.FormationRow.MID);
            }
        }
        this.targets = candidates;
    };
    return EnemyFrontRearAllRange;
}(BaseRowRange));
var EnemyFrontAllRange = (function (_super) {
    __extends(EnemyFrontAllRange, _super);
    function EnemyFrontAllRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EnemyFrontAllRange.prototype.getReady = function (executor) {
        _super.prototype.getReady.call(this, executor);
        var candidates = this.getBaseTargets(this.getCondFunc(executor));
        if (candidates.length) {
            candidates = this.getRowCandidates(candidates, ENUM.FormationRow.FRONT, true);
        }
        this.targets = candidates;
    };
    return EnemyFrontAllRange;
}(BaseRowRange));
var EnemyMidAllRange = (function (_super) {
    __extends(EnemyMidAllRange, _super);
    function EnemyMidAllRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EnemyMidAllRange.prototype.getReady = function (executor) {
        _super.prototype.getReady.call(this, executor);
        var candidates = this.getBaseTargets(this.getCondFunc(executor));
        if (candidates.length) {
            candidates = this.getRowCandidates(candidates, ENUM.FormationRow.MID, true);
        }
        this.targets = candidates;
    };
    return EnemyMidAllRange;
}(BaseRowRange));
var EnemyRearAllRange = (function (_super) {
    __extends(EnemyRearAllRange, _super);
    function EnemyRearAllRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EnemyRearAllRange.prototype.getReady = function (executor) {
        _super.prototype.getReady.call(this, executor);
        var candidates = this.getBaseTargets(this.getCondFunc(executor));
        if (candidates.length) {
            candidates = this.getRowCandidates(candidates, ENUM.FormationRow.REAR, false);
        }
        this.targets = candidates;
    };
    return EnemyRearAllRange;
}(BaseRowRange));
var EnemyRowRandomRange = (function (_super) {
    __extends(EnemyRowRandomRange, _super);
    function EnemyRowRandomRange(id, numTargets, baseOnRangeType) {
        var _this = _super.call(this, id) || this;
        _this.numTargets = numTargets;
        _this.baseOnRangeType = baseOnRangeType;
        _this.isDuplicative = true;
        return _this;
    }
    EnemyRowRandomRange.prototype.getReady = function (executor) {
        this.numProcessed = 0;
    };
    EnemyRowRandomRange.prototype.getTarget = function (executor) {
        var tmpRange = RangeFactory.getRange(this.baseOnRangeType);
        tmpRange.getReady(executor);
        if (this.numProcessed < this.numTargets) {
            this.numProcessed++;
            return getRandomElement(tmpRange.targets);
        }
        else {
            return null;
        }
    };
    return EnemyRowRandomRange;
}(RandomRange));
var EnemyRearRandomRange = (function (_super) {
    __extends(EnemyRearRandomRange, _super);
    function EnemyRearRandomRange(id, numTargets) {
        return _super.call(this, id, numTargets, ENUM.SkillRange.ENEMY_REAR_ALL) || this;
    }
    return EnemyRearRandomRange;
}(EnemyRowRandomRange));
var EnemyFrontRandomRange = (function (_super) {
    __extends(EnemyFrontRandomRange, _super);
    function EnemyFrontRandomRange(id, numTargets) {
        return _super.call(this, id, numTargets, ENUM.SkillRange.ENEMY_FRONT_ALL) || this;
    }
    return EnemyFrontRandomRange;
}(EnemyRowRandomRange));
var EnemyMidRearRandomRange = (function (_super) {
    __extends(EnemyMidRearRandomRange, _super);
    function EnemyMidRearRandomRange(id, numTargets) {
        return _super.call(this, id, numTargets, ENUM.SkillRange.ENEMY_MID_ALL) || this;
    }
    return EnemyMidRearRandomRange;
}(EnemyRowRandomRange));
function getRandomArbitary(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function getRandomElement(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
}
function getRandomUniqueElements(arr, num) {
    var len = arr.length;
    while (len) {
        var a = Math.floor(Math.random() * len);
        var b = arr[--len];
        arr[len] = arr[a];
        arr[a] = b;
    }
    return arr.slice(0, num);
}
function removeElementAtIndex(array, index) {
    array.splice(index, 1);
}
function pickRandomProperty(obj) {
    var keys = Object.keys(obj);
    return keys[keys.length * Math.random() << 0];
}
function getScaledFamiliarWikiaImageLink(link, fullName, newWidth) {
    var firstPart = "https://img" + link.charAt(0) + ".wikia.nocookie.net/bloodbrothersgame/images/thumb/" + link.charAt(1) + "/" + link.substring(1) + "/";
    var urlName = fullName.replace(/,/g, "%2C").replace(/ /g, "_");
    var fileName = urlName + "_Figure.png";
    var newScaledLink = firstPart + fileName + "/" + newWidth + "px-" + fileName;
    return newScaledLink;
}
function getImageLink(link, fullName, newWidth) {
    return getLocalImageLink(fullName);
}
function getLocalImageLink(fullName, root) {
    if (root === void 0) { root = ""; }
    var urlName = fullName.replace(/, /g, "_")
        .replace(/ /g, "_")
        .replace(/'/g, "");
    var fileName = urlName + "_Figure.png";
    return root + "img/wikia/" + fileName;
}
function getSerializableObjectArray(array) {
    var toReturn = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i] == null) {
            toReturn.push(null);
        }
        else {
            toReturn.push(array[i].getSerializableObject());
        }
    }
    return toReturn;
}
function isChrome() {
    var window = window;
    var isChromium = window.chrome, vendorName = window.navigator.vendor;
    if (isChromium !== null && vendorName === "Google Inc.") {
        return true;
    }
    else {
        return false;
    }
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message;
    }
}
var BattleModel = (function () {
    function BattleModel(data, option) {
        if (option === void 0) { option = {}; }
        this.isBloodClash = false;
        this.isColiseum = false;
        this.isFinished = false;
        this.playerWon = null;
        this.p1_mainCards = [];
        this.p2_mainCards = [];
        this.p1_reserveCards = [];
        this.p2_reserveCards = [];
        this.p1_originalMainCards = [];
        this.p2_originalMainCards = [];
        this.p1_originalReserveCards = [];
        this.p2_originalReserveCards = [];
        this.allCurrentMainCards = [];
        this.allCardsById = {};
        this.onDeathCards = [];
        this.turnOrderBase = ENUM.BattleTurnOrderType.AGI;
        this.turnOrderChangeEffectiveTurns = 0;
        this.turnOrderChanged = false;
        if (BattleModel._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        BattleModel._instance = this;
        this.logger = BattleLogger.getInstance();
        this.cardManager = CardManager.getInstance();
        var graphic = new BattleGraphic();
        if (option.battleType && option.battleType === ENUM.BattleType.BLOOD_CLASH) {
            this.isBloodClash = true;
        }
        if (option.battleType && option.battleType === ENUM.BattleType.COLISEUM) {
            this.isBloodClash = true;
            this.isColiseum = true;
            BattleModel.MAX_TURN_NUM = 10;
        }
        var p1_formation = option.p1RandomMode ?
            pickRandomProperty(Formation.FORMATION_CONFIG) : data.p1_formation;
        var p2_formation = option.p2RandomMode ?
            pickRandomProperty(Formation.FORMATION_CONFIG) : data.p2_formation;
        this.p1RandomMode = option.p1RandomMode ? option.p1RandomMode : ENUM.RandomBrigType.NONE;
        this.p2RandomMode = option.p2RandomMode ? option.p2RandomMode : ENUM.RandomBrigType.NONE;
        this.player1 = new Player(1, "Player 1", new Formation(p1_formation), 1);
        this.player2 = new Player(2, "Player 2", new Formation(p2_formation), 1);
        BrigGenerator.initializeBrigs(data, option);
        this.cardManager.sortAllCurrentMainCards();
        graphic.displayFormationAndFamOnCanvas();
        if (!BattleDebugger.IS_DEBUG_MODE) {
            this.logger.displayInfoText();
            this.logger.displayWarningText();
        }
    }
    BattleModel.getInstance = function () {
        if (BattleModel._instance === null) {
            throw new Error("Error: you should not make this object this way");
        }
        return BattleModel._instance;
    };
    BattleModel.resetAll = function () {
        BattleModel.removeInstance();
        BattleLogger.removeInstance();
        BattleGraphic.removeInstance();
        CardManager.removeInstance();
    };
    BattleModel.removeInstance = function () {
        BattleModel._instance = null;
    };
    BattleModel.prototype.getPlayerById = function (id) {
        if (id === 1) {
            return this.player1;
        }
        else if (id === 2) {
            return this.player2;
        }
        else {
            throw new Error("Invalid player");
        }
    };
    BattleModel.prototype.getOppositePlayer = function (player) {
        if (player === this.player1) {
            return this.player2;
        }
        else if (player === this.player2) {
            return this.player1;
        }
        else {
            throw new Error("Invalid player");
        }
    };
    BattleModel.prototype.processDamagePhase = function (data) {
        var target = data.target;
        var damage = this.getWouldBeDamage(data);
        var isMissed = data.attacker.willMiss();
        if (isMissed) {
            damage = 0;
            data.attacker.justMissed = true;
        }
        else {
            data.attacker.justMissed = false;
        }
        var evaded = target.justEvaded;
        if (evaded) {
            damage = 0;
        }
        if (!isMissed && !evaded && data.skill.skillFunc === ENUM.SkillFunc.KILL) {
            if (Math.random() <= data.skill.skillFuncArg2) {
                var isKilled = true;
            }
        }
        if (isKilled) {
            damage = target.getHP() + target.status.hpShield;
        }
        var hpShield = ~~target.status.hpShield;
        if (hpShield > 0 && !isMissed && !evaded && !isKilled) {
            if (damage >= hpShield) {
                target.status.hpShield = 0;
                damage -= hpShield;
            }
            else {
                target.status.hpShield = hpShield - damage;
                damage = 0;
            }
        }
        var surviveSkill = target.getSurviveSkill();
        var defenseData = {
            executor: target,
            skill: surviveSkill,
            attacker: data.attacker,
            wouldBeDamage: damage
        };
        if (surviveSkill && surviveSkill.willBeExecuted(defenseData) && !isKilled && !isMissed && !evaded) {
            surviveSkill.execute(defenseData);
            damage = target.getHP() - 1;
        }
        target.changeHP(-1 * damage);
        target.lastBattleDamageTaken = damage;
        data.attacker.lastBattleDamageDealt = damage;
        if (!data.additionalDescription) {
            data.additionalDescription = "";
        }
        if (data.skill.skillFunc === ENUM.SkillFunc.PROTECT_REFLECT) {
            if (target.hasWardOfType(data.oriAtkSkill.ward)) {
                var wardUsed = data.oriAtkSkill.ward;
            }
        }
        else if (target.hasWardOfType(data.skill.ward)) {
            wardUsed = data.skill.ward;
        }
        if (isMissed) {
            var desc = data.attacker.name + " missed the attack on " + target.name;
        }
        else if (evaded) {
            desc = target.name + " evaded the attack!";
        }
        else if (isKilled) {
            desc = target.name + " is killed outright!";
        }
        else {
            desc = data.additionalDescription + target.name + " lost " + damage + "hp (remaining " +
                target.getHP() + "/" + target.originalStats.hp + ")";
        }
        this.logger.addMinorEvent({
            executorId: data.attacker.id,
            targetId: target.id,
            type: ENUM.MinorEventType.HP,
            amount: (-1) * damage,
            description: desc,
            skillId: data.skill.id,
            wardUsed: wardUsed,
            missed: isMissed,
            evaded: evaded,
            isKilled: isKilled
        });
        if (target.isDead) {
            this.logger.addMinorEvent({
                description: target.name + " is dead",
                type: ENUM.MinorEventType.TEXT
            });
            this.addOnDeathCard(target);
        }
        else {
            BuffSkillLogic.processRemainHpBuff(target, false);
        }
        this.processPostDamageAffliction(data.attacker, target, damage);
    };
    BattleModel.prototype.processPostDamageAffliction = function (attacker, target, damage) {
        if (damage < 0 || attacker.isDead || target.justEvaded || attacker.justMissed) {
            return;
        }
        var skill = target.getPassiveAffliction(attacker);
        if (skill !== null) {
            AfflictionSkillLogic.processAffliction(target, attacker, skill);
        }
    };
    BattleModel.prototype.getWouldBeDamage = function (data) {
        var attacker = data.attacker;
        var target = data.target;
        var skill = data.skill;
        var skillMod = skill.skillFuncArg1;
        if (skill.skillFunc !== ENUM.SkillFunc.PROTECT_REFLECT) {
            var ignorePosition = Skill.isPositionIndependentAttackSkill(skill.id);
        }
        else {
            ignorePosition = Skill.isPositionIndependentAttackSkill(data.oriAtkSkill.id);
        }
        var baseDamage;
        switch (skill.skillCalcType) {
            case (ENUM.SkillCalcType.DEFAULT):
            case (ENUM.SkillCalcType.WIS):
                baseDamage = getDamageCalculatedByWIS(attacker, target);
                break;
            case (ENUM.SkillCalcType.ATK):
                baseDamage = getDamageCalculatedByATK(attacker, target, ignorePosition);
                break;
            case (ENUM.SkillCalcType.AGI):
                baseDamage = getDamageCalculatedByAGI(attacker, target, ignorePosition);
                break;
            case ENUM.SkillCalcType.REFLECT:
                baseDamage = getReflectAmount(data.oriAttacker, data.oriAtkSkill, data.attacker, target, ignorePosition, data.oriDmg);
                break;
            default:
                throw new Error("Invalid calcType!");
        }
        var damage = skillMod * baseDamage;
        if (data.scaledRatio)
            damage *= data.scaledRatio;
        if (data.varyingRatio)
            damage *= data.varyingRatio;
        if (data.dmgRatio)
            damage *= data.dmgRatio;
        damage *= attacker.getPassiveDamageEffect(target);
        damage *= target.getPassiveReceivedDamageEffect(attacker);
        if (skill.skillFunc === ENUM.SkillFunc.PROTECT_REFLECT) {
            skill = data.oriAtkSkill;
        }
        switch (skill.ward) {
            case ENUM.WardType.PHYSICAL:
                damage = Math.round(damage * (1 - target.status.attackResistance));
                break;
            case ENUM.WardType.MAGICAL:
                damage = Math.round(damage * (1 - target.status.magicResistance));
                break;
            case ENUM.WardType.BREATH:
                damage = Math.round(damage * (1 - target.status.breathResistance));
                break;
            default:
                throw new Error("Wrong type of ward. Maybe you forgot to include in the skill?");
        }
        return damage;
    };
    BattleModel.prototype.damageToTargetDirectly = function (target, damage, reason) {
        target.changeHP(-1 * damage);
        var descVerb = " lost ";
        if (damage < 0) {
            descVerb = " gained ";
        }
        var description = target.name + descVerb + Math.abs(damage) + " HP because of " + reason;
        this.logger.addMinorEvent({
            targetId: target.id,
            type: ENUM.MinorEventType.HP,
            amount: (-1) * damage,
            description: description,
        });
        if (target.isDead) {
            this.logger.addMinorEvent({
                description: target.name + " is dead",
                type: ENUM.MinorEventType.TEXT
            });
            this.addOnDeathCard(target);
        }
        else {
            BuffSkillLogic.processRemainHpBuff(target, damage < 0);
        }
    };
    BattleModel.prototype.startBattle = function () {
        this.logger.startBattleLog();
        this.performOpeningSkills();
        while (!this.isFinished) {
            this.logger.currentTurn++;
            if (this.turnOrderChangeEffectiveTurns === 0) {
                this.turnOrderBase = ENUM.BattleTurnOrderType.AGI;
            }
            else {
                this.turnOrderChangeEffectiveTurns--;
            }
            this.cardManager.updateAllCurrentMainCards();
            this.cardManager.sortAllCurrentMainCards();
            for (var i = 0; i < 10 && !this.isFinished; i++) {
                var currentCard = this.allCurrentMainCards[i];
                this.currentPlayer = currentCard.player;
                this.currentPlayerMainCards = this.cardManager.getPlayerCurrentMainCards(this.currentPlayer);
                this.currentPlayerReserveCards = this.cardManager.getPlayerCurrentReserveCards(this.currentPlayer);
                this.oppositePlayer = this.getOppositePlayer(this.currentPlayer);
                this.oppositePlayerMainCards = this.cardManager.getPlayerCurrentMainCards(this.oppositePlayer);
                this.oppositePlayerReserveCards = this.cardManager.getPlayerCurrentReserveCards(this.oppositePlayer);
                if (currentCard.isDead) {
                    var column = currentCard.formationColumn;
                    if (this.isBloodClash && this.currentPlayerReserveCards[column]) {
                        var reserveCard = this.currentPlayerReserveCards[column];
                        this.cardManager.switchCardInAllCurrentMainCards(currentCard, reserveCard);
                        this.currentPlayerMainCards[column] = reserveCard;
                        this.currentPlayerReserveCards[column] = null;
                        this.logger.addMajorEvent({
                            description: currentCard.name + " is switched by " + reserveCard.name,
                        });
                        this.logger.addMinorEvent({
                            description: currentCard.name + " is switched by " + reserveCard.name,
                            type: ENUM.MinorEventType.RESERVE_SWITCH,
                            reserveSwitch: {
                                mainId: currentCard.id,
                                reserveId: reserveCard.id
                            }
                        });
                        currentCard = reserveCard;
                        var openingSkill = currentCard.getRandomOpeningSkill();
                        if (openingSkill) {
                            var data = {
                                executor: currentCard,
                                skill: openingSkill
                            };
                            if (openingSkill.willBeExecuted(data)) {
                                this.logger.addMajorEvent({
                                    description: currentCard.name + " procs " + openingSkill.name,
                                    executorId: currentCard.id,
                                    skillId: openingSkill.id
                                });
                                openingSkill.execute(data);
                            }
                        }
                    }
                    else {
                        continue;
                    }
                }
                var missTurn = !currentCard.canAttack();
                if (missTurn) {
                    this.logger.addMajorEvent({
                        description: currentCard.name + " missed a turn"
                    });
                }
                this.processActivePhase(currentCard, "FIRST");
                if (this.isFinished)
                    break;
                var passiveSkill = currentCard.getPassiveSkill();
                if (!currentCard.isDead && currentCard.status.willAttackAgain !== 0) {
                    this.processActivePhase(currentCard, "FIRST");
                    currentCard.status.willAttackAgain = 0;
                    if (this.isFinished)
                        break;
                }
                else if (!currentCard.isDead && passiveSkill && passiveSkill.skillFunc === ENUM.SkillFunc.EXTRA_TURN_PASSIVE) {
                    if (passiveSkill.willBeExecuted({ executor: currentCard, skill: passiveSkill })) {
                        this.logger.addMinorEvent({
                            description: currentCard.name + " gets an extra turn!",
                            type: ENUM.MinorEventType.TEXT
                        });
                        this.processActivePhase(currentCard, "FIRST");
                        if (this.isFinished)
                            break;
                    }
                }
                if (!currentCard.isDead) {
                    if (currentCard.getAfflictionType() !== ENUM.AfflictionType.BURN) {
                        var cured = currentCard.updateAffliction();
                    }
                    if (!currentCard.affliction && cured) {
                        var desc = currentCard.name + " is cured of affliction!";
                        this.logger.addMinorEvent({
                            targetId: currentCard.id,
                            type: ENUM.MinorEventType.AFFLICTION,
                            affliction: {
                                type: currentCard.getAfflictionType(),
                                isFinished: true,
                            },
                            description: desc,
                        });
                    }
                    this.processOnDeathPhase();
                }
                this.checkFinish();
            }
            if (!this.isFinished) {
                this.processEndTurn();
            }
        }
        if (BattleDebugger.IS_DEBUG_MODE) {
            BattleDebugger.getInstance().displayDebugger();
        }
        return this;
    };
    BattleModel.prototype.addOnDeathCard = function (card) {
        if (card.hasOnDeathSkill()) {
            this.onDeathCards.push(card);
        }
    };
    BattleModel.prototype.checkFinish = function () {
        var noOnDeathRemain = this.onDeathCards.length === 0;
        if (this.cardManager.isAllDeadPlayer(this.oppositePlayer) && noOnDeathRemain) {
            this.playerWon = this.currentPlayer;
        }
        else if (this.cardManager.isAllDeadPlayer(this.currentPlayer) && noOnDeathRemain) {
            this.playerWon = this.oppositePlayer;
        }
        if (this.playerWon) {
            this.logger.addMajorEvent({
                description: this.playerWon.name + " has won"
            });
            this.logger.addMinorEvent({
                type: ENUM.MinorEventType.TEXT,
                description: "Battle ended"
            });
            this.isFinished = true;
        }
    };
    BattleModel.prototype.processActivePhase = function (currentCard, nth) {
        if (currentCard.getAfflictionType() === ENUM.AfflictionType.BURN) {
            this.logger.addMajorEvent({
                description: currentCard.name + "'s turn"
            });
            currentCard.updateAffliction();
            this.checkFinish();
            if (currentCard.isDead || this.isFinished) {
                return;
            }
        }
        var activeSkill = currentCard.getRandomActiveSkill();
        if (nth === "FIRST" && currentCard.isMounted) {
            activeSkill = currentCard.getFirstActiveSkill();
        }
        else if (nth === "SECOND" && currentCard.isMounted) {
            activeSkill = currentCard.getSecondActiveSkill();
        }
        if (activeSkill) {
            var data = {
                executor: currentCard,
                skill: activeSkill
            };
            if (activeSkill.willBeExecuted(data)) {
                if (currentCard.canConfuse()) {
                    activeSkill.setConfuse(currentCard.getConfuseProb());
                }
                else if (activeSkill.isConfused()) {
                    activeSkill.clearConfuse();
                }
                this.logger.addMajorEvent({
                    description: currentCard.name + " procs " + activeSkill.name,
                    executorId: currentCard.id,
                    skillId: activeSkill.id
                });
                activeSkill.execute(data);
            }
            else {
                this.executeNormalAttack(currentCard);
            }
        }
        else {
            this.executeNormalAttack(currentCard);
        }
        this.processOnDeathPhase();
        this.checkFinish();
        if (this.isFinished) {
            return;
        }
        else if (nth === "FIRST" && currentCard.isMounted && !currentCard.isDead) {
            this.processActivePhase(currentCard, "SECOND");
        }
    };
    BattleModel.prototype.processOnDeathPhase = function () {
        var hasOnDeath = [];
        for (var i = 0; i < this.onDeathCards.length; i++) {
            hasOnDeath.push(this.onDeathCards[i]);
        }
        this.onDeathCards = [];
        for (var i = 0; i < hasOnDeath.length; i++) {
            var card = hasOnDeath[i];
            var skill = card.getInherentOnDeathSkill();
            var data = {
                executor: card,
                skill: skill
            };
            if (skill && skill.willBeExecuted(data)) {
                this.logger.addMinorEvent({
                    executorId: card.id,
                    type: ENUM.MinorEventType.DESCRIPTION,
                    description: card.name + " procs " + skill.name + ". ",
                    skillId: skill.id
                });
                skill.execute(data);
            }
            skill = card.getBuffOnDeathSkill();
            data = {
                executor: card,
                skill: skill
            };
            card.clearBuffOnDeathSkill();
            if (skill && skill.willBeExecuted(data)) {
                this.logger.addMinorEvent({
                    executorId: card.id,
                    type: ENUM.MinorEventType.DESCRIPTION,
                    description: card.name + " procs " + skill.name + ". ",
                    skillId: skill.id
                });
                skill.execute(data);
            }
        }
        if (this.onDeathCards.length !== 0) {
            this.processOnDeathPhase();
        }
    };
    BattleModel.prototype.processEndTurn = function () {
        this.logger.addMajorEvent({
            description: "Turn end"
        });
        this.logger.addMinorEvent({
            type: ENUM.MinorEventType.TEXT,
            description: "Turn end"
        });
        if (this.logger.currentTurn >= BattleModel.MAX_TURN_NUM) {
            var p1Cards = this.cardManager.getPlayerAllCurrentCards(this.player1);
            var p2Cards = this.cardManager.getPlayerAllCurrentCards(this.player2);
            var p1Ratio = this.cardManager.getTotalHPRatio(p1Cards);
            var p2Ratio = this.cardManager.getTotalHPRatio(p2Cards);
            if (p1Ratio >= p2Ratio) {
                this.playerWon = this.player1;
                var battleDesc = "Decision win";
            }
            else {
                this.playerWon = this.player2;
                battleDesc = "Decision loss";
            }
            this.isFinished = true;
            this.logger.addMajorEvent({
                description: "Decision win for " + this.playerWon.name
            });
            this.logger.addMinorEvent({
                type: ENUM.MinorEventType.BATTLE_DESCRIPTION,
                description: "Decision win",
                battleDesc: battleDesc
            });
        }
        else if (this.isBloodClash || this.isColiseum) {
            var allCards = this.cardManager.getAllCurrentCards();
            for (var i = 0; i < allCards.length; i++) {
                var tmpCard = allCards[i];
                if (tmpCard && !tmpCard.isDead) {
                    var bonusProb = this.isColiseum ? ENUM.AddProbability.COLISEUM : ENUM.AddProbability.BLOODCLASH;
                    tmpCard.bcAddedProb += bonusProb;
                    this.logger.addMinorEvent({
                        type: ENUM.MinorEventType.BC_ADDPROB,
                        description: tmpCard.name + " gets " + bonusProb + "% increase in skill prob.",
                        bcAddProb: {
                            targetId: tmpCard.id,
                            isMain: this.cardManager.isCurrentMainCard(tmpCard)
                        }
                    });
                }
            }
        }
    };
    BattleModel.prototype.executeNormalAttack = function (attacker) {
        if (!attacker.canAttack() || attacker.isDead) {
            return;
        }
        var skill = attacker.autoAttack;
        if (attacker.canConfuse()) {
            skill.setConfuse(attacker.getConfuseProb());
        }
        else if (skill.isConfused()) {
            skill.clearConfuse();
        }
        this.logger.addMajorEvent({
            description: attacker.name + " attacks!",
            skillId: skill.id,
            executorId: attacker.id
        });
        skill.execute({
            executor: attacker,
            skill: skill
        });
    };
    BattleModel.prototype.processProtect = function (attacker, targetCard, attackSkill, targetsAttacked, scaledRatio, varyingRatio) {
        var enemyCards = this.cardManager.getEnemyCurrentMainCards(attacker.player);
        var protectSkillActivated = false;
        var toReturn = {};
        for (var i = 0; i < enemyCards.length && !protectSkillActivated; i++) {
            if (enemyCards[i].isDead) {
                continue;
            }
            var protectSkill = enemyCards[i].getRandomProtectSkill();
            if (protectSkill) {
                var protector = enemyCards[i];
                if (targetsAttacked && targetsAttacked[protector.id]) {
                    continue;
                }
                var protectData = {
                    executor: protector,
                    skill: protectSkill,
                    attacker: attacker,
                    attackSkill: attackSkill,
                    targetCard: targetCard,
                    targetsAttacked: targetsAttacked,
                    scaledRatio: scaledRatio,
                    varyingRatio: varyingRatio
                };
                if (protectSkill.willBeExecuted(protectData)) {
                    protectSkillActivated = true;
                    toReturn = protectSkill.execute(protectData);
                }
            }
            else {
                continue;
            }
        }
        toReturn.activated = protectSkillActivated;
        return toReturn;
    };
    BattleModel.prototype.performOpeningSkills = function () {
        var p1cards = this.cardManager.getPlayerCurrentMainCardsByProcOrder(this.player1);
        var p2cards = this.cardManager.getPlayerCurrentMainCardsByProcOrder(this.player2);
        for (var i = 0; i < p1cards.length; i++) {
            var skill1 = p1cards[i].getRandomOpeningSkill();
            if (skill1) {
                var data = {
                    executor: p1cards[i],
                    skill: skill1
                };
                if (skill1.willBeExecuted(data)) {
                    this.logger.addMajorEvent({
                        description: p1cards[i].name + " procs " + skill1.name,
                        executorId: p1cards[i].id,
                        skillId: skill1.id
                    });
                    skill1.execute(data);
                }
            }
        }
        for (var i = 0; i < p2cards.length; i++) {
            var skill2 = p2cards[i].getRandomOpeningSkill();
            if (skill2) {
                data = {
                    executor: p2cards[i],
                    skill: skill2
                };
                if (skill2.willBeExecuted(data)) {
                    this.logger.addMajorEvent({
                        description: p2cards[i].name + " procs " + skill2.name,
                        executorId: p2cards[i].id,
                        skillId: skill2.id
                    });
                    skill2.execute(data);
                }
            }
        }
        this.turnOrderChanged = false;
    };
    BattleModel.IS_MASS_SIMULATION = false;
    BattleModel.MAX_TURN_NUM = 5;
    BattleModel._instance = null;
    return BattleModel;
}());
var TierList = {
    'X+': [
        'Aegir, the Roaring Sea II',
        'Crassus, the Lion General II',
        'Hel, Goddess of Woe II',
        'Lancelot of the Lake II',
        'Ortlinde, Silent Valkyrie II',
        'Poliahu, the Mauna Kea',
        'Sabnock, Marquis of Hell II',
        'Thanatos, Death Incarnate II',
        'Van, Shadow Hunter II',
        'Zepar, Blood-Annointed II'
    ],
    X: [
        'A\'shi, Pterorider II',
        'Adranus, Lava Beast II',
        'Amaterasu, Light of the Sun II',
        'Amethyst Dragon II',
        'Andras, the Slayer II',
        'Arcanan Death II',
        'Arcanan Fool II',
        'Arcanan Star II',
        'Arcanan Sun II',
        'Arcanan Temperance II',
        'Arcanan Terra II',
        'Ares, God of Ruin II',
        'Aspidochelone, the Iceberg II',
        'Ausra, the Fall Breeze II',
        'Azazel, the Temptress II',
        'Azi Dahaka II',
        'Banshee Rider II',
        'Bastet, Cat Goddess',
        'Beatrice, the Luminescent II',
        'Beelzebub, Glutton King II',
        'Belle, Grimoire Keeper II',
        'Brine Drake',
        'Camazo, Knight of Bats II',
        'Champion of Aquarius II',
        'Chicomecoatl, the Bountiful II',
        'Dauntless Justice',
        'Dionysus, the Reveler',
        'Emerald Dragon II',
        'Fafnir, Fireclad Dragon II',
        'Fenrir, Vengeful Beast',
        'Garshasp, the Juggernaut',
        'Gorynich, Snow Dragon II',
        'Gunhild, Brass Pincers II',
        'Guillaume, Fanatic',
        'He Qiong, the Transcendent II',
        'Helen, Swan Queen II',
        'Heracles, Mightiest of Men II',
        'Horus, the Falcon God II',
        'Huitzilopochtli, God of War II',
        'Idun, the Golden Apple II',
        'Ixtab, Guardian of the Dead II',
        'Intrepid Hand of Mercury',
        'Isabella, the Waterbrand',
        'Kaikias, the Hail God',
        'Ker, the Despair Diamond',
        'Kokopelli Mana II',
        'Kokuanten, the Ominous II',
        'Kushinada, Shamaness II',
        'Lady Tatsuta, the Mapleleaf II',
        'Laned, the Piercing Fist II',
        'Laola, Demiwyrm Spearbearer II',
        'Lippy, Candymancer II',
        'Liza, Blood-Anointed',
        'Lu Bu, the Peerless',
        'Maisie, Grimoire Keeper II',
        'Maleficent Chimaera II',
        'Medb, Jealous Queen II',
        'Menelaus, Vengeful King',
        'Michael, Steelclad Angel II',
        'Mormo, Nightmare II',
        'Nidhogg, Iceclad Dragon II',
        'Nike, Goddess of Victory II',
        'Odoa, the Scarecrow II',
        'Oenone, the Hailstorm',
        'Pallas, Goddess of Protection II',
        'Peri, Spirit of Fire II',
        'Persephone, Spring Goddess  II',
        'Pomona, Grove Goddess II',
        'Qing Nu, Snowweaver II',
        'Rapunzel, Grimoire Keeper II',
        'Rattlebolt Wyvern',
        'Renenet, Goddess of Wealth',
        'Scathach, Shadow Goddess II',
        'Shackled Red Wyrm II',
        'Silver Dragon II',
        'Sir Galahad, Knight Champion II',
        'Sir Gawain, Sun Knight II',
        'Skeleton King II',
        'Snegurochka II',
        'Spartacus, Rebel Gladiator II',
        'Strigoi, Undying Warrior II',
        'Triton, Lord of the Sea II',
        'Tyr, God of War II',
        'Ulfhe, Sword-Shield Master II',
        'Urom, Mummy Lizardman II',
        'Vidar, the Iron Heel II',
        'Virginal, Ice Queen',
        'Vlad, Swap II',
        'Walutahanga, Guardian Dragon',
        'Wrath, Beast of Sin II',
        'Zeruel Angel of War, Swap',
        'Zhu Rong, the Blazing Storm'
    ],
    'S+': [
        'Ah Puch, Lord of Death',
        'Alyssa, Black Cat Witch II',
        'Aletheia, Knight Templar II',
        'Ammit, Soul Destroyer II',
        'Amphion, Hymn of Death',
        'Amphisbaena II',
        'Ankou, Harbinger of Death II',
        'Anneberg, Steel Steed II',
        'Apate, Goddess of Deceit',
        'Apep the Chaotic',
        'Apollo, God of the Sun II',
        'Apsara, Spirit of Water II',
        'Arcanan Circle of Fate',
        'Arcanan Daemon II',
        'Arcanan Emperor II',
        'Arcanan Empress II',
        'Arcanan Hanged Man II',
        'Arcanan Hermit II',
        'Arcanan High Priestess II',
        'Arcanan Judgment II',
        'Arcanan Lovers II',
        'Arcanan Moon II',
        'Arcanan Might II',
        'Ashlee Steamsaw II',
        'Aso, the Asura',
        'Baba Yaga II',
        'Bandersnatch, Beast Divine II',
        'Befana, the Moonless Night',
        'Belial, Lord of Vices',
        'Benjamina, Wild Turkey',
        'Bercilak, Green Knight II',
        'Bijan, the Comet',
        'Blazing Drake',
        'Brass Rabbit',
        'Briar, Grimoire Keeper II',
        'Caassimolar, the Chimera II',
        'Calais, the Gale II',
        'Captain Jed II',
        'Captain Kidd II',
        'Chanchu, Hermit II',
        'Crystallus Rex II',
        'Cu Chulainn, the Thunderbolt',
        'Cursebone Pterosaur II',
        'Dagon II',
        'Diana, the Crescent Moon',
        'Danniel, Golden Paladin II',
        'Darkwind Wyvern',
        'Decaying Dragon',
        'Demonblade Countess',
        'Discordia, Bringer of Ruin',
        'Djinn of the Lamp II',
        'Dryas, Centaur Knight II',
        'Elsa, Undead Bride II',
        'Empusa, the Death Scythe',
        'Erupting Golem',
        'Etain, Scalewing Faerie II',
        'Feathered Drake',
        'Fell Bonedrake Knight',
        'Ferocious Siege Tower',
        'Frost Bearwolf II',
        'Gabrielle, Angel of Sky II',
        'Galatea, Nereid II',
        'Gargoyle Gatekeeper II',
        'Garmr, Watchhound II',
        'Ghislandi, the Unchained II',
        'Gigantopithecus II',
        'Gilgamesh the Bold II',
        'Goliath, Titanic Warden',
        'Gremory, the Vermilion Moon',
        'Gryla, Swap II',
        'Guardian of the Grove II',
        'Hei Long, the New Moon',
        'Hel, Goddess of Death II',
        'Hellscale Theropod',
        'Hippocamp II',
        'Hippolyta, Amazon Queen II',
        'Hollofernyiges II',
        'Hypnos, Lord of Dreams II',
        'Ijiraq the Brinicle II',
        'Impregnable Iron Golem',
        'Infernal Wyrm Warden',
        'Intrepid Hand of Jupiter',
        'Intrepid Hand of Neptune',
        'Intrepid Hand of Uranus',
        'Intrepid Hand of Venus',
        'Jabberwock, Phantom Dragon II',
        'Jarilo, God of Fertility',
        'Julia, Centaur Eques II',
        'Juno, Goddess of Affection II',
        'Kapoonis, Thunder Magus II',
        'Karna, the Red Eye II',
        'Kibitsuhiko, Ogre Slayer II',
        'Kotyangwuti, Spider Spirit II',
        'Lachesis, the Measurer II',
        'Lamashtu, Fell Goddess',
        'Lava Dragon II',
        'Long Nu, Sea Princess',
        'Lucan, Eagle Knight II',
        'Lucifuge, Infernal Premier',
        'Luot, Scout II',
        'Magdal, Dragonmaster II',
        'Managarmr, the Frost Moon II',
        'Manannan mac Lir II',
        'Mammi, Hare of the Harvest II',
        'Marraco, Crusted Wyrm II',
        'Melek, the Black Peacock II',
        'Microraptor II',
        'Mielikki, Bear Rider II',
        'Millarca, Lady of Thorns II',
        'Muramasa, the Cursed Katana II',
        'Musashi, the Twinblade II',
        'Neith, Goddess of War II',
        'Nephthys, Ruler of Death',
        'Nimue, Lady of the Lake II',
        'Niu Mo Wang II',
        'Odin, God of Victory II',
        'Oscar the Green II',
        'Ovinnik, Hex Beast II',
        'Paladin of Ophiuchus II',
        'Paladin of Taurus II',
        'Pasiphae, the Brass Bull II',
        'Pegasus Knight II',
        'Pele, Volcano Shamaness II',
        'Perendon the Pure',
        'Phantasmal Succubus II',
        'Pontifex Antiquus II',
        'Prismatic Wyvern',
        'Queen of the Waspmen II',
        'Qiong Qi, World Eater II',
        'Raging Cetus',
        'Rampant Lion II',
        'Ravaging Hafgufa II',
        'Ritho, King of the Giants II',
        'Rongo, Moai Master II',
        'Rusalka, Spirit of Water II',
        'Ryaum, Hussar Captain II',
        'Sachiel, Angel of Water II',
        'Sagacious Treant II',
        'Phantom Knight, the Vagabond II',
        'Saizo, Phantom Ninja II',
        'Samedi, Dark Necromancer II',
        'Samhain, Night Trampler',
        'Scirocco, Father of Winds II',
        'Sea Serpent II',
        'Sedna, the Frozen Sea II',
        'Seimei, Onmyoji II',
        'Sigurd, Dragonslayer II',
        'Sigiled Corpse Beast II',
        'Skadi, Goddess of Winter',
        'Srak, Exorcist II',
        'Susanoo, Rowdy God II',
        'Svadilfari II',
        'Takemikazuchi, the Lightning II',
        'Tanba, Founder of the Ninja II',
        'Tangata Manu, Withering Gale',
        'Tannin, Sea Dragon II',
        'Thor, the Roaring Thunder',
        'Tricia, Cauldron Witch II',
        'Twar, the Moonlit Night II',
        'Tyche, Goddess of Glory',
        'Uscias, the Claiomh Solais II',
        'Ullr, Starshooter II',
        'Urcagu, the Grinder',
        'Vesta, Flame Witch II',
        'Vlad the Impaler II',
        'Waheela, Dire Wolf II',
        'Waltraute, Valiant Valkyrie II',
        'War Bear II',
        'Xuan Wu II',
        'Ymir, Primordial Giant II',
        'Zahhak, Dragon Marshal II',
        'Zaphkiel, the Blessed Rain',
        'Zeruel, Angel of War II',
        'Zuniga, Guard Captain II'
    ],
    S: [
        'Acanthus, the Gilded Thorn II',
        'Achilles, Fallen Hero II',
        'Aengus, the Charitable II',
        'Afanc, Beast of the Deep II',
        'Agate, Gem Tamer II',
        'Aipaloovik, Sacred Dragon II',
        'Ales Darkblood II',
        'Alluring Merrow II',
        'All-Seeing Keeper II',
        'Andromalius, Eater of Lies II',
        'Anubis, Keeper of the Dead II',
        'Apocalyptic Beast II',
        'Arcanan Chariot II',
        'Arcanan Magus II',
        'Archbishop of the Deep II',
        'Archduke Ose II',
        'Atalanta, Fowler II',
        'Baal, Thunder Lord of Hell II',
        'Bai Suzhen, Lady of Scales II',
        'Bella, the Dazzling Flower II',
        'Bergel, Frost Magus II',
        'Bheara, Wastestrider II',
        'Botis, Dasher of Hopes II',
        'Brang Two-Heads II',
        'Caim, Death Seeker II',
        'Canhel, Guardian Dragon II',
        'Cap\'n Jolly, Sea Scourge II',
        'Carl, Giant Knight II',
        'Cat Sith Magus Master II',
        'Cat Sith Warlord II',
        'Cat Sith Whipmaster II',
        'Chariot Hippocamp II',
        'Chuchunya, Tundra Guardian II',
        'Chione, Fallen Heroine II',
        'Circe, Fallen Heroine II',
        'Clockwork Pumpkin II',
        'Clockwork Viper II',
        'Cocytus Dragon II',
        'Cyclops, the Rocky Cliff II',
        'Danzo, Falcon Ninja II',
        'Dasher, Battle Reindeer II',
        'Deimos, Terror Spear II',
        'Domini, Pest Controller II',
        'Doppeladler II',
        'Europa, Fallen Heroine II',
        'Etain, Butterfly Tamer II',
        'Fenghuang, Bird Divine II',
        'Fenrir II',
        'Freyr, God of the Harvest II',
        'Gathgoic the Other II',
        'Gevi, Crystal Troll Master II',
        'Grigo, Hobgoblin Slicer II',
        'Gryla, the Lullaby II',
        'Hagen, Dueling King II',
        'Hash, Lizardman Cannoneer II',
        'Hatshepsut, Mummy Queen II',
        'Heinrich the Bold II',
        'Hellawes, Fetter Witch II',
        'Hermine, High Priestess II',
        'Hina, Flame Serpent II',
        'Hlokk, Blade of Thunder II',
        'Hoska, the Firestroke II',
        'Hundred-eyed Warrior II',
        'Icarus, Fallen Hero II',
        'Infested Cyclops II',
        'Ishtar, Goddess of Love II',
        'Jack o\' Frost II',
        'Joro-gumo II',
        'Kalevan, Swap II',
        'Kekro, Demiwyrm Magus II',
        'Koroku, the Death Stinger II',
        'Kosuke, Master Ninja II',
        'Lenore, the Sly Fox II',
        'Loki, God of Cunning',
        'Madprowl Lynx II',
        'Magdal Dragonheart II',
        'Malebranche, the Chimera II',
        'Marchosias, Pit Beast II',
        'Medea, Vengeful Queen II',
        'Midas, the Wailing King II',
        'Minerva, Goddess of War II',
        'Minos, Judgment King II',
        'Mizuchi, the Raging Storm II',
        'Moloch, Soul Reaper II',
        'Momoso, Pheasant Tamer II',
        'Muspell, Giant Knight II',
        'Negafok, Reindeer Rider II',
        'Nicola, the Poison Fly II',
        'Nyx, the Dark Wing II',
        'Olan, Tricky Succubus II',
        'Ollpheist II',
        'Oka, Kunoichi II',
        'Okypete, the Swiftwing II',
        'Pagos, Camel Cavalryman II',
        'Pakal, Jade King II',
        'Pandora, Fallen Heroine II',
        'Paladin of Aquarius II',
        'Paladin of Cancer II',
        'Paladin of Gemini II',
        'Paladin of Leo II',
        'Paladin of Sagittarius II',
        'Paladin of Scorpio II',
        'Paladin of Virgo II',
        'Paris, Trueshot II',
        'Peg Powler II',
        'Pelops, Fallen Hero II',
        'Peony, the Jiang Shi II',
        'Petsuchos Minister II',
        'Phlox, Avern Witch II',
        'Premyslid, the Black King II',
        'Ragnelle, the Moonlight II',
        'Rovn, the Brass Panzer II',
        'Scathing Hierophant',
        'Scorching Marid II',
        'Seismo Worm',
        'Set, God of the Sands II',
        'Sinbad the Adventurer II',
        'Sir Brandiles, the Flameblade II',
        'Sir Oliver, the Golden Sword II',
        'Stalo, Glacial Giant II',
        'Sugaar, the Thunderstorm II',
        'Takshaka, Serpent King II',
        'Telluric Drake II',
        'Thunderbird II',
        'Tiamat, Mother of Dragons II',
        'Thoth, Hieroglypher II',
        'Tormented Bone Beast II',
        'Vepar, the Roiling Sea II',
        'Vezat, Dragonbone Warrior II',
        'Vivian Griffinrider II',
        'Void Yaksha II',
        'Vucub Caquix, the Barbarian II',
        'Wang Yi, Lady of Iron II',
        'Wicker Man II',
        'Wolfert, Grave Keeper II',
        'Wyrm Warden, Everwakeful II',
        'Wyvern Gemwarden II',
        'Yae, the Night Flower II'
    ],
    'A+': [
        'Abyssal Rahab II',
        'Aeneas, Fallen Hero II',
        'Aeshma, the Tyrant II',
        'Adara Luck Shot II',
        'Adara Luck Shot, Swap II',
        'Agathos, Wyrm of the Harvest II',
        'Ain, Squirrel-back Faerie II',
        'Aipaloovik, the Snowstorm II',
        'Alberich, the Ceratophrys II',
        'Alcina the Soulsucker II',
        'Allocer, Great Duke of Hell II',
        'Alp, Dynast of Darkness II',
        'Amazon Berserker II',
        'Ame no Uzume, the Lure II',
        'Ancient Beetle Soldier II',
        'Ancient Tree Golem II',
        'Antaeus, Giant II',
        'Asena, Wolfwoman II',
        'Aslaug, the Lyre Bow II',
        'Autolycus, Shrewd Warrior II',
        'Azan, the Dragon Bone II',
        'Badalisc, the Gourmet II',
        'Bayam II',
        'Belisama, Flame Goddess II',
        'Brangane, the Enchanting II',
        'Brass Tarantula II',
        'Bronzeclad Hyena II',
        'Caparisoned Barometz II',
        'Cat Sith Swordswoman II',
        'Cegila, Dragonian Incantator II',
        'Charon, Greedy Ferryman II',
        'Charybdis II',
        'Chi-Hu II',
        'Crystalwing Roc II',
        'Delphyne, Thunder Dragon II',
        'Dong, the Bloody Claw II',
        'Druj Nasu, the Impure II',
        'Dryad Archer II',
        'Dunkleosteus, the Rendmaw II',
        'Ebon Dragon II',
        'Eric, Bloodaxe King II',
        'Eros, the Golden Arrow II',
        'Ettin II',
        'Feng, Sanjiegun Master II',
        'Fergus, Bold King II',
        'Flame Dragon II',
        'Fleetfoot Ornithomimus II',
        'Figgo, Executioner II',
        'Freyja, Earth Goddess II',
        'Frostscale Plesiosaur II',
        'Garuda II',
        'Ghost Carriage Express II',
        'Gilles, Mad Knight II',
        'Gog, Giant II',
        'Halphas, Earl of Hell II',
        'Haokah, the Lightning Brave II',
        'Hati, Icetail Wolf II',
        'Hecatoncheir Rimetouch II',
        'Hecatoncheir the Adamantine II',
        'Hippogriff of Rites II',
        'Hraesvelg, Corpse Feaster II',
        'Hercinia the Blest II',
        'Infested Minotaur II',
        'Inhabited Ghost Ship II',
        'Ira, Hypnotic Specter II',
        'Iridescent Chalchiuhtotolin II',
        'Ivy the Verdant II',
        'Jarn, the Bladed Wolf II',
        'Jason, Fallen Hero II',
        'Jinx-eye Dragon II',
        'Jormungandr, World Serpent II',
        'Kagemaru, Master Ninja II',
        'Kalevan, the Forest Green II',
        'Kangana, the Maelstrom II',
        'Kua Fu, Sun Chaser II',
        'Kyteler the Corrupted II',
        'Leupold, Wyvern Knight II',
        'Linnorm, the Hailstorm II',
        'Ljung, the Wrecker II',
        'Long Feng, the Dragon Fist II',
        'Louise, Twilight Swordswoman II',
        'Lubberkin, Four Leaf Clover II',
        'Magog, Giant II',
        'Mammon, Raven Claw II',
        'Marcus, Brave of Liberation II',
        'Marsyas, the Cursed Flute II',
        'Mathilda the Tarantula II',
        'Melanippe, Wolfrider II',
        'Moni the Dismemberer II',
        'Montu, God of War II',
        'Najeeba, the Mapleblade II',
        'Narmer, Mummy King II',
        'Nehasim the Seething II',
        'Nergal, Abyssal Overseer II',
        'Nin-Ridu',
        'Olitiau, the Great Bat II',
        'Orpheus, Fallen Hero II',
        'Paladin of Aries II',
        'Paladin of Capricorn II',
        'Paladin of Pisces II',
        'Palamedes, the Hawk\'s Eye II',
        'Pazuzu, the Whirling Jinn II',
        'Phoenix, the Metempsychosis II',
        'Pixiu, the Wealthy II',
        'Pollux, Fallen Hero II',
        'Pumpkin Hangman II',
        'Ragnar, Dragonslayer II',
        'Rapse, the Bloody Horns II',
        'Reinforced Gem Golem II',
        'Ruprecht the Punisher II',
        'Rustom, Zombie Ape II',
        'Ruyi Zhenxian, the Ferocious II',
        'Sasquatch Sweet Tooth II',
        'Selkie, Lady of the Shore II',
        'Sera, Exorcist II',
        'Siby, Sea Seer II',
        'Sigiled Skeleton Axeman II',
        'Sihn, Moonlight King II',
        'Shisen, the Flitting Bolt II',
        'Simurgh, Bird Divine II',
        'Skoll, Dark Wolf II',
        'Skrimsl the Freezing II',
        'Snow Queen II',
        'Soura, Inferno Shaman II',
        'Suan Ni II',
        'Surtr the Fervent II',
        'Taromaiti, Fallen Goddess II',
        'Thundering Pterosaur II',
        'Tomoe, the Lightning Arrow II',
        'Tristan the Sorrowful II',
        'Typhon II',
        'Vafthruthnir, Elder Giant II',
        'Valin the Terrible II',
        'Vengeful Siege Horse II',
        'Venusia, the Grace II',
        'Wepwawet, the Vanguard II',
        'Xaphan, the Foul Flame II',
        'Yule Goat, Death Bringer II'
    ],
    A: [
        'Anne, the Whirlwind II',
        'Amon, Marquis of Blaze II',
        'Astaroth, Duke of Fear II',
        'Aurboda, the Great Mother II',
        'Ausguss, Jailer II',
        'Balgo, the Cursed Flame II',
        'Batraz, the Immortal Hero II',
        'Bennu, the Sun Bird II',
        'Cat Sith Chillweaver II',
        'Cuelebre the Ironscaled II',
        'Dagr Sunrider II',
        'Dein, Silent Bomber II',
        'Desna, Mythic Wendigo II',
        'Dharva Fangclad II',
        'Dors, Demiwyrm Warrior II',
        'Edgardo, Grand Inquisitor II',
        'Eton, Eater of Darkness II',
        'Flesh Collector Golem II',
        'Gaiuz, Crashing Wave II',
        'Gorlin Gold Helm II',
        'Grandor, Giant of Old II',
        'Gregory, the Masked Slayer II',
        'Grellas Fellstaff II',
        'Griffin Mount II',
        'Hamad, the Sweeping Wind II',
        'Hereward, Storm of Arrows II',
        'Huan, Doomcaller II',
        'Ijiraq, the Glacier II',
        'Ioskeha',
        'Iseult the Redeemer II',
        'Jack, the Rusty II',
        'Khepri, the Morning Sun II',
        'Kijin, Heavenly Maiden II',
        'Kobold Guard Captain II',
        'Lahamu, Royal Viper II',
        'Lanvall, Lizard Cavalier II',
        'Latona, Wolfwoman II',
        'Lucia, Petal-Shears II',
        'Managarmr Frost Touch II',
        'Mauthe Doog II',
        'Nightblade, Archsage of Winds II',
        'Odin Stormgod II',
        'Onra, Ogre Lord II',
        'Oniroku the Slayer II',
        'Paladin of Libra II',
        'Palna, the Vanguard II',
        'Ramiel, Angel of the Storm II',
        'Rasiel, Angel All-Knowing II',
        'Reinforced Brass Gorilla II',
        'Regin, the Brass Mantis II',
        'Rohde, the Rose Thorn II',
        'Saurva, the Lawless Lord II',
        'Sekhmet Aflame II',
        'Selk, Desert King II',
        'Solsten the Really Wanted II',
        'Spellforged Cyclops II',
        'Taotie, the Gluttonous II',
        'Tawiscara',
        'Veigr, Under-watch Captain II',
        'Venomhorn Karkadann II',
        'Zagan II'
    ],
    B: [
        'Agathos, the Ruinous II',
        'Andorra the Indomitable II',
        'Behemoth, Thunder Beast II',
        'Bert, Foe Sweep II',
        'Biast II',
        'Black Knight, Soul Hunter II',
        'Bolus, the Blue Bolt II',
        'Borivoi, the Black Prince II',
        'Botis, Earl of Hell II',
        'Brass Snow-Leopard II',
        'Bunga, the Stalwart II',
        'Camael, Angel of Destruction II',
        'Cassandra, the Tragic II',
        'Cernunnos II',
        'Charon, Darksun Ferryman II',
        'Chaotic Magma Giant II',
        'Chiyome, the Kamaitachi II',
        'Chuchunya, Iceberg Breaker II',
        'Crystal Gillant II',
        'Dantalion, Duke of Hell II',
        'Dark-Imbued Siege Horse II',
        'Deborah, Knight Immaculate II',
        'Denki the Raven II',
        'Dire Bat Pegasus II',
        'Douma, Bonze of the Dark II',
        'Farwal the Glutton II',
        'Evil Eye II',
        'Fiendish Bat Demon II',
        'Fimbul Frostclad II',
        'Figgo, Torturer II',
        'Fionn, the Meteor Sword II',
        'Fomor the Savage II',
        'Freila the Bountiful II',
        'Gangaruda the Destroyer II',
        'Ghislandi, Iron Heart II',
        'Gilbert, Moth Handler II',
        'Goviel, Hail Knight II',
        'Gretch, Chimaera Mistress II',
        'Griflet, Falcon Knight',
        'Grim Executioner II',
        'Grimoire Beast II',
        'Hawke, Fleet Admiral II',
        'Hrimthurs the Blizzard II',
        'Hyacinth, the Death Dealer II',
        'Icemelt Dragon II',
        'Ignis Fatuus II',
        'Infested Peryton II',
        'Iron Golem II',
        'Jaguar Guardian II',
        'Kelaino, the Dark Cloud II',
        'Lenore, the False II',
        'Libuse, the Black Queen II',
        'Ma-Gu the Enlightened II',
        'Mammi, Spiritmancer II',
        'Mari the Witch',
        'Marsyas, Calamity Caller II',
        'Melusine the Witch II',
        'Merman Wave Rider II',
        'Mizuchi, the Maelstrom II',
        'Moloch, the Infernal Axe II',
        'Moren, Rime Mage II',
        'Ninurta, the Thunderclap II',
        'Phantom Assassin II',
        'Sir Bedwyr of the Garden II',
        'Slagh, Carnage Incarnate II',
        'Specter of the Mirror II',
        'Steamwork Dragon',
        'Sulima, Executioner II',
        'Tangata Manu',
        'Tepaxtl, Fatal Fang II',
        'Thor, God of Lightning II',
        'Twar, Ghost Archmage II',
        'Two-Headed Stormwyrm II',
        'Undead General, Hydarnes II',
        'Ushabti II',
        'Vucub Caquix, the Dark Wing II',
        'Wu Chang the Infernal II',
        'Yule Goat, the Blood-Stained II',
        'Yulia, Snakesage II'
    ],
    C: [
        'Adonis the Bard II',
        'Aegis, the Bulwark',
        'Ahab, the Colossal Anchor II',
        'Almase the Gelid II',
        'Alp, the Dead of Night II',
        'Alviss, the Dismantler II',
        'Amazon Warfist II',
        'Antiope of the Axe II',
        'Arachnaea the Divine II',
        'Argos II',
        'Artemisia Swiftfoot II',
        'Attis the Amazonite Warrior II',
        'Badrigo the Diamond Sword II',
        'Baklus of Viper Armor II',
        'Bare-Branch Treant II',
        'Beheading Scarecrow II',
        'Beguiling Succubus II',
        'Black Cat Knight II',
        'Bheara, Tree of Death II',
        'Boudica, the Dawn Chief II',
        'Brownies, the Uproarious II',
        'Buraq, the Mourning II',
        'Caim, the Dark Plume II',
        'Cat Sith Leopard Queen II',
        'Catoblepas Groundgazer II',
        'Celestial Kirin II',
        'Chanoir, the Crimson Scythe II',
        'Chikagoro, Master Samurai II',
        'Coco, Gorilla Bandit Chief II',
        'Culann, Raving Gravekeeper II',
        'Cursed Inugami II',
        'Cursed Pumpkin Golem II',
        'Dark Hrimthurs II',
        'Depraved Satyr II',
        'Dharva, the Shadowmoon II',
        'Diaochan the Bewitching II',
        'Diamond Guivre II',
        'Donga the Exterminator II',
        'Dovin, Bounty Mistress II',
        'Earl Cat Sidhe II',
        'Empusa the Alluring II',
        'Enkidu the Invincible II',
        'Enz Rumblefoot II',
        'Esmereldathe Cunning II',
        'Fafnir, Fire Dragon II',
        'Flamel, Evil-eyed Alchemist II',
        'Flauros, Duke of Leopards II',
        'Furiae, the Fury II',
        'Gazal the Emerald Arrow II',
        'Gazer, the Tyrant\'s Eye II',
        'Galahad, Drake Knight II',
        'Golad the Mighty II',
        'Golden Fur Gullinbursti II',
        'Gorgon II',
        'Granados, Lion King II',
        'Gregoire, Weaponmaster II',
        'Grendel the Cruel II',
        'Guerson, Thunder Mage II',
        'Hagen, Mad King II',
        'Haokah, the Darkthunder II',
        'Havers the Jade II',
        'Heavy Automaton II',
        'Hellfire Anzu II',
        'Hervor, the Cursed Blade II',
        'Hilde the Sapphire Talons II',
        'Hippelaphe Thrallsong II',
        'Hogni Ruinblade II',
        'Houdi, the Illusory Flame II',
        'Hydra II',
        'Iamek, the Thunderstroke II',
        'Iapetus the Earthquake II',
        'Ibicella, Slaughter II',
        'Ironstone Girtablilu II',
        'Isegrim, the Lone Wolf II',
        'Jeanne, Knight Templar II',
        'Katiria Nullblade II',
        'Kosche, the Scorching II',
        'Kua Fu, the Eclipse II',
        'Kuki, Pirate Busho II',
        'Lahmu, Snake King II',
        'Lailoken, Vile Magus II',
        'Lamassu the Merciful II',
        'Leon, Chaos Chanter II',
        'Li Zhi, the Tiger\'s Roar II',
        'Lia, Gladiator II',
        'Lilith, the Night Witch II',
        'Lindworm, the Black Rose II',
        'Lycaon, Wolf King II',
        'Macaca, the Headlong II',
        'Makalipon, Sacred Fruit II',
        'Master Zeku II',
        'Marcus, Blood Warrior II',
        'Maxe, the Ballista II',
        'Moh Shuvuu, the Dread Bride II',
        'Monos, Lesser Skull Ape',
        'Mordred, Drake Knight',
        'Mummy ++',
        'Mummy II ++',
        'Mystic Idol ++',
        'Mystic Idol II ++',
        'Naberius II',
        'Narluce, Steel Knight II',
        'Nessus, Centaur Gaoler II',
        'Nicola, Corpse Handler II',
        'Nidhogg, Ice Dragon II',
        'Nightmare Charger II',
        'Nine-tailed Fox II',
        'Nuadha, the Shining Blade II',
        'Oberon, Faerie King II',
        'Oedipus, Tragic King II',
        'Onyx Roc II',
        'Ogre Marrowwalki II',
        'Onra, Ogre of Darkness',
        'Okypete, the Night Breeze II',
        'Orthros',
        'Pabilsag Venomclaw II',
        'Pan of the Flute II',
        'Paracelsus, Venomdagger II',
        'Pazuzu, the Fiery One II',
        'Peluda the Poison Flame II',
        'Pendragon, the Scourge II',
        'Petsuchos Executioner II',
        'Phineus, the Augur King II',
        'Pouliquen, Archibishop II',
        'Prince Asterios II',
        'Princeps, Angel of Doom II',
        'Prowling Keeper II',
        'Queen Echidna II',
        'Qiong Qi, Man Eater II',
        'Randolph the Crazed II',
        'Ran, Phantom Killer II',
        'Roksva, Jewel Master II',
        'Rudolph, Spirit Warrior II',
        'Santa, Bringer of Death II',
        'Scylla II',
        'Seiten Taisei II',
        'Set, the Shadowstorm II',
        'Sevia the Keen II',
        'Shackled White Wyrm',
        'Sigiled Ghost Knight II',
        'Sir Kay the Golden Bat II',
        'Sir Morholt, Everduelist II',
        'Sphinx, Deathwatcher II',
        'Skrimsl, Crystal Eternal II',
        'Sun-God Lugh II',
        'Surtr the Ashen II',
        'Suzuka, Bandit Chief II',
        'Talos',
        'Tametomo, Master Archer II',
        'Taromaiti, Depraved Queen II',
        'Telida, the Goldback II',
        'Tlahuizcal, the Calamity II',
        'Tulok, Icebreaker II',
        'Tuniq, Guardian Colossus II',
        'Twintail Sandwalker II',
        'Unbound Gargoyle II',
        'Unbound Gem Golem II',
        'Unicorn, Spirit Eater II',
        'Uorko Maneater II',
        'Vengeful Rattlebones II',
        'Vepar, the Perpetual Night II',
        'Wailing Banshee II',
        'Wledic, Guard Captain II',
        'Wynde, Dragonslayer II',
        'Xaphan, the Shadow Wing II',
        'Xin Lon, The Blue Dragon II',
        'Yale, Avatar of the Forest II',
        'Zabbak the Eight-Sickles II',
        'Ziraiya, Master Ninja II',
        'Ziz, Wings Divine II',
        'Zombie Dragon II',
        'Zorg, the Cruncher II'
    ]
};
