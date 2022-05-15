const request = require('request')

// Implementing callback
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address 
    + '.json?limit=1&proximity=ip&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1Ijoic2xlZTkwNSIsImEiOiJjbDM1ejFhOG8wN2R4M2NudmdpYjZtbzQ4In0.SL-ZdED9rIn9XA7p2W-xPA'

    request({ url, json: true }, (error,{body}) => {
        if (error){
            callback('Unable to connect to geocoding service!', undefined)

        } else if ( body.features.length === 0 ) {
            callback('Unable to find location. Try to find different search term.', undefined)

        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode