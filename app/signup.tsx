import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Modal, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
    gender: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);

  const handleChange = (field, value) => {
    if (field === 'firstName' || field === 'lastName') {
      // Remove spaces
      value = value.replace(/\s/g, '');
    }

    if (field === 'phoneNumber') {
      // Allow only numbers
      value = value.replace(/[^0-9]/g, '');
    }

    setFormData({ ...formData, [field]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setFormData({ ...formData, dateOfBirth: formattedDate });
    }
  };

  const handleContinue = () => {
    // Validate phone number length
    if (formData.phoneNumber.length !== 11 && formData.phoneNumber.length !== 13) {
      alert('Phone number must be 11 or 13 digits.');
      return;
    }

    router.push({
      pathname: '/signupPassword',
      params: { ...formData },
    });
  };

  const handleSelectGender = (gender) => {
    setFormData({ ...formData, gender });
    setShowGenderModal(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/collabify2.png')} style={styles.image} />
      </View>

      <View style={styles.header}>
        <Text style={styles.topic}>Create Your Account</Text>
      </View>

      {/* First Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter First Name" 
          value={formData.firstName}
          onChangeText={(text) => handleChange('firstName', text)}
        />
      </View>

      {/* Last Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter Last Name" 
          value={formData.lastName}
          onChangeText={(text) => handleChange('lastName', text)}
        />
      </View>

      {/* Phone Number */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter Phone Number" 
          keyboardType="phone-pad" 
          value={formData.phoneNumber}
          onChangeText={(text) => handleChange('phoneNumber', text)}
        />
      </View>

      {/* Date of Birth */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
          <Text style={{ color: formData.dateOfBirth ? '#000' : '#ccc' }}>
            {formData.dateOfBirth || 'YYYY-MM-DD'}
          </Text>
          <Ionicons name="calendar" size={20} color="#b9babd" />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={new Date()}
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Address */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter Your Address" 
          value={formData.address}
          onChangeText={(text) => handleChange('address', text)}
        />
      </View>

      {/* Gender */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender</Text>
        <TouchableOpacity style={styles.dateInput} onPress={() => setShowGenderModal(true)}>
          <Text style={{ color: formData.gender ? '#000' : '#ccc' }}>
            {formData.gender || 'Select Gender'}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#b9babd" />
        </TouchableOpacity>
      </View>

      {/* Gender Modal */}
      <Modal visible={showGenderModal} transparent animationType="fade">
        <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
  {['Male', 'Female', 'Other'].map((g, index, array) => (
    <View key={g} style={{ width: '100%' }}>
      <Pressable onPress={() => handleSelectGender(g)} style={styles.genderOption}>
        <Text style={styles.genderText}>{g}</Text>
      </Pressable>

      {/* Show separator except after the last item */}
      {index < array.length - 1 && <View style={styles.separator} />}
    </View>
  ))}
</View>

        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 50,
    marginRight: 10,
  },
  topic: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: '#b9babd',
  },
  input: {
    height: 40,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#FF8B04',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
  },
  genderOption: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  genderText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
  },
  
});
