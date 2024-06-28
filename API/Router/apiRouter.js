import express from "express";
import {
  getAllProvinces,
  getMunicipality,
  getallDistricts,
} from "../controller/addressController.js";

const router = express.Router();

router.get("/provinces", getAllProvinces);
router.get("/provinces/:province/districts", getallDistricts);
router.get(
  "/provinces/:province/districts/:district/municipalities",
  getMunicipality
);

export default router;
