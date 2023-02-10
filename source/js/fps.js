let Jay_showFPS = !1;
"true" === localStorage.getItem("showFPS") ?
    ((Jay_showFPS = !0),
        document.querySelector("#fps-group").classList.add("show"),
        document.querySelector("#consoleFPS").classList.add("on")) :
    ((Jay_showFPS = !1),
        document.querySelector("#fps-group").classList.remove("show"),
        document.querySelector("#consoleFPS").classList.remove("on"));
var showFPS = (function() {
    let e,
        t,
        o,
        n,
        a,
        i =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(e) {
            window.setTimeout(e, 1e3 / 60);
        };
    (e = 0),
    (t = Date.now()),
    (n = function() {
        (o = Date.now() - t),
        (e += 1),
        o >= 1e3 && ((t += o), a(e), (e = 0)),
            i(n);
    }),
    (a = function(e) {
        $("#fps").html(e);
    }),
    n();
})();
var manxin = {
    FPSToggle: function() {
        Jay_showFPS
            ?
            ((Jay_showFPS = !1),
                document.querySelector("#fps-group").classList.remove("show"),
                document.querySelector("#consoleFPS").classList.remove("on"),
                localStorage.setItem("showFPS", "false")) :
            ((Jay_showFPS = !0),
                document.querySelector("#fps-group").classList.add("show"),
                document.querySelector("#consoleFPS").classList.add("on"),
                localStorage.setItem("showFPS", "true"));
    },
};