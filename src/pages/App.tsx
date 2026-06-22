import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
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

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
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
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Dynamic Background Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-0 pointer-events-none"
        >
          {location.pathname === '/' && (
            <img 
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80" 
              className="w-full h-full object-cover" 
              alt="Home Background" 
            />
          )}
          {location.pathname === '/consultation' && (
            <img 
              src="/src/assets/images/consultation_bg_luxury_1778160024133.png" 
              className="w-full h-full object-cover" 
              alt="Consultation Background" 
            />
          )}
          {(location.pathname === '/design' || location.pathname === '/blueprint') && (
            <img 
              src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80" 
              className="w-full h-full object-cover" 
              alt="Design Background" 
            />
          )}
          {location.pathname === '/auth' && (
             <img 
             src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80" 
             className="w-full h-full object-cover" 
             alt="Auth Background" 
           />
          )}
           {location.pathname === '/collections' && (
             <img 
             src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80" 
             className="w-full h-full object-cover" 
             alt="Collections Background" 
           />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 scanline min-h-screen flex flex-col">
        <Navbar onNewOrder={() => navigate('/collections')} onHomeClick={returnHome} />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location}>
              <Route path="/" element={<PageWrapper><HomePage journeyStatus={journeyStatus} onNewOrder={startNewOrder} /></PageWrapper>} />
              <Route path="/consultation" element={<PageWrapper><ConsultationPage onHomeClick={returnHome} /></PageWrapper>} />
              <Route path="/design" element={<PageWrapper><DesignPage onStatusUpdate={updateStatus} journeyStatus={journeyStatus} /></PageWrapper>} />
              <Route path="/auth" element={<PageWrapper><AuthPage /></PageWrapper>} />
              <Route path="/blueprint" element={<PageWrapper><BlueprintPage onNewOrder={() => navigate('/collections')} /></PageWrapper>} />
              <Route path="/collections" element={<PageWrapper><CollectionsPage /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
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
