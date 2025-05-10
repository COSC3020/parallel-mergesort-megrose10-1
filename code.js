const{ fork } = require('child_process');

function createWorker(array, low, high) {
    return new Promise((resolve) => {
        //name subprocess worker and fork it to worker
        const worker = fork('./worker.js');

        //Sent the array and low, high values to the worker
        worker.send({ array, low, high });

        //Wait for message from child process when the work is done
        worker.on('message', (updatedArray) => {
            //console.log(`Worker ${worker.pid} finished sort!`);
            resolve(updatedArray);
        });

        worker.on('exit', () => {
            //console.log(`Worker ${worker.pid} exited!`);
        });
    });
}

//Use mergesort logic to merge the two workers 
function merge(array, low, mid, high) {
    let a = low
    let b = mid + 1;
    let tmp = [];
    for(let i = low; i <= high; i++) {
        if(a <= mid && (b > high || array[a] < array[b])) {
            tmp[i] = array[a++];
        } 
        else {
            tmp[i] = array[b++];
        }
    }
    for(let i = low; i <= high; i++) {
        array[i] = tmp[i];
    }

    return array;
}

//Make sure to declare main as asynchronous
async function main(array) {
    //If the array is empty or one element, return
    if(array.length == 0 || array.length == 1) {
        return array;
    }
    //Define low, mid, and high values
    let low = 0;
    let high = array.length - 1;
    let mid = Math.floor((low + high) / 2);
    //console.log('Workers are clocking in!');

    const [leftSorted, rightSorted] = await Promise.all([
        //Create left worker
        createWorker(array, low, mid),
        //Create right worker
        createWorker(array, mid + 1, high)
    ]);

    //Put left sorted array in array
    for(let i = low; i<= mid; i++) {
        array[i] = leftSorted[i];
    }

    //Put right sorted array in array
    for(let i = mid+1; i<= high; i++){
        array[i] = rightSorted[i];
    }

    //low = 0;
    //high = array.length - 1;
    //mid = Math.floor((low + high) / 2);

    //Merge the left and right sides, and sort the two
    let mergedA = merge(array, low, mid, high);
    //console.log(array);
    //const updatedArray = merge(array, low, mid, high);

    //console.log(updatedArray);
    //process.exit(0);

    //Return the sorted array
    return mergedA;
}

//let array = [2, 4, 3, 1];
//main(array);
