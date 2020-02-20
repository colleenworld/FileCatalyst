'use strict'
const express = require('express')
const exphbs = require('express-handlebars')
const http = require('http')
const extract = require('./lib/extract')

let hbs = exphbs.create({
    layoutsDir: './views',
    defaultLayout: 'default',
})

let app = express()

app.set('views', './views')
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use('/css', express.static('views/css'))
app.use('/static', express.static('node_modules'))
app.use('/js', express.static('views/js'))

app.get('/', function (req, res, next) {
    res.render('default')
})

app.get('/chart', function (req, res, next) {
    const keys = req.query.key
    const result = extract({keys})
    res.json(result)
})

const server = http.createServer(app)

server.listen('8080', function () {
    console.log('UI Listening on port 8080')
})
