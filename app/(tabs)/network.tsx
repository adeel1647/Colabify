
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native';
import Header from '../../components/Header';
import InvitationCard from '../../components/InvitationCard';
import NetworkCard from '../../components/NetworkCard'; // Import the new NetworkCard component
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import SuggestionCard from '@/components/SuggestionCard';
import { API_URL } from '@/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonInvitationCard from '@/components/InvitationCardSkelton';
import SkeletonLoader from '@/components/NetworkCardSkelton';

interface WorkExperience {
  jobTitle: string;
  company: string;
}

interface Education {
  degree: string;
  institute: string;
  institution: string
}

interface Suggestions {
  _id: string;
  userId: User;
  firstName: string;
  lastName: string;
  profilePic: string;
  connections: number;
  workExperience?: WorkExperience[];
  education?: Education[];
  dateAdded: string
}
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string;
  connections: number;
  education: Education[];
  workExperience: WorkExperience[];
}
interface Groups {
  _id: string;
  groupProfilePic: string;
  name : string;
  members: string[];
  description : string;
}

const Network: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestions[]>([]);
  const [pages, setPages] = useState<Groups[]>([]);
  const [user, setUser] = useState<any>(null);
  const [invitations, setInvitations] = useState<Suggestions[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          console.log(parsedUser._id);
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (user?._id) {
      fetchUsers();
      fetchPages();
      fetchInvitations();
    }
  }, [user]);
  
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users/unconnected-users/${user._id}`);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
    finally {
      setIsLoading(false);
    }
  };
  const fetchInvitations = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users/${user._id}/friends`);
      const data = await response.json();
      
      // Assuming the response has a 'friends' field that contains the invitation data
      setInvitations(data.friends || []); // Set the friends data (invitations)
    } catch (error) {
      console.error('Failed to fetch invitations:', error);
    }
    finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };
  
  const fetchPages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/pages/`);
      const data = await response.json();
      if (data.success) {
        setPages(data.pages);
      }
    } catch (error) {
      console.error('Failed to fetch pages:', error);
    }
    finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };

  const handleClose = () => {
    console.log('Invitation closed!');
  };

  const handleAccept = async (userId: string) => {
    console.log('Accepted user:', userId);
    console.log('Logged-in user ID:', user._id);
  
    try {
      const response = await fetch(`${API_URL}/api/users/connection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: userId,
          receiverId: user._id,
        }),
      });
  
      const text = await response.text(); // Get raw response text
  
      try {
        const data = JSON.parse(text); // Try parsing it
        if (response.ok) {
          console.log('Friend request sent successfully:', data);
          Alert.alert('Success', 'Friend request sent successfully!', [
            {
              text: 'OK',
              onPress: () => {
                // Call your refresh function or update state here
                refreshData(); // Replace this with your actual refresh logic
              },
            },
          ]);
        } else {
          console.error('Failed to send request:', data.message);
          Alert.alert('Error', data.message || 'Failed to send request');
        }
      } catch (parseError) {
        console.error('Response is not valid JSON:', text);
        Alert.alert('Error', 'Response is not valid JSON');
      }
  
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };
  const refreshData = async () => {
    setIsLoading(true); // optional: show loader
    try {
      const response = await fetch(`${API_URL}/api/users/unconnected-users/${user._id}`);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      Alert.alert('Error', 'Could not refresh suggestions');
    } finally {
      setIsLoading(false);
    }
  };
  const refreshInvitations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/users/${user._id}/friends`);
      const data = await response.json();
      
      // Assuming the response has a 'friends' field that contains the invitation data
      setInvitations(data.friends || []); // Set the friends data (invitations)
    } catch (error) {
      console.error('Failed to fetch invitations:', error);
      Alert.alert('Error', 'Could not refresh suggestions');
    }
    finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };
  
  
  const handleAcceptRequest = async (userId: string) => {
    console.log('Sender user:', userId); // sender = the one who sent the request
    console.log('Receiver user ID:', user._id); // receiver = the logged-in user
  
    try {
      const response = await fetch(`${API_URL}/api/users/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: userId,        // person who sent the request
          receiverId: user._id,    // logged-in user accepting it
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Friend request accepted:', data.message);
        Alert.alert('Success', 'Friend request sent successfully!', [
          {
            text: 'OK',
            onPress: () => {
              // Call your refresh function or update state here
              refreshInvitations(); // Replace this with your actual refresh logic
            },
          },
        ]);
      } else {
        console.error('Error accepting request:', data.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  
  const handleDeclineRequest = async (userId: string) => {
    console.log('Accepted user:', userId);
    console.log('Logged-in user ID:', user._id);
  };
  

  const handleManageNetwork = () => {
    console.log('Manage network!');
    router.push('/myNetwork');
  };

  const handleManageInvitation = () => {
    console.log('Manage invitations!');
    router.push('/invitations');
  };

  const handleConnect = () => {
    console.log('Connect button pressed!');
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollView}>
      {isLoading ? (
        <View>
          <SkeletonInvitationCard />
          <SkeletonInvitationCard />
          <SkeletonInvitationCard />
          <SkeletonInvitationCard />
        </View>
        
      ) : (
        <>
       {invitations.length > 0 && (
  <>
    <View style={styles.manageInvitationBox}>
      <Text style={styles.manageInvitationText}>
        Invitations ({invitations.length})
      </Text>
      <TouchableOpacity onPress={handleManageInvitation}>
        <FontAwesome
          name="angle-right"
          size={24}
          color="grey"
          style={styles.manageNetworkIcon}
        />
      </TouchableOpacity>
    </View>

    {invitations.map((invitation, index) => {
      const profilePicUrl = `${API_URL}/uploads/${invitation.userId.profilePic}`;
      const profileName = `${invitation.userId.firstName} ${invitation.userId.lastName}`;
      const latestJob = invitation.userId.workExperience?.[0];
      const latestEducation = invitation.userId.education?.[0];

      const position = latestJob
        ? `${latestJob.jobTitle} at ${latestJob.company}`
        : latestEducation
        ? `${latestEducation.degree} at ${latestEducation.institution}`
        : 'No position or education listed';

      return (
        <InvitationCard
          key={invitation._id || index}
          profileImage={{ uri: profilePicUrl }}
          profileName={profileName}
          position={position}
          mutualConnections={`${invitation.userId.connections || 0} mutual connections`}
          timeAgo={invitation.dateAdded}
          onClose={() => handleDeclineRequest(invitation.userId._id)}
          onAccept={() => handleAcceptRequest(invitation.userId._id)}
          id={invitation.userId._id}
        />
      );
    })}
  </>
)}
</>
      )}

{suggestions.length > 0 && (
  <>
        <View style={styles.manageNetworkBox}>
          <Text style={styles.manageNetworkText}>Connection Suggestions</Text>
          <TouchableOpacity onPress={handleManageNetwork}>
            <FontAwesome name="angle-right" size={24} color="grey" style={styles.manageNetworkIcon} />
          </TouchableOpacity>
        </View>
        {suggestions.map((suggestion, index) => {
  const profilePicUrl = `${API_URL}/uploads/${suggestion.profilePic}`;
  const profileName = `${suggestion.firstName} ${suggestion.lastName}`;
  const latestJob = suggestion.workExperience?.[0];
  const latestEducation = suggestion.education?.[0];
  // Get the latest job if exists
  const position = latestJob
  ? `${latestJob.jobTitle} at ${latestJob.company}`
  : latestEducation
    ? `${latestEducation.degree} at ${latestEducation.institute}`
    : 'No position or education listed';

  return (
    <SuggestionCard
      key={suggestion._id || index}
      profileImage={{ uri: profilePicUrl }}
      profileName={profileName}
      position={position}
      mutualConnections={`${suggestion.connections || 0} mutual connections`}
      timeAgo={"Recently added"} // Static for now
      onClose={handleClose}
      onAccept={() => handleAccept(suggestion._id)}
      id={suggestion._id}
    />
  );
})}
</>
)}


{isLoading ? (
        <View>
          <SkeletonLoader  />
          <SkeletonLoader  />
          <SkeletonLoader  />
        </View>
        
      ) : (
        <>
<View style={styles.networkCardsContainer}>
  <View style={styles.networkCardsRow}>
    {pages.map((page, index) => {
      const profileImageUrl = `${API_URL}/uploads/${page.groupProfilePic}`;
      const pageImageUrl = `${API_URL}/uploads/groupProfilePics/${page.groupProfilePic}`;
      const profileName = page.name;
      const position = page.description;
      const mutualConnections = `${page.members.length} member(s)`;

      return (
        <NetworkCard
          key={page._id || index}
          backgroundImage={{uri: pageImageUrl}} // fallback image
          profileImage={{ uri: profileImageUrl }}
          profileName={profileName}
          position={position}
          mutualConnections={mutualConnections}
          onConnect={handleConnect}
        />
      );
    })}
  </View>
</View>
</>
      )}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  manageNetworkBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 5,
  },
  manageNetworkText: {
    fontSize: 16,
    color: '#333',
  },
  manageInvitationBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 5,
  },
  manageInvitationText: {
    fontSize: 16,
    color: '#333',
  },
  manageNetworkIcon: {
    marginLeft: 10,
  },
  customBox: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  profileText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#fccc79',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
  },
  networkCardsContainer: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  networkCardsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  networkCardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default Network;
