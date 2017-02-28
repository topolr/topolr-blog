/*!
 * @packet demo.photo.file;
 */
var file=function(e){this.file=e,this.request=null};file.prototype.getFile=function(){return this.file},file.prototype.fileName=function(){return this.file?this.file.name:""},file.prototype.fileSize=function(){return this.file.size||-1},file.prototype.fileType=function(){return this.file?this.file.type:""},file.prototype.clean=function(){for(var e in this)this[e]=null;return this},file.prototype.getURI=function(e){var t=this,i=new FileReader;i.onload=function(i){e&&e.call(t,i.target.result)},i.readAsDataURL(this.file)},file.prototype.getImage=function(e){var t=this;-1!==this.file.type.indexOf("image")&&this.getURI(function(i){$.loader().image(i,function(){e&&e.call(t,this)})})},file.prototype.getBlob=function(e){this.getURI(function(t){var i=getBlobFromURI(t);e&&e.call(this,i)})},file.prototype.saveAs=function(e){this.getBlob(function(t){saveAs(t,e)})},file.prototype.upload=function(e){var t=this,i=new FormData;i.append(e.name,this.file),i.append("filename",this.file.name),i.append("filesize",this.file.size),i.append("filetype",this.file.type);for(var r in e.data)i.append(r,e.data[r]);e.start&&e.start.call(this),$.ajax({url:e.url||null,data:i,method:"post",dataType:"json",asysn:e.asysn,out:e.out,headers:{},events:{load:function(i){if(e.success){var r=this.response.responseText;if("json"===e.dataType)try{r=window.JSON.parse(r)}catch(i){r={}}e.success.call(t,r)}},progress:function(i){e.progress&&e.progress.call(t,{total:i.total,loaded:i.loaded,percent:Math.round(100*i.loaded/i.total)})},error:function(i){e.error&&e.error.call(t,i)}}})};var getBlobFromURI=function(e){var t=";base64,";if(-1===e.indexOf(t)){var i=e.split(","),r=i[0].split(":")[1],n=i[1];return new Blob([n],{type:r})}for(var i=e.split(t),r=i[0].split(":")[1],o=atob(i[1]),a=new ArrayBuffer(o.length),l=new Uint8Array(a),s=0;s<o.length;s++)l[s]=o.charCodeAt(s);return new Blob([a],{type:r})},saveAs=function(e,t){var i=e.type,r="application/octet-stream";if(i&&i!==r){var n=e.slice||e.webkitSlice||e.mozSlice;e=n.call(e,0,e.size,r)}var o=URL.createObjectURL(e);$().create("a").attr("href",o).attr("download",t).trigger("click")};module.exports={set:function(e){return new file(e)},getBlobFromURI:function(e){return getBlobFromURI(e)},saveAs:function(e,t){saveAs(e,t)}};