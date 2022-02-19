const express = require('express')
const { Patient, validate } = require('../models/patient_model.js')

const router = express.Router();
//to get all the patients in the database, we use the find method and sort all the entries by their name
exports.getAllPatients = async (req, res) => {
    const patients = await Patient.find().sort("name");
    res.send(patients);
};
// now we can get one patient using the id given to each patient by mongodb
exports.getPatientById = async (req, res) => {
    //first validate request
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const patient = await Patient.findById(req.params.id);

    if (!patient)
        return res.status(404).send("The patient with the given id was not found");

    res.send(patient);
};
//to create new patient data
exports.createPatient = async (req, res) => {
    //first validate request
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const patient = new Patient({ ...req.body });
    await patient.save();

    res.send(patient);
};
//let's update the patient data
exports.updatePatient = async (req, res) => {
    //first validate request
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const patient = await Patient.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
    );

    if (!patient)
        return res.status(404).send("The patient with the given id was not found");

        res.send(patient);
};
//now we delete a patient by the id
exports.deletePatient = async (req, res) => {
    //first validate request
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const patient = await Patient.findByIdAndRemove(req.params.id);
//if the id of the patient does not exist, we handle that error
    if (!patient)
        return res.status(404).send("The patient with the given id was not found");

    res.send(patient);
};
