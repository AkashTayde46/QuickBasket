const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const Product = require("../models/productModel")
const User  = require("../models/userModels")

//Create new Order
exports.newOrder = catchAsyncError(async(req,res,next)=>{
    const{shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;
    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paidAt: Date.now(), user: req.user._id,    })


        res.status(201).json({
            success:true,
            order
        });
});
//get Single Order
exports.getSingleOrder = catchAsyncError(async(req, res, next)=>{
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );//.populate goes in user collection and retrieves its email and name 
    if(!order){
        return next(new ErrorHandler("Order not found with this id", 404));
    }
    res.status(200).json({
        success:true,
        order,
    });
});

//get login user order
exports.myOrders = catchAsyncError(async (req, res, next) => {
    console.log("User object in myOrders:", req.user);

    if (!req.user || !req.user._id) {
        return res.status(400).json({
            success: false,
            error: "User not authenticated or invalid ID",
        });
    }

    const orders = await Order.find({ user: req.user._id });
console.log("User:", req.user);

    res.status(200).json({
        success: true,
        orders,
    });
});


//get all orders -- Admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find(); // Filter orders by the logged-in user's ID
    let totalAmount = 0;
    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    });
    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});


//update Order status -- Admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id); // Filter orders by the logged-in user's ID
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already delivered order", 400));
    }
    order.orderItems.forEach(async(order) =>{
        await updateStock(order.product, order.Quantity);
    });


    order.orderStatus = req.body.status;
    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }
    await order.save({validateBeforeSave:false});
    res.status(200).json({
        success: true,
        
    });
});
async function updateStock(id, quantity){
const product = await Product.findById(id);

product.stock -= quantity;
await product.save({validateBeforeSave:false});

}

// Delete Order -- Admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this ID", 404));
    }

    res.status(200).json({
        success: true,
        message: "Order deleted successfully",
    });
});

