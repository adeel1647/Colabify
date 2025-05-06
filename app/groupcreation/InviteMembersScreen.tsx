import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router'; // <-- ✅ import useLocalSearchParams
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/config';

const InviteMembersScreen = () => {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);  // Initialize as an empty array
  const [invitedFriends, setInvitedFriends] = useState({});
  const { groupId } = useLocalSearchParams();

  useEffect(() => {
    const fetchUserDataAndConnections = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          const response = await fetch(`${API_URL}/api/users/${parsedUser._id}/connections`);
          const data = await response.json();

          // Ensure the API response is successful and contains the connections array
          if (data.success) {
            setFriends(data.connections);  // Set friends to the connections array
          } else {
            console.error('Failed to fetch connections:', data.message || 'Unknown error');
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchUserDataAndConnections();
  }, []);

  const handleInvite = (friendId) => {
    setInvitedFriends((prevState) => ({
      ...prevState,
      [friendId]: !prevState[friendId],
    }));
  };

  // Filter friends based on the search input
  const filteredFriends = friends.filter(friend =>
    friend.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Invite Members</Text>
        <TouchableOpacity onPress={() => router.push({ pathname: '/groupcreation/CreatePostScreen', params: { groupId } })}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <Text style={styles.groupCreatedTitle}>Grow Your Community</Text>
      <Text style={styles.groupCreatedText}>
        Bring like-minded people together by inviting friends to your group.
      </Text>

      <TouchableOpacity style={styles.shareGroup}>
        <Ionicons name="share-social-outline" size={24} color="#FF8B04" />
        <Text style={styles.shareText}>Share Group</Text>
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search friends..."
          value={search}
          onChangeText={setSearch}
        />
        <Ionicons name="search-outline" size={24} color="#555" />
      </View>

      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.userId}  // Use userId as the key
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Image source={{ uri: `${API_URL}/uploads/${item.profilePic}` }} style={styles.profileImage} />
            <Text style={styles.friendName}>{item.fullName}</Text>
            <TouchableOpacity
              style={[
                styles.inviteButton,
                invitedFriends[item.userId] && styles.invitedButton,
              ]}
              onPress={() => handleInvite(item.userId)}
            >
              <Text style={styles.inviteText}>
                {invitedFriends[item.userId] ? 'Invited' : 'Invite'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default InviteMembersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  doneText: {
    fontSize: 14,
    color: '#FF8B04',
    fontWeight: 'bold',
  },
  separator: {
    height: 2,
    backgroundColor: '#ddd',
    marginVertical: 10,
    marginBottom:20
  },
  groupCreatedTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  groupCreatedText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  shareGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  shareText: {
    fontSize: 16,
    color: '#FF8B04',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
    marginTop: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 5,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  friendName: {
    flex: 1,
    fontSize: 16,
  },
  inviteButton: {
    backgroundColor: '#FF8B04',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  invitedButton: {
    backgroundColor: '#A0A0A0', // Change color for invited
  },
  inviteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
