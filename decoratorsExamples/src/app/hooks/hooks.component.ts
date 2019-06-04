import { Component } from '@angular/core';

@Component({
  selector: 'app-hooks',
  templateUrl: './hooks.component.html',
  styleUrls: ['./hooks.component.scss']
})
export class HooksComponent {

  @UseState(0) count; setCount;

  @UseEffect()
  onEffect() {
    document.title = `You clicked ${this.count} times`;
  }

}

function UseState(seed: any) {
  return function (target, key) {
    target[key] = seed;
    target[`set${key.replace(/^\w/, c => c.toUpperCase())}`] = (val) => target[key] = val;
  };
}

/// Implementation Details:
function UseEffect() {
  return function (target, key, descriptor) {
    target.ngOnInit = descriptor.value;
    target.ngAfterViewChecked = descriptor.value;
  };
}