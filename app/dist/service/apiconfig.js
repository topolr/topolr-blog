/**
 * @packet service.apiconfig;
 */
var config = {
    login: "api/admin/login",
    articlelist: "article/list",
    articledetail:"article/detail",
    edituserinfo:"api/admin/user/edit",
    addarticle:"api/admin/article/add",
    editarticle:"api/admin/article/edit",
    removearticle:"api/admin/article/remove"
};
config.get = function (name) {
    return sitePath + config[name];
};
module.exports = config;