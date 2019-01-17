/**
 * A helper class for BattleModel, provides the card-related methods
 */
class CardManager {
    private static _instance: CardManager = null;
    private readonly battle: BattleModel;

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
                return (a: Card, b: Card) => b.getAGI() - a.getAGI(); // descending based on agi
            case ENUM.BattleTurnOrderType.ATK:
                return (a: Card, b: Card) => b.getATK() - a.getATK(); // descending based on atk
            case ENUM.BattleTurnOrderType.DEF:
                return (a: Card, b: Card) => b.getDEF() - a.getDEF(); // descending based on def
            case ENUM.BattleTurnOrderType.WIS:
                return (a: Card, b: Card) => b.getWIS() - a.getWIS(); // descending based on wis
            default:
                // no HP for now
                throw new Error("Invalid turn order type!");
        }
    }

    sortAllCurrentMainCards(): void {
        let sortFunc = this.getSortFunc(this.battle.turnOrderBase);
        this.battle.allCurrentMainCards.sort(sortFunc);
    }

    getPlayerCurrentMainCardsByProcOrder(player: Player): Card[] {
        let playerCards = this.getPlayerCurrentMainCards(player);
        let copy = [];
        for (let i = 0; i < playerCards.length; i++) {
            copy.push(playerCards[i]);
        }

        copy.sort((a: Card, b: Card) => a.procIndex - b.procIndex); // ascending based on proc index
        return copy;
    }

    /**
     * Get the card to the left of a supplied card. Return null if the supplied card is at the leftmost
     * position in the formation
     */
    getLeftSideCard (card: Card): Card {
        let playerCards = this.getPlayerCurrentMainCards(card.player);
        let column = card.formationColumn;
        if (column === 0) { // leftmost position
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
        let playerCards = this.getPlayerCurrentMainCards(card.player);
        let column = card.formationColumn;
        if (column === 4) { // rightmost position
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
        let battle = this.battle;
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
        let battle = this.battle;
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

    getPlayerOriginalMainCards (player: Player): Card[] {
        let battle = this.battle;
        if (player === battle.player1) {
            return battle.p1_originalMainCards;
        }
        else if (player === battle.player2) {
            return battle.p2_originalMainCards;
        }
        else {
            throw new Error("Invalid player");
        }
    }
    getPlayerOriginalReserveCards (player: Player): Card[] {
        let battle = this.battle;
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
        let battle = this.battle;
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
        let battle = this.battle;
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
        let possibleIndices: number[] = [];
        for (let i = 0; i < 5; i++) {
            if (!cards[i].isDead) {
                possibleIndices.push(i);
            }
        }

        if (possibleIndices.length === 0) {
            return null;
        }

        // get a random index from the list of possible indices
        let randomIndex = getRandomInt(0, possibleIndices.length - 1);

        return cards[possibleIndices[randomIndex]];
    }

    /**
     * Get the nearest opponent from the executor (e.g. the opposite fam, or
     * the second nearest if that one's dead, etc.)
     * @param executor
     */
    getNearestSingleOpponentTarget (executor: Card): Card {
        let oppCards: Card[] = this.getPlayerCurrentMainCards(this.battle.getOppositePlayer(executor.player));
        let executorIndex = executor.formationColumn;

        let offsetArray = [0, -1, 1, -2, 2, -3, 3, -4, 4];

        for (let i = 0; i < offsetArray.length; i++) {
            let currentOppCard = oppCards[executorIndex + offsetArray[i]];
            if (currentOppCard && !currentOppCard.isDead) {
                return currentOppCard;
            }
        }

        // if it reaches this point, there's no target, so return null
        return null;
    }

    /**
     * Get the nearest friend from the executor. Most of the time will be
     * the executor itself.
     * This is mostly used for confuse.
     * @param executor
     */
    getNearestSingleFriendTarget(executor: Card): Card {
        let friendCards: Card[] = this.getPlayerCurrentMainCards(executor.player);
        let executorIndex = executor.formationColumn;

        let offsetArray = [0, -1, 1, -2, 2, -3, 3, -4, 4];

        for (let i = 0; i < offsetArray.length; i++) {
            let currentFriendCard = friendCards[executorIndex + offsetArray[i]];
            if (currentFriendCard && !currentFriendCard.isDead) {
                return currentFriendCard;
            }
        }

        // if it reaches this point, there's no target, so return null
        return null;
    }

    /**
     * Check if all cards of a player has died
     */
    isAllDeadPlayer (player: Player): boolean {
        let reserveCond = true;
        if (this.battle.isBloodClash) {
            if (!this.isNoReserveLeft(player)) reserveCond = false;
        }
        return this.isAllMainCardsDead(player) && reserveCond;
    }

    /**
     * Check if all the current main cards of a player has died
     */
    isAllMainCardsDead (player: Player): boolean {
        let mainCards = this.getPlayerCurrentMainCards(player);
        let isAllDead = true;
        for (let i = 0; i < mainCards.length; i++) {
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
        let reserveCards = this.getPlayerCurrentReserveCards(player);
        let noReserveLeft = true;
        for (let i = 0; i < reserveCards.length; i++) {
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
        let isIn: boolean = false;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === card.id) {
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
        return card1.id === card2.id;
    }

    /**
     * Use these when the order of the cards are unimportant
     */
    getAllCurrentMainCards(): Card[] {
        return this.battle.allCurrentMainCards;
    }
    getAllCurrentCards(): Card[] {
        let bt = this.battle;
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
        let battle = this.battle;
        battle.allCurrentMainCards = battle.p1_mainCards.concat(battle.p2_mainCards);
    }

    // use to switch a single card in the allCurrentMainCards with another card. This is used to update
    // allCurrentMainCards while still maintaining the current order (the order won't be updated until
    // the beginning of a game turn)
    switchCardInAllCurrentMainCards(oldCard: Card, newCard: Card): void{
        let allCurrentMainCards = this.battle.allCurrentMainCards;
        let found = false;
        for (let i = 0; i < allCurrentMainCards.length; i++) {
            if (allCurrentMainCards[i].id === oldCard.id) {
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
    getAllMainCardsInPlayerOrder(): Card[] {
        return this.battle.p1_mainCards.concat(this.battle.p2_mainCards);
    }

    /**
     * Get a string for a player's main brig
     */
    getPlayerMainBrigString(player: Player): string {
        let cards = this.getPlayerCurrentMainCards(player);
        return ENUM.Setting.IS_MOBILE? this.getPlainBrigString(cards) : this.getHtmlBrigString(cards);
    }

    /**
     * Get a string for a player's reserve brig
     */
    getPlayerReserveBrigString(player: Player): string {
        let cards = this.getPlayerOriginalReserveCards(player);
        return ENUM.Setting.IS_MOBILE? this.getPlainBrigString(cards) : this.getHtmlBrigString(cards);
    }

    /**
     * Get a HTML string for a list of cards, with each fam name being a link to open that fam's detail dialog
     */
    getHtmlBrigString(cards: Card[]): string {
        let brigStr = "";

        for (let i = 0; i < cards.length; i++) {
            let dash = (i === 0)? "" : " - ";
            let cb = `showCardDetailDialogById(${cards[i].id});`;
            brigStr += (dash + "<a href='javascript:void(0)' onclick='" + cb + "'>" + cards[i].name) + "</a>";
        }

        return brigStr;
    }

    /**
     * Get a plain string for a list of cards
     */
    getPlainBrigString(cards: Card[]): string {
        let brigStr = "";

        for (let i = 0; i < cards.length; i++) {
            let dash = (i === 0)? "" : " - ";
            brigStr += (dash + cards[i].name);
        }

        return brigStr;
    }

    getCurrentMainCardByIndex(playerId: number, index: number): Card {
        let cards = this.getPlayerCurrentMainCards(this.battle.getPlayerById(playerId));
        return cards[index];
    }

    getOriginalMainCardByIndex(playerId: number, index: number): Card {
        let cards = this.getPlayerOriginalMainCards(this.battle.getPlayerById(playerId));
        return cards[index];
    }

    getOriginalReserveCardByIndex(playerId: number, index: number): Card {
        let cards = this.getPlayerOriginalReserveCards(this.battle.getPlayerById(playerId));
        return cards[index];
    }

    getTotalHPRatio(cards: Card[]): number {
        let totalRemainHp = 0;
        let totalOriginalHp = 0;
        for (let i = 0, len = cards.length; i < len; i++) {
            let card = cards[i];
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
        let skillInfo = [];
        let allSkills = card.skills.concat(card.passiveSkills);
        for (let i = 0; i < allSkills.length; i++) {
            let skill = allSkills[i];
            skillInfo.push({
                "id": skill.id,
                "name": skill.name,
                "comment": skill.description,
                "maxProbability": skill.maxProbability
            });
        }

        return {
            "name": card.fullName,
            "image": getScaledFamiliarWikiaImageLink(card.imageLink, card.fullName, 150),
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
        };
    }
}
