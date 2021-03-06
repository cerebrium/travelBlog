require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')

// instatiate app
const app = express();

// middleware
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(express.static(__dirname + '/client/public'));

// starting up mongo FOR DATABASE
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.once('open', () => {
    console.log(`connected to the database on port: ${db.port} and host: ${db.host}`)
})
db.on('error', (err) => {
    console.log(`Database Error: \n${err}`)
})

// mount all of my routes at their prefixes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/comment', require('./routes/comment'))
app.get('*', function(req, res) {
	res.sendFile(__dirname + '/client/public/index.html');
});

// get the server listening on its port
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})