const router = require("express").Router();
const { checkToken } = require("../../auth/tocken_validation");
const {
  createUser,
  login,
  UserId,
  getUsers,
  updateUsers,
  deleteUser
} = require("./user.controller");
router.get("/", checkToken, getUsers);
router.post("/", createUser);
router.get("/:id", checkToken, UserId);
router.post("/login", login);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);
module.exports = router;
