const express = require("express");
const { getAllProducts,createProduct,updateProduct,deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview,getAdminProducts,createCombo } = require("../controllers/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/authentication");
const router = express.Router();

router.route("/products").get( getAllProducts);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router.route("/admin/products/new").post(isAuthenticatedUser,createProduct);
router.route("/product/:id").put(isAuthenticatedUser,updateProduct)
.delete(isAuthenticatedUser,deleteProduct)
.get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview);
router.post("/combo/create", isAuthenticatedUser, createCombo);
module.exports = router