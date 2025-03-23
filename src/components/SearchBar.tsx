import { useState, useEffect, useRef } from 'react';
import { LocationData, getCitySuggestions } from '../services/weatherService';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onSelectLocation: (location: LocationData) => void;
  onToggleUnits: () => void;
  units: 'metric' | 'imperial';
}

const SearchBar = ({ onSearch, onSelectLocation, onToggleUnits, units }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<LocationData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

      setIsLoading(true);
      try {
        const results = await getCitySuggestions(searchTerm);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the API call
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      onSearch(searchTerm);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (location: LocationData) => {
    setSearchTerm(location.name);
    onSelectLocation(location);
    setShowSuggestions(false);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8 relative" ref={searchContainerRef}>
      <div className="relative flex-grow">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for a city..."
          className="w-full px-4 py-3 pl-10 pr-4 rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label="Search for a city"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="p-3 text-gray-500 text-center">Loading suggestions...</div>
            ) : suggestions.length === 0 ? (
              <div className="p-3 text-gray-500 text-center">No cities found</div>
            ) : (
              <ul>
                {suggestions.map((location, index) => (
                  <li
                    key={`${location.lat}-${location.lon}-${index}`}
                    className="cursor-pointer p-3 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
                    onClick={() => handleSuggestionClick(location)}
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
        onClick={handleSearch}
        className="py-3 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors shadow-sm whitespace-nowrap"
      >
        Search
      </button>

      <button
        type="button"
        onClick={onToggleUnits}
        className="py-3 px-6 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors shadow-sm whitespace-nowrap"
      >
        {units === 'metric' ? '°C → °F' : '°F → °C'}
      </button>
    </div>
  );
};

export default SearchBar;
