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
            }
        }
    }
});