import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface InvitationCardProps {
  profileImage: any;
  profileName: string;
  position: string;
  mutualConnections: string;
  timeAgo: string;
  onClose: () => void;
  onAccept: (id: string) => void;
  id: string;
}

const SuggestionCard: React.FC<InvitationCardProps> = ({ profileImage, profileName, position, mutualConnections, onAccept, id }) => {
  return (
    <View style={styles.card}>
      <Image source={profileImage} style={styles.profileImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.profileName}>{profileName}</Text>
        <Text style={styles.position}>{position}</Text>
        <View style={styles.row}>
          <FontAwesome name="users" size={14} color="grey" />
          <Text style={styles.mutualConnections}>{mutualConnections}</Text>
        </View>
        {/* <Text style={styles.timeAgo}>{timeAgo}</Text> */}
      </View>
      <View style={styles.actions}>
      <TouchableOpacity onPress={() => onAccept(id)} style={styles.addButton}>
        <Text style={styles.addButtonText}>Connect</Text>
      </TouchableOpacity>
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
    fontSize: 13,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 12,
    color: 'grey',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  mutualConnections: {
    fontSize: 11,
    color: 'grey',
    marginLeft: 5,
  },
  timeAgo: {
    fontSize: 11,
    color: 'grey',
    marginTop: 5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginHorizontal: 5,
  },
  addButton: {
    backgroundColor: '#FF8B04', // LinkedIn Blue
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },  
  
});

export default SuggestionCard;
