import express from "express";

import patientsService from "../services/patients";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientsService.getAll();
  res.send(patients);
});

export default router;
