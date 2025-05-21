import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import { Home } from './pages/Home.jsx';
import PostDetail from './components/PostDetail.jsx'; 

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<PostDetail />} /> {/* Ruta para el detalle del post */}
    </Routes>
  </Router>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
