/**
 * Some notes:
 * - Use the POPE stats
 * - The "name" attribute is a short name for the fam. If multiple fams have the same short name,
 *   append the rarity at the end (e.g. "Thor" and "Thor L")
 * - The order of the skills doesn't matter
 * - For the image, use the 60px thumbnail version
 */
var famDatabase = {
    100001: {
        name: "Adranus", hp: 20223, atk: 23517, def: 19855, wis: 18609, agi: 18046,
        skills: [99000],
        imageLink: "http://img2.wikia.nocookie.net/__cb20140122120804/bloodbrothersgame/images/thumb/7/75/Adranus%2C_Lava_Beast_II_Figure.png/60px-Adranus%2C_Lava_Beast_II_Figure.png",
        fullName: "Adranus, Lava Beast II"
    },
    100002: {
        name: "Ahab", hp: 10273, atk: 12001, def: 11342, wis: 9978, agi: 12342,
        skills: [195],
        imageLink: "http://img2.wikia.nocookie.net/__cb20131129143807/bloodbrothersgame/images/thumb/e/ec/Ahab%2C_the_Colossal_Anchor_II_Figure.png/40px-Ahab%2C_the_Colossal_Anchor_II_Figure.png",
        fullName: "Ahab, the Colossal Anchor II"
    },
    100003: {
        name: "Alcina", hp: 12684, atk: 14169, def: 11356, wis: 13682, agi: 15755,
        skills: [269],
        imageLink: "http://img3.wikia.nocookie.net/__cb20131023124730/bloodbrothersgame/images/thumb/1/1b/Alcina_the_Soulsucker_II_Figure.png/40px-Alcina_the_Soulsucker_II_Figure.png",
        fullName: "Alcina the Soulsucker II"
    },
    100004: {
        name: "Alluring Merrow", hp: 16811, atk: 14709, def: 13723, wis: 17537, agi: 17320,
        skills: [217],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130725105247/bloodbrothersgame/images/thumb/6/6d/Alluring_Merrow_II_Figure.png/60px-Alluring_Merrow_II_Figure.png",
        fullName: "Alluring Merrow II"
    },
    100005: {
        name: "Alp", hp: 11917, atk: 14120, def: 10928, wis: 17168, agi: 13366,
        skills: [277],
        imageLink: "http://img2.wikia.nocookie.net/__cb20131101130545/bloodbrothersgame/images/thumb/0/0d/Alp%2C_Dynast_of_Darkness_II_Figure.png/40px-Alp%2C_Dynast_of_Darkness_II_Figure.png",
        fullName: "Alp, Dynast of Darkness II"
    },
    100006: {
        name: "Amazon Warfist", hp: 10904, atk: 11417, def: 10466, wis: 10660, agi: 11830,
        skills: [156],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130414034805/bloodbrothersgame/images/thumb/1/1a/Amazon_Warfist_II_Figure.png/40px-Amazon_Warfist_II_Figure.png",
        fullName: "Amazon Warfist II"
    },
    100007: {
        name: "Ammit", hp: 18306, atk: 23495, def: 18501, wis: 18490, agi: 18057,
        skills: [325],
        imageLink: "http://img2.wikia.nocookie.net/__cb20131221031343/bloodbrothersgame/images/thumb/f/f9/Ammit%2C_Soul_Destroyer_II_Figure.png/60px-Ammit%2C_Soul_Destroyer_II_Figure.png",
        fullName: "Ammit, Soul Destroyer II"
    },
    100008: {
        name: "Ancient Beetle", hp: 14005, atk: 15901, def: 11903, wis: 11838, agi: 14904,
        skills: [365],
        imageLink: "http://img1.wikia.nocookie.net/__cb20140207105441/bloodbrothersgame/images/thumb/e/e0/Ancient_Beetle_Soldier_II_Figure.png/40px-Ancient_Beetle_Soldier_II_Figure.png",
        fullName: "Ancient Beetle Soldier II"
    },
    100009: {
        name: "Andorra", hp: 12538, atk: 13621, def: 13510, wis: 12134, agi: 12342,
        skills: [142],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130325180458/bloodbrothersgame/images/thumb/5/52/Andorra_the_Indomitable_II_Figure.png/40px-Andorra_the_Indomitable_II_Figure.png",
        fullName: "Andorra the Indomitable II"
    },
    100010: {
        name: "Anneberg", hp: 19097, atk: 18241, def: 17038, wis: 8794, agi: 16518,
        skills: [489, 490],
        imageLink: "http://img1.wikia.nocookie.net/__cb20140614112314/bloodbrothersgame/images/thumb/e/e1/Anneberg%2C_Steel_Steed_II_Figure.png/60px-Anneberg%2C_Steel_Steed_II_Figure.png",
        fullName: "Anneberg, Steel Steed II"
    },
    100011: {
        name: "Apocalyptic Beast", hp: 14189, atk: 15977, def: 15413, wis: 13420, agi: 14969,
        skills: [123],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130227203821/bloodbrothersgame/images/thumb/5/5a/Apocalyptic_Beast_II_Figure.png/60px-Apocalyptic_Beast_II_Figure.png",
        fullName: "Apocalyptic Beast II"
    },
    100012: {
        name: "Arcanan Chariot", hp: 17342, atk: 19346, def: 16453, wis: 10376, agi: 17472,
        skills: [464],
        imageLink: "http://img3.wikia.nocookie.net/__cb20140520122105/bloodbrothersgame/images/thumb/d/da/Arcanan_Chariot_II_Figure.png/40px-Arcanan_Chariot_II_Figure.png",
        fullName: "Arcanan Chariot II"
    },
    100013: {
        name: "Archduke Ose", hp: 16995, atk: 14395, def: 15023, wis: 14850, agi: 11990,
        skills: [154],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130314191037/bloodbrothersgame/images/thumb/0/00/Archduke_Ose_II_Figure.png/60px-Archduke_Ose_II_Figure.png",
        fullName: "Archduke Ose II"
    },
    100014: {
        name: "Artemisia", hp: 10042, atk: 10977, def: 10977, wis: 10042, agi: 12589,
        skills: [18],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130222034947/bloodbrothersgame/images/thumb/a/aa/Artemisia_Swiftfoot_II_Figure.png/40px-Artemisia_Swiftfoot_II_Figure.png",
        fullName: "Artemisia Swiftfoot II"
    },
    100015: {
        name: "Badalisc", hp: 14092, atk: 16107, def: 11882, wis: 11297, agi: 15218,
        skills: [315],
        imageLink: "http://img2.wikia.nocookie.net/__cb20131212173203/bloodbrothersgame/images/thumb/6/6c/Badalisc%2C_the_Gourmet_II_Figure.png/40px-Badalisc%2C_the_Gourmet_II_Figure.png",
        fullName: "Badalisc, the Gourmet II"
    },
    100016: {
        name: "Balgo", hp: 18585, atk: 16037, def: 13962, wis: 5799, agi: 13510,
        skills: [349],
        imageLink: "http://img2.wikia.nocookie.net/__cb20140122120902/bloodbrothersgame/images/thumb/f/fd/Balgo%2C_the_Cursed_Flame_II_Figure.png/60px-Balgo%2C_the_Cursed_Flame_II_Figure.png",
        fullName: "Balgo, the Cursed Flame II"
    },
    100017: {
        name: "Batraz", hp: 14471, atk: 15511, def: 13442, wis: 12293, agi: 12174,
        skills: [142],
        imageLink: "http://img4.wikia.nocookie.net/__cb20130227154434/bloodbrothersgame/images/thumb/e/e3/Batraz%2C_the_Immortal_Hero_II_Figure.png/40px-Batraz%2C_the_Immortal_Hero_II_Figure.png",
        fullName: "Batraz, the Immortal Hero II"
    },
    100018: {
        name: "Scarecrow", hp: 10625, atk: 13756, def: 10490, wis: 11201, agi: 9342,
        skills: [256],
        imageLink: "http://img3.wikia.nocookie.net/__cb20131002022744/bloodbrothersgame/images/thumb/4/4d/Beheading_Scarecrow_II_Figure.png/40px-Beheading_Scarecrow_II_Figure.png",
        fullName: "Beheading Scarecrow II"
    },
    100019: {
        name: "Boudica", hp: 9967, atk: 11914, def: 8918, wis: 13110, agi: 12014,
        skills: [276],
        imageLink: "http://img2.wikia.nocookie.net/__cb20131101130430/bloodbrothersgame/images/thumb/a/ab/Boudica%2C_the_Dawn_Chief_II_Figure.png/40px-Boudica%2C_the_Dawn_Chief_II_Figure.png",
        fullName: "Boudica, the Dawn Chief II"
    },
    100020: {
        name: "Bronzeclad Hyena", hp: 14644, atk: 10766, def: 11860, wis: 18923, agi: 12228,
        skills: [321],
        autoAttack: 10008,
        imageLink: "http://img2.wikia.nocookie.net/__cb20131227221825/bloodbrothersgame/images/thumb/f/fc/Bronzeclad_Hyena_II_Figure.png/40px-Bronzeclad_Hyena_II_Figure.png",
        fullName: "Bronzeclad Hyena II"
    },
    100021: {
        name: "Brownies", hp: 9821, atk: 11283, def: 9515, wis: 13196, agi: 11414,
        skills: [307],
        imageLink: "http://img1.wikia.nocookie.net/__cb20131202082920/bloodbrothersgame/images/thumb/9/90/Brownies%2C_the_Uproarious_II_Figure.png/40px-Brownies%2C_the_Uproarious_II_Figure.png",
        fullName: "Brownies, the Uproarious II"
    },
    100022: {
        name: "Bunga", hp: 12269, atk: 11049, def: 14182, wis: 9612, agi: 10343,
        skills: [125],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130107205042/bloodbrothersgame/images/thumb/5/5d/Bunga%2C_the_Stalwart_II_Figure.png/60px-Bunga%2C_the_Stalwart_II_Figure.png",
        fullName: "Bunga, the Stalwart II"
    },
    100023: {
        name: "Canhel", hp: 15608, atk: 19606, def: 17992, wis: 11329, agi: 16399,
        skills: [293],
        imageLink: "http://img2.wikia.nocookie.net/__cb20131122150727/bloodbrothersgame/images/thumb/5/54/Canhel%2C_Guardian_Dragon_II_Figure.png/60px-Canhel%2C_Guardian_Dragon_II_Figure.png",
        fullName: "Canhel, Guardian Dragon II"
    },
    100024: {
        name: "Cat Sith", hp: 13293, atk: 13196, def: 10611, wis: 16144, agi: 14489,
        skills: [2],
        imageLink: "http://img2.wikia.nocookie.net/__cb20131215131933/bloodbrothersgame/images/thumb/b/b2/Cat_Sith_Chillweaver_II_Figure.png/60px-Cat_Sith_Chillweaver_II_Figure.png",
        fullName: "Cat Sith Chillweaver II"
    },
    100025: {
        name: "Magma Giant", hp: 12832, atk: 12380, def: 13097, wis: 11477, agi: 11928,
        skills: [123],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130202212620/bloodbrothersgame/images/thumb/6/63/Chaotic_Magma_Giant_II_Figure.png/40px-Chaotic_Magma_Giant_II_Figure.png",
        fullName: "Chaotic Magma Giant II"
    },
    100026: {
        name: "Chiyome", hp: 12635, atk: 14148, def: 11369, wis: 15817, agi: 13510,
        skills: [238],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130921071449/bloodbrothersgame/images/thumb/8/83/Chiyome%2C_the_Kamaitachi_II_Figure.png/40px-Chiyome%2C_the_Kamaitachi_II_Figure.png",
        fullName: "Chiyome, the Kamaitachi II"
    },
    100027: {
        name: "Cuelebre", hp: 13702, atk: 16096, def: 12954, wis: 11134, agi: 13572,
        skills: [249],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130916113928/bloodbrothersgame/images/thumb/8/8c/Cuelebre_the_Ironscaled_II_Figure.png/40px-Cuelebre_the_Ironscaled_II_Figure.png",
        fullName: "Cuelebre the Ironscaled II"
    },
    100028: {
        name: "Dagr", hp: 12012, atk: 14059, def: 10712, wis: 17818, agi: 13810,
        skills: [275],
        imageLink: "http://img4.wikia.nocookie.net/__cb20131030132715/bloodbrothersgame/images/thumb/d/d2/Dagr_Sunrider_II_Figure.png/40px-Dagr_Sunrider_II_Figure.png",
        fullName: "Dagr Sunrider II"
    },
    100029: {
        name: "Deborah", hp: 13550, atk: 14157, def: 13442, wis: 12987, agi: 13929,
        skills: [222],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130815132429/bloodbrothersgame/images/thumb/7/73/Deborah%2C_Knight_Immaculate_II_Figure.png/40px-Deborah%2C_Knight_Immaculate_II_Figure.png",
        fullName: "Deborah, Knight Immaculate II"
    },
    100030: {
        name: "Delphyne", hp: 11990, atk: 14601, def: 11882, wis: 18858, agi: 11080,
        skills: [288],
        imageLink: "http://img4.wikia.nocookie.net/__cb20131101130817/bloodbrothersgame/images/thumb/1/15/Delphyne%2C_Thunder_Dragon_II_Figure.png/40px-Delphyne%2C_Thunder_Dragon_II_Figure.png",
        fullName: "Delphyne, Thunder Dragon II"
    },
    100031: {
        name: "Desna", hp: 13146, atk: 15089, def: 14287, wis: 12137, agi: 12378,
        skills: [124],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130106235645/bloodbrothersgame/images/thumb/4/45/Desna%2C_Mythic_Wendigo_II_Figure.png/60px-Desna%2C_Mythic_Wendigo_II_Figure.png",
        fullName: "Desna, Mythic Wendigo II"
    },
    100032: {
        name: "Djinn", hp: 14048, atk: 17363, def: 13333, wis: 19422, agi: 16605,
        skills: [319, 320],
        imageLink: "http://img1.wikia.nocookie.net/__cb20131227221855/bloodbrothersgame/images/thumb/8/8d/Djinn_of_the_Lamp_II_Figure.png/60px-Djinn_of_the_Lamp_II_Figure.png",
        fullName: "Djinn of the Lamp II"
    },
    100033: {
        name: "Doppeladler", hp: 13940, atk: 14709, def: 14417, wis: 14092, agi: 14850,
        skills: [33],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130107210324/bloodbrothersgame/images/thumb/6/68/Doppeladler_II_Figure.png/60px-Doppeladler_II_Figure.png",
        fullName: "Doppeladler II"
    },
    100034: {
        name: "Cat Sidhe", hp: 9614, atk: 8322, def: 11959, wis: 11243, agi: 10056,
        skills: [18],
        imageLink: "http://img4.wikia.nocookie.net/__cb20130228073440/bloodbrothersgame/images/thumb/4/48/Earl_Cat_Sidhe_II_Figure.png/40px-Earl_Cat_Sidhe_II_Figure.png",
        fullName: "Earl Cat Sidhe II"
    },
    100035: {
        name: "Edgardo", hp: 10904, atk: 15485, def: 14389, wis: 8978, agi: 14755,
        skills: [179],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130430110741/bloodbrothersgame/images/thumb/5/5f/Edgardo%2C_Grand_Inquisitor_II_Figure.png/40px-Edgardo%2C_Grand_Inquisitor_II_Figure.png",
        fullName: "Edgardo, Grand Inquisitor II"
    },
    100036: {
        name: "Empusa", hp: 20706, atk: 12623, def: 16110, wis: 20999, agi: 17510,
        skills: [447],
        autoAttack: 10016,
        imageLink: "http://img3.wikia.nocookie.net/__cb20140508115333/bloodbrothersgame/images/thumb/0/0a/Empusa%2C_the_Death_Scythe_Figure.png/60px-Empusa%2C_the_Death_Scythe_Figure.png",
        fullName: "Empusa, the Death Scythe"
    },
    100037: {
        name: "Fenrir", hp: 15099, atk: 16865, def: 22498, wis: 13008, agi: 11167,
        skills: [154],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130420124059/bloodbrothersgame/images/thumb/d/dd/Fenrir_II_Figure.png/60px-Fenrir_II_Figure.png",
        fullName: "Fenrir II"
    },
    100038: {
        name: "Flame Dragon", hp: 14601, atk: 14449, def: 13756, wis: 15153, agi: 13940,
        skills: [23],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130107210805/bloodbrothersgame/images/thumb/8/8e/Flame_Dragon_II_Figure.png/60px-Flame_Dragon_II_Figure.png",
        fullName: "Flame Dragon II"
    },
    100039: {
        name: "Flesh Collector Golem", hp: 17450, atk: 14536, def: 18089, wis: 8664, agi: 9661,
        skills: [253],
        imageLink: "http://img2.wikia.nocookie.net/__cb20131002005230/bloodbrothersgame/images/thumb/5/52/Flesh_Collector_Golem_II_Figure.png/40px-Flesh_Collector_Golem_II_Figure.png",
        fullName: "Flesh Collector Golem II"
    },
    100040: {
        name: "Freyr", hp: 16562, atk: 19909, def: 15370, wis: 12943, agi: 15998,
        skills: [385, 386],
        imageLink: "http://img1.wikia.nocookie.net/__cb20140301012048/bloodbrothersgame/images/thumb/5/51/Freyr%2C_God_of_the_Harvest_II_Figure.png/60px-Freyr%2C_God_of_the_Harvest_II_Figure.png",
        fullName: "Freyr, God of the Harvest II"
    },
    100041: {
        name: "Fomor", hp: 13052, atk: 14465, def: 11928, wis: 9967, agi: 9781,
        skills: [138],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130208175749/bloodbrothersgame/images/thumb/4/43/Fomor_the_Savage_II_Figure.png/40px-Fomor_the_Savage_II_Figure.png",
        fullName: "Fomor the Savage II"
    },
    100042: {
        name: "Gan Ceann", hp: 7950, atk: 10530, def: 8830, wis: 8910, agi: 8540,
        skills: [33],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130224083941/bloodbrothersgame/images/thumb/c/ca/Gan_Ceann_Figure.png/60px-Gan_Ceann_Figure.png",
        fullName: "Gan Ceann"
    },
    100043: {
        name: "Gathgoic", hp: 14839, atk: 16128, def: 14980, wis: 17948, agi: 14709,
        skills: [141],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130122044308/bloodbrothersgame/images/thumb/f/fb/Gathgoic_the_Other_II_Figure.png/60px-Gathgoic_the_Other_II_Figure.png",
        fullName: "Gathgoic the Other II"
    },
    100044: {
        name: "Ghislandi", hp: 12324, atk: 13551, def: 13525, wis: 12212, agi: 12187,
        skills: [17],
        imageLink: "http://img4.wikia.nocookie.net/__cb20130106212217/bloodbrothersgame/images/thumb/6/68/Ghislandi%2C_Iron_Heart_II_Figure.png/60px-Ghislandi%2C_Iron_Heart_II_Figure.png",
        fullName: "Ghislandi, Iron Heart II"
    },
    100045: {
        name: "Goblin King", hp: 8144, atk: 8339, def: 6400, wis: 10159, agi: 10278,
        skills: [18],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130228171344/bloodbrothersgame/images/thumb/4/4f/Goblin_King_II_Figure.png/60px-Goblin_King_II_Figure.png",
        fullName: "Goblin King II"
    },
    100046: {
        name: "Gorgon", hp: 10170, atk: 12436, def: 8652, wis: 12773, agi: 10924,
        skills: [18],
        imageLink: "http://img4.wikia.nocookie.net/__cb20130227140440/bloodbrothersgame/images/thumb/6/6f/Gorgon_II_Figure.png/40px-Gorgon_II_Figure.png",
        fullName: "Gorgon II"
    },
    100047: {
        name: "Gorlin", hp: 11928, atk: 12380, def: 17000, wis: 6809, agi: 10904,
        skills: [167],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130408193159/bloodbrothersgame/images/thumb/5/50/Gorlin_Gold_Helm_II_Figure.png/60px-Gorlin_Gold_Helm_II_Figure.png",
        fullName: "Gorlin Gold Helm II"
    },
    100048: {
        name: "Gregoire", hp: 11708, atk: 12121, def: 10318, wis: 14854, agi: 10159,
        skills: [144],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130208175748/bloodbrothersgame/images/thumb/0/08/Gregoire%2C_Weaponmaster_II_Figure.png/40px-Gregoire%2C_Weaponmaster_II_Figure.png",
        fullName: "Gregoire, Weaponmaster II"
    },
    100049: {
        name: "Grellas", hp: 12066, atk: 14769, def: 10636, wis: 17374, agi: 13073,
        skills: [212],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130714135315/bloodbrothersgame/images/thumb/1/11/Grellas_Fellstaff_II_Figure.png/40px-Grellas_Fellstaff_II_Figure.png",
        fullName: "Grellas Fellstaff II"
    },
    100050: {
        name: "Gretch", hp: 16280, atk: 15305, def: 12683, wis: 15652, agi: 13875,
        skills: [196],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130609110933/bloodbrothersgame/images/thumb/a/a9/Gretch%2C_Chimaera_Mistress_II_Figure.png/40px-Gretch%2C_Chimaera_Mistress_II_Figure.png",
        fullName: "Gretch, Chimaera Mistress II"
    },
    100051: {
        name: "Griffin", hp: 11887, atk: 9909, def: 14391, wis: 14263, agi: 11960,
        skills: [2],
        imageLink: "http://img4.wikia.nocookie.net/__cb20130222030204/bloodbrothersgame/images/thumb/5/57/Griffin_Mount_II_Figure.png/60px-Griffin_Mount_II_Figure.png",
        fullName: "Griffin Mount II"
    },
    100052: {
        name: "Guillaume", hp: 21515, atk: 20887, def: 16308, wis: 12948, agi: 18505,
        skills: [466, 467],
        imageLink: "http://img1.wikia.nocookie.net/__cb20140520122326/bloodbrothersgame/images/thumb/2/22/Guillaume%2C_Fanatic_Figure.png/60px-Guillaume%2C_Fanatic_Figure.png",
        fullName: "Guillaume, Fanatic"
    },
    100053: {
        name: "Haokah", hp: 13476, atk: 13928, def: 11111, wis: 15706, agi: 13245,
        skills: [232],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130901131933/bloodbrothersgame/images/thumb/9/98/Haokah%2C_the_Lightning_Brave_II_Figure.png/40px-Haokah%2C_the_Lightning_Brave_II_Figure.png",
        fullName: "Haokah, the Lightning Brave II"
    },
    100054: {
        name: "Hecatoncheir", hp: 11807, atk: 13902, def: 14768, wis: 13928, agi: 13366,
        skills: [264],
        imageLink: "http://img4.wikia.nocookie.net/__cb20131010170211/bloodbrothersgame/images/thumb/8/88/Hecatoncheir_the_Adamantine_II_Figure.png/40px-Hecatoncheir_the_Adamantine_II_Figure.png",
        fullName: "Hecatoncheir the Adamantine II"
    },
    100055: {
        name: "Heinrich", hp: 16887, atk: 13940, def: 15132, wis: 13290, agi: 14005,
        skills: [133],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130124152435/bloodbrothersgame/images/thumb/0/05/Heinrich_the_Bold_II_Figure.png/60px-Heinrich_the_Bold_II_Figure.png",
        fullName: "Heinrich the Bold II"
    },
    100056: {
        name: "Hel", hp: 14709, atk: 17450, def: 14709, wis: 15771, agi: 18057,
        skills: [239, 240],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130921074034/bloodbrothersgame/images/thumb/e/e8/Hel%2C_Goddess_of_Death_II_Figure.png/60px-Hel%2C_Goddess_of_Death_II_Figure.png",
        fullName: "Hel, Goddess of Death II"
    },
    100057: {
        name: "Hippocamp", hp: 14514, atk: 16486, def: 14926, wis: 19855, agi: 15002,
        skills: [360, 167],
        imageLink: "http://img4.wikia.nocookie.net/__cb20140129062341/bloodbrothersgame/images/thumb/f/f8/Hippocamp_II_Figure.png/60px-Hippocamp_II_Figure.png",
        fullName: "Hippocamp II"
    },
    100058: {
        name: "Hollofernyiges", hp: 16551, atk: 16757, def: 13875, wis: 14568, agi: 16941,
        skills: [33],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130321232308/bloodbrothersgame/images/thumb/2/20/Hollofernyiges_II_Figure.png/60px-Hollofernyiges_II_Figure.png",
        fullName: "Hollofernyiges II"
    },
    100059: {
        name: "Hoska", hp: 18996, atk: 7906, def: 15096, wis: 17023, agi: 8881,
        skills: [484, 485],
        autoAttack: 10007,
        imageLink: "http://img2.wikia.nocookie.net/__cb20140613080813/bloodbrothersgame/images/thumb/6/6c/Hoska%2C_the_Firestroke_II_Figure.png/60px-Hoska%2C_the_Firestroke_II_Figure.png",
        fullName: "Hoska, the Firestroke II"
    },
    100060: {
        name: "Hraesvelg", hp: 12499, atk: 17472, def: 11784, wis: 12662, agi: 13799,
        skills: [251],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130927185735/bloodbrothersgame/images/thumb/c/cd/Hraesvelg%2C_Corpse_Feaster_II_Figure.png/40px-Hraesvelg%2C_Corpse_Feaster_II_Figure.png",
        fullName: "Hraesvelg, Corpse Feaster II"
    },
    100061: {
        name: "Peryton", hp: 10904, atk: 9674, def: 10490, wis: 10490, agi: 12952,
        skills: [33],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130106234752/bloodbrothersgame/images/thumb/2/2b/Infested_Peryton_II_Figure.png/40px-Infested_Peryton_II_Figure.png",
        fullName: "Infested Peryton II"
    },
    100062: {
        name: "Ira", hp: 12832, atk: 14489, def: 8770, wis: 11172, agi: 17254,
        skills: [138],
        imageLink: "http://img4.wikia.nocookie.net/__cb20130227203822/bloodbrothersgame/images/thumb/6/6c/Ira%2C_Hypnotic_Specter_II_Figure.png/40px-Ira%2C_Hypnotic_Specter_II_Figure.png",
        fullName: "Ira, Hypnotic Specter II"
    },
    100063: {
        name: "Iseult", hp: 12731, atk: 10977, def: 11708, wis: 15865, agi: 14193,
        skills: [144],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130629202258/bloodbrothersgame/images/thumb/f/f2/Iseult%2C_the_Redeemer_II_Figure.png/40px-Iseult%2C_the_Redeemer_II_Figure.png",
        fullName: "Iseult, the Redeemer II"
    },
    100064: {
        name: "Jabberwock", hp: 13994, atk: 16193, def: 13008, wis: 19508, agi: 18024,
        skills: [270, 271],
        imageLink: "http://img4.wikia.nocookie.net/__cb20131023124841/bloodbrothersgame/images/thumb/1/1f/Jabberwock%2C_Phantom_Dragon_II_Figure.png/40px-Jabberwock%2C_Phantom_Dragon_II_Figure.png",
        fullName: "Jabberwock, Phantom Dragon II"
    },
    100065: {
        name: "Jormungandr", hp: 13024, atk: 16768, def: 11756, wis: 10112, agi: 15889,
        skills: [438],
        autoAttack: 10012,
        imageLink: "http://img3.wikia.nocookie.net/__cb20140430101914/bloodbrothersgame/images/thumb/9/97/Jormungandr%2C_World_Serpent_II_Figure.png/40px-Jormungandr%2C_World_Serpent_II_Figure.png",
        fullName: "Jormungandr, World Serpent II"
    },
    100066: {
        name: "Kalevan", hp: 12629, atk: 18013, def: 11914, wis: 12055, agi: 13821,
        skills: [297, 240],
        imageLink: "http://img3.wikia.nocookie.net/__cb20131122044155/bloodbrothersgame/images/thumb/b/bd/Kalevan%2C_the_Forest_Green_II_Figure.png/40px-Kalevan%2C_the_Forest_Green_II_Figure.png",
        fullName: "Kalevan, the Forest Green II"
    },
    100067: {
        name: "Kangana", hp: 15803, atk: 18750, def: 14872, wis: 12813, agi: 13247,
        skills: [216],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130726121448/bloodbrothersgame/images/thumb/b/b1/Kangana%2C_the_Maelstrom_II_Figure.png/60px-Kangana%2C_the_Maelstrom_II_Figure.png",
        fullName: "Kangana, the Maelstrom II"
    },
    100068: {
        name: "Katiria", hp: 10807, atk: 11318, def: 11356, wis: 10245, agi: 11623,
        skills: [156],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130714135314/bloodbrothersgame/images/thumb/b/b6/Katiria_Nullblade_II_Figure.png/60px-Katiria_Nullblade_II_Figure.png",
        fullName: "Katiria Nullblade II"
    },
    100069: {
        name: "Kekro", hp: 17992, atk: 12001, def: 15002, wis: 19660, agi: 16302,
        skills: [379],
        autoAttack: 10007,
        imageLink: "http://img3.wikia.nocookie.net/__cb20140221092259/bloodbrothersgame/images/thumb/3/3b/Kekro%2C_Demiwyrm_Magus_II_Figure.png/60px-Kekro%2C_Demiwyrm_Magus_II_Figure.png",
        fullName: "Kekro, Demiwyrm Magus II"
    },
    100070: {
        name: "Kyteler", hp: 11721, atk: 12524, def: 9892, wis: 17254, agi: 16416,
        skills: [258],
        imageLink: "http://img4.wikia.nocookie.net/__cb20140120233253/bloodbrothersgame/images/thumb/d/d4/Kyteler_the_Corrupted_II_Figure.png/60px-Kyteler_the_Corrupted_II_Figure.png",
        fullName: "Kyteler the Corrupted II"
    },
    100071: {
        name: "Lanvall", hp: 12914, atk: 14639, def: 12245, wis: 12210, agi: 15040,
        skills: [18],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130106224520/bloodbrothersgame/images/thumb/6/63/Lanvall%2C_Lizard_Cavalier_II_Figure.png/40px-Lanvall%2C_Lizard_Cavalier_II_Figure.png",
        fullName: "Lanvall, Lizard Cavalier II"
    },
    100072: {
        name: "Linnorm", hp: 12326, atk: 11102, def: 11979, wis: 16605, agi: 16497,
        skills: [313],
        imageLink: "http://img3.wikia.nocookie.net/__cb20131210233903/bloodbrothersgame/images/thumb/0/0b/Linnorm%2C_the_Hailstorm_II_Figure.png/60px-Linnorm%2C_the_Hailstorm_II_Figure.png",
        fullName: "Linnorm, the Hailstorm II"
    },
    100073: {
        name: "Magdal", hp: 13929, atk: 15110, def: 15132, wis: 13810, agi: 15359,
        skills: [120],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130210215236/bloodbrothersgame/images/thumb/c/c0/Magdal_Dragonheart_II_Figure.png/40px-Magdal_Dragonheart_II_Figure.png",
        fullName: "Magdal Dragonheart II"
    },
    100074: {
        name: "Managarmr", hp: 20007, atk: 21599, def: 17396, wis: 23907, agi: 18100,
        skills: [463],
        autoAttack: 10007,
        imageLink: "http://img4.wikia.nocookie.net/__cb20140521080600/bloodbrothersgame/images/thumb/2/2b/Managarmr%2C_the_Frost_Moon_II_Figure.png/40px-Managarmr%2C_the_Frost_Moon_II_Figure.png",
        fullName: "Managarmr, the Frost Moon II"
    },
    100075: {
        name: "Marraco", hp: 18716, atk: 15876, def: 17254, wis: 7381, agi: 8809,
        skills: [61, 167],
        imageLink: "http://img4.wikia.nocookie.net/__cb20131115131303/bloodbrothersgame/images/thumb/7/7b/Marraco%2C_Crusted_Wyrm_II_Figure.png/60px-Marraco%2C_Crusted_Wyrm_II_Figure.png",
        fullName: "Marraco, Crusted Wyrm II"
    },
    100076: {
        name: "Melanippe", hp: 16139, atk: 16800, def: 13929, wis: 11849, agi: 15132,
        skills: [195],
        imageLink: "http://img4.wikia.nocookie.net/__cb20130708160233/bloodbrothersgame/images/thumb/4/4f/Melanippe%2C_Wolfrider_II_Figure.png/40px-Melanippe%2C_Wolfrider_II_Figure.png",
        fullName: "Melanippe, Wolfrider II"
    },
    100077: {
        name: "Millarca", hp: 15305, atk: 10668, def: 15565, wis: 21393, agi: 18046,
        skills: [407, 408],
        autoAttack: 10007,
        imageLink: "http://img2.wikia.nocookie.net/__cb20140325120640/bloodbrothersgame/images/thumb/f/ff/Millarca%2C_Lady_of_Thorns_II_Figure.png/60px-Millarca%2C_Lady_of_Thorns_II_Figure.png",
        fullName: "Millarca, Lady of Thorns II"
    },
    100078: {
        name: "Moni", hp: 13562, atk: 15537, def: 12121, wis: 10234, agi: 16448,
        skills: [340],
        imageLink: "http://img3.wikia.nocookie.net/__cb20140110075315/bloodbrothersgame/images/thumb/4/43/Moni_the_Dismemberer_II_Figure.png/60px-Moni_the_Dismemberer_II_Figure.png",
        fullName: "Moni the Dismemberer II"
    },
    100079: {
        name: "Mordred", hp: 11000, atk: 12050, def: 10950, wis: 11000, agi: 12500,
        skills: [18],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130125001433/bloodbrothersgame/images/thumb/6/6b/Mordred%2C_Drake_Knight_Figure.png/40px-Mordred%2C_Drake_Knight_Figure.png",
        fullName: "Mordred, Drake Knight"
    },
    100080: {
        name: "Musashi", hp: 20592, atk: 24752, def: 19151, wis: 17981, agi: 18024,
        skills: [404],
        imageLink: "http://img1.wikia.nocookie.net/__cb20140326090459/bloodbrothersgame/images/thumb/1/1f/Musashi%2C_the_Twinblade_II_Figure.png/60px-Musashi%2C_the_Twinblade_II_Figure.png",
        fullName: "Musashi, the Twinblade II"
    },
    100081: {
        name: "Naberius", hp: 9563, atk: 9552, def: 7828, wis: 11208, agi: 11298,
        skills: [18],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130225032050/bloodbrothersgame/images/thumb/e/e9/Naberius_II_Figure.png/40px-Naberius_II_Figure.png",
        fullName: "Naberius II"
    },
    100082: {
        name: "Nehasim", hp: 12707, atk: 16071, def: 11390, wis: 12466, agi: 15172,
        skills: [294],
        imageLink: "http://img2.wikia.nocookie.net/__cb20131122150818/bloodbrothersgame/images/thumb/8/8b/Nehasim_the_Seething_II_Figure.png/40px-Nehasim_the_Seething_II_Figure.png",
        fullName: "Nehasim the Seething II"
    },
    100083: {
        name: "Neith", hp: 18999, atk: 19660, def: 15002, wis: 12001, agi: 15305,
        skills: [326],
        imageLink: "http://img2.wikia.nocookie.net/__cb20131221031333/bloodbrothersgame/images/thumb/3/3b/Neith%2C_Goddess_of_War_II_Figure.png/60px-Neith%2C_Goddess_of_War_II_Figure.png",
        fullName: "Neith, Goddess of War II"
    },
    100084: {
        name: "Nephthys", hp: 21015, atk: 11985, def: 18202, wis: 22005, agi: 16912,
        skills: [471, 472],
        autoAttack: 10007,
        imageLink: "http://img1.wikia.nocookie.net/__cb20140528102649/bloodbrothersgame/images/thumb/1/16/Nephthys%2C_Ruler_of_Death_Figure.png/40px-Nephthys%2C_Ruler_of_Death_Figure.png",
        fullName: "Nephthys, Ruler of Death"
    },
    100085: {
        name: "Nergal", hp: 13008, atk: 15392, def: 11947, wis: 11643, agi: 16518,
        skills: [282],
        imageLink: "http://img1.wikia.nocookie.net/__cb20131108145626/bloodbrothersgame/images/thumb/7/75/Nergal%2C_Abyssal_Overseer_II_Figure.png/40px-Nergal%2C_Abyssal_Overseer_II_Figure.png",
        fullName: "Nergal, Abyssal Overseer II"
    },
    100086: {
        name: "Nightblade", hp: 12196, atk: 16995, def: 13528, wis: 10896, agi: 14915,
        skills: [341],
        imageLink: "http://img1.wikia.nocookie.net/__cb20140110075314/bloodbrothersgame/images/thumb/6/64/Nightblade%2C_Archsage_of_Winds_II_Figure.png/40px-Nightblade%2C_Archsage_of_Winds_II_Figure.png",
        fullName: "Nightblade, Archsage of Winds II"
    },
    100087: {
        name: "Niu Mo Wang", hp: 14276, atk: 17071, def: 15998, wis: 13420, agi: 13138,
        skills: [133],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130709182652/bloodbrothersgame/images/thumb/2/26/Niu_Mo_Wang_II_Figure.png/60px-Niu_Mo_Wang_II_Figure.png",
        fullName: "Niu Mo Wang II"
    },
    100088: {
        name: "Odin Stormgod", hp: 12855, atk: 14346, def: 12378, wis: 14929, agi: 12245,
        skills: [119],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130106211414/bloodbrothersgame/images/thumb/5/5c/Odin_Stormgod_II_Figure.png/40px-Odin_Stormgod_II_Figure.png",
        fullName: "Odin Stormgod II"
    },
    100089: {
        name: "Otilau", hp: 14081, atk: 15760, def: 11676, wis: 11232, agi: 15197,
        skills: [221],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130731090323/bloodbrothersgame/images/thumb/3/33/Olitiau%2C_the_Great_Bat_II_Figure.png/40px-Olitiau%2C_the_Great_Bat_II_Figure.png",
        fullName: "Olitiau, the Great Bat II"
    },
    100090: {
        name: "Capricorn", hp: 14937, atk: 8491, def: 13507, wis: 16551, agi: 15099,
        skills: [476],
        autoAttack: 10007,
        imageLink: "http://img2.wikia.nocookie.net/__cb20140606074954/bloodbrothersgame/images/thumb/f/f4/Paladin_of_Capricorn_II_Figure.png/40px-Paladin_of_Capricorn_II_Figure.png",
        fullName: "Paladin of Capricorn II"
    },
    100091: {
        name: "Pisces", hp: 13041, atk: 8621, def: 14796, wis: 17114, agi: 14991,
        skills: [419],
        autoAttack: 10007,
        imageLink: "http://img1.wikia.nocookie.net/__cb20140411023129/bloodbrothersgame/images/thumb/2/22/Paladin_of_Pisces_II_Figure.png/40px-Paladin_of_Pisces_II_Figure.png",
        fullName: "Paladin of Pisces II"
    },
    100092: {
        name: "Libra", hp: 14178, atk: 16172, def: 14698, wis: 9845, agi: 13669,
        skills: [390],
        imageLink: "http://img4.wikia.nocookie.net/__cb20140313080212/bloodbrothersgame/images/thumb/8/86/Paladin_of_Libra_II_Figure.png/40px-Paladin_of_Libra_II_Figure.png",
        fullName: "Paladin of Libra II"
    },
    100093: {
        name: "Pegasus", hp: 8756, atk: 10200, def: 8843, wis: 10880, agi: 9181,
        skills: [111],
        imageLink: "http://img4.wikia.nocookie.net/__cb20130301003405/bloodbrothersgame/images/thumb/6/69/Pegasus%2C_the_Light_Divine_II_Figure.png/60px-Pegasus%2C_the_Light_Divine_II_Figure.png",
        fullName: "Pegasus, the Light Divine II"
    },
    100094: {
        name: "Phoenix", hp: 14005, atk: 11188, def: 12033, wis: 19010, agi: 12185,
        skills: [305],
        imageLink: "http://img1.wikia.nocookie.net/__cb20131129143510/bloodbrothersgame/images/thumb/2/25/Phoenix%2C_the_Metempsychosis_II_Figure.png/40px-Phoenix%2C_the_Metempsychosis_II_Figure.png",
        fullName: "Phoenix, the Metempsychosis II"
    },
    100095: {
        name: "Princeps", hp: 9360, atk: 10772, def: 9674, wis: 10181, agi: 11667,
        skills: [156],
        imageLink: "http://img4.wikia.nocookie.net/__cb20130314191111/bloodbrothersgame/images/thumb/d/dc/Princeps%2C_Angel_of_Doom_II_Figure.png/60px-Princeps%2C_Angel_of_Doom_II_Figure.png",
        fullName: "Princeps, Angel of Doom II"
    },
    100096: {
        name: "Pontifex", hp: 14590, atk: 16410, def: 13507, wis: 18371, agi: 17797,
        skills: [229, 167],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130823004421/bloodbrothersgame/images/thumb/b/bd/Pontifex_Antiquus_II_Figure.png/60px-Pontifex_Antiquus_II_Figure.png",
        fullName: "Pontifex Antiquus II"
    },
    100097: {
        name: "Premyslid", hp: 13626, atk: 16984, def: 14926, wis: 18772, agi: 11232,
        skills: [244],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130911122726/bloodbrothersgame/images/thumb/c/c7/Premyslid%2C_the_Black_King_II_Figure.png/60px-Premyslid%2C_the_Black_King_II_Figure.png",
        fullName: "Premyslid, the Black King II"
    },
    100098: {
        name: "Queen Waspmen", hp: 14070, atk: 19898, def: 13247, wis: 15998, agi: 17829,
        skills: [99002],
        imageLink: "http://img1.wikia.nocookie.net/__cb20140122120929/bloodbrothersgame/images/thumb/f/f6/Queen_of_the_Waspmen_II_Figure.png/60px-Queen_of_the_Waspmen_II_Figure.png",
        fullName: "Queen of the Waspmen II"
    },
    100099: {
        name: "Ragnar", hp: 13245, atk: 15804, def: 12001, wis: 10294, agi: 16510,
        skills: [314],
        imageLink: "http://img4.wikia.nocookie.net/__cb20131210233938/bloodbrothersgame/images/thumb/9/97/Ragnar%2C_Dragonslayer_II_Figure.png/60px-Ragnar%2C_Dragonslayer_II_Figure.png",
        fullName: "Ragnar, Dragonslayer II"
    },
    100100: {
        name: "Rampant Lion", hp: 16291, atk: 17569, def: 16518, wis: 12564, agi: 18035,
        skills: [380, 381],
        imageLink: "http://img3.wikia.nocookie.net/__cb20140222023232/bloodbrothersgame/images/thumb/8/87/Rampant_Lion_II_Figure.png/60px-Rampant_Lion_II_Figure.png",
        fullName: "Rampant Lion II"
    },
    100101: {
        name: "Rapse", hp: 11928, atk: 14182, def: 13110, wis: 11270, agi: 15524,
        skills: [179],
        imageLink: "http://img4.wikia.nocookie.net/__cb20130721141602/bloodbrothersgame/images/thumb/e/e0/Rapse%2C_the_Bloody_Horns_II_Figure.png/40px-Rapse%2C_the_Bloody_Horns_II_Figure.png",
        fullName: "Rapse, the Bloody Horns II"
    },
    100102: {
        name: "Rasiel", hp: 11936, atk: 15587, def: 11817, wis: 17797, agi: 11004,
        skills: [234],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130901132455/bloodbrothersgame/images/thumb/1/13/Rasiel%2C_Angel_All-Knowing_II_Figure.png/40px-Rasiel%2C_Angel_All-Knowing_II_Figure.png",
        fullName: "Rasiel, Angel All-Knowing II"
    },
    100103: {
        name: "Brass Gorilla", hp: 18996, atk: 9760, def: 18096, wis: 12684, agi: 8319,
        skills: [398],
        imageLink: "http://img2.wikia.nocookie.net/__cb20140318135240/bloodbrothersgame/images/thumb/6/6b/Reinforced_Brass_Gorilla_II_Figure.png/60px-Reinforced_Brass_Gorilla_II_Figure.png",
        fullName: "Reinforced Brass Gorilla II"
    },
    100104: {
        name: "Treant", hp: 18566, atk: 17017, def: 22542, wis: 13626, agi: 8014,
        skills: [154],
        imageLink: "http://img1.wikia.nocookie.net/__cb20131215131956/bloodbrothersgame/images/thumb/6/67/Sagacious_Treant_II_Figure.png/60px-Sagacious_Treant_II_Figure.png",
        fullName: "Sagacious Treant II"
    },
    100105: {
        name: "Saurva", hp: 14958, atk: 15305, def: 11329, wis: 11362, agi: 15002,
        skills: [259],
        imageLink: "http://img1.wikia.nocookie.net/__cb20131015140405/bloodbrothersgame/images/thumb/f/f3/Saurva%2C_the_Lawless_Lord_II_Figure.png/40px-Saurva%2C_the_Lawless_Lord_II_Figure.png",
        fullName: "Saurva, the Lawless Lord II"
    },
    100106: {
        name: "Scathing Hierophant", hp: 19681, atk: 13391, def: 17534, wis: 20112, agi: 16950,
        skills: [418],
        autoAttack: 10007,
        imageLink: "http://img1.wikia.nocookie.net/__cb20140411023129/bloodbrothersgame/images/thumb/b/b1/Scathing_Hierophant_Figure.png/60px-Scathing_Hierophant_Figure.png",
        fullName: "Scathing Hierophant"
    },
    100107: {
        name: "Sea Serpent", hp: 16020, atk: 12012, def: 15121, wis: 19259, agi: 17103,
        skills: [302],
        imageLink: "http://img1.wikia.nocookie.net/__cb20131129152929/bloodbrothersgame/images/thumb/6/65/Sea_Serpent_II_Figure.png/60px-Sea_Serpent_II_Figure.png",
        fullName: "Sea Serpent II"
    },
    100108: {
        name: "Selk", hp: 13902, atk: 15852, def: 11976, wis: 11210, agi: 14927,
        skills: [327],
        imageLink: "http://img4.wikia.nocookie.net/__cb20131221031323/bloodbrothersgame/images/thumb/0/03/Selk%2C_Desert_King_II_Figure.png/40px-Selk%2C_Desert_King_II_Figure.png",
        fullName: "Selk, Desert King II"
    },
    100109: {
        name: "Sigiled Axeman", hp: 14644, atk: 9076, def: 12987, wis: 18338, agi: 13409,
        skills: [416],
        autoAttack: 10007,
        imageLink: "http://img3.wikia.nocookie.net/__cb20140402124523/bloodbrothersgame/images/thumb/9/9e/Sigiled_Skeleton_Axeman_II_Figure.png/40px-Sigiled_Skeleton_Axeman_II_Figure.png",
        fullName: "Sigiled Skeleton Axeman II"
    },
    100110: {
        name: "Sugaar", hp: 13110, atk: 7481, def: 14293, wis: 16950, agi: 16097,
        skills: [465],
        autoAttack: 10007,
        imageLink: "http://img1.wikia.nocookie.net/__cb20140520140320/bloodbrothersgame/images/thumb/9/9b/Sugaar%2C_the_Thunderstorm_II_Figure.png/40px-Sugaar%2C_the_Thunderstorm_II_Figure.png",
        fullName: "Sugaar, the Thunderstorm II"
    },
    100111: {
        name: "Sulima", hp: 13417, atk: 13583, def: 12194, wis: 12293, agi: 12269,
        skills: [17],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130108170214/bloodbrothersgame/images/thumb/e/ec/Sulima%2C_Executioner_II_Figure.png/40px-Sulima%2C_Executioner_II_Figure.png",
        fullName: "Sulima, Executioner II"
    },
    100112: {
        name: "Surtr", hp: 15439, atk: 17108, def: 15085, wis: 7016, agi: 12891,
        skills: [383],
        imageLink: "http://img1.wikia.nocookie.net/__cb20140301022355/bloodbrothersgame/images/thumb/5/5b/Surtr_the_Fervent_II_Figure.png/40px-Surtr_the_Fervent_II_Figure.png",
        fullName: "Surtr the Fervent II"
    },
    100113: {
        name: "Tanba", hp: 17580, atk: 23213, def: 17883, wis: 23289, agi: 18057,
        skills: [236],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130921071545/bloodbrothersgame/images/thumb/f/f6/Tanba%2C_Founder_of_Ninja_II_Figure.png/60px-Tanba%2C_Founder_of_Ninja_II_Figure.png",
        fullName: "Tanba, Founder of Ninja II"
    },
    100114: {
        name: "Tawiscara", hp: 11914, atk: 14513, def: 14395, wis: 11366, agi: 15630,
        skills: [161],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130330204311/bloodbrothersgame/images/thumb/f/f5/Tawiscara_Figure.png/40px-Tawiscara_Figure.png",
        fullName: "Tawiscara"
    },
    100115: {
        name: "Tiamat", hp: 13702, atk: 14698, def: 16497, wis: 18869, agi: 15738,
        skills: [280],
        imageLink: "http://img2.wikia.nocookie.net/__cb20131112085546/bloodbrothersgame/images/thumb/c/c5/Tiamat%2C_Mother_of_Dragons_II_Figure.png/60px-Tiamat%2C_Mother_of_Dragons_II_Figure.png",
        fullName: "Tiamat, Mother of Dragons II"
    },
    100116: {
        name: "Thor", hp: 10343, atk: 13245, def: 11807, wis: 13842, agi: 11917,
        skills: [114],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130106214125/bloodbrothersgame/images/thumb/a/a1/Thor%2C_God_of_Lightning_II_Figure.png/60px-Thor%2C_God_of_Lightning_II_Figure.png",
        fullName: "Thor, God of Lightning II"
    },
    100117: {
        name: "Thor L", hp: 20007, atk: 22002, def: 19063, wis: 10334, agi: 16518,
        skills: [437],
        imageLink: "http://img3.wikia.nocookie.net/__cb20140430140512/bloodbrothersgame/images/thumb/2/23/Thor%2C_the_Roaring_Thunder_Figure.png/60px-Thor%2C_the_Roaring_Thunder_Figure.png",
        fullName: "Thor, the Roaring Thunder"
    },
    100118: {
        name: "Tomoe", hp: 13889, atk: 16010, def: 13110, wis: 8285, agi: 16622,
        skills: [406],
        imageLink: "http://img2.wikia.nocookie.net/__cb20140326090713/bloodbrothersgame/images/thumb/b/b5/Tomoe%2C_the_Lightning_Arrow_II_Figure.png/60px-Tomoe%2C_the_Lightning_Arrow_II_Figure.png",
        fullName: "Tomoe, the Lightning Arrow II"
    },
    100119: {
        name: "Bone Beast", hp: 12001, atk: 9905, def: 12207, wis: 17000, agi: 16803,
        skills: [366],
        autoAttack: 10007,
        imageLink: "http://img1.wikia.nocookie.net/__cb20140206151442/bloodbrothersgame/images/thumb/1/15/Tormented_Bone_Beast_II_Figure.png/60px-Tormented_Bone_Beast_II_Figure.png",
        fullName: "Tormented Bone Beast II"
    },
    100120: {
        name: "Unicorn", hp: 10807, atk: 12600, def: 8770, wis: 11721, agi: 12001,
        skills: [156],
        imageLink: "http://img2.wikia.nocookie.net/__cb20131002005418/bloodbrothersgame/images/thumb/0/04/Unicorn%2C_Spirit_Eater_II_Figure.png/60px-Unicorn%2C_Spirit_Eater_II_Figure.png",
        fullName: "Unicorn, Spirit Eater II"
    },
    100121: {
        name: "Venusia", hp: 14514, atk: 18273, def: 13333, wis: 10831, agi: 11492,
        skills: [361],
        imageLink: "http://img4.wikia.nocookie.net/__cb20140131053558/bloodbrothersgame/images/thumb/0/03/Venusia%2C_the_Grace_II_Figure.png/40px-Venusia%2C_the_Grace_II_Figure.png",
        fullName: "Venusia, the Grace II"
    },
    100122: {
        name: "Vezat", hp: 16648, atk: 18165, def: 14709, wis: 13431, agi: 17721,
        skills: [214],
        imageLink: "http://img4.wikia.nocookie.net/__cb20130721141820/bloodbrothersgame/images/thumb/2/29/Vezat%2C_Dragonbone_Warrior_II_Figure.png/60px-Vezat%2C_Dragonbone_Warrior_II_Figure.png",
        fullName: "Vezat, Dragonbone Warrior II"
    },
    100123: {
        name: "Vivian", hp: 14677, atk: 17851, def: 15229, wis: 13095, agi: 14677,
        skills: [224],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130816162357/bloodbrothersgame/images/thumb/5/5f/Vivian_Griffinrider_II_Figure.png/60px-Vivian_Griffinrider_II_Figure.png",
        fullName: "Vivian Griffinrider II"
    },
    100124: {
        name: "Vlad", hp: 16323, atk: 19508, def: 13680, wis: 14709, agi: 16529,
        skills: [295, 296],
        imageLink: "http://img3.wikia.nocookie.net/__cb20131122044220/bloodbrothersgame/images/thumb/5/56/Vlad_the_Impaler_II_Figure.png/40px-Vlad_the_Impaler_II_Figure.png",
        fullName: "Vlad the Impaler II"
    },
    100125: {
        name: "Wolfert", hp: 14189, atk: 23972, def: 13723, wis: 13290, agi: 13431,
        skills: [118],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130313194006/bloodbrothersgame/images/thumb/9/91/Wolfert%2C_Grave_Keeper_II_Figure.png/60px-Wolfert%2C_Grave_Keeper_II_Figure.png",
        fullName: "Wolfert, Grave Keeper II"
    },
    100126: {
        name: "Xaphan", hp: 13013, atk: 9415, def: 12573, wis: 17000, agi: 15537,
        skills: [412],
        imageLink: "http://img4.wikia.nocookie.net/__cb20140402124522/bloodbrothersgame/images/thumb/7/7f/Xaphan%2C_the_Foul_Flame_II_Figure.png/40px-Xaphan%2C_the_Foul_Flame_II_Figure.png",
        fullName: "Xaphan, the Foul Flame II"
    },
    100127: {
        name: "Ymir", hp: 22650, atk: 24600, def: 16464, wis: 20592, agi: 15933,
        skills: [227],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130824171957/bloodbrothersgame/images/thumb/6/67/Ymir%2C_Primordial_Giant_II_Figure.png/60px-Ymir%2C_Primordial_Giant_II_Figure.png",
        fullName: "Ymir, Primordial Giant II"
    },
    100128: {
        name: "Yulia", hp: 14081, atk: 14664, def: 12052, wis: 13544, agi: 12524,
        skills: [134],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130110210701/bloodbrothersgame/images/thumb/4/41/Yulia%2C_Snakesage_II_Figure.png/60px-Yulia%2C_Snakesage_II_Figure.png",
        fullName: "Yulia, Snakesage II"
    },
    100129: {
        name: "Zanga", hp: 10218, atk: 10787, def: 9692, wis: 9511, agi: 12779,
        skills: [161],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130630141907/bloodbrothersgame/images/thumb/c/cf/Zanga%2C_the_Iron_Storm_II_Figure.png/60px-Zanga%2C_the_Iron_Storm_II_Figure.png",
        fullName: "Zanga, the Iron Storm II"
    },
    100130: {
        name: "Zuniga", hp: 12987, atk: 15132, def: 14276, wis: 14839, agi: 14709,
        skills: [132],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130108170215/bloodbrothersgame/images/thumb/2/22/Zuniga%2C_Guard_Captain_II_Figure.png/60px-Zuniga%2C_Guard_Captain_II_Figure.png",
        fullName: "Zuniga, Guard Captain II"
    }
};
