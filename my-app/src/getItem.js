
const getFullItems = (firstItem,secondItem) => {
    let combinedItem = ''
    const fullList = [ 
        'B_F_Sword',
        [['B_F_Sword', 'Infinity_Edge'],
        ['Recurve_Bow','Sword_of_the_Divine'],
        ['Chain_Vest', 'Guardian_Angel'],
        ['Negatron_Cloak', 'The_Bloodthirster'],
        ['Needlessly_Large_Rod', 'Hextech_Gunblade'],
        ['Tear_of_the_Goddess', 'Spear_of_Shojin'],
        ['Giant_s_Belt', 'Zeke_s_Herald'],
        ['Spatula', 'Youmuu_s_Ghostblade']],
        'Recurve_Bow',
        [['B_F_Sword', 'Sword_of_the_Divine'],
        ['Recurve_Bow', 'Rapid_FireCannon'],
        ['Chain_Vest', 'Phantom_Dancer'],
        ['Negatron_Cloak', 'CursedBlade'],
        ['Needlessly_Large_Rod', 'Guinsoo_s_Rageblade'],
        ['Tear_of_the_Goddess', 'Statikk_Shiv'],
        ['Giant_s_Belt', 'Titanic_Hydra'],
        ['Spatula', 'Blade_of_the_Ruined_King']],
        'Chain_Vest',
        [['B_F_Sword', 'Guardian_Angel'],
        ['Recurve_Bow','Phantom_Dancer'],
        ['Chain_Vest', 'Thornmail'],
        ['Negatron_Cloak', 'Sword_Breaker'],
        ['Needlessly_Large_Rod', 'Locket_of_the_Iron_Solari'],
        ['Tear_of_the_Goddess', 'Frozen_Heart'],
        ['Giant_s_Belt', 'Red_Buff'],
        ['Spatula', 'Knight_s_Vow']],
        'Negatron_Cloak',
        [['B_F_Sword', 'The_Bloodthirster'],
        ['Recurve_Bow','CursedBlade'],
        ['Chain_Vest', 'Sword_Breaker'],
        ['Negatron_Cloak', 'DragonsClaw'],
        ['Needlessly_Large_Rod', 'Ionic_Spark'],
        ['Tear_of_the_Goddess', 'Hush'],
        ['Giant_s_Belt', 'Zephyr'],
        ['Spatula', 'Runaan_s_Hurricane']],
        'Needlessly_Large_Rod',
        [['B_F_Sword', 'Hextech_Gunblade'],
        ['Recurve_Bow','Guinsoo_s_Rageblade'],
        ['Chain_Vest', 'Locket_of_the_Iron_Solari'],
        ['Negatron_Cloak', 'Ionic_Spark'],
        ['Needlessly_Large_Rod', 'Rabadon_s_Deathcap'],
        ['Tear_of_the_Goddess', 'Luden_s_Echo'],
        ['Giant_s_Belt', 'Morellonomicon'],
        ['Spatula', 'Yuumi']],
        'Tear_of_the_Goddess',
        [['B_F_Sword', 'Spear_of_Shojin'],
        ['Recurve_Bow','Statikk_Shiv'],
        ['Chain_Vest', 'Frozen_Heart'],
        ['Negatron_Cloak', 'Hush'],
        ['Needlessly_Large_Rod', 'Luden_s_Echo'],
        ['Tear_of_the_Goddess', 'Seraph_s_Embrace'],
        ['Giant_s_Belt', 'Redemption'],
        ['Spatula', 'Darkin']],
        'Giant_s_Belt',
        [['B_F_Sword', 'Zeke_s_Herald'],
        ['Recurve_Bow','Titanic_Hydra'],
        ['Chain_Vest', 'Red_Buff'],
        ['Negatron_Cloak', 'Zephyr'],
        ['Needlessly_Large_Rod', 'Morellonomicon'],
        ['Tear_of_the_Goddess', 'Redemption'],
        ['Giant_s_Belt', 'Warmog_s_Armor'],
        ['Spatula', 'Frozen_Mallet']],
        'Spatula',
        [['B_F_Sword', 'Youmuu_s_Ghostblade'],
        ['Recurve_Bow','Blade_of_the_Ruined_King'],
        ['Chain_Vest', 'Knight_s_Vow'],
        ['Negatron_Cloak', 'Runaan_s_Hurricane'],
        ['Needlessly_Large_Rod', 'Yuumi'],
        ['Tear_of_the_Goddess', 'Darkin'],
        ['Giant_s_Belt', 'Frozen_Mallet'],
        ['Spatula', 'ForceOfNature']],
    ]
    
    for(let i = 0; i< fullList.length; i += 2){ // Check item name in the array above

        if(fullList[i] === firstItem){
            combinedItem = fullList[i+1].filter( item => {
                return item[0] === secondItem
            })
        }
    }
    
    return combinedItem[0][1]
}

export default getFullItems
