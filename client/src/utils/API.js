import axios from "axios";

export default {
  // Gets all exercises
  getExercises: function() {
    return axios.get("/api/exercises");
  },
  // Gets the exercise with the given id
  getExercise: function(id) {
    return axios.get("/api/exercises/" + id);
  },
  // Deletes the exercise with the given id
  deleteExercise: function(id) {
    return axios.delete("/api/exercises/" + id);
  },
  // Saves a exercise to the database
  //saveWorkout: function(exerciseData) {
   // return axios.post("/api/workouts", workoutData);
  //},
  updateWorkout: function(id) {
    return axios.put("/api/workouts/"+ id);
  }
};
