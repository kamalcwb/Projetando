import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Company from './pages/Company';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import NewProject from './pages/NewProject';
import Project from './pages/Project'
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Container from './components/layout/Container'

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path='/projects' element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path='/project/:id' element={<Project />} />
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
