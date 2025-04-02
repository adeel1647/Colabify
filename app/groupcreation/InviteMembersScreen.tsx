import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import {Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const friends = [
  { id: '1', name: 'John Doe', image: require('../../assets/images/Company01.jpg') },
  { id: '2', name: 'Jane Smith', image: require('../../assets/images/Company02.jpg') },
  { id: '3', name: 'Michael Brown', image: require('../../assets/images/Company03.jpg') },
];

const InviteMembersScreen = () => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Invite Members</Text>
        <TouchableOpacity onPress={() => router.push('/groupcreation/AddDescriptionScreen')}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Group Created Section */}
      <Text style={styles.groupCreatedTitle}>Your group has been created</Text>
      <Text style={styles.groupCreatedText}>
        Bring like-minded people together by inviting friends to your group.
      </Text>

      {/* Share Group */}
      <TouchableOpacity style={styles.shareGroup}>
        <Ionicons name="share-social-outline" size={24} color="#FF8B04" />
        <Text style={styles.shareText}>Share Group</Text>
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search friends..."
          value={search}
          onChangeText={setSearch}
        />
        <Ionicons name="search-outline" size={24} color="#555" />
      </View>

      {/* Friends List */}
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Image source={item.image} style={styles.profileImage} />
            <Text style={styles.friendName}>{item.name}</Text>
            <TouchableOpacity style={styles.inviteButton}>
              <Text style={styles.inviteText}>Invite</Text>
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
  inviteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
