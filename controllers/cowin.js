const cowinUrl = require('../config/keys').cowin
const { location, appointments} = require('../config/url-constants')
const https = require('https')


const fetchDataFromCowin = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            response.on('data', (res) => {
                resolve(JSON.parse(res))
            })
        }).on('error', (err) => {
            reject(err)
        })
    })
}

module.exports.fetchVaccineDataByDistrict = (req) => {
    const {district_id, date} = req.query
    const slotURL = cowinUrl + appointments.district + '?district_id=' + district_id.toString() + '&date=' + date
    const fetchSlots = fetchDataFromCowin(slotURL).then((slots) => slots)
    return fetchSlots
}

module.exports.fetchStates = () => {
    const statesUrl = cowinUrl + location.states
    const states = fetchDataFromCowin(statesUrl).then((states) => states)
    return states;
}

module.exports.fetchDistricts = (state_id) => {
    const districtUrl = cowinUrl + location.districts + state_id;
    const districts = fetchDataFromCowin(districtUrl).then((districts) => districts)
    return districts
}