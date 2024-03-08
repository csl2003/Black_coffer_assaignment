const express = require("express");
const { getOptions, filter } = require("../controller/dashboardController");

const router = express.Router();

router.get("/options", getOptions);

router.get("/data", filter);

module.exports = router;
