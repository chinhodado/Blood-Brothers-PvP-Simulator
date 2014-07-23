/**
 * Set some form items to what were last chosen
 */
function setPreviousChoices() {
    // player 1 fams
    if (localStorage.getItem("f0") && localStorage.getItem("f0") != "null") {
        for (var i = 0; i < 5; i++) {
            document.getElementById("f" + i).value = localStorage.getItem("f" + i);
        }
    }

    // player 2 fams
    if (localStorage.getItem("f10") && localStorage.getItem("f10") != "null") {
        for (var i = 0; i < 5; i++) {
            document.getElementById("f" + (i + 10)).value = localStorage.getItem("f" + (i + 10));
        }
    }

    // player 1 skills
    if (localStorage.getItem("s10") && localStorage.getItem("s10") != "null") {
        for (var i = 0; i < 3; i++) {
            document.getElementById("s1" + i).value = localStorage.getItem("s1" + i);
        }
    }

    // player 2 skills
    if (localStorage.getItem("s20") && localStorage.getItem("s20") != "null") {
        for (var i = 0; i < 3; i++) {
            document.getElementById("s2" + i).value = localStorage.getItem("s2" + i);
        }
    }

    // player 1 formation
    if (localStorage.getItem("1f") && localStorage.getItem("1f") != "null") {
        document.getElementById("1f").value = localStorage.getItem("1f");
    }

    // player 2 formation
    if (localStorage.getItem("2f") && localStorage.getItem("2f") != "null") {
        document.getElementById("2f").value = localStorage.getItem("2f");
    }
}

/**
 * Disable/enable all form items belong to a player
 */
function toogleDisable(player, isSelected) {
    var elems = document.getElementsByClassName("p" + player);
    for (var i = 0; i < elems.length; i++) {
        if (isSelected) {
            elems[i].disabled = true;
        }
        else {
            elems[i].disabled = false;
        }
    }
}

function validateForm() {
    // put any validation for the main setting form here
    return true;
}

function submitForm() {
    var form = document.forms["mainForm"];
    if (form["debug"].checked == true) {
        form.action = "debug.html";
    }
    form.submit();
}

function setFamOptions() {
    var famSelects = document.getElementsByClassName("famSelect");

    // create an array of fam id and sort it based on the fam's full name
    var famIdArray = [];
    for (var key in famDatabase) {
        famIdArray.push(key);
    }
    famIdArray.sort(function (a, b) {
        return famDatabase[a].fullName.localeCompare(famDatabase[b].fullName);
    });

    for (var i = 0; i < famSelects.length; i++) {
        for (var index = 0; index < famIdArray.length; index++) {
            var key = famIdArray[index];
            var option = document.createElement("option");
            option.value = key;
            option.text = famDatabase[key].fullName;
            famSelects[i].add(option);
        }
    };
}

function setSkillOptions() {
    var skillSelects = document.getElementsByClassName("skillSelect");

    // create an array of skill id and sort it based on the skill's name
    var skillIdArray = Skill.getAvailableSkillsForSelect();
    skillIdArray.sort(function (a, b) {
        return SkillDatabase[a].name.localeCompare(SkillDatabase[b].name);
    });

    for (var i = 0; i < skillSelects.length; i++) {
        for (var index = 0; index < skillIdArray.length; index++) {
            var key = skillIdArray[index];
            var option = document.createElement("option");
            option.value = key;
            option.text = SkillDatabase[key].name;
            skillSelects[i].add(option);
        }
    };
}

function getBattleDataOption() {
    var data = {};

    // fam: player 1: f0 -> f4, f5 -> f9
    //      player 2: f10 -> f14, f15 -> f19
    // skills: player 1: s10 -> s12
    //         player 2: s20 -> s22
    // formation: player 1: 1f, player 2: 2f
    var data = {}, option = {};
    option.procOrder = getURLParameter("po");

    if (getURLParameter("r1")) {
        option.p1random = true;
    }

    if (getURLParameter("r2")) {
        option.p2random = true;
    }

    data.player1formation = getURLParameter("1f");
    if (!option.p1random) localStorage.setItem("1f", data.player1formation);

    data.player2formation = getURLParameter("2f");
    if (!option.p2random) localStorage.setItem("2f", data.player2formation);

    data.player1cardsInfo = [];
    data.player2cardsInfo = [];
    data.player1warlordSkillArray = [];
    data.player2warlordSkillArray = [];

    for (var i = 0; i < 5; i++) {
        var f1id = getURLParameter("f" + i);
        var f2id = getURLParameter("f" + (i + 10));
        data.player1cardsInfo.push(famDatabase[f1id]);
        data.player2cardsInfo.push(famDatabase[f2id]);

        if (!option.p1random) localStorage.setItem("f" + i, f1id);
        if (!option.p2random) localStorage.setItem("f" + (i + 10), f2id);
    }
    for (var i = 0; i < 3; i++) {
        var w1s = getURLParameter("s1" + i);
        var w2s = getURLParameter("s2" + i);
        data.player1warlordSkillArray.push(w1s);
        data.player2warlordSkillArray.push(w2s);

        if (!option.p1random) localStorage.setItem("s1" + i, w1s);
        if (!option.p2random) localStorage.setItem("s2" + i, w2s);
    }

    return [data, option];
}