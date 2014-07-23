﻿/**
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
 * Disable/enable form items belonging to a player based on random chosen or not
 */
function toogleDisable() {
    for (var player = 1; player <= 2; player++) {
        // is the random checkbox checked?
        var isSelected = document.getElementById("r" + player).checked;

        // fams, skills, formation
        var elems = document.getElementsByClassName("p" + player);
        for (var i = 0; i < elems.length; i++) {
            if (isSelected) {
                elems[i].disabled = true;
            }
            else {
                elems[i].disabled = false;
            }
        }

        // random modes
        var randomSelect = document.getElementById(player + "r");
        if (isSelected) {
            randomSelect.disabled = false;
        }
        else {
            randomSelect.disabled = true;
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

    option.p1RandomMode = getURLParameter("1r");
    option.p2RandomMode = getURLParameter("2r");

    data.player1formation = getURLParameter("1f");
    if (!option.p1RandomMode) localStorage.setItem("1f", data.player1formation);

    data.player2formation = getURLParameter("2f");
    if (!option.p2RandomMode) localStorage.setItem("2f", data.player2formation);

    data.player1cardsInfo = [];
    data.player2cardsInfo = [];
    data.player1warlordSkillArray = [];
    data.player2warlordSkillArray = [];

    for (var i = 0; i < 5; i++) {
        var f1id = getURLParameter("f" + i);
        var f2id = getURLParameter("f" + (i + 10));
        data.player1cardsInfo.push(famDatabase[f1id]);
        data.player2cardsInfo.push(famDatabase[f2id]);

        if (!option.p1RandomMode) localStorage.setItem("f" + i, f1id);
        if (!option.p2RandomMode) localStorage.setItem("f" + (i + 10), f2id);
    }
    for (var i = 0; i < 3; i++) {
        var w1s = getURLParameter("s1" + i);
        var w2s = getURLParameter("s2" + i);
        data.player1warlordSkillArray.push(w1s);
        data.player2warlordSkillArray.push(w2s);

        if (!option.p1RandomMode) localStorage.setItem("s1" + i, w1s);
        if (!option.p2RandomMode) localStorage.setItem("s2" + i, w2s);
    }

    return [data, option];
}

// fetch the tier list and cache it
function getTierList(whatToDoNext) {
    if (whatToDoNext == "debug") {
        var callback = "updateTierListThenDebug";
    }
    else if (whatToDoNext == "play") {
        callback = "updateTierListThenPlay";
    }
    else if (whatToDoNext == "sim") {
        callback = "updateTierListThenSim";
    }
    else {
        callback = "updateTierList";
    }

    if (!sessionStorage.tierList) {
        console.log("Fetching tier list...");
        $.ajax({
            "url": "https://www.kimonolabs.com/api/e67eckbg?apikey=ddafaf08128df7d12e4e0f8e044d2372&callback=" + callback,
            "crossDomain": true,
            "dataType": "jsonp"
        });
    }
    else {
        if (whatToDoNext == "debug") {
            playDebug();
        }
        else if (whatToDoNext == "play") {
            playGame();
        }
        else if (whatToDoNext == "sim") {
            playSim();
        }
    }
}

function updateTierList(data) {
    sessionStorage.tierList = JSON.stringify(data.results);
}

// kill me now...
function updateTierListThenPlay(data) {
    sessionStorage.tierList = JSON.stringify(data.results);
    playGame();
}
function updateTierListThenDebug(data) {
    sessionStorage.tierList = JSON.stringify(data.results);
    playDebug();
}
function updateTierListThenSim(data) {
    sessionStorage.tierList = JSON.stringify(data.results);
    playSim();
}