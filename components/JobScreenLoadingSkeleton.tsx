import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const JobScreenLoadingSkeleton = () => {
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

  const renderCard = (key: number) => (
    <Animated.View key={key} style={[styles.cardSkeleton, { backgroundColor }]} />
  );

  return (
    <View style={styles.container}>
      {/* Header Placeholder */}
      <Animated.View style={[styles.headerSkeleton, { backgroundColor }]} />

      {/* Tab Buttons Placeholder */}
      <View style={styles.tabContainer}>
        <Animated.View style={[styles.tabSkeleton, { backgroundColor }]} />
        <Animated.View style={[styles.tabSkeleton, { backgroundColor }]} />
      </View>

      {/* Cards Placeholder */}
      {[...Array(5)].map((_, index) => renderCard(index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  headerSkeleton: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    marginBottom: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tabSkeleton: {
    width: '48%',
    height: 40,
    borderRadius: 8,
  },
  cardSkeleton: {
    height: 100,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
  },
});

export default JobScreenLoadingSkeleton;
