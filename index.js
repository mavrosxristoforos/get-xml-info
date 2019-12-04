const core = require('@actions/core');
const fs = require('fs');

try {
  console.log('Welcome to Get-XML-Version.')
    
  var argv = require('minimist')(process.argv.slice(2));
  var xmlFile = (typeof argv.f !== 'undefined') ? argv.f : process.env.GITHUB_WORKSPACE+'/'+core.getInput('xml-file', { required: true });

  console.log(xmlFile);

} catch (error) {
  core.setFailed(error.message);
}