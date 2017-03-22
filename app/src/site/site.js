/**
 * @packet site.site;
 * @require site.setting;
 * @require util.router;
 * @require config;
 * @require site.service.site;
 * @require site.service.base;
 * @require site.service.apiconfig;
 * @require site.editor;
 * @require util.uikit;
 * @css site.style.grid;
 * @css site.style.main;
 * @css site.style.style;
 * @template site.template.sitetemp;
 */
Module({
    name: "pagecontainer",
    extend: "viewgroup",
    init: function (option) {
        var ths = this, c = {}, mapping = require("@config");
        this._router = require("@router")(sitePath);
        for (var i in mapping) {
            var url = i;
            if (url[url.length - 1] !== "/") {
                c[url + "/"] = mapping[i].name;
            } else {
                c[url] = mapping[i].name;
            }
        }
        for (var i in c) {
            this._router.bind(i, function (e) {
                ths.openPage(c[e.action], e);
            });
        }
        this._router.run();
    },
    openPage: function (pageoption, data) {
        $("body").scrollTop(0);
        if (this.children[0]) {
            this.children[0].remove();
        }
        this.addChild({
            type: "@.page",
            parameters: data,
            option: pageoption,
            container: this.dom
        });
    },
    event_openPage: function (e) {
        this._router.open(e.data.url, e.data.data, e.data.title);
        e.stopPropagation();
    },
    event_redirectPage: function (e) {
        this._router.edit(e.data.url, e.data.data, e.data.title);
        e.stopPropagation();
    }
});
Module({
    name: "page",
    extend: "viewgroup",
    className: "page",
    layout: "@sitetemp.page",
    services: {
        "article": "@site.docservice"
    },
    option: {
        modules: [{type: "", option: {}}]
    },
    setContentPage: function () {
        if (this.parameters.query) {
            this.getService("article").trigger("fetch", this.parameters.query).scope(this).then(function (t) {
                if(t.image){
                    t.image=sitePath+t.image;
                }
                this.getChildAt(0).update(t);
                this.getChildAt(1).update(t.content);
                this.dispatchEvent("contentdone");
            });
        } else {
            this.dispatchEvent("gotoPage", {
                url: "404"
            });
        }
    }
});
Module({
    name: "base",
    extend: "view",
    className: "base",
    template: "@sitetemp.base",
    services: {
        scroll: "@base.scrollservice"
    },
    init: function () {
        this.render();
    },
    find_link: function (dom) {
        var ths = this;
        dom.find("a").each(function () {
            $(this).click(function (e) {
                ths.dispatchEvent("openPage", {
                    url: $(this).attr("href")
                });
                e.preventDefault();
            });
        });
    },
    find_icon: function (dom) {
        var ths = this;
        dom.click(function (e) {
            ths.dispatchEvent("openPage", {
                url: $(this).attr("href")
            });
            e.preventDefault();
        });
    },
    find_about: function (dom) {
        var ths = this;
        dom.click(function (e) {
            ths.dispatchEvent("openPage", {
                url: $(this).attr("href")
            });
            e.preventDefault();
        });
    },
    service_scroll: function (data) {
        var top = data.scroll;
        var dom = this.finders("bg");
        if (top > dom.height()) {
            this.dom.addClass("show");
        } else {
            this.dom.removeClass("show");
        }
    }
});
Module({
    name: "noadminhead",
    extend: "view",
    className: "adminhead",
    template: "@sitetemp.noadminhead",
    init: function () {
        this.render();
    }
});
Module({
    name: "nofind",
    extend: "view",
    className: "nofind",
    template: "@sitetemp.nofind",
    init: function () {
        this.render();
    }
});
Module({
    name: "list",
    extend: "viewgroup",
    className: "list",
    layout: "@sitetemp.list",
    autodom: true,
    services: {
        scroll: "@base.scrollservice",
        list: "@base.listservice"
    },
    option: {
        service_list: {
            url: require("@apiconfig").get("articlelist"),
            detail: require("@apiconfig").get("articledetail"),
            pagesize: 10
        }
    },
    init: function () {
        this.getService("list").trigger("gotopage", 0).scope(this).done(function () {
            this.dispatchEvent("listdone");
        });
    },
    onnodeinserted: function (dom) {
        var ths = this;
        $(dom).find("a").each(function () {
            $(this).click(function (e) {
                ths.dispatchEvent("openPage", {
                    url: $(this).attr("href"),
                    data: $(this).group().cache()
                });
                e.preventDefault();
            });
        });
    },
    service_scroll: function () {
        if(this.finders("loading").get(0)) {
            var a = this.finders("loading").get(0).offsetTop;
            if (a && $("body").scrollTop() > this.finders("loading").get(0).offsetTop - $(window).height()) {
                this.finders("loading").show();
                this.getService("list").trigger("next").scope(this).always(function () {
                    this.finders("loading").hide();
                });
            }
        }
    },
    refresh:function () {
        this.getService("list").trigger("refresh");
    }
});
Module({
    name: "copyright",
    extend: "view",
    className: "copyright",
    template: "@sitetemp.copyright",
    init: function () {
        this.render();
    }
});
Module({
    name: "about",
    extend: "view",
    className: "about",
    template: "@sitetemp.about",
    services: {
        base: "@site.baseservice"
    },
    init: function () {
        this.render();
        this.getService("base").scope(this).done(function (a) {
            this.finders("content").html(a[0].userinfohtml);
        });
    }
});
Module({
    name: "paperheader",
    extend: "view",
    className: "paperheader",
    template: "@sitetemp.paperheader",
    autodom: true,
    services: {
        scroll: "@base.scrollservice"
    },
    init: function () {
        this.dom.height($(window).height());
        this.render({});
    },
    find_arrow: function (dom) {
        dom.click(function () {
            $("body").scrollingTop($(window).height() * 2 / 3);
        });
    },
    find_bgimg:function (dom) {
        var url=dom.cache(),ths=this;
        $.loader().image(url,function () {
            dom.css("background-image","url("+url+")").transition().all({
                time:500
            }).scope().css("opacity","1");
        });
    },
    service_scroll: function (data) {
        var t = data.scroll;
        var dom = this.finders("bg");
        dom.transition().all({
            time:500
        }).scope().css("opacity", 1 * (t / dom.height()));
        if (t > dom.height()) {
            this.dom.addClass("show");
        } else {
            this.dom.removeClass("show");
        }
    }
});
Module({
    name: "papercontent",
    extend: "view",
    className: "papercontent",
    template: "@sitetemp.papercontent",
    init: function () {
        this.render("no content");
    },
    update:function (content) {
        this.dom.children(0).html(content);
    }
});
Module({
    name: "paperfooter",
    extend: "view",
    className: "paperfooter",
    template: "@sitetemp.paperfooter",
    init: function () {
        this.render();
    },
    find_home: function (dom) {
        var ths = this;
        dom.click(function (e) {
            ths.dispatchEvent("openPage", {
                url: $(this).attr("href")
            });
            e.preventDefault();
        });
    }
});
Module({
    name: "papercomment",
    extend: "viewgroup",
    layout: "@sitetemp.comment",
    className: "comment",
    option:{
        type:"@.papercommentlist",
        editortype:"@.papercommenteditor"
    },
    services:{
        "comment":"@site.commentservice"
    },
    bind_reply:function () {
        var editor=this.getChildAt(1);
        if(editor.isReady()) {
            if(editor.getValue()) {
                this.addChild({
                    type: "@.commentreply",
                    option: {
                        override: {
                            onendinit: function () {
                                this.finders("input").eq(2).hide();
                            }
                        }
                    }
                });
            }else{
                $.toast("comment content can not empty.");
            }
        }else{
            $.toast("editor is not ready,wait for a minite.");
        }
    },
    event_reply:function () {
        var r=this.getChildAt(2).getValue();
        r["content"]=this.getChildAt(1).getValue();
        r["articleid"]=$.serialize.queryObject(window.location.href)["id"];
        $.loadingbar().showLoading();
        this.getService("comment").trigger("addcomment",r).scope(this).done(function () {
            this.getChildAt(2).remove();
            $.loadingbar().showSuccess();
            this.getChildAt(0).refresh();
        }).fail(function () {
            $.loadingbar().showError();
        });
    },
    event_subreply:function (e) {
        this.addChild({
            type:"@.commentreply",
            parameters:e.data,
            option:{
                override:{
                    event_reply:function (e) {
                        this.dispatchEvent("subreplycommit",this.parameters);
                        e.stopPropagation();
                    }
                }
            }
        });
    },
    event_subreplycommit:function (e) {
        var r=this.getChildAt(2).getValue();
        r["articleid"]=$.serialize.queryObject(window.location.href)["id"];
        r["commentid"]=e.data.id;
        $.loadingbar().showLoading();
        this.getService("comment").trigger("addsubcomment",r).scope(this).done(function () {
            this.getChildAt(2).remove();
            $.loadingbar().showSuccess();
            this.getChildAt(0).refresh();
        }).fail(function () {
            $.loadingbar().showError();
        });
    },
    event_tosubreplycommit:function (e) {
        var r=this.getChildAt(2).getValue();
        r["articleid"]=$.serialize.queryObject(window.location.href)["id"];
        r["commentid"]=e.data.a.id;
        r.name=r.name+"|"+e.data.b.name.split("|")[0];
        $.loadingbar().showLoading();
        this.getService("comment").trigger("addsubcomment",r).scope(this).done(function () {
            this.getChildAt(2).remove();
            $.loadingbar().showSuccess();
            this.getChildAt(0).refresh();
        }).fail(function () {
            $.loadingbar().showError();
        });
    },
    event_toreply:function (e) {
        this.addChild({
            type:"@.commentreply",
            parameters:e.data,
            option:{
                title:"tosubreplay",
                override:{
                    event_reply:function (e) {
                        this.dispatchEvent("tosubreplycommit",this.parameters);
                        e.stopPropagation();
                    }
                }
            }
        });
    }
});
Module({
    name:"papercommenteditor",
    extend:["view","@editor.mdeditor"],
    className:"papercommenteditor",
    init:function () {
        this.setEditor(this.dom,200);
    }
})
Module({
    name: "papercommentlist",
    extend: "@.list",
    layout: "@sitetemp.commentlist",
    className: "commentlist",
    autodom: true,
    services:{
        "comment":"@site.commentservice"
    },
    option: {
        service_list: {
            url: require("@apiconfig").get("commentlist"),
            pagesize: 10
        }
    },
    marcos: {
        date: function (attrs, render) {
            var a = new Date(parseInt(attrs.date));
            var b = ["Jan", "Feb", "Mar", "Apr", "May ", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return (a.getDate() || "") + " " + (b[a.getMonth()] || "") + " " + (a.getFullYear() || "");
        }
    },
    init: function () {
        this.dom.removeClass("list");
        this.getService("list").action("setparameter", {
            articleid: (function () {
                var a = $.serialize.queryObject(window.location.href);
                return a ? a.id : "";
            })()
        });
        this.getService("list").trigger("gotopage", 0).scope(this).done(function () {
            this.dispatchEvent("listdone");
        });

    },
    bind_subreply:function (dom) {
        this.dispatchEvent("subreply",dom.cache());
    },
    bind_tosubreply:function (dom) {
        this.dispatchEvent("toreply",dom.cache());
    }
});
Module({
    name:"commentreply",
    extend:"view",
    template:"@sitetemp.commentreply",
    className:"commentreply",
    option:{
        title:"Reply Comment"
    },
    init:function () {
        this.render(this.option);
        setTimeout(function () {
            this.dom.addClass("show");
        }.bind(this),10);
    },
    bind_close:function () {
        this.close();
    },
    bind_reply:function () {
        this.dispatchEvent("reply");
    },
    close:function () {
        this.remove();
    },
    getValue:function () {
        var r={};
        this.finders("input").each(function () {
            var t=$(this).find("input,textarea");
            if(t.length>0){
                r[t.attr("name")]=t.val();
            }
        });
        return r;
    }
});