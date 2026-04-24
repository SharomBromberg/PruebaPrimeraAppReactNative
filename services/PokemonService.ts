import { PokemonData } from "@/interfaces/pokemon-interface";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

//Los servicios son para separar la logica de conexión a internet del diseño visual.


export const PokemonService = {

  //al poner async antes de una función, le estamos diciendo a ts que esa función siempre va a devolver una promesa.
  //y también nos habilitará el uso de await dentro de ella(la función):

   getCatalog: async (limit: number = 20): Promise<PokemonData[]> => { // Una promesa es un objeto que representar un valor que va a
    //estar disponible en cualquier momento o nunca. 
    //Aqui el promise nos dice que nos promete que si todo sale bien eventualmente nos devolverá un arreglo de datos de pokemón.
    try { //Aquí va el codigo que podría fallar 
      const responseReady = await fetch(`${BASE_URL}/pokemon?limit=${limit}`); //El await le está diciendo al codigo que se detenga aquí 
      //hasta que la respuesta llegue, sin el await estaríamos tratando de usar  datos antes de recibirlos del servidor, 
      // teniendo como resultado un error.
      if (!responseReady.ok) throw new Error('Error de conexión a la API'); // por ejemplo si el usuario se queda sin internet
      const listData = await responseReady.json();

      const promisesDetails = listData.results.map(async (pokemon: { url: string }) => {
        const res = await fetch(pokemon.url)
        //El fetch es para hacer las peticiones HTTP.
        return await res.json()
      });
      return await Promise.all(promisesDetails)
      //si en alguna parte hay algun inconveniente, si el bloque try falla en algun mimento, se ejecuta el bloque catch
    } catch (error){ //la ejecución saltará inmediatamente aquí.
      //Este bloque va a evitar que nuestra app cierre inesperadamete y nos permitirá 
      //registrar el fallo por medio de:
      console.error("Fallo en la capa de red: ", error);
      throw error;
    }
  }
};