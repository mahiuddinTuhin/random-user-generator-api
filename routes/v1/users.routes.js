const express = require("express");
const users = require("./../../database/users.json");
const router = express.Router();
const userController = require("./../../controller/users.controller");

/* routes */
router.route("/all").get(userController.getAllUser);
router.route("/update/:id").patch(userController.updateUser);
router.route("/saveUser").post(userController.saveUser);
router.route("/delete/:id").delete(userController.deleteUser);

module.exports = router;
