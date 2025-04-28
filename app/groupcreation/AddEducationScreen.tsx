import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { API_URL } from '@/config';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';

const AddEducationScreen = () => {
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [isPresent, setIsPresent] = useState(false); // For checking if the user is currently working
  const { id } = useLocalSearchParams();

  const handleSaveEducation = async () => {
    // Trim degree and institution to remove spaces at the beginning and end
    const trimmedDegree = degree.trim();
    const trimmedInstitution = institution.trim();
  
    // Check if fields are empty after trimming
    if (!trimmedDegree || !trimmedInstitution) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/api/users/${id}/education`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          degree: trimmedDegree,
          institution: trimmedInstitution,
          from,
          to: isPresent ? 'Present' : to,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Education added:', data);
        Alert.alert('Success', 'Education added successfully!');
        router.push('/myProfile'); // Navigate back to profile after saving
      } else {
        console.error('Failed to add education:', data);
        Alert.alert('Error', data.message || 'Failed to add education.');
      }
    } catch (error) {
      console.error('Error adding education:', error);
      Alert.alert('Error', 'Something went wrong. Try again later.');
    }
  };
  

  const onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || from;
    setShowFrom(Platform.OS === 'ios');
    setFrom(currentDate);
  };

  const onChangeTo = (event, selectedDate) => {
    const currentDate = selectedDate || to;
    setShowTo(Platform.OS === 'ios');
    setTo(currentDate);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Education</Text>
        <TouchableOpacity onPress={handleSaveEducation}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Education Fields */}
      <Text style={styles.title}>Degree</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your degree"
        value={degree}
        onChangeText={setDegree}
      />

      <Text style={styles.title}>Institution</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter institution name"
        value={institution}
        onChangeText={setInstitution}
      />

    <Text style={styles.title}>Start Date</Text>
      <View style={styles.dateInputContainer}>
        <TouchableOpacity onPress={() => setShowFrom(true)} style={styles.dateButton}>
          <Text style={styles.dateText}>
            {from ? from.toLocaleDateString() : 'Select Start Date'}
          </Text>
        </TouchableOpacity>
        <Ionicons name="calendar-outline" size={24} color="gray" style={styles.calendarIcon} />
        {showFrom && (
          <DateTimePicker
            value={from || new Date()}
            mode="date"
            display="default"
            onChange={onChangeFrom}
            maximumDate={new Date()} // Dates should be from today or earlier
          />
        )}
      </View>

      <Text style={styles.title}>End Date</Text>
      <View style={styles.dateInputContainer}>
        <TouchableOpacity
          onPress={() => !isPresent && setShowTo(true)}
          style={[styles.dateButton, isPresent ? styles.disabledButton : null]}>
          <Text style={styles.dateText}>
            {isPresent ? 'Present' : (to ? to.toLocaleDateString() : 'Select End Date')}
          </Text>
        </TouchableOpacity>
        <Ionicons name="calendar-outline" size={24} color="gray" style={styles.calendarIcon} />
        {showTo && !isPresent && (
          <DateTimePicker
            value={to || new Date()}
            mode="date"
            display="default"
            onChange={onChangeTo}
            maximumDate={new Date()} // Dates should be from today or earlier
          />
        )}
      </View>


      {/* Present Checkbox */}
      <View style={styles.checkboxContainer}>
       
        <Checkbox
          value={isPresent}
          onValueChange={setIsPresent}
          color={'#FF8B04'}
        />
         <Text style={styles.checkboxText}>Present</Text>
      </View>

      {/* Loading indicator */}
      {loading && <ActivityIndicator size="large" color="#FF8B04" style={{ marginTop: 20 }} />}
    </View>
  );
};

export default AddEducationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerText: { fontSize: 16, fontWeight: 'bold' },
  doneText: { fontSize: 16, color: '#FF8B04', fontWeight: 'bold' },
  separator: { height: 2, backgroundColor: '#ddd', marginVertical: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  textInput: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    padding: 10, 
    fontSize: 16, 
    marginTop: 10, 
    backgroundColor: '#f9f9f9' 
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dateButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  disabledButton: {
    backgroundColor: '#e0e0e0', // Disabled button style when "Present" is selected
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  calendarIcon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
  checkboxText: {
    fontSize: 16,
    marginHorizontal:8
  },
});
