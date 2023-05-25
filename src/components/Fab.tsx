import React from 'react';
import {
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  View,
} from 'react-native';

interface Props {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Fab = (props: Props) => {
  const { onPress, style = {} } = props;

  return (
    <View style={{ ...(style as ViewStyle) }}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={{
          ...(style as any),
          ...styles.blackButton,
        }}>
        <Text style={styles.buttonText}>{'🧭'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  blackButton: {
    height: 50,
    width: 50,
    zIndex: 10,
    borderRadius: 100,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    elevation: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 40,
  },
});
