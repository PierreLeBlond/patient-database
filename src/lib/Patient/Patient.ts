type Gender = "child" | "man" | "woman";

interface Patient {
  date: string;
  file: number;
  aftercare: boolean;
  firstname: string;
  lastname: string;
  gender: Gender;
  year: number;
  age: number;
  phone: string;
  other_ex: number;
  cataract: number;
  tear_treatment: number;
  glasses: number;
  ar: string;
  avod_sc: string;
  avog_sc: string;
  avod_ac: string;
  avog_ac: string;
  avodg_ac: string;
  laf: string;
  prescription: string;
  glasses_donation: boolean;
  treatment: string;
  glasses_holder: boolean;
  comment: string;
}

interface PatientEntry {
  patient: Patient;
  id: string;
}

export type { Patient, PatientEntry };