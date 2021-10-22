// import defaultParserInterface from './utils/defaultCSSParserInterface';
// import pkg from 'css/package.json';

// const ID = 'rework';

// export default {
//   ...defaultParserInterface,

//   id: ID,
//   displayName: ID,
//   version: pkg.version,
//   homepage: pkg.homepage || 'https://github.com/reworkcss/rework',
//   locationProps: new Set(['position']),

//   loadParser(callback) {
//     require(['css/lib/parse'], (parse)=>{
//       callback({parse: (code)=>{return defaultParserInterface.parse(parse, code)}})
//     });
//   },

//   nodeToRange({ position: range }) {
//     console.log(range)
//     if (!range) return;
//     return [range.start, range.end].map(pos => this.getOffset(pos));
//   },

//   opensByDefault(node, key) {
//     return key === 'rules';
//   },

//   _ignoredProperties: new Set(['parsingErrors', 'source', 'content']),
// };
