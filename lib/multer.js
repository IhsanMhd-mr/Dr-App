
const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);  
    if (ext !== ".jpg" && ext !== ".JPG" && ext !== ".JPEG" && ext !== ".jpeg" && ext !== ".png" && ext !== ".PNG"  && ext !== ".pdf" ) {
    
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

// // Define the allowed file extensions
// const allowedExtensions = [".jpg", ".JPG", ".JPEG", ".jpeg", ".png", ".PNG", ".pdf"];

// // Multer configuration
// const storage = multer.diskStorage({});

// // File filter function to check allowed file extensions
// const fileFilter = (req, file, cb) => {
//   const ext = path.extname(file.originalname);
//   if (allowedExtensions.includes(ext)) {
//     // Accept the file if its extension is in the allowed list
//     cb(null, true);
//   } else {
//     // Reject the file if its extension is not allowed
//     cb(new Error("File type is not supported"), false);
//   }
// };

// // Create and export the Multer instance with the configured settings
// module.exports = multer({
//   storage: storage,
//   fileFilter: fileFilter,
// });
