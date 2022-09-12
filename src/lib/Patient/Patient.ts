interface PatientData {
  firstName: string;
  lastName: string;
}

interface Patient {
  data: PatientData,
  id: string;
}

export type { Patient, PatientData };