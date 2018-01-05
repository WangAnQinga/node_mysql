let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let path = require('path');
let route = require('./route/route.js')
let port = process.env.PORT || 9999;

let app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.use(session({
//     secret: 'fuck',
//     cookie: {maxAge: 3600000},
//     resave: true,
//     saveUninitialized: true,
// }));



app.use(route)
app.listen(port, () => {
    console.log(`devServer start on port:${ port}`);
})