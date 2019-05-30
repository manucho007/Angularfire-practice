import { Component } from '@angular/core';
import { Observable, interval, pipe } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
// // import { interval } from 'rxjs/observable';
// // import'rxjs/add/observable/interval';
// // import'rxjs/add/operator/map';
// // import'rxjs/add/operator/takeWhile';
// // import'rxjs/add/operator/do';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  max =1;
  current=0;

  start() {
      const Ointerval = interval(100);

      Ointerval.pipe(
        takeWhile(_ => !this.isFinished ),
        tap(i => this.current += 0.1))
        .subscribe();
    }

     /// finish timer
    finish() {
      this.current = this.max;
    }

    /// reset timer
    reset() {
      this.current = 0;
    }

  // Getters to prevent NaN errors
  get maxVal() {
    return isNaN(this.max) || this.max < 0.1 ? 0.1 : this.max;
  }

  get currentVal() {
    return isNaN(this.current) || this.current < 0 ? 0 : this.current;
  }

  get isFinished() {
    return this.currentVal >= this.maxVal;
  }
}
