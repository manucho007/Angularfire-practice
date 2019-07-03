import { async, ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';

import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { AlertButtonComponent } from './alert-button.component';

import { MessageService } from "../message.service";
import { of } from "rxjs";

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../../environments/environment";


describe('AlertButtonComponent', () => {
  let component: AlertButtonComponent;
  let fixture: ComponentFixture<AlertButtonComponent>;
  let de: DebugElement;

  // we don't test with data from the backed so we use a stub
  let serviceStub: any;

  let service: MessageService;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    // Testing with stub data and no service from firebase
    // serviceStub = {
    //   getContent: () => of('You have been warned'),
    // }

    TestBed.configureTestingModule({
      declarations: [AlertButtonComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
      ],
      providers: [
        MessageService
        // {
        //   provide: MessageService,
        //   useValue: serviceStub
        // }
      ]
    })
      .compileComponents(); //Compiles template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertButtonComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    // Gets the service class
    service = de.injector.get(MessageService);
    // allows to see when the method is being called and which arguments are used
    spy = spyOn(service, 'getContent').and.returnValue(of('You have been warned'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Checks if it contains a certain value
  it('should have a message with `warn`', () => {
    expect(component.content).toContain('warn');
  });

  // Tests to see if a logical condition is met
  it('should have an severity higher than 2', () => {
    expect(component.severity).toBeGreaterThan(2);
  });

  it('should have an severity level of 423', () => {
    expect(component.severity).toBe(423);
  });

  // Tests if a DOM element gets rendered correctly
  it('should have an h1 tag of `Alert Button`', () => {
    expect(de.query(By.css('h1')).nativeElement.innerText).toBe('Alert Button');
  });

  // Tests if the method works correctly
  it('should toggle the message boolean', () => {
    expect(component.hideContent).toBeTruthy();
    component.toggle();
    expect(component.hideContent).toBeFalsy();
  });

  // Tests an Async function
  it('should toggle the message boolean asynchronously', fakeAsync(() => {
    expect(component.hideContent).toBeTruthy();
    component.toggleAsync();
    tick(500);
    expect(component.hideContent).toBeFalsy();
  }));

  // Test data from a service with mock data
  it('should have message content defined from an observable', () => {
    component.contentOb.subscribe(content => {
      expect(content).toBeDefined();
      expect(content).toBe('You have been warned');
    });
  });

  it('should call getContent one time and update the view', () => {
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.all().length).toEqual(1);
    expect(de.query(By.css('.message-body')).nativeElement.innerText)
      .toContain('warn');
  });


});
