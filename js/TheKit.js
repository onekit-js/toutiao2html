import URL from 'oneutil/URL'
import PATH from 'oneutil/PATH'
import STRING from 'oneutil/STRING'
const storeFiles = {};
const tempFiles = {};
export default class TheKit{
static isWeixin() {
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) === 'micromessenger';
}

static isMobile() {
  const ua = navigator.userAgent;

  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/),

    isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),

    isAndroid = ua.match(/(Android)\s+([\d.]+)/);
  return isIphone || isAndroid
}

static getUrl(url) {
  let uri = new URL(url);
  let result;
  let type;
  if (uri.scheme == null) {
    type = "asset";
    result = url;
  } else if (uri.scheme === "wxfile") {
    type = "file";
    if (url.startsWith("wxfile://tmp_")) {
      result = url;
    } else if (url.startsWith("wxfile://store_")) {
      result = url;
    } else {
      console.log("=======", "[wxfile] " + url);
      result = null;
    }
  } else {
    type = "www";
    result = url;
  }
  return [type, result];
}

static getExt(url) {
  let x = url.lastIndexOf(".");
  if (x >= 0) {
    return url.substr(x + 1);
  } else {
    return "";
  }
}

static createUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

static createUUIDfileName(fileName) {
  let uuid = createUUID();
  let ext = fileName.substring(fileName.lastIndexOf("."), fileName.length);
  return uuid + ext;
}

static createTempPath(fileName) {
  let uuid = createUUIDfileName(fileName);
  return `wxfile://tmp_onekit_${uuid}`;
}

static createStorePath(fileName) {
  let uuid = createUUIDfileName(fileName);
  return `wxfile://store/onekit_${uuid}`;
}

/*
loadImage(src, callback) {

  if (String.isEmpty(src)) {
    callback(null, null);
    return;
  }
  let url = new URL(src);
  if (url.toString().indexOf("tmp") !== -1) {
    let image = tempFiles[url];
    callback(image, src);
  } else if (url.toString().indexOf("store") !== -1) {
    let image = storeFiles[url];
    callback(image, src);
  } else if (url.getHost() != null) {
    $.ajax({
      url: url,
      dataType: "arraybuffer",
      success: function(blob) {
        callback(blob, src);
      },
      error: function(a, b) {
        console.log(a, b);
      }
    });
  } else {
    $.ajax({
      url: url,
      dataType: "arraybuffer",
      success: function(blob) {
        callback(blob, src);
      },
      error: function(a, b) {
        console.log(a, b);
      }
    });
  }
}
*/

static raiseEvent(target, type, e) {
  return {
    changedTouches: [{
      clientX: e.clientX,
      clientY: e.clientY,
      force: 1,
      identifier: 0,
      pageX: e.pageX,
      pageY: e.pageY,
    }],
    currentTarget: {
      dataset: {},
      id: target.id,
      offsetLeft: target.offsetLeft,
      offsetTop: target.offsetTop,
    },
    detail: {
      x: e.x,
      y: e.y
    },
    target: {
      dataset: {},
      id: target.id,
      offsetLeft: target.offsetLeft,
      offsetTop: target.offsetTop,
      timeStamp: e.timeStamp
    },
    touches: [{
      clientX: e.clientX,
      clientY: e.clientY,
      force: 1,
      identifier: 0,
      pageX: e.pageX,
      pageY: e.pageY,
    }],
    type: type,
  }
}


static fixurl(wx_rel_url) {
  const wx_abs_url = PATH.res2abs(currentUrl(), wx_rel_url)
  if (Vue.prototype.APP_JSON.pages.indexOf(wx_abs_url) < 0) {
    if (Vue.prototype.onPageNotFound) {
      Vue.prototype.onPageNotFound();
    }
  }
  const vue_path = wx_abs_url // ...
  return vue_path
}


header2json(str) {
  var strArray = str.split('\n');
  var headers = {};

  for (let i = 0; i < strArray.length - 1; i++) {
    var array = strArray[i].split(': ');
    var key = STRING.firstUpper(array[0]);
    var value = array[1];
    headers[key] = value;
  }
  return headers;
}

static compressImg(img, type, mx, mh) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const { width: originWidth, height: originHeight } = img
    const maxWidth = mx
    const maxHeight = mh
    let targetWidth = originWidth
    let targetHeight = originHeight
    if (originWidth > maxWidth || originHeight > maxHeight) {
      if (originWidth / originHeight > 1) {
        targetWidth = maxWidth
        targetHeight = Math.round(maxWidth * (originHeight / originWidth))
      } else {
        targetHeight = maxHeight
        targetWidth = Math.round(maxHeight * (originWidth / originHeight))
      }
    }
    canvas.width = targetWidth
    canvas.height = targetHeight
    context.clearRect(0, 0, targetWidth, targetHeight)
    context.drawImage(img, 0, 0, targetWidth, targetHeight)
    canvas.toBlob(function(blob) {
      resolve(blob)
    }, type || 'image/png')
  })
}

static downloadPicture(file,name){
  const _image = new Image()
  _image.setAttribute('crossOrigin', 'anoymous')
  _image.onload = () => {
    let canvas = document.createElement('canvas')
    canvas.width = _image.width
    canvas.height = _image.height
    let context = canvas.getContext('2d')
    context.drawImage(_image,0, 0, _image.width, _image.height)
    const url = canvas.toDataURL('image/png')
    
    const $a =document.createElement('a')
    const event = new MouseEvent('click')

    $a.download = name
    $a.href = url
    $a.dispatchEvent(event)
   
  }
  _image.src = file

  /*
    @create by wangyewei 
  
  */

}
}