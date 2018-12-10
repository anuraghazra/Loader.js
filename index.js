// LoaderJS
let loader = new LoaderJS();

// files to be loaded
loader.loadString('mytext', './file.txt');
loader.loadJSON('todos1', 'https://jsonplaceholder.typicode.com/todos');
loader.loadImage('img1', 'https://media.giphy.com/media/12NUbkX6p4xOO4/giphy.gif')
loader.loadMedia('audio1', 'https://freesound.org/data/previews/451/451739_4068345-lq.mp3')


// while loading event
loader.whileLoading = function() {
  // document.write('Loading');
}

// when ready
loader.whenReady = function() {
  document.getElementById('loadingMsg').classList.add('hide')
  document.getElementById('text').innerText = this.assets.mytext;

  let audio = document.createElement('audio');
  audio.setAttribute('controls', 'controls');
  audio.src = loader.assets.audio1;
  document.body.appendChild(audio);
  
  document.body.appendChild(loader.assets.img1);
}