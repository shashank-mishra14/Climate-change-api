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
    },
    {
        name: 'The Guardian',
        address: 'https://www.theguardian.com/international',
        base:''
    },
    {
        name: 'The New York Times',
        address: 'https://www.nytimes.com/section/world',
        base:''
    },
    {
        name: 'The Washington Post',
        address: 'https://www.washingtonpost.com/world/',
        base:''
    },
    {
        name: 'The Wall Street Journal',
        address: 'https://www.wsj.com/news/world',
        base:''
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

app.get('/news/:newspaperId', async (req, res) => {
    const newspaperId=req.params.newspaperId

    const newspaperAddress=newspaper.filter(newspaper => newspaper.name == newspaperId)[0].address
    const newspaperBase=newspaper.filter(newspaper => newspaper.name == newspaperId)[0].base

    axios.get(newspaperAddress)
    .then(response => {
        const html = response.data
        const $=cheerio.load(html)
        const specificArticles=[]

        $('a:container("climate")',html).each(function () {// looks out for any "a" tag with the word "climate" in it
            const title=$(this).text()
            const url=$(this).attr('href')
            specificArticles.push({
                title,
                url:newspaperBase + url,
                source: newspaperId
            })

         })
        res.json(specificArticles)
    }).catch(err=>console.log(err))

})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))