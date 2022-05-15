const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//using handlerbars to render index page
app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Sidney Lee'
        
    })
})

app.get('/weather', (req,res)=>{
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            console.log(location)
            console.log(forecastData)
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About',
        name: 'Sidney Lee'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Sidney Lee'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sidney Lee',
        errorMessage: 'Help article not found.',
    })
})

// Setup 404 page, location important to come after others
app.get('*', (req, res)=> {
    res.render('404', {
        title: '404',
        name: 'Sidney Lee',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on ' + port + '!')
})