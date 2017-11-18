import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaOrderComponent } from './pizza-order.component';

describe('PizzaOrderComponent', () => {
  let component: PizzaOrderComponent;
  let fixture: ComponentFixture<PizzaOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzaOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
