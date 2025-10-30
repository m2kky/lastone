import { Routes, Route } from 'react-router-dom'
import './App.css'
import './styles/hero.css'
import './styles/about.css'
import './styles/services.css'
import './styles/testimonials.css'
import CustomCursor from './components/common/CustomCursor.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Home from './pages/Home/Home.jsx'
import Story from './pages/Story/Story.jsx'
import Projects from './pages/Projects/Projects.jsx'
import Contact from './pages/Contact/Contact.jsx'
import ProjectDetail from './pages/ProjectDetail/ProjectDetail.jsx'

function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<Story />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
