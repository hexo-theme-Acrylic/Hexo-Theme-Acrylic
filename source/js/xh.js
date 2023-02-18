function postAddToc () {
  let postContent = document.querySelector('#post>#article-container.post-content')
  let cardToc = document.getElementById('card-toc')
  if (postContent && cardToc) {
    let tocNumber = cardToc.getElementsByClassName('toc-number')
    let tocLink = cardToc.getElementsByClassName('toc-link')
    for (let i = 0; i < tocLink.length; i++) {
      document.getElementById(decodeURIComponent(tocLink[i].attributes.href.value).slice(1)).dataset.toc = tocNumber[i].innerText
    }
  }
}
postAddToc ()
document.addEventListener("pjax:complete", postAddToc)