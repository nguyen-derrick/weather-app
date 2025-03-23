import * as React from 'react';

interface TemperatureToggleProps {
  units: 'metric' | 'imperial';
  onToggle: () => void;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ units, onToggle }) => {
  const isCelsius = units === 'metric';

  return (
    <button
      onClick={onToggle}
      className="relative inline-flex items-center h-10 rounded-full bg-gray-600 w-20 px-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      aria-pressed={isCelsius}
      aria-label={`Switch to ${isCelsius ? 'Fahrenheit' : 'Celsius'}`}
    >
      <span className="sr-only">
        {isCelsius ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
      </span>

      {/* Left unit (Celsius) */}
      <span
        className={`absolute left-2 text-sm font-medium transition-opacity ${
          isCelsius ? 'text-white opacity-100' : 'text-gray-300 opacity-50'
        }`}
      >
        °C
      </span>

      {/* Toggle circle */}
      <span
        className={`absolute h-8 w-8 rounded-full bg-white shadow transform transition-transform ${
          isCelsius ? 'translate-x-0' : 'translate-x-7'
        }`}
      />

      {/* Right unit (Fahrenheit) */}
      <span
        className={`absolute right-2 text-sm font-medium transition-opacity ${
          !isCelsius ? 'text-white opacity-100' : 'text-gray-300 opacity-50'
        }`}
      >
        °F
      </span>
    </button>
  );
};

export default TemperatureToggle;
