/**
 * @packet util.image.images;
 * @require util.file;
 * @css util.image.style.images;
 * @template util.image.template.imagestemp;
 */
Module({
    name: "imagesuploader",
    className: "imagesuploader",
    extend: "view",
    option: {
        url: sitePath + "admin/api/addarticle",
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
        var _file = require("@file").set(file[0]), has = false;
        if (this._file && this._file.fileName === _file.fileName()) {
            has = true;
        }
        if (!has) {
            this.dom.find(".imagesuploader-image").remove();
            _file.getImage(function (image) {
                var _w = image.width / image.height * 150;
                var _x = 0, _y = 0;
                if (_w <= 150) {
                    _x = (150 - _w) / 2;
                } else {
                    _h = image.height / image.width * 150;
                    if (_h <= 150) {
                        _y = (150 - _h) / 2;
                    }
                }
                t = _file.fileName().split("/");
                var str = "<div class='imagesuploader-image'>" +
                        "<div class='imagesuploader-image-bg' style='background-image:url(" + image.src + ")'></div>" +
                        "<div class='imageuploader-name' title='" + t[t.length - 1] + "'>" + t[t.length - 1] + "</div>" +
                        "<div class='imageuploader-progress'></div>" +
                        "</div>";
                var p = $(str).insertBefore(ths.dom.find(".imagesuploader-container").children(0));
                this._dom = p;
            });
            this._file = _file;
        }
    },
    setImage: function (src) {
        this.dom.find(".imagesuploader-image").remove();
        var str = "<div class='imagesuploader-image'>" +
                "<div class='imagesuploader-image-bg' style='background-image:url(" + src + ")'></div>" +
                "<div class='imageuploader-name' title=''>" + src + "</div>" +
                "<div class='imageuploader-progress'></div>" +
                "</div>";
        var p = $(str).insertBefore(this.dom.find(".imagesuploader-container").children(0));
    },
    upload: function (data, fn, error) {
        var ths = this;
        if (this._file) {
            this._file.upload({
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

