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