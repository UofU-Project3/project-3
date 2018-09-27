const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Name: { type: String, required: true },
  Email: String,
  Password: String,
  Equipment:[String],
  Workout: [{ type: Schema.Types.ObjectId, ref: 'Workout' }],
  Exercise: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]

});

const User = mongoose.model("User", userSchema);

module.exports = User;
