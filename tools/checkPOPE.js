function checkPOPE() {

    // Save the POPE stats table as pope.htm

    var POPETable = {};

    function getPOPEFromTable(tableTxt) {
        // parse the response text into DOM
        var doc = document.implementation.createHTMLDocument("POPE");
        doc.documentElement.innerHTML = tableTxt;

        // make the hashtable
        var table = (doc.getElementsByClassName("wikitable"))[0];
        var rows = (table.getElementsByTagName("tbody"))[0].getElementsByTagName("tr");

        for (var i = rows.length - 1; i >= 2; i--) {
            try {
                var cells = rows[i].getElementsByTagName("td");
                var cellFam = (cells[2].innerText || cells[2].textContent).trim();

                var hpPOPE = parseInt((cells[5].innerText  || cells[5].textContent).replace(/,/g, ""));
                var atkPOPE = parseInt((cells[6].innerText || cells[6].textContent).replace(/,/g, ""));
                var defPOPE = parseInt((cells[7].innerText || cells[7].textContent).replace(/,/g, ""));
                var wisPOPE = parseInt((cells[8].innerText || cells[8].textContent).replace(/,/g, ""));
                var agiPOPE = parseInt((cells[9].innerText || cells[9].textContent).replace(/,/g, ""));

                POPETable[cellFam] = [hpPOPE, atkPOPE, defPOPE, wisPOPE, agiPOPE];
            } catch (e) { }
        }

        // check with our db
        for (var key in famDatabase) {
            if (famDatabase.hasOwnProperty(key)) {
                var name = famDatabase[key].fullName;

                if (!POPETable[name]) {
                    if (!famDatabase[key].isWarlord) {
                        console.log("Not found: " + name);
                    }                    
                }
                else {
                    var dbS = famDatabase[key].stats;
                    var tbS = POPETable[name];

                    for (var i = 0; i < 5; i++) {
                        if (dbS[i] != tbS[i]) {
                            console.log("Conflict: " + name);
                            break;
                        }
                    }                    
                }
            }
        }
    }
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            getPOPEFromTable(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", "pope.htm", true);
    xmlhttp.send();
    console.log("Checking familiar database...");
}

checkPOPE();