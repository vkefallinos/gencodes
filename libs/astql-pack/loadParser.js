

const pkg = require('./package.json')
module.exports = async function loadParser(parser) { 

  if(pkg.dependencies['@astql/'+parser]){
    return require('@astql/'+parser)
    
  }else{
    return ()=>{}
    // throw new Error(`Install ${parser}`)
  }
}