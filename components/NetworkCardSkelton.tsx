import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const SkeletonNetworkCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.skeletonBackground} />
      <View style={styles.profileNameSkeleton} />
      <View style={styles.profilePositionSkeleton} />
      <View style={styles.mutualConnectionsContainer}>
        <View style={styles.smallProfileImageSkeleton} />
        <View style={styles.mutualConnectionsTextSkeleton} />
      </View>
      <View style={styles.connectButtonSkeleton} />
    </View>
  );
};

const SkeletonLoader = () => {
  return (
    <View style={styles.container}>
      <SkeletonNetworkCard />
      <SkeletonNetworkCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    width: '48%',
    margin: '1%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  skeletonBackground: {
    width: '100%',
    height: 130,
    backgroundColor: '#e0e0e0',
  },
  profileNameSkeleton: {
    width: '60%',
    height: 16,
    backgroundColor: '#e0e0e0',
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 4,
  },
  profilePositionSkeleton: {
    width: '80%',
    height: 14,
    backgroundColor: '#e0e0e0',
    marginTop: 8,
    marginLeft: 10,
    borderRadius: 4,
  },
  mutualConnectionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  smallProfileImageSkeleton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    marginRight: 5,
  },
  mutualConnectionsTextSkeleton: {
    width: '40%',
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  connectButtonSkeleton: {
    width: '70%',
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default SkeletonLoader;
