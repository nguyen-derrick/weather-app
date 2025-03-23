import { WeatherData, formatDate, formatTime } from '../services/weatherService';

interface LocationInfoProps {
  weatherData: WeatherData;
}

const LocationInfo = ({ weatherData }: LocationInfoProps) => {
  const { name, sys, dt, timezone } = weatherData;

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Location Information</h3>

      <div className="space-y-4">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Location</div>
            <div className="font-medium text-lg">{name}, {sys.country}</div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Local Date & Time</div>
            <div className="font-medium">{formatDate(dt, timezone)}</div>
            <div className="text-sm text-gray-600">{formatTime(dt, timezone)}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-2xl">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Sunrise</div>
            <div className="font-medium text-sm">{formatTime(sys.sunrise, timezone)}</div>
            <span className="mt-1 text-yellow-500 text-xl">🌅</span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 bg-indigo-50 rounded-2xl">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Sunset</div>
            <div className="font-medium text-sm">{formatTime(sys.sunset, timezone)}</div>
            <span className="mt-1 text-indigo-500 text-xl">🌇</span>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Coordinates</div>
            <div className="font-medium">
              Lat: {weatherData.coord.lat.toFixed(2)}, Lon: {weatherData.coord.lon.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
