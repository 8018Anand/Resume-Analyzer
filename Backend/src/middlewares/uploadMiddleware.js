const multer = require("multer");

// Store file in memory (not disk)
const storage = multer.memoryStorage();

// File filter (only allow PDFs)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

// Upload config
const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
