/**
 * @packet util.images;
 * @require util.file;
 * @css util.style.images;
 * @template util.template.imagestemp;
 */
Module({name:"imagesuploader",className:"imagesuploader",extend:"view",autodom:!0,option:{url:sitePath+"api/admin/article/add",filename:"file",label:"upload image",height:"300px"},template:"@imagestemp.imagesuploader",init:function(){this._file=null,this.render(this.option)},bind_file:function(e,i){var t=i.target.files||i.dataTransfer.files,a=require("@file")(t[0]),o=!1;this._file&&this._file.getFileName()===a.getFileName()&&(o=!0),o||(this._file=a,this.update({label:this.option.label,height:this.option.height,image:a.getFileURL()}))},setImage:function(e){this.update({label:this.option.label,height:this.option.height,image:e})},upload:function(e,i,t){var a=this;this._file?this._file.uploadAsForm({url:a.option.url,name:"file",asysn:!0,data:e,out:6e6,progress:function(e){a.dom.find(".imageuploader-progress").width(e.percent+"%")},error:function(e){t&&t(e)},success:function(e){a.dom.find(".imageuploader-progress").width(0),i&&i(e.data)}}):this.postRequest(this.option.url,e).data(function(e){i&&i(e)}).bad(function(){t&&t()}).error(function(){t&&t()})}});