const express = require('express')
const app = express();
const cors = require('cors');
const mongoDbConnect = require('./database/connection');
const { URL, Port } = require('./config');
// const { bodyParser } = require('body-parser');
app.use(cors({
    origin: URL,
    credentials: true
}))
const routes = require("./Router/router")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use("/c/v1/",(req,res)=>{
//     res.send('Hi...');
// });
app.use("/api/v1",routes);

mongoDbConnect.then((connect) => {
    app.listen(Port, () => {
        console.log("database connected and app is running on the port",Port)
    })
}).catch(connectionError => {
    console.log(connectionError)
})