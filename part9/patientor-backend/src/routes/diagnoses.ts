import express from "express";

import diagnosesService from "../services/diagnoses";

const router = express.Router();

router.get("/", (_req, res) => {
  const diagnoses = diagnosesService.getAll();
  res.send(diagnoses);
});

export default router;
