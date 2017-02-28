/*!
 * @packet util.file;
 */
var md5 = '!function(a){if("object"==typeof exports)module.exports=a();else if("function"==typeof define&&define.amd)define(a);else{var b;try{b=window}catch(c){b=self}b.SparkMD5=a()}}(function(a){function b(a,b,c,d,e,f){return b=t(t(b,a),t(d,f)),t(b<<e|b>>>32-e,c)}function c(a,c,d,e,f,g,h){return b(c&d|~c&e,a,c,f,g,h)}function d(a,c,d,e,f,g,h){return b(c&e|d&~e,a,c,f,g,h)}function e(a,c,d,e,f,g,h){return b(c^d^e,a,c,f,g,h)}function f(a,c,d,e,f,g,h){return b(d^(c|~e),a,c,f,g,h)}function g(a,b){var g=a[0],h=a[1],i=a[2],j=a[3];g=c(g,h,i,j,b[0],7,-680876936),j=c(j,g,h,i,b[1],12,-389564586),i=c(i,j,g,h,b[2],17,606105819),h=c(h,i,j,g,b[3],22,-1044525330),g=c(g,h,i,j,b[4],7,-176418897),j=c(j,g,h,i,b[5],12,1200080426),i=c(i,j,g,h,b[6],17,-1473231341),h=c(h,i,j,g,b[7],22,-45705983),g=c(g,h,i,j,b[8],7,1770035416),j=c(j,g,h,i,b[9],12,-1958414417),i=c(i,j,g,h,b[10],17,-42063),h=c(h,i,j,g,b[11],22,-1990404162),g=c(g,h,i,j,b[12],7,1804603682),j=c(j,g,h,i,b[13],12,-40341101),i=c(i,j,g,h,b[14],17,-1502002290),h=c(h,i,j,g,b[15],22,1236535329),g=d(g,h,i,j,b[1],5,-165796510),j=d(j,g,h,i,b[6],9,-1069501632),i=d(i,j,g,h,b[11],14,643717713),h=d(h,i,j,g,b[0],20,-373897302),g=d(g,h,i,j,b[5],5,-701558691),j=d(j,g,h,i,b[10],9,38016083),i=d(i,j,g,h,b[15],14,-660478335),h=d(h,i,j,g,b[4],20,-405537848),g=d(g,h,i,j,b[9],5,568446438),j=d(j,g,h,i,b[14],9,-1019803690),i=d(i,j,g,h,b[3],14,-187363961),h=d(h,i,j,g,b[8],20,1163531501),g=d(g,h,i,j,b[13],5,-1444681467),j=d(j,g,h,i,b[2],9,-51403784),i=d(i,j,g,h,b[7],14,1735328473),h=d(h,i,j,g,b[12],20,-1926607734),g=e(g,h,i,j,b[5],4,-378558),j=e(j,g,h,i,b[8],11,-2022574463),i=e(i,j,g,h,b[11],16,1839030562),h=e(h,i,j,g,b[14],23,-35309556),g=e(g,h,i,j,b[1],4,-1530992060),j=e(j,g,h,i,b[4],11,1272893353),i=e(i,j,g,h,b[7],16,-155497632),h=e(h,i,j,g,b[10],23,-1094730640),g=e(g,h,i,j,b[13],4,681279174),j=e(j,g,h,i,b[0],11,-358537222),i=e(i,j,g,h,b[3],16,-722521979),h=e(h,i,j,g,b[6],23,76029189),g=e(g,h,i,j,b[9],4,-640364487),j=e(j,g,h,i,b[12],11,-421815835),i=e(i,j,g,h,b[15],16,530742520),h=e(h,i,j,g,b[2],23,-995338651),g=f(g,h,i,j,b[0],6,-198630844),j=f(j,g,h,i,b[7],10,1126891415),i=f(i,j,g,h,b[14],15,-1416354905),h=f(h,i,j,g,b[5],21,-57434055),g=f(g,h,i,j,b[12],6,1700485571),j=f(j,g,h,i,b[3],10,-1894986606),i=f(i,j,g,h,b[10],15,-1051523),h=f(h,i,j,g,b[1],21,-2054922799),g=f(g,h,i,j,b[8],6,1873313359),j=f(j,g,h,i,b[15],10,-30611744),i=f(i,j,g,h,b[6],15,-1560198380),h=f(h,i,j,g,b[13],21,1309151649),g=f(g,h,i,j,b[4],6,-145523070),j=f(j,g,h,i,b[11],10,-1120210379),i=f(i,j,g,h,b[2],15,718787259),h=f(h,i,j,g,b[9],21,-343485551),a[0]=t(g,a[0]),a[1]=t(h,a[1]),a[2]=t(i,a[2]),a[3]=t(j,a[3])}function h(a){var b,c=[];for(b=0;64>b;b+=4)c[b>>2]=a.charCodeAt(b)+(a.charCodeAt(b+1)<<8)+(a.charCodeAt(b+2)<<16)+(a.charCodeAt(b+3)<<24);return c}function i(a){var b,c=[];for(b=0;64>b;b+=4)c[b>>2]=a[b]+(a[b+1]<<8)+(a[b+2]<<16)+(a[b+3]<<24);return c}function j(a){var b,c,d,e,f,i,j=a.length,k=[1732584193,-271733879,-1732584194,271733878];for(b=64;j>=b;b+=64)g(k,h(a.substring(b-64,b)));for(a=a.substring(b-64),c=a.length,d=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],b=0;c>b;b+=1)d[b>>2]|=a.charCodeAt(b)<<(b%4<<3);if(d[b>>2]|=128<<(b%4<<3),b>55)for(g(k,d),b=0;16>b;b+=1)d[b]=0;return e=8*j,e=e.toString(16).match(/(.*?)(.{0,8})$/),f=parseInt(e[2],16),i=parseInt(e[1],16)||0,d[14]=f,d[15]=i,g(k,d),k}function k(a){var b,c,d,e,f,h,j=a.length,k=[1732584193,-271733879,-1732584194,271733878];for(b=64;j>=b;b+=64)g(k,i(a.subarray(b-64,b)));for(a=j>b-64?a.subarray(b-64):new Uint8Array(0),c=a.length,d=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],b=0;c>b;b+=1)d[b>>2]|=a[b]<<(b%4<<3);if(d[b>>2]|=128<<(b%4<<3),b>55)for(g(k,d),b=0;16>b;b+=1)d[b]=0;return e=8*j,e=e.toString(16).match(/(.*?)(.{0,8})$/),f=parseInt(e[2],16),h=parseInt(e[1],16)||0,d[14]=f,d[15]=h,g(k,d),k}function l(a){var b,c="";for(b=0;4>b;b+=1)c+=u[a>>8*b+4&15]+u[a>>8*b&15];return c}function m(a){var b;for(b=0;b<a.length;b+=1)a[b]=l(a[b]);return a.join("")}function n(a){return/[\u0080-\uFFFF]/.test(a)&&(a=unescape(encodeURIComponent(a))),a}function o(a,b){var c,d=a.length,e=new ArrayBuffer(d),f=new Uint8Array(e);for(c=0;d>c;c+=1)f[c]=a.charCodeAt(c);return b?f:e}function p(a){return String.fromCharCode.apply(null,new Uint8Array(a))}function q(a,b,c){var d=new Uint8Array(a.byteLength+b.byteLength);return d.set(new Uint8Array(a)),d.set(new Uint8Array(b),a.byteLength),c?d:d.buffer}function r(a){var b,c=[],d=a.length;for(b=0;d-1>b;b+=2)c.push(parseInt(a.substr(b,2),16));return String.fromCharCode.apply(String,c)}function s(){this.reset()}var t=function(a,b){return a+b&4294967295},u=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];return"5d41402abc4b2a76b9719d911017c592"!==m(j("hello"))&&(t=function(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}),"undefined"==typeof ArrayBuffer||ArrayBuffer.prototype.slice||!function(){function b(a,b){return a=0|a||0,0>a?Math.max(a+b,0):Math.min(a,b)}ArrayBuffer.prototype.slice=function(c,d){var e,f,g,h,i=this.byteLength,j=b(c,i),k=i;return d!==a&&(k=b(d,i)),j>k?new ArrayBuffer(0):(e=k-j,f=new ArrayBuffer(e),g=new Uint8Array(f),h=new Uint8Array(this,j,e),g.set(h),f)}}(),s.prototype.append=function(a){return this.appendBinary(n(a)),this},s.prototype.appendBinary=function(a){this._buff+=a,this._length+=a.length;var b,c=this._buff.length;for(b=64;c>=b;b+=64)g(this._hash,h(this._buff.substring(b-64,b)));return this._buff=this._buff.substring(b-64),this},s.prototype.end=function(a){var b,c,d=this._buff,e=d.length,f=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(b=0;e>b;b+=1)f[b>>2]|=d.charCodeAt(b)<<(b%4<<3);return this._finish(f,e),c=m(this._hash),a&&(c=r(c)),this.reset(),c},s.prototype.reset=function(){return this._buff="",this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},s.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash}},s.prototype.setState=function(a){return this._buff=a.buff,this._length=a.length,this._hash=a.hash,this},s.prototype.destroy=function(){delete this._hash,delete this._buff,delete this._length},s.prototype._finish=function(a,b){var c,d,e,f=b;if(a[f>>2]|=128<<(f%4<<3),f>55)for(g(this._hash,a),f=0;16>f;f+=1)a[f]=0;c=8*this._length,c=c.toString(16).match(/(.*?)(.{0,8})$/),d=parseInt(c[2],16),e=parseInt(c[1],16)||0,a[14]=d,a[15]=e,g(this._hash,a)},s.hash=function(a,b){return s.hashBinary(n(a),b)},s.hashBinary=function(a,b){var c=j(a),d=m(c);return b?r(d):d},s.ArrayBuffer=function(){this.reset()},s.ArrayBuffer.prototype.append=function(a){var b,c=q(this._buff.buffer,a,!0),d=c.length;for(this._length+=a.byteLength,b=64;d>=b;b+=64)g(this._hash,i(c.subarray(b-64,b)));return this._buff=d>b-64?new Uint8Array(c.buffer.slice(b-64)):new Uint8Array(0),this},s.ArrayBuffer.prototype.end=function(a){var b,c,d=this._buff,e=d.length,f=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(b=0;e>b;b+=1)f[b>>2]|=d[b]<<(b%4<<3);return this._finish(f,e),c=m(this._hash),a&&(c=r(c)),this.reset(),c},s.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},s.ArrayBuffer.prototype.getState=function(){var a=s.prototype.getState.call(this);return a.buff=p(a.buff),a},s.ArrayBuffer.prototype.setState=function(a){return a.buff=o(a.buff,!0),s.prototype.setState.call(this,a)},s.ArrayBuffer.prototype.destroy=s.prototype.destroy,s.ArrayBuffer.prototype._finish=s.prototype._finish,s.ArrayBuffer.hash=function(a,b){var c=k(new Uint8Array(a)),d=m(c);return b?r(d):d},s}),addEventListener("message",function(a){function b(){var a=g*e,b=a+1024>=c.size?c.size:a+1024;i.readAsArrayBuffer(d.call(c,a,b))}var c=a.data,d=File.prototype.slice||File.prototype.mozSlice||File.prototype.webkitSlice,e=2097152,f=Math.ceil(c.size/e),g=0,h=new SparkMD5.ArrayBuffer,i=new FileReader;i.onload=function(a){h.append(a.target.result),g++,f>g?b():postMessage(h.end())},i.onerror=function(){postMessage(null)},b()},!1);';
var uriworker = 'addEventListener("message",function(c){var a=c.data;var b=new FileReader();b.onload=function(d){postMessage(d.target.result)};b.readAsDataURL(a)},false);';

