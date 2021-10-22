// import defaultParserInterface from './utils/defaultESTreeParserInterface';
// import pkg from 'babylon5/package.json';

const ID = 'babylon';

module.exports = {
  // ...defaultParserInterface,

  id: ID,
  displayName: ID,
  // version: pkg.version,
  // homepage: pkg.homepage,
  locationProps: new Set(['loc', 'start', 'end']),
  showInMenu: false,
  visitorKeys: {
    File: ['program'],
    AssignmentExpression: ['left', 'right'],
    AssignmentPattern: ['left', 'right'],
    ArrayExpression: ['elements'],
    ArrayPattern: ['elements'],
    ArrowFunctionExpression: ['params', 'body'],
    AwaitExpression: ['argument'], // CAUTION: It's deferred to ES7.
    BlockStatement: ['body'],
    BinaryExpression: ['left', 'right'],
    BreakStatement: ['label'],
    CallExpression: ['callee', 'arguments'],
    CatchClause: ['param', 'body'],
    ChainExpression: ['expression'],
    ClassBody: ['body'],
    ClassDeclaration: ['id', 'superClass', 'body'],
    ClassExpression: ['id', 'superClass', 'body'],
    ComprehensionBlock: ['left', 'right'],  // CAUTION: It's deferred to ES7.
    ComprehensionExpression: ['blocks', 'filter', 'body'],  // CAUTION: It's deferred to ES7.
    ConditionalExpression: ['test', 'consequent', 'alternate'],
    ContinueStatement: ['label'],
    DebuggerStatement: [],
    DirectiveStatement: [],
    DoWhileStatement: ['body', 'test'],
    EmptyStatement: [],
    ExportAllDeclaration: ['source'],
    ExportDefaultDeclaration: ['declaration'],
    ExportNamedDeclaration: ['declaration', 'specifiers', 'source'],
    ExportSpecifier: ['exported', 'local'],
    ExpressionStatement: ['expression'],
    ForStatement: ['init', 'test', 'update', 'body'],
    ForInStatement: ['left', 'right', 'body'],
    ForOfStatement: ['left', 'right', 'body'],
    FunctionDeclaration: ['id', 'params', 'body'],
    FunctionExpression: ['id', 'params', 'body'],
    GeneratorExpression: ['blocks', 'filter', 'body'],  // CAUTION: It's deferred to ES7.
    Identifier: [],
    IfStatement: ['test', 'consequent', 'alternate'],
    ImportExpression: ['source'],
    ImportDeclaration: ['specifiers', 'source'],
    ImportDefaultSpecifier: ['local'],
    ImportNamespaceSpecifier: ['local'],
    ImportSpecifier: ['imported', 'local'],
    Literal: [],
    LabeledStatement: ['label', 'body'],
    LogicalExpression: ['left', 'right'],
    MemberExpression: ['object', 'property'],
    MetaProperty: ['meta', 'property'],
    MethodDefinition: ['key', 'value'],
    ModuleSpecifier: [],
    NewExpression: ['callee', 'arguments'],
    ObjectExpression: ['properties'],
    ObjectPattern: ['properties'],
    Program: ['body'],
    Property: ['key', 'value'],
    RestElement: [ 'argument' ],
    ReturnStatement: ['argument'],
    SequenceExpression: ['expressions'],
    SpreadElement: ['argument'],
    Super: [],
    SwitchStatement: ['discriminant', 'cases'],
    SwitchCase: ['test', 'consequent'],
    TaggedTemplateExpression: ['tag', 'quasi'],
    TemplateElement: [],
    TemplateLiteral: ['quasis', 'expressions'],
    ThisExpression: [],
    ThrowStatement: ['argument'],
    TryStatement: ['block', 'handler', 'finalizer'],
    UnaryExpression: ['argument'],
    UpdateExpression: ['argument'],
    VariableDeclaration: ['declarations'],
    VariableDeclarator: ['id', 'init'],
    WhileStatement: ['test', 'body'],
    WithStatement: ['object', 'body'],
    YieldExpression: ['argument']
  },
  loadParser(callback) {
    require(['babylon5'], callback);
  },

  parse(code, parserSettings) {
    const babylon = require('babylon');

    return babylon.parse(code, this.getDefaultOptions());
  },

  getNodeName(node) {
    switch (typeof node.type) {
      case 'string':
        return node.type;
      case 'object':
        return `Token (${node.type.label})`;
    }
  },

  nodeToRange(node) {
    if (typeof node.start !== 'undefined') {
      return [node.start, node.end];
    }
  },

  getDefaultOptions() {
    return {
      sourceType: 'module',
      allowReserved: false,
      allowReturnOutsideFunction: false,
      strictMode: false,
      tokens: false,

      features: {
        'es7.asyncFunctions': true,
        'es7.classProperties': true,
        'es7.comprehensions': true,
        'es7.decorators': true,
        'es7.exportExtensions': true,
        'es7.functionBind': true,
        'es7.objectRestSpread': true,
        'es7.trailingFunctionCommas': true,
      },

      // plugins: { jsx: true, flow: true },
    };
  },

  _getSettingsConfiguration(defaultOptions) {
    return {
      fields: [
        ['sourceType', ['module', 'script']],
        'allowReserved',
        'allowReturnOutsideFunction',
        'strictMode',
        'tokens',
        {
          key: 'features',
          title: 'Features',
          fields: Object.keys(defaultOptions.features),
          settings: settings => settings.features || {...defaultOptions.features},
        },
        {
          key: 'plugins',
          title: 'Plugins',
          fields: Object.keys(defaultOptions.plugins),
          settings: settings => settings.plugins || {...defaultOptions.plugins},
          values: plugins => Object.keys(defaultOptions.plugins).reduce(
            (obj, name) => ((obj[name] = name in plugins), obj),
            {},
          ),
          update: (plugins, name, value) => {
            if (value) {
              return {...plugins, [name]: true};
            }
            plugins = {...plugins};
            delete plugins[name];
            return plugins;
          },
        },
      ],
    };
  },

  _ignoredProperties: new Set([
    '__clone',
  ]),

};
