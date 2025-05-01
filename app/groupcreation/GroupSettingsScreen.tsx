import React, { useEffect, useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, router } from 'expo-router';
import { API_URL } from '@/config';
import GroupSettingsSkeletonLoader from './GroupSettingsSkeletonLoader';

const GroupSettingsScreen = ({ navigation }) => {
  const [name, setName] = useState("My Group");
  const [description, setDescription] = useState("This is a great group!");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [privacy, setPrivacy] = useState("Public");
  const { groupId } = useLocalSearchParams(); 

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const res = await fetch(`${API_URL}/api/pages/${groupId}`);
        const data = await res.json();
  
        if (data.success) {
          setName(data.page.name || ""); // adjust based on your backend response structure
          setDescription(data.page.description || "");
          setPrivacy(data.page.privacy || "Public");
          if (data.page.groupProfilePic) {
            setCoverPhoto(`${API_URL}/uploads/groupProfilePics/${data.page.groupProfilePic}`);
          }
        }
      } catch (error) {
        console.error("Failed to fetch group details:", error);
      } finally {
        setIsLoading(false); // Stop loading once data is fetched
      }
    };
  
    if (groupId) {
      fetchGroupDetails();
    }
  }, [groupId]);
  
  // Function to pick an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCoverPhoto(result.assets[0].uri);
    }
  };

  // Function to handle saving settings
  const handleSave = async () => {
    if (!groupId) return;
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('privacy', privacy);
  
    if (coverPhoto && !coverPhoto.startsWith('http')) {
      const fileName = coverPhoto.split('/').pop();
      const fileType = fileName.split('.').pop();
  
      formData.append('groupProfilePic', {
        uri: coverPhoto,
        name: fileName,
        type: `image/${fileType}`,
      });
    }
  
    try {
      const response = await fetch(`${API_URL}/api/pages/${groupId}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      const result = await response.json();
  
      if (result.success) {
        alert('Group updated successfully!');
        router.push({ pathname: '/groupcreation/GroupScreen', params: { groupId } });
      } else {
        alert(result.message || 'Failed to update group.');
      }
    } catch (error) {
      console.error('Update failed:', error);
      alert('An error occurred while updating.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Group Settings</Text>
      </View>

      <View style={styles.separator} />
      {isLoading ? (
        <GroupSettingsSkeletonLoader />
      ) : (
      <>
      {/* Basic Info Section */}
      <Text style={styles.sectionHeading}>Basic Info</Text>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter group name"
        />
      </View>

      {/* Description Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter group description"
          multiline
        />
      </View>

      {/* Cover Photo Picker */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Profile Photo</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {coverPhoto ? (
            <Image source={{ uri: coverPhoto }} style={styles.coverPhoto} />
          ) : (
            <Ionicons name="image-outline" size={40} color="gray" />
          )}
          <Text style={styles.imagePickerText}>
            {coverPhoto ? "Change Photo" : "Select a Photo"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Privacy Dropdown (Simple Button Toggle) */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Privacy</Text>
        <TouchableOpacity 
          style={styles.privacyButton} 
          onPress={() => setPrivacy(privacy === "Public" ? "Private" : "Public")}
        >
          <Text style={styles.privacyText}>{privacy}</Text>
          <Ionicons name="chevron-down" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
      </>
      )}
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
    textAlign:"center",
    justifyContent:"center"
  },
  separator: {
    height: 1,
    marginBottom: 15,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  inputContainer: {
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
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  imagePickerText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#FF8B04',
  },
  coverPhoto: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  privacyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  privacyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#FF8B04',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GroupSettingsScreen;
