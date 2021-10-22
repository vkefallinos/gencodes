const astql = require('astql');
const ts = require('typescript');
const FILENAME = 'astExplorer.ts';
let visitorKeys= {}
let getComments;
const syntaxKind = {};
for (const name of Object.keys(ts.SyntaxKind).filter((x) =>
  isNaN(parseInt(x))
)) {
  const value = ts.SyntaxKind[name];
  if (!syntaxKind[value]) {
    syntaxKind[value] = name;
  }
}
const options = {
  experimentalDecorators: true,
  jsx: true,
};
function getObjectsWithType(
  ast,
  typeKey = '_type',
  exclude = ['parent', 'next', 'prev']
) {
  const traverse = (node, result) => {
    for (const key in node) {
      if (key === typeKey && typeof node[key] === 'string') {
        if (!result[node._type]) {
          result[node._type] = new Set([]);
        }
        Object.keys(node).forEach((key) => {
          !exclude.includes(key) && result[node._type].add(key);
        });
      }
      if (node.hasOwnProperty(key) && !exclude.includes(key)) {
        if (typeof node[key] === 'object') {
          result = traverse(node[key], result);
        }
      }
    }
    return result;
  };
  const allVisitorKeys = traverse(ast, {});
  return Object.keys(allVisitorKeys).reduce((acc, key) => {
    acc[key] = Array.from(allVisitorKeys[key]);
    return acc;
  }, {});
}
function parse(code) {
  const compilerHost /*: ts.CompilerHost*/ = {
    fileExists: () => true,
    getCanonicalFileName: (filename) => filename,
    getCurrentDirectory: () => '',
    getDefaultLibFileName: () => 'lib.d.ts',
    getNewLine: () => '\n',
    getSourceFile: (filename) => {
      return ts.createSourceFile(filename, code, ts.ScriptTarget.Latest, true);
    },
    readFile: () => null,
    useCaseSensitiveFileNames: () => true,
    writeFile: () => null,
  };

  const filename = FILENAME + (options.jsx ? 'x' : '');

  const program = ts.createProgram(
    [filename],
    {
      noResolve: true,
      target: ts.ScriptTarget.Latest,
      experimentalDecorators: options.experimentalDecorators,
      experimentalAsyncFunctions: options.experimentalAsyncFunctions,
      jsx: options.jsx ? 'preserve' : undefined,
    },
    compilerHost
  );
  getComments = (node, isTrailing) => {
    if (node.parent) {
      const nodePos = isTrailing ? node.end : node.pos;
      const parentPos = isTrailing ? node.parent.end : node.parent.pos;

      if (
        node.parent.kind === ts.SyntaxKind.SourceFile ||
        nodePos !== parentPos
      ) {
        let comments = isTrailing
          ? ts.getTrailingCommentRanges(sourceFile.text, nodePos)
          : ts.getLeadingCommentRanges(sourceFile.text, nodePos);

        if (Array.isArray(comments)) {
          comments.forEach((comment) => {
            comment._type = syntaxKind[comment.kind];
            comment.text = sourceFile.text.substring(comment.pos, comment.end);
            comment.tags = ts.getJSDocTags(node).map((tag) => {
              if (tag.kind) {
                tag._type = syntaxKind[tag.kind];
              }
              return tag;
            });
          });

          return comments;
        }
      }
    }
  };
  const sourceFile = program.getSourceFile(filename);
  function update(node) {
    if (node.kind) {
      node._type = syntaxKind[node.kind];
    }
   
    for (const key in node) {
      if (node.hasOwnProperty(key) && key !== 'parent') {
        if (typeof node[key] === 'object') {
          node[key] = update(node[key]);
        }
      }
    }
    node.comments = getComments(node, false);
    return node;
  }
  update(sourceFile);
  visitorKeys = getObjectsWithType(sourceFile);
  return sourceFile;
}


const query = (ast, selector) => {
  return astql(ast, selector, {
    visitorKeys,
  });
};
module.exports = {
  parse,
  query
}