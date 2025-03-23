import { useState, useEffect, useRef } from 'react';
import {
  WeatherData,
  getWeatherByCity,
  getWeatherByCoordinates,
  LocationData,
  getCitySuggestions
} from './services/weatherService';
import WeatherCard from './components/WeatherCard';
import WeatherDetails from './components/WeatherDetails';
import LocationInfo from './components/LocationInfo';
import TemperatureToggle from './components/TemperatureToggle';

interface ApiError {
  response?: {
    status: number;
  };
  message: string;
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<LocationData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch city suggestions when search term changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoadingSuggestions(true);
      try {
        const results = await getCitySuggestions(searchTerm);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };

    // Debounce the API call
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const fetchWeatherByCity = async (city: string) => {
    if (!city) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getWeatherByCity(city, units);
      setWeatherData(data);
    } catch (err: unknown) {
      console.error('Error getting weather by city:', err);

      const apiError = err as ApiError;
      if (apiError.response && apiError.response.status === 404) {
        setError(`City "${city}" not found. Please check the spelling and try again.`);
      } else {
        setError('Failed to get weather data. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = async (location: LocationData) => {
    setSearchTerm(location.name);
    setShowSuggestions(false);

    setIsLoading(true);
    setError(null);

    try {
      const data = await getWeatherByCoordinates(location.lat, location.lon, units);
      setWeatherData(data);
    } catch (err) {
      console.error('Error getting weather by coordinates:', err);
      setError('Failed to get weather data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      fetchWeatherByCity(searchTerm);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleUnits = () => {
    setUnits(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  // When units change, refresh weather data if we have city
  useEffect(() => {
    if (weatherData && weatherData.name) {
      fetchWeatherByCity(weatherData.name);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 opacity-10 w-32 h-32 transform -rotate-12">
        <img src="/images/sun.svg" alt="" aria-hidden="true" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10 w-40 h-40">
        <img src="/images/cloud.svg" alt="" aria-hidden="true" />
      </div>
      <div className="absolute bottom-20 left-20 opacity-10 w-40 h-40 transform rotate-12">
        <img src="/images/rain.svg" alt="" aria-hidden="true" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <header className="mb-8 text-center sm:text-left">
          <h1 className="text-5xl font-bold mb-4 text-blue-600">Weather App</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Get real-time weather information for any location with beautiful visualizations.
          </p>
        </header>

        <div className="flex flex-col sm:flex-row gap-3 mb-8 relative" ref={searchContainerRef}>
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search for a city..."
              className="w-full px-4 py-3 pl-10 pr-4 rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              aria-label="Search for a city"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Suggestions dropdown */}
            {showSuggestions && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto">
                {isLoadingSuggestions ? (
                  <div className="p-3 text-gray-500 text-center">Loading suggestions...</div>
                ) : suggestions.length === 0 ? (
                  <div className="p-3 text-gray-500 text-center">No cities found</div>
                ) : (
                  <ul>
                    {suggestions.map((location, index) => (
                      <li
                        key={`${location.lat}-${location.lon}-${index}`}
                        className="cursor-pointer p-3 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
                        onClick={() => handleLocationSelect(location)}
                      >
                        <div className="font-medium">{location.name}</div>
                        <div className="text-sm text-gray-500">
                          {location.state ? `${location.state}, ` : ''}{location.country}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            className="py-3 px-6 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors shadow-sm whitespace-nowrap"
            onClick={handleSearch}
          >
            Search
          </button>

          <TemperatureToggle units={units} onToggle={toggleUnits} />
        </div>

        {isLoading ? (
          <div className="mt-8 bg-white shadow-sm rounded-2xl overflow-hidden">
            {/* Header placeholder */}
            <div className="p-4 animate-pulse">
              <div className="h-8 bg-gray-200 rounded-full w-1/3 mb-4"></div>
            </div>

            {/* Main content placeholder */}
            <div className="p-6 animate-pulse">
              <div className="h-24 bg-gray-200 rounded-2xl w-full mb-6"></div>
            </div>

            {/* Details placeholder */}
            <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 animate-pulse">
              <div className="h-20 bg-gray-200 rounded-2xl"></div>
              <div className="h-20 bg-gray-200 rounded-2xl"></div>
              <div className="h-20 bg-gray-200 rounded-2xl"></div>
              <div className="h-20 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        ) : error ? (
          <div className="mt-8 p-8 rounded-2xl bg-red-50 border border-red-200 text-red-700">
            <h3 className="text-xl font-semibold mb-2">Error</h3>
            <p>{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-4 px-6 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-full transition-colors"
            >
              Dismiss
            </button>
          </div>
        ) : weatherData ? (
          <div className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <WeatherCard
                  weatherData={weatherData}
                  units={units}
                />
              </div>
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 gap-6">
                  <LocationInfo weatherData={weatherData} />
                  <WeatherDetails weatherData={weatherData} units={units} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-16 text-center text-gray-400">
            <div className="w-24 h-24 mx-auto mb-4">
              <img src="/images/cloud.svg" alt="" className="w-full h-full" />
            </div>
            <p className="text-xl">Enter a location to view the weather</p>
          </div>
        )}

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p className="mb-1">Data provided by OpenWeatherMap</p>
          <p>© {new Date().getFullYear()} Weather App • Made with ❤️</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
