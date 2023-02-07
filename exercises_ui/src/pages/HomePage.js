import React, { useState, useEffect } from 'react'
import ExerciseTable from '../components/ExerciseTable'
import {useNavigate, Link} from "react-router-dom"
import Header from '../components/Header'

// Inputs for global header
const header = "Exercise Tracker"
const description = "All added exercises are in the table below."

// HomePage loads upon App launch
function HomePage({setExerciseToEdit}) {
    const [exercises, setExercises] = useState([])
    const navigate = useNavigate(); 

    // Deleting a document (row of the exercise table)
    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE'})
        if (response.status === 204) {
            setExercises(exercises.filter(m => m._id !== _id))
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`)
        }
    }
    // Editing a document
    const onEdit = exercise => {
        setExerciseToEdit(exercise) // TODO if I change this to setExercises it works for longer
        navigate("/EditExercise"); 
    }
    // Fetching the exercises from localhost:3000/exercises
    const loadExercises = async () => {
        const response = await fetch("/exercises")
        const exercises = await response.json()
        setExercises(exercises)
    }
    // Reloads table of exercises
    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>  
            <Header header={header} description={description}></Header>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit} ></ExerciseTable>
            <Link to="/CreateExercise">Add a new exercise</Link>
        </>
    )
}

export default HomePage 

