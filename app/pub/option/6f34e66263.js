/* 
 * @packet option.index;
 * @require site.site;
 */
Option({name:"page",option:{modules:[{type:"@site.base"},{type:"@site.list"},{type:"@site.copyright"}],override:{event_listdone:function(){App().snapshot()}}}});