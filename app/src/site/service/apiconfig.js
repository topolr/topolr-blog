/**
 * @packet site.service.apiconfig;
 */
var config = {
    login: "api/admin/login",
    articlelist: "article/list",
    articledetail:"article/detail",
    apiarticledetail:"api/admin/article/detail",
    apiarticleremove:"api/admin/article/remove",
    apiarticlelist:"api/admin/article/list",
    edituserinfo:"api/admin/user/edit",
    addarticle:"api/admin/article/add",
    editarticle:"api/admin/article/edit",
    removearticle:"api/admin/article/remove",
    commentlist:"comment/list",
    addcomment:"comment/add",
    addsubcomment:"comment/addsub"

};
config.get = function (name) {
    return sitePath + config[name];
};
module.exports = config;