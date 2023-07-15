let heoGPTIsRunning = !1
  , heo_aiPostExplanation = ""
  , heoGPTModel = "HeoGPT"
  , aiTalkMode = !1;
var heoGPT = {
    aiExplanation: async function() {
        const e = document.querySelector(".ai-explanation");
        if (!e)
            return;
        "" === heo_aiPostExplanation && (heo_aiPostExplanation = e.innerText);
        const n = heoGPT.synonymReplace(heo_aiPostExplanation);
        heoGPT.aiShowAnimation(Promise.resolve(n))
    },
    loadHeogpt: async function() {
        if (null === heogpt) {
            const e = await fetch("/json/heogpt.json");
            heogpt = await e.json()
        }
    },
    getTitleAndContent: function() {
        const e = document.title
          , n = document.getElementById("article-container")
          , o = n.getElementsByTagName("p")
          , t = n.querySelectorAll("h1, h2, h3, h4, h5");
        let i = "";
        for (let e of t)
            i += e.innerText + " ";
        for (let e of o) {
            i += e.innerText.replace(/https?:\/\/[^\s]+/g, "")
        }
        const a = (e + " " + i).slice(0, 1e3);
        return console.log("heo的:" + a),
        a
    },
    fetchTianliGPT: async function(e, n) {
        const o = `https://summary.tianli0.top/?content=${encodeURIComponent(e)}&key=${encodeURIComponent(n)}`;
        try {
            const e = new AbortController
              , n = await fetch(o, {
                signal: e.signal
            });
            if (n.ok) {
                return (await n.json()).summary
            }
            throw Error("请求失败")
        } catch (e) {
            return "AbortError" === e.name ? console.error("请求超时") : console.error("请求失败：", e),
            "获取文章摘要超时。当你出现这个问题时，可能是因为文章过长导致的AI运算量过大， 您可以稍等一下然后重新切换到TianliGPT模式，或者尝试使用HeoGPT模式。"
        }
    },
    tianliGPTGenerate: async function() {
        const e = heoGPT.fetchTianliGPT(heoGPT.getTitleAndContent(), "SZLhZo3TjRN7GZ9JiRFa");
        heoGPT.aiShowAnimation(e)
    },
    toggleGPTModel: function() {
        if (heoGPTIsRunning)
            return;
        const e = document.getElementById("ai-tag");
        "TianliGPT" === heoGPTModel ? (heoGPTModel = "HeoGPT",
        heoGPT.aiShowAnimation(Promise.resolve(heo_aiPostExplanation)),
        e.innerText = "HeoGPT") : (heoGPTModel = "TianliGPT",
        heoGPT.tianliGPTGenerate(),
        e.innerText = "TianliGPT")
    },
    aiShowAnimation: function(e) {
        const n = document.querySelector(".ai-explanation");
        if (!n)
            return;
        if (heoGPTIsRunning)
            return;
        heoGPT.cleanSuggestions(),
        heoGPTIsRunning = !0;
        n.style.display = "block",
        n.innerHTML = '生成中...<span class="blinking-cursor"></span>';
        let o = !1
          , t = 0
          , i = !0;
        function a(e) {
            const n = e.getBoundingClientRect();
            return n.top >= 0 && n.left >= 0 && n.bottom <= (window.innerHeight || document.documentElement.clientHeight) && n.right <= (window.innerWidth || document.documentElement.clientWidth)
        }
        e.then((e=>{
            let s = performance.now();
            function l() {
                if (t < e.length && o) {
                    const o = performance.now()
                      , i = o - s
                      , a = e.slice(t, t + 1);
                    i >= (/[，。！、？,.!?]/.test(a) ? 150 : 25) && (n.innerText = e.slice(0, t + 1),
                    s = o,
                    t++,
                    t < e.length ? n.innerHTML = e.slice(0, t) + '<span class="blinking-cursor"></span>' : (n.innerHTML = e,
                    n.style.display = "block",
                    heoGPT.createSuggestions(),
                    heoGPTIsRunning = !1)),
                    requestAnimationFrame(l)
                }
            }
            function c() {
                a(n) ? o || (o = !0,
                i ? setTimeout((()=>{
                    l(),
                    i = !1
                }
                ), 1e3) : l()) : o = !1
            }
            function c() {
                a(n) ? o || (o = !0,
                i ? setTimeout((()=>{
                    l(),
                    i = !1
                }
                ), 1e3) : l()) : o = !1
            }
            window.addEventListener("scroll", c),
            window.addEventListener("resize", c),
            window.addEventListener("scroll", c),
            window.addEventListener("resize", c);
            const r = setInterval(c, 500);
            heoGPTIsRunning || clearInterval(r),
            c()
        }
        )).catch((e=>{
            console.error("获取信息失败:", e),
            n.innerHTML = "获取信息失败",
            n.style.display = "block",
            heoGPTIsRunning = !1
        }
        ))
    },
    synonymReplace: async function(e) {
        await heoGPT.loadHeogpt();
        const n = Object.keys(heogpt);
        for (let o = 0; o < n.length; o++) {
            const t = n[o]
              , i = heogpt[t]
              , a = RegExp(t, "gi");
            e = e.replace(a, (()=>{
                const e = Math.floor(Math.random() * i.length);
                return i[e]
            }
            ))
        }
        return e
    },
    createSuggestionItemWithAction: function(e, n) {
        const o = document.querySelector(".ai-suggestions");
        if (!o)
            return void console.error("无法找到具有class为ai-suggestions的元素");
        const t = document.createElement("div");
        t.classList.add("ai-suggestions-item"),
        t.textContent = e,
        t.addEventListener("click", (()=>{
            n()
        }
        )),
        o.appendChild(t)
    },
    cleanSuggestions: function() {
        const e = document.querySelector(".ai-suggestions");
        e ? e.innerHTML = "" : console.error("无法找到具有class为ai-suggestions的元素")
    },
    createSuggestions: function() {
        function e() {
            window.open("/p/ec57d8b2.html", "_blank")
        }
        aiTalkMode && (heoGPT.cleanSuggestions(),
        "HeoGPT" === heoGPTModel ? (heoGPT.createSuggestionItemWithAction("谁是张洪Heo？", (()=>{
            heoGPT.aiShowAnimation(Promise.resolve("张洪Heo 是一位设计师，他的主要职业是图形设计师、UI/视觉设计师和产品设计师。他的GitHub主页上有一些他的作品。此外，他还开发了一个名为“敲木鱼”的应用程序，该应用程序旨在通过音效和文字显示来提高用户体验。如果您想了解更多关于张洪Heo的信息，可以访问他的个人网站或博客。"))
        }
        )),
        heoGPT.createSuggestionItemWithAction("这篇文章讲了什么？", (()=>{
            heoGPT.aiShowAnimation(Promise.resolve(heo_aiPostExplanation))
        }
        )),
        heoGPT.createSuggestionItemWithAction("带我去看看其他文章", (()=>toRandomPost())),
        heoGPT.createSuggestionItemWithAction("怎么才能给我的网站安装一个AI摘要？", (()=>e()))) : "TianliGPT" === heoGPTModel && (heoGPT.createSuggestionItemWithAction("怎么才能给我的网站安装一个AI摘要？", (()=>e())),
        heoGPT.createSuggestionItemWithAction("带我去Tianli的博客", (()=>{
            window.open("https://tianli-blog.club/", "_blank")
        }
        ))))
    }
};
function AIEngine() {
    const e = document.querySelector(".ai-tag");
    e && e.addEventListener("click", (()=>{
        heoGPTIsRunning || (aiTalkMode = !0,
        "HeoGPT" === heoGPTModel ? heoGPTTalkMode() : tianliGPTTalkMode())
    }
    ))
}
function addAIToggleListener() {
    const e = document.querySelector("#ai-Toggle");
    e && e.addEventListener("click", (()=>{
        heoGPT.toggleGPTModel()
    }
    ))
}
function heoGPTTalkMode() {
    document.querySelectorAll(".ai-suggestions") && heoGPT.aiShowAnimation(Promise.resolve("我是张洪Heo的摘要生成助理HeoGPT，是一个基于GPT-4与HeoCorrection的混合语言模型。我在这里只负责摘要的预生成和显示，你无法与我直接沟通，但我可以回答一些预设的问题。"))
}
function tianliGPTTalkMode() {
    document.querySelectorAll(".ai-suggestions") && heoGPT.aiShowAnimation(Promise.resolve("你好，我是Tianli开发的摘要生成助理TianliGPT，是一个基于GPT-3.5的生成式AI。我在这里只负责摘要的实时生成和显示，你无法与我直接沟通，如果你也需要一个这样的AI摘要接口，可以在下方查看部署教程。"))
}
