module.exports = function(callback){
    const http = require('http'),
    fs = require('fs'),
    { resolve } = require('path')
    // html = fs.createReadStream(resolve('e2e','./index.html'))

    let streams = {}

    for (let file of fs.readdirSync(resolve('e2e','scripts'))){
        if (file.match(/^.+\.js$/) && !file.match(/worker.+js/)){
            streams['/scripts/' + file] = resolve('e2e','scripts',file)
        } else {
            streams['/' + file] = resolve('e2e','scripts',file)
        }
    }

    streams['/modules/worker.ts'] = resolve('src','modules','worker.ts')

    http.createServer(async function(req,res){
        if (req.url === '/') {
            res.setHeader('Content-Type','text/html')
            return fs.createReadStream(resolve('e2e','./index.html')).pipe(res)
        }
        if (req.url === '/favicon.ico'){
            res.statusCode = 404
            return res.end()
        }
        if (req.url.match(/^.+\.(js|ts)$/)){
            res.setHeader('Content-Type','application/javascript')
        } else {
            res.setHeader('Content-Type','application/json')
        }
        return fs.createReadStream(streams[req.url]).pipe(res)
        
    }).listen(8080)

    callback()
}
