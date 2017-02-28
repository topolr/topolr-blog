/*!
 * @packet demo.chart.graph;
 */
var node=function(){this.tag="",this.props={},this.hasProp=!1,this.children=[],this.parent=null,this.cache=null};node.prototype.element=function(){this.cache=$().create(this.tag,"http://www.w3.org/2000/svg").attr(this.props),this.parent&&this.parent.cache&&this.parent.cache.append(this.cache);for(var e=0;e<this.children.length;e++)this.children[e].element()};var textnode=function(e,t){this.content=e,this.parent=t};textnode.prototype.element=function(){var e=$();e.nodes=[window.document.createTextNode(this.content)],e.length=1,this.cache=e,this.parent&&this.parent.cache&&this.parent.cache.append(this.cache)};var tagsTransformer={isDoctype:/\<\!DOCTYPE[\s\S]*?\>/g,isNote:/\<\!\-\-[\s\S]*?\-\-\>/g,isXmlTag:/\<\?[\s\S]*?\?\>/g,filter:function(e){return e=e.trim(),e.replace(tagsTransformer.isNote,"").replace(tagsTransformer.isDoctype,"").replace(tagsTransformer.isXmlTag,"")},noLatin1:function(e){for(var t="",n=0;n<e.length;n++)e[n].charCodeAt(0)<=255&&(t+=e[n]);return t},parse:function(e){if(e&&""!==e){e=tagsTransformer.filter(e);for(var t=[],n=[],r=null,i="",a="",s="",h="",o="",g=!1,p=!1,l=!1,u=!1,c=!1,m=0;m<e.length;m++){var f=e[m];if("\r"!==f&&"\n"!==f){if("<"===f){c=!0,""!==o.trim()&&(r=new textnode(o.trim(),t[t.length-1]),t[t.length-1].children.push(r),o=""),e[m+1]&&"/"===e[m+1]?u=!0:(r=new node,t.push(r),t.length-2>=0&&(t[t.length-2].children.push(r),r.parent=t[t.length-2]),g=!0);continue}if(" "===f){if(c&&(g&&(g=!1,r.tag=i.trim(),i=""),!p&&!l)){p=!0;continue}}else if("="===f)c&&(p=!1);else if("'"===f||'"'===f){if(!l&&c){l=f;continue}l===f&&(l=!1,r.hasProp=!0,r.props[s.trim()]=h.trim(),s="",h="")}else{if(">"===f){c=!1,p=!1,l=!1,g=!1,u&&(u=!1,a="",1===t.length&&n.push(t[0]),t.pop()),r.hasProp||(""===r.tag&&(r.tag=i.trim()),i="");continue}if("/"===f){e[m+1]&&">"===e[m+1]&&(c=!1,l=!1,p=!1,u=!1,g=!1,a="",1===t.length&&n.push(t[0]),r.hasProp||(""===r.tag&&(r.tag=i.trim()),i=""),t.pop());continue}}g&&(i+=f),p&&(s+=f),l&&(h+=f),u&&(a+=f),!c&&(o+=f)}}return console.log(n),n}return[]},convers:function(e){for(var t=tagsTransformer.parse(e),n=$(),r=0;r<t.length;r++)t[r].element(),n.nodes.push(t[r].cache.get(0));return n}};$.svg=function(e){var t=$().create("svg","http://www.w3.org/2000/svg");if($.is.isString(e)){if("chrome"===$.browser.name()){var n=$();return t.html(e).children().each(function(){n.nodes.push(this),n.length+=1}),n}return tagsTransformer.convers(e)}return t},$.fn.svgElement=function(e){return $.is.isString(e)||(e="svg"),$().create(e,"http://www.w3.org/2000/svg")},$.svgToImage=function(e){if(e&&e.isWrapper&&!e.isEmpty()&&"svg"===e.get(0).nodeName.toLowerCase()){var t=e.attr({version:"1.1",xmlns:"http://www.w3.org/2000/svg"}).get(0).outerHTML;return $().element("img").attr("src","data:image/svg+xml;base64,"+btoa(tagsTransformer.noLatin1(t)))}return null},$.saveSvg=function(e){var t=$.svgToImage(e);if(t){var n=$().element("canvas").attr({width:t.get(0).width,height:t.get(0).height}).get(0);n.getContext("2d").drawImage(t.get(0),0,0),$().element("a").attr({href:n.toDataURL("image/png"),download:"aa.png"}).trigger("click")}};var d=function(e){this._mapping=this.parse(e)||[]};$.extend(d.prototype,{parse:function(e){if($.is.isString(e)&&""!==e){for(var t=0,n=[],r={name:"",value:""};;){var i=e[t];if(/[a-zA-Z]/.test(i)){for(var a=[],s=0;s<r.value.length;s++)""!==r.value[s]&&a.push(parseFloat(r.value[s]));r.value=a,r={name:i,value:[""]},n.push(r)}else/[\s,]/.test(i)?r.value.push(""):r.value[r.value.length-1]+=i;if(t++,t>=e.length)break}if(n.length>0){for(var a=[],s=0;s<r.value.length;s++)""!==r.value[s]&&a.push(parseFloat(r.value[s]));r.value=a}return n}return null},stringify:function(){for(var e="",t=this._mapping,n=0;n<t.length;n++){e+=t[n].name+" ";for(var r=0;r<t[n].value.length;r++)e+=t[n].value[r]+" "}return e.trim()},get:function(e,t){for(var n=[],r=0;r<this._mapping.length;r++)this._mapping[r].name===e&&n.push(this._mapping[r]);return $.is.isAvalid(t)?n[t]:n},set:function(e,t,n){if($.is.isNumber(t))for(var r=0;r<this._mapping.length;r++)this._mapping[r].name===e&&t===r&&(this._mapping[r].value=n);else if($.is.isArray(t))for(var r=0;r<this._mapping.length;r++)this._mapping[r].name===e&&(this._mapping[r].value=t);return this},add:function(e,t){return this._mapping.push({name:e,value:$.is.isAvalid(t)?t:[]}),this},remove:function(e,t){if($.is.isString(e))if($.is.isNumber(t))for(var n=0;n<this._mapping.length;n++)this._mapping[n].name===e&&t===n&&this._mapping.splice(n,1);else for(var n=0;n<this._mapping.length;n++)this._mapping[n].name===e&&this._mapping.splice(n,1);else this._mapping.length=0;return this}}),$.d=function(e){return new d(e)};