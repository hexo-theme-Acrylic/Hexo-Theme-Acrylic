let heo_cookiesTime = null;
let heo_musicPlaying = false;
let heo_keyboard = false;
let heo_intype = false;
let heo_showFPS = false;
// 定义变量存储上一个内容
let lastSayHello = '';
// 私有函数
var heo = {
  // 检测显示模式
  darkModeStatus: function () {
    let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (theme == 'light') {
      $(".menu-darkmode-text").text("深色模式");
    }else {
      $(".menu-darkmode-text").text("浅色模式");
    }
  },

  // 首页bb
  initIndexEssay: function() {
    if (document.querySelector('#bber-talk')) {
      var swiper = new Swiper('.swiper-container', {
        direction: 'vertical', // 垂直切换选项
        loop: true,
        autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true
      },
      });
    }
  },


  // 只在首页显示
  onlyHome: function() {
    var urlinfo = window.location.pathname;
    urlinfo = decodeURIComponent(urlinfo);
    if (urlinfo == '/'){
      $('.only-home').attr('style','display: flex');
    }else{
      $('.only-home').attr('style','display: none');
    }
  },

  //是否在首页
  is_Post: function() {
    var url=window.location.href;  //获取url
  if(url.indexOf("/p/") >= 0 ) { //判断url地址中是否包含code字符串
      return true;
    }else {
      return false;
     }
  },


  //监测是否在页面开头
  addNavBackgroundInit: function() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
      if(document.body){
        bodyScrollTop = document.body.scrollTop;
      }
      if(document.documentElement){
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
      // console.log("滚动高度"+ scrollTop)
    
      if (scrollTop != 0) {
        document.getElementById("page-header").classList.add("nav-fixed");
        document.getElementById("page-header").classList.add("nav-visible");
        $('#cookies-window').hide()
        console.log("已添加class")
      }
  },

  // 标签页面
  //分类条
  tagPageActive: function() {
    var urlinfo = window.location.pathname;
    urlinfo = decodeURIComponent(urlinfo)
    // console.log(urlinfo);
    // 验证是否是分类链接
    var pattern = /\/tags\/.*?\//;
    var patbool = pattern.test(urlinfo);
    // console.log(patbool);
    // 获取当前的分类
    if (patbool) {
      var valuegroup = urlinfo.split("/");
      // console.log(valuegroup[2]);
      // 获取当前分类
      var nowCategorie = valuegroup[2];
      if (document.querySelector('#tag-page-tags')){
        $('a').removeClass('select')
        document.getElementById(nowCategorie).classList.add("select");
      }
    }
  },

  //分类条
  categoriesBarActive: function() {
    if (document.querySelector('#category-bar')){
      $(".category-bar-item").removeClass("select")
    }
    var urlinfo = window.location.pathname;
    urlinfo = decodeURIComponent(urlinfo);
    // console.log(urlinfo);
    //判断是否是首页
    if (urlinfo == '/'){
      if (document.querySelector('#category-bar')){
        document.getElementById('category-bar-home').classList.add("select");
      }
    }else {
      // 验证是否是分类链接
      var pattern = /\/categories\/.*?\//;
      var patbool = pattern.test(urlinfo);
      // console.log(patbool);
      // 获取当前的分类
      if (patbool) {
        var valuegroup = urlinfo.split("/");
        // console.log(valuegroup[2]);
        // 获取当前分类
        var nowCategorie = valuegroup[2];
        if (document.querySelector('#category-bar')){
          document.getElementById(nowCategorie).classList.add("select");
        }
      }
    }
  },

  // 页脚友链
  addFriendLinksInFooter: function() {
    var fetchUrl = "https://moments.zhheo.com/randomfriend?num=3"
    fetch(fetchUrl)
    .then(res => res.json())
    .then(json =>{
      var randomFriendLinks = getArrayItems(json,3);
  
      var htmlText = '';
      for (let i = 0; i < randomFriendLinks.length; ++i) {
        var item = randomFriendLinks[i]
        htmlText += `<a class='footer-item' href='${item.link}'  target="_blank" rel="noopener nofollow">${item.name}</a>`;
      }
      htmlText += `<a class='footer-item' href='/link/'>更多</a>`
      document.getElementById("friend-links-in-footer").innerHTML = htmlText;
    })
  },

  //禁止图片右键单击
  stopImgRightDrag: function() {
    var img=$("img");
    img.on("dragstart",function(){return false;});
  },

  //置顶文章横向滚动
  topPostScroll: function() {
    if (document.getElementById("recent-post-top")){
      let xscroll = document.getElementById("recent-post-top");
      xscroll.addEventListener("mousewheel", function (e) {
      //计算鼠标滚轮滚动的距离
      let v = -e.wheelDelta / 2;
      xscroll.scrollLeft += v;
      //阻止浏览器默认方法
      if(document.body.clientWidth < 1300){
        e.preventDefault();
      }
      }, false);
    }
  },

  //作者卡片问好
  sayhi: function() {
    if (document.querySelector('#author-info__sayhi')){
      document.getElementById("author-info__sayhi").innerHTML = getTimeState() + "！我是";
    }
  },

  // 添加标签
  addTag: function() {
    //添加new标签
    if (document.querySelector('.heo-tag-new')){
      $(".heo-tag-new").append(`<sup class="heo-tag heo-tag-new-view">N</sup>`)
    }
    //添加hot标签
    if (document.querySelector('.heo-tag-hot')){
      $(".heo-tag-hot").append(`<sup class="heo-tag heo-tag-hot-view">H</sup>`)
    }
  },

  // 二维码
  qrcodeCreate: function() {
    if (document.getElementById('qrcode')){
      document.getElementById("qrcode").innerHTML = "";
      var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: window.location.href,
        width: 250,
        height: 250,
        colorDark : "#000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });
    }
  },

  // 刷新即刻短文瀑布流
  reflashEssayWaterFall: function() {
    if (document.querySelector('#waterfall')) {
      setTimeout(function(){
          waterfall('#waterfall');
          document.getElementById("waterfall").classList.add('show'); 
      },500);
    }
  },
  //即刻短文更改日期格式
  chageTimeFormate:function() {
    var timeElements = document.getElementsByTagName("time");

    // 遍历所有 <time> 元素
    for (var i = 0; i < timeElements.length; i++) {
      // 获取时间字符串和时间对象
      var datetime = timeElements[i].getAttribute("datetime");
      var timeObj = new Date(datetime);

      // 计算距离今天的天数
      var today = new Date();
      var timeDiff = today.getTime() - timeObj.getTime();
      var daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

      // 处理时间字符串
      var timeString;

      if (daysDiff === 0) {
        timeString = "最近";
      } else if (daysDiff === 1) {
        timeString = "昨天";
      } else if (daysDiff === 2) {
        timeString = "前天";
      } else if (daysDiff <= 7) {
        timeString = daysDiff + "天前";
      } else {
        // 处理时间字符串
        if (timeObj.getFullYear() !== new Date().getFullYear()) {
          timeString = timeObj.getFullYear() + "/" + (timeObj.getMonth() + 1) + "/" + timeObj.getDate();
        } else {
          timeString = (timeObj.getMonth() + 1) + "/" + timeObj.getDate();
        }
      }

      // 更新 <time> 元素的文本内容
      timeElements[i].textContent = timeString;
    }
  },

  // 下载图片
  downloadImage: function(imgsrc, name) { //下载图片地址和图片名
    rm.hideRightMenu();
    if (rm.downloadimging == false) {
      rm.downloadimging = true;
      btf.snackbarShow('正在下载中，请稍后',false,10000)
      setTimeout(function(){
        let image = new Image();
        // 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous");
        image.onload = function() {
          let canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          let context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, image.width, image.height);
          let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
          let a = document.createElement("a"); // 生成一个a元素
          let event = new MouseEvent("click"); // 创建一个单击事件
          a.download = name || "photo"; // 设置图片名称
          a.href = url; // 将生成的URL设置为a.href属性
          a.dispatchEvent(event); // 触发a的单击事件
        };
        image.src = imgsrc;
        btf.snackbarShow('图片已添加盲水印，请遵守版权协议');
        rm.downloadimging = false;
      }, "10000");
    }else{
      btf.snackbarShow('有正在进行中的下载，请稍后再试');
    }
  },

  //控制评论弹幕
  switchCommentBarrage: function() {
    let commentBarrage = document.querySelector('.comment-barrage');
    if(commentBarrage){
        if($(".comment-barrage").is(":visible")) {
          $(".comment-barrage").hide();
          $(".menu-commentBarrage-text").text("显示热评");
          document.querySelector("#consoleCommentBarrage").classList.remove("on");
          localStorage.setItem('commentBarrageSwitch', 'false');
        }else if ($(".comment-barrage").is(":hidden")) {
          $(".comment-barrage").show();
          $(".menu-commentBarrage-text").text("关闭热评");
          document.querySelector("#consoleCommentBarrage").classList.add("on");
          localStorage.removeItem('commentBarrageSwitch');
        }
    }
    rm.hideRightMenu();
  },

  //隐藏cookie窗口
  hidecookie: function() {
    heo_cookiesTime = setTimeout(()=>{
      document.getElementById("cookies-window").classList.add('cw-hide');
      setTimeout(()=>{
        $('#cookies-window').hide()
      },1000)
    },3000)
  },

  //隐藏今日推荐
  hideTodayCard: function() {
    if (document.getElementById("todayCard")) {
      document.getElementById("todayCard").classList.add('hide');
    }
  },

  //更改主题色
  changeThemeColor: function(color) {
    if (document.querySelector('meta[name="theme-color"]') !== null) {
      document.querySelector('meta[name="theme-color"]').setAttribute('content', color)
    }
  },

  //自适应主题色
  initThemeColor: function() {
    const currentTop = window.scrollY || document.documentElement.scrollTop
    if (heo.is_Post()) {
      if (currentTop > 0) {
        let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--heo-card-bg');
        heo.changeThemeColor(themeColor);
      }else {
        if (currentTop === 0) {
          let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--heo-main');
          heo.changeThemeColor(themeColor);
        }
      }
    }else {
      if (currentTop > 0) {
        let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--heo-card-bg');
        heo.changeThemeColor(themeColor);
      }else {
        if (currentTop === 0) {
          let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--heo-background');
          heo.changeThemeColor(themeColor);
        }
      }
    }
  },

  //跳转到指定位置
  jumpTo: function(dom) {
    $(document).ready(function () {
      $("html,body").animate({
        scrollTop: $(dom).eq(i).offset().top
      }, 500 /*scroll实现定位滚动*/ ); /*让整个页面可以滚动*/
    });
  },

  //显示加载动画
  showLoading: function() {
    document.querySelector("#loading-box").classList.remove("loaded");
    let cardColor = getComputedStyle(document.documentElement).getPropertyValue('--heo-card-bg');
    heo.changeThemeColor(cardColor);
  },

  //隐藏加载动画
  hideLoading: function() {
    document.querySelector("#loading-box").classList.add("loaded");
  },

  //切换音乐播放状态
  musicToggle: function() {
    let msgPlay = '<i class="fa-solid fa-play"></i><span>播放音乐</span>' // 此處可以更改為你想要顯示的文字
    let msgPause = '<i class="fa-solid fa-pause"></i><span>暂停音乐</span>' // 同上，但兩處均不建議更改
    if (heo_musicPlaying) {
      document.querySelector("#nav-music").classList.remove("playing");
      document.getElementById("menu-music-toggle").innerHTML = msgPlay;
      document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停";
      document.querySelector("#consoleMusic").classList.remove("on");
      heo_musicPlaying = false;
    }else {
      document.querySelector("#nav-music").classList.add("playing");
      document.getElementById("menu-music-toggle").innerHTML = msgPause;
      document.querySelector("#consoleMusic").classList.add("on");
      heo_musicPlaying = true;
    }
    document.querySelector('meting-js').aplayer.toggle();
    rm.hideRightMenu();
  },

  //音乐上一曲
  musicSkipBack: function() {
    document.querySelector('meting-js').aplayer.skipBack();
    rm.hideRightMenu();
  },

  //音乐下一曲
  musicSkipForward: function() {
    document.querySelector('meting-js').aplayer.skipForward();
    rm.hideRightMenu();
  },

  //获取音乐中的名称
  musicGetName: function() {
    var x = $('.aplayer-title')
		// var x = document.getElementsByClassName('txt');
		// for (var i = x.length - 1; i >= 0; i--) {
		// console.log(x[i].innerText)
		// }
		var arr = []
		for (var i = x.length - 1; i >= 0; i--) {
			arr[i] = x[i].innerText
			// console.log(x[i].innerText)
		}
		return arr[0]
  },

  //显示中控台
  showConsole: function() {
    document.querySelector("#console").classList.add("show");
    heo.initConsoleState();
  },

  //隐藏中控台
  hideConsole: function() {
    document.querySelector("#console").classList.remove("show");
  },

  //快捷键功能开关
  keyboardToggle: function() {
    if (heo_keyboard) {
      heo_keyboard = false;
      document.querySelector("#consoleKeyboard").classList.remove("on");
      localStorage.setItem('keyboardToggle', 'false');
    }else {
      heo_keyboard = true;
      document.querySelector("#consoleKeyboard").classList.add("on");
      localStorage.setItem('keyboardToggle', 'true');
    }
  },

  //滚动到指定id
  scrollTo:function(id){
    const element = document.getElementById(id);
    if (element) {
      const targetY = element.getBoundingClientRect().top + window.pageYOffset - 80;
      const startingY = window.pageYOffset;
      const diff = targetY - startingY;
      let startTime = null;
  
      function step(currentTime) {
        if (!startTime) {
          startTime = currentTime;
        }
        const timeElapsed = currentTime - startTime;
        const percentage = Math.min(timeElapsed / 0, 1);
        const ease = easeInOutQuad(percentage);
        window.scrollTo(0, startingY + diff * ease);
        if (timeElapsed < 600) {
          window.requestAnimationFrame(step);
        }
      }
  
      function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      }
  
      window.requestAnimationFrame(step);
    }
  },

  //隐藏侧边栏
  hideAsideBtn: () => { // Hide aside
    const $htmlDom = document.documentElement.classList
    $htmlDom.contains('hide-aside')
      ? saveToLocal.set('aside-status', 'show', 2)
      : saveToLocal.set('aside-status', 'hide', 2)
    $htmlDom.toggle('hide-aside')
    $htmlDom.contains('hide-aside')
      ? document.querySelector("#consoleHideAside").classList.add("on")
      : document.querySelector("#consoleHideAside").classList.remove("on")
  },

  //初始化console图标
  initConsoleState: function() {
    //初始化隐藏边栏
    const $htmlDom = document.documentElement.classList
    $htmlDom.contains('hide-aside')
      ? document.querySelector("#consoleHideAside").classList.add("on")
      : document.querySelector("#consoleHideAside").classList.remove("on")
  },

  //删除多余的class
  removeBodyPaceClass: function() {
    $('body').removeClass()
    $('body').addClass('pace-done')
  },

  //显示帧率
  FPSToggle: function() {
    if (heo_showFPS) {
      heo_showFPS = false;
      document.querySelector("#fps-group").classList.remove("show");
      document.querySelector("#consoleFPS").classList.remove("on");
      localStorage.setItem('showFPS', 'false');
    }else {
      heo_showFPS = true;
      document.querySelector("#fps-group").classList.add("show");
      document.querySelector("#consoleFPS").classList.add("on");
      localStorage.setItem('showFPS', 'true');
    }
    
  },
  //跳转到指定页面
  toPage: function() {
    console.log("执行跳转")
    var e = document.querySelectorAll(".page-number"),
    t = e[e.length - 1].innerHTML,
    n = Number(t),
    a = document.getElementById("toPageText"),
    o = Number(a.value);
    if ("" != o && !isNaN(o) && o % 1 == 0) if (1 == o) document.getElementById("toPageButton").href = "/";
    else if (o > n) {
      var d = "/page/" + n + "/";
      document.getElementById("toPageButton").href = d
    } else d = "/page/" + a.value + "/",
    document.getElementById("toPageButton").href = d
  },
  //作者卡片tips更改
  changeSayHelloText: function() {
    // 定义数组存储可选内容
    const contentArray = ['🤖️ 数码科技爱好者', '🔍 分享与热心帮助', '🏠 智能家居小能手', '🔨 设计开发一条龙', '🤝 专修交互与设计','🏃 脚踏实地行动派',"🧱 团队小组发动机","💢 壮汉人狠话不多"];
    // 获取要更改内容的元素
    const contentElement = document.getElementById('author-info__sayhi');
    // 从数组中随机选择一个新内容
    let newContent = contentArray[Math.floor(Math.random() * contentArray.length)];
    // 如果新内容与上一个重复，重新选择
    while (newContent === lastSayHello) {
      newContent = contentArray[Math.floor(Math.random() * contentArray.length)];
    }
    // 将新内容赋值给元素的文本内容
    contentElement.textContent = newContent;

    // 更新上一个内容的变量
    lastSayHello = newContent;
  },
  //滚动首页分类条
  scrollCategoryBarToRight: function() {
    var element = document.getElementById('category-bar-items');
    var buttonIcon = document.getElementById('category-bar-next');
    var scrollStep = element.clientWidth; // 计算每次滚动的距离
    if (element) {
      if (element.scrollLeft + element.clientWidth >= element.scrollWidth) {
        // 滚动条已经在最右侧，滚动到最左侧
        element.scroll({
          left: 0,
          behavior: 'smooth'
        });
        buttonIcon.innerHTML = '<i class="heofont icon-youxiangshuangjiantou"></i>'; 
      } else {
        // 滚动条在其他位置，向右滚动一个可视宽度
        element.scrollBy({
          left: scrollStep,
          behavior: 'smooth'
        });
      }
    }
  },
  //匿名评论
  addRandomCommentInfo: function() {
    // 从形容词数组中随机取一个值
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];

    // 从蔬菜水果动物名字数组中随机取一个值
    const randomName = vegetablesAndFruits[Math.floor(Math.random() * vegetablesAndFruits.length)];

    // 将两个值组合成一个字符串
    const name = `${randomAdjective}${randomName}`;

    function dr_js_autofill_commentinfos() {
      var lauthor = ["#author","input[name='comname']","#inpName","input[name='author']","#ds-dialog-name","#name","input[name='nick']","#comment_author"],
      lmail =["#mail","#email","input[name='commail']","#inpEmail","input[name='email']","#ds-dialog-email","input[name='mail']","#comment_email"],
      lurl =["#url","input[name='comurl']","#inpHomePage","#ds-dialog-url","input[name='url']","input[name='website']","#website","input[name='link']","#comment_url"];
      for (var i = 0; i < lauthor.length; i++) {
          var author = document.querySelector(lauthor[i]);
          if (author != null) {
              author.value = name;
      author.dispatchEvent(new Event('input'));
      author.dispatchEvent(new Event('change'));
              break;
          }
      }
      for (var j = 0; j < lmail.length; j++) {
          var mail = document.querySelector(lmail[j]);
          if (mail != null) {
              mail.value = 'visitor@zhheo.com';
      mail.dispatchEvent(new Event('input'));
      mail.dispatchEvent(new Event('change'));
              break;
          }
      }
      return ! 1;
    }

    dr_js_autofill_commentinfos();
    var input = document.getElementsByClassName('el-textarea__inner')[0];
    input.focus();
    input.setSelectionRange(-1,-1);
  }
}

