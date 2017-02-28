/* 
 * @packet option.nofind;
 * @require site.site;
 */
Option({
    name:"page",
    option:{
        modules:[
            {type:"@site.noadminhead"},
            {type:"@site.nofind"},
            {type:"@site.copyright"}
        ]
    }
});