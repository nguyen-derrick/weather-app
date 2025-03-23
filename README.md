# Weather App

A modern weather application that uses geolocation to show current weather conditions for your location or any city worldwide.

## Features

- 🌍 Geolocation to automatically detect user's location
- 🔍 Search for weather by city name
- 🌡️ Toggle between Celsius and Fahrenheit units
- 🌤️ Visual representation of current weather conditions
- 📱 Responsive design for all device sizes

## Screenshots

![Weather App Screenshot](./screenshots/weather-app.png)

## Built With

- [React](https://reactjs.org/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vite](https://vitejs.dev/) - Build Tool
- [OpenWeatherMap API](https://openweathermap.org/api) - Weather Data

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) or [Node.js](https://nodejs.org/) installed on your machine
- OpenWeatherMap API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

2. Install dependencies:

```bash
bun install
```

3. Create a `.env` file based on the `.env.example` template and add your OpenWeatherMap API key:

```
VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key_here
```

4. Start the development server:

```bash
bun run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## API Key

This app uses the OpenWeatherMap API to fetch weather data. You need to register for a free API key at [OpenWeatherMap](https://openweathermap.org/) and add it to your `.env` file as shown above.

## Deployment

The app can be easily deployed to Netlify:

```bash
bun run build
```

Or use the "Deploy to Netlify" button to deploy your own copy:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/weather-app)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons sourced from OpenWeatherMap's weather condition codes
