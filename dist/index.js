/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 320:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 341:
/***/ ((module) => {

module.exports = eval("require")("@xmldom/xmldom");


/***/ }),

/***/ 122:
/***/ ((module) => {

module.exports = eval("require")("minimist");


/***/ }),

/***/ 422:
/***/ ((module) => {

module.exports = eval("require")("xpath");


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(320);
const fs = __nccwpck_require__(147);

try {
  console.log('Welcome to Get-XML-Version.')
    
  var argv = __nccwpck_require__(122)(process.argv.slice(2));
  var xmlFile = (typeof argv.f !== 'undefined') ? argv.f : process.env.GITHUB_WORKSPACE+'/'+core.getInput('xml-file', { required: true });
  var xpathToSearch = (typeof argv.p !== 'undefined') ? argv.p : core.getInput('xpath', { required: true });
  var debug = (typeof argv.d !== 'undefined') ? true : false;
  var zeroNodesAction = (typeof argv.z !== 'undefined') ? argv.z : (core.getInput('zero-nodes-action', {required: false}) || 'error')

  var namespaces = (typeof argv.n !== 'undefined') ? argv.n : (core.getInput('namespaces', {required: false}) || null)

  console.log(`File to read: ${xmlFile}`);
  console.log(`XPath: ${xpathToSearch}`);
  console.log(`Zero Nodes Action: ${zeroNodesAction}`)

  console.log(`Namespaces: ${namespaces}`)

  var xpath = __nccwpck_require__(422), dom = (__nccwpck_require__(341).DOMParser)
 
  

  fs.readFile(xmlFile, 'utf8', function read(err, data) {
    if (err) {
      core.setFailed(err.message);
    }
    else {
      console.log('File was read successfully. Proceeding to parse DOM.');
      
      var doc = new dom().parseFromString(data);
      if (debug) {
        console.log('Debug output: Document.');
        console.log(doc);
      }

      selector = xpath.select
      if (namespaces)
        selector=selector=xpath.useNamespaces(JSON.parse(namespaces));

      var nodes = selector(xpathToSearch, doc);
      if (debug) {
        console.log('Debug output: Nodes.');
        console.log(nodes);
      }

      console.log(`Found ${nodes.length} nodes.`);

      if (['silent','warn'].includes(zeroNodesAction) || nodes.length) {
        var output = [];
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          var firstChild = node.firstChild;
          if (firstChild) {
            output.push(firstChild.data);
          } else {
            output.push(node.value);
          }
        }
        if ('warn' === zeroNodesAction && 0 === nodes.length) {
          console.warn("Zero Nodes Found");
          core.setOutput('info', "Zero Nodes Found.");
        } else {
          core.setOutput('info', String(output));
          console.log(`Output: ${output}`);
        }

      } else {
        console.error('Your xpath did not return any nodes.')
        core.setFailed('Your xpath did not return any nodes.');
      }
    }
  });
} catch (error) {
  core.setFailed(error.message);
}
})();

module.exports = __webpack_exports__;
/******/ })()
;