import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

// Carregando o arquivo JSON
const professionals = require('../mock/professionals.json');

const LocaisTreinoScreen = () => {
  const [region, setRegion] = useState(null);

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão de localização negada');
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      Alert.alert('Erro ao obter localização', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        onRegionChangeComplete={setRegion}
      >
        {region && (
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="Você está aqui"
          />
        )}
        {professionals.map((professional, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: professional.latitude,
              longitude: professional.longitude,
            }}
            title={professional.nome}
            description={`${professional.especialidade}\n${professional.endereco}`}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f5fd',
  },
  map: {
    flex: 1,
    width: '100%',
  },
});

export default LocaisTreinoScreen;
