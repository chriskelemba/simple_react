const express = require("express");
const userController = require("../controller/userController");
// const {verifyAccessToken} = require("../helpers/jwtHelper");
const router = express.Router();

router.post("/addUser", userController.addUser);
router.post("/loginUser", userController.loginUser);

// router.get("/getAllReg", verifyAccessToken, regController.getAllReg);
// router.get("/getReg/:id", verifyAccessToken, regController.getReg);
// router.post("/addReg", regController.addReg);
// router.post("/loginUser", regController.loginUser);
// router.patch("/updateReg/:id", verifyAccessToken, regController.updateReg);

module.exports = router;