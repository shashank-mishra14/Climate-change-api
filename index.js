const PORT=8000
const express = require('express')
const cheerio=require('cheerio')
const axios=require('axios')

const app = express()

const articles=[]

app.get('/', (req, res) => {
    res.json({msg: 'Welcome to the API'})
})

app.get('/news', (req, res) => {
    axios.get('https://www.thehindu.com/news/')
    .then(response => {
        const html=response.data
        const $=cheerio.load(html)

        $('a:container("climate")',html).each(function () {// looks out for any "a" tag with the word "climate" in it
            const title=$(this).text()
            const url=$(this).attr('href')
            articles.push({
                title,
                url
            })
        }) 
        res.json(articles)
    }).catch((err) => console.log(err))
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))