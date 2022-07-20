import { v1 as uuid } from "uuid";

import patientData from "../../data/patients";
import { Patient, NewPatientEntry } from "../types";

const getAll = (): Omit<Patient, "ssn">[] => {
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: String(uuid()),
    ...entry,
  };

  patientData.push(newPatient);
  return newPatient;
};

const getById = (id: string) => {
  return patientData.find((patient) => patient.id === id);
};

export default {
  getAll,
  addPatient,
  getById,
};
