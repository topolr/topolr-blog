/**
 * @packet service.site;
 * @require service.apiconfig;
 */
Module({
    name:"baseservice",
    extend:"privateservice",
    option:{
        userinfo:""
    },
    init:function () {
        this.start();
    },
    service_userinfo:function () {
        this.stop();
        return this.postRequest(this.option.userinfo).scope(this).then(function (a) {
            this.start();
            return a;
        });
    }
});
Module({
    name:"docservice",
    extend:"privateservice",
    init:function () {
        this.start();
    },
    service_fetch:function (query) {
        this.stop();
        return this.postRequest(require("@apiconfig").get("articledetail"),query).scope(this).then(function (e) {
            this.start();
            return e;
        },function () {
            this.start();
            promise.reject(e);
        });
    }
});
