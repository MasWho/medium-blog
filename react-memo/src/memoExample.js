// 1. Random number generator for generating test data
const generateNumbers = (len, max) => {
  return Array.from(
    {length: len}, 
    () => Math.floor(Math.random() * max)
  )
};

const data = generateNumbers(10000000, 10);

// 2. Test metrics
let start, end, duration;

// 3. Simple function that adds up all numbers in data from index n
const sumNumbersFrom = (n) => {
  return data.slice(n).reduce((a, b) => a + b);
};

// 4. Benchmark un-memoized function
start = new Date();
const result = sumNumbersFrom(100);
end = new Date();
duration = end - start;
console.log(`Result: ${result};   Duration: ${duration}ms`);
/** 
 * Result: 45004814;   Duration: 75ms
 * */

// 5. Wrapper function for producing memoized version of other functions
const memoizeFunc = (originalFunc) => {
  const cache = {};
  return (input) => {
    if(input in cache) {
      console.log('Cached output');
      return cache[input];
    } else {
      console.log('Uncached output');
      cache[input] = originalFunc(input);
      return cache[input];
    }
  };
};

// 6. Memoize the original function for faster execution
const memoizedSumNumberFrom = memoizeFunc(sumNumbersFrom);

// 7. Benchmark execution of memoized function
start = new Date();
let memoizedResult = memoizedSumNumberFrom(100);
end = new Date();
duration = end - start;
console.log(`Result: ${memoizedResult};   Duration: ${duration}ms`);
/** 
 * Uncached output
 * Result: 45004814;   Duration: 75ms
 * */

start = new Date();
memoizedResult = memoizedSumNumberFrom(100);
end = new Date();
duration = end - start;
console.log(`Result: ${memoizedResult};   Duration: ${duration}ms`);
/** 
 * Cached output
 * Result: 45004814;   Duration: 0ms
 * */