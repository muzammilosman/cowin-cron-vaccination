const { createUser } = require('../models/User')
const router = require('express').Router()

router.post('/register', async (req, res, next) => {
    try {
        let user = req.body;
        const addedUser = await createUser(user);
        res.json(addedUser);
    } catch(error) {
        next(error);
    }
})


module.exports = router