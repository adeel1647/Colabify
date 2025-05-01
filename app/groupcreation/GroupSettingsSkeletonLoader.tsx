import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const GroupSettingsSkeletonLoader = () => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const backgroundColor = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e0e0e0', '#f0f0f0'],
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View style={[styles.header, { backgroundColor }]} />

      {/* Section Heading */}
      <Animated.View style={[styles.sectionHeading, { backgroundColor }]} />

      {/* Input Fields */}
      {[...Array(3)].map((_, index) => (
        <View key={index} style={styles.inputContainer}>
          <Animated.View style={[styles.label, { backgroundColor }]} />
          <Animated.View style={[styles.inputField, { backgroundColor }]} />
        </View>
      ))}

      {/* Image Picker */}
      <View style={styles.inputContainer}>
        <Animated.View style={[styles.label, { backgroundColor }]} />
        <Animated.View style={[styles.coverPhoto, { backgroundColor }]} />
        <Animated.View style={[styles.buttonText, { backgroundColor }]} />
      </View>

      {/* Privacy Toggle */}
      <View style={styles.inputContainer}>
        <Animated.View style={[styles.label, { backgroundColor }]} />
        <Animated.View style={[styles.privacyToggle, { backgroundColor }]} />
      </View>

      {/* Save Button */}
      <Animated.View style={[styles.saveButton, { backgroundColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flex: 1,
  },
  header: {
    height: 30,
    width: '50%',
    borderRadius: 6,
    marginBottom: 20,
    alignSelf: 'center',
  },
  sectionHeading: {
    height: 20,
    width: '30%',
    borderRadius: 4,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    height: 14,
    width: '25%',
    borderRadius: 4,
    marginBottom: 8,
  },
  inputField: {
    height: 40,
    width: '100%',
    borderRadius: 6,
  },
  coverPhoto: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonText: {
    width: 120,
    height: 15,
    borderRadius: 6,
    alignSelf: 'center',
  },
  privacyToggle: {
    height: 40,
    borderRadius: 8,
    width: '50%',
  },
  saveButton: {
    height: 45,
    borderRadius: 10,
    width: '100%',
    marginTop: 20,
  },
});

export default GroupSettingsSkeletonLoader;
