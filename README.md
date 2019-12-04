# get-xml-info
 Get Information from XML files to use into your GitHub workflows

## Inputs

### `xml-file`

**Required** The path of the XML file to parse. Default `"test.xml"`.

### `xpath`

**Required** The xpath of the nodes from which you want to retrieve information. Default `"//element"`.

## Example usage

    uses: mavrosxristoforos/get-xml-info@1.0
      with:
        xml-file: 'yourfile.xml'
        xpath: '//element'

## Console usage

    node index.js -f path/to/xmlfile -p //element

## Outputs

### `info`

The content of the matched nodes. If your XPath matches more than one nodes, the output is an array.
