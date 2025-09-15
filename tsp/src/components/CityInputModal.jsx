import React, { useState } from 'react';
import { MapPin, X, Plus, Trash2 } from 'lucide-react';

const CityInputModal = ({ onSubmit, onClose }) => {
  const [numCities, setNumCities] = useState(4);
  const [cities, setCities] = useState([
    'New York',
    'Los Angeles', 
    'Chicago',
    'Miami'
  ]);
  const [sourceCity, setSourceCity] = useState('New York');
  const [currentStep, setCurrentStep] = useState(1);

  const handleNumCitiesChange = (newNum) => {
    setNumCities(newNum);
    
    if (newNum > cities.length) {
      // Add more cities
      const newCities = [...cities];
      for (let i = cities.length; i < newNum; i++) {
        newCities.push(`City ${i + 1}`);
      }
      setCities(newCities);
    } else {
      // Remove excess cities
      setCities(cities.slice(0, newNum));
    }
  };

  const updateCity = (index, value) => {
    const updatedCities = cities.map((city, i) => 
      i === index ? value : city
    );
    setCities(updatedCities);
  };

  const addCity = () => {
    setCities([...cities, `City ${cities.length + 1}`]);
    setNumCities(cities.length + 1);
  };

  const removeCity = (index) => {
    if (cities.length > 2) {
      const updatedCities = cities.filter((_, i) => i !== index);
      setCities(updatedCities);
      setNumCities(updatedCities.length);
      
      // Reset source city if it was the removed city
      if (sourceCity === cities[index]) {
        setSourceCity(updatedCities[0] || '');
      }
    }
  };

  const handleSubmit = () => {
    if (cities.length >= 2 && sourceCity && cities.includes(sourceCity)) {
      onSubmit({ cities, sourceCity });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-400">
              Plan Your Journey
            </h2>
            <p className="text-slate-400 mt-2">Configure cities and starting point for optimization</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="bg-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
                Number of Cities
              </h3>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={numCities}
                  onChange={(e) => handleNumCitiesChange(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-2xl font-bold text-yellow-400 min-w-[3rem]">
                  {numCities}
                </span>
              </div>
              <p className="text-slate-400 mt-2 text-sm">
                Choose between 2-10 cities for your travel route
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setCurrentStep(2)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Next: Configure Cities
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
                  Cities Configuration
                </h3>
                <button
                  onClick={addCity}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add City</span>
                </button>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {cities.map((city, index) => (
                  <div key={index} className="bg-slate-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-slate-300 font-medium">City {index + 1}</span>
                      {cities.length > 2 && (
                        <button
                          onClick={() => removeCity(index)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => updateCity(index, e.target.value)}
                      className="w-full bg-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="City name"
                    />
                  </div>
                ))}
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">Starting City</h4>
                <select
                  value={sourceCity}
                  onChange={(e) => setSourceCity(e.target.value)}
                  className="w-full bg-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={cities.length < 2 || !sourceCity || !cities.includes(sourceCity)}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Start Optimization
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #fbbf24, #3b82f6);
          cursor: pointer;
          border: 2px solid #ffffff;
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #fbbf24, #3b82f6);
          cursor: pointer;
          border: 2px solid #ffffff;
        }
      `}</style>
    </div>
  );
};

export default CityInputModal;