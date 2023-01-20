const XClass = 'x'
const CircleClass = 'circle'

// All winning combinations
const All_Winning_Combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let CircleTurn
const cellElements = document.querySelectorAll('[DataCell]')
const board = document.getElementById('IDboard')
const WinningMessageElement = document.getElementById('IDwinning-message')
const WinningMessageText = document.getElementById('xyz')
const Reload = document.getElementById('Restart-button')

cellElements.forEach(cell => {
    cell.addEventListener('click', Click, { once: true })
})

Start()

Reload.addEventListener('click',Start)

function Start() {
    CircleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(XClass)
        cell.classList.remove(CircleClass)
        cell.removeEventListener('click',Click)
        cell.addEventListener('click',Click,{once : true})
    })
    Set_Board_Class()
    WinningMessageElement.classList.remove('show')
}

function Click(z) {
    // console.log("clicked");
    const cell = z.target
    const currentClass = CircleTurn ? CircleClass : XClass
    PlaceMark(cell, currentClass)
    if(CheckWin(currentClass)){
        End(false)
    }
    else if(isDraw()){
        End(true)
    }
    else{
        SwitchTurns()
        Set_Board_Class()
    }
}

function End(draw){
    if(draw){
        WinningMessageText.innerText = 'Draw!!'
    }
    else{
        WinningMessageText.innerText = `${CircleTurn ? "O" : "X"} Wins!!`
    }
    WinningMessageElement.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(XClass) || cell.classList.contains(CircleClass)
    })
}

function PlaceMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function SwitchTurns() {
    CircleTurn = !CircleTurn
}

function Set_Board_Class() {
    board.classList.remove(XClass)
    board.classList.remove(CircleClass)
    if (CircleTurn) {
        board.classList.add(CircleClass)
    }
    else {
        board.classList.add(XClass)
    }
}

function CheckWin(currentClass){
    return All_Winning_Combinations.some(combination =>{
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

// It will do the browser refresh
// Reload.addEventListener('click', () => {
//     location.reload()
// })