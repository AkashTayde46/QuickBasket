// use DB_URI = mongodb://localhost:27017/Ecommerce

const mongoose = require("mongoose")
const connectDatabase = () =>{
mongoose.connect(process.env.MONGO_URI, 
    {useNewUrlParser:true,
     useUnifiedTopology:true
    
    }).then((data)=>{
console.log(`Mongodb connected with server: ${process.env.PORT}`)
    }).catch((err) =>{
        console.log(err)
    })
}



module.exports = connectDatabase;