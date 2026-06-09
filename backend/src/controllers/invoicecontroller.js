const Invoice = require("../models/invoice");

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({
      createdAt: -1,
    });

    res.json(invoices);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    res.json(invoice);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.markPaid = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    invoice.status = "PAID";
    invoice.paidAt = new Date();

    await invoice.save();

    res.json(invoice);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};