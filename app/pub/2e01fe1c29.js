window.topolr.source({"packet":[{"p":"option.demo","h":"79f7067829","c":"/**\n * @packet option.demo;\n * @require demo.todos.todos2;\n */\nOption({name:\"todos\",option:{modules:[{type:\"@todos2.todos2\"}]}});"},{"p":"demo.todos.todos2","h":"9306530571","c":"/*\n * @packet demo.todos.todos2;\n * @template demo.todos.template.temp;\n * @css demo.todos.style.todostyle; \n * @css demo.todos.style.font;\n * @require demo.todos.service.testservice;\n */\nModule({name:\"todos\",extend:\"view\",autodom:!0,className:\"todos\",template:\"@temp.todos\",services:{test:\"@testservice.test\"},option:{service_test:{what:\"this is what\",yourname:\"hy\"}},init:function(){this.render(this.getService(\"test\").action(\"get\"))},bind_checkall:function(){this.getService(\"test\").trigger(\"checkall\")},bind_check:function(e,t){this.getService(\"test\").trigger(\"check\",e.group().cache()),t.stopPropagation()},bind_remove:function(e){this.getService(\"test\").trigger(\"remove\",e.group().cache())},bind_input:function(e,t){if(13===t.keyCode){var i=e.val();i&&(this.getService(\"test\").trigger(\"additem\",{checked:!1,desc:i,id:(new Date).getTime()}),e.val(\"\"))}},bind_all:function(){this.getService(\"test\").trigger(\"toggleall\")},bind_active:function(){this.getService(\"test\").trigger(\"toggleactive\")},bind_complete:function(){this.getService(\"test\").trigger(\"togglecomplete\")},bind_clear:function(){this.getService(\"test\").trigger(\"toggleclear\")}}),Module({name:\"todos2\",extend:\"@.todos\",template:\"@temp.todos2\"});"},{"p":"demo.todos.service.testservice","h":"10fe8dba52","c":"/* \n * @packet demo.todos.service.testservice;\n */\nModule({name:\"test\",extend:\"publicservice\",option:{what:\"\"},init:function(){this.superClass(),this.data=this.getStorage(\"todos\")||{task:[],totalleft:0,complete:!1,active:!1,all:!0,ischeckall:!1},this.start()},action_get:function(){return this.data},service_checkall:function(){if(this.data.ischeckall)for(var t=0;t<this.data.task.length;t++)this.data.task[t].checked=!1;else for(var t=0;t<this.data.task.length;t++)this.data.task[t].checked=!0;this.update()},service_check:function(t){t.checked?t.checked=!1:t.checked=!0,this.update()},service_remove:function(t){var a=this.data.task.indexOf(t);this.data.task.splice(a,1),this.update()},service_additem:function(t){this.data.task.push(t),this.update()},service_toggleall:function(){this.data.all=!0,this.data.complete=!1,this.data.active=!1,this.update()},service_toggleactive:function(){this.data.active=!0,this.data.complete=!1,this.data.all=!1,this.update()},service_togglecomplete:function(){this.data.active=!1,this.data.complete=!0,this.data.all=!1,this.update()},service_toggleclear:function(){for(var t=[],a=0;a<this.data.task.length;a++)this.data.task[a].checked||t.push(this.data.task[a]);this.data.task=t,this.update()},update:function(){for(var t=0,a=0;a<this.data.task.length;a++)this.data.task[a].checked===!1&&(t+=1);0!==t&&(this.data.ischeckall=!1),this.data.totalleft=t,this.setStorage(\"todos\",this.data),this.trigger()}});"}],"template":[{"p":"demo.todos.template.temp","h":"7fc6d29dc0","c":"<!--[todos]--><div class=\"todos-input\"><div class=\"todos-input-checkall\" data-bind=\"click:checkall\"><%if(data.ischeckall){%><i class=\"fa fa-checkbox-checked\"></i><%}else{%><i class=\"fa fa-checkbox-unchecked\"></i><%}%></div><div class=\"todos-input-input\"><input type=\"text\" placeholder=\"what needs to be done?\" data-bind='keyup:input'/></div></div><div class=\"todos-list\"><%var has=false;%><%for(var i in data.task){%><%            var render=false;            if(data.all||data.task[i].checked&&data.active===false||data.task[i].checked===false&&data.complete===false){                render=true;            }            if(data.task[i].checked===true){                has=true;            }        %><%if(render){%><div unique=\"<%=data.task[i].id||(new Date().getTime());%>\" class=\"todos-list-item<%=(data.task[i].checked?' checked':'');%>\" data-group='item' @cache(data.task[i]) data-bind=\"click:ppt\"><div class=\"todos-list-item-check\" data-groupi='check' data-bind=\"click:check\"><%if(data.task[i].checked){%><i class=\"fa fa-checkbox-checked\"></i><%}else{%><i class=\"fa fa-checkbox-unchecked\"></i><%}%></div><div class=\"todos-list-item-desc<%=(data.task[i].checked?' underline':'');%>\"><%=data.task[i].desc;%></div><div class=\"todos-list-item-remove\" data-groupi='remove' data-bind=\"click:remove\"><i class=\"fa fa-cross\"></i></div></div><%}%><%}%></div><div class=\"todos-tools\"><div class=\"todos-tools-a\"><%=data.totalleft;%> items left</div><div class=\"todos-tools-b\"><div class=\"todos-tools-b-btn<%=(data.all?' active':'');%>\" data-bind='click:all'>All</div><div class=\"todos-tools-b-btn<%=(data.active?' active':'');%>\" data-bind='click:active'>Active</div><div class=\"todos-tools-b-btn<%=(data.complete?' active':'');%>\" data-bind='click:complete'>Completed</div></div><%if(has){%><div class=\"todos-tootls-c\" data-bind='click:clear'>Clear Completed</div><%}%></div><div class=\"todos-shadow-a\"></div><div class=\"todos-shadow-b\"></div><!--[todos2]--><div class=\"todos-input\"><div class=\"todos-input-checkall\" data-bind=\"click:checkall\"><%if(data.ischeckall){%><i class=\"fa fa-checkbox-checked\"></i><%}else{%><i class=\"fa fa-checkbox-unchecked\"></i><%}%></div><div class=\"todos-input-input\"><input type=\"text\" placeholder=\"what needs to be done?\" data-bind='keyup:input'/></div></div><div class=\"todos-list\"><%var has=false;%><%for(var i in data.task){%><%            var render=false;            if(data.all||data.task[i].checked&&data.active===false||data.task[i].checked===false&&data.complete===false){                render=true;            }            if(data.task[i].checked===true){                has=true;            }        %><%if(render){%><div class=\"todos-list-item<%=(data.task[i].checked?' checked':'');%>\" data-group='item' @cache(data.task[i]) data-bind=\"click:ppt\"><div class=\"todos-list-item-check\" data-groupi='check' data-bind=\"click:check\"><%if(data.task[i].checked){%><i class=\"fa fa-checkbox-checked\"></i><%}else{%><i class=\"fa fa-checkbox-unchecked\"></i><%}%></div><div class=\"todos-list-item-desc<%=(data.task[i].checked?' underline':'');%>\"><%=data.task[i].desc;%></div><div class=\"todos-list-item-remove\" data-groupi='remove' data-bind=\"click:remove\"><i class=\"fa fa-cross\"></i></div></div><%}%><%}%></div><div class=\"todos-tools\"><div class=\"todos-tools-a\"><%=data.totalleft;%> items left</div><div class=\"todos-tools-b\"><div class=\"todos-tools-b-btn<%=(data.all?' active':'');%>\" data-bind='click:all'>All</div><div class=\"todos-tools-b-btn<%=(data.active?' active':'');%>\" data-bind='click:active'>Active</div><div class=\"todos-tools-b-btn<%=(data.complete?' active':'');%>\" data-bind='click:complete'>Completed</div></div><%if(has){%><div class=\"todos-tootls-c\" data-bind='click:clear'>Clear Completed</div><%}%></div><div class=\"todos-shadow-a\"></div><div class=\"todos-shadow-b\"></div>"}],"css":[{"p":"demo.todos.style.todostyle","h":"ddfa7cfdf3","c":"html,body,div,span,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,abbr,address,cite,code,del,dfn,em,img,ins,kbd,q,samp,small,strong,sub,sup,var,b,i,dl,dt,dd,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,figcaption,figure,footer,header,hgroup,menu,nav,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;outline:0;font-size:100%;vertical-align:baseline;background:transparent}html,body{margin:0;padding:0;background:#f3f7fa;font-size:14px;font-family:Microsoft Yahei In-Bold,Microsoft Yahei,Apple LiGothic Medium;color:#222;width:100%;height:100%}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}a{margin:0;padding:0;font-size:100%;vertical-align:baseline;background:transparent}ins{background-color:#ff9;color:#000;text-decoration:none}mark{background-color:#ff9;color:#000;font-style:italic;font-weight:bold}del{text-decoration:line-through}abbr[title],dfn[title]{border-bottom:1px dotted;cursor:help}table{border-collapse:collapse;border-spacing:0}hr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}label{position:relative;z-index:2;display:inline-block}.fix{zoom:1}.fix:before,.fix:after{content:\"\";display:table;clear:both}.fleft{float:left}.fright{float:right}.text-left{text-align:left}.text-right{text-align:right}.text-center{text-align:center}h1,.title_1{font-size:38.5px;line-height:40px;font-weight:normal}h2,.title_2{font-size:31.5px;line-height:40px;font-weight:normal}h3,.title_3{font-size:21px;line-height:40px;font-weight:normal}h4,.title_4{font-size:17px;line-height:40px;font-weight:normal}h5,.title_5{font-size:14px;line-height:40px;font-weight:bold}h6,.title_6{font-size:11.9px;line-height:40px;font-weight:bold}p{margin:10px 0 10px 0;line-height:1.5;font-size:13px}.fix{zoom:1}.fix:before,.fix:after{content:\"\";display:table;clear:both}.todos{position:absolute;left:0;top:0;right:0;bottom:0;-ms-box-shadow:0 5px 20px #bbb3b3;box-shadow:0 5px 20px #bbb3b3;margin:10px;border:1px solid #d7d7d7}.todos .todos-input{line-height:45px;background:white;display:-moz-flex;display:-webkit-box;display:flex}.todos .todos-input .todos-input-checkall{width:45px;text-align:center}.todos .todos-input .todos-input-input{-webkit-flex:1;-moz-flex:1;-ms-flexbox:1;-webkit-box-flex:1;flex:1}.todos .todos-input input{height:45px;width:100%;-ms-box-sizing:border-box;box-sizing:border-box;border:0;padding:0 10px 0 10px;outline:0}.todos .todos-list{position:absolute;left:0;top:45px;right:0;bottom:40px;border-top:1px solid #d7d7d7;overflow:auto}.todos .todos-list .todos-list-item{line-height:35px;border-bottom:1px solid #d7d7d7;display:-moz-flex;display:-webkit-box;display:flex;background:white}.todos .todos-list .todos-list-item .todos-list-item-check{width:45px;text-align:center}.todos .todos-list .todos-list-item .todos-list-item-desc{-webkit-flex:1;-moz-flex:1;-ms-flexbox:1;-webkit-box-flex:1;flex:1}.todos .todos-list .todos-list-item .todos-list-item-desc.underline{text-decoration:line-through;color:#c5bebe}.todos .todos-list .todos-list-item .todos-list-item-remove{width:30px;text-align:center;display:none}.todos .todos-list .todos-list-item.checked{background:#f5f7f7}.todos .todos-list .todos-list-item:hover .todos-list-item-remove{display:block}.todos .todos-tools{padding:5px 10px 5px 10px;line-height:30px;background:white;border-top:1px solid #d7d7d7;display:-moz-flex;display:-webkit-box;display:flex;position:absolute;left:0;top:auto;right:0;bottom:0}.todos .todos-tools .todos-tools-b{-webkit-flex:1;-moz-flex:1;-ms-flexbox:1;-webkit-box-flex:1;flex:1;text-align:center}.todos .todos-tools .todos-tools-b .todos-tools-b-btn{padding:0 10px 0 10px;display:inline-block;vertical-align:top;margin:0 5px 0 5px}.todos .todos-tools .todos-tools-b .todos-tools-b-btn.active{border-radius:5px;border:1px solid #d7d7d7;background:white}.todos .todos-shadow-a{position:absolute;left:10px;top:100%;right:10px;bottom:auto;-ms-box-shadow:0 5px 8px #bbb3b3;box-shadow:0 5px 8px #bbb3b3;height:7px;background:white;border:1px solid #d7d7d7}.todos .todos-shadow-b{position:absolute;left:20px;top:100%;right:20px;bottom:auto;-ms-box-shadow:0 5px 8px #bbb3b3;box-shadow:0 5px 8px #bbb3b3;height:5px;background:white;margin-top:8px;border:1px solid #d7d7d7}"},{"p":"demo.todos.style.font","h":"52178c8790","c":"@font-face{font-family:'topolr';src:url(\"fonts/4720734528.eot?vnzasm\");src:url(\"fonts/4720734528.eot?vnzasm#iefix\") format('embedded-opentype'),url(\"fonts/d7568fd512.ttf?vnzasm\") format('truetype'),url(\"fonts/f1128a4c89.woff?vnzasm\") format('woff'),url(\"fonts/1e8a04b5c1.svg?vnzasm#topolr\") format('svg');font-weight:normal;font-style:normal}.fa{font-family:'topolr' !important;speak:none;font-style:normal;font-weight:normal;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fa-home3:before{content:\"\\e900\"}.fa-home2:before{content:\"\\e901\"}.fa-pencil:before{content:\"\\e902\"}.fa-image2:before{content:\"\\e903\"}.fa-images:before{content:\"\\e904\"}.fa-camera:before{content:\"\\e913\"}.fa-headphones:before{content:\"\\e905\"}.fa-music:before{content:\"\\e961\"}.fa-play:before{content:\"\\e962\"}.fa-video-camera:before{content:\"\\e906\"}.fa-mic:before{content:\"\\e963\"}.fa-book:before{content:\"\\e907\"}.fa-books:before{content:\"\\e908\"}.fa-file-text:before{content:\"\\e909\"}.fa-profile:before{content:\"\\e90a\"}.fa-file-text2:before{content:\"\\e90b\"}.fa-file-picture:before{content:\"\\e90c\"}.fa-folder:before{content:\"\\e90d\"}.fa-folder-open:before{content:\"\\e90e\"}.fa-price-tag:before{content:\"\\e90f\"}.fa-price-tags:before{content:\"\\e910\"}.fa-cart:before{content:\"\\e964\"}.fa-coin-dollar:before{content:\"\\e911\"}.fa-compass:before{content:\"\\e912\"}.fa-clock:before{content:\"\\e965\"}.fa-clock2:before{content:\"\\e966\"}.fa-alarm:before{content:\"\\e967\"}.fa-display:before{content:\"\\e968\"}.fa-laptop:before{content:\"\\e969\"}.fa-mobile:before{content:\"\\e96a\"}.fa-mobile2:before{content:\"\\e96b\"}.fa-tablet:before{content:\"\\e96c\"}.fa-tv:before{content:\"\\e96d\"}.fa-download:before{content:\"\\e96e\"}.fa-upload:before{content:\"\\e96f\"}.fa-floppy-disk:before{content:\"\\e970\"}.fa-drive:before{content:\"\\e971\"}.fa-database:before{content:\"\\e972\"}.fa-undo:before{content:\"\\e973\"}.fa-redo:before{content:\"\\e974\"}.fa-bubble:before{content:\"\\e975\"}.fa-bubbles:before{content:\"\\e914\"}.fa-user:before{content:\"\\e976\"}.fa-quotes-right:before{content:\"\\e977\"}.fa-hour-glass:before{content:\"\\e978\"}.fa-spinner:before{content:\"\\e915\"}.fa-spinner2:before{content:\"\\e916\"}.fa-spinner3:before{content:\"\\e917\"}.fa-spinner6:before{content:\"\\e918\"}.fa-spinner7:before{content:\"\\e919\"}.fa-spinner9:before{content:\"\\e91a\"}.fa-spinner10:before{content:\"\\e91b\"}.fa-spinner11:before{content:\"\\e979\"}.fa-binoculars:before{content:\"\\e91c\"}.fa-search:before{content:\"\\e91d\"}.fa-zoom-in:before{content:\"\\e91e\"}.fa-zoom-out:before{content:\"\\e91f\"}.fa-enlarge2:before{content:\"\\e97a\"}.fa-shrink2:before{content:\"\\e97b\"}.fa-key2:before{content:\"\\e97c\"}.fa-lock:before{content:\"\\e920\"}.fa-unlocked:before{content:\"\\e921\"}.fa-wrench:before{content:\"\\e922\"}.fa-equalizer:before{content:\"\\e97d\"}.fa-equalizer2:before{content:\"\\e97e\"}.fa-cog2:before{content:\"\\e923\"}.fa-cogs:before{content:\"\\e924\"}.fa-stats-dots:before{content:\"\\e925\"}.fa-stats-bars2:before{content:\"\\e926\"}.fa-trophy:before{content:\"\\e927\"}.fa-spoon-knife:before{content:\"\\e928\"}.fa-rocket:before{content:\"\\e929\"}.fa-meter:before{content:\"\\e92a\"}.fa-fire:before{content:\"\\e97f\"}.fa-bin:before{content:\"\\e92b\"}.fa-briefcase:before{content:\"\\e980\"}.fa-airplane:before{content:\"\\e981\"}.fa-truck:before{content:\"\\e982\"}.fa-accessibility:before{content:\"\\e983\"}.fa-target:before{content:\"\\e92c\"}.fa-shield:before{content:\"\\e92d\"}.fa-power:before{content:\"\\e92e\"}.fa-switch:before{content:\"\\e92f\"}.fa-power-cord:before{content:\"\\e984\"}.fa-clipboard:before{content:\"\\e930\"}.fa-cloud:before{content:\"\\e985\"}.fa-cloud-download:before{content:\"\\e986\"}.fa-cloud-upload:before{content:\"\\e987\"}.fa-cloud-check:before{content:\"\\e988\"}.fa-download2:before{content:\"\\e989\"}.fa-upload2:before{content:\"\\e98a\"}.fa-download3:before{content:\"\\e98b\"}.fa-upload3:before{content:\"\\e98c\"}.fa-earth:before{content:\"\\e931\"}.fa-link2:before{content:\"\\e932\"}.fa-flag3:before{content:\"\\e933\"}.fa-attachment:before{content:\"\\e934\"}.fa-eye2:before{content:\"\\e935\"}.fa-bookmark:before{content:\"\\e936\"}.fa-bookmarks:before{content:\"\\e937\"}.fa-star-full:before{content:\"\\e938\"}.fa-heart2:before{content:\"\\e939\"}.fa-man:before{content:\"\\e98d\"}.fa-man-woman:before{content:\"\\e98e\"}.fa-wink:before{content:\"\\e93a\"}.fa-wink2:before{content:\"\\e93b\"}.fa-grin:before{content:\"\\e93c\"}.fa-grin2:before{content:\"\\e93d\"}.fa-cool:before{content:\"\\e93e\"}.fa-cool2:before{content:\"\\e93f\"}.fa-evil:before{content:\"\\e940\"}.fa-evil2:before{content:\"\\e941\"}.fa-plus2:before{content:\"\\e942\"}.fa-minus2:before{content:\"\\e943\"}.fa-blocked:before{content:\"\\e944\"}.fa-cross:before{content:\"\\e98f\"}.fa-checkmark:before{content:\"\\e990\"}.fa-exit:before{content:\"\\e945\"}.fa-volume-high:before{content:\"\\e946\"}.fa-volume-medium:before{content:\"\\e947\"}.fa-volume-low:before{content:\"\\e948\"}.fa-volume-mute:before{content:\"\\e949\"}.fa-volume-mute2:before{content:\"\\e94a\"}.fa-volume-increase:before{content:\"\\e94b\"}.fa-volume-decrease:before{content:\"\\e94c\"}.fa-loop2:before{content:\"\\e94d\"}.fa-infinite:before{content:\"\\e991\"}.fa-arrow-up2:before{content:\"\\e992\"}.fa-arrow-right2:before{content:\"\\e993\"}.fa-arrow-down2:before{content:\"\\e994\"}.fa-arrow-left2:before{content:\"\\e995\"}.fa-circle-up:before{content:\"\\e94e\"}.fa-circle-right:before{content:\"\\e94f\"}.fa-circle-down:before{content:\"\\e950\"}.fa-circle-left:before{content:\"\\e951\"}.fa-checkbox-checked:before{content:\"\\e952\"}.fa-checkbox-unchecked:before{content:\"\\e953\"}.fa-radio-checked:before{content:\"\\e954\"}.fa-radio-checked2:before{content:\"\\e955\"}.fa-radio-unchecked:before{content:\"\\e956\"}.fa-scissors:before{content:\"\\e957\"}.fa-table:before{content:\"\\e996\"}.fa-table2:before{content:\"\\e997\"}.fa-embed:before{content:\"\\e958\"}.fa-embed2:before{content:\"\\e959\"}.fa-terminal:before{content:\"\\e95a\"}.fa-share2:before{content:\"\\e998\"}.fa-mail2:before{content:\"\\e95b\"}.fa-google3:before{content:\"\\e999\"}.fa-google-plus3:before{content:\"\\e99a\"}.fa-facebook:before{content:\"\\e99b\"}.fa-facebook2:before{content:\"\\e99c\"}.fa-telegram:before{content:\"\\e99d\"}.fa-twitter:before{content:\"\\e99e\"}.fa-sina-weibo:before{content:\"\\e99f\"}.fa-youtube2:before{content:\"\\e9a0\"}.fa-flickr:before{content:\"\\e95c\"}.fa-flickr2:before{content:\"\\e95d\"}.fa-github:before{content:\"\\e9a1\"}.fa-npm:before{content:\"\\e9a2\"}.fa-tumblr:before{content:\"\\e9a3\"}.fa-appleinc:before{content:\"\\e9a4\"}.fa-android2:before{content:\"\\e95e\"}.fa-windows8:before{content:\"\\e9a5\"}.fa-reddit:before{content:\"\\e9a6\"}.fa-wikipedia:before{content:\"\\e9a7\"}.fa-linkedin:before{content:\"\\e9a8\"}.fa-stackoverflow:before{content:\"\\e9a9\"}.fa-pinterest:before{content:\"\\e9aa\"}.fa-paypal:before{content:\"\\e9ab\"}.fa-chrome:before{content:\"\\e9ac\"}.fa-firefox:before{content:\"\\e9ad\"}.fa-IE:before{content:\"\\e9ae\"}.fa-edge:before{content:\"\\e9af\"}.fa-safari:before{content:\"\\e9b0\"}.fa-opera:before{content:\"\\e9b1\"}.fa-html-five:before{content:\"\\e95f\"}.fa-css3:before{content:\"\\e960\"}.fa-codepen:before{content:\"\\e9b2\"}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}"}]});