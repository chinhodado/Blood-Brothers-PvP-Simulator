/**
 * A class represents a player
 */
class Player {

    id : number;
    name : string;
    formation : Formation;
    multiplier : number;

    /**
     * @param number id The player id. Usually 0 means the player/me and 1 means the opponent/opposing side
     * @param string name The name of the player
     * @param Formation formation The formation used by the player
     * @param number multiplier Any multiplier the player has, either by all out attack or by title
     */
    constructor(id : number, name :  string, formation : Formation, multiplier : number) {
        this.id = id; // 0: me, 1: opp
        this.name = name;
        this.formation = formation;
        this.multiplier = multiplier;
    }
}