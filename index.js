var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var passport = require('passport')
const cron = require('node-cron');
const db = require('./config/keys')

var app = express();

const slots = require('./routes/slots')
const users = require('./routes/users')
mongoose.connect(db.MongoURL, {useUnifiedTopology: true, useNewUrlParser: true}).catch((err) => {
    console.log(err)
})

mongoose.connection.on('connected', () => console.log('db connected'))
// require('./config/passport')(passport)    

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/slots', slots);
app.use('/users', users);

app.use((err, req, res, next) => {
    res.status(400);
    res.json({
        code: 400,
        error: err.toString()
    })
})

cron.schedule('* * * * *', async () => {

})


app.listen(3000);