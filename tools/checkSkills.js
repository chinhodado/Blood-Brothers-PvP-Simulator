function checkSkill(data) {
    var div = document.getElementById("skillCheck");
    div.innerHTML += "Checking skill database... <br>";

    // Make a hashtable from the source data
    var entries = data.feed.entry;
    var src = {}
    for (var i = 0; i < entries.length; i++) {
        var id = entries[i].title.$t;
        var content = entries[i].content.$t;
        //if (content == "") continue;
        var pairs = content.split(", ");
        src[id] = {};
        for (var j = 0; j < pairs.length; j++) {
            var splited = pairs[j].split(": ");
            var attr = splited[0], value = splited[1];
            src[id][attr] = value;
        }
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

                if (dbS.name != sheetS.name || dbS.type != (+sheetS.skilltype) ||
                    dbS.func != (+sheetS.skillfunc) || dbS.calc != (+sheetS.skillcalctype) ||
                    dbS.range != (+sheetS.skillrange) || dbS.prob != (+sheetS.maxprobability)) {
                    conflict = true;
                }

                for (var i = 1; i <= 5; i++) {
                    var argi = "arg" + i, skillfuncargi = "skillfuncarg" + i;
                    if (dbS[argi] && sheetS[skillfuncargi] && dbS[argi] != sheetS[skillfuncargi])
                        conflict = true;

                    if (!dbS[argi] && sheetS[skillfuncargi] != "0")
                        conflict = true;

                    if (dbS[argi] && sheetS[skillfuncargi] == "0")
                        conflict = true;
                }

                if (conflict) {
                    div.innerHTML += ("Conflict: " + dbS.name + "<br>");
                }
            }
        }
    }
}