const cy = require('cypress')
build = require('./build-test'),
server = require('../e2e/server'),

server(function(){

    build(async function(err){

        if (err) throw new Error(err)

        await cy.open()

        process.exit()        

    })
    
})

