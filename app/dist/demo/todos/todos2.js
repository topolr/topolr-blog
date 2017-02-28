/*
 * @packet demo.todos.todos2;
 * @template demo.todos.template.temp;
 * @css demo.todos.style.todostyle; 
 * @css demo.todos.style.font;
 * @require demo.todos.service.testservice;
 */
Module({
    name: "todos",
    extend: "view",
    autodom: true,
    className: "todos",
    template: "@temp.todos",
    services: {test:"@testservice.test"},
    option:{
        service_test:{
            what:"this is what",
            yourname:"hy"
        }
    },
    init: function () {
        this.render(this.getService("test").action("get"));
    },
    bind_checkall: function () {
        this.getService("test").trigger("checkall");
    },
    bind_check: function (dom, e) {
        this.getService("test").trigger("check", dom.group().cache());
        e.stopPropagation();
    },
    bind_remove: function (dom) {
        this.getService("test").trigger("remove", dom.group().cache());
    },
    bind_input: function (dom, e) {
        if (e.keyCode === 13) {
            var t = dom.val();
            if (t) {
                this.getService("test").trigger("additem", {
                    checked: false,
                    desc: t,
                    id: new Date().getTime()
                });
                dom.val("");
            }
        }
    },
    bind_all: function () {
        this.getService("test").trigger("toggleall");
    },
    bind_active: function () {
        this.getService("test").trigger("toggleactive");
    },
    bind_complete: function () {
        this.getService("test").trigger("togglecomplete");
    },
    bind_clear: function () {
        this.getService("test").trigger("toggleclear");
    }
});
Module({
    name: "todos2",
    extend: "@.todos",
    template: "@temp.todos2"
});