var file = function (filex, type) {
    var _file = filex;
    this._uri="";
    if ($.is.isString(filex)) {
        if (type) {
            _file = new Blob([filex], {type: type});
        } else {
            this._url=filex;
            _file = file.getBlobFromURI(filex);
        }
    } else if ($.is.isArray(filex)) {
        _file = new Blob(filex, {type: (type || "text/plain")});
    }
    this.file = _file;
};
file.getBlobFromURI = function (dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = parts[1];
        return new Blob([raw], {type: contentType});
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var byteString = atob(parts[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: contentType});
};
file.saveAs = function (blob, filename) {
    var type = blob.type;
    var force_saveable_type = 'application/octet-stream';
    if (type && type !== force_saveable_type) {
        var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
        blob = slice.call(blob, 0, blob.size, force_saveable_type);
    }
    var url = URL.createObjectURL(blob);
    var event = document.createEvent("MouseEvent");
    event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var t = document.createElement("a");
    t.href = url;
    t.download = filename;
    t.dispatchEvent(event);
};
file.upload = function (option) {
    return $.ajax({
        url: option.url || null,
        data: option.file,
        method: "post",
        dataType: "json",
        timeout: option.timeout,
        headers: option.headers || {},
        query:option.query,
        events: {
            load: function (e) {
                var status = e.target.status;
                if ((status >= 200 && status < 300) || status === 304 || status === 0) {
                    if (option.success) {
                        var a = this.response.responseText;
                        if (option.dataType === "json") {
                            try {
                                a = window.JSON.parse(a);
                            } catch (e) {
                                a = {};
                            }
                        }
                        option.success(a);
                    }
                } else {
                    if (option.error)
                        option.error(e);
                }
            },
            progress: function (e) {
                if (option.progress) {
                    option.progress({
                        total: e.total,
                        loaded: e.loaded,
                        percent: Math.round(e.loaded * 100 / e.total)
                    });
                }
            },
            error: function (e) {
                if (option.error)
                    option.error(e);
            }
        }
    });
};
file.uploadAsForm = function (option) {
    var formdata = new FormData();
    formdata.append((option.name || "file"), option.file);
    for (var _p in option.data) {
        formdata.append(_p, option.data[_p]);
    }
    return $.ajax({
        url: option.url || null,
        data: formdata,
        method: "post",
        dataType: "json",
        timeout: option.timeout,
        query:option.query,
        headers: option.headers || {},
        events: {
            load: function (e) {
                var status = e.target.status;
                if ((status >= 200 && status < 300) || status === 304 || status === 0) {
                    if (option.success) {
                        var a = this.response.responseText;
                        if (option.dataType === "json") {
                            try {
                                a = window.JSON.parse(a);
                            } catch (e) {
                                a = {};
                            }
                        }
                        option.success(a);
                    }
                } else {
                    if (option.error)
                        option.error(e);
                }
            },
            progress: function (e) {
                if (option.progress) {
                    option.progress({
                        total: e.total,
                        loaded: e.loaded,
                        percent: Math.round(e.loaded * 100 / e.total)
                    });
                }
            },
            error: function (e) {
                if (option.error)
                    option.error(e);
            },
            abort:function(){
                if(option.abort){
                    option.abort();
                }
            }
        }
    });
};
file.prototype.isSame = function (file) {
    var t = file;
    if (file.file) {
        t = file.getFile();
    }
    return this.file.lastModified === t.lastModified && this.file.size === t.size && this.file.type === t.type && this.file.name === t.name;
};
file.prototype.getFile = function () {
    return this.file;
};
file.prototype.getFileName = function () {
    return this.file ? this.file.name : "";
};
file.prototype.getFileSize = function (type, size) {
    var a = this.file.size;
    if (type === "MB") {
        a = this.file.size / (1024 * 1024);
    } else if (type === "KB") {
        a = this.file.size / 1024;
    } else if (type === "GB") {
        a = this.file.size / (1024 * 1024 * 1024);
    }
    if (arguments.length === 2) {
        a = a.toFixed(size) / 1;
    }
    return a;
};
file.prototype.getFileSizeAuto = function (radmon) {
    var v = 0, unit = "BYTE", byteSize = this.file.size;
    radmon = radmon || 0;
    if (byteSize >= 1073741824) {
        v = (byteSize / 1073741824).toFixed(radmon);
        unit = "GB";
    } else if (byteSize >= 1048576) {
        v = (byteSize / 1048576).toFixed(radmon);
        unit = "MB";
    } else if (byteSize >= 1024) {
        v = (byteSize / 1024).toFixed(radmon);
        unit = "KB";
    } else {
        v = byteSize;
        unit = "B";
    }
    return v + unit;
};
file.prototype.getFileType = function () {
    return this.file ? this.file.type : "";
};
file.prototype.getFileURI = function () {
    var ps = $.promise();
    if(this._uri){
        ps.resolve(this._uri);
    }else{
        var reader = new FileReader();
        reader.onload = function (e) {
            ps.resolve(e.target.result);
        };
        reader.readAsDataURL(this.file);
    }
    return ps;
};
file.prototype.getFileURL = function () {
    return window.URL.createObjectURL(this.file);
};
file.prototype.getFileURIByWorker = function () {
    var ps = $.promise();
    var worker = new Worker(window.URL.createObjectURL(new Blob([uriworker], {type: "text/javascript"})));
    worker.addEventListener("message", function (e) {
        ps.resolve(e.data);
    });
    worker.postMessage(this.file);
    return ps;
};
file.prototype.getFileHash = function () {
    var ps = $.promise();
    var worker = new Worker(window.URL.createObjectURL(new Blob([md5], {type: "text/javascript"})));
    worker.addEventListener("message", function (e) {
        ps.resolve(e.data);
    });
    worker.postMessage(this.file);
    return ps;
};
file.prototype.getSuffix = function () {
    if (this.getFileName()) {
        var name = this.getFileName().split(".");
        if (name.length > 1) {
            return name[name.length - 1];
        } else {
            return "";
        }
    } else {
        return "";
    }
};
file.prototype.isSuffixWith = function (suffix) {
    return suffix === this.getSuffix();
};
file.prototype.isTypeOf = function (type) {
    var typet = this.getFileType();
    return typet === type;
};
file.prototype.createImageElement = function () {
    var ps = $.promise();
    if (this.file.type.indexOf("image") !== -1) {
        var image = document.createElement("img");
        var a=this.getFileURL();
        $(image).load(function () {
            ps.resolve({
                uri: a,
                element: image
            });
        });
        image.src = a;
    } else {
        ps.reject();
    }
    return ps;
};
file.prototype.compressImage = function (quality) {
    var ps = $.promise(), ths = this;
    this.createImageElement().then(function (a) {
        var cvs = document.createElement('canvas');
        cvs.width = a.width;
        cvs.height = a.height;
        cvs.getContext("2d").drawImage(a, 0, 0);
        ps.resolve(new file(cvs.toDataURL(ths.file.type, quality / 100)));
    },function () {
        ps.reject();
    });
    return ps;
};
file.prototype.createImageCanvas = function (width, height) {
    var ps = promise();
    if (this.file.type.indexOf("image") !== -1) {
        var a=this.getFileURL();
        var image = document.createElement("img");
        $(image).load(function () {
            try {
                var _width = image.width, _height = image.height;
                var _w = 0, _h = 0;
                if (_width > width) {
                    _w = width;
                    _h = _height / _width * width;
                    if (_h > height) {
                        _h = height;
                        _w = _width / _height * height;
                    }
                } else if (_height > height) {
                    _h = height;
                    _w = _width / _height * height;
                    if (_w > width) {
                        _w = width;
                        _h = _height / _width * width;
                    }
                } else {
                    _w = image.width;
                    _h = image.height;
                }
                var _x = (width - _w) / 2, _y = (height - _h) / 2;
                var source = image;
                if (image.width > 8000 || image.height > 8000) {
                    var cvs = document.createElement('canvas');
                    cvs.width = image.width;
                    cvs.height = image.height;
                    var ctx=cvs.getContext("2d");
                    ctx.mozImageSmoothingEnabled = false;
                    ctx.webkitImageSmoothingEnabled = false;
                    ctx.msImageSmoothingEnabled = false;
                    ctx.imageSmoothingEnabled = false;
                    ctx.mozImageSmoothingQuality = "low";
                    ctx.webkitImageSmoothingQuality = "low";
                    ctx.msImageSmoothingQuality = "low";
                    ctx.imageSmoothingQuality = "low";
                    ctx.drawImage(image, 0, 0);
                    source = cvs;
                }
                var cvs2 = document.createElement('canvas');
                cvs2.width = width;
                cvs2.height = height;
                var ctx=cvs2.getContext("2d");
                ctx.mozImageSmoothingEnabled = false;
                ctx.webkitImageSmoothingEnabled = false;
                ctx.msImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;
                ctx.mozImageSmoothingQuality = "low";
                ctx.webkitImageSmoothingQuality = "low";
                ctx.msImageSmoothingQuality = "low";
                ctx.imageSmoothingQuality = "low";
                ctx.drawImage(source, 0, 0, image.width, image.height, _x, _y, _w, _h);
                ps.resolve({
                    uri: a,
                    element: cvs2
                });
            }catch (e){
                console.log(e);
                ps.reject({
                    uri:a,
                    element:null
                });
            }
        }).error(function (a) {
            ps.reject({
                uri:a,
                element:null
            });
        });
        image.src = a;
    } else {
        ps.reject();
    }
    return ps;
};
file.prototype.saveAs = function (filename) {
    file.saveAs(this.file, filename);
};
file.prototype.upload = function (option) {
    option.file = this.file;
    return file.upload(option);
};
file.prototype.uploadAsForm = function (option) {
    option.file = this.file;
    return file.uploadAsForm(option);
};
file.prototype.getChunk = function (from, size, mime) {
    var blob = this.file;
    var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
    var args = [from];
    if (arguments.length === 2) {
        if ($.is.isString(mime)) {
            args.push(size);
        } else {
            args.push(from + size);
        }
    } else if (arguments.length === 3) {
        args.push(from + size);
        args.push(mime);
    }
    return slice.apply(blob, args);
};
file.prototype.uploadChunk = function (option) {
    var from = option.from, size = option.size, mime = option.mime;
    var args = [];
    if (from !== undefined && from !== null) {
        args.push(from);
    }
    if (size !== undefined && size !== null) {
        args.push(size);
    }
    if (mime !== undefined && mime !== null) {
        args.push(mime);
    }
    option.file = this.getChunk.apply(this, args);
    return file.upload(option);
};
file.prototype.getChunks = function (from, size, mime) {
    var ths = this;
    var blob = this.file;
    var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
    var sizet = ths.getFileSize();
    var q = parseInt((sizet - from) / size);
    var r = [];
    for (var i = 0; i < q; i++) {
        var args = [from + i * size, from + (i + 1) * size, mime];
        r.push(slice.apply(blob, args));
    }
    r.push(slice.apply(blob, [from + q * size, sizet, mime]));
    return r;
};
file.prototype.uploadChunks = function (ops) {
    return this.uploadChunksByPool($.extend(ops,{poolsize:1}));
};

module.exports = function (filet,type) {
    return new file(filet,type);
};