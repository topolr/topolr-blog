var topolr=require("topolr-util");
module.exports={
    name:"test",
    fn:function (url,parameters) {
        var ths=this;
        return topolr.promise(function (a) {
            a(ths.parse(parameters));
        });
    }
};