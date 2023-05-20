"use strict";

window.addEventListener('load', function () {
  var openSearch = function openSearch() {
    var bodyStyle = document.body.style;
    bodyStyle.width = '100%';
    bodyStyle.overflow = 'hidden';
    acy.animateIn(document.getElementById('search-mask'), 'to_show 0.5s');
    acy.animateIn(document.querySelector('#algolia-search .search-dialog'), 'titleScale 0.5s');
    setTimeout(function () {
      document.querySelector('#algolia-search .ais-SearchBox-input').focus();
    }, 100); // shortcut: ESC

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
    acy.animateOut(document.querySelector('#algolia-search .search-dialog'), 'search_close .5s');
    acy.animateOut(document.getElementById('search-mask'), 'to_hide 0.5s');
  };

  var searchClickFn = function searchClickFn() {
    document.querySelector('#search-button > .search').addEventListener('click', openSearch);
  };

  var searchClickFnOnce = function searchClickFnOnce() {
    document.getElementById('search-mask').addEventListener('click', closeSearch);
    document.querySelector('#algolia-search .search-close-button').addEventListener('click', closeSearch);
  };

  var cutContent = function cutContent(content) {
    if (content === '') return '';
    var firstOccur = content.indexOf('<mark>');
    var start = firstOccur - 30;
    var end = firstOccur + 120;
    var pre = '';
    var post = '';

    if (start <= 0) {
      start = 0;
      end = 140;
    } else {
      pre = '...';
    }

    if (end > content.length) {
      end = content.length;
    } else {
      post = '...';
    }

    var matchContent = pre + content.substring(start, end) + post;
    return matchContent;
  };

  var algolia = GLOBAL_CONFIG.algolia;
  var isAlgoliaValid = algolia.appId && algolia.apiKey && algolia.indexName;

  if (!isAlgoliaValid) {
    return console.error('Algolia setting is invalid!');
  }

  var search = instantsearch({
    indexName: algolia.indexName,
    searchClient: algoliasearch(algolia.appId, algolia.apiKey),
    searchFunction: function searchFunction(helper) {
      helper.state.query && helper.search();
    }
  });
  var configure = instantsearch.widgets.configure({
    hitsPerPage: 5
  });
  var searchBox = instantsearch.widgets.searchBox({
    container: '#algolia-search-input',
    showReset: false,
    showSubmit: false,
    placeholder: GLOBAL_CONFIG.algolia.languages.input_placeholder,
    showLoadingIndicator: true
  });
  var hits = instantsearch.widgets.hits({
    container: '#algolia-hits',
    templates: {
      item: function item(data) {
        var link = data.permalink ? data.permalink : GLOBAL_CONFIG.root + data.path;
        var result = data._highlightResult;
        var content = result.contentStripTruncate ? cutContent(result.contentStripTruncate.value) : result.contentStrip ? cutContent(result.contentStrip.value) : result.content ? cutContent(result.content.value) : '';
        return "\n          <a href=\"".concat(link, "\" class=\"algolia-hit-item-link\">\n          ").concat(result.title.value || 'no-title', "\n          </a>\n          <p class=\"algolia-hit-item-content\">").concat(content, "</p>");
      },
      empty: function empty(data) {
        return '<div id="algolia-hits-empty">' + GLOBAL_CONFIG.algolia.languages.hits_empty.replace(/\$\{query}/, data.query) + '</div>';
      }
    }
  });
  var stats = instantsearch.widgets.stats({
    container: '#algolia-info > .algolia-stats',
    templates: {
      text: function text(data) {
        var stats = GLOBAL_CONFIG.algolia.languages.hits_stats.replace(/\$\{hits}/, data.nbHits).replace(/\$\{time}/, data.processingTimeMS);
        return "<hr>".concat(stats);
      }
    }
  });
  var powerBy = instantsearch.widgets.poweredBy({
    container: '#algolia-info > .algolia-poweredBy'
  });
  var pagination = instantsearch.widgets.pagination({
    container: '#algolia-pagination',
    totalPages: 5,
    templates: {
      first: '<i class="fas fa-angle-double-left"></i>',
      last: '<i class="fas fa-angle-double-right"></i>',
      previous: '<i class="fas fa-angle-left"></i>',
      next: '<i class="fas fa-angle-right"></i>'
    }
  });
  search.addWidgets([configure, searchBox, hits, stats, powerBy, pagination]); // add the widgets to the instantsearch instance

  search.start();
  searchClickFn();
  searchClickFnOnce();
  window.addEventListener('pjax:complete', function () {
    getComputedStyle(document.querySelector('#algolia-search .search-dialog')).display === 'block' && closeSearch();
    searchClickFn();
  });
  window.pjax && search.on('render', function () {
    window.pjax.refresh(document.getElementById('algolia-hits'));
  });
});