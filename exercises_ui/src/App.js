import './App.css';
import React, {useState} from 'react'
import Navigation from './components/Navigation'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreateExercise from './pages/CreateExercise'
import EditExercise from './pages/EditExercise'
import Header from './components/Header'
import Footer from './components/Footer'


function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState()

  return (
    <div className="App">
      <Router> 
          <div className="App-header">
          <Header/>
            <Navigation />
            <p></p>
              <Routes>
                <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route>
                <Route path="/CreateExercise" element={<CreateExercise/>}></Route>
                <Route path="/EditExercise" element={<EditExercise exerciseToEdit={exerciseToEdit}/>}></Route>
              </Routes>
          </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
