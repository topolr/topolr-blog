/*!
 * @packet util.router;
 */
var agent = {
    add: function (data, title, url) {
        window.history.pushState(data, title, url);
        return this;
    },
    replace: function (data, title, url) {
        window.history.replaceState(data, title, url);
        return this;
    },
    onChange: function (fn) {
        window.onpopstate = function (e) {
            fn && fn(e);
        };
    }
};
var router = {
    map: {},
    list: [],
    hasDot: /\{\w*\}/g,
    url: window.location.href,
    add: function (path, fn) {
        if (path[path.length - 1] !== "/") {
            path = path + "/";
        }
        var has = false, count = 0, start = 0, pars = [];
        var pathx = path.replace(this.hasDot, function (a, b) {
            has = true;
            if (count === 0) {
                start = b;
            }
            pars.push(a.substring(1, a.length - 1));
            count++;
            return "((?!/).)*";
        });
        if (has) {
            var info = {};
            info.originalpath = path;
            info.pattern = new RegExp("^" + pathx + "$");
            info.count = count;
            info.patternString = "^" + pathx + "/$";
            info.firstposition = start;
            info.keys = pars;
            info.callback = fn;
            var aStrings = path.split("\\.");
            if (aStrings.length > 1) {
                info.suffix = aStrings[1];
            }
            this.list.push(info);
        } else {
            this.map[path] = fn;
        }
    },
    check: function (path) {
        var result = {
            found: false,
            hasParas: false,
            path: "",
            matchpath: "",
            map: {},
            query: $.serialize.queryObject(path),
            hash: $.serialize.hashObject(path),
            callback: null
        };
        var t = path.split("?");
        if (t.length > 1) {
            path = t[0];
        }
        var suffix = "", bString = path.split("\\.");
        if (bString.length > 1) {
            suffix = bString[1];
            path = path + "/";
        } else {
            if (bString[0][bString[0] - 1] !== "/") {
                path = bString[0] + "/";
            }
        }
        if (this.map[path]) {
            result.path = path;
            result.matchpath = path;
            result.callback = this.map[path];
            result.found = true;
            return result;
        } else {
            var a = null;
            for (var i in this.list) {
                var info = this.list[i];
                if (info.pattern.test(path)) {
                    if (null === a) {
                        a = info;
                    } else if (info.suffix === suffix) {
                        if (info.count <= a.count) {
                            if (info.firstposition > a.firstposition) {
                                a = info;
                            }
                        }
                    }
                }
            }
            if (null !== a) {
                var p = path.split("/"), pp = a.originalpath.split("/");
                var cd = 0;
                for (var i = 0; i < pp.length; i++) {
                    if (pp[i][0] === "{") {
                        result.map[a.keys[cd]] = p[i];
                        cd++;
                    }
                }
                result.hasParas = true;
                result.path = a.originalpath;
                result.matchpath = path;
                result.callback = info.callback;
                result.found = true;
            }
            return result;
        }
    }
};
var __history = null;
var _history = function (url) {
    if (url) {
        if (url[url - 1] === "/") {
            url = url.substring(0, url.length - 1);
        }
        this.url = url;
    }
    this._stack = [1];
    this._currentIndex = 0;
    var ths = this;
    router.add("404", function () {
        console.log("[bright] router no page.");
    });
    agent.onChange(function (e) {
        _history._run.call(ths, e.state, e);
    });
};
_history._run = function (data, e) {
    if (!data) {
        data = {
            __page__: window.location.href.substring(this.url.length),
            __index__: 0
        };
    }
    if (data.__page__ === "") {
        data.__page__ = "index";
    } else {
        if (data.__page__[data.__page__.length - 1] === "/") {
            data.__page__ = data.__page__.substring(data.__page__.length - 1);
        }
    }
    var r = router.check(data.__page__), isback = false, isforward = false;
    if (!r.found) {
        r = router.check("404");
        this.edit("404");
        return;
    }
    if (r.found) {
        var info = {};
        if (e) {
            $.extend(data, e.state);
        }
        if (data.__index__ !== undefined && data.__index__ !== null) {
            if (data.__index__ < this._currentIndex) {
                isback = true;
            }
            if (data.__index__ > this._currentIndex) {
                isforward = true;
            }
            this._currentIndex = data.__index__;
        }
        for (var i in data) {
            if (i !== "__page__" && i !== "__title__" && i !== "__index__") {
                info[i] = data[i];
            }
        }
        r.callback && r.callback.call(this, {
            action: r.path,
            back: isback,
            forward: isforward,
            keys: r.hasParas ? r.map : null,
            query: r.query,
            hash: r.hash,
            info: info,
            e: e === undefined ? null : e
        });
    }
};
_history.prototype.run = function () {
    var page = window.location.href.substring(this.url.length);
    _history._run.call(this, {__page__: page});
    return this;
};
_history.prototype.open = function (url, data, title) {
    if (!data) {
        data = {};
    }
    data["__page__"] = url;
    data["__title__"] = title;
    data["__index__"] = this._stack.length;
    agent.add(data, title, this.url + url);
    this._stack.push(1);
    this._currentIndex = data.__index__;
    _history._run.call(this, data);
    return this;
};
_history.prototype.edit = function (url, data, title) {
    if (!data) {
        data = {};
    }
    data["__page__"] = url;
    agent.replace(data, title, this.url + url);
    _history._run.call(this, data);
    return this;
};
_history.prototype.bind = function (obj, fn) {
    if (arguments.length === 1) {
        for (var i in obj) {
            router.add(i, obj[i]);
        }
    } else if (arguments.length === 2) {
        router.add(obj, fn);
    }
    return this;
};

module.exports=function (option) {
    if (!__history) {
        __history = new _history(option);
    }
    return __history;
};