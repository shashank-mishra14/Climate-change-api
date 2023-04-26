const PORT=8000
const express = require('express')
const cheerio=require('cheerio')
const axios=require('axios')

const app = express()

const articles=[]

const newspaper=[
    {
        name: 'The Hindu',
        address: 'https://www.thehindu.com/news/'
    },
    {
        name: 'The Times of India',
        address: 'https://timesofindia.indiatimes.com/'
    },
    {
        name: 'The Indian Express',
        address: 'https://indianexpress.com/',
        base: 'https://indianexpress.com/section/climate-change/'
    }
]

newspaper.forEach(newspaper => {
    axios.get(newspaper.address)
    .then(response=>
            {
                const html=response.data
                const $=cheerio.load(html)
        
                $('a:container("climate")',html).each(function () {// looks out for any "a" tag with the word "climate" in it
                    const title=$(this).text()
                    const url=$(this).attr('href')
                    articles.push({
                        title,
                        url:newspaper.base + url,
                        source: newspaper.name
                    })
                })

            })
})

app.get('/', (req, res) => {
    res.json({msg: 'Welcome to the API'})
})

app.get('/news', (req, res) => {
        res.json(articles)
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))