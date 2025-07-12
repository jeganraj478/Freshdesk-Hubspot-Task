import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Spinner from './components/Spinner'
// Lazy load each page component
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ConnectPage = lazy(() => import('./pages/ConnectPage'));
const TicketPage = lazy(() => import('./pages/TicketPage'));
const TicketDetail = lazy(() => import('./pages/TicketDetailPage'));
const WebhookPage = lazy(() => import('./pages/WebhookPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Spinner/>}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/tickets" element={<TicketPage />} />
          <Route path="/tickets/:id" element={<TicketDetail />} />
          <Route path="/webhook-logs" element={<WebhookPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
