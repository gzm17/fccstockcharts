var express = require("express");
var ctrlData = require("../api-data/api-data.js")
var ctrlView = require("../controllers/view-ctrl.js")
var router = express.Router(); 

// display bars in the selected city (post) or nothing
router.get("/", ctrlView.index);

module.exports = router;

