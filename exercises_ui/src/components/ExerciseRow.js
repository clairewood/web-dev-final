
import React from 'react'
import '../App.css';
import {MdEdit} from "react-icons/md"
import {MdDelete} from "react-icons/md"

// Takes an individual exercise and makes it into one element of a row in the table,
// then passes the newly-made row to ExerciseTable, which makes it into a table
// for the HomePage.  
function ExerciseRow({exercise, onDelete, onEdit}) {
    //const navigate = useNavigate(); 

    return (
        <>
            <tr>
                <td>{exercise.name}</td>
                <td>{exercise.reps}</td>
                <td>{exercise.weight}</td>
                <td>{exercise.unit}</td>
                <td>{exercise.date}</td>
                <td><MdEdit onClick={() => onEdit(exercise)}/></td> 
                <td><MdDelete onClick={() => onDelete(exercise._id)}/></td>
            </tr>
        </>
    );
} 
// setExerciseToEdit(exercise)
//navigate("/EditExercise")

export default ExerciseRow;