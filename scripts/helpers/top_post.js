// 未开发完成
// hexo.extend.helper.register('top_post', function () {
//   let html = ``
//   var posts_list = hexo.locals.get('posts').data;
//   var top_group_list = []
//   for (var item of posts_list){
//     if (item.top_group_index){
//       top_group_list.push(item)
//     }
//   }
//   function sortNumberGroupList(a, b) {
//     return a.top_group_list - b.top_group_list
//   }
//   top_group_list = top_group_list.sort(sortNumberGroupList)
//   top_group_list = top_group_list.reverse();
//   console.log(top_group_list)
//   top_group_list.forEach(item => {
//     html += `<div class="recent-post-item">
//                 <div class="post_cover left_radius">
//                   <a href="${item.path}" title="${item.title}" data-pjax-state="data-pjax-state">
//                     <span class="recent-post-top-text" onclick="pjax.loadUrl("` + item.path + `");">荐 </span>
//                     <img class="post_bg entered loaded" data-lazy-src="${item.cover}" onerror="this.onerror=null;this.src='https://img2.acozycotage.net/i/2023/02/11/pqqw2r-4.webp'" alt=item.title data-ll-status="loaded" src="${item.cover}"/>
//                   </a>
//                 </div>
//               <div class="recent-post-info" onclick="pjax.loadUrl(&quot;/p/1b0d95ef.html&quot;)">
//                 <a class="article-title" href="/p/1b0d95ef.html" title="${item.title}" data-pjax-state="data-pjax-state">
//                   ${item.title}
//                 </a>
//               </div>
//             </div>`
//   })
//   return html
// })
// html = ``
// const posts_list = hexo.locals.get('posts').data;
// var top_group_list = []
// console.log(posts_list)
// // for (var item of posts_list){
// //   if (item.top_group_index){
// //     top_group_list.push(item)
// //   }
// // }
// // function sortNumberGroupList(a, b) {
// //   return a.top_group_list - b.top_group_list
// // }
// // top_group_list = top_group_list.sort(sortNumberGroupList)
// // top_group_list = top_group_list.reverse();
// // console.log(top_group_list)
// // top_group_list.forEach(item => {
// //   html += `<div class="recent-post-item">
// //               <div class="post_cover left_radius">
// //                 <a href="${item.path}" title="${item.title}" data-pjax-state="data-pjax-state">
// //                   <span class="recent-post-top-text" onclick="pjax.loadUrl("` + item.path + `");">荐 </span>
// //                   <img class="post_bg entered loaded" data-lazy-src="${item.cover}" onerror="this.onerror=null;this.src='https://img2.acozycotage.net/i/2023/02/11/pqqw2r-4.webp'" alt=item.title data-ll-status="loaded" src="${item.cover}"/>
// //                 </a>
// //               </div>
// //             <div class="recent-post-info" onclick="pjax.loadUrl(&quot;/p/1b0d95ef.html&quot;)">
// //               <a class="article-title" href="/p/1b0d95ef.html" title="${item.title}" data-pjax-state="data-pjax-state">
// //                 ${item.title}
// //               </a>
// //             </div>
// //           </div>`
// // })