import { PokemonData } from "@/interfaces/pokemon-interface";
import { PokemonService } from "@/services/PokemonService";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function PokemonScreen() {
    const [catalogo, setCatalogo] = useState<PokemonData[]>([]);
    const [cargando, setCargando] = useState<boolean>(true);
  
    useEffect(() => {
      cargarPokemones();
    }, []);
  
    const cargarPokemones = async () => {
      try {
        const datos = await PokemonService.getCatalog(20); 
        setCatalogo(datos);
      } catch (error) {
        alert("Error al cargar el catálogo externo");
      } finally {
        setCargando(false);
      }
    };
  
    // Diseño de la tarjeta (Card) que muestra la foto y las características
    const renderTarjeta = ({ item }: { item: PokemonData }) => (
      <View style={styles.tarjeta}>
        <Image 
          source={{ uri: item.sprites.other['official-artwork'].front_default }} 
          style={styles.imagen} 
        />
        <Text style={styles.nombre}>{item.name.toUpperCase()}</Text>
        <View style={styles.caracteristicas}>
          <Text style={styles.textoCaracteristica}>Peso: {item.weight / 10} kg</Text>
          <Text style={styles.textoCaracteristica}>Altura: {item.height / 10} m</Text>
        </View>
      </View>
    );
  
    // Pantalla de carga mientras trae los datos de la API
    if (cargando) {
      return (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#e3350d" />
          <Text style={{ marginTop: 10 }}>Descargando catálogo en tiempo real...</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.contenedor}>
        {/* FlatList configurado para hacer slide horizontal entre los pokemones */}
        <FlatList
          data={catalogo}
          renderItem={renderTarjeta}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true} 
          contentContainerStyle={styles.lista}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    centro: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    contenedor: { flex: 1, backgroundColor: '#222', justifyContent: 'center' },
    lista: { alignItems: 'center', paddingHorizontal: 10 },
    tarjeta: { 
      width: 320, 
      height: 450, 
      backgroundColor: '#fff', 
      borderRadius: 20, 
      padding: 20, 
      marginHorizontal: 15, 
      alignItems: 'center',
      justifyContent: 'space-around',
      elevation: 5 
    },
    imagen: { width: 250, height: 250, resizeMode: 'contain' },
    nombre: { fontSize: 26, fontWeight: 'bold', color: '#333' },
    caracteristicas: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
    textoCaracteristica: { fontSize: 16, color: '#666', fontWeight: 'bold' }
  });