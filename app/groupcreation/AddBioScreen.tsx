import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';  
import { API_URL } from '@/config';

const AddBioScreen = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const { id } = useLocalSearchParams();

  // Fetch existing bio when screen loads
  useEffect(() => {
    if (id) {
      fetchBio();
    }
  }, [id]);

  const fetchBio = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/users/${id}/bio`);
      const data = await response.json();

      if (response.ok) {
        setDescription(data.bio || ''); // set fetched bio
      } else {
        console.error('Failed to fetch bio:', data);
        Alert.alert('Error', data.message || 'Failed to load bio.');
      }
    } catch (error) {
      console.error('Error fetching bio:', error);
      Alert.alert('Error', 'Something went wrong while loading bio.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBio = async () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a bio.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/users/${id}/bio`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bio: description }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Bio updated:', data);
        Alert.alert('Success', 'Bio updated successfully!');
        router.push('/myProfile'); // Navigate back to profile
      } else {
        console.error('Failed to update bio:', data);
        Alert.alert('Error', data.message || 'Failed to update bio.');
      }
    } catch (error) {
      console.error('Error updating bio:', error);
      Alert.alert('Error', 'Something went wrong. Try again later.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Edit Bio</Text>
        <TouchableOpacity onPress={handleSaveBio}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Description Section */}
      <Text style={styles.title}>Bio</Text>
      <Text style={styles.subtitle}>
        Describe your profile so people know what it's about.
      </Text>

      {/* Loading indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#FF8B04" style={{ marginTop: 20 }} />
      ) : (
        <TextInput
          style={styles.textArea}
          placeholder="Describe what your profile is about..."
          value={description}
          onChangeText={setDescription}
          multiline
        />
      )}
    </View>
  );
};

export default AddBioScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerText: { fontSize: 16, fontWeight: 'bold' },
  doneText: { fontSize: 16, color: '#FF8B04', fontWeight: 'bold' },
  separator: { height: 2, backgroundColor: '#ddd', marginVertical: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginTop: 10 },
  subtitle: { fontSize: 14, color: '#555', marginVertical: 5 },
  textArea: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16, height: 150, textAlignVertical: 'top', marginTop: 10 },
});
