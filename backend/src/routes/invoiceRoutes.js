const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");

const {
  getInvoices,
  getInvoice,
  markPaid,
} = require("../controllers/invoicecontroller");

router.get("/", getInvoices);

router.get("/:id", getInvoice);

router.patch("/:id/pay", markPaid);

module.exports = router;