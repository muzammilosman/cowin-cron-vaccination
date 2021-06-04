const express = require('express');
const router = express.Router();
const {fetchVaccineDataByDistrict, fetchStates, fetchDistricts} = require('../controllers/cowin')

router.get('/appointments', async (req, res, next) => {
    try {
        if(req.query.district_id && req.query.date){
            const slots = await fetchVaccineDataByDistrict(req)
            if(slots){
                res.json(slots);
            }
        } else {
            next('Invalid query params')
        }
    } catch(error){
        next(error);
    }
})

router.get('/states', async (req, res, next) => {
    try {
        const states = await fetchStates()
        console.log(states)
        res.json(states)
    } catch(error) {
        next(error);
    }
})

router.get('/districts/:state_id', async (req, res, next) => {
    const state_id = req.params.state_id
    try {
        if(state_id){
            const districts = await fetchDistricts(state_id)
            res.json(districts)
        }
    } catch(error) {
        next(error)
    }
})

module.exports = router;