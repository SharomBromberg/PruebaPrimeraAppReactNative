import { WeatherData } from "@/interfaces/weather-interface";


const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_WEATHER_BASE_URL;

export const WeatherService = {
  obtenerClimaPorCiudad: async (ciudad: string): Promise<WeatherData> => {
    if (!API_KEY) throw new Error('Falta la API KEY en el .env');

    try {
      const url = `${BASE_URL}/weather?q=${encodeURIComponent(ciudad)}&appid=${API_KEY}&units=metric&lang=es`;
      
      const respuesta = await fetch(url);
      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.message || 'Error al consultar el clima');
      }
      
      return data; 
    } catch (error) {
      console.error("Error de red o API:", error);
      throw error;
    }
  }
};