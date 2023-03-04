function whenDOMReady() {
  "" === GLOBAL_CONFIG_SITE.title.replace("ZHHEO", "") ? document.getElementById("page-name-text").style.display = "none" : document.querySelector("#page-name-text>span").innerHTML = document.title.split(" | ZHHEO")[0];
}

whenDOMReady() // 打开网站先执行一次
document.addEventListener("pjax:complete", whenDOMReady) // pjax加载完成（切换页面）后再执行一次