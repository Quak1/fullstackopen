import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Container } from "@material-ui/core";
import { Button } from "@material-ui/core";

import { useStateValue, updatePatient, addEntry } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";

import Entries from "./Entries";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientPage = () => {
  const { id } = useParams();
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setError(undefined);
    setModalOpen(false);
  };

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

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4">
        {patient.name} {icon}
      </Typography>
      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>
      <Entries entries={patient.entries} />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    </Container>
  );
};

export default PatientPage;
