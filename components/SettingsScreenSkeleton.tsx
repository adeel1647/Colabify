import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SettingsScreenSkeleton = () => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const backgroundColor = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e0e0e0', '#f5f5f5'],
  });

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <Animated.View style={[styles.sectionTitle, { backgroundColor }]} />

      {/* Settings Items */}
      {[1, 2, 3, 4].map((_, index) => (
        <View key={index} style={styles.settingRow}>
          <Animated.View style={[styles.settingLabel, { backgroundColor }]} />
          <Animated.View style={[styles.toggleSwitch, { backgroundColor }]} />
        </View>
      ))}

      {/* Input Fields */}
      <Animated.View style={[styles.inputField, { backgroundColor }]} />
      <Animated.View style={[styles.inputField, { backgroundColor }]} />

      {/* Another Section Header */}
      <Animated.View style={[styles.sectionTitle, { backgroundColor }]} />

      {/* More Settings Items */}
      {[5, 6].map((_, index) => (
        <View key={index} style={styles.settingRow}>
          <Animated.View style={[styles.settingLabel, { backgroundColor }]} />
          <Animated.View style={[styles.toggleSwitch, { backgroundColor }]} />
        </View>
      ))}

      {/* Save Button */}
      <Animated.View style={[styles.saveButton, { backgroundColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionTitle: {
    height: 20,
    width: '40%',
    borderRadius: 5,
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  settingLabel: {
    height: 16,
    width: '45%',
    borderRadius: 5,
  },
  toggleSwitch: {
    height: 24,
    width: 40,
    borderRadius: 12,
  },
  inputField: {
    height: 40,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
  },
  saveButton: {
    height: 45,
    borderRadius: 10,
    marginTop: 30,
    width: '100%',
    alignSelf: 'center',
  },
});

export default SettingsScreenSkeleton;
