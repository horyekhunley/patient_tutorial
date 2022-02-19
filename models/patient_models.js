const mongoose = require('mongoose')
const Joi = require('joi')

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
phone: {
    type: String,
   },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  diagnosis: {
    type: String,
  },
})

const validate = (patient) => {

    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        phone: Joi.string().min(9).max(50).required(),
        address: Joi.string().min(5).max(50).required(),
        diagnosis: Joi.string().min(5).max(50),

    })
  return schema.validate(patient);
}

const Patient = mongoose.model('Patient', patientSchema)

module.exports = {
  Patient, validate
}
