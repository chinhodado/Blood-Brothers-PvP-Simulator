/**
 * Some notes:
 * - Use the POPE stats
 * - The "name" attribute is a short name for the fam. If multiple fams have the same short name,
 *   append the rarity at the end (e.g. "Thor" and "Thor L")
 * - The order of the skills doesn't matter
 * - For the image, use the 60px thumbnail version
 */
var famDatabase = {
    "Adranus, Lava Beast II" : 
        {name: "Adranus",       hp: 20223, atk: 23517, def: 19855, wis: 18609, agi: 18046, skills: [99000],
        imageLink: "http://img2.wikia.nocookie.net/__cb20140122120804/bloodbrothersgame/images/thumb/7/75/Adranus%2C_Lava_Beast_II_Figure.png/60px-Adranus%2C_Lava_Beast_II_Figure.png"},

    "Alcina the Soulsucker II":
        {name: "Alcina", hp: 12684, atk: 14169, def: 11356, wis: 13682, agi: 15755, skills: [269],
        imageLink: "http://img3.wikia.nocookie.net/__cb20131023124730/bloodbrothersgame/images/thumb/1/1b/Alcina_the_Soulsucker_II_Figure.png/40px-Alcina_the_Soulsucker_II_Figure.png"},

    "Alluring Merrow II" :
        {name: "Alluring Merrow", hp: 16811, atk: 14709, def: 13723, wis: 17537, agi: 17320, skills: [217],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130725105247/bloodbrothersgame/images/thumb/6/6d/Alluring_Merrow_II_Figure.png/60px-Alluring_Merrow_II_Figure.png"},

    "Ammit, Soul Destroyer II" : 
        {name: "Ammit",         hp: 18306, atk: 23495, def: 18501, wis: 18490, agi: 18057, skills: [325],
        imageLink: "http://img2.wikia.nocookie.net/__cb20131221031343/bloodbrothersgame/images/thumb/f/f9/Ammit%2C_Soul_Destroyer_II_Figure.png/60px-Ammit%2C_Soul_Destroyer_II_Figure.png"},

    "Ancient Beetle Soldier II":
        {name: "Ancient Beetle", hp: 14005, atk: 15901, def: 11903, wis: 11838, agi: 14904, skills: [365],
        imageLink: "http://img1.wikia.nocookie.net/__cb20140207105441/bloodbrothersgame/images/thumb/e/e0/Ancient_Beetle_Soldier_II_Figure.png/40px-Ancient_Beetle_Soldier_II_Figure.png"},

    "Anneberg, Steel Steed II":
        {name: "Anneberg", hp: 19097, atk: 18241, def: 17038, wis: 8794, agi: 16518, skills: [489, 490],
        imageLink: "http://img1.wikia.nocookie.net/__cb20140614112314/bloodbrothersgame/images/thumb/e/e1/Anneberg%2C_Steel_Steed_II_Figure.png/60px-Anneberg%2C_Steel_Steed_II_Figure.png"},

    "Apocalyptic Beast II":
        {name: "Apocalyptic Beast", hp: 14189, atk:	15977, def:	15413, wis:	13420, agi:	14969, skills: [123],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130227203821/bloodbrothersgame/images/thumb/5/5a/Apocalyptic_Beast_II_Figure.png/60px-Apocalyptic_Beast_II_Figure.png"},

    "Archduke Ose II" :
        {name: "Archduke Ose",  hp: 16995, atk: 14395, def: 15023, wis: 14850, agi: 11990, skills: [154],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130314191037/bloodbrothersgame/images/thumb/0/00/Archduke_Ose_II_Figure.png/60px-Archduke_Ose_II_Figure.png"},

    "Badalisc, the Gourmet II":
        {name: "Badalisc", hp :14092, atk: 16107, def: 11882, wis: 11297, agi: 15218, skills: [315],
        imageLink: "http://img2.wikia.nocookie.net/__cb20131212173203/bloodbrothersgame/images/thumb/6/6c/Badalisc%2C_the_Gourmet_II_Figure.png/40px-Badalisc%2C_the_Gourmet_II_Figure.png"},

    "Balgo, the Cursed Flame II" : 
        {name: "Balgo",         hp: 18585, atk: 16037, def: 13962, wis: 5799,  agi: 13510, skills: [349],
        imageLink: "http://img2.wikia.nocookie.net/__cb20140122120902/bloodbrothersgame/images/thumb/f/fd/Balgo%2C_the_Cursed_Flame_II_Figure.png/60px-Balgo%2C_the_Cursed_Flame_II_Figure.png"},
    
    "Bronzeclad Hyena II":
        {name: "Bronzeclad Hyena", hp: 14644, atk: 10766, def: 11860, wis: 18923, agi: 12228, skills: [321], autoAttack: 10008,
        imageLink: "http://img2.wikia.nocookie.net/__cb20131227221825/bloodbrothersgame/images/thumb/f/fc/Bronzeclad_Hyena_II_Figure.png/40px-Bronzeclad_Hyena_II_Figure.png"},

    "Bunga, the Stalwart II" :
        {name: "Bunga",         hp: 12269, atk: 11049, def: 14182, wis: 9612,  agi: 10343, skills: [125],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130107205042/bloodbrothersgame/images/thumb/5/5d/Bunga%2C_the_Stalwart_II_Figure.png/60px-Bunga%2C_the_Stalwart_II_Figure.png"},

    "Canhel, Guardian Dragon II":
        {name: "Canhel",        hp: 15608, atk: 19606, def: 17992, wis: 11329, agi: 16399, skills: [293],
        imageLink: "http://img2.wikia.nocookie.net/__cb20131122150727/bloodbrothersgame/images/thumb/5/54/Canhel%2C_Guardian_Dragon_II_Figure.png/60px-Canhel%2C_Guardian_Dragon_II_Figure.png"},

    "Cat Sith Chillweaver II" : 
        {name: "Cat Sith",      hp: 13293, atk: 13196, def: 10611, wis: 16144, agi: 14489, skills: [2],
        imageLink: "http://img2.wikia.nocookie.net/__cb20131215131933/bloodbrothersgame/images/thumb/b/b2/Cat_Sith_Chillweaver_II_Figure.png/60px-Cat_Sith_Chillweaver_II_Figure.png"},
    
    "Delphyne, Thunder Dragon II":
        {name: "Delphyne", hp: 11990, atk: 14601, def: 11882, wis: 18858, agi: 11080, skills: [288],
        imageLink: "http://img4.wikia.nocookie.net/__cb20131101130817/bloodbrothersgame/images/thumb/1/15/Delphyne%2C_Thunder_Dragon_II_Figure.png/40px-Delphyne%2C_Thunder_Dragon_II_Figure.png"},

    "Desna, Mythic Wendigo II" : 
        {name: "Desna",         hp: 13146, atk: 15089, def: 14287, wis: 12137, agi: 12378, skills: [124],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130106235645/bloodbrothersgame/images/thumb/4/45/Desna%2C_Mythic_Wendigo_II_Figure.png/60px-Desna%2C_Mythic_Wendigo_II_Figure.png"},
    
    "Djinn of the Lamp II":
        {name: "Djinn",         hp: 14048, atk: 17363, def: 13333, wis: 19422, agi: 16605, skills: [319, 320],
        imageLink: "http://img1.wikia.nocookie.net/__cb20131227221855/bloodbrothersgame/images/thumb/8/8d/Djinn_of_the_Lamp_II_Figure.png/60px-Djinn_of_the_Lamp_II_Figure.png"},

    "Doppeladler II":
        {name: "Doppeladler", hp: 13940, atk: 14709, def: 14417, wis: 14092, agi: 14850, skills: [33],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130107210324/bloodbrothersgame/images/thumb/6/68/Doppeladler_II_Figure.png/60px-Doppeladler_II_Figure.png"},

    "Empusa, the Death Scythe":
        {name: "Empusa", hp: 20706, atk: 12623, def: 16110, wis: 20999, agi: 17510, skills: [447], autoAttack: 10016,
        imageLink: "http://img3.wikia.nocookie.net/__cb20140508115333/bloodbrothersgame/images/thumb/0/0a/Empusa%2C_the_Death_Scythe_Figure.png/60px-Empusa%2C_the_Death_Scythe_Figure.png"},

    "Fenrir II" :
        {name: "Fenrir",        hp: 15099, atk: 16865, def: 22498, wis: 13008, agi: 11167, skills: [154],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130420124059/bloodbrothersgame/images/thumb/d/dd/Fenrir_II_Figure.png/60px-Fenrir_II_Figure.png"},

    "Flame Dragon II" : 
        {name: "Flame Dragon",  hp: 14601, atk: 14449, def: 13756, wis: 15153, agi: 13940, skills: [23],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130107210805/bloodbrothersgame/images/thumb/8/8e/Flame_Dragon_II_Figure.png/60px-Flame_Dragon_II_Figure.png"},

    "Freyr, God of the Harvest II":
        {name: "Freyr", hp: 16562, atk:	19909, def:	15370, wis:	12943, agi:	15998, skills: [385, 386],
        imageLink: "http://img1.wikia.nocookie.net/__cb20140301012048/bloodbrothersgame/images/thumb/5/51/Freyr%2C_God_of_the_Harvest_II_Figure.png/60px-Freyr%2C_God_of_the_Harvest_II_Figure.png"},

    "Gathgoic the Other II":
        {name: "Gathgoic", hp: 14839, atk: 16128, def: 14980, wis: 17948, agi: 14709, skills: [141],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130122044308/bloodbrothersgame/images/thumb/f/fb/Gathgoic_the_Other_II_Figure.png/60px-Gathgoic_the_Other_II_Figure.png"},

    "Ghislandi, Iron Heart II" : 
        {name: "Ghislandi",     hp: 12324, atk: 13551, def: 13525, wis: 12212, agi: 12187, skills: [17],
        imageLink: "http://img4.wikia.nocookie.net/__cb20130106212217/bloodbrothersgame/images/thumb/6/68/Ghislandi%2C_Iron_Heart_II_Figure.png/60px-Ghislandi%2C_Iron_Heart_II_Figure.png"},
    
    "Gorlin Gold Helm II" :
        {name: "Gorlin",        hp: 11928, atk: 12380, def: 17000, wis: 6809,  agi: 10904, skills: [167],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130408193159/bloodbrothersgame/images/thumb/5/50/Gorlin_Gold_Helm_II_Figure.png/60px-Gorlin_Gold_Helm_II_Figure.png"},
    
    "Griffin Mount II" : 
        {name: "Griffin",       hp: 11887, atk: 9909,  def: 14391, wis: 14263, agi: 11960, skills: [2],
        imageLink: "http://img4.wikia.nocookie.net/__cb20130222030204/bloodbrothersgame/images/thumb/5/57/Griffin_Mount_II_Figure.png/60px-Griffin_Mount_II_Figure.png"},
    
    "Guillaume, Fanatic" :
        {name: "Guillaume",     hp: 21515, atk: 20887, def: 16308, wis: 12948, agi: 18505, skills: [466, 467],
        imageLink: "http://img1.wikia.nocookie.net/__cb20140520122326/bloodbrothersgame/images/thumb/2/22/Guillaume%2C_Fanatic_Figure.png/60px-Guillaume%2C_Fanatic_Figure.png"},

    "Hecatoncheir the Adamantine II":
        {name: "Hecatoncheir", hp: 11807, atk: 13902, def: 14768, wis: 13928, agi: 13366, skills: [264],
        imageLink: "http://img4.wikia.nocookie.net/__cb20131010170211/bloodbrothersgame/images/thumb/8/88/Hecatoncheir_the_Adamantine_II_Figure.png/40px-Hecatoncheir_the_Adamantine_II_Figure.png"},

    "Heinrich the Bold II":
        {name: "Heinrich", hp: 16887, atk: 13940, def: 15132, wis: 13290, agi: 14005, skills: [133],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130124152435/bloodbrothersgame/images/thumb/0/05/Heinrich_the_Bold_II_Figure.png/60px-Heinrich_the_Bold_II_Figure.png"},

    "Hel, Goddess of Death II" :
        {name: "Hel",           hp: 14709, atk: 17450, def: 14709, wis: 15771, agi: 18057, skills: [239, 240],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130921074034/bloodbrothersgame/images/thumb/e/e8/Hel%2C_Goddess_of_Death_II_Figure.png/60px-Hel%2C_Goddess_of_Death_II_Figure.png"},
    
    "Hippocamp II" :
        {name: "Hippocamp", hp: 14514, atk:	16486, def:	14926, wis:	19855, agi:	15002, skills: [360, 167],
        imageLink: "http://img4.wikia.nocookie.net/__cb20140129062341/bloodbrothersgame/images/thumb/f/f8/Hippocamp_II_Figure.png/60px-Hippocamp_II_Figure.png"},

    "Hollofernyiges II" :
        {name: "Hollofernyiges", hp: 16551, atk: 16757, def: 13875, wis: 14568, agi: 16941, skills: [33],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130321232308/bloodbrothersgame/images/thumb/2/20/Hollofernyiges_II_Figure.png/60px-Hollofernyiges_II_Figure.png"},

    "Hoska, the Firestroke II" :
        {name: "Hoska",         hp: 18996, atk: 7906,  def: 15096, wis: 17023, agi: 8881,  skills: [484, 485], autoAttack: 10007,
        imageLink: "http://img2.wikia.nocookie.net/__cb20140613080813/bloodbrothersgame/images/thumb/6/6c/Hoska%2C_the_Firestroke_II_Figure.png/60px-Hoska%2C_the_Firestroke_II_Figure.png"},

    "Hraesvelg, Corpse Feaster II":
        {name: "Hraesvelg", hp: 12499, atk: 17472, def:	11784, wis:	12662, agi:	13799, skills: [251],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130927185735/bloodbrothersgame/images/thumb/c/cd/Hraesvelg%2C_Corpse_Feaster_II_Figure.png/40px-Hraesvelg%2C_Corpse_Feaster_II_Figure.png"},

    "Ira, Hypnotic Specter II":
        {name: "Ira", hp: 12832, atk: 14489, def: 8770, wis: 11172, agi: 17254, skills: [138],
        imageLink: "http://img4.wikia.nocookie.net/__cb20130227203822/bloodbrothersgame/images/thumb/6/6c/Ira%2C_Hypnotic_Specter_II_Figure.png/40px-Ira%2C_Hypnotic_Specter_II_Figure.png"},

    "Kalevan, the Forest Green II":
        {name: "Kalevan", hp: 12629, atk: 18013, def: 11914, wis: 12055, agi: 13821, skills: [297, 240],
        imageLink: "http://img3.wikia.nocookie.net/__cb20131122044155/bloodbrothersgame/images/thumb/b/bd/Kalevan%2C_the_Forest_Green_II_Figure.png/40px-Kalevan%2C_the_Forest_Green_II_Figure.png"},

    "Kangana, the Maelstrom II" :
        {name: "Kangana",       hp: 15803, atk: 18750, def: 14872, wis: 12813, agi: 13247, skills: [216],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130726121448/bloodbrothersgame/images/thumb/b/b1/Kangana%2C_the_Maelstrom_II_Figure.png/60px-Kangana%2C_the_Maelstrom_II_Figure.png"},
    
    "Kekro, Demiwyrm Magus II" :
        {name: "Kekro", hp: 17992, atk:	12001, def:	15002, wis:	19660, agi:	16302, skills: [379], autoAttack: 10007,
        imageLink: "http://img3.wikia.nocookie.net/__cb20140221092259/bloodbrothersgame/images/thumb/3/3b/Kekro%2C_Demiwyrm_Magus_II_Figure.png/60px-Kekro%2C_Demiwyrm_Magus_II_Figure.png"},

    "Kyteler the Corrupted II" :
        {name: "Kyteler",       hp: 11721, atk: 12524, def: 9892,  wis: 17254, agi: 16416, skills: [258],
        imageLink: "http://img4.wikia.nocookie.net/__cb20140120233253/bloodbrothersgame/images/thumb/d/d4/Kyteler_the_Corrupted_II_Figure.png/60px-Kyteler_the_Corrupted_II_Figure.png"},
    
    "Linnorm, the Hailstorm II" :
        {name: "Linnorm",       hp: 12326, atk: 11102, def: 11979, wis: 16605, agi: 16497, skills: [313],
        imageLink: "http://img3.wikia.nocookie.net/__cb20131210233903/bloodbrothersgame/images/thumb/0/0b/Linnorm%2C_the_Hailstorm_II_Figure.png/60px-Linnorm%2C_the_Hailstorm_II_Figure.png"},
    
    "Magdal Dragonheart II":
        {name: "Magdal", hp: 13929, atk: 15110, def: 15132, wis: 13810, agi: 15359, skills: [120],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130210215236/bloodbrothersgame/images/thumb/c/c0/Magdal_Dragonheart_II_Figure.png/40px-Magdal_Dragonheart_II_Figure.png"},

    "Marraco, Crusted Wyrm II":
        {name: "Marraco",       hp: 18716, atk: 15876, def: 17254, wis: 7381,  agi: 8809,  skills: [61, 167],
        imageLink: "http://img4.wikia.nocookie.net/__cb20131115131303/bloodbrothersgame/images/thumb/7/7b/Marraco%2C_Crusted_Wyrm_II_Figure.png/60px-Marraco%2C_Crusted_Wyrm_II_Figure.png"},

    "Millarca, Lady of Thorns II" :
        {name: "Millarca",     hp: 15305, atk: 10668, def: 15565, wis: 21393, agi: 18046, skills: [407, 408], autoAttack: 10007,
        imageLink: "http://img2.wikia.nocookie.net/__cb20140325120640/bloodbrothersgame/images/thumb/f/ff/Millarca%2C_Lady_of_Thorns_II_Figure.png/60px-Millarca%2C_Lady_of_Thorns_II_Figure.png"},

    "Moni the Dismemberer II" :
        {name: "Moni",          hp: 13562, atk: 15537, def: 12121, wis: 10234, agi: 16448, skills: [340],
        imageLink: "http://img3.wikia.nocookie.net/__cb20140110075315/bloodbrothersgame/images/thumb/4/43/Moni_the_Dismemberer_II_Figure.png/60px-Moni_the_Dismemberer_II_Figure.png"},
    
    "Musashi, the Twinblade II" :
        {name: "Musashi",       hp: 20592, atk: 24752, def: 19151, wis: 17981, agi: 18024, skills: [99003],
        imageLink: "http://img1.wikia.nocookie.net/__cb20140326090459/bloodbrothersgame/images/thumb/1/1f/Musashi%2C_the_Twinblade_II_Figure.png/60px-Musashi%2C_the_Twinblade_II_Figure.png"}, 

    "Neith, Goddess of War II" :
        {name: "Neith", hp: 18999, atk:	19660, def:	15002, wis:	12001, agi:	15305, skills: [326],
        imageLink: "http://img2.wikia.nocookie.net/__cb20131221031333/bloodbrothersgame/images/thumb/3/3b/Neith%2C_Goddess_of_War_II_Figure.png/60px-Neith%2C_Goddess_of_War_II_Figure.png"},

    "Niu Mo Wang II":
        {name: "Niu Mo Wang", hp: 14276, atk: 17071, def: 15998, wis: 13420, agi: 13138, skills: [133],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130709182652/bloodbrothersgame/images/thumb/2/26/Niu_Mo_Wang_II_Figure.png/60px-Niu_Mo_Wang_II_Figure.png"},
    
    "Pontifex Antiquus II" :
        {name: "Pontifex",     hp: 14590, atk: 16410, def: 13507, wis: 18371, agi: 17797, skills: [229, 167],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130823004421/bloodbrothersgame/images/thumb/b/bd/Pontifex_Antiquus_II_Figure.png/60px-Pontifex_Antiquus_II_Figure.png"},

    "Premyslid, the Black King II":
        {name: "Premyslid", hp: 13626, atk:	16984, def:	14926, wis:	18772, agi:	11232, skills: [244],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130911122726/bloodbrothersgame/images/thumb/c/c7/Premyslid%2C_the_Black_King_II_Figure.png/60px-Premyslid%2C_the_Black_King_II_Figure.png"},

    "Queen of the Waspmen II" :
        {name: "Queen Waspmen", hp: 14070, atk: 19898, def: 13247, wis: 15998, agi: 17829, skills: [99002],
        imageLink: "http://img1.wikia.nocookie.net/__cb20140122120929/bloodbrothersgame/images/thumb/f/f6/Queen_of_the_Waspmen_II_Figure.png/60px-Queen_of_the_Waspmen_II_Figure.png"},
    
    "Rampant Lion II" :
        {name: "Rampant Lion",  hp: 16291, atk: 17569, def: 16518, wis: 12564, agi: 18035, skills: [380, 381],
        imageLink: "http://img3.wikia.nocookie.net/__cb20140222023232/bloodbrothersgame/images/thumb/8/87/Rampant_Lion_II_Figure.png/60px-Rampant_Lion_II_Figure.png"},
    
    "Ragnar, Dragonslayer II" :
        {name: "Ragnar",        hp: 13245, atk: 15804, def: 12001, wis: 10294, agi: 16510, skills: [314],
        imageLink: "http://img4.wikia.nocookie.net/__cb20131210233938/bloodbrothersgame/images/thumb/9/97/Ragnar%2C_Dragonslayer_II_Figure.png/60px-Ragnar%2C_Dragonslayer_II_Figure.png"},
        
    "Reinforced Brass Gorilla II" :
        {name: "Brass Gorilla", hp: 18996, atk: 9760,  def: 18096, wis: 12684, agi: 8319,  skills: [398],
        imageLink: "http://img2.wikia.nocookie.net/__cb20140318135240/bloodbrothersgame/images/thumb/6/6b/Reinforced_Brass_Gorilla_II_Figure.png/60px-Reinforced_Brass_Gorilla_II_Figure.png"},

    "Sagacious Treant II" :
        {name: "Treant",        hp: 18566, atk: 17017, def: 22542, wis: 13626, agi: 8014, skills: [154],
        imageLink: "http://img1.wikia.nocookie.net/__cb20131215131956/bloodbrothersgame/images/thumb/6/67/Sagacious_Treant_II_Figure.png/60px-Sagacious_Treant_II_Figure.png"},

    "Scathing Hierophant" :
        {name: "Scathing Hierophant", hp: 19681, atk: 13391, def: 17534, wis: 20112, agi: 16950, skills: [418], autoAttack: 10007,
        imageLink: "http://img1.wikia.nocookie.net/__cb20140411023129/bloodbrothersgame/images/thumb/b/b1/Scathing_Hierophant_Figure.png/60px-Scathing_Hierophant_Figure.png"},

    "Sea Serpent II" :
        {name: "Sea Serpent",   hp: 16020, atk: 12012, def: 15121, wis: 19259, agi: 17103, skills: [302],
        imageLink:"http://img1.wikia.nocookie.net/__cb20131129152929/bloodbrothersgame/images/thumb/6/65/Sea_Serpent_II_Figure.png/60px-Sea_Serpent_II_Figure.png"},
    
    "Tanba, Founder of Ninja II" :
        {name: "Tanba",         hp: 17580, atk: 23213, def: 17883, wis: 23289, agi: 18057, skills: [236],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130921071545/bloodbrothersgame/images/thumb/f/f6/Tanba%2C_Founder_of_Ninja_II_Figure.png/60px-Tanba%2C_Founder_of_Ninja_II_Figure.png"},
    
    "Tiamat, Mother of Dragons II" :
        {name: "Tiamat", hp: 13702, atk: 14698, def: 16497, wis: 18869, agi: 15738, skills: [280],
        imageLink: "http://img2.wikia.nocookie.net/__cb20131112085546/bloodbrothersgame/images/thumb/c/c5/Tiamat%2C_Mother_of_Dragons_II_Figure.png/60px-Tiamat%2C_Mother_of_Dragons_II_Figure.png"},

    "Thor, God of Lightning II" :
        {name: "Thor",          hp: 10343, atk: 13245, def: 11807, wis: 13842, agi: 11917, skills: [114],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130106214125/bloodbrothersgame/images/thumb/a/a1/Thor%2C_God_of_Lightning_II_Figure.png/60px-Thor%2C_God_of_Lightning_II_Figure.png"},

    "Thor, the Roaring Thunder" :
        {name: "Thor L", hp: 20007, atk: 22002, def: 19063, wis: 10334, agi: 16518, skills: [437],
        imageLink: "http://img3.wikia.nocookie.net/__cb20140430140512/bloodbrothersgame/images/thumb/2/23/Thor%2C_the_Roaring_Thunder_Figure.png/60px-Thor%2C_the_Roaring_Thunder_Figure.png"},

    "Tomoe, the Lightning Arrow II" :
        {name: "Tomoe",         hp: 13889, atk: 16010, def: 13110, wis: 8285,  agi: 16622, skills: [406],
        imageLink: "http://img2.wikia.nocookie.net/__cb20140326090713/bloodbrothersgame/images/thumb/b/b5/Tomoe%2C_the_Lightning_Arrow_II_Figure.png/60px-Tomoe%2C_the_Lightning_Arrow_II_Figure.png"},
    
    "Tormented Bone Beast II" :
        {name: "Bone Beast",    hp: 12001, atk: 9905,  def: 12207, wis: 17000, agi: 16803, skills: [366], autoAttack: 10007,
        imageLink: "http://img1.wikia.nocookie.net/__cb20140206151442/bloodbrothersgame/images/thumb/1/15/Tormented_Bone_Beast_II_Figure.png/60px-Tormented_Bone_Beast_II_Figure.png"},

    "Vezat, Dragonbone Warrior II" :
        {name: "Vezat", hp: 16648, atk:	18165, def:	14709, wis:	13431, agi:	17721, skills: [214],
        imageLink: "http://img4.wikia.nocookie.net/__cb20130721141820/bloodbrothersgame/images/thumb/2/29/Vezat%2C_Dragonbone_Warrior_II_Figure.png/60px-Vezat%2C_Dragonbone_Warrior_II_Figure.png"},

    "Vivian Griffinrider II":
        {name: "Vivian", hp: 14677, atk: 17851, def: 15229, wis: 13095, agi: 14677, skills: [224],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130816162357/bloodbrothersgame/images/thumb/5/5f/Vivian_Griffinrider_II_Figure.png/60px-Vivian_Griffinrider_II_Figure.png"},

    "Wolfert, Grave Keeper II" :
        {name : "Wolfert",      hp: 14189, atk: 23972, def: 13723, wis: 13290, agi: 13431, skills: [118],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130313194006/bloodbrothersgame/images/thumb/9/91/Wolfert%2C_Grave_Keeper_II_Figure.png/60px-Wolfert%2C_Grave_Keeper_II_Figure.png"},

    "Ymir, Primordial Giant II":
        {name: "Ymir", hp: 22650, atk: 24600, def: 16464, wis: 20592, agi: 15933, skills: [227],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130824171957/bloodbrothersgame/images/thumb/6/67/Ymir%2C_Primordial_Giant_II_Figure.png/60px-Ymir%2C_Primordial_Giant_II_Figure.png"},

    "Yulia, Snakesage II"  :
        {name: "Yulia",         hp: 14081, atk: 14664, def: 12052, wis: 13544, agi: 12524, skills: [134],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130110210701/bloodbrothersgame/images/thumb/4/41/Yulia%2C_Snakesage_II_Figure.png/60px-Yulia%2C_Snakesage_II_Figure.png"},

    "Zuniga, Guard Captain II":
        {name: "Zuniga", hp: 12987, atk: 15132, def: 14276, wis: 14839, agi: 14709, skills: [132],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130108170215/bloodbrothersgame/images/thumb/2/22/Zuniga%2C_Guard_Captain_II_Figure.png/60px-Zuniga%2C_Guard_Captain_II_Figure.png"}
};