const adjectives = [
  "美丽的",
  "英俊的",
  "聪明的",
  "勇敢的",
  "可爱的",
  "慷慨的",
  "善良的",
  "可靠的",
  "开朗的",
  "成熟的",
  "稳重的",
  "真诚的",
  "幽默的",
  "豁达的",
  "有趣的",
  "活泼的",
  "优雅的",
  "敏捷的",
  "温柔的",
  "温暖的",
  "敬业的",
  "细心的",
  "耐心的",
  "深沉的",
  "朴素的",
  "含蓄的",
  "率直的",
  "开放的",
  "务实的",
  "坚强的",
  "自信的",
  "谦虚的",
  "文静的",
  "深刻的",
  "纯真的",
  "朝气蓬勃的",
  "慎重的",
  "大方的",
  "顽强的",
  "迷人的",
  "机智的",
  "善解人意的",
  "富有想象力的",
  "有魅力的",
  "独立的",
  "好奇的",
  "干净的",
  "宽容的",
  "尊重他人的",
  "体贴的",
  "守信的",
  "有耐性的",
  "有责任心的",
  "有担当的",
  "有远见的",
  "有智慧的",
  "有眼光的",
  "有冒险精神的",
  "有爱心的",
  "有同情心的",
  "喜欢思考的",
  "喜欢学习的",
  "具有批判性思维的",
  "善于表达的",
  "善于沟通的",
  "善于合作的",
  "善于领导的",
  "有激情的",
  "有幽默感的",
  "有思想的",
  "有个性的",
  "有正义感的",
  "有责任感的",
  "有创造力的",
  "有想象力的",
  "有艺术细胞的",
  "有团队精神的",
  "有协调能力的",
  "有决策能力的",
  "有组织能力的",
  "有学习能力的",
  "有执行能力的",
  "有分析能力的",
  "有逻辑思维的",
  "有创新能力的",
  "有专业素养的",
  "有商业头脑的"
]

const vegetablesAndFruits = [
  "萝卜",
  "白菜",
  "芹菜",
  "生菜",
  "青椒",
  "辣椒",
  "茄子",
  "豆角",
  "黄瓜",
  "西红柿",
  "洋葱",
  "大蒜",
  "土豆",
  "南瓜",
  "豆腐",
  "韭菜",
  "花菜",
  "西兰花",
  "蘑菇",
  "金针菇",
  "苹果",
  "香蕉",
  "橙子",
  "柠檬",
  "猕猴桃",
  "草莓",
  "葡萄",
  "桃子",
  "杏子",
  "李子",
  "石榴",
  "西瓜",
  "哈密瓜",
  "蜜瓜",
  "樱桃",
  "蓝莓",
  "柿子",
  "橄榄",
  "柚子",
  "火龙果",
];