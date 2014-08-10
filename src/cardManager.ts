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
        BattleModel.getInstance().allCurrentMainCards.sort(sortFunc);
    }

    getPlayerCardsByProcOrder(player: Player) {
        var playerCards = this.getPlayerCurrentMainCards(player);
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
        var playerCards = this.getPlayerCurrentMainCards(card.player);
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
        var playerCards = this.getPlayerCurrentMainCards(card.player);
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
     * Get all the current main cards of a player
     */
    getPlayerCurrentMainCards (player: Player) {
        var battle = BattleModel.getInstance();
        if (player === battle.player1) {
            return battle.p1_mainCards;
        }
        else if (player === battle.player2) {
            return battle.p2_mainCards;
        }
        else {
            throw new Error("Invalid player");
        }
    }

    getPlayerCurrentReserveCards (player: Player) {
        var battle = BattleModel.getInstance();
        if (player === battle.player1) {
            return battle.p1_reserveCards;
        }
        else if (player === battle.player2) {
            return battle.p2_reserveCards;
        }
        else {
            throw new Error("Invalid player");
        }
    }

    getPlayerOriginalReserveCards (player: Player) {
        var battle = BattleModel.getInstance();
        if (player === battle.player1) {
            return battle.p1_originalReserveCards;
        }
        else if (player === battle.player2) {
            return battle.p2_originalReserveCards;
        }
        else {
            throw new Error("Invalid player");
        }
    }
    
    getEnemyCurrentMainCards (player: Player) {
        var battle = BattleModel.getInstance();
        if (player === battle.player1) {
            return battle.p2_mainCards;
        }
        else if (player === battle.player2) {
            return battle.p1_mainCards;
        }
        else {
            throw new Error("Invalid player");
        }
    }

    getEnemyCurrentReserveCards (player: Player) {
        var battle = BattleModel.getInstance();
        if (player === battle.player1) {
            return battle.p2_reserveCards;
        }
        else if (player === battle.player2) {
            return battle.p1_reserveCards;
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
        var oppCards : Card[] = this.getPlayerCurrentMainCards(BattleModel.getInstance().getOppositePlayer(executor.player));
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

    isAllDeadPlayer (player: Player) {
        var battle = BattleModel.getInstance();
        var reserveCond = true;
        if (battle.isBloodClash) {
            if (!this.isNoReserveLeft(player)) reserveCond = false;
        }
        return this.isAllMainCardsDead(player) && reserveCond;
    }

    /**
     * Check if all the current main cards of a player has died
     */
    isAllMainCardsDead (player: Player) {
        var mainCards = this.getPlayerCurrentMainCards(player);
        var isAllDead = true;
        for (var i = 0; i < mainCards.length; i++) {
            // main cards can never be null
            if (!mainCards[i].isDead) {
                isAllDead = false;
                break;
            }
        }
        return isAllDead;
    }

    /**
     * Check if a player has no reserve left. Use it only when battle is bloodclash.
     */
    isNoReserveLeft (player: Player) {
        var reserveCards = this.getPlayerCurrentReserveCards(player);
        var noReserveLeft = true;
        for (var i = 0; i < reserveCards.length; i++) {
            if (reserveCards[i]) { // not null
                noReserveLeft = false;
                break;
            }
        }
        return noReserveLeft;
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

    /**
     * Use this when the order of the cards are unimportant
     */
    getAllCurrentMainCards(): Card[] {
        return BattleModel.getInstance().allCurrentMainCards;
    }
    getAllCurrentCards(): Card[] {
        var bt = BattleModel.getInstance();
        return bt.p1_mainCards.concat(bt.p2_mainCards).concat(bt.p1_reserveCards).concat(bt.p2_reserveCards);
    }

    /**
     * Is a card currently a main card?
     */
    isCurrentMainCard(card: Card): boolean {
        var bt = BattleModel.getInstance();
        var isCurrentMain = false;
        var p1main = bt.p1_mainCards;
        var p2main = bt.p2_mainCards;

        for (var i = 0; i < 5; i++) {
            if (p1main[i].id == card.id || p2main[i].id == card.id) {
                isCurrentMain = true;
                break;
            }
        }
        return isCurrentMain;
    }

    // remember to call this when there's a change in membership of p1_mainCards or p2_mainCards
    updateAllCurrentMainCards(): void {
        var battle = BattleModel.getInstance();
        battle.allCurrentMainCards = battle.p1_mainCards.concat(battle.p2_mainCards);
    }

    // use to switch a single card in the allCurrentMainCards with another card. This is used to update
    // allCurrentMainCards while still maintaining the current order (the order won't be updated until
    // the beginning of a game turn)
    switchCardInAllCurrentMainCards(oldCard: Card, newCard: Card): void{
        var allCurrentMainCards = BattleModel.getInstance().allCurrentMainCards;
        var found = false;
        for (var i = 0; i < allCurrentMainCards.length; i++) {
            if (allCurrentMainCards[i].id == oldCard.id) {
                found = true;
                allCurrentMainCards[i] = newCard;
                break;
            }
        }

        if (!found) {
            throw new Error ("Card not found!");
        }
    }

    /**
     * Use this when the order of the cards are important: player 1 cards -> player 2 cards
     */
    getAllCardsInPlayerOrder(): Card[] {
        var battle = BattleModel.getInstance();
        return battle.p1_mainCards.concat(battle.p2_mainCards);
    }

    /**
     * Get a string that represents a player's brig
     */
    getPlayerBrigString(player: Player): string {
        var cards = this.getPlayerCurrentMainCards(player);
        var brigStr = cards[0].name;
        for (var i = 1; i < cards.length; i++) {
            brigStr += (" - " + cards[i].name);
        }

        return brigStr;
    }

    getCurrentMainCardByIndex(playerId: number, index: number) {
        var cards = this.getPlayerCurrentMainCards(BattleModel.getInstance().getPlayerById(playerId));
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