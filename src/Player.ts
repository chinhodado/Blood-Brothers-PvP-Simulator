/**
 * A class represents a player
 */
class Player {
    id: number;
    name: string;
    formation: Formation;
    multiplier: number;

    /**
     * @param id The player id. Usually 1 means the player/me and 2 means the opponent/opposing side
     * @param name The name of the player
     * @param formation The formation used by the player
     * @param multiplier Any multiplier the player has, either by all out attack or by title
     */
    constructor(id: number, name: string, formation: Formation, multiplier: number) {
        this.id = id;
        this.name = name;
        this.formation = formation;
        this.multiplier = multiplier;
    }
}
