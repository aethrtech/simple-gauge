const ts = require('typescript')

module.exports = function compile(source, options) {
    let result = ts.transpileModule(source, options);
      
}