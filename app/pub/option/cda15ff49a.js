/**
 * @packet option.root;
 * @require site.site;
 */
Option({name:"blog",option:{override_onendinit:function(){App().setInfo({title:"blog",description:"sdsd",keywords:"sdsdsd"}),0===this.children.length&&this.addChild({type:"@site.pagecontainer",option:{url:window.basePath}})}}});