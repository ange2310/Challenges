import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Privacy from './pages/Privacy';

export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '200px', padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/privacy" element={<Privacy />} />
            <Route path="/settings/internet" element={<Home />} />
            <Route path="/settings/notifications" element={<Home />} />
            <Route path="/messages" element={<Home />} />
            <Route path="/help" element={<Home />} />
            <Route path="/logout" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
