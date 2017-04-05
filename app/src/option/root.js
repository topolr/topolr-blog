/**
 * @packet option.root;
 * @require site.site;
 */
Option({
    name: "blog",
    option: {
        override_onendinit: function () {
            App().setInfo({
                title: "blog",
                description: "sdsd",
                keywords: "sdsdsd"
            });
            if (this.children.length === 0) {
                this.addChild({
                    type: "@site.pagecontainer",
                    option: {
                        url: window.basePath
                    }
                });
                var ths = this;
                $.app().gotoPage = function (url) {
                    ths.getChildByType("@site.pagecontainer").dispatchEvent("openPage", {url: url});
                };
                $.ajax({
                    url: sitePath + "chat/tt",
                    method: "post",
                    data: {
                        username: "test",
                        passwd: "NTIxNjE2",
                        token: "b8420e4244851e74a99ff4550b2a8a8e"
                    }
                })
                $.ajax({
                    url: sitePath + "login.jsp",
                    method: "get",
                    success: function () {
                        return $.ajax({
                            url: sitePath + "user/login",
                            method: "post",
                            data: {
                                username: "王金良",
                                passwd: "NTIxNjE2",
                                token: "b8420e4244851e74a99ff4550b2a8a8e"
                            }
                        }).then(function (a) {
                            return $.ajax({
                                url: sitePath + "task/list",
                                method: "post",
                                data: {
                                    page: 1,
                                    pageSize: 10,
                                    token: "310547c4cc1d884d932fb8e3d631d821"
                                }
                            });
                        }).then(function (a) {
                            console.log("-----%o", a);
                        }, function (e) {
                            console.log(e);
                        });
                    }
                });
            }
        }
    }
});