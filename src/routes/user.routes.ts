import * as express from "express";
const router = express.Router();
const userController = require("../controllers/users.controllers");

router.post("/", userController.getAll);

module.exports = router;
