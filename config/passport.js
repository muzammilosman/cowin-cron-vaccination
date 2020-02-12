const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')


const User = require('../models/User')

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password ,done) => {
            User.findOne({email: email}).then(
                user => {
                    if(!user) {
                       return done(null, false, { message: 'User not registered'})
                    }
                    
                    // Match Password
                    
                    bcrypt.compare(password, user.password, (err,isMatch) => {
                        if(err) throw err

                        if(isMatch){
                            return done(null, user)
                        } else {
                            return done(null, false, { message: "Incorrect passport" })
                        }
                    })
                }
            ).catch( err => console.log("Database error", err))
        })
    )

    //Cookie config using user id
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id,(err,user) => {
            done(err, user)
        })
    })
}