/**
 * @packet site.service.site;
 * @require site.service.apiconfig;
 */
Module({
    name: "baseservice",
    extend: "privateservice",
    option: {
        userinfo: ""
    },
    init: function () {
        this.start();
    },
    service_userinfo: function () {
        this.stop();
        return this.postRequest(this.option.userinfo).scope(this).then(function (a) {
            this.start();
            return a;
        });
    }
});
Module({
    name: "docservice",
    extend: "privateservice",
    init: function () {
        this.start();
    },
    service_fetch: function (query) {
        this.stop();
        return this.postRequest(require("@apiconfig").get("articledetail"), query).scope(this).then(function (e) {
            this.start();
            return e;
        }, function () {
            this.start();
        });
    }
});
Module({
    name: "commentservice",
    extend:"privateservice",
    init:function () {
        this.start();
    },
    service_addcomment:function (data) {
        this.stop();
        return this.postRequest(require("@apiconfig").get("addcomment"),data).scope(this).then(function (e) {
            this.start();
            return e;
        },function (e) {
            console.log(e);
            this.start();
        })
    },
    service_addsubcomment:function (data) {
        this.stop();
        return this.postRequest(require("@apiconfig").get("addsubcomment"),data).scope(this).then(function (e) {
            this.start();
            return e;
        },function (e) {
            console.log(e);
            this.start();
        })
    }
});