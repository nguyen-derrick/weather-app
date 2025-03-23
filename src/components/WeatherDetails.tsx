import { WeatherData, formatTemperature } from '../services/weatherService';

interface WeatherDetailsProps {
  weatherData: WeatherData;
  units: 'metric' | 'imperial';
}

const WeatherDetails = ({ weatherData, units }: WeatherDetailsProps) => {
  const { main, wind, clouds, weather } = weatherData;

  // Helper for creating detail items with consistent styling
  const DetailItem = ({ label, value, icon }: { label: string; value: string | number; icon?: string }) => (
    <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-4">
        {icon ? (
          <span className="text-lg">{icon}</span>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <div>
        <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 rounded-3xl p-5 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Weather Details</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DetailItem
          label="Feels Like"
          value={formatTemperature(main.feels_like, units)}
          icon="🌡️"
        />

        <DetailItem
          label="Humidity"
          value={`${main.humidity}%`}
          icon="💧"
        />

        <DetailItem
          label="Wind Speed"
          value={`${wind.speed} ${units === 'metric' ? 'm/s' : 'mph'}`}
          icon="💨"
        />

        <DetailItem
          label="Pressure"
          value={`${main.pressure} hPa`}
          icon="📊"
        />

        <DetailItem
          label="Cloudiness"
          value={`${clouds.all}%`}
          icon="☁️"
        />

        <DetailItem
          label="Weather"
          value={weather[0].description}
          icon="🌤️"
        />
      </div>
    </div>
  );
};

export default WeatherDetails;
