const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true, "Please enter product description"]
    },
    price:{
        type:Number,
        required: [true, "Please enter product Price"],
        maxLength:[8, "Price cannot exceed 8 characters"]
    },
    ratings:{
        type: Number,
        default:0
    },
    images:[
        {
        public_id:{
            type:String,
           
        },
        url:{
            type:String,
            
        }
    }
],
category:{
    type:String,
    required:[true, "Please enter product Product category"],
},
stock:{
    type:Number,
    required:[true, "Please enter product Product stock"],
    maxLength:[4, "Stock cannot exceed 4 characters"],
    default:1

},
numOfReviews:{
    type:Number,
    default:0
},
reviews:[
    {
        user:{ //who created the product
            type:mongoose.Schema.ObjectId,
            ref:"User",
            
        },
        name:{
            type:String,
          

        },
        rating:{
            type:Number,
            
        },
        comment:{
            type:String,
            
        }
    }
],

createdAt:{
    type:Date,
    default: Date.now
}
})
module.exports = mongoose.model("Product", productSchema);             