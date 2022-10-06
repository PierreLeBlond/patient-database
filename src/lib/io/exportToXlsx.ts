import type { Patient, PatientEntry } from '$lib/Patient/Patient';
import * as xlsx from 'xlsx/xlsx.mjs';

const worksheetColumnNames = [
  "Date d'examen",
  "Numéro de fiche",
  "A suivre",
  "Prénom",
  "Nom",
  "Genre",
  "Année de naissance",
  "Age",
  "Numéro de téléphone",
  "Autres examen",
  "Cataracte",
  "Traitement larmes",
  "Lunettes",
  "Porte lunettes",
  "Don lunettes",
  "AVOD sc",
  "AVOG sc",
  "AVOD ac",
  "AVOG ac",
  "AVODG ac",
  "AR",
  "LAF",
  "Ordonnance",
  "Traitement",
  "Commentaires"
];
const worksheetName = 'Fiches-Patients';

const genderMap: { child: string, man: string, woman: string } = {
  "child": "Enfant",
  "man": "Homme",
  "woman": "Femme"
}
const jsonToXlsx = async (patients: PatientEntry[]) => {
  const data = patients.map(({ patient }) => [
    patient.date,
    patient.file.toString(),
    patient.aftercare ? 'oui' : 'non',
    patient.firstname,
    patient.lastname,
    genderMap[patient.gender],
    patient.year.toString(),
    patient.age.toString(),
    patient.phone,
    patient.other_ex.toString(),
    patient.cataract.toString(),
    patient.tear_treatment.toString(),
    patient.glasses.toString(),
    patient.ar,
    patient.avod_sc,
    patient.avog_sc,
    patient.avod_ac,
    patient.avog_ac,
    patient.avodg_ac,
    patient.laf,
    patient.prescription,
    patient.glasses_donation,
    patient.treatment,
    patient.glasses_holder,
    patient.comment
  ]);
  const workbook = xlsx.utils.book_new();
  const worksheetData = [
    worksheetColumnNames,
    ...data
  ];
  const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);
  xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
  await xlsx.writeFile(workbook, './fiches-patients.xlsx', {});
}

export { jsonToXlsx };