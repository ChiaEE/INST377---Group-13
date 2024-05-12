// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ComedyBooks from './components/ComedyBooks';
import AboutPage from './components/AboutPage';
import Navigation from './components/Navigation';
// Import other components

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/Comedy" element={<ComedyBooks />} />
                <Route path="/about" element={<AboutPage />} />
                // Define other routes
            </Routes>
        </Router>
    );
}

export default App;