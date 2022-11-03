"use strict";   
const c = Object.freeze({
    emptySpace: ' ',
    wall: '#',
    enemy: 'X',
    gateHorizontal: "\"",
    gateVertical: "=",
    boardWidth: 89,
    boardHeight: 24,
})

let GAME = {
    currentRoom: "",
    board: [],
    map: {},
    player: {},
}
function initPlayer(name, race) {
    switch (race) {
        case "Elf": {
            GAME.player.race = "Elf"
            return {
                x: 15,
                y: 15,
                name: name,
                icon: "|",
                race: race,
                health: 150,
                attack: 10,
                defense: 1,
                isPlayer: true,
                inventory:{
                    "Gold Coin":5,
                }
            }
        }
        case "Dwarf": {
            GAME.player.race = "Dwarf"
            return {
                x: 15,
                y: 15,
                name: name,
                icon: "&",
                race: race,
                health: 150,
                attack: 5,
                defense: 10,
                isPlayer: true,
                inventory:{
                    "torch":1,
                }
            }
        }
        case "Human": {
            GAME.player.race = "Human"
            return {
                x: 15,
                y: 15,
                name: name,
                icon: "@",
                race: race,
                health: 150,
                attack: 5,
                defense: 10,
                isPlayer: true,
                inventory:{
                    "torch":1,
                }
            }
        }
    }
}

const DIRECTIONS = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
]

/**
 * Enum for the rooms
 */
const ROOM = {
    A: "A",
    B: "B",
    C: "C",
    D: "D",
    E: "E",
}

/**
 * Icon of the enemies
 */
const enemyIcon= {
    rat: "R",
<<<<<<< HEAD
    wolf:"W",
    bat:"B"
}
const itemIcon={
    keyRoomB: "k",
=======
    wolf:"W"
}
const itemIcon={
>>>>>>> 1d2d675560e3957f3b3bace07bae8fca0d12c7dc
    goldCoin:"g",
    torch:"t",
    clothArmor:"c",
    healthPotion:"p",
    attackPotion:"a",
    defensePotion:"d"
}

/**
 * Info of the enemies
 */
const enemyInfo = {
<<<<<<< HEAD
    rat1:{
=======
    rat:{
>>>>>>> 1d2d675560e3957f3b3bace07bae8fca0d12c7dc
        name:"Fat",
        race:"Rat",
        health: 21, 
        fullHealth:21,
        attack: 10, 
        defense: 1,
        icon: enemyIcon.rat,
        isBoss: false
<<<<<<< HEAD
    },
    wolf1: {
        name: "Fluffy",
        race: "Wolf",
        health: 41,
        fullHealth: 41,
        attack: 15,
        defense: 3,
        icon: enemyIcon.wolf,
        isBoss: false,
      },
      bat1: {
        name: "Bob",
        race: "Bat",
        health: 31,
        fullHealth: 31,
        attack: 12,
        defense: 3,
        icon: enemyIcon.bat,
        isBoss: false,
      },
      bat2: {
        name: "Bob",
        race: "Bat",
        health: 31,
        fullHealth: 31,
        attack: 12,
        defense: 3,
        icon: enemyIcon.bat,
        isBoss: false,
      }
    // [ENEMY.RAT]: { health: 10, attack: 1, defense: 0, icon: ENEMY.RAT, race: "Rat", isBoss: false },
}
const itemInfo={
    keyRoomB:{
        name:"Mysterious Key",
        type:"key",
        icon:itemIcon.keyRoomB,
    },
=======
    }
    // [ENEMY.RAT]: { health: 10, attack: 1, defense: 0, icon: ENEMY.RAT, race: "Rat", isBoss: false },
}
const itemInfo={
>>>>>>> 1d2d675560e3957f3b3bace07bae8fca0d12c7dc
    torch:{
        name:"Torch",
        type:"miscellanoeus",
        icon:itemIcon.torch
    },
    goldCoin:{
    name:"Gold Coin",
    type:"currency",
    icon:itemIcon.goldCoin,
    },
    healthPotion:{
        name:"Health Potion",
        type:"potion",
        icon:itemIcon.healthPotion,
        stats:{
            health:5,
            attack:0,
            defense:0
        }
        },
    attackPotion:{
        name:"Attack Potion",
        type:"potion",
        icon:itemIcon.attackPotion,
        stats:{
            health:0,
            attack:5,
            defense:0
        }
        },
        defensePotion:{
            name:"Defense Potion",
            type:"potion",
            icon:itemIcon.defensePotion,
            stats:{
<<<<<<< HEAD
                health:0,
                attack:0,
                defense:5
=======
                    health:0,
                attack:0,
                dfense:5
>>>>>>> 1d2d675560e3957f3b3bace07bae8fca0d12c7dc
            }
        },
    clothArmor:{
        name:"Cloth Armor",
        type:"equipment",
        icon:itemIcon.clothArmor,
        stats:{
            health:10,
            attack:0,
            defense:1
        }
    }
}
function init() {
    GAME.currentRoom = ROOM.A;
    GAME.map = generateMap()
    GAME.board = createBoard(c.boardWidth, c.boardHeight, c.emptySpace)
    GAME.player = initPlayer(GAME.player.name, GAME.player.race)
    for(let value of Object.values(enemyInfo))
        value.health=value.fullHealth;
    showStats(GAME.player);
    drawScreen()
}

