import URL from 'oneutil/URL'
import PATH from 'oneutil/PATH'
import STRING from 'oneutil/STRING'
export default class TheKit {
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
    } else if (uri.scheme === "ttfile") {
      type = "file";
      if (url.startsWith("ttfile://tmp_")) {
        result = url;
      } else if (url.startsWith("ttfile://store_")) {
        result = url;
      } else {
        console.log("=======", "[ttfile] " + url);
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
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static createUUIDfileName(fileName) {
    let uuid = TheKit.createUUID();
    let ext = fileName.substring(fileName.lastIndexOf("."), fileName.length);
    return uuid + ext;
  }

  static createTempPath(fileName) {
    let uuid = TheKit.createUUIDfileName(fileName);
    return `ttfile://temp__onekit__${uuid}`;
  }

  static createUserPath(fileName) {
    let uuid = TheKit.createUUIDfileName(fileName);
    return `ttfile://user__onekit__${uuid}`;
  }

  static createStorePath(fileName) {
    let uuid = createUUIDfileName(fileName);
    return `ttfile://store/onekit_${uuid}`;
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
      const {
        width: originWidth,
        height: originHeight
      } = img
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
      canvas.toBlob(function (blob) {
        resolve(blob)
      }, type || 'image/png')
    })
    /*
      @create by wangyewei 
    */
  }

  static downloadPicture(file, name) {
    const _image = new Image()
    _image.setAttribute("crossOrigin", 'Anonymous')
    _image.onload = () => {
      let canvas = document.createElement('canvas')
      canvas.width = _image.width
      canvas.height = _image.height
      let context = canvas.getContext('2d')
      context.drawImage(_image, 0, 0, _image.width, _image.height)
      const url = canvas.toDataURL('image/png')
      const $a = document.createElement('a')
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

  static blobToBase64(blob, callback) {
    let a = new FileReader();
    a.onload = function (e) {
      callback(e.target.result)
    }
    a.readAsDataURL(blob)

    /*
      @create by wangyewei 
    */
  }

  static getBase64Image(img) {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    const dataURL = canvas.toDataURL("image/" + ext);

    return dataURL;
  }

  static fileBtof(data, fileName) {
    const dataArr = data.split(",");
    const byteString = atob(dataArr[1]);

    const options = {
      type: "image/jpeg",
      endings: "native"
    };
    const u8Arr = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      u8Arr[i] = byteString.charCodeAt(i);
    }
    return new File([u8Arr], fileName + ".jpg", options);
  }

  static async dealImage(base64, w, quality, callback) {
    var newImage = new Image();
    newImage.src = base64;
    newImage.setAttribute("crossOrigin", 'Anonymous'); //url为外域时需要
    var imgWidth, imgHeight;
    newImage.onload = function () {
      imgWidth = this.width;
      imgHeight = this.height;
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      if (Math.max(imgWidth, imgHeight) > w) {
        if (imgWidth > imgHeight) {
          canvas.width = w
          canvas.height = w * imgHeight / imgWidth
        } else {
          canvas.height = w
          canvas.width = w * imgWidth / imgHeight
        }
      } else {
        canvas.width = imgWidth
        canvas.height = imgHeight
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(this, 0, 0, canvas.width, canvas.height)
      var base64 = canvas.toDataURL("image/jpeg", quality)
      callback(base64)
    }
  }

  static integer(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  static deepCopy(obj, cache = []) {
    if (obj == null || typeof obj !== 'object') {
      return obj
    }

    const hit = find(cache, c => c.original === obj)
    if (hit) {
      return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}

    cache.push({
      original: obj,
      copy
    })

    Object.keys(obj).forEach(key => {
      copy[key] = this.deepCopy(obj[key], cache)
    })

    return copy
  }

  static tempFilepath2digest(tempFilePath) {
    const left_flag = '__onekit__'
    const index_left = tempFilePath.indexOf(left_flag)
    const substr_left = tempFilePath.substring(index_left + left_flag.length, tempFilePath.length)

    const substr_right = substr_left.substring(substr_left.length + -10, 0)

    const reg = new RegExp('-', 'g')
    const digest = substr_right.replace(reg, '')
    return digest
  }

  static blob2string(blob, callbak) {
    const reader = new FileReader()
    reader.onload = () => {
      callbak(reader.result)
    }
    reader.readAsText(blob)
  }

  static blob2ascii(blob, callbak) {
    const reader = new FileReader()
    reader.onload = () => {
      callbak(reader.result)
    }
    reader.readAsText(blob, 'ascii')
  }

  static blob2binary(blob, callback) {
    const reader = new FileReader()
    reader.onload = () => {
      callback(reader.result)
    }
    reader.readAsBinaryString(blob)
  }

  static base64decode(e) {
    const base64DecodeChars = new Array((-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), 62, (-1), (-1), (-1), 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, (-1), (-1), (-1), (-1), (-1), (-1), (-1), 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, (-1), (-1), (-1), (-1), (-1), (-1), 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, (-1), (-1), (-1), (-1), (-1));
    let r, a, c, h, o, t, d;
    for (t = e.length, o = 0, d = ''; o < t;) {
      do r = base64DecodeChars[255 & e.charCodeAt(o++)]
      while (o < t && r == -1);
      if (r == -1) break;
      do a = base64DecodeChars[255 & e.charCodeAt(o++)]
      while (o < t && a == -1);
      if (a == -1) break;
      d += String.fromCharCode(r << 2 | (48 & a) >> 4)
      do {
        if (c = 255 & e.charCodeAt(o++), 61 == c) return d
        c = base64DecodeChars[c]
      } while (o < t && c == -1)
      if (c == -1) break;
      d += String.fromCharCode((15 & a) << 4 | (60 & c) >> 2)
      do {
        if (h = 255 & e.charCodeAt(o++), 61 == h) return d;
        h = base64DecodeChars[h]
      } while (o < t && h == -1)
      if (h == -1) break;
      d += String.fromCharCode((3 & c) << 6 | h)
    }
    return d
  }

  static blob2hex(blob, callback) {
    this.blobToBase64(blob, res => {
      console.log(res.toString(16))
    })
    this.blobToBase64(blob, res => {
      let bin = this.base64decode(res.replace(/[ \r\n]+$/, ""))
      let hex = []
      for (let i = 0; i < bin.length; ++i) {
        let tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) tmp = "0" + tmp;
        hex[hex.length] = tmp;
      }
      callback(hex.join(''))
    })
  }

  static blob2arrbuffer(blob, callback) {
    const reader = new FileReader()
    reader.onload = () => {
      callback(reader.result)
    }
    reader.readAsArrayBuffer(blob)
  }
}