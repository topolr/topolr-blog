/* 
 * @packet demo.todos.service.testservice;
 */
Module({name:"test",extend:"publicservice",option:{what:""},init:function(){this.superClass(),this.data=this.getStorage("todos")||{task:[],totalleft:0,complete:!1,active:!1,all:!0,ischeckall:!1},this.start()},action_get:function(){return this.data},service_checkall:function(){if(this.data.ischeckall)for(var t=0;t<this.data.task.length;t++)this.data.task[t].checked=!1;else for(var t=0;t<this.data.task.length;t++)this.data.task[t].checked=!0;this.update()},service_check:function(t){t.checked?t.checked=!1:t.checked=!0,this.update()},service_remove:function(t){var a=this.data.task.indexOf(t);this.data.task.splice(a,1),this.update()},service_additem:function(t){this.data.task.push(t),this.update()},service_toggleall:function(){this.data.all=!0,this.data.complete=!1,this.data.active=!1,this.update()},service_toggleactive:function(){this.data.active=!0,this.data.complete=!1,this.data.all=!1,this.update()},service_togglecomplete:function(){this.data.active=!1,this.data.complete=!0,this.data.all=!1,this.update()},service_toggleclear:function(){for(var t=[],a=0;a<this.data.task.length;a++)this.data.task[a].checked||t.push(this.data.task[a]);this.data.task=t,this.update()},update:function(){for(var t=0,a=0;a<this.data.task.length;a++)this.data.task[a].checked===!1&&(t+=1);0!==t&&(this.data.ischeckall=!1),this.data.totalleft=t,this.setStorage("todos",this.data),this.trigger()}});