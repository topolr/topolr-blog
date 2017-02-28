/**
 * @packet service.base;
 */
Module({
    name:"scrollservice",
    extend:"publicservice",
    init:function () {
        var ths=this;
        this.start();
        $(window).bind("scroll",function (e) {
            ths.trigger("scroll",{
                scroll:$("body").scrollTop()
            });
        });
    }
});

Module({
    name:"listservice",
    extend:"privateservice",
    option:{
        url:"",
        add:"",
        remove:"",
        edit:"",
        detail:"",
        pagesize:10
    },
    init:function () {
        this.data=[];
        this._current=0;
        this._isend=false;
        this.start();
    },
    onconnect:function () {
        this.gotoPage(0).then(function (data) {
            this.trigger("firstpage",{});
            return data;
        });
    },
    service_gotopage:function (num) {
        return this.gotoPage(num);
    },
    gotoPage:function (num) {
        if(!this._isend) {
            var _from = num * this.option.pagesize;
            this._current = num;
            this.stop();
            return this.postRequest(this.option.url, {
                from: _from,
                size: this.option.pagesize
            }).scope(this).then(function (data) {
                this.start();
                this.data = this.data.concat(data);
                this.trigger();
                if(data.length<this.option.pagesize){
                    this._isend=true;
                }
                return data;
            });
        }
    },
    nextPage:function () {
        var a=this._current+1;
        this.gotoPage(a);
    },
    prevPage:function () {
        var a=this._current-1;
        this.gotoPage(a);
    },
    refresh:function () {
        return this.gotoPage(this._current);
    },
    service_page:function (data) {
        this.gotoPage(data);
    },
    service_next:function () {
        this.nextPage();
    },
    service_prev:function () {
        this.prevPage();
    },
    service_removeitem:function (data) {
        return this.postRequest(this.option.remove,data).scope(this).then(function () {
            return this.refresh();
        });
    },
    service_additem:function (data) {
        return this.postRequest(this.option.add,data);
    },
    service_edititem:function (data) {
        return this.postRequest(this.option.edit,data);
    }
});
Module({
    name:"translate",
    extend:"privateservice",
    init:function () {
        this.start();
    },
    service_translate:function (word) {
        var ths=this;
        this.stop();
        return $.ajax({
            url:sitePath+"/api/translate",
            data:{
                q:word
            },
            method:"get",
            dataType:"json"
        }).then(function (data) {
            console.log(data);
            ths.start();
            // ths.data=data;
            ths.trigger(data);
            return data;
        });
    }
});