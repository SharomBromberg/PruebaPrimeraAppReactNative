
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const MusicService = {
    buscarCanciones: async (busqueda: string): Promise<DeezerApiResponse> => {
      try {
        // Petición a Internet en segundo plano
        const respuesta = await fetch(`${BASE_URL}/search?q=${busqueda}`);
        
        if (!respuesta.ok) throw new Error('Error al conectar con los servidores de música');
        
        // Transformación de los datos ligeros a JSON
        return await respuesta.json(); 
      } catch (error) {
        console.error("Fallo en la capa de red: ", error);
        throw error; // Permite que la pantalla visual atrape el error
      }
    }
  };