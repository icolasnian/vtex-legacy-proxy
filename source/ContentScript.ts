/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable func-names */

chrome.runtime.onMessage.addListener(function (request) {
  console.log(
    `%cVTEX Legacy Proxy %c| Rule applied: %c${request.name}`,
    'color: #e31c58;',
    'color: #fffff;',
    'color: #bada55;'
  );
});
