import { NewPatientEntry, Gender } from "./types";

const errorMessage = "Incorrect or missing field: ";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientEntry = (object: any) => {
  const newPatient: NewPatientEntry = {
    name: parseString(object.name, "name"),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseString(object.ssn, "ssn"),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, "occupation"),
    entries: [],
  };

  return newPatient;
};

const parseString = (text: unknown, field: string): string => {
  if (!text || !isString(text)) {
    throw new Error(errorMessage + field);
  }
  return text;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isValidDate(date)) {
    throw new Error(errorMessage + "date");
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(errorMessage + "gender");
  }
  return gender;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isValidDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender as Gender);
};
