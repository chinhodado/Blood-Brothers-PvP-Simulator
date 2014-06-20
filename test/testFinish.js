/**
 * Make sure that the game finishes and return the name of the winner
 */

for (var i = 0; i < 100; i++) {
    QUnit.test("Game finishes", function(assert) {            
            assert.equal(isPlayerNameReturned(), true, "We expect the winner's name to be Player 1 or Player 2");          
    });
}

function isPlayerNameReturned() {
    var newGame = new BattleModel("random");
    var playerWon = newGame.startBattle();
    BattleModel.resetAll();
    return (playerWon == "Player 1" || playerWon == "Player 2");
}