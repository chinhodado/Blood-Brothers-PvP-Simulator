/// <reference path="SkillProvider.ts"/>
declare var swal;

/**
 * Set some form items to what were last chosen
 */
function setPreviousChoices() {
    // player 1 fams
    if (localStorage.getItem("f0") && localStorage.getItem("f0") !== "null") {
        for (let i = 0; i < 10; i++) {
            (<HTMLInputElement>document.getElementById(`f${i}`)).value = localStorage.getItem(`f${i}`);
        }
    }

    // player 2 fams
    if (localStorage.getItem("f10") && localStorage.getItem("f10") !== "null") {
        for (let i = 0; i < 10; i++) {
            (<HTMLInputElement>document.getElementById(`f${i + 10}`)).value = localStorage.getItem(`f${i + 10}`);
        }
    }

    // player 1 skills
    if (localStorage.getItem("s10") && localStorage.getItem("s10") !== "null") {
        for (let i = 0; i < 3; i++) {
            (<HTMLInputElement>document.getElementById(`s1${i}`)).value = localStorage.getItem(`s1${i}`);
        }
    }

    // player 2 skills
    if (localStorage.getItem("s20") && localStorage.getItem("s20") !== "null") {
        for (let i = 0; i < 3; i++) {
            (<HTMLInputElement>document.getElementById(`s2${i}`)).value = localStorage.getItem(`s2${i}`);
        }
    }

    // player 1 formation
    if (localStorage.getItem("1f") && localStorage.getItem("1f") !== "null") {
        (<HTMLInputElement>document.getElementById("1f")).value = localStorage.getItem("1f");
    }

    // player 2 formation
    if (localStorage.getItem("2f") && localStorage.getItem("2f") !== "null") {
        (<HTMLInputElement>document.getElementById("2f")).value = localStorage.getItem("2f");
    }

    // custom stats
    let arr = ["HP", "ATK", "DEF", "WIS", "AGI"];
    for (let player = 1; player <= 2; player++) {
        for (let famIndex = 0; famIndex < 10; famIndex++) {
            for (let statIndex = 0; statIndex < arr.length; statIndex++) {
                let key = `p${player}f${famIndex}${arr[statIndex].toLowerCase()}`;
                if (localStorage.getItem(key) && localStorage.getItem(key) !== "null") {
                    (<HTMLInputElement>document.getElementById(key)).value = localStorage.getItem(key);
                }
            }
        }
    }

    // custom skills
    for (let player = 1; player <= 2; player++) {
        for (let famIndex = 0; famIndex < 10; famIndex++) {
            for (let skillIndex = 0; skillIndex < 3; skillIndex++) {
                let key = `p${player}f${famIndex}s${skillIndex}`;
                if (localStorage.getItem(key) && localStorage.getItem(key) !== "null") {
                    (<HTMLInputElement>document.getElementById(key)).value = localStorage.getItem(key);
                }
            }
        }
    }

    // debug mode
    if (localStorage.getItem("debug") === "true") {
        (<HTMLInputElement>document.getElementById("debug")).checked = true;
    }

    // battle type
    let bt = localStorage.getItem("bt");
    if (bt === "1" || bt === "2" || bt === "3") {
        (<HTMLInputElement>document.getElementById("bt")).value = bt;
    }
}

/**
 * Disable/enable form items belonging to a player based on whether random is chosen or not
 */
