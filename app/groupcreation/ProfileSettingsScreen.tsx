import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router'; 
import { API_URL } from '@/config'; // Make sure API_URL points to your server

const ProfileSettingsScreen = () => {
  const { id } = useLocalSearchParams(); // Get id from URL params
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/users/${id}`);
      const data = await response.json();

      if (response.ok) {
        setUser(data);
      } else {
        console.error('Failed to fetch user details:', data);
        Alert.alert('Error', data.message || 'Failed to load user details.');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      Alert.alert('Error', 'Something went wrong while loading user details.');
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString) => {
    if (dateString.toLowerCase() === "present") {
      return "Present";
    }
    
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };
  

  if (loading) {
    return (
      <View >
        <ActivityIndicator size="large" color="#FF8B04" />
      </View>
    );
  }

  if (!user) {
    return (
      <View>
        <Text>No user found.</Text>
      </View>
    );
  }
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
    <Text style={styles.optionText1}>{user.mobileNumber || 'Add Phone Number'}</Text>
    <Text style={styles.subText}>Phone</Text>
  </View>
</View>

<View style={styles.option} >
  <Ionicons name="mail-outline" size={24} color="black" />
  <View style={styles.textContainer}>
    <Text style={styles.optionText1}>{user.email || 'Add Email'}</Text>
    <Text style={styles.subText}>Email</Text>
  </View>
</View>
<View>
      <Text style={styles.subHeading}>Work</Text>

      {/* Check if the user has work experience */}
      {user.workExperience && user.workExperience.length > 0 ? (
        // Render each work experience dynamically
        user.workExperience.map((work, index) => (
          <View key={index} style={styles.option}>
            <Ionicons name="wallet-outline" size={24} color="black" />
            <View style={styles.textContainer}>
              <Text style={styles.optionText1}>{work.jobTitle} at {work.company}</Text>
              <Text style={styles.subText}>{formatDate(work.from)} - {formatDate(work.to)}</Text>
            </View>
            <TouchableOpacity onPress={() => console.log("Edit Work Experience")}>
              <Feather name="edit" size={20} color="gray" style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        ))
      ) : (
       <View></View>
      )}
    </View>
    {user.workExperience && user.workExperience.length < 3 && (
    <TouchableOpacity 
      style={styles.option} 
      onPress={() => router.push(`/groupcreation/AddWorkExperienceScreen?id=${user?._id}`)}
    >
      <Ionicons name="bag-outline" size={24} color="black" />
      <View style={styles.textContainer}>
        <Text style={styles.subText}>Add Work Experience</Text>
      </View>
    </TouchableOpacity>
  )}
    <View>
  <Text style={styles.subHeading}>Education</Text>

  {/* Check if the user has education data */}
  {user.education && user.education.length > 0 ? (
    // Render each education entry dynamically, but limit to 3 items
    user.education.slice(0, 3).map((edu, index) => (
      <View key={index} style={styles.option}>
        <Ionicons name="school-outline" size={24} color="black" />
        <View style={styles.textContainer}>
          <Text style={styles.optionText1}>{edu.institution}</Text>
          <Text style={styles.subText}>{edu.degree}</Text>
          <Text style={styles.subText}>{formatDate(edu.from)} - {formatDate(edu.to)}</Text>
        </View>
        <TouchableOpacity onPress={() => console.log("Edit Education")}>
          <Feather name="edit" size={20} color="gray" style={styles.editIcon} />
        </TouchableOpacity>
      </View>
    ))
  ) : (
    <View></View>
  )}

  {user.education && user.education.length < 3 && (
    <TouchableOpacity 
      style={styles.option} 
      onPress={() => router.push(`/groupcreation/AddEducationScreen?id=${user?._id}`)}
    >
      <Ionicons name="school-outline" size={24} color="black" />
      <View style={styles.textContainer}>
        <Text style={styles.subText}>Add Educational Background</Text>
      </View>
    </TouchableOpacity>
  )}
</View>


<Text style={styles.subHeading}>Address</Text>
<View style={styles.option} >
  <Ionicons name="location-outline" size={24} color="black" />
  <View style={styles.textContainer}>
    <Text style={styles.optionText1}>{user.address || 'Add Address'}</Text>
    <Text style={styles.subText}>HomeTown</Text>
  </View>
  
  <TouchableOpacity onPress={() => router.push(`/groupcreation/UpdateAddressScreen?id=${user?._id}`)}>
    <Feather name="edit" size={20} color="gray" style={styles.editIcon} />
  </TouchableOpacity>
</View>
<Text style={styles.subHeading}>Basic Info</Text>
<View style={styles.option} >
  <Ionicons name="person-outline" size={24} color="black" />
  <View style={styles.textContainer}>
    <Text style={styles.optionText1}>{user.gender || ''}</Text>
    <Text style={styles.subText}>Gender</Text>
  </View>
  
  <TouchableOpacity onPress={() => console.log("Edit Work Experience")}>
    <Feather name="edit" size={20} color="gray" style={styles.editIcon} />
  </TouchableOpacity>
</View>
<View style={styles.option} >
<FontAwesome name="birthday-cake" size={24} color="black" />
<View style={styles.textContainer}>
    <Text style={styles.optionText1}>
      {user.dateOfBirth ? formatDate(user.dateOfBirth) : 'Add Date of Birth'}
    </Text>
    <Text style={styles.subText}>Date of Brith</Text>
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
    paddingVertical: 10,
    marginTop: 30,
    marginBottom:10,
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
