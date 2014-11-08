declare var swal;
declare var startTest;

/**
 * Set some form items to what were last chosen
 */
function setPreviousChoices() {
    // player 1 fams
    if (localStorage.getItem("f0") && localStorage.getItem("f0") != "null") {
        for (var i = 0; i < 10; i++) {
            (<HTMLInputElement>document.getElementById("f" + i)).value = localStorage.getItem("f" + i);
        }
    }

    // player 2 fams
    if (localStorage.getItem("f10") && localStorage.getItem("f10") != "null") {
        for (i = 0; i < 10; i++) {
            (<HTMLInputElement>document.getElementById("f" + (i + 10))).value = localStorage.getItem("f" + (i + 10));
        }
    }

    // player 1 skills
    if (localStorage.getItem("s10") && localStorage.getItem("s10") != "null") {
        for (i = 0; i < 3; i++) {
            (<HTMLInputElement>document.getElementById("s1" + i)).value = localStorage.getItem("s1" + i);
        }
    }

    // player 2 skills
    if (localStorage.getItem("s20") && localStorage.getItem("s20") != "null") {
        for (i = 0; i < 3; i++) {
            (<HTMLInputElement>document.getElementById("s2" + i)).value = localStorage.getItem("s2" + i);
        }
    }

    // player 1 formation
    if (localStorage.getItem("1f") && localStorage.getItem("1f") != "null") {
        (<HTMLInputElement>document.getElementById("1f")).value = localStorage.getItem("1f");
    }

    // player 2 formation
    if (localStorage.getItem("2f") && localStorage.getItem("2f") != "null") {
        (<HTMLInputElement>document.getElementById("2f")).value = localStorage.getItem("2f");
    }

    // proc order
    if (localStorage.getItem("po") && localStorage.getItem("po") != "null") {
        (<HTMLInputElement>document.getElementById("po")).value = localStorage.getItem("po");
    }

    // debug mode
    if (localStorage.getItem("debug") == "true") {
        (<HTMLInputElement>document.getElementById("debug")).checked = true;
    }

    // battle type
    var bt = localStorage.getItem("bt");
    if (bt == 1 || bt == 2) {
        (<HTMLInputElement>document.getElementById("bt")).value = bt;
    }
}

/**
 * Disable/enable form items belonging to a player based on whether random is chosen or not
 */
function toogleDisable() {
    for (var player = 1; player <= 2; player++) {
        // is the random checkbox checked?
        var isSelected = (<HTMLInputElement>document.getElementById("r" + player)).checked;

        // fams, skills, formation
        var elems = document.getElementsByClassName("p" + player);
        for (var i = 0; i < elems.length; i++) {
            if (isSelected) {
                (<HTMLInputElement>elems[i]).disabled = true;
            }
            else {
                (<HTMLInputElement>elems[i]).disabled = false;
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
        var isBloodclash = (<HTMLInputElement>document.getElementById("bt")).value == "1";

        var elems = document.getElementsByClassName("reserve");
        for (var i = 0; i < elems.length; i++) {
            var elem = (<HTMLInputElement>elems[i]);
            if (!isBloodclash) {
                elem.disabled = true;
                elem.style.display = 'none';
            }
            else {
                elem.disabled = false;
                elem.style.display = 'inline';
            }
        }
    }

    // need to toogle disable at the end
    toogleDisable();
}

/**
 * Prepare the form when it is loaded
 */
function onFormLoad() {
    toogleReserve();
    toogleDisable();
}

/**
 * Put any validation for the main setting form here
 */
function validateForm() {
    return true;
}

/**
 * Submits the form. Goes into debug mode if necesary.
 */
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
            (<HTMLSelectElement>famSelects[i]).add(option);
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
            option.value = key + "";
            option.text = SkillDatabase[key].name;
            (<HTMLSelectElement>skillSelects[i]).add(option);
        }
    };
}

/**
 * Get the battle data and option from the URL. Also saves the settings to localStorage for later retrieval
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

    var data: any = {}, option: any = {};
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

/**
 * Hijack the Math.random() with our own random implementation if needed
 */
function prepareRandom() {
    var USE_CS_RND = false;
    if (USE_CS_RND) {
        var rnd = new CsRandom(1234);
        Math.random = function () {
            return rnd.nextDouble();
        }
    }
}

/**
 * Callback when the battle in normal mode has ended
 */
function onBattleFinished() {
    var startButton = document.getElementById("startButton");
    startButton.disabled = false;

    if (ENUM.Setting.IS_MOBILE) {
        startButton.style.display = "block";
    } 
    else {
        showStarRequest();
    }
}

