import { WeatherData, LocationData } from '../services/weatherService';

// Mock location suggestions for search
export const MOCK_LOCATIONS: Record<string, LocationData[]> = {
  "toronto": [
    { name: "Toronto", lat: 43.6534817, lon: -79.3839347, country: "CA", state: "Ontario" },
    { name: "Toronto", lat: 40.4639464, lon: -80.6078504, country: "US", state: "Ohio" }
  ],
  "new": [
    { name: "New York", lat: 40.7127281, lon: -74.0060152, country: "US", state: "New York" },
    { name: "New Orleans", lat: 29.9759983, lon: -90.0782127, country: "US", state: "Louisiana" },
    { name: "New Delhi", lat: 28.6141793, lon: 77.2022662, country: "IN", state: "Delhi" }
  ],
  "london": [
    { name: "London", lat: 51.5073219, lon: -0.1276474, country: "GB", state: "England" },
    { name: "London", lat: 42.9832406, lon: -81.243372, country: "CA", state: "Ontario" }
  ],
  "paris": [
    { name: "Paris", lat: 48.8588897, lon: 2.3200410, country: "FR", state: "Île-de-France" },
    { name: "Paris", lat: 33.6609389, lon: -95.5555370, country: "US", state: "Texas" }
  ],
  "berlin": [
    { name: "Berlin", lat: 52.5170365, lon: 13.3888599, country: "DE", state: "Berlin" }
  ],
  "tokyo": [
    { name: "Tokyo", lat: 35.6828387, lon: 139.7594549, country: "JP" }
  ],
  "sydney": [
    { name: "Sydney", lat: -33.8698439, lon: 151.2082848, country: "AU", state: "New South Wales" }
  ],
  "beijing": [
    { name: "Beijing", lat: 39.906217, lon: 116.3912757, country: "CN" }
  ],
  "moscow": [
    { name: "Moscow", lat: 55.7504461, lon: 37.6174943, country: "RU", state: "Moscow" }
  ],
  "dubai": [
    { name: "Dubai", lat: 25.2653471, lon: 55.2924914, country: "AE", state: "Dubai" }
  ]
};

// Mock weather data for cities
export const MOCK_WEATHER_DATA: Record<string, WeatherData> = {
  "toronto": {
    coord: { lon: -79.3839, lat: 43.6535 },
    weather: [
      { id: 800, main: "Clear", description: "clear sky", icon: "01d" }
    ],
    main: {
      temp: 22,
      feels_like: 21,
      temp_min: 19,
      temp_max: 24,
      pressure: 1015,
      humidity: 65
    },
    wind: { speed: 3.6, deg: 160 },
    clouds: { all: 5 },
    sys: {
      country: "CA",
      sunrise: Math.floor(Date.now() / 1000) - 3600,
      sunset: Math.floor(Date.now() / 1000) + 3600
    },
    name: "Toronto",
    dt: Math.floor(Date.now() / 1000),
    timezone: -14400
  },
  "new york": {
    coord: { lon: -74.0060, lat: 40.7128 },
    weather: [
      { id: 501, main: "Rain", description: "moderate rain", icon: "10d" }
    ],
    main: {
      temp: 18,
      feels_like: 17,
      temp_min: 16,
      temp_max: 20,
      pressure: 1008,
      humidity: 78
    },
    wind: { speed: 5.1, deg: 220 },
    clouds: { all: 75 },
    sys: {
      country: "US",
      sunrise: Math.floor(Date.now() / 1000) - 3600,
      sunset: Math.floor(Date.now() / 1000) + 3600
    },
    name: "New York",
    dt: Math.floor(Date.now() / 1000),
    timezone: -14400
  },
  "london": {
    coord: { lon: -0.1276, lat: 51.5073 },
    weather: [
      { id: 804, main: "Clouds", description: "overcast clouds", icon: "04d" }
    ],
    main: {
      temp: 15,
      feels_like: 14,
      temp_min: 13,
      temp_max: 17,
      pressure: 1020,
      humidity: 70
    },
    wind: { speed: 4.1, deg: 260 },
    clouds: { all: 90 },
    sys: {
      country: "GB",
      sunrise: Math.floor(Date.now() / 1000) - 3600,
      sunset: Math.floor(Date.now() / 1000) + 3600
    },
    name: "London",
    dt: Math.floor(Date.now() / 1000),
    timezone: 0
  },
  "paris": {
    coord: { lon: 2.3200, lat: 48.8589 },
    weather: [
      { id: 802, main: "Clouds", description: "scattered clouds", icon: "03d" }
    ],
    main: {
      temp: 17,
      feels_like: 16,
      temp_min: 15,
      temp_max: 19,
      pressure: 1018,
      humidity: 63
    },
    wind: { speed: 3.1, deg: 210 },
    clouds: { all: 44 },
    sys: {
      country: "FR",
      sunrise: Math.floor(Date.now() / 1000) - 3600,
      sunset: Math.floor(Date.now() / 1000) + 3600
    },
    name: "Paris",
    dt: Math.floor(Date.now() / 1000),
    timezone: 3600
  },
  "tokyo": {
    coord: { lon: 139.7595, lat: 35.6828 },
    weather: [
      { id: 500, main: "Rain", description: "light rain", icon: "10n" }
    ],
    main: {
      temp: 20,
      feels_like: 19,
      temp_min: 18,
      temp_max: 22,
      pressure: 1012,
      humidity: 72
    },
    wind: { speed: 2.6, deg: 180 },
    clouds: { all: 60 },
    sys: {
      country: "JP",
      sunrise: Math.floor(Date.now() / 1000) - 3600,
      sunset: Math.floor(Date.now() / 1000) + 3600
    },
    name: "Tokyo",
    dt: Math.floor(Date.now() / 1000),
    timezone: 32400
  },
  "sydney": {
    coord: { lon: 151.2083, lat: -33.8698 },
    weather: [
      { id: 800, main: "Clear", description: "clear sky", icon: "01n" }
    ],
    main: {
      temp: 24,
      feels_like: 23,
      temp_min: 22,
      temp_max: 26,
      pressure: 1016,
      humidity: 55
    },
    wind: { speed: 4.1, deg: 150 },
    clouds: { all: 5 },
    sys: {
      country: "AU",
      sunrise: Math.floor(Date.now() / 1000) - 3600,
      sunset: Math.floor(Date.now() / 1000) + 3600
    },
    name: "Sydney",
    dt: Math.floor(Date.now() / 1000),
    timezone: 39600
  },
  "berlin": {
    coord: { lon: 13.3889, lat: 52.5170 },
    weather: [
      { id: 801, main: "Clouds", description: "few clouds", icon: "02d" }
    ],
    main: {
      temp: 16,
      feels_like: 15,
      temp_min: 14,
      temp_max: 18,
      pressure: 1017,
      humidity: 68
    },
    wind: { speed: 3.6, deg: 230 },
    clouds: { all: 20 },
    sys: {
      country: "DE",
      sunrise: Math.floor(Date.now() / 1000) - 3600,
      sunset: Math.floor(Date.now() / 1000) + 3600
    },
    name: "Berlin",
    dt: Math.floor(Date.now() / 1000),
    timezone: 7200
  }
};
