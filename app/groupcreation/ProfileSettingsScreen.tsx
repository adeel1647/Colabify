import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import {Link, router } from 'expo-router';

const ProfileSettingsScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {/* Settings Heading */}
      <Text style={styles.heading}>Profile Settings</Text>

      {/* Your Settings Section */}
      <Text style={styles.subHeading}>Contact Info</Text>
      <View style={styles.option} >
  <Ionicons name="call-outline" size={24} color="black" />
  <View style={styles.textContainer}>
    <Text style={styles.optionText1}>03030407322</Text>
    <Text style={styles.subText}>Phone</Text>
  </View>
  
  <TouchableOpacity onPress={() => console.log("Edit Work Experience")}>
    <Feather name="edit" size={20} color="gray" style={styles.editIcon} />
  </TouchableOpacity>
</View>

<View style={styles.option} >
  <Ionicons name="mail-outline" size={24} color="black" />
  <View style={styles.textContainer}>
    <Text style={styles.optionText1}>ahmedadeel164722@gmail.com</Text>
    <Text style={styles.subText}>Email</Text>
  </View>
  
  <TouchableOpacity onPress={() => console.log("Edit Work Experience")}>
    <Feather name="edit" size={20} color="gray" style={styles.editIcon} />
  </TouchableOpacity>
</View>

<Text style={styles.subHeading}>Work</Text>
<TouchableOpacity style={styles.option} >
  <Ionicons name="bag-outline" size={24} color="black" />
  <View style={styles.textContainer}>
    <Text style={styles.subText}>Add Work Experience</Text>
  </View>
</TouchableOpacity>
<View style={styles.option} >
  <Ionicons name="wallet-outline" size={24} color="black" />
  <View style={styles.textContainer}>
    <Text style={styles.optionText1}>Developer at Fiver</Text>
    <Text style={styles.subText}>17-Dec-2018  -Present</Text>
  </View>
  <TouchableOpacity onPress={() => console.log("Edit Work Experience")}>
    <Feather name="edit" size={20} color="gray" style={styles.editIcon} />
  </TouchableOpacity>
</View>

<Text style={styles.subHeading}>Education</Text>
<TouchableOpacity style={styles.option} >
  <Ionicons name="school-outline" size={24} color="black" />
  <View style={styles.textContainer}>
    <Text style={styles.subText}>Add Educational Background</Text>
  </View>
</TouchableOpacity>

<View style={styles.option} >
  <Ionicons name="school-outline" size={24} color="black" />
  <View style={styles.textContainer}>
    <Text style={styles.optionText1}>PMAS ARID AGRICULTURE UNIVERSITY</Text>
    <Text style={styles.subText}>BS SOFTWARE ENGINEERING</Text>
    <Text style={styles.subText}>17-Dec-2018  -Present</Text>
  </View>
  
  <TouchableOpacity onPress={() => console.log("Edit Work Experience")}>
    <Feather name="edit" size={20} color="gray" style={styles.editIcon} />
  </TouchableOpacity>
</View>
<View style={styles.option} >
  <Ionicons name="school-outline" size={24} color="black" />
  <View style={styles.textContainer}>
    <Text style={styles.optionText1}>Punjab Collage Lahore</Text>
    <Text style={styles.subText}>F.Sc. Medical Science</Text>
    <Text style={styles.subText}>17-Dec-2018  -Present</Text>
  </View>
  <TouchableOpacity onPress={() => console.log("Edit Work Experience")}>
    <Feather name="edit" size={20} color="gray" style={styles.editIcon} />
  </TouchableOpacity>
</View>

<Text style={styles.subHeading}>Address</Text>
<View style={styles.option} >
  <Ionicons name="location-outline" size={24} color="black" />
  <View style={styles.textContainer}>
    <Text style={styles.optionText1}>Lahore Punjab</Text>
    <Text style={styles.subText}>HomeTown</Text>
  </View>
  
  <TouchableOpacity onPress={() => console.log("Edit Work Experience")}>
    <Feather name="edit" size={20} color="gray" style={styles.editIcon} />
  </TouchableOpacity>
</View>
<Text style={styles.subHeading}>Basic Info</Text>
<View style={styles.option} >
  <Ionicons name="person-outline" size={24} color="black" />
  <View style={styles.textContainer}>
    <Text style={styles.optionText1}>Male</Text>
    <Text style={styles.subText}>Gender</Text>
  </View>
  
  <TouchableOpacity onPress={() => console.log("Edit Work Experience")}>
    <Feather name="edit" size={20} color="gray" style={styles.editIcon} />
  </TouchableOpacity>
</View>
<View style={styles.option} >
<FontAwesome name="birthday-cake" size={24} color="black" />
<View style={styles.textContainer}>
    <Text style={styles.optionText1}>21 October 2000</Text>
    <Text style={styles.subText}>Bate of Brith</Text>
  </View>
  
  <TouchableOpacity onPress={() => console.log("Edit Work Experience")}>
    <Feather name="edit" size={20} color="gray" style={styles.editIcon} />
  </TouchableOpacity>
</View>


      {/* Support Section */}
      <Text style={styles.subHeading}>Support</Text>
      <TouchableOpacity style={styles.option}>
        <Ionicons name="help-circle-outline" size={24} color="black" />
        <Text style={styles.optionText}>Help Center</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Ionicons name="people-outline" size={24} color="black" />
        <Text style={styles.optionText}>Community Hub</Text>
      </TouchableOpacity>

      {/* Bottom Action Icons */}
      <View style={styles.iconRow}>
  <TouchableOpacity style={styles.logoutContainer}>
    <Ionicons name="log-out-outline" size={32} color="#FF8B04" />
    <Text style={styles.logoutText}>Logout</Text>
  </TouchableOpacity>
</View>
</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
    paddingVertical: 20,
    marginTop: 30,
    borderRadius: 10,
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    color: "#FF8B04",
    fontWeight: "bold",
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  optionText1: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    color: "gray",
  },
  editIcon: {
    padding: 8, // Adds touchable space for better UX
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default ProfileSettingsScreen;
