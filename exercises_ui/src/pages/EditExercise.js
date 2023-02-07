import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import Header from '../components/Header'

// Inputs for global header
const header = "Edit Exercise"
const description = "Use the prefilled form to revise the selected exercise."

// Generates a form on EditExercise page that allows a user to edit an new exercise. 
// Redirects to the HomePage upon submittal.
function Edit({exerciseToEdit}) {

    const navigate = useNavigate();
    
    const [name, setName] = useState(exerciseToEdit.name)
    const [reps, setReps] = useState(exerciseToEdit.reps)
    const [weight, setWeight] = useState(exerciseToEdit.weight)
    const [unit, setUnit] = useState(exerciseToEdit.unit)
    const [date, setDate] = useState(exerciseToEdit.date)

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, reps, weight, unit, date }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // Upon successful addition or response status error code, user is automatically redirected to HomePage. 
        // If input is deemed invalid, the user is not redirected to the HomePage and is instead 
        // given a chance to fix the incorrect inputs.
        if(reps === "" || weight === "") { 
            // If reps/weight were changed to empty strings, it means their inputs were non-numbers (or empty)
            alert("Reps and weight must be numbers") 
            navigate('/EditExercise') // Does not redirect to home if invalid date
            return // Do not continue checking to see if it can be input
        } if(!/^\d\d-\d\d-\d\d$/.test(date)) {
            alert("Date must be in format MM-DD-YY") 
            navigate("/EditExercise");
            return // Do not continue checking to see if it can be input
        } else if(response.status === 200){
             alert("Exercise edited successfully!");
             navigate("/"); // Redirects to home
        } else {
             alert(`Failed to edit exercise, status code = ${response.status}`);
             navigate("/"); // Redirects to home
        }     
    }; 

    return (
        <> 
            <Header header={header} description={description}></Header>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
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
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={editExercise}
            >Save</button>
        </>
    )
}

export default Edit