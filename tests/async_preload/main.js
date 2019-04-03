let canvas = document.getElementById('c');
let width = canvas.width = 500;
let height = canvas.height = 500;
let c = canvas.getContext('2d');


const loader = new LoaderJS();

loader.loadJSON('data', '../data.json');
loader.loadVideo('video', '../../assets/video.mp4');
// loader.loadImage('one', 'https://cdn2.scratch.mit.edu/get_image/user/9706068_60x60.png');
// loader.loadImage('two', 'https://media.giphy.com/media/f4qECMR9aozPq/giphy.gif');


loader.whenReady = function() {
  // do something
  console.log(loader.assets.data.city.name);
  console.log(loader.assets.video);
}

// let x = 20;
// function animate() {
//   c.clearRect(0, 0, width, height);

//   if(loader.loaded) {
//     c.drawImage(loader.assets.one, 200, 100, 100, 100);
//     c.drawImage(loader.assets.two, 0, 100, 100, 100);
//   } else {
//     c.fillText('loading img', 20, 20)
//   }

//   c.fillStyle = 'red';
//   c.fillRect(x, 100, 20, 20)
//   x++;
//   requestAnimationFrame(animate)
// }
// animate();
