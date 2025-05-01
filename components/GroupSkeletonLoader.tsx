// components/GroupSkeletonLoader.tsx

import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const GroupSkeletonLoader = () => {
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
    outputRange: ['#dcdcdc', '#f5f5f5'],
  });

  return (
    <View style={styles.container}>
      {/* Cover Image */}
      <Animated.View style={[styles.coverImage, { backgroundColor }]} />

      {/* Group Profile */}
      <Animated.View style={[styles.groupProfilePic, { backgroundColor }]} />

      {/* Group Name */}
      <Animated.View style={[styles.groupName, { backgroundColor }]} />

      {/* Group Info */}
      <Animated.View style={[styles.groupInfo, { backgroundColor }]} />

      {/* Invite Section */}
      <View style={styles.inviteSection}>
        <Animated.View style={[styles.inviteImage, { backgroundColor }]} />
        <Animated.View style={[styles.inviteButton, { backgroundColor }]} />
      </View>

      {/* Manage Button */}
      <Animated.View style={[styles.manageButton, { backgroundColor }]} />

      {/* Separator */}
      <View style={styles.separator} />

      {/* Post Input */}
      <View style={styles.postInputContainer}>
        <Animated.View style={[styles.profileImage, { backgroundColor }]} />
        <Animated.View style={[styles.inputField, { backgroundColor }]} />
        <Animated.View style={[styles.icon, { backgroundColor }]} />
      </View>

      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10, alignItems: 'center' },
  coverImage: { width, height: 180 },
  groupProfilePic: {
    width: 100, height: 100, borderRadius: 50, marginTop: -50,
    borderWidth: 3, borderColor: '#fff',
  },
  groupName: {
    width: '40%', height: 15, borderRadius: 5, marginTop: 10,
  },
  groupInfo: {
    width: '60%', height: 12, borderRadius: 5, marginTop: 6,
  },
  inviteSection: {
    flexDirection: 'row', marginTop: 10, alignItems: 'center', gap: 10,
  },
  inviteImage: { width: 40, height: 40, borderRadius: 20 },
  inviteButton: {
    width: 100, height: 30, borderRadius: 8,
  },
  manageButton: {
    width: '60%', height: 35, borderRadius: 8, marginTop: 10,
  },
  separator: {
    height: 1, width: '90%', backgroundColor: '#ccc', marginVertical: 15,
  },
  postInputContainer: {
    flexDirection: 'row', alignItems: 'center', width: '90%', paddingHorizontal: 10,
  },
  profileImage: { width: 40, height: 40, borderRadius: 20 },
  inputField: {
    flex: 1, height: 30, borderRadius: 10, marginHorizontal: 10,
  },
  icon: { width: 30, height: 30, borderRadius: 15 },
});

export default GroupSkeletonLoader;
