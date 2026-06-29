import React from 'react';
import Navbar from './components/landing/Navbar';
import Hero from './components/landing/Hero';
import Footer from './components/landing/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      
      <Navbar />

      <main className=" px-4 sm:px-6 lg:px-8 pt-10">
        <Hero />
      </main>
      <Footer/>
    </div>
  );
}

export default App;