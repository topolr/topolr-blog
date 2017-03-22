/**
 * @packet site.setting;
 */
$.overrideModule("data",{
    _doRequest: function (option, promise) {
        $.ajax(option).scope(this).then(function (a) {
            if (a.code && a.code === "1") {
                promise.resolve(a.data);
            } else if (a.code && a.code === "2") {
                $.app().gotoPage("login");
            } else {
                promise.reject(a);
            }
        },function (e) {
            promise.reject(e);
        });
    }
});