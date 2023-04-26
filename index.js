const PORT=8000
const express = require('express')
const cheerio=require('cheerio')
const axios=require('axios')

const app = express()

app.get('/', (req, res) => {
    res.json({msg: 'Welcome to the API'})
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))