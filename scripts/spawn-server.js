const { resolve } = require('path')

const cy = require('cypress')
const build = require('./build')
const server = require('../e2e/server')

build(function(){
    cy.open()
    server()
})

