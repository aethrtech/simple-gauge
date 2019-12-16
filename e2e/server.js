module.exports = function(callback){
    const http = require('http'),
    fs = require('fs'),
    { resolve } = require('path')

    http.createServer(function(req,res){
        switch(req.url){
            case '/':
                res.setHeader('Content-Type','text/html')
                fs.createReadStream(resolve('e2e','./index.html'))
                .pipe(res)
                break
            case '/scripts/index.js':
                    res.setHeader('Content-Type','text/javascript')
                    fs.createReadStream(resolve('e2e','scripts','index.js'))
                    .pipe(res)
                break
            case '/scripts/index.js.map':
                    res.setHeader('Content-Type','application/json')
                    fs.createReadStream(resolve('e2e','scripts','index.js.map'))
                    .pipe(res)

        }

    }).listen(8080)

    callback()
}
