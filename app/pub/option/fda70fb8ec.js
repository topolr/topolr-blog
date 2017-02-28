/* 
 * @packet option.detail;
 * @require site.site;
 */
Option({name:"page",option:{modules:[{type:"@site.paperheader"},{type:"@site.papercontent"},{type:"@site.paperfooter"}],override:{onendinit:function(){this.setContentPage()},event_contentdone:function(){App().snapshot()}}}});