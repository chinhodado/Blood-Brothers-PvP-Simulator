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
        img: "img2$1/__cb20140423020347/$2/1/1c/Abyssal_Rahab_II_Figure.png",
        fullName: "Abyssal Rahab II"
    },
    11282: {
        name: "Achilles", stats: [13593, 15630, 11362, 10603, 16562],
        skills: [459, 460],
        img: "img1$1/__cb20140514075703/$2/c/c7/Achilles%2C_Fallen_Hero_II_Figure.png",
        fullName: "Achilles, Fallen Hero II"
    },
    10613: {
        name: "Adara", stats: [16024, 12134, 17620, 10857, 9370],
        skills: [166],
        img: "img2$1/__cb20130408194639/$2/6/68/Adara_Luck_Shot_II_Figure.png",
        fullName: "Adara Luck Shot II"
    },
    11099: {
        name: "Adranus", stats: [20223, 23517, 19855, 18609, 18046],
        skills: [347],
        img: "img2$1/__cb20140122120804/$2/7/75/Adranus%2C_Lava_Beast_II_Figure.png",
        fullName: "Adranus, Lava Beast II"
    },
    358: {
        name: "Aegis", stats: [14560, 11280, 15530, 10600, 10100],
        skills: [64],
        img: "img2$1/__cb20130125001448/$2/3/35/Aegis%2C_the_Bulwark_Figure.png",
        fullName: "Aegis, the Bulwark"
    },
    11206: {
        name: "Aeneas", stats: [14590, 15630, 13561, 10311, 13561],
        skills: [400, 401],
        img: "img2$1/__cb20140318125230/$2/5/5c/Aeneas%2C_Fallen_Hero_II_Figure.png",
        fullName: "Aeneas, Fallen Hero II"
    },
    11385: {
        name: "Aeshma", stats: [17558, 17212, 15034, 5804, 13019],
        skills: [579],
        autoAttack: 10035,
        img: "img2$1/__cb20140923104300/$2/4/43/Aeshma%2C_the_Tyrant_II_Figure.png",
        fullName: "Aeshma, the Tyrant II"
    },
    11344: {
        name: "Afanc", stats: [16518, 8610, 14124, 16020, 13214],
        skills: [529, 530],
        autoAttack: 10003,
        img: "img4$1/__cb20140730092623/$2/a/a1/Afanc%2C_Beast_of_the_Deep_II_Figure.png",
        fullName: "Afanc, Beast of the Deep II"
    },
    21404: {
        name: "Ah Puch", stats: [22515, 9134, 18258, 20999, 17486],
        skills: [585],
        autoAttack: 10007,
        img: "img4$1/__cb20140930103246/$2/6/60/Ah_Puch%2C_Lord_of_Death_Figure.png",
        fullName: "Ah Puch, Lord of Death"
    },
    11041: {
        name: "Ahab", stats: [10273, 12001, 11342, 9978, 12342],
        skills: [195],
        img: "img2$1/__cb20131129143807/$2/e/ec/Ahab%2C_the_Colossal_Anchor_II_Figure.png",
        fullName: "Ahab, the Colossal Anchor II"
    },
    10841: {
        name: "Alcina", stats: [12684, 14169, 11356, 13682, 15755],
        skills: [269],
        img: "img3$1/__cb20131023124730/$2/1/1b/Alcina_the_Soulsucker_II_Figure.png",
        fullName: "Alcina the Soulsucker II"
    },
    11400: {
        name: "Ales", stats: [18119, 18009, 16024, 10101, 5884],
        skills: [562, 563],
        img: "img4$1/__cb20140830112829/$2/d/d5/Ales_Darkblood_II_Figure.png",
        fullName: "Ales Darkblood II"
    },
    10813: {
        name: "ASK", stats: [12952, 14282, 11477, 10490, 17133],
        skills: [219],
        img: "img3$1/__cb20130801154343/$2/3/39/All-Seeing_Keeper_II_Figure.png",
        fullName: "All-Seeing Keeper II"
    },
    10936: {
        name: "Merrow", stats: [16811, 14709, 13723, 17537, 17320],
        skills: [217],
        img: "img2$1/__cb20130725105247/$2/6/6d/Alluring_Merrow_II_Figure.png",
        fullName: "Alluring Merrow II"
    },
    10972: {
        name: "Alp", stats: [11917, 14120, 10928, 17168, 13366],
        skills: [277],
        img: "img2$1/__cb20131101130545/$2/0/0d/Alp%2C_Dynast_of_Darkness_II_Figure.png",
        fullName: "Alp, Dynast of Darkness II"
    },
    10623: {
        name: "Warfist", stats: [10904, 11417, 10466, 10660, 11830],
        skills: [156],
        img: "img2$1/__cb20130414034805/$2/1/1a/Amazon_Warfist_II_Figure.png",
        fullName: "Amazon Warfist II"
    },
    11058: {
        name: "Ammit", stats: [18306, 23495, 18501, 18490, 18057],
        skills: [325],
        img: "img2$1/__cb20131221031343/$2/f/f9/Ammit%2C_Soul_Destroyer_II_Figure.png",
        fullName: "Ammit, Soul Destroyer II"
    },
    10717: {
        name: "Amon", stats: [13171, 16128, 10755, 14861, 13214],
        skills: [47],
        img: "img3$1/__cb20130809222440/$2/8/86/Amon%2C_Marquis_of_Blaze_II_Figure.png",
        fullName: "Amon, Marquis of Blaze II"
    },
    10757: {
        name: "Amphisbaena", stats: [14861, 14850, 13030, 19855, 18024],
        skills: [202, 203],
        isMounted: true,
        img: "img3$1/__cb20130622163801/$2/4/46/Amphisbaena_II_Figure.png",
        fullName: "Amphisbaena II"
    },
    11065: {
        name: "ABS", stats: [14005, 15901, 11903, 11838, 14904],
        skills: [365],
        img: "img1$1/__cb20140207105441/$2/e/e0/Ancient_Beetle_Soldier_II_Figure.png",
        fullName: "Ancient Beetle Soldier II"
    },
    10464: {
        name: "Andorra", stats: [12538, 13621, 13510, 12134, 12342],
        skills: [142],
        img: "img2$1/__cb20130325180458/$2/5/52/Andorra_the_Indomitable_II_Figure.png",
        fullName: "Andorra the Indomitable II"
    },
    10947: {
        name: "Ankou", stats: [17017, 9628, 16854, 14308, 10246],
        skills: [345, 346],
        autoAttack: 10007,
        isMounted: true,
        img: "img4$1/__cb20140116043959/$2/d/d6/Ankou%2C_Harbinger_of_Death_II_Figure.png",
        fullName: "Ankou, Harbinger of Death II"
    },
    10999: {
        name: "Anne", stats: [12232, 13782, 12342, 13510, 15599],
        skills: [250],
        img: "img1$1/__cb20130919144950/$2/3/3d/Anne%2C_the_Whirlwind_II_Figure.png",
        fullName: "Anne, the Whirlwind II"
    },
    11245: {
        name: "Anneberg", stats: [19097, 18241, 17038, 8794, 16518],
        skills: [489, 490],
        img: "img1$1/__cb20140614112314/$2/e/e1/Anneberg%2C_Steel_Steed_II_Figure.png",
        fullName: "Anneberg, Steel Steed II"
    },
    11292: {
        name: "Anubis", stats: [14330, 17006, 12510, 10625, 14005],
        skills: [473, 474],
        img: "img2$1/__cb20140528102650/$2/4/47/Anubis%2C_Keeper_of_the_Dead_II_Figure.png",
        fullName: "Anubis, Keeper of the Dead II"
    },
    21288: {
        name: "Apep", stats: [20543, 20975, 15503, 14302, 16729],
        skills: [468],
        autoAttack: 10017,
        img: "img1$1/__cb20140528104324/$2/7/79/Apep_the_Chaotic_Figure.png",
        fullName: "Apep the Chaotic"
    },
    10593: {
        name: "Apocalyptic Beast", stats: [14189, 15977, 15413, 13420, 14969],
        skills: [123],
        img: "img1$1/__cb20130227203821/$2/5/5a/Apocalyptic_Beast_II_Figure.png",
        fullName: "Apocalyptic Beast II"
    },
    11281: {
        name: "Chariot", stats: [17342, 19346, 16453, 10376, 17472],
        skills: [464],
        img: "img3$1/__cb20140520122105/$2/d/da/Arcanan_Chariot_II_Figure.png",
        fullName: "Arcanan Chariot II"
    },
    21300: {
        name: "Fate", stats: [20706, 17848, 13181, 18794, 17522],
        skills: [475],
        autoAttack: 10007,
        img: "img3$1/__cb20140606074954/$2/e/ee/Arcanan_Circle_of_Fate_Figure.png",
        fullName: "Arcanan Circle of Fate"
    },
    11335: {
        name: "Daemon", stats: [18252, 20700, 12510, 13117, 15023],
        skills: [509, 510],
        img: "img2$1/__cb20140711093455/$2/4/49/Arcanan_Daemon_II_Figure.png",
        fullName: "Arcanan Daemon II"
    },
    11324: {
        name: "Death", stats: [20234, 19508, 13008, 13019, 18111],
        skills: [546, 547],
        autoAttack: 10028,
        isMounted: true,
        img: "img2$1/__cb20140815142251/$2/5/5b/Arcanan_Death_II_Figure.png",
        fullName: "Arcanan Death II"
    },
    11239: {
        name: "Emperor", stats: [18577, 17916, 17786, 10809, 14590],
        skills: [425, 426],
        img: "img1$1/__cb20140417053801/$2/0/02/Arcanan_Emperor_II_Figure.png",
        fullName: "Arcanan Emperor II"
    },
    11211: {
        name: "Empress", stats: [15197, 12380, 15348, 19422, 17168],
        skills: [394, 395],
        img: "img1$1/__cb20140314150633/$2/0/04/Arcanan_Empress_II_Figure.png",
        fullName: "Arcanan Empress II"
    },
    11311: {
        name: "Hanged Man", stats: [20505, 15002, 13008, 13030, 18024],
        skills: [480, 481],
        img: "img4$1/__cb20140609073717/$2/8/89/Arcanan_Hanged_Man_II_Figure.png",
        fullName: "Arcanan Hanged Man II"
    },
    11287: {
        name: "Hermit", stats: [19205, 12066, 12586, 20722, 15002],
        skills: [453, 454],
        autoAttack: 10007,
        img: "img3$1/__cb20140512070142/$2/c/c5/Arcanan_Hermit_II_Figure.png",
        fullName: "Arcanan Hermit II"
    },
    11199: {
        name: "High Priestess", stats: [17233, 8350, 20256, 19086, 14839],
        skills: [388, 389],
        autoAttack: 10007,
        img: "img4$1/__cb20140313080212/$2/5/58/Arcanan_High_Priestess_II_Figure.png",
        fullName: "Arcanan High Priestess II"
    },
    11395: {
        name: "Judgment", stats: [19996, 7754, 16009, 19508, 17753],
        skills: [573],
        autoAttack: 10003,
        img: "img1$1/__cb20140914071121/$2/7/72/Arcanan_Judgment_II_Figure.png",
        fullName: "Arcanan Judgment II"
    },
    11242: {
        name: "Lovers", stats: [16908, 13875, 12705, 19021, 17006],
        skills: [430, 431],
        autoAttack: 10007,
        img: "img3$1/__cb20140414082018/$2/f/fb/Arcanan_Lovers_II_Figure.png",
        fullName: "Arcanan Lovers II"
    },
    11208: {
        name: "Magus", stats: [15186, 12131, 17688, 19010, 15641],
        skills: [402, 403],
        img: "img1$1/__cb20140319013115/$2/b/bb/Arcanan_Magus_II_Figure.png",
        fullName: "Arcanan Magus II"
    },
    11284: {
        name: "Might", stats: [18598, 19227, 10766, 13301, 17948],
        skills: [461, 462],
        isMounted: true,
        img: "img2$1/__cb20140516081822/$2/a/a4/Arcanan_Might_II_Figure.png",
        fullName: "Arcanan Might II"
    },
    11363: {
        name: "Moon", stats: [18273, 18046, 13279, 12467, 17948],
        skills: [551, 552],
        autoAttack: 10030,
        img: "img3$1/__cb20140825081610/$2/b/b8/Arcanan_Moon_II_Figure.png",
        fullName: "Arcanan Moon II"
    },
    11360: {
        name: "Star", stats: [20223, 7548, 18035, 18208, 15803],
        skills: [540, 541],
        autoAttack: 10007,
        img: "img4$1/__cb20140812101601/$2/7/75/Arcanan_Star_II_Figure.png",
        fullName: "Arcanan Star II"
    },
    11394: {
        name: "Sun", stats: [20299, 7982, 16356, 18013, 17916],
        skills: [570, 571],
        autoAttack: 10032,
        img: "img1$1/__cb20140912105317/$2/0/0a/Arcanan_Sun_II_Figure.png",
        fullName: "Arcanan Sun II"
    },
    11332: {
        name: "Temperance", stats: [19183, 3800, 20007, 19985, 18046],
        skills: [543],
        autoAttack: 10027,
        img: "img3$1/__cb20140814101445/$2/8/8d/Arcanan_Temperance_II_Figure.png",
        fullName: "Arcanan Temperance II"
    },
    11329: {
        name: "Archbishop", stats: [19064, 20191, 16009, 10744, 15002],
        skills: [520],
        autoAttack: 10025,
        img: "img3$1/__cb20140722101833/$2/9/9a/Archbishop_of_the_Deep_II_Figure.png",
        fullName: "Archbishop of the Deep II"
    },
    10600: {
        name: "Ose", stats: [16995, 14395, 15023, 14850, 11990],
        skills: [154],
        img: "img3$1/__cb20130314191037/$2/0/00/Archduke_Ose_II_Figure.png",
        fullName: "Archduke Ose II"
    },
    11105: {
        name: "Ares", stats: [25434, 21285, 21047, 16345, 17407],
        skills: [542],
        img: "img1$1/__cb20140814101503/$2/8/80/Ares%2C_God_of_Ruin_II_Figure.png",
        fullName: "Ares, God of Ruin II"
    },
    10372: {
        name: "Artemisia", stats: [10042, 10977, 10977, 10042, 12589],
        skills: [18],
        img: "img3$1/__cb20130222034947/$2/a/aa/Artemisia_Swiftfoot_II_Figure.png",
        fullName: "Artemisia Swiftfoot II"
    },
    10595: {
        name: "Astaroth", stats: [12194, 13965, 10087, 15278, 14280],
        skills: [155],
        img: "img2$1/__cb20130314191037/$2/2/2e/Astaroth%2C_Duke_of_Fear_II_Figure.png",
        fullName: "Astaroth, Duke of Fear II"
    },
    10900: {
        name: "Aurboda", stats: [11903, 15348, 11773, 18468, 11015],
        skills: [261],
        img: "img3$1/__cb20131009141347/$2/1/15/Aurboda%2C_the_Great_Mother_II_Figure.png",
        fullName: "Aurboda, the Great Mother II"
    },
    11388: {
        name: "Azi", stats: [20375, 20202, 20104, 22899, 18057],
        skills: [572],
        autoAttack: 10033,
        img: "img2$1/__cb20140914071105/$2/5/5b/Azi_Dahaka_II_Figure.png",
        fullName: "Azi Dahaka II"
    },
    10657: {
        name: "Baal", stats: [14677, 15457, 12813, 14482, 16551],
        skills: [178],
        img: "img2$1/__cb20130430102647/$2/2/2f/Baal%2C_Thunder_Lord_of_Hell_II_Figure.png",
        fullName: "Baal, Thunder Lord of Hell II"
    },
    11168: {
        name: "Badalisc", stats: [14092, 16107, 11882, 11297, 15218],
        skills: [315],
        img: "img2$1/__cb20131212173203/$2/6/6c/Badalisc%2C_the_Gourmet_II_Figure.png",
        fullName: "Badalisc, the Gourmet II"
    },
    11390: {
        name: "Suzhen", stats: [15998, 3096, 15002, 17504, 17006],
        skills: [81],
        autoAttack: 10031,
        img: "img1$1/__cb20140914071137/$2/0/05/Bai_Suzhen%2C_Lady_of_Scales_II_Figure.png",
        fullName: "Bai Suzhen, Lady of Scales II"
    },
    11102: {
        name: "Balgo", stats: [18585, 16037, 13962, 5799, 13510],
        skills: [349],
        img: "img2$1/__cb20140122120902/$2/f/fd/Balgo%2C_the_Cursed_Flame_II_Figure.png",
        fullName: "Balgo, the Cursed Flame II"
    },
    10652: {
        name: "Batraz", stats: [14471, 15511, 13442, 12293, 12174],
        skills: [142],
        img: "img4$1/__cb20130227154434/$2/e/e3/Batraz%2C_the_Immortal_Hero_II_Figure.png",
        fullName: "Batraz, the Immortal Hero II"
    },
    11371: {
        name: "Bayam", stats: [13269, 7966, 12804, 17106, 16779],
        skills: [506],
        autoAttack: 10023,
        img: "img1$1/__cb20140709072737/$2/7/71/Bayam_II_Figure.png",
        fullName: "Bayam II"
    },
    11025: {
        name: "Scarecrow", stats: [10625, 13756, 10490, 11001, 9342],
        skills: [256],
        img: "img3$1/__cb20131002022744/$2/4/4d/Beheading_Scarecrow_II_Figure.png",
        fullName: "Beheading Scarecrow II"
    },
    10659: {
        name: "Behemoth", stats: [12442, 14755, 13269, 12380, 12999],
        skills: [186],
        img: "img2$1/__cb20130514143810/$2/3/30/Behemoth%2C_Thunder_Beast_II_Figure.png",
        fullName: "Behemoth, Thunder Beast II"
    },
    10684: {
        name: "Biast", stats: [13879, 12655, 10163, 13611, 9798],
        skills: [163],
        img: "img2$1/__cb20130402220653/$2/2/29/Biast_II_Figure.png",
        fullName: "Biast II"
    },
    10787: {
        name: "Black Knight", stats: [12648, 16097, 11623, 11574, 13842],
        skills: [211],
        img: "img1$1/__cb20130714135313/$2/9/9e/Black_Knight%2C_Soul_Hunter_II_Figure.png",
        fullName: "Black Knight, Soul Hunter II"
    },
    10824: {
        name: "Bolus", stats: [12086, 16889, 12427, 11610, 12832],
        skills: [152],
        img: "img4$1/__cb20130816162357/$2/a/a0/Bolus%2C_the_Blue_Bolt_II_Figure.png",
        fullName: "Bolus, the Blue Bolt II"
    },
    10977: {
        name: "Boudica", stats: [9967, 11914, 8918, 13110, 12014],
        skills: [276],
        img: "img2$1/__cb20131101130430/$2/a/ab/Boudica%2C_the_Dawn_Chief_II_Figure.png",
        fullName: "Boudica, the Dawn Chief II"
    },
    11223: {
        name: "Brang", stats: [18826, 18544, 14027, 18208, 10105],
        skills: [423],
        autoAttack: 10010,
        img: "img4$1/__cb20140417053801/$2/f/f3/Brang_Two-Heads_II_Figure.png",
        fullName: "Brang Two-Heads II"
    },
    11209: {
        name: "Rabbit", stats: [18999, 13951, 20007, 9986, 18035],
        skills: [435, 436],
        img: "img2$1/__cb20140423020348/$2/6/6e/Brass_Rabbit_Figure.png",
        fullName: "Brass Rabbit"
    },
    11194: {
        name: "Tarantula", stats: [19324, 14568, 18024, 15695, 12120],
        skills: [396, 397],
        autoAttack: 10005,
        img: "img2$1/__cb20140318135240/$2/7/71/Brass_Tarantula_II_Figure.png",
        fullName: "Brass Tarantula II"
    },
    11171: {
        name: "Hyena", stats: [14644, 10766, 11860, 18923, 12228],
        skills: [321],
        autoAttack: 10008,
        img: "img2$1/__cb20131227221825/$2/f/fc/Bronzeclad_Hyena_II_Figure.png",
        fullName: "Bronzeclad Hyena II"
    },
    11114: {
        name: "Brownies", stats: [9821, 11283, 9515, 13196, 11414],
        skills: [307],
        img: "img1$1/__cb20131202082920/$2/9/90/Brownies%2C_the_Uproarious_II_Figure.png",
        fullName: "Brownies, the Uproarious II"
    },
    10488: {
        name: "Bunga", stats: [12269, 11049, 14182, 9612, 10343],
        skills: [125],
        img: "img2$1/__cb20130107205042/$2/5/5d/Bunga%2C_the_Stalwart_II_Figure.png",
        fullName: "Bunga, the Stalwart II"
    },
    11129: {
        name: "Caassimolar", stats: [16009, 24979, 15587, 10625, 12521],
        skills: [371],
        img: "img1$1/__cb20140213034945/$2/c/c7/Caassimolar%2C_the_Chimera_II_Figure.png",
        fullName: "Caassimolar, the Chimera II"
    },
    11449: {
        name: "Camazo", stats: [22628, 22585, 22173, 16139, 18208],
        skills: [601, 445],
        autoAttack: 10038,
        img: "img2$1/__cb20141014080304/$2/6/6c/Camazo%2C_Knight_of_Bats_II_Figure.png",
        fullName: "Camazo, Knight of Bats II"
    },
    11119: {
        name: "Canhel", stats: [15608, 19606, 17992, 11329, 16399],
        skills: [293],
        img: "img2$1/__cb20131122150727/$2/5/54/Canhel%2C_Guardian_Dragon_II_Figure.png",
        fullName: "Canhel, Guardian Dragon II"
    },
    10997: {
        name: "Jolly", stats: [14200, 16594, 14070, 18956, 15424],
        skills: [226],
        img: "img2$1/__cb20130828162829/$2/1/14/Cap%27n_Jolly%2C_Sea_Scourge_II_Figure.png",
        fullName: "Cap'n Jolly, Sea Scourge II"
    },
    11333: {
        name: "Kidd", stats: [18403, 18046, 12781, 14395, 16085],
        skills: [157, 518],
        img: "img4$1/__cb20140717114923/$2/4/42/Captain_Kidd_II_Figure.png",
        fullName: "Captain Kidd II"
    },
    11062: {
        name: "Chillweaver", stats: [13293, 13196, 10611, 16144, 14489],
        skills: [2],
        img: "img2$1/__cb20131215131933/$2/b/b2/Cat_Sith_Chillweaver_II_Figure.png",
        fullName: "Cat Sith Chillweaver II"
    },
    11090: {
        name: "CSMM", stats: [14096, 10112, 10549, 15804, 17095],
        skills: [343],
        autoAttack: 10007,
        img: "img2$1/__cb20140116044027/$2/6/6d/Cat_Sith_Magus_Master_II_Figure.png",
        fullName: "Cat Sith Magus Master II"
    },
    11366: {
        name: "CSS", stats: [15034, 16518, 13052, 7202, 16811],
        skills: [549],
        img: "img1$1/__cb20140823140158/$2/7/7b/Cat_Sith_Swordswoman_II_Figure.png",
        fullName: "Cat Sith Swordswoman II"
    },
    11213: {
        name: "Cegila", stats: [13149, 11492, 9498, 17504, 16995],
        skills: [354],
        img: "img2$1/__cb20140110084814/$2/a/a5/Cegila%2C_Dragonian_Incantator_II_Figure.png",
        fullName: "Cegila, Dragonian Incantator II"
    },
    10673: {
        name: "Cernunnos", stats: [16446, 15351, 13761, 13181, 14330],
        skills: [177],
        img: "img2$1/__cb20130422194540/$2/5/5b/Cernunnos_II_Figure.png",
        fullName: "Cernunnos II"
    },
    10409: {
        name: "Magma Giant", stats: [12832, 12380, 13097, 11477, 11928],
        skills: [123],
        img: "img3$1/__cb20130202212620/$2/6/63/Chaotic_Magma_Giant_II_Figure.png",
        fullName: "Chaotic Magma Giant II"
    },
    10907: {
        name: "Chiyome", stats: [12635, 14148, 11369, 15817, 13510],
        skills: [238],
        img: "img1$1/__cb20130921071449/$2/8/83/Chiyome%2C_the_Kamaitachi_II_Figure.png",
        fullName: "Chiyome, the Kamaitachi II"
    },
    11306: {
        name: "Circe", stats: [15002, 7776, 11947, 17017, 16009],
        skills: [487, 488],
        autoAttack: 10007,
        img: "img2$1/__cb20140612092914/$2/0/0f/Circe%2C_Fallen_Heroine_II_Figure.png",
        fullName: "Circe, Fallen Heroine II"
    },
    11392: {
        name: "Viper", stats: [14999, 12999, 14999, 7808, 17133],
        skills: [574],
        img: "img3$1/__cb20140914071153/$2/3/38/Clockwork_Viper_II_Figure.png",
        fullName: "Clockwork Viper II"
    },
    10303: {
        name: "Crystal Gillant", stats: [11832, 10896, 10439, 10439, 13317],
        skills: [11],
        img: "img4$1/__cb20130106234145/$2/6/60/Crystal_Gillant_II_Figure.png",
        fullName: "Crystal Gillant II"
    },
    11095: {
        name: "Roc", stats: [12073, 14879, 12559, 11501, 16510],
        skills: [322],
        img: "img2$1/__cb20131227221759/$2/2/20/Crystalwing_Roc_II_Figure.png",
        fullName: "Crystalwing Roc II"
    },
    10712: {
        name: "Cuelebre", stats: [13702, 16096, 12954, 11134, 13572],
        skills: [249],
        img: "img2$1/__cb20130916113928/$2/8/8c/Cuelebre_the_Ironscaled_II_Figure.png",
        fullName: "Cuelebre the Ironscaled II"
    },
    11019: {
        name: "Cursebone", stats: [14807, 16952, 14146, 15652, 17721],
        skills: [248],
        img: "img3$1/__cb20130926150410/$2/3/3e/Cursebone_Pterosaur_II_Figure.png",
        fullName: "Cursebone Pterosaur II"
    },
    10820: {
        name: "Cyclops", stats: [15868, 17147, 18360, 13214, 14449],
        skills: [218],
        img: "img3$1/__cb20130801154345/$2/b/ba/Cyclops%2C_the_Rocky_Cliff_II_Figure.png",
        fullName: "Cyclops, the Rocky Cliff II"
    },
    11328: {
        name: "Dagon", stats: [23343, 22065, 18035, 19703, 18208],
        skills: [519],
        img: "img3$1/__cb20140722101815/$2/6/6a/Dagon_II_Figure.png",
        fullName: "Dagon II"
    },
    10973: {
        name: "Dagr", stats: [12012, 14059, 10712, 17818, 13810],
        skills: [275],
        img: "img4$1/__cb20131030132715/$2/d/d2/Dagr_Sunrider_II_Figure.png",
        fullName: "Dagr Sunrider II"
    },
    10983: {
        name: "Danniel", stats: [23571, 24990, 21458, 13951, 16204],
        skills: [292],
        img: "img1$1/__cb20131122150756/$2/e/e2/Danniel%2C_Golden_Paladin_II_Figure.png",
        fullName: "Danniel, Golden Paladin II"
    },
    11415: {
        name: "Dantalion", stats: [15193, 5298, 10990, 14207, 11098],
        skills: [596],
        autoAttack: 10007,
        img: "img1$1/__cb20141009082936/$2/8/8e/Dantalion%2C_Duke_of_Hell_II_Figure.png",
        fullName: "Dantalion, Duke of Hell II"
    },
    21445: {
        name: "Darkwind Wyvern", stats: [22211, 8270, 19352, 20917, 17649],
        skills: [607],
        autoAttack: 10042,
        img: "img4$1/__cb20141025082638/$2/d/dd/Darkwind_Wyvern_Figure.png",
        fullName: "Darkwind Wyvern"
    },
    10905: {
        name: "Danzo", stats: [14774, 17277, 14872, 17667, 16128],
        skills: [237],
        img: "img4$1/__cb20130921071511/$2/6/64/Danzo%2C_Falcon_Ninja_II_Figure.png",
        fullName: "Danzo, Falcon Ninja II"
    },
    21308: {
        name: "Justice", stats: [20795, 11717, 17470, 22225, 18005],
        skills: [494, 495],
        autoAttack: 10007,
        img: "img2$1/__cb20140619104322/$2/7/7c/Dauntless_Justice_Figure.png",
        fullName: "Dauntless Justice"
    },
    10967: {
        name: "Deborah", stats: [13550, 14157, 13442, 12987, 13929],
        skills: [222],
        img: "img3$1/__cb20130815132429/$2/7/73/Deborah%2C_Knight_Immaculate_II_Figure.png",
        fullName: "Deborah, Knight Immaculate II"
    },
    11225: {
        name: "Dein", stats: [14000, 16768, 11098, 11683, 14417],
        skills: [424],
        img: "img4$1/__cb20140417053801/$2/8/8e/Dein%2C_Silent_Bomber_II_Figure.png",
        fullName: "Dein, Silent Bomber II"
    },
    10722: {
        name: "Delphyne", stats: [11990, 14601, 11882, 18858, 11080],
        skills: [288],
        img: "img4$1/__cb20131101130817/$2/1/15/Delphyne%2C_Thunder_Dragon_II_Figure.png",
        fullName: "Delphyne, Thunder Dragon II"
    },
    10503: {
        name: "Desna", stats: [13146, 15089, 14287, 12137, 12378],
        skills: [124],
        img: "img2$1/__cb20130106235645/$2/4/45/Desna%2C_Mythic_Wendigo_II_Figure.png",
        fullName: "Desna, Mythic Wendigo II"
    },
    10914: {
        name: "Dharva", stats: [14096, 13742, 12280, 11942, 15427],
        skills: [254],
        img: "img2$1/__cb20131002004805/$2/9/97/Dharva_Fangclad_II_Figure.png",
        fullName: "Dharva Fangclad II"
    },
    11096: {
        name: "Djinn", stats: [14048, 17363, 13333, 19422, 16605],
        skills: [319, 320],
        img: "img1$1/__cb20131227221855/$2/8/8d/Djinn_of_the_Lamp_II_Figure.png",
        fullName: "Djinn of the Lamp II"
    },
    11355: {
        name: "Dong", stats: [13489, 17000, 13196, 8150, 16110],
        skills: [545],
        img: "img4$1/__cb20140814101413/$2/8/8b/Dong%2C_the_Bloody_Claw_II_Figure.png",
        fullName: "Dong, the Bloody Claw II"
    },
    10423: {
        name: "Doppeladler", stats: [13940, 14709, 14417, 14092, 14850],
        skills: [33],
        img: "img1$1/__cb20130107210324/$2/6/68/Doppeladler_II_Figure.png",
        fullName: "Doppeladler II"
    },
    10691: {
        name: "Dors", stats: [15435, 9433, 13268, 16464, 13019],
        skills: [446],
        img: "img1$1/__cb20140428113705/$2/1/1d/Dors%2C_Demiwyrm_Warrior_II_Figure.png",
        fullName: "Dors, Demiwyrm Warrior II"
    },
    11303: {
        name: "Dunkleosteus", stats: [14000, 8394, 13110, 16620, 15804],
        skills: [477],
        autoAttack: 10007,
        img: "img2$1/__cb20140606074955/$2/2/22/Dunkleosteus%2C_the_Rendmaw_II_Figure.png",
        fullName: "Dunkleosteus, the Rendmaw II"
    },
    10272: {
        name: "Cat Sidhe", stats: [9614, 8322, 11959, 11243, 10056],
        skills: [18],
        img: "img4$1/__cb20130228073440/$2/4/48/Earl_Cat_Sidhe_II_Figure.png",
        fullName: "Earl Cat Sidhe II"
    },
    10619: {
        name: "Ebon", stats: [17493, 15543, 13431, 14330, 13788],
        skills: [157],
        img: "img2$1/__cb20130330174610/$2/4/48/Ebon_Dragon_II_Figure.png",
        fullName: "Ebon Dragon II"
    },
    10756: {
        name: "Edgardo", stats: [10904, 15485, 14389, 8978, 14755],
        skills: [179],
        img: "img2$1/__cb20130430110741/$2/5/5f/Edgardo%2C_Grand_Inquisitor_II_Figure.png",
        fullName: "Edgardo, Grand Inquisitor II"
    },
    11450: {
        name: "Elsa", stats: [19010, 19021, 15132, 10018, 17851],
        skills: [602],
        autoAttack: 10039,
        img: "img2$1/__cb20141014080304/$2/f/fe/Elsa%2C_Undead_Bride_II_Figure.png",
        fullName: "Elsa, Undead Bride II"
    },
    21276: {
        name: "Empusa", stats: [20706, 12623, 16110, 20999, 17510],
        skills: [447],
        autoAttack: 10016,
        img: "img3$1/__cb20140508115333/$2/0/0a/Empusa%2C_the_Death_Scythe_Figure.png",
        fullName: "Empusa, the Death Scythe"
    },
    10317: {
        name: "Eton", stats: [10904, 10490, 10490, 12952, 12952],
        skills: [94],
        img: "img1$1/__cb20130106232503/$2/7/74/Eton%2C_Eater_of_Darkness_II_Figure.png",
        fullName: "Eton, Eater of Darkness II"
    },
    10708: {
        name: "Ettin", stats: [16063, 14482, 14677, 9498, 13702],
        skills: [304],
        autoAttack: 10006,
        img: "img3$1/__cb20131129144223/$2/1/1f/Ettin_II_Figure.png",
        fullName: "Ettin II"
    },
    11358: {
        name: "Europa", stats: [14731, 8296, 12207, 16735, 16518],
        skills: [538, 539],
        autoAttack: 10007,
        img: "img4$1/__cb20140809012700/$2/2/25/Europa%2C_Fallen_Heroine_II_Figure.png",
        fullName: "Europa, Fallen Heroine II"
    },
    10452: {
        name: "Evil Eye", stats: [10770, 10394, 10490, 12221, 11721],
        skills: [120],
        img: "img2$1/__cb20130205203018/$2/b/bf/Evil_Eye_II_Figure.png",
        fullName: "Evil Eye II"
    },
    10674: {
        name: "Fenrir", stats: [15099, 16865, 22498, 13008, 11167],
        skills: [154],
        img: "img1$1/__cb20130420124059/$2/d/dd/Fenrir_II_Figure.png",
        fullName: "Fenrir II"
    },
    21352: {
        name: "Siege Tower", stats: [20007, 19750, 16915, 14021, 17567],
        skills: [548],
        autoAttack: 10029,
        img: "img2$1/__cb20140823140158/$2/9/93/Ferocious_Siege_Tower_Figure.png",
        fullName: "Ferocious Siege Tower"
    },
    10496: {
        name: "Bat Demon", stats: [12538, 14182, 12648, 11928, 12720],
        skills: [131],
        img: "img1$1/__cb20130201171143/$2/0/0e/Fiendish_Bat_Demon_II_Figure.png",
        fullName: "Fiendish Bat Demon II"
    },
    10849: {
        name: "Fimbul", stats: [12086, 13489, 12562, 16743, 12597],
        skills: [242],
        img: "img2$1/__cb20130917112620/$2/4/4a/Fimbul_Frostclad_II_Figure.png",
        fullName: "Fimbul Frostclad II"
    },
    10470: {
        name: "Flame Dragon", stats: [14601, 14449, 13756, 15153, 13940],
        skills: [23],
        img: "img1$1/__cb20130107210805/$2/8/8e/Flame_Dragon_II_Figure.png",
        fullName: "Flame Dragon II"
    },
    10888: {
        name: "Flesh Collector Golem", stats: [17450, 14536, 18089, 8664, 9661],
        skills: [253],
        img: "img2$1/__cb20131002005230/$2/5/52/Flesh_Collector_Golem_II_Figure.png",
        fullName: "Flesh Collector Golem II"
    },
    11191: {
        name: "Freyja", stats: [14709, 17125, 14027, 10213, 12380],
        skills: [387],
        img: "img3$1/__cb20140301012048/$2/c/c8/Freyja%2C_Earth_Goddess_II_Figure.png",
        fullName: "Freyja, Earth Goddess II"
    },
    10473: {
        name: "Freila", stats: [11928, 10490, 12453, 12221, 11417],
        skills: [16],
        img: "img3$1/__cb20130209140811/$2/f/f2/Freila_the_Bountiful_II_Figure.png",
        fullName: "Freila the Bountiful II"
    },
    11190: {
        name: "Freyr", stats: [16562, 19909, 15370, 12943, 15998],
        skills: [385, 386],
        img: "img1$1/__cb20140301012048/$2/5/51/Freyr%2C_God_of_the_Harvest_II_Figure.png",
        fullName: "Freyr, God of the Harvest II"
    },
    10606: {
        name: "Fomor", stats: [13052, 14645, 11928, 9967, 9781],
        skills: [138],
        img: "img1$1/__cb20130208175749/$2/4/43/Fomor_the_Savage_II_Figure.png",
        fullName: "Fomor the Savage II"
    },
    11115: {
        name: "Bearwolf", stats: [14503, 24513, 11492, 11405, 17992],
        skills: [353],
        img: "img2$1/__cb20140112201013/$2/5/5b/Frost_Bearwolf_II_Figure.png",
        fullName: "Frost Bearwolf II"
    },
    10022: {
        name: "Galahad", stats: [6543, 7271, 7349, 6842, 6478],
        skills: [10000, 33, 5],
        isMounted: true,
        img: "img4$1/__cb20130228233340/$2/e/e2/Galahad%2C_Drake_Knight_II_Figure.png",
        fullName: "Galahad, Drake Knight II"
    },
    11172: {
        name: "Galatea", stats: [19833, 10062, 15825, 18566, 15218],
        skills: [533],
        autoAttack: 10007,
        img: "img4$1/__cb20140810144815/$2/8/8a/Galatea%2C_Nereid_II_Figure.png",
        fullName: "Galatea, Nereid II"
    },
    201: {
        name: "Gan Ceann", stats: [7950, 10530, 8830, 8910, 8540],
        skills: [33],
        img: "img2$1/__cb20130224083941/$2/c/ca/Gan_Ceann_Figure.png",
        fullName: "Gan Ceann"
    },
    10842: {
        name: "Gargoyle Gatekeeper", stats: [15608, 17602, 14503, 15002, 18035],
        skills: [268],
        img: "img2$1/__cb20131023124814/$2/7/77/Gargoyle_Gatekeeper_II_Figure.png",
        fullName: "Gargoyle Gatekeeper II"
    },
    21384: {
        name: "Garshasp", stats: [22002, 18058, 20019, 20007, 8223],
        skills: [578],
        autoAttack: 10034,
        img: "img2$1/__cb20140925080753/$2/2/25/Garshasp%2C_the_Juggernaut_Figure.png",
        fullName: "Garshasp, the Juggernaut"
    },
    10609: {
        name: "Garuda", stats: [14417, 14677, 14081, 15814, 15023],
        skills: [47],
        img: "img1$1/__cb20130322102239/$2/b/bf/Garuda_II_Figure.png",
        fullName: "Garuda II"
    },
    10571: {
        name: "Gathgoic", stats: [14839, 16128, 14980, 17948, 14709],
        skills: [141],
        img: "img3$1/__cb20130122044308/$2/f/fb/Gathgoic_the_Other_II_Figure.png",
        fullName: "Gathgoic the Other II"
    },
    10742: {
        name: "Gevi", stats: [15565, 15424, 18447, 13593, 11015],
        skills: [180],
        img: "img2$1/__cb20130508213020/$2/5/55/Gevi%2C_Crystal_Troll_Master_II_Figure.png",
        fullName: "Gevi, Crystal Troll Master II"
    },
    10088: {
        name: "Ghislandi", stats: [12324, 13551, 13525, 12212, 12187],
        skills: [17],
        img: "img4$1/__cb20130106212217/$2/6/68/Ghislandi%2C_Iron_Heart_II_Figure.png",
        fullName: "Ghislandi, Iron Heart II"
    },
    11271: {
        name: "Ghislandi L", stats: [18533, 20234, 14590, 10235, 16204],
        skills: [455, 456],
        autoAttack: 10015,
        img: "img3$1/__cb20140515012432/$2/9/91/Ghislandi%2C_the_Unchained_II_Figure.png",
        fullName: "Ghislandi, the Unchained II"
    },
    11453: {
        name: "GCE", stats: [15100, 7564, 11403, 17254, 16609],
        skills: [604],
        autoAttack: 10007,
        img: "img3$1/__cb20141014080306/$2/3/33/Ghost_Carriage_Express_II_Figure.png",
        fullName: "Ghost Carriage Express II"
    },
    11304: {
        name: "Gigantopithecus", stats: [24210, 25055, 21946, 13994, 15998],
        skills: [491],
        img: "img3$1/__cb20140620060851/$2/e/e5/Gigantopithecus_II_Figure.png",
        fullName: "Gigantopithecus II"
    },
    11375: {
        name: "Gilgamesh", stats: [20115, 19053, 18013, 8220, 16096],
        skills: [558, 559],
        img: "img1$1/__cb20140830112828/$2/e/e1/Gilgamesh_the_Bold_II_Figure.png",
        fullName: "Gilgamesh the Bold II"
    },
    10177: {
        name: "Goblin King", stats: [8144, 8339, 6400, 10159, 10278],
        skills: [18],
        img: "img3$1/__cb20130228171344/$2/4/4f/Goblin_King_II_Figure.png",
        fullName: "Goblin King II"
    },
    10011: {
        name: "Gorgon", stats: [10170, 12436, 8652, 12773, 10924],
        skills: [18],
        img: "img4$1/__cb20130227140440/$2/6/6f/Gorgon_II_Figure.png",
        fullName: "Gorgon II"
    },
    10611: {
        name: "Gorlin", stats: [11928, 12380, 17000, 6809, 10904],
        skills: [167],
        img: "img1$1/__cb20130408193159/$2/5/50/Gorlin_Gold_Helm_II_Figure.png",
        fullName: "Gorlin Gold Helm II"
    },
    10720: {
        name: "Goviel", stats: [14135, 14547, 13604, 14926, 16616],
        skills: [204],
        img: "img2$1/__cb20130613194848/$2/9/90/Goviel%2C_Hail_Knight_II_Figure.png",
        fullName: "Goviel, Hail Knight II"
    },
        10551: {
        name: "Grandor", stats: [14709, 17277, 15738, 13756, 11903],
        skills: [149],
        img: "img3$1/__cb20130308154138/$2/6/65/Grandor%2C_Giant_of_Old_II_Figure.png",
        fullName: "Grandor, Giant of Old II"
    },
    10586: {
        name: "Gregoire", stats: [11708, 12121, 10318, 14854, 10159],
        skills: [144],
        img: "img3$1/__cb20130208175748/$2/0/08/Gregoire%2C_Weaponmaster_II_Figure.png",
        fullName: "Gregoire, Weaponmaster II"
    },
    11131: {
        name: "Gregory", stats: [16192, 16121, 15558, 9794, 10294],
        skills: [372],
        img: "img2$1/__cb20140213035030/$2/4/48/Gregory%2C_the_Masked_Slayer_II_Figure.png",
        fullName: "Gregory, the Masked Slayer II"
    },
    10791: {
        name: "Grellas", stats: [12066, 14796, 10636, 17374, 13073],
        skills: [212],
        img: "img2$1/__cb20130714135315/$2/1/11/Grellas_Fellstaff_II_Figure.png",
        fullName: "Grellas Fellstaff II"
    },
    21216: {
        name: "Gremory", stats: [18466, 12819, 18945, 20426, 17009],
        skills: [411],
        autoAttack: 10007,
        img: "img2$1/__cb20140403112446/$2/0/0b/Gremory%2C_the_Vermilion_Moon_Figure.png",
        fullName: "Gremory, the Vermilion Moon"
    },
    10784: {
        name: "Gretch", stats: [16280, 15305, 12683, 15652, 13875],
        skills: [196],
        img: "img3$1/__cb20130609110933/$2/a/a9/Gretch%2C_Chimaera_Mistress_II_Figure.png",
        fullName: "Gretch, Chimaera Mistress II"
    },
    10182: {
        name: "Griffin", stats: [11887, 9909, 14391, 14263, 11960],
        skills: [2],
        img: "img4$1/__cb20130222030204/$2/5/57/Griffin_Mount_II_Figure.png",
        fullName: "Griffin Mount II"
    },
    361: {
        name: "Griflet", stats: [11520, 12970, 11430, 10110, 13780],
        skills: [10],
        img: "img2$1/__cb20130125001834/$2/b/b1/Griflet%2C_Falcon_Knight_Figure.png",
        fullName: "Griflet, Falcon Knight"
    },
    10276: {
        name: "Grim", stats: [11001, 13047, 8888, 13026, 11060],
        skills: [109],
        img: "img1$1/__cb20130301090046/$2/7/7f/Grim_Executioner_II_Figure.png",
        fullName: "Grim Executioner II"
    },
    10925: {
        name: "Grimoire", stats: [15231, 18609, 10441, 8064, 15451],
        skills: [134],
        img: "img4$1/__cb20131115130412/$2/9/9b/Grimoire_Beast_II_Figure.png",
        fullName: "Grimoire Beast II"
    },
    11170: {
        name: "Gryla", stats: [16529, 11622, 15868, 15294, 8740],
        skills: [308, 316],
        isMounted: true,
        img: "img2$1/__cb20131214151558/$2/c/c3/Gryla%2C_the_Lullaby_II_Figure.png",
        fullName: "Gryla, the Lullaby II"
    },
    21285: {
        name: "Guillaume", stats: [21515, 20887, 16308, 12948, 18505],
        skills: [466, 467],
        img: "img1$1/__cb20140520122326/$2/2/22/Guillaume%2C_Fanatic_Figure.png",
        fullName: "Guillaume, Fanatic"
    },
    10898: {
        name: "Hamad", stats: [10294, 10367, 9881, 16416, 10951],
        skills: [265],
        img: "img3$1/__cb20131010165301/$2/f/fd/Hamad%2C_the_Sweeping_Wind_II_Figure.png",
        fullName: "Hamad, the Sweeping Wind II"
    },
    10861: {
        name: "Haokah", stats: [13476, 13928, 11111, 15706, 13245],
        skills: [232],
        img: "img1$1/__cb20130901131933/$2/9/98/Haokah%2C_the_Lightning_Brave_II_Figure.png",
        fullName: "Haokah, the Lightning Brave II"
    },
    11451: {
        name: "Hatshepsut", stats: [17049, 16334, 13041, 6097, 16096],
        skills: [603],
        autoAttack: 10040,
        img: "img2$1/__cb20141014080305/$2/b/bd/Hatshepsut%2C_Mummy_Queen_II_Figure.png",
        fullName: "Hatshepsut, Mummy Queen II"
    },
    10951: {
        name: "Hecatoncheir", stats: [11807, 13902, 14768, 13928, 13366],
        skills: [264],
        img: "img4$1/__cb20131010170211/$2/8/88/Hecatoncheir_the_Adamantine_II_Figure.png",
        fullName: "Hecatoncheir the Adamantine II"
    },
    21312: {
        name: "Hei Long", stats: [20486, 13485, 16192, 20881, 17113],
        skills: [496],
        autoAttack: 10019,
        img: "img1$1/__cb20140628103009/$2/b/bd/Hei_Long%2C_the_New_Moon_Figure.png",
        fullName: "Hei Long, the New Moon"
    },
    10465: {
        name: "Heinrich", stats: [16887, 13940, 15132, 13290, 14005],
        skills: [133],
        img: "img3$1/__cb20130124152435/$2/0/05/Heinrich_the_Bold_II_Figure.png",
        fullName: "Heinrich the Bold II"
    },
    10634: {
        name: "Hel", stats: [14709, 17450, 14709, 15771, 18057],
        skills: [239, 240],
        img: "img1$1/__cb20130921074034/$2/e/e8/Hel%2C_Goddess_of_Death_II_Figure.png",
        fullName: "Hel, Goddess of Death II"
    },
    10895: {
        name: "Hercinia", stats: [14062, 13414, 12562, 12686, 15876],
        skills: [225],
        img: "img1$1/__cb20130819222302/$2/a/a4/Hercinia_the_Blest_II_Figure.png",
        fullName: "Hercinia the Blest II"
    },
    11202: {
        name: "Hereward", stats: [14927, 14000, 12524, 10951, 15498],
        skills: [391],
        img: "img1$1/__cb20140313080213/$2/0/05/Hereward%2C_Storm_of_Arrows_II_Figure.png",
        fullName: "Hereward, Storm of Arrows II"
    },
    11073: {
        name: "Hippocamp", stats: [14514, 16486, 14926, 19855, 15002],
        skills: [360, 167],
        img: "img4$1/__cb20140129062341/$2/f/f8/Hippocamp_II_Figure.png",
        fullName: "Hippocamp II"
    },
    10560: {
        name: "Hippogriff", stats: [9978, 11063, 11942, 9295, 10074],
        skills: [133],
        img: "img4$1/__cb20130111170016/$2/3/3e/Hippogriff_of_Rites_II_Figure.png",
        fullName: "Hippogriff of Rites II"
    },
    10726: {
        name: "Hlokk", stats: [14328, 14462, 12832, 9271, 17133],
        skills: [502, 503],
        img: "img3$1/__cb20140630102857/$2/7/7a/Hlokk%2C_Blade_of_Thunder_II_Figure.png",
        fullName: "Hlokk, Blade of Thunder II"
    },
    10635: {
        name: "Hollofernyiges", stats: [16551, 16757, 13875, 14568, 16941],
        skills: [33],
        img: "img3$1/__cb20130321232308/$2/2/20/Hollofernyiges_II_Figure.png",
        fullName: "Hollofernyiges II"
    },
    11297: {
        name: "Hoska", stats: [18996, 7906, 15096, 17023, 8881],
        skills: [484, 485],
        autoAttack: 10016,
        img: "img2$1/__cb20140613080813/$2/6/6c/Hoska%2C_the_Firestroke_II_Figure.png",
        fullName: "Hoska, the Firestroke II"
    },
    10704: {
        name: "Hraesvelg", stats: [12499, 17472, 11784, 12662, 13799],
        skills: [251],
        img: "img3$1/__cb20130927185735/$2/c/cd/Hraesvelg%2C_Corpse_Feaster_II_Figure.png",
        fullName: "Hraesvelg, Corpse Feaster II"
    },
    10715: {
        name: "Hrimthurs", stats: [13414, 15572, 16144, 9783, 10600],
        skills: [205],
        img: "img2$1/__cb20130613194728/$2/e/e9/Hrimthurs_the_Blizzard_II_Figure.png",
        fullName: "Hrimthurs the Blizzard II"
    },
    11401: {
        name: "Huan", stats: [14005, 14406, 13106, 9997, 16096],
        skills: [577],
        img: "img1$1/__cb20140830112829/$2/d/d4/Huan%2C_Doomcaller_II_Figure.png",
        fullName: "Huan, Doomcaller II"
    },
    10980: {
        name: "Hundred-eyed Warrior", stats: [17385, 18501, 15641, 10452, 17634],
        skills: [289],
        img: "img2$1/__cb20131115130425/$2/2/21/Hundred-eyed_Warrior_II_Figure.png",
        fullName: "Hundred-eyed Warrior II"
    },
    10970: {
        name: "Hypnos", stats: [16291, 17277, 15446, 12488, 17992],
        skills: [274],
        img: "img4$1/__cb20131101130655/$2/3/3b/Hypnos%2C_Lord_of_Dreams_II_Figure.png",
        fullName: "Hypnos, Lord of Dreams II"
    },
    11393: {
        name: "Icarus", stats: [15186, 14796, 14005, 7137, 17363],
        skills: [568, 569],
        img: "img1$1/__cb20140909101524/$2/9/94/Icarus%2C_Fallen_Hero_II_Figure.png",
        fullName: "Icarus, Fallen Hero II"
    },
    10688: {
        name: "Ignis", stats: [11022, 11312, 10818, 13460, 12859],
        skills: [164],
        img: "img2$1/__cb20130402220709/$2/2/2f/Ignis_Fatuus_II_Figure.png",
        fullName: "Ignis Fatuus II"
    },
    10706: {
        name: "Ijiraq", stats: [13929, 14536, 9791, 17797, 12012],
        skills: [168],
        img: "img2$1/__cb20130412195618/$2/1/1b/Ijiraq%2C_the_Glacier_II_Figure.png",
        fullName: "Ijiraq, the Glacier II"
    },
    11064: {
        name: "Ijiraq L", stats: [16995, 14449, 17006, 19508, 12987],
        skills: [328, 329],
        img: "img3$1/__cb20131221031354/$2/3/3c/Ijiraq_the_Brinicle_II_Figure.png",
        fullName: "Ijiraq the Brinicle II"
    },
    21104: {
        name: "IIG", stats: [23155, 19935, 21027, 8440, 17505],
        skills: [444, 445],
        img: "img1$1/__cb20140505115108/$2/5/5f/Impregnable_Iron_Golem_Figure.png",
        fullName: "Impregnable Iron Golem"
    },
    11144: {
        name: "Infested Cyclops", stats: [19508, 19508, 15392, 9997, 15348],
        skills: [364],
        img: "img3$1/__cb20140207111438/$2/d/db/Infested_Cyclops_II_Figure.png",
        fullName: "Infested Cyclops II"
    },
    11120: {
        name: "Infested Minotaur", stats: [13691, 15294, 16031, 9390, 14070],
        skills: [299, 301],
        img: "img3$1/__cb20140426092258/$2/d/d3/Infested_Minotaur_II_Figure_2.png",
        fullName: "Infested Minotaur II"
    },
    10319: {
        name: "Peryton", stats: [10904, 9674, 10490, 10490, 12952],
        skills: [33],
        img: "img1$1/__cb20130106234752/$2/2/2b/Infested_Peryton_II_Figure.png",
        fullName: "Infested Peryton II"
    },
    11342: {
        name: "Ghost Ship", stats: [15365, 12879, 11928, 10951, 16803],
        skills: [525],
        img: "img2$1/__cb20140730092558/$2/0/0f/Inhabited_Ghost_Ship_II_Figure.png",
        fullName: "Inhabited Ghost Ship II"
    },
    693: {
        name: "Ioskeha", stats: [13138, 13611, 11162, 15329, 13675],
        skills: [160],
        img: "img2$1/__cb20130330204311/$2/2/22/Ioskeha_Figure.png",
        fullName: "Ioskeha"
    },
    10592: {
        name: "Ira", stats: [12832, 14489, 8770, 11172, 17254],
        skills: [138],
        img: "img4$1/__cb20130227203822/$2/6/6c/Ira%2C_Hypnotic_Specter_II_Figure.png",
        fullName: "Ira, Hypnotic Specter II"
    },
    10681: {
        name: "Iron Golem", stats: [16778, 13615, 17818, 9867, 8848],
        skills: [152],
        img: "img2$1/__cb20130313201229/$2/9/9f/Iron_Golem_II_Figure.png",
        fullName: "Iron Golem II"
    },
    10746: {
        name: "Iseult", stats: [12731, 10977, 11708, 15865, 14193],
        skills: [144],
        img: "img1$1/__cb20130629202258/$2/3/3b/Iseult_the_Redeemer_II_Figure.png",
        fullName: "Iseult the Redeemer II"
    },
    11376: {
        name: "Ishtar", stats: [16009, 16074, 13106, 9022, 14265],
        skills: [560, 561],
        img: "img2$1/__cb20140830112828/$2/4/4d/Ishtar%2C_Goddess_of_Love_II_Figure.png",
        fullName: "Ishtar, Goddess of Love II"
    },
    11351: {
        name: "Ivy", stats: [16341, 3882, 13803, 15889, 17998],
        skills: [536],
        autoAttack: 10026,
        img: "img3$1/__cb20140809012719/$2/7/73/Ivy_the_Verdant_II_Figure.png",
        fullName: "Ivy the Verdant II"
    },
    11407: {
        name: "Ixtab", stats: [20007, 8502, 17472, 17504, 18013],
        skills: [588, 589],
        autoAttack: 10031,
        img: "img2$1/__cb20140930102755/$2/9/94/Ixtab%2C_Guardian_of_the_Dead_II_Figure.png",
        fullName: "Ixtab, Guardian of the Dead II"
    },
    11009: {
        name: "Jabberwock", stats: [13994, 16193, 13008, 19508, 18024],
        skills: [270, 271],
        img: "img4$1/__cb20131023124841/$2/1/1f/Jabberwock%2C_Phantom_Dragon_II_Figure.png",
        fullName: "Jabberwock, Phantom Dragon II"
    },
    11169: {
        name: "Jack", stats: [13507, 9000, 12196, 16204, 16995],
        skills: [333],
        autoAttack: 10009,
        img: "img1$1/__cb20131227221921/$2/0/0b/Jack_o%27_Frost_II_Figure.png",
        fullName: "Jack o' Frost II"
    },
    10569: {
        name: "Jinx-eye", stats: [14709, 15998, 13832, 13832, 14915],
        skills: [146],
        img: "img1$1/__cb20130220115250/$2/c/c4/Jinx-eye_Dragon_II_Figure.png",
        fullName: "Jinx-eye Dragon II"
    },
    11266: {
        name: "Jormungandr", stats: [13024, 16768, 11756, 10112, 15889],
        skills: [438],
        autoAttack: 10012,
        img: "img3$1/__cb20140430101914/$2/9/97/Jormungandr%2C_World_Serpent_II_Figure.png",
        fullName: "Jormungandr, World Serpent II"
    },
    10510: {
        name: "Kagemaru", stats: [14319, 16973, 13940, 13420, 14568],
        skills: [137],
        img: "img4$1/__cb20130114201626/$2/3/30/Kagemaru%2C_Master_Ninja_II_Figure.png",
        fullName: "Kagemaru, Master Ninja II"
    },
    11121: {
        name: "Kalevan", stats: [12629, 18013, 11914, 12055, 13821],
        skills: [297, 240],
        img: "img3$1/__cb20131122044155/$2/b/bd/Kalevan%2C_the_Forest_Green_II_Figure.png",
        fullName: "Kalevan, the Forest Green II"
    },
    10804: {
        name: "Kangana", stats: [15803, 18750, 14872, 12813, 13247],
        skills: [216],
        img: "img2$1/__cb20130726121448/$2/b/b1/Kangana%2C_the_Maelstrom_II_Figure.png",
        fullName: "Kangana, the Maelstrom II"
    },
    10789: {
        name: "Katiria", stats: [10807, 11318, 11356, 10245, 11623],
        skills: [156],
        img: "img2$1/__cb20130714135314/$2/b/b6/Katiria_Nullblade_II_Figure.png",
        fullName: "Katiria Nullblade II"
    },
    11125: {
        name: "Kekro", stats: [17992, 12001, 15002, 19660, 16302],
        skills: [379],
        autoAttack: 10007,
        img: "img3$1/__cb20140221092259/$2/3/3b/Kekro%2C_Demiwyrm_Magus_II_Figure.png",
        fullName: "Kekro, Demiwyrm Magus II"
    },
    10767: {
        name: "Kelaino", stats: [12538, 12707, 10490, 15047, 14999],
        skills: [197],
        img: "img4$1/__cb20130609105750/$2/0/05/Kelaino%2C_the_Dark_Cloud_II_Figure.png",
        fullName: "Kelaino, the Dark Cloud II"
    },
    11381: {
        name: "Kijin", stats: [17047, 3323, 14038, 17402, 16110],
        skills: [566],
        autoAttack: 10031,
        img: "img2$1/__cb20140909101523/$2/3/3a/Kijin%2C_Heavenly_Maiden_II_Figure.png",
        fullName: "Kijin, Heavenly Maiden II"
    },
    11279: {
        name: "Kobold", stats: [14207, 14462, 15804, 8442, 14999],
        skills: [449],
        img: "img1$1/__cb20140508115333/$2/6/6e/Kobold_Guard_Captain_II_Figure.png",
        fullName: "Kobold Guard Captain II"
    },
    11314: {
        name: "Kua Fu", stats: [16510, 16561, 12207, 9174, 13476],
        skills: [497],
        img: "img3$1/__cb20140628103005/$2/e/e3/Kua_Fu%2C_Sun_Chaser_II_Figure.png",
        fullName: "Kua Fu, Sun Chaser II"
    },
    10911: {
        name: "Kyteler", stats: [11721, 12524, 9892, 17254, 16416],
        skills: [258],
        img: "img4$1/__cb20140120233253/$2/d/d4/Kyteler_the_Corrupted_II_Figure.png",
        fullName: "Kyteler the Corrupted II"
    },
    10985: {
        name: "Lahamu", stats: [14024, 10784, 15999, 16010, 11001],
        skills: [281],
        autoAttack: 10004,
        img: "img2$1/__cb20131112084823/$2/f/fe/Lahamu%2C_Royal_Viper_II_Figure.png",
        fullName: "Lahamu, Royal Viper II"
    },
    21372: {
        name: "Lamashtu", stats: [20579, 17977, 20007, 12062, 17685],
        skills: [555],
        img: "img2$1/__cb20140830112546/$2/e/e5/Lamashtu%2C_Fell_Goddess_Figure.png",
        fullName: "Lamashtu, Fell Goddess"
    },
    10432: {
        name: "Lanvall", stats: [12914, 14639, 12245, 12210, 15040],
        skills: [18],
        img: "img1$1/__cb20130106224520/$2/6/63/Lanvall%2C_Lizard_Cavalier_II_Figure.png",
        fullName: "Lanvall, Lizard Cavalier II"
    },
    11347: {
        name: "Lava Dragon", stats: [19021, 8881, 16237, 18891, 16497],
        skills: [534, 535],
        autoAttack: 10019,
        img: "img3$1/__cb20140809012705/$2/d/de/Lava_Dragon_II_Figure.png",
        fullName: "Lava Dragon II"
    },
    11128: {
        name: "Leupold", stats: [17585, 11038, 12963, 9794, 16510],
        skills: [378],
        img: "img4$1/__cb20140221092527/$2/c/ca/Leupold%2C_Wyvern_Knight_II_Figure.png",
        fullName: "Leupold, Wyvern Knight II"
    },
    10852: {
        name: "Libuse", stats: [11221, 13782, 13379, 16048, 13038],
        skills: [245],
        img: "img2$1/__cb20130911123252/$2/7/7e/Libuse%2C_the_Black_Queen_II_Figure.png",
        fullName: "Libuse, the Black Queen II"
    },
    10933: {
        name: "Linnorm", stats: [12326, 11102, 11979, 16605, 16497],
        skills: [313],
        img: "img3$1/__cb20131210233903/$2/0/0b/Linnorm%2C_the_Hailstorm_II_Figure.png",
        fullName: "Linnorm, the Hailstorm II"
    },
    21187: {
        name: "Loki", stats: [19202, 21231, 16192, 15119, 15806],
        skills: [382],
        img: "img4$1/__cb20140304213357/$2/7/7b/Loki%2C_God_of_Cunning_Figure.png",
        fullName: "Loki, God of Cunning"
    },
    11316: {
        name: "Long Feng", stats: [15164, 17125, 13539, 10452, 12207],
        skills: [501],
        img: "img2$1/__cb20140628103006/$2/a/ad/Long_Feng%2C_the_Dragon_Fist_II_Figure.png",
        fullName: "Long Feng, the Dragon Fist II"
    },
    10754: {
        name: "Lucia", stats: [17106, 13878, 16633, 9881, 10857],
        skills: [16],
        img: "img1$1/__cb20130428112723/$2/9/97/Lucia%2C_Petal-Shears_II_Figure.png",
        fullName: "Lucia, Petal-Shears II"
    },
    10794: {
        name: "Ma-Gu", stats: [14182, 12438, 11477, 15306, 12438],
        skills: [4],
        img: "img2$1/__cb20130709182651/$2/a/a8/Ma-Gu_the_Enlightened_II_Figure.png",
        fullName: "Ma-Gu the Enlightened II"
    },
    11141: {
        name: "Lynx", stats: [14207, 14062, 12500, 10014, 17147],
        skills: [493],
        img: "img3$1/__cb20140620060851/$2/2/21/Madprowl_Lynx_II_Figure.png",
        fullName: "Madprowl Lynx II"
    },
    10558: {
        name: "Magdal", stats: [13929, 15110, 15132, 13810, 15359],
        skills: [120],
        img: "img1$1/__cb20130210215236/$2/c/c0/Magdal_Dragonheart_II_Figure.png",
        fullName: "Magdal Dragonheart II"
    },
    11126: {
        name: "Magdal M", stats: [18728, 20917, 21491, 23235, 15998],
        skills: [336],
        img: "img3$1/__cb20140221092054/$2/4/46/Magdal%2C_Dragonmaster_II_Figure.png",
        fullName: "Magdal, Dragonmaster II"
    },
    11429: {
        name: "Maisie", stats: [19194, 19097, 16258, 8101, 17905],
        skills: [599, 600],
        autoAttack: 10037,
        img: "img1$1/__cb20141011104105/$2/d/da/Maisie%2C_Grimoire_Keeper_II_Figure.png",
        fullName: "Maisie, Grimoire Keeper II"
    },
    10365: {
        name: "Makalipon", stats: [10343, 8405, 10611, 12280, 10343],
        skills: [60],
        img: "img1$1/__cb20130202230532/$2/f/f1/Makalipon%2C_Sacred_Fruit_II_Figure.png",
        fullName: "Makalipon, Sacred Fruit II"
    },
    10445: {
        name: "Managarmr", stats: [12210, 12258, 13266, 13887, 11688],
        skills: [108],
        img: "img1$1/__cb20130125003049/$2/5/51/Managarmr_Frost_Touch_II_Figure.png",
        fullName: "Managarmr Frost Touch II"
    },
    11280: {
        name: "Managarmr M", stats: [20007, 21599, 17396, 23907, 18100],
        skills: [463],
        autoAttack: 10007,
        img: "img4$1/__cb20140521080600/$2/2/2b/Managarmr%2C_the_Frost_Moon_II_Figure.png",
        fullName: "Managarmr, the Frost Moon II"
    },
    11319: {
        name: "Manannan", stats: [16551, 10668, 16464, 19227, 16605],
        skills: [513, 514],
        autoAttack: 10007,
        img: "img4$1/__cb20140715092527/$2/a/a4/Manannan_mac_Lir_II_Figure.png",
        fullName: "Manannan mac Lir II"
    },
    10792: {
        name: "Marchosias", stats: [18165, 15424, 12781, 18566, 13561],
        skills: [210],
        img: "img2$1/__cb20130714135315/$2/7/71/Marchosias%2C_Pit_Beast_II_Figure.png",
        fullName: "Marchosias, Pit Beast II"
    },
    11136: {
        name: "Marcus", stats: [12317, 16534, 14255, 8991, 15438],
        skills: [358],
        img: "img3$1/__cb20140129062109/$2/5/53/Marcus%2C_Brave_of_Liberation_II_Figure.png",
        fullName: "Marcus, Brave of Liberation II"
    },
    332: {
        name: "Mari", stats: [10500, 10980, 10850, 13370, 11500],
        skills: [47],
        img: "img1$1/__cb20130125001827/$2/e/e4/Mari_the_Witch_Figure.png",
        fullName: "Mari the Witch"
    },
    11013: {
        name: "Marraco", stats: [18716, 15876, 17254, 7381, 8809],
        skills: [61, 167],
        img: "img4$1/__cb20131115131303/$2/7/7b/Marraco%2C_Crusted_Wyrm_II_Figure.png",
        fullName: "Marraco, Crusted Wyrm II"
    },
    10656: {
        name: "Mathilda", stats: [11841, 15172, 10639, 12718, 15218],
        skills: [115],
        img: "img3$1/__cb20130430104152/$2/6/68/Mathilda_the_Tarantula_II_Figure.png",
        fullName: "Mathilda the Tarantula II"
    },
    10632: {
        name: "Doog", stats: [10560, 10549, 10777, 14330, 11925],
        skills: [94],
        img: "img4$1/__cb20130314191038/$2/0/09/Mauthe_Doog_II_Figure.png",
        fullName: "Mauthe Doog II"
    },
    10705: {
        name: "Melanippe", stats: [16139, 16800, 13929, 11849, 15132],
        skills: [195],
        img: "img4$1/__cb20130708160233/$2/4/4f/Melanippe%2C_Wolfrider_II_Figure.png",
        fullName: "Melanippe, Wolfrider II"
    },
    11214: {
        name: "Melek", stats: [19097, 16107, 21545, 12792, 10094],
        skills: [374, 375],
        img: "img2$1/__cb20140213035118/$2/1/19/Melek%2C_the_Black_Peacock_II_Figure.png",
        fullName: "Melek, the Black Peacock II"
    },
    10527: {
        name: "Melusine", stats: [11417, 11976, 10490, 13562, 11210],
        skills: [155],
        img: "img2$1/__cb20130330231431/$2/7/72/Melusine_the_Witch_II_Figure.png",
        fullName: "Melusine the Witch II"
    },
    11305: {
        name: "Microraptor", stats: [16172, 18577, 14406, 14092, 17753],
        skills: [492],
        img: "img4$1/__cb20140620060852/$2/1/14/Microraptor_II_Figure.png",
        fullName: "Microraptor II"
    },
    11212: {
        name: "Millarca", stats: [15305, 10668, 15565, 21393, 18046],
        skills: [407, 408],
        autoAttack: 10007,
        img: "img2$1/__cb20140325120640/$2/f/ff/Millarca%2C_Lady_of_Thorns_II_Figure.png",
        fullName: "Millarca, Lady of Thorns II"
    },
    11134: {
        name: "Minerva", stats: [14590, 18024, 14438, 15435, 18013],
        skills: [357],
        img: "img2$1/__cb20140129062047/$2/a/a2/Minerva%2C_Goddess_of_War_II_Figure.png",
        fullName: "Minerva, Goddess of War II"
    },
    11081: {
        name: "Moni", stats: [13562, 15537, 12121, 10234, 16448],
        skills: [340],
        img: "img3$1/__cb20140110075315/$2/4/43/Moni_the_Dismemberer_II_Figure.png",
        fullName: "Moni the Dismemberer II"
    },
    10621: {
        name: "Montu", stats: [12952, 12904, 12269, 12269, 15306],
        skills: [170],
        img: "img2$1/__cb20130414021249/$2/1/1d/Montu%2C_God_of_War_II_Figure.png",
        fullName: "Montu, God of War II"
    },
    308: {
        name: "Mordred", stats: [11000, 12050, 10950, 11000, 12500],
        skills: [18],
        img: "img1$1/__cb20130125001433/$2/6/6b/Mordred%2C_Drake_Knight_Figure.png",
        fullName: "Mordred, Drake Knight"
    },
    10625: {
        name: "Moren", stats: [8502, 11318, 7759, 16803, 8039],
        skills: [10000, 71, 85], // hacky
        isMounted: true,
        img: "img3$1/__cb20130418051723/$2/4/4a/Moren%2C_Rime_Mage_II_Figure.png",
        fullName: "Moren, Rime Mage II"
    },
    11233: {
        name: "Musashi", stats: [20592, 24752, 19151, 17981, 18024],
        skills: [404],
        img: "img1$1/__cb20140326090459/$2/1/1f/Musashi%2C_the_Twinblade_II_Figure.png",
        fullName: "Musashi, the Twinblade II"
    },
    10186: {
        name: "Naberius", stats: [9563, 9552, 7828, 11208, 11298],
        skills: [18],
        img: "img2$1/__cb20130225032050/$2/e/e9/Naberius_II_Figure.png",
        fullName: "Naberius II"
    },
    11015: {
        name: "Narmer", stats: [15876, 12194, 15172, 8870, 15924],
        skills: [260],
        img: "img1$1/__cb20131021231637/$2/2/2d/Narmer%2C_Mummy_King_II_Figure.png",
        fullName: "Narmer, Mummy King II"
    },
    10989: {
        name: "Nehasim", stats: [12707, 16071, 11390, 12466, 15172],
        skills: [294],
        img: "img2$1/__cb20131122150818/$2/8/8b/Nehasim_the_Seething_II_Figure.png",
        fullName: "Nehasim the Seething II"
    },
    11057: {
        name: "Neith", stats: [18999, 19660, 15002, 12001, 15305],
        skills: [326],
        img: "img2$1/__cb20131221031333/$2/3/3b/Neith%2C_Goddess_of_War_II_Figure.png",
        fullName: "Neith, Goddess of War II"
    },
    21291: {
        name: "Nephthys", stats: [21015, 11985, 18202, 22005, 16912],
        skills: [471, 472],
        autoAttack: 10007,
        img: "img1$1/__cb20140528102649/$2/1/16/Nephthys%2C_Ruler_of_Death_Figure.png",
        fullName: "Nephthys, Ruler of Death"
    },
    10994: {
        name: "Nergal", stats: [13008, 15392, 11947, 11643, 16518],
        skills: [282],
        img: "img1$1/__cb20131108145626/$2/7/75/Nergal%2C_Abyssal_Overseer_II_Figure.png",
        fullName: "Nergal, Abyssal Overseer II"
    },
    11079: {
        name: "Nightblade", stats: [12196, 16995, 13528, 10896, 14915],
        skills: [341],
        img: "img1$1/__cb20140110075314/$2/6/64/Nightblade%2C_Archsage_of_Winds_II_Figure.png",
        fullName: "Nightblade, Archsage of Winds II"
    },
    11369: {
        name: "Nin-Ridu", stats: [16529, 16215, 11351, 10495, 14005],
        skills: [505],
        autoAttack: 10022,
        img: "img2$1/__cb20140709072738/$2/3/39/Nin-Ridu_Figure.png",
        fullName: "Nin-Ridu"
    },
    10799: {
        name: "Niu Mo Wang", stats: [14276, 17071, 15998, 13420, 13138],
        skills: [133],
        img: "img1$1/__cb20130709182652/$2/2/26/Niu_Mo_Wang_II_Figure.png",
        fullName: "Niu Mo Wang II"
    },
    10438: {
        name: "Odin Stormgod", stats: [12855, 14346, 12378, 14929, 12245],
        skills: [119],
        img: "img1$1/__cb20130106211414/$2/5/5c/Odin_Stormgod_II_Figure.png",
        fullName: "Odin Stormgod II"
    },
    11267: {
        name: "Odin L", stats: [15110, 16562, 13875, 17363, 18057],
        skills: [440, 441],
        isMounted: true,
        img: "img3$1/__cb20140430101913/$2/6/65/Odin%2C_God_of_Victory_II_Figure.png",
        fullName: "Odin, God of Victory II"
    },
    10889: {
        name: "Olitiau", stats: [14081, 15760, 11676, 11232, 15197],
        skills: [221],
        img: "img1$1/__cb20130731090323/$2/3/33/Olitiau%2C_the_Great_Bat_II_Figure.png",
        fullName: "Olitiau, the Great Bat II"
    },
    10505: {
        name: "Oniroku", stats: [12207, 13731, 12235, 12194, 13621],
        skills: [115],
        img: "img1$1/__cb20130114161242/$2/9/96/Oniroku_the_Slayer_II_Figure.png",
        fullName: "Oniroku the Slayer II"
    },
    11088: {
        name: "Ovinnik", stats: [19010, 11210, 20592, 16627, 12315],
        skills: [342, 356],
        autoAttack: 10007,
        img: "img3$1/__cb20140116044009/$2/c/c1/Ovinnik%2C_Hex_Beast_II_Figure.png",
        fullName: "Ovinnik, Hex Beast II"
    },
    11408: {
        name: "Pakal", stats: [15435, 15175, 10777, 10018, 17103],
        skills: [590, 591],
        img: "img1$1/__cb20140930103243/$2/6/68/Pakal%2C_Jade_King_II_Figure.png",
        fullName: "Pakal, Jade King II"
    },
    11286: {
        name: "Aquarius", stats: [16323, 7494, 11448, 17363, 16009],
        skills: [450, 451],
        autoAttack: 10007,
        img: "img2$1/__cb20140508115333/$2/b/b9/Paladin_of_Aquarius_II_Figure.png",
        fullName: "Paladin of Aquarius II"
    },
    11310: {
        name: "Cancer", stats: [16627, 17201, 10408, 7494, 16908],
        skills: [478, 479],
        img: "img2$1/__cb20140606074955/$2/4/4e/Paladin_of_Cancer_II_Figure.png",
        fullName: "Paladin of Cancer II"
    },
    11210: {
        name: "Aries", stats: [14395, 15543, 16854, 9011, 12813],
        skills: [392, 393],
        img: "img3$1/__cb20140313080212/$2/3/37/Paladin_of_Aries_II_Figure.png",
        fullName: "Paladin of Aries II"
    },
    11301: {
        name: "Capricorn", stats: [14937, 8491, 13507, 16551, 15099],
        skills: [476],
        autoAttack: 10007,
        img: "img2$1/__cb20140606074954/$2/f/f4/Paladin_of_Capricorn_II_Figure.png",
        fullName: "Paladin of Capricorn II"
    },
    11325: {
        name: "Gemini", stats: [15197, 15641, 10343, 10148, 17147],
        skills: [511, 512],
        isMounted: true,
        img: "img2$1/__cb20140714102308/$2/4/40/Paladin_of_Gemini_II_Figure.png",
        fullName: "Paladin of Gemini II"
    },
    11277: {
        name: "Leo", stats: [15121, 15002, 14200, 7440, 16811],
        skills: [448],
        autoAttack: 10014,
        img: "img4$1/__cb20140508115334/$2/9/91/Paladin_of_Leo_II_Figure.png",
        fullName: "Paladin of Leo II"
    },
    11229: {
        name: "Pisces", stats: [13041, 8621, 14796, 17114, 14991],
        skills: [419],
        autoAttack: 10007,
        img: "img1$1/__cb20140411023129/$2/2/22/Paladin_of_Pisces_II_Figure.png",
        fullName: "Paladin of Pisces II"
    },
    11200: {
        name: "Libra", stats: [14178, 16172, 14698, 9845, 13669],
        skills: [390],
        img: "img4$1/__cb20140313080212/$2/8/86/Paladin_of_Libra_II_Figure.png",
        fullName: "Paladin of Libra II"
    },
    11334: {
        name: "Sagittarius", stats: [15587, 15218, 12163, 8415, 17255],
        skills: [507, 508],
        img: "img3$1/__cb20140709072736/$2/c/c0/Paladin_of_Sagittarius_II_Figure.png",
        fullName: "Paladin of Sagittarius II"
    },
    11353: {
        name: "Scorpio", stats: [14146, 15998, 13117, 8350, 16995],
        skills: [544],
        img: "img4$1/__cb20140814101430/$2/f/fe/Paladin_of_Scorpio_II_Figure.png",
        fullName: "Paladin of Scorpio II"
    },
    11362: {
        name: "Taurus", stats: [15608, 18598, 10105, 7007, 17363],
        skills: [553, 554],
        img: "img2$1/__cb20140828103608/$2/d/d3/Paladin_of_Taurus_II_Figure.png",
        fullName: "Paladin of Taurus II"
    },
    11241: {
        name: "Virgo", stats: [15500, 6118, 12380, 17797, 16822],
        skills: [421, 422],
        autoAttack: 10007,
        img: "img4$1/__cb20140411023129/$2/c/cf/Paladin_of_Virgo_II_Figure.png",
        fullName: "Paladin of Virgo II"
    },
    11231: {
        name: "Palna", stats: [14999, 15509, 14606, 8991, 13807],
        skills: [420],
        img: "img3$1/__cb20140411023129/$2/f/fb/Palna%2C_the_Vanguard_II_Figure.png",
        fullName: "Palna, the Vanguard II"
    },
    11374: {
        name: "Pazuzu", stats: [15121, 17182, 14988, 5640, 14999],
        skills: [556],
        img: "img2$1/__cb20140830112827/$2/4/4d/Pazuzu%2C_the_Whirling_Jinn_II_Figure.png",
        fullName: "Pazuzu, the Whirling Jinn II"
    },
    10348: {
        name: "Pegasus", stats: [8756, 10200, 8843, 10880, 9181],
        skills: [111],
        img: "img4$1/__cb20130301003405/$2/6/69/Pegasus%2C_the_Light_Divine_II_Figure.png",
        fullName: "Pegasus, the Light Divine II"
    },
    10831: {
        name: "Pegasus Knight", stats: [15251, 19032, 15370, 13073, 18046],
        skills: [311, 312],
        isMounted: true,
        img: "img3$1/__cb20131209121232/$2/e/e4/Pegasus_Knight_II_Figure.png",
        fullName: "Pegasus Knight II"
    },
    11425: {
        name: "Pelops", stats: [15056, 14113, 10018, 12055, 17266],
        skills: [597, 598],
        img: "img3$1/__cb20141009082936/$2/e/ee/Pelops%2C_Fallen_Hero_II_Figure.png",
        fullName: "Pelops, Fallen Hero II"
    },
    10013: {
        name: "Pendragon", stats: [9844, 10317, 10751, 12357, 10861],
        skills: [60],
        img: "img3$1/__cb20130301160021/$2/4/45/Pendragon%2C_the_Scourge_II_Figure.png",
        fullName: "Pendragon, the Scourge II"
    },
    21368: {
        name: "Perendon", stats: [19202, 17300, 17055, 17009, 17604],
        skills: [504],
        autoAttack: 10021,
        img: "img1$1/__cb20140709072738/$2/2/24/Perendon_the_Pure_Figure.png",
        fullName: "Perendon the Pure"
    },
    11020: {
        name: "Phantasmal Succubus", stats: [18013, 13604, 20007, 17190, 10701],
        skills: [272, 273],
        img: "img1$1/__cb20131025125352/$2/f/fb/Phantasmal_Succubus_II_Figure.png",
        fullName: "Phantasmal Succubus II"
    },
    10710: {
        name: "Phantom Assassin", stats: [13507, 13951, 11102, 14341, 14081],
        skills: [193],
        img: "img1$1/__cb20130605201800/$2/1/10/Phantom_Assassin_II_Figure.png",
        fullName: "Phantom Assassin II"
    },
    11022: {
        name: "Phantom Knight", stats: [19877, 23213, 19270, 19682, 18057],
        skills: [267],
        img: "img4$1/__cb20131023124902/$2/6/61/Phantom_Knight%2C_the_Vagabond_II_Figure.png",
        fullName: "Phantom Knight, the Vagabond II"
    },
    11039: {
        name: "Phoenix", stats: [14005, 11188, 12033, 19010, 12185],
        skills: [305],
        img: "img1$1/__cb20131129143510/$2/2/25/Phoenix%2C_the_Metempsychosis_II_Figure.png",
        fullName: "Phoenix, the Metempsychosis II"
    },
    11237: {
        name: "Pollux", stats: [13290, 18631, 11654, 10311, 13756],
        skills: [427, 428],
        img: "img1$1/__cb20140416052152/$2/a/a2/Pollux%2C_Fallen_Hero_II_Figure.png",
        fullName: "Pollux, Fallen Hero II"
    },
    10876: {
        name: "Pontifex", stats: [14590, 16410, 13507, 18371, 17797],
        skills: [229, 167],
        img: "img2$1/__cb20130823004421/$2/b/bd/Pontifex_Antiquus_II_Figure.png",
        fullName: "Pontifex Antiquus II"
    },
    10075: {
        name: "Pouliquen", stats: [7890, 6271, 8910, 9439, 7843],
        skills: [16],
        img: "img2$1/__cb20130126053738/$2/6/6c/Pouliquen%2C_Archibishop_II_Figure.png",
        fullName: "Pouliquen, Archibishop II"
    },
    10785: {
        name: "Premyslid", stats: [13626, 16984, 14926, 18772, 11232],
        skills: [244],
        img: "img2$1/__cb20130911122726/$2/c/c7/Premyslid%2C_the_Black_King_II_Figure.png",
        fullName: "Premyslid, the Black King II"
    },
    10599: {
        name: "Princeps", stats: [9360, 10772, 9674, 10181, 11667],
        skills: [156],
        img: "img4$1/__cb20130314191111/$2/d/dc/Princeps%2C_Angel_of_Doom_II_Figure.png",
        fullName: "Princeps, Angel of Doom II"
    },
    11203: {
        name: "Prismatic", stats: [24004, 14438, 20982, 23300, 18024],
        skills: [432],
        autoAttack: 10007,
        img: "img4$1/__cb20140423020348/$2/f/fe/Prismatic_Wyvern_Figure.png",
        fullName: "Prismatic Wyvern"
    },
    11100: {
        name: "Queen Waspmen", stats: [14070, 19898, 13247, 15998, 17829],
        skills: [348],
        img: "img1$1/__cb20140122120929/$2/f/f6/Queen_of_the_Waspmen_II_Figure.png",
        fullName: "Queen of the Waspmen II"
    },
    21340: {
        name: "Cetus", stats: [22316, 20624, 17579, 11013, 16729],
        skills: [524],
        autoAttack: 10021,
        img: "img3$1/__cb20140730092831/$2/0/0a/Raging_Cetus_Figure.png",
        fullName: "Raging Cetus"
    },
    11048: {
        name: "Ragnar", stats: [13245, 15804, 12001, 10294, 16510],
        skills: [314],
        img: "img4$1/__cb20131210233938/$2/9/97/Ragnar%2C_Dragonslayer_II_Figure.png",
        fullName: "Ragnar, Dragonslayer II"
    },
    10664: {
        name: "Ramiel", stats: [15543, 13929, 13431, 16388, 14709],
        skills: [185],
        img: "img3$1/__cb20130514144200/$2/d/da/Ramiel%2C_Angel_of_the_Storm_II_Figure.png",
        fullName: "Ramiel, Angel of the Storm II"
    },
    10699: {
        name: "Rampant Lion", stats: [16291, 17569, 16518, 12564, 18035],
        skills: [380, 381],
        img: "img3$1/__cb20140222023232/$2/8/87/Rampant_Lion_II_Figure.png",
        fullName: "Rampant Lion II"
    },
    10806: {
        name: "Rapse", stats: [11928, 14182, 13110, 11270, 15524],
        skills: [179],
        img: "img4$1/__cb20130721141602/$2/e/e0/Rapse%2C_the_Bloody_Horns_II_Figure.png",
        fullName: "Rapse, the Bloody Horns II"
    },
    10863: {
        name: "Rasiel", stats: [11936, 15587, 11817, 17797, 11004],
        skills: [234],
        img: "img2$1/__cb20130901132455/$2/1/13/Rasiel%2C_Angel_All-Knowing_II_Figure.png",
        fullName: "Rasiel, Angel All-Knowing II"
    },
        10844: {
        name: "Regin", stats: [12734, 13342, 12832, 16144, 11270],
        skills: [155],
        img: "img2$1/__cb20130823004527/$2/b/b6/Regin%2C_the_Brass_Mantis_II_Figure.png",
        fullName: "Regin, the Brass Mantis II"
    },
    11196: {
        name: "Brass Gorilla", stats: [18996, 9760, 18096, 12684, 8319],
        skills: [398],
        img: "img2$1/__cb20140318135240/$2/6/6b/Reinforced_Brass_Gorilla_II_Figure.png",
        fullName: "Reinforced Brass Gorilla II"
    },
    11215: {
        name: "Rohde", stats: [17591, 8101, 16042, 15305, 10582],
        skills: [376, 377],
        autoAttack: 10007,
        img: "img2$1/__cb20140213035144/$2/3/3b/Rohde%2C_the_Rose_Thorn_II_Figure.png",
        fullName: "Rohde, the Rose Thorn II"
    },
    10845: {
        name: "Rovn", stats: [16269, 19086, 18772, 13214, 13355],
        skills: [228],
        img: "img2$1/__cb20130823004528/$2/a/a4/Rovn%2C_the_Brass_Panzer_II_Figure.png",
        fullName: "Rovn, the Brass Panzer II"
    },
    11066: {
        name: "Ruprecht", stats: [12911, 15316, 11795, 17504, 11199],
        skills: [330, 334],
        img: "img4$1/__cb20131221031407/$2/7/79/Ruprecht_the_Punisher_II_Figure.png",
        fullName: "Ruprecht the Punisher II"
    },
    11295: {
        name: "Ryaum", stats: [19454, 13561, 17667, 11221, 17602],
        skills: [482, 483],
        img: "img2$1/__cb20140613080813/$2/3/37/Ryaum%2C_Hussar_Captain_II_Figure.png",
        fullName: "Ryaum, Hussar Captain II"
    },
    11343: {
        name: "Sachiel", stats: [19357, 14059, 13052, 17017, 17526],
        skills: [527, 528],
        img: "img4$1/__cb20140730092614/$2/2/2b/Sachiel%2C_Angel_of_Water_II_Figure.png",
        fullName: "Sachiel, Angel of Water II"
    },
    11063: {
        name: "Treant", stats: [18566, 17017, 22542, 13626, 8014],
        skills: [154],
        img: "img1$1/__cb20131215131956/$2/6/67/Sagacious_Treant_II_Figure.png",
        fullName: "Sagacious Treant II"
    },
    11234: {
        name: "Saizo", stats: [16128, 12055, 16367, 19422, 16995],
        skills: [405],
        autoAttack: 10007,
        img: "img2$1/__cb20140326090514/$2/4/41/Saizo%2C_Phantom_Ninja_II_Figure.png",
        fullName: "Saizo, Phantom Ninja II"
    },
    10966: {
        name: "Saurva", stats: [14958, 15305, 11329, 11362, 15002],
        skills: [259],
        img: "img1$1/__cb20131015140405/$2/f/f3/Saurva%2C_the_Lawless_Lord_II_Figure.png",
        fullName: "Saurva, the Lawless Lord II"
    },
    21228: {
        name: "Hierophant", stats: [19681, 13391, 17534, 20112, 16950],
        skills: [418],
        autoAttack: 10007,
        img: "img1$1/__cb20140411023129/$2/b/b1/Scathing_Hierophant_Figure.png",
        fullName: "Scathing Hierophant"
    },
    10676: {
        name: "Scirocco", stats: [15002, 14503, 14503, 18999, 16497],
        skills: [331, 301],
        img: "img3$1/__cb20131228021319/$2/d/d5/Scirocco%2C_Father_of_Winds_II_Figure.png",
        fullName: "Scirocco, Father of Winds II"
    },
    10626: {
        name: "Marid", stats: [14070, 17851, 14449, 12597, 15478],
        skills: [169],
        img: "img2$1/__cb20130414020555/$2/e/ed/Scorching_Marid_II_Figure.png",
        fullName: "Scorching Marid II"
    },
    11036: {
        name: "Sea Serpent", stats: [16020, 12012, 15121, 19259, 17103],
        skills: [302],
        img: "img1$1/__cb20131129152929/$2/6/65/Sea_Serpent_II_Figure.png",
        fullName: "Sea Serpent II"
    },
    11379: {
        name: "Seimei", stats: [19963, 6389, 17038, 19053, 17103],
        skills: [564, 565],
        autoAttack: 10007,
        img: "img4$1/__cb20140909101523/$2/b/b7/Seimei%2C_Onmyoji_II_Figure.png",
        fullName: "Seimei, Onmyoji II"
    },
    11204: {
        name: "Seismo", stats: [18999, 19097, 15056, 11015, 16800],
        skills: [433],
        img: "img1$1/__cb20140425214716/$2/c/ce/Seismo_Worm_Figure_2.png",
        fullName: "Seismo Worm"
    },
    10258: {
        name: "Sekhmet", stats: [12529, 16780, 13843, 13598, 13823],
        skills: [11],
        img: "img3$1/__cb20130106204046/$2/d/d7/Sekhmet_Aflame_II_Figure.png",
        fullName: "Sekhmet Aflame II"
    },
    11056: {
        name: "Selk", stats: [13902, 15854, 11976, 11208, 14927],
        skills: [327],
        img: "img4$1/__cb20131221031323/$2/0/03/Selk%2C_Desert_King_II_Figure.png",
        fullName: "Selk, Desert King II"
    },
    11321: {
        name: "Selkie", stats: [15804, 8442, 14049, 16024, 13586],
        skills: [515, 516],
        autoAttack: 10007,
        img: "img4$1/__cb20140715092434/$2/3/31/Selkie%2C_Lady_of_the_Shore_II_Figure.png",
        fullName: "Selkie, Lady of the Shore II"
    },
    11413: {
        name: "Sera", stats: [14293, 17023, 13306, 7406, 15903],
        skills: [594, 595],
        img: "img2$1/__cb20141009082935/$2/8/84/Sera%2C_Exorcist_II_Figure.png",
        fullName: "Sera, Exorcist II"
    },
    11290: {
        name: "Set", stats: [13097, 16364, 10990, 10001, 17133],
        skills: [469],
        img: "img2$1/__cb20140528102650/$2/c/c6/Set%2C_God_of_the_Sands_II_Figure.png",
        fullName: "Set, God of the Sands II"
    },
    11006: {
        name: "Siby", stats: [15558, 8005, 11442, 17120, 15804],
        skills: [550],
        autoAttack: 10018,
        img: "img2$1/__cb20140823140531/$2/0/0c/Siby%2C_Sea_Seer_II_Figure.png",
        fullName: "Siby, Sea Seer II"
    },
    11219: {
        name: "Sigiled Corpse Beast", stats: [17006, 12954, 14926, 19855, 16042],
        skills: [414, 415],
        autoAttack: 10007,
        img: "img1$1/__cb20140402124522/$2/f/f6/Sigiled_Corpse_Beast_II_Figure.png",
        fullName: "Sigiled Corpse Beast II"
    },
    11220: {
        name: "Sigiled Axeman", stats: [14644, 9076, 12987, 18338, 13409],
        skills: [416],
        autoAttack: 10007,
        img: "img3$1/__cb20140402124523/$2/9/9e/Sigiled_Skeleton_Axeman_II_Figure.png",
        fullName: "Sigiled Skeleton Axeman II"
    },
    10987: {
        name: "Sihn", stats: [12001, 10495, 12001, 17504, 16497],
        skills: [285],
        img: "img4$1/__cb20131108145539/$2/5/53/Sihn%2C_Moonlight_King_II_Figure.png",
        fullName: "Sihn, Moonlight King II"
    },
    11207: {
        name: "Silver Dragon", stats: [19714, 14601, 15067, 16215, 18154],
        skills: [522, 523],
        autoAttack: 10024,
        img: "img4$1/__cb20140723074838/$2/8/8e/Silver_Dragon_II_Figure.png",
        fullName: "Silver Dragon II"
    },
    11387: {
        name: "Simurgh", stats: [15524, 6956, 12145, 17206, 16110],
        skills: [580],
        autoAttack: 10007,
        img: "img2$1/__cb20140923104242/$2/a/a2/Simurgh%2C_Bird_Divine_II_Figure.png",
        fullName: "Simurgh, Bird Divine II"
    },
    11093: {
        name: "Sinbad", stats: [15868, 18154, 14644, 13853, 17006],
        skills: [318],
        img: "img2$1/__cb20131227221736/$2/9/9e/Sinbad_the_Adventurer_II_Figure.png",
        fullName: "Sinbad the Adventurer II"
    },
    10566: {
        name: "Bedwyr", stats: [12235, 11318, 12221, 13510, 10598],
        skills: [145],
        img: "img3$1/__cb20130212204233/$2/2/21/Sir_Bedwyr_of_the_Garden_II_Figure.png",
        fullName: "Sir Bedwyr of the Garden II"
    },
    10921: {
        name: "Brandiles", stats: [17017, 18100, 16269, 13940, 14070],
        skills: [252],
        img: "img1$1/__cb20131002005342/$2/0/06/Sir_Brandiles%2C_the_Flameblade_II_Figure.png",
        fullName: "Sir Brandiles, the Flameblade II"
    },
    11455: {
        name: "Skeleton King", stats: [19714, 19064, 20982, 6097, 18143],
        skills: [605, 606],
        autoAttack: 10041,
        img: "img3$1/__cb20141016101616/$2/b/b5/Skeleton_King_II_Figure.png",
        fullName: "Skeleton King II"
    },
    11074: {
        name: "Skoll", stats: [15002, 13160, 15153, 9000, 16302],
        skills: [301, 367],
        img: "img3$1/__cb20140206150854/$2/e/e8/Skoll%2C_Dark_Wolf_II_Figure.png",
        fullName: "Skoll, Dark Wolf II"
    },
    11038: {
        name: "Skrimsl", stats: [13049, 11417, 12466, 17182, 13379],
        skills: [303],
        img: "img2$1/__cb20131129153025/$2/7/78/Skrimsl_the_Freezing_II_Figure.png",
        fullName: "Skrimsl the Freezing II"
    },
    11273: {
        name: "Slagh", stats: [12978, 16561, 11098, 11683, 15631],
        skills: [457],
        img: "img1$1/__cb20140515012351/$2/3/3c/Slagh%2C_Carnage_Incarnate_II_Figure.png",
        fullName: "Slagh, Carnage Incarnate II"
    },
    10450: {
        name: "Snow Queen", stats: [14070, 13994, 13940, 15229, 14449],
        skills: [128],
        img: "img3$1/__cb20130107205830/$2/9/99/Snow_Queen_II_Figure.png",
        fullName: "Snow Queen II"
    },
    10614: {
        name: "Solsten", stats: [13940, 14449, 15998, 17233, 12900],
        skills: [165],
        img: "img3$1/__cb20130408195704/$2/7/7a/Solsten_the_Really_Wanted_II_Figure.png",
        fullName: "Solsten the Really Wanted II"
    },
    10941: {
        name: "Soura", stats: [12012, 12261, 7917, 16930, 17667],
        skills: [287, 291],
        img: "img4$1/__cb20131207210036/$2/f/f1/Soura%2C_Inferno_Shaman_II_Figure.png",
        fullName: "Soura, Inferno Shaman II"
    },
    10568: {
        name: "Spellforged Cyclops", stats: [17047, 11683, 14096, 11111, 10380],
        skills: [61],
        img: "img2$1/__cb20130220143923/$2/c/c7/Spellforged_Cyclops_II_Figure.png",
        fullName: "Spellforged Cyclops II"
    },
    10850: {
        name: "Stalo", stats: [16269, 16280, 16681, 12792, 13496],
        skills: [241],
        img: "img2$1/__cb20130917111955/$2/9/96/Stalo%2C_Glacial_Giant_II_Figure.png",
        fullName: "Stalo, Glacial Giant II"
    },
    414: {
        name: "Steamwork", stats: [14360, 10800, 10600, 12240, 10560],
        skills: [11],
        img: "img3$1/__cb20130125002036/$2/d/de/Steamwork_Dragon_Figure.png",
        fullName: "Steamwork Dragon"
    },
    10955: {
        name: "Sugaar", stats: [13110, 7481, 14293, 16950, 16097],
        skills: [465],
        autoAttack: 10007,
        img: "img1$1/__cb20140520140320/$2/9/9b/Sugaar%2C_the_Thunderstorm_II_Figure.png",
        fullName: "Sugaar, the Thunderstorm II"
    },
    10461: {
        name: "Sulima", stats: [13417, 13583, 12194, 12293, 12269],
        skills: [17],
        img: "img1$1/__cb20130108170214/$2/e/ec/Sulima%2C_Executioner_II_Figure.png",
        fullName: "Sulima, Executioner II"
    },
    11189: {
        name: "Surtr", stats: [15440, 17106, 15085, 7016, 12890],
        skills: [383],
        img: "img1$1/__cb20140301022355/$2/5/5b/Surtr_the_Fervent_II_Figure.png",
        fullName: "Surtr the Fervent II"
    },
    11017: {
        name: "Svadilfari", stats: [15977, 19595, 13442, 15998, 14503],
        skills: [369, 370],
        img: "img1$1/__cb20140214090015/$2/c/ce/Svadilfari_II_Figure.png",
        fullName: "Svadilfari II"
    },
    11000: {
        name: "Tanba", stats: [17580, 23213, 17883, 23289, 18057],
        skills: [236],
        img: "img3$1/__cb20130921071545/$2/a/a8/Tanba%2C_Founder_of_the_Ninja_II_Figure.png",
        fullName: "Tanba, Founder of the Ninja II"
    },
    327: {
        name: "Tangata", stats: [10500, 10800, 10630, 10740, 12480],
        skills: [110],
        img: "img3$1/__cb20130120191546/$2/b/b4/Tangata_Manu_Figure.png",
        fullName: "Tangata Manu"
    },
    11122: {
        name: "Tannin", stats: [13669, 15500, 12683, 19541, 17894],
        skills: [298],
        img: "img2$1/__cb20131125102957/$2/4/4a/Tannin%2C_Sea_Dragon_II_Figure.png",
        fullName: "Tannin, Sea Dragon II"
    },
    695: {
        name: "Tawiscara", stats: [11914, 14513, 14395, 11366, 15630],
        skills: [161],
        img: "img3$1/__cb20130330204311/$2/f/f5/Tawiscara_Figure.png",
        fullName: "Tawiscara"
    },
    10582: {
        name: "Tepaxtl", stats: [10831, 13562, 9209, 13110, 12100],
        skills: [115],
        img: "img3$1/__cb20130308154140/$2/7/7d/Tepaxtl%2C_Fatal_Fang_II_Figure.png",
        fullName: "Tepaxtl, Fatal Fang II"
    },
    11103: {
        name: "Tiamat", stats: [13702, 14698, 16497, 18869, 15738],
        skills: [280],
        img: "img2$1/__cb20131112085546/$2/c/c5/Tiamat%2C_Mother_of_Dragons_II_Figure.png",
        fullName: "Tiamat, Mother of Dragons II"
    },
    1: {
        name: "Black Brute", stats: [14254, 17131, 13848, 11794, 11699],
        skills: [34],
        isWarlord: true,
        img: "img3$1/__cb20130210090020/$2/6/6f/The_Black_Brute_Figure.png",
        fullName: "The Black Brute"
    },
    2: {
        name: "Blue Beard", stats: [12982, 11344, 15588, 15554, 13527],
        skills: [118],
        isWarlord: true,
        img: "img1$1/__cb20130210090031/$2/0/0a/The_Blue_Beard_Figure.png",
        fullName: "The Blue Beard"
    },
    3: {
        name: "Golden Lance", stats: [14462, 13994, 11951, 12227, 16809],
        skills: [10],
        isWarlord: true,
        img: "img3$1/__cb20130210090046/$2/d/d6/The_Golden_Lance_Figure.png",
        fullName: "The Golden Lance"
    },
    4: {
        name: "Green Healer", stats: [13770, 10556, 16359, 15329, 13596],
        skills: [116, 111],
        isWarlord: true,
        img: "img2$1/__cb20130210090056/$2/6/65/The_Green_Healer_Figure.png",
        fullName: "The Green Healer"
    },
    5: {
        name: "Grey Mage", stats: [13415, 13838, 10712, 15865, 16602],
        skills: [40],
        isWarlord: true,
        img: "img2$1/__cb20130210090142/$2/4/48/The_Grey_Mage_Figure.png",
        fullName: "The Grey Mage"
    },
    6: {
        name: "Purple Knife", stats: [13735, 16281, 10712, 15779, 13595],
        skills: [113],
        isWarlord: true,
        img: "img3$1/__cb20130210090107/$2/e/ee/The_Purple_Knife_Figure.png",
        fullName: "The Purple Knife"
    },
    7: {
        name: "Red Samurai", stats: [13432, 14783, 13961, 12869, 14333],
        skills: [46],
        isWarlord: true,
        img: "img4$1/__cb20130210090126/$2/a/ad/The_Red_Samurai_Figure.png",
        fullName: "The Red Samurai"
    },
    8: {
        name: "White Knight", stats: [13916, 14332, 15311, 12851, 13466],
        skills: [46], // todo: change this to 14 later
        isWarlord: true,
        img: "img2$1/__cb20130210090154/$2/2/25/The_White_Knight_Figure.png",
        fullName: "The White Knight"
    },
    10480: {
        name: "Thor", stats: [10343, 13245, 11807, 13842, 11917],
        skills: [114],
        img: "img3$1/__cb20130106214125/$2/a/a1/Thor%2C_God_of_Lightning_II_Figure.png",
        fullName: "Thor, God of Lightning II"
    },
    21264: {
        name: "Thor L", stats: [20007, 22002, 19063, 10334, 16518],
        skills: [437],
        autoAttack: 10011,
        img: "img3$1/__cb20140430140512/$2/2/23/Thor%2C_the_Roaring_Thunder_Figure.png",
        fullName: "Thor, the Roaring Thunder"
    },
    10859: {
        name: "Thunderbird", stats: [15912, 16995, 13572, 15771, 17006],
        skills: [231],
        img: "img2$1/__cb20130901130236/$2/b/be/Thunderbird_II_Figure.png",
        fullName: "Thunderbird II"
    },
    11236: {
        name: "Tomoe", stats: [13889, 16010, 13110, 8285, 16622],
        skills: [406],
        img: "img2$1/__cb20140326090713/$2/b/b5/Tomoe%2C_the_Lightning_Arrow_II_Figure.png",
        fullName: "Tomoe, the Lightning Arrow II"
    },
    11143: {
        name: "TBB", stats: [12001, 9905, 12207, 17000, 16803],
        skills: [366],
        autoAttack: 10007,
        img: "img1$1/__cb20140206151442/$2/1/15/Tormented_Bone_Beast_II_Figure.png",
        fullName: "Tormented Bone Beast II"
    },
    10747: {
        name: "Tristan", stats: [13832, 16193, 15197, 13052, 15771],
        skills: [122],
        img: "img3$1/__cb20130629202258/$2/c/c3/Tristan_the_Sorrowful_II_Figure.png",
        fullName: "Tristan the Sorrowful II"
    },
    10647: {
        name: "Tuniq", stats: [13635, 16709, 12062, 12086, 9794],
        skills: [150],
        img: "img2$1/__cb20130308154138/$2/9/9c/Tuniq%2C_Guardian_Colossus_II_Figure.png",
        fullName: "Tuniq, Guardian Colossus II"
    },
    10454: {
        name: "Stormwyrm", stats: [11025, 11514, 9646, 14489, 11318],
        skills: [47],
        img: "img3$1/__cb20130301083740/$2/e/ee/Two-Headed_Stormwyrm_II_Figure.png",
        fullName: "Two-Headed Stormwyrm II"
    },
    10735: {
        name: "Typhon", stats: [14677, 13355, 14341, 17959, 13626],
        skills: [117],
        autoAttack: 10001,
        img: "img2$1/__cb20130531211236/$2/8/83/Typhon_II_Figure.png",
        fullName: "Typhon II"
    },
    10344: {
        name: "Hydarnes", stats: [11928, 12832, 10587, 14182, 11928],
        skills: [114],
        img: "img4$1/__cb20130106225027/$2/f/fd/Undead_General%2C_Hydarnes_II_Figure.png",
        fullName: "Undead General, Hydarnes II"
    },
    10920: {
        name: "Unicorn", stats: [10807, 12600, 8770, 11721, 12001],
        skills: [156],
        img: "img2$1/__cb20131002005418/$2/0/04/Unicorn%2C_Spirit_Eater_II_Figure.png",
        fullName: "Unicorn, Spirit Eater II"
    },
    11124: {
        name: "Ushabti", stats: [12434, 16475, 14655, 10062, 14027],
        skills: [317],
        img: "img2$1/__cb20131221031230/$2/1/1d/Ushabti_II_Figure.png",
        fullName: "Ushabti II"
    },
    11268: {
        name: "Vafthruthnir", stats: [15500, 17732, 13008, 9997, 12228],
        skills: [442],
        img: "img2$1/__cb20140430101913/$2/2/2b/Vafthruthnir%2C_Elder_Giant_II_Figure.png",
        fullName: "Vafthruthnir, Elder Giant II"
    },
    10896: {
        name: "Valin", stats: [15500, 16865, 22953, 12716, 11167],
        skills: [263],
        img: "img3$1/__cb20131010170703/$2/4/4a/Valin_the_Terrible_II_Figure.png",
        fullName: "Valin the Terrible II"
    },
    11008: {
        name: "Karkadann", stats: [17034, 16475, 13510, 7822, 13097],
        skills: [521],
        img: "img4$1/__cb20140722101849/$2/2/22/Venomhorn_Karkadann_II_Figure.png",
        fullName: "Venomhorn Karkadann II"
    },
    11137: {
        name: "Venusia", stats: [14514, 18273, 13333, 10831, 11492],
        skills: [361],
        img: "img4$1/__cb20140131053558/$2/0/03/Venusia%2C_the_Grace_II_Figure.png",
        fullName: "Venusia, the Grace II"
    },
    10807: {
        name: "Vezat", stats: [16648, 18165, 14709, 13431, 17721],
        skills: [214],
        img: "img4$1/__cb20130721141820/$2/2/29/Vezat%2C_Dragonbone_Warrior_II_Figure.png",
        fullName: "Vezat, Dragonbone Warrior II"
    },
    10572: {
        name: "Vivian", stats: [14677, 17851, 15229, 13095, 14677],
        skills: [224],
        img: "img2$1/__cb20130816162357/$2/5/5f/Vivian_Griffinrider_II_Figure.png",
        fullName: "Vivian Griffinrider II"
    },
    11021: {
        name: "Vlad", stats: [16323, 19508, 13680, 14709, 16529],
        skills: [295, 296],
        img: "img3$1/__cb20131122044220/$2/5/56/Vlad_the_Impaler_II_Figure.png",
        fullName: "Vlad the Impaler II"
    },
    10675: {
        name: "Void Yaksha", stats: [15706, 18013, 14471, 14276, 15814],
        skills: [199],
        img: "img2$1/__cb20130607215051/$2/9/97/Void_Yaksha_II_Figure.png",
        fullName: "Void Yaksha II"
    },
    11046: {
        name: "Waheela", stats: [17006, 13008, 16204, 16692, 18100],
        skills: [19, 134],
        img: "img2$1/__cb20131210234034/$2/d/dc/Waheela%2C_Dire_Wolf_II_Figure.png",
        fullName: "Waheela, Dire Wolf II"
    },
    11396: {
        name: "Wicker Man", stats: [16605, 6833, 11654, 16670, 16930],
        skills: [581, 582],
        autoAttack: 10036,
        img: "img2$1/__cb20140926194802/$2/d/d2/Wicker_Man_II_Figure.png",
        fullName: "Wicker Man II"
    },
    10570: {
        name: "Wolfert", stats: [14189, 23972, 13723, 13290, 13431],
        skills: [118],
        img: "img3$1/__cb20130313194006/$2/9/91/Wolfert%2C_Grave_Keeper_II_Figure.png",
        fullName: "Wolfert, Grave Keeper II"
    },
    10798: {
        name: "Wu Chang", stats: [10294, 14182, 10977, 10600, 11928],
        skills: [115],
        img: "img3$1/__cb20130709182653/$2/6/65/Wu_Chang_the_Infernal_II_Figure.png",
        fullName: "Wu Chang the Infernal II"
    },
    11018: {
        name: "Warden", stats: [19400, 17504, 18273, 11026, 11795],
        skills: [532],
        img: "img3$1/__cb20140815163230/$2/3/3d/Wyrm_Warden%2C_Everwakeful_II_Figure.png",
        fullName: "Wyrm Warden, Everwakeful II"
    },
    11218: {
        name: "Xaphan", stats: [13013, 9415, 12573, 17000, 15537],
        skills: [412],
        img: "img4$1/__cb20140402124522/$2/7/7f/Xaphan%2C_the_Foul_Flame_II_Figure.png",
        fullName: "Xaphan, the Foul Flame II"
    },
    11315: {
        name: "Xuan Wu", stats: [18013, 18609, 17038, 13821, 13507],
        skills: [499, 500],
        autoAttack: 10020,
        img: "img3$1/__cb20140628103006/$2/2/25/Xuan_Wu_II_Figure.png",
        fullName: "Xuan Wu II"
    },
    10995: {
        name: "Ymir", stats: [22650, 24600, 16464, 20592, 15933],
        skills: [227],
        img: "img1$1/__cb20130824171957/$2/6/67/Ymir%2C_Primordial_Giant_II_Figure.png",
        fullName: "Ymir, Primordial Giant II"
    },
    10486: {
        name: "Yulia", stats: [14081, 14664, 12052, 13544, 12524],
        skills: [134],
        img: "img3$1/__cb20130110210701/$2/4/41/Yulia%2C_Snakesage_II_Figure.png",
        fullName: "Yulia, Snakesage II"
    },
    10497: {
        name: "Zagan", stats: [16128, 16941, 14709, 12423, 13052],
        skills: [143],
        img: "img1$1/__cb20130201171143/$2/9/92/Zagan_II_Figure.png",
        fullName: "Zagan II"
    },
    11077: {
        name: "Zahhak", stats: [16789, 10051, 19151, 17797, 17168],
        skills: [339],
        autoAttack: 10001,
        img: "img1$1/__cb20140110075312/$2/9/94/Zahhak%2C_Dragon_Marshal_II_Figure.png",
        fullName: "Zahhak, Dragon Marshal II"
    },
    10869: {
        name: "Zanga", stats: [10218, 10787, 9694, 9512, 12780],
        skills: [161],
        img: "img1$1/__cb20130630141907/$2/c/cf/Zanga%2C_the_Iron_Storm_II_Figure.png",
        fullName: "Zanga, the Iron Storm II"
    },
    10992: {
        name: "Zeruel", stats: [16995, 19573, 13886, 13507, 16984],
        skills: [351, 352],
        img: "img4$1/__cb20140122120951/$2/a/a7/Zeruel%2C_Angel_of_War_II_Figure.png",
        fullName: "Zeruel, Angel of War II"
    },
    10474: {
        name: "Zuniga", stats: [12987, 15132, 14276, 14839, 14709],
        skills: [132],
        img: "img3$1/__cb20130108170215/$2/2/22/Zuniga%2C_Guard_Captain_II_Figure.png",
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
