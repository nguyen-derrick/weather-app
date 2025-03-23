import { WeatherData, formatTemperature, getWeatherIconUrl } from '../services/weatherService';

interface WeatherCardProps {
  weatherData: WeatherData;
  units: 'metric' | 'imperial';
}

const WeatherCard = ({ weatherData, units }: WeatherCardProps) => {
  const { weather, main, name } = weatherData;
  const currentWeather = weather[0];

  // Get the appropriate color based on temperature
  const getTemperatureColor = (temp: number, units: 'metric' | 'imperial'): string => {
    // Convert to Celsius for consistent comparisons
    const celsiusTemp = units === 'imperial' ? (temp - 32) * 5/9 : temp;

    if (celsiusTemp < 0) return 'from-blue-400 to-blue-700'; // Very cold
    if (celsiusTemp < 10) return 'from-blue-300 to-blue-500'; // Cold
    if (celsiusTemp < 20) return 'from-green-300 to-blue-400'; // Cool
    if (celsiusTemp < 30) return 'from-yellow-300 to-orange-400'; // Warm
    return 'from-orange-400 to-red-500'; // Hot
  };

  // Get a nice background gradient based on the current weather
  const getCardBackground = () => {
    const id = currentWeather.id;
    const tempClass = getTemperatureColor(main.temp, units);

    // Create classes based on weather condition codes
    if (id >= 200 && id < 300) return `bg-gradient-to-br from-gray-700 to-gray-900`; // Thunderstorm
    if (id >= 300 && id < 400) return `bg-gradient-to-br from-blue-400 to-blue-600`; // Drizzle
    if (id >= 500 && id < 600) return `bg-gradient-to-br from-blue-500 to-indigo-700`; // Rain
    if (id >= 600 && id < 700) return `bg-gradient-to-br from-blue-100 to-blue-300`; // Snow
    if (id >= 700 && id < 800) return `bg-gradient-to-br from-gray-300 to-gray-500`; // Atmosphere (fog, etc.)
    if (id === 800) return `bg-gradient-to-br ${tempClass}`; // Clear sky
    return `bg-gradient-to-br from-blue-300 to-blue-500`; // Clouds
  };

  // Get appropriate text color based on background
  const getTextColor = () => {
    const id = currentWeather.id;
    if (id >= 200 && id < 300) return 'text-white'; // Thunderstorm
    if (id >= 600 && id < 700) return 'text-gray-800'; // Snow
    if (id >= 700 && id < 800) return 'text-gray-800'; // Atmosphere
    if (id === 800) {
      const celsiusTemp = units === 'imperial' ? (main.temp - 32) * 5/9 : main.temp;
      return celsiusTemp > 20 ? 'text-white' : 'text-gray-800';
    }
    return 'text-white';
  };

  return (
    <div
      className={`rounded-3xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-[1.01] ${getCardBackground()}`}
    >
      <div className={`p-6 ${getTextColor()}`}>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-4xl font-bold tracking-tight">{name}</h2>
            <p className="text-lg opacity-90 capitalize">{currentWeather.description}</p>
          </div>

          <div className="flex items-center">
            <img
              src={getWeatherIconUrl(currentWeather.icon)}
              alt={currentWeather.description}
              className="w-24 h-24"
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-8xl font-light">
            {formatTemperature(main.temp, units)}
          </div>

          <div className="flex space-x-4 mt-6">
            <div className="text-center px-4 py-2 bg-black bg-opacity-10 rounded-full">
              <span className="block text-sm opacity-75">Min</span>
              <span className="text-lg font-medium">{formatTemperature(main.temp_min, units)}</span>
            </div>

            <div className="text-center px-4 py-2 bg-black bg-opacity-10 rounded-full">
              <span className="block text-sm opacity-75">Max</span>
              <span className="text-lg font-medium">{formatTemperature(main.temp_max, units)}</span>
            </div>

            <div className="text-center px-4 py-2 bg-black bg-opacity-10 rounded-full">
              <span className="block text-sm opacity-75">Feels Like</span>
              <span className="text-lg font-medium">{formatTemperature(main.feels_like, units)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
