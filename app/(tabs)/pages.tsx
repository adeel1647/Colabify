import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Import icons
import JobAlert from '../../components/JobAlert';
import NetworkCard from '@/components/NetworkCard';
import {Link, router } from 'expo-router';
import Header from '@/components/Header';

export default function JobScreen() {
  const [activeTab, setActiveTab] = useState('Your Pages'); // Track selected tab
  const handleClose = () => {
    console.log('Job alert closed');
  };

  const jobAlerts = [
    { pageImage: require('../../assets/images/Company01.jpg'), pageName: 'Trainee System Engineer End User IT Surpport', description: 'IFS', pageDescription: 'Colombo, Western Province, Sri Lanka' },
    { pageImage: require('../../assets/images/Company02.jpg'), pageName: 'Lead/Senior QA Automation Engineer', description: 'Fcode Labs', pageDescription: 'Job description for company two' },
    { pageImage: require('../../assets/images/Company03.jpg'), pageName: 'Senior Develops Engineer', description: 'Epic Lanka', pageDescription: 'Job description for company three' },
    { pageImage: require('../../assets/images/Company09.jpg'), pageName: 'Senior Software Engineer, (GO and Node)', description: 'RootCode Lab', pageDescription: 'Job description for company four' },
  ];
  const yourGroups = [
       { pageImage: require('../../assets/images/favicon.png'), pageName: 'Colabify', description: 'RootCode Lab', pageDescription: 'Job description for company four' },
  ];
  const networkCards = [
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    // Add more cards as needed...
  ];
  const handleConnect = () => {
    console.log('Connect button pressed!');
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Header />
      {/* Tabs Section */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('Your Pages')} style={[styles.tab, activeTab === 'Your Pages' && styles.activeTab]}>
          <FontAwesome name="users" size={18} color={activeTab === 'Your Pages' ? 'black' : '#333'} />
          <Text style={[styles.tabText, activeTab === 'Your Pages' && styles.activeTabText]}>Your Pages</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => setActiveTab('Discover')} style={[styles.tab, activeTab === 'Discover' && styles.activeTab]}>
          <MaterialIcons name="explore" size={18} color={activeTab === 'Discover' ? 'black' : '#333'} />
          <Text style={[styles.tabText, activeTab === 'Discover' && styles.activeTabText]}>Discover</Text>
        </TouchableOpacity>
      </View>
  
      {/* Content Section */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

      {activeTab === 'Your Pages' && (
  <>
    {/* Groups You Manage Section */}
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeading}>Groups You Manage</Text>
      <TouchableOpacity onPress={() => router.push('/groupcreation/CreateGroupScreen')}>        
        <Text style={styles.createLink}>Create</Text>
      </TouchableOpacity>
    </View>
    
    <Text style={styles.infoText}>Become an admin or moderator of a group to see it listed here...</Text>
    
    <TouchableOpacity style={styles.createGroupButton} onPress={() => router.push('/groupcreation/CreateGroupScreen')}>
      <Text style={styles.createGroupButtonText}>Create Group</Text>
    </TouchableOpacity>
    {
  yourGroups.map((alert, index) => (
    <TouchableOpacity 
      key={index} 
      onPress={() => router.push('/groupcreation/GroupScreen')}
    >
      <JobAlert
        pageImage={alert.pageImage}
        pageName={alert.pageName}
        description={alert.description}
        pageDescription={alert.pageDescription}
        onClose={handleClose}
      />
    </TouchableOpacity>
  ))
}

    {/* Separator Line */}
    <View style={styles.separatorLine} />
    

    {/* Your Following Section */}
    <Text style={styles.sectionHeading}>Your Following</Text>
  </>
)}


  {activeTab === 'Your Pages' ? (
    jobAlerts.map((alert, index) => (
      <JobAlert
        key={index}
        pageImage={alert.pageImage}
        pageName={alert.pageName}
        description={alert.description}
        pageDescription={alert.pageDescription}
        onClose={handleClose}
      />
    ))
  ) : (
    <View style={styles.networkCardsContainer}>
    <Text style={styles.networkCardsTitle}>Suggested for you</Text>
    <View style={styles.networkCardsRow}>
      {networkCards.map((card, index) => (
        <NetworkCard
          key={index}
          backgroundImage={card.backgroundImage}
          profileImage={card.profileImage}
          profileName={card.profileName}
          position={card.position}
          mutualConnections={card.mutualConnections}
          onConnect={handleConnect}
        />
      ))}
    </View>
  </View>
  )}

</ScrollView>

    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 30,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 35,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dotsIcon: {
    marginLeft: 15,
    marginRight: 8,
  },
  messageIcon: {
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    gap: 6, // Space between icon and text
  },
  activeTab: {
    backgroundColor: '#FFA238',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  placeholderText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: 'gray',
  },

  // New Styles for Groups You Manage
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginLeft: 10,
  },
  infoText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 15,
    marginLeft: 10,
  },
  createGroupButton: {
    backgroundColor: '#FF8B04',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'center',
    marginLeft: 10,
  },
  createGroupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  networkCardsContainer: {
    marginVertical: 10,
  },
  networkCardsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  networkCardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  createLink: {
    color: '#FFA238',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
});


