let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting = 0;
let monsterHealth;
let inventory = ["stick"];

//get id to reference from html
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {
        name: "stick",
        power: 5

    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "hammer",
        power: 50
    },
    {
        name:"sword",
        power: 100
    }
]

const monster = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "Beast",
        level: 8,
        health: 60
    },
    {
        name: "Dragon",
        level: 20,
        health: 300
    }

]

const locations = [
    {
        name: "Town Square",
        "button text": ["Go to store","Go to cave","Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\" \nYou can gain the EXP in cave \nYou have to kill the dragon",
    },
    {
        name: "Store",
        "button text": ["Buy 10 Health (10 gold)","Upgrade Weapon (30 gold)","Go to Townsquare"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You entered the Store. ",
    },
    {
        name: "Cave",
        "button text": ["Fight Slime","Fight Beast","Go to Townsquare"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You are at the cave",
    },
    {
        name: "Fight",
        "button text": ["Attack","Dodge","Run"],
        "button functions": [attack, dodge, goTown],
        text: "you are fighting a monster",
    },
    {
        name: "Kill monster",
        "button text": ["Go to town Square","Go to Cave","Go to town Square"],
        "button functions": [goTown, goCave, goTown],
        text: "You defeat" + monster[fighting].name + "\n You found some gold",
    },
    {
        name: "Lose",
        "button text": ["Retry","Retry","Retry"],
        "button functions": [restart, restart, restart],
        text: "You died",
    },
    {
        name: "Win",
        "button text": ["Replay","Replay","Replay"],
        "button functions": [restart, restart, restart],
        text: "Congratulation!! You beat the Dragon",
    },
];



//init buttons
//button.onclick = openProgram(function);
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    monsterStats.style.display = "none"
    button1.innerText = location["button text"][0]
    button2.innerText = location["button text"][1]
    button3.innerText = location["button text"][2]
    button1.onclick = location["button functions"][0]
    button2.onclick = location["button functions"][1]
    button3.onclick = location["button functions"][2]
    text.innerText = location.text
}

function goTown(){
    update(locations[0]);
}

function goStore(){
    update(locations[1]);
}

function goCave(){
    update(locations[2])
}

function buyHealth(){
    if (gold >= 10){
        gold -= 10
        health += 10
        healthText.innerText = health
        goldText.innerText = gold
    }
    else{
        text.innerText= "You dont have enough money"
    }
}

function buyWeapon(){
    if (currentWeapon < weapons.length - 1){
        if (gold >= 30){
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold
            let newWeapon = weapons[currentWeapon].name
            text.innerText = "You bought " + newWeapon+ ".";
            inventory.push(newWeapon)
            text.innerText += "\n In inventory, you have: "+ inventory
        }
        else{
            text.innerText = "You don't have enough money to buy weapon"
        }
    }
    else{
        text.innerText = "You have the strongest weapon in town.";
        text.innerText += "\nIn inventory, you have: "+ inventory
        button2.innerText = "Sell weapon for 15 gold"
        button2.onclick = sellWeapon
    }
}

function sellWeapon(){
    if (inventory.length > 1){
        gold += 15;
        goldText.innerText = gold
        let currentWeapon = inventory.shift()
        text.innerText = "You sold a "+ currentWeapon + "."
        text.innerText = "In inventory, you have: "+ inventory
    }
    else{
        text.innerText += "\nIf you sell the sword, How can you defeat the dragon"
    }
}



function fightSlime(){
    fighting = 0;
    goFight();
}

function fightBeast(){
    fighting = 1;
    goFight();
}

function fightDragon(){
    fighting = 2;
    goFight();
}

function goFight(){
    update(locations[3]);
    monsterHealth = monster[fighting].health
    monsterStats.style.display = "block";
    monsterHealthText.innerText = monsterHealth
    monsterNameText.innerText = monster[fighting].name
}

function attack(){
    text.innerText = "The " + monster[fighting].name + " attcaks."
    text.innerText += "You attack with "+ weapons[currentWeapon].name + ".";
    health -= monster[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    monsterHealthText.innerText = monsterHealth
    healthText.innerText = health;
    if (health <= 0){
        lose();
    }
    else if (monsterHealth <= 0){
        //if you fight the dragon
        if(fighting === 2){
            winGame();
        }
        else{
            defeatMonster();
        }
    }

}
function dodge(){
    text.innerText = "You dodge "+ monster[fighting].name + " attacks."
}

function lose(){
    update(locations[5])
}

function defeatMonster(){
    gold += Math.floor(monster[fighting].level * 6.7)
    xp += monster[fighting].level
    goldText.innerText = gold
    xpText.innerText = xp
    update(locations[4])
}

function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    fighting;
    monsterHealth;
    inventory = ["stick"];
    goldText.innerText = gold
    xpText.innerText = xp
    healthText.innerText = health
    goTown();
}

function winGame(){
    update(locations[6])
}