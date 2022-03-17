document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('score')
    const width = 20 //28 x 28 = 784 squares
    let score = 0  

    // layout of the grid and the content of squares
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

const squares = []

//create game board
function createBoard() {
    for(let i=0;i<layout.length;i++){
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)

        //add layout to board
        if(layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        }
    }
}
createBoard()

//pac-man starting point
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add('pac-man')

//pac-man controls
function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove('pac-man')

    switch(e.keyCode) {
        case 37:
            if(pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex -1].classList.contains('wall') && !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')) 
            pacmanCurrentIndex -=1
            break
            //check if pacman is in the left exit 
            if((pacmanCurrentIndex -1) === 363) {
                squares[pacmanCurrentIndex].classList.add('pac-man')
                pacmanCurrentIndex = 391
                squares[364].classList.remove('pac-man')
            }
            break
        case 38:
            if(pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex -width].classList.contains('wall') && !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair')) 
            pacmanCurrentIndex -=width
            break
        case 39:
            if(pacmanCurrentIndex % width < width -1 && !squares[pacmanCurrentIndex +1].classList.contains('wall') && !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair')) 
            pacmanCurrentIndex +=1 
            break

            //check if pacman is in the right exit 
            if(pacmanCurrentIndex +1 === 392) {
              squares[pacmanCurrentIndex].classList.add('pac-man')
              pacmanCurrentIndex = 364
              squares[391].classList.remove('pac-man')  
            }
            break
        case 40:
            if(pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex +width].classList.contains('wall') && !squares[pacmanCurrentIndex +width].classList.contains('ghost-lair')) 
            pacmanCurrentIndex +=width
            break
    }
    squares[pacmanCurrentIndex].classList.add('pac-man')

    pacDotEaten()
    powerPelletEaten()
    checkForGameOver()
    //checkForWin()

}
document.addEventListener('keyup',movePacman)

//what happens when pac-man eats a pac dot
function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contins('pac-dot')) {
        score++
        scoreDisplay.innerHTML = score
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
    }
}

//when power-pellet Eaten
function powerPelletEaten(){
    if(squares[pacmanCurrentIndex].classList.contains('power-pellet')){
        score +=10
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhosts, 1000)
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
    }
}

//stop scaring the ghost
function unScareGhosts (){
    ghosts.forEach(ghost => ghost.isScared = false)
}

//create ghost template 
class Ghost {
    constructor(className, startIndex, speed){
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex =startIndex
        this.timerId = NaN
        this.isScared = false
    }
}

ghosts = [
    new Ghost ('blinky', 348, 250),
    new Ghost ('pinky', 376, 400),
    new Ghost ('inky', 351, 300),
    new Ghost ('clyde', 379, 500)
]

//draw ghosts on to the board 
ghosts.forEach (ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

//move ghost randomly
ghosts.forEach(ghost => moveGhost(ghost))

//write the funtcion to move ghost
function moveGhost(ghost) {
    const directions = [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function() {
        // if the next square ghost is going to go in does not contain a wall and a ghost
        if (!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + directiom].classList.contains('ghost')) {
            //you can go here
            //remove all ghost related classes
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            //change current index to new safe square
            ghost.currentIndex += direction
            //redraw the ghost in the safe space
            sqaures[ghost.currentIndex].classList.add(ghost.className, 'ghost')

        //else find new direction
        } else direction = directions[Math.floor(Math.random() * directions.length)]
    
        //if the ghost is currently scared
        if (ghost.isScared){
            squares[ghostCurrentIndex].classList.add('scared-ghost')
        }

        //if scared ghost eaten by pacman
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains(pac-man)) {
            sqaures[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            ghost.currentIndex = ghost.startIndex
            score +=100
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        checkForGameOver()
    }, ghost.speed)
}

//check for game over
if (squares[pacmanCurrentIndex].classList.contains('ghost') && !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    document.removeEventListener('keyup', movePacman)
    setTimeout(function(){alert('GAME-OVER!')}, 500)
    //scoreDisplay.innerHTML = 'YOU WIN'
}

//check for win
function checkWin() {
    if(score === 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePacman)
        scoreDisplay.innerHTML = 'YOU-WIN!'
        // setTimeout(function(){alert('YOU-WIN!')}, 500)
    }
}


})