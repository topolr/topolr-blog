/**
 * @packet main;
 * @template template.main;
 * @require service.base;
 * @require service.site;
 */
console.log(module);
Module({
    name:"container",
    extend:"viewgroup",
    option:{},
    init:function () {
        this.addChild({
            type:"@.page",
            container:this.dom
        });
    }
});
Module({
    name:"page",
    extend:"viewgroup",
    layout:"@main.page",
    option:{
        modules:[
            {type:"@.pagelist"},
            {type:"@.translate"},
            {type:"@.ades"}
        ]
    }
});
Module({
    name:"pagelist",
    extend:"view",
    autodom:true,
    template:"@main.pagelist",
    services:{
        list:"@base.listservice",
        scroll:"@base.scrollservice",
        doc:"@site.docservice"
    },
    option:{
        service_list:{
            url:sitePath+"/doc/list"
        },
        service_doc:{
            edit:sitePath+"/doc/edit",
            fetch:sitePath+"/doc/fetch",
            remove:sitePath+"/doc/remove",
            add:sitePath+"/doc/add"
        }
    },
    init:function () {
        this.getService("list").trigger("gotopage",0).scope(this).done(function () {
            console.log(this);
            App().snapshot();
        });
    },
    bind_item:function (dom) {
        var data=dom.cache();
        this.getService("doc").trigger("fetch",data.id).done(function (data) {
            console.log(data);
        }).fail(function (e) {
            console.log(e);
        });
    },
    service_scroll:function (data) {
    }
});
Module({
    name:'translate',
    extend:"view",
    template:"@main.translate",
    autodom:true,
    services:{
        translate:"@base.translate"
    },
    init:function () {
        this.render({
            translation:[]
        });
    },
    bind_btn:function (dom) {
        var a=this.finders("input").val();
        if(a){
            this.getService("translate").trigger("translate",a).done(function (a) {
                console.log("--%o",a);
            }).fail(function (a) {
                console.log(a);
            });
        }
    }
});
Module({
    name:"ades",
    extend:"view",
    template:"@main.ades",
    services:{
        test:"@site.docservice"
    },
    option:{
        service_test:{
            edit:sitePath+"/doc/edit",
            fetch:sitePath+"/doc/fetch",
            remove:sitePath+"/doc/remove",
            add:sitePath+"/doc/add"
        }
    },
    init:function () {
        this.render();
    },
    bind_btn:function () {
        var a=this.finders("addcontent").val();
        var b=this.finders("addtitle").val();
        var c=this.finders("adddesc").val();
        if(a) {
            this.getService("test").trigger("add", {
                title: b,
                desc: c,
                content: a
            });
        }
    }
});