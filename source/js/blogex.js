function checkOpen() {}
function navTitle() {
    var e = document.title.split("|")[0].replace(" ","");
    document.getElementById("page-name-text").innerHTML = e
}
function showcopy() {
    if (void 0 !== GLOBAL_CONFIG.Snackbar)
        acy.snackbarShow(GLOBAL_CONFIG.copy.success);
    else {
        const e = ctx.previousElementSibling;
        e.innerText = GLOBAL_CONFIG.copy.success,
        e.style.opacity = 1,
        setTimeout((()=>{
            e.style.opacity = 0
        }
        ), 700)
    }
}
checkOpen.toString = function() {
    this.opened = !0
}
,
window.onload = function() {
    for (var e = document.getElementsByClassName("copybtn"), t = 0; t < e.length; t++)
        document.getElementsByClassName("copybtn")[t].addEventListener("click", (function() {
            showcopy()
        }
        ));
    heo.initThemeColor()
}
;
var getTimeState = ()=>{
    var e = (new Date).getHours()
      , t = "";
    return e >= 0 && e <= 5 ? t = "晚安" : e > 5 && e <= 10 ? t = "早上好" : e > 10 && e <= 14 ? t = "中午好" : e > 14 && e <= 18 ? t = "下午好" : e > 18 && e <= 24 && (t = "晚上好"),
    t
}
;
function fly_to_top() {
    document.getElementById("guli_top").classList.add("open_wing"),
    setTimeout((function() {
        document.getElementById("guli_top").classList.add("flying"),
        acy.scrollToDest(0, 300)
    }
    ), 300),
    setTimeout((function() {
        document.getElementById("guli_top").classList.remove("flying"),
        document.getElementById("guli_top").classList.remove("open_wing"),
        document.getElementById("guli_top").style.cssText = "opacity: ''; transform: ''"
    }
    ), 600)
}
var navFn = {
    switchDarkMode: ()=>{
        "light" === ("dark" === document.documentElement.getAttribute("data-theme") ? "dark" : "light") ? (activateDarkMode(),
        saveToLocal.set("theme", "dark", 2),
        void 0 !== GLOBAL_CONFIG.Snackbar && acy.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night, !1, 2e3)) : (activateLightMode(),
        saveToLocal.set("theme", "light", 2),
        void 0 !== GLOBAL_CONFIG.Snackbar && acy.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day, !1, 2e3)),
        "function" == typeof utterancesTheme && utterancesTheme(),
        "object" == typeof FB && window.loadFBComment(),
        window.DISQUS && document.getElementById("disqus_thread").children.length && setTimeout((()=>window.disqusReset()), 200);
        let e = "light" === document.documentElement.getAttribute("data-theme") ? "#363636" : "#F7F7FA";
        if (document.getElementById("posts-chart")) {
            let t = postsOption;
            t.textStyle.color = e,
            t.title.textStyle.color = e,
            t.xAxis.axisLine.lineStyle.color = e,
            t.yAxis.axisLine.lineStyle.color = e,
            postsChart.setOption(t)
        }
        if (document.getElementById("tags-chart")) {
            let t = tagsOption;
            t.textStyle.color = e,
            t.title.textStyle.color = e,
            t.xAxis.axisLine.lineStyle.color = e,
            t.yAxis.axisLine.lineStyle.color = e,
            tagsChart.setOption(t)
        }
        if (document.getElementById("categories-chart")) {
            let t = categoriesOption;
            t.textStyle.color = e,
            t.title.textStyle.color = e,
            t.legend.textStyle.color = e,
            categoriesChart.setOption(t)
        }
    }
};
function RemoveRewardMask() {
    $(".reward-main").attr("style", "display: none"),
    $("#quit-box").attr("style", "display: none")
}
function AddRewardMask() {
    $(".reward-main").attr("style", "display: flex"),
    $("#quit-box").attr("style", "display: flex")
}
function travelling() {
  if (GLOBAL_CONFIG.api.fcircle_random != 'undefined'){
    fetch(GLOBAL_CONFIG.api.fcircle_random).then((e=>e.json())).then((e=>{
        var t = e.link
          , o = "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + e.name + "」";
        document.styleSheets[0].addRule(":root", "--heo-snackbar-time:8000ms!important"),
        Snackbar.show({
            text: o,
            duration: 8e3,
            pos: "top-center",
            actionText: "前往",
            onActionClick: function(e) {
                $(e).css("opacity", 0),
                window.open(t, "_blank")
            }
        })
      }
      ))
    }
  else{
    acy.snackbarShow("博客没有配置友圈哦");
  }
}
function toTianliGPTblog() {
    Snackbar.show({
        text: "点击前往按钮进入「TianliGPT」项目中的成员博客，不保证跳转网站的安全性和可用性",
        duration: 8e3,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function(e) {
            $(e).css("opacity", 0),
            window.open("https://summary.zhheo.com/static/matrix.html", "_blank")
        }
    })
}
function totraveling() {
    acy.snackbarShow("即将跳转到「开往」项目的成员博客，不保证跳转网站的安全性和可用性", !1, 5e3),
    setTimeout((function() {
        window.open("https://www.travellings.cn/go.html")
    }
    ), "5000")
}
function removeLoading() {
    setTimeout((function() {
        preloader.endLoading()
    }
    ), 3e3)
}
function addFriendLink() {
    var e = document.getElementsByClassName("el-textarea__inner")[0];
    let t = document.createEvent("HTMLEvents");
    t.initEvent("input", !0, !0),
    e.value = "昵称（请勿包含博客等字样）：\n网站地址（要求博客地址，请勿提交个人主页）：\n头像图片url（请提供尽可能清晰的图片，我会上传到我自己的图床）：\n描述：\n",
    e.dispatchEvent(t),
    heo.scrollTo("友情链接申请"),
    e.focus(),
    e.setSelectionRange(-1, -1)
}
function getArrayItems(e, t) {
    var o = [];
    for (var n in e)
        o.push(e[n]);
    for (var a = [], i = 0; i < t && o.length > 0; i++) {
        var r = Math.floor(Math.random() * o.length);
        a[i] = o[r],
        o.splice(r, 1)
    }
    return a
}
function owoBig() {
    document.getElementById("post-comment").addEventListener("DOMNodeInserted", (e=>{
        if (e.target.classList && "OwO-body" == e.target.classList.value) {
            let t = e.target;
            if (t) {
                let e = ""
                  , o = !0
                  , n = document.createElement("div");
                n.id = "owo-big",
                document.querySelector("body").appendChild(n),
                t.addEventListener("contextmenu", (e=>e.preventDefault())),
                t.addEventListener("mouseover", (t=>{
                    "LI" == t.target.tagName && o && (o = !1,
                    e = setTimeout((()=>{
                        let e = 3 * t.target.clientWidth
                          , o = t.x - t.offsetX - (e - t.target.clientWidth) / 2
                          , a = t.y - t.offsetY;
                        n.style.height = 3 * t.target.clientHeight + "px",
                        n.style.width = e + "px",
                        n.style.left = o + "px",
                        n.style.top = a + "px",
                        n.style.display = "flex",
                        n.innerHTML = `<img src="${t.target.querySelector("img").src}">`
                    }
                    ), 300))
                }
                )),
                t.addEventListener("mouseout", (t=>{
                    n.style.display = "none",
                    o = !0,
                    clearTimeout(e)
                }
                ))
            }
        }
    }
    ))
}
function initObserver() {
    var e = document.getElementById("post-comment")
      , t = document.getElementById("pagination");
    e && t && new IntersectionObserver((function(e) {
        e.forEach((function(e) {
            e.isIntersecting ? (t.classList.add("show-window"),
            document.querySelector(".comment-barrage").style.bottom = "-200px") : (t.classList.remove("show-window"),
            document.querySelector(".comment-barrage").style.bottom = "0px")
        }
        ))
    }
    )).observe(e)
}
function percent() {
    let e = document.documentElement.scrollTop || window.pageYOffset
      , t = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight
      , o = Math.round(e / t * 100)
      , n = document.querySelector("#percent");
    var a = window.scrollY + document.documentElement.clientHeight
      , i = document.getElementById("post-tools") || document.getElementById("footer");
    i.offsetTop + i.offsetHeight / 2 < a || o > 90 ? (document.querySelector("#nav-totop").classList.add("long"),
    n.innerHTML = "返回顶部") : (document.querySelector("#nav-totop").classList.remove("long"),
    o >= 0 && (n.innerHTML = o)),
    endresult = t - e,
    endresult < 100 ? $(".needEndHide").addClass("hide") : $(".needEndHide").removeClass("hide"),
    window.onscroll = percent
}
function addKeyShotListener() {
    $(window).off("keydown"),
    $(window).off("keyup"),
    $(window).on("keydown", keyDownEvent),
    $(window).on("keyup", keyUpEvent)
}
function keyDownEvent(e) {
    if (27 == e.keyCode && (heo.hideLoading(),
    heo.hideConsole(),
    rm.hideRightMenu()),
    heo_keyboard && e.shiftKey && !heo_intype) {
        if (16 == e.keyCode && document.querySelector("#keyboard-tips").classList.add("show"),
        75 == e.keyCode)
            return heo.keyboardToggle(),
            !1;
        if (65 == e.keyCode)
            return heo.showConsole(),
            !1;
        if (77 == e.keyCode)
            return heo.musicToggle(),
            !1;
        if (82 == e.keyCode)
            return toRandomPost(),
            !1;
        if (72 == e.keyCode)
            return pjax.loadUrl("/"),
            !1;
        if (68 == e.keyCode)
            return rm.switchDarkMode(),
            !1;
        if (70 == e.keyCode)
            return pjax.loadUrl("/moments/"),
            !1;
        if (76 == e.keyCode)
            return pjax.loadUrl("/link/"),
            !1;
        if (80 == e.keyCode)
            return pjax.loadUrl("/about/"),
            !1;
        if (84 == e.keyCode)
            return pjax.loadUrl("/tlink/"),
            !1
    }
}
function keyUpEvent(e) {
    16 == e.keyCode && document.querySelector("#keyboard-tips").classList.remove("show")
}
function listenToPageInputPress() {
    var e = document.getElementById("toPageText")
      , t = document.getElementById("toPageButton");
    e && (e.addEventListener("keydown", (e=>{
        13 === e.keyCode && (heo.toPage(),
        pjax.loadUrl(t.href))
    }
    )),
    e.addEventListener("input", (function() {
        "" === e.value || "0" === e.value ? t.classList.remove("haveValue") : t.classList.add("haveValue");
        var o = document.querySelectorAll(".page-number")
          , n = +o[o.length - 1].innerHTML;
        +document.getElementById("toPageText").value > n && (e.value = n)
    }
    )))
}
function initBlog() {
    // coverColor(),
    addRightMenuClickEvent(),
    navTitle(),
    percent(),
    listenToPageInputPress(),
    heo.topPostScroll(),
    heo.sayhi(),
    heo.addTag(),
    heo.stopImgRightDrag(),
    heo.addFriendLinksInFooter(),
    heo.addPowerLinksInPostRightSide(),
    heo.qrcodeCreate(),
    heo.hidecookie(),
    heo.onlyHome(),
    heo.addNavBackgroundInit(),
    heo.initIndexEssay(),
    heo.chageTimeFormate(),
    heo.reflashEssayWaterFall(),
    heo.darkModeStatus(),
    heo.categoriesBarActive(),
    initObserver(),
    heo.initThemeColor(),
    heo.hideLoading(),
    heo.tagPageActive(),
    heo.removeBodyPaceClass()
    // heoGPT.aiExplanation(),
    // AIEngine(),
    // addAIToggleListener()
}
document.addEventListener("touchstart", (e=>{
    RemoveRewardMask()
}
), !1),
$(document).unbind("keydown").bind("keydown", (function(e) {
    if ((e.ctrlKey || e.metaKey) && 67 == e.keyCode && "" != selectTextNow)
        return acy.snackbarShow("复制成功，复制和转载请标注本文地址"),
        rm.rightmenuCopyText(selectTextNow),
        !1
}
)),
document.addEventListener("scroll", acy.throttle((function() {
    heo.initThemeColor()
}
), 200)),
navigator.serviceWorker.getRegistrations().then((function(e) {
    for (let t of e)
        t.unregister()
}
)),
window.onkeydown = function(e) {
    123 === e.keyCode && acy.snackbarShow("开发者模式已打开，请遵循GPL协议", !1, 3e3)
}
,
window.addEventListener("resize", (function() {
    document.querySelector("#waterfall") && heo.reflashEssayWaterFall()
}
)),
$(".topGroup").hover((function() {}
), (function() {
    hoverOnCommentBarrage = !1,
    document.getElementById("todayCard").classList.remove("hide"),
    document.getElementById("todayCard").style.zIndex = 1
}
)),
document.getElementById("post-comment") && owoBig(),
"true" == localStorage.getItem("keyboardToggle") ? (document.querySelector("#consoleKeyboard").classList.add("on"),
heo_keyboard = !0) : (document.querySelector("#consoleKeyboard").classList.remove("on"),
heo_keyboard = !1),
addKeyShotListener(),
$("input").focus((function() {
    heo_intype = !0
}
)),
$("textarea").focus((function() {
    heo_intype = !0
}
)),
$("input").focusout((function() {
    heo_intype = !1
}
)),
$("textarea").focusout((function() {
    heo_intype = !1
}
)),
window.onfocus = function() {
    document.querySelector("#keyboard-tips").classList.remove("show")
}
,
document.addEventListener("pjax:click", (function() {
    console.clear(),
    Pace.restart(),
    heo.showLoading(),
    $(window).prop("keydown", null).off("keydown")
}
));
