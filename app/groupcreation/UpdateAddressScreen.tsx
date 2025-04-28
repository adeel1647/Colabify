import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';  
import { API_URL } from '@/config';

const UpdateAddressScreen = () => {
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
      const response = await fetch(`${API_URL}/api/users/${id}/get-address`);
      const data = await response.json();

      if (response.ok) {
        setDescription(data.address || ''); // set fetched bio
      } else {
        console.error('Failed to fetch address:', data);
        Alert.alert('Error', data.message || 'Failed to load address.');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      Alert.alert('Error', 'Something went wrong while loading address.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBio = async () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a address.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/users/${id}/update-address`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: description }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Bio updated:', data);
        Alert.alert('Success', 'Address updated successfully!');
        router.push('/myProfile'); // Navigate back to profile
      } else {
        console.error('Failed to update address:', data);
        Alert.alert('Error', data.message || 'Failed to update address.');
      }
    } catch (error) {
      console.error('Error updating address:', error);
      Alert.alert('Error', 'Something went wrong. Try again later.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Edit Address</Text>
        <TouchableOpacity onPress={handleSaveBio}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Description Section */}
      <Text style={styles.title}>Address</Text>
      <Text style={styles.subtitle}>
        Add your address so people know where you are located.
      </Text>

      {/* Loading indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#FF8B04" style={{ marginTop: 20 }} />
      ) : (
        <TextInput
          style={styles.textArea}
          placeholder="Enter your address..."
          value={description}
          onChangeText={setDescription}
          multiline
        />
      )}
    </View>
  );
};

export default UpdateAddressScreen;

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
