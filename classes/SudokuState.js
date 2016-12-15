// jshint node: true
// jshint esversion: 6
// jshint asi: true

'use strict';

const State = require('./State.js')

class SudokuState extends State {

  constructor(...theArgs){
    super()

    this._tab = []

    if(theArgs.length === 1){
      // I konstruktor
      let str   = theArgs[0]

      if( str.length !== 81)
        throw new Error('Wrong string. Must have 81 digits')

      this._id  = str


      for(let  i = 0; i < 9; ++i){
        this._tab[i] = []
        for(let j = 0; j < 9; ++j){

          this._tab[i][j] = parseInt(str[i*9+j])

        }
      }

      this._h = this.ComputeHeuristicGrade()
    }
    else if(theArgs.length === 4){
      // II konstruktor - stworz potomka
      let parent  = theArgs[0]
      let x       = theArgs[1]
      let y       = theArgs[2]
      let val     = theArgs[3]

      for (let i = 0; i < 9; i++) {
        this._tab[i] = parent._tab[i].slice()
      }

      // jesli istnieje juz taka wartosc w pionie lub poziomie to zwroc ze null
      for (let k = 0; k < 9; k++) {

        if(this._tab[x][k]==val){
          this._isAdmissible = false
          return
        }
        if(this._tab[k][y]==val){
          this._isAdmissible = false
          return
        }
      }

      this._tab[x][y] = val




      this._id = parent._id.slice(0,x*9+y) + val + parent._id.slice(x*9+y+1)
      this._parent = parent
      // sami napisac heurestyke
      this._h = this.ComputeHeuristicGrade()

    }
    else{
      throw new Error('Wrong params')
    }


  }

  get Tab (){ return this._tab }
  set Tab (value){ this._tab = value }

  buildChildren(state){


    this._parent = state

    for(let i = 0; i < 9; ++i){

      for(let j = 0; j < 9; ++j){

        if( this._parent._tab[i][j] === 0){
          for(let k = 1; k < 10; ++k){
            let child = new SudokuState(this._parent, i,j,k)

            this._parent._children.add(child)

          }

          return

        }

      }
    }
  }

  Print(){
    console.log(this._tab)
  }
}

module.exports = SudokuState;
