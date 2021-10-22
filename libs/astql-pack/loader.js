const detectParser = require("./detectParser");
const loadParser = require("./loadParser");
let counter = 1;
module.exports = async function loader(src, options){
  const logger = this.getLogger('astql');
  // logger.info();
  const parserID = detectParser(this.resourcePath, src)
  const parserConfig = await loadParser(parserID);
  if(this.resourcePath === __dirname + '/requires.js'){
    return src
  }

  if(parserConfig.parsers && parserConfig.parsers.length >= 1){
    const parserName = parserConfig.detectParser(src, this.resourcePath);
    if(!parserName){
      return ''
    }
    console.log('running loader', this.resourcePath)
    const path = this.resourcePath.replace(this.query.projectPath, '');
    const parser = require(`@astql/${parserID}/${parserName}`)
    const ast = parser.parse(src);
    const fileName = this.resourcePath.split('/').pop();
    // console.log('http://localhost:8080/assets'+this.resourcePath+'.json')
    return `
    if (module.hot){
      module.hot.accept()
    }
    const ast = ${JSON.stringify(ast, null, 2)}
    document.body.innerHTML = document.body.innerHTML + \`
     <details>
    <summary>
    ${path}</summary>
    \${JSON.stringify(ast, null, 2)}
    </details>
  \`;
    window.files['${path}'] = ast
    `
  }
  return ''
}