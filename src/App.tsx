import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ConsultationPage from './pages/ConsultationPage';
import DesignPage from './pages/DesignPage';
import AuthPage from './pages/AuthPage';
import BlueprintPage from './pages/BlueprintPage';
import CollectionsPage from './pages/CollectionsPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [journeyStatus, setJourneyStatus] = useState(() => {
    const saved = localStorage.getItem('aurelle_journey_status');
    return saved ? JSON.parse(saved) : {
      vision: false,
      measurements: false,
      craft: false,
      delivery: false,
      started: false // Added to track if user ever entered data
    };
  });

  useEffect(() => {
    localStorage.setItem('aurelle_journey_status', JSON.stringify(journeyStatus));
  }, [journeyStatus]);

  const updateStatus = (key: string, status: boolean) => {
    setJourneyStatus(prev => {
      if (prev[key as keyof typeof prev] === status) return prev;
      return { ...prev, [key]: status, started: true };
    });
  };

  const startNewOrder = () => {
    localStorage.removeItem('aurelle_design_state');
    localStorage.removeItem('aurelle_journey_status');
    setJourneyStatus({
      vision: false,
      measurements: false,
      craft: false,
      delivery: false,
      started: false
    });
    window.location.href = '/design';
  };

  const returnHome = () => {
    localStorage.removeItem('aurelle_design_state');
    localStorage.removeItem('aurelle_journey_status');
    setJourneyStatus({
      vision: false,
      measurements: false,
      craft: false,
      delivery: false,
      started: false
    });
    window.location.href = '/';
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background scanline">
        <Navbar onNewOrder={() => window.location.href = '/collections'} onHomeClick={returnHome} />
        <Routes>
          <Route path="/" element={<HomePage journeyStatus={journeyStatus} onNewOrder={startNewOrder} />} />
          <Route path="/consultation" element={<ConsultationPage onHomeClick={returnHome} />} />
          <Route path="/design" element={<DesignPage onStatusUpdate={updateStatus} journeyStatus={journeyStatus} />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/blueprint" element={<BlueprintPage onNewOrder={() => window.location.href = '/collections'} />} />
          <Route path="/collections" element={<CollectionsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
