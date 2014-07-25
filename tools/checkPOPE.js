function checkPOPE(data) {
    var div = document.getElementById("famCheck");

    // Save the POPE stats table as pope.htm
    var popeResult = data.results.pope
    var POPETable = {};

    for (var i = 0; i < popeResult.length; i++) {
        var hpPOPE = parseInt((popeResult[i].hp).replace(/,/g, ""));
        var atkPOPE = parseInt((popeResult[i].atk).replace(/,/g, ""));
        var defPOPE = parseInt((popeResult[i].def).replace(/,/g, ""));
        var wisPOPE = parseInt((popeResult[i].wis).replace(/,/g, ""));
        var agiPOPE = parseInt((popeResult[i].agi).replace(/,/g, ""));

        POPETable[popeResult[i].name] = [hpPOPE, atkPOPE, defPOPE, wisPOPE, agiPOPE];
    }

    // check with our db
    for (var key in famDatabase) {
        if (famDatabase.hasOwnProperty(key)) {
            var name = famDatabase[key].fullName;

            if (!POPETable[name]) {
                if (!famDatabase[key].isWarlord) {
                    div.innerHTML += ("Not found: " + name + "<br>");
                }                    
            }
            else {
                var dbS = famDatabase[key].stats;
                var tbS = POPETable[name];

                for (var i = 0; i < 5; i++) {
                    if (dbS[i] != tbS[i]) {
                        div.innerHTML += ("Conflict: " + name + "<br>");
                        break;
                    }
                }                    
            }
        }
    }
}