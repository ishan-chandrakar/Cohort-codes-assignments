let a = 10
const b = 20
var c = 30
// console.log(`a = ${a}, b = ${b}, c = ${c}`);

function sumFn(a,b){
    return a+b
}
let sum = sumFn("hello","world")
// console.log(sum);

function canVote(age){
    if(age>=18)
        return true
    else
        return false;
}
// console.log(canVote(10));

let user = {
    name : "ishan",
    age: 24
}
console.log(user["name"]);


