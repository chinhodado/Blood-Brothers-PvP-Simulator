/**
 * Contains functions for generating contents for the skill and familiar database
 */

function generateSkill() {
    var lastId = +document.getElementById('skill').value;
    var content = "";
    var warnings = "";
    var total = 0, saccable = 0;
    for (var i = 0; i < srcdb.skills.length; i++) {
        var skill = srcdb.skills[i];
        var id = +skill.id;
        if (id > lastId && ((lastId < 10000 && id < 10000) || (lastId > 10000 && id > 10000))) {
            var skillTxt = "";
            skillTxt += (id + ": {\n" +
                "    name: \"" + skill.name + "\", type: " + skill.skillType + ", func: " + skill.skillFunc +
                ", calc: " + skill.skillCalcType + ",\n");

            if (skill.skillFunc == ENUM.SkillFunc.RANDOM) {
                warnings += ("Warning: " + id + " - " + skill.name + ": is a random skill.\n");
            }

            // the arguments
            var lastArg = -1; // the last arg that is not 0
            for (var j = 10; j > 0; j--) {
                var key = "skillFuncArg" + j;
                if (skill[key] != 0) {
                    lastArg = j;
                    break;
                }
            }

            if (lastArg != -1) {
                var args = "";
                for (j = 1; j <= lastArg; j++) {
                    args += skill["skillFuncArg" + j];

                    if ((j == 2 || j == 7) && skill["skillFuncArg" + j] == 16) {
                        warnings += ("Warning: " + id + " - " + skill.name + ": skillFuncArg" + j + " is 16. " +
                            "Check arg1 or arg6, make sure their skillType is 16.\n");
                    }

                    if (j != lastArg) {
                        args += ", ";
                    }
                }
                skillTxt += ("    args: [" + args + "],\n");
            }

            skillTxt += ("    range: " + skill.skillRange + ", prob: " + skill.maxProbability + ",");

            if (Skill.isAttackSkill(null, skill)) {
                skillTxt += (" ward: " + Skill.getWardType(skill) + ",");
            }

            if (id > 10000) {
                skillTxt += (" isAutoAttack: true,");
            }

            total++;
            if (isSkillSaccable(id)) {
                skillTxt += (" sac: 1,");
                saccable++;
            }

            skillTxt += ("\n    desc: \"" + skill.comment + "\"\n},");
            content += (skillTxt + "\n\n");
        }
    }

    content += ("\n\n" + warnings);

    document.getElementById('result').innerText = content;
    console.log("Total: " + total + " skills, saccable: " + saccable + " skills.");
}

function generateFam() {
    document.getElementById('result').innerText = "";
    var names = document.getElementById('famList').value.split('\n');
    for (var i = 0; i < names.length; i++) {
        var name = names[i];

        var urlName = name.replace(/,/g, "%2C").replace(/ /g, "_");
        var url = "http://bloodbrothersgame.wikia.com/wiki/" + urlName;

        var rootYql = 'http://query.yahooapis.com/v1/public/yql';
        var imgXPath = '//*[@id="mw-content-text"]/table[1]/tbody/tr[2]/th/a/img';
        var req = rootYql + '?q=' + encodeURIComponent('select * from html where url="' + url + '" and xpath=\'' + imgXPath + '\'') + '&format=json';

        $.ajax({
            "url": req,
            "dataType": "jsonp",
            "success": (function(name) {
                return function(response) {
                    onGotImgLink(response, name);
                }
            })(name)
        });
    }
}

function printFam(name, img) {
    var content = "";
    var warnings = "";
    var found = false;
    for (var j = 0; j < srcdb.cards.length && !found; j++) { // O(n^2), but who cares...
        var card = srcdb.cards[j];
        if (card.name != name) continue;
        found = true;

        // heuristic, of course
        var shortName = name.split(" ").shift().replace(",", "");
        content += (card.id + ": {\n" +
            "    name: \"" + shortName + "\", stats: [" + card.popeHp + ", " + card.popeAtk + ", " +
            card.popeDef + ", " + card.popeWis + ", " + card.popeAgi + "],\n");

        var skills = "";
        for (var skillIndex = 1; skillIndex <= 3; skillIndex++) {
            if (card["skillId" + skillIndex] != 0) {
                skills += card["skillId" + skillIndex];
                if (card["skillId" + (skillIndex + 1)] != 0) {
                    skills += ", ";
                }
            } else {
                break; // assuming all empty skill slots are at the end
            }
        }

        content += ("    skills: [" + skills + "],\n");

        if (card.passiveSkillId1 !== 0) {
            content += ("    passiveSkills: [" + card.passiveSkillId1 + "],\n");
        }

        if (card.defaultSkillId != 0) {
            content += ("    autoAttack: " + card.defaultSkillId  + ",\n");
        }

        if (card.cardType == 5) {
            content += ("    isMounted: true,\n");
        }

        content += ("    img: \"" + img + "\", rarity: " + card.rarity +
            ", evo: " + card.evolution + ",\n" +
            "    fullName: \"" + name + "\"\n},\n");

        if (card.evolution !== card.maxEvolution) {
            warnings += ("Not fully evolved: " + name + "\n");
        }
    }
    if (!found) {
        warnings += ("Not found: " + name + "\n");
    }
    content += (warnings);
    document.getElementById('result').innerText += content;
}

function onGotImgLink(data, famName) {
    var imgUrl = data.query.results.img.src;
    console.log(imgUrl);
    if (imgUrl.indexOf("vignette") === -1) {
        throw new Error("Unable to find 'vignette' in the link. Maybe wikia changed the url format?")
    }
    var firstNum = imgUrl.charAt(imgUrl.indexOf("vignette") + "vignette".length);
    var indexOfImages = imgUrl.indexOf("/images/");
    var secondPart = imgUrl.charAt(indexOfImages + "/images/".length + 2) + "" +
        imgUrl.charAt(indexOfImages + "/images/".length + 3);
    var finalImgCode = firstNum + "" + secondPart;
    console.log(finalImgCode);

    printFam(famName, finalImgCode);
}

function isSkillSaccable(id) {
    for (var k = 0; k < srcdb.cards.length; k++) {
        var card = srcdb.cards[k];
        if (isCardHasSkill(card, id) && isEpicOrHigher(card) && !isDualSkillFamiliar(card)) {
            return true;
        }
    }
    return false;
}

function isDualSkillFamiliar(card) {
    // relies on the fact that there is no card with skillId3 != 0 yet
    return card.skillId1 != 0 && card.skillId2 != 0;
}

function isEpicOrHigher(card) {
    return card.rarity == 4 || card.rarity == 5 || card.rarity == 6;
}

function isCardHasSkill(card, skillId) {
    return card.skillId1 == skillId || card.skillId2 == skillId || card.skillId3 == skillId;
}
