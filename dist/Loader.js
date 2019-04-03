/**
 * @class LoaderJS
 * @author AnuragHazra <hazru.anurag@gmail.com>
 * @version 1.0.0
 */
function LoaderJS() {
  this.assets = {};

  this.whenReady = undefined;
  this.whileLoading = undefined;

  this.resCount = 0;
  this.loaded = false;

  window.setTimeout(() => {
    this._loading();
  }, 0);
}

/**
 * @method _increaseCount()
 * @private
 * progression callback
 */
LoaderJS.prototype._loading = function () {
  if (this.whileLoading) {
    this.timer = window.setInterval(() => {
      if (this.resCount > 0) {
        this.whileLoading();
      } else {
        window.clearInterval(this.timer);
        this.timer = null;
      }
    }, 100)
  }
}


/**
 * @method _increaseCount()
 * @private
 */
LoaderJS.prototype._increaseCount = function () {
  this.resCount++;
}
/**
 * @method _validateResponse()
 * @private
 * @param {Response} res 
 * checks for valid response
 */
LoaderJS.prototype._validateResponse = function (res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res;
}

/**
 * @method _checkReady()
 * @private
 * keeps track of resource count and fire whenReady() callback when
 * all of the resources are loaded
 */
LoaderJS.prototype._checkReady = function () {
  if (this.resCount <= 0) this.loaded = true;
  if (this.resCount <= 0 && this.whenReady) {
    this.whenReady();
  }
}

/**
 * @method _add()
 * @param {String} name
 * @param {JSON|String|Blob} data 
 * @private
 * adds the loaded data to the assets Array
 */
LoaderJS.prototype._add = function (name, data) {
  this.assets[name] = data;
  this.resCount--;
}

/**
 * @method loadString()
 * @param {String} name
 * @param {String} file
 * loads text files
 */
LoaderJS.prototype.loadString = function (name, file) {
  this._increaseCount();
  fetch(file)
    .then(res => this._validateResponse(res))
    .then(res => res.text())
    .then(data => {
      this._add(name, data);

      this._checkReady();
    })
    .catch(err => {
      console.error(err, 'file - ' + name + ' , URL ' + file)
    });
}

/**
 * @method loadJSON()
 * @param {String} name
 * @param {String} file
 * loads JSON files
 */
LoaderJS.prototype.loadJSON = function (name, file) {
  this._increaseCount();
  fetch(file)
    .then(res => this._validateResponse(res))
    .then(res => res.json())
    .then(data => {
      this._add(name, data);

      this._checkReady();
    })
    .catch(err => {
      console.error(err, 'file - ' + name + ' , URL ' + file)
    });
}

/**
 * @method loadImage()
 * @param {String} name
 * @param {String} file
 * loads image files as dom elements
 */
LoaderJS.prototype.loadImage = function (name, file) {
  this._increaseCount();
  let img = new Image();
  img.src = file;

  img.onload = () => {
    this._add(name, img);
    this._checkReady();
  }
  img.onerror = (err) => {
    console.error(err, 'file - ' + name + ' , URL ' + file)
  }
}


/**
 * @method loadVideo()
 * @param {String} name
 * @param {String} file
 * @param {Headers} headers 
 * loads Video files
 */
LoaderJS.prototype.loadVideo = function (name, file) {
  this._increaseCount();
  let video = document.createElement('video');
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.src = file;
  video.load();
  
  this._add(name, video);
  this._checkReady();
  video.play();
}

/**
 * @method loadMedia()
 * @param {String} name
 * @param {String} file
 * @param {Headers} headers 
 * loads Audio, Video or media blobs
 */
LoaderJS.prototype.loadMedia = function (name, file, headers) {
  this._increaseCount();
  fetch(file, headers)
    // .then(res => this._validateResponse(res))
    .then(res => res.blob())
    .then(data => {
      this.assets[name] = URL.createObjectURL(data);
      this.resCount--;
      this._checkReady();
    })
    .catch(err => {
      console.error(err, 'file - ' + name + ' , URL ' + file)
    });
}