import { useState } from 'react';

function App() {
    const [temperature, setTemperature] = useState(72); // Fahrenheit
    const [city, setCity] = useState('San Francisco');
    const [weather, setWeather] = useState('Sunny');

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}
    
    const updateWeather = () => {
        setTemperature((Math.random() * 20 + 60).toFixed(1)); // Random temperature between 60-80
        setWeather(['Sunny', 'Cloudy', 'Rainy', 'Stormy'][Math.floor(Math.random() * 4)]);
    };

    function sumOfArray(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="max-w-sm p-8 bg-white rounded-2xl shadow-2xl text-center border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800">Pro Plan Occupied</h2>
        <p className="text-gray-500 mt-2">Unlock Ultra premium features and boost your productivity</p>
        <div className="mt-6">
          <span className="text-5xl font-extrabold text-gray-900">$30</span>
          <span className="text-gray-500 text-lg">/month</span>
        </div>
        <ul className="mt-6 space-y-3 text-gray-600 text-lg">
          <li className="flex items-center justify-center"><span className="text-green-500 mr-2">✔</span> Unlimited Promise</li>
          <li className="flex items-center justify-center"><span className="text-green-500 mr-2">✔</span> Custom Reports and Benefits of </li>
          <li className="flex items-center justify-center"><span className="text-green-500 mr-2">✔</span> Priority Support</li>
        </ul>
        <button className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-200">
          Get Started
        </button>
      </div>
    </div>
    );
}

export default App;
