import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
  return (
    <div className="min-h-screen bg-white">
      
      <Navbar />

      <main className=" px-4 sm:px-6 lg:px-8 pt-10">
        <Hero />
      </main>
    </div>
  );
}

export default App;