const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth.js");
const { User } = require("../../db/models");

const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
// ***********TEST ROUTES***************
// router.post("/test", function (req, res) {
//   res.json({ requestBody: req.body });
// });

// router.get(
//   "/set-token-cookie",
//   asyncHandler(async (req, res) => {
//     const user = await User.findOne({
//       where: {
//         username: "Demo-lition",
//       },
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
//   })
// );

// router.get("/restore-user", restoreUser, (req, res) => {
//   return res.json(req.user);
// });

// router.get("/require-auth", requireAuth, (req, res) => {
//   return res.json(req.user);
// });
//******************************************************************

router.use("/session", sessionRouter);
router.use("/users", usersRouter);

module.exports = router;