import React, { useState, useEffect } from 'react';
import { Zap, Brain, Layers, Play, Clock, Route } from 'lucide-react';
import TSPVisualizer from './TSPVisualizer';
// import { bruteForceTSP, greedyTSP, dynamicProgrammingTSP } from '../algorithms/tspAlgorithms';

const AlgorithmCards = ({ cities, sourceCity }) => {
  const [results, setResults] = useState({
    'Brute Force': { result: null, isLoading: false, error: null },
    'Greedy': { result: null, isLoading: false, error: null },
    'Dynamic Programming': { result: null, isLoading: false, error: null }
  });

//   const algorithms = [
//     {
//       name: 'Brute Force',
//       description: 'Explores all possible routes to find the absolute optimal solution',
//       icon: Zap,
//       color: 'from-red-500 to-orange-500',
//       complexity: 'O(n!)',
//       bestFor: 'Small datasets (≤ 10 cities)',
//       implementation: bruteForceTSP
//     },
//     {
//       name: 'Greedy',
//       description: 'Always chooses the nearest unvisited city at each step',
//       icon: Brain,
//       color: 'from-green-500 to-emerald-500',
//       complexity: 'O(n²)',
//       bestFor: 'Quick approximations',
//       implementation: greedyTSP
//     },
//     {
//       name: 'Dynamic Programming',
//       description: 'Uses memoization to solve subproblems efficiently',
//       icon: Layers,
//       color: 'from-blue-500 to-cyan-500',
//       complexity: 'O(n² × 2ⁿ)',
//       bestFor: 'Medium datasets (≤ 15 cities)',
//       implementation: dynamicProgrammingTSP
//     }
//   ];

//   const runAlgorithm = async (algorithmName, implementation) => {
//     setResults(prev => ({
//       ...prev,
//       [algorithmName]: { result: null, isLoading: true, error: null }
//     }));

//     try {
//       // Add a small delay to show loading state
//       await new Promise(resolve => setTimeout(resolve, 500));
      
//       const startTime = performance.now();
//       const result = implementation(cities, sourceCity);
//       const endTime = performance.now();
      
//       setResults(prev => ({
//         ...prev,
//         [algorithmName]: {
//           result: {
//             ...result,
//             executionTime: endTime - startTime
//           },
//           isLoading: false,
//           error: null
//         }
//       }));
//     } catch (error) {
//       setResults(prev => ({
//         ...prev,
//         [algorithmName]: {
//           result: null,
//           isLoading: false,
//           error: error.message
//         }
//       }));
//     }
//   };

//   const runAllAlgorithms = () => {
//     algorithms.forEach(algorithm => {
//       runAlgorithm(algorithm.name, algorithm.implementation);
//     });
//   };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <button
          onClick={runAllAlgorithms}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-3 mx-auto"
        >
          <Play className="w-6 h-6" />
          <span>Run All Algorithms</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {algorithms.map((algorithm) => {
          const result = results[algorithm.name];
          const Icon = algorithm.icon;

          return (
            <div
              key={algorithm.name}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${algorithm.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{algorithm.name}</h3>
                    <p className="text-slate-400 text-sm">{algorithm.complexity}</p>
                  </div>
                </div>
                <button
                  onClick={() => runAlgorithm(algorithm.name, algorithm.implementation)}
                  disabled={result.isLoading}
                  className={`p-2 rounded-lg bg-gradient-to-r ${algorithm.color} hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300`}
                >
                  <Play className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm mb-4">{algorithm.description}</p>
              
              {/* Best For */}
              <div className="bg-slate-700 rounded-lg p-3 mb-6">
                <p className="text-xs text-slate-400 font-medium">BEST FOR</p>
                <p className="text-white text-sm">{algorithm.bestFor}</p>
              </div>

              {/* Results */}
              {result.isLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-slate-300">Computing optimal route...</p>
                </div>
              )}

              {result.error && (
                <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-4">
                  <p className="text-red-300 text-sm">{result.error}</p>
                </div>
              )}

              {result.result && (
                <div className="space-y-4">
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Route className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-slate-400 font-medium">DISTANCE</span>
                      </div>
                      <p className="text-white font-bold">{result.result.distance.toFixed(2)}</p>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-slate-400 font-medium">TIME</span>
                      </div>
                      <p className="text-white font-bold">{result.result.executionTime.toFixed(2)}ms</p>
                    </div>
                  </div>

                  {/* Path */}
                  <div className="bg-slate-700 rounded-lg p-3">
                    <p className="text-xs text-slate-400 font-medium mb-2">OPTIMAL PATH</p>
                    <div className="flex flex-wrap gap-1">
                      {result.result.path.map((city, index) => (
                        <span key={index} className="text-xs bg-slate-600 text-white px-2 py-1 rounded">
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Visualization */}
                  <TSPVisualizer
                    cities={cities}
                    path={result.result.path}
                    color={algorithm.color}
                  />
                </div>
              )}

              {!result.result && !result.isLoading && !result.error && (
                <div className="text-center py-8">
                  <div className="text-slate-500 mb-2">
                    <Icon className="w-12 h-12 mx-auto" />
                  </div>
                  <p className="text-slate-400">Click play to start optimization</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlgorithmCards;