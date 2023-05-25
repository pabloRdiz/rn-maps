import { useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>(
    {} as Location,
  );
  const [currentLocation, setCurrentLocation] = useState<Location>(
    {} as Location,
  );
  const watchIdRef = useRef<number>();
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getCurrentLocation()
      .then(location => {
        if (!isMounted) return;
        setInitialPosition(location);
        setCurrentLocation(location);
        setHasLocation(true);
      })
      .catch(error => console.error(error));
  }, []);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        error => reject({ error }),
        {
          enableHighAccuracy: true,
        },
      );
    });
  };

  const followLocation = () => {
    watchIdRef.current = Geolocation.watchPosition(
      ({ coords }) => {
        if (!isMounted) return;
        setCurrentLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      error => console.error(error),
      {
        enableHighAccuracy: true,
        distanceFilter: 50,
      },
    );
  };

  const stopFollow = () => {
    if (watchIdRef.current) Geolocation.clearWatch(watchIdRef.current);
  };

  return {
    currentLocation,
    followLocation,
    getCurrentLocation,
    hasLocation,
    initialPosition,
    stopFollow,
  };
};
