/**
 * Some notes:
 * - Order the familiars by the fullName
 * - Use the POPE stats
 * - The "name" attribute is a short name for the fam. If multiple fams have the same short name,
 *   append the rarity at the end (e.g. "Thor" and "Thor L")
 * - The order of the skills only matters for mounted familiars
 * - If the familiar has a special autoAttack, add it
 * - For the image, use the wikia thumbnail version and follow the existing examples
 */
var famDatabase = {
    11261: {
        name: "Rahab", stats: [14073, 12597, 15498, 9004, 16754],
        skills: [434],
        img: "21c",
        fullName: "Abyssal Rahab II"
    },
    11282: {
        name: "Achilles", stats: [13593, 15630, 11362, 10603, 16562],
        skills: [459, 460],
        img: "1c7",
        fullName: "Achilles, Fallen Hero II"
    },
    10613: {
        name: "Adara", stats: [16024, 12134, 17620, 10857, 9370],
        skills: [166],
        img: "268",
        fullName: "Adara Luck Shot II"
    },
    11099: {
        name: "Adranus", stats: [20223, 23517, 19855, 18609, 18046],
        skills: [347],
        img: "275",
        fullName: "Adranus, Lava Beast II"
    },
    358: {
        name: "Aegis", stats: [14560, 11280, 15530, 10600, 10100],
        skills: [64],
        img: "235",
        fullName: "Aegis, the Bulwark"
    },
    11206: {
        name: "Aeneas", stats: [14590, 15630, 13561, 10311, 13561],
        skills: [400, 401],
        img: "25c",
        fullName: "Aeneas, Fallen Hero II"
    },
    11385: {
        name: "Aeshma", stats: [17558, 17212, 15034, 5804, 13019],
        skills: [579],
        autoAttack: 10035,
        img: "243",
        fullName: "Aeshma, the Tyrant II"
    },
    11344: {
        name: "Afanc", stats: [16518, 8610, 14124, 16020, 13214],
        skills: [529, 530],
        autoAttack: 10003,
        img: "4a1",
        fullName: "Afanc, Beast of the Deep II"
    },
    21404: {
        name: "Ah Puch", stats: [22515, 9134, 18258, 20999, 17486],
        skills: [585],
        autoAttack: 10007,
        img: "460",
        fullName: "Ah Puch, Lord of Death"
    },
    11041: {
        name: "Ahab", stats: [10273, 12001, 11342, 9978, 12342],
        skills: [195],
        img: "2ec",
        fullName: "Ahab, the Colossal Anchor II"
    },
    21474: {
        name: "Aipaloovik", stats: [17006, 7397, 11481, 17526, 16605],
        skills: [660, 661],
        autoAttack: 10052,
        img: "46f",
        fullName: "Aipaloovik, Sacred Dragon II"
    },
    11474: {
        name: "Aipaloovik", stats: [15610, 7991, 11807, 16534, 15999],
        skills: [659],
        autoAttack: 10007,
        img: "389",
        fullName: "Aipaloovik, the Snowstorm II"
    },
    10841: {
        name: "Alcina", stats: [12684, 14169, 11356, 13682, 15755],
        skills: [269],
        img: "31b",
        fullName: "Alcina the Soulsucker II"
    },
    11400: {
        name: "Ales", stats: [18119, 18009, 16024, 10101, 5884],
        skills: [562, 563],
        img: "4d5",
        fullName: "Ales Darkblood II"
    },
    10813: {
        name: "ASK", stats: [12952, 14282, 11477, 10490, 17133],
        skills: [219],
        img: "339",
        fullName: "All-Seeing Keeper II"
    },
    10936: {
        name: "Merrow", stats: [16811, 14709, 13723, 17537, 17320],
        skills: [217],
        img: "26d",
        fullName: "Alluring Merrow II"
    },
    10972: {
        name: "Alp", stats: [11917, 14120, 10928, 17168, 13366],
        skills: [277],
        img: "20d",
        fullName: "Alp, Dynast of Darkness II"
    },
    11436: {
        name: "Alyssa", stats: [17883, 8718, 16594, 20516, 17786],
        skills: [616, 617],
        autoAttack: 10007,
        img: "41d",
        fullName: "Alyssa, Black Cat Witch II"
    },
    10623: {
        name: "Warfist", stats: [10904, 11417, 10466, 10660, 11830],
        skills: [156],
        img: "21a",
        fullName: "Amazon Warfist II"
    },
    11058: {
        name: "Ammit", stats: [18306, 23495, 18501, 18490, 18057],
        skills: [325],
        img: "2f9",
        fullName: "Ammit, Soul Destroyer II"
    },
    10717: {
        name: "Amon", stats: [13171, 16128, 10755, 14861, 13214],
        skills: [47],
        img: "386",
        fullName: "Amon, Marquis of Blaze II"
    },
    10757: {
        name: "Amphisbaena", stats: [14861, 14850, 13030, 19855, 18024],
        skills: [202, 203],
        isMounted: true,
        img: "346",
        fullName: "Amphisbaena II"
    },
    11065: {
        name: "ABS", stats: [14005, 15901, 11903, 11838, 14904],
        skills: [365],
        img: "1e0",
        fullName: "Ancient Beetle Soldier II"
    },
    11483: {
        name: "Tree Golem", stats: [17998, 17106, 17998, 12001, 2907],
        skills: [671],
        autoAttack: 10056,
        img: "14b",
        fullName: "Ancient Tree Golem II"
    },
    10464: {
        name: "Andorra", stats: [12538, 13621, 13510, 12134, 12342],
        skills: [142],
        img: "252",
        fullName: "Andorra the Indomitable II"
    },
    10947: {
        name: "Ankou", stats: [17017, 9628, 16854, 14308, 10246],
        skills: [345, 346],
        autoAttack: 10007,
        isMounted: true,
        img: "4d6",
        fullName: "Ankou, Harbinger of Death II"
    },
    10999: {
        name: "Anne", stats: [12232, 13782, 12342, 13510, 15599],
        skills: [250],
        img: "13d",
        fullName: "Anne, the Whirlwind II"
    },
    11245: {
        name: "Anneberg", stats: [19097, 18241, 17038, 8794, 16518],
        skills: [489, 490],
        img: "1e1",
        fullName: "Anneberg, Steel Steed II"
    },
    11292: {
        name: "Anubis", stats: [14330, 17006, 12510, 10625, 14005],
        skills: [473, 474],
        img: "247",
        fullName: "Anubis, Keeper of the Dead II"
    },
    21288: {
        name: "Apep", stats: [20543, 20975, 15503, 14302, 16729],
        skills: [468],
        autoAttack: 10017,
        img: "179",
        fullName: "Apep the Chaotic"
    },
    10593: {
        name: "Apocalyptic Beast", stats: [14189, 15977, 15413, 13420, 14969],
        skills: [123],
        img: "15a",
        fullName: "Apocalyptic Beast II"
    },
    11364: {
        name: "Apsara", stats: [15717, 4992, 14113, 17179, 17006],
        skills: [630, 631],
        autoAttack: 10007,
        img: "152",
        fullName: "Apsara, Spirit of Water II"
    },
    11281: {
        name: "Chariot", stats: [17342, 19346, 16453, 10376, 17472],
        skills: [464],
        img: "3da",
        fullName: "Arcanan Chariot II"
    },
    21300: {
        name: "Fate", stats: [20706, 17848, 13181, 18794, 17522],
        skills: [475],
        autoAttack: 10007,
        img: "3ee",
        fullName: "Arcanan Circle of Fate"
    },
    11335: {
        name: "Daemon", stats: [18252, 20700, 12510, 13117, 15023],
        skills: [509, 510],
        img: "249",
        fullName: "Arcanan Daemon II"
    },
    11324: {
        name: "Death", stats: [20234, 19508, 13008, 13019, 18111],
        skills: [546, 547],
        autoAttack: 10028,
        isMounted: true,
        img: "25b",
        fullName: "Arcanan Death II"
    },
    11239: {
        name: "Emperor", stats: [18577, 17916, 17786, 10809, 14590],
        skills: [425, 426],
        img: "102",
        fullName: "Arcanan Emperor II"
    },
    11211: {
        name: "Empress", stats: [15197, 12380, 15348, 19422, 17168],
        skills: [394, 395],
        img: "104",
        fullName: "Arcanan Empress II"
    },
    11427: {
        name: "Fool", stats: [20613, 20104, 18057, 13182, 11102],
        skills: [632, 633],
        img: "3f3",
        isMounted: true,
        fullName: "Arcanan Fool II"
    },
    11311: {
        name: "Hanged Man", stats: [20505, 15002, 13008, 13030, 18024],
        skills: [480, 481],
        img: "489",
        fullName: "Arcanan Hanged Man II"
    },
    11287: {
        name: "Hermit", stats: [19205, 12066, 12586, 20722, 15002],
        skills: [453, 454],
        autoAttack: 10007,
        img: "3c5",
        fullName: "Arcanan Hermit II"
    },
    11199: {
        name: "High Priestess", stats: [17233, 8350, 20256, 19086, 14839],
        skills: [388, 389],
        autoAttack: 10007,
        img: "458",
        fullName: "Arcanan High Priestess II"
    },
    11395: {
        name: "Judgment", stats: [19996, 7754, 16009, 19508, 17753],
        skills: [573],
        autoAttack: 10003,
        img: "172",
        fullName: "Arcanan Judgment II"
    },
    11242: {
        name: "Lovers", stats: [16908, 13875, 12705, 19021, 17006],
        skills: [430, 431],
        autoAttack: 10007,
        img: "3fb",
        fullName: "Arcanan Lovers II"
    },
    11208: {
        name: "Magus", stats: [15186, 12131, 17688, 19010, 15641],
        skills: [402, 403],
        img: "1bb",
        fullName: "Arcanan Magus II"
    },
    11284: {
        name: "Might", stats: [18598, 19227, 10766, 13301, 17948],
        skills: [461, 462],
        isMounted: true,
        img: "2a4",
        fullName: "Arcanan Might II"
    },
    11363: {
        name: "Moon", stats: [18273, 18046, 13279, 12467, 17948],
        skills: [551, 552],
        autoAttack: 10030,
        img: "3b8",
        fullName: "Arcanan Moon II"
    },
    11360: {
        name: "Star", stats: [20223, 7548, 18035, 18208, 15803],
        skills: [540, 541],
        autoAttack: 10007,
        img: "475",
        fullName: "Arcanan Star II"
    },
    11394: {
        name: "Sun", stats: [20299, 7982, 16356, 18013, 17916],
        skills: [570, 571],
        autoAttack: 10032,
        img: "10a",
        fullName: "Arcanan Sun II"
    },
    11332: {
        name: "Temperance", stats: [19183, 3800, 20007, 19985, 18046],
        skills: [543],
        autoAttack: 10027,
        img: "38d",
        fullName: "Arcanan Temperance II"
    },
    11329: {
        name: "Archbishop", stats: [19064, 20191, 16009, 10744, 15002],
        skills: [520],
        autoAttack: 10025,
        img: "39a",
        fullName: "Archbishop of the Deep II"
    },
    10600: {
        name: "Ose", stats: [16995, 14395, 15023, 14850, 11990],
        skills: [154],
        img: "300",
        fullName: "Archduke Ose II"
    },
    11105: {
        name: "Ares", stats: [25434, 21285, 21047, 16345, 17407],
        skills: [542],
        img: "180",
        fullName: "Ares, God of Ruin II"
    },
    10372: {
        name: "Artemisia", stats: [10042, 10977, 10977, 10042, 12589],
        skills: [18],
        img: "3aa",
        fullName: "Artemisia Swiftfoot II"
    },
    11457: {
        name: "Asena", stats: [15121, 17385, 11622, 7505, 16995],
        skills: [608],
        img: "3f8",
        fullName: "Asena, Wolfwoman II"
    },
    11361: {
        name: "Ashlee", stats: [17038, 16042, 15045, 13431, 17992],
        skills: [623],
        autoAttack: 10029,
        img: "3f7",
        fullName: "Ashlee Steamsaw II"
    },
    11488: {
        name: "Aspidochelone", stats: [21003, 17103, 21003, 17006, 4450],
        skills: [665, 666],
        autoAttack: 10050,
        img: "26f",
        fullName: "Aspidochelone, the Iceberg II"
    },
    10595: {
        name: "Astaroth", stats: [12194, 13965, 10087, 15278, 14280],
        skills: [155],
        img: "22e",
        fullName: "Astaroth, Duke of Fear II"
    },
    11467: {
        name: "Atalanta", stats: [16497, 16302, 13561, 7776, 15576],
        skills: [652, 653],
        img: "210",
        fullName: "Atalanta, Fowler II"
    },
    10900: {
        name: "Aurboda", stats: [11903, 15348, 11773, 18468, 11015],
        skills: [261],
        img: "315",
        fullName: "Aurboda, the Great Mother II"
    },
    11441: {
        name: "Ausra", stats: [21913, 9596, 15998, 18403, 18154],
        skills: [638, 639],
        autoAttack: 10023,
        img: "2c8",
        fullName: "Ausra, the Fall Breeze II"
    },
    11388: {
        name: "Azi", stats: [20375, 20202, 20104, 22899, 18057],
        skills: [572],
        autoAttack: 10033,
        img: "25b",
        fullName: "Azi Dahaka II"
    },
    10657: {
        name: "Baal", stats: [14677, 15457, 12813, 14482, 16551],
        skills: [178],
        img: "22f",
        fullName: "Baal, Thunder Lord of Hell II"
    },
    11168: {
        name: "Badalisc", stats: [14092, 16107, 11882, 11297, 15218],
        skills: [315],
        img: "26c",
        fullName: "Badalisc, the Gourmet II"
    },
    11390: {
        name: "Suzhen", stats: [15998, 3096, 15002, 17504, 17006],
        skills: [81],
        autoAttack: 10031,
        img: "105",
        fullName: "Bai Suzhen, Lady of Scales II"
    },
    11102: {
        name: "Balgo", stats: [18585, 16037, 13962, 5799, 13510],
        skills: [349],
        img: "2fd",
        fullName: "Balgo, the Cursed Flame II"
    },
    11243: {
        name: "Bandersnatch", stats: [21805, 8047, 14200, 19183, 17786],
        skills: [635],
        autoAttack: 10046,
        img: "1bc",
        fullName: "Bandersnatch, Beast Divine II"
    },
    10652: {
        name: "Batraz", stats: [14471, 15511, 13442, 12293, 12174],
        skills: [142],
        img: "4e3",
        fullName: "Batraz, the Immortal Hero II"
    },
    11371: {
        name: "Bayam", stats: [13269, 7966, 12804, 17106, 16779],
        skills: [506],
        autoAttack: 10023,
        img: "171",
        fullName: "Bayam II"
    },
    11025: {
        name: "Scarecrow", stats: [10625, 13756, 10490, 11001, 9342],
        skills: [256],
        img: "34d",
        fullName: "Beheading Scarecrow II"
    },
    10659: {
        name: "Behemoth", stats: [12442, 14755, 13269, 12380, 12999],
        skills: [186],
        img: "230",
        fullName: "Behemoth, Thunder Beast II"
    },
    10935: {
        name: "Belisama", stats: [17777, 17071, 17000, 11111, 4981],
        skills: [628],
        img: "39e",
        fullName: "Belisama, Flame Goddess II"
    },
    11454: {
        name: "Bella", stats: [16009, 16627, 13052, 5631, 17374],
        skills: [643, 644],
        img: "314",
        fullName: "Bella, the Dazzling Flower II"
    },
    21459: {
        name: "Benjamina", stats: [21022, 16379, 20007, 13006, 18011],
        skills: [640],
        img: "46a",
        fullName: "Benjamina, Wild Turkey"
    },
    10684: {
        name: "Biast", stats: [13879, 12655, 10163, 13611, 9798],
        skills: [163],
        img: "229",
        fullName: "Biast II"
    },
    10787: {
        name: "Black Knight", stats: [12648, 16097, 11623, 11574, 13842],
        skills: [211],
        img: "19e",
        fullName: "Black Knight, Soul Hunter II"
    },
    10824: {
        name: "Bolus", stats: [12086, 16889, 12427, 11610, 12832],
        skills: [152],
        img: "4a0",
        fullName: "Bolus, the Blue Bolt II"
    },
    10977: {
        name: "Boudica", stats: [9967, 11914, 8918, 13110, 12014],
        skills: [276],
        img: "2ab",
        fullName: "Boudica, the Dawn Chief II"
    },
    11223: {
        name: "Brang", stats: [18826, 18544, 14027, 18208, 10105],
        skills: [423],
        autoAttack: 10010,
        img: "4f3",
        fullName: "Brang Two-Heads II"
    },
    11209: {
        name: "Rabbit", stats: [18999, 13951, 20007, 9986, 18035],
        skills: [435, 436],
        img: "26e",
        fullName: "Brass Rabbit"
    },
    11194: {
        name: "Tarantula", stats: [19324, 14568, 18024, 15695, 12120],
        skills: [396, 397],
        autoAttack: 10005,
        img: "271",
        fullName: "Brass Tarantula II"
    },
    11171: {
        name: "Hyena", stats: [14644, 10766, 11860, 18923, 12228],
        skills: [321],
        autoAttack: 10008,
        img: "2fc",
        fullName: "Bronzeclad Hyena II"
    },
    11114: {
        name: "Brownies", stats: [9821, 11283, 9515, 13196, 11414],
        skills: [307],
        img: "190",
        fullName: "Brownies, the Uproarious II"
    },
    10488: {
        name: "Bunga", stats: [12269, 11049, 14182, 9612, 10343],
        skills: [125],
        img: "25d",
        fullName: "Bunga, the Stalwart II"
    },
    11129: {
        name: "Caassimolar", stats: [16009, 24979, 15587, 10625, 12521],
        skills: [371],
        img: "1c7",
        fullName: "Caassimolar, the Chimera II"
    },
    11466: {
        name: "Calais", stats: [19812, 18100, 16009, 12792, 17277],
        skills: [650, 651],
        img: "379",
        fullName: "Calais, the Gale II"
    },
    11449: {
        name: "Camazo", stats: [22628, 22585, 22173, 16139, 18208],
        skills: [601, 445],
        autoAttack: 10038,
        img: "26c",
        fullName: "Camazo, Knight of Bats II"
    },
    11119: {
        name: "Canhel", stats: [15608, 19606, 17992, 11329, 16399],
        skills: [293],
        img: "254",
        fullName: "Canhel, Guardian Dragon II"
    },
    10997: {
        name: "Jolly", stats: [14200, 16594, 14070, 18956, 15424],
        skills: [226],
        img: "214",
        fullName: "Cap'n Jolly, Sea Scourge II"
    },
    11479: {
        name: "Jed", stats: [24080, 25066, 20494, 14005, 18100],
        skills: [667],
        autoAttack: 10053,
        img: "1b7",
        fullName: "Captain Jed II"
    },
    11333: {
        name: "Kidd", stats: [18403, 18046, 12781, 14395, 16085],
        skills: [518, 157],
        img: "442",
        fullName: "Captain Kidd II"
    },
    11062: {
        name: "Chillweaver", stats: [13293, 13196, 10611, 16144, 14489],
        skills: [2],
        img: "2b2",
        fullName: "Cat Sith Chillweaver II"
    },
    11090: {
        name: "CSMM", stats: [14096, 10112, 10549, 15804, 17095],
        skills: [343],
        autoAttack: 10007,
        img: "26d",
        fullName: "Cat Sith Magus Master II"
    },
    11366: {
        name: "CSS", stats: [15034, 16518, 13052, 7202, 16811],
        skills: [549],
        img: "17b",
        fullName: "Cat Sith Swordswoman II"
    },
    11177: {
        name: "CSW", stats: [15804, 16768, 14000, 5334, 16707],
        skills: [637],
        autoAttack: 10048,
        img: "1d8",
        fullName: "Cat Sith Warlord II"
    },
    11213: {
        name: "Cegila", stats: [13149, 11492, 9498, 17504, 16995],
        skills: [354],
        img: "2a5",
        fullName: "Cegila, Dragonian Incantator II"
    },
    10673: {
        name: "Cernunnos", stats: [16446, 15351, 13761, 13181, 14330],
        skills: [177],
        img: "25b",
        fullName: "Cernunnos II"
    },
    10409: {
        name: "Magma Giant", stats: [12832, 12380, 13097, 11477, 11928],
        skills: [123],
        img: "363",
        fullName: "Chaotic Magma Giant II"
    },
    11484: {
        name: "Chione", stats: [16204, 13008, 13561, 8502, 17266],
        skills: [663, 664],
        img: "4d9",
        fullName: "Chione, Fallen Heroine II"
    },
    10907: {
        name: "Chiyome", stats: [12635, 14148, 11369, 15817, 13510],
        skills: [238],
        img: "183",
        fullName: "Chiyome, the Kamaitachi II"
    },
    11306: {
        name: "Circe", stats: [15002, 7776, 11947, 17017, 16009],
        skills: [487, 488],
        autoAttack: 10007,
        img: "20f",
        fullName: "Circe, Fallen Heroine II"
    },
    11437: {
        name: "Pumpkin", stats: [16497, 7061, 12423, 17060, 15457],
        skills: [618, 619],
        autoAttack: 10007,
        img: "46b",
        fullName: "Clockwork Pumpkin II"
    },
    11392: {
        name: "Viper", stats: [14999, 12999, 14999, 7808, 17133],
        skills: [574],
        img: "338",
        fullName: "Clockwork Viper II"
    },
    10303: {
        name: "Crystal Gillant", stats: [11832, 10896, 10439, 10439, 13317],
        skills: [11],
        img: "460",
        fullName: "Crystal Gillant II"
    },
    11095: {
        name: "Roc", stats: [12073, 14879, 12559, 11501, 16510],
        skills: [322],
        img: "220",
        fullName: "Crystalwing Roc II"
    },
    10712: {
        name: "Cuelebre", stats: [13702, 16096, 12954, 11134, 13572],
        skills: [249],
        img: "28c",
        fullName: "Cuelebre the Ironscaled II"
    },
    11019: {
        name: "Cursebone", stats: [14807, 16952, 14146, 15652, 17721],
        skills: [248],
        img: "33e",
        fullName: "Cursebone Pterosaur II"
    },
    10820: {
        name: "Cyclops", stats: [15868, 17147, 18360, 13214, 14449],
        skills: [218],
        img: "3ba",
        fullName: "Cyclops, the Rocky Cliff II"
    },
    11328: {
        name: "Dagon", stats: [23343, 22065, 18035, 19703, 18208],
        skills: [519],
        img: "36a",
        fullName: "Dagon II"
    },
    10973: {
        name: "Dagr", stats: [12012, 14059, 10712, 17818, 13810],
        skills: [275],
        img: "4d2",
        fullName: "Dagr Sunrider II"
    },
    10983: {
        name: "Danniel", stats: [23571, 24990, 21458, 13951, 16204],
        skills: [292],
        img: "1e2",
        fullName: "Danniel, Golden Paladin II"
    },
    11415: {
        name: "Dantalion", stats: [15193, 5298, 10990, 14207, 11098],
        skills: [596],
        autoAttack: 10007,
        img: "18e",
        fullName: "Dantalion, Duke of Hell II"
    },
    21445: {
        name: "Darkwind Wyvern", stats: [22211, 8270, 19352, 20917, 17649],
        skills: [607],
        autoAttack: 10042,
        img: "4dd",
        fullName: "Darkwind Wyvern"
    },
    10905: {
        name: "Danzo", stats: [14774, 17277, 14872, 17667, 16128],
        skills: [237],
        img: "464",
        fullName: "Danzo, Falcon Ninja II"
    },
    21308: {
        name: "Justice", stats: [20795, 11717, 17470, 22225, 18005],
        skills: [494, 495],
        autoAttack: 10007,
        img: "27c",
        fullName: "Dauntless Justice"
    },
    10967: {
        name: "Deborah", stats: [13550, 14157, 13442, 12987, 13929],
        skills: [222],
        img: "373",
        fullName: "Deborah, Knight Immaculate II"
    },
    11225: {
        name: "Dein", stats: [14000, 16768, 11098, 11683, 14417],
        skills: [424],
        img: "48e",
        fullName: "Dein, Silent Bomber II"
    },
    10722: {
        name: "Delphyne", stats: [11990, 14601, 11882, 18858, 11080],
        skills: [288],
        img: "415",
        fullName: "Delphyne, Thunder Dragon II"
    },
    10503: {
        name: "Desna", stats: [13146, 15089, 14287, 12137, 12378],
        skills: [124],
        img: "245",
        fullName: "Desna, Mythic Wendigo II"
    },
    10914: {
        name: "Dharva", stats: [14096, 13742, 12280, 11942, 15427],
        skills: [254],
        img: "297",
        fullName: "Dharva Fangclad II"
    },
    11096: {
        name: "Djinn", stats: [14048, 17363, 13333, 19422, 16605],
        skills: [319, 320],
        img: "18d",
        fullName: "Djinn of the Lamp II"
    },
    11355: {
        name: "Dong", stats: [13489, 17000, 13196, 8150, 16110],
        skills: [545],
        img: "48b",
        fullName: "Dong, the Bloody Claw II"
    },
    10423: {
        name: "Doppeladler", stats: [13940, 14709, 14417, 14092, 14850],
        skills: [33],
        img: "168",
        fullName: "Doppeladler II"
    },
    10691: {
        name: "Dors", stats: [15435, 9433, 13268, 16464, 13019],
        skills: [446],
        img: "11d",
        fullName: "Dors, Demiwyrm Warrior II"
    },
    11303: {
        name: "Dunkleosteus", stats: [14000, 8394, 13110, 16620, 15804],
        skills: [477],
        autoAttack: 10007,
        img: "222",
        fullName: "Dunkleosteus, the Rendmaw II"
    },
    10272: {
        name: "Cat Sidhe", stats: [9614, 8322, 11959, 11243, 10056],
        skills: [18],
        img: "448",
        fullName: "Earl Cat Sidhe II"
    },
    10619: {
        name: "Ebon", stats: [17493, 15543, 13431, 14330, 13788],
        skills: [157],
        img: "248",
        fullName: "Ebon Dragon II"
    },
    10756: {
        name: "Edgardo", stats: [10904, 15485, 14389, 8978, 14755],
        skills: [179],
        img: "25f",
        fullName: "Edgardo, Grand Inquisitor II"
    },
    11450: {
        name: "Elsa", stats: [19010, 19021, 15132, 10018, 17851],
        skills: [602],
        autoAttack: 10039,
        img: "2fe",
        fullName: "Elsa, Undead Bride II"
    },
    21276: {
        name: "Empusa", stats: [20706, 12623, 16110, 20999, 17510],
        skills: [447],
        autoAttack: 10016,
        img: "30a",
        fullName: "Empusa, the Death Scythe"
    },
    10317: {
        name: "Eton", stats: [10904, 10490, 10490, 12952, 12952],
        skills: [94],
        img: "174",
        fullName: "Eton, Eater of Darkness II"
    },
    10708: {
        name: "Ettin", stats: [16063, 14482, 14677, 9498, 13702],
        skills: [304],
        autoAttack: 10006,
        img: "31f",
        fullName: "Ettin II"
    },
    11358: {
        name: "Europa", stats: [14731, 8296, 12207, 16735, 16518],
        skills: [538, 539],
        autoAttack: 10007,
        img: "425",
        fullName: "Europa, Fallen Heroine II"
    },
    10452: {
        name: "Evil Eye", stats: [10770, 10394, 10490, 12221, 11721],
        skills: [120],
        img: "2bf",
        fullName: "Evil Eye II"
    },
    10674: {
        name: "Fenrir", stats: [15099, 16865, 22498, 13008, 11167],
        skills: [154],
        img: "1dd",
        fullName: "Fenrir II"
    },
    21352: {
        name: "Siege Tower", stats: [20007, 19750, 16915, 14021, 17567],
        skills: [548],
        autoAttack: 10029,
        img: "293",
        fullName: "Ferocious Siege Tower"
    },
    10496: {
        name: "Bat Demon", stats: [12538, 14182, 12648, 11928, 12720],
        skills: [131],
        img: "10e",
        fullName: "Fiendish Bat Demon II"
    },
    11435: {
        name: "Figgo", stats: [15509, 16377, 13451, 6051, 16534],
        skills: [614],
        img: "275",
        fullName: "Figgo, Executioner II"
    },
    10849: {
        name: "Fimbul", stats: [12086, 13489, 12562, 16743, 12597],
        skills: [242],
        img: "24a",
        fullName: "Fimbul Frostclad II"
    },
    10470: {
        name: "Flame Dragon", stats: [14601, 14449, 13756, 15153, 13940],
        skills: [23],
        img: "18e",
        fullName: "Flame Dragon II"
    },
    10888: {
        name: "Flesh Collector Golem", stats: [17450, 14536, 18089, 8664, 9661],
        skills: [253],
        img: "252",
        fullName: "Flesh Collector Golem II"
    },
    11191: {
        name: "Freyja", stats: [14709, 17125, 14027, 10213, 12380],
        skills: [387],
        img: "3c8",
        fullName: "Freyja, Earth Goddess II"
    },
    10473: {
        name: "Freila", stats: [11928, 10490, 12453, 12221, 11417],
        skills: [16],
        img: "3f2",
        fullName: "Freila the Bountiful II"
    },
    11190: {
        name: "Freyr", stats: [16562, 19909, 15370, 12943, 15998],
        skills: [385, 386],
        img: "151",
        fullName: "Freyr, God of the Harvest II"
    },
    10606: {
        name: "Fomor", stats: [13052, 14645, 11928, 9967, 9781],
        skills: [138],
        img: "143",
        fullName: "Fomor the Savage II"
    },
    11115: {
        name: "Bearwolf", stats: [14503, 24513, 11492, 11405, 17992],
        skills: [353],
        img: "25b",
        fullName: "Frost Bearwolf II"
    },
    10022: {
        name: "Galahad", stats: [6543, 7271, 7349, 6842, 6478],
        skills: [10000, 33, 5],
        isMounted: true,
        img: "4e2",
        fullName: "Galahad, Drake Knight II"
    },
    11172: {
        name: "Galatea", stats: [19833, 10062, 15825, 18566, 15218],
        skills: [533],
        autoAttack: 10007,
        img: "48a",
        fullName: "Galatea, Nereid II"
    },
    201: {
        name: "Gan Ceann", stats: [7950, 10530, 8830, 8910, 8540],
        skills: [33],
        img: "2ca",
        fullName: "Gan Ceann"
    },
    10842: {
        name: "Gargoyle Gatekeeper", stats: [15608, 17602, 14503, 15002, 18035],
        skills: [268],
        img: "277",
        fullName: "Gargoyle Gatekeeper II"
    },
    21384: {
        name: "Garshasp", stats: [22002, 18058, 20019, 20007, 8223],
        skills: [578],
        autoAttack: 10034,
        img: "225",
        fullName: "Garshasp, the Juggernaut"
    },
    10609: {
        name: "Garuda", stats: [14417, 14677, 14081, 15814, 15023],
        skills: [47],
        img: "1bf",
        fullName: "Garuda II"
    },
    10571: {
        name: "Gathgoic", stats: [14839, 16128, 14980, 17948, 14709],
        skills: [141],
        img: "3fb",
        fullName: "Gathgoic the Other II"
    },
    10742: {
        name: "Gevi", stats: [15565, 15424, 18447, 13593, 11015],
        skills: [180],
        img: "255",
        fullName: "Gevi, Crystal Troll Master II"
    },
    10088: {
        name: "Ghislandi", stats: [12324, 13551, 13525, 12212, 12187],
        skills: [17],
        img: "468",
        fullName: "Ghislandi, Iron Heart II"
    },
    11271: {
        name: "Ghislandi L", stats: [18533, 20234, 14590, 10235, 16204],
        skills: [455, 456],
        autoAttack: 10015,
        img: "391",
        fullName: "Ghislandi, the Unchained II"
    },
    11453: {
        name: "GCE", stats: [15100, 7564, 11403, 17254, 16609],
        skills: [604],
        autoAttack: 10007,
        img: "333",
        fullName: "Ghost Carriage Express II"
    },
    11304: {
        name: "Gigantopithecus", stats: [24210, 25055, 21946, 13994, 15998],
        skills: [491],
        img: "3e5",
        fullName: "Gigantopithecus II"
    },
    11375: {
        name: "Gilgamesh", stats: [20115, 19053, 18013, 8220, 16096],
        skills: [558, 559],
        img: "1e1",
        fullName: "Gilgamesh the Bold II"
    },
    10177: {
        name: "Goblin King", stats: [8144, 8339, 6400, 10159, 10278],
        skills: [18],
        img: "34f",
        fullName: "Goblin King II"
    },
    10011: {
        name: "Gorgon", stats: [10170, 12436, 8652, 12773, 10924],
        skills: [18],
        img: "46f",
        fullName: "Gorgon II"
    },
    10611: {
        name: "Gorlin", stats: [11928, 12380, 17000, 6809, 10904],
        skills: [167],
        img: "150",
        fullName: "Gorlin Gold Helm II"
    },
    10720: {
        name: "Goviel", stats: [14135, 14547, 13604, 14926, 16616],
        skills: [204],
        img: "290",
        fullName: "Goviel, Hail Knight II"
    },
        10551: {
        name: "Grandor", stats: [14709, 17277, 15738, 13756, 11903],
        skills: [149],
        img: "365",
        fullName: "Grandor, Giant of Old II"
    },
    10586: {
        name: "Gregoire", stats: [11708, 12121, 10318, 14854, 10159],
        skills: [144],
        img: "308",
        fullName: "Gregoire, Weaponmaster II"
    },
    11131: {
        name: "Gregory", stats: [16192, 16121, 15558, 9794, 10294],
        skills: [372],
        img: "248",
        fullName: "Gregory, the Masked Slayer II"
    },
    10791: {
        name: "Grellas", stats: [12066, 14796, 10636, 17374, 13073],
        skills: [212],
        img: "211",
        fullName: "Grellas Fellstaff II"
    },
    21216: {
        name: "Gremory", stats: [18466, 12819, 18945, 20426, 17009],
        skills: [411],
        autoAttack: 10007,
        img: "20b",
        fullName: "Gremory, the Vermilion Moon"
    },
    10784: {
        name: "Gretch", stats: [16280, 15305, 12683, 15652, 13875],
        skills: [196],
        img: "3a9",
        fullName: "Gretch, Chimaera Mistress II"
    },
    10182: {
        name: "Griffin", stats: [11887, 9909, 14391, 14263, 11960],
        skills: [2],
        img: "457",
        fullName: "Griffin Mount II"
    },
    361: {
        name: "Griflet", stats: [11520, 12970, 11430, 10110, 13780],
        skills: [10],
        img: "2b1",
        fullName: "Griflet, Falcon Knight"
    },
    10276: {
        name: "Grim", stats: [11001, 13047, 8888, 13026, 11060],
        skills: [109],
        img: "17f",
        fullName: "Grim Executioner II"
    },
    10925: {
        name: "Grimoire", stats: [15231, 18609, 10441, 8064, 15451],
        skills: [134],
        img: "49b",
        fullName: "Grimoire Beast II"
    },
    11170: {
        name: "Gryla", stats: [16529, 11622, 15868, 15294, 8740],
        skills: [308, 316],
        isMounted: true,
        img: "2c3",
        fullName: "Gryla, the Lullaby II"
    },
    21285: {
        name: "Guillaume", stats: [21515, 20887, 16308, 12948, 18505],
        skills: [466, 467],
        img: "122",
        fullName: "Guillaume, Fanatic"
    },
    10898: {
        name: "Hamad", stats: [10294, 10367, 9881, 16416, 10951],
        skills: [265],
        img: "3fd",
        fullName: "Hamad, the Sweeping Wind II"
    },
    10861: {
        name: "Haokah", stats: [13476, 13928, 11111, 15706, 13245],
        skills: [232],
        img: "198",
        fullName: "Haokah, the Lightning Brave II"
    },
    11428: {
        name: "Hash", stats: [15034, 13485, 12532, 10441, 17147],
        skills: [641],
        img: "112",
        fullName: "Hash, Lizardman Cannoneer II"
    },
    11493: {
        name: "Hati", stats: [15002, 8144, 10777, 17721, 16995],
        skills: [675],
        autoAttack: 10059,
        img: "230",
        fullName: "Hati, Icetail Wolf II"
    },
    11451: {
        name: "Hatshepsut", stats: [17049, 16334, 13041, 6097, 16096],
        skills: [603],
        autoAttack: 10040,
        img: "2bd",
        fullName: "Hatshepsut, Mummy Queen II"
    },
    11478: {
        name: "Hecatoncheir", stats: [15509, 15158, 14024, 8759, 15706],
        skills: [676],
        img: "2e5",
        fullName: "Hecatoncheir Rimetouch II"
    },
    10951: {
        name: "Hecatoncheir", stats: [11807, 13902, 14768, 13928, 13366],
        skills: [264],
        img: "488",
        fullName: "Hecatoncheir the Adamantine II"
    },
    21312: {
        name: "Hei Long", stats: [20486, 13485, 16192, 20881, 17113],
        skills: [496],
        autoAttack: 10019,
        img: "1bd",
        fullName: "Hei Long, the New Moon"
    },
    10465: {
        name: "Heinrich", stats: [16887, 13940, 15132, 13290, 14005],
        skills: [133],
        img: "305",
        fullName: "Heinrich the Bold II"
    },
    10634: {
        name: "Hel", stats: [14709, 17450, 14709, 15771, 18057],
        skills: [239, 240],
        img: "1e8",
        fullName: "Hel, Goddess of Death II"
    },
    10895: {
        name: "Hercinia", stats: [14062, 13414, 12562, 12686, 15876],
        skills: [225],
        img: "1a4",
        fullName: "Hercinia the Blest II"
    },
    11202: {
        name: "Hereward", stats: [14927, 14000, 12524, 10951, 15498],
        skills: [391],
        img: "105",
        fullName: "Hereward, Storm of Arrows II"
    },
    11073: {
        name: "Hippocamp", stats: [14514, 16486, 14926, 19855, 15002],
        skills: [360, 167],
        img: "4f8",
        fullName: "Hippocamp II"
    },
    10560: {
        name: "Hippogriff", stats: [9978, 11063, 11942, 9295, 10074],
        skills: [133],
        img: "43e",
        fullName: "Hippogriff of Rites II"
    },
    10726: {
        name: "Hlokk", stats: [14328, 14462, 12832, 9271, 17133],
        skills: [502, 503],
        img: "37a",
        fullName: "Hlokk, Blade of Thunder II"
    },
    10635: {
        name: "Hollofernyiges", stats: [16551, 16757, 13875, 14568, 16941],
        skills: [33],
        img: "320",
        fullName: "Hollofernyiges II"
    },
    11297: {
        name: "Hoska", stats: [18996, 7906, 15096, 17023, 8881],
        skills: [484, 485],
        autoAttack: 10016,
        img: "26c",
        fullName: "Hoska, the Firestroke II"
    },
    10704: {
        name: "Hraesvelg", stats: [12499, 17472, 11784, 12662, 13799],
        skills: [251],
        img: "3cd",
        fullName: "Hraesvelg, Corpse Feaster II"
    },
    10715: {
        name: "Hrimthurs", stats: [13414, 15572, 16144, 9783, 10600],
        skills: [205],
        img: "2e9",
        fullName: "Hrimthurs the Blizzard II"
    },
    11401: {
        name: "Huan", stats: [14005, 14406, 13106, 9997, 16096],
        skills: [577],
        img: "1d4",
        fullName: "Huan, Doomcaller II"
    },
    10980: {
        name: "Hundred-eyed Warrior", stats: [17385, 18501, 15641, 10452, 17634],
        skills: [289],
        img: "221",
        fullName: "Hundred-eyed Warrior II"
    },
    10970: {
        name: "Hypnos", stats: [16291, 17277, 15446, 12488, 17992],
        skills: [274],
        img: "43b",
        fullName: "Hypnos, Lord of Dreams II"
    },
    11393: {
        name: "Icarus", stats: [15186, 14796, 14005, 7137, 17363],
        skills: [568, 569],
        img: "194",
        fullName: "Icarus, Fallen Hero II"
    },
    10688: {
        name: "Ignis", stats: [11022, 11312, 10818, 13460, 12859],
        skills: [164],
        img: "22f",
        fullName: "Ignis Fatuus II"
    },
    10706: {
        name: "Ijiraq", stats: [13929, 14536, 9791, 17797, 12012],
        skills: [168],
        img: "21b",
        fullName: "Ijiraq, the Glacier II"
    },
    11064: {
        name: "Ijiraq L", stats: [16995, 14449, 17006, 19508, 12987],
        skills: [328, 329],
        img: "33c",
        fullName: "Ijiraq the Brinicle II"
    },
    21104: {
        name: "IIG", stats: [23155, 19935, 21027, 8440, 17505],
        skills: [444, 445],
        img: "15f",
        fullName: "Impregnable Iron Golem"
    },
    11144: {
        name: "Infested Cyclops", stats: [19508, 19508, 15392, 9997, 15348],
        skills: [364],
        img: "3db",
        fullName: "Infested Cyclops II"
    },
    11120: {
        name: "Infested Minotaur", stats: [13691, 15294, 16031, 9390, 14070],
        skills: [299, 301],
        img: "3ab",
        fullName: "Infested Minotaur II"
    },
    10319: {
        name: "Peryton", stats: [10904, 9674, 10490, 10490, 12952],
        skills: [33],
        img: "12b",
        fullName: "Infested Peryton II"
    },
    11342: {
        name: "Ghost Ship", stats: [15365, 12879, 11928, 10951, 16803],
        skills: [525],
        img: "20f",
        fullName: "Inhabited Ghost Ship II"
    },
    21475: {
        name: "Uranus", stats: [21943, 9529, 18525, 20649, 17742],
        skills: [674],
        autoAttack: 10058,
        img: "3d5",
        fullName: "Intrepid Hand of Uranus"
    },
    693: {
        name: "Ioskeha", stats: [13138, 13611, 11162, 15329, 13675],
        skills: [160],
        img: "222",
        fullName: "Ioskeha"
    },
    10592: {
        name: "Ira", stats: [12832, 14489, 8770, 11172, 17254],
        skills: [138],
        img: "46c",
        fullName: "Ira, Hypnotic Specter II"
    },
    10681: {
        name: "Iron Golem", stats: [16778, 13615, 17818, 9867, 8848],
        skills: [152],
        img: "29f",
        fullName: "Iron Golem II"
    },
    10746: {
        name: "Iseult", stats: [12731, 10977, 11708, 15865, 14193],
        skills: [144],
        img: "13b",
        fullName: "Iseult the Redeemer II"
    },
    11376: {
        name: "Ishtar", stats: [16009, 16074, 13106, 9022, 14265],
        skills: [560, 561],
        img: "24d",
        fullName: "Ishtar, Goddess of Love II"
    },
    11351: {
        name: "Ivy", stats: [16341, 3882, 13803, 15889, 17998],
        skills: [536],
        autoAttack: 10026,
        img: "373",
        fullName: "Ivy the Verdant II"
    },
    11407: {
        name: "Ixtab", stats: [20007, 8502, 17472, 17504, 18013],
        skills: [588, 589],
        autoAttack: 10031,
        img: "294",
        fullName: "Ixtab, Guardian of the Dead II"
    },
    11009: {
        name: "Jabberwock", stats: [13994, 16193, 13008, 19508, 18024],
        skills: [271, 270],
        img: "41f",
        fullName: "Jabberwock, Phantom Dragon II"
    },
    11169: {
        name: "Jack", stats: [13507, 9000, 12196, 16204, 16995],
        skills: [333],
        autoAttack: 10009,
        img: "10b",
        fullName: "Jack o' Frost II"
    },
    11448: {
        name: "Jack Rusty", stats: [17021, 16123, 10148, 9539, 15121],
        skills: [609],
        autoAttack: 10044,
        img: "46a",
        fullName: "Jack, the Rusty II"
    },
    10569: {
        name: "Jinx-eye", stats: [14709, 15998, 13832, 13832, 14915],
        skills: [146],
        img: "1c4",
        fullName: "Jinx-eye Dragon II"
    },
    11266: {
        name: "Jormungandr", stats: [13024, 16768, 11756, 10112, 15889],
        skills: [438],
        autoAttack: 10012,
        img: "397",
        fullName: "Jormungandr, World Serpent II"
    },
    10510: {
        name: "Kagemaru", stats: [14319, 16973, 13940, 13420, 14568],
        skills: [137],
        img: "430",
        fullName: "Kagemaru, Master Ninja II"
    },
    21463: {
        name: "Kaikias", stats: [22014, 20007, 18560, 12611, 17742],
        skills: [647],
        autoAttack: 10050,
        img: "350",
        fullName: "Kaikias, the Hail God"
    },
    11121: {
        name: "Kalevan", stats: [12629, 18013, 11914, 12055, 13821],
        skills: [297, 240],
        img: "3bd",
        fullName: "Kalevan, the Forest Green II"
    },
    10804: {
        name: "Kangana", stats: [15803, 18750, 14872, 12813, 13247],
        skills: [216],
        img: "2b1",
        fullName: "Kangana, the Maelstrom II"
    },
    10789: {
        name: "Katiria", stats: [10807, 11318, 11356, 10245, 11623],
        skills: [156],
        img: "2b6",
        fullName: "Katiria Nullblade II"
    },
    11125: {
        name: "Kekro", stats: [17992, 12001, 15002, 19660, 16302],
        skills: [379],
        autoAttack: 10007,
        img: "33b",
        fullName: "Kekro, Demiwyrm Magus II"
    },
    10767: {
        name: "Kelaino", stats: [12538, 12707, 10490, 15047, 14999],
        skills: [197],
        img: "405",
        fullName: "Kelaino, the Dark Cloud II"
    },
    11381: {
        name: "Kijin", stats: [17047, 3323, 14038, 17402, 16110],
        skills: [566],
        autoAttack: 10031,
        img: "23a",
        fullName: "Kijin, Heavenly Maiden II"
    },
    11279: {
        name: "Kobold", stats: [14207, 14462, 15804, 8442, 14999],
        skills: [449],
        img: "16e",
        fullName: "Kobold Guard Captain II"
    },
    11314: {
        name: "Kua Fu", stats: [16510, 16561, 12207, 9174, 13476],
        skills: [497],
        img: "3e3",
        fullName: "Kua Fu, Sun Chaser II"
    },
    10911: {
        name: "Kyteler", stats: [11721, 12524, 9892, 17254, 16416],
        skills: [258],
        img: "4d4",
        fullName: "Kyteler the Corrupted II"
    },
    10985: {
        name: "Lahamu", stats: [14024, 10784, 15999, 16010, 11001],
        skills: [281],
        autoAttack: 10004,
        img: "2fe",
        fullName: "Lahamu, Royal Viper II"
    },
    21372: {
        name: "Lamashtu", stats: [20579, 17977, 20007, 12062, 17685],
        skills: [555],
        img: "2e5",
        fullName: "Lamashtu, Fell Goddess"
    },
    10432: {
        name: "Lanvall", stats: [12914, 14639, 12245, 12210, 15040],
        skills: [18],
        img: "163",
        fullName: "Lanvall, Lizard Cavalier II"
    },
    11347: {
        name: "Lava Dragon", stats: [19021, 8881, 16237, 18891, 16497],
        skills: [534, 535],
        autoAttack: 10019,
        img: "3de",
        fullName: "Lava Dragon II"
    },
    11128: {
        name: "Leupold", stats: [17585, 11038, 12963, 9794, 16510],
        skills: [378],
        img: "4ca",
        fullName: "Leupold, Wyvern Knight II"
    },
    10852: {
        name: "Libuse", stats: [11221, 13782, 13379, 16048, 13038],
        skills: [245],
        img: "27e",
        fullName: "Libuse, the Black Queen II"
    },
    10933: {
        name: "Linnorm", stats: [12326, 11102, 11979, 16605, 16497],
        skills: [313],
        img: "30b",
        fullName: "Linnorm, the Hailstorm II"
    },
    21433: {
        name: "Liza", stats: [22491, 9517, 16542, 21861, 18011],
        skills: [613],
        autoAttack: 10045,
        img: "4ff",
        fullName: "Liza, Blood-Anointed"
    },
    21187: {
        name: "Loki", stats: [19202, 21231, 16192, 15119, 15806],
        skills: [382],
        img: "47b",
        fullName: "Loki, God of Cunning"
    },
    11316: {
        name: "Long Feng", stats: [15164, 17125, 13539, 10452, 12207],
        skills: [501],
        img: "2ad",
        fullName: "Long Feng, the Dragon Fist II"
    },
    11440: {
        name: "Lucan", stats: [25304, 22011, 18349, 17916, 18154],
        skills: [634],
        autoAttack: 10049,
        img: "419",
        fullName: "Lucan, Eagle Knight II"
    },
    10754: {
        name: "Lucia", stats: [17106, 13878, 16633, 9881, 10857],
        skills: [16],
        img: "197",
        fullName: "Lucia, Petal-Shears II"
    },
    11485: {
        name: "Luot", stats: [18013, 17992, 17006, 9997, 18035],
        skills: [668],
        autoAttack: 10054,
        img: "2c3",
        fullName: "Luot, Scout II"
    },
    10794: {
        name: "Ma-Gu", stats: [14182, 12438, 11477, 15306, 12438],
        skills: [4],
        img: "2a8",
        fullName: "Ma-Gu the Enlightened II"
    },
    11141: {
        name: "Lynx", stats: [14207, 14062, 12500, 10014, 17147],
        skills: [493],
        img: "321",
        fullName: "Madprowl Lynx II"
    },
    10558: {
        name: "Magdal", stats: [13929, 15110, 15132, 13810, 15359],
        skills: [120],
        img: "1c0",
        fullName: "Magdal Dragonheart II"
    },
    11126: {
        name: "Magdal M", stats: [18728, 20917, 21491, 23235, 15998],
        skills: [336],
        img: "346",
        fullName: "Magdal, Dragonmaster II"
    },
    11429: {
        name: "Maisie", stats: [19194, 19097, 16258, 8101, 17905],
        skills: [599, 600],
        autoAttack: 10037,
        img: "1da",
        fullName: "Maisie, Grimoire Keeper II"
    },
    10365: {
        name: "Makalipon", stats: [10343, 8405, 10611, 12280, 10343],
        skills: [60],
        img: "1f1",
        fullName: "Makalipon, Sacred Fruit II"
    },
    11456: {
        name: "Chimaera", stats: [19519, 9986, 16009, 17038, 18013],
        skills: [612, 134],
        autoAttack: 10043,
        img: "4a7",
        fullName: "Maleficent Chimaera II"
    },
    10445: {
        name: "Managarmr", stats: [12210, 12258, 13266, 13887, 11688],
        skills: [108],
        img: "151",
        fullName: "Managarmr Frost Touch II"
    },
    11280: {
        name: "Managarmr M", stats: [20007, 21599, 17396, 23907, 18100],
        skills: [463],
        autoAttack: 10007,
        img: "42b",
        fullName: "Managarmr, the Frost Moon II"
    },
    11319: {
        name: "Manannan", stats: [16551, 10668, 16464, 19227, 16605],
        skills: [513, 514],
        autoAttack: 10007,
        img: "4a4",
        fullName: "Manannan mac Lir II"
    },
    10792: {
        name: "Marchosias", stats: [18165, 15424, 12781, 18566, 13561],
        skills: [210],
        img: "271",
        fullName: "Marchosias, Pit Beast II"
    },
    11136: {
        name: "Marcus", stats: [12317, 16534, 14255, 8991, 15438],
        skills: [358],
        img: "353",
        fullName: "Marcus, Brave of Liberation II"
    },
    332: {
        name: "Mari", stats: [10500, 10980, 10850, 13370, 11500],
        skills: [47],
        img: "1e4",
        fullName: "Mari the Witch"
    },
    11013: {
        name: "Marraco", stats: [18716, 15876, 17254, 7381, 8809],
        skills: [167, 61],
        img: "47b",
        fullName: "Marraco, Crusted Wyrm II"
    },
    10656: {
        name: "Mathilda", stats: [11841, 15172, 10639, 12718, 15218],
        skills: [115],
        img: "368",
        fullName: "Mathilda the Tarantula II"
    },
    10632: {
        name: "Doog", stats: [10560, 10549, 10777, 14330, 11925],
        skills: [94],
        img: "409",
        fullName: "Mauthe Doog II"
    },
    10705: {
        name: "Melanippe", stats: [16139, 16800, 13929, 11849, 15132],
        skills: [195],
        img: "44f",
        fullName: "Melanippe, Wolfrider II"
    },
    11214: {
        name: "Melek", stats: [19097, 16107, 21545, 12792, 10094],
        skills: [374, 375],
        img: "219",
        fullName: "Melek, the Black Peacock II"
    },
    10527: {
        name: "Melusine", stats: [11417, 11976, 10490, 13562, 11210],
        skills: [155],
        img: "272",
        fullName: "Melusine the Witch II"
    },
    11305: {
        name: "Microraptor", stats: [16172, 18577, 14406, 14092, 17753],
        skills: [492],
        img: "414",
        fullName: "Microraptor II"
    },
    11212: {
        name: "Millarca", stats: [15305, 10668, 15565, 21393, 18046],
        skills: [407, 408],
        autoAttack: 10007,
        img: "2ff",
        fullName: "Millarca, Lady of Thorns II"
    },
    11134: {
        name: "Minerva", stats: [14590, 18024, 14438, 15435, 18013],
        skills: [357],
        img: "2a2",
        fullName: "Minerva, Goddess of War II"
    },
    11081: {
        name: "Moni", stats: [13562, 15537, 12121, 10234, 16448],
        skills: [340],
        img: "343",
        fullName: "Moni the Dismemberer II"
    },
    10621: {
        name: "Montu", stats: [12952, 12904, 12269, 12269, 15306],
        skills: [170],
        img: "21d",
        fullName: "Montu, God of War II"
    },
    308: {
        name: "Mordred", stats: [11000, 12050, 10950, 11000, 12500],
        skills: [18],
        img: "16b",
        fullName: "Mordred, Drake Knight"
    },
    10625: {
        name: "Moren", stats: [8502, 11318, 7759, 16803, 8039],
        skills: [10000, 71, 85], // hacky
        isMounted: true,
        img: "34a",
        fullName: "Moren, Rime Mage II"
    },
    11233: {
        name: "Musashi", stats: [20592, 24752, 19151, 17981, 18024],
        skills: [404],
        img: "11f",
        fullName: "Musashi, the Twinblade II"
    },
    10186: {
        name: "Naberius", stats: [9563, 9552, 7828, 11208, 11298],
        skills: [18],
        img: "2e9",
        fullName: "Naberius II"
    },
    10949: {
        name: "Najeeba", stats: [16230, 7539, 10660, 16681, 16803],
        skills: [642],
        autoAttack: 10003,
        img: "48a",
        fullName: "Najeeba, the Mapleblade II"
    },
    11015: {
        name: "Narmer", stats: [15876, 12194, 15172, 8870, 15924],
        skills: [260],
        img: "12d",
        fullName: "Narmer, Mummy King II"
    },
    10989: {
        name: "Nehasim", stats: [12707, 16071, 11390, 12466, 15172],
        skills: [294],
        img: "28b",
        fullName: "Nehasim the Seething II"
    },
    11057: {
        name: "Neith", stats: [18999, 19660, 15002, 12001, 15305],
        skills: [326],
        img: "23b",
        fullName: "Neith, Goddess of War II"
    },
    21291: {
        name: "Nephthys", stats: [21015, 11985, 18202, 22005, 16912],
        skills: [471, 472],
        autoAttack: 10007,
        img: "116",
        fullName: "Nephthys, Ruler of Death"
    },
    10994: {
        name: "Nergal", stats: [13008, 15392, 11947, 11643, 16518],
        skills: [282],
        img: "175",
        fullName: "Nergal, Abyssal Overseer II"
    },
    11079: {
        name: "Nightblade", stats: [12196, 16995, 13528, 10896, 14915],
        skills: [341],
        img: "164",
        fullName: "Nightblade, Archsage of Winds II"
    },
    11369: {
        name: "Nin-Ridu", stats: [16529, 16215, 11351, 10495, 14005],
        skills: [505],
        autoAttack: 10022,
        img: "239",
        fullName: "Nin-Ridu"
    },
    10799: {
        name: "Niu Mo Wang", stats: [14276, 17071, 15998, 13420, 13138],
        skills: [133],
        img: "126",
        fullName: "Niu Mo Wang II"
    },
    10438: {
        name: "Odin Stormgod", stats: [12855, 14346, 12378, 14929, 12245],
        skills: [119],
        img: "15c",
        fullName: "Odin Stormgod II"
    },
    11267: {
        name: "Odin L", stats: [15110, 16562, 13875, 17363, 18057],
        skills: [440, 441],
        isMounted: true,
        img: "365",
        fullName: "Odin, God of Victory II"
    },
    11458: {
        name: "Odoa", stats: [20364, 24600, 16009, 10040, 9520],
        skills: [645, 646],
        img: "1a6",
        fullName: "Odoa, the Scarecrow II"
    },
    21465: {
        name: "Okypete Shd.", stats: [12889, 10506, 13084, 6313, 13214],
        skills: [649],
        img: "203",
        fullName: "Okypete, the Night Breeze II"
    },
    11465: {
        name: "Okypete", stats: [15610, 13331, 15158, 6967, 16840],
        skills: [648],
        autoAttack: 10051,
        img: "39d",
        fullName: "Okypete, the Swiftwing II"
    },
    11446: {
        name: "Olan", stats: [16497, 14048, 14113, 6779, 17255],
        skills: [610, 611],
        img: "36b",
        fullName: "Olan, Tricky Succubus II"
    },
    10889: {
        name: "Olitiau", stats: [14081, 15760, 11676, 11232, 15197],
        skills: [221],
        img: "133",
        fullName: "Olitiau, the Great Bat II"
    },
    10505: {
        name: "Oniroku", stats: [12207, 13731, 12235, 12194, 13621],
        skills: [115],
        img: "196",
        fullName: "Oniroku the Slayer II"
    },
    11088: {
        name: "Ovinnik", stats: [19010, 11210, 20592, 16627, 12315],
        skills: [356, 342],
        autoAttack: 10007,
        img: "3c1",
        fullName: "Ovinnik, Hex Beast II"
    },
    11408: {
        name: "Pakal", stats: [15435, 15175, 10777, 10018, 17103],
        skills: [590, 591],
        img: "168",
        fullName: "Pakal, Jade King II"
    },
    11286: {
        name: "Aquarius", stats: [16323, 7494, 11448, 17363, 16009],
        skills: [450, 451],
        autoAttack: 10007,
        img: "2b9",
        fullName: "Paladin of Aquarius II"
    },
    11310: {
        name: "Cancer", stats: [16627, 17201, 10408, 7494, 16908],
        skills: [478, 479],
        img: "24e",
        fullName: "Paladin of Cancer II"
    },
    11210: {
        name: "Aries", stats: [14395, 15543, 16854, 9011, 12813],
        skills: [392, 393],
        img: "337",
        fullName: "Paladin of Aries II"
    },
    11301: {
        name: "Capricorn", stats: [14937, 8491, 13507, 16551, 15099],
        skills: [476],
        autoAttack: 10007,
        img: "2f4",
        fullName: "Paladin of Capricorn II"
    },
    11325: {
        name: "Gemini", stats: [15197, 15641, 10343, 10148, 17147],
        skills: [511, 512],
        isMounted: true,
        img: "240",
        fullName: "Paladin of Gemini II"
    },
    11277: {
        name: "Leo", stats: [15121, 15002, 14200, 7440, 16811],
        skills: [448],
        autoAttack: 10014,
        img: "491",
        fullName: "Paladin of Leo II"
    },
    11389: {
        name: "Ophiuchus", stats: [19508, 9000, 15002, 19541, 17504],
        skills: [583, 584],
        autoAttack: 10007,
        img: "13d",
        fullName: "Paladin of Ophiuchus II"
    },
    11229: {
        name: "Pisces", stats: [13041, 8621, 14796, 17114, 14991],
        skills: [419],
        autoAttack: 10007,
        img: "122",
        fullName: "Paladin of Pisces II"
    },
    11200: {
        name: "Libra", stats: [14178, 16172, 14698, 9845, 13669],
        skills: [390],
        img: "486",
        fullName: "Paladin of Libra II"
    },
    11334: {
        name: "Sagittarius", stats: [15587, 15218, 12163, 8415, 17255],
        skills: [507, 508],
        img: "3c0",
        fullName: "Paladin of Sagittarius II"
    },
    11353: {
        name: "Scorpio", stats: [14146, 15998, 13117, 8350, 16995],
        skills: [544],
        img: "4fe",
        fullName: "Paladin of Scorpio II"
    },
    11362: {
        name: "Taurus", stats: [15608, 18598, 10105, 7007, 17363],
        skills: [553, 554],
        img: "2d3",
        fullName: "Paladin of Taurus II"
    },
    11241: {
        name: "Virgo", stats: [15500, 6118, 12380, 17797, 16822],
        skills: [421, 422],
        autoAttack: 10007,
        img: "4cf",
        fullName: "Paladin of Virgo II"
    },
    11231: {
        name: "Palna", stats: [14999, 15509, 14606, 8991, 13807],
        skills: [420],
        img: "3fb",
        fullName: "Palna, the Vanguard II"
    },
    11374: {
        name: "Pazuzu", stats: [15121, 17182, 14988, 5640, 14999],
        skills: [556],
        img: "24d",
        fullName: "Pazuzu, the Whirling Jinn II"
    },
    11259: {
        name: "Peg Powler", stats: [15500, 7353, 12499, 17049, 16204],
        skills: [636],
        autoAttack: 10047,
        img: "30c",
        fullName: "Peg Powler II"
    },
    10348: {
        name: "Pegasus", stats: [8756, 10200, 8843, 10880, 9181],
        skills: [111],
        img: "469",
        fullName: "Pegasus, the Light Divine II"
    },
    10831: {
        name: "Pegasus Knight", stats: [15251, 19032, 15370, 13073, 18046],
        skills: [311, 312],
        isMounted: true,
        img: "3e4",
        fullName: "Pegasus Knight II"
    },
    11425: {
        name: "Pelops", stats: [15056, 14113, 10018, 12055, 17266],
        skills: [597, 598],
        img: "3ee",
        fullName: "Pelops, Fallen Hero II"
    },
    10013: {
        name: "Pendragon", stats: [9844, 10317, 10751, 12357, 10861],
        skills: [60],
        img: "345",
        fullName: "Pendragon, the Scourge II"
    },
    21368: {
        name: "Perendon", stats: [19202, 17300, 17055, 17009, 17604],
        skills: [504],
        autoAttack: 10021,
        img: "124",
        fullName: "Perendon the Pure"
    },
    11020: {
        name: "Phantasmal Succubus", stats: [18013, 13604, 20007, 17190, 10701],
        skills: [272, 273],
        img: "1fb",
        fullName: "Phantasmal Succubus II"
    },
    10710: {
        name: "Phantom Assassin", stats: [13507, 13951, 11102, 14341, 14081],
        skills: [193],
        img: "110",
        fullName: "Phantom Assassin II"
    },
    11022: {
        name: "Phantom Knight", stats: [19877, 23213, 19270, 19682, 18057],
        skills: [267],
        img: "461",
        fullName: "Phantom Knight, the Vagabond II"
    },
    11469: {
        name: "Phineus", stats: [13597, 7005, 9894, 14561, 10915],
        skills: [654],
        autoAttack: 10007,
        img: "37a",
        fullName: "Phineus, the Augur King II"
    },
    11039: {
        name: "Phoenix", stats: [14005, 11188, 12033, 19010, 12185],
        skills: [305],
        img: "125",
        fullName: "Phoenix, the Metempsychosis II"
    },
    21489: {
        name: "Poliahu", stats: [23572, 8648, 17482, 22365, 18202],
        skills: [655, 656],
        autoAttack: 10007,
        img: "17d",
        fullName: "Poliahu, the Mauna Kea"
    },
    11237: {
        name: "Pollux", stats: [13290, 18631, 11654, 10311, 13756],
        skills: [427, 428],
        img: "1a2",
        fullName: "Pollux, Fallen Hero II"
    },
    10876: {
        name: "Pontifex", stats: [14590, 16410, 13507, 18371, 17797],
        skills: [229, 167],
        img: "2bd",
        fullName: "Pontifex Antiquus II"
    },
    10075: {
        name: "Pouliquen", stats: [7890, 6271, 8910, 9439, 7843],
        skills: [16],
        img: "26c",
        fullName: "Pouliquen, Archibishop II"
    },
    10785: {
        name: "Premyslid", stats: [13626, 16984, 14926, 18772, 11232],
        skills: [244],
        img: "2c7",
        fullName: "Premyslid, the Black King II"
    },
    10599: {
        name: "Princeps", stats: [9360, 10772, 9674, 10181, 11667],
        skills: [156],
        img: "4dc",
        fullName: "Princeps, Angel of Doom II"
    },
    11203: {
        name: "Prismatic", stats: [24004, 14438, 20982, 23300, 18024],
        skills: [432],
        autoAttack: 10007,
        img: "4fe",
        fullName: "Prismatic Wyvern"
    },
    11100: {
        name: "Queen Waspmen", stats: [14070, 19898, 13247, 15998, 17829],
        skills: [348],
        img: "1f6",
        fullName: "Queen of the Waspmen II"
    },
    11486: {
        name: "Qing Nu", stats: [19010, 8957, 15002, 19541, 17992],
        skills: [677, 678],
        autoAttack: 10007,
        img: "14f",
        fullName: "Qing Nu, Snowweaver II"
    },
    21340: {
        name: "Cetus", stats: [22316, 20624, 17579, 11013, 16729],
        skills: [524],
        autoAttack: 10021,
        img: "30a",
        fullName: "Raging Cetus"
    },
    11048: {
        name: "Ragnar", stats: [13245, 15804, 12001, 10294, 16510],
        skills: [314],
        img: "497",
        fullName: "Ragnar, Dragonslayer II"
    },
    10664: {
        name: "Ramiel", stats: [15543, 13929, 13431, 16388, 14709],
        skills: [185],
        img: "3da",
        fullName: "Ramiel, Angel of the Storm II"
    },
    10699: {
        name: "Rampant Lion", stats: [16291, 17569, 16518, 12564, 18035],
        skills: [380, 381],
        img: "387",
        fullName: "Rampant Lion II"
    },
    10806: {
        name: "Rapse", stats: [11928, 14182, 13110, 11270, 15524],
        skills: [179],
        img: "4e0",
        fullName: "Rapse, the Bloody Horns II"
    },
    10863: {
        name: "Rasiel", stats: [11936, 15587, 11817, 17797, 11004],
        skills: [234],
        img: "213",
        fullName: "Rasiel, Angel All-Knowing II"
    },
        10844: {
        name: "Regin", stats: [12734, 13342, 12832, 16144, 11270],
        skills: [155],
        img: "2b6",
        fullName: "Regin, the Brass Mantis II"
    },
    11196: {
        name: "Brass Gorilla", stats: [18996, 9760, 18096, 12684, 8319],
        skills: [398],
        img: "26b",
        fullName: "Reinforced Brass Gorilla II"
    },
    11215: {
        name: "Rohde", stats: [17591, 8101, 16042, 15305, 10582],
        skills: [376, 377],
        autoAttack: 10007,
        img: "23b",
        fullName: "Rohde, the Rose Thorn II"
    },
    10845: {
        name: "Rovn", stats: [16269, 19086, 18772, 13214, 13355],
        skills: [228],
        img: "2a4",
        fullName: "Rovn, the Brass Panzer II"
    },
    11066: {
        name: "Ruprecht", stats: [12911, 15316, 11795, 17504, 11199],
        skills: [330, 334],
        img: "479",
        fullName: "Ruprecht the Punisher II"
    },
    11295: {
        name: "Ryaum", stats: [19454, 13561, 17667, 11221, 17602],
        skills: [482, 483],
        img: "237",
        fullName: "Ryaum, Hussar Captain II"
    },
    11343: {
        name: "Sachiel", stats: [19357, 14059, 13052, 17017, 17526],
        skills: [527, 528],
        img: "42b",
        fullName: "Sachiel, Angel of Water II"
    },
    11063: {
        name: "Treant", stats: [18566, 17017, 22542, 13626, 8014],
        skills: [154],
        img: "167",
        fullName: "Sagacious Treant II"
    },
    11234: {
        name: "Saizo", stats: [16128, 12055, 16367, 19422, 16995],
        skills: [405],
        autoAttack: 10007,
        img: "241",
        fullName: "Saizo, Phantom Ninja II"
    },
    10966: {
        name: "Saurva", stats: [14958, 15305, 11329, 11362, 15002],
        skills: [259],
        img: "1f3",
        fullName: "Saurva, the Lawless Lord II"
    },
    21228: {
        name: "Hierophant", stats: [19681, 13391, 17534, 20112, 16950],
        skills: [418],
        autoAttack: 10007,
        img: "1b1",
        fullName: "Scathing Hierophant"
    },
    10676: {
        name: "Scirocco", stats: [15002, 14503, 14503, 18999, 16497],
        skills: [331, 301],
        img: "3d5",
        fullName: "Scirocco, Father of Winds II"
    },
    10626: {
        name: "Marid", stats: [14070, 17851, 14449, 12597, 15478],
        skills: [169],
        img: "2ed",
        fullName: "Scorching Marid II"
    },
    11036: {
        name: "Sea Serpent", stats: [16020, 12012, 15121, 19259, 17103],
        skills: [302],
        img: "165",
        fullName: "Sea Serpent II"
    },
    11470: {
        name: "Sedna", stats: [20321, 17840, 19129, 7072, 17699],
        skills: [657, 658],
        autoAttack: 10033,
        img: "18d",
        fullName: "Sedna, the Frozen Sea II"
    },
    11379: {
        name: "Seimei", stats: [19963, 6389, 17038, 19053, 17103],
        skills: [564, 565],
        autoAttack: 10007,
        img: "4b7",
        fullName: "Seimei, Onmyoji II"
    },
    11204: {
        name: "Seismo", stats: [18999, 19097, 15056, 11015, 16800],
        skills: [433],
        img: "188",
        fullName: "Seismo Worm"
    },
    10258: {
        name: "Sekhmet", stats: [12529, 16780, 13843, 13598, 13823],
        skills: [11],
        img: "3d7",
        fullName: "Sekhmet Aflame II"
    },
    11056: {
        name: "Selk", stats: [13902, 15854, 11976, 11208, 14927],
        skills: [327],
        img: "403",
        fullName: "Selk, Desert King II"
    },
    11321: {
        name: "Selkie", stats: [15804, 8442, 14049, 16024, 13586],
        skills: [515, 516],
        autoAttack: 10007,
        img: "431",
        fullName: "Selkie, Lady of the Shore II"
    },
    11413: {
        name: "Sera", stats: [14293, 17023, 13306, 7406, 15903],
        skills: [594, 595],
        img: "284",
        fullName: "Sera, Exorcist II"
    },
    11290: {
        name: "Set", stats: [13097, 16364, 10990, 10001, 17133],
        skills: [469],
        img: "2c6",
        fullName: "Set, God of the Sands II"
    },
    11006: {
        name: "Siby", stats: [15558, 8005, 11442, 17120, 15804],
        skills: [550],
        autoAttack: 10018,
        img: "20c",
        fullName: "Siby, Sea Seer II"
    },
    11219: {
        name: "Sigiled Corpse Beast", stats: [17006, 12954, 14926, 19855, 16042],
        skills: [414, 415],
        autoAttack: 10007,
        img: "1f6",
        fullName: "Sigiled Corpse Beast II"
    },
    11220: {
        name: "Sigiled Axeman", stats: [14644, 9076, 12987, 18338, 13409],
        skills: [416],
        autoAttack: 10007,
        img: "39e",
        fullName: "Sigiled Skeleton Axeman II"
    },
    10987: {
        name: "Sihn", stats: [12001, 10495, 12001, 17504, 16497],
        skills: [285],
        img: "453",
        fullName: "Sihn, Moonlight King II"
    },
    11207: {
        name: "Silver Dragon", stats: [19714, 14601, 15067, 16215, 18154],
        skills: [522, 523],
        autoAttack: 10024,
        img: "48e",
        fullName: "Silver Dragon II"
    },
    11387: {
        name: "Simurgh", stats: [15524, 6956, 12145, 17206, 16110],
        skills: [580],
        autoAttack: 10007,
        img: "2a2",
        fullName: "Simurgh, Bird Divine II"
    },
    11093: {
        name: "Sinbad", stats: [15868, 18154, 14644, 13853, 17006],
        skills: [318],
        img: "29e",
        fullName: "Sinbad the Adventurer II"
    },
    10566: {
        name: "Bedwyr", stats: [12235, 11318, 12221, 13510, 10598],
        skills: [145],
        img: "321",
        fullName: "Sir Bedwyr of the Garden II"
    },
    10921: {
        name: "Brandiles", stats: [17017, 18100, 16269, 13940, 14070],
        skills: [252],
        img: "106",
        fullName: "Sir Brandiles, the Flameblade II"
    },
    11455: {
        name: "Skeleton King", stats: [19714, 19064, 20982, 6097, 18143],
        skills: [605, 606],
        autoAttack: 10041,
        img: "3b5",
        fullName: "Skeleton King II"
    },
    11074: {
        name: "Skoll", stats: [15002, 13160, 15153, 9000, 16302],
        skills: [367, 301],
        img: "3e8",
        fullName: "Skoll, Dark Wolf II"
    },
    11038: {
        name: "Skrimsl", stats: [13049, 11417, 12466, 17182, 13379],
        skills: [303],
        img: "278",
        fullName: "Skrimsl the Freezing II"
    },
    11273: {
        name: "Slagh", stats: [12978, 16561, 11098, 11683, 15631],
        skills: [457],
        img: "13c",
        fullName: "Slagh, Carnage Incarnate II"
    },
    11480: {
        name: "Snegurochka", stats: [20007, 7895, 16063, 22000, 18143],
        skills: [672, 673],
        autoAttack: 10057,
        img: "306",
        fullName: "Snegurochka II"
    },
    10450: {
        name: "Snow Queen", stats: [14070, 13994, 13940, 15229, 14449],
        skills: [128],
        img: "399",
        fullName: "Snow Queen II"
    },
    10614: {
        name: "Solsten", stats: [13940, 14449, 15998, 17233, 12900],
        skills: [165],
        img: "37a",
        fullName: "Solsten the Really Wanted II"
    },
    10941: {
        name: "Soura", stats: [12012, 12261, 7917, 16930, 17667],
        skills: [287, 291],
        img: "4f1",
        fullName: "Soura, Inferno Shaman II"
    },
    10568: {
        name: "Spellforged Cyclops", stats: [17047, 11683, 14096, 11111, 10380],
        skills: [61],
        img: "2c7",
        fullName: "Spellforged Cyclops II"
    },
    10850: {
        name: "Stalo", stats: [16269, 16280, 16681, 12792, 13496],
        skills: [241],
        img: "296",
        fullName: "Stalo, Glacial Giant II"
    },
    414: {
        name: "Steamwork", stats: [14360, 10800, 10600, 12240, 10560],
        skills: [11],
        img: "3de",
        fullName: "Steamwork Dragon"
    },
    10955: {
        name: "Sugaar", stats: [13110, 7481, 14293, 16950, 16097],
        skills: [465],
        autoAttack: 10007,
        img: "19b",
        fullName: "Sugaar, the Thunderstorm II"
    },
    10461: {
        name: "Sulima", stats: [13417, 13583, 12194, 12293, 12269],
        skills: [17],
        img: "1ec",
        fullName: "Sulima, Executioner II"
    },
    11189: {
        name: "Surtr", stats: [15440, 17106, 15085, 7016, 12890],
        skills: [383],
        img: "15b",
        fullName: "Surtr the Fervent II"
    },
    11017: {
        name: "Svadilfari", stats: [15977, 19595, 13442, 15998, 14503],
        skills: [369, 370],
        img: "1ce",
        fullName: "Svadilfari II"
    },
    11000: {
        name: "Tanba", stats: [17580, 23213, 17883, 23289, 18057],
        skills: [236],
        img: "3a8",
        fullName: "Tanba, Founder of the Ninja II"
    },
    327: {
        name: "Tangata", stats: [10500, 10800, 10630, 10740, 12480],
        skills: [110],
        img: "3b4",
        fullName: "Tangata Manu"
    },
    11122: {
        name: "Tannin", stats: [13669, 15500, 12683, 19541, 17894],
        skills: [298],
        img: "24a",
        fullName: "Tannin, Sea Dragon II"
    },
    695: {
        name: "Tawiscara", stats: [11914, 14513, 14395, 11366, 15630],
        skills: [161],
        img: "3f5",
        fullName: "Tawiscara"
    },
    10582: {
        name: "Tepaxtl", stats: [10831, 13562, 9209, 13110, 12100],
        skills: [115],
        img: "37d",
        fullName: "Tepaxtl, Fatal Fang II"
    },
    11103: {
        name: "Tiamat", stats: [13702, 14698, 16497, 18869, 15738],
        skills: [280],
        img: "2c5",
        fullName: "Tiamat, Mother of Dragons II"
    },
    1: {
        name: "Black Brute", stats: [14254, 17131, 13848, 11794, 11699],
        skills: [34],
        isWarlord: true,
        img: "36f",
        fullName: "The Black Brute"
    },
    2: {
        name: "Blue Beard", stats: [12982, 11344, 15588, 15554, 13527],
        skills: [118],
        isWarlord: true,
        img: "10a",
        fullName: "The Blue Beard"
    },
    3: {
        name: "Golden Lance", stats: [14462, 13994, 11951, 12227, 16809],
        skills: [10],
        isWarlord: true,
        img: "3d6",
        fullName: "The Golden Lance"
    },
    4: {
        name: "Green Healer", stats: [13770, 10556, 16359, 15329, 13596],
        skills: [116, 111],
        isWarlord: true,
        img: "265",
        fullName: "The Green Healer"
    },
    5: {
        name: "Grey Mage", stats: [13415, 13838, 10712, 15865, 16602],
        skills: [40],
        isWarlord: true,
        img: "248",
        fullName: "The Grey Mage"
    },
    6: {
        name: "Purple Knife", stats: [13735, 16281, 10712, 15779, 13595],
        skills: [113],
        isWarlord: true,
        img: "3ee",
        fullName: "The Purple Knife"
    },
    7: {
        name: "Red Samurai", stats: [13432, 14783, 13961, 12869, 14333],
        skills: [46],
        isWarlord: true,
        img: "4ad",
        fullName: "The Red Samurai"
    },
    8: {
        name: "White Knight", stats: [13916, 14332, 15311, 12851, 13466],
        skills: [46], // todo: change this to 14 later
        isWarlord: true,
        img: "225",
        fullName: "The White Knight"
    },
    10480: {
        name: "Thor", stats: [10343, 13245, 11807, 13842, 11917],
        skills: [114],
        img: "3a1",
        fullName: "Thor, God of Lightning II"
    },
    21264: {
        name: "Thor L", stats: [20007, 22002, 19063, 10334, 16518],
        skills: [437],
        autoAttack: 10011,
        img: "323",
        fullName: "Thor, the Roaring Thunder"
    },
    10859: {
        name: "Thunderbird", stats: [15912, 16995, 13572, 15771, 17006],
        skills: [231],
        img: "2be",
        fullName: "Thunderbird II"
    },
    11236: {
        name: "Tomoe", stats: [13889, 16010, 13110, 8285, 16622],
        skills: [406],
        img: "2b5",
        fullName: "Tomoe, the Lightning Arrow II"
    },
    11143: {
        name: "TBB", stats: [12001, 9905, 12207, 17000, 16803],
        skills: [366],
        autoAttack: 10007,
        img: "115",
        fullName: "Tormented Bone Beast II"
    },
    10747: {
        name: "Tristan", stats: [13832, 16193, 15197, 13052, 15771],
        skills: [122],
        img: "3c3",
        fullName: "Tristan the Sorrowful II"
    },
    11472: {
        name: "Tulok", stats: [15498, 15047, 10807, 5247, 10198],
        skills: [662],
        img: "3a7",
        fullName: "Tulok, Icebreaker II"
    },
    10647: {
        name: "Tuniq", stats: [13635, 16709, 12062, 12086, 9794],
        skills: [150],
        img: "29c",
        fullName: "Tuniq, Guardian Colossus II"
    },
    10454: {
        name: "Stormwyrm", stats: [11025, 11514, 9646, 14489, 11318],
        skills: [47],
        img: "3ee",
        fullName: "Two-Headed Stormwyrm II"
    },
    10735: {
        name: "Typhon", stats: [14677, 13355, 14341, 17959, 13626],
        skills: [117],
        autoAttack: 10001,
        img: "283",
        fullName: "Typhon II"
    },
    10344: {
        name: "Hydarnes", stats: [11928, 12832, 10587, 14182, 11928],
        skills: [114],
        img: "4fd",
        fullName: "Undead General, Hydarnes II"
    },
    10920: {
        name: "Unicorn", stats: [10807, 12600, 8770, 11721, 12001],
        skills: [156],
        img: "204",
        fullName: "Unicorn, Spirit Eater II"
    },
    11124: {
        name: "Ushabti", stats: [12434, 16475, 14655, 10062, 14027],
        skills: [317],
        img: "21d",
        fullName: "Ushabti II"
    },
    11268: {
        name: "Vafthruthnir", stats: [15500, 17732, 13008, 9997, 12228],
        skills: [442],
        img: "22b",
        fullName: "Vafthruthnir, Elder Giant II"
    },
    10896: {
        name: "Valin", stats: [15500, 16865, 22953, 12716, 11167],
        skills: [263],
        img: "34a",
        fullName: "Valin the Terrible II"
    },
    11008: {
        name: "Karkadann", stats: [17034, 16475, 13510, 7822, 13097],
        skills: [521],
        img: "422",
        fullName: "Venomhorn Karkadann II"
    },
    11137: {
        name: "Venusia", stats: [14514, 18273, 13333, 10831, 11492],
        skills: [361],
        img: "403",
        fullName: "Venusia, the Grace II"
    },
    10807: {
        name: "Vezat", stats: [16648, 18165, 14709, 13431, 17721],
        skills: [214],
        img: "429",
        fullName: "Vezat, Dragonbone Warrior II"
    },
    10572: {
        name: "Vivian", stats: [14677, 17851, 15229, 13095, 14677],
        skills: [224],
        img: "25f",
        fullName: "Vivian Griffinrider II"
    },
    11021: {
        name: "Vlad", stats: [16323, 19508, 13680, 14709, 16529],
        skills: [296, 295],
        img: "356",
        fullName: "Vlad the Impaler II"
    },
    10675: {
        name: "Void Yaksha", stats: [15706, 18013, 14471, 14276, 15814],
        skills: [199],
        img: "297",
        fullName: "Void Yaksha II"
    },
    11406: {
        name: "Vucub", stats: [16123, 13110, 14732, 6967, 17000],
        skills: [586],
        img: "2aa",
        fullName: "Vucub Caquix, the Barbarian II"
    },
    11461: {
        name: "Wang Yi", stats: [16024, 6577, 11855, 17000, 16816],
        skills: [621, 622],
        autoAttack: 10007,
        img: "1b8",
        fullName: "Wang Yi, Lady of Iron II"
    },
    11046: {
        name: "Waheela", stats: [17006, 13008, 16204, 16692, 18100],
        skills: [19, 134],
        img: "2dc",
        fullName: "Waheela, Dire Wolf II"
    },
    11396: {
        name: "Wicker Man", stats: [16605, 6833, 11654, 16670, 16930],
        skills: [581, 582],
        autoAttack: 10036,
        img: "2d2",
        fullName: "Wicker Man II"
    },
    10570: {
        name: "Wolfert", stats: [14189, 23972, 13723, 13290, 13431],
        skills: [118],
        img: "391",
        fullName: "Wolfert, Grave Keeper II"
    },
    10798: {
        name: "Wu Chang", stats: [10294, 14182, 10977, 10600, 11928],
        skills: [115],
        img: "365",
        fullName: "Wu Chang the Infernal II"
    },
    11018: {
        name: "Warden", stats: [19400, 17504, 18273, 11026, 11795],
        skills: [532],
        img: "33d",
        fullName: "Wyrm Warden, Everwakeful II"
    },
    11218: {
        name: "Xaphan", stats: [13013, 9415, 12573, 17000, 15537],
        skills: [412],
        img: "47f",
        fullName: "Xaphan, the Foul Flame II"
    },
    11315: {
        name: "Xuan Wu", stats: [18013, 18609, 17038, 13821, 13507],
        skills: [499, 500],
        autoAttack: 10020,
        img: "325",
        fullName: "Xuan Wu II"
    },
    10995: {
        name: "Ymir", stats: [22650, 24600, 16464, 20592, 15933],
        skills: [227],
        img: "167",
        fullName: "Ymir, Primordial Giant II"
    },
    10486: {
        name: "Yulia", stats: [14081, 14664, 12052, 13544, 12524],
        skills: [134],
        img: "341",
        fullName: "Yulia, Snakesage II"
    },
    10497: {
        name: "Zagan", stats: [16128, 16941, 14709, 12423, 13052],
        skills: [143],
        img: "192",
        fullName: "Zagan II"
    },
    11077: {
        name: "Zahhak", stats: [16789, 10051, 19151, 17797, 17168],
        skills: [339],
        autoAttack: 10001,
        img: "194",
        fullName: "Zahhak, Dragon Marshal II"
    },
    10869: {
        name: "Zanga", stats: [10218, 10787, 9694, 9512, 12780],
        skills: [161],
        img: "1cf",
        fullName: "Zanga, the Iron Storm II"
    },
    10992: {
        name: "Zeruel", stats: [16995, 19573, 13886, 13507, 16984],
        skills: [351, 352],
        img: "4a7",
        fullName: "Zeruel, Angel of War II"
    },
    11443: {
        name: "Zorg", stats: [14073, 15196, 11331, 5395, 10805],
        skills: [629],
        img: "1e0",
        fullName: "Zorg, the Cruncher II"
    },
    10474: {
        name: "Zuniga", stats: [12987, 15132, 14276, 14839, 14709],
        skills: [132],
        img: "322",
        fullName: "Zuniga, Guard Captain II"
    }
};

