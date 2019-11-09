module.exports = function(){
    const http = require('http'),
    fs = require('fs'),
    options = {
        host:'localhost',
        port:8080
    },
    { resolve } = require('path')

    http.createServer(function(req,res){
        switch(req.url){
            case '/':
                res.setHeader('Content-Type','text/html')
                var rs = fs.createReadStream(resolve('e2e','./index.html'))
                .pipe(res)
                break
            case '/index.js':
                    res.setHeader('Content-Type','text/javascript')
                    var rs = fs.createReadStream(resolve('e2e','scripts','index.js'))
                    .pipe(res)
                break
            case './index.js.map':
                    res.setHeader('Content-Type','text/pain')
                    var rs = fs.createReadStream(resolve('e2e','scripts','index.js.map'))
                    .pipe(res)

        }
    

    }).listen(8080)
}
