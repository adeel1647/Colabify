import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import Header from '../../components/NewPost';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { API_URL } from '@/config';

const NewPostScreen: React.FC = () => {
  const [thoughts, setThoughts] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userData = await AsyncStorage.getItem('userData');
          if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            console.log(parsedUser.name);       // ➔ "Adeel Ahmed"
            console.log(parsedUser._id);
            console.log(parsedUser.profilePic); // ➔ Profile pic filename
          }
        } catch (error) {
          console.error('Failed to load user data:', error);
        }
      };
  
      fetchUserData();
    }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need permission to access your gallery.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uris = result.assets.map(asset => asset.uri);
      setSelectedImages(prev => [...prev, ...uris]);
    }
  };

  const deleteImage = (uriToDelete: string) => {
    setSelectedImages(prev => prev.filter(uri => uri !== uriToDelete));
  };

  const handlePost = async () => {
    if (!thoughts.trim() && selectedImages.length === 0) {
      Alert.alert('Cannot Post', 'Please write something or select an image.');
      return;
    }
  
    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('caption', thoughts);
  
    selectedImages.forEach((uri, index) => {
      const filename = uri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename ?? '');
      const type = match ? `image/${match[1]}` : `image`;
  
      formData.append('images', {
        uri,
        name: filename,
        type,
      } as any); // 👈 Sometimes need to force cast for FormData
    });
  
    try {
      const response = await fetch(`${API_URL}/api/posts/postcreate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Post created successfully:', responseData);
        Alert.alert('Success', 'Post created!');
  
        // Clear the data after post creation
        setThoughts('');
        setSelectedImages([]);
        setUser(null); // Optional: Clear the user data if you want
  
        // Redirect to home page
        router.push('/home');
      } else {
        const errorData = await response.json();
        console.error('Failed to create post:', errorData);
        Alert.alert('Error', errorData.message || 'Failed to create post.');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Something went wrong.');
    }
  };
  
  const profileImageSource = user?.profilePic
      ? { uri: `${API_URL}/uploads/${user.profilePic}` }
      : { uri: 'https://www.pngarts.com/files/5/Cartoon-Avatar-PNG-Photo.png' };

    
  

  const renderItem = ({ item, drag, isActive }: RenderItemParams<string>) => {
    return (
      <TouchableOpacity
        style={[styles.imageWrapper, isActive && { opacity: 0.8 }]}
        onLongPress={drag}
        activeOpacity={0.9}
      >
        <Image source={{ uri: item }} style={styles.selectedImage} />
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteImage(item)}>
          <FontAwesome name="close" size={16} color="#fff" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        profileImage={profileImageSource}
        smallText="Anyone"
        onPendingPress={() => console.log('Pending pressed')}
        onPostPress={handlePost}
      />

      <TextInput
        style={styles.textArea}
        placeholder="Share your thoughts..."
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
        maxLength={500}
        value={thoughts}
        onChangeText={setThoughts}
      />

      {/* Show selected images */}
      <View style={{ marginTop: 15 }}>
        <DraggableFlatList
          data={selectedImages}
          horizontal
          keyExtractor={(item, index) => `draggable-item-${item}-${index}`}
          onDragEnd={({ data }) => setSelectedImages(data)}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Camera and Gallery buttons */}
      <View style={styles.bottomRightSidebar}>
        <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
          <FontAwesome name="camera" size={28} color="#FF8B04" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
          <FontAwesome name="photo" size={28} color="#34C759" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 350,  // << limit height
    marginTop: 15,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  bottomRightSidebar: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  iconButton: {
    marginLeft: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  imageWrapper: {
    marginRight: 10,
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  deleteButton: {
    position: 'absolute',
    top: 1,
    right: 10,
    backgroundColor: 'rgba(248, 7, 7, 0.6)',
    borderRadius: 8,
    padding: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },  
});

export default NewPostScreen;
