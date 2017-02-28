/**
 * @packet site.admin;
 * @require site.service.admin;
 * @require site.service.base;
 * @require site.service.apiconfig;
 * @require util.uikit;
 * @require util.images;
 * @require util.editor;
 * @template site.template.admintemp;
 * @css site.style.main;
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
    init: function () {
        this.getService("list").trigger("gotopage", 0).scope(this).done(function () {
            this.dispatchEvent("listdone");
        });
    },
    bind_add:function (dom) {
        this.dispatchEvent("openPage",{
            url:"admin/addarticle"
        });
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
    group_item:function (dom) {
        dom.items("remove").click(function () {
            console.log($(this).group().cache())
        })
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
    name: "editarticle",
    extend: ["viewgroup","@editor.mdeditor"],
    className: "editarticle",
    layout: "@admintemp.editarticle",
    autodom:true,
    services:{
        "article":"@admin.articleservice"
    },
    option: {
        imageType: "@images.imagesuploader"
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
                    desc: desc,
                    content: content
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
    onsubmit:function (t) {
        var query=$.serialize.queryObject(window.location.href);
        if (query) {
            return $.extend(t,{
                id:query.id
            });
        }else{
            return t;
        }
    },
    event_editdone:function () {
        var query=$.serialize.queryObject(window.location.href);
        if (query) {
            this.getChildAt(0).option.url=sitePath+"/api/admin/article/edit";
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
    extend: ["view","@editor.mdeditor"],
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