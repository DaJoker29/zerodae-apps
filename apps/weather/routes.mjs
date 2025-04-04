import express from "express";
import {
  deleteAll,
  saveTemp,
  fetchCurrent,
  fetchAll,
  fetchRecent,
} from "./controllers.mjs";

const router = express.Router();

router.delete("/", deleteAll);
router.post("/zip/:zip", saveTemp);
router.get("/temp", fetchCurrent);
router.get("/temps", fetchAll);
router.get("/temps/recent", fetchRecent);

export default router;
