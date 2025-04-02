import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import {Link, router } from 'expo-router';

const Header = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.push('/myProfile')}>
          <Image source={require('../assets/images/my-profile-image.jpg')} style={styles.profileImage} />
        </TouchableOpacity>
        <TextInput style={styles.searchBar} placeholder="Search" />
        <TouchableOpacity style={styles.messageIcon} onPress={() => router.push('/')}>
          <Ionicons name="log-out-outline" size={22.5} color="grey" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 30,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 35,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  messageIcon: {
    marginLeft: 10,
  },
});

export default Header;