/**
 * Initialize the dungeon map and the items and enemies in it
 */
function generateMap() {
    return {
        [ROOM.A]: {
            
            layout: [10, 10, 20, 20],
            gates: [
                { to: ROOM.B, 
                requiresKey:"Mysterious Key",
                opened:false,
                x: 20, 
                y: 15, 
<<<<<<< HEAD
                icon: c.gateVertical, 
=======
                icon: c.gateHorizontal, 
>>>>>>> 1d2d675560e3957f3b3bace07bae8fca0d12c7dc
                playerStart: { x: 21, y: 15 } 
            },
        ],
        enemies: [
            {x:16,
            y:17,
<<<<<<< HEAD
            info:enemyInfo.rat1,
            drop:itemInfo.keyRoomB,
            dropAmount:1,
            killed:false
            },
            {
                x: 19,
                y: 15,
                info: enemyInfo.bat1,
                drop: itemInfo.goldCoin,
                dropAmount: 5,
                killed: false,
            },
            {
                x: 18,
                y: 12,
                info: enemyInfo.wolf1,
                drop: itemInfo.goldCoin,
                dropAmount: 5,
                killed: false,
              }
=======
            info:enemyInfo.rat,
            drop:itemInfo.goldCoin,
            dropAmount:5,
            killed:false
            }
>>>>>>> 1d2d675560e3957f3b3bace07bae8fca0d12c7dc
            // { type: ENEMY.RAT, x: 25, y: 15, name: "Rattata", ...ENEMY_INFO[ENEMY.RAT] },
        ],
        items: [
            {
                x:14,
                y:13,
                amount:1,
                info:itemInfo.clothArmor,
                collected:false
<<<<<<< HEAD
=======

>>>>>>> 1d2d675560e3957f3b3bace07bae8fca0d12c7dc
            },
            {
                x:11,
                y:18,
                amount:2,
<<<<<<< HEAD
                info:itemInfo.defensePotion,
=======
                info:itemInfo.healthPotion,
>>>>>>> 1d2d675560e3957f3b3bace07bae8fca0d12c7dc
                collected:false
            }
        ]
        },
        [ROOM.B]: {
            layout: [13, 20, 17, 88],
            gates: [
                 { to: ROOM.A, 
<<<<<<< HEAD
                    requiresKey:false,
                    opened:true,
=======
>>>>>>> 1d2d675560e3957f3b3bace07bae8fca0d12c7dc
                    x: 20, 
                    y: 15, 
                    icon: c.gateVertical, 
                    playerStart: { x: 19, y: 15 } 
                },
                { to: ROOM.C, 
                    opened:true,
                    x: 60, 
                    y: 13, 
                    icon: c.gateHorizontal, 
<<<<<<< HEAD
=======
                    playerStart: { x: 19, y: 15 } 
                },
                { to: ROOM.C, 
                    x: 60, 
                    y: 13, 
                    icon: c.gateVertical, 
>>>>>>> 1d2d675560e3957f3b3bace07bae8fca0d12c7dc
                    playerStart: { x: 60, y: 12 } 
                }
            ],
            enemies: [
<<<<<<< HEAD
                {
                    x: 35,
                    y: 15,
                    info: enemyInfo.bat2,
                    drop: itemInfo.attackPotion,
                    dropAmount: 1,
                    killed: false,
                  }
                // { type: ENEMY.RAT, x: 25, y: 15, name: "Rattata", ...ENEMY_INFO[ENEMY.RAT] },
            ],
            items: [
                {
                    x:39,
                    y:15,
                    amount:1,
                    info:itemInfo.attackPotion,
                    collected:false
                },
                {
                    x:44,
                    y:14,
                    amount:3,
                    info:itemInfo.healthPotion,
                    collected:false
                }
            ]
        },
        [ROOM.C]: {
            requiresKey:true,
            layout: [6, 40, 13, 65],
            gates: [
                 { to: ROOM.B, 
                    opened:true,
=======
                // { type: ENEMY.RAT, x: 25, y: 15, name: "Rattata", ...ENEMY_INFO[ENEMY.RAT] },
            ],
            items: [

            ]
        },
        [ROOM.C]: {
            layout: [6, 40, 13, 65],
            gates: [
                 { to: ROOM.B, 
>>>>>>> 1d2d675560e3957f3b3bace07bae8fca0d12c7dc
                    x: 60, 
                    y: 13, 
                    icon: c.gateHorizontal, 
                    playerStart: { x: 60, y: 14 } },
            ],
            enemies: [
                // { type: ENEMY.RAT, x: 25, y: 15, name: "Rattata", ...ENEMY_INFO[ENEMY.RAT] },
            ],
            items: []
        }
    }
}
 function displayBoard(board) {
    let screen = "" // ...
    board.forEach((row)=>{
        row.forEach((element)=>{
            screen+=element;
        });
        screen+="\n";
    });
    _displayBoard(screen)
}

