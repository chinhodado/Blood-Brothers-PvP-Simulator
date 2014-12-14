importScripts('../compiled.js');

/**
 * Run a heavy simulation in the background
 * @param data The game data
 */
function runSimulation(args) {
    prepareRandom();
    var p1WinCount = 0;
    var p2WinCount = 0;
    var winCountTable = {};
    BattleDebugger.IS_DEBUG_MODE = false;
    BattleModel.IS_MASS_SIMULATION = true;
    BattleGraphic.GRAPHIC_DISABLED = true;
    BattleLogger.INFOTEXT_DISPLAYED = true;
    BattleLogger.WARNINGTEXT_DISPLAYED = true;
    for (var i = 0; i < args.numBattle; i++) {
        var newGame = new BattleModel(args.data, args.option, args.tierList);
        var resultBattle = newGame.startBattle();
        BattleModel.resetAll();
        if (resultBattle.playerWon.id == 1) {
            p1WinCount++;
        }
        else if (resultBattle.playerWon.id == 2) {
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

        // update the progress bar every 100 battles
        if (i % 100 == 0) {
            postMessage({status: "ongoing", progress: i});
        }
    }
    postMessage({ status: "done", p1WinCount: p1WinCount, p2WinCount: p2WinCount, winCountTable: winCountTable });
}

// when we receive the game data from the main thread, start the simulation
self.addEventListener('message', function(e) {
    runSimulation(e.data);
}, false);