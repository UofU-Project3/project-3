const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  Name: { type: String, required: true },
  Main_Muscle_Group: String,
  Detailed_Muscle_Group: String,
  Other_Muscle_Groups:[String],
  Type: String,
  Mechanics: String,
  Equipment: [String],
  Difficulty: String,
  Description: [String],
  Instructions: [String],
  Tips: [String]

});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
