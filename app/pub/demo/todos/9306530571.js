/*
 * @packet demo.todos.todos2;
 * @template demo.todos.template.temp;
 * @css demo.todos.style.todostyle; 
 * @css demo.todos.style.font;
 * @require demo.todos.service.testservice;
 */
Module({name:"todos",extend:"view",autodom:!0,className:"todos",template:"@temp.todos",services:{test:"@testservice.test"},option:{service_test:{what:"this is what",yourname:"hy"}},init:function(){this.render(this.getService("test").action("get"))},bind_checkall:function(){this.getService("test").trigger("checkall")},bind_check:function(e,t){this.getService("test").trigger("check",e.group().cache()),t.stopPropagation()},bind_remove:function(e){this.getService("test").trigger("remove",e.group().cache())},bind_input:function(e,t){if(13===t.keyCode){var i=e.val();i&&(this.getService("test").trigger("additem",{checked:!1,desc:i,id:(new Date).getTime()}),e.val(""))}},bind_all:function(){this.getService("test").trigger("toggleall")},bind_active:function(){this.getService("test").trigger("toggleactive")},bind_complete:function(){this.getService("test").trigger("togglecomplete")},bind_clear:function(){this.getService("test").trigger("toggleclear")}}),Module({name:"todos2",extend:"@.todos",template:"@temp.todos2"});