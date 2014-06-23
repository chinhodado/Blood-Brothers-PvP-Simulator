/**
 * A helper class for BattleModel, provides the card-related methods
 */
class CardManager {

    private static _instance : CardManager = null;

    public static getInstance() : CardManager {
        if (CardManager._instance === null) {
            CardManager._instance = new CardManager();
        }
        return CardManager._instance;
    }

    constructor() {
        if (CardManager._instance) {
            throw new Error("Error: Instantiation failed: Use getInstance() instead of new.");
        }
        CardManager._instance = this;
    }

    sortAllCards() {
        // sort the cards
        BattleModel.getInstance().allCards.sort(function (a, b) {
            return b.getAGI() - a.getAGI(); // descending based on agi
        });
    }
    
    /**
     * Get the card to the left of a supplied card. Return null if the supplied card is at the leftmost 
     * position in the formation
     */
    getLeftSideCard (card : Card) : Card {
        var playerCards = this.getPlayerCards(card.player);
        var column = card.formationColumn;
        if (column == 0) { // leftmost position
            return null;
        }
        else if (column <= 4 && column >= 1) { // just to be safe
            return playerCards[column - 1];
        }
        else {
            throw new Error("Invalid card index");
        }
    }
    
    /**
     * Get the card to the right of a supplied card. Return null if the supplied card is at the rightmost 
     * position in the formation
     */
    getRightSideCard (card : Card) : Card {
        var playerCards = this.getPlayerCards(card.player);
        var column = card.formationColumn;
        if (column == 4) { // rightmost position
            return null;
        }
        else if (column >= 0 && column <= 3) { // just to be safe
            return playerCards[column + 1];
        }
        else {
            throw new Error("Invalid card index");
        }
    }
    
    /**
     * Get a card by its id
     */
    getCardById(id: number): Card {
        return BattleModel.getInstance().allCardsById[id];
    }
    
        /**
     * Get all the cards that belong to a player
     */
    getPlayerCards (player : Player) {
        if (player === BattleModel.getInstance().player1) {
            return BattleModel.getInstance().player1Cards;
        }
        else if (player === BattleModel.getInstance().player2) {
            return BattleModel.getInstance().player2Cards;
        }
        else {
            throw new Error("Invalid player");
        }
    }
    
    getEnemyCards (player : Player) {
        if (player === BattleModel.getInstance().player1) {
            return BattleModel.getInstance().player2Cards;
        }
        else if (player === BattleModel.getInstance().player2) {
            return BattleModel.getInstance().player1Cards;
        }
        else {
            throw new Error("Invalid player");
        }
    }

    getValidSingleTarget (cards : Card[]) {
        var possibleIndices = [];
        for (var i = 0; i < 5; i++) {
            if (!cards[i].isDead) {
                possibleIndices.push(i);
            }
        }

        if (possibleIndices.length === 0) {
            return -1; // no valid index
        }

        // get a random index from the list of possible indices
        var randomIndex = getRandomInt(0, possibleIndices.length - 1); 

        return possibleIndices[randomIndex];
    }
    
    getNearestSingleOpponentTarget (executor : Card) : Card {
        var oppCards : Card[] = this.getPlayerCards(BattleModel.getInstance().getOppositePlayer(executor.player));
        var executorIndex = executor.formationColumn;
        
        var offsetArray = [0, -1, 1, -2, 2, -3, 3, -4, 4];
        
        for (var i = 0; i < offsetArray.length; i++) {
            var currentOppCard = oppCards[executorIndex + offsetArray[i]];
            if (currentOppCard && !currentOppCard.isDead) {
                return currentOppCard;
            }
        }
        
        // if it reaches this point, there's no target, so return null
        return null;
    }

    isAllDeadPlayer (player : Player) {
        if (player === BattleModel.getInstance().player1) {
            return this.isAllDead(BattleModel.getInstance().player1Cards);
        }
        else if (player === BattleModel.getInstance().player2) {
            return this.isAllDead(BattleModel.getInstance().player2Cards);
        }
        else {
            throw new Error("Invalid player");
        }
    }

    isAllDead (cards : Card[]) {
        var isAllDead = true;
        for (var i = 0; i < 5; i++) {
            // assume no null card
            if (!cards[i].isDead) {
                isAllDead = false;
                break;
            }
        }
        return isAllDead;
    }
    
    /**
     * Return true if a card is in a list of cards, or false if not
     */
    isCardInList(card: Card, list: Card[]): boolean {
        var isIn: boolean = false;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == card.id) {
                isIn = true;
                break;
            }
        }
        return isIn;
    }

    isSameCard(card1: Card, card2: Card): boolean {
        return card1.id == card2.id;
    }

}