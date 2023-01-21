/// <reference lib="webworker" />

let dateNumber: number = 0;
let counter: number = 0;

addEventListener('message', ({ data }) => {
  // console.log(`worker received ${data}`)
  dateNumber = data;
  const interval = setInterval(() => {
    // if(counter == 60) {
    //   counter = 0;
    //   dateNumber += counter;
    //   console.log(dateNumber)
    //   console.log(new Date(dateNumber));
    dateNumber += 1000;
      postMessage(new Date(dateNumber));
    // } else {
    //   counter++;
    // }
  }, 1000);
});




// function postIncrementedDateNumber(dateNumber: number) {
//   if(counter == 60) {
//     counter = 0;
//     dateNumber += counter;
//     console.log(new Date(dateNumber));
//     postMessage(new Date(dateNumber));
//   } else {
//     console.log(counter);
//     counter++;
//   }
// }
