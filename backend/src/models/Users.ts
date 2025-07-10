import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
   publicId: { type: String, required: true, unique: true }, 
});

const Users = mongoose.model('Users', userSchema);

export default Users;
