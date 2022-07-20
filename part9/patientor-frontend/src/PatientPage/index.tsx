import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Container } from "@material-ui/core";

import { useStateValue, updatePatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

import Entries from "./Entries";

const PatientPage = () => {
  const { id } = useParams();
  const [{ patients }, dispatch] = useStateValue();

  const fetchPatient = async (id: string) => {
    try {
      const { data: patient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(updatePatient(patient));
    } catch (e) {
      return <p>Not Found</p>;
    }
  };

  if (!id) return <p>Not Found</p>;
  else if (!(id in patients)) {
    void fetchPatient(id);
    return <p>Not Found</p>;
  }

  const patient = patients[id];
  if (!("ssn" in patient)) {
    void fetchPatient(id);
    return <p>Loading...</p>;
  }

  let icon = null;
  if (patient.gender === "male") {
    icon = <span className="material-icons">male</span>;
  } else if (patient.gender === "female") {
    icon = <span className="material-icons">female</span>;
  }

  return (
    <Container>
      <Typography variant="h4">
        {patient.name} {icon}
      </Typography>
      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>
      <Entries entries={patient.entries} />
    </Container>
  );
};

export default PatientPage;
