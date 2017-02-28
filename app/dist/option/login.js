/* 
 * @packet option.login;
 * @require site.admin;
 */
Option({
    name:"page",
    option:{
        modules:[
            {type:"@admin.login"}
        ]
    }
});

