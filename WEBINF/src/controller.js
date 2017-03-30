/**
 * @packet controller;
 */
var topolr=require("topolr-util");
Module({
    name: 'base',
    extend: "controller",
    active: true,
    path: "",
    actionPaths: function () {
        var config = require("../../app/src/config.js");
        var paths = ["/"];
        for (var i in config) {
            var path = "/" + i;
            if (paths.indexOf(path) === -1) {
                paths.push(path);
            }
        }
        this.config = config;
        return paths;
    },
    action: function () {
        // if(this.checkPath(this.request.getURL())){
        //     return this.getCetusView();
        // }else {
        return this.getDefaultPageView("index", {});
        // }
    },
    checkPath: function (url) {
        var name = this.getContext().getProjectName();
        var t = url.split("?")[0].substring(name.length + 2);
        var config = require("../../../app/src/config.js");
        if (config[t]) {
            return config[t].cetus;
        } else {
            return false;
        }
    }
});
Module({
    name: "basecontroller",
    getSuccessView: function (data) {
        return this.getJsonView({
            code: "1",
            data: data
        });
    },
    getErrorView: function (data) {
        return this.getJsonView({
            code: "0",
            msg: data || ""
        });
    }
});
Module({
    name:"youdaoapi",
    extend: "proxycontroller",
    active: true,
    proxyName:"youdao"
});
Module({
    name: "api",
    extend: ["storecontroller", "@.basecontroller"],
    path: "/api",
    "/translate2": function () {
        return this.getProxyView("youdao", "translate");
    },
    "/translate": function () {
        return this.forward({
            hostName: "youdao",
            apiName: "translate"
        }).scope(this).done(function (result) {
            return this.getStringView(result.data);
        }).fail(function () {
            return this.getDefaultPageView(500, "proxy request error");
        });
    },
    "/admin/login": function () {
        return this.getStore("user").scope(this).then(function (db) {
            return db.find(this.request.getParameters());
        }).then(function (data) {
            if (data.length > 0) {
                this.request.getSession().setAttribute("user",data[0]);
                return this.getSuccessView(data[0]);
            } else {
                return this.getErrorView("user can not found");
            }
        }, function (e) {
            return this.getErrorView("user can not found");
        })
    },
    "/admin/session":function () {
        if (this.request.getSession().hasAttribute("user")) {
            this.getSuccessView();
        } else {
            this.getErrorView();
        }
    }
});

