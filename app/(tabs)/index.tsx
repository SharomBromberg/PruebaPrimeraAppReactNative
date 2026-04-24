import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';

import LoginScreen from '@/components/login-screen';
import PokemonHome from '@/components/pokemon-home';
import WeatherScreen from '@/components/weather-screen';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [verificando, setVerificando] = useState<boolean>(true);

  useEffect(() => {
    verificarSesion();
  }, []);

  const verificarSesion = async () => {
    try {
      let token = null;
      // Validación multiplataforma (Módulo 1)
      if (Platform.OS === 'web') {
        token = localStorage.getItem('userToken'); // En la web usamos localStorage
      } else {
        token = await SecureStore.getItemAsync('userToken'); // En el móvil usamos cifrado
      }

      if (token) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error al leer la sesión segura:", error);
    } finally {
      setVerificando(false);
    }
  };

  if (verificando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222' }}>
        <ActivityIndicator size="large" color="#e3350d" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return <LoginScreen onLoginExitoso={() => setIsLoggedIn(true)} />;
  }


  return (
    <View style={styles.container}>
      <PokemonHome />
      <WeatherScreen />
    </View>
  );
  
  // return (
  // <ParallaxScrollView
  //   headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
  //   headerImage={
  //     <Image
  //       source={require('@/assets/images/partial-react-logo.png')}
  //       style={styles.reactLogo}
  //     />
  //   }>
  //   <ThemedView style={styles.titleContainer}>
  //     <ThemedText type="title">Hola</ThemedText>
  //     <HelloWave />
  //   </ThemedView>
  //   <ThemedView style={styles.stepContainer}>
  //     <ThemedText type="subtitle">Step 1: Try it</ThemedText>
  //     <ThemedText>
  //       Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
  //       Press{' '}
  //       <ThemedText type="defaultSemiBold">
  //         {Platform.select({
  //           ios: 'cmd + d',
  //           android: 'cmd + m',
  //           web: 'F12',
  //         })}
  //       </ThemedText>{' '}
  //       to open developer tools.
  //     </ThemedText>
  //   </ThemedView>
  //   <ThemedView style={styles.stepContainer}>
  //     <Link href="/modal">
  //       <Link.Trigger>
  //         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
  //       </Link.Trigger>
  //       <Link.Preview />
  //       <Link.Menu>
  //         <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
  //         <Link.MenuAction
  //           title="Share"
  //           icon="square.and.arrow.up"
  //           onPress={() => alert('Share pressed')}
  //         />
  //         <Link.Menu title="More" icon="ellipsis">
  //           <Link.MenuAction
  //             title="Delete"
  //             icon="trash"
  //             destructive
  //             onPress={() => alert('Delete pressed')}
  //           />
  //         </Link.Menu>
  //       </Link.Menu>
  //     </Link>

  //     <ThemedText>
  //       {`Tap the Explore tab to learn more about what's included in this starter app.`}
  //     </ThemedText>
  //   </ThemedView>
  //   <ThemedView style={styles.stepContainer}>
  //     <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
  //     <ThemedText>
  //       {`When you're ready, run `}
  //       <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
  //       <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
  //       <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
  //       <ThemedText type="defaultSemiBold">app-example</ThemedText>.
  //     </ThemedText>
  //   </ThemedView>
  //   <ExampleComponent />
  // </ParallaxScrollView>


  // );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
