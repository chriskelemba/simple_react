const express = require("express");
const roleController = require("../controller/roleController");
const {verifyAccessToken} = require("../helpers/jwtHelper");
const router = express.Router();

router.post(
    "/addRole",
    verifyAccessToken,
    roleController.addRole
);

module.exports = router;