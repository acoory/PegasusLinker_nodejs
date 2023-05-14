const multer = require("multer");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "avatar") {
            cb(null, __dirname + "/../uploads/avatar");
        } else {
            cb(null, __dirname + "/../uploads/gallery");
        }
    },
    filename: function (req, file, cb) {

            const name = file.originalname.split(" ").join("_");
            const extension = MIME_TYPES[file.mimetype];
            cb(null, name + Date.now() + "." + extension);
    }
})

const upload = multer({ storage: storage }).fields([
    { name: "avatar", maxCount: 1 },
    { name: "gallery", maxCount: 3 },
    ]);

module.exports = upload;