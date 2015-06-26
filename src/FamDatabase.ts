/**
 * Some notes:
 * - Order the familiars by the fullName
 * - The order of the skills only matters for mounted familiars
 */

interface CardInfo {
    name: string;        // Short name for the fam. If multiple fams have the same short name,
                         // append the rarity at the end (e.g. "Thor" and "Thor L")
    stats: number[];     // Use the POPE stats
    skills: number[];
    passiveSkills?: number[];
    autoAttack?: number; // needed for those with special autoAttack
    isMounted?: boolean;
    isWarlord?: boolean;
    img: string;         // three chars that will be used to get the url of the fam's image
    rarity: ENUM.RarityType;
    evo: number;         // evolution step (number of stars)
    fullName: string;
}

interface CardMap {
    [id: number]: CardInfo;
}

var famDatabase: CardMap = {
    11261: {
        name: "Rahab", stats: [14073, 12597, 15498, 9004, 16754],
        skills: [434],
        img: "21c", rarity: 4, evo: 4,
        fullName: "Abyssal Rahab II"
    },
    11282: {
        name: "Achilles", stats: [13593, 15630, 11362, 10603, 16562],
        skills: [459, 460],
        img: "1c7", rarity: 4, evo: 2,
        fullName: "Achilles, Fallen Hero II"
    },
    10613: {
        name: "Adara", stats: [16024, 12134, 17620, 10857, 9370],
        skills: [166],
        img: "268", rarity: 4, evo: 4,
        fullName: "Adara Luck Shot II"
    },
    11581: {
        name: "Adara", stats: [14424, 17805, 13013, 7005, 16902],
        skills: [876],
        autoAttack: 10117,
        img: "205", rarity: 4, evo: 4,
        fullName: "Adara Luck Shot, Swap II"
    },
    11099: {
        name: "Adranus", stats: [20223, 23517, 19855, 18609, 18046],
        skills: [347],
        img: "275", rarity: 6, evo: 2,
        fullName: "Adranus, Lava Beast II"
    },
    358: {
        name: "Aegis", stats: [14560, 11280, 15530, 10600, 10100],
        skills: [64],
        img: "235", rarity: 5, evo: 1,
        fullName: "Aegis, the Bulwark"
    },
    11206: {
        name: "Aeneas", stats: [14590, 15630, 13561, 10311, 13561],
        skills: [400, 401],
        img: "25c", rarity: 4, evo: 2,
        fullName: "Aeneas, Fallen Hero II"
    },
    11541: {
        name: "Aengus", stats: [15803, 6996, 12239, 17006, 16497],
        skills: [823, 824],
        autoAttack: 10003,
        img: "453", rarity: 4, evo: 2,
        fullName: "Aengus, the Charitable II"
    },
    11385: {
        name: "Aeshma", stats: [17558, 17212, 15034, 5804, 13019],
        skills: [579],
        autoAttack: 10035,
        img: "243", rarity: 4, evo: 2,
        fullName: "Aeshma, the Tyrant II"
    },
    11344: {
        name: "Afanc", stats: [16518, 8610, 14124, 16020, 13214],
        skills: [529, 530],
        autoAttack: 10003,
        img: "4a1", rarity: 4, evo: 2,
        fullName: "Afanc, Beast of the Deep II"
    },
    21501: {
        name: "Agathos", stats: [12163, 8220, 10224, 13095, 12315],
        skills: [683],
        autoAttack: 10007,
        img: "188", rarity: 4, evo: 2,
        fullName: "Agathos, the Ruinous II"
    },
    11501: {
        name: "Agathos", stats: [15265, 7478, 11442, 16803, 16913],
        skills: [682],
        autoAttack: 10036,
        img: "38e", rarity: 4, evo: 4,
        fullName: "Agathos, Wyrm of the Harvest II"
    },
    21404: {
        name: "Ah Puch", stats: [22515, 9134, 18258, 20999, 17486],
        skills: [585],
        autoAttack: 10007,
        img: "460", rarity: 5, evo: 3,
        fullName: "Ah Puch, Lord of Death"
    },
    11041: {
        name: "Ahab", stats: [10273, 12001, 11342, 9978, 12342],
        skills: [195],
        img: "2ec", rarity: 4, evo: 4,
        fullName: "Ahab, the Colossal Anchor II"
    },
    21474: {
        name: "Aipaloovik", stats: [17006, 7397, 11481, 17526, 16605],
        skills: [660, 661],
        autoAttack: 10052,
        img: "46f", rarity: 4, evo: 2,
        fullName: "Aipaloovik, Sacred Dragon II"
    },
    11474: {
        name: "Aipaloovik", stats: [15610, 7991, 11807, 16534, 15999],
        skills: [659],
        autoAttack: 10007,
        img: "389", rarity: 4, evo: 4,
        fullName: "Aipaloovik, the Snowstorm II"
    },
    10841: {
        name: "Alcina", stats: [12684, 14169, 11356, 13682, 15755],
        skills: [269],
        img: "31b", rarity: 4, evo: 4,
        fullName: "Alcina the Soulsucker II"
    },
    11400: {
        name: "Ales", stats: [18119, 18009, 16024, 10101, 5884],
        skills: [562, 563],
        img: "4d5", rarity: 4, evo: 4,
        fullName: "Ales Darkblood II"
    },
    11591: {
        name: "Aletheia", stats: [18674, 19010, 17277, 10939, 18165],
        skills: [885, 886],
        img: "2be", rarity: 5, evo: 2,
        fullName: "Aletheia, Knight Templar II"
    },
    10813: {
        name: "ASK", stats: [12952, 14282, 11477, 10490, 17133],
        skills: [219],
        img: "339", rarity: 4, evo: 4,
        fullName: "All-Seeing Keeper II"
    },
    10936: {
        name: "Merrow", stats: [16811, 14709, 13723, 17537, 17320],
        skills: [217],
        img: "26d", rarity: 5, evo: 2,
        fullName: "Alluring Merrow II"
    },
    10972: {
        name: "Alp", stats: [11917, 14120, 10928, 17168, 13366],
        skills: [277],
        img: "20d", rarity: 4, evo: 4,
        fullName: "Alp, Dynast of Darkness II"
    },
    11436: {
        name: "Alyssa", stats: [17883, 8718, 16594, 20516, 17786],
        skills: [616, 617],
        autoAttack: 10007,
        img: "41d", rarity: 5, evo: 2,
        fullName: "Alyssa, Black Cat Witch II"
    },
    11258: {
        name: "Amazon", stats: [15034, 16670, 14048, 8025, 16107],
        skills: [875],
        autoAttack: 10116,
        img: "2a8", rarity: 4, evo: 2,
        fullName: "Amazon Berserker II"
    },
    10623: {
        name: "Warfist", stats: [10904, 11417, 10466, 10660, 11830],
        skills: [156],
        img: "21a", rarity: 4, evo: 4,
        fullName: "Amazon Warfist II"
    },
    11058: {
        name: "Ammit", stats: [18306, 23495, 18501, 18490, 18057],
        skills: [325],
        img: "2f9", rarity: 6, evo: 2,
        fullName: "Ammit, Soul Destroyer II"
    },
    10717: {
        name: "Amon", stats: [13171, 16128, 10755, 14861, 13214],
        skills: [47],
        img: "386", rarity: 4, evo: 2,
        fullName: "Amon, Marquis of Blaze II"
    },
    10757: {
        name: "Amphisbaena", stats: [14861, 14850, 13030, 19855, 18024],
        skills: [202, 203],
        isMounted: true,
        img: "346", rarity: 5, evo: 2,
        fullName: "Amphisbaena II"
    },
    11065: {
        name: "ABS", stats: [14005, 15901, 11903, 11838, 14904],
        skills: [365],
        img: "1e0", rarity: 4, evo: 2,
        fullName: "Ancient Beetle Soldier II"
    },
    11483: {
        name: "Tree Golem", stats: [17998, 17106, 17998, 12001, 2907],
        skills: [671],
        autoAttack: 10056,
        img: "14b", rarity: 4, evo: 4,
        fullName: "Ancient Tree Golem II"
    },
    10464: {
        name: "Andorra", stats: [12538, 13621, 13510, 12134, 12342],
        skills: [142],
        img: "252", rarity: 4, evo: 4,
        fullName: "Andorra the Indomitable II"
    },
    11592: {
        name: "Andromalius", stats: [15749, 16172, 12564, 7960, 17277],
        skills: [887, 888],
        img: "2b6", rarity: 4, evo: 2,
        fullName: "Andromalius, Eater of Lies II"
    },
    10947: {
        name: "Ankou", stats: [17017, 9628, 16854, 14308, 10246],
        skills: [345, 346],
        autoAttack: 10007,
        isMounted: true,
        img: "4d6", rarity: 4, evo: 2,
        fullName: "Ankou, Harbinger of Death II"
    },
    10999: {
        name: "Anne", stats: [12232, 13782, 12342, 13510, 15599],
        skills: [250],
        img: "13d", rarity: 4, evo: 4,
        fullName: "Anne, the Whirlwind II"
    },
    11245: {
        name: "Anneberg", stats: [19097, 18241, 17038, 8794, 16518],
        skills: [489, 490],
        img: "1e1", rarity: 5, evo: 2,
        fullName: "Anneberg, Steel Steed II"
    },
    11292: {
        name: "Anubis", stats: [14330, 17006, 12510, 10625, 14005],
        skills: [473, 474],
        img: "247", rarity: 4, evo: 2,
        fullName: "Anubis, Keeper of the Dead II"
    },
    21588: {
        name: "Apate", stats: [21266, 9647, 18128, 21466, 17977],
        skills: [882],
        autoAttack: 10118,
        img: "111", rarity: 5, evo: 3,
        fullName: "Apate, Goddess of Deceit"
    },
    21288: {
        name: "Apep", stats: [20543, 20975, 15503, 14302, 16729],
        skills: [468],
        autoAttack: 10017,
        img: "179", rarity: 5, evo: 3,
        fullName: "Apep the Chaotic"
    },
    10593: {
        name: "Apocalyptic Beast", stats: [14189, 15977, 15413, 13420, 14969],
        skills: [123],
        img: "15a", rarity: 5, evo: 2,
        fullName: "Apocalyptic Beast II"
    },
    11364: {
        name: "Apsara", stats: [15717, 4992, 14113, 17179, 17006],
        skills: [630, 631],
        autoAttack: 10007,
        img: "152", rarity: 4, evo: 2,
        fullName: "Apsara, Spirit of Water II"
    },
    11281: {
        name: "Chariot", stats: [17342, 19346, 16453, 10376, 17472],
        skills: [464],
        img: "3da", rarity: 5, evo: 2,
        fullName: "Arcanan Chariot II"
    },
    21300: {
        name: "Fate", stats: [20706, 17848, 13181, 18794, 17522],
        skills: [475],
        autoAttack: 10007,
        img: "3ee", rarity: 5, evo: 3,
        fullName: "Arcanan Circle of Fate"
    },
    11335: {
        name: "Daemon", stats: [18252, 20700, 12510, 13117, 15023],
        skills: [509, 510],
        img: "249", rarity: 5, evo: 2,
        fullName: "Arcanan Daemon II"
    },
    11324: {
        name: "Death", stats: [20234, 19508, 13008, 13019, 18111],
        skills: [546, 547],
        autoAttack: 10028,
        isMounted: true,
        img: "25b", rarity: 5, evo: 2,
        fullName: "Arcanan Death II"
    },
    11239: {
        name: "Emperor", stats: [18577, 17916, 17786, 10809, 14590],
        skills: [425, 426],
        img: "102", rarity: 5, evo: 2,
        fullName: "Arcanan Emperor II"
    },
    11211: {
        name: "Empress", stats: [15197, 12380, 15348, 19422, 17168],
        skills: [394, 395],
        img: "104", rarity: 5, evo: 2,
        fullName: "Arcanan Empress II"
    },
    11427: {
        name: "Fool", stats: [20613, 20104, 18057, 13182, 11102],
        skills: [632, 633],
        isMounted: true,
        img: "3f3", rarity: 5, evo: 2,
        fullName: "Arcanan Fool II"
    },
    11311: {
        name: "Hanged Man", stats: [20505, 15002, 13008, 13030, 18024],
        skills: [480, 481],
        img: "489", rarity: 5, evo: 2,
        fullName: "Arcanan Hanged Man II"
    },
    11287: {
        name: "Hermit", stats: [19205, 12066, 12586, 20722, 15002],
        skills: [453, 454],
        autoAttack: 10007,
        img: "3c5", rarity: 5, evo: 2,
        fullName: "Arcanan Hermit II"
    },
    11199: {
        name: "High Priestess", stats: [17233, 8350, 20256, 19086, 14839],
        skills: [388, 389],
        autoAttack: 10007,
        img: "458", rarity: 5, evo: 2,
        fullName: "Arcanan High Priestess II"
    },
    11395: {
        name: "Judgment", stats: [19996, 7754, 16009, 19508, 17753],
        skills: [573],
        autoAttack: 10003,
        img: "172", rarity: 5, evo: 2,
        fullName: "Arcanan Judgment II"
    },
    11242: {
        name: "Lovers", stats: [16908, 13875, 12705, 19021, 17006],
        skills: [430, 431],
        autoAttack: 10007,
        img: "3fb", rarity: 5, evo: 2,
        fullName: "Arcanan Lovers II"
    },
    11208: {
        name: "Magus", stats: [15186, 12131, 17688, 19010, 15641],
        skills: [402, 403],
        img: "1bb", rarity: 5, evo: 2,
        fullName: "Arcanan Magus II"
    },
    11284: {
        name: "Might", stats: [18598, 19227, 10766, 13301, 17948],
        skills: [461, 462],
        isMounted: true,
        img: "2a4", rarity: 5, evo: 2,
        fullName: "Arcanan Might II"
    },
    11363: {
        name: "Moon", stats: [18273, 18046, 13279, 12467, 17948],
        skills: [551, 552],
        autoAttack: 10030,
        img: "3b8", rarity: 5, evo: 2,
        fullName: "Arcanan Moon II"
    },
    11360: {
        name: "Star", stats: [20223, 7548, 18035, 18208, 15803],
        skills: [540, 541],
        autoAttack: 10007,
        img: "475", rarity: 5, evo: 2,
        fullName: "Arcanan Star II"
    },
    11394: {
        name: "Sun", stats: [20299, 7982, 16356, 18013, 17916],
        skills: [570, 571],
        autoAttack: 10032,
        img: "10a", rarity: 5, evo: 2,
        fullName: "Arcanan Sun II"
    },
    11332: {
        name: "Temperance", stats: [19183, 3800, 20007, 19985, 18046],
        skills: [543],
        autoAttack: 10027,
        img: "38d", rarity: 5, evo: 2,
        fullName: "Arcanan Temperance II"
    },
    11329: {
        name: "Archbishop", stats: [19064, 20191, 16009, 10744, 15002],
        skills: [520],
        autoAttack: 10025,
        img: "39a", rarity: 5, evo: 2,
        fullName: "Archbishop of the Deep II"
    },
    10600: {
        name: "Ose", stats: [16995, 14395, 15023, 14850, 11990],
        skills: [154],
        img: "300", rarity: 5, evo: 2,
        fullName: "Archduke Ose II"
    },
    11105: {
        name: "Ares", stats: [25434, 21285, 21047, 16345, 17407],
        skills: [542],
        img: "180", rarity: 6, evo: 2,
        fullName: "Ares, God of Ruin II"
    },
    10372: {
        name: "Artemisia", stats: [10042, 10977, 10977, 10042, 12589],
        skills: [18],
        img: "3aa", rarity: 4, evo: 4,
        fullName: "Artemisia Swiftfoot II"
    },
    11457: {
        name: "Asena", stats: [15121, 17385, 11622, 7505, 16995],
        skills: [608],
        img: "3f8", rarity: 4, evo: 2,
        fullName: "Asena, Wolfwoman II"
    },
    11361: {
        name: "Ashlee", stats: [17038, 16042, 15045, 13431, 17992],
        skills: [623],
        autoAttack: 10029,
        img: "3f7", rarity: 5, evo: 2,
        fullName: "Ashlee Steamsaw II"
    },
    21529: {
        name: "Aso", stats: [19587, 18851, 18105, 13823, 18083],
        skills: [806],
        autoAttack: 10100,
        img: "170", rarity: 5, evo: 3,
        fullName: "Aso, the Asura"
    },
    11488: {
        name: "Aspidochelone", stats: [21003, 17103, 21003, 17006, 4450],
        skills: [665, 666],
        autoAttack: 10050,
        img: "26f", rarity: 5, evo: 2,
        fullName: "Aspidochelone, the Iceberg II"
    },
    10595: {
        name: "Astaroth", stats: [12194, 13965, 10087, 15278, 14280],
        skills: [155],
        img: "22e", rarity: 4, evo: 4,
        fullName: "Astaroth, Duke of Fear II"
    },
    11467: {
        name: "Atalanta", stats: [16497, 16302, 13561, 7776, 15576],
        skills: [652, 653],
        img: "210", rarity: 4, evo: 2,
        fullName: "Atalanta, Fowler II"
    },
    10900: {
        name: "Aurboda", stats: [11903, 15348, 11773, 18468, 11015],
        skills: [261],
        img: "315", rarity: 4, evo: 2,
        fullName: "Aurboda, the Great Mother II"
    },
    11157: {
        name: "Ausguss", stats: [14937, 9087, 12304, 16952, 14308],
        skills: [708],
        autoAttack: 10007,
        img: "3ce", rarity: 4, evo: 2,
        fullName: "Ausguss, Jailer II"
    },
    11441: {
        name: "Ausra", stats: [21913, 9596, 15998, 18403, 18154],
        skills: [638, 639],
        autoAttack: 10023,
        img: "2c8", rarity: 5, evo: 2,
        fullName: "Ausra, the Fall Breeze II"
    },
    11388: {
        name: "Azi", stats: [20375, 20202, 20104, 22899, 18057],
        skills: [572],
        autoAttack: 10033,
        img: "25b", rarity: 6, evo: 2,
        fullName: "Azi Dahaka II"
    },
    10657: {
        name: "Baal", stats: [14677, 15457, 12813, 14482, 16551],
        skills: [178],
        img: "22f", rarity: 5, evo: 2,
        fullName: "Baal, Thunder Lord of Hell II"
    },
    11168: {
        name: "Badalisc", stats: [14092, 16107, 11882, 11297, 15218],
        skills: [315],
        img: "26c", rarity: 4, evo: 2,
        fullName: "Badalisc, the Gourmet II"
    },
    11390: {
        name: "Suzhen", stats: [15998, 3096, 15002, 17504, 17006],
        skills: [81],
        autoAttack: 10031,
        img: "105", rarity: 4, evo: 2,
        fullName: "Bai Suzhen, Lady of Scales II"
    },
    11102: {
        name: "Balgo", stats: [18585, 16037, 13962, 5799, 13510],
        skills: [349],
        img: "2fd", rarity: 4, evo: 4,
        fullName: "Balgo, the Cursed Flame II"
    },
    11243: {
        name: "Bandersnatch", stats: [21805, 8047, 14200, 19183, 17786],
        skills: [635],
        autoAttack: 10046,
        img: "1bc", rarity: 5, evo: 2,
        fullName: "Bandersnatch, Beast Divine II"
    },
    10652: {
        name: "Batraz", stats: [14471, 15511, 13442, 12293, 12174],
        skills: [142],
        img: "4e3", rarity: 4, evo: 2,
        fullName: "Batraz, the Immortal Hero II"
    },
    11371: {
        name: "Bayam", stats: [13269, 7966, 12804, 17106, 16779],
        skills: [506],
        autoAttack: 10023,
        img: "171", rarity: 4, evo: 4,
        fullName: "Bayam II"
    },
    11025: {
        name: "Scarecrow", stats: [10625, 13756, 10490, 11001, 9342],
        skills: [256],
        img: "34d", rarity: 4, evo: 4,
        fullName: "Beheading Scarecrow II"
    },
    10659: {
        name: "Behemoth", stats: [12442, 14755, 13269, 12380, 12999],
        skills: [186],
        img: "230", rarity: 4, evo: 4,
        fullName: "Behemoth, Thunder Beast II"
    },
    10935: {
        name: "Belisama", stats: [17777, 17071, 17000, 11111, 4981],
        skills: [628],
        img: "39e", rarity: 4, evo: 4,
        fullName: "Belisama, Flame Goddess II"
    },
    11454: {
        name: "Bella", stats: [16009, 16627, 13052, 5631, 17374],
        skills: [643, 644],
        img: "314", rarity: 4, evo: 2,
        fullName: "Bella, the Dazzling Flower II"
    },
    21459: {
        name: "Benjamina", stats: [21022, 16379, 20007, 13006, 18011],
        skills: [640],
        img: "46a", rarity: 5, evo: 3,
        fullName: "Benjamina, Wild Turkey"
    },
    11494: {
        name: "Bergel", stats: [16529, 7321, 10538, 17797, 16811],
        skills: [679, 680],
        autoAttack: 10007,
        img: "297", rarity: 4, evo: 2,
        fullName: "Bergel, Frost Magus II"
    },
    11505: {
        name: "Bert", stats: [14107, 14000, 11828, 6577, 9453],
        skills: [688],
        img: "404", rarity: 4, evo: 4,
        fullName: "Bert, Foe Sweep II"
    },
    21560: {
        name: "Bheara", stats: [13572, 8426, 9509, 13301, 11459],
        skills: [843],
        autoAttack: 10007,
        img: "141", rarity: 4, evo: 2,
        fullName: "Bheara, Tree of Death II"
    },
    11560: {
        name: "Bheara", stats: [14975, 6502, 12207, 17475, 16754],
        skills: [842],
        autoAttack: 10007,
        img: "387", rarity: 4, evo: 4,
        fullName: "Bheara, Wastestrider II"
    },
    10684: {
        name: "Biast", stats: [13879, 12655, 10163, 13611, 9798],
        skills: [163],
        img: "229", rarity: 4, evo: 2,
        fullName: "Biast II"
    },
    21430: {
        name: "Bijan", stats: [22189, 20473, 18945, 11176, 18083],
        skills: [874],
        autoAttack: 10115,
        img: "16a", rarity: 5, evo: 3,
        fullName: "Bijan, the Comet"
    },
    10787: {
        name: "Black Knight", stats: [12648, 16097, 11623, 11574, 13842],
        skills: [211],
        img: "19e", rarity: 4, evo: 4,
        fullName: "Black Knight, Soul Hunter II"
    },
    10824: {
        name: "Bolus", stats: [12086, 16889, 12427, 11610, 12832],
        skills: [152],
        img: "4a0", rarity: 4, evo: 4,
        fullName: "Bolus, the Blue Bolt II"
    },
    21510: {
        name: "Botis", stats: [16009, 14742, 13994, 8003, 17255],
        skills: [692, 693],
        autoAttack: 10060,
        img: "417", rarity: 4, evo: 2,
        fullName: "Botis, Dasher of Hopes II"
    },
    11510: {
        name: "Botis", stats: [14096, 14000, 10001, 5506, 13196],
        skills: [694],
        img: "2e7", rarity: 4, evo: 4,
        fullName: "Botis, Earl of Hell II"
    },
    10977: {
        name: "Boudica", stats: [9967, 11914, 8918, 13110, 12014],
        skills: [276],
        img: "2ab", rarity: 4, evo: 4,
        fullName: "Boudica, the Dawn Chief II"
    },
    11223: {
        name: "Brang", stats: [18826, 18544, 14027, 18208, 10105],
        skills: [423],
        autoAttack: 10010,
        img: "4f3", rarity: 5, evo: 2,
        fullName: "Brang Two-Heads II"
    },
    11538: {
        name: "Brangane", stats: [14610, 7639, 12001, 17899, 15804],
        skills: [819],
        autoAttack: 10003,
        img: "2de", rarity: 4, evo: 4,
        fullName: "Brangane, the Enchanting II"
    },
    11209: {
        name: "Rabbit", stats: [18999, 13951, 20007, 9986, 18035],
        skills: [435, 436],
        img: "26e", rarity: 5, evo: 2,
        fullName: "Brass Rabbit"
    },
    11194: {
        name: "Tarantula", stats: [19324, 14568, 18024, 15695, 12120],
        skills: [396, 397],
        autoAttack: 10005,
        img: "271", rarity: 5, evo: 2,
        fullName: "Brass Tarantula II"
    },
    11522: {
        name: "Briar", stats: [18988, 9000, 20028, 19519, 12987],
        skills: [804, 805],
        autoAttack: 10007,
        img: "36b", rarity: 5, evo: 2,
        fullName: "Briar, Grimoire Keeper II"
    },
    11171: {
        name: "Hyena", stats: [14644, 10766, 11860, 18923, 12228],
        skills: [321],
        autoAttack: 10008,
        img: "2fc", rarity: 4, evo: 2,
        fullName: "Bronzeclad Hyena II"
    },
    11114: {
        name: "Brownies", stats: [9821, 11283, 9515, 13196, 11414],
        skills: [307],
        img: "190", rarity: 4, evo: 4,
        fullName: "Brownies, the Uproarious II"
    },
    10488: {
        name: "Bunga", stats: [12269, 11049, 14182, 9612, 10343],
        skills: [125],
        img: "25d", rarity: 4, evo: 4,
        fullName: "Bunga, the Stalwart II"
    },
    11129: {
        name: "Caassimolar", stats: [16009, 24979, 15587, 10625, 12521],
        skills: [371],
        img: "1c7", rarity: 5, evo: 2,
        fullName: "Caassimolar, the Chimera II"
    },
    11466: {
        name: "Calais", stats: [19812, 18100, 16009, 12792, 17277],
        skills: [650, 651],
        img: "379", rarity: 5, evo: 2,
        fullName: "Calais, the Gale II"
    },
    11449: {
        name: "Camazo", stats: [22628, 22585, 22173, 16139, 18208],
        skills: [601, 445],
        autoAttack: 10038,
        img: "26c", rarity: 6, evo: 2,
        fullName: "Camazo, Knight of Bats II"
    },
    11119: {
        name: "Canhel", stats: [15608, 19606, 17992, 11329, 16399],
        skills: [293],
        img: "254", rarity: 5, evo: 2,
        fullName: "Canhel, Guardian Dragon II"
    },
    10997: {
        name: "Jolly", stats: [14200, 16594, 14070, 18956, 15424],
        skills: [226],
        img: "214", rarity: 5, evo: 2,
        fullName: "Cap'n Jolly, Sea Scourge II"
    },
    11547: {
        name: "Barometz", stats: [16961, 15121, 14145, 14000, 9052],
        skills: [830],
        autoAttack: 10105,
        img: "184", rarity: 4, evo: 4,
        fullName: "Caparisoned Barometz II"
    },
    11479: {
        name: "Jed", stats: [24080, 25066, 20494, 14005, 18100],
        skills: [667],
        autoAttack: 10053,
        img: "1b7", rarity: 6, evo: 2,
        fullName: "Captain Jed II"
    },
    11333: {
        name: "Kidd", stats: [18403, 18046, 12781, 14395, 16085],
        skills: [518, 157],
        img: "442", rarity: 5, evo: 2,
        fullName: "Captain Kidd II"
    },
    11062: {
        name: "Chillweaver", stats: [13293, 13196, 10611, 16144, 14489],
        skills: [2],
        img: "2b2", rarity: 4, evo: 4,
        fullName: "Cat Sith Chillweaver II"
    },
    11090: {
        name: "CSMM", stats: [14096, 10112, 10549, 15804, 17095],
        skills: [343],
        autoAttack: 10007,
        img: "26d", rarity: 4, evo: 4,
        fullName: "Cat Sith Magus Master II"
    },
    11366: {
        name: "CSS", stats: [15034, 16518, 13052, 7202, 16811],
        skills: [549],
        img: "17b", rarity: 4, evo: 2,
        fullName: "Cat Sith Swordswoman II"
    },
    11177: {
        name: "CSW", stats: [15804, 16768, 14000, 5334, 16707],
        skills: [637],
        autoAttack: 10048,
        img: "1d8", rarity: 4, evo: 4,
        fullName: "Cat Sith Warlord II"
    },
    11213: {
        name: "Cegila", stats: [13149, 11492, 9498, 17504, 16995],
        skills: [354],
        img: "2a5", rarity: 4, evo: 2,
        fullName: "Cegila, Dragonian Incantator II"
    },
    10673: {
        name: "Cernunnos", stats: [16446, 15351, 13761, 13181, 14330],
        skills: [177],
        img: "25b", rarity: 5, evo: 2,
        fullName: "Cernunnos II"
    },
    10409: {
        name: "Magma Giant", stats: [12832, 12380, 13097, 11477, 11928],
        skills: [123],
        img: "363", rarity: 4, evo: 4,
        fullName: "Chaotic Magma Giant II"
    },
    11545: {
        name: "Chi-Hu", stats: [16529, 17071, 13106, 7440, 15738],
        skills: [829],
        autoAttack: 10104,
        img: "381", rarity: 4, evo: 2,
        fullName: "Chi-Hu II"
    },
    11484: {
        name: "Chione", stats: [16204, 13008, 13561, 8502, 17266],
        skills: [663, 664],
        img: "4d9", rarity: 4, evo: 2,
        fullName: "Chione, Fallen Heroine II"
    },
    10907: {
        name: "Chiyome", stats: [12635, 14148, 11369, 15817, 13510],
        skills: [238],
        img: "183", rarity: 4, evo: 4,
        fullName: "Chiyome, the Kamaitachi II"
    },
    11306: {
        name: "Circe", stats: [15002, 7776, 11947, 17017, 16009],
        skills: [487, 488],
        autoAttack: 10007,
        img: "20f", rarity: 4, evo: 2,
        fullName: "Circe, Fallen Heroine II"
    },
    11437: {
        name: "Pumpkin", stats: [16497, 7061, 12423, 17060, 15457],
        skills: [618, 619],
        autoAttack: 10007,
        img: "46b", rarity: 4, evo: 2,
        fullName: "Clockwork Pumpkin II"
    },
    11392: {
        name: "Viper", stats: [14999, 12999, 14999, 7808, 17133],
        skills: [574],
        img: "338", rarity: 4, evo: 4,
        fullName: "Clockwork Viper II"
    },
    21569: {
        name: "Cocytus", stats: [16497, 6248, 12001, 18252, 16995],
        skills: [866, 867],
        autoAttack: 10111,
        img: "2f0", rarity: 4, evo: 2,
        fullName: "Cocytus Dragon II"
    },
    10303: {
        name: "Crystal Gillant", stats: [11832, 10896, 10439, 10439, 13317],
        skills: [11],
        img: "460", rarity: 4, evo: 4,
        fullName: "Crystal Gillant II"
    },
    11095: {
        name: "Roc", stats: [12073, 14879, 12559, 11501, 16510],
        skills: [322],
        img: "220", rarity: 4, evo: 4,
        fullName: "Crystalwing Roc II"
    },
    10712: {
        name: "Cuelebre", stats: [13702, 16096, 12954, 11134, 13572],
        skills: [249],
        img: "28c", rarity: 4, evo: 2,
        fullName: "Cuelebre the Ironscaled II"
    },
    11019: {
        name: "Cursebone", stats: [14807, 16952, 14146, 15652, 17721],
        skills: [248],
        img: "33e", rarity: 5, evo: 2,
        fullName: "Cursebone Pterosaur II"
    },
    10820: {
        name: "Cyclops", stats: [15868, 17147, 18360, 13214, 14449],
        skills: [218],
        img: "3ba", rarity: 5, evo: 2,
        fullName: "Cyclops, the Rocky Cliff II"
    },
    11328: {
        name: "Dagon", stats: [23343, 22065, 18035, 19703, 18208],
        skills: [519],
        img: "36a", rarity: 6, evo: 2,
        fullName: "Dagon II"
    },
    10973: {
        name: "Dagr", stats: [12012, 14059, 10712, 17818, 13810],
        skills: [275],
        img: "4d2", rarity: 4, evo: 2,
        fullName: "Dagr Sunrider II"
    },
    10983: {
        name: "Danniel", stats: [23571, 24990, 21458, 13951, 16204],
        skills: [292],
        img: "1e2", rarity: 6, evo: 2,
        fullName: "Danniel, Golden Paladin II"
    },
    11415: {
        name: "Dantalion", stats: [15193, 5298, 10990, 14207, 11098],
        skills: [596],
        autoAttack: 10007,
        img: "18e", rarity: 4, evo: 4,
        fullName: "Dantalion, Duke of Hell II"
    },
    10905: {
        name: "Danzo", stats: [14774, 17277, 14872, 17667, 16128],
        skills: [237],
        img: "464", rarity: 5, evo: 2,
        fullName: "Danzo, Falcon Ninja II"
    },
    21445: {
        name: "Darkwind Wyvern", stats: [22211, 8270, 19352, 20917, 17649],
        skills: [607],
        autoAttack: 10042,
        img: "4dd", rarity: 5, evo: 3,
        fullName: "Darkwind Wyvern"
    },
    21308: {
        name: "Justice", stats: [20795, 11717, 17470, 22225, 18005],
        skills: [494, 495],
        autoAttack: 10007,
        img: "27c", rarity: 5, evo: 3,
        fullName: "Dauntless Justice"
    },
    10967: {
        name: "Deborah", stats: [13550, 14157, 13442, 12987, 13929],
        skills: [222],
        img: "373", rarity: 4, evo: 2,
        fullName: "Deborah, Knight Immaculate II"
    },
    11512: {
        name: "Deimos", stats: [16497, 17753, 11188, 6996, 17363],
        skills: [695, 696],
        autoAttack: 10061,
        img: "1b8", rarity: 4, evo: 2,
        fullName: "Deimos, Terror Spear II"
    },
    11225: {
        name: "Dein", stats: [14000, 16768, 11098, 11683, 14417],
        skills: [424],
        img: "48e", rarity: 4, evo: 4,
        fullName: "Dein, Silent Bomber II"
    },
    10722: {
        name: "Delphyne", stats: [11990, 14601, 11882, 18858, 11080],
        skills: [288],
        img: "415", rarity: 4, evo: 2,
        fullName: "Delphyne, Thunder Dragon II"
    },
    10503: {
        name: "Desna", stats: [13146, 15089, 14287, 12137, 12378],
        skills: [124],
        img: "245", rarity: 4, evo: 4,
        fullName: "Desna, Mythic Wendigo II"
    },
    10914: {
        name: "Dharva", stats: [14096, 13742, 12280, 11942, 15427],
        skills: [254],
        img: "297", rarity: 4, evo: 4,
        fullName: "Dharva Fangclad II"
    },
    21549: {
        name: "Discordia", stats: [20031, 18525, 19831, 12014, 17989],
        skills: [833],
        autoAttack: 10106,
        img: "42a", rarity: 5, evo: 3,
        fullName: "Discordia, Bringer of Ruin"
    },
    11096: {
        name: "Djinn", stats: [14048, 17363, 13333, 19422, 16605],
        skills: [319, 320],
        img: "18d", rarity: 5, evo: 2,
        fullName: "Djinn of the Lamp II"
    },
    11355: {
        name: "Dong", stats: [13489, 17000, 13196, 8150, 16110],
        skills: [545],
        img: "48b", rarity: 4, evo: 4,
        fullName: "Dong, the Bloody Claw II"
    },
    10423: {
        name: "Doppeladler", stats: [13940, 14709, 14417, 14092, 14850],
        skills: [33],
        img: "168", rarity: 5, evo: 2,
        fullName: "Doppeladler II"
    },
    10691: {
        name: "Dors", stats: [15435, 9433, 13268, 16464, 13019],
        skills: [446],
        img: "11d", rarity: 4, evo: 2,
        fullName: "Dors, Demiwyrm Warrior II"
    },
    11552: {
        name: "Druj", stats: [15024, 12999, 15647, 7005, 17241],
        skills: [835],
        img: "460", rarity: 4, evo: 4,
        fullName: "Druj Nasu, the Impure II"
    },
    11574: {
        name: "Dryad", stats: [15186, 17060, 14449, 6487, 16670],
        skills: [870],
        autoAttack: 10103,
        img: "3c2", rarity: 4, evo: 2,
        fullName: "Dryad Archer II"
    },
    11303: {
        name: "Dunkleosteus", stats: [14000, 8394, 13110, 16620, 15804],
        skills: [477],
        autoAttack: 10007,
        img: "222", rarity: 4, evo: 4,
        fullName: "Dunkleosteus, the Rendmaw II"
    },
    10272: {
        name: "Cat Sidhe", stats: [9614, 8322, 11959, 11243, 10056],
        skills: [18],
        img: "448", rarity: 4, evo: 4,
        fullName: "Earl Cat Sidhe II"
    },
    10619: {
        name: "Ebon", stats: [17493, 15543, 13431, 14330, 13788],
        skills: [157],
        img: "248", rarity: 5, evo: 2,
        fullName: "Ebon Dragon II"
    },
    10756: {
        name: "Edgardo", stats: [10904, 15485, 14389, 8978, 14755],
        skills: [179],
        img: "25f", rarity: 4, evo: 4,
        fullName: "Edgardo, Grand Inquisitor II"
    },
    11450: {
        name: "Elsa", stats: [19010, 19021, 15132, 10018, 17851],
        skills: [602],
        autoAttack: 10039,
        img: "2fe", rarity: 5, evo: 2,
        fullName: "Elsa, Undead Bride II"
    },
    11577: {
        name: "Emerald", stats: [25012, 24383, 21881, 12272, 18208],
        skills: [868],
        autoAttack: 10112,
        img: "342", rarity: 6, evo: 2,
        fullName: "Emerald Dragon II"
    },
    21276: {
        name: "Empusa", stats: [20706, 12623, 16110, 20999, 17510],
        skills: [447],
        autoAttack: 10016,
        img: "30a", rarity: 5, evo: 3,
        fullName: "Empusa, the Death Scythe"
    },
    11514: {
        name: "Eros", stats: [15438, 16292, 14486, 6284, 16668],
        skills: [801],
        img: "38c", rarity: 4, evo: 4,
        fullName: "Eros, the Golden Arrow II"
    },
    11517: {
        name: "Etain", stats: [15511, 7873, 11015, 17038, 17201],
        skills: [704],
        autoAttack: 10064,
        img: "147", rarity: 4, evo: 2,
        fullName: "Etain, Butterfly Tamer II"
    },
    10317: {
        name: "Eton", stats: [10904, 10490, 10490, 12952, 12952],
        skills: [94],
        img: "174", rarity: 4, evo: 4,
        fullName: "Eton, Eater of Darkness II"
    },
    10708: {
        name: "Ettin", stats: [16063, 14482, 14677, 9498, 13702],
        skills: [304],
        autoAttack: 10006,
        img: "31f", rarity: 4, evo: 2,
        fullName: "Ettin II"
    },
    11358: {
        name: "Europa", stats: [14731, 8296, 12207, 16735, 16518],
        skills: [538, 539],
        autoAttack: 10007,
        img: "425", rarity: 4, evo: 2,
        fullName: "Europa, Fallen Heroine II"
    },
    10452: {
        name: "Evil Eye", stats: [10770, 10394, 10490, 12221, 11721],
        skills: [120],
        img: "2bf", rarity: 4, evo: 4,
        fullName: "Evil Eye II"
    },
    11503: {
        name: "Fenghuang", stats: [15218, 7494, 12261, 17190, 16345],
        skills: [686, 687],
        autoAttack: 10019,
        img: "1ce", rarity: 4, evo: 2,
        fullName: "Fenghuang, Bird Divine II"
    },
    10674: {
        name: "Fenrir", stats: [15099, 16865, 22498, 13008, 11167],
        skills: [154],
        img: "1dd", rarity: 5, evo: 2,
        fullName: "Fenrir II"
    },
    21352: {
        name: "Siege Tower", stats: [20007, 19750, 16915, 14021, 17567],
        skills: [548],
        autoAttack: 10029,
        img: "293", rarity: 5, evo: 3,
        fullName: "Ferocious Siege Tower"
    },
    10496: {
        name: "Bat Demon", stats: [12538, 14182, 12648, 11928, 12720],
        skills: [131],
        img: "10e", rarity: 4, evo: 4,
        fullName: "Fiendish Bat Demon II"
    },
    11435: {
        name: "Figgo", stats: [15509, 16377, 13451, 6051, 16534],
        skills: [614],
        img: "275", rarity: 4, evo: 4,
        fullName: "Figgo, Executioner II"
    },
    10849: {
        name: "Fimbul", stats: [12086, 13489, 12562, 16743, 12597],
        skills: [242],
        img: "24a", rarity: 4, evo: 4,
        fullName: "Fimbul Frostclad II"
    },
    10470: {
        name: "Flame Dragon", stats: [14601, 14449, 13756, 15153, 13940],
        skills: [23],
        img: "18e", rarity: 5, evo: 2,
        fullName: "Flame Dragon II"
    },
    10888: {
        name: "Flesh Collector Golem", stats: [17450, 14536, 18089, 8664, 9661],
        skills: [253],
        img: "252", rarity: 4, evo: 2,
        fullName: "Flesh Collector Golem II"
    },
    10606: {
        name: "Fomor", stats: [13052, 14645, 11928, 9967, 9781],
        skills: [138],
        img: "143", rarity: 4, evo: 4,
        fullName: "Fomor the Savage II"
    },
    10473: {
        name: "Freila", stats: [11928, 10490, 12453, 12221, 11417],
        skills: [16],
        img: "3f2", rarity: 4, evo: 4,
        fullName: "Freila the Bountiful II"
    },
    11191: {
        name: "Freyja", stats: [14709, 17125, 14027, 10213, 12380],
        skills: [387],
        img: "3c8", rarity: 4, evo: 2,
        fullName: "Freyja, Earth Goddess II"
    },
    11190: {
        name: "Freyr", stats: [16562, 19909, 15370, 12943, 15998],
        skills: [385, 386],
        img: "151", rarity: 5, evo: 2,
        fullName: "Freyr, God of the Harvest II"
    },
    11115: {
        name: "Bearwolf", stats: [14503, 24513, 11492, 11405, 17992],
        skills: [353],
        img: "25b", rarity: 5, evo: 2,
        fullName: "Frost Bearwolf II"
    },
    10022: {
        name: "Galahad", stats: [6543, 7271, 7349, 6842, 6478],
        skills: [10000, 33, 5],
        isMounted: true,
        img: "4e2", rarity: 4, evo: 2,
        fullName: "Galahad, Drake Knight II"
    },
    11172: {
        name: "Galatea", stats: [19833, 10062, 15825, 18566, 15218],
        skills: [533],
        autoAttack: 10007,
        img: "48a", rarity: 5, evo: 2,
        fullName: "Galatea, Nereid II"
    },
    201: {
        name: "Gan Ceann", stats: [7950, 10530, 8830, 8910, 8540],
        skills: [33],
        img: "2ca", rarity: 4, evo: 1,
        fullName: "Gan Ceann"
    },
    10842: {
        name: "Gargoyle Gatekeeper", stats: [15608, 17602, 14503, 15002, 18035],
        skills: [268],
        img: "277", rarity: 5, evo: 2,
        fullName: "Gargoyle Gatekeeper II"
    },
    21384: {
        name: "Garshasp", stats: [22002, 18058, 20019, 20007, 8223],
        skills: [578],
        autoAttack: 10034,
        img: "225", rarity: 5, evo: 3,
        fullName: "Garshasp, the Juggernaut"
    },
    10609: {
        name: "Garuda", stats: [14417, 14677, 14081, 15814, 15023],
        skills: [47],
        img: "1bf", rarity: 5, evo: 2,
        fullName: "Garuda II"
    },
    10571: {
        name: "Gathgoic", stats: [14839, 16128, 14980, 17948, 14709],
        skills: [141],
        img: "3fb", rarity: 5, evo: 2,
        fullName: "Gathgoic the Other II"
    },
    10742: {
        name: "Gevi", stats: [15565, 15424, 18447, 13593, 11015],
        skills: [180],
        img: "255", rarity: 5, evo: 2,
        fullName: "Gevi, Crystal Troll Master II"
    },
    10088: {
        name: "Ghislandi", stats: [12324, 13551, 13525, 12212, 12187],
        skills: [17],
        img: "468", rarity: 4, evo: 4,
        fullName: "Ghislandi, Iron Heart II"
    },
    11271: {
        name: "Ghislandi L", stats: [18533, 20234, 14590, 10235, 16204],
        skills: [455, 456],
        autoAttack: 10015,
        img: "391", rarity: 5, evo: 2,
        fullName: "Ghislandi, the Unchained II"
    },
    11453: {
        name: "GCE", stats: [15100, 7564, 11403, 17254, 16609],
        skills: [604],
        autoAttack: 10007,
        img: "333", rarity: 4, evo: 4,
        fullName: "Ghost Carriage Express II"
    },
    11304: {
        name: "Gigantopithecus", stats: [24210, 25055, 21946, 13994, 15998],
        skills: [491],
        img: "3e5", rarity: 6, evo: 2,
        fullName: "Gigantopithecus II"
    },
    11375: {
        name: "Gilgamesh", stats: [20115, 19053, 18013, 8220, 16096],
        skills: [558, 559],
        img: "1e1", rarity: 5, evo: 2,
        fullName: "Gilgamesh the Bold II"
    },
    10177: {
        name: "Goblin King", stats: [8144, 8339, 6400, 10159, 10278],
        skills: [18],
        img: "34f", rarity: 4, evo: 2,
        fullName: "Goblin King II"
    },
    10011: {
        name: "Gorgon", stats: [10170, 12436, 8652, 12773, 10924],
        skills: [18],
        img: "46f", rarity: 4, evo: 4,
        fullName: "Gorgon II"
    },
    10611: {
        name: "Gorlin", stats: [11928, 12380, 17000, 6809, 10904],
        skills: [167],
        img: "150", rarity: 4, evo: 4,
        fullName: "Gorlin Gold Helm II"
    },
    10720: {
        name: "Goviel", stats: [14135, 14547, 13604, 14926, 16616],
        skills: [204],
        img: "290", rarity: 5, evo: 2,
        fullName: "Goviel, Hail Knight II"
    },
    10551: {
        name: "Grandor", stats: [14709, 17277, 15738, 13756, 11903],
        skills: [149],
        img: "365", rarity: 5, evo: 2,
        fullName: "Grandor, Giant of Old II"
    },
    10586: {
        name: "Gregoire", stats: [11708, 12121, 10318, 14854, 10159],
        skills: [144],
        img: "308", rarity: 4, evo: 4,
        fullName: "Gregoire, Weaponmaster II"
    },
    11131: {
        name: "Gregory", stats: [16192, 16121, 15558, 9794, 10294],
        skills: [372],
        img: "248", rarity: 4, evo: 4,
        fullName: "Gregory, the Masked Slayer II"
    },
    10791: {
        name: "Grellas", stats: [12066, 14796, 10636, 17374, 13073],
        skills: [212],
        img: "211", rarity: 4, evo: 2,
        fullName: "Grellas Fellstaff II"
    },
    21216: {
        name: "Gremory", stats: [18466, 12819, 18945, 20426, 17009],
        skills: [411],
        autoAttack: 10007,
        img: "20b", rarity: 5, evo: 3,
        fullName: "Gremory, the Vermilion Moon"
    },
    10784: {
        name: "Gretch", stats: [16280, 15305, 12683, 15652, 13875],
        skills: [196],
        img: "3a9", rarity: 5, evo: 2,
        fullName: "Gretch, Chimaera Mistress II"
    },
    10182: {
        name: "Griffin", stats: [11887, 9909, 14391, 14263, 11960],
        skills: [2],
        img: "457", rarity: 4, evo: 4,
        fullName: "Griffin Mount II"
    },
    361: {
        name: "Griflet", stats: [11520, 12970, 11430, 10110, 13780],
        skills: [10],
        img: "2b1", rarity: 5, evo: 1,
        fullName: "Griflet, Falcon Knight"
    },
    10276: {
        name: "Grim", stats: [11001, 13047, 8888, 13026, 11060],
        skills: [109],
        img: "17f", rarity: 4, evo: 4,
        fullName: "Grim Executioner II"
    },
    10925: {
        name: "Grimoire", stats: [15231, 18609, 10441, 8064, 15451],
        skills: [134],
        img: "49b", rarity: 4, evo: 4,
        fullName: "Grimoire Beast II"
    },
    11579: {
        name: "Gryla", stats: [17049, 4363, 15489, 16594, 15500],
        skills: [879, 880],
        autoAttack: 10007,
        isMounted: true,
        img: "3a9", rarity: 4, evo: 2,
        fullName: "Gryla, Swap II"
    },
    11170: {
        name: "Gryla", stats: [16529, 11622, 15868, 15294, 8740],
        skills: [308, 316],
        isMounted: true,
        img: "2c3", rarity: 4, evo: 2,
        fullName: "Gryla, the Lullaby II"
    },
    21285: {
        name: "Guillaume", stats: [21515, 20887, 16308, 12948, 18505],
        skills: [466, 467],
        img: "122", rarity: 5, evo: 3,
        fullName: "Guillaume, Fanatic"
    },
    10898: {
        name: "Hamad", stats: [10294, 10367, 9881, 16416, 10951],
        skills: [265],
        img: "3fd", rarity: 4, evo: 4,
        fullName: "Hamad, the Sweeping Wind II"
    },
    10861: {
        name: "Haokah", stats: [13476, 13928, 11111, 15706, 13245],
        skills: [232],
        img: "198", rarity: 4, evo: 4,
        fullName: "Haokah, the Lightning Brave II"
    },
    11428: {
        name: "Hash", stats: [15034, 13485, 12532, 10441, 17147],
        skills: [641],
        img: "112", rarity: 4, evo: 2,
        fullName: "Hash, Lizardman Cannoneer II"
    },
    11493: {
        name: "Hati", stats: [15002, 8144, 10777, 17721, 16995],
        skills: [675],
        autoAttack: 10059,
        img: "230", rarity: 4, evo: 2,
        fullName: "Hati, Icetail Wolf II"
    },
    11451: {
        name: "Hatshepsut", stats: [17049, 16334, 13041, 6097, 16096],
        skills: [603],
        autoAttack: 10040,
        img: "2bd", rarity: 4, evo: 2,
        fullName: "Hatshepsut, Mummy Queen II"
    },
    11543: {
        name: "He Qiong", stats: [24253, 14243, 22206, 23051, 17992],
        skills: [827],
        autoAttack: 10007,
        img: "359", rarity: 6, evo: 2,
        fullName: "He Qiong, the Transcendent II"
    },
    11478: {
        name: "Hecatoncheir", stats: [15509, 15158, 14024, 8759, 15706],
        skills: [676],
        img: "2e5", rarity: 4, evo: 4,
        fullName: "Hecatoncheir Rimetouch II"
    },
    10951: {
        name: "Hecatoncheir", stats: [11807, 13902, 14768, 13928, 13366],
        skills: [264],
        img: "488", rarity: 4, evo: 4,
        fullName: "Hecatoncheir the Adamantine II"
    },
    21312: {
        name: "Hei Long", stats: [20486, 13485, 16192, 20881, 17113],
        skills: [496],
        autoAttack: 10019,
        img: "1bd", rarity: 5, evo: 3,
        fullName: "Hei Long, the New Moon"
    },
    10465: {
        name: "Heinrich", stats: [16887, 13940, 15132, 13290, 14005],
        skills: [133],
        img: "305", rarity: 5, evo: 2,
        fullName: "Heinrich the Bold II"
    },
    10634: {
        name: "Hel", stats: [14709, 17450, 14709, 15771, 18057],
        skills: [239, 240],
        img: "1e8", rarity: 5, evo: 2,
        fullName: "Hel, Goddess of Death II"
    },
    10895: {
        name: "Hercinia", stats: [14062, 13414, 12562, 12686, 15876],
        skills: [225],
        img: "1a4", rarity: 4, evo: 4,
        fullName: "Hercinia the Blest II"
    },
    11202: {
        name: "Hereward", stats: [14927, 14000, 12524, 10951, 15498],
        skills: [391],
        img: "105", rarity: 4, evo: 4,
        fullName: "Hereward, Storm of Arrows II"
    },
    11073: {
        name: "Hippocamp", stats: [14514, 16486, 14926, 19855, 15002],
        skills: [360, 167],
        img: "4f8", rarity: 5, evo: 2,
        fullName: "Hippocamp II"
    },
    10560: {
        name: "Hippogriff", stats: [9978, 11063, 11942, 9295, 10074],
        skills: [133],
        img: "43e", rarity: 4, evo: 4,
        fullName: "Hippogriff of Rites II"
    },
    10726: {
        name: "Hlokk", stats: [14328, 14462, 12832, 9271, 17133],
        skills: [502, 503],
        img: "37a", rarity: 4, evo: 4,
        fullName: "Hlokk, Blade of Thunder II"
    },
    10635: {
        name: "Hollofernyiges", stats: [16551, 16757, 13875, 14568, 16941],
        skills: [33],
        img: "320", rarity: 5, evo: 2,
        fullName: "Hollofernyiges II"
    },
    11297: {
        name: "Hoska", stats: [18996, 7906, 15096, 17023, 8881],
        skills: [484, 485],
        autoAttack: 10016,
        img: "26c", rarity: 4, evo: 4,
        fullName: "Hoska, the Firestroke II"
    },
    11540: {
        name: "Houdi", stats: [13293, 6006, 10001, 15498, 12001],
        skills: [822],
        autoAttack: 10003,
        img: "14b", rarity: 4, evo: 4,
        fullName: "Houdi, the Illusory Flame II"
    },
    10704: {
        name: "Hraesvelg", stats: [12499, 17472, 11784, 12662, 13799],
        skills: [251],
        img: "3cd", rarity: 4, evo: 2,
        fullName: "Hraesvelg, Corpse Feaster II"
    },
    10715: {
        name: "Hrimthurs", stats: [13414, 15572, 16144, 9783, 10600],
        skills: [205],
        img: "2e9", rarity: 4, evo: 4,
        fullName: "Hrimthurs the Blizzard II"
    },
    11401: {
        name: "Huan", stats: [14005, 14406, 13106, 9997, 16096],
        skills: [577],
        img: "1d4", rarity: 4, evo: 2,
        fullName: "Huan, Doomcaller II"
    },
    10980: {
        name: "Hundred-eyed Warrior", stats: [17385, 18501, 15641, 10452, 17634],
        skills: [289],
        img: "221", rarity: 5, evo: 2,
        fullName: "Hundred-eyed Warrior II"
    },
    10970: {
        name: "Hypnos", stats: [16291, 17277, 15446, 12488, 17992],
        skills: [274],
        img: "43b", rarity: 5, evo: 2,
        fullName: "Hypnos, Lord of Dreams II"
    },
    11393: {
        name: "Icarus", stats: [15186, 14796, 14005, 7137, 17363],
        skills: [568, 569],
        img: "194", rarity: 4, evo: 2,
        fullName: "Icarus, Fallen Hero II"
    },
    11569: {
        name: "Icemelt", stats: [11794, 8101, 8502, 14402, 14000],
        skills: [858],
        img: "408", rarity: 4, evo: 4,
        fullName: "Icemelt Dragon II"
    },
    10688: {
        name: "Ignis", stats: [11022, 11312, 10818, 13460, 12859],
        skills: [164],
        img: "22f", rarity: 4, evo: 2,
        fullName: "Ignis Fatuus II"
    },
    11064: {
        name: "Ijiraq L", stats: [16995, 14449, 17006, 19508, 12987],
        skills: [328, 329],
        img: "33c", rarity: 5, evo: 2,
        fullName: "Ijiraq the Brinicle II"
    },
    10706: {
        name: "Ijiraq", stats: [13929, 14536, 9791, 17797, 12012],
        skills: [168],
        img: "21b", rarity: 4, evo: 2,
        fullName: "Ijiraq, the Glacier II"
    },
    21104: {
        name: "IIG", stats: [23155, 19935, 21027, 8440, 17505],
        skills: [444, 445],
        img: "15f", rarity: 5, evo: 3,
        fullName: "Impregnable Iron Golem"
    },
    11144: {
        name: "Infested Cyclops", stats: [19508, 19508, 15392, 9997, 15348],
        skills: [364],
        img: "3db", rarity: 5, evo: 2,
        fullName: "Infested Cyclops II"
    },
    11120: {
        name: "Infested Minotaur", stats: [13691, 15294, 16031, 9390, 14070],
        skills: [299, 301],
        img: "3ab", rarity: 4, evo: 2,
        fullName: "Infested Minotaur II"
    },
    10319: {
        name: "Peryton", stats: [10904, 9674, 10490, 10490, 12952],
        skills: [33],
        img: "12b", rarity: 4, evo: 4,
        fullName: "Infested Peryton II"
    },
    11342: {
        name: "Ghost Ship", stats: [15365, 12879, 11928, 10951, 16803],
        skills: [525],
        img: "20f", rarity: 4, evo: 4,
        fullName: "Inhabited Ghost Ship II"
    },
    21416: {
        name: "Mercury", stats: [22700, 20970, 18517, 12020, 18005],
        skills: [814, 815],
        img: "3d8", rarity: 5, evo: 3,
        fullName: "Intrepid Hand of Mercury"
    },
    21475: {
        name: "Uranus", stats: [21943, 9529, 18525, 20649, 17742],
        skills: [674],
        autoAttack: 10058,
        img: "3d5", rarity: 5, evo: 3,
        fullName: "Intrepid Hand of Uranus"
    },
    21511: {
        name: "Venus", stats: [21967, 19039, 19982, 18011, 9391],
        skills: [709],
        autoAttack: 10066,
        img: "21d", rarity: 5, evo: 3,
        fullName: "Intrepid Hand of Venus"
    },
    693: {
        name: "Ioskeha", stats: [13138, 13611, 11162, 15329, 13675],
        skills: [160],
        img: "222", rarity: 4, evo: 2,
        fullName: "Ioskeha"
    },
    10592: {
        name: "Ira", stats: [12832, 14489, 8770, 11172, 17254],
        skills: [138],
        img: "46c", rarity: 4, evo: 4,
        fullName: "Ira, Hypnotic Specter II"
    },
    10681: {
        name: "Iron Golem", stats: [16778, 13615, 17818, 9867, 8848],
        skills: [152],
        img: "29f", rarity: 4, evo: 2,
        fullName: "Iron Golem II"
    },
    11594: {
        name: "Isegrim", stats: [12573, 12928, 12049, 8491, 9515],
        skills: [889],
        img: "31d", rarity: 4, evo: 4,
        fullName: "Isegrim, the Lone Wolf II"
    },
    10746: {
        name: "Iseult", stats: [12731, 10977, 11708, 15865, 14193],
        skills: [144],
        img: "13b", rarity: 4, evo: 4,
        fullName: "Iseult the Redeemer II"
    },
    11376: {
        name: "Ishtar", stats: [16009, 16074, 13106, 9022, 14265],
        skills: [560, 561],
        img: "24d", rarity: 4, evo: 2,
        fullName: "Ishtar, Goddess of Love II"
    },
    11351: {
        name: "Ivy", stats: [16341, 3882, 13803, 15889, 17998],
        skills: [536],
        autoAttack: 10026,
        img: "373", rarity: 4, evo: 4,
        fullName: "Ivy the Verdant II"
    },
    11407: {
        name: "Ixtab", stats: [20007, 8502, 17472, 17504, 18013],
        skills: [588, 589],
        autoAttack: 10031,
        img: "294", rarity: 5, evo: 2,
        fullName: "Ixtab, Guardian of the Dead II"
    },
    11009: {
        name: "Jabberwock", stats: [13994, 16193, 13008, 19508, 18024],
        skills: [271, 270],
        img: "41f", rarity: 5, evo: 2,
        fullName: "Jabberwock, Phantom Dragon II"
    },
    11169: {
        name: "Jack", stats: [13507, 9000, 12196, 16204, 16995],
        skills: [333],
        autoAttack: 10009,
        img: "10b", rarity: 4, evo: 2,
        fullName: "Jack o' Frost II"
    },
    11448: {
        name: "Jack Rusty", stats: [17021, 16123, 10148, 9539, 15121],
        skills: [609],
        autoAttack: 10044,
        img: "46a", rarity: 4, evo: 4,
        fullName: "Jack, the Rusty II"
    },
    21558: {
        name: "Jarilo", stats: [20987, 21955, 18023, 12050, 17965],
        skills: [841],
        autoAttack: 10109,
        img: "31b", rarity: 5, evo: 3,
        fullName: "Jarilo, God of Fertility"
    },
    11523: {
        name: "Jason", stats: [15348, 18024, 11015, 8978, 16876],
        skills: [802, 803],
        img: "4c7", rarity: 4, evo: 2,
        fullName: "Jason, Fallen Hero II"
    },
    10569: {
        name: "Jinx-eye", stats: [14709, 15998, 13832, 13832, 14915],
        skills: [146],
        img: "1c4", rarity: 5, evo: 2,
        fullName: "Jinx-eye Dragon II"
    },
    11266: {
        name: "Jormungandr", stats: [13024, 16768, 11756, 10112, 15889],
        skills: [438],
        autoAttack: 10012,
        img: "397", rarity: 4, evo: 4,
        fullName: "Jormungandr, World Serpent II"
    },
    11536: {
        name: "Juno", stats: [19552, 18501, 17006, 17992, 9000],
        skills: [817, 818],
        img: "489", rarity: 5, evo: 2,
        fullName: "Juno, Goddess of Affection II"
    },
    10510: {
        name: "Kagemaru", stats: [14319, 16973, 13940, 13420, 14568],
        skills: [137],
        img: "430", rarity: 5, evo: 2,
        fullName: "Kagemaru, Master Ninja II"
    },
    21463: {
        name: "Kaikias", stats: [22014, 20007, 18560, 12611, 17742],
        skills: [647],
        autoAttack: 10050,
        img: "350", rarity: 5, evo: 3,
        fullName: "Kaikias, the Hail God"
    },
    11121: {
        name: "Kalevan", stats: [12629, 18013, 11914, 12055, 13821],
        skills: [297, 240],
        img: "3bd", rarity: 4, evo: 2,
        fullName: "Kalevan, the Forest Green II"
    },
    10804: {
        name: "Kangana", stats: [15803, 18750, 14872, 12813, 13247],
        skills: [216],
        img: "2b1", rarity: 5, evo: 2,
        fullName: "Kangana, the Maelstrom II"
    },
    11544: {
        name: "Karna", stats: [19324, 20310, 15478, 11004, 17461],
        skills: [828],
        autoAttack: 10103,
        img: "365", rarity: 5, evo: 2,
        fullName: "Karna, the Red Eye II"
    },
    10789: {
        name: "Katiria", stats: [10807, 11318, 11356, 10245, 11623],
        skills: [156],
        img: "2b6", rarity: 4, evo: 4,
        fullName: "Katiria Nullblade II"
    },
    11125: {
        name: "Kekro", stats: [17992, 12001, 15002, 19660, 16302],
        skills: [379],
        autoAttack: 10007,
        img: "33b", rarity: 5, evo: 2,
        fullName: "Kekro, Demiwyrm Magus II"
    },
    10767: {
        name: "Kelaino", stats: [12538, 12707, 10490, 15047, 14999],
        skills: [197],
        img: "405", rarity: 4, evo: 4,
        fullName: "Kelaino, the Dark Cloud II"
    },
    11532: {
        name: "Kibitsuhiko", stats: [19335, 18642, 16562, 11448, 17981],
        skills: [809, 810],
        img: "38d", rarity: 5, evo: 2,
        fullName: "Kibitsuhiko, Ogre Slayer II"
    },
    11381: {
        name: "Kijin", stats: [17047, 3323, 14038, 17402, 16110],
        skills: [566],
        autoAttack: 10031,
        img: "23a", rarity: 4, evo: 4,
        fullName: "Kijin, Heavenly Maiden II"
    },
    11279: {
        name: "Kobold", stats: [14207, 14462, 15804, 8442, 14999],
        skills: [449],
        img: "16e", rarity: 4, evo: 4,
        fullName: "Kobold Guard Captain II"
    },
    11502: {
        name: "Kokopelli", stats: [19584, 18858, 13799, 11102, 18187],
        skills: [684, 685],
        isMounted: true,
        img: "210", rarity: 5, evo: 2,
        fullName: "Kokopelli Mana II"
    },
    11524: {
        name: "Kokuanten", stats: [18999, 7050, 19996, 20505, 13994],
        skills: [697, 698],
        autoAttack: 10003,
        img: "2ad", rarity: 5, evo: 2,
        fullName: "Kokuanten, the Ominous II"
    },
    11519: {
        name: "Koroku", stats: [15341, 16561, 13013, 7492, 16853],
        skills: [705],
        autoAttack: 10065,
        img: "11f", rarity: 4, evo: 4,
        fullName: "Koroku, the Death Stinger II"
    },
    11516: {
        name: "Kotyangwuti", stats: [18512, 9509, 15023, 20028, 17992],
        skills: [703],
        autoAttack: 10063,
        img: "3ce", rarity: 5, evo: 2,
        fullName: "Kotyangwuti, Spider Spirit II"
    },
    11314: {
        name: "Kua Fu", stats: [16510, 16561, 12207, 9174, 13476],
        skills: [497],
        img: "3e3", rarity: 4, evo: 4,
        fullName: "Kua Fu, Sun Chaser II"
    },
    10911: {
        name: "Kyteler", stats: [11721, 12524, 9892, 17254, 16416],
        skills: [258],
        img: "4d4", rarity: 4, evo: 4,
        fullName: "Kyteler the Corrupted II"
    },
    11506: {
        name: "Lachesis", stats: [17992, 9596, 15002, 19205, 17753],
        skills: [689, 690],
        autoAttack: 10003,
        img: "2ba", rarity: 5, evo: 2,
        fullName: "Lachesis, the Measurer II"
    },
    10985: {
        name: "Lahamu", stats: [14024, 10784, 15999, 16010, 11001],
        skills: [281],
        autoAttack: 10004,
        img: "2fe", rarity: 4, evo: 4,
        fullName: "Lahamu, Royal Viper II"
    },
    21372: {
        name: "Lamashtu", stats: [20579, 17977, 20007, 12062, 17685],
        skills: [555],
        img: "2e5", rarity: 5, evo: 3,
        fullName: "Lamashtu, Fell Goddess"
    },
    10432: {
        name: "Lanvall", stats: [12914, 14639, 12245, 12210, 15040],
        skills: [18],
        img: "163", rarity: 4, evo: 4,
        fullName: "Lanvall, Lizard Cavalier II"
    },
    11347: {
        name: "Lava Dragon", stats: [19021, 8881, 16237, 18891, 16497],
        skills: [534, 535],
        autoAttack: 10019,
        img: "3de", rarity: 5, evo: 2,
        fullName: "Lava Dragon II"
    },
    21590: {
        name: "Lenore", stats: [13182, 9455, 12120, 8404, 12900],
        skills: [884],
        img: "271", rarity: 4, evo: 2,
        fullName: "Lenore, the False II"
    },
    11590: {
        name: "Lenore", stats: [15903, 12280, 13745, 8709, 17292],
        skills: [883],
        autoAttack: 10061,
        img: "1e6", rarity: 4, evo: 4,
        fullName: "Lenore, the Sly Fox II"
    },
    11128: {
        name: "Leupold", stats: [17585, 11038, 12963, 9794, 16510],
        skills: [378],
        img: "4ca", rarity: 4, evo: 4,
        fullName: "Leupold, Wyvern Knight II"
    },
    10852: {
        name: "Libuse", stats: [11221, 13782, 13379, 16048, 13038],
        skills: [245],
        img: "27e", rarity: 4, evo: 4,
        fullName: "Libuse, the Black Queen II"
    },
    10933: {
        name: "Linnorm", stats: [12326, 11102, 11979, 16605, 16497],
        skills: [313],
        img: "30b", rarity: 4, evo: 2,
        fullName: "Linnorm, the Hailstorm II"
    },
    21433: {
        name: "Liza", stats: [22491, 9517, 16542, 21861, 18011],
        skills: [613],
        autoAttack: 10045,
        img: "4ff", rarity: 5, evo: 3,
        fullName: "Liza, Blood-Anointed"
    },
    21187: {
        name: "Loki", stats: [19202, 21231, 16192, 15119, 15806],
        skills: [382],
        img: "47b", rarity: 5, evo: 3,
        fullName: "Loki, God of Cunning"
    },
    11316: {
        name: "Long Feng", stats: [15164, 17125, 13539, 10452, 12207],
        skills: [501],
        img: "2ad", rarity: 4, evo: 2,
        fullName: "Long Feng, the Dragon Fist II"
    },
    11576: {
        name: "Lubberkin", stats: [15793, 12965, 16144, 6078, 17060],
        skills: [871],
        autoAttack: 10061,
        img: "1fc", rarity: 4, evo: 4,
        fullName: "Lubberkin, Four Leaf Clover II"
    },
    11440: {
        name: "Lucan", stats: [25304, 22011, 18349, 17916, 18154],
        skills: [634],
        autoAttack: 10049,
        img: "419", rarity: 6, evo: 2,
        fullName: "Lucan, Eagle Knight II"
    },
    10754: {
        name: "Lucia", stats: [17106, 13878, 16633, 9881, 10857],
        skills: [16],
        img: "197", rarity: 4, evo: 4,
        fullName: "Lucia, Petal-Shears II"
    },
    11485: {
        name: "Luot", stats: [18013, 17992, 17006, 9997, 18035],
        skills: [668],
        autoAttack: 10054,
        img: "2c3", rarity: 5, evo: 2,
        fullName: "Luot, Scout II"
    },
    10794: {
        name: "Ma-Gu", stats: [14182, 12438, 11477, 15306, 12438],
        skills: [4],
        img: "2a8", rarity: 4, evo: 4,
        fullName: "Ma-Gu the Enlightened II"
    },
    11535: {
        name: "Macaca", stats: [13962, 13671, 12025, 6368, 9453],
        skills: [813],
        img: "2a6", rarity: 4, evo: 4,
        fullName: "Macaca, the Headlong II"
    },
    11141: {
        name: "Lynx", stats: [14207, 14062, 12500, 10014, 17147],
        skills: [493],
        img: "321", rarity: 4, evo: 4,
        fullName: "Madprowl Lynx II"
    },
    10558: {
        name: "Magdal", stats: [13929, 15110, 15132, 13810, 15359],
        skills: [120],
        img: "1c0", rarity: 5, evo: 2,
        fullName: "Magdal Dragonheart II"
    },
    11126: {
        name: "Magdal M", stats: [18728, 20917, 21491, 23235, 15998],
        skills: [336],
        img: "346", rarity: 6, evo: 2,
        fullName: "Magdal, Dragonmaster II"
    },
    11429: {
        name: "Maisie", stats: [19194, 19097, 16258, 8101, 17905],
        skills: [599, 600],
        autoAttack: 10037,
        img: "1da", rarity: 5, evo: 2,
        fullName: "Maisie, Grimoire Keeper II"
    },
    10365: {
        name: "Makalipon", stats: [10343, 8405, 10611, 12280, 10343],
        skills: [60],
        img: "1f1", rarity: 4, evo: 4,
        fullName: "Makalipon, Sacred Fruit II"
    },
    11456: {
        name: "Chimaera", stats: [19519, 9986, 16009, 17038, 18013],
        skills: [612, 134],
        autoAttack: 10043,
        img: "4a7", rarity: 5, evo: 2,
        fullName: "Maleficent Chimaera II"
    },
    10445: {
        name: "Managarmr", stats: [12210, 12258, 13266, 13887, 11688],
        skills: [108],
        img: "151", rarity: 4, evo: 4,
        fullName: "Managarmr Frost Touch II"
    },
    11280: {
        name: "Managarmr M", stats: [20007, 21599, 17396, 23907, 18100],
        skills: [463],
        autoAttack: 10007,
        img: "42b", rarity: 6, evo: 2,
        fullName: "Managarmr, the Frost Moon II"
    },
    11319: {
        name: "Manannan", stats: [16551, 10668, 16464, 19227, 16605],
        skills: [513, 514],
        autoAttack: 10007,
        img: "4a4", rarity: 5, evo: 2,
        fullName: "Manannan mac Lir II"
    },
    10792: {
        name: "Marchosias", stats: [18165, 15424, 12781, 18566, 13561],
        skills: [210],
        img: "271", rarity: 5, evo: 2,
        fullName: "Marchosias, Pit Beast II"
    },
    11136: {
        name: "Marcus", stats: [12317, 16534, 14255, 8991, 15438],
        skills: [358],
        img: "353", rarity: 4, evo: 4,
        fullName: "Marcus, Brave of Liberation II"
    },
    332: {
        name: "Mari", stats: [10500, 10980, 10850, 13370, 11500],
        skills: [47],
        img: "1e4", rarity: 5, evo: 1,
        fullName: "Mari the Witch"
    },
    11013: {
        name: "Marraco", stats: [18716, 15876, 17254, 7381, 8809],
        skills: [167, 61],
        img: "47b", rarity: 4, evo: 4,
        fullName: "Marraco, Crusted Wyrm II"
    },
    10656: {
        name: "Mathilda", stats: [11841, 15172, 10639, 12718, 15218],
        skills: [115],
        img: "368", rarity: 4, evo: 4,
        fullName: "Mathilda the Tarantula II"
    },
    10632: {
        name: "Doog", stats: [10560, 10549, 10777, 14330, 11925],
        skills: [94],
        img: "409", rarity: 4, evo: 2,
        fullName: "Mauthe Doog II"
    },
    11550: {
        name: "Medea", stats: [17493, 18598, 17493, 10300, 5999],
        skills: [834],
        autoAttack: 10107,
        img: "37b", rarity: 4, evo: 2,
        fullName: "Medea, Vengeful Queen II"
    },
    10705: {
        name: "Melanippe", stats: [16139, 16800, 13929, 11849, 15132],
        skills: [195],
        img: "44f", rarity: 5, evo: 2,
        fullName: "Melanippe, Wolfrider II"
    },
    11214: {
        name: "Melek", stats: [19097, 16107, 21545, 12792, 10094],
        skills: [374, 375],
        img: "219", rarity: 5, evo: 2,
        fullName: "Melek, the Black Peacock II"
    },
    10527: {
        name: "Melusine", stats: [11417, 11976, 10490, 13562, 11210],
        skills: [155],
        img: "272", rarity: 4, evo: 4,
        fullName: "Melusine the Witch II"
    },
    11305: {
        name: "Microraptor", stats: [16172, 18577, 14406, 14092, 17753],
        skills: [492],
        img: "414", rarity: 5, evo: 2,
        fullName: "Microraptor II"
    },
    11212: {
        name: "Millarca", stats: [15305, 10668, 15565, 21393, 18046],
        skills: [407, 408],
        autoAttack: 10007,
        img: "2ff", rarity: 5, evo: 2,
        fullName: "Millarca, Lady of Thorns II"
    },
    11134: {
        name: "Minerva", stats: [14590, 18024, 14438, 15435, 18013],
        skills: [357],
        img: "2a2", rarity: 5, evo: 2,
        fullName: "Minerva, Goddess of War II"
    },
    11533: {
        name: "Momoso", stats: [15034, 16973, 11925, 9997, 15836],
        skills: [811, 812],
        img: "39b", rarity: 4, evo: 2,
        fullName: "Momoso, Pheasant Tamer II"
    },
    11081: {
        name: "Moni", stats: [13562, 15537, 12121, 10234, 16448],
        skills: [340],
        img: "343", rarity: 4, evo: 4,
        fullName: "Moni the Dismemberer II"
    },
    10621: {
        name: "Montu", stats: [12952, 12904, 12269, 12269, 15306],
        skills: [170],
        img: "21d", rarity: 4, evo: 4,
        fullName: "Montu, God of War II"
    },
    308: {
        name: "Mordred", stats: [11000, 12050, 10950, 11000, 12500],
        skills: [18],
        img: "16b", rarity: 5, evo: 1,
        fullName: "Mordred, Drake Knight"
    },
    10625: {
        name: "Moren", stats: [8502, 11318, 7759, 16803, 8039],
        skills: [10000, 71, 85],
        isMounted: true,
        img: "34a", rarity: 4, evo: 4,
        fullName: "Moren, Rime Mage II"
    },
    11233: {
        name: "Musashi", stats: [20592, 24752, 19151, 17981, 18024],
        skills: [404],
        img: "11f", rarity: 6, evo: 2,
        fullName: "Musashi, the Twinblade II"
    },
    10186: {
        name: "Naberius", stats: [9563, 9552, 7828, 11208, 11298],
        skills: [18],
        img: "2e9", rarity: 4, evo: 4,
        fullName: "Naberius II"
    },
    10949: {
        name: "Najeeba", stats: [16230, 7539, 10660, 16681, 16803],
        skills: [642],
        autoAttack: 10003,
        img: "48a", rarity: 4, evo: 4,
        fullName: "Najeeba, the Mapleblade II"
    },
    11015: {
        name: "Narmer", stats: [15876, 12194, 15172, 8870, 15924],
        skills: [260],
        img: "12d", rarity: 4, evo: 4,
        fullName: "Narmer, Mummy King II"
    },
    10989: {
        name: "Nehasim", stats: [12707, 16071, 11390, 12466, 15172],
        skills: [294],
        img: "28b", rarity: 4, evo: 4,
        fullName: "Nehasim the Seething II"
    },
    11057: {
        name: "Neith", stats: [18999, 19660, 15002, 12001, 15305],
        skills: [326],
        img: "23b", rarity: 5, evo: 2,
        fullName: "Neith, Goddess of War II"
    },
    21291: {
        name: "Nephthys", stats: [21015, 11985, 18202, 22005, 16912],
        skills: [471, 472],
        autoAttack: 10007,
        img: "116", rarity: 5, evo: 3,
        fullName: "Nephthys, Ruler of Death"
    },
    10994: {
        name: "Nergal", stats: [13008, 15392, 11947, 11643, 16518],
        skills: [282],
        img: "175", rarity: 4, evo: 2,
        fullName: "Nergal, Abyssal Overseer II"
    },
    11079: {
        name: "Nightblade", stats: [12196, 16995, 13528, 10896, 14915],
        skills: [341],
        img: "164", rarity: 4, evo: 2,
        fullName: "Nightblade, Archsage of Winds II"
    },
    11369: {
        name: "Nin-Ridu", stats: [16529, 16215, 11351, 10495, 14005],
        skills: [505],
        autoAttack: 10022,
        img: "239", rarity: 4, evo: 2,
        fullName: "Nin-Ridu"
    },
    11564: {
        name: "Ninurta", stats: [13465, 6954, 10332, 14120, 11077],
        skills: [848],
        autoAttack: 10007,
        img: "292", rarity: 4, evo: 4,
        fullName: "Ninurta, the Thunderclap II"
    },
    10799: {
        name: "Niu Mo Wang", stats: [14276, 17071, 15998, 13420, 13138],
        skills: [133],
        img: "126", rarity: 5, evo: 2,
        fullName: "Niu Mo Wang II"
    },
    10438: {
        name: "Odin Stormgod", stats: [12855, 14346, 12378, 14929, 12245],
        skills: [119],
        img: "15c", rarity: 4, evo: 4,
        fullName: "Odin Stormgod II"
    },
    11267: {
        name: "Odin L", stats: [15110, 16562, 13875, 17363, 18057],
        skills: [440, 441],
        isMounted: true,
        img: "365", rarity: 5, evo: 2,
        fullName: "Odin, God of Victory II"
    },
    11458: {
        name: "Odoa", stats: [20364, 24600, 16009, 10040, 9520],
        skills: [645, 646],
        img: "1a6", rarity: 5, evo: 2,
        fullName: "Odoa, the Scarecrow II"
    },
    11562: {
        name: "Oka", stats: [16042, 5122, 12120, 17959, 17244],
        skills: [846, 847],
        autoAttack: 10007,
        img: "275", rarity: 4, evo: 2,
        fullName: "Oka, Kunoichi II"
    },
    21465: {
        name: "Okypete Shd.", stats: [12889, 10506, 13084, 6313, 13214],
        skills: [649],
        img: "203", rarity: 4, evo: 2,
        fullName: "Okypete, the Night Breeze II"
    },
    11465: {
        name: "Okypete", stats: [15610, 13331, 15158, 6967, 16840],
        skills: [648],
        autoAttack: 10051,
        img: "39d", rarity: 4, evo: 4,
        fullName: "Okypete, the Swiftwing II"
    },
    11446: {
        name: "Olan", stats: [16497, 14048, 14113, 6779, 17255],
        skills: [610, 611],
        img: "36b", rarity: 4, evo: 2,
        fullName: "Olan, Tricky Succubus II"
    },
    10889: {
        name: "Olitiau", stats: [14081, 15760, 11676, 11232, 15197],
        skills: [221],
        img: "133", rarity: 4, evo: 2,
        fullName: "Olitiau, the Great Bat II"
    },
    10505: {
        name: "Oniroku", stats: [12207, 13731, 12235, 12194, 13621],
        skills: [115],
        img: "196", rarity: 4, evo: 4,
        fullName: "Oniroku the Slayer II"
    },
    11531: {
        name: "Onra", stats: [15719, 16416, 15147, 6710, 15147],
        skills: [807],
        img: "155", rarity: 4, evo: 4,
        fullName: "Onra, Ogre Lord II"
    },
    21531: {
        name: "Onra", stats: [13377, 13496, 12250, 7516, 9368],
        skills: [808],
        img: "3b8", rarity: 4, evo: 2,
        fullName: "Onra, Ogre of Darkness II"
    },
    11088: {
        name: "Ovinnik", stats: [19010, 11210, 20592, 16627, 12315],
        skills: [356, 342],
        autoAttack: 10007,
        img: "3c1", rarity: 5, evo: 2,
        fullName: "Ovinnik, Hex Beast II"
    },
    11408: {
        name: "Pakal", stats: [15435, 15175, 10777, 10018, 17103],
        skills: [590, 591],
        img: "168", rarity: 4, evo: 2,
        fullName: "Pakal, Jade King II"
    },
    11286: {
        name: "Aquarius", stats: [16323, 7494, 11448, 17363, 16009],
        skills: [450, 451],
        autoAttack: 10007,
        img: "2b9", rarity: 4, evo: 2,
        fullName: "Paladin of Aquarius II"
    },
    11210: {
        name: "Aries", stats: [14395, 15543, 16854, 9011, 12813],
        skills: [392, 393],
        img: "337", rarity: 4, evo: 2,
        fullName: "Paladin of Aries II"
    },
    11310: {
        name: "Cancer", stats: [16627, 17201, 10408, 7494, 16908],
        skills: [478, 479],
        img: "24e", rarity: 4, evo: 2,
        fullName: "Paladin of Cancer II"
    },
    11301: {
        name: "Capricorn", stats: [14937, 8491, 13507, 16551, 15099],
        skills: [476],
        autoAttack: 10007,
        img: "2f4", rarity: 4, evo: 2,
        fullName: "Paladin of Capricorn II"
    },
    11325: {
        name: "Gemini", stats: [15197, 15641, 10343, 10148, 17147],
        skills: [511, 512],
        isMounted: true,
        img: "240", rarity: 4, evo: 2,
        fullName: "Paladin of Gemini II"
    },
    11277: {
        name: "Leo", stats: [15121, 15002, 14200, 7440, 16811],
        skills: [448],
        autoAttack: 10014,
        img: "491", rarity: 4, evo: 2,
        fullName: "Paladin of Leo II"
    },
    11200: {
        name: "Libra", stats: [14178, 16172, 14698, 9845, 13669],
        skills: [390],
        img: "486", rarity: 4, evo: 2,
        fullName: "Paladin of Libra II"
    },
    11389: {
        name: "Ophiuchus", stats: [19508, 9000, 15002, 19541, 17504],
        skills: [583, 584],
        autoAttack: 10007,
        img: "13d", rarity: 5, evo: 2,
        fullName: "Paladin of Ophiuchus II"
    },
    11229: {
        name: "Pisces", stats: [13041, 8621, 14796, 17114, 14991],
        skills: [419],
        autoAttack: 10007,
        img: "122", rarity: 4, evo: 2,
        fullName: "Paladin of Pisces II"
    },
    11334: {
        name: "Sagittarius", stats: [15587, 15218, 12163, 8415, 17255],
        skills: [507, 508],
        img: "3c0", rarity: 4, evo: 2,
        fullName: "Paladin of Sagittarius II"
    },
    11353: {
        name: "Scorpio", stats: [14146, 15998, 13117, 8350, 16995],
        skills: [544],
        img: "4fe", rarity: 4, evo: 2,
        fullName: "Paladin of Scorpio II"
    },
    11362: {
        name: "Taurus", stats: [15608, 18598, 10105, 7007, 17363],
        skills: [553, 554],
        img: "2d3", rarity: 4, evo: 2,
        fullName: "Paladin of Taurus II"
    },
    11241: {
        name: "Virgo", stats: [15500, 6118, 12380, 17797, 16822],
        skills: [421, 422],
        autoAttack: 10007,
        img: "4cf", rarity: 4, evo: 2,
        fullName: "Paladin of Virgo II"
    },
    11231: {
        name: "Palna", stats: [14999, 15509, 14606, 8991, 13807],
        skills: [420],
        img: "3fb", rarity: 4, evo: 4,
        fullName: "Palna, the Vanguard II"
    },
    11554: {
        name: "Pandora", stats: [15023, 7028, 13528, 16887, 16529],
        skills: [838, 839],
        autoAttack: 10003,
        img: "12a", rarity: 4, evo: 2,
        fullName: "Pandora, Fallen Heroine II"
    },
    11374: {
        name: "Pazuzu", stats: [15121, 17182, 14988, 5640, 14999],
        skills: [556],
        img: "24d", rarity: 4, evo: 4,
        fullName: "Pazuzu, the Whirling Jinn II"
    },
    11259: {
        name: "Peg Powler", stats: [15500, 7353, 12499, 17049, 16204],
        skills: [636],
        autoAttack: 10047,
        img: "30c", rarity: 4, evo: 2,
        fullName: "Peg Powler II"
    },
    10831: {
        name: "Pegasus Knight", stats: [15251, 19032, 15370, 13073, 18046],
        skills: [311, 312],
        isMounted: true,
        img: "3e4", rarity: 5, evo: 2,
        fullName: "Pegasus Knight II"
    },
    10348: {
        name: "Pegasus", stats: [8756, 10200, 8843, 10880, 9181],
        skills: [111],
        img: "469", rarity: 4, evo: 4,
        fullName: "Pegasus, the Light Divine II"
    },
    11425: {
        name: "Pelops", stats: [15056, 14113, 10018, 12055, 17266],
        skills: [597, 598],
        img: "3ee", rarity: 4, evo: 2,
        fullName: "Pelops, Fallen Hero II"
    },
    10013: {
        name: "Pendragon", stats: [9844, 10317, 10751, 12357, 10861],
        skills: [60],
        img: "345", rarity: 4, evo: 4,
        fullName: "Pendragon, the Scourge II"
    },
    11557: {
        name: "Peony", stats: [17298, 17797, 12250, 7505, 16399],
        skills: [820, 821],
        autoAttack: 10101,
        img: "394", rarity: 4, evo: 2,
        fullName: "Peony, the Jiang Shi II"
    },
    21368: {
        name: "Perendon", stats: [19202, 17300, 17055, 17009, 17604],
        skills: [504],
        autoAttack: 10021,
        img: "124", rarity: 5, evo: 3,
        fullName: "Perendon the Pure"
    },
    11561: {
        name: "Persephone", stats: [18793, 8686, 13929, 21957, 18154],
        skills: [844, 845],
        autoAttack: 10007,
        img: "4b1", rarity: 5, evo: 2,
        fullName: "Persephone, Spring Goddess II"
    },
    11020: {
        name: "Phantasmal Succubus", stats: [18013, 13604, 20007, 17190, 10701],
        skills: [272, 273],
        img: "1fb", rarity: 5, evo: 2,
        fullName: "Phantasmal Succubus II"
    },
    10710: {
        name: "Phantom Assassin", stats: [13507, 13951, 11102, 14341, 14081],
        skills: [193],
        img: "110", rarity: 4, evo: 2,
        fullName: "Phantom Assassin II"
    },
    11022: {
        name: "Phantom Knight", stats: [19877, 23213, 19270, 19682, 18057],
        skills: [267],
        img: "461", rarity: 6, evo: 2,
        fullName: "Phantom Knight, the Vagabond II"
    },
    11469: {
        name: "Phineus", stats: [13597, 7005, 9894, 14561, 10915],
        skills: [654],
        autoAttack: 10007,
        img: "37a", rarity: 4, evo: 4,
        fullName: "Phineus, the Augur King II"
    },
    11567: {
        name: "Phlox", stats: [15047, 5298, 13489, 17499, 16607],
        skills: [863],
        autoAttack: 10003,
        img: "23d", rarity: 4, evo: 4,
        fullName: "Phlox, Avern Witch II"
    },
    11039: {
        name: "Phoenix", stats: [14005, 11188, 12033, 19010, 12185],
        skills: [305],
        img: "125", rarity: 4, evo: 2,
        fullName: "Phoenix, the Metempsychosis II"
    },
    11508: {
        name: "Pixiu", stats: [15706, 15999, 12999, 8005, 16489],
        skills: [691, 701],
        autoAttack: 10060,
        img: "443", rarity: 4, evo: 4,
        fullName: "Pixiu, the Wealthy II"
    },
    21489: {
        name: "Poliahu", stats: [23572, 8648, 17482, 22365, 18202],
        skills: [655, 656],
        autoAttack: 10007,
        img: "17d", rarity: 5, evo: 3,
        fullName: "Poliahu, the Mauna Kea"
    },
    11237: {
        name: "Pollux", stats: [13290, 18631, 11654, 10311, 13756],
        skills: [427, 428],
        img: "1a2", rarity: 4, evo: 2,
        fullName: "Pollux, Fallen Hero II"
    },
    10876: {
        name: "Pontifex", stats: [14590, 16410, 13507, 18371, 17797],
        skills: [229, 167],
        img: "2bd", rarity: 5, evo: 2,
        fullName: "Pontifex Antiquus II"
    },
    10075: {
        name: "Pouliquen", stats: [7890, 6271, 8910, 9439, 7843],
        skills: [16],
        img: "26c", rarity: 4, evo: 4,
        fullName: "Pouliquen, Archibishop II"
    },
    10785: {
        name: "Premyslid", stats: [13626, 16984, 14926, 18772, 11232],
        skills: [244],
        img: "2c7", rarity: 5, evo: 2,
        fullName: "Premyslid, the Black King II"
    },
    10599: {
        name: "Princeps", stats: [9360, 10772, 9674, 10181, 11667],
        skills: [156],
        img: "4dc", rarity: 4, evo: 4,
        fullName: "Princeps, Angel of Doom II"
    },
    11203: {
        name: "Prismatic", stats: [24004, 14438, 20982, 23300, 18024],
        skills: [432],
        autoAttack: 10007,
        img: "4fe", rarity: 6, evo: 2,
        fullName: "Prismatic Wyvern"
    },
    11486: {
        name: "Qing Nu", stats: [19010, 8957, 15002, 19541, 17992],
        skills: [677, 678],
        autoAttack: 10007,
        img: "14f", rarity: 5, evo: 2,
        fullName: "Qing Nu, Snowweaver II"
    },
    11100: {
        name: "Queen Waspmen", stats: [14070, 19898, 13247, 15998, 17829],
        skills: [348],
        img: "1f6", rarity: 5, evo: 2,
        fullName: "Queen of the Waspmen II"
    },
    21340: {
        name: "Cetus", stats: [22316, 20624, 17579, 11013, 16729],
        skills: [524],
        autoAttack: 10021,
        img: "30a", rarity: 5, evo: 3,
        fullName: "Raging Cetus"
    },
    11048: {
        name: "Ragnar", stats: [13245, 15804, 12001, 10294, 16510],
        skills: [314],
        img: "497", rarity: 4, evo: 4,
        fullName: "Ragnar, Dragonslayer II"
    },
    10664: {
        name: "Ramiel", stats: [15543, 13929, 13431, 16388, 14709],
        skills: [185],
        img: "3da", rarity: 5, evo: 2,
        fullName: "Ramiel, Angel of the Storm II"
    },
    10699: {
        name: "Rampant Lion", stats: [16291, 17569, 16518, 12564, 18035],
        skills: [380, 381],
        img: "387", rarity: 5, evo: 2,
        fullName: "Rampant Lion II"
    },
    10806: {
        name: "Rapse", stats: [11928, 14182, 13110, 11270, 15524],
        skills: [179],
        img: "4e0", rarity: 4, evo: 4,
        fullName: "Rapse, the Bloody Horns II"
    },
    11553: {
        name: "Rapunzel", stats: [18349, 20223, 17428, 8805, 18208],
        skills: [836, 837],
        autoAttack: 10108,
        img: "391", rarity: 5, evo: 2,
        fullName: "Rapunzel, Grimoire Keeper II"
    },
    10863: {
        name: "Rasiel", stats: [11936, 15587, 11817, 17797, 11004],
        skills: [234],
        img: "213", rarity: 4, evo: 2,
        fullName: "Rasiel, Angel All-Knowing II"
    },
    21571: {
        name: "Rattlebolt", stats: [19552, 11502, 20007, 20999, 18221],
        skills: [861, 862],
        autoAttack: 10110,
        img: "35b", rarity: 5, evo: 3,
        fullName: "Rattlebolt Wyvern"
    },
    10844: {
        name: "Regin", stats: [12734, 13342, 12832, 16144, 11270],
        skills: [155],
        img: "2b6", rarity: 4, evo: 4,
        fullName: "Regin, the Brass Mantis II"
    },
    11196: {
        name: "Brass Gorilla", stats: [18996, 9760, 18096, 12684, 8319],
        skills: [398],
        img: "26b", rarity: 4, evo: 4,
        fullName: "Reinforced Brass Gorilla II"
    },
    11215: {
        name: "Rohde", stats: [17591, 8101, 16042, 15305, 10582],
        skills: [376, 377],
        autoAttack: 10007,
        img: "23b", rarity: 4, evo: 2,
        fullName: "Rohde, the Rose Thorn II"
    },
    10845: {
        name: "Rovn", stats: [16269, 19086, 18772, 13214, 13355],
        skills: [228],
        img: "2a4", rarity: 5, evo: 2,
        fullName: "Rovn, the Brass Panzer II"
    },
    11066: {
        name: "Ruprecht", stats: [12911, 15316, 11795, 17504, 11199],
        skills: [330, 334],
        img: "479", rarity: 4, evo: 2,
        fullName: "Ruprecht the Punisher II"
    },
    11295: {
        name: "Ryaum", stats: [19454, 13561, 17667, 11221, 17602],
        skills: [482, 483],
        img: "237", rarity: 5, evo: 2,
        fullName: "Ryaum, Hussar Captain II"
    },
    11343: {
        name: "Sachiel", stats: [19357, 14059, 13052, 17017, 17526],
        skills: [527, 528],
        img: "42b", rarity: 5, evo: 2,
        fullName: "Sachiel, Angel of Water II"
    },
    11063: {
        name: "Treant", stats: [18566, 17017, 22542, 13626, 8014],
        skills: [154],
        img: "167", rarity: 5, evo: 2,
        fullName: "Sagacious Treant II"
    },
    11234: {
        name: "Saizo", stats: [16128, 12055, 16367, 19422, 16995],
        skills: [405],
        autoAttack: 10007,
        img: "241", rarity: 5, evo: 2,
        fullName: "Saizo, Phantom Ninja II"
    },
    10966: {
        name: "Saurva", stats: [14958, 15305, 11329, 11362, 15002],
        skills: [259],
        img: "1f3", rarity: 4, evo: 2,
        fullName: "Saurva, the Lawless Lord II"
    },
    21228: {
        name: "Hierophant", stats: [19681, 13391, 17534, 20112, 16950],
        skills: [418],
        autoAttack: 10007,
        img: "1b1", rarity: 5, evo: 3,
        fullName: "Scathing Hierophant"
    },
    10676: {
        name: "Scirocco", stats: [15002, 14503, 14503, 18999, 16497],
        skills: [331, 301],
        img: "3d5", rarity: 5, evo: 2,
        fullName: "Scirocco, Father of Winds II"
    },
    10626: {
        name: "Marid", stats: [14070, 17851, 14449, 12597, 15478],
        skills: [169],
        img: "2ed", rarity: 5, evo: 2,
        fullName: "Scorching Marid II"
    },
    11036: {
        name: "Sea Serpent", stats: [16020, 12012, 15121, 19259, 17103],
        skills: [302],
        img: "165", rarity: 5, evo: 2,
        fullName: "Sea Serpent II"
    },
    11470: {
        name: "Sedna", stats: [20321, 17840, 19129, 7072, 17699],
        skills: [657, 658],
        autoAttack: 10033,
        img: "18d", rarity: 5, evo: 2,
        fullName: "Sedna, the Frozen Sea II"
    },
    11379: {
        name: "Seimei", stats: [19963, 6389, 17038, 19053, 17103],
        skills: [564, 565],
        autoAttack: 10007,
        img: "4b7", rarity: 5, evo: 2,
        fullName: "Seimei, Onmyoji II"
    },
    11204: {
        name: "Seismo", stats: [18999, 19097, 15056, 11015, 16800],
        skills: [433],
        img: "188", rarity: 5, evo: 2,
        fullName: "Seismo Worm"
    },
    10258: {
        name: "Sekhmet", stats: [12529, 16780, 13843, 13598, 13823],
        skills: [11],
        img: "3d7", rarity: 4, evo: 4,
        fullName: "Sekhmet Aflame II"
    },
    11056: {
        name: "Selk", stats: [13902, 15854, 11976, 11208, 14927],
        skills: [327],
        img: "403", rarity: 4, evo: 4,
        fullName: "Selk, Desert King II"
    },
    11321: {
        name: "Selkie", stats: [15804, 8442, 14049, 16024, 13586],
        skills: [515, 516],
        autoAttack: 10007,
        img: "431", rarity: 4, evo: 4,
        fullName: "Selkie, Lady of the Shore II"
    },
    11413: {
        name: "Sera", stats: [14293, 17023, 13306, 7406, 15903],
        skills: [594, 595],
        img: "284", rarity: 4, evo: 4,
        fullName: "Sera, Exorcist II"
    },
    11290: {
        name: "Set", stats: [13097, 16364, 10990, 10001, 17133],
        skills: [469],
        img: "2c6", rarity: 4, evo: 4,
        fullName: "Set, God of the Sands II"
    },
    11006: {
        name: "Siby", stats: [15558, 8005, 11442, 17120, 15804],
        skills: [550],
        autoAttack: 10018,
        img: "20c", rarity: 4, evo: 4,
        fullName: "Siby, Sea Seer II"
    },
    11219: {
        name: "Sigiled Corpse Beast", stats: [17006, 12954, 14926, 19855, 16042],
        skills: [414, 415],
        autoAttack: 10007,
        img: "1f6", rarity: 5, evo: 2,
        fullName: "Sigiled Corpse Beast II"
    },
    11220: {
        name: "Sigiled Axeman", stats: [14644, 9076, 12987, 18338, 13409],
        skills: [416],
        autoAttack: 10007,
        img: "39e", rarity: 4, evo: 2,
        fullName: "Sigiled Skeleton Axeman II"
    },
    11565: {
        name: "Sigurd", stats: [19996, 19053, 14005, 11004, 17992],
        skills: [864, 865],
        img: "25e", rarity: 5, evo: 2,
        fullName: "Sigurd, Dragonslayer II"
    },
    10987: {
        name: "Sihn", stats: [12001, 10495, 12001, 17504, 16497],
        skills: [285],
        img: "453", rarity: 4, evo: 2,
        fullName: "Sihn, Moonlight King II"
    },
    11207: {
        name: "Silver Dragon", stats: [19714, 14601, 15067, 16215, 18154],
        skills: [522, 523],
        autoAttack: 10024,
        img: "48e", rarity: 5, evo: 2,
        fullName: "Silver Dragon II"
    },
    11387: {
        name: "Simurgh", stats: [15524, 6956, 12145, 17206, 16110],
        skills: [580],
        autoAttack: 10007,
        img: "2a2", rarity: 4, evo: 4,
        fullName: "Simurgh, Bird Divine II"
    },
    11093: {
        name: "Sinbad", stats: [15868, 18154, 14644, 13853, 17006],
        skills: [318],
        img: "29e", rarity: 5, evo: 2,
        fullName: "Sinbad the Adventurer II"
    },
    10566: {
        name: "Bedwyr", stats: [12235, 11318, 12221, 13510, 10598],
        skills: [145],
        img: "321", rarity: 4, evo: 4,
        fullName: "Sir Bedwyr of the Garden II"
    },
    10921: {
        name: "Brandiles", stats: [17017, 18100, 16269, 13940, 14070],
        skills: [252],
        img: "106", rarity: 5, evo: 2,
        fullName: "Sir Brandiles, the Flameblade II"
    },
    11520: {
        name: "Oliver", stats: [15912, 14980, 13702, 8014, 17266],
        skills: [800],
        autoAttack: 10067,
        img: "3e5", rarity: 4, evo: 2,
        fullName: "Sir Oliver, the Golden Sword II"
    },
    11455: {
        name: "Skeleton King", stats: [19714, 19064, 20982, 6097, 18143],
        skills: [605, 606],
        autoAttack: 10041,
        img: "3b5", rarity: 5, evo: 2,
        fullName: "Skeleton King II"
    },
    11074: {
        name: "Skoll", stats: [15002, 13160, 15153, 9000, 16302],
        skills: [367, 301],
        img: "3e8", rarity: 4, evo: 2,
        fullName: "Skoll, Dark Wolf II"
    },
    11038: {
        name: "Skrimsl", stats: [13049, 11417, 12466, 17182, 13379],
        skills: [303],
        img: "278", rarity: 4, evo: 4,
        fullName: "Skrimsl the Freezing II"
    },
    11273: {
        name: "Slagh", stats: [12978, 16561, 11098, 11683, 15631],
        skills: [457],
        img: "13c", rarity: 4, evo: 4,
        fullName: "Slagh, Carnage Incarnate II"
    },
    11480: {
        name: "Snegurochka", stats: [20007, 7895, 16063, 22000, 18143],
        skills: [672, 673],
        autoAttack: 10057,
        img: "306", rarity: 5, evo: 2,
        fullName: "Snegurochka II"
    },
    10450: {
        name: "Snow Queen", stats: [14070, 13994, 13940, 15229, 14449],
        skills: [128],
        img: "399", rarity: 5, evo: 2,
        fullName: "Snow Queen II"
    },
    10614: {
        name: "Solsten", stats: [13940, 14449, 15998, 17233, 12900],
        skills: [165],
        img: "37a", rarity: 5, evo: 2,
        fullName: "Solsten the Really Wanted II"
    },
    10941: {
        name: "Soura", stats: [12012, 12261, 7917, 16930, 17667],
        skills: [287, 291],
        img: "4f1", rarity: 4, evo: 2,
        fullName: "Soura, Inferno Shaman II"
    },
    10568: {
        name: "Spellforged Cyclops", stats: [17047, 11683, 14096, 11111, 10380],
        skills: [61],
        img: "2c7", rarity: 4, evo: 4,
        fullName: "Spellforged Cyclops II"
    },
    10850: {
        name: "Stalo", stats: [16269, 16280, 16681, 12792, 13496],
        skills: [241],
        img: "296", rarity: 5, evo: 2,
        fullName: "Stalo, Glacial Giant II"
    },
    414: {
        name: "Steamwork", stats: [14360, 10800, 10600, 12240, 10560],
        skills: [11],
        img: "3de", rarity: 5, evo: 1,
        fullName: "Steamwork Dragon"
    },
    10955: {
        name: "Sugaar", stats: [13110, 7481, 14293, 16950, 16097],
        skills: [465],
        autoAttack: 10007,
        img: "19b", rarity: 4, evo: 4,
        fullName: "Sugaar, the Thunderstorm II"
    },
    10461: {
        name: "Sulima", stats: [13417, 13583, 12194, 12293, 12269],
        skills: [17],
        img: "1ec", rarity: 4, evo: 4,
        fullName: "Sulima, Executioner II"
    },
    11189: {
        name: "Surtr", stats: [15440, 17106, 15085, 7016, 12890],
        skills: [383],
        img: "15b", rarity: 4, evo: 4,
        fullName: "Surtr the Fervent II"
    },
    11017: {
        name: "Svadilfari", stats: [15977, 19595, 13442, 15998, 14503],
        skills: [369, 370],
        img: "1ce", rarity: 5, evo: 2,
        fullName: "Svadilfari II"
    },
    11000: {
        name: "Tanba", stats: [17580, 23213, 17883, 23289, 18057],
        skills: [236],
        img: "3a8", rarity: 6, evo: 2,
        fullName: "Tanba, Founder of the Ninja II"
    },
    327: {
        name: "Tangata", stats: [10500, 10800, 10630, 10740, 12480],
        skills: [110],
        img: "3b4", rarity: 5, evo: 1,
        fullName: "Tangata Manu"
    },
    11122: {
        name: "Tannin", stats: [13669, 15500, 12683, 19541, 17894],
        skills: [298],
        img: "24a", rarity: 5, evo: 2,
        fullName: "Tannin, Sea Dragon II"
    },
    695: {
        name: "Tawiscara", stats: [11914, 14513, 14395, 11366, 15630],
        skills: [161],
        img: "3f5", rarity: 4, evo: 2,
        fullName: "Tawiscara"
    },
    10582: {
        name: "Tepaxtl", stats: [10831, 13562, 9209, 13110, 12100],
        skills: [115],
        img: "37d", rarity: 4, evo: 4,
        fullName: "Tepaxtl, Fatal Fang II"
    },
    1: {
        name: "Black Brute", stats: [14254, 17131, 13848, 11794, 11699],
        skills: [34],
        isWarlord: true,
        img: "36f", rarity: 2, evo: 1,
        fullName: "The Black Brute"
    },
    2: {
        name: "Blue Beard", stats: [12982, 11344, 15588, 15554, 13527],
        skills: [118],
        isWarlord: true,
        img: "10a", rarity: 2, evo: 1,
        fullName: "The Blue Beard"
    },
    3: {
        name: "Golden Lance", stats: [14462, 13994, 11951, 12227, 16809],
        skills: [10],
        isWarlord: true,
        img: "3d6", rarity: 1, evo: 1,
        fullName: "The Golden Lance"
    },
    4: {
        name: "Green Healer", stats: [13770, 10556, 16359, 15329, 13596],
        skills: [116, 111],
        isWarlord: true,
        img: "265", rarity: 1, evo: 1,
        fullName: "The Green Healer"
    },
    5: {
        name: "Grey Mage", stats: [13415, 13838, 10712, 15865, 16602],
        skills: [40],
        isWarlord: true,
        img: "248", rarity: 2, evo: 1,
        fullName: "The Grey Mage"
    },
    6: {
        name: "Purple Knife", stats: [13735, 16281, 10712, 15779, 13595],
        skills: [113],
        isWarlord: true,
        img: "3ee", rarity: 2, evo: 3,
        fullName: "The Purple Knife"
    },
    7: {
        name: "Red Samurai", stats: [13432, 14783, 13961, 12869, 14333],
        skills: [46],
        isWarlord: true,
        img: "4ad", rarity: 1, evo: 1,
        fullName: "The Red Samurai"
    },
    8: {
        name: "White Knight", stats: [13916, 14332, 15311, 12851, 13466],
        skills: [46],
        isWarlord: true,
        img: "225", rarity: 3, evo: 1,
        fullName: "The White Knight"
    },
    10480: {
        name: "Thor", stats: [10343, 13245, 11807, 13842, 11917],
        skills: [114],
        img: "3a1", rarity: 4, evo: 4,
        fullName: "Thor, God of Lightning II"
    },
    21264: {
        name: "Thor L", stats: [20007, 22002, 19063, 10334, 16518],
        skills: [437],
        autoAttack: 10011,
        img: "323", rarity: 5, evo: 3,
        fullName: "Thor, the Roaring Thunder"
    },
    10859: {
        name: "Thunderbird", stats: [15912, 16995, 13572, 15771, 17006],
        skills: [231],
        img: "2be", rarity: 5, evo: 2,
        fullName: "Thunderbird II"
    },
    11103: {
        name: "Tiamat", stats: [13702, 14698, 16497, 18869, 15738],
        skills: [280],
        img: "2c5", rarity: 5, evo: 2,
        fullName: "Tiamat, Mother of Dragons II"
    },
    11236: {
        name: "Tomoe", stats: [13889, 16010, 13110, 8285, 16622],
        skills: [406],
        img: "2b5", rarity: 4, evo: 4,
        fullName: "Tomoe, the Lightning Arrow II"
    },
    11143: {
        name: "TBB", stats: [12001, 9905, 12207, 17000, 16803],
        skills: [366],
        autoAttack: 10007,
        img: "115", rarity: 4, evo: 4,
        fullName: "Tormented Bone Beast II"
    },
    10747: {
        name: "Tristan", stats: [13832, 16193, 15197, 13052, 15771],
        skills: [122],
        img: "3c3", rarity: 5, evo: 2,
        fullName: "Tristan the Sorrowful II"
    },
    11472: {
        name: "Tulok", stats: [15498, 15047, 10807, 5247, 10198],
        skills: [662],
        img: "3a7", rarity: 4, evo: 4,
        fullName: "Tulok, Icebreaker II"
    },
    10647: {
        name: "Tuniq", stats: [13635, 16709, 12062, 12086, 9794],
        skills: [150],
        img: "29c", rarity: 4, evo: 4,
        fullName: "Tuniq, Guardian Colossus II"
    },
    10454: {
        name: "Stormwyrm", stats: [11025, 11514, 9646, 14489, 11318],
        skills: [47],
        img: "3ee", rarity: 4, evo: 4,
        fullName: "Two-Headed Stormwyrm II"
    },
    21499: {
        name: "Tyche", stats: [22409, 9752, 17534, 20836, 17942],
        skills: [681],
        autoAttack: 10052,
        img: "1b7", rarity: 5, evo: 3,
        fullName: "Tyche, Goddess of Glory"
    },
    10735: {
        name: "Typhon", stats: [14677, 13355, 14341, 17959, 13626],
        skills: [117],
        autoAttack: 10001,
        img: "283", rarity: 5, evo: 2,
        fullName: "Typhon II"
    },
    11356: {
        name: "Ulfhe", stats: [24102, 22921, 18447, 18057, 18219],
        skills: [702],
        autoAttack: 10062,
        img: "268", rarity: 6, evo: 2,
        fullName: "Ulfhe, Sword-Shield Master II"
    },
    10344: {
        name: "Hydarnes", stats: [11928, 12832, 10587, 14182, 11928],
        skills: [114],
        img: "4fd", rarity: 4, evo: 4,
        fullName: "Undead General, Hydarnes II"
    },
    10920: {
        name: "Unicorn", stats: [10807, 12600, 8770, 11721, 12001],
        skills: [156],
        img: "204", rarity: 4, evo: 4,
        fullName: "Unicorn, Spirit Eater II"
    },
    11124: {
        name: "Ushabti", stats: [12434, 16475, 14655, 10062, 14027],
        skills: [317],
        img: "21d", rarity: 4, evo: 2,
        fullName: "Ushabti II"
    },
    11268: {
        name: "Vafthruthnir", stats: [15500, 17732, 13008, 9997, 12228],
        skills: [442],
        img: "22b", rarity: 4, evo: 2,
        fullName: "Vafthruthnir, Elder Giant II"
    },
    10896: {
        name: "Valin", stats: [15500, 16865, 22953, 12716, 11167],
        skills: [263],
        img: "34a", rarity: 5, evo: 2,
        fullName: "Valin the Terrible II"
    },
    11008: {
        name: "Karkadann", stats: [17034, 16475, 13510, 7822, 13097],
        skills: [521],
        img: "422", rarity: 4, evo: 4,
        fullName: "Venomhorn Karkadann II"
    },
    11137: {
        name: "Venusia", stats: [14514, 18273, 13333, 10831, 11492],
        skills: [361],
        img: "403", rarity: 4, evo: 2,
        fullName: "Venusia, the Grace II"
    },
    10807: {
        name: "Vezat", stats: [16648, 18165, 14709, 13431, 17721],
        skills: [214],
        img: "429", rarity: 5, evo: 2,
        fullName: "Vezat, Dragonbone Warrior II"
    },
    10572: {
        name: "Vivian", stats: [14677, 17851, 15229, 13095, 14677],
        skills: [224],
        img: "25f", rarity: 5, evo: 2,
        fullName: "Vivian Griffinrider II"
    },
    11021: {
        name: "Vlad", stats: [16323, 19508, 13680, 14709, 16529],
        skills: [296, 295],
        img: "356", rarity: 5, evo: 2,
        fullName: "Vlad the Impaler II"
    },
    11582: {
        name: "Vlad", stats: [18934, 8491, 15240, 19812, 18024],
        skills: [877, 878],
        autoAttack: 10007,
        img: "187", rarity: 5, evo: 2,
        fullName: "Vlad, Swap II"
    },
    10675: {
        name: "Void Yaksha", stats: [15706, 18013, 14471, 14276, 15814],
        skills: [199],
        img: "297", rarity: 5, evo: 2,
        fullName: "Void Yaksha II"
    },
    11406: {
        name: "Vucub", stats: [16123, 13110, 14732, 6967, 17000],
        skills: [586],
        img: "2aa", rarity: 4, evo: 4,
        fullName: "Vucub Caquix, the Barbarian II"
    },
    11046: {
        name: "Waheela", stats: [17006, 13008, 16204, 16692, 18100],
        skills: [19, 134],
        img: "2dc", rarity: 5, evo: 2,
        fullName: "Waheela, Dire Wolf II"
    },
    11461: {
        name: "Wang Yi", stats: [16024, 6577, 11855, 17000, 16816],
        skills: [621, 622],
        autoAttack: 10007,
        img: "1b8", rarity: 4, evo: 4,
        fullName: "Wang Yi, Lady of Iron II"
    },
    11570: {
        name: "War Bear", stats: [18999, 17504, 15500, 11492, 6292],
        skills: [859, 860],
        img: "1b8", rarity: 4, evo: 2,
        fullName: "War Bear II"
    },
    11396: {
        name: "Wicker Man", stats: [16605, 6833, 11654, 16670, 16930],
        skills: [581, 582],
        autoAttack: 10036,
        img: "2d2", rarity: 4, evo: 2,
        fullName: "Wicker Man II"
    },
    10570: {
        name: "Wolfert", stats: [14189, 23972, 13723, 13290, 13431],
        skills: [118],
        img: "391", rarity: 5, evo: 2,
        fullName: "Wolfert, Grave Keeper II"
    },
    11521: {
        name: "Wrath", stats: [19010, 21101, 16410, 11936, 18154],
        skills: [706, 707],
        img: "279", rarity: 5, evo: 2,
        fullName: "Wrath, Beast of Sin II"
    },
    10798: {
        name: "Wu Chang", stats: [10294, 14182, 10977, 10600, 11928],
        skills: [115],
        img: "365", rarity: 4, evo: 4,
        fullName: "Wu Chang the Infernal II"
    },
    11018: {
        name: "Warden", stats: [19400, 17504, 18273, 11026, 11795],
        skills: [532],
        img: "33d", rarity: 5, evo: 2,
        fullName: "Wyrm Warden, Everwakeful II"
    },
    11218: {
        name: "Xaphan", stats: [13013, 9415, 12573, 17000, 15537],
        skills: [412],
        img: "47f", rarity: 4, evo: 4,
        fullName: "Xaphan, the Foul Flame II"
    },
    11315: {
        name: "Xuan Wu", stats: [18013, 18609, 17038, 13821, 13507],
        skills: [499, 500],
        autoAttack: 10020,
        img: "325", rarity: 5, evo: 2,
        fullName: "Xuan Wu II"
    },
    11526: {
        name: "Yae", stats: [15317, 7271, 13258, 15365, 17133],
        skills: [699, 700],
        autoAttack: 10007,
        img: "2a6", rarity: 4, evo: 4,
        fullName: "Yae, the Night Flower II"
    },
    10995: {
        name: "Ymir", stats: [22650, 24600, 16464, 20592, 15933],
        skills: [227],
        img: "167", rarity: 6, evo: 2,
        fullName: "Ymir, Primordial Giant II"
    },
    10486: {
        name: "Yulia", stats: [14081, 14664, 12052, 13544, 12524],
        skills: [134],
        img: "341", rarity: 4, evo: 4,
        fullName: "Yulia, Snakesage II"
    },
    10497: {
        name: "Zagan", stats: [16128, 16941, 14709, 12423, 13052],
        skills: [143],
        img: "192", rarity: 5, evo: 2,
        fullName: "Zagan II"
    },
    11077: {
        name: "Zahhak", stats: [16789, 10051, 19151, 17797, 17168],
        skills: [339],
        autoAttack: 10001,
        img: "194", rarity: 5, evo: 2,
        fullName: "Zahhak, Dragon Marshal II"
    },
    10869: {
        name: "Zanga", stats: [10218, 10787, 9694, 9512, 12780],
        skills: [161],
        img: "1cf", rarity: 4, evo: 4,
        fullName: "Zanga, the Iron Storm II"
    },
    10992: {
        name: "Zeruel", stats: [16995, 19573, 13886, 13507, 16984],
        skills: [351, 352],
        img: "4a7", rarity: 5, evo: 2,
        fullName: "Zeruel, Angel of War II"
    },
    11443: {
        name: "Zorg", stats: [14073, 15196, 11331, 5395, 10805],
        skills: [629],
        img: "1e0", rarity: 4, evo: 4,
        fullName: "Zorg, the Cruncher II"
    },
    10474: {
        name: "Zuniga", stats: [12987, 15132, 14276, 14839, 14709],
        skills: [132],
        img: "322", rarity: 5, evo: 2,
        fullName: "Zuniga, Guard Captain II"
    },

    //  unordered from now
    11599: {
        name: "Mammi EP4", stats: [13293, 7699, 8505, 14806, 12500],
        skills: [892],
        autoAttack: 10016,
        img: "46a", rarity: 4, evo: 4,
        fullName: "Mammi, Spiritmancer II"
    },
    11595: {
        name: "Blazing", stats: [18891, 9141, 14005, 19963, 17992],
        skills: [893, 894],
        autoAttack: 10019,
        img: "1c6", rarity: 5, evo: 2,
        fullName: "Blazing Drake"
    },
    11597: {
        name: "Telluric", stats: [16696, 17499, 17693, 11770, 5506],
        skills: [895],
        autoAttack: 10122,
        img: "3d5", rarity: 4, evo: 4,
        fullName: "Telluric Drake II"
    },
    11600: {
        name: "Feathered", stats: [17006, 13008, 15998, 6248, 17992],
        skills: [896, 897],
        autoAttack: 10120,
        img: "25d", rarity: 4, evo: 2,
        fullName: "Feathered Drake"
    },
    21599: {
        name: "Mammi EP2", stats: [15500, 5663, 12987, 18696, 17407],
        skills: [898, 899],
        autoAttack: 10052,
        img: "46a", rarity: 4, evo: 2,
        fullName: "Mammi, Hare of the Harvest II"
    },
    11572: {
        name: "Banshee", stats: [23560, 16009, 21480, 24708, 18533],
        skills: [872, 873],
        passiveSkills: [9002],
        autoAttack: 10114,
        img: "42d", rarity: 6, evo: 2,
        fullName: "Banshee Rider II"
    },
    11548: {
        name: "Zepar", stats: [24557, 23029, 20050, 18111, 18533],
        skills: [831, 832],
        passiveSkills: [9001],
        img: "1ba", rarity: 6, evo: 2,
        fullName: "Zepar, Blood-Annointed II"
    },
    11601: {
        name: "Brine", stats: [18501, 6898, 16009, 22000, 17591],
        skills: [900, 901],
        autoAttack: 10121,
        img: "217", rarity: 5, evo: 2,
        fullName: "Brine Drake"
    },
    11604: {
        name: "Hellawes", stats: [15327, 7559, 12272, 16659, 16800],
        skills: [907],
        autoAttack: 10007,
        img: "431", rarity: 4, evo: 2,
        fullName: "Hellawes, Fetter Witch II"
    },
    11607: {
        name: "Shackled Red Wyrm", stats: [25521, 14092, 20386, 23538, 18219],
        skills: [905],
        autoAttack: 10123,
        img: "281", rarity: 6, evo: 2,
        fullName: "Shackled Red Wyrm II"
    },
    11606: {
        name: "Palamedes", stats: [15376, 16217, 14561, 6650, 17071],
        skills: [908],
        autoAttack: 10103,
        img: "21e", rarity: 4, evo: 4,
        fullName: "Palamedes, the Hawk's Eye II"
    },
    11612: {
        name: "Belle", stats: [16009, 17006, 14980, 14807, 18208],
        skills: [914, 915],
        autoAttack: 10125,
        isMounted: true,
        img: "31f", rarity: 5, evo: 2,
        fullName: "Belle, Grimoire Keeper II"
    },
    11611: {
        name: "Chariot Hippocamp", stats: [14402, 14792, 13024, 7980, 17706],
        skills: [913],
        img: "281", rarity: 4, evo: 4,
        fullName: "Chariot Hippocamp II"
    },
    21608: {
        name: "Neptune", stats: [20461, 10404, 17836, 21674, 18023],
        skills: [911],
        autoAttack: 10057,
        img: "349", rarity: 5, evo: 3,
        fullName: "Intrepid Hand of Neptune"
    },
    1609: {
        name: "Charybdis", stats: [14048, 16042, 13918, 9000, 16887],
        skills: [912],
        img: "3c9", rarity: 4, evo: 2,
        fullName: "Charybdis II"
    },
    11613: {
        name: "Amphitrite", stats: [16226, 7418, 19638, 20158, 17569],
        skills: [916, 917],
        autoAttack: 10001,
        img: "2ed", rarity: 5, evo: 2,
        fullName: "Amphitrite, Nereid Queen II"
    },
    11627: {
        name: "Charon", stats: [16681, 6689, 10525, 17095, 16950],
        skills: [919],
        autoAttack: 10007,
        img: "3ae", rarity: 4, evo: 4,
        fullName: "Charon, Greedy Ferryman II"
    },
    21627: {
        name: "Charon", stats: [13680, 8285, 9585, 14503, 9964],
        skills: [920],
        autoAttack: 10007,
        img: "430", rarity: 4, evo: 2,
        fullName: "Charon, Darksun Ferryman II"
    },
    11631: {
        name: "Nessus", stats: [13803, 7906, 9635, 13965, 10245],
        skills: [925],
        autoAttack: 10007,
        img: "13e", rarity: 4, evo: 4,
        fullName: "Nessus, Centaur Gaoler II"
    },
    21625: {
        name: "Belial", stats: [21873, 19096, 20100, 9309, 18105],
        skills: [918],
        autoAttack: 10044,
        img: "3af", rarity: 5, evo: 3,
        fullName: "Belial, Lord of Vices"
    },
    11629: {
        name: "Midas", stats: [14048, 7819, 11275, 18013, 17374],
        skills: [923, 924],
        autoAttack: 10007,
        img: "2a6", rarity: 4, evo: 2,
        fullName: "Midas, the Wailing King II"
    },
    11628: {
        name: "Beatrice", stats: [18858, 7895, 15251, 21328, 18165],
        skills: [921, 922],
        autoAttack: 10007,
        img: "26a", rarity: 5, evo: 2,
        fullName: "Beatrice, the Luminescent II"
    },
    11644: {
        name: "Nidhogg", stats: [24752, 16128, 22130, 23246, 18035],
        skills: [935, 936],
        passiveSkills: [9004],
        autoAttack: 10126,
        img: "151", rarity: 6, evo: 2,
        fullName: "Nidhogg, Iceclad Dragon II"
    },
    11637: {
        name: "Minos", stats: [15511, 17244, 15002, 6292, 16204],
        skills: [939, 940],
        img: "399", rarity: 4, evo: 2,
        fullName: "Minos, Judgment King II"
    },
    11638: {
        name: "Pasiphae", stats: [18501, 18999, 15002, 10192, 17309],
        skills: [945, 946],
        autoAttack: 10125,
        img: "3dc", rarity: 5, evo: 2,
        fullName: "Pasiphae, the Brass Bull II"
    },
    11583: {
        name: "Kalevan", stats: [15153, 15803, 14222, 6855, 17006],
        skills: [947, 948],
        autoAttack: 10051,
        img: "187", rarity: 4, evo: 2,
        fullName: "Kalevan, Swap II"
    },
    11634: {
        name: "Mammon", stats: [16010, 7895, 13010, 14999, 15999],
        skills: [944],
        autoAttack: 10129,
        img: "274", rarity: 4, evo: 4,
        fullName: "Mammon, Raven Claw II"
    },
    21636: {
        name: "Moloch", stats: [15002, 8003, 12987, 16800, 17201],
        skills: [942, 943],
        autoAttack: 10128,
        img: "1e8", rarity: 4, evo: 2,
        fullName: "Moloch, Soul Reaper II"
    },
    11636: {
        name: "Moloch", stats: [12001, 6602, 10001, 15207, 12999],
        skills: [941],
        autoAttack: 10016,
        img: "356", rarity: 4, evo: 4,
        fullName: "Moloch, the Infernal Axe II"
    },
    11641: {
        name: "Aslaug", stats: [15121, 16486, 13496, 6389, 17103],
        skills: [952],
        autoAttack: 10130,
        img: "2c8", rarity: 4, evo: 2,
        fullName: "Aslaug, the Lyre Bow II"
    },
    21578: {
        name: "Zeruel", stats: [22841, 21478, 18303, 12038, 18128],
        skills: [954, 955],
        autoAttack: 10015,
        img: "3b0", rarity: 5, evo: 3,
        fullName: "Zeruel Angel of War, Swap"
    },
    11639: {
        name: "Fafnir", stats: [25012, 23538, 20754, 14092, 18349],
        skills: [950],
        autoAttack: 10061,
        img: "257", rarity: 6, evo: 2,
        fullName: "Fafnir, Fireclad Dragon II"
    },
    11643: {
        name: "Alberich", stats: [15964, 17120, 16523, 15427, 4237],
        skills: [953],
        autoAttack: 10131,
        img: "376", rarity: 4, evo: 4,
        fullName: "Alberich, the Ceratophrys II"
    },
    11640: {
        name: "Waltraute", stats: [19552, 18100, 16854, 8480, 18046],
        skills: [951],
        autoAttack: 10044,
        img: "24d", rarity: 5, evo: 2,
        fullName: "Waltraute, Valiant Valkyrie II"
    },
    11632: {
        name: "Azazel", stats: [19010, 17331, 15002, 11492, 18165],
        skills: [937, 938],
        autoAttack: 10125,
        img: "2ef", rarity: 5, evo: 2,
        fullName: "Azazel, the Temptress II"
    },
    11175: {
        name: "Taotie", stats: [14850, 15803, 13106, 9141, 14720],
        skills: [949],
        autoAttack: 10005,
        img: "2ef", rarity: 4, evo: 2,
        fullName: "Taotie, the Gluttonous II"
    },
    11646: {
        name: "Thoth", stats: [13117, 8047, 12694, 17645, 17190],
        skills: [958],
        autoAttack: 10003,
        img: "20b", rarity: 4, evo: 2,
        fullName: "Thoth, Hieroglypher II"
    },
    11649: {
        name: "Pele", stats: [17840, 19357, 17017, 11080, 18208],
        skills: [960, 961],
        autoAttack: 10133,
        img: "2f1", rarity: 5, evo: 2,
        fullName: "Pele, Volcano Shamaness II"
    },
    11676: {
        name: "Fionn", stats: [12597, 11514, 10027, 7819, 13597],
        skills: [971],
        img: "29f", rarity: 4, evo: 4,
        fullName: "Fionn, the Meteor Sword II"
    },
    21645: {
        name: "Tangata M", stats: [20031, 21103, 21920, 9729, 18105],
        skills: [957],
        autoAttack: 10132,
        img: "284", rarity: 5, evo: 3,
        fullName: "Tangata Manu, Withering Gale"
    },
    11650: {
        name: "Rongo", stats: [18057, 16800, 17342, 13312, 17992],
        skills: [962, 963],
        autoAttack: 10135,
        img: "198", rarity: 5, evo: 2,
        fullName: "Rongo, Moai Master II"
    },
    11648: {
        name: "Fleetfoot", stats: [13583, 17924, 11574, 7688, 17144],
        skills: [959],
        autoAttack: 10133,
        img: "165", rarity: 4, evo: 4,
        fullName: "Fleetfoot Ornithomimus II"
    },
    11673: {
        name: "Amethyst", stats: [20169, 16291, 13788, 13030, 18241],
        skills: [967, 968],
        autoAttack: 10108,
        img: "4a6", rarity: 5, evo: 2,
        fullName: "Amethyst Dragon II"
    },
    11674: {
        name: "Agate", stats: [16497, 14308, 12077, 7852, 17764],
        skills: [969, 970],
        autoAttack: 10108,
        img: "205", rarity: 4, evo: 2,
        fullName: "Agate, Gem Tamer II"
    },
    21672: {
        name: "Unbound", stats: [13788, 13138, 10896, 8003, 10343],
        skills: [966],
        img: "35b", rarity: 4, evo: 2,
        fullName: "Unbound Gem Golem II"
    },
    21670: {
        name: "Urcagu", stats: [22527, 22048, 19668, 8912, 17779],
        skills: [964],
        autoAttack: 10108,
        img: "1bc", rarity: 5, evo: 3,
        fullName: "Urcagu, the Grinder"
    },
    21696: {
        name: "Ker", stats: [21015, 19040, 18585, 13100, 18517],
        skills: [972, 973],
        autoAttack: 10134,
        img: "233", rarity: 5, evo: 3,
        fullName: "Ker, the Despair Diamond"
    },
    11682: {
        name: "Takemikazuchi", stats: [17201, 16995, 17006, 11004, 8144],
        skills: [980, 981],
        autoAttack: 10137,
        img: "24a", rarity: 4, evo: 2,
        fullName: "Takemikazuchi, the Lightning II"
    },
    11679: {
        name: "Ame", stats: [16803, 10001, 14500, 17499, 9209],
        skills: [976],
        autoAttack: 10003,
        img: "152", rarity: 4, evo: 4,
        fullName: "Ame no Uzume, the Lure II"
    },
    11677: {
        name: "Susanoo", stats: [17797, 19508, 15500, 11784, 18013],
        skills: [974, 975],
        autoAttack: 10133,
        img: "1ab", rarity: 5, evo: 2,
        fullName: "Susanoo, Rowdy God II"
    },
    21681: {
        name: "Mizuchi", stats: [14698, 6097, 14005, 17797, 17407],
        skills: [977, 978],
        autoAttack: 10136,
        img: "312", rarity: 4, evo: 2,
        fullName: "Mizuchi, the Raging Storm II"
    },
    11688: {
        name: "Autolycus", stats: [16144, 16696, 13538, 6712, 16902],
        skills: [988],
        autoAttack: 10139,
        img: "3e2", rarity: 4, evo: 4,
        fullName: "Autolycus, Shrewd Warrior II"
    },
    11684: {
        name: "Heracles", stats: [24849, 25499, 20061, 13203, 18154],
        skills: [985],
        autoAttack: 10061,
        img: "3cd", rarity: 6, evo: 2,
        fullName: "Heracles, Mightiest of Men II"
    },
    11683: {
        name: "Kushinada", stats: [17992, 10549, 15511, 18999, 18046],
        skills: [982, 983],
        autoAttack: 10138,
        isMounted: true,
        img: "411", rarity: 5, evo: 2,
        fullName: "Kushinada, Shamaness II"
    },
    11685: {
        name: "Hippolyta", stats: [20429, 19389, 17862, 7971, 17992],
        skills: [986],
        autoAttack: 10103,
        img: "247", rarity: 5, evo: 2,
        fullName: "Hippolyta, Amazon Queen II"
    },
    11686: {
        name: "Antaeus", stats: [15652, 17439, 14048, 6010, 16800],
        skills: [987],
        autoAttack: 10113,
        img: "2f2", rarity: 4, evo: 2,
        fullName: "Antaeus, Giant II"
    },
    11693: {
        name: "Hina", stats: [16097, 6736, 10001, 17875, 17254],
        skills: [993],
        autoAttack: 10019,
        img: "4f1", rarity: 4, evo: 4,
        fullName: "Hina, Flame Serpent II"
    },
    11695: {
        name: "Azan", stats: [14861, 15478, 14308, 7982, 17309],
        skills: [992],
        autoAttack: 10141,
        img: "18a", rarity: 4, evo: 2,
        fullName: "Azan, the Dragon Bone II"
    },
    21690: {
        name: "Decaying", stats: [19982, 9075, 18969, 22316, 18152],
        skills: [991],
        autoAttack: 10140,
        img: "12e", rarity: 5, evo: 3,
        fullName: "Decaying Dragon"
    },
    11694: {
        name: "A'shi", stats: [18208, 7039, 16919, 20689, 18403],
        skills: [994, 995],
        autoAttack: 10143,
        img: "13a", rarity: 5, evo: 2,
        fullName: "A'shi, Pterorider II"
    },
    11681: {
        name: "Mizuchi", stats: [13010, 7991, 10305, 12001, 13489],
        skills: [979],
        autoAttack: 10136,
        img: "1bd", rarity: 4, evo: 4,
        fullName: "Mizuchi, the Maelstrom II"
    },
};
