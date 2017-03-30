var util=require("./../../util/util");
module.exports={
    name:"int",
    step:1,
    fn:function(scope,len){
        return util.randomstr(scope);
    }
}