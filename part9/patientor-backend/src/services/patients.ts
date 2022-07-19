import { v1 as uuid } from "uuid";

import patientData from "../../data/patients";
import { Patient, NewPatientEntry } from "../types";

const getAll = (): Omit<Patient, "ssn">[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: String(uuid()),
    ...entry,
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  addPatient,
};
