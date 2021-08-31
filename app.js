const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {logger} = require('./src/middleware');

const app = express();

let corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//database 
const db = require("./src/model");
//const Role = db.userGroup;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: false}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
    res.send({ message: "Welcome to missaha application." });
    logger.info("Server Sent A Hello World!");
});

require('./src/route/auth.route')(app);
require('./src/route/user.route')(app);

app.use((req,res)=>{
    res.send({message: "404! there is no route matches"});
})

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


