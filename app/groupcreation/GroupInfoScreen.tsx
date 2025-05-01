import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

const GroupInfoScreen = () => {
    const { groupId } = useLocalSearchParams(); 
  
  // Options Data
  const options = [
    { name: "Members", icon: "people-outline", screen: "MembersScreen" },
    { name: "Photos", icon: "images-outline", screen: "PhotosScreen" },
    { name: "History", icon: "time-outline", screen: "HistoryScreen" },
    { name: "Settings", icon: "settings-outline", screen: "SettingsScreen" },
    { name: "Change Cover Pic", icon: "image-outline", screen: "ChangeCoverScreen" },
    { name: "Group Status", icon: "megaphone-outline", screen: "StatusScreen" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Group Info</Text>
      </View>

      <View style={styles.separator} />

      {/* Options List */}
      {options.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.option} 
         
        >
          <Ionicons name={item.icon} size={24} color="black" />
          <Text style={styles.optionText}>{item.name}</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    marginVertical: 15,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  separator: {
    height: 1,
    marginBottom: 15,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
  },
});

export default GroupInfoScreen;
