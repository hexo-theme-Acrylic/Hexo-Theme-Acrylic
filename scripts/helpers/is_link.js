// 正在考虑
//   hexo.extend.helper.register('is_link', function (link,text,title,a_class) {
//   if (link.substring(0, 5) === "https" || link.substring(0, 4) === "http" || link.substring(0, 3) === "//") {
//     html = "<a class=\""+a_class+"\" href=\""+link+"\" rel='external nofollow' title=\""+title+"\" target='_blank'>"+text+"</a>"
//   } 
//   else if(link.substring(0, 1) === "/" && link.substring(0, 2) !== "/"){
//     html = "<a class=\""+a_class+"\" href=\""+link+"\" title=\""+title+"\" data-pjax-state=''>"+text+"</a>"
//   }
//   return html;
// })