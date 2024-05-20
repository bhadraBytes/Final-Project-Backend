const express = require("express");
const { fetchRecommendations } = require("../controller/Recommendation");

const router = express.Router();

router.get("/", fetchRecommendations);

module.exports = router;
