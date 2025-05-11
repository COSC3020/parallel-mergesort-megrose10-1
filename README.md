# Parallel Mergesort

Implement a parallel version of mergesort (both the original recursive and the
iterative in-place version from a previous exercise are fine). You may use any
parallelization framework or method.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

I referenced https://nodejs.org/api/child_process.html and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all. I looked at the slides for sorting, and also looking at the slides for parallel. I also referenced https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync , https://www.w3schools.com/nodejs/met_assert_deepstrictequal.asp, tsp local search and detecting isomorphism's test code for this test code. I also looked at https://www.cse.wustl.edu/~angelee/archive/cse341/fall14/handouts/lecture03.pdf to read more on span.

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.


## Runtime Analysis

What is the span of the parallel program, in terms of worst-case $\Theta$? Hint:
It may help to consider the DAG of the parallel program.

While this has parallelism, the span would still be Θ(nlogn). To show this, starting from the beginning, we check if the array is a empty or has one element. Next we move to creating and waiting for the results of two workers, these two workers each take half of an array and use the recursive mergesort implementation to sort their arrays, this each would take O(nlogn). So, while this is a parallel version, the span would still be Θ(nlogn).
