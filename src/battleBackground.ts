class BattleBackground {
    static bgList = [
        "23b/Bamboo01", "34d/Bamboo02", "1c5/Carpet01", "141/Carpet02",
        "283/Carpet03", "1f8/Carpet04", "193/Carpet05", "24d/Carpet06",
        "17b/Carpet07", "3ff/Carpet08", "1e6/Carpet09", "3c3/Carpet10",
        "3a3/Carpet11", "224/Carpet12", "4ad/Carpet13", "20c/Carpet14",
        "29f/Carpet15", "21c/Carpet16", "385/Carpet17", "4f8/Carpet18",
        "362/Carpet19", "387/Carpet20", "311/Carpet21", "352/Carpet22",
        "347/Carpet23", "111/Carpet24", "117/Carpet25", "3c8/Carpet26",
        "2f5/Carpet27", "2cb/Carpet28", "1b8/Carpet29", "26b/Carpet30",
        "18d/Carpet31", "265/Carpet32", "4bc/Carpet33",
        "392/Castle01", "2f9/Castle02", "3b4/Cave01", "266/Cave02",
        "3bc/Cave03", "1ad/Cave04", "4d5/Cave05", "494/Christmas01",
        "3b3/Christmas02", "280/Christmas03", "3bf/Desert01",
        "4c9/Desert02", "3d9/Fog01", "30e/Fog02", "267/Forest01",
        "2c5/Forest02", "247/Greatwall01", "450/Halloween01", "22e/Halloween02",
        "28a/Halloween03", "4c2/Halloween04", "3c7/Halloween05",
        "11a/Jungle01", "268/Mountain01", "3fb/River01",
        "451/River02", "49f/Road01", "270/Road02", "475/Road03",
        "2a8/Road04", "40c/Road05", "2ff/Road06", "310/Road07",
        "383/Road08", "41e/Road09", "289/Road10", "183/Road11",
        "1d8/Road12", "2a7/Road13", "3cf/Road14", "3fb/Road15",
        "1f4/Road16", "28f/Road17", "2a5/Road28", "102/Road29",
        "403/Road33", "4a2/Road34",
        "4e9/Ruins01", "1f4/Sakura01", "336/Snow01", "3c3/Snow03",
        "49a/Swamp01", "145/Swamp02", "144/Tints01", "1fb/Tree01", "33c/Tree02",
        "329/81a5ccfd07ca41c238e124a5b6683b93", "1a0/Castle1", "39f/F459e81069786396191c375060d778a3",
        "3b1/66fddb4d129fa8b494cf3d21a057e226", "45f/452d87b11eb533d33fba937073bb5668",
        "4a5/48645b3ae0106d4f96fa0bf3ad6239b8"
    ];

    /**
     * Return a link for a random battle background
     */
    static getRandomBackgroundLink(): string {
        var shortenedLink = getRandomElement(BattleBackground.bgList);
        return BattleBackground.getLinkFromShortenedLink(shortenedLink);
    }

    /**
     * Given a shortened link (as stored in bgList), return the full link
     */
    static getLinkFromShortenedLink(shortenedLink: string): string {
        var firstPart = "http://img" + shortenedLink.charAt(0) + ".wikia.nocookie.net/bloodbrothersgame/images/";
        var link = firstPart + shortenedLink.charAt(1) + "/" + shortenedLink.substring(1) + ".png";
        return link;
    }
}
