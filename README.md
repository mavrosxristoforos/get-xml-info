# get-xml-info
 Get Information from XML files to use into your GitHub workflows

## Inputs

### `xml-file`

**Required** The path of the XML file to parse. Default `"test.xml"`.

### `xpath`

**Required** The xpath of the nodes from which you want to retrieve information. Default `"//element"`.

### `allow-zero-nodes`

**Optional** Finding zero nodes is not an error. Default `false`.

## Example usage

    uses: mavrosxristoforos/get-xml-info@1.0
      with:
        xml-file: 'yourfile.xml'
        xpath: '//element'

## Console usage

    node index.js -f path/to/xmlfile -p //element
    
You can also add -d for debug output.

    node index.js -f path/to/file.xml -p //element -d

## Attributes

Since version 1.1.0, you can now also read attributes. Example:

    //element/@version

## Namespaces

Namespaces are currently not supported, so you can use the `local-name()` XPath function instead. Example: 

    //*[local-name()='project']/*[local-name()='version']

## Outputs

### `info`

The content of the matched nodes. If your XPath matches more than one nodes, the output is an array.

## Example usage of output in a workflow

    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
        - name: Checkout
        uses: actions/checkout@v1
        - name: Get XML
          id: getxml
          uses: mavrosxristoforos/get-xml-info@1.0
          with:
            xml-file: 'a-file-here.xml'
            xpath: '//version'
        - name: Create Release
          uses: some-random/release-action@v1
          with:
            artifacts: 'another-file.zip'
            tag: ${{ steps.getxml.outputs.info }}
