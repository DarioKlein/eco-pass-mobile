import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyCard from './pages/MyCard';
import NewRecycling from './pages/NewRecycling';
import RedeemCredits from './pages/RedeemCredits';
import ValidationAdmin from './pages/ValidationAdmin';
import './App.css';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="lg:flex">
      <Navigation />
      <div className="flex-1 lg:pl-64">
        <main className="focus:outline-none">
          <div className="pb-40 lg:pb-8 min-h-screen">
            <div className="lg:hidden px-4 pt-4">
              {children}
            </div>
            <div className="hidden lg:block">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <AppLayout>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-card"
          element={
            <ProtectedRoute>
              <MyCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-recycling"
          element={
            <ProtectedRoute>
              <NewRecycling />
            </ProtectedRoute>
          }
        />
        <Route
          path="/redeem-credits"
          element={
            <ProtectedRoute>
              <RedeemCredits />
            </ProtectedRoute>
          }
        />
        <Route
          path="/validation"
          element={
            <ProtectedRoute>
              <ValidationAdmin />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppLayout>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;