

/* Declaring Mongo Schema for the Database interaction  */
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

let CarsSchema = mongoose.Schema({
  Model: {
    type: Number,
    required: true,
  },
  Make: {
    type: String,
    required: true,
  },
  Owner: {
    type: String,
    required: true,
  },
  RegistrationNumber: {
    required: true,
    type: String,
  },
});

/*Exporting the schema/model
Below is an example of how you create a model using the model() method. The two arguments you pass to this method are:  
The name of the model 
the schema object you created in the previous step
*/
module.exports = mongoose.model("cars", CarsSchema);