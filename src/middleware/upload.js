const multer = require("multer");

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("application")) {
    cb(null, true);
  } else {
    cb("Please upload only pdf or docx files.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,"uploads/cv");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-Secret-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: fileFilter });
module.exports = uploadFile;