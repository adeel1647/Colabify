import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const SkeletonInvitationCard = () => {
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
    <View style={styles.card}>
      {/* Skeleton Profile Image */}
      <Animated.View style={[styles.profileImage, { backgroundColor }]} />

      <View style={styles.infoContainer}>
        {/* Skeleton Profile Name */}
        <Animated.View style={[styles.profileName, { backgroundColor }]} />

        {/* Skeleton Position */}
        <Animated.View style={[styles.position, { backgroundColor }]} />

        <View style={styles.row}>
          {/* Skeleton Mutual Connections */}
          <Animated.View style={[styles.mutualConnections, { backgroundColor }]} />
        </View>

        {/* Skeleton Time Ago */}
        <Animated.View style={[styles.timeAgo, { backgroundColor }]} />
      </View>

      <View style={styles.actions}>
        {/* Skeleton Close Icon */}
        <Animated.View style={[styles.actionIcon, { backgroundColor }]} />

        {/* Skeleton Accept Icon */}
        <Animated.View style={[styles.actionIcon, { backgroundColor }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  profileName: {
    width: '40%',
    height: 15,
    borderRadius: 5,
    marginBottom: 5,
  },
  position: {
    width: '60%',
    height: 12,
    borderRadius: 5,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  mutualConnections: {
    width: '50%',
    height: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  timeAgo: {
    width: '40%',
    height: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
});

export default SkeletonInvitationCard;
