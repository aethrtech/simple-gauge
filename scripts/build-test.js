const Bundler = require('parcel-bundler'),
{ resolve } = require('path'),

options = {
    outDir:resolve(__dirname,'..','e2e','scripts'),
    outFile:'index.js',
    global:'SimpleGauge',
    target:'browser',
    watch:true,
    sourceMaps:true
},
entryFile = resolve(__dirname,'../src/modules/index.ts'),
bundler = new Bundler(entryFile,options)


module.exports = async function(callback){

    try {
        await bundler.bundle()

    } catch (err) {
        return callback(err)
    }
    return callback()
    
}