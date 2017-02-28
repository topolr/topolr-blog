window.topolr.source({"packet":[{"p":"option.article","h":"177fda9b75","c":"/* \n * @packet option.article;\n * @require site.admin;\n */\nOption({name:\"page\",option:{modules:[{type:\"@admin.adminhead\"},{type:\"@admin.articlelist\"},{type:\"@admin.copyright\"}]}});"},{"p":"site.admin","h":"887bd6620a","c":"/**\n * @packet site.admin;\n * @require site.service.admin;\n * @require site.service.base;\n * @require site.service.apiconfig;\n * @require util.uikit;\n * @require util.images;\n * @template site.template.admintemp;\n * @css site.style.main;\n * @map (js)lib.ace.ace;\n */\nModule({name:\"login\",extend:\"view\",className:\"login\",template:\"@admintemp.login\",services:{admin:\"@admin.userservice\"},init:function(){this.render()},find_submit:function(e){e.click(function(){var e=this.finders(\"username\").val(),t=this.finders(\"password\").val();e&&t?this.getService(\"admin\").trigger(\"login\",{username:e,password:t}).scope(this).done(function(e){this.dispatchEvent(\"redirectPage\",{url:\"admin\"})}).fail(function(){$.toast(\"username or password is not matched\")}):$.toast(\"username or password can not empty\")}.bind(this))}}),Module({name:\"adminhead\",extend:\"view\",className:\"adminhead\",template:\"@admintemp.adminhead\",init:function(){var e=this;this.render(),this.dom.find(\"a\").each(function(){$(this).click(function(t){e.dispatchEvent(\"openPage\",{url:$(this).attr(\"href\")}),t.preventDefault()})})}}),Module({name:\"articlelist\",extend:\"view\",className:\"list\",template:\"@admintemp.articlelist\",autodom:!0,services:{scroll:\"@base.scrollservice\",list:\"@base.listservice\"},option:{service_list:{url:require(\"@apiconfig\").get(\"articlelist\"),detail:require(\"@apiconfig\").get(\"articledetail\"),pagesize:10}},bind_add:function(e){this.dispatchEvent(\"openPage\",{url:\"admin/addarticle\"})},onnodeinserted:function(e){var t=this;$(e).find(\"a\").each(function(){$(this).click(function(e){console.log($(this).group().cache()),t.dispatchEvent(\"openPage\",{url:$(this).attr(\"href\"),data:$(this).group().cache()}),e.preventDefault()})})},group_item:function(e){e.items(\"remove\").click(function(){console.log($(this).group().cache())})},service_scroll:function(){var e=this.finders(\"loading\").get(0).offsetTop;e&&$(\"body\").scrollTop()>this.finders(\"loading\").get(0).offsetTop-$(window).height()&&(this.finders(\"loading\").show(),this.getService(\"list\").trigger(\"next\").scope(this).always(function(){this.finders(\"loading\").hide()}))},service_firstpage:function(){this.dispatchEvent(\"listdone\")}}),Module({name:\"editor\",setEditor:function(e){$().create(\"script\").attr(\"src\",module.currentPath+\"lib/ace/ace.js\").attr(\"type\",\"text/noload\").appendTo(\"head\"),module.getMapSource(\"@ace\").scope(this).done(function(){var t=$.util.randomid(8);$().create(\"pre\").css({height:\"600px\"}).attr(\"id\",t).appendTo(e);var i=window.ace.edit(t);i.setTheme(\"ace/theme/github\"),i.getSession().setMode(\"ace/mode/markdown\"),this.editor=i,this.dispatchEvent(\"editdone\")})}}),Module({name:\"editarticle\",extend:[\"viewgroup\",\"@.editor\"],className:\"editarticle\",layout:\"@admintemp.editarticle\",autodom:!0,services:{article:\"@admin.articleservice\"},option:{imageType:\"@images.imagesuploader\"},find_editor:function(e){this.setEditor(e)},find_submit:function(e){e.click(function(){var e=this.groups(\"title\").items(\"input\").val(),t=this.groups(\"desc\").items(\"input\").val(),i=this.editor.getValue(),n=!1;if(e?t?i?n=!0:$.toast(\"content can not empty\"):$.toast(\"desc can not empty\"):$.toast(\"title can not empty\"),n){var o={title:e,desc:t,content:i};this.onsubmit&&(o=this.onsubmit(o)),$.loadingbar().showLoading(),this.getChildAt(0).upload(o,function(){$.loadingbar().showSuccess()},function(){$.loadingbar().showError()})}}.bind(this))},setContent:function(e){this.update(e)},onsubmit:function(e){var t=$.serialize.queryObject(window.location.href);return t?$.extend(e,{id:t.id}):e},event_editdone:function(){var e=$.serialize.queryObject(window.location.href);e&&(this.getChildAt(0).option.url=sitePath+\"/api/admin/article/edit\",this.getService(\"article\").trigger(\"fetch\",e).scope(this).then(function(e){this.update(e)},function(e){console.log(e)}))}}),Module({name:\"edituserinfo\",extend:[\"view\",\"@.editor\"],className:\"editarticle\",template:\"@admintemp.edituserinfo\",services:{user:\"@admin.userservice\"},init:function(){this.render()},find_editor:function(e){this.setEditor(e)},find_submit:function(e){e.click(function(){var e=this.editor.getValue(),t=!1;e?t=!0:$.toast(\"content can not empty\"),t&&(this.info.userinfomd=e,$.loadingbar().showLoading(),this.getService(\"user\").trigger(\"edit\",this.info).scope(this).done(function(){$.loadingbar().showSuccess()}).fail(function(){$.loadingbar().showError()}))}.bind(this))},setContent:function(e){this.editor.setValue(e)},event_editdone:function(){var e=this.getService(\"user\").action(\"get\");this.info=e[0],this.editor.setValue(e[0].userinfomd)}}),Module({name:\"noadminhead\",extend:\"view\",className:\"adminhead\",template:\"@admintemp.noadminhead\",init:function(){this.render()}}),Module({name:\"copyright\",extend:\"view\",className:\"copyright\",template:\"@admintemp.copyright\",init:function(){this.render()}});"},{"p":"site.service.admin","h":"61d97aeb6c","c":"/**\n * @packet site.service.admin;\n * @require site.service.apiconfig;\n */\nModule({name:\"userservice\",extend:\"publicservice\",init:function(){this.start()},service_login:function(t){return this.stop(),this.postRequest(require(\"@apiconfig\").get(\"login\"),t).scope(this).then(function(t){return this.start(),this.data=t,t},function(t){return this.start(),t})},service_edit:function(t){return this.stop(),this.postRequest(require(\"@apiconfig\").get(\"edituserinfo\"),t).scope(this).then(function(e){return this.start(),$.extend(this.data,t),e},function(t){return this.start(),t})}}),Module({name:\"articleservice\",extend:\"privateservice\",init:function(){this.start()},service_fetch:function(t){return this.stop(),this.postRequest(require(\"@apiconfig\").get(\"articledetail\"),t).scope(this).then(function(t){return this.start(),t},function(){this.start(),promise.reject(e)})}});"},{"p":"util.uikit","h":"9741086183","c":"/**\n * @packet util.uikit;\n * @css util.style.uikit;\n */\n$.showDate=function(o){var t=new Date(parseInt(o)),e=[\"Jan\",\"Feb\",\"Mar\",\"Apr\",\"May \",\"Jun\",\"Jul\",\"Aug\",\"Sep\",\"Oct\",\"Nov\",\"Dec\"];return(t.getDate()||\"\")+\" \"+(e[t.getMonth()]||\"\")+\" \"+(t.getFullYear()||\"\")},$.toast=function(o){$(\"<div class='toast'><div class='toast_text'>\"+o+\"</div></div>\").appendTo(\"body\").transition().set(\"-all-transform\").done(function(){this.transition().removeAll().set(\"opacity\",{time:1e3}).delay(2e3).then(function(){this.css(\"opacity\",0)}).delay(1e3).done(function(){this.remove()}).resolve()}).scope().transform().y(-150)},$.loadingbar=function(){var o=$(\"#loadingbar\");return 0===o.length&&(o=$(\"<div id='loadingbar'><div class='loadingbar-bg'></div><div class='loadingbar-desc'></div></div>\").appendTo(\"body\")),new loadingbar(o)};var loadingbar=function(o){this.dom=o};loadingbar.prototype.showLoading=function(o){return this.dom.children(1).html(\"<i class='fa fa-repeat fa-spin'></i> \"+(o||\"Loading...\")),this},loadingbar.prototype.showError=function(o){var t=$.promise(),e=this;return setTimeout(function(){e.close(),t.resolve()},2e3),this.dom.children(1).html(\"<i class='fa fa-circle-cross'></i> \"+(o||\"操作错误\")),t},loadingbar.prototype.showSuccess=function(o){var t=$.promise(),e=this;return setTimeout(function(){e.close(),t.resolve()},2e3),this.dom.children(1).html(\"<i class='fa fa-circle-check'></i> \"+(o||\"操作成功\")),t},loadingbar.prototype.close=function(){this.dom.remove()};"},{"p":"util.images","h":"1cde5df026","c":"/**\n * @packet util.images;\n * @require util.file;\n * @css util.style.images;\n * @template util.template.imagestemp;\n */\nModule({name:\"imagesuploader\",className:\"imagesuploader\",extend:\"view\",autodom:!0,option:{url:sitePath+\"api/admin/article/add\",filename:\"file\",label:\"upload image\",height:\"300px\"},template:\"@imagestemp.imagesuploader\",init:function(){this._file=null,this.render(this.option)},bind_file:function(e,i){var t=i.target.files||i.dataTransfer.files,a=require(\"@file\")(t[0]),o=!1;this._file&&this._file.getFileName()===a.getFileName()&&(o=!0),o||(this._file=a,this.update({label:this.option.label,height:this.option.height,image:a.getFileURL()}))},setImage:function(e){this.update({label:this.option.label,height:this.option.height,image:e})},upload:function(e,i,t){var a=this;this._file?this._file.uploadAsForm({url:a.option.url,name:\"file\",asysn:!0,data:e,out:6e6,progress:function(e){a.dom.find(\".imageuploader-progress\").width(e.percent+\"%\")},error:function(e){t&&t(e)},success:function(e){a.dom.find(\".imageuploader-progress\").width(0),i&&i(e.data)}}):this.postRequest(this.option.url,e).data(function(e){i&&i(e)}).bad(function(){t&&t()}).error(function(){t&&t()})}});"},{"p":"util.file","h":"dd20754302","c":"/*!\n * @packet util.file;\n */\nvar md5='!function(a){if(\"object\"==typeof exports)module.exports=a();else if(\"function\"==typeof define&&define.amd)define(a);else{var b;try{b=window}catch(c){b=self}b.SparkMD5=a()}}(function(a){function b(a,b,c,d,e,f){return b=t(t(b,a),t(d,f)),t(b<<e|b>>>32-e,c)}function c(a,c,d,e,f,g,h){return b(c&d|~c&e,a,c,f,g,h)}function d(a,c,d,e,f,g,h){return b(c&e|d&~e,a,c,f,g,h)}function e(a,c,d,e,f,g,h){return b(c^d^e,a,c,f,g,h)}function f(a,c,d,e,f,g,h){return b(d^(c|~e),a,c,f,g,h)}function g(a,b){var g=a[0],h=a[1],i=a[2],j=a[3];g=c(g,h,i,j,b[0],7,-680876936),j=c(j,g,h,i,b[1],12,-389564586),i=c(i,j,g,h,b[2],17,606105819),h=c(h,i,j,g,b[3],22,-1044525330),g=c(g,h,i,j,b[4],7,-176418897),j=c(j,g,h,i,b[5],12,1200080426),i=c(i,j,g,h,b[6],17,-1473231341),h=c(h,i,j,g,b[7],22,-45705983),g=c(g,h,i,j,b[8],7,1770035416),j=c(j,g,h,i,b[9],12,-1958414417),i=c(i,j,g,h,b[10],17,-42063),h=c(h,i,j,g,b[11],22,-1990404162),g=c(g,h,i,j,b[12],7,1804603682),j=c(j,g,h,i,b[13],12,-40341101),i=c(i,j,g,h,b[14],17,-1502002290),h=c(h,i,j,g,b[15],22,1236535329),g=d(g,h,i,j,b[1],5,-165796510),j=d(j,g,h,i,b[6],9,-1069501632),i=d(i,j,g,h,b[11],14,643717713),h=d(h,i,j,g,b[0],20,-373897302),g=d(g,h,i,j,b[5],5,-701558691),j=d(j,g,h,i,b[10],9,38016083),i=d(i,j,g,h,b[15],14,-660478335),h=d(h,i,j,g,b[4],20,-405537848),g=d(g,h,i,j,b[9],5,568446438),j=d(j,g,h,i,b[14],9,-1019803690),i=d(i,j,g,h,b[3],14,-187363961),h=d(h,i,j,g,b[8],20,1163531501),g=d(g,h,i,j,b[13],5,-1444681467),j=d(j,g,h,i,b[2],9,-51403784),i=d(i,j,g,h,b[7],14,1735328473),h=d(h,i,j,g,b[12],20,-1926607734),g=e(g,h,i,j,b[5],4,-378558),j=e(j,g,h,i,b[8],11,-2022574463),i=e(i,j,g,h,b[11],16,1839030562),h=e(h,i,j,g,b[14],23,-35309556),g=e(g,h,i,j,b[1],4,-1530992060),j=e(j,g,h,i,b[4],11,1272893353),i=e(i,j,g,h,b[7],16,-155497632),h=e(h,i,j,g,b[10],23,-1094730640),g=e(g,h,i,j,b[13],4,681279174),j=e(j,g,h,i,b[0],11,-358537222),i=e(i,j,g,h,b[3],16,-722521979),h=e(h,i,j,g,b[6],23,76029189),g=e(g,h,i,j,b[9],4,-640364487),j=e(j,g,h,i,b[12],11,-421815835),i=e(i,j,g,h,b[15],16,530742520),h=e(h,i,j,g,b[2],23,-995338651),g=f(g,h,i,j,b[0],6,-198630844),j=f(j,g,h,i,b[7],10,1126891415),i=f(i,j,g,h,b[14],15,-1416354905),h=f(h,i,j,g,b[5],21,-57434055),g=f(g,h,i,j,b[12],6,1700485571),j=f(j,g,h,i,b[3],10,-1894986606),i=f(i,j,g,h,b[10],15,-1051523),h=f(h,i,j,g,b[1],21,-2054922799),g=f(g,h,i,j,b[8],6,1873313359),j=f(j,g,h,i,b[15],10,-30611744),i=f(i,j,g,h,b[6],15,-1560198380),h=f(h,i,j,g,b[13],21,1309151649),g=f(g,h,i,j,b[4],6,-145523070),j=f(j,g,h,i,b[11],10,-1120210379),i=f(i,j,g,h,b[2],15,718787259),h=f(h,i,j,g,b[9],21,-343485551),a[0]=t(g,a[0]),a[1]=t(h,a[1]),a[2]=t(i,a[2]),a[3]=t(j,a[3])}function h(a){var b,c=[];for(b=0;64>b;b+=4)c[b>>2]=a.charCodeAt(b)+(a.charCodeAt(b+1)<<8)+(a.charCodeAt(b+2)<<16)+(a.charCodeAt(b+3)<<24);return c}function i(a){var b,c=[];for(b=0;64>b;b+=4)c[b>>2]=a[b]+(a[b+1]<<8)+(a[b+2]<<16)+(a[b+3]<<24);return c}function j(a){var b,c,d,e,f,i,j=a.length,k=[1732584193,-271733879,-1732584194,271733878];for(b=64;j>=b;b+=64)g(k,h(a.substring(b-64,b)));for(a=a.substring(b-64),c=a.length,d=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],b=0;c>b;b+=1)d[b>>2]|=a.charCodeAt(b)<<(b%4<<3);if(d[b>>2]|=128<<(b%4<<3),b>55)for(g(k,d),b=0;16>b;b+=1)d[b]=0;return e=8*j,e=e.toString(16).match(/(.*?)(.{0,8})$/),f=parseInt(e[2],16),i=parseInt(e[1],16)||0,d[14]=f,d[15]=i,g(k,d),k}function k(a){var b,c,d,e,f,h,j=a.length,k=[1732584193,-271733879,-1732584194,271733878];for(b=64;j>=b;b+=64)g(k,i(a.subarray(b-64,b)));for(a=j>b-64?a.subarray(b-64):new Uint8Array(0),c=a.length,d=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],b=0;c>b;b+=1)d[b>>2]|=a[b]<<(b%4<<3);if(d[b>>2]|=128<<(b%4<<3),b>55)for(g(k,d),b=0;16>b;b+=1)d[b]=0;return e=8*j,e=e.toString(16).match(/(.*?)(.{0,8})$/),f=parseInt(e[2],16),h=parseInt(e[1],16)||0,d[14]=f,d[15]=h,g(k,d),k}function l(a){var b,c=\"\";for(b=0;4>b;b+=1)c+=u[a>>8*b+4&15]+u[a>>8*b&15];return c}function m(a){var b;for(b=0;b<a.length;b+=1)a[b]=l(a[b]);return a.join(\"\")}function n(a){return/[-￿]/.test(a)&&(a=unescape(encodeURIComponent(a))),a}function o(a,b){var c,d=a.length,e=new ArrayBuffer(d),f=new Uint8Array(e);for(c=0;d>c;c+=1)f[c]=a.charCodeAt(c);return b?f:e}function p(a){return String.fromCharCode.apply(null,new Uint8Array(a))}function q(a,b,c){var d=new Uint8Array(a.byteLength+b.byteLength);return d.set(new Uint8Array(a)),d.set(new Uint8Array(b),a.byteLength),c?d:d.buffer}function r(a){var b,c=[],d=a.length;for(b=0;d-1>b;b+=2)c.push(parseInt(a.substr(b,2),16));return String.fromCharCode.apply(String,c)}function s(){this.reset()}var t=function(a,b){return a+b&4294967295},u=[\"0\",\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"a\",\"b\",\"c\",\"d\",\"e\",\"f\"];return\"5d41402abc4b2a76b9719d911017c592\"!==m(j(\"hello\"))&&(t=function(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}),\"undefined\"==typeof ArrayBuffer||ArrayBuffer.prototype.slice||!function(){function b(a,b){return a=0|a||0,0>a?Math.max(a+b,0):Math.min(a,b)}ArrayBuffer.prototype.slice=function(c,d){var e,f,g,h,i=this.byteLength,j=b(c,i),k=i;return d!==a&&(k=b(d,i)),j>k?new ArrayBuffer(0):(e=k-j,f=new ArrayBuffer(e),g=new Uint8Array(f),h=new Uint8Array(this,j,e),g.set(h),f)}}(),s.prototype.append=function(a){return this.appendBinary(n(a)),this},s.prototype.appendBinary=function(a){this._buff+=a,this._length+=a.length;var b,c=this._buff.length;for(b=64;c>=b;b+=64)g(this._hash,h(this._buff.substring(b-64,b)));return this._buff=this._buff.substring(b-64),this},s.prototype.end=function(a){var b,c,d=this._buff,e=d.length,f=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(b=0;e>b;b+=1)f[b>>2]|=d.charCodeAt(b)<<(b%4<<3);return this._finish(f,e),c=m(this._hash),a&&(c=r(c)),this.reset(),c},s.prototype.reset=function(){return this._buff=\"\",this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},s.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash}},s.prototype.setState=function(a){return this._buff=a.buff,this._length=a.length,this._hash=a.hash,this},s.prototype.destroy=function(){delete this._hash,delete this._buff,delete this._length},s.prototype._finish=function(a,b){var c,d,e,f=b;if(a[f>>2]|=128<<(f%4<<3),f>55)for(g(this._hash,a),f=0;16>f;f+=1)a[f]=0;c=8*this._length,c=c.toString(16).match(/(.*?)(.{0,8})$/),d=parseInt(c[2],16),e=parseInt(c[1],16)||0,a[14]=d,a[15]=e,g(this._hash,a)},s.hash=function(a,b){return s.hashBinary(n(a),b)},s.hashBinary=function(a,b){var c=j(a),d=m(c);return b?r(d):d},s.ArrayBuffer=function(){this.reset()},s.ArrayBuffer.prototype.append=function(a){var b,c=q(this._buff.buffer,a,!0),d=c.length;for(this._length+=a.byteLength,b=64;d>=b;b+=64)g(this._hash,i(c.subarray(b-64,b)));return this._buff=d>b-64?new Uint8Array(c.buffer.slice(b-64)):new Uint8Array(0),this},s.ArrayBuffer.prototype.end=function(a){var b,c,d=this._buff,e=d.length,f=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(b=0;e>b;b+=1)f[b>>2]|=d[b]<<(b%4<<3);return this._finish(f,e),c=m(this._hash),a&&(c=r(c)),this.reset(),c},s.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},s.ArrayBuffer.prototype.getState=function(){var a=s.prototype.getState.call(this);return a.buff=p(a.buff),a},s.ArrayBuffer.prototype.setState=function(a){return a.buff=o(a.buff,!0),s.prototype.setState.call(this,a)},s.ArrayBuffer.prototype.destroy=s.prototype.destroy,s.ArrayBuffer.prototype._finish=s.prototype._finish,s.ArrayBuffer.hash=function(a,b){var c=k(new Uint8Array(a)),d=m(c);return b?r(d):d},s}),addEventListener(\"message\",function(a){function b(){var a=g*e,b=a+1024>=c.size?c.size:a+1024;i.readAsArrayBuffer(d.call(c,a,b))}var c=a.data,d=File.prototype.slice||File.prototype.mozSlice||File.prototype.webkitSlice,e=2097152,f=Math.ceil(c.size/e),g=0,h=new SparkMD5.ArrayBuffer,i=new FileReader;i.onload=function(a){h.append(a.target.result),g++,f>g?b():postMessage(h.end())},i.onerror=function(){postMessage(null)},b()},!1);',uriworker='addEventListener(\"message\",function(c){var a=c.data;var b=new FileReader();b.onload=function(d){postMessage(d.target.result)};b.readAsDataURL(a)},false);',file=function(e,t){var i=e;this._uri=\"\",$.is.isString(e)?t?i=new Blob([e],{type:t}):(this._url=e,i=file.getBlobFromURI(e)):$.is.isArray(e)&&(i=new Blob(e,{type:t||\"text/plain\"})),this.file=i};file.getBlobFromURI=function(e){var t=\";base64,\";if(-1===e.indexOf(t)){var i=e.split(\",\"),r=i[0].split(\":\")[1],a=i[1];return new Blob([a],{type:r})}for(var i=e.split(t),r=i[0].split(\":\")[1],n=atob(i[1]),o=new ArrayBuffer(n.length),s=new Uint8Array(o),f=0;f<n.length;f++)s[f]=n.charCodeAt(f);return new Blob([o],{type:r})},file.saveAs=function(e,t){var i=e.type,r=\"application/octet-stream\";if(i&&i!==r){var a=e.slice||e.webkitSlice||e.mozSlice;e=a.call(e,0,e.size,r)}var n=URL.createObjectURL(e),o=document.createEvent(\"MouseEvent\");o.initMouseEvent(\"click\",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null);var s=document.createElement(\"a\");s.href=n,s.download=t,s.dispatchEvent(o)},file.upload=function(e){return $.ajax({url:e.url||null,data:e.file,method:\"post\",dataType:\"json\",timeout:e.timeout,headers:e.headers||{},query:e.query,events:{load:function(t){var i=t.target.status;if(i>=200&&300>i||304===i||0===i){if(e.success){var r=this.response.responseText;if(\"json\"===e.dataType)try{r=window.JSON.parse(r)}catch(t){r={}}e.success(r)}}else e.error&&e.error(t)},progress:function(t){e.progress&&e.progress({total:t.total,loaded:t.loaded,percent:Math.round(100*t.loaded/t.total)})},error:function(t){e.error&&e.error(t)}}})},file.uploadAsForm=function(e){var t=new FormData;t.append(e.name||\"file\",e.file);for(var i in e.data)t.append(i,e.data[i]);return $.ajax({url:e.url||null,data:t,method:\"post\",dataType:\"json\",timeout:e.timeout,query:e.query,headers:e.headers||{},events:{load:function(t){var i=t.target.status;if(i>=200&&300>i||304===i||0===i){if(e.success){var r=this.response.responseText;if(\"json\"===e.dataType)try{r=window.JSON.parse(r)}catch(t){r={}}e.success(r)}}else e.error&&e.error(t)},progress:function(t){e.progress&&e.progress({total:t.total,loaded:t.loaded,percent:Math.round(100*t.loaded/t.total)})},error:function(t){e.error&&e.error(t)},abort:function(){e.abort&&e.abort()}}})},file.prototype.isSame=function(e){var t=e;return e.file&&(t=e.getFile()),this.file.lastModified===t.lastModified&&this.file.size===t.size&&this.file.type===t.type&&this.file.name===t.name},file.prototype.getFile=function(){return this.file},file.prototype.getFileName=function(){return this.file?this.file.name:\"\"},file.prototype.getFileSize=function(e,t){var i=this.file.size;return\"MB\"===e?i=this.file.size/1048576:\"KB\"===e?i=this.file.size/1024:\"GB\"===e&&(i=this.file.size/1073741824),2===arguments.length&&(i=i.toFixed(t)/1),i},file.prototype.getFileSizeAuto=function(e){var t=0,i=\"BYTE\",r=this.file.size;return e=e||0,r>=1073741824?(t=(r/1073741824).toFixed(e),i=\"GB\"):r>=1048576?(t=(r/1048576).toFixed(e),i=\"MB\"):r>=1024?(t=(r/1024).toFixed(e),i=\"KB\"):(t=r,i=\"B\"),t+i},file.prototype.getFileType=function(){return this.file?this.file.type:\"\"},file.prototype.getFileURI=function(){var e=$.promise();if(this._uri)e.resolve(this._uri);else{var t=new FileReader;t.onload=function(t){e.resolve(t.target.result)},t.readAsDataURL(this.file)}return e},file.prototype.getFileURL=function(){return window.URL.createObjectURL(this.file)},file.prototype.getFileURIByWorker=function(){var e=$.promise(),t=new Worker(window.URL.createObjectURL(new Blob([uriworker],{type:\"text/javascript\"})));return t.addEventListener(\"message\",function(t){e.resolve(t.data)}),t.postMessage(this.file),e},file.prototype.getFileHash=function(){var e=$.promise(),t=new Worker(window.URL.createObjectURL(new Blob([md5],{type:\"text/javascript\"})));return t.addEventListener(\"message\",function(t){e.resolve(t.data)}),t.postMessage(this.file),e},file.prototype.getSuffix=function(){if(this.getFileName()){var e=this.getFileName().split(\".\");return e.length>1?e[e.length-1]:\"\"}return\"\"},file.prototype.isSuffixWith=function(e){return e===this.getSuffix()},file.prototype.isTypeOf=function(e){var t=this.getFileType();return t===e},file.prototype.createImageElement=function(){var e=$.promise();if(-1!==this.file.type.indexOf(\"image\")){var t=document.createElement(\"img\"),i=this.getFileURL();$(t).load(function(){e.resolve({uri:i,element:t})}),t.src=i}else e.reject();return e},file.prototype.compressImage=function(e){var t=$.promise(),i=this;return this.createImageElement().then(function(r){var a=document.createElement(\"canvas\");a.width=r.width,a.height=r.height,a.getContext(\"2d\").drawImage(r,0,0),t.resolve(new file(a.toDataURL(i.file.type,e/100)))},function(){t.reject()}),t},file.prototype.createImageCanvas=function(e,t){var i=promise();if(-1!==this.file.type.indexOf(\"image\")){var r=this.getFileURL(),a=document.createElement(\"img\");$(a).load(function(){try{var n=a.width,o=a.height,s=0,f=0;n>e?(s=e,f=o/n*e,f>t&&(f=t,s=n/o*t)):o>t?(f=t,s=n/o*t,s>e&&(s=e,f=o/n*e)):(s=a.width,f=a.height);var h=(e-s)/2,u=(t-f)/2,l=a;if(a.width>8e3||a.height>8e3){var b=document.createElement(\"canvas\");b.width=a.width,b.height=a.height;var c=b.getContext(\"2d\");c.mozImageSmoothingEnabled=!1,c.webkitImageSmoothingEnabled=!1,c.msImageSmoothingEnabled=!1,c.imageSmoothingEnabled=!1,c.mozImageSmoothingQuality=\"low\",c.webkitImageSmoothingQuality=\"low\",c.msImageSmoothingQuality=\"low\",c.imageSmoothingQuality=\"low\",c.drawImage(a,0,0),l=b}var g=document.createElement(\"canvas\");g.width=e,g.height=t;var c=g.getContext(\"2d\");c.mozImageSmoothingEnabled=!1,c.webkitImageSmoothingEnabled=!1,c.msImageSmoothingEnabled=!1,c.imageSmoothingEnabled=!1,c.mozImageSmoothingQuality=\"low\",c.webkitImageSmoothingQuality=\"low\",c.msImageSmoothingQuality=\"low\",c.imageSmoothingQuality=\"low\",c.drawImage(l,0,0,a.width,a.height,h,u,s,f),i.resolve({uri:r,element:g})}catch(d){console.log(d),i.reject({uri:r,element:null})}}).error(function(e){i.reject({uri:e,element:null})}),a.src=r}else i.reject();return i},file.prototype.saveAs=function(e){file.saveAs(this.file,e)},file.prototype.upload=function(e){return e.file=this.file,file.upload(e)},file.prototype.uploadAsForm=function(e){return e.file=this.file,file.uploadAsForm(e)},file.prototype.getChunk=function(e,t,i){var r=this.file,a=r.slice||r.webkitSlice||r.mozSlice,n=[e];return 2===arguments.length?$.is.isString(i)?n.push(t):n.push(e+t):3===arguments.length&&(n.push(e+t),n.push(i)),a.apply(r,n)},file.prototype.uploadChunk=function(e){var t=e.from,i=e.size,r=e.mime,a=[];return void 0!==t&&null!==t&&a.push(t),void 0!==i&&null!==i&&a.push(i),void 0!==r&&null!==r&&a.push(r),e.file=this.getChunk.apply(this,a),file.upload(e)},file.prototype.getChunks=function(e,t,i){for(var r=this,a=this.file,n=a.slice||a.webkitSlice||a.mozSlice,o=r.getFileSize(),s=parseInt((o-e)/t),f=[],h=0;s>h;h++){var u=[e+h*t,e+(h+1)*t,i];f.push(n.apply(a,u))}return f.push(n.apply(a,[e+s*t,o,i])),f},file.prototype.uploadChunks=function(e){return this.uploadChunksByPool($.extend(e,{poolsize:1}))},module.exports=function(e,t){return new file(e,t)};"}],"css":[{"p":"util.style.uikit","h":"5bef4c9e28","c":".toast{position:absolute;left:0;right:0;bottom:-30px;height:30px;display:-webkit-box;display:-moz-box;display:box;-webkit-box-orient:horizontal;-webkit-box-pack:center;-webkit-box-align:center;-moz-box-pack:center;-moz-box-align:center;box-orient:horizontal;box-pack:center;box-align:center;z-index:999999999}.toast .toast_text{line-height:30px;background:#5f5d5d;color:white;padding:0 15px 0 15px;border-radius:15px}#loadingbar{position:fixed;left:0;top:0;right:0;bottom:0;z-index:9999999;display:-webkit-box;-webkit-box-orient:horizontal;-webkit-box-pack:center;-webkit-box-align:center;display:-moz-box;-moz-box-pack:center;-moz-box-align:center;display:box;box-orient:horizontal;box-pack:center;box-align:center}#loadingbar .loadingbar-bg{position:absolute;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,0.05)}#loadingbar .loadingbar-desc{position:relative;padding:15px 20px 15px 20px;background:white;-webkit-border-radius:2px;-webkit-box-shadow:1px 2px 10px #b2b2b2;-moz-border-radius:2px;-moz-box-shadow:1px 2px 10px #b2b2b2;border-radius:2px;box-shadow:1px 2px 10px #b2b2b2}"},{"p":"util.style.images","h":"069c102ba2","c":".imagesuploader{padding:20px 0 20px 0;position:relative}.imagesuploader .imagesuploader-label{line-height:35px}.imagesuploader .imagesuploader-container{position:relative;background:white;border:1px solid #d7d7d7;border-radius:5px;overflow:hidden}.imagesuploader .imagesuploader-container .imagesuploader-image{position:absolute;left:0;top:0;right:0;bottom:0}.imagesuploader .imagesuploader-container .imagesuploader-image .imagesuploader-image-bg{position:absolute;left:0;top:0;right:0;bottom:0;background-repeat:no-repeat;background-position:center;background-size:contain}.imagesuploader .imagesuploader-container .imagesuploader-image .imageuploader-progress{position:absolute;left:0;bottom:0;height:35px;background:#a0c4d2}.imagesuploader .imagesuploader-container .imagesuploader-image .imagesuploader-image-tip{line-height:30px;width:100px;text-align:center;position:absolute;left:50%;top:50%;margin-left:-50px;margin-top:-15px}.imagesuploader .imagesuploader-container .imagesuploader-filebtnplus{position:absolute;left:0;top:0;right:0;bottom:0;width:100%;height:100%}.imagesuploader .imagesuploader-container .imagesuploader-filebtnplus input{display:block;width:100%;height:100%;position:absolute;left:0;top:0;right:0;bottom:0;opacity:0}"}],"template":[{"p":"util.template.imagestemp","h":"7a615cee41","c":"<!--[imagesuploader]--><div class=\"imagesuploader-label\"><%=data.label;%></div><div class='imagesuploader-container' style=\"height:<%=data.height;%>\"><div class='imagesuploader-image'><%if(data.image){%><div class='imagesuploader-image-bg' style=\"background-image:url(<%=data.image;%>)\"></div><div class='imageuploader-progress'></div><%}%></div><div class=\"imagesuploader-image\"><div class=\"imagesuploader-image-tip\">select images</div></div><div class='imagesuploader-filebtnplus'><div class='imagesuploader-addicon'></div><input multiple='multiple' type='file' data-bind='change:file' accept='image/gif,image/jpeg,image/jpg,image/png,image/bmp'/></div></div>"},{"p":"site.template.admintemp","h":"fa245400e6","c":"<!--[login]--><div class=\"login-con\"><div class=\"login-con-logo\"><div class=\"login-con-logo-in\"><img src=\"site/style/images/b23961bfdd.png\"/></div></div><div class=\"login-con-in\"><div class=\"login-con-input\"><div class=\"logo-con-input-label\">username</div><input type=\"text\" placeholder=\"username\" data-find=\"username\"></div><div class=\"login-con-input\"><div class=\"logo-con-input-label\">password</div><input type=\"password\" placeholder=\"password\" data-find=\"password\"></div><div class=\"login-con-btn\" data-find=\"submit\">login</div></div></div><!--[adminhead]--><div class=\"adminhead-nav\"><div class=\"adminhead-nav-con\"><a href=\"admin/userinfo\" class=\"adminhead-nav-item\">userinfo</a><a href=\"#\" class=\"adminhead-nav-item\">Setting</a></div></div><!--[articlelist]--><div class=\"articlelist-head\"><div class=\"atticlelist-head-btn\" data-bind=\"click:add\" href=\"admin/addarticle\"><i class=\"fa fa-circle-plus\"></i> Add Article</div></div><div class=\"articlelist-list\" data-find=\"con\"><%for(var i in data){%><div class=\"list-con\" data-group=\"item\" @cache(data[i])><div class=\"list-con-title\"><a href=\"admin/editarticle?id=<%=data[i].id;%>\" data-groupi=\"title\"><%=data[i].title;%></a></div><div class=\"list-con-desc\"><%=data[i].descs||\"no description\";%></div><div class=\"list-con-time\">16 05 12</div><div class=\"list-con-remove\" data-groupi=\"remove\"><i class=\"fa fa-circle-cross\"></i></div></div><%}%></div><div class=\"list-loading\" data-find=\"loading\"><div class=\"list-loading-icon\"><i class=\"fa fa-loader fa-spin\"></i></div></div><!--[editarticle]--><div class=\"editarticle-con\"><div class=\"editarticle-con-title\">Edit Article</div><div class=\"editarticle-con-image\"><@module type=\"{{option.imageType}}\"/></div><div class=\"editarticle-con-label\">Title</div><div class=\"editarticle-con-input\" data-group=\"title\"><input type=\"text\" placeholder=\"title\" data-groupi=\"input\" name=\"title\" value=\"<%=data.title;%>\"/></div><div class=\"editarticle-con-label\">Short Desc</div><div class=\"editarticle-con-input\" data-group=\"desc\"><textarea type=\"text\" placeholder=\"title\" data-groupi=\"input\" name=\"desc\" style=\"height:100px;\"><%=data.desc;%></textarea></div><div class=\"editarticle-con-label\">Content</div><div class=\"editarticle-con-content\" data-find=\"editor\"></div><div class=\"editarticle-con-btn\"><div class=\"editarticle-con-btn-submit\" data-find=\"submit\">Submit</div></div></div><!--[edituserinfo]--><div class=\"editarticle-con\"><div class=\"editarticle-con-title\">Edit User Info</div><div class=\"editarticle-con-label\">Content</div><div class=\"editarticle-con-content\" data-find=\"editor\"></div><div class=\"editarticle-con-btn\"><div class=\"editarticle-con-btn-submit\" data-find=\"submit\">Submit</div></div></div><!--[noadminhead]--><div class=\"adminhead-nav\"></div><!--[copyright]--><div class=\"copyright\">©2016 • All rights reserved.</div>"}]});