import mongoose from './../config/mongo'

const RecruiterSchema = mongoose.Schema({
  whireId: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: String,
  scope: {
    type: String,
    required: true,
    default: 'base',
    enum: ['base', 'admin', 'recruiter']
  },
  Oauth: [{
    provider: {
      type: String,
      enum: ['google', 'facebook']
    },
    id: String
  }],
  accountValid: {
    type: Boolean,
    required: true
  }
})


export const Recruiter = mongoose.model('Recruiter', RecruiterSchema)
