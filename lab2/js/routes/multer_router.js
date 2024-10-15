const Router = require('express');
const router = new Router();
const multer = require('multer');
const path = require('path');




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/img_book'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
    },
  });
const upload = multer({ storage });


router.post('/', upload.single('file'), (req, res) => {
    const filePath = "../img_book/" +  req.file.filename;
    res.send(filePath); 
});


module.exports = router 