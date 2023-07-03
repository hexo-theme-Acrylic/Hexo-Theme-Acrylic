var acy = {
  debounce: function(e, t, n) {
      let o;
      return function() {
          const i = this
            , s = arguments
            , r = n && !o;
          clearTimeout(o),
          o = setTimeout((function() {
              o = null,
              n || e.apply(i, s)
          }
          ), t),
          r && e.apply(i, s)
      }
  },
  throttle: function(e, t, n) {
      let o, i, s, r = 0;
      n || (n = {});
      const a = function() {
          r = !1 === n.leading ? 0 : (new Date).getTime(),
          o = null,
          e.apply(i, s),
          o || (i = s = null)
      };
      return function() {
          const l = (new Date).getTime();
          r || !1 !== n.leading || (r = l);
          const d = t - (l - r);
          i = this,
          s = arguments,
          d <= 0 || d > t ? (o && (clearTimeout(o),
          o = null),
          r = l,
          e.apply(i, s),
          o || (i = s = null)) : o || !1 === n.trailing || (o = setTimeout(a, d))
      }
  },
  sidebarPaddingR: ()=>{
      const e = window.innerWidth
        , t = document.body.clientWidth;
      e !== t && (document.body.style.paddingRight = e - t + "px")
  }
  ,
  snackbarShow: (e,t,n)=>{
      const o = void 0 !== t && t
        , i = void 0 !== n ? n : 5e3
        , s = GLOBAL_CONFIG.Snackbar.position
        , r = "light" === document.documentElement.getAttribute("data-theme") ? GLOBAL_CONFIG.Snackbar.bgLight : GLOBAL_CONFIG.Snackbar.bgDark;
      document.styleSheets[0].addRule(":root", "--heo-snackbar-time:" + i + "ms!important"),
      Snackbar.show({
          text: e,
          backgroundColor: r,
          showAction: o,
          duration: i,
          pos: s
      })
  }
  ,
  initJustifiedGallery: function(e) {
      e instanceof jQuery || (e = $(e)),
      e.each((function(e, t) {
          $(this).is(":visible") && $(this).justifiedGallery({
              rowHeight: 220,
              margins: 4
          })
      }
      ))
  },
  diffDate: (e,t=!1)=>{
      const n = new Date
        , o = new Date(e)
        , i = n.getTime() - o.getTime()
        , s = 36e5
        , r = 24 * s;
      let a;
      if (t) {
          const e = i / r
            , t = i / s
            , n = i / 6e4;
          a = i / 2592e6 > 12 ? o.toLocaleDateString() : e >= 7 ? o.toLocaleDateString().substr(5) : e >= 1 ? parseInt(e) + "" + GLOBAL_CONFIG.date_suffix.day : t >= 1 || n >= 1 ? "最近" : GLOBAL_CONFIG.date_suffix.just
      } else
          a = parseInt(i / r);
      return a
  }
  ,
  loadComment: (e,t)=>{
      if ("IntersectionObserver"in window) {
          const n = new IntersectionObserver((e=>{
              e[0].isIntersecting && (t(),
              n.disconnect())
          }
          ),{
              threshold: [0]
          });
          n.observe(e)
      } else
          t()
  }
  ,
  scrollToDest: (e,t)=>{
      if (e < 0 || t < 0)
          return;
      const n = window.scrollY || window.screenTop;
      if (e -= 70,
      "CSS"in window && CSS.supports("scroll-behavior", "smooth"))
          return void window.scrollTo({
              top: e,
              behavior: "smooth"
          });
      let o = null;
      t = t || 500,
      window.requestAnimationFrame((function i(s) {
          if (o = o || s,
          n < e) {
              const r = s - o;
              window.scrollTo(0, (e - n) * r / t + n),
              r < t ? window.requestAnimationFrame(i) : window.scrollTo(0, e)
          } else {
              const r = s - o;
              window.scrollTo(0, n - (n - e) * r / t),
              r < t ? window.requestAnimationFrame(i) : window.scrollTo(0, e)
          }
      }
      ))
  }
  ,
  fadeIn: (e,t)=>{
      e.style.cssText = `display:block;animation: to_show ${t}s`
  }
  ,
  fadeOut: (e,t)=>{
      e.addEventListener("animationend", (function t() {
          e.style.cssText = "display: none; animation: '' ",
          e.removeEventListener("animationend", t)
      }
      )),
      e.style.animation = `to_hide ${t}s`
  }
  ,
  getParents: (e,t)=>{
      for (; e && e !== document; e = e.parentNode)
          if (e.matches(t))
              return e;
      return null
  }
  ,
  siblings: (e,t)=>[...e.parentNode.children].filter((n=>t ? n !== e && n.matches(t) : n !== e)),
  wrap: function(e, t, n="", o="") {
      const i = document.createElement(t);
      n && (i.id = n),
      o && (i.className = o),
      e.parentNode.insertBefore(i, e),
      i.appendChild(e)
  },
  unwrap: function(e) {
      const t = e.parentNode;
      t !== document.body && (t.parentNode.insertBefore(e, t),
      t.parentNode.removeChild(t))
  },
  isJqueryLoad: e=>{
      "undefined" == typeof jQuery ? getScript(GLOBAL_CONFIG.source.jQuery).then(e) : e()
  }
  ,
  isHidden: e=>0 === e.offsetHeight && 0 === e.offsetWidth,
  getEleTop: e=>{
      let t = e.offsetTop
        , n = e.offsetParent;
      for (; null !== n; )
          t += n.offsetTop,
          n = n.offsetParent;
      return t
  }
};
