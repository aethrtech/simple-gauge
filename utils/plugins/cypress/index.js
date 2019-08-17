const preprocess = require('./preprocess'),
options = require('./config.json')

module.exports = function PreProcess(on, config){
    on('file:preprocessor', async file => preprocess(file,options))
}