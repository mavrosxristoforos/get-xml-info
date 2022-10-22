const core = require('@actions/core');
const fs = require('fs');

try {
  console.log('Welcome to Get-XML-Version.')
    
  var argv = require('minimist')(process.argv.slice(2));
  var xmlFile = (typeof argv.f !== 'undefined') ? argv.f : process.env.GITHUB_WORKSPACE+'/'+core.getInput('xml-file', { required: true });
  var xpathToSearch = (typeof argv.p !== 'undefined') ? argv.p : core.getInput('xpath', { required: true });
  var debug = (typeof argv.d !== 'undefined') ? true : false;

  console.log(`File to read: ${xmlFile}`);
  console.log(`XPath: ${xpathToSearch}`);

  var xpath = require('xpath'), dom = require('xmldom').DOMParser
 
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

      var nodes = xpath.select(xpathToSearch, doc);
      if (debug) {
        console.log('Debug output: Nodes.');
        console.log(nodes);
      }

      console.log(`Found ${nodes.length} nodes.`);

      if (nodes.length) {
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
        core.setOutput('info', String(output));
        console.log(`Output: ${output}`);
      }
      else {
        core.setFailed('Your xpath did not return any nodes.');
      }
    }
  });
} catch (error) {
  core.setFailed(error.message);
}