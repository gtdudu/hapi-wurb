import mongoose from './../config/mongo'

const AdminSchema = mongoose.Schema({
  whireId : {
    type: String,
    required : true,
    index : true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    index : true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String ,
    required: true
  },
  password:{
    type: String,
    required: true
  }
})


export const Admin = mongoose.model('Admin', AdminSchema)
