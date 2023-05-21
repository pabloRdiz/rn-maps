import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PermissionsContext } from '../contexts';
import { BlackButton } from '../components';

export const PermissionsScreen = () => {
  const { permissions, askLocationPermission } = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        📍 GPS access is mandatory to use this App!
      </Text>
      <BlackButton title="Permiso" onPress={askLocationPermission} />
      <Text style={styles.permissions}>
        {JSON.stringify(permissions, null, 5)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 250,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissions: {
    marginTop: 20,
  },
});