function toogleDisable() {
    for (let player = 1; player <= 2; player++) {
        // is the random checkbox checked?
        let isSelected = (<HTMLInputElement>document.getElementById(`r${player}`)).checked;

        // fams, skills, formation
        let elems = document.getElementsByClassName(`p${player}`);
        for (var i = 0; i < elems.length; i++) {
            if (isSelected) {
                (<HTMLInputElement>elems[i]).disabled = true;
            }
            else {
                (<HTMLInputElement>elems[i]).disabled = false;
            }
        }

        // random modes
        let randomSelect = <HTMLInputElement>document.getElementById(player + "r");
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
    for (let player = 1; player <= 2; player++) {
        let btValue = (<HTMLInputElement>document.getElementById("bt")).value;
        let isBloodclash = btValue === "1" || btValue === "3";

        let elems = document.getElementsByClassName("reserve");
        for (let i = 0; i < elems.length; i++) {
            let elem = (<HTMLInputElement>elems[i]);
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
    setFamOptions();
    setSkillOptions();
    addCustomsStatDiv();
    addCustomsSkillDiv(); // this has to be called after setSkillOptions()

    // remember to addCustomsStatDiv() first
    toogleCustomStat(1);
    toogleCustomStat(2);

    // remember to addCustomsSkillDiv() first
    toogleCustomSkill(1);
    toogleCustomSkill(2);

    // add onchange listener to battle type chooser
    document.getElementById("bt").onchange = () => {
        toogleReserve();
        toogleCustomStat(1);
        toogleCustomStat(2);
        toogleCustomSkill(1);
        toogleCustomSkill(2);
    };

    setPreviousChoices();
    toogleReserve();
    toogleDisable();

    // display the last tier update time
    if (localStorage.getItem("lastTierUpdateTime")) {
        var a = new Date(+localStorage.getItem("lastTierUpdateTime"));
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        $("#lastTierUpdate").text(`Last tier list update: ${time}`);
    }
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
    let form = document.forms["mainForm"];
    if (form["debug"].checked === true) {
        form.action = "debug.html";
    }
    form.submit();
}

/**
 * Populates the familiar selects options
 */
function setFamOptions() {
    let famSelects = document.getElementsByClassName("famSelect");

    // create an array of fam id and sort it based on the fam's full name
    let famIdArray = [];
    for (var key in famDatabase) {
        if (famDatabase.hasOwnProperty(key)) {
            famIdArray.push(key);
        }
    }
    famIdArray.sort((a, b) => famDatabase[a].fullName.localeCompare(famDatabase[b].fullName));

    // populate one select
    for (let index = 0; index < famIdArray.length; index++) {
        key = famIdArray[index];
        let option = document.createElement("option");
        option.value = key;
        option.text = famDatabase[key].fullName;
        (<HTMLSelectElement>famSelects[0]).add(option);
    }

    // and clone it
    for (let i = 1; i < famSelects.length; i++) {
        (<HTMLSelectElement>famSelects[i]).innerHTML = (<HTMLSelectElement>famSelects[0]).innerHTML;
    }
}

function toogleCustomStat(player: number) {
    var checked = (<HTMLInputElement>document.getElementById(`p${player}customStatChbox`)).checked;
    var btValue = (<HTMLInputElement>document.getElementById("bt")).value;
    var isBloodclash = btValue === "1" || btValue === "3";

    // for normal (0-5)
    var customStatDiv = document.getElementById(`p${player}customStatDivNormal`);
    var inputs = customStatDiv.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = !checked;
    }
    customStatDiv.style.display = checked ? "block" : "none";

    // for bloodclash
    customStatDiv = document.getElementById(`p${player}customStatDivBloodclash`);
    inputs = customStatDiv.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = !isBloodclash || !checked;
    }
    customStatDiv.style.display = (checked && isBloodclash) ? "block" : "none";

    let arr = ["HP", "ATK", "DEF", "WIS", "AGI"];
    for (let i = 0; i < 10; i++) {
        let slotChecked = (<HTMLInputElement>document.getElementById(`p${player}f${i}customStatChkbox`)).checked;
        let slotDisabled = (<HTMLInputElement>document.getElementById(`p${player}f${i}customStatChkbox`)).disabled;
        for (let j = 0; j < arr.length; j++) {
            let txtBox = <HTMLInputElement>document.getElementById(`p${player}f${i}${arr[j].toLowerCase()}`);
            txtBox.disabled = slotDisabled || !slotChecked;
        }
    }
}

function toogleCustomSkill(player: number) {
    let checked = (<HTMLInputElement>document.getElementById(`p${player}customSkillChbox`)).checked;
    let btValue = (<HTMLInputElement>document.getElementById("bt")).value;
    let isBloodclash = btValue === "1" || btValue === "3";

    // for normal (0-5)
    let customSkillDiv = document.getElementById(`p${player}customSkillDivNormal`);
    let inputs = customSkillDiv.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = !checked;
    }
    customSkillDiv.style.display = checked ? "block" : "none";

    // for bloodclash
    customSkillDiv = document.getElementById(`p${player}customSkillDivBloodclash`);
    inputs = customSkillDiv.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = !isBloodclash || !checked;
    }
    customSkillDiv.style.display = (checked && isBloodclash) ? "block" : "none";

    for (let i = 0; i < 10; i++) {
        let slotChecked = (<HTMLInputElement>document.getElementById(`p${player}f${i}customSkillChkbox`)).checked;
        let slotDisabled = (<HTMLInputElement>document.getElementById(`p${player}f${i}customSkillChkbox`)).disabled;
        for (let j = 0; j < 3; j++) {
            let select = <HTMLInputElement>document.getElementById(`p${player}f${i}s${j}`);
            select.disabled = slotDisabled || !slotChecked;
        }
    }
}

