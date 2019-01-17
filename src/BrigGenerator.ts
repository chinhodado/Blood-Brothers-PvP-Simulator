/// <reference path="interfaces/GameData.ts"/>
/// <reference path="interfaces/GameOption.ts"/>

class BrigGenerator {
    /**
     * Return a randomly generated brig
     */
    static getRandomBrig(randomMode: ENUM.RandomBrigType, isBloodclash: boolean): number[] {
        let randomList = FamProvider.getRandomFamList(+randomMode);
        let brigIds: number[] = [];
        let maxIndex = isBloodclash? 9 : 4;

        if (isBloodclash) {
            // choose a random index for the WL
            let randIndex = getRandomInt(0, maxIndex);
            brigIds[randIndex] = getRandomElement(FamProvider.getWarlordList());
        }

        for (let i = 0; i <= maxIndex; i++) {
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
    static initializeBrigs(data: GameData, option: GameOption = {}): void {
        let battle = BattleModel.getInstance();
        let isBloodClash = battle.isBloodClash;
        let p1_cardIds: number[] = [];
        let p2_cardIds: number[] = [];
        let p1_warlordSkillIds: number[] = [];
        let p2_warlordSkillIds: number[] = [];

        if (option.p1RandomMode) {
            p1_cardIds = BrigGenerator.getRandomBrig(option.p1RandomMode, isBloodClash);
            p1_warlordSkillIds = BrigGenerator.getSmartWarlordSkills();
        }
        else {
            p1_cardIds = data.p1_cardIds;
            p1_warlordSkillIds = data.p1_warlordSkillIds;
        }

        if (option.p2RandomMode) {
            p2_cardIds = BrigGenerator.getRandomBrig(option.p2RandomMode, isBloodClash);
            p2_warlordSkillIds = BrigGenerator.getSmartWarlordSkills();
        }
        else {
            p2_cardIds = data.p2_cardIds;
            p2_warlordSkillIds = data.p2_warlordSkillIds;
        }

        // create the cards
        for (let i = 0; i < 10; i++) {
            if (i >= 5 && !isBloodClash) break;
            let p1_cardInfo = famDatabase[p1_cardIds[i]];
            let p2_cardInfo = famDatabase[p2_cardIds[i]];

            // make the skill array for the current fam
            let p1fSkillIdArray: number[] = p1_cardInfo.skills;
            if (p1_cardInfo.isWarlord) {
                p1fSkillIdArray = p1_warlordSkillIds;
            }
            if (data.p1_customSkills[i]) { // this will overwrite the warlord skill id array when available
                p1fSkillIdArray = data.p1_customSkills[i];
            }

            let p2fSkillIdArray: number[] = p2_cardInfo.skills;
            if (p2_cardInfo.isWarlord) {
                p2fSkillIdArray = p2_warlordSkillIds;
            }
            if (data.p2_customSkills[i]) { // this will overwrite the warlord skill id array when available
                p2fSkillIdArray = data.p2_customSkills[i];
            }

            let player1Skills = this.makeSkillArray(p1fSkillIdArray);
            let player2Skills = this.makeSkillArray(p2fSkillIdArray);

            // now make the cards and add them to the appropriate collections
            let bonusType: ENUM.BonusType;
            if (battle.isColiseum) {
                bonusType = ENUM.BonusType.COLISEUM;
            }
            let card1 = new Card(p1_cardIds[i], battle.player1, i, player1Skills, data.p1_customStats[i], bonusType);
            let card2 = new Card(p2_cardIds[i], battle.player2, i, player2Skills, data.p2_customStats[i], bonusType);

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
        let skillArray: Skill[] = [];

        for (let i = 0; i < 3; i++) {
            if (skillIds[i] && +skillIds[i] !== 0) { // 0 is the special id to mark a "null" skill
                skillArray.push(new Skill(skillIds[i]));
            }
        }

        return skillArray;
    }

    /**
     * Returns 3 skill ids such that each skill belongs to a different "category"
     */
    static getSmartWarlordSkills(): number[] {
        // choose 3 out of 4 categories. Maybe there's a more efficient way of doing this...
        let choosenCategory = getRandomUniqueElements(SkillProvider.skillCategories, 3);
        let skills: number[] = [];

        for (let i = 0; i < choosenCategory.length; i++) {
            switch (choosenCategory[i]) {
            case ENUM.SkillCategory.OPENING:
                skills.push(getRandomElement(SkillProvider.getAvailableOpeningSkillList()));
                break;
            case ENUM.SkillCategory.ACTIVE:
                skills.push(getRandomElement(SkillProvider.getAvailableActiveSkillList()));
                break;
            case ENUM.SkillCategory.REACTIVE:
                skills.push(getRandomElement(SkillProvider.getAvailableReactiveSkillList()));
                break;
            case ENUM.SkillCategory.ACTION_ON_DEATH:
                skills.push(getRandomElement(SkillProvider.getAvailableOnDeathSkillList()));
                break;
            default:
                throw new Error("Invalid skill category");
            }
        }

        return skills;
    }
}
