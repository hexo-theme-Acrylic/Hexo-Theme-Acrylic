console.log("🚀 ~ file: blogex.js:4 ~ GLOBAL_CONFIG.tcolor_mode:", GLOBAL_CONFIG_SITE.tcolor_mode)
if (GLOBAL_CONFIG_SITE.tcolor_mode && GLOBAL_CONFIG_SITE.isPost) {
  switch (GLOBAL_CONFIG_SITE.tcolor_mode){
    case "cloud":
      function coverColor() {
        var path = document.getElementById("post-cover")?.src;
        if (void 0 !== path) {
            var httpRequest = new XMLHttpRequest;
            httpRequest.open("GET", path + "?imageAve", !0),
            httpRequest.send(),
            httpRequest.onreadystatechange = function() {
                if (4 == httpRequest.readyState && 200 == httpRequest.status) {
                    var json = httpRequest.responseText
                      , obj = eval("(" + json + ")")
                      , value = obj.RGB;
                    value = "#" + value.slice(2),
                    "light" == getContrastYIQ(value) && (value = LightenDarkenColor(colorHex(value), -50)),
                    document.styleSheets[0].addRule(":root", "--heo-main:" + value + "!important"),
                    document.styleSheets[0].addRule(":root", "--heo-main-op:" + value + "23!important"),
                    document.styleSheets[0].addRule(":root", "--heo-main-op-deep:" + value + "dd!important"),
                    document.styleSheets[0].addRule(":root", "--heo-main-none:" + value + "00!important"),
                    heo.initThemeColor(),
                    document.getElementById("coverdiv").classList.add("loaded")
                }
            }
        } else
            document.styleSheets[0].addRule(":root", "--heo-main: var(--heo-theme)!important"),
            document.styleSheets[0].addRule(":root", "--heo-main-op: var(--heo-theme-op)!important"),
            document.styleSheets[0].addRule(":root", "--heo-main-op-deep:var(--heo-theme-op-deep)!important"),
            document.styleSheets[0].addRule(":root", "--heo-main-none: var(--heo-theme-none)!important"),
            heo.initThemeColor()
      }
    case "img2color":
      function coverColor(){
        var api = GLOBAL_CONFIG_SITE.tcolor
        var path = document.getElementById("post-cover")?.src;
          if (void 0 !== path && api != 'undefined') {
            var httpRequest = new XMLHttpRequest;
            httpRequest.open("GET", api + "?img=" + path , !0),
            httpRequest.send(),
            httpRequest.onreadystatechange = function() {
              if (4 == httpRequest.readyState && 200 == httpRequest.status) {
                value = httpRequest.responseText,
                "light" == getContrastYIQ(value) && (value = LightenDarkenColor(colorHex(value), -50)),
                document.styleSheets[0].addRule(":root", "--heo-main:" + value + "!important"),
                document.styleSheets[0].addRule(":root", "--heo-main-op:" + value + "23!important"),
                document.styleSheets[0].addRule(":root", "--heo-main-op-deep:" + value + "dd!important"),
                document.styleSheets[0].addRule(":root", "--heo-main-none:" + value + "00!important"),
                heo.initThemeColor(),
                document.getElementById("coverdiv").classList.add("loaded")
              }
            }
          } else
            console.log("theme_color.api或者post-cover无图片")
            document.styleSheets[0].addRule(":root", "--heo-main: var(--heo-theme)!important"),
            document.styleSheets[0].addRule(":root", "--heo-main-op: var(--heo-theme-op)!important"),
            document.styleSheets[0].addRule(":root", "--heo-main-op-deep:var(--heo-theme-op-deep)!important"),
            document.styleSheets[0].addRule(":root", "--heo-main-none: var(--heo-theme-none)!important"),
            heo.initThemeColor()
      }
    case "local":
      function coverColor(){
        value = "#"+GLOBAL_CONFIG_SITE.tcolor,
        "light" == getContrastYIQ(value) && (value = LightenDarkenColor(colorHex(value), -50)),
        document.styleSheets[0].addRule(":root", "--heo-main:" + value + "!important"),
        document.styleSheets[0].addRule(":root", "--heo-main-op:" + value + "23!important"),
        document.styleSheets[0].addRule(":root", "--heo-main-op-deep:" + value + "dd!important"),
        document.styleSheets[0].addRule(":root", "--heo-main-none:" + value + "00!important"),
        heo.initThemeColor(),
        document.getElementById("coverdiv").classList.add("loaded")
      }
    }
  }
else{
  function coverColor(){
    document.styleSheets[0].addRule(":root", "--heo-main: var(--heo-theme)!important"),
    document.styleSheets[0].addRule(":root", "--heo-main-op: var(--heo-theme-op)!important"),
    document.styleSheets[0].addRule(":root", "--heo-main-op-deep:var(--heo-theme-op-deep)!important"),
    document.styleSheets[0].addRule(":root", "--heo-main-none: var(--heo-theme-none)!important"),
    heo.initThemeColor()
  }
}
function colorHex(e) {
    var t = e;
    if (/^(rgb|RGB)/.test(t)) {
        for (var o = t.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(","), n = "#", a = 0; a < o.length; a++) {
            var i = (+o[a]).toString(16);
            "0" === i && (i += i),
            n += i
        }
        return 7 !== n.length && (n = t),
        n
    }
    if (!/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t))
        return t;
    var r = t.replace(/#/, "").split("");
    if (6 === r.length)
        return t;
    if (3 === r.length) {
        var d = "#";
        for (a = 0; a < r.length; a += 1)
            d += r[a] + r[a];
        return d
    }
}
function colorRgb(e) {
    var t = e.toLowerCase();
    if (t && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t)) {
        if (4 === t.length) {
            for (var o = "#", n = 1; n < 4; n += 1)
                o += t.slice(n, n + 1).concat(t.slice(n, n + 1));
            t = o
        }
        var a = [];
        for (n = 1; n < 7; n += 2)
            a.push(parseInt("0x" + t.slice(n, n + 2)));
        return "rgb(" + a.join(",") + ")"
    }
    return t
}
function LightenDarkenColor(e, t) {
    var o = !1;
    "#" == e[0] && (e = e.slice(1),
    o = !0);
    var n = parseInt(e, 16)
      , a = (n >> 16) + t;
    a > 255 ? a = 255 : a < 0 && (a = 0);
    var i = (n >> 8 & 255) + t;
    i > 255 ? i = 255 : i < 0 && (i = 0);
    var r = (255 & n) + t;
    return r > 255 ? r = 255 : r < 0 && (r = 0),
    (o ? "#" : "") + ("000000" + (r | i << 8 | a << 16).toString(16)).slice(-6)
}
function getContrastYIQ(e) {
    var t, o = colorRgb(e).match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return t = 299 * o[1] + 587 * o[2] + 114 * o[3],
    (t /= 255e3) >= .5 ? "light" : "dark"
}