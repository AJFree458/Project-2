/* eslint-disable indent */
require('dotenv').config()
var express = require('express')

var app = express()
var PORT = process.env.PORT || 8080

// Require models for sync
var db = require('./models')

// Data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Static directory
app.use(express.static('public'))

// Load routes files
// =============================================================
require('./routes/htmlRoutes.js')(app)
require('./routes/apiRoutes.js')(app)

// run Sync to synchronize models then start express
db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log('App listening on PORT ' + PORT)
    })
})