import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get('window');

const PostLoadingSkeleton = () => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timeout);
  }, []);

  const backgroundColor = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#c0c0c0', '#e0e0e0'],  // Darker shimmer colors
  });
  return (
    <Animated.View style={[styles.postContainer, { backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <Animated.View style={[styles.profileImage, { backgroundColor }]} />
        <View style={styles.headerText}>
          <Animated.View style={[styles.nameSkeleton, { backgroundColor }]} />
          <Animated.View style={[styles.dateSkeleton, { backgroundColor }]} />
        </View>
        <Animated.View style={[styles.followButton, { backgroundColor }]} />
      </View>

      {/* Text */}
      <Animated.View style={[styles.textSkeleton, { backgroundColor, width: '90%' }]} />
      <Animated.View style={[styles.textSkeleton, { backgroundColor, width: '70%' }]} />

      {/* Images */}
      <View style={styles.imagesContainer}>
        <Animated.View style={[styles.imageSkeleton, { backgroundColor }]} />
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Footer icons */}
      <View style={styles.iconsContainer}>
        <Animated.View style={[styles.iconSkeleton, { backgroundColor }]} />
        <Animated.View style={[styles.iconSkeleton, { backgroundColor }]} />
        <Animated.View style={[styles.iconSkeleton, { backgroundColor }]} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    width: width - 20,
    padding: 12,
    marginVertical: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    flex: 1,
    marginLeft: 10,
  },
  nameSkeleton: {
    height: 12,
    width: '60%',
    borderRadius: 4,
    marginBottom: 6,
  },
  dateSkeleton: {
    height: 10,
    width: '40%',
    borderRadius: 4,
  },
  followButton: {
    width: 60,
    height: 25,
    borderRadius: 6,
  },
  textSkeleton: {
    height: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
  imagesContainer: {
    marginTop: 8,
  },
  imageSkeleton: {
    width: '100%',
    height: 150,   // 👈 Decreased image height from (width - 40) to 150
    borderRadius: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconSkeleton: {
    width: 40,
    height: 18,
    borderRadius: 9,
  },
  realContent: {
    width: width - 20,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  realText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default PostLoadingSkeleton;
