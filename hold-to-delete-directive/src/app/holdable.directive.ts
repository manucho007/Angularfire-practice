import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
import { Subject, Observable, interval } from 'rxjs';
import { takeUntil, tap, filter } from 'rxjs/operators';

@Directive({
  selector: '[holdable]',
})
export class HoldableDirective {
  // Create custom event holdTime  with Output and EventEmmiter
  @Output() holdTime: EventEmitter<number> = new EventEmitter();

  state: Subject<string> = new Subject();
  cancel: Observable<string>;
  constructor() {
    // Observable to cancel the value emitted
    this.cancel = this.state.pipe(
      // Will only emit the cancel event
      filter((v) => v === 'cancel'),
      tap((v) => {
        console.log('%c stopped hold', 'color:#ec6969; font-weight:bold');
        // Restart the value of timer
        this.holdTime.emit(0);
      })
    );
  }

  // HostListener listen to events
  // to listen to multiple events we stack them
  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onExit() {
    this.state.next('cancel');
  }
  @HostListener('mousedown', ['$event'])
  onHold() {
    console.log('%c started hold', 'color:#5fba7d; font-weight:bold;');
    // LEt us know the user started to hold by changing the state
    this.state.next('start');
    // Define time-period every 10th of a second
    const n = 100;
    interval(n)
      .pipe(
        takeUntil(this.cancel),
        tap((v) => {
          this.holdTime.emit(v * n);
        })
      )
      .subscribe();
  }
}
