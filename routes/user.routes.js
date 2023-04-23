const express = require("express");
const router = express.Router();
const userService = require("../services/user.service")

router.get("/",userService.getAll);
// users
router.get("/income",userService.getByIncomeAndCar)
router.get("/male",userService.getByGenderAndIncome)
router.get("/quote",userService.getByLastNameAndQuote)
router.get("/email",userService.getUserWithNoDigitInEmail)
router.get("/group",userService.getGroupedUser)

module.exports = router
