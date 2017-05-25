require('./server/');
console.log(module);
if (!module.hot) {
  module.hot = true;
}
// function fuzzysearch(needle, haystack) {
//     console.log("here");
//   var hlen = haystack.length;
//   var nlen = needle.length;
//   if (nlen > hlen) {
//     return false;
//   }
//   if (nlen === hlen) {
//     return needle === haystack;
//   }
//   outer: for (var i = 0, j = 0; i < nlen; i++) {
//         console.log("there", i, j);
//
//     var nch = needle.charCodeAt(i);
//     while (j < hlen) {
//       console.log(j);
//       if (haystack.charCodeAt(j++) === nch) {
//         console.log(j);
//         continue outer;
//       }
//     }
//     return false;
//   }
//   return true;
// }
// console.log(fuzzysearch('gh', "golhao amio"));
