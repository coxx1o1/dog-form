let x = [4, 7, 1, 9, 3];

let max = x[0];
let secmax = x[1];

for (let i = 0; i < x.length; i++) {

//   if (x[i] > max) {
//     secmax = max;
//     max = x[i];
//   }

if (x[i] > max) {
    secmax = max
    max = x[i]
}
else if (x[i] > secmax && x[i] !== max) {
    secmax = x[i]
}

}

 console.log("Max: " + max);
 console.log("Second Max: " + secmax);