Module({
    name: "openarticle",
    extend: ["storecontroller", "@.basecontroller"],
    path: "/article",
    "/list": function () {
        return this.getStore("article").scope(this).then(function (db) {
            var a = this.request.getParameters(["from", "size"]);
            return db.findBy({}, {
                title: 1,
                desc: 1,
                createTime: 1,
                id: 1
            }).skip(a.from/1).limit(a.size/1).sort({createTime: -1}).exec();
        }).then(function (data) {
            return this.getSuccessView(data);
        }, function (e) {
            console.log(e)
            return this.getErrorView();
        });
    },
    "/detail": function () {
        return this.getStore("article").scope(this).then(function (db) {
            return db.find(this.request.getParameters(), {
                title: 1,
                desc: 1,
                createTime: 1,
                content: 1,
                id:1,
                image:1
            });
        }).then(function (data) {
            if (data.length > 0) {
                var result=data[0],ps=topolr.promise(),ths=this;
                var marked = require('marked');
                marked.setOptions({
                    renderer: new marked.Renderer(),
                    gfm: true,
                    tables: true,
                    breaks: false,
                    pedantic: false,
                    sanitize: false,
                    smartLists: true,
                    smartypants: false
                });
                marked(result.content, function (err, r) {
                    if (err){
                        console.log(err)
                    }else{
                        result.content=r;
                    }
                    ps.resolve(ths.getSuccessView(result));
                });
                return ps;
            } else {
                return this.getErrorView();
            }
        });
    }
});
Module({
    name: "adminarticle",
    extend: ["storecontroller", "@.basecontroller","@.openarticle"],
    path: "/api/admin/article",
    before: function (next, end) {
        if (this.request.getSession().hasAttribute("user")) {
            next();
        } else {
            end(this.getJsonView({code: "2"}));
        }
    },
    "/edit": function () {
        var ps = null;
        var file = this.request.getParameter("file");
        var data = this.request.getParameters("image", "id", "title", "content", "desc");
        if (file) {
            var topolr = require("topolr-util");
            var name = (new Date().getTime());
            var path = this.getContext().getProjectPath() + "/db/images/" + name + ".png";
            data.image = "db/images/" + name + ".png";
            ps = topolr.file(file.path).moveTo(path).scope(this).then(function () {
                return this.getStore("article");
            });
        } else {
            ps = this.getStore("article").scope(this);
        }
        ps.then(function (db) {
            return db.update({id: data.id}, data, {});
        }).then(function (data) {
            return this.getSuccessView(data);
        }, function (e) {
            return this.getErrorView(e);
        });
        return ps;
    },
    "/add": function () {
        var file = this.request.getParameter("file");
        if (file) {
            var topolr = require("topolr-util");
            var name = (new Date().getTime());
            var path = this.getContext().getProjectPath() + "/db/images/" + name + ".png";
            var data = this.request.getParameters({
                image: "db/images/" + name + ".png",
                id: topolr.util.uuid(),
                title: "",
                content: "",
                desc: ""
            });
            return topolr.file(file.path).moveTo(path).scope(this).then(function () {
                return this.getStore("article");
            }).then(function (db) {
                return db.insert(data);
            }).then(function (data) {
                return this.getSuccessView(data);
            }, function (e) {
                return this.getErrorView(e);
            });
        } else {
            return this.getErrorView("add error file is empty");
        }
    },
    "/remove": function () {
        return this.getStore("article").scope(this).then(function (db) {
            return db.remove(this.request.getParameters("id"));
        }).then(function (data) {
            return this.getSuccessView(data);
        }, function (e) {
            console.log(e)
            return this.getErrorView(e);
        });
    },
    "/detail": function () {
        return this.getStore("article").scope(this).then(function (db) {
            return db.find(this.request.getParameters(), {
                title: 1,
                desc: 1,
                createTime: 1,
                content: 1,
                id:1,
                image:1
            });
        }).then(function (data) {
            if (data.length > 0) {
                return this.getSuccessView(data[0]);
            } else {
                return this.getErrorView();
            }
        });
    }
});
Module({
    name: "opencomment",
    extend: ["storecontroller", "@.basecontroller"],
    path: "/comment",
    "/list": function (articleid) {
        return this.getStore("article").scope(this).then(function (db) {
            var a = this.request.getParameters("articleid","from","size");
            return db.findBy({id:a.articleid}, {
                comment: 1
            }).skip(a.from).limit(a.size).sort({createTime: -1}).exec();
        }).then(function (data) {
            return this.getSuccessView(data[0].comment);
        }, function (e) {
            return this.getErrorView();
        });
    },
    "/add": function () {
        var mdb=null;
        return this.getStore("article").scope(this).then(function (db) {
            var a = this.request.getParameters("articleid");
            mdb=db;
            return db.find({id:a.articleid});
        }).then(function (data) {
            var a = this.request.getParameters("name","email","content",{
                id:require("topolr-util").util.uuid(),
                time:new Date().getTime(),
                comment:[]
            });
            var b=this.request.getParameters(["articleid"]);
            data[0].comment||(data[0].comment=[]);
            data[0].comment.push(a);
            mdb.update({id:b.articleid},data[0],{});
        }).then(function () {
            return this.getSuccessView();
        }, function (e) {
            console.log(e);
            return this.getErrorView();
        });
    },
    "/addsub":function () {
        var mdb=null;
        return this.getStore("article").scope(this).then(function (db) {
            var a = this.request.getParameters("articleid");
            mdb=db;
            return db.find({id:a.articleid});
        }).then(function (data) {
            var a = this.request.getParameters("name","email","content",{
                id:require("topolr-util").util.uuid(),
                time:new Date().getTime()
            });
            var commentid=this.request.getParameter("commentid");
            var articleid=this.request.getParameter("articleid");
            var index=null;
            data[0].comment.forEach(function (data,b) {
                if(data.id===commentid){
                    index=b;
                    return false;
                }
            });
            if(index!==null) {
                data[0].comment[index].comment.push(a);
                mdb.update({id: articleid}, data[0], {});
            }
        }).then(function () {
            return this.getSuccessView();
        }, function (e) {
            console.log(e);
            return this.getErrorView();
        });
    }
});
Module({
    name: "admincomment",
    extend: ["storecontroller", "@.basecontroller"],
    path: "api/comment",
    "/remove": function () {
    },
    "/edit": function () {
    }
});