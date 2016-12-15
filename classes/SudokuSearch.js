// jshint node: true
// jshint esversion: 6
// jshint asi: true

'use strict';

const AStarSearch = require('./AStarSearch.js')
const SudokuState = require('./SudokuState.js')

class SudokuSearch extends AStarSearch{

  constructor(state){
    super(state,true,true)
  }

  buildChildren(state){



    for(let i = 0; i < 9; ++i){

      for(let j = 0; j < 9; ++j){

        if( state._tab[i][j] === 0){
          for(let k = 1; k < 10; ++k){
            let child = new SudokuState(state, i,j, k)
            // sprawdzam czy jest osiagalny czyli czy ma sens
            if(child.isAdmissible){
              this._parent = state
              this._parent._children.push(child)
            }


          }
          return;

        }

      }
    }

  }

  isSolution(state){

    return state._h === 0

  }


}

module.exports = SudokuSearch;
