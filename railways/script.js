// SELECTORS
const menuDiv = document.querySelector('#menu')
const playScreen = document.querySelector('#playScreen')
const completionMessage = document.querySelector('#completionMessage')
menuDiv.style.display = 'block'
playScreen.style.display = 'none'
completionMessage.style.display = 'none'

// MENU SELECTORS
const nameInput = menuDiv.querySelector('input')
const rulesButton = menuDiv.querySelector('button.btn-primary')
const startButton = menuDiv.querySelector('button.btn-secondary')
const difficultyButtons = {
    '5x5': document.querySelector('#b1'),
    '7x7': document.querySelector('#b2')
}
const rules = menuDiv.querySelector('#rules')
const table = playScreen.querySelector('table')
const closeButton = completionMessage.querySelector('#close')

let gridSize = 5
let gridMatrix = []
let timeElapsed = 0
let timerInterval
startButton.disabled = true
rules.style.display = 'none'

//MAPS, TILES AND RAILS
const maps = [
    [
        ['EMPTY', 'CURVE1', 'EMPTY', 'EMPTY', 'OASIS'],
        ['EMPTY', 'EMPTY', 'EMPTY', 'BRIDGE', 'OASIS'],
        ['BRIDGE', 'EMPTY', 'CURVE2', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'EMPTY', 'OASIS', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'CURVE3', 'EMPTY', 'EMPTY']
    ],
    [
        ['OASIS', 'EMPTY', 'BRIDGEHOR', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'CURVE2', 'EMPTY', 'EMPTY', 'CURVE2'],
        ['BRIDGE', 'OASIS', 'CURVE3', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'EMPTY', 'OASIS', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY']
    ],
    [
        ['EMPTY', 'EMPTY', 'BRIDGEHOR', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'BRIDGE'],
        ['EMPTY', 'CURVE2', 'BRIDGE', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'OASIS', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'BRIDGEHOR', 'EMPTY', 'EMPTY', 'CURVE2']
    ],
    [
        ['EMPTY', 'CURVE1', 'OASIS', 'OASIS', 'EMPTY', 'BRIDGEHOR', 'EMPTY'],
        ['BRIDGE', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'BRIDGE', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'EMPTY', 'CURVE3', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['CURVE3', 'EMPTY', 'CURVE1', 'EMPTY', 'BRIDGEHOR', 'EMPTY', 'OASIS'],
        ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'EMPTY', 'BRIDGEHOR', 'EMPTY', 'EMPTY', 'EMPTY']
    ],
    [
        ['EMPTY', 'EMPTY', 'OASIS', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['BRIDGE', 'EMPTY', 'BRIDGEHOR', 'EMPTY', 'EMPTY', 'CURVE2', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'BRIDGEHOR', 'EMPTY', 'EMPTY', 'EMPTY', 'BRIDGE'],
        ['MOUNTAIN', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'OASIS', 'EMPTY', 'CURVE1', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'MOUNTAIN', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'OASIS', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY']
    ],
    [
        ['EMPTY', 'EMPTY', 'BRIDGEHOR', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'BRIDGE'],
        ['OASIS', 'EMPTY', 'CURVE3', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
        ['EMPTY', 'OASIS', 'CURVE3', 'EMPTY', 'BRIDGEHOR', 'EMPTY', 'EMPTY'],
        ['BRIDGE', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'CURVE1', 'EMPTY'],
        ['EMPTY', 'EMPTY', 'OASIS', 'CURVE3', 'EMPTY', 'EMPTY', 'EMPTY']
    ]
]

const mapSolution = [
    [
        ['RAIL1', 'CURVE1SOL', 'RAIL1', 'RAIL2', 'OASIS'],
        ['STRAIGHT', 'STRAIGHT', 'STRAIGHT', 'BRIDGESOL', 'OASIS'],
        ['BRIDGESOL', 'RAIL4', 'CURVE2SOL', 'RAIL4', 'RAIL2'],
        ['STRAIGHT', 'RAIL1', 'RAIL2', 'OASIS', 'STRAIGHT'],
        ['RAIL4', 'RAIL3', 'CURVE3SOL', 'RAIL5', 'RAIL3']
    ],
    [
        ['OASIS', 'RAIL1', 'BRIDGEHORSOL', 'RAIL5', 'RAIL2'],
        ['RAIL1', 'CURVE2SOL', 'RAIL1', 'RAIL5', 'CURVE2SOL'],
        ['BRIDGESOL', 'OASIS', 'CURVE3SOL', 'RAIL5', 'RAIL2'],
        ['STRAIGHT', 'RAIL1', 'RAIL2', 'OASIS', 'STRAIGHT'],
        ['RAIL4', 'RAIL3', 'RAIL4', 'RAIL5', 'RAIL3']
    ],
    [
        ['RAIL1', 'RAIL5', 'BRIDGEHORSOL', 'RAIL5', 'RAIL2'],
        ['RAIL4', 'RAIL2', 'RAIL1', 'RAIL2', 'BRIDGESOL'],
        ['RAIL1', 'CURVE2SOL', 'BRIDGESOL', 'RAIL4', 'RAIL3'],
        ['STRAIGHT', 'OASIS', 'RAIL4', 'RAIL5', 'RAIL2'],
        ['RAIL4', 'BRIDGEHORSOL', 'RAIL5', 'RAIL5', 'CURVE2SOL']
    ],
    [
        ['RAIL1', 'RAIL2', 'OASIS', 'RAIL1', 'RAIL2', 'RAIL1', 'RAIL2'],
        ['BRIDGESOL', 'RAIL4', 'BRIDGEHORSOL', 'RAIL3', 'RAIL4', 'CURVE2SOL', 'STRAIGHT'],
        ['RAIL4', 'RAIL5', 'BRIDGEHORSOL', 'RAIL2', 'RAIL1', 'RAIL2', 'BRIDGESOL'],
        ['MOUNTAINSOL', 'RAIL5', 'RAIL5', 'RAIL3', 'STRAIGHT', 'RAIL4', 'RAIL3'],
        ['STRAIGHT', 'OASIS', 'RAIL1', 'CURVE1SOL', 'RAIL4', 'RAIL5', 'RAIL2'],
        ['STRAIGHT', 'MOUNTAINSOL', 'RAIL3', 'STRAIGHT', 'RAIL1', 'RAIL2', 'STRAIGHT'],
        ['RAIL4', 'RAIL3', 'OASIS', 'RAIL4', 'RAIL3', 'RAIL4', 'RAIL3']
    ],
    [
        ['RAIL1', 'RAIL5', 'BRIDGEHORSOL', 'RAIL5', 'RAIL2', 'RAIL1', 'RAIL2'],
        ['RAIL4', 'RAIL2', 'RAIL1', 'RAIL5', 'RAIL3', 'STRAIGHT', 'BRIDGESOL'],
        ['OASIS', 'STRAIGHT', 'CURVE3SOL', 'RAIL5', 'RAIL5', 'RAIL3', 'STRAIGHT'],
        ['RAIL1', 'RAIL3', 'RAIL1', 'RAIL5', 'RAIL5', 'RAIL5', 'RAIL3'],
        ['STRAIGHT', 'OASIS', 'CURVE3SOL', 'RAIL5', 'BRIDGEHORSOL', 'RAIL5', 'RAIL2'],
        ['BRIDGESOL', 'RAIL1', 'RAIL5', 'RAIL2', 'RAIL1', 'CURVE1SOL', 'STRAIGHT'],
        ['RAIL4', 'RAIL3', 'OASIS', 'CURVE3SOL', 'RAIL3', 'RAIL4', 'RAIL3']
    ],
    [
        ['RAIL1', 'CURVE1SOL', 'OASIS', 'OASIS', 'RAIL1', 'BRIDGEHORSOL', 'RAIL2'],
        ['BRIDGESOL', 'STRAIGHT', 'RAIL1', 'RAIL2', 'STRAIGHT', 'RAIL1', 'RAIL3'],
        ['STRAIGHT', 'STRAIGHT', 'BRIDGESOL', 'STRAIGHT', 'STRAIGHT', 'RAIL4', 'RAIL2'],
        ['STRAIGHT', 'RAIL4', 'RAIL3', 'CURVE3SOL', 'RAIL3', 'RAIL1', 'RAIL3'],
        ['CURVE3SOL', 'RAIL5', 'CURVE1SOL', 'RAIL1', 'BRIDGEHORSOL', 'RAIL3', 'OASIS'],
        ['RAIL1', 'RAIL5', 'RAIL3', 'RAIL4', 'RAIL5', 'RAIL5', 'RAIL2'],
        ['RAIL4', 'RAIL5', 'RAIL5', 'BRIDGEHORSOL', 'RAIL5', 'RAIL5', 'RAIL3']
    ]
    
]

const TILE_TYPE = {
    EMPTY: 'EMPTY',
    BRIDGE: 'BRIDGE',
    BRIDGEHOR: 'BRIDGEHOR',
    OASIS: 'OASIS',
    MOUNTAIN: 'MOUNTAIN',
    CURVE1: 'CURVE1',
    CURVE2: 'CURVE2',
    CURVE3: 'CURVE3'
}

const RAIL_SOLUTIONS = {
    STRAIGHT: 'STRAIGHT',
    BRIDGESOL: 'BRIDGESOL',
    BRIDGEHORSOL: 'BRIDGEHORSOL',
    CURVE1SOL: 'CURVE1SOL',
    CURVE2SOL: 'CURVE2SOL',
    CURVE3SOL: 'CURVE3SOL',
    RAIL1: 'RAIL1',
    RAIL2: 'RAIL2',
    RAIL3: 'RAIL3',
    RAIL4: 'RAIL4',
    RAIL5: 'RAIL5',
    MOUNTAINSOL: 'MOUNTAINSOL'
}

// EVENT HANDLERS
nameInput.addEventListener('input', (e) => {
    startButton.disabled = e.target.value === '' || !gridSize
})

startButton.addEventListener('click', startGame)

rulesButton.addEventListener('click', () => {
    rules.style.display = rules.style.display === 'block' ? 'none' : 'block'
})

difficultyButtons['5x5'].addEventListener('click', () => setDifficulty(5))
difficultyButtons['7x7'].addEventListener('click', () => setDifficulty(7))



// HELPER FUNCTIONS
function setDifficulty(size) {
    gridSize = size
    startButton.disabled = nameInput.value === ''
    highlightButton(size)
    gridSetup()
    gridMap()
}

function highlightButton(size) {
    difficultyButtons['5x5'].style.backgroundColor = ''
    difficultyButtons['7x7'].style.backgroundColor = ''
    if (size === 5) {
        difficultyButtons['5x5'].style.backgroundColor = '#4CAF50' 
    } else {
        difficultyButtons['7x7'].style.backgroundColor = '#4CAF50'  
    }
}

function gridSetup() {
    const randomMap = getRandomMap()
    gridMatrix = randomMap
}

function getRandomMap() {
    const sizeMap = maps.filter(map => map.length === gridSize)
    const randomIndex = Math.floor(Math.random() * sizeMap.length)
    return sizeMap[randomIndex] 
}

function gridMap() {
    table.innerHTML = ''
    for (let i = 0; i < gridSize; i++) {
        const row = document.createElement('tr')
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('td')
            const img = document.createElement('img')
            img.src = getMapTile(gridMatrix[i][j])
            cell.append(img)
            cell.addEventListener('click', () => {
                cellClick(i, j)
                img.src = getImage(gridMatrix[i][j])
            })
            row.append(cell)
        }
        table.append(row)
    }
}

function getImage(tiles) {
    if (tiles === RAIL_SOLUTIONS.STRAIGHT || 
        tiles === RAIL_SOLUTIONS.BRIDGESOL ||
        tiles === RAIL_SOLUTIONS.BRIDGEHORSOL ||
        tiles === RAIL_SOLUTIONS.CURVE1SOL ||
        tiles === RAIL_SOLUTIONS.CURVE2SOL ||
        tiles === RAIL_SOLUTIONS.CURVE3SOL ||
        tiles === RAIL_SOLUTIONS.RAIL1 ||
        tiles === RAIL_SOLUTIONS.RAIL2 ||
        tiles === RAIL_SOLUTIONS.RAIL3 ||
        tiles === RAIL_SOLUTIONS.RAIL4 ||
        tiles === RAIL_SOLUTIONS.RAIL5 ||
        tiles === RAIL_SOLUTIONS.MOUNTAINSOL) {
        return getRail(tiles);
    } else {
        return getMapTile(tiles);
    }
}

function getMapTile(tiles) {
    switch (tiles) {
        case TILE_TYPE.BRIDGE:
            return '/tiles/bridge.png'
        case TILE_TYPE.OASIS:
            return '/tiles/oasis.png'
        case TILE_TYPE.MOUNTAIN:
            return '/tiles/mountain.png'
        case TILE_TYPE.BRIDGEHOR:
            return '/tiles/horizontal_bridge.png'
        case TILE_TYPE.CURVE1:
            return '/tiles/curve_btmleft.png'
        case TILE_TYPE.CURVE2:
            return '/tiles/curve_topleft.png'
        case TILE_TYPE.CURVE3:
            return '/tiles/curve_topright.png'
        default:
            return '/tiles/empty.png'
    }
}

function getRail(solutionType) {
    switch (solutionType) {
        case RAIL_SOLUTIONS.STRAIGHT:
            return '/rails/straight_rail.png'
        case RAIL_SOLUTIONS.BRIDGESOL:
            return '/rails/bridge_rail.png'
        case RAIL_SOLUTIONS.BRIDGEHORSOL:
            return '/rails/bridgehor_solved.png'
        case RAIL_SOLUTIONS.CURVE1SOL:
            return '/rails/curve1_solved.png'
        case RAIL_SOLUTIONS.CURVE2SOL:
            return '/rails/curve2_solved.png'
        case RAIL_SOLUTIONS.CURVE3SOL:
            return '/rails/curve3_solved.png'
        case RAIL_SOLUTIONS.RAIL1:
            return '/rails/curve_rail.png'
        case RAIL_SOLUTIONS.RAIL2:
            return '/rails/rail_btmleft.png'
        case RAIL_SOLUTIONS.RAIL3:
            return '/rails/rail_topleft.png'
        case RAIL_SOLUTIONS.RAIL4:
            return '/rails/rail_topright.png'
        case RAIL_SOLUTIONS.RAIL5:
            return '/rails/horizontal_rail.png'   
        case RAIL_SOLUTIONS.MOUNTAINSOL:
            return '/rails/mountain_rail.png'        
        default:
            return '/tiles/empty.png'
    }
}

function cellClick(row, col) {
    const cellType = gridMatrix[row][col]
    if (cellType === TILE_TYPE.OASIS) return

    switch (cellType) {
        case TILE_TYPE.CURVE1:
            gridMatrix[row][col] = RAIL_SOLUTIONS.CURVE1SOL
            break
        case TILE_TYPE.CURVE2:
            gridMatrix[row][col] = RAIL_SOLUTIONS.CURVE2SOL
            break
        case TILE_TYPE.CURVE3:
            gridMatrix[row][col] = RAIL_SOLUTIONS.CURVE3SOL
            break
        case TILE_TYPE.EMPTY:
            gridMatrix[row][col] = RAIL_SOLUTIONS.RAIL1
            break
        case TILE_TYPE.BRIDGE:
            gridMatrix[row][col] = RAIL_SOLUTIONS.BRIDGESOL
            break
        case TILE_TYPE.BRIDGEHOR:
            gridMatrix[row][col] = RAIL_SOLUTIONS.BRIDGEHORSOL
            break
        case TILE_TYPE.MOUNTAIN:
            gridMatrix[row][col] = RAIL_SOLUTIONS.MOUNTAINSOL
            break
        case RAIL_SOLUTIONS.RAIL1:
            gridMatrix[row][col] = RAIL_SOLUTIONS.RAIL2
            break
        case RAIL_SOLUTIONS.RAIL2:
            gridMatrix[row][col] = RAIL_SOLUTIONS.RAIL3
            break
        case RAIL_SOLUTIONS.RAIL3:
            gridMatrix[row][col] = RAIL_SOLUTIONS.RAIL4
            break
        case RAIL_SOLUTIONS.RAIL4:
            gridMatrix[row][col] = RAIL_SOLUTIONS.STRAIGHT
            break
        case RAIL_SOLUTIONS.STRAIGHT:
            gridMatrix[row][col] = RAIL_SOLUTIONS.RAIL5
            break
        case RAIL_SOLUTIONS.RAIL5:
            gridMatrix[row][col] = RAIL_SOLUTIONS.RAIL1
            break
    }

    if (completeGame()) {
        endGame();
    }
}

function completeGame() {
    for (let solution of mapSolution) {
        let isMatch = true
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (gridMatrix[i][j] !== solution[i][j]) {
                    isMatch = false
                    break
                }
            }
            if (!isMatch) break
        }
        if (isMatch) return true
    }
    return false
}

function endGame() {
    completionMessage.style.display = "flex"
    playScreen.style.display = "none"
    const minutes = Math.floor(timeElapsed / 60)
    const seconds = timeElapsed % 60
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const formattedTime = `${formattedMinutes}:${formattedSeconds}`
    completionMessage.querySelector('#congrats').innerHTML = `Congratulations, You've completed the game! it took you: ${formattedTime}`
    closeButton.addEventListener("click", () => {
        completionMessage.style.display = "none"
        playScreen.style.display = "none"
        menuDiv.style.display = "block"
    })
}



function startGame() {
    menuDiv.style.display = 'none'
    playScreen.style.display = 'block'
    playScreen.querySelector('#playerName').innerHTML = `NAME: ${nameInput.value}`
    gridMap()
    timeElapsed = 0
    updateElapsedTime()
    timerInterval = setInterval(updateTime, 1000)
}

function updateTime() {
    timeElapsed++
    updateElapsedTime()
}

function updateElapsedTime() {
    const minutes = Math.floor(timeElapsed / 60)
    const seconds = timeElapsed % 60
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const timeElapsedSpan = playScreen.querySelector('#timeElapsed')
    timeElapsedSpan.innerHTML = `TIME ELAPSED: ${formattedMinutes}:${formattedSeconds}`
}
