// function logging(){
//     setTimeout(()=>{
//         console.log("Hi")
//         setTimeout(()=>{
//             console.log("hello")
//             setTimeout(()=>{
//                 console.log("hello there")
//             }, 5000)
//         },3000)
//     },1000)
// }
// logging()

// function hello_there(){
//     setTimeout(()=>{
//         console.log("Hello there")
//     },5000)
// }
// function hello(){
//     setTimeout(()=>{
//         console.log("Hello")
//     },3000)
//     hello_there()
// }
// function hi(){
//     setTimeout(()=>{
//         console.log("Hi")
//     },1000)
//     hello()
// }
// hi()

// promisified version
function promisifiedHi(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, ms);
	});
}
promisifiedHi(1000)
	.then(() => {
		console.log("hi");
		return promisifiedHi(3000);
	})
	.then(() => {
		console.log("Hello");
		return promisifiedHi(5000);
	})
	.then(() => {
		console.log("Hi there");
	});
