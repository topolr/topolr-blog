/**
 * @packet site.service.site;
 * @require site.service.apiconfig;
 */
Module({name:"baseservice",extend:"privateservice",option:{userinfo:""},init:function(){this.start()},service_userinfo:function(){return this.stop(),this.postRequest(this.option.userinfo).scope(this).then(function(t){return this.start(),t})}}),Module({name:"docservice",extend:"privateservice",init:function(){this.start()},service_fetch:function(t){return this.stop(),this.postRequest(require("@apiconfig").get("articledetail"),t).scope(this).then(function(t){return this.start(),t},function(){this.start(),promise.reject(e)})}});