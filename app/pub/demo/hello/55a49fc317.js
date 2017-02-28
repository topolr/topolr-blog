/* 
 * @packet demo.hello.base;
 * @template demo.hello.template.temp;
 * @css demo.hello.style.hello;
 */
Module({name:"hello",extend:"view",template:module.getTemplate("@temp","hello"),className:"hello",autodom:!0,init:function(){var e="Hello World.",t=0;this.render(),setInterval(function(){t++,this.update(e.substring(0,t)+"_"),t===e.length&&(t=0)}.bind(this),500)}});