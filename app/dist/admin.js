/**
 * @packet admin;
 * @require service.admin;
 * @require service.base;
 * @require service.apiconfig;
 * @require util.uikit;
 * @require util.file;
 * @require util.image.images;
 * @template template.admintemp;
 * @css style.site;
 * @map (js)lib.ace.ace;
 */
Module({
    name: "login",
    extend: "view",
    className: "login",
    template: "@admintemp.login",
    services:{
        admin:"@admin.userservice"
    },
    init: function () {
        this.render();
    },
    find_submit: function (dom) {
        dom.click(function () {
            var un = this.finders("username").val();
            var pw = this.finders("password").val();
            if (un && pw) {
                this.getService("admin").trigger("login",{username: un, password: pw}).scope(this).done(function (a) {
                    this.dispatchEvent("redirectPage", {
                        url: "admin"
                    });
                }).fail(function () {
                    $.toast("username or password is not matched");
                });
            }else{
                $.toast("username or password can not empty");
            }
        }.bind(this));
    }
});
Module({
    name: "adminhead",
    extend: "view",
    className: "adminhead",
    template: "@admintemp.adminhead",
    init: function () {
        var ths = this;
        this.render();
        this.dom.find("a").each(function () {
            $(this).click(function (e) {
                ths.dispatchEvent("openPage", {
                    url: $(this).attr("href")
                });
                e.preventDefault();
            });
        });
    }
});
Module({
    name: "articlelist",
    extend: "view",
    className: "list",
    template: "@admintemp.articlelist",
    autodom:true,
    services:{
        scroll:"@base.scrollservice",
        list:"@base.listservice"
    },
    option: {
        service_list:{
            url:require("@apiconfig").get("articlelist"),
            detail:require("@apiconfig").get("articledetail"),
            pagesize:10
        }
    },
    onnodeinserted: function (dom) {
        var ths = this;
        $(dom).find("a").each(function () {
            $(this).click(function (e) {
                console.log($(this).group().cache())
                ths.dispatchEvent("openPage", {
                    url: $(this).attr("href"),
                    data: $(this).group().cache()
                });
                e.preventDefault();
            });
        });
    },
    service_scroll:function () {
        var a = this.finders("loading").get(0).offsetTop;
        if (a && $("body").scrollTop() > this.finders("loading").get(0).offsetTop - $(window).height()) {
            this.finders("loading").show();
            this.getService("list").trigger("next").scope(this).always(function () {
                this.finders("loading").hide();
            });
        }
    },
    service_firstpage:function () {
        this.dispatchEvent("listdone");
    }
});
Module({
    name:"editor",
    setEditor:function (dom) {
        $().create("script").attr("src",module.currentPath+"lib/ace/ace.js").attr("type","text/noload").appendTo("head");
        module.getMapSource("@ace").scope(this).done(function () {
            var id = $.util.randomid(8);
            $().create("pre").css({height: "600px"}).attr("id", id).appendTo(dom);
            var editor = window.ace.edit(id);
            editor.setTheme("ace/theme/github");
            editor.getSession().setMode("ace/mode/markdown");
            this.editor = editor;
            this.dispatchEvent("editdone");
        });
    }
});
Module({
    name: "editarticle",
    extend: ["viewgroup","@.editor"],
    className: "editarticle",
    layout: "@admintemp.editarticle",
    autodom:true,
    services:{
        "article":"@admin.articleservice"
    },
    option: {
        imageType: "@images.imagesuploader"
    },
    init:function () {
        this.render({});
    },
    find_editor: function (dom) {
        this.setEditor(dom);
    },
    find_submit: function (dom) {
        dom.click(function () {
            var title = this.groups("title").items("input").val();
            var desc = this.groups("desc").items("input").val();
            var content = this.editor.getValue();
            var checked = false;
            if (title) {
                if (desc) {
                    if (content) {
                        checked = true;
                    } else {
                        $.toast("content can not empty");
                    }
                } else {
                    $.toast("desc can not empty");
                }
            } else {
                $.toast("title can not empty");
            }
            if (checked) {
                var t = {
                    title: title,
                    descs: desc,
                    contentmd: content
                };
                if (this.onsubmit) {
                    t = this.onsubmit(t);
                }
                $.loadingbar().showLoading();
                this.getChildAt(0).upload(t, function () {
                    $.loadingbar().showSuccess();
                }, function () {
                    $.loadingbar().showError();
                });
            }
        }.bind(this));
    },
    setContent: function (data) {
        this.update(data);
    },
    event_editdone:function () {
        var query=$.serialize.queryObject(window.location.href);
        if (query) {
            this.getService("article").trigger("fetch",query).scope(this).then(function (t) {
                this.update(t);
            },function (a) {
                console.log(a)
            });
        }
    }
});
Module({
    name: "edituserinfo",
    extend: ["view","@.editor"],
    className: "editarticle",
    template: "@admintemp.edituserinfo",
    services:{
        user:"@admin.userservice"
    },
    init: function () {
        this.render();
    },
    find_editor: function (dom) {
        this.setEditor(dom);
    },
    find_submit: function (dom) {
        dom.click(function () {
            var content = this.editor.getValue();
            var checked = false;
            if (content) {
                checked = true;
            } else {
                $.toast("content can not empty");
            }
            if (checked) {
                this.info.userinfomd = content;
                $.loadingbar().showLoading();
                this.getService("user").trigger("edit",this.info).scope(this).done(function () {
                    $.loadingbar().showSuccess();
                }).fail(function () {
                    $.loadingbar().showError();
                });
            }
        }.bind(this));
    },
    setContent: function (data) {
        this.editor.setValue(data);
    },
    event_editdone: function () {
        var data=this.getService("user").action("get")
        this.info = data[0];
        this.editor.setValue(data[0].userinfomd);
    }
});
Module({
    name: "noadminhead",
    extend: "view",
    className: "adminhead",
    template: "@admintemp.noadminhead",
    init: function () {
        this.render();
    }
});
Module({
    name: "copyright",
    extend: "view",
    className: "copyright",
    template: "@admintemp.copyright",
    init: function () {
        this.render();
    }
});