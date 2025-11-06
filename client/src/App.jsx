import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from './components/Layout';
import Preloader from './components/Preloader';
import AuthWrapper from './components/AuthWrapper';
import ErrorBoundary from './components/ErrorBoundary';


const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Notes = lazy(() => import('./pages/Notes'));
const NotFound = lazy(() => import('./pages/NotFound'));


function App() {
  const location = useLocation();
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      {showPreloader ? (
        <Preloader />
      ) : (
        <Suspense fallback={<Preloader minimal />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Layout type="default"><Home /></Layout>} />
              <Route path="/login" element={<Layout type="auth"><Login /></Layout>} />
              <Route path="/signup" element={<Layout type="auth"><Signup /></Layout>} />
              <Route path="/notes" element={<Layout type="protected"><Notes /></Layout>} />
              <Route
                path="/publicnotes"
                element={
                  <Layout type="protected">
                    <PublicNotes />
                  </Layout>
                }
              />
              <Route path="*" element={<Layout type="default"><NotFound /></Layout>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      )}
    </ErrorBoundary>
  );
}

export default App;
