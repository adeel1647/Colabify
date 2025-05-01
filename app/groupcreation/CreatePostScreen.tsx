import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

const CreatePostScreen = () => {
  const { groupId } = useLocalSearchParams(); // Access the groupId passed as a parameter

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Post</Text>
        <TouchableOpacity   onPress={() => router.push({ pathname: '/groupcreation/GroupScreen', params: { groupId } })}
          >
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Group ID Display */}
      

      {/* Create Post Section */}
      <Text style={styles.title}>Create Post</Text>
      <Text style={styles.subtitle}>
        You can set the tone of your new group and get the conversation going with a post.
      </Text>

      {/* Create Post Button */}
      <TouchableOpacity
  style={styles.createButton}
  onPress={() => router.push({ pathname: '/groupcreation/PostScreen', params: { groupId } })}
>
  <Text style={styles.createButtonText}>Create Post</Text>
</TouchableOpacity>

    </View>
  );
};

export default CreatePostScreen;

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
  createButton: {
    backgroundColor: '#FF8B04',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  groupIdContainer: {
    marginVertical: 10,
  },
  groupIdText: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
  },
});
