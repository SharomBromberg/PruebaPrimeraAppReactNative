import { WeatherService } from '@/services/weatherService';
import React, { useState } from 'react';
import { ActivityIndicator, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function WeatherScreen() {
    const [ciudad, setCiudad] = useState<string>('');
    const [clima, setClima] = useState<any>(null);
    const [cargando, setCargando] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const buscarClima = async () => {
        if (ciudad.trim() === '') return;

        Keyboard.dismiss();
        setCargando(true);
        setError('');
        // No limpies el clima aquí si quieres que el usuario siga viendo el anterior 
        // mientras carga, pero si prefieres limpiar, deja el setClima(null).
        setClima(null);

        try {
            const datos = await WeatherService.obtenerClimaPorCiudad(ciudad);
            setClima(datos);
        } catch (err) {
            setError('No pudimos encontrar la ciudad. Intenta de nuevo.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>Pronóstico del Clima</Text>

            <View style={styles.filaBuscador}>
                <TextInput
                    style={styles.input}
                    placeholder="Ej. Bogotá, Madrid, Tokyo..."
                    placeholderTextColor="#999"
                    value={ciudad}
                    onChangeText={setCiudad}
                />
                <TouchableOpacity style={styles.boton} onPress={buscarClima}>
                    <Text style={styles.textoBoton}>Buscar</Text>
                </TouchableOpacity>
            </View>

            {cargando && (
                <View style={styles.centro}>
                    <ActivityIndicator size="large" color="#4caf50" />
                    <Text style={styles.textoCargando}>Consultando satélite...</Text>
                </View>
            )}

            {error ? <Text style={styles.textoError}>{error}</Text> : null}

            {/* CORRECCIÓN AQUÍ: Acceso correcto al array de weather */}
            {clima && !cargando && (
                <View style={styles.tarjetaClima}>
                    <Text style={styles.nombreCiudad}>{clima.name}, {clima.sys?.country}</Text>
                    <Text style={styles.temperatura}>{Math.round(clima.main.temp)}°C</Text>

                    {/* 1. weather es un array, usamos [0] */}
                    {/* 2. Usamos optional chaining (?.) para evitar el crash de toUpperCase */}
                    <Text style={styles.descripcion}>
                        {clima.weather[0]?.description?.toUpperCase()}
                    </Text>

                    <View style={styles.detallesFila}>
                        <Text style={styles.detalle}>💧 Humedad: {clima.main.humidity}%</Text>
                        {/* 3. Asegúrate de que wind.speed exista en tu respuesta de la API */}
                        <Text style={styles.detalle}>💨 Viento: {clima.wind?.speed} m/s</Text>
                    </View>
                </View>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    contenedor: { flex: 1, padding: 20, backgroundColor: '#121212' },
    titulo: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20, textAlign: 'center', marginTop: 40 },
    filaBuscador: { flexDirection: 'row', marginBottom: 20 },
    input: { flex: 1, backgroundColor: '#333', color: '#fff', padding: 15, borderRadius: 10, marginRight: 10, fontSize: 16 },
    boton: { backgroundColor: '#4caf50', padding: 15, borderRadius: 10, justifyContent: 'center' },
    textoBoton: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    centro: { alignItems: 'center', marginTop: 40 },
    textoCargando: { color: '#4caf50', marginTop: 10 },
    textoError: { color: '#ff4d4d', textAlign: 'center', marginTop: 20, fontSize: 16 },
    tarjetaClima: { backgroundColor: '#1e1e1e', padding: 30, borderRadius: 20, alignItems: 'center', marginTop: 20, elevation: 5 },
    nombreCiudad: { fontSize: 24, color: '#aaa', marginBottom: 10 },
    temperatura: { fontSize: 64, fontWeight: 'bold', color: '#fff' },
    descripcion: { fontSize: 18, color: '#4caf50', marginBottom: 20, fontWeight: '600' },
    detallesFila: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 10 },
    detalle: { color: '#ccc', fontSize: 16 }
});