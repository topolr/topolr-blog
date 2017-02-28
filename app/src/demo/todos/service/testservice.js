/* 
 * @packet demo.todos.service.testservice;
 */
Module({
    name: "test",
    extend: "publicservice",
    option: {
        what: ""
    },
    init: function () {
        this.superClass();
        this.data = this.getStorage("todos") || {
            task: [],
            totalleft: 0,
            complete: false,
            active: false,
            all: true,
            ischeckall: false
        };
        this.start();
    },
    action_get: function () {
        return this.data;
    },
    service_checkall: function () {
        if (this.data.ischeckall) {
            for (var i = 0; i < this.data.task.length; i++) {
                this.data.task[i].checked = false;
            }
        } else {
            for (var i = 0; i < this.data.task.length; i++) {
                this.data.task[i].checked = true;
            }
        }
        this.update();
    },
    service_check: function (data) {
        if (data.checked) {
            data.checked = false;
        } else {
            data.checked = true;
        }
        this.update();
    },
    service_remove: function (t) {
        var q = this.data.task.indexOf(t);
        this.data.task.splice(q, 1);
        this.update();
    },
    service_additem: function (t) {
        this.data.task.push(t);
        this.update();
    },
    service_toggleall: function () {
        this.data.all = true;
        this.data.complete = false;
        this.data.active = false;
        this.update();
    },
    service_toggleactive: function () {
        this.data.active = true;
        this.data.complete = false;
        this.data.all = false;
        this.update();
    },
    service_togglecomplete: function () {
        this.data.active = false;
        this.data.complete = true;
        this.data.all = false;
        this.update();
    },
    service_toggleclear: function () {
        var t = [];
        for (var i = 0; i < this.data.task.length; i++) {
            if (!this.data.task[i].checked) {
                t.push(this.data.task[i]);
            }
        }
        this.data.task = t;
        this.update();
    },
    update: function () {
        var t = 0;
        for (var i = 0; i < this.data.task.length; i++) {
            if (this.data.task[i].checked === false) {
                t += 1;
            }
        }
        if (t !== 0) {
            this.data.ischeckall = false;
        }
        this.data.totalleft = t;
        this.setStorage("todos", this.data);
        this.trigger();
    }
});

