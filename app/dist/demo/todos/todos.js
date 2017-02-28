/*
 * @packet demo.todos.todos;
 * @template demo.todos.template.temp;
 * @css demo.todos.style.todostyle; 
 * @css demo.todos.style.font;
 */
Module({
    name: "todos",
    extend: "view",
    autodom: true,
    className: "todos",
    template: module.getTemplate("@temp", "todos"),
    init: function () {
        this._todos = this.getStorage("todos") || {
            task: [],
            totalleft: 0,
            complete: false,
            active: false,
            all: true,
            ischeckall: false
        };
        this.render(this._todos);
    },
    bind_checkall: function () {
        if (this._todos.ischeckall) {
            for (var i = 0; i < this._todos.task.length; i++) {
                this._todos.task[i].checked = false;
            }
            this._todos.ischeckall = false;
            this.update();
        } else {
            for (var i = 0; i < this._todos.task.length; i++) {
                this._todos.task[i].checked = true;
            }
            this._todos.ischeckall = true;
            this.update();
        }
    },
    bind_check: function (dom, e) {
        var t = dom.group().cache();
        if (t.checked) {
            t.checked = false;
        } else {
            t.checked = true;
        }
        this.update();
        e.stopPropagation();
    },
    bind_remove: function (dom) {
        var t = dom.group().cache();
        var q = this._todos.task.indexOf(t);
        this._todos.task.splice(q, 1);
        this.update();
    },
    bind_input: function (dom, e) {
        if (e.keyCode === 13) {
            var t = dom.val();
            if (t) {
                this._todos.task.push({
                    checked: false,
                    desc: t,
                    id:new Date().getTime()
                });
                this.update();
                dom.val("");
            }
        }
    },
    bind_all: function () {
        this._todos.all = true;
        this._todos.complete = false;
        this._todos.active = false;
        this.update();
    },
    bind_active: function () {
        this._todos.active = true;
        this._todos.complete = false;
        this._todos.all = false;
        this.update();
    },
    bind_complete: function () {
        this._todos.active = false;
        this._todos.complete = true;
        this._todos.all = false;
        this.update();
    },
    bind_clear: function () {
        var t = [];
        for (var i = 0; i < this._todos.task.length; i++) {
            if (!this._todos.task[i].checked) {
                t.push(this._todos.task[i]);
            }
        }
        this._todos.task = t;
        this.update();
    },
    update: function () {
        var t = 0;
        for (var i = 0; i < this._todos.task.length; i++) {
            if (this._todos.task[i].checked === false) {
                t += 1;
            }
        }
        if (t!==0) {
            this._todos.ischeckall = false;
        }
        this._todos.totalleft=t;
        this.setStorage("todos", this._todos);
        this.superClass("update");
    }
});
Module({
    name:"todos2",
    extend:"@.todos",
    template:module.getTemplate("@temp","todos2")
});

Option({
    name: "todosoption",
    option: {
        type: "@.todos",
        type2: "@.todos2"
    }
});