/**
 * Callback when the simulation has ended
 */
function onSimulationFinished() {
    if (!ENUM.Setting.IS_MOBILE) {
        showStarRequest();
    }
}

/**
 * Show request for starring on Github
 */
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
                localStorage.setItem("starRequestShown", "true");
                window.location.href = 'https://github.com/chinhodado/Blood-Brothers-PvP-Simulator';
            });
        }
    }, 2000);
}


/**
 * Return a link for a random battle background
 */
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

/**
 * Prepare the battle field
 */
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

/**
 * Fetch the tier list and cache it
 */
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

    if (!localStorage.getItem("tierList")) {
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

/**
 * Update the tier list
 */
function updateTierList(data) {
    localStorage.setItem("tierList", JSON.stringify(data.results));
}

// kill me now...
function updateTierListThenPlay(data) {
    updateTierList(data);
    playGame();
}
function updateTierListThenDebug(data) {
    updateTierList(data);
    playDebug();
}
function updateTierListThenSim(data) {
    updateTierList(data);
    playSim();
}
function updateTierListThenTest(data) {
    updateTierList(data);
    startTest();
}

function playGame() {
    prepareField();
    BattleGraphic.PLAY_MODE = 'AUTO';
    BattleLogger.IS_DEBUG_MODE = false;
    document.getElementById('startButton').onclick = function () {
        this.disabled = true;

        if (ENUM.Setting.IS_MOBILE) {
            this.style.display = "none";
        }

        BattleGraphic.getInstance().resetInitialField();
        BattleGraphic.getInstance().displayMajorEventAnimation(0);
    }
    var dataOption = getBattleDataOption();
    var data = dataOption[0], option = dataOption[1];
    var newGame = new BattleModel(data, option);
    newGame.startBattle();
}

function playSim() {
    if (!ENUM.Setting.IS_MOBILE) {
        prepareField();
    }
    var dataOption = getBattleDataOption();
    var data = dataOption[0], option = dataOption[1];

    var NUM_BATTLE = 10000;
    document.getElementById("numBattle").innerHTML = numberWithCommas(NUM_BATTLE);
    (<HTMLProgressElement>document.getElementById("progressBar")).max = NUM_BATTLE;

    // create a new game just to display the fam and formation
    if (option.p1RandomMode) {
        BattleGraphic.HIDE_PLAYER1 = true;
    }

    if (option.p2RandomMode) {
        BattleGraphic.HIDE_PLAYER2 = true;
    }
    BattleLogger.IS_DEBUG_MODE = false;
    BattleModel.IS_MASS_SIMULATION = true;
    if (!ENUM.Setting.IS_MOBILE) {
        var newGame = new BattleModel(data, option);
    }

    // hide/show some elements on the page
    document.getElementById("gameDiv").setAttribute("style", "display: none;");
    document.getElementById("startButton").setAttribute("style", "display: none;");
    document.getElementById("simDiv").setAttribute("style", "display: block;");

    if (ENUM.Setting.IS_MOBILE) {
        startSynchronousSim(data, option, NUM_BATTLE);
    } 
    else {
        startWorkerSim(data, option, NUM_BATTLE);
    }
}

function playDebug() {
    prepareField();
    var dataOption = getBattleDataOption();
    var data = dataOption[0], option = dataOption[1];

    var newGame = new BattleModel(data, option);
    newGame.startBattle();
}

/**
 * Basically worker.js. Used when worker not available.
 */
function startSynchronousSim(data, option, NUM_BATTLE) {
    prepareRandom();
    var p1WinCount = 0;
    var p2WinCount = 0;
    var winCountTable = {};
    BattleModel.IS_MASS_SIMULATION = true;
    BattleGraphic.GRAPHIC_DISABLED = true;
    var tierList = localStorage.getItem("tierList");
    var startTime = new Date().getTime(); // if worker is not supported, chance is high that neither is performance.now()

    var intervalCount = 0;
    var NUM_CHUNK = 100;
    var CHUNK_SIZE = NUM_BATTLE / NUM_CHUNK;
    var interval = setInterval(function() {
        for (var i = 0; i < CHUNK_SIZE; i++) {
            var newGame = new BattleModel(data, option, tierList);
            var resultBattle = newGame.startBattle();
            BattleModel.resetAll();
            if (resultBattle.playerWon.id == 1) {
                p1WinCount++;
            } else if (resultBattle.playerWon.id == 2) {
                p2WinCount++;
            }

            var winTeam = resultBattle.cardManager.getPlayerOriginalMainCards(resultBattle.playerWon);
            if (resultBattle.isBloodClash) {
                winTeam = winTeam.concat(resultBattle.cardManager.getPlayerOriginalReserveCards(resultBattle.playerWon));
            }
            for (var j = 0; j < winTeam.length; j++) {
                if (winCountTable[winTeam[j].dbId]) {
                    winCountTable[winTeam[j].dbId]++;
                } else {
                    winCountTable[winTeam[j].dbId] = 1;
                }
            }

            document.getElementById("progressPercent").innerHTML = intervalCount + 1 + "%";
            document.getElementById("progressBar").setAttribute("value", (intervalCount * CHUNK_SIZE + i + 1) + "");
        }

        intervalCount++;
        if(intervalCount >= NUM_CHUNK) {
            clearInterval(interval);
        }

        if (intervalCount * CHUNK_SIZE >= NUM_BATTLE) {
            var endTime = new Date().getTime();
            var finalData = {
                p1WinCount: p1WinCount,
                p2WinCount: p2WinCount,
                winCountTable: winCountTable
            };
            onSimulationResultObtained(finalData, startTime, endTime);
        }
    }, 0);
}

function startWorkerSim(data, option, NUM_BATTLE) {
    // now make the workers do the simulation in background
    var totalProgress = 0;        // update every time a worker posts back
    var workerDone = 0;           // the number of workers that have done their jobs
    var NUM_WORKER = 4;           // the number of workers
    var workerPool = [];          // the worker pool
    var workerDataReturned = [];  // list of data returned by each worker

    for (var w = 0; w < NUM_WORKER; w++) {
        var worker = new Worker("js/worker.js");
        worker.onmessage = function (event) {
            if (event.data.status == "ongoing") {
                totalProgress += 100;
                document.getElementById("progressBar").setAttribute("value", totalProgress.toString());
            }
            else if (event.data.status == "done") {
                totalProgress += 100;
                document.getElementById("progressBar").setAttribute("value", totalProgress.toString());
                workerDataReturned[workerDone] = event.data;
                workerDone++;
                console.log(workerDone + " workers done.");
                if (workerDone == NUM_WORKER) { // <- all workers have finished their jobs
                    var endTime = performance.now();

                    // aggregate all workers' data to form the final data
                    var finalData = {
                        p1WinCount: 0,
                        p2WinCount: 0,
                        winCountTable: []
                    };
                    for (var i = 0; i < NUM_WORKER; i++) {
                        finalData.p1WinCount += workerDataReturned[i].p1WinCount;
                        finalData.p2WinCount += workerDataReturned[i].p2WinCount;

                        var workerTable = workerDataReturned[i].winCountTable;
                        for (var key in workerTable) {
                            if (finalData.winCountTable[key]) {
                                finalData.winCountTable[key] += workerTable[key];
                            } else {
                                finalData.winCountTable[key] = workerTable[key];
                            }
                        }
                    }

                    onSimulationResultObtained(finalData, startTime, endTime);

                    // terminate all workers
                    workerPool.forEach(function (entry) {
                        entry.terminate();
                    });
                }
            }
        };

        workerPool[w] = worker;
    }

    worker = null; // <- just leave this here
            
    // start the workers. Need to pass the tierList information in since the worker 
    // can't access sessionStorage
    var startTime = performance.now();

    for (w = 0; w < workerPool.length; w++) {
        workerPool[w].postMessage({
            data: data, 
            option: option, 
            tierList: localStorage.getItem("tierList"), 
            numBattle: NUM_BATTLE / NUM_WORKER
        });
    }
}

function onSimulationResultObtained(finalData, startTime, endTime) {
    var famIdArray = [];
    for (var key in finalData.winCountTable) {
        famIdArray.push(key);
    }
    famIdArray.sort(function (a, b) {
        return finalData.winCountTable[b] - finalData.winCountTable[a];
    });

    // now print out the details
    var simResultDiv = document.getElementById("simResultDiv");
    simResultDiv.innerHTML += ("Player 2 won: " + finalData.p2WinCount +
        "<br> Player 1 won: " + finalData.p1WinCount +
        "<br><br> Time: " + ((endTime - startTime) / 1000).toFixed(2) + "s" +
        "<br><a href=setting.html>Go back to main page </a>");

    var detail1 = "<br><br><details><summary> Most frequent appearances in win team: </summary><br>";
    for (var i = 0; i < famIdArray.length; i++) {
        var id = famIdArray[i];
        detail1 += (famDatabase[id].fullName + ": " + finalData.winCountTable[id] + "<br>");
    }
    detail1 += "</details>";
    simResultDiv.innerHTML += detail1;

    // call the callback when simulation finished
    onSimulationFinished();
}