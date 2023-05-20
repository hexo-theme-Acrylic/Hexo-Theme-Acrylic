"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

window.addEventListener('load', function () {
  var loadFlag = false;
  var dataObj = [];
  var $searchMask = document.getElementById('search-mask');

  var openSearch = function openSearch() {
    var bodyStyle = document.body.style;
    bodyStyle.width = '100%';
    bodyStyle.overflow = 'hidden';
    acy.animateIn($searchMask, 'to_show 0.5s');
    acy.animateIn(document.querySelector('#local-search .search-dialog'), 'titleScale 0.5s');
    setTimeout(function () {
      document.querySelector('#local-search-input input').focus();
    }, 100);

    if (!loadFlag) {
      search();
      loadFlag = true;
    } // shortcut: ESC


    document.addEventListener('keydown', function f(event) {
      if (event.code === 'Escape') {
        closeSearch();
        document.removeEventListener('keydown', f);
      }
    });
  };

  var closeSearch = function closeSearch() {
    var bodyStyle = document.body.style;
    bodyStyle.width = '';
    bodyStyle.overflow = '';
    acy.animateOut(document.querySelector('#local-search .search-dialog'), 'search_close .5s');
    acy.animateOut($searchMask, 'to_hide 0.5s');
  };

  var searchClickFn = function searchClickFn() {
    document.querySelector('#search-button > .search').addEventListener('click', openSearch);
  };

  var searchClickFnOnce = function searchClickFnOnce() {
    document.querySelector('#local-search .search-close-button').addEventListener('click', closeSearch);
    $searchMask.addEventListener('click', closeSearch);
    if (GLOBAL_CONFIG.localSearch.preload) dataObj = fetchData(GLOBAL_CONFIG.localSearch.path);
  }; // check url is json or not


  var isJson = function isJson(url) {
    var reg = /\.json$/;
    return reg.test(url);
  };

  var fetchData = function fetchData(path) {
    var data, response, res, t, a, $loadDataItem;
    return regeneratorRuntime.async(function fetchData$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = [];
            _context.next = 3;
            return regeneratorRuntime.awrap(fetch(path));

          case 3:
            response = _context.sent;

            if (!isJson(path)) {
              _context.next = 10;
              break;
            }

            _context.next = 7;
            return regeneratorRuntime.awrap(response.json());

          case 7:
            data = _context.sent;
            _context.next = 20;
            break;

          case 10:
            _context.next = 12;
            return regeneratorRuntime.awrap(response.text());

          case 12:
            res = _context.sent;
            _context.next = 15;
            return regeneratorRuntime.awrap(new window.DOMParser().parseFromString(res, 'text/xml'));

          case 15:
            t = _context.sent;
            _context.next = 18;
            return regeneratorRuntime.awrap(t);

          case 18:
            a = _context.sent;
            data = _toConsumableArray(a.querySelectorAll('entry')).map(function (item) {
              return {
                title: item.querySelector('title').textContent,
                content: item.querySelector('content') && item.querySelector('content').textContent,
                url: item.querySelector('url').textContent,
                tags: item.querySelector('tags') && item.querySelector('tags').textContent
              };
            });

          case 20:
            if (response.ok) {
              $loadDataItem = document.getElementById('loading-database');
              $loadDataItem.nextElementSibling.style.display = 'block';
              $loadDataItem.remove();
            }

            return _context.abrupt("return", data);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  var search = function search() {
    if (!GLOBAL_CONFIG.localSearch.preload) {
      dataObj = fetchData(GLOBAL_CONFIG.localSearch.path);
    }

    var $input = document.querySelector('#local-search-input input');
    var $resultContent = document.getElementById('local-search-results');
    var $loadingStatus = document.getElementById('loading-status');
    $input.addEventListener('input', function () {
      var _this = this;

      var keywords = this.value.trim().toLowerCase().split(/[\s]+/);
      if (keywords[0] !== '') $loadingStatus.innerHTML = '<i class="fas fa-spinner fa-pulse"></i>';else {
        $resultContent.innerHTML = '';
        return;
      }
      var str = '<div class="search-result-list">';
      if (keywords.length <= 0) return;
      var count = 0; // perform local searching

      dataObj.then(function (data) {
        data.forEach(function (data) {
          var isMatch = true;
          var dataTitle = data.title ? data.title.trim().toLowerCase() : '';
          var dataContent = data.content ? data.content.trim().replace(/<[^>]+>/g, '').toLowerCase() : '';
          var dataUrl = data.url.startsWith('/') ? data.url : GLOBAL_CONFIG.root + data.url;
          var dataTags = data.tags ? data.tags : '';
          var indexTitle = -1;
          var indexContent = -1;
          var firstOccur = -1;
          var indexTag = -1; //- +++添加标签定位变量

          var l_keywords = keywords[0].toString().split('').length; //- 获取搜索关键词的长度
          // only match articles with not empty titles and contents

          if (dataTitle !== '' || dataContent !== '') {
            keywords.forEach(function (keyword, i) {
              if (keywords[0][0] === '#' && l_keywords > 1 && keywords[0][1] !== '#') {
                //- 最后一个判断条件修复了正文中'##'无法搜索的问题
                //如果关键词第一个字符是#且长度大于1，那么进行tag搜索
                keyword = keyword.substring(1); // 将关键词第一个#去掉后再匹配
                //- 定义dataTags0的意义：去掉tags里面的网页标签代码，否则会把网页标签里面的代码（非正文内容）也匹配

                var dataTags0 = '';

                for (var _i = 0; _i < dataTags.length; _i++) {
                  dataTags0 = dataTags0.concat(dataTags[_i].replace(/<[^>]+>/g, ''));
                }

                dataTags0 = dataTags0.trim().toLowerCase();
                indexTag = dataTags0.indexOf(keyword);

                if (indexTag < 0) {
                  isMatch = false;
                } else {
                  firstOccur = 0;
                }
              } else {
                indexTitle = dataTitle.indexOf(keyword);
                indexContent = dataContent.indexOf(keyword);

                if (indexTitle < 0 && indexContent < 0) {
                  isMatch = false;
                } else {
                  if (indexContent < 0) {
                    indexContent = 0;
                  }

                  if (i === 0) {
                    firstOccur = indexContent;
                  }
                }
              }
            });
          } else {
            isMatch = false;
          } // show search results


          if (isMatch) {
            if (firstOccur >= 0) {
              // cut out 130 characters
              // let start = firstOccur - 30 < 0 ? 0 : firstOccur - 30
              // let end = firstOccur + 50 > dataContent.length ? dataContent.length : firstOccur + 50
              var start = firstOccur - 30;
              var end = firstOccur + 100;
              var pre = '';
              var post = '';

              if (start < 0) {
                start = 0;
              }

              if (start === 0) {
                end = 100;
              } else {
                pre = '...';
              }

              if (end > dataContent.length) {
                end = dataContent.length;
              } else {
                post = '...';
              }

              var matchContent = dataContent.substring(start, end); // highlight all keywords

              keywords.forEach(function (keyword) {
                if (keyword[0] === '#' && keyword.length > 1) {
                  keyword = keyword.substring(1);
                }

                matchContent = matchContent.replaceAll(keyword, '<span class="search-keyword">' + keyword + '</span>');
                dataTitle = dataTitle.replaceAll(keyword, '<span class="search-keyword">' + keyword + '</span>');
              });
              str += '<div class="local-search__hit-item"><a href="' + dataUrl + '" class="search-result-title" target="_blank">' + dataTitle + '</a>';
              count += 1;

              if (dataContent !== '') {
                //- 自定义开始：生成的搜索结果框里，加入显示tags
                var splitT = ''; //- 第一步：下面是去掉dataTags里非汉字和字母（数字）的部分，然后用两个汉字分号'；；'把各个tags分隔开（保存在spliT变量里）

                var space = 1;

                for (var i = 0; i < dataTags.length; i++) {
                  if (/\S/.test(dataTags[i])) {
                    // \S 匹配Unicode非空白
                    space = 0;
                    splitT = splitT.concat(dataTags[i]);
                  } else {
                    if (space === 0) {
                      splitT = splitT + '；；';
                      space = 1;
                    }
                  }
                } //去掉splitT末尾的双分号；；，将字母变为小写


                for (var _i2 = 0; _i2 < splitT.length; _i2++) {
                  var l = splitT.length;

                  if (splitT[l - 1] == '；' && l > 1) {
                    splitT = splitT.substring(0, l - 2);
                  }

                  splitT = splitT.trim().toLowerCase();
                } //- 第二步： highlight all keywords


                keywords.forEach(function (keyword) {
                  if (keyword[0] === '#' & keyword.length > 1) {
                    keyword = keyword.substring(1); // 如果第一个字符为#且长度大于1，将关键词第一个#去掉后再匹配
                  }

                  splitT = splitT.replaceAll(keyword, '<span class="search-keyword">' + keyword + '</span>');
                }); //- 第三步：由于第一步产生的为纯文本且包括双分号，此步骤去掉分号且加上fas fa-tag、控制字体（保存在splitTags里）

                var splitTags = '<br/><i class="fas fa-tag"><span style="font-family:times">';
                space = 1;

                for (var _i3 = 0; _i3 < splitT.length; _i3++) {
                  if (splitT[_i3] !== '；') {
                    space = 0;
                    splitTags = splitTags.concat(splitT[_i3]);
                  } else {
                    if (space === 0) {
                      splitTags = splitTags + '</span></i>&nbsp &nbsp<i class="fas fa-tag"><span style="font-family:times">';
                      space = 1;
                    }
                  }
                }

                splitTags = splitTags + '</span></i>';
                post = splitT !== '' ? post + splitTags : post; //- 自定义结束

                str += '<p class="search-result">' + pre + matchContent + post + '</p>';
              }
            }

            str += '</a></div>';
          }
        });

        if (count === 0) {
          str += '<div id="local-search__hits-empty">' + GLOBAL_CONFIG.localSearch.languages.hits_empty.replace(/\$\{query}/, _this.value.trim()) + '</div>';
        }

        str += '</div>';
        $resultContent.innerHTML = str;
        if (keywords[0] !== '') $loadingStatus.innerHTML = '';
        window.pjax && window.pjax.refresh($resultContent);
      });
    });
  };

  searchClickFn();
  searchClickFnOnce(); // pjax

  window.addEventListener('pjax:complete', function () {
    !acy.isHidden($searchMask) && closeSearch();
    searchClickFn();
  });
});