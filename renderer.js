// jshint node: true
// jshint esversion: 6
// jshint asi: true
// jshint debug: true

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const SudokuState = require('./classes/SudokuState.js')
const SudokuSearch = require('./classes/SudokuSearch.js')

// rysowanie sudoku

let bw = 405
let bh = 405
let p = 0
let size = 45
let baseTxtX = 15
let baseTxtY = 34

let canvas = document.getElementById("sudoku")

// canvas.style.width = (bw + 1) + 'px';
// canvas.style.height = (bh + 1) + 'px';

let context = canvas.getContext("2d")



let sudokuResults
let index = 0

function findSolutionSudoku(string){
  if(!string)
    alert('Musisz podać string!')

  let time = new Date()
  let state = new SudokuState(string)
  let search = new SudokuSearch(state)
  search.DoSearch()

  time = new Date() - time

  document.getElementById('time').textContent = `${time/1000}s`

  // sciezka stanow do rozwiazania
  let result = search.Solutions[0]


  sudokuResults = []

  while(result !== null){
    // result.Print()
    sudokuResults.push(result.Tab)
    result = result.Parent
  }

}

function drawSudoku(){
  document.getElementById('step').textContent = `${sudokuResults.length-index}/${sudokuResults.length}`
  // czyszczenie widoku
  context.clearRect(0, 0, canvas.width, canvas.height)

  // grid
  context.beginPath()
  for (let x = 0; x <= bw; x += size) {
      context.moveTo(0.5 + x + p, p)
      context.lineTo(0.5 + x + p, bh + p)
  }


  for (let x = 0; x <= bh; x += size) {
      context.moveTo(p, 0.5 + x + p)
      context.lineTo(bw + p, 0.5 + x + p)
  }
  context.lineWidth=1
  context.strokeStyle = "black"
  context.stroke()


  // rysowanie pogrubionych lini na środku
  context.beginPath()
  context.lineWidth=2
  // pionowe
  context.moveTo(canvas.width/3,0)
  context.lineTo(canvas.width/3,canvas.height)
  context.moveTo(canvas.width*2/3,0)
  context.lineTo(canvas.width*2/3,canvas.height)

  // pozioma
  context.moveTo(0,canvas.height/3)
  context.lineTo(canvas.width,canvas.height/3)
  context.moveTo(0,canvas.height*2/3)
  context.lineTo(canvas.width,canvas.height*2/3)

  context.strokeStyle = "black"
  context.stroke()

  context.font = "30px Arial"

  // uzupelnianie wartoscami array
  // sudokuArray = []

  // for (var i = 0; i < rows.length; i++) {
  //   sudokuArray.push(rows[i].querySelector('input').value.split(','))
  // }
  let sudokuArray = sudokuResults[index]

  for (let i = 0; i < sudokuArray.length; i++) {
    let posX =  baseTxtX + size * i

    for (let j = 0; j < sudokuArray[i].length; j++) {
      if (sudokuArray[j][i] && sudokuArray[j][i] != '0'){
        let posY = baseTxtY + size * j
        context.fillText(sudokuArray[j][i],posX,posY)
      }
    }
  }


}

// drawSudoku()

let draw = document.getElementById('draw')

let next = document.getElementById('next')
let prev = document.getElementById('prev')
let reverse = document.getElementById('reverse')
let data = document.getElementById('data')

draw.addEventListener('click',() => {
  let string = data.value
  findSolutionSudoku(string)
  drawSudoku()
})

reverse.addEventListener('click',() => {
  sudokuResults.reverse()
  drawSudoku()

})

prev.addEventListener('click',() => {
  index++
  if(index > sudokuResults.length-1)
    index = sudokuResults.length-1
  drawSudoku()
})

next.addEventListener('click',() => {
  index--
  if(index < 0)
    index = 0
  drawSudoku()
})
