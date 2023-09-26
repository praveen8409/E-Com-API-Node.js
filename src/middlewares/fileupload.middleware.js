// 1. Import multer
import multer from "multer";

// 2. Configure storage with filename and location
const storage = multer.diskStorage({
    destination: (req,file, cb) =>{
        cb(null, './upload/');
    },

    filename: (req, file, cb) =>{
        cb(null, new Date().toISOString() + file.originalname);
    }
});

export default upload = multer({storage:storage});