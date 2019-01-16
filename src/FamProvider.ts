/**
 * A simple class that acts like a lazy store of different familiar lists
 */
class FamProvider {
    // contains ids of fam in different tiers
    static tierList = null;

    // contains ids of all fam
    static allIdList: number[] = null;

    static getTierList(tierToGet: string) {
        if (!this.tierList) {
            // parse and make the whole tier list
            this.tierList = {};
            let allTierList = TierList;
            let tierArray = ["X+", "X", "S+", "S", "A+", "A", "B", "C"];

            for (let i = 0; i < tierArray.length; i++) {
                let tier = tierArray[i];
                this.tierList[tier] = [];

                for (let key in famDatabase) {
                    if (famDatabase.hasOwnProperty(key)) {
                        let name = famDatabase[key].fullName;
                        if (allTierList[tier].indexOf(name) !== -1) {
                            this.tierList[tier].push(key);
                        }
                    }
                }
            }
        }

        return this.tierList[tierToGet];
    }

    /**
     * Get a list of ids of all familiars, except the warlords
     */
    static getAllFamiliarList(): number[] {
        if (!this.allIdList) {
            this.allIdList = [];

            for (let key in famDatabase) {
                if (famDatabase.hasOwnProperty(key) && !famDatabase[key].isWarlord) {
                    this.allIdList.push(+key);
                }
            }
        }

        return this.allIdList;
    }

    static getRandomFamList(type: ENUM.RandomBrigType): number[] {
        let tierXP = this.getTierList("X+");
        let tierX = this.getTierList("X");
        let tierSP = this.getTierList("S+");
        let tierS = this.getTierList("S");
        let tierAP = this.getTierList("A+");
        let tierA = this.getTierList("A");

        switch (type) {
            case ENUM.RandomBrigType.ALL:
                return this.getAllFamiliarList();
            case ENUM.RandomBrigType.XP_ONLY:
                return tierXP;
            case ENUM.RandomBrigType.X_ONLY:
                return tierX;
            case ENUM.RandomBrigType.X_UP:
                return tierX.concat(tierXP);
            case ENUM.RandomBrigType.SP_ONLY:
                return tierSP;
            case ENUM.RandomBrigType.SP_UP:
                return tierSP.concat(tierX).concat(tierXP);
            case ENUM.RandomBrigType.S_ONLY:
                return tierS;
            case ENUM.RandomBrigType.S_UP:
                return tierS.concat(tierSP).concat(tierX).concat(tierXP);
            case ENUM.RandomBrigType.AP_ONLY:
                return tierAP;
            case ENUM.RandomBrigType.AP_UP:
                return tierAP.concat(tierS).concat(tierSP).concat(tierX).concat(tierXP);
            case ENUM.RandomBrigType.A_ONLY:
                return tierA;
            case ENUM.RandomBrigType.A_UP:
                return tierA.concat(tierAP).concat(tierS).concat(tierSP).concat(tierX).concat(tierXP);
            default:
                throw new Error("Invalid brig random type");
        }
    }

    /**
     * Get a list of ids of all warlords
     */
    static getWarlordList(): number[] {
        return [1, 2, 3, 4, 5, 6, 7, 8];
    }
}