function drawScreen() {
    // ... reset the board with `createBoard`
    GAME.board=createBoard(c.boardWidth, c.boardHeight, c.emptySpace);
    if(GAME.currentRoom===ROOM.A)
        drawRoom(GAME.board,GAME.map.A.layout[0],GAME.map.A.layout[1],GAME.map.A.layout[2],GAME.map.A.layout[3],GAME.map.A.gates,GAME.map.A.items,GAME.map.A.enemies)
    if(GAME.currentRoom===ROOM.B)
        drawRoom(GAME.board,GAME.map.B.layout[0],GAME.map.B.layout[1],GAME.map.B.layout[2],GAME.map.B.layout[3],GAME.map.B.gates,GAME.map.B.items,GAME.map.B.enemies)
    if(GAME.currentRoom===ROOM.C)
        drawRoom(GAME.board,GAME.map.C.layout[0],GAME.map.C.layout[1],GAME.map.C.layout[2],GAME.map.C.layout[3],GAME.map.C.gates,GAME.map.C.items,GAME.map.C.enemies)
    addToBoard(GAME.board,GAME.player)
    displayBoard(GAME.board)
}
function moveAI(who){
    let yDiff=Math.floor(Math.random() * 3)
    let xDiff=Math.floor(Math.random() * 3)
    if(yDiff===2)
    yDiff=-1;
    if(xDiff===2)
    xDiff=-1;
    for(let i=0;who.length;i++){
        if(GAME.board[who[i].y+yDiff][who[i].x+xDiff]===c.emptySpace && who[i].killed===false){
            removeFromBoard(GAME.board,who[i]);
            who[i].x+=xDiff;
            who[i].y+=yDiff;
            addToBoard(GAME.board,who[i]);
            displayBoard(GAME.board);
        }
    }
}
function moveAll(yDiff, xDiff) {
    // ... use `move` to move all entities
    // ... show statistics with `showStats`
    // ... reload screen with `drawScreen`
    // for(let i=0;i<enemies.length,i++)
<<<<<<< HEAD
    move(GAME.player,yDiff,xDiff);
    // switch(GAME.currentRoom){
    //     case "A":{
    //         moveAI(GAME.map.A.enemies)
    //         break;
    //     }
    //     case "B":{
    //         moveAI(GAME.map.B.enemies)
    //         break;
    //     }
    //     case "C":{
    //         moveAI(GAME.map.C.enemies)
    //         break;
    //     }
    // }
}
function combat(who,room,moved,yDiff, xDiff){
    let show=false;
    for(let i=0;i<room.enemies.length;i++) {
        if((who.x===room.enemies[i].x || who.x-1===room.enemies[i].x || who.x+1===room.enemies[i].x) && (who.y===room.enemies[i].y || who.y-1===room.enemies[i].y || who.y+1===room.enemies[i].y) && room.enemies[i].killed===false){
            showStats(who,room.enemies[i].info);
            show=true;
    }
        else
            if(show===false)
                showStats(who);
=======
    move(GAME.player,yDiff,xDiff)
    switch(GAME.currentRoom){
        case "A":{
            moveAI(GAME.map.A.enemies)
            break;
        }
        case "B":{
            moveAI(GAME.map.B.enemies)
            break;
        }
        case "C":{
            moveAI(GAME.map.C.enemies)
            break;
        }
    }
}
function combat(who,room,moved,yDiff, xDiff){
    for(let i=0;i<room.enemies.length;i++) {
        if((who.x===room.enemies[i].x || who.x-1===room.enemies[i].x || who.x+1===room.enemies[i].x) && (who.y===room.enemies[i].y || who.y-1===room.enemies[i].y || who.y+1===room.enemies[i].y) && room.enemies[i].killed===false)
            showStats(who,room.enemies[i].info);
        else
            showStats(who);
>>>>>>> 1d2d675560e3957f3b3bace07bae8fca0d12c7dc
        if(room.enemies[i].x===who.x+xDiff && room.enemies[i].y===who.y+yDiff && room.enemies[i].killed===false && moved===false){    
            if(who.attack-room.enemies[i].info.defense>0)
                room.enemies[i].info.health-=who.attack-room.enemies[i].info.defense;
            if(room.enemies[i].info.attack>who.defense)
                who.health-=room.enemies[i].info.attack-who.defense;
                if(room.enemies[i].info.health<=0){
                    room.enemies[i].info.health=0;
                    room.enemies[i].killed=true;
                    removeFromBoard(GAME.board,who);
                    removeFromBoard(GAME.board,room.enemies[i])
                    who.y+=yDiff;
                    who.x+=xDiff;
                    addToBoard(GAME.board,who);
                    displayBoard(GAME.board);
                    showStats(who);
                    if(room.enemies[i].drop!==undefined){
<<<<<<< HEAD
                        
=======
>>>>>>> 1d2d675560e3957f3b3bace07bae8fca0d12c7dc
                        addToInventory(GAME.player.inventory,[room.enemies[i].drop.name,room.enemies[i].dropAmount])
                        inventoryText.innerText=printTable(GAME.player.inventory)
                        if(room.enemies[i].drop.type==="equipment")
                            statIncrease(room.enemies[i].drop.stats)
<<<<<<< HEAD
                            _displayMessage("The enemy dropped "+room.enemies[i].drop.name)
=======
>>>>>>> 1d2d675560e3957f3b3bace07bae8fca0d12c7dc
                    }
                }
                else
                    if(who.health<=0){
                        showStats();
                        GAME.board=createBoard(c.boardWidth, c.boardHeight, c.emptySpace);
                        displayBoard(GAME.board)
                        _gameOver();
                    }
                    else
                        showStats(who,GAME.map.A.enemies[i].info)
                }
            }
}
function looting(who,room,moved,yDiff, xDiff){
<<<<<<< HEAD
    let show=false;
    for(let i=0;i<room.items.length;i++){
        if((who.x===room.items[i].x || who.x-1===room.items[i].x || who.x+1===room.items[i].x) && (who.y===room.items[i].y || who.y-1===room.items[i].y || who.y+1===room.items[i].y) && room.items[i].collected===false){
        _showItemsTooltip(room.items[i].info,room.items[i].amount);
        show=true;
        }
    else{
        if(show===false)
            _showItemsTooltip();
    }
=======
    for(let i=0;i<room.items.length;i++){
>>>>>>> 1d2d675560e3957f3b3bace07bae8fca0d12c7dc
    if(room.items[i].x===who.x+xDiff && room.items[i].y===who.y+yDiff && room.items[i].collected===false && moved===false){
        GAME.map.A.items[i].collected=true;
        removeFromBoard(GAME.board,who);
        removeFromBoard(GAME.board,room.items[i])
        who.y+=yDiff;
        who.x+=xDiff;
        addToBoard(GAME.board,who);
        displayBoard(GAME.board);
        addToInventory(GAME.player.inventory,[room.items[i].info.name,room.items[i].amount])
        inventoryText.innerText=printTable(GAME.player.inventory)
        if(room.items[i].info.type==="equipment")
            statIncrease(room.items[i].info.stats)
<<<<<<< HEAD
        _showItemsTooltip();
         _displayMessage("You pciked up "+room.items[i].info.name)
    }
}
}
function gates(who,room,moved,yDiff,xDiff){
    for(let i=0;i<room.gates.length;i++)
    if(room.gates[i].x===who.x+xDiff && room.gates[i].y===who.y+yDiff && moved===false){
        
        if(foundInInventory(GAME.player.inventory,room.gates[i].requiresKey)===true || room.gates[i].opened===true){
            removeFromInventory(GAME.player.inventory,[room.gates[i].requiresKey,1])
            inventoryText.innerText=printTable(GAME.player.inventory);
            GAME.player.inventory,room.gates[i].opened=true;
            GAME.currentRoom=room.gates[i].to;
            removeFromBoard(GAME.board,who);
            GAME.player.x=room.gates[i].playerStart.x;
            GAME.player.y=room.gates[i].playerStart.y;
            drawScreen();
        }
        else{
            _displayMessage("You need a key to open this door!")

        }
    }
}
function move(who, yDiff, xDiff) {
    _displayMessage("")
=======

    } 
}
}
function gates(who,room,moved,yDiff,xDiff){
    for(let i=0;i<room.gates.length;i++)
    if(room.gates[i].x===who.x+xDiff && room.gates[i].y===who.y+yDiff && moved===false){
        GAME.currentRoom=room.gates[i].to;
        removeFromBoard(GAME.board,who);
        GAME.player.x=room.gates[i].playerStart.x;
        GAME.player.y=room.gates[i].playerStart.y;
        drawScreen();
    }
}
function move(who, yDiff, xDiff) {
>>>>>>> 1d2d675560e3957f3b3bace07bae8fca0d12c7dc
    let moved=false;
    if(GAME.board[who.y+yDiff][who.x+xDiff]===c.emptySpace){
        removeFromBoard(GAME.board,who)
        who.y+=yDiff;
        who.x+=xDiff;
        addToBoard(GAME.board,who);
        displayBoard(GAME.board);
        moved=true;
    }
        switch(GAME.currentRoom){
            case "A":{
                gates(who,GAME.map.A,moved,yDiff,xDiff);
                looting(who,GAME.map.A,moved,yDiff,xDiff);
                combat(who,GAME.map.A,moved,yDiff,xDiff);
                break;
            }
            case "B":{
                gates(who,GAME.map.B,moved,yDiff,xDiff);
                looting(who,GAME.map.B,moved,yDiff,xDiff);
                combat(who,GAME.map.B,moved,yDiff,xDiff);
                break;
            }
            case "C":{
                gates(who,GAME.map.C,moved,yDiff,xDiff);
                looting(who,GAME.map.C,moved,yDiff,xDiff);
                combat(who,GAME.map.C,moved,yDiff,xDiff);
                break;
            }
        }
}

