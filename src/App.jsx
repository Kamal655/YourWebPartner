// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Services from './Services'
import Contact from './Contact'
import About from './About';
import Navbar from './Navbar' // ✅ Add this import

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Show the navigation on every page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
