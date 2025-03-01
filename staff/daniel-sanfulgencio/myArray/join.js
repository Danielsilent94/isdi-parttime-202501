var arrayTest = ["Dani", "Juan"];
var arrayControl = ["Dani", "Juan"];

var resultControl = arrayControl.join(' ')

function myJoin(arr, separator = ',') {
    if (arr.length === 0) return " ";
    var result = arr[0];
    for (var i = 1; i < arr.length; i++) {
        result += separator;
        result += arr[i]
    }

    return result;
}

var resultTest = myJoin(arrayTest, ' ');


console.assert(resultControl === resultTest, 'both functions return the same');

for (var i = 0; i < arrayControl.length; i++) {
    console.assert(arrayTest[i] === arrayControl[i], `index ${i} is diferent in both arrays. ${arrayTest[i]} !== ${arrayControl[i]}`);
}