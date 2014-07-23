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

    getSortFunc(type: ENUM.BattleTurnOrderType) {
        switch (type) {
            case ENUM.BattleTurnOrderType.AGI:
                return function (a, b) {
                    return b.getAGI() - a.getAGI(); // descending based on agi
                }
            case ENUM.BattleTurnOrderType.ATK:
                return function (a, b) {
                    return b.getATK() - a.getATK(); // descending based on atk
                }
            case ENUM.BattleTurnOrderType.DEF:
                return function (a, b) {
                    return b.getDEF() - a.getDEF(); // descending based on def
                }
            case ENUM.BattleTurnOrderType.WIS:
                return function (a, b) {
                    return b.getWIS() - a.getWIS(); // descending based on wis
                }
            default:
                // no HP for now
                throw new Error("Invalid turn order type!");
        }
    }

    sortAllCards() {
        var sortFunc = this.getSortFunc(BattleModel.getInstance().turnOrderBase);
        BattleModel.getInstance().allCards.sort(sortFunc);
    }

    getPlayerCardsByProcOrder(player: Player) {
        var playerCards = this.getPlayerCards(player);
        var copy = [];
        for (var i = 0; i < playerCards.length; i++) {
            copy.push(playerCards[i]);
        }

        copy.sort(function (a: Card, b: Card) {
            return a.procIndex - b.procIndex; // ascending based on proc index
        });

        return copy;
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
        for (var i = 0; i < cards.length; i++) {
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

    getAllCards(): Card[] {
        return BattleModel.getInstance().allCards;
    }

    /**
     * Get a string that represents a player's brig
     */
    getPlayerBrigString(player: Player): string {
        var cards = this.getPlayerCards(player);
        var brigStr = cards[0].name;
        for (var i = 1; i < cards.length; i++) {
            brigStr += (" - " + cards[i].name);
        }

        return brigStr;
    }

    getCardByIndex(playerId: number, index: number) {
        var cards
        if (playerId === 1) {
            cards = this.getPlayerCards(BattleModel.getInstance().player1);
        }
        else if (playerId === 2) {
            cards = this.getPlayerCards(BattleModel.getInstance().player2);
        }

        return cards[index];
    }

    getCardInfoForDialog(card: Card) {
        var skillInfo = [];
        for (var i = 0; i < card.skills.length; i++) {
            var skill = card.skills[i];
            skillInfo.push({
                "id": skill.id,
                "name": skill.name,
                "comment": skill.description,
                "maxProbability": skill.maxProbability
            });
        }

        return {
        "name": card.fullName,
        "image": getScaledWikiaImageLink(card.imageLink, 150),
        //"rarity": 5,
        //"price": 25850,
        "hp": card.originalStats.hp,
        "atk": card.originalStats.atk,
        "def": card.originalStats.def,
        "wis": card.originalStats.wis,
        "agi": card.originalStats.agi,
        "maxLevel": 99,
        //"growthType": 1,
        //"evolution": 2,
        //"maxEvolution": 2,
        "skills": skillInfo, 
        "standardAction": {
                "name": "Standard Action",
                "comment": card.autoAttack.description
            }        
        }
    }
}