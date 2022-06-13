import { BrowserRouter as Router, Routes as Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Company from './pages/Company';
import Contact from './pages/Contact';
import NewProject from './pages/NewProject';

import Container from './components/layout/Container'

function App() {
  return (
    <Router>
      <ul>
        <Link to='/'>Home</Link>
        <Link to='/contact'>Contato</Link>
      </ul>
      <Container customClass="min-height">
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newproject" element={<NewProject />} />
        </Switch>
      </Container>
      <p>Footer</p>
    </Router>
  );
}

export default App;
