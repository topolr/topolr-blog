/* 
 * @packet demo.performance.base;
 * @template demo.performance.template.temp;
 * @css demo.performance.style.style;
 * @js demo.performance.react;
 */
Module({
    name: "performance",
    extend: "view",
    className: "performance",
    template: module.getTemplate("@temp", "performance"),
    autodom: true,
    init: function () {
        this._data = {
            selected: 0,
            list: this.getData()
        };
        var t = new Date().getTime();
        this.render(this._data);
        this.finders("title").html("Init Time: " + ((new Date().getTime()) - t) + " ms");
    },
    bind_row: function (dom) {
        this._data.selected = this._data.list.indexOf(dom.cache());
        var t = new Date().getTime();
        this.update();
        this.finders("title").html("Update Time: " + ((new Date().getTime()) - t) + " ms");
    },
    bind_refresh: function () {
        this._data = {
            selected: 0,
            list: this.getData()
        };
        var t = new Date().getTime();
        this.render(this._data);
        this.finders("title").html("Init Time: " + ((new Date().getTime()) - t) + " ms");
    },
    getData: function (count) {
        function _random(max) {
            return Math.round(Math.random() * 1000) % max;
        }
        count = count || 2000;
        var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        var data = [];
        for (var i = 0; i < count; i++)
            data.push({id: i + 1, label: adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)]});
        return data;
    }
});
Module({
    name: "react",
    extend: "view",
    className: "performance",
    template: module.getTemplate("@temp", "react"),
    autodom: true,
    init: function () {
        this.render();
        var clzz = React.createClass({
            select: function (data) {
                this.props.selected = data.id;
                this.setState(this.props);
            },
            render: function () {
                var items = [];
                for (var i = 0; i < this.props.data.length; i++) {
                    items.push(React.createElement("div", {className: "trow"},
                            React.createElement("div", {className: "col-md-12 test-data"},
                                    React.createElement("span", {className: this.props.selected === this.props.data[i].id ? "selected" : "", onClick: this.select.bind(null, this.props.data[i])}, this.props.data[i].label)
                                    )
                            ));
                }
                return React.createElement("div", null, items);
            }
        });
        var ths = this;
        setInterval(function () {
            React.render(new clzz({data: ths.getData(), selected: null}), ths.finders("con").get(0));
        }, 100);
    },
    getData: function (count) {
        function _random(max) {
            return Math.round(Math.random() * 1000) % max;
        }
        count = count || 2000;
        var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        var data = [];
        for (var i = 0; i < count; i++)
            data.push({id: i + 1, label: adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)]});
        return data;
    }
});

Option({
    name: "test",
    option: {
        override_onendinit: function () {
            this.addChild({
                type: "@.performance",
                option: {
                    override_onendinit: function () {
                        setInterval(function () {
                            this.update({
                                selected: 0,
                                list: this.getData()
                            });
                        }.bind(this), 100);
                    }
                }
            });
        }
    }
});

Option({
    name: "test2",
    option: {
        override_onendinit: function () {
            this.addChild({
                type: "@.react"
            });
        }
    }
});