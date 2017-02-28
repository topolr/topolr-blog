/* 
 * @packet option.article;
 * @require site.admin;
 */
Option({
    name:"page",
    option:{
        modules:[
            {type:"@admin.adminhead"},
            {type:"@admin.articlelist"},
            {type:"@admin.copyright"}
        ]
    }
});