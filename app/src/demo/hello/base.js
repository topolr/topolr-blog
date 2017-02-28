/* 
 * @packet demo.hello.base;
 * @template demo.hello.template.temp;
 * @css demo.hello.style.hello;
 */
Module({
    name: "hello",
    extend: "view",
    template: module.getTemplate("@temp", "hello"),
    className: "hello",
    autodom: true,
    init: function () {
        var t = "Hello World.", n = 0;
        this.render();
        setInterval(function () {
            n++;
            this.update(t.substring(0, n)+"_");
            if (n === t.length) {
                n = 0;
            }
        }.bind(this), 500);
    }
});

