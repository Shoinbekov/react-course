// ========================================
// TASK CREATOR - CLOSURE
// ========================================

function createTask(name, statusId, countId, timeId) {

    // Private counter
    let count = 0;

    function run() {

        count = count + 1;

        document.getElementById(countId).textContent = count;
        document.getElementById(statusId).textContent = "Loading...";
        document.getElementById(timeId).textContent = "-";

        // Random loading time from 500 to 2000 ms
        const loadingTime =
            Math.floor(Math.random() * 1501) + 500;

        console.log(name + " started");

        return new Promise(function (resolve, reject) {

            setTimeout(function () {

                // About 70% success and 30% failure
                const success = Math.random() > 0.3;

                document.getElementById(timeId).textContent =
                    loadingTime + " ms";

                if (success) {

                    document.getElementById(statusId).textContent =
                        "Completed";

                    resolve(name + " Completed");

                } else {

                    document.getElementById(statusId).textContent =
                        "Failed";

                    reject(name + " Failed");
                }

            }, loadingTime);

        });
    }


    function getCount() {
        return count;
    }


    function reset() {

        count = 0;

        document.getElementById(countId).textContent = 0;
        document.getElementById(statusId).textContent = "Ready";
        document.getElementById(timeId).textContent = "-";
    }


    return {
        run,
        getCount,
        reset
    };
}


// ========================================
// CREATE THREE DIFFERENT TASKS
// ========================================

const usersTask = createTask(
    "Load Users",
    "users-status",
    "users-count",
    "users-time"
);

const postsTask = createTask(
    "Load Posts",
    "posts-status",
    "posts-count",
    "posts-time"
);

const commentsTask = createTask(
    "Load Comments",
    "comments-status",
    "comments-count",
    "comments-time"
);


// ========================================
// RUN ALL TASKS
// ========================================

const runAllButton =
    document.getElementById("run-all-btn");

const allStatus =
    document.getElementById("all-status");


runAllButton.addEventListener("click", async function () {

    allStatus.textContent = "Tasks are running...";

    const promises = [
        usersTask.run(),
        postsTask.run(),
        commentsTask.run()
    ];

    // allSettled waits for both successful and failed Promises
    const results = await Promise.allSettled(promises);

    console.log("Run All results:", results);

    allStatus.textContent = "All tasks finished";
});


// ========================================
// RESET
// ========================================

const resetButton =
    document.getElementById("reset-btn");


resetButton.addEventListener("click", function () {

    usersTask.reset();
    postsTask.reset();
    commentsTask.reset();

    allStatus.textContent = "";

    console.log("Counters reset");
});


// ========================================
// SEQUENTIAL EXECUTION
// ========================================

const sequentialButton =
    document.getElementById("sequential-btn");


sequentialButton.addEventListener("click", async function () {

    const start = performance.now();

    // Each task starts after the previous task finishes
    try {
        await usersTask.run();
    } catch (error) {
        console.log(error);
    }

    try {
        await postsTask.run();
    } catch (error) {
        console.log(error);
    }

    try {
        await commentsTask.run();
    } catch (error) {
        console.log(error);
    }

    const end = performance.now();

    const totalTime = Math.round(end - start);

    document.getElementById("sequential-time").textContent =
        totalTime + " ms";

    console.log("Sequential execution:", totalTime + " ms");
});


// ========================================
// CONCURRENT EXECUTION
// ========================================

const concurrentButton =
    document.getElementById("concurrent-btn");


concurrentButton.addEventListener("click", async function () {

    const start = performance.now();

    // All tasks start at the same time
    const promises = [
        usersTask.run(),
        postsTask.run(),
        commentsTask.run()
    ];

    await Promise.allSettled(promises);

    const end = performance.now();

    const totalTime = Math.round(end - start);

    document.getElementById("concurrent-time").textContent =
        totalTime + " ms";

    console.log("Concurrent execution:", totalTime + " ms");
});


// ========================================
// EVENT LOOP DEMO
// ========================================

const eventLoopButton =
    document.getElementById("event-loop-btn");

const eventOutput =
    document.getElementById("event-output");


eventLoopButton.addEventListener("click", function () {

    eventOutput.innerHTML = "";

    function show(message) {

        console.log(message);

        const line = document.createElement("div");

        line.textContent = message;

        eventOutput.appendChild(line);
    }


    // Synchronous code
    show("Start");


    // Timer 1 - Task Queue
    setTimeout(function () {
        show("Timer 1");
    }, 0);


    // Promise 1 - Microtask Queue
    Promise.resolve().then(function () {
        show("Promise 1");
    });


    // Async function
    async function asyncExample() {

        show("Async function start");

        await Promise.resolve();

        show("Async function after await");
    }


    asyncExample();


    // Promise 2 - Microtask Queue
    Promise.resolve().then(function () {
        show("Promise 2");
    });


    // Timer 2 - Task Queue
    setTimeout(function () {
        show("Timer 2");
    }, 0);


    // Synchronous code
    show("End");
});

