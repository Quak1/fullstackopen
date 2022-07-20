import express from "express";

import patientsService from "../services/patients";
import { toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientsService.getAll();
  res.send(patients);
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const newPatient = patientsService.addPatient(newPatientEntry);
    res.json(newPatient);
  } catch (e) {
    let errorMessage = "";
    if (e instanceof Error) {
      errorMessage += e.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const patient = patientsService.getById(id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

export default router;
