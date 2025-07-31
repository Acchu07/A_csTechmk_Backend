import multer from "multer";

export const storage = multer({dest:"./uploadFolder",fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"));
    }
}}) 
// ToDo Code to create folder if it doesnt exist 
//      - Check if it is possible to integrate linux commands to create folders rather than js