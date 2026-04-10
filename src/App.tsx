import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './i18n/index';
import Home from './pages/Home';
import Portal from './pages/Portal';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/portal/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}