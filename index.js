const PORT=8000
const express = require('express')
const cheerio=require('cheerio')
const axios=require('axios')

const app = express()

app.get('/', (req, res) => {
    res.json({msg: 'Welcome to the API'})
})

app.get('/news', (req, res) => {
    axios.get('https://www.thehindu.com/news/')
    .then(response => {
        const html=response.data
        const $=cheerio.load(html)

        $('a:container("climate")') // looks out for any "a" tag with the word "climate" in it
    })
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))