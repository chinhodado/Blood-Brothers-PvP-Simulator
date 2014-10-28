/**
 * Set some form items to what were last chosen
 */
function setPreviousChoices() {
    // player 1 fams
    if (localStorage.getItem("f0") && localStorage.getItem("f0") != "null") {
        for (var i = 0; i < 10; i++) {
            document.getElementById("f" + i).value = localStorage.getItem("f" + i);
        }
    }

    // player 2 fams
    if (localStorage.getItem("f10") && localStorage.getItem("f10") != "null") {
        for (i = 0; i < 10; i++) {
            document.getElementById("f" + (i + 10)).value = localStorage.getItem("f" + (i + 10));
        }
    }

    // player 1 skills
    if (localStorage.getItem("s10") && localStorage.getItem("s10") != "null") {
        for (i = 0; i < 3; i++) {
            document.getElementById("s1" + i).value = localStorage.getItem("s1" + i);
        }
    }

    // player 2 skills
    if (localStorage.getItem("s20") && localStorage.getItem("s20") != "null") {
        for (i = 0; i < 3; i++) {
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

    // proc order
    if (localStorage.getItem("po") && localStorage.getItem("po") != "null") {
        document.getElementById("po").value = localStorage.getItem("po");
    }

    // debug mode
    if (localStorage.getItem("debug") == "true") {
        document.getElementById("debug").checked = true;
    }

    // battle type
    var bt = localStorage.getItem("bt");
    if (bt == 1 || bt == 2) {
        document.getElementById("bt").value = bt;
    }
}

/**
 * Disable/enable form items belonging to a player based on whether random is chosen or not
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

/**
 * Toogle on/off the reserve depending on whether the mode is Bloodclash or not
 */
function toogleReserve() {
    for (var player = 1; player <= 2; player++) {
        var isBloodclash = document.getElementById("bt").value == 1;

        var elems = document.getElementsByClassName("reserve");
        for (var i = 0; i < elems.length; i++) {
            if (!isBloodclash) {
                elems[i].disabled = true;
                elems[i].style.display = 'none';
            }
            else {
                elems[i].disabled = false;
                elems[i].style.display = 'inline';
            }
        }
    }

    // need to toogle disable at the end
    toogleDisable();
}

/**
 * Prepare the form when it is loaded
 */
function formOnLoad() {
    toogleReserve();
    toogleDisable();
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

/**
 * Populates the familiar selects options
 */
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
            key = famIdArray[index];
            var option = document.createElement("option");
            option.value = key;
            option.text = famDatabase[key].fullName;
            famSelects[i].add(option);
        }
    };
}

/**
 * Populates the skill selects options
 */
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

/**
 * Get the battle data and option from the URL. Also saves the settings to localstorage for later retrieval
 */
function getBattleDataOption() {
    // fam: player 1: f0 -> f4, f5 -> f9
    //      player 2: f10 -> f14, f15 -> f19
    // skills: player 1: s10 -> s12
    //         player 2: s20 -> s22
    // formation: player 1: 1f, player 2: 2f
    // random mode: player 1: 1r, player 2: 2r
    // proc order: po
    // battle type: bt
    localStorage.setItem("debug", getURLParameter("debug"));

    var data = {}, option = {};
    option.procOrder = getURLParameter("po");
    localStorage.setItem("po", option.procOrder);

    var battleType = getURLParameter("bt");
    localStorage.setItem("bt", battleType);
    option.battleType = battleType;

    option.p1RandomMode = getURLParameter("1r");
    option.p2RandomMode = getURLParameter("2r");

    data.p1_formation = getURLParameter("1f");
    if (!option.p1RandomMode) localStorage.setItem("1f", data.p1_formation);

    data.p2_formation = getURLParameter("2f");
    if (!option.p2RandomMode) localStorage.setItem("2f", data.p2_formation);

    data.p1_cardIds = [];
    data.p2_cardIds = [];
    data.p1_warlordSkillIds = [];
    data.p2_warlordSkillIds = [];

    for (var i = 0; i < 10; i++) {
        var f1id = getURLParameter("f" + i);
        var f2id = getURLParameter("f" + (i + 10));
        data.p1_cardIds.push(f1id);
        data.p2_cardIds.push(f2id);

        if (!option.p1RandomMode) localStorage.setItem("f" + i, f1id);
        if (!option.p2RandomMode) localStorage.setItem("f" + (i + 10), f2id);
    }
    for (i = 0; i < 3; i++) {
        var w1s = getURLParameter("s1" + i);
        var w2s = getURLParameter("s2" + i);
        data.p1_warlordSkillIds.push(w1s);
        data.p2_warlordSkillIds.push(w2s);

        if (!option.p1RandomMode) localStorage.setItem("s1" + i, w1s);
        if (!option.p2RandomMode) localStorage.setItem("s2" + i, w2s);
    }

    return [data, option];
}

