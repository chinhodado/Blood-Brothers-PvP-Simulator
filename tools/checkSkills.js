function checkSkill(data) {
    var div = document.getElementById("skillCheck");
    div.innerHTML += "Checking skill database... <br>";

    // Make a hashtable from the source data
    var src = {}
    for (var i = 0; i < data.length; i++) {
        var id = data[i].id;
        src[id] = data[i];
    }

    for (var key in SkillDatabase) {
        if (SkillDatabase.hasOwnProperty(key)) {
            if (!src[key]) {
                div.innerHTML += ("Not found: " + key + " - " + SkillDatabase[key].name + "<br>");
            }
            else {
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

                if (conflict) {
                    div.innerHTML += ("Conflict: " + key + " " + dbS.name + "<br>");
                }
            }
        }
    }
}