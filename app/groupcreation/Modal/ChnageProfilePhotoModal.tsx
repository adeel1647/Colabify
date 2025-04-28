import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ChnageProfilePhotoModal = ({ visible, onClose }) => {
  
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
      // Handle the taken photo (e.g., upload it)
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
      // Handle the selected photo (e.g., upload it)
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
                <Text style={styles.optionText}>Upload Photo</Text>
              </TouchableOpacity>
             
              {/* See Cover Photo (No Action) */}
              <TouchableOpacity style={styles.option}>
                <View style={[styles.iconContainer, { backgroundColor: 'lightgray' }]}>
                  <Ionicons name="eye-outline" size={20} color="black" />
                </View>
                <Text style={styles.optionText}>See Profie Photo</Text>
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

export default ChnageProfilePhotoModal;
