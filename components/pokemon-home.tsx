import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PokemonHome() {
    // 2. Inicializamos el enrutador (¡Ya no necesitamos la interfaz Props ni recibir 'navigation'!)
    const router = useRouter();
  
    return (
      <View style={styles.contenedor}>
        <Image 
          source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png' }} 
          style={styles.logo} 
        />
        <Text style={styles.titulo}>¡Bienvenido al Pokédex Interactivo!</Text>
        <Text style={styles.descripcion}>
          Descubre, califica y explora el catálogo completo de criaturas. 
          Conéctate a nuestra base de datos en tiempo real y decide cuáles son tus favoritos.
        </Text>
  
        {/* 3. Usamos router.push para navegar a la pestaña de explorar */}
        <TouchableOpacity 
          style={styles.boton} 
          onPress={() => router.push('/explore')} 
        >
          <Text style={styles.textoBoton}>Explorar el Catálogo</Text>
        </TouchableOpacity>
      </View>
    );
  }
const styles = StyleSheet.create({
    contenedor: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
    logo: { width: 250, height: 100, resizeMode: 'contain', marginBottom: 30 },
    titulo: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 15, color: '#333' },
    descripcion: { fontSize: 16, textAlign: 'center', color: '#666', marginBottom: 40, lineHeight: 24 },
    boton: { backgroundColor: '#e3350d', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 25, elevation: 3 },
    textoBoton: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});