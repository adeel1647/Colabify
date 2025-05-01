import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/config';

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          console.log(parsedUser.name);       // ➔ "Adeel Ahmed"
          console.log(parsedUser.token);      // ➔ JWT token
          console.log(parsedUser.profilePic); // ➔ Profile pic filename
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      console.log('User data removed');
      router.push('/');
    } catch (error) {
      console.error('Failed to remove user data:', error);
      Alert.alert('Error', 'An error occurred during logout');
    }
  };

  const profileImageSource = user?.profilePic
    ? { uri: `${API_URL}/uploads/${user.profilePic}` }
    : { uri: 'https://www.pngarts.com/files/5/Cartoon-Avatar-PNG-Photo.png' };
    

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => router.push('/myProfile')}>
      <Image
  source={profileImageSource}
  style={styles.profileImage}
  onError={(e) => console.error('Image loading error:', e.nativeEvent.error)}
/>

      </TouchableOpacity>
      <TextInput style={styles.searchBar} placeholder="Search" />
      <TouchableOpacity style={styles.messageIcon} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22.5} color="grey" />
      </TouchableOpacity>
    </View>
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