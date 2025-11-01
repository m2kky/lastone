import { Routes, Route } from 'react-router-dom'
import './App.css'
import './styles/hero.css'
import './styles/about.css'
import './styles/services.css'
import './styles/testimonials.css'
import './styles/blog.css'
import './styles/socialbar.css'
import CustomCursor from './components/common/CustomCursor.jsx'
import ScrollToTop from './components/common/ScrollToTop.jsx'
import SocialBar from './components/common/SocialBar.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/home/Home.jsx'
import Story from './pages/story/Story.jsx'
import Projects from './pages/projects/Projects.jsx'
import Contact from './pages/contact/Contact.jsx'
import ProjectDetail from './pages/ProjectDetail/ProjectDetail.jsx'
import LectureDetail from './pages/LectureDetail/LectureDetail.jsx'
import Lectures from './pages/lectures/Lectures.jsx'
import Blog from './pages/Blog/Blog.jsx'
import BlogDetail from './pages/BlogDetail/BlogDetail.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'

function App() {
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<Story />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/lectures" element={<Lectures />} />
        <Route path="/lectures/:id" element={<LectureDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SocialBar />
      <Footer />
    </>
  )
}

export default App
