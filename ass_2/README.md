# JavaScript Runtime and Async

This project demonstrates JavaScript Closures, Call Stack, Promises, async/await, Event Loop, Tasks and Microtasks.

The project uses only HTML, CSS and vanilla JavaScript.

## Closure and Private Counter

Each task is created using the `createTask()` function.

The `count` variable is declared inside `createTask()`:

```js
let count = 0;
```

It cannot be accessed directly from outside the function.

The returned methods `run()`, `getCount()` and `reset()` can still access the variable because of a closure.

Every call to `createTask()` creates a new independent counter, so Load Users, Load Posts and Load Comments have separate counters.

## Call Stack

The Call Stack keeps track of the JavaScript functions that are currently being executed.

For example, when the Run All Tasks button is clicked, the click callback is placed on the Call Stack. It calls the `run()` functions for the tasks.

The synchronous parts of these functions execute immediately. The timers are handled separately and their callbacks run later.

## setTimeout

`setTimeout()` does not block JavaScript while it is waiting.

When a task starts, JavaScript creates the timer and continues executing other code.

When the timer finishes, its callback can later be executed through the Event Loop.

This allows multiple tasks to wait at the same time.

## Event Loop Prediction

Before running the Event Loop demo, my predicted output is:

1. Start
2. Async function start
3. End
4. Promise 1
5. Async function after await
6. Promise 2
7. Timer 1
8. Timer 2

## Actual Event Loop Output

The actual output is:

1. Start
2. Async function start
3. End
4. Promise 1
5. Async function after await
6. Promise 2
7. Timer 1
8. Timer 2

The synchronous code executes first.

Promise callbacks and the continuation after `await` are placed in the Microtask Queue.

The timer callbacks are placed in the Task Queue.

Microtasks are processed before the next task, so the Promise and await callbacks execute before the `setTimeout` callbacks.

## Tasks and Microtasks

Promise callbacks and code after `await` are Microtasks.

Callbacks from `setTimeout()` are Tasks.

After the current Call Stack becomes empty, JavaScript processes the Microtask Queue before taking the next Task from the Task Queue.

## Multiple Promises and Errors

Each task returns a Promise.

A task randomly completes successfully with `resolve()` or fails with `reject()`.

For the Run All Tasks and concurrent examples, I use:

```js
Promise.allSettled();
```

This waits until every Promise has either completed or failed.

It is useful here because one failed task should not stop us from waiting for the other tasks.

## Sequential vs Concurrent

Sequential execution waits for each task before starting the next one:

```js
await task1.run();
await task2.run();
await task3.run();
```

Because the tasks wait one after another, their waiting times are mostly added together.

Concurrent execution starts all tasks before waiting for them:

```js
const promises = [task1.run(), task2.run(), task3.run()];

await Promise.allSettled(promises);
```

The tasks can wait at the same time.

Therefore, concurrent execution is usually faster than sequential execution for these simulated loading operations.
