import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ProfileLoadingSkeleton = () => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

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
  }, []);

  const backgroundColor = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#d1d1d1', '#f0f0f0'],
  });

  return (
    <View style={styles.container}>
      {/* Cover background */}
      <Animated.View style={[styles.coverImage, { backgroundColor }]} />

      {/* Profile Image */}
      <Animated.View style={[styles.profileImage, { backgroundColor }]} />

      {/* Name */}
      <Animated.View style={[styles.nameSkeleton, { backgroundColor }]} />

      {/* Job/Work */}
      <Animated.View style={[styles.infoSkeleton, { backgroundColor, width: '50%' }]} />

      {/* Education */}
      <Animated.View style={[styles.infoSkeleton, { backgroundColor, width: '60%' }]} />

      {/* Bio */}
      <Animated.View style={[styles.bioSkeleton, { backgroundColor }]} />

      {/* Address */}
      <Animated.View style={[styles.infoSkeleton, { backgroundColor, width: '40%' }]} />

      {/* Connections */}
      <Animated.View style={[styles.infoSkeleton, { backgroundColor, width: '30%' }]} />

      {/* Manage Buttons */}
      <Animated.View style={[styles.buttonSkeleton, { backgroundColor }]} />
      <Animated.View style={[styles.buttonSkeleton, { backgroundColor }]} />

      {/* Separator */}
      <View style={styles.separator} />

      {/* Post Input Box */}
      <View style={styles.postInputContainer}>
        <Animated.View style={[styles.smallProfileImage, { backgroundColor }]} />
        <Animated.View style={[styles.inputSkeleton, { backgroundColor }]} />
        <Animated.View style={[styles.iconSkeleton, { backgroundColor }]} />
      </View>

      {/* Separator */}
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  coverImage: {
    width: width,
    height: 180,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  nameSkeleton: {
    width: '40%',
    height: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  infoSkeleton: {
    height: 12,
    borderRadius: 5,
    marginTop: 6,
  },
  bioSkeleton: {
    width: '70%',
    height: 40,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonSkeleton: {
    width: '60%',
    height: 35,
    borderRadius: 8,
    marginTop: 10,
  },
  separator: {
    height: 1,
    width: '90%',
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  postInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    paddingHorizontal: 10,
  },
  smallProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  inputSkeleton: {
    flex: 1,
    height: 30,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  iconSkeleton: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default ProfileLoadingSkeleton;
