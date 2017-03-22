/**
 * @packet site.service.admin;
 * @require site.service.apiconfig;
 */
Module({
    name:"userservice",
    extend:"publicservice",
    init:function () {
        this.start();
    },
    service_login:function (data) {
        this.stop();
        return this.postRequest(require("@apiconfig").get("login"),data).scope(this).then(function (a) {
            this.start();
            this.data=a;
            return a;
        },function (a) {
            this.start();
            return a;
        });
    },
    service_edit:function (data) {
        this.stop();
        return this.postRequest(require("@apiconfig").get("edituserinfo"),data).scope(this).then(function (a) {
            this.start();
            $.extend(this.data,data);
            return a;
        },function (a) {
            this.start();
            return a;
        });
    }
});
Module({
    name:"articleservice",
    extend:"privateservice",
    init:function () {
        this.start();
    },
    service_fetch:function (query) {
        this.stop();
        return this.postRequest(require("@apiconfig").get("apiarticledetail"),query).scope(this).then(function (e) {
            this.start();
            return e;
        },function () {
            this.start();
        });
    }
});