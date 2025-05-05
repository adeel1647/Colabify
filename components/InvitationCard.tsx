import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface InvitationCardProps {
  profileImage: any;
  profileName: string;
  position: string;
  mutualConnections: string;
  timeAgo: string; // this should be ISO date like "2025-05-05T14:33:04.289Z"
  onClose: (id: string) => void;
  onAccept: (id: string) => void;
  id: string;
}

const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;

  return date.toLocaleDateString(); // fallback to date
};

const InvitationCard: React.FC<InvitationCardProps> = ({
  profileImage,
  profileName,
  position,
  mutualConnections,
  timeAgo,
  onClose,
  id,
  onAccept,
}) => {
  return (
    <View style={styles.card}>
      <Image source={profileImage} style={styles.profileImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.profileName}>{profileName}</Text>
        <Text style={styles.position} numberOfLines={2}>{position}</Text>
        <View style={styles.row}>
          <FontAwesome name="users" size={14} color="grey" />
          <Text style={styles.mutualConnections}>{mutualConnections}</Text>
        </View>
        <Text style={styles.timeAgo}>{formatTimeAgo(timeAgo)}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onClose(id)} >
          <FontAwesome name="times" size={20} color="grey" style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onAccept(id)} >
          <FontAwesome name="check" size={20} color="grey" style={styles.actionIcon} />
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
    flexWrap: 'wrap',
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
});

export default InvitationCard;
