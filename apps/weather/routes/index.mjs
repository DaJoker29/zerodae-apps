import express from "express";
import controllers from "../controllers/temps.mjs";

const router = express.Router();

router.use(express.static("apps/weather/public"));

router.get("/v1/temp", controllers.fetchCurrent);
router.get("/v1/temps", controllers.fetchAll);
router.get("/v1/temps/recent", controllers.fetchRecent);

export default router;
