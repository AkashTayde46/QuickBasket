const Product = require("../models/productModel")
const Combo = require("../models/comboModel")
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const ApiFeatures = require("../utils/apifeatures")
//req: Represents the HTTP request object. It contains information about the request, such as request parameters, query strings, and body data.
//res: Represents the HTTP response object. It is used to send a response back to the client, such as sending JSON data, status codes, or rendering a view.
//next: This is a function used to pass control to the next middleware function in the stack. It’s especially useful in Express for handling errors or proceeding to the next piece of middleware after processing the current request.
// Create Product -->Admin
exports.createProduct = catchAsyncError(async (req,res, next) =>{
    req.body.user = req.user.id; //to access user
    const product = await Product.create(req.body); //create used to create new record in database 
    //req.body represents the data that is being sent in an HTTP request
    res.status(201).json({
        success:true,
        product,
    })
})



//Get all products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    const resultPerPage = 8;
  
    // Total product count in the database
    const productCount = await Product.countDocuments();
  
    // Apply search and filter features
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter();
  
    // Get filtered products count without pagination
    const filteredProductsQuery = apiFeature.query.clone(); // Clone the query before modifying it for pagination
    const filteredProducts = await filteredProductsQuery;
    const filteredProductsCount = filteredProducts.length;
  
    // Apply pagination on a new query
    apiFeature.pagination(resultPerPage);
    const paginatedProducts = await apiFeature.query;
  
    // Send the response
    res.status(200).json({
      success: true,
      products: paginatedProducts,
      productCount,
      resultPerPage,
      filteredProductsCount,
    });
  });
  
//update product -->Admin
const mongoose = require('mongoose'); // Add this line

exports.updateProduct = catchAsyncError(async (req, res, next) => {
    try {
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID",
            });
        }

        // Find the product by ID
        let product = await Product.findById(req.params.id);

        // If the product doesn't exist
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Update the product
        product = await Product.findByIdAndUpdate(//findByIdAndUpdate() updates the product with new data from req.body.
            
            req.params.id,
            req.body,
            {
                new: true, // Return the updated document
                runValidators: true, // Validate the updated fields
            }
        );

        // Send the response
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the product",
            error: error.message, // Optional for debugging
        });
    }
});


//Delete Product
exports.deleteProduct = catchAsyncError(async(req, res, next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
    await Product.deleteOne({ _id: req.params.id });//Uses deleteOne() to remove the product by its _id.
    //Alternative
    //const product = await Product.findByIdAndDelete(req.params.id);
 //deletes the product matching that 
    res.status(200).json({
        success:true,
        message:"Product Deleted successfully"
    })
});
// get product details
exports.getProductDetails = catchAsyncError(async(req, res, next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not found", 404))
    }
    res.status(200).json({
        success:true,
        product,
        
    })
});

//Create a new review or update review
exports.createProductReview = catchAsyncError(async(req, res, next)=>{
const {rating, comment, productId} = req.body;
const review = {
    user: req.user._id,//user: The ID of the user writing the review.
    name: req.user.name,//name: The user’s name.
    rating : Number(rating),//rating: The review rating (converted to a number).
    comment,//comment: The review text.
};
const product = await Product.findById(productId);
const isReviewed = product.reviews.find((rev)=> rev.user.toString() === req.user._id.toString());//rev=> rev.user.toString() finds user._id who created the review
if(isReviewed){
product.reviews.forEach((rev) =>{
    if(rev.user.toString() === req.user._id.toString()){
        rev.rating = rating,
        rev.comment = comment
    }
})
}else{
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length
}
let avg = 0;
    product.ratings = product.reviews.forEach(rev =>{
        avg+=rev.rating
    })
    product.ratings = avg/product.reviews.length;
    await product.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
    })
})
// Get All Product (Admin)
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  });
  
//Get all reviews of a product
exports.getProductReviews = catchAsyncError(async(req, res, next)=>{
    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("product not found", 404));

    }
    res.status(200).json({
        success:true,
        reviews: product.reviews,
        });
});
// delete review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const { productId, id } = req.query;

    // Find the product by its ID
    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    // Filter out the review to be deleted
    const reviews = product.reviews.filter(rev => rev._id.toString() !== id.toString());

    // Recalculate ratings
    let avg = 0;
    reviews.forEach(rev => {
        avg += rev.rating;
    });

    const ratings = reviews.length > 0 ? avg / reviews.length : 0; // Handle case where no reviews are left
    const numOfReviews = reviews.length;

    // Update the product
    product.reviews = reviews;
    product.ratings = ratings;
    product.numOfReviews = numOfReviews;

    await product.save(); // Save the updated product

    res.status(200).json({
        success: true,
        message: "Review deleted successfully",
    });
});
exports.createCombo = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || products.length < 2) {
      return res.status(400).json({ message: "At least 2 products are required to create a combo." });
    }

    let total = 0;
    const validProducts = [];

    for (let item of products) {
      const product = await Product.findById(item.productId);

      // Skip if product doesn't exist or is out of stock
      if (!product || product.stock <= 0) continue;

      const quantity = item.quantity && item.quantity > 0 ? item.quantity : 1;

      // Optional: check if requested quantity exceeds stock
      if (product.stock < quantity) {
        return res.status(400).json({
          message: `Not enough stock for product: ${product.name}`,
        });
      }

      total += product.price * quantity;
      validProducts.push({
        product: product._id,
        quantity,
      });
    }

    if (validProducts.length < 2) {
      return res.status(400).json({ message: "Combo must include at least 2 valid, available products." });
    }

    const discount = validProducts.length >= 3 ? total * 0.1 : 0; // 10% discount for 3+ products
    const finalPrice = total - discount;

    const combo = await Combo.create({
      user: req.user._id,
      products: validProducts,
      totalPrice: finalPrice,
      discountApplied: discount,
    });

    res.status(201).json({ success: true, combo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating combo." });
  }
};

