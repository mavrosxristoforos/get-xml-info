const core = require('@actions/core');
const fs = require('fs');

try {
  console.log('Welcome to Get-XML-Version.')
    
  var argv = require('minimist')(process.argv.slice(2));
  var xmlFile = (typeof argv.f !== 'undefined') ? argv.f : process.env.GITHUB_WORKSPACE+'/'+core.getInput('xml-file', { required: true });
  var xpathToSearch = (typeof argv.p !== 'undefined') ? argv.p : core.getInput('xpath', { required: true });
  var debug = (typeof argv.d !== 'undefined') ? true : false;
  var zeroNodesAction = (typeof argv.z !== 'undefined') ? argv.z : (core.getInput('zero-nodes-action', {required: false}) || 'error')

  var namespaces = (typeof argv.n !== 'undefined') ? argv.n : (core.getInput('namespaces', {required: false}) || null)

  console.log(`File to read: ${xmlFile}`);
  console.log(`XPath: ${xpathToSearch}`);
  console.log(`Zero Nodes Action: ${zeroNodesAction}`)

  console.log(`Namespaces: ${namespaces}`)

  var xpath = require('xpath'), dom = require('@xmldom/xmldom').DOMParser
 
  

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

      if (typeof(nodes) == 'string')
	  {
		  core.setOutput('info', nodes)
	  }
      else if (['silent','warn'].includes(zeroNodesAction) || nodes.length) {
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