/**
 * Populates the skill selects options
 */
function setSkillOptions() {
    let skillSelects = document.getElementsByClassName("skillSelect");

    // create an array of skill id and sort it based on the skill's name
    let skillIdArray = SkillProvider.getAvailableSkillsForSelect();
    skillIdArray.sort((a, b) => SkillDatabase[a].name.localeCompare(SkillDatabase[b].name));

    // populate one select
    let option = document.createElement("option");
    option.value = "0"; // add the option for no skill in this slot
    option.text = "--none--";
    (<HTMLSelectElement>skillSelects[0]).add(option);
    for (let index = 0; index < skillIdArray.length; index++) {
        let key = skillIdArray[index];
        option = document.createElement("option");
        option.value = key + "";
        option.text = SkillDatabase[key].name;
        (<HTMLSelectElement>skillSelects[0]).add(option);
    }

    // and clone it
    for (let i = 1; i < skillSelects.length; i++) {
        (<HTMLSelectElement>skillSelects[i]).innerHTML = (<HTMLSelectElement>skillSelects[0]).innerHTML;
    }
}

function addCustomsStatDiv() {
    // array of stats type
    let arr = ["HP", "ATK", "DEF", "WIS", "AGI"];

    // array of div types. There are two divs for each player, one for fam 0-5, one for fam 6-9 (BC)
    let divArr = ["Normal", "Bloodclash"];

    for (let divIndex = 0; divIndex < divArr.length; divIndex++) {
        for (let player = 1; player <= 2; player++) {
            let customStatDiv = document.getElementById(`p${player}customStatDiv${divArr[divIndex]}`);
            for (let i = 0; i < 5; i++) { // index of fams
                let famIndex = i + 5 * divIndex;
                customStatDiv.appendChild(document.createElement('br'));
                customStatDiv.appendChild(document.createTextNode(`Familiar ${famIndex + 1}`));
                let input = document.createElement("input");
                input.type = "checkbox";
                input.id = `p${player}f${famIndex}customStatChkbox`;
                input.onchange = (p => () => toogleCustomStat(p))(player);
                customStatDiv.appendChild(input);
                for (let statIndex = 0; statIndex < arr.length; statIndex++) {
                    customStatDiv.appendChild(document.createTextNode(` ${arr[statIndex]} `));
                    input = document.createElement("input");
                    input.type = "text";
                    input.name = `p${player}f${famIndex}${arr[statIndex].toLowerCase()}`;
                    input.id = `p${player}f${famIndex}${arr[statIndex].toLowerCase()}`;
                    input.size = 6;
                    input.maxLength = 6;
                    customStatDiv.appendChild(input);
                }
            }
        }
    }
}

