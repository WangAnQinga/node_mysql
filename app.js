let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let path = require('path');
let route = require('./route/route.js')
let port = process.env.PORT || 9999;

let app = express();

app.set('secret', 'I_LOVE_LL')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.use(session({
//     secret: 'fuck',
//     cookie: {maxAge: 3600000},
//     resave: true,
//     saveUninitialized: true,
// }));




// var sqldb = require('./lib/model.js');
// sqldb.model.sync({force: false}).then(function() {
//     console.log("Server successed to start");
// }).catch(function(err){
//     console.log("Server failed to start due to error: %s", err);
// });

app.use(route)
app.listen(port, () => {
    console.log(`devServer start on port:${ port}`);
})