function hit(board, y, x) {
    // ...
    
}

function addToBoard(board,item) {
    // ...
    if(item.icon!==undefined)
    board[item.y][item.x]=item.icon;
    else
        board[item.y][item.x]=item.info.icon;
}

function removeFromBoard(board, item) {
    // ...
    board[item.y][item.x]=c.emptySpace;
}

function createBoard(width, height, emptySpace) {
    // ...
    let matrix=[];
    for(let i=0;i<height;i++){
        matrix[i]=[];
        for(let j=0;j<width;j++)
        matrix[i][j]=emptySpace;
    }
    return matrix;
}

function drawRoom(board, topY, leftX, bottomY, rightX,allGates,items,enemies) {
    // ...
        for(let j=leftX;j<=rightX;j++){
            board[topY][j]=c.wall;
            board[bottomY][j]=c.wall;
        }
        for(let j=topY;j<=bottomY;j++){
            board[j][leftX]=c.wall;
            board[j][rightX]=c.wall;
        }
        for(let i=0;i<allGates.length;i++)
            board[allGates[i].y][allGates[i].x]=allGates[i].icon;
        for(let i=0;i<items.length;i++)
            if(items[i].collected===false)
                board[items[i].y][items[i].x]=items[i].info.icon;
        for(let i=0;i<enemies.length;i++)
<<<<<<< HEAD
            if(enemies[i].killed===false){  
=======
            if(enemies[i].killed===false){
>>>>>>> 1d2d675560e3957f3b3bace07bae8fca0d12c7dc
                    board[enemies[i].y][enemies[i].x]=enemies[i].info.icon;
            }
}

function showStats(player, enemies) {
    let playerStats = "" // ...
    let enemyStats = "" // ... concatenate them with a newline
    if(player!==undefined)
        playerStats+="Name: "+player.name+"\nRace: "+player.race+"\nHealth: "+player.health+"\nAttack: "+player.attack+"\nDefense:  "+player.defense;
    else
        playerStats="";
    if(enemies!==undefined)
        enemyStats+="Name: "+enemies.name+"\nRace: "+enemies.race+"\nHealth: "+enemies.health+"\nAttack: "+enemies.attack+"\nDefense:  "+enemies.defense;
    else
        enemyStats="";
<<<<<<< HEAD
    _updateStats(playerStats, enemyStats)
=======
    _updateStats(playerStats, enemyStats,itemToolTip)
>>>>>>> 1d2d675560e3957f3b3bace07bae8fca0d12c7dc
}

function _displayBoard(screen) {
    document.getElementById("screen").innerText = screen
}

function _updateStats(playerStatText, enemyStatText) {
    const playerStats = document.getElementById("playerStats")
    playerStats.innerText = playerStatText
    const enemyStats = document.getElementById("enemyStats")
    enemyStats.innerText = enemyStatText;
<<<<<<< HEAD
}
function _showItemsTooltip(items,amount){
    let itemText="";
    if(items!==undefined)
    itemText+="Name: "+items.name+"\nType: "+items.type+"\nAmount: "+amount;
    else
    itemText="";
    const itemToolTip = document.getElementById("itemToolTip")
    console.log("hello")
    itemToolTip.innerText=itemText;
}
function _displayMessage(message){
    let messageText = document.getElementById("message");
    messageText.innerText=message;
=======

>>>>>>> 1d2d675560e3957f3b3bace07bae8fca0d12c7dc
}
/**
 * Keep a reference of the existing keypress listener, to be able to remove it later
 */
let _keypressListener = null

/**
 * Code to run after the player ddecided to start the game.
 * Register the movement handler, and make sure that the boxes are hidden.
 * 
 * @param {function} moveCB callback to handle movement of all entities in the room
 */
 const inventoryText=document.getElementById("inventory")
function _start(moveCB) {
    const msgBox = document.getElementById("startBox")
    const endBox = document.getElementById("endBox")
    endBox.classList.add("is-hidden")
    GAME.player.name = document.getElementById("playerName").value
    GAME.player.race = document.getElementById("playerRace").value
    msgBox.classList.toggle("is-hidden")
    _keypressListener = (e) => {
        let xDiff = 0
        let yDiff = 0
        switch (e.key.toLocaleLowerCase()) {
            case 'w': { yDiff = -1; xDiff = 0; break; }
            case 's': { yDiff = 1; xDiff = 0; break; }
            case 'a': { yDiff =0; xDiff = -1; break; }
            case 'd': { yDiff = 0; xDiff = 1; break; }
            case 'i': { inventoryText.classList.toggle("is-hidden"); inventoryText.innerText=printTable(GAME.player.inventory); break;}
<<<<<<< HEAD
            case '1': { 
                if(foundInInventory(GAME.player.inventory,"Health Potion")){
                    removeFromInventory(GAME.player.inventory,["Health Potion",1]);
                    inventoryText.innerText=printTable(GAME.player.inventory);
                    statIncrease(itemInfo.healthPotion.stats);
                    showStats(GAME.player);
                    _displayMessage("You used Health Potion")
                }
                break;}
            case '2': {
                if(foundInInventory(GAME.player.inventory,"Attack Potion")){
                    removeFromInventory(GAME.player.inventory,["Attack Potion",1]);
                    inventoryText.innerText=printTable(GAME.player.inventory); 
                    statIncrease(itemInfo.attackPotion.stats); 
                    showStats(GAME.player);
                    _displayMessage("You used Attack Potion")
                    }
                    break;}
            case '3': {
                if(foundInInventory(GAME.player.inventory,"Defense Potion")){
                    removeFromInventory(GAME.player.inventory,["Defense Potion",1]);
                    inventoryText.innerText=printTable(GAME.player.inventory);
                    statIncrease(itemInfo.defensePotion.stats);
                    showStats(GAME.player);
                    _displayMessage("You used Defense Potion")
                }
                break;}
=======
            case '1': { if(foundInInventory(GAME.player.inventory,"Health Potion")) {removeFromInventory(GAME.player.inventory,["Health Potion",1]); inventoryText.innerText=printTable(GAME.player.inventory); statIncrease(itemInfo.healthPotion.stats); showStats(GAME.player);} break;}
            case '2': {if(foundInInventory(GAME.player.inventory,"Attack Potion")) {removeFromInventory(GAME.player.inventory,["Attack Potion",1]); inventoryText.innerText=printTable(GAME.player.inventory); statIncrease(itemInfo.attackPotion.stats); showStats(GAME.player);} break;}
            case '3': {if(foundInInventory(GAME.player.inventory,"Defense Potion")) {removeFromInventory(GAME.player.inventory,["Defense Potion",1]); inventoryText.innerText=printTable(GAME.player.inventory); statIncrease(itemInfo.defensePotion.stats); showStats(GAME.player);} break;}
>>>>>>> 1d2d675560e3957f3b3bace07bae8fca0d12c7dc
        }
        if (xDiff !== 0 || yDiff !== 0) {
            moveCB(yDiff, xDiff);
        }

    }
    document.addEventListener("keypress", _keypressListener)
    init();
}

function _gameOver() {
    const msgBox = document.getElementById("startBox")
    msgBox.classList.add("is-hidden")
    const endBox = document.getElementById("endBox")
    endBox.classList.remove("is-hidden")
    if (_keypressListener) {
        document.removeEventListener("keypress", _keypressListener)
    }
}

function _restart() {
    const msgBox = document.getElementById("startBox")
    msgBox.classList.remove("is-hidden")
    const endBox = document.getElementById("endBox")
    endBox.classList.add("is-hidden")
    //init();
}

//Inventory functionality



function addToInventory(inventory, addedItems) {
    let copy=[];
    for( let [key,value] of Object.entries(inventory)){
        for(let i=0;i<addedItems.length;i+=2){
            addedItems[i+1]=parseInt(addedItems[i+1]);
            copy.push(addedItems[i]);
            copy.push(parseInt(addedItems[i+1]));
            if(key===copy[i]){
                copy[i+1]+=value;
                inventory[key]=copy[i+1];
            }
            else{
                inventory[copy[i]]=parseInt(copy[i+1]);
            }
        }
    }
}
/**
 * Remove from the inventory dictionary a list of items from removedItems.
 */
function removeFromInventory(inventory, removedItems) {
    for( let [key,value] of Object.entries(inventory)){
        for(let i=0;i<removedItems.length;i+=2)
            if(key===removedItems[i]){
                    if(value-removedItems[i+1]>0){
                        value-=removedItems[i+1];
                        inventory[key]=value;
                    }
                    else{
                        delete inventory[key];
                    }
            }
    }
}

/**
 * Display the contents of the inventory in an ordered, well-organized table with each column right-aligned.
 */
function printTable(inventory, order) {
    let shownInventory=""
    shownInventory+="-----------------\n";
    shownInventory+="item name | count\n";
    let sortable = [];
    for (var item in inventory) 
        sortable.push([item, inventory[item]]);
    if(order==="count,desc")
        sortable.sort((a,b)=> {
            if( a[1]< b[1]) return 1;
            if( a[1]> b[1]) return -1;
            return 0;
        });
     else
        if(order==="count,asc")
            sortable.sort((a,b)=> {
                if( a[1]< b[1]) return -1;
                if( a[1]> b[1]) return 1;
                return 0;
            });
    shownInventory+="-----------------\n";
    for(let i=0;i<sortable.length;i++){
        let iRow="";
        if(sortable[i][0].length<9)
            for(let j=0;j<9-sortable[i][0].length;j++)
                iRow+=" ";
        iRow+=sortable[i][0];
        iRow+=" | "
        if(sortable[i][1].toString().length<5)
            for(let j=0;j<5-sortable[i][1].toString().length;j++)
                iRow+=" ";
        iRow+=sortable[i][1];
        shownInventory+=iRow+"\n";
    }
    shownInventory+="-----------------\n";
    return shownInventory;
}
function foundInInventory(inventory,item){
    for(let key of Object.keys(inventory)){
        if(key===item)
            return true;
    }
    return false;
}
function statIncrease(stats){
    GAME.player.health+=stats.health;
    GAME.player.attack+=stats.attack;
    GAME.player.defense+=stats.defense;
}