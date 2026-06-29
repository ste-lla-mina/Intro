import React, { useState } from 'react';
import Navbar from './components/landing/Navbar';
import Hero from './components/landing/Hero';
import About from './components/landing/About';
import WhyUs from './components/landing/WhyUs';
import Footer from './components/landing/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="pt-4">
          {activeTab === 'why' && <WhyUs/>}
          {activeTab === 'home' && <Hero />}
          {activeTab === 'about' && <About />}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;