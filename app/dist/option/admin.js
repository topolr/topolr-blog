/* 
 * @packet option.admin;
 * @require site.admin;
 */
Option({
    name:"page",
    option:{
        modules:[
            {type:"@admin.adminhead"},
            {type:"@admin.list"},
            {type:"@admin.copyright"}
        ]
    }
});