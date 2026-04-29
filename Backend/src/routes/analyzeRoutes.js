const express = require("express");
const router = express.Router();

const { analyzeResume } = require("../controllers/analyzeController");
const upload = require("../middlewares/uploadMiddleware");

// Route: POST /api/analyze
router.post(
  "/analyze",
  upload.single("resume"), // expects file field name = "resume"
  analyzeResume,
);

module.exports = router;
