require('dotenv').config()
const express = require('express') //commonjs
const cookieParser = require('cookie-parser');
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routers/web');
const adminwebRoutes = require('./routers/admin-web');

const app = express() //app express
const port = process.env.PORT || 8888; //port chinh va port du phong
const hostname = process.env.HOST_NAME;

//config request.body
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//config template engine
configViewEngine(app);


// Config Route
app.use('/',webRoutes);
app.use('/dashboard',adminwebRoutes);

//test connection
// connection.query(
//    'SELECT * from Users u',
//    function(err, results, fields){
//     console.log(">>result =",results);
//    }
// ) 

app.listen(port,hostname, () => {
  console.log(`Example app listening on port ${port}`)
})

