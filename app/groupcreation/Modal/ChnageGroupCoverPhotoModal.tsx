import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'; // Required for converting image to form data
import { API_URL } from '@/config';
import { router } from 'expo-router';

const ChnageGroupCoverPhotoModal = ({ visible, onClose, userId }) => {
  
  // Function to open the camera
  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "You need to allow camera access to take a photo.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 1 });
    if (!result.canceled) {
      console.log("Photo Taken:", result.assets[0].uri);
      const uri = result.assets[0].uri;
      await uploadImage(uri);
    }
  };

  // Function to open the gallery
  const openGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "You need to allow gallery access to upload a photo.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 1 });
    if (!result.canceled) {
      console.log("Photo Selected:", result.assets[0].uri);
      const uri = result.assets[0].uri;
      await uploadImage(uri);
    }
  };

  // Function to upload the image to the server
  const uploadImage = async (uri) => {
    try {
      const formData = new FormData();
      const fileInfo = await FileSystem.getInfoAsync(uri);
      
      // Prepare file to be uploaded
      const file = {
        uri: fileInfo.uri,
        name: fileInfo.uri.split('/').pop(),
        type: 'image/jpeg', // or the appropriate file type
      };
      
      formData.append('groupCoverImage', file);

      // Send the request using fetch
      const response = await fetch(`${API_URL}/api/pages/${userId}/cover-photo`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/groupcreation/GroupScreen');
        Alert.alert('Success', 'Cover photo updated successfully!');
        console.log(data);
      } else {
        Alert.alert('Error', data.message || 'Failed to update cover photo');
      }
    } catch (error) { 
      Alert.alert('Error', 'Failed to update cover photo');
      console.error(error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>

              {/* Take Photo */}
              <TouchableOpacity style={styles.option} onPress={openCamera}>
                <View style={[styles.iconContainer, { backgroundColor: 'lightgray' }]}>
                  <Ionicons name="camera-outline" size={20} color="black" />
                </View>
                <Text style={styles.optionText}>Take Photo</Text>
              </TouchableOpacity>

              {/* Upload Photo */}
              <TouchableOpacity style={styles.option} onPress={openGallery}>
                <View style={[styles.iconContainer, { backgroundColor: 'lightgray' }]}>
                  <Ionicons name="image-outline" size={20} color="black" />
                </View>
                <Text style={styles.optionText}>Upload Cover Photo</Text>
              </TouchableOpacity>
             
              {/* See Cover Photo (No Action) */}
              <TouchableOpacity style={styles.option}>
                <View style={[styles.iconContainer, { backgroundColor: 'lightgray' }]}>
                  <Ionicons name="eye-outline" size={20} color="black" />
                </View>
                <Text style={styles.optionText}>See Cover Photo</Text>
              </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 15,
    marginLeft: 5,
  },
  optionText1: {
    fontSize: 15,
    color: "red",
    marginLeft: 5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});

export default ChnageGroupCoverPhotoModal;
