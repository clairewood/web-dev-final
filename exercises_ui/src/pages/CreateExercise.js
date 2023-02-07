import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import Header from '../components/Header'

// Inputs for global header
const header = "Add Exercise"
const description = "Fill out this form to create a new exercise."

// Generates a form on CreateExercise page that allows a user to add a new exercise. 
// Redirects to the HomePage upon submittal.
function CreateExercise() {

    const navigate = useNavigate();
    
    const [name, setName] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [unit, setUnit] = useState('')
    const [date, setDate] = useState('')

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date}

        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            }
        }) 
        // Upon successful addition or response status error code, user is automatically redirected to HomePage. 
        // If input is deemed invalid, the user is not redirected to the HomePage and is instead 
        // given a chance to fix the incorrect inputs.
        if(reps === "" || weight === "") { 
            // If reps/weight were changed to empty strings, it means their inputs were non-numbers (or empty)
            alert("Reps and weight must be numbers") 
            navigate('/CreateExercise') // Does not redirect to home if invalid date
            return // Do not continue checking if/else statements
        }if(!/^\d\d-\d\d-\d\d$/.test(newExercise.date)) {
            alert("Date must be in format MM-DD-YY") 
            navigate('/CreateExercise') 
            return 
        } if(response.status === 201){
            alert("Exercise added successfully!")
            navigate('/') // Redirects to home if all inputs are valid 
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`)
            navigate('/') // Redirects to home if error not related to data validation occurs
        }
    }; 

    return (
        <> 
        <Header header={header} description={description}></Header>
            <input
                type="text"
                placeholder="Exercise name"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Reps"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                placeholder="Weight"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select 
                type="select"
                placeholder="Unit (kgs or lbs)"
                value={unit}
                onChange={e => setUnit(e.target.value)}>
                    <option value="" disabled selected>Unit (kgs or lbs)</option>
                    <option value="lbs">lbs</option>
                    <option value="kgs">kgs</option>
                </select>
            <input
                type="text"
                placeholder="Date (MM-DD-YY)"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={addExercise}
            >Add</button>
        </>
    )
}

export default CreateExercise 