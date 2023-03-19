function navTitle() {
    let e = document.title;
    document.getElementById("page-name-text").innerHTML = e.replace(" | JayHrn", "")
}

navTitle() // 打开网站先执行一次
document.addEventListener("pjax:complete", navTitle) // pjax加载完成（切换页面）后再执行一次
