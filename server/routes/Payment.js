const express = require("express");
const { capturePayment, verifySignature } = require("../controllers/Payment");
const { auth, isStudent } = require("../middlewares/auth");
const router = express.Router();

//route for capture payment
router.post("/capturePayment", auth, isStudent , capturePayment);

//route for verify signature
router.post("/verify-signature", verifySignature);

module.exports = router;