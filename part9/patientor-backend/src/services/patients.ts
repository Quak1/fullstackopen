import { v1 as uuid } from "uuid";

import patientData from "../../data/patients";
import { Patient, NewPatientEntry, Entry, NewEntry } from "../types";

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

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: String(uuid()),
    ...entry,
  };

  const patientIndex = patientData.findIndex((p) => p.id === patientId);
  if (patientIndex === -1) throw new Error("Patient not found");
  patientData[patientIndex].entries.push(newEntry);
  return newEntry;
};

export default {
  getAll,
  addPatient,
  getById,
  addEntry,
};
