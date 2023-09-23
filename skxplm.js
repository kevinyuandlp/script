// ==UserScript==
// @name         SKX PLM
// @namespace    http://xxxxx.net/
// @version      0.2
// @description  try to take over the world!
// @author       You

// @match        https://skechers-prod.ptcmscloud.com/Windchill/rfa/jsp/main/Main.jsp
// @match        https://skechers-prod.ptcmscloud.com/Windchill/rfa/jsp/main/Main.jsp?*

// @icon         https://www.google.com/s2/favicons?sz=64&domain=ptcmscloud.com
// @grant        none
// ==/UserScript==
'use strict';

var myModule = (function() {

function myFunction() {

var tdElements = document.getElementsByTagName('td');

for (var i = 0; i < tdElements.length; i++) {
  var style = tdElements[i].getAttribute('style');
  if (style === 'table-layout:fixed;word-wrap: break-all;width:40px;'
   || style === 'table-layout:fixed;word-wrap: break-all;width:50px;') {
    tdElements[i].setAttribute('style', ' ');
  }
}

var sortBy1Input = document.getElementsByName('sortBy1')[0];
if (sortBy1Input) {
  var value = sortBy1Input.value;
  sortBy1Input.value = 'LCSSample.modifyStampA2:DESC';
}

function replaceGMT() {
  //const gmtPattern = /\d{1,2}:\d{2} [AP]M (PDT|PST|GMT)/g;
  const gmtPattern = /\d{2}\/\d{2}\/\d{4} \d{1,2}:\d{2} [AP]M (PDT|PST|GMT)/g;
  const textNodes = getTextNodes(document.body);
  var options = {
    timeZone: 'Asia/Shanghai',
    year:     'numeric',
    month:    'numeric',
    day:      'numeric',
    hour:     'numeric',
    minute:   'numeric',
}
  textNodes.forEach(node => {
    const matches = node.nodeValue.match(gmtPattern);
    if (matches) {
      const newNode = document.createElement('span');
      let lastIndex = 0;
      matches.forEach(match => {

          const gmtDate = new Date(match);
          var chinaTime = gmtDate.toLocaleString('zh-cn', options);

          const index = node.nodeValue.indexOf(match, lastIndex);
          newNode.appendChild(document.createTextNode(node.nodeValue.substring(lastIndex, index)));
          newNode.appendChild(document.createTextNode(` ${chinaTime}`));
          lastIndex = index + match.length;
      });
      
      newNode.appendChild(document.createTextNode(node.nodeValue.substring(lastIndex)));
      node.parentNode.replaceChild(newNode, node);
    }
  });
}

function getTextNodes(node) {
  const walker = document.createTreeWalker(
    node,
    NodeFilter.SHOW_TEXT,
    { acceptNode: function(node) { return /^(?!\s*$).+/m.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; }},
    false
  );
  const textNodes = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }
  return textNodes;
}

replaceGMT();

//end

}
  return {
    myFunc: myFunction
  };
})();

myModule.myFunc();
