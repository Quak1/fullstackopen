import {
  NewPatientEntry,
  Gender,
  NewEntry,
  BaseEntry,
  Discharge,
} from "./types";

const errorMessage = "Incorrect or missing field: ";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientEntry = (object: any) => {
  const newPatient: NewPatientEntry = {
    name: parseString(object.name, "name"),
    dateOfBirth: parseDate(object.dateOfBirth),
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

const parseDate = (date: unknown): string => {
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

type Fields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  type: unknown;
  discharge: unknown;
  employerName: unknown;
  sickLeave: unknown;
  healthCheckRating: unknown;
};

export const toNewEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  type,
  discharge,
  employerName,
  sickLeave,
  healthCheckRating,
}: Fields): NewEntry => {
  const newDiagnosisEntry: Omit<BaseEntry, "id"> = {
    description: parseString(description, "description"),
    date: parseDate(date),
    specialist: parseString(specialist, "specialist"),
  };

  if (diagnosisCodes) {
    newDiagnosisEntry["diagnosisCodes"] = parseDiagnosisCodes(diagnosisCodes);
  }

  switch (type) {
    case "Hospital":
      return {
        ...newDiagnosisEntry,
        type: "Hospital",
        discharge: parseDischarge(discharge),
      };
    default:
      throw new Error(errorMessage + "type");
  }
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
  if (!codes || !Array.isArray(codes)) {
    throw new Error(errorMessage + "diagnosis codes");
  }
  const diagnosisCodes = codes.map((code) => parseString(code, `code ${code}`));
  return diagnosisCodes;
};

const isRecord = (obj: unknown): obj is Record<string, unknown> =>
  typeof obj === "object";

const isDischarge = (obj: unknown): obj is Discharge => {
  return (
    !!obj &&
    isRecord(obj) &&
    "date" in obj &&
    isString(obj.date) &&
    isString(obj.criteria)
  );
};

const parseDischarge = (obj: unknown) => {
  if (!obj || !isDischarge(obj)) {
    throw new Error(errorMessage + "discharge");
  }
  return obj;
};
