import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import {Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/config';
import * as ImagePicker from 'expo-image-picker'; // << ADD this at top

const CreateGroupScreen = () => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState('Public');
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [pickedImage, setPickedImage] = useState<string | null>(null); // << ADD this


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          console.log(parsedUser.name);
          console.log(parsedUser._id);
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handlePickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // square crop
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        setPickedImage(selectedAsset.uri); // Save picked image URI
        console.log('Selected image:', selectedAsset.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleCreatePage = async () => {
    if (!groupName) {
      alert('Please enter a page name');
      return;
    }

    if (!user || !user._id) {
      alert('User not found. Please login again.');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', groupName);
      formData.append('privacy', privacy);
      formData.append('description', description);
      formData.append('userId', user._id);

      if (pickedImage) {
        const filename = pickedImage.split('/').pop();
        const match = /\.(\w+)$/.exec(filename ?? '');
        const type = match ? `image/${match[1]}` : `image`;

        formData.append('groupProfilePic', {
          uri: pickedImage,
          name: filename,
          type,
        } as any); // `as any` to avoid TypeScript issues
      }

      const response = await fetch(`${API_URL}/api/pages/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const groupId = data.groupId;
        console.log('Group created with ID:', groupId);

        router.push({ pathname: '/groupcreation/InviteMembersScreen', params: { groupId } });
      } else {
        alert(data.message || 'Failed to create page.');
      }
    } catch (error: any) {
      console.error('Error creating page:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.header}>Create a Page</Text>

      {/* Group Image Placeholder */}
      <TouchableOpacity style={styles.imageContainer} onPress={handlePickImage}>
        <Image
          source={pickedImage ? { uri: pickedImage } : require('../../assets/images/ef3-placeholder-image.jpg')}
          style={styles.image}
        />
      </TouchableOpacity>

      {/* Group Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Name your page..."
        value={groupName}
        onChangeText={setGroupName}
      />
       <TextInput
              style={styles.textArea}
              placeholder="Describe what your group is about..."
              value={description}
              onChangeText={setDescription}
              multiline
            />
      

      {/* Separator */}
      <View style={styles.separator} />

      {/* Privacy Section */}
      <Text style={styles.label}>Privacy</Text>
      <View style={styles.privacyField}>
        <Text style={styles.privacyText}>{privacy}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="chevron-down-outline" size={24} color="#555" />
        </TouchableOpacity>
      </View>

      {/* Create Button */}
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <TouchableOpacity style={styles.createButton} onPress={handleCreatePage}>
        <Text style={styles.createButtonText}>{loading ? 'Creating...' : 'Create Page'}</Text>
      </TouchableOpacity>
</View>


      {/* Privacy Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Privacy</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.doneButton}>Done</Text>
              </TouchableOpacity>
            </View>

            {/* Public Option */}
            <TouchableOpacity style={styles.option} onPress={() => { setPrivacy('Public'); setModalVisible(false); }}>
              <Ionicons name={privacy === 'Public' ? 'radio-button-on' : 'radio-button-off'} size={24} color="#FF8B04" />
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Public</Text>
                <Text style={styles.optionDescription}>Anyone can see who is in the page and what they post.</Text>
              </View>
              <Ionicons name="earth" size={24} color="#555" />
            </TouchableOpacity>

            <View style={styles.separator} />

            {/* Private Option */}
            <TouchableOpacity style={styles.option} onPress={() => { setPrivacy('Private'); setModalVisible(false); }}>
              <Ionicons name={privacy === 'Private' ? 'radio-button-on' : 'radio-button-off'} size={24} color="#FF8B04" />
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Private</Text>
                <Text style={styles.optionDescription}>Only members can see who is in the page and what they post.</Text>
              </View>
              <Ionicons name="lock-closed" size={24} color="#555" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateGroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  image: {
    width: 145,
    height: 145,
    borderRadius: 75,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  privacyField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  privacyText: {
    fontSize: 16,
    color: '#555',
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
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  doneButton: {
    fontSize: 16,
    color: '#FF8B04',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionDescription: {
    fontSize: 14,
    color: '#555',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    height: 150,
    textAlignVertical: 'top',
    marginTop: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
});
