importScripts('../compiled.js');
importScripts('helper.js');

/**
 * Run a heavy simulation in the background
 * @param data The game data
 */
function runSimulation(args) {
    prepareRandom();
    var p1WinCount = 0;
    var p2WinCount = 0;
    for (var i = 0; i < 10000; i++) {
        BattleModel.IS_MASS_SIMULATION = true;
        BattleGraphic.GRAPHIC_DISABLED = true;
        var newGame = new BattleModel(args[0], args[1], args[2]);
        var playerWon = newGame.startBattle();
        BattleModel.resetAll();
        if (playerWon == "Player 1") {
            p1WinCount++;
        }
        else if (playerWon == "Player 2") {
            p2WinCount++;
        }

        // update the progress bar every 100 battles
        if (i % 100 == 0) {
            postMessage({status: "ongoing", progress: i});
        }
    }
    postMessage({status: "done", p1WinCount: p1WinCount, p2WinCount: p2WinCount});
}

// when we receive the game data from the main thread, start the simulation
self.addEventListener('message', function(e) {
    runSimulation(e.data);
}, false);