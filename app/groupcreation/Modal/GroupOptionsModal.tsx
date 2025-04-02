import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GroupOptionsModal = ({ visible, onClose }) => {
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
               {/* Share Group Option */}
               <TouchableOpacity style={styles.option} onPress={() => console.log('Share Group')}>
                <View style={[styles.iconContainer, { backgroundColor: 'lightgray' }]}>
                  <Ionicons name="share-social-outline" size={20} color="black" />
                </View>
                <Text style={styles.optionText}>Share Group</Text>
              </TouchableOpacity>
              {/* Pause Group Option */}
              <TouchableOpacity style={styles.option} onPress={() => console.log('Pause Group')}>
                <View style={[styles.iconContainer, { backgroundColor: 'lightgray' }]}>
                  <Ionicons name="pause" size={20} color="black" />
                </View>
                <Text style={styles.optionText}>Pause Group</Text>
              </TouchableOpacity>
             
              {/* Delete Group Option */}
              <TouchableOpacity style={styles.option} onPress={() => console.log('Delete Group')}>
                <View style={[styles.iconContainer, { backgroundColor: 'lightgray' }]}>
                  <Ionicons name="log-out-outline" size={20} color="red" />
                </View>
                <Text style={styles.optionText1}>Delete Group</Text>
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
    color:"red",
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

export default GroupOptionsModal;
