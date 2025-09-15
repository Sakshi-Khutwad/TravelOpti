import React, { useEffect, useState } from 'react';
import { Plane, MapPin, Compass } from 'lucide-react';

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
      </div>

      <div className="text-center z-10">
        {/* Main Logo Animation */}
        <div className="mb-8 relative">
          <div className="inline-block relative">
            <Plane 
              className="w-20 h-20 text-yellow-400 mx-auto animate-bounce" 
              style={{ animationDuration: '2s' }}
            />
            <div className="absolute -top-2 -right-2">
              <Compass className="w-8 h-8 text-blue-400 animate-spin" />
            </div>
            <div className="absolute -bottom-2 -left-2">
              <MapPin className="w-6 h-6 text-green-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-blue-400 to-purple-400 mb-4 animate-pulse">
          Travel TSP
        </h1>
        <h2 className="text-3xl font-semibold text-slate-300 mb-8">
          Route Optimizer
        </h2>

        {/* Subtitle */}
        <p className="text-xl text-slate-400 mb-12 max-w-md mx-auto">
          Find the optimal path through multiple cities using advanced algorithms
        </p>

        {/* Progress Bar */}
        <div className="w-80 mx-auto mb-8">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Loading algorithms...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-blue-400 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;