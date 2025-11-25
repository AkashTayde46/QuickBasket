const express = require("express");
const router = express.Router();
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/authentication");
const {newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder,deleteOrder} = require("../controllers/orderController")
router.route("/order/new").post(isAuthenticatedUser,newOrder)
router.route("/orders/me").get(isAuthenticatedUser, myOrders); //order matters :id comes first creates problem
router.route("/orders/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin"),updateOrder).delete(isAuthenticatedUser, authorizeRoles("admin"),deleteOrder)

module.exports = router;