
import React from 'react'
import {Link} from 'react-router-dom'

// Supports navigation to HomePage and CreateExercise page using the Link component.
// Navigation to EditExercise page is done by clicking on the edit icon in HomePage.
function Navigation() {
    return (
            <div> 
                <nav className="App-nav">
                    <Link to="/">Home</Link>
                    <Link to="/CreateExercise"> | Create</Link>
                </nav>
            </div>
    )
}

// <Link to="/EditExercise"> | Edit</Link> 


export default Navigation