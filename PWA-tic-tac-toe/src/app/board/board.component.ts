import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  template: `
    <h1>Current Player: {{ player }}</h1>

    <button nbButton outline status="danger" (click)="newGame()">
      Start new Game
    </button>

    <h2 *ngIf="winner">Player {{ winner }} won the game!</h2>

    <main>
      <app-square
        *ngFor="let val of squares; let i = index"
        [value]="val"
        (click)="makeMove(i)"
      >
      </app-square>
    </main>
  `,
  styles: [
    `
      main {
        display: grid;
        grid-template-columns: 200px 200px 200px;
        grid-gap: 0px;
      }

      app-square {
        border: 1px gray solid;
        height: 200px;
      }
    `
  ]
})
export class BoardComponent implements OnInit {
  squares: any[];
  xIsNext: boolean;
  winner: string;
  constructor() {}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }
  get player() {
    return this.xIsNext ? 'O' : 'X';
  }
  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