// a simple class that acts like a lazy store of different familiar lists
class FamiliarDatabase {
    // contains ids of fam in different tiers
    static tierList = null;

    // contains ids of all fam
    static allIdList = null;

    static getTierList(tierToGet: string, allTierString: string) {
        if (!this.tierList) {
            // parse and make the whole tier list
            this.tierList = {};
            var allTierList = JSON.parse(allTierString);
            var tierArray = ["X+", "X", "S+", "S", "A+", "A", "B", "C"];

            for (var i = 0; i < tierArray.length; i++) {
                var tierNameList = [];
                var tier = tierArray[i];

                for (var j = 0; j < allTierList[tier].length; j++) {
                    tierNameList.push(allTierList[tier][j].name);
                }

                this.tierList[tier] = [];

                for (var key in famDatabase) {
                    if (famDatabase.hasOwnProperty(key)) {
                        var name = famDatabase[key].fullName;
                        if (tierNameList.indexOf(name) != -1) {
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
    static getAllFamiliarList() {
        if (!this.allIdList) {
            this.allIdList = [];

            for (var key in famDatabase) {
                if (famDatabase.hasOwnProperty(key) && !famDatabase[key].isWarlord) {
                    this.allIdList.push(key);
                }
            }
        }

        return this.allIdList;
    }

    static getRandomFamList(type: ENUM.RandomBrigType, allTierString: string) {
        var tierXP = this.getTierList("X+", allTierString);
        var tierX = this.getTierList("X", allTierString);
        var tierSP = this.getTierList("S+", allTierString);
        var tierS = this.getTierList("S", allTierString);
        var tierAP = this.getTierList("A+", allTierString);
        var tierA = this.getTierList("A", allTierString);

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
