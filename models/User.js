
const mongoose = require('mongoose')

const SubscriptionSchema = new mongoose.Schema({
    district: {
        type: Number
    },
    ageGroup: {
        type: String,
        enum: ['18', '45', '60'],
        default: '18'
    }
})

const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        maxlength: [10, 'Invalid mobile number']
    },

    subscription: SubscriptionSchema,
    
    isActive: {
        type: Boolean,
        required: true,
        default: false
    },

    validationHash: {
        type: String
    }

})

const User = mongoose.model('User', UserSchema)

module.exports.createUser = async (user) => {
    const {email, subscription} = user;
    const newUser = new User({
        email,
        subscription,
        isActive: false,
        validationHash: ''
    })
    const savedUser = await newUser.save((err, userSaved) => {
        if(err){
            throw new Error(err)
        } else {
            return userSaved
        }
    });
    return savedUser;
}