/**
 * @packet util.editor;
 * @map (js)lib.ace.ace;
 */
Module({
    name:"mdeditor",
    setEditor:function (dom,height) {
        var ps=$.promise();
        if(!height){
            height:600
        }
        var t=module.currentPath.split("/");
        t.pop();
        t.pop();
        $().create("script").attr("src",t.join("/")+"/lib/ace/ace.js").attr("type","text/noload").appendTo("head");
        module.getMapSource("@ace").scope(this).done(function () {
            var id = $.util.randomid(8);
            $().create("pre").css({height: height+"px"}).attr("id", id).appendTo(dom);
            var editor = window.ace.edit(id);
            editor.setTheme("ace/theme/github");
            editor.getSession().setMode("ace/mode/markdown");
            this._editor = editor;
            this.dispatchEvent("editordone");
            ps.resolve();
        });
        return ps;
    },
    getValue:function () {
        return this._editor.getValue();
    },
    setValue:function (val) {
        this._editor.setValue(val);
    },
    isReady:function () {
        return this._editor!=undefined;
    }
});