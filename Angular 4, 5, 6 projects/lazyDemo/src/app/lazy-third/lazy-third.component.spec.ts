import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyThirdComponent } from './lazy-third.component';

describe('LazyThirdComponent', () => {
  let component: LazyThirdComponent;
  let fixture: ComponentFixture<LazyThirdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyThirdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
