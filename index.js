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
                    "gold coin":5,
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
    wolf:"W"
}
const itemIcon={
    goldCoin:"g",
    torch:"t"
}

/**
 * Info of the enemies
 */
const enemyInfo = {
    rat:{
        name:"Fat",
        race:"Rat",
        health: 21, 
        fullHealth:21,
        attack: 10, 
        defense: 1,
        icon: enemyIcon.rat,
        isBoss: false
    }
    // [ENEMY.RAT]: { health: 10, attack: 1, defense: 0, icon: ENEMY.RAT, race: "Rat", isBoss: false },
}
const itemInfo={
    goldCoin:{
    name:"gold coin",
    type:"currency",
    icon:itemIcon.goldCoin,
    },
    torch:{
        name:"torch",
        type:"miscllaneous",
        icon:itemIcon.torch,
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
                x: 20, 
                y: 15, 
                icon: c.gateHorizontal, 
                playerStart: { x: 21, y: 15 } 
            },
        ],
        enemies: [
            {x:16,
            y:17,
            info:enemyInfo.rat,
            drop:itemInfo.goldCoin,
            dropAmount:5,
            killed:false
            }
            // { type: ENEMY.RAT, x: 25, y: 15, name: "Rattata", ...ENEMY_INFO[ENEMY.RAT] },
        ],
        items: [
            {
                x:14,
                y:13,
                amount:1,
                info:itemInfo.goldCoin,
                collected:false
    
            },
            {
                x:11,
                y:18,
                amount:2,
                info:itemInfo.torch,
                collected:false
            }
        ]
        },
        [ROOM.B]: {
            layout: [13, 20, 17, 88],
            gates: [
                 { to: ROOM.A, 
                    x: 20, 
                    y: 15, 
                    icon: c.gateHorizontal, 
                    playerStart: { x: 19, y: 15 } 
                },
                { to: ROOM.C, 
                    x: 60, 
                    y: 13, 
                    icon: c.gateVertical, 
                    playerStart: { x: 60, y: 12 } 
                }
            ],
            enemies: [
                // { type: ENEMY.RAT, x: 25, y: 15, name: "Rattata", ...ENEMY_INFO[ENEMY.RAT] },
            ],
            items: [

            ]
        },
        [ROOM.C]: {
            layout: [6, 40, 13, 65],
            gates: [
                 { to: ROOM.B, 
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

function moveAll(yDiff, xDiff) {
    // ... use `move` to move all entities
    // ... show statistics with `showStats`
    // ... reload screen with `drawScreen`
}
function combat(who,room,moved,yDiff, xDiff){
    for(let i=0;i<room.enemies.length;i++) {
        if((who.x===room.enemies[i].x || who.x-1===room.enemies[i].x || who.x+1===room.enemies[i].x) && (who.y===room.enemies[i].y || who.y-1===room.enemies[i].y || who.y+1===room.enemies[i].y) && room.enemies[i].killed===false)
            showStats(who,room.enemies[i].info);
        else
            showStats(who);
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
                        addToInventory(GAME.player.inventory,[room.enemies[i].drop.name,room.enemies[i].dropAmount])
                            inventoryText.innerText=printTable(GAME.player.inventory)
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

    for(let i=0;i<room.items.length;i++){
        if((who.x===room.items[i].x || who.x-1===room.items[i].x || who.x+1===room.items[i].x) && (who.y===room.items[i].y || who.y-1===room.items[i].y || who.y+1===room.items[i].y) && room.items[i].collected===false)
        showStats(who,{},room.items[i].info,room.items[i].amount);
        else
        showStats(who);
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
    } 
}
}
function move(who, yDiff, xDiff) {
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
                    for(let i=0;i<GAME.map.A.gates.length;i++)
                        if(GAME.map.A.gates[i].x===who.x+xDiff && GAME.map.A.gates[i].y===who.y+yDiff && moved===false){
                            GAME.currentRoom=GAME.map.A.gates[i].to;
                            removeFromBoard(GAME.board,who)
                            GAME.player.x=GAME.map.A.gates[i].playerStart.x;
                            GAME.player.y=GAME.map.A.gates[i].playerStart.y;
                            drawScreen();
                        }
                        looting(who,GAME.map.A,moved,yDiff,xDiff);
                        combat(who,GAME.map.A,moved,yDiff,xDiff);
                                
                            
                    break;
        }
            case "B":{
                for(let i=0;i<GAME.map.B.gates.length;i++)
                if(GAME.map.B.gates[i].x===who.x+xDiff && GAME.map.B.gates[i].y===who.y+yDiff && moved===false){
                    GAME.currentRoom=GAME.map.B.gates[i].to;
                    removeFromBoard(GAME.board,who)
                    GAME.player.x=GAME.map.B.gates[i].playerStart.x;
                    GAME.player.y=GAME.map.B.gates[i].playerStart.y;
                    drawScreen();
                }
                looting(who,GAME.map.B,moved,yDiff,xDiff);
                combat(who,GAME.map.B,moved,yDiff,xDiff);
                break;
            }
            case "C":{
                for(let i=0;i<GAME.map.C.gates.length;i++)
                if(GAME.map.C.gates[i].x===who.x+xDiff && GAME.map.C.gates[i].y===who.y+yDiff){
                    GAME.currentRoom=GAME.map.C.gates[i].to;
                    removeFromBoard(GAME.board,who)
                    GAME.player.x=GAME.map.C.gates[i].playerStart.x;
                    GAME.player.y=GAME.map.C.gates[i].playerStart.y;
                    drawScreen();
                }
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
    board[item.y][item.x]=item.icon;
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
            if(enemies[i].killed===false){
                board[enemies[i].y][enemies[i].x]=enemies[i].info.icon;
            }
}

function showStats(player, enemies,items,amount) {
    let playerStats = "" // ...
    let enemyStats = "" // ... concatenate them with a newline
    let itemToolTip="";
    console.log(items);
    if(player!==undefined)
    playerStats+="Name: "+player.name+"\nRace: "+player.race+"\nHealth: "+player.health+"\nAttack: "+player.attack+"\nDefense:  "+player.defense;
    else
    playerStats="";
    if(enemies!==undefined)
        enemyStats+="Name: "+enemies.name+"\nRace: "+enemies.race+"\nHealth: "+enemies.health+"\nAttack: "+enemies.attack+"\nDefense:  "+enemies.defense;
    else
        enemyStats="";
        if(items!==undefined)
        itemToolTip+="aaa"//"Name: "+items.name+"\nAmount: "+amount;
        else
        itemToolTip="";
        _updateStats(playerStats, enemyStats,itemToolTip)
}

function _displayBoard(screen) {
    document.getElementById("screen").innerText = screen
}

function _updateStats(playerStatText, enemyStatText,itemText) {
    const playerStats = document.getElementById("playerStats")
    playerStats.innerText = playerStatText
    const enemyStats = document.getElementById("enemyStats")
    enemyStats.innerText = enemyStatText
    const itemToolTip = document.getElementById("itemToolTip")
    itemToolTip.innerText = itemText;
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
        }
        if (xDiff !== 0 || yDiff !== 0) {
            moveCB(yDiff, xDiff);
        }
        move(GAME.player,yDiff,xDiff)
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