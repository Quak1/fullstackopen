import {
  NewPatientEntry,
  Gender,
  NewEntry,
  BaseEntry,
  Discharge,
  sickLeave,
  HealthCheckRating,
  OccupationalHealthcareEntry,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (obj: any): NewEntry => {
  const newDiagnosisEntry: Omit<BaseEntry, "id"> = {
    description: parseString(obj.description, "description"),
    date: parseDate(obj.date),
    specialist: parseString(obj.specialist, "specialist"),
  };

  if (obj.diagnosisCodes) {
    newDiagnosisEntry["diagnosisCodes"] = parseDiagnosisCodes(
      obj.diagnosisCodes
    );
  }

  switch (obj.type) {
    case "Hospital":
      return {
        ...newDiagnosisEntry,
        type: "Hospital",
        discharge: parseDischarge(obj.discharge),
      };
    case "OccupationalHealthcare":
      const entry: Omit<OccupationalHealthcareEntry, "id"> = {
        ...newDiagnosisEntry,
        type: "OccupationalHealthcare",
        employerName: parseString(obj.employerName, "employerName"),
      };
      if (obj.sickLeave)
        entry["sickLeave"] = parse(obj.sickLeave, isSickLeave, "sick leave");
      return entry;
    case "HealthCheck":
      return {
        ...newDiagnosisEntry,
        type: "HealthCheck",
        healthCheckRating: parse(
          obj.healthCheckRating,
          isHealthCheckRating,
          "health check rating"
        ),
      };
    default:
      throw new Error(errorMessage + "type");
  }
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
  if (!codes || !Array.isArray(codes)) {
    throw new Error(errorMessage + "diagnosis codes");
  }
  const diagnosisCodes = codes.map((code) =>
    parseString(code, `diagnosis codes ${code}`)
  );
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
    isValidDate(obj.date) &&
    "criteria" in obj &&
    isString(obj.criteria)
  );
};

const parseDischarge = (obj: unknown) => {
  if (!obj || !isDischarge(obj)) {
    throw new Error(errorMessage + "discharge");
  }
  return obj;
};

const isSickLeave = (obj: unknown): obj is sickLeave => {
  return (
    !!obj &&
    isRecord(obj) &&
    "startDate" in obj &&
    isString(obj.startDate) &&
    isValidDate(obj.startDate) &&
    "endDate" in obj &&
    isString(obj.endDate) &&
    isValidDate(obj.endDate)
  );
};

const isHealthCheckRating = (obj: unknown): obj is HealthCheckRating => {
  return (
    !!obj &&
    typeof obj === "number" &&
    Object.values(HealthCheckRating).includes(obj)
  );
};

const parse = <T>(
  obj: unknown,
  isCheck: (obj: unknown) => obj is T,
  typeMessage: string
) => {
  if (!obj || !isCheck(obj)) {
    throw new Error(errorMessage + typeMessage);
  }
  return obj;
};
