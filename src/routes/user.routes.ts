import * as express from "express";
import multer = require("../middleware/multer")

const router = express.Router();
const userController = require("../controllers/users.controllers");

router.post("/", multer, userController.getAll);

module.exports = router;
