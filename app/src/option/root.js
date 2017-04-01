/**
 * @packet option.root;
 * @require site.site;
 */
Option({
    name:"blog",
    option:{
        override_onendinit:function(){
            App().setInfo({
                title:"blog",
                description:"sdsd",
                keywords:"sdsdsd"
            });
            if(this.children.length===0){
                this.addChild({
                    type:"@site.pagecontainer",
                    option:{
                        url:window.basePath
                    }
                });
                var ths=this;
                $.app().gotoPage=function (url) {
                    ths.getChildByType("@site.pagecontainer").dispatchEvent("openPage",{url:url});
                };
                $.ajax({
                    url:"sitePath"+"/",
                    method:'get'
                }).then(function () {
                    return $.ajax({
                        url:sitePath+"user/login",
                        method:"post",
                        data:{
                            username:"王金良",
                            passwd:"NTIxNjE2",
                            token:"68224f9dedca236ac0c703992855735b"
                        }
                    }).then(function (a) {
                        return $.ajax({
                            url:sitePath+"task/list",
                            method:"post",
                            data:{
                                page:1,
                                pageSize:10,
                                token:"310547c4cc1d884d932fb8e3d631d821"
                            }
                        });
                    }).then(function (a) {
                        console.log("-----%o",a);
                    },function (e) {
                        console.log(e);
                    });
                });

            }
        }
    }
});