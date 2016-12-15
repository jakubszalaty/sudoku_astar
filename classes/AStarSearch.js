// jshint node: true
// jshint esversion: 6
// jshint asi: true

'use strict';

class AStarSearch {
  constructor(initialState, isStopAfterFirstSolution,isStopAfterSecondSolution){

    this.closed = {}

    this._initialState = initialState
    this._isStopAfterFirstSolution = isStopAfterFirstSolution
    this._isStopAfterSecondSolution = isStopAfterSecondSolution
    this._solutions = []

    this._open = []
    this._open2 = new Set()

  }

  // public
  // type: Dictionary<string, IState>
  get Closed() { return this.closed }

  /// <summary>
  /// Lista odnalezionych rozwiązań.
  /// </summary>
  /// type: List<IState>
  get Solutions (){ return this._solutions }

  // proteced methods
  /// Metoda powinna zawierać wszelkie niezbędne operacje do zbudowania stanów potomnych.
  buildChildren(parent){}

  /// Zwraca wartość bool mówiąco czy stan podany w parametrze jest rozwiązaniem.
  isSolution(state){}

  /// Zarejestrowanie rozwiązania. Poprzez przeciązenie metody można do niej dodać więcej akcji.
  registerSolution(solutionState) {
      this._solutions.push(solutionState)
  }

  // public methods
  /// <summary>
  /// Wykonanie algorytmu A*.
  /// </summary>
  DoSearch() {
    let currentState = this._initialState

    while (true) {

      let isSol = this.isSolution(currentState)
      if (isSol) {

        this.registerSolution(currentState)

        if (this._isStopAfterFirstSolution) {
          break
        }

        if ((this._solutions.length == 2) && (this._isStopAfterSecondSolution)) {
          break
        }
      }
      else {
        this.buildChildren(currentState);
        for(let key in currentState.Children) {

          let child = currentState.Children[key]

          if (this.closed[child.ID]) {
            continue;
          }

          if ( !this._open2.has(child.ID) ) {
            this._open.push(child)
            this._open2.add(child.ID)
          }
          else {
            //Sprawdzanie czy nie można podmienić stanu w ziobrze open na taki sam stan ale z krótszą ścieżką przejścia.
            let isNewerBetter = false
            let i = 0
            let state = null

            for (i = 0; i < this._open.length; ++i) {

              state = this._open[i]
              if (state.ID == child.ID) {
                if (state.G > child.G) {
                  isNewerBetter = true
                }
                break;
              }
            }

            if (isNewerBetter) {
              this._open.splice(this._open.indexOf(i),1)
              this._open.push(child)
            }
          }
        }
      }

      this.closed[currentState.ID] = currentState

      // zmienilem bo jakos wczensije nie dzialalo
      // if (this._open.length == 1) {
      if (this._open.length === 0) {
        break;
      }
      else {
        currentState = this._open[0]
        this._open.splice(0,1)
        this._open2.delete(currentState.ID)
      }
    }
  }
}

module.exports = AStarSearch;
