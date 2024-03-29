import 'dotenv/config';
import * as exercises from './exercise_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();
 
app.use(express.json());

/**
 * Create a new exercise with 
 * the name, reps, weight, unit, and date provided in the body.
 */
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise)
        })
        .catch(error => {
            console.error(error)
            res.status(400).send({ Error: "Unable to update." })
        })
});
   
/**
 * Retrive the exercise corresponding to the ID provided
 */
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id // req now has a property named _id, which is whatever id is in the url
    exercises.findExerciseById(exerciseId) 
        .then(exercise => {
            if (exercise !== null) {
                res.json(exercise) // if found, return exercise (status code automatically 200)
            } else {
                res.status(404).json({ Error: "Exercise not found" })
            }
        })
        .catch(error => {
            console.error(error)
            res.status(400).json({ Error: "Request failed" })
        })
});

/**
 * Retrieve exercises. 
 * If the query parameters include another tag, then only the matching exercises are returned.
 * Otherwise, all exercises are returned.
 */
app.get('/exercises', (req, res) => {
    let filter = {}
    if (req.query.name !== undefined) { // if query named "name", add a filter based on its value
        filter.name = req.query.name
    } 
    if (req.query.reps !== undefined) { // same as above but for reps, etc.
        filter.reps = req.query.reps
    } 
    if (req.query.weight !== undefined) { 
        filter.weight = req.query.weight
    } 
    if (req.query.unit !== undefined) { 
        filter.unit = req.query.unit
    } 
    if (req.query.date !== undefined) { 
        filter.date = req.query.date
    }  
    exercises.findExercise(filter, "", 0) 
        .then(exercises => {
            res.json(exercises)
        })
        .catch(error => {
            console.error(error)
            res.status(400).json({ Error: "Request failed" })
        })
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its name, reps, weight, unit, and date to the values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) { // should only be one match max because updating by id
                res.json({_id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date})
                // we can expect that the request will have all required properties
            } else {
                res.status(404).json({ Error: "Resource not found" })
            }
        })
        .catch(error => {
            console.error(error)
            res.status(400).json({ Error: "Request failed" })
        })
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) { // should only be one match max because deleting by id
                res.status(204).send() // successful: sends back no content
            } else {
                res.status(404).json({ Error: "Exercise not found" })
            }
        })
        .catch(error => {
            console.error(error)
            res.status(400).json({ Error: "Request failed" })
        })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});