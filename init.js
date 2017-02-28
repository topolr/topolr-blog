var topolr=require("topolr-util");
/**
 * init article table
 */
var comment=function (num) {
    var tpp=parseInt(Math.random()*3)+1,r=[];
    for(var tp=0;tp<tpp;tp++){
        r.push({
            name:"name"+tp,
            email:"test@test.com",
            content:"comment"+tp,
            time:new Date().getTime(),
            id:topolr.util.uuid(),
            comment:[]
        });
    }
    return r;
};
topolr.file(__dirname+"/db/article.db").remove();
topolr.file(__dirname+"/WEBINF/data/article.json").write(JSON.stringify((function () {
    var t=[];
    for(var i=0;i<13;i++){
        var a={
            title:"this is title"+i,
            desc:"this is desc"+i,
            content:"this is content"+i,
            createTime:new Date().getTime(),
            author:"hou80houzhu",
            image:"db/images/test.jpg",
            id:topolr.util.uuid().replace(/-/g,""),
            comment:comment(i)
        };
        for(var e=0;e<a.comment.length;e++){
            a.comment[e].comment=comment(i+"-"+e);
        }
        t.push(a);
    }
    return t;
})(),null,4));
/**
 * init user table;
 */
topolr.file(__dirname+"/db/user.db").remove();
topolr.file(__dirname+"/WEBINF/data/user.json").write(JSON.stringify([{
    username:"admin",
    password:"521616",
    name:"hou80houzhu",
    email:"hou80houzhu@vip.qq.com"
}],null,4));