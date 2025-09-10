
import React from 'react';
import './App.css';
import MenuBar from './components/MenuBar';
import { Routes, Route } from 'react-router-dom';
import { FacebookProvider } from 'react-facebook';
import HomePage from './pages/HomePage';
import PostsPage from './pages/PostsPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import PricePage from './pages/PricePage';
import SignUpPage from './pages/SignUpPage';
import SettingsPage from './pages/SettingsPage';
import FacebookAccountPage from './pages/FacebookAccountPage';

import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <MenuBar />
      <div className="container mt-3">
        <FacebookProvider appId={process.env.REACT_APP_FACEBOOK_APP_ID}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<PrivateRoute><PostsPage /></PrivateRoute>} />
            <Route path="/price" element={<PricePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/facebook-account" element={<PrivateRoute><FacebookAccountPage /></PrivateRoute>} />
          </Routes>
        </FacebookProvider>
      </div>
      <Footer />
    </div>
  );
}

export default App;
