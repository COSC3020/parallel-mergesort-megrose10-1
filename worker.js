//recieve data from parent process
process.on('message', (data) => {
    const { array, low, high } = data;

    //Use the data and sort using recursive mergesort
    msort(array, low, high);

    //Send to parent process the sorted array
    process.send(array);
    //Stop worker
    process.exit(0);
});

//Use mergesort logic
function msort(array, low, high) {
    if(low >= high) return;
    let mid = Math.floor((low + high)/2);
    msort(array, low, mid);
    msort(array, mid + 1, high);

    merge(array, low, mid, high);
}

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
