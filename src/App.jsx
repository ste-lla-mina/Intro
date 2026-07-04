import React, { useState } from 'react';
import Navbar from './components/landing/Navbar';
import Hero from './components/landing/Hero';
import About from './components/landing/About';
import WhyUs from './components/landing/WhyUs';
import Footer from './components/landing/Footer';
import Auth from './components/landing/Auth';
import Login from './components/landing/Login';
import SignUp from './components/landing/Signup';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  if (activeTab === 'login') {
    return (
      <Auth onBackToHome={() => setActiveTab('home')}>
        <Login onSwitchToSignUp={() => setActiveTab('signup')} />
      </Auth>
    );
  }

  if (activeTab === 'signup') {
    return (
      <Auth onBackToHome={() => setActiveTab('home')}>
        <SignUp onSwitchToLogin={() => setActiveTab('login')} />
      </Auth>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div>
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLoginClick={() => setActiveTab('login')}
          onJoinClick={() => setActiveTab('signup')}
        />

        <main className="pt-4">
          {activeTab === 'why' && <WhyUs />}
          {activeTab === 'home' && <Hero />}
          {activeTab === 'about' && <About />}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;