const express = require('express');
const router = express.Router();
const userRoutes = require("./user.routes")
router.get("/readiness", (req, res, next) => {
  try {
    res.send({ message: 'Server is Up!!!' });
  } catch (e) {
    next(e);
  }
});

router.use("/users", userRoutes);
module.exports = router;
