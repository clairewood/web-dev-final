import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.set("strictQuery", false); 
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true }, // name of exercise
    reps: { type: Number, required: true }, // # of reps
    weight: { type: Number, required: true }, // # of units of weights used
    unit: { type: String, required: true }, // unit of measurement (kgs or lbs)
    date: { type: String, required: true } // date exercise was performed
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
 const Exercise = mongoose.model("Exercise", exerciseSchema);

 /**
* Validate date format
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
* Used for creating and replacing exercises
*/
function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

 /**
* Validate reps and weight are both numbers
* @param {number} reps
* @param {number} weight
* Return true if both reps and weight are numbers, false otherwise 
*/
function areNums(reps, weight) {
    if (reps == null || weight == null) { // if null, return false 
        return false
    } else if (isNaN(reps) || isNaN(weight)) { // if not null but IS NaN, return false
        return false
    } else {
        return true
    }
}
 
/**
 * Create an exercise
 * @param {String} name 
 * @param {Number} reps 
 * @param {Number} weight 
 * @param {String} unit 
 * @param {String} date
 * @returns A promise. Resolves to the JavaScript object for the document created by calling save
 */
 const createExercise = async (name, reps, weight, unit, date) => {
    if (isDateValid(date) && areNums(reps, weight)) { // does not create if data invalid
        const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
        return exercise.save(); // will persist this exercise instance into MongoDB
    }
}

/**
 * Retrieve the exercise that matches the id given
 * @param {String} _id 
 * @returns A promise. Resolves to the matching document in MongoDB, if one exists
 */ 
 const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id)
    return query.exec() 
}

/**
 * Retrieve an exercise based on filter, projection, and limit parameters
 * @param {Object} filter 
 * @param {String} projection
 * @param {Number} limit
 * @returns A promise. Resolves to an array containing the matching document(s) in MongoDB, if they exist
 */ 
 const findExercise = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit)
    return query.exec() 
}

/**
 * Replace the name, reps, weight, unit, and date properties of the exercise with matching id value provided
 * @param {String} _id
 * @param {String} name 
 * @param {Number} reps 
 * @param {Number} weight 
 * @param {String} unit 
 * @param {String} date
 * @returns The number of replaced documents or, if none were updated, returns an Error.
 */
 const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    if (isDateValid(date) && areNums(reps, weight)) { // does not replace if data invalid
        const result = await Exercise.replaceOne({_id: _id}, {name: name, reps: reps, weight: weight, unit: unit, date: date})
        return result.modifiedCount
    }
}

/**
 * Delete the exercise that matches the id given
 * @param {String} _id
 * @returns A promise. Resolves to the matching document in MongoDB, if one exists
 */ 
 const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({_id: _id})
    return result.deletedCount
}

export { createExercise, findExerciseById, findExercise, replaceExercise, deleteById }; 