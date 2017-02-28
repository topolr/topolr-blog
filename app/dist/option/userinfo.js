/*
 * @packet option.userinfo; 
 * @require site.admin;
 */
Option({
    name: "page",
    option: {
        modules: [
            {type: "@admin.adminhead"},
            {type: "@admin.edituserinfo"},
            {type: "@admin.copyright"}
        ]
    }
});

