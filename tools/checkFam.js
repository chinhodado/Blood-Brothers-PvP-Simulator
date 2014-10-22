function checkFam(data) {
    var div = document.getElementById("famCheck");
    var src = {};

    for (var i = 0; i < data.length; i++) {
        src[data[i].id] = data[i];
    }

    // check with our db
    for (var key in famDatabase) {
        if (famDatabase.hasOwnProperty(key)) {
            var name = famDatabase[key].fullName;

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

                if ((famDb.autoAttack && (famSrc.defaultSkillId == 0)) ||
                    (!famDb.autoAttack && (famSrc.defaultSkillId != 0)) ||
                    (famDb.autoAttack && (famSrc.defaultSkillId != 0) && (famDb.autoAttack != famSrc.defaultSkillId)))
                    conflict = true;

                if (conflict) {
                    div.innerHTML += ("Conflict: " + name + "<br>");
                }
            }
        }
    }
}