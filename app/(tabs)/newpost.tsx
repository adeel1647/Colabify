import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../../components/NewPost';

const NewPostScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header
        profileImage={require('../../assets/images/my-profile-image.jpg')}
        smallText="Anyone"
        onPendingPress={() => console.log('Pending pressed')}
        onPostPress={() => console.log('Post pressed')}
      />

      <TextInput
        style={styles.textArea}
        placeholder="Share your thoughts..."
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
      />

      <View style={styles.bottomRightSidebar}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="camera" size={28} color="#FF8B04" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="photo" size={28} color="#34C759" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    padding: 15,
    backgroundColor: '#fff',
  },
  textArea: {
    flex: 1,
    marginTop: 15,
    padding: 15,
    fontSize: 18,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // for Android shadow
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
    elevation: 5, // for Android shadow
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
});

export default NewPostScreen;
