/**
 * Contains functions for generating contents for the skill and familiar database
 */

function generateSkill() {
    var lastId = +document.getElementById('skill').value;
    var content = "";
    for (var i = 0; i < srcdb.skills.length; i++) {
        var skill = srcdb.skills[i];
        var id = +skill.id;
        if (id > lastId && ((lastId < 10000 && id < 10000) || (lastId > 10000 && id > 10000))) {
            var skillTxt = "";
            skillTxt += (id + ": {\n" +
                "    name: \"" + skill.name + "\", type: " + skill.skillType + ", func: " + skill.skillFunc +
                ", calc: " + skill.skillCalcType + ",\n");

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

            skillTxt += ("\n    desc: \"" + skill.comment + "\"\n},");
            content += (skillTxt + "\n\n");
        }
    }

    document.getElementById('result').innerText = content;
}

function generateFam() {
    var names = document.getElementById('famList').value.split('\n');
    var content = "";
    for (var i = 0; i < names.length; i++) {
        var name = names[i];
        for (var j = 0; j < srcdb.cards.length; j++) { // O(n^2), but who cares...
            var card = srcdb.cards[j];
            if (card.name != name) continue;

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

            if (card.defaultSkillId != 0) {
                content += ("    autoAttack: " + card.defaultSkillId  + ",\n");
            }

            if (card.cardType == 5) {
                content += ("    isMounted: true,\n");
            }

            content += ("    img: \"foobar\",\n" +
                "    fullName: \"" + name + "\"\n},\n");
        }
    }

    document.getElementById('result').innerText = content;
}