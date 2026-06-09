const express = require("express");
const router = express.Router();

const {
  createInvoice,
  getInvoices,
  getInvoice,
  markAsPaid,
} = require("../controllers/invoiceController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/create",authMiddleware ,createInvoice);
router.get("/all", authMiddleware ,getInvoices);
router.get("/:id", authMiddleware ,getInvoice);
router.patch("/:id/pay", authMiddleware ,markAsPaid);

module.exports = router;