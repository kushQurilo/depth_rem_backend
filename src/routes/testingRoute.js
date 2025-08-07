const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const emiController = require("../controllers/emiController");

router.post("/admin/upload-emi", upload.single("csv"), emiController.uploadEMICSV);
router.patch("/emi/pay/:userId", emiController.payEmi);
router.get("/emi/status/:userId", emiController.getEmiStatus);

module.exports = router;
