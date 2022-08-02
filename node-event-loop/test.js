function inner_log() {
  return new Promise(resolve => {
    resolve()
  });
}

function log_one() {
  console.log('1');
}

function log_two() {
  inner_log().then(log_three);
  console.log('2');
}

function log_three() {
  console.log('3');
}

function main() {
  setTimeout(log_one, 0);
  log_two();
}

main();




