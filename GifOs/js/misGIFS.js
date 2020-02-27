
let containerLocal = document.querySelector('#savedGIFS');

console.log(localStorage.getItem('myGif'));

let localGIF = JSON.parse(localStorage.getItem('myGif'));

console.log(localGIF);

var imgLocal = document.createElement("img");

imgLocal.src = localGIF;

console.log(imgLocal.src);

//containerLocal.insertAdjacentElement('afterbegin', imgLocal);   

