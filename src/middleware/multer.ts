import sharp = require("sharp");
import {Request, Response} from "express";

const multer = require("multer");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

const storage = multer.memoryStorage();

const upload = multer({storage: storage}).fields([
    {name: "avatar", maxCount: 1},
    {name: "gallery", maxCount: 3},
]);

const selectQualityImage = (size: number): number => {
    let quality: number = 80;

    switch (true) {
        case size >= 0 && size <= 1000:
            quality = 80;
            break;
        case size > 1000 && size <= 5000:
            quality = 70;
            break;
        case size > 5000 && size <= 10000:
            quality = 60;
            break;
        case size > 10000 && size <= 20000:
            quality = 50;
            break;
        default:
            quality = 80;
            break;
    }

    return quality;
};


function handleUploadRequest(req: Request, res: Response, next: any) {
    upload(req, res, (err: Error) => {
        if (err) {
            return res.status(500).json({message: err});
        }

        const filesPath = [];
        if (req.files && req.files.gallery !== undefined) {
            for (let i = 0; i < req.files.gallery.length; i++) {
                console.log(req.files.gallery[i])
                const fieldname = req.files.gallery[i].fieldname;
                const name = req.files.gallery[i].originalname.split(" ").join("_");
                const extension = MIME_TYPES[req.files.gallery[i].mimetype];
                const newName = name + Date.now() + "." + extension;
                const inputBuffer = req.files.gallery[i].buffer;
                sharp(inputBuffer)
                    .jpeg({quality: selectQualityImage(req.files.gallery[i].size)})
                    .toFile(__dirname + `/../uploads/gallery/${newName}`);

                filesPath.push({
                    fieldname: fieldname,
                    url: `${req.protocol}://${req.get("host")}/uploads/gallery/${newName}`,
                });
            }
        }

        if (req.files && req.files.avatar !== undefined) {
            for (let i = 0; i < req.files.avatar.length; i++) {
                console.log(req.files.avatar[i])
                const fieldname = req.files.avatar[i].fieldname;
                const name = req.files.avatar[i].originalname.split(" ").join("_");
                const extension = MIME_TYPES[req.files.avatar[i].mimetype];
                const newName = name + Date.now() + "." + extension;
                const inputBuffer = req.files.avatar[i].buffer;
                sharp(inputBuffer)
                    .jpeg({quality: selectQualityImage(req.files.avatar[i].size)})
                    .toFile(__dirname + `/../uploads/avatar/${newName}`);

                filesPath.push({
                    fieldname: fieldname,
                    url: `${req.protocol}://${req.get("host")}/uploads/avatar/${newName}`,
                });
            }
        }

        req.files = filesPath;
        next();
    });
}


module.exports = handleUploadRequest;






