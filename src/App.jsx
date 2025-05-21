import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import Services from './Services'
import Contact from './Contact'

export default function App() {
  return (
    <Router>
      <div className="p-4 bg-gray-100">
        {/* Navigation */}
        <nav className="space-x-6 text-blue-600 font-semibold">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
