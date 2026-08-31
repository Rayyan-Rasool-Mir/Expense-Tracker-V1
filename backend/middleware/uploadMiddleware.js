const multer = require('multer');

//configureing storage

const storage = multer.diskStorage({
    destination: (req, file,cb) => {
        cb(null, 'uploads/');
    },

    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },

});

//file filter

const fileFilter = (req, file, cb) => {
    console.log("File MIME type:", file.mimetype);
    console.log("File name:", file.originalname);

    const allowedTypes = ['image/jpeg', 'image/png'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true);
    } else{
        cb(new Error('Only .jpeg, .jpg and .png formats are allowed'), false);
    }
}
const upload = multer({storage, fileFilter});

module.exports = upload;