function prepareRandom() {
    var USE_CS_RND = false;
    if (USE_CS_RND) {
        var rnd = new CsRandom(1234);
        Math.random = function () {
            return rnd.nextDouble();
        }
    }
}

function onBattleFinished() {
    document.getElementById("startButton").disabled = false;
    showStarRequest();
}

function onSimulationFinished() {
    showStarRequest();
}

function showStarRequest() {
    setTimeout(function () {
        if (!localStorage.getItem("starRequestShown")) {
            swal({
                title: "Star this!",
                text: "If you like this simulator, star the project on Github. It motivates me to improve it :)",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5cb85c",
                confirmButtonText: "Take me there",
                closeOnConfirm: false
            }, function () {
                localStorage.setItem("starRequestShown", true);
                window.location.href = 'https://github.com/chinhodado/Blood-Brothers-PvP-Simulator';
            });
        }
    }, 2000);
}

function getRandomBackground() {
    var bg = [
        "23b/Bamboo01", "34d/Bamboo02", "1c5/Carpet01", "141/Carpet02",
        "283/Carpet03", "1f8/Carpet04", "193/Carpet05", "24d/Carpet06",
        "17b/Carpet07", "3ff/Carpet08", "1e6/Carpet09", "3c3/Carpet10",
        "3a3/Carpet11", "224/Carpet12", "4ad/Carpet13", "20c/Carpet14",
        "29f/Carpet15", "21c/Carpet16", "385/Carpet17", "4f8/Carpet18",
        "362/Carpet19", "387/Carpet20", "311/Carpet21", "352/Carpet22",
        "392/Castle01", "2f9/Castle02", "3b4/Cave01", "266/Cave02",
        "3bc/Cave03", "1ad/Cave04", "4d5/Cave05", "3bf/Desert01",
        "4c9/Desert02", "3d9/Fog01", "30e/Fog02", "267/Forest01",
        "2c5/Forest02", "247/Greatwall01", "450/Halloween01", "22e/Halloween02",
        "28a/Halloween03", "11a/Jungle01", "268/Mountain01", "3fb/River01",
        "451/River02", "49f/Road01", "270/Road02", "475/Road03",
        "2a8/Road04", "40c/Road05", "2ff/Road06", "310/Road07",
        "383/Road08", "41e/Road09", "289/Road10", "183/Road11",
        "1d8/Road12", "2a7/Road13", "3cf/Road14", "3fb/Road15",
        "1f4/Road16", "28f/Road17", "2a5/Road28", "102/Road29",
        "4e9/Ruins01", "1f4/Sakura01", "336/Snow01", "49a/Swamp01",
        "145/Swamp02", "144/Tints01", "1fb/Tree01", "33c/Tree02",
        "329/81a5ccfd07ca41c238e124a5b6683b93", "1a0/Castle1", "39f/F459e81069786396191c375060d778a3",
        "3b1/66fddb4d129fa8b494cf3d21a057e226", "45f/452d87b11eb533d33fba937073bb5668",
        "4a5/48645b3ae0106d4f96fa0bf3ad6239b8"
    ];

    var shortenedLink = getRandomElement(bg);
    var firstPart = "http://img" + shortenedLink.charAt(0) + ".wikia.nocookie.net/bloodbrothersgame/images/";
    var link = firstPart + shortenedLink.charAt(1) + "/" + shortenedLink.substring(1) + ".png";
    return link;
}

function prepareField() {
    var rndBgLink = getRandomBackground();
    var img = new Image();
    var svgWrapper = document.getElementById("svgWrapper");
    img.onload = function() {
        svgWrapper.style.backgroundImage = "url('" + rndBgLink + "')";
    };
    img.onerror = function() {
        console.log("Background not found: " + rndBgLink);
        svgWrapper.style.backgroundImage = "url(img/bg01.png)";
    };
    img.src = rndBgLink;
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
    else if (whatToDoNext == "test") {
        callback = "updateTierListThenTest";
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
        else if (whatToDoNext == "test") {
            startTest();
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
function updateTierListThenTest(data) {
    sessionStorage.tierList = JSON.stringify(data.results);
    startTest();
}