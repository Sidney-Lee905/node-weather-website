const request = require('request')

// The forecast function should have three potential calls to callback:
//  - Low level error, pass string for error
//  - Coordinate error, pass string for error
//  - Success, pass forecast string for data (same format as from before)

const forecast = ( latitude, longitude, callback) => {

    const url='http://api.weatherstack.com/current?access_key=b5d68ca458bcdcd11adce1a16c0951ad&query='
    + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, ( error, {body} )  => {
        if (error){
            callback('Unable to connect to weather service!', undefined)

        } else if (body.error) {
            callback('Unable to find location', undefined)

        } else {
            callback( undefined, body.current.weather_descriptions[0] 
                            + '. It is currently ' 
                            + body.current.temperature + 
                            ' degrees out. It feels like ' + body.current.feelslike 
                            + ' degress out.')
        }
    })
}

module.exports = forecast