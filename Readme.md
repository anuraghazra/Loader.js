# Loader.js

[![License: GPL v3](https://img.shields.io/github/license/anuraghazra/Loader.js.svg)](https://www.gnu.org/licenses/gpl-3.0)


Lightweight Javascript Resource Pre-Loading library. 

## Basic Usage

```javascript

// LoaderJS
let loader = new LoaderJS();

// loadString
loader.loadString('myText', './text.txt');

// loadJSON
loader.loadJSON('myData', './data.json');

// loadImage
loader.loadImage('myImg', './img.jpg');

// loads URL encoded Blob data
loader.loadMedia('myAudio', './audio.mp3');
loader.loadMedia('myVideo', './video.mp4');


// while loading callback
loader.whileLoading = function() {
  // do something when files are loading
}

// when ready callback
loader.whenReady = function() {
  // all of the files stored in loader.assets Object
  console.log(loader.assets);
}

```

----------

## Loading Media Files

the `loadMedia()` function loads the file with `URL.createObjectURL()`

```javascript

// LoaderJS
let loader = new LoaderJS();

// loads URL encoded Blob data
loader.loadMedia('myAudio', './audio.mp3');
loader.loadMedia('myVideo', './video.mp4');

// when ready callback
loader.whenReady = function() {
  let audio = document.createElement('audio');
  audio.setAttribute('controls', 'controls');
  audio.src = loader.assets.myAudio;

  let video = document.createElement('video');
  video.setAttribute('controls', 'controls');
  video.src = loader.assets.myVideo;

  document.body.appendChild(audio);
  document.body.appendChild(video);
}

```