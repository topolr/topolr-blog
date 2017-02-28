/**
 * @packet site;
 * @require util.router;
 * @require config;
 * @require service.site;
 * @require service.base;
 * @require service.apiconfig;
 * @css style.grid;
 * @css style.site:css;
 * @css style.style;
 * @template template.sitetemp;
 */
Module({
    name: "pagecontainer",
    extend: "viewgroup",
    option: {},
    init: function (option) {
        var ths = this, c = {}, mapping = require("@config");
        this._router = require("@router")(sitePath);
        for (var i in mapping) {
            var url = i;
            if (url[url.length - 1] !== "/") {
                c[url + "/"] = mapping[i];
            } else {
                c[url] = mapping[i];
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
    services:{
        "article":"@site.docservice"
    },
    option: {
        modules: [{type: "", option: {}}]
    },
    setContentPage:function () {
        if (this.parameters.query) {
            this.getService("article").trigger("fetch",this.parameters.query).scope(this).then(function (t) {
                this.getChildAt(0).update(t);
                this.getChildAt(1).update(t.content);
                this.dispatchEvent("contentdone");
            });
        }else{
            this.dispatchEvent("gotoPage",{
                url:"404"
            });
        }
    }
});
Module({
    name: "base",
    extend: "view",
    className: "base",
    template: "@sitetemp.base",
    services:{
        scroll:"@base.scrollservice"
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
    service_scroll:function (top) {
        var dom = this.finders("bg");
        if (top > dom.height()) {
            this.dom.addClass("show");
        } else {
            this.dom.removeClass("show");
        }
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
    extend: "view",
    className: "list",
    template: "@sitetemp.list",
    autodom:true,
    option: {
        service_list:{
            url:require("@apiconfig").get("articlelist"),
            detail:require("@apiconfig").get("articledetail"),
            pagesize:10
        }
    },
    services:{
        scroll:"@base.scrollservice",
        list:"@base.listservice"
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
    service_scroll:function () {
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
    service_firstpage:function () {
        this.dispatchEvent("listdone");
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
    services:{
        base:"@site.baseservice"
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
    autodom:true,
    services:{
        scroll:"@base.scrollservice"
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
    service_scroll:function (t) {
        var dom=this.finders("bg");
        dom.css("opacity", 1 * (t / dom.height()));
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
    autodom:true,
    init: function () {
        this.render("no content");
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