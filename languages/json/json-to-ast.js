import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'json-to-ast/package.json';

const ID = 'jsonToAst';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['loc']),
  visitorKeys: {
    Object: ['children'],
    Property: ['key', 'value']
  },
  loadParser(callback) {
    require(['json-to-ast'], (parse)=>{
      console.log(parse)
      callback({parse})
    });
  },

  parse(jsonToAst, code) {
    return jsonToAst(code);
  },

  nodeToRange({loc}) {
    if (loc) {
      return [
        loc.start.offset,
        loc.end.offset,
      ];
    }
  },
}
