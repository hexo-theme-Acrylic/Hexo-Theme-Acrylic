function percent() {
  let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
    b = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight, // 整个网页高度
    result = Math.round(a / b * 100), // 计算百分比
    btn = document.querySelector("#percent"); // 获取按钮
  //滚动条高度+视窗高度 = 可见区域底部高度
  var visibleBottom = window.scrollY + document.documentElement.clientHeight;
  // 获取位置监测容器，此处采用评论区
  var eventlistner = document.getElementById('post-tools') || document.getElementById('footer');
  var centerY = eventlistner.offsetTop + (eventlistner.offsetHeight / 2);
  if ((centerY < visibleBottom) || (result > 90)) {
    document.querySelector("#nav-totop").classList.add("long");
    btn.innerHTML = "返回顶部";
  } else {
    document.querySelector("#nav-totop").classList.remove("long");
    if (result >= 0) {
      btn.innerHTML = result;
    }
  }
  //隐藏aplayer和弹幕窗口
  endresult = b - a
  if (endresult < 100) {
    $(".needEndHide").addClass("hide")
  }else {
    $(".needEndHide").removeClass("hide")
  }
  window.onscroll = percent;
}

percent() // 打开网站先执行一次
document.addEventListener("pjax:complete", percent) // pjax加载完成（切换页面）后再执行一次