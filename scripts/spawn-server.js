const cy = require('cypress')
const build = require('./build-test')
const server = require('../e2e/server')

build(function(){
    server()
    cy.open()
    
})

