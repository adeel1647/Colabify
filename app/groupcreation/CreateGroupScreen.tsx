import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Link, router } from 'expo-router';

const CreateGroupScreen = () => {
  const [groupName, setGroupName] = useState('');
  const [privacy, setPrivacy] = useState('Public');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.header}>Create a Group</Text>

      {/* Group Image Placeholder */}
      <TouchableOpacity style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/ef3-placeholder-image.jpg')}
          style={styles.image}
        />
      </TouchableOpacity>

      {/* Group Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Name your group..."
        value={groupName}
        onChangeText={setGroupName}
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
  <TouchableOpacity style={styles.createButton} onPress={() => router.push('/groupcreation/InviteMembersScreen')}>
    <Text style={styles.createButtonText}>Create Group</Text>
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
                <Text style={styles.optionDescription}>Anyone can see who is in the group and what they post.</Text>
              </View>
              <Ionicons name="earth" size={24} color="#555" />
            </TouchableOpacity>

            <View style={styles.separator} />

            {/* Private Option */}
            <TouchableOpacity style={styles.option} onPress={() => { setPrivacy('Private'); setModalVisible(false); }}>
              <Ionicons name={privacy === 'Private' ? 'radio-button-on' : 'radio-button-off'} size={24} color="#FF8B04" />
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Private</Text>
                <Text style={styles.optionDescription}>Only members can see who is in the group and what they post.</Text>
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
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
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
});
