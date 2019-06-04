import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IceCreamComponent } from './ice-cream.component';

describe('IceCreamComponent', () => {
  let component: IceCreamComponent;
  let fixture: ComponentFixture<IceCreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IceCreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IceCreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
