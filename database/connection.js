const { default: mongoose } = require("mongoose")
const { DB } = require("../config")

const mongoDbConnect = new Promise((resolve , reject ) =>{
    mongoose.connect(DB).then((connected)=>{
        console.log("connected")
        resolve(connected)
    }).catch((connectionError)=>{
        reject(connectionError)
    })
})

module.exports= mongoDbConnect