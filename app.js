const express = require('express')
const app = express()
const middleware = require('./middleware')
const items = require('./fakeDb')

const itemsRoutes = require('./itemsRoutes')
app.use(express.json())
app.use(middleware.logger)

app.use('/items', itemsRoutes)

/* app.get('/', (req, res) => {
    items = req.query;
    return res.json({items})
}) */

module.exports = app;