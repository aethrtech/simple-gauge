module.exports = function(callback){

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

    async function build(){

        try {
            await bundler.bundle()
            callback()
        } catch(err){
            console.error(`\u001b[31m${err}\u001b[0m`)
        }
    }

    build()

}