import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface NetworkCardProps {
  backgroundImage: any;
  profileImage: any;
  profileName: string;
  position: string;
  mutualConnections: string;
  onConnect: () => void;
}

const NetworkCard: React.FC<NetworkCardProps> = ({
  backgroundImage,
  profileImage,
  profileName,
  position,
  mutualConnections,
  onConnect,
}) => {
  return (
    <View style={styles.card}>
      <Image source={backgroundImage} style={styles.backgroundImage} />
      <Text style={styles.profileName}>{profileName}</Text>
      <Text style={styles.profilePosition}>{position}</Text>
      <View style={styles.mutualConnectionsContainer}>
        <Image source={require('../assets/images/Profile-Picture1.jpg')} style={styles.smallProfileImage} />
        <Text style={styles.mutualConnectionsText}>{mutualConnections}</Text>
      </View>
      <TouchableOpacity style={styles.connectButton} onPress={onConnect}>
        <Text style={styles.connectButtonText}>Join</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  backgroundImage: {
    width: '100%',
    height: 130,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    top: 70,
    left: '50%',
    marginLeft: -35,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    marginHorizontal:10,
    marginTop: 140,
  },
  profilePosition: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
    marginHorizontal:10,

  },
  mutualConnectionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  smallProfileImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
    
  },
  mutualConnectionsText: {
    fontSize: 12,
    color: '#666',
    
  },
  connectButton: {
    backgroundColor: '#FFA238',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginLeft:10,
    marginRight:10,
  },
  connectButtonText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default NetworkCard;
