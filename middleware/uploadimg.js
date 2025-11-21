import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination:(req, file, cb)=> {
        cb(null, "upload/products/");
    },
    filename: (req, file, cb)=> {
        cb(null, Date.now() + "-" + path.extname(file.originalname));

    }
})

const extension = (req, file, cb) => {
    const filetypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (filetypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .jpg and .png format allowed!') , false);
    }
}

export const upload = multer({
    storage: storage,
    fileFilter: extension,
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
});
