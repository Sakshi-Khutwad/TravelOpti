import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import CityInputModal from './components/CityInputModal';
// import AlgorithmCards from './components/AlgorithmCards';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showInputModal, setShowInputModal] = useState(false);
  const [cities, setCities] = useState([]);
  const [sourceCity, setSourceCity] = useState('');
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setShowInputModal(true);
  };

  const handleCitiesSubmit = (cityData) => {
    setCities(cityData.cities);
    setSourceCity(cityData.sourceCity);
    setShowInputModal(false);
    setIsSetupComplete(true);
  };

  const handleReset = () => {
    setCities([]);
    setSourceCity('');
    setIsSetupComplete(false);
    setShowInputModal(true);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      {showInputModal && (
        <CityInputModal
          onSubmit={handleCitiesSubmit}
          onClose={() => setShowInputModal(false)}
        />
      )}
      
      {isSetupComplete && (
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300 mb-4">
              Travel Route Optimizer
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Discover the optimal path through {cities.length} cities using advanced algorithms
            </p>
            <button
              onClick={handleReset}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Change Cities
            </button>
          </header>
          
          {/* <AlgorithmCards cities={cities} sourceCity={sourceCity} /> */}
        </div>
      )}
    </div>
  );
}

export default App;