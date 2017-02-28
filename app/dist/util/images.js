/**
 * @packet util.images;
 * @require util.file;
 * @css util.style.images;
 * @template util.template.imagestemp;
 */
Module({
    name: "imagesuploader",
    className: "imagesuploader",
    extend: "view",
    autodom:true,
    option: {
        url: sitePath + "api/admin/article/add",
        filename: "file",
        label: "upload image",
        height: "300px"
    },
    template: "@imagestemp.imagesuploader",
    init: function () {
        this._file = null;
        this.render(this.option);
    },
    bind_file: function (dom, e) {
        var ths = this;
        var file = e.target.files || e.dataTransfer.files;
        var _file = require("@file")(file[0]), has = false;
        if (this._file && this._file.getFileName() === _file.getFileName()) {
            has = true;
        }
        if (!has) {
            this._file = _file;
            this.update({
                label:this.option.label,
                height:this.option.height,
                image:_file.getFileURL()
            });
        }
    },
    setImage: function (src) {
        this.update({
            label:this.option.label,
            height:this.option.height,
            image:src
        });
    },
    upload: function (data, fn, error) {
        var ths = this;
        if (this._file) {
            this._file.uploadAsForm({
                url: ths.option.url,
                name: "file",
                asysn: true,
                data: data,
                out: 6000000,
                progress: function (e) {
                    ths.dom.find(".imageuploader-progress").width(e.percent + "%");
                },
                error: function (a) {
                    error && error(a);
                },
                success: function (data) {
                    ths.dom.find(".imageuploader-progress").width(0);
                    fn && fn(data.data);
                }
            });
        } else {
            this.postRequest(this.option.url, data).data(function (a) {
                fn && fn(a);
            }).bad(function () {
                error && error();
            }).error(function () {
                error && error();
            });
        }
    }
});

