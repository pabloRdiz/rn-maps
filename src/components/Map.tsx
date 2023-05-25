import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { useLocation } from '../hooks';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Fab } from './Fab';

export const Map = () => {
  const {
    currentLocation,
    followLocation,
    getCurrentLocation,
    hasLocation,
    initialPosition,
    stopFollow,
  } = useLocation();
  const mapRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  useEffect(() => {
    followLocation();

    return () => stopFollow();
  }, [followLocation, stopFollow]);

  useEffect(() => {
    if (!following.current) return;

    const { latitude, longitude } = currentLocation;

    mapRef.current?.animateCamera({
      center: {
        latitude: latitude,
        longitude: longitude,
      },
    });
  }, [currentLocation]);

  if (!hasLocation) return <LoadingScreen />;

  const centerPosition = async () => {
    const { latitude, longitude } = await getCurrentLocation();

    following.current = true;
    mapRef.current?.animateCamera({
      center: {
        latitude: latitude,
        longitude: longitude,
      },
    });
  };

  return (
    <>
      <MapView
        onTouchStart={() => {
          following.current = false;
        }}
        ref={element => (mapRef.current = element!)}
        style={styles.map}
        // al no setear el provider en ios usa apple maps
        // provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
      <Fab onPress={centerPosition} style={styles.fab} />
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
