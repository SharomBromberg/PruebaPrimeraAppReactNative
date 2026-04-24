import { Props } from '@/interfaces/props';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Tipado estricto para las propiedades del componente

export default function LoginScreen({ onLoginExitoso }: Props) {
    const [correo, setCorreo] = useState<string>('');
    const [password, setPassword] = useState<string>('');
  
    const simularAutenticacion = async () => {
      if (correo === '' || password === '') {
        Alert.alert('Error', 'Por favor ingresa correo y contraseña');
        return;
      }
  
      try {
        if (correo === 'admin@pokedex.com' && password === '123456') {
          
          // Validación multiplataforma al guardar (Módulo 1 y 3)
          if (Platform.OS === 'web') {
            localStorage.setItem('userToken', 'llave_secreta_encriptada_123');
          } else {
            await SecureStore.setItemAsync('userToken', 'llave_secreta_encriptada_123'); //Keystore en android y Keychain en iOS
          }
          
          onLoginExitoso();
        } else {
          Alert.alert('Acceso Denegado', 'Credenciales incorrectas');
        }
      } catch (error) {
        console.error('Error al guardar el token seguro', error);
      }
    };
  
    // ... (El resto del return con la vista se queda exactamente igual)
    return (
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Acceso Seguro</Text>
        <Text style={styles.subtitulo}>Inicia sesión para ver el catálogo</Text>
  
        <TextInput 
          style={styles.input}
          placeholder="Correo electrónico"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput 
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true} 
        />
  
        <TouchableOpacity style={styles.boton} onPress={simularAutenticacion}>
          <Text style={styles.textoBoton}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    );
  }
  

const styles = StyleSheet.create({
  contenedor: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#222' },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 5 },
  subtitulo: { fontSize: 16, color: '#aaa', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, fontSize: 16 },
  boton: { backgroundColor: '#e3350d', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  textoBoton: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});