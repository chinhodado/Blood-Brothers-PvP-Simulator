/**
 * Contains functions for checking the integrity of our familiar and skill database
 * Also check the fam images and battle backgrounds
 */

function checkSkill(data) {
    var div = document.getElementById("skillCheck");
    div.innerHTML += "Checking skill database... <br>";

    // Make a hashtable from the source data
    var src = {}
    for (var i = 0; i < data.length; i++) {
        var id = data[i].id;
        src[id] = data[i];
    }

    var whiteList = [
        202, // Trial by Fire
        355, 452, 816, 840, 881, 1008, 1076, 1115, 1141, 1158, // ondeath
        1147 // Blessed Moonlight, changed the calcType from 6 to 0, not sure of correct...
    ];

    for (var key in SkillDatabase) {
        if (SkillDatabase.hasOwnProperty(key)) {
            if (!src[key]) {
                div.innerHTML += ("Not found: " + key + " - " + SkillDatabase[key].name + "<br>");
            }
            else {
                if (whiteList.indexOf(+key) !== -1)
                    continue;

                var dbS = SkillDatabase[key];
                var sheetS = src[key];
                var conflict = false;

                if (dbS.name != sheetS.name || dbS.type != (+sheetS.skillType) ||
                    dbS.func != (+sheetS.skillFunc) || dbS.calc != (+sheetS.skillCalcType) ||
                    dbS.range != (+sheetS.skillRange) || dbS.prob != (+sheetS.maxProbability) || dbS.desc != sheetS.comment) {
                    conflict = true;
                }

                for (i = 1; i <= 10; i++) {
                    if (!dbS.args) continue;
                    var argsi = dbS.args[i - 1], skillfuncargi = "skillFuncArg" + i;
                    if (argsi && sheetS[skillfuncargi] && argsi != sheetS[skillfuncargi])
                        conflict = true;

                    if (!argsi && sheetS[skillfuncargi] != "0")
                        conflict = true;

                    if (argsi && sheetS[skillfuncargi] == "0")
                        conflict = true;
                }

                var wardType = Skill.getWardType(sheetS);

                if (wardType != dbS.ward && !(!wardType && !dbS.ward))
                    conflict = true;

                if (conflict) {
                    div.innerHTML += ("Conflict: " + key + " " + dbS.name + "<br>");
                }
            }
        }
    }
}

function checkFam(data) {
    var div = document.getElementById("famCheck");
    var src = {};

    for (var i = 0; i < data.length; i++) {
        src[data[i].id] = data[i];
    }

    var whiteList = [
        "Galahad, Drake Knight II",            // hacky 10000 skill
        "Moren, Rime Mage II",                 // hacky 10000 skill
        "Danzo, Falcon Ninja II",              // space in name
        "Chiyome, the Kamaitachi II",          // space in name
        "Ankou, Harbinger of Death II",        // space in name
        "Tanba, Founder of the Ninja II",      // space in name
        "Wyrm Warden, Everwakeful II",         // space in name
        "Valafar, Inferno Vanquisher",         // bloodlinked
        "Adamant Tarasca",                     // bloodlinked
        "Ilya, Giant Slayer",                  // bloodlinked
        "Crom Cruach, the Silver Moon",        // bloodlinked
        "Charybdis II",                        // weird error, forgot what it was...
        "Huitzilopochtli, God of War II",      // another one with weird error...
    ];

    // check with our db
    for (var key in famDatabase) {
        if (famDatabase.hasOwnProperty(key)) {
            var name = famDatabase[key].fullName;

            if (whiteList.indexOf(name) != -1)
                continue;

            if (!src[key]) {
                div.innerHTML += ("Not found: " + name + "<br>");
            }
            else if (!famDatabase[key].isWarlord) {
                var conflict = false;
                var famDb = famDatabase[key];
                var famSrc = src[key];

                var dbStats = famDb.stats;
                if (dbStats[0] != famSrc.popeHp || dbStats[1] != famSrc.popeAtk || dbStats[2] != famSrc.popeDef
                    || dbStats[3] != famSrc.popeWis || dbStats[4] != famSrc.popeAgi)
                    conflict = true;

                if (famDb.fullName != famSrc.name)
                    conflict = true;

                for (i = 0; i < 3; i++) {
                    if ((famDb.skills[i] != famSrc["skillId" + (i + 1)]) && !(!famDb.skills[i] && famSrc["skillId" + (i + 1)] == 0))
                        conflict = true;
                }

                if (!famDb.isMounted && famSrc.cardType == 5)
                    conflict = true;

                if ((famDb.autoAttack && (famSrc.defaultSkillId == 0)) ||
                    (!famDb.autoAttack && (famSrc.defaultSkillId != 0)) ||
                    (famDb.autoAttack && (famSrc.defaultSkillId != 0) && (famDb.autoAttack != famSrc.defaultSkillId)))
                    conflict = true;

                if (famDb.rarity !== famSrc.rarity)
                    conflict = true;

                if (famDb.evo !== famSrc.evolution)
                    conflict = true;

                if (famSrc.passiveSkillId1 !== 0 && (!famDb.passiveSkills || famDb.passiveSkills[0] !== famSrc.passiveSkillId1))
                    conflict = true;

                if (conflict) {
                    div.innerHTML += ("Conflict: " + name + "<br>");
                }
            }
        }
    }
}

function checkFamImages() {
    var imgCheckDiv = document.getElementById("imgCheck");
    for (var key in famDatabase) {
        if (famDatabase.hasOwnProperty(key)) {
            var url = getScaledFamiliarWikiaImageLink(famDatabase[key].img, famDatabase[key].fullName, 30);
            var img = new Image();
            img.src = url;
            imgCheckDiv.appendChild(img);
        }
    }
}

function checkBackgrounds() {
    var imgCheckDiv = document.getElementById("imgCheck");

    for (var i = 0; i < BattleBackground.bgList.length; i++) {
        var shortenedLink = BattleBackground.bgList[i];
        var url = BattleBackground.getLinkFromShortenedLink(shortenedLink);

        var img = new Image();
        img.src = url;
        imgCheckDiv.appendChild(img);
    }
}
