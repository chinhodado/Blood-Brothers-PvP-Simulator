/**
 * A helper class for BattleModel, provides the card-related methods
 */
class CardManager {

    private static _instance: CardManager = null;
    private battle: BattleModel;

    public static getInstance(): CardManager {
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

        this.battle = BattleModel.getInstance();
    }

    /**
     * Allows to create a new instance
     * Used for testing only
     */
    static removeInstance() {
        CardManager._instance = null;
    }

    getSortFunc(type: ENUM.BattleTurnOrderType): (a: Card, b: Card)=>number {
        switch (type) {
            case ENUM.BattleTurnOrderType.AGI:
                return function (a: Card, b: Card) {
                    return b.getAGI() - a.getAGI(); // descending based on agi
                }
            case ENUM.BattleTurnOrderType.ATK:
                return function (a: Card, b: Card) {
                    return b.getATK() - a.getATK(); // descending based on atk
                }
            case ENUM.BattleTurnOrderType.DEF:
                return function (a: Card, b: Card) {
                    return b.getDEF() - a.getDEF(); // descending based on def
                }
            case ENUM.BattleTurnOrderType.WIS:
                return function (a: Card, b: Card) {
                    return b.getWIS() - a.getWIS(); // descending based on wis
                }
            default:
                // no HP for now
                throw new Error("Invalid turn order type!");
        }
    }

    sortAllCurrentMainCards(): void {
        var sortFunc = this.getSortFunc(this.battle.turnOrderBase);
        this.battle.allCurrentMainCards.sort(sortFunc);
    }

    getPlayerCurrentMainCardsByProcOrder(player: Player): Card[] {
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
    getLeftSideCard (card: Card): Card {
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
    getRightSideCard (card: Card): Card {
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
        return this.battle.allCardsById[id];
    }
    
    /**
     * Get all the current main cards of a player
     */
    getPlayerCurrentMainCards (player: Player): Card[] {
        var battle = this.battle;
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

    getPlayerCurrentReserveCards (player: Player): Card[] {
        var battle = this.battle;
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

    getPlayerOriginalReserveCards (player: Player): Card[] {
        var battle = this.battle;
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
    
    getPlayerAllCurrentCards (player: Player): Card[] {
        return this.getPlayerCurrentMainCards(player).concat(this.getPlayerCurrentReserveCards(player));
    }

    getEnemyCurrentMainCards (player: Player): Card[] {
        var battle = this.battle;
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

    getEnemyCurrentReserveCards (player: Player): Card[] {
        var battle = this.battle;
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

    getValidSingleTarget (cards: Card[]): Card {
        var possibleIndices: number[] = [];
        for (var i = 0; i < 5; i++) {
            if (!cards[i].isDead) {
                possibleIndices.push(i);
            }
        }

        if (possibleIndices.length === 0) {
            return null;
        }

        // get a random index from the list of possible indices
        var randomIndex = getRandomInt(0, possibleIndices.length - 1); 

        return cards[possibleIndices[randomIndex]];
    }
    
    getNearestSingleOpponentTarget (executor: Card): Card {
        var oppCards: Card[] = this.getPlayerCurrentMainCards(this.battle.getOppositePlayer(executor.player));
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

    /**
     * Check if all cards of a player has died
     */
    isAllDeadPlayer (player: Player): boolean {
        var reserveCond = true;
        if (this.battle.isBloodClash) {
            if (!this.isNoReserveLeft(player)) reserveCond = false;
        }
        return this.isAllMainCardsDead(player) && reserveCond;
    }

    /**
     * Check if all the current main cards of a player has died
     */
    isAllMainCardsDead (player: Player): boolean {
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
    isNoReserveLeft (player: Player): boolean {
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

    /**
     * Return true if two cards are the same (same id)
     */
    isSameCard(card1: Card, card2: Card): boolean {
        return card1.id == card2.id;
    }

    /**
     * Use these when the order of the cards are unimportant
     */
    getAllCurrentMainCards(): Card[] {
        return this.battle.allCurrentMainCards;
    }
    getAllCurrentCards(): Card[] {
        var bt = this.battle;
        return bt.p1_mainCards.concat(bt.p2_mainCards).concat(bt.p1_reserveCards).concat(bt.p2_reserveCards);
    }

    /**
     * Is a card currently a main card?
     */
    isCurrentMainCard(card: Card): boolean {
        return this.isCardInList(card, this.getAllCurrentMainCards());
    }

    // remember to call this when there's a change in membership of p1_mainCards or p2_mainCards
    updateAllCurrentMainCards(): void {
        var battle = this.battle;
        battle.allCurrentMainCards = battle.p1_mainCards.concat(battle.p2_mainCards);
    }

    // use to switch a single card in the allCurrentMainCards with another card. This is used to update
    // allCurrentMainCards while still maintaining the current order (the order won't be updated until
    // the beginning of a game turn)
    switchCardInAllCurrentMainCards(oldCard: Card, newCard: Card): void{
        var allCurrentMainCards = this.battle.allCurrentMainCards;
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
        return this.battle.p1_mainCards.concat(this.battle.p2_mainCards);
    }

    /**
     * Get a string that represents a player's brig
     */
    getPlayerMainBrigString(player: Player): string {
        var cards = this.getPlayerCurrentMainCards(player);
        var brigStr = cards[0].name;
        for (var i = 1; i < cards.length; i++) {
            brigStr += (" - " + cards[i].name);
        }

        return brigStr;
    }
    getPlayerReserveBrigString(player: Player): string {
        var cards = this.getPlayerOriginalReserveCards(player);
        var brigStr = cards[0].name;
        for (var i = 1; i < cards.length; i++) {
            brigStr += (" - " + cards[i].name);
        }

        return brigStr;
    }

    getCurrentMainCardByIndex(playerId: number, index: number): Card {
        var cards = this.getPlayerCurrentMainCards(this.battle.getPlayerById(playerId));
        return cards[index];
    }

    getTotalHPRatio(cards: Card[]): number {
        var totalRemainHp = 0;
        var totalOriginalHp = 0;
        for(var i = 0, len = cards.length; i < len; i++){
            var card = cards[i];
            // if dead, remain HP is 0, so no need to care
            if (card) {
                if (!card.isDead) {
                    totalRemainHp += card.getHP();
                }
                totalOriginalHp += card.originalStats.hp;
            }
        }
        return totalRemainHp / totalOriginalHp;
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