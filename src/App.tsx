import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import CompassPage from './pages/Compass';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Journal from './pages/Journal';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/compass" element={<CompassPage />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
