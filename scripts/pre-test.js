const Bundler = require('parcel-bundler'),
{ join } = require('path'),
options = {
    outDir:join(__dirname,'../test','e2e'),
    outFile:'index.js',
    global:'SimpleGauge',
    target:'browser',
    watch:true,
    sourceMaps:true
},

entryFile = join(__dirname,'../src/modules/index.ts'),
bundler = new Bundler(entryFile,options)

async function build(){

    try {
        await bundler.bundle()
    } catch(err){
        console.error(`\u001b[31m${err}\u001b[0m`)
    }
}

build()