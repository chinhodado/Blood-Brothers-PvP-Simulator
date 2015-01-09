class BrigGenerator {
    /**
     * Return a randomly generated brig
     */
    static getRandomBrig(randomMode: ENUM.RandomBrigType, tierListString: string, isBloodclash: boolean): number[] {
        var randomList = FamProvider.getRandomFamList(+randomMode, tierListString);
        var brigIds: number[] = [];
        var maxIndex = isBloodclash? 9 : 4;

        if (isBloodclash) {
            // choose a random index for the WL
            var randIndex = getRandomInt(0, maxIndex);
            brigIds[randIndex] = getRandomElement(FamProvider.getWarlordList());
        }

        for (var i = 0; i <= maxIndex; i++) {
            // if a spot is vacant (i.e. has no WL), put a random fam in there
            if (!brigIds[i]) {
                brigIds[i] = getRandomElement(randomList);
            }
        }

        return brigIds;
    }

    /**
     * Initialize the two players' brigade
     */
    static initializeBrigs(data: GameData, option: GameOption = {}, tierListString?: string): void {
        var battle = BattleModel.getInstance();
        var isBloodClash = battle.isBloodClash;
        var p1_cardIds: number[] = [];
        var p2_cardIds: number[] = [];
        var p1_warlordSkillIds: number[] = [];
        var p2_warlordSkillIds: number[] = [];

        var availableSkills: number[] = SkillProvider.getAvailableSkillsForSelect();

        if (!tierListString) {
            tierListString = localStorage["tierList"];
        }

        if (option.p1RandomMode) {
            p1_cardIds = BrigGenerator.getRandomBrig(option.p1RandomMode, tierListString, isBloodClash);

            for (var i = 0; i < 3; i++) {
                p1_warlordSkillIds.push(+getRandomElement(availableSkills));
            }
        }
        else {
            p1_cardIds = data.p1_cardIds;
            p1_warlordSkillIds = data.p1_warlordSkillIds;
        }

        if (option.p2RandomMode) {
            p2_cardIds = BrigGenerator.getRandomBrig(option.p2RandomMode, tierListString, isBloodClash);

            for (i = 0; i < 3; i++) {
                p2_warlordSkillIds.push(+getRandomElement(availableSkills));
            }
        }
        else {
            p2_cardIds = data.p2_cardIds;
            p2_warlordSkillIds = data.p2_warlordSkillIds;
        }

        // create the cards
        for (i = 0; i < 10; i++) {
            if (i >= 5 && !isBloodClash) break;
            var p1_cardInfo = famDatabase[p1_cardIds[i]];
            var p2_cardInfo = famDatabase[p2_cardIds[i]];

            // make the skill array for the current fam
            var p1fSkillIdArray: number[] = p1_cardInfo.skills;
            if (p1_cardInfo.isWarlord) {
                p1fSkillIdArray = p1_warlordSkillIds;
            }

            var p2fSkillIdArray: number[] = p2_cardInfo.skills;
            if (p2_cardInfo.isWarlord) {
                p2fSkillIdArray = p2_warlordSkillIds;
            }

            var player1Skills = this.makeSkillArray(p1fSkillIdArray);
            var player2Skills = this.makeSkillArray(p2fSkillIdArray);

            // now make the cards and add them to the appropriate collections
            var card1 = new Card(p1_cardIds[i], battle.player1, i, player1Skills);
            var card2 = new Card(p2_cardIds[i], battle.player2, i, player2Skills);

            if (i < 5) {
                battle.p1_mainCards[i] = card1;
                battle.p2_mainCards[i] = card2;

                battle.p1_originalMainCards[i] = card1;
                battle.p2_originalMainCards[i] = card2;

                battle.allCurrentMainCards.push(card1);
                battle.allCurrentMainCards.push(card2);
            }
            else if (i >= 5 && isBloodClash) {
                battle.p1_reserveCards[i % 5] = card1;
                battle.p2_reserveCards[i % 5] = card2;

                battle.p1_originalReserveCards[i % 5] = card1;
                battle.p2_originalReserveCards[i % 5] = card2;
            }

            battle.allCardsById[card1.id] = card1;
            battle.allCardsById[card2.id] = card2;
        }
    }

    /**
     * Given an array of skill ids, return an array of Skills
     */
    static makeSkillArray(skillIds: number[]): Skill[] {
        var skillArray: Skill[] = [];

        for (var i = 0; i < 3; i++) {
            if (skillIds[i]) {
                skillArray.push(new Skill(skillIds[i]));
            }
        }

        return skillArray;
    }
} 