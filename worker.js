importScripts('compiled.js');

/**
 * Run a heavy simulation in the background
 * @param data The game data
 */
function runSimulation(data) {
    var p1WinCount = 0;
    var p2WinCount = 0;
    for (var i = 0; i < 100000; i++) {
        BattleModel.IS_MASS_SIMULATION = true;
        var newGame = new BattleModel(data, null);
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