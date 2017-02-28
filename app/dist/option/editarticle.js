/*
 * @packet option.editarticle; 
 * @require site.admin;
 */
Option({
    name: "page",
    option: {
        modules: [
            {type: "@admin.adminhead"},
            {type: "@admin.editarticle"},
            {type: "@admin.copyright"}
        ]
    }
});