function addCustomsSkillDiv() {
    // array of div types. There are two divs for each player, one for fam 0-5, one for fam 6-9 (BC)
    let divArr = ["Normal", "Bloodclash"];

    // this only work under the assumption that we have populated the warlord skill options before
    let skillSelect = document.getElementsByClassName("skillSelect")[0];

    for (let divIndex = 0; divIndex < divArr.length; divIndex++) {
        for (let player = 1; player <= 2; player++) {
            let customSkillDiv = document.getElementById(`p${player}customSkillDiv${divArr[divIndex]}`);
            for (let i = 0; i < 5; i++) { // index of fams
                let famIndex = i + 5 * divIndex;
                customSkillDiv.appendChild(document.createElement('br'));
                customSkillDiv.appendChild(document.createTextNode(`Familiar ${famIndex + 1}`));
                let input = document.createElement("input");
                input.type = "checkbox";
                input.id = `p${player}f${famIndex}customSkillChkbox`;
                input.onchange = (p => () => toogleCustomSkill(p))(player);
                customSkillDiv.appendChild(input);
                for (let skillIndex = 0; skillIndex < 3; skillIndex++) {
                    customSkillDiv.appendChild(document.createTextNode(` Skill ${skillIndex} `));
                    let select = document.createElement("select");
                    select.name = `p${player}f${famIndex}s${skillIndex}`;
                    select.id   = `p${player}f${famIndex}s${skillIndex}`;
                    select.innerHTML = (<HTMLSelectElement>skillSelect).innerHTML;
                    customSkillDiv.appendChild(select);
                }
            }
        }
    }
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
    // custom stats: e.g. p1f0atk
    // custom skills: e.g. p1f0s0
    // battle type: bt
    localStorage.setItem("debug", getURLParameter("debug"));

    let data: any = {}, option: GameOption = {};

    let battleType = getURLParameter("bt");
    localStorage.setItem("bt", battleType);
    option.battleType = +battleType;

    option.p1RandomMode = +getURLParameter("1r");
    option.p2RandomMode = +getURLParameter("2r");

    data.p1_formation = getURLParameter("1f");
    if (!option.p1RandomMode) localStorage.setItem("1f", data.p1_formation);

    data.p2_formation = getURLParameter("2f");
    if (!option.p2RandomMode) localStorage.setItem("2f", data.p2_formation);

    data.p1_customStats = {};
    data.p2_customStats = {};
    data.p1_customSkills = {};
    data.p2_customSkills = {};

    // sorry for the shit code
    let arr = ["HP", "ATK", "DEF", "WIS", "AGI"];
    for (let player = 1; player <= 2; player++) {
        for (let famIndex = 0; famIndex < 10; famIndex++) {
            for (let statIndex = 0; statIndex < arr.length; statIndex++) {
                let key = `p${player}f${famIndex}${arr[statIndex].toLowerCase()}`;
                let stat = getURLParameter(key);
                if (stat) {
                    if (!data[`p${player}_customStats`][famIndex]) {
                        data[`p${player}_customStats`][famIndex] = {};
                    }
                    data[`p${player}_customStats`][famIndex][arr[statIndex].toLowerCase()] = +stat;
                    localStorage.setItem(key, stat);
                }
            }
        }
    }

    // custom skills
    for (let player = 1; player <= 2; player++) {
        for (let famIndex = 0; famIndex < 10; famIndex++) {
            for (let skillIndex = 0; skillIndex < 3; skillIndex++) {
                let key = `p${player}f${famIndex}s${skillIndex}`;
                let customSkillId = getURLParameter(key);
                if (customSkillId) {
                    if (!data[`p${player}_customSkills`][famIndex]) {
                        data[`p${player}_customSkills`][famIndex] = [];
                    }
                    data[`p${player}_customSkills`][famIndex][skillIndex] = +customSkillId;
                    localStorage.setItem(key, customSkillId);
                }
            }
        }
    }

    data.p1_cardIds = [];
    data.p2_cardIds = [];
    data.p1_warlordSkillIds = [];
    data.p2_warlordSkillIds = [];

    for (let i = 0; i < 10; i++) {
        let f1id = getURLParameter(`f${i}`);
        let f2id = getURLParameter(`f${i + 10}`);
        data.p1_cardIds.push(f1id);
        data.p2_cardIds.push(f2id);

        if (!option.p1RandomMode) localStorage.setItem(`f${i}`, f1id);
        if (!option.p2RandomMode) localStorage.setItem(`f${i + 10}`, f2id);
    }
    for (let i = 0; i < 3; i++) {
        let w1s = getURLParameter(`s1${i}`);
        let w2s = getURLParameter(`s2${i}`);
        data.p1_warlordSkillIds.push(w1s);
        data.p2_warlordSkillIds.push(w2s);

        if (!option.p1RandomMode) localStorage.setItem(`s1${i}`, w1s);
        if (!option.p2RandomMode) localStorage.setItem(`s2${i}`, w2s);
    }

    return [data, option];
}

