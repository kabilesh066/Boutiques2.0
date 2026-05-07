import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import HomePage from './HomePage';
import ConsultationPage from './ConsultationPage';
import DesignPage from './DesignPage';
import AuthPage from './AuthPage';
import BlueprintPage from './BlueprintPage';
import CollectionsPage from './CollectionsPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const navigate = useNavigate();
  const [journeyStatus, setJourneyStatus] = useState(() => {
    const saved = localStorage.getItem('cccraftings_journey_status');
    return saved ? JSON.parse(saved) : {
      vision: false,
      measurements: false,
      craft: false,
      delivery: false,
      started: false
    };
  });

  useEffect(() => {
    localStorage.setItem('cccraftings_journey_status', JSON.stringify(journeyStatus));
  }, [journeyStatus]);

  const updateStatus = (key: string, status: boolean) => {
    setJourneyStatus(prev => {
      if (prev[key as keyof typeof prev] === status) return prev;
      return { ...prev, [key]: status, started: true };
    });
  };

  const startNewOrder = () => {
    localStorage.removeItem('cccraftings_design_state');
    localStorage.removeItem('cccraftings_journey_status');
    setJourneyStatus({
      vision: false,
      measurements: false,
      craft: false,
      delivery: false,
      started: false
    });
    navigate('/design');
  };

  const returnHome = () => {
    localStorage.removeItem('cccraftings_design_state');
    localStorage.removeItem('cccraftings_journey_status');
    setJourneyStatus({
      vision: false,
      measurements: false,
      craft: false,
      delivery: false,
      started: false
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background scanline">
      <Navbar onNewOrder={() => navigate('/collections')} onHomeClick={returnHome} />
      <Routes>
        <Route path="/" element={<HomePage journeyStatus={journeyStatus} onNewOrder={startNewOrder} />} />
        <Route path="/consultation" element={<ConsultationPage onHomeClick={returnHome} />} />
        <Route path="/design" element={<DesignPage onStatusUpdate={updateStatus} journeyStatus={journeyStatus} />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/blueprint" element={<BlueprintPage onNewOrder={() => navigate('/collections')} />} />
        <Route path="/collections" element={<CollectionsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
