// Use the POPE stats
var famDatabase = {
    "Adranus, Lava Beast II" : 
        {name: "Adranus",       hp: 20223, atk: 23517, def: 19855, wis: 18609, agi: 18046, skills: [99000],
        imageLink: "http://img2.wikia.nocookie.net/__cb20140122120804/bloodbrothersgame/images/thumb/7/75/Adranus%2C_Lava_Beast_II_Figure.png/60px-Adranus%2C_Lava_Beast_II_Figure.png"},
    
    "Ammit, Soul Destroyer II" : 
        {name: "Ammit",         hp: 18306, atk: 23495, def: 18501, wis: 18490, agi: 18057, skills: [99001],
        imageLink: "http://img2.wikia.nocookie.net/__cb20131221031343/bloodbrothersgame/images/thumb/f/f9/Ammit%2C_Soul_Destroyer_II_Figure.png/60px-Ammit%2C_Soul_Destroyer_II_Figure.png"},
    
    "Balgo, the Cursed Flame II" : 
        {name: "Balgo",         hp: 18585, atk: 16037, def: 13962, wis: 5799,  agi: 13510, skills: [349],
        imageLink: "http://img2.wikia.nocookie.net/__cb20140122120902/bloodbrothersgame/images/thumb/f/fd/Balgo%2C_the_Cursed_Flame_II_Figure.png/60px-Balgo%2C_the_Cursed_Flame_II_Figure.png"},
    
    "Cat Sith Chillweaver II" : 
        {name: "Cat Sith",      hp: 13293, atk: 13196, def: 10611, wis: 16144, agi: 14489, skills: [2],
        imageLink: "http://img2.wikia.nocookie.net/__cb20131215131933/bloodbrothersgame/images/thumb/b/b2/Cat_Sith_Chillweaver_II_Figure.png/60px-Cat_Sith_Chillweaver_II_Figure.png"},
    
    "Desna, Mythic Wendigo II" : 
        {name: "Desna",         hp: 13146, atk: 15089, def: 14287, wis: 12137, agi: 12378, skills: [124],
        imageLink: "http://img2.wikia.nocookie.net/__cb20130106235645/bloodbrothersgame/images/thumb/4/45/Desna%2C_Mythic_Wendigo_II_Figure.png/60px-Desna%2C_Mythic_Wendigo_II_Figure.png"},
    
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
    
    "Hel, Goddess of Death II" :
        {name: "Hel",           hp: 14709, atk: 17450, def: 14709, wis: 15771, agi: 18057, skills: [239, 240],
        imageLink: "http://img1.wikia.nocookie.net/__cb20130921074034/bloodbrothersgame/images/thumb/e/e8/Hel%2C_Goddess_of_Death_II_Figure.png/60px-Hel%2C_Goddess_of_Death_II_Figure.png"},
    
    "Musashi, the Twinblade II" :
        {name: "Musashi",       hp: 20592, atk: 24752, def: 19151, wis: 17981, agi: 18024, skills: [99003],
        imageLink: "http://img1.wikia.nocookie.net/__cb20140326090459/bloodbrothersgame/images/thumb/1/1f/Musashi%2C_the_Twinblade_II_Figure.png/60px-Musashi%2C_the_Twinblade_II_Figure.png"}, 
    
    "Queen of the Waspmen II" :
        {name: "Queen Waspmen", hp: 14070, atk: 19898, def: 13247, wis: 15998, agi: 17829, skills: [99002],
        imageLink: "http://img1.wikia.nocookie.net/__cb20140122120929/bloodbrothersgame/images/thumb/f/f6/Queen_of_the_Waspmen_II_Figure.png/60px-Queen_of_the_Waspmen_II_Figure.png"},
    
    "Rampant Lion II" :
        {name: "Rampant Lion",  hp: 16291, atk: 17569, def: 16518, wis: 12564, agi: 18035, skills: [380, 381],
        imageLink: "http://img3.wikia.nocookie.net/__cb20140222023232/bloodbrothersgame/images/thumb/8/87/Rampant_Lion_II_Figure.png/60px-Rampant_Lion_II_Figure.png"},
        
    "Tanba, Founder of Ninja II" :
        {name: "Tanba",         hp: 17580, atk: 23213, def: 17883, wis: 23289, agi: 18057, skills: [99004],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130921071545/bloodbrothersgame/images/thumb/f/f6/Tanba%2C_Founder_of_Ninja_II_Figure.png/60px-Tanba%2C_Founder_of_Ninja_II_Figure.png"},
    
    "Yulia, Snakesage II"  :
        {name: "Yulia",         hp: 14081, atk: 14664, def: 12052, wis: 13544, agi: 12524, skills: [134],
        imageLink: "http://img3.wikia.nocookie.net/__cb20130110210701/bloodbrothersgame/images/thumb/4/41/Yulia%2C_Snakesage_II_Figure.png/60px-Yulia%2C_Snakesage_II_Figure.png"},
}