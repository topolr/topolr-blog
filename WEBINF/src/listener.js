/**
 * @packet listener;
 */
Module({
    name: 'base',
    extend: "listener",
    sessionCreated:function (session) {
        console.log("sessionCreated:"+session.getId());
    },
    sessionDestroyed:function (session) {
        console.log("sessionDestroyed:"+session.getId());
    }
});