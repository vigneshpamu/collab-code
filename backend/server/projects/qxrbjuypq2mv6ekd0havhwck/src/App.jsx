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
        <div className= "max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden" >
Vignesh App is Working Check
        < /div>
    );
}

export default App;
