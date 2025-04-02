import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Link, router } from 'expo-router';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Settings Heading */}
      <Text style={styles.heading}>Settings</Text>

      {/* Your Settings Section */}
      <Text style={styles.subHeading}>Your Settings</Text>
      <TouchableOpacity style={styles.option} onPress={() => router.push('/groupcreation/GroupSettingsScreen')}>
        <Ionicons name="settings-outline" size={24} color="black" />
        <Text style={styles.optionText}>Group Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => router.push('/groupcreation/GroupInfoScreen')}>
        <Ionicons name="information-circle-outline" size={24} color="black" />
      <Text style={styles.optionText}>Group Info</Text>
      </TouchableOpacity>

      {/* Support Section */}
      <Text style={styles.subHeading}>Support</Text>
      <TouchableOpacity style={styles.option}>
        <Ionicons name="help-circle-outline" size={24} color="black" />
        <Text style={styles.optionText}>Help Center</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Ionicons name="people-outline" size={24} color="black" />
        <Text style={styles.optionText}>Community Hub</Text>
      </TouchableOpacity>

      {/* Bottom Action Icons */}
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="share-social-outline" size={32} color="black" />
          <Text style={styles.iconText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="pause" size={32} color="black" />
          <Text style={styles.iconText}>Pause</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="log-out-outline" size={32} color="black" />
          <Text style={styles.iconText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F2F2F2',
    paddingVertical: 20,
    marginTop: 30,
    borderRadius: 10,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default SettingsScreen;
