export interface PokemonData {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string; // Aquí la API nos entrega la URL de la foto principal
    other: {
      'official-artwork': {
        front_default: string; // Foto en alta resolución
      }
    }
  };
}