// We create an observable from scratch
const observable = Rx.Observable.create(observer =>{
  // The observer function defines what the observer sends to the subscriber
  // We send values with observer.next and the value
  observer.next('hello');
  observer.next('world From Obsv created from scratch');
});
observable.subscribe(val =>print(val));

// We create an observable from a click event
const clicks = Rx.Observable.fromEvent(document, 'click');
clicks.subscribe(click=>console.log(click))

// We can convert a promise into an observable
const promise = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve('resolved from promise!')
  },1000)
});
const obsvPromise = Rx.Observable.fromPromise(promise);
obsvPromise.subscribe(result=>print(result));

// We can create a timer
const timer = Rx.Observable.timer(2000)
timer.subscribe(done=>print('ding from timer!'));

// We can creare an interval
const interval = Rx.Observable.interval(10000);
interval.subscribe(int=>print(new Date().getSeconds()));

// We create on Obsc "of" so we can send any kind of data we want
const mashup = Rx.Observable.of('anything',['you','want'], 23, true,{cool:'stuff'});
mashup.subscribe(val=>print(val));

// Hot vs Cold Observables
// Cold is when the data is created inside of it
// Won't create the data until something subscribe to it
const cold = Rx.Observable.create(observer=>{
  observer.next(Math.random())
});
  // I'll create two subscribers each will get a different result
  cold.subscribe(a=>print(`Subscriber cold A: ${a}`));
  cold.subscribe(b=>print(`Subscriber cold B: ${b}`));

  // Hot is when we create the value outside the Obsv
  const x=Math.random();
  const hot = Rx.Observable.create(observer=>{
    //I only pass the variable, i don't create it like in the cold
    observer.next(x)
  });
    // I'll create two subscribers each will get a different result
    cold.subscribe(a=>print(`Subscriber hot A: ${a}`));
    cold.subscribe(b=>print(`Subscriber hot B: ${b}`));

    // Or hot also when we call the cold observable
    const hot2 = cold.publish();
    hot2.subscribe(a=>print(`Subscriber hot2 A: ${a}`));
    hot2.subscribe(b=>print(`Subscriber hot2 B: ${b}`));
    hot2.connect();

// How to complete an Observable, when it reaches the end of it's cycle will send a complete message
// The timer will run and finally will display the message
const timer2 = Rx.Observable.timer(1000);
timer2.finally(()=>print('All done cycle finished!')).subscribe();

// Some interval don't complete on their own so we finish them manually
const interval2 = Rx.Observable.interval(500)
            .finally(()=> print('All donde from manually finished observable'));
const subscription = interval2.subscribe(x=>print(x));
setTimeout(()=>{
  subscription.unsubscribe();
},3000);

// map allows to transform the emitted value based on some logic
const numbers =Rx.Observable.of(10,100,1000);
numbers.map(num=>Math.log(num))
        .subscribe(x=>print(x));

// So we can pass an javascript object to json
const jsonString = '{"type":"Dog", "breed":"Pug"}';
const apiCall =Rx.Observable.of(jsonString);

apiCall.map(json=>JSON.parse(json))
        .subscribe(obj=>{
          print(obj.type)
          print(obj.breed)
        });

//Do allows to execute code without affecting the underline observable

const names = Rx.Observable.of('Simon','Garfunkel');
names
      .do(name=>print(name))
      .map(name=>name.toUpperCase())
      .do(name=>print(name))
      .subscribe();















// helper to print the values to html
function print(val){
  let el = document.createElement('p');
  el.innerText = val;
  document.body.appendChild(el);
}
