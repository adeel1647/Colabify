import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Link, router } from 'expo-router';

const CreatePostScreen = () => {
  const [postText, setPostText] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.groupName}>Colabify</Text>
        <TouchableOpacity onPress={() => router.push('/groupcreation/GroupScreen')}>
          <Text style={styles.postButton}>POST</Text>
        </TouchableOpacity>
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* User Info */}
      <View style={styles.userInfo}>
        <Image source={require('../../assets/images/Company08.jpg')} style={styles.userImage} />
        <Text style={styles.userName}>John Doe</Text>
      </View>

      {/* Post Description */}
      <TextInput
        style={styles.textArea}
        placeholder="What's on your mind?"
        multiline
        value={postText}
        onChangeText={setPostText}
      />

      {/* Media Upload Option */}
      <TouchableOpacity style={styles.mediaButton}>
        <Ionicons name="image-outline" size={24} color="#FF8B04" />
        <Text style={styles.mediaText}>Photos/Videos</Text>
      </TouchableOpacity>

      {/* Post Button */}
      <TouchableOpacity style={styles.createPostButton} onPress={() => router.push('/groupcreation/GroupScreen')}>
        <Text style={styles.createPostButtonText}>POST</Text>
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
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postButton: {
    fontSize: 16,
    color: '#FF8B04',
    fontWeight: 'bold',
  },
  separator: {
    height: 2,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop:20,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textArea: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingTop: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  mediaText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 8,
  },
  createPostButton: {
    backgroundColor: '#FF8B04',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  createPostButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
