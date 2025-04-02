import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {Link, router } from 'expo-router';

const AddBioScreen = () => {
  const [description, setDescription] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Edit Bio</Text>
        <TouchableOpacity onPress={() => router.push('/myProfile')}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Description Section */}
      <Text style={styles.title}> Bio</Text>
      <Text style={styles.subtitle}>
        Describe your profile so people know what it's about.
      </Text>

      {/* Text Area */}
      <TextInput
        style={styles.textArea}
        placeholder="Describe what your profile is about..."
        value={description}
        onChangeText={setDescription}
        multiline
      />
    </View>
  );
};

export default AddBioScreen;

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
    fontSize: 16,
    fontWeight: 'bold',
  },
  doneText: {
    fontSize: 16,
    color: '#FF8B04',
    fontWeight: 'bold',
  },
  separator: {
    height: 2,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    height: 150,
    textAlignVertical: 'top',
    marginTop: 10,
  },
});
