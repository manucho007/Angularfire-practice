import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPollComponent } from './user-poll.component';

describe('UserPollComponent', () => {
  let component: UserPollComponent;
  let fixture: ComponentFixture<UserPollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
