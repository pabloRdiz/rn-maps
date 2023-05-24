import { StyleSheet } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';

export const Map = () => {
  return (
    <MapView
      style={styles.map}
      // provider={PROVIDER_GOOGLE}
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}>
      <Marker
        image={require('../assets/custom-marker.png')}
        key={'index'}
        coordinate={{
          latitude: 37.78825,
          longitude: -122.4324,
        }}
        title={'this is a title'}
        description={'this is a description'}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
