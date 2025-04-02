import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {Link, router } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
  console.log('Sidebar is visible:', isVisible); // Log isVisible prop for debugging

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <FontAwesome name="times" size={24} color="grey" />
      </TouchableOpacity>
      <View style={styles.profileSection}>
        <Image source={require('../assets/images/my-profile-image.jpg')} style={styles.profileImage} />
        <Text style={styles.profileName}>Parami Ashinsana</Text>
        <Text style={styles.viewProfile} onPress={() => router.push('/myProfile')}>View Profile</Text>
      </View>

      <View style={styles.separator} />

      <TouchableOpacity style={styles.sidebarItem}>
        <Text style={styles.sidebarText1}>153 </Text>
        <Text style={styles.sidebarText2}>profile views</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarItem}>
        <Text style={styles.sidebarText3}>View all analytics</Text>
      </TouchableOpacity>

      <View style={styles.separator} />

      <TouchableOpacity style={styles.sidebarItem}>
        <Text style={styles.sidebarText}>Saved posts</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarItem}>
        <Text style={styles.sidebarText}>Groups</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarItem}>
        <Text style={styles.sidebarText}>Network</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarItem} onPress={onClose}>
        
        <Text style={styles.sidebarText}>Settings</Text>
      </TouchableOpacity>
      <View style={styles.separator} />


      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width * 0.6, // Adjust the width to 60% of the screen width
    height: height, // Adjust height as needed, here taking full screen height
    backgroundColor: '#fff',
    padding: 20,
    zIndex: 1000, // Ensure it overlays other components
    marginTop: 30,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  LinkedInimg: {
    width: 200,
    height: 100,
    borderRadius: 5,
    marginTop: 170,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewProfile: {
    color: '#FF8B04',
    marginBottom: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
  sidebarItem: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  sidebarText: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  sidebarText1: {
    fontSize: 14,
    fontWeight: '900',
  },
  sidebarText2: {
    fontSize: 16,
    fontWeight: '400',
    color: '#ababab',

  },
  sidebarText3: {
    fontSize: 16,
    fontWeight: '500',
  },
  settings: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 60,
  },
  settingsText: {
    marginLeft: 10,
    fontSize: 18,
    // marginBottom:10,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default Sidebar;
