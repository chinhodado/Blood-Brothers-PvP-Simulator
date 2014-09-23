class BrigGenerator {
    /**
     * Return a randomly generated brig
     */
    static getBrig(randomMode: ENUM.RandomBrigType, tierListString: string, isBloodclash: boolean): number[] {
        var randomList = FamiliarDatabase.getRandomFamList(+randomMode, tierListString);
        var brigIds: number[] = [];
        var maxIndex = isBloodclash? 9 : 4;

        if (isBloodclash) {
            // choose a random index for the WL
            var randIndex = getRandomInt(0, maxIndex);
            brigIds[randIndex] = getRandomElement(FamiliarDatabase.getWarlordList());
        }

        for (var i = 0; i <= maxIndex; i++) {
            // if a spot is vacant (i.e. has no WL), put a random fam in there
            if (!brigIds[i]) {
                brigIds[i] = getRandomElement(randomList);
            }
        }

        return brigIds;
    }
} 