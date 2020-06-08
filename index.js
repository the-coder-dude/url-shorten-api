const express = require('express');
const app = express();

var cors = require('cors');

require('dotenv/config');



const connectDB = require('./config/db');

connectDB();

app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {

    res.send('Shorten your URLs here only!')
})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));



app.listen(process.env.PORT, () => {

    console.log("Server has started on " + process.env.PORT)
})