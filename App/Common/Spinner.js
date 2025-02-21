import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size,color }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator color={color||'#085782'} size={size || 'large'} />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { Spinner };
