import {
  AsyncSubject,
  Subject,
  interval,
  merge,
  of,
  map,
  queueScheduler,
  pipe,
  fromEvent,
  concat,
  timer,
  mergeMap
} from 'rxjs';
import {
  delay,
  take,
  exhaustMap,
  timeout,
  concatMap,
  concatWith,
  tap,
  repeat,
  concatAll,
} from 'rxjs/operators';

let isInCommand = false;

// const sub = new AsyncSubject();

(async () => {
  /**
   * test
   */
  function hunt() {
    console.log('hunt');
    console.log('hunt.');
  }

  /**
   * test
   */
  function work() {
    console.log('work');
    console.log('work.');
  }
  const h = of('hunt');
  const w = of('work');


  // const timerHunt = timer(5000).pipe(
  //   concatMap(() => h),
  // );

  // const timerWork = timer(10000).pipe(
  //   concatMap(() => w),
  // );

  // const timerHunt = interval(5000).pipe(
  //   concatMap(() => h)
  // );

  // const timerWork = interval(10000).pipe(
  //   concatMap(() => w),
  // );

  // const res = concat(timerHunt, timerWork).pipe(take(1));

  // res.subscribe(x => console.log(x));


  // const c = concat(timerHunt, timerWork);
  // c.subscribe(x => console.log(x));

  // const lista = of(1);

  // queueScheduler.schedule(() => {

  //   lista.pipe(
  //     map(x => {
  //       hunt();
  //       work();
  //     }),
  //     delay(2000),
  //   ).subscribe();
  // });

  // const source = of(1000, 2000, 1000);
  // const check = interval(500);
  // const intHunt = interval(5000);
  // const intWork = interval(10000);

  // sub.complete();

  // check.subscribe(() => {

  //   concatMap
  //   setTimeout(() => {
  //     hunt();
  //   }, 2000);
  //   if (isInCommand) {
  //     setTimeout(() => {
  //       console.log('ocupado...');
  //     }, 2000);
  //   }
  //   isInCommand = !isInCommand;
  // });

  // map value from source into inner observable, when complete emit result and move to next
  // const example = source.pipe(
  //   concatMap((val) => {
  //     console.log(val);
  //     // if (val == 1000) {
  //     //   return of(hunt()).pipe(delay(val), delay(2000));
  //     // } else {
  //     //   return of(work()).pipe(delay(val), delay(2000));
  //     // }
  //   }),
  // );

  // output: With concatMap: Delayed by: 2000ms, With concatMap: Delayed by: 1000ms
  // const subscribe = example.subscribe();

  // const firstInterval = interval(1000).pipe(take(10));
  // const secondInterval = interval(1000).pipe(take(2));

  // const exhaustSub = firstInterval
  //   .pipe(
  //     exhaustMap((f) => {
  //       console.log(`Emission Corrected of first interval: ${f}`);
  //       return secondInterval;
  //     }),
  //   )
  //   .subscribe((s) => console.log(s));

  /////////////////////////////////////////////////

  // const sourceInterval = interval(1000);
  // const delayedInterval = sourceInterval.pipe(delay(10), take(1));

  // const exhaustSub = merge(
  //   // delay 10ms, then start interval emitting 4 values
  //   delayedInterval,
  //   // emit immediately
  //   of(true)
  // )
  //   .pipe(exhaustMap((_) => sourceInterval.pipe(take(5))))
  //   // output: 0, 1, 2, 3, 4
  //   .subscribe((val) => console.log(val));

  // const delayWhenExample = message.pipe(delayWhen(delayForFiveSeconds));

  // const subscribe = delayWhenExample.subscribe((val) => console.log(val));

  // let ac = false;
  // sub.next(ac);

  // setTimeout(() => {
  //   ac = true;
  // }, 2000);

  // const items = [];
  // items.push('Raul');
  // sub.next(items);

  // items.push('Cortez');
  // sub.next(items);
  // sub.complete();

  // sub.subscribe((x) => {
  //   console.log("vaavava");
  //   if (x) {
  //     console.log(x);
  //   }
  // });

  // sub.complete();

  /**
   * hunt funct
   */
  // function hunt() {
  //   while (isInCommand) {
  //     console.log('hunt 1');
  //     setTimeout(() => {
  //       console.log('hunt 2');
  //     }, 1000);
  //   }
  //   isInCommand = true;
  //   setTimeout(() => {
  //     console.log('hunt...');
  //     isInCommand = false;
  //     console.log('hunt.');
  //   }, 2000);
  // }

  // /**
  //  * work funct
  //  */
  // function work() {
  //   while (isInCommand) {
  //     console.log('work 1');
  //     setTimeout(() => {
  //       console.log('work 2');
  //     }, 1000);
  //   }
  //   isInCommand = true;
  //   setTimeout(() => {
  //     console.log('work...');
  //     isInCommand = false;
  //     console.log('work.');
  //   }, 2000);
  // }

  // interval(hunt, 10000);
  // interval(work, 20000);
})();