/**
 * Hijack the Math.random() with our own random implementation if needed
 */
function prepareRandom() {
    let USE_CS_RND = false;
    if (USE_CS_RND) {
        let rnd = new CsRandom(1234);
        Math.random = () => rnd.nextDouble();
    }
}

/**
 * Callback when the battle in normal mode has ended
 */
function onBattleFinished() {
    let startButton = <HTMLInputElement>document.getElementById("startButton");
    startButton.disabled = false;

    if (ENUM.Setting.IS_MOBILE) {
        startButton.style.display = "block";
    }
    else {
        //showStarRequest();
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
    setTimeout(() => {
        if (!localStorage.getItem("starRequestShown")) {
            swal({
                title: "Star this!",
                text: "If you like this simulator, star the project on Github. It motivates me to improve it :)",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#5cb85c",
                confirmButtonText: "Take me there",
                closeOnConfirm: false
            }, () => {
                localStorage.setItem("starRequestShown", "true");
                window.location.href = 'https://github.com/chinhodado/Blood-Brothers-PvP-Simulator';
            });
        }
    }, 2000);
}

/**
 * Prepare the battle field
 */
function prepareField() {
    let rndBgLink = BattleBackground.getRandomBackgroundLink();
    let img = new Image();
    let svgWrapper = document.getElementById("svgWrapper");
    img.onload = () => {
        svgWrapper.style.backgroundImage = `url('${rndBgLink}')`;
    };
    img.onerror = () => {
        console.log(`Background not found: ${rndBgLink}`);
        svgWrapper.style.backgroundImage = "url(img/bg01.png)";
    };
    img.src = rndBgLink;
}

function playGame() {
    prepareField();
    BattleGraphic.PLAY_MODE = 'AUTO';
    BattleDebugger.IS_DEBUG_MODE = false;
    document.getElementById('startButton').onclick = function () {
        let button = (<HTMLButtonElement>this);
        button.disabled = true;

        if (ENUM.Setting.IS_MOBILE) {
            button.style.display = "none";
        }

        BattleGraphic.getInstance().resetInitialField();
        BattleGraphic.getInstance().displayMajorEventAnimation(0);
    };
    let dataOption = getBattleDataOption();
    let data = dataOption[0], option = dataOption[1];
    let newGame = new BattleModel(data, option);
    newGame.startBattle();
}

function playSim() {
    if (!ENUM.Setting.IS_MOBILE) {
        prepareField();
    }
    let dataOption = getBattleDataOption();
    let data = dataOption[0], option = dataOption[1];

    let NUM_BATTLE = 10000;
    document.getElementById("numBattle").innerHTML = numberWithCommas(NUM_BATTLE);
    (<HTMLProgressElement>document.getElementById("progressBar")).max = NUM_BATTLE;

    // create a new game just to display the fam and formation
    if (option.p1RandomMode) {
        BattleGraphic.HIDE_PLAYER1 = true;
    }

    if (option.p2RandomMode) {
        BattleGraphic.HIDE_PLAYER2 = true;
    }
    BattleDebugger.IS_DEBUG_MODE = false;
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
    let dataOption = getBattleDataOption();
    let data = dataOption[0], option = dataOption[1];

    let newGame = new BattleModel(data, option);
    newGame.startBattle();
}

/**
 * Basically worker.js. Used when worker not available.
 */
function startSynchronousSim(data, option, NUM_BATTLE) {
    prepareRandom();
    let p1WinCount = 0;
    let p2WinCount = 0;
    let winCountTable = {};
    BattleModel.IS_MASS_SIMULATION = true;
    BattleGraphic.GRAPHIC_DISABLED = true;
    var startTime = new Date().getTime(); // if worker is not supported, chance is high that neither is performance.now()

    var intervalCount = 0;
    var NUM_CHUNK = 100;
    var CHUNK_SIZE = NUM_BATTLE / NUM_CHUNK;
    var interval = setInterval(() => {
        for (var i = 0; i < CHUNK_SIZE; i++) {
            var newGame = new BattleModel(data, option);
            var resultBattle = newGame.startBattle();
            BattleModel.resetAll();
            if (resultBattle.playerWon.id === 1) {
                p1WinCount++;
            } else if (resultBattle.playerWon.id === 2) {
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
    let totalProgress = 0;        // update every time a worker posts back
    let workerDone = 0;           // the number of workers that have done their jobs
    let NUM_WORKER = 4;           // the number of workers
    let workerPool = [];          // the worker pool
    let workerDataReturned = [];  // list of data returned by each worker

    for (let w = 0; w < NUM_WORKER; w++) {
        var worker = new Worker("js/worker.js");
        worker.onmessage = event => {
            if (event.data.status === "ongoing") {
                totalProgress += 100;
                document.getElementById("progressBar").setAttribute("value", totalProgress.toString());
            }
            else if (event.data.status === "done") {
                totalProgress += 100;
                document.getElementById("progressBar").setAttribute("value", totalProgress.toString());
                workerDataReturned[workerDone] = event.data;
                workerDone++;
                console.log(workerDone + " workers done.");
                if (workerDone === NUM_WORKER) { // <- all workers have finished their jobs
                    let endTime = performance.now();

                    // aggregate all workers' data to form the final data
                    let finalData = {
                        p1WinCount: 0,
                        p2WinCount: 0,
                        winCountTable: []
                    };
                    for (let i = 0; i < NUM_WORKER; i++) {
                        finalData.p1WinCount += workerDataReturned[i].p1WinCount;
                        finalData.p2WinCount += workerDataReturned[i].p2WinCount;

                        let workerTable = workerDataReturned[i].winCountTable;
                        for (let key in workerTable) {
                            if (workerTable.hasOwnProperty(key)) {
                                if (finalData.winCountTable[key]) {
                                    finalData.winCountTable[key] += workerTable[key];
                                } else {
                                    finalData.winCountTable[key] = workerTable[key];
                                }
                            }
                        }
                    }

                    onSimulationResultObtained(finalData, startTime, endTime);

                    // terminate all workers
                    workerPool.forEach(entry => {
                        entry.terminate();
                    });
                }
            }
        };

        workerPool[w] = worker;
    }

    worker = null; // <- just leave this here

    // start the workers
    let startTime = performance.now();

    for (let w = 0; w < workerPool.length; w++) {
        workerPool[w].postMessage({
            data: data,
            option: option,
            numBattle: NUM_BATTLE / NUM_WORKER
        });
    }
}

function onSimulationResultObtained(finalData, startTime, endTime) {
    let famIdArray = [];
    for (let key in finalData.winCountTable) {
        if (finalData.winCountTable.hasOwnProperty(key)) {
            famIdArray.push(key);
        }
    }
    famIdArray.sort((a, b) => finalData.winCountTable[b] - finalData.winCountTable[a]);

    // now print out the details
    let simResultDiv = document.getElementById("simResultDiv");
    simResultDiv.innerHTML += (`Player 2 won: ${finalData.p2WinCount}<br> Player 1 won: ${finalData.p1WinCount}<br><br> Time: ${((endTime - startTime) / 1000).toFixed(2)}s<br><a href=setting.html>Go back to main page </a>`);

    let detail1 = "<br><br><details><summary> Most frequent appearances in win team: </summary><br>";
    for (let i = 0; i < famIdArray.length; i++) {
        let id = famIdArray[i];
        detail1 += (famDatabase[id].fullName + ": " + finalData.winCountTable[id] + "<br>");
    }
    detail1 += "</details>";
    simResultDiv.innerHTML += detail1;

    // call the callback when simulation finished
    onSimulationFinished();
}
