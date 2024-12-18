import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

type IconsProps = {
  name: string;
};

const Icons = ({ name }: IconsProps) => {
  let symbol = '';
  let color = '';

  if (name === 'circle') {
    symbol = '⭕';
    color = '#F7CD2E';
  } else if (name === 'cross') {
    symbol = '❌';
    color = '#38CC77';
  }

  return (
    <View style={styles.iconContainer}>
      <Text style={[styles.icon, { color }]}>{symbol}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  icon: {
    fontSize: 50,
  },
});

export default Icons;
