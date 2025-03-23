import axios from 'axios';
import { MOCK_LOCATIONS, MOCK_WEATHER_DATA } from '../data/mockWeatherData';

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'dummy_key';

// Base URL for OpenWeatherMap API
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_BASE_URL = 'https://api.openweathermap.org/geo/1.0';

// Flag to force using mock data (set to true to always use mock data)
const USE_MOCK_DATA = true;

// Location data interface
export interface LocationData {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

// Weather service interface
export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
  dt: number;
  timezone: number;
}

// Get city suggestions based on search term
export const getCitySuggestions = async (searchTerm: string): Promise<LocationData[]> => {
  if (!searchTerm || searchTerm.length < 2) return [];

  // If we're using mock data, try to find a match in our mock data
  const searchTermLower = searchTerm.toLowerCase();

  // Check for exact matches in our mock location keys
  if (MOCK_LOCATIONS[searchTermLower]) {
    return MOCK_LOCATIONS[searchTermLower];
  }

  // Check for partial matches in our mock location keys
  for (const [key, locations] of Object.entries(MOCK_LOCATIONS)) {
    if (key.includes(searchTermLower) || searchTermLower.includes(key)) {
      return locations;
    }
  }

  // If not using mock data or no match found in mock data, try the API
  if (!USE_MOCK_DATA) {
    try {
      const response = await axios.get(`${GEO_BASE_URL}/direct`, {
        params: {
          q: searchTerm,
          limit: 5,
          appid: API_KEY,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
  }

  // Fallback: try to find cities in the mock data that contain the search term
  const allCities = Object.values(MOCK_LOCATIONS).flat();
  return allCities.filter(city =>
    city.name.toLowerCase().includes(searchTermLower)
  );
};

// Get current weather by coordinates
export const getWeatherByCoordinates = async (lat: number, lon: number, units = 'metric'): Promise<WeatherData> => {
  if (USE_MOCK_DATA) {
    // Find the closest city in our mock data based on coordinates
    // This is a simplified approach - in a real app, you'd use distance calculations
    const allCities = Object.values(MOCK_WEATHER_DATA);
    let closestCity = allCities[0];
    let minDistance = Number.MAX_VALUE;

    for (const city of allCities) {
      const distance = Math.sqrt(
        Math.pow(city.coord.lat - lat, 2) +
        Math.pow(city.coord.lon - lon, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestCity = city;
      }
    }

    return {
      ...closestCity,
      // Update timestamps for realistic data
      dt: Math.floor(Date.now() / 1000),
      sys: {
        ...closestCity.sys,
        sunrise: Math.floor(Date.now() / 1000) - 3600,
        sunset: Math.floor(Date.now() / 1000) + 3600
      }
    };
  }

  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Get current weather by city name
export const getWeatherByCity = async (city: string, units = 'metric'): Promise<WeatherData> => {
  if (USE_MOCK_DATA) {
    const cityLower = city.toLowerCase();

    // Try exact match
    if (MOCK_WEATHER_DATA[cityLower]) {
      return {
        ...MOCK_WEATHER_DATA[cityLower],
        // Update timestamps for realistic data
        dt: Math.floor(Date.now() / 1000),
        sys: {
          ...MOCK_WEATHER_DATA[cityLower].sys,
          sunrise: Math.floor(Date.now() / 1000) - 3600,
          sunset: Math.floor(Date.now() / 1000) + 3600
        }
      };
    }

    // Try partial match
    for (const [key, data] of Object.entries(MOCK_WEATHER_DATA)) {
      if (key.includes(cityLower) || cityLower.includes(key)) {
        return {
          ...data,
          // Update timestamps for realistic data
          dt: Math.floor(Date.now() / 1000),
          sys: {
            ...data.sys,
            sunrise: Math.floor(Date.now() / 1000) - 3600,
            sunset: Math.floor(Date.now() / 1000) + 3600
          }
        };
      }
    }

    // If no match, return Toronto as default
    return {
      ...MOCK_WEATHER_DATA["toronto"],
      name: city, // Use the requested city name
      dt: Math.floor(Date.now() / 1000),
      sys: {
        ...MOCK_WEATHER_DATA["toronto"].sys,
        country: "??", // Unknown country
        sunrise: Math.floor(Date.now() / 1000) - 3600,
        sunset: Math.floor(Date.now() / 1000) + 3600
      }
    };
  }

  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Get weather icon URL
export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

// Format temperature
export const formatTemperature = (temp: number, units = 'metric'): string => {
  const symbol = units === 'metric' ? '°C' : '°F';
  return `${Math.round(temp)}${symbol}`;
};

// Format date
export const formatDate = (timestamp: number, timezone: number): string => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format time
export const formatTime = (timestamp: number, timezone: number): string => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
