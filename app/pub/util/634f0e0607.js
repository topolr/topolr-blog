/*!
 * @packet util.router;
 */
var agent={add:function(t,n,i){return window.history.pushState(t,n,i),this},replace:function(t,n,i){return window.history.replaceState(t,n,i),this},onChange:function(t){window.onpopstate=function(n){t&&t(n)}}},router={map:{},list:[],hasDot:/\{\w*\}/g,url:window.location.href,add:function(t,n){"/"!==t[t.length-1]&&(t+="/");var i=!1,r=0,e=0,_=[],a=t.replace(this.hasDot,function(t,n){return i=!0,0===r&&(e=n),_.push(t.substring(1,t.length-1)),r++,"((?!/).)*"});if(i){var s={};s.originalpath=t,s.pattern=new RegExp("^"+a+"$"),s.count=r,s.patternString="^"+a+"/$",s.firstposition=e,s.keys=_,s.callback=n;var h=t.split("\\.");h.length>1&&(s.suffix=h[1]),this.list.push(s)}else this.map[t]=n},check:function(t){var n={found:!1,hasParas:!1,path:"",matchpath:"",map:{},query:$.serialize.queryObject(t),hash:$.serialize.hashObject(t),callback:null},i=t.split("?");i.length>1&&(t=i[0]);var r="",e=t.split("\\.");if(e.length>1?(r=e[1],t+="/"):"/"!==e[0][e[0]-1]&&(t=e[0]+"/"),this.map[t])return n.path=t,n.matchpath=t,n.callback=this.map[t],n.found=!0,n;var _=null;for(var a in this.list){var s=this.list[a];s.pattern.test(t)&&(null===_?_=s:s.suffix===r&&s.count<=_.count&&s.firstposition>_.firstposition&&(_=s))}if(null!==_){for(var h=t.split("/"),o=_.originalpath.split("/"),l=0,a=0;a<o.length;a++)"{"===o[a][0]&&(n.map[_.keys[l]]=h[a],l++);n.hasParas=!0,n.path=_.originalpath,n.matchpath=t,n.callback=s.callback,n.found=!0}return n}},__history=null,_history=function(t){t&&("/"===t[t-1]&&(t=t.substring(0,t.length-1)),this.url=t),this._stack=[1],this._currentIndex=0;var n=this;router.add("404",function(){console.log("[bright] router no page.")}),agent.onChange(function(t){_history._run.call(n,t.state,t)})};_history._run=function(t,n){t||(t={__page__:window.location.href.substring(this.url.length),__index__:0}),""===t.__page__?t.__page__="index":"/"===t.__page__[t.__page__.length-1]&&(t.__page__=t.__page__.substring(t.__page__.length-1));var i=router.check(t.__page__),r=!1,e=!1;if(!i.found)return i=router.check("404"),void this.edit("404");if(i.found){var _={};n&&$.extend(t,n.state),void 0!==t.__index__&&null!==t.__index__&&(t.__index__<this._currentIndex&&(r=!0),t.__index__>this._currentIndex&&(e=!0),this._currentIndex=t.__index__);for(var a in t)"__page__"!==a&&"__title__"!==a&&"__index__"!==a&&(_[a]=t[a]);i.callback&&i.callback.call(this,{action:i.path,back:r,forward:e,keys:i.hasParas?i.map:null,query:i.query,hash:i.hash,info:_,e:void 0===n?null:n})}},_history.prototype.run=function(){var t=window.location.href.substring(this.url.length);return _history._run.call(this,{__page__:t}),this},_history.prototype.open=function(t,n,i){return n||(n={}),n.__page__=t,n.__title__=i,n.__index__=this._stack.length,agent.add(n,i,this.url+t),this._stack.push(1),this._currentIndex=n.__index__,_history._run.call(this,n),this},_history.prototype.edit=function(t,n,i){return n||(n={}),n.__page__=t,agent.replace(n,i,this.url+t),_history._run.call(this,n),this},_history.prototype.bind=function(t,n){if(1===arguments.length)for(var i in t)router.add(i,t[i]);else 2===arguments.length&&router.add(t,n);return this},module.exports=function(t){return __history||(__history=new _history(t)),__history};