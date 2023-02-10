function link(args) {
    args = args.join(' ').split(',');
    let title = args[0];
    let sitename = args[1];
    let link = args[2];

    // 获取网页favicon
    let urlNoProtocol = link.replace(/^https?\:\/\//i, "");
    let imgUrl = "https://api.iowen.cn/favicon/" + urlNoProtocol + ".png";

    return `<a class="tag-Link" target="_blank" href="${link}">
    <div class="tag-link-tips">引用站外地址</div>
    <div class="tag-link-bottom">
        <div class="tag-link-left" style="background-image: url(${imgUrl});"></div>
        <div class="tag-link-right">
            <div class="tag-link-title">${title}</div>
            <div class="tag-link-sitename">${sitename}</div>
        </div>
        <i class="fa-solid fa-angle-right"></i>
    </div>
    </a>`
}

hexo.extend.tag.register('link',link, { ends: false })