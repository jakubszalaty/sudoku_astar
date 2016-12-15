// jshint node: true
// jshint esversion: 6
// jshint asi: true

'use strict';

// const PriorityQueue = require('es-collections/PriorityQueue')
// this._children = new PriorityQueue((a, b) => a.F - b.F)

class State {

    constructor(parent=null){
      this._alpha = -Infinity
      this._beta = Infinity
      this._children = []
      this._depth = 0
      this._g = 0
      this._h = 0
      this._rootMove = ""
      this._parent = parent
      this._id = ""

      this._isAdmissible = true

    }
    get Alpha (){ return this._alpha }
    set Alpha (value){ this._alpha = value }

    get Beta (){ return this._beta }
    set Beta (value){ this._beta = value }

    get Children (){ return this._children }
    set Children (value){ this._children = value }

    get Depth (){ return this._depth }
    set Depth (value){ this._depth = value }

    get F (){ return this._g + this._h }

    get G (){ return this._g }
    set G (value){ this._g = value }

    get H (){ return this._h }
    set H (value){ this._h = value }

    get ID (){ return this._id }

    get isAdmissible (){ return this._isAdmissible }

    get Parent (){ return this._parent }
    set Parent (value){ this._parent = value }

    get RootMove (){ return this._rootMove }
    set RootMove (value){ this._rootMove = value }

    ComputeHeuristicGrade(){
      let value = 0
      // i - rzedy
      // j - kolumny
      for (let i = 0; i < 9; ++i) {

        for (let j = 0; j < 9; ++j) {

          if(this._tab[i][j] === 0){
            let possibilities = new Set([1,2,3,4,5,6,7,8,9])


            for (let k = 0; k < 9; ++k) {

              if( this._tab[i][k] ){
                possibilities.delete(this._tab[i][k])

              }

              if( this._tab[k][j] ){
                possibilities.delete(this._tab[k][j])

              }
            }



            value += possibilities.size

          }
          // if(this._tab[i][j] === 0){
          //   let possibilities = new Set([1,2,3,4,5,6,7,8,9])

          //   for (let k = 1; k < 9; ++k) {

          //     if( this._tab[i][k] )
          //       possibilities.delete(this._tab[i][k])

          //     if( this._tab[k][j] )
          //       possibilities.delete(this._tab[k][j])
          //   }

          //   value += possibilities.size

          // }

        }


      }
      // console.log('heirgrade', value)
      // console.log(this._tab)
      return value


    }

    CompareTo(other) {
        return this.F <= other.F ? -1 : 1
    }

}

module.exports = State;
