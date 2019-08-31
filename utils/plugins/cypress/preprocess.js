const ts = require('typescript'),
writeFileSync = require('fs').writeFile

module.exports = function compile(source, options) {
    let result = ts.transpileModule(source, options);
    writeFileSync(source.replace('.ts','.js'),result)
      
}