// 封面纯色
function coverColor() {
    var path = document.getElementById("post-cover")?.src;
    if (path !== undefined) {
        RGBaster.colors(path, {
            paletteSize: 30,
            exclude: ["rgb(255,255,255)", "rgb(0,0,0)", "rgb(254,254,254)"],
            success: function (t) {
                if (t.dominant != 'rgb(66,90,239)') {
                    const c = t.dominant.match(/\d+/g);
                    var value = `rgb(${c[0]},${c[1]},${c[2]})`;
                    if (getContrastYIQ(colorHex(value)) == "light") {
                        value = LightenDarkenColor(colorHex(value), -40)
                    }
                    document.styleSheets[0].addRule(':root', '--heo-main:' + value + '!important');
                    document.styleSheets[0].addRule(':root', '--heo-main-op:' + value + '23!important');
                    document.styleSheets[0].addRule(':root', '--heo-main-op-deep:' + value + 'dd!important');
                    document.styleSheets[0].addRule(':root', '--heo-main-none:' + value + '00!important');
                    document.getElementById("coverdiv").classList.add("loaded");
                }
            }
        });

    } else {
        document.styleSheets[0].addRule(':root', '--heo-main: var(--heo-theme)!important');
        document.styleSheets[0].addRule(':root', '--heo-main-op: var(--heo-theme-op)!important');
        document.styleSheets[0].addRule(':root', '--heo-main-op-deep:var(--heo-theme-op-deep)!important');
        document.styleSheets[0].addRule(':root', '--heo-main-none: var(--heo-theme-none)!important');
    }
}

// RGB颜色转化为16进制颜色
function colorHex(str) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var that = str;
    if (/^(rgb|RGB)/.test(that)) {
        var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        var strHex = "#";
        for (var i = 0; i < aColor.length; i++) {
            var hex = Number(aColor[i]).toString(16);
            if (hex === "0") {
                hex += hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = that;
        }
        return strHex;
    } else if (reg.test(that)) {
        var aNum = that.replace(/#/, "").split("");
        if (aNum.length === 6) {
            return that;
        } else if (aNum.length === 3) {
            var numHex = "#";
            for (var i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    } else {
        return that;
    }
}

// 16进制颜色转化为RGB颜色
function colorRgb(str) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = str.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        // 处理六位的颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return "rgb(" + sColorChange.join(",") + ")";
    } else {
        return sColor;
    }
}

// 变暗变亮主方法
function LightenDarkenColor(col, amt) {
    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;


    return (usePound ? "#" : "") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
}

// 判断是否为亮色
function getContrastYIQ(hexcolor) {
    var colorrgb = colorRgb(hexcolor);
    var colors = colorrgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    var red = colors[1];
    var green = colors[2];
    var blue = colors[3];
    var brightness;
    brightness = (red * 299) + (green * 587) + (blue * 114);
    brightness = brightness / 255000;
    if (brightness >= 0.5) {
        return "light";
    } else {
        return "dark";
    }
}
coverColor()