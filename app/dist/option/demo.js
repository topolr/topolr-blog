/**
 * @packet option.demo;
 * @require demo.todos.todos2;
 */
Option({
    name: "todos",
    option: {
        modules: [
            {type: "@todos2.todos2"}
        ]
    }
});
