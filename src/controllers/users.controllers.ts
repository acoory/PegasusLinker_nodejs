const uploads = require("../middleware/multer");

exports.getAll = async (req, res) => {

     await uploads(req, res, (err) => {
        if (err) {
            return res.status(500).json({message: err});
        }
    });
    res.status(200).json({message: "ok"});
};
