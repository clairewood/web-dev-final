
import React from 'react'
import ExerciseRow from './ExerciseRow';
import '../App.css';

// Maps each row it got from ExerciseRow into a table for the HomePage to display.
function ExerciseTable({exercises, onDelete, onEdit}) {
    return (
        <div>
            <table id = "exercises">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Unit</th>
                        <th>Date</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exercise, i) => <ExerciseRow exercise={exercise}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        key={i} />)}
                </tbody>
            </table>
        </div>
    );
}

export default ExerciseTable;