import Post from '@/components/GroupPost';
import Header from '@/components/Header';
import React, { useState } from 'react';
import {Link, router } from 'expo-router';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GroupOptionsModal from './Modal/GroupOptionsModal';

const GroupScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const handleLike = () => {
        console.log('Liked!');
      };
    
      const handleComment = () => {
        console.log('Commented!');
      };
    
      const handleRepost = () => {
        console.log('Reposted!');
      };
    
      const handleSend = () => {
        console.log('Sent!');
      };
    const posts = [
        {
          profileImage: require('../../assets/images/Profile-Picture1.jpg'),
          profileName: 'John Doe',
          postImage: require('../../assets/images/LinkedIn-Post1.jpg'),
          postText: 'Teamwork combines unique skills and perspectives, creating results greater than the sum of individual efforts. Effective teamwork drives innovation, enhances problem-solving, and boosts productivity. It builds a culture of support and accountability, where challenges are tackled together and successes are shared. True teamwork relies on communication, trust, and a shared vision, fostering an environment where everyone thrives',
        },
        {
          profileImage: require('../../assets/images/Profile-Picture2.jpg'),
          profileName: 'Jane Smith',
          postImage: require('../../assets/images/LinkedIn-Post2.jpg'),
          postText: 'Discover the latest trends and strategies in online business. Learn from industry experts, gain valuable insights, and find out how to grow your business effectively. Whether you are experienced or just starting out, this webinar offers practical tips and tools for success. Do not miss this opportunity to network and enhance your online business skills.',
        },
        {
          profileImage: require('../../assets/images/Profile-Picture3.jpg'),
          profileName: 'Alice Johnson',
          postImage: require('../../assets/images/LinkedIn-Post3.jpg'),
          postText: 'This is the content of post 3',
        },
        {
          profileImage: require('../../assets/images/Profile-Picture4.jpg'),
          profileName: 'Gary Vaynerchuk',
          postImage: require('../../assets/images/LinkedIn-Post5.jpg'),
          postText: '',
        },
        {
          profileImage: require('../../assets/images/Profile-Picture5.jpg'),
          profileName: 'Charlie Davis',
          postImage: require('../../assets/images/LinkedIn-Post4.jpg'),
          postText: 'This is the content of post 5',
        },
        {
          profileImage: require('../../assets/images/Profile-Picture1.jpg'),
          profileName: 'John Doe',
          postImage: require('../../assets/images/LinkedIn-Post1.jpg'),
          postText: 'Teamwork combines unique skills and perspectives, creating results greater than the sum of individual efforts. Effective teamwork drives innovation, enhances problem-solving, and boosts productivity. It builds a culture of support and accountability, where challenges are tackled together and successes are shared. True teamwork relies on communication, trust, and a shared vision, fostering an environment where everyone thrives',
        },
        {
          profileImage: require('../../assets/images/Profile-Picture2.jpg'),
          profileName: 'Jane Smith',
          postImage: require('../../assets/images/LinkedIn-Post2.jpg'),
          postText: 'Discover the latest trends and strategies in online business. Learn from industry experts, gain valuable insights, and find out how to grow your business effectively. Whether you are experienced or just starting out, this webinar offers practical tips and tools for success. Do not miss this opportunity to network and enhance your online business skills.',
        },
        {
          profileImage: require('../../assets/images/Profile-Picture3.jpg'),
          profileName: 'Alice Johnson',
          postImage: require('../../assets/images/LinkedIn-Post3.jpg'),
          postText: 'This is the content of post 3',
        },
        {
          profileImage: require('../../assets/images/Profile-Picture4.jpg'),
          profileName: 'Gary Vaynerchuk',
          postImage: require('../../assets/images/LinkedIn-Post5.jpg'),
          postText: '',
        },
        {
          profileImage: require('../../assets/images/Profile-Picture5.jpg'),
          profileName: 'Charlie Davis',
          postImage: require('../../assets/images/LinkedIn-Post4.jpg'),
          postText: 'This is the content of post 5',
        },
        {
          profileImage: require('../../assets/images/Profile-Picture1.jpg'),
          profileName: 'John Doe',
          postImage: require('../../assets/images/LinkedIn-Post1.jpg'),
          postText: 'Teamwork combines unique skills and perspectives, creating results greater than the sum of individual efforts. Effective teamwork drives innovation, enhances problem-solving, and boosts productivity. It builds a culture of support and accountability, where challenges are tackled together and successes are shared. True teamwork relies on communication, trust, and a shared vision, fostering an environment where everyone thrives',
        },
        {
          profileImage: require('../../assets/images/Profile-Picture2.jpg'),
          profileName: 'Jane Smith',
          postImage: require('../../assets/images/LinkedIn-Post2.jpg'),
          postText: 'Discover the latest trends and strategies in online business. Learn from industry experts, gain valuable insights, and find out how to grow your business effectively. Whether you are experienced or just starting out, this webinar offers practical tips and tools for success. Do not miss this opportunity to network and enhance your online business skills.',
        },
        {
          profileImage: require('../../assets/images/Profile-Picture3.jpg'),
          profileName: 'Alice Johnson',
          postImage: require('../../assets/images/LinkedIn-Post3.jpg'),
          postText: 'This is the content of post 3',
        },
        {
          profileImage: require('../../assets/images/Profile-Picture4.jpg'),
          profileName: 'Gary Vaynerchuk',
          postImage: require('../../assets/images/LinkedIn-Post5.jpg'),
          postText: '',
        },
        {
          profileImage: require('../../assets/images/Profile-Picture5.jpg'),
          profileName: 'Charlie Davis',
          postImage: require('../../assets/images/LinkedIn-Post4.jpg'),
          postText: 'This is the content of post 5',
        },
      ];
  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.headerTitle}>Colabify</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="share-social-outline" size={24} color="#000" style={styles.iconSpacing} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={24} color="#000" style={styles.iconSpacing} />
          </TouchableOpacity>
        </View>
      </View>
    <ScrollView contentContainerStyle={styles.scrollView}>
      {/* Group Image Section */}
      <View style={styles.groupImageContainer}>
        <Image source={require('../../assets/images/Company08.jpg')} style={styles.groupImage} />
        <TouchableOpacity style={styles.editIcon}>
          <Ionicons name="camera" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Group Details */}
      <View style={styles.groupDetails}>
      <TouchableOpacity onPress={() => router.push('/groupcreation/GroupInfoScreen')}>
        <Text style={styles.groupName}>Colabify</Text>
        <View style={styles.groupInfo}>
          <Ionicons name="earth" size={18} color="#888" />
          <Text style={styles.infoText}> Public Group · 5.3K Members</Text>
        </View>
      </TouchableOpacity>

        {/* Invite Section */}
        <View style={styles.inviteSection}>
          <Image source={require('../../assets/images/Company02.jpg')} style={styles.profileImage} />
          <TouchableOpacity style={styles.inviteButton}>
            <Ionicons name="person-add-outline" size={18} color="#fff" />
            <Text style={styles.inviteText}>Invite</Text>
          </TouchableOpacity>
        </View>

        {/* Manage Button */}
        <TouchableOpacity style={styles.manageButton} onPress={() => router.push('/groupcreation/SettingsScreen')}>
          <Text style={styles.manageText}>Manage Group</Text>
        </TouchableOpacity>
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Post Input Section */}
      <View style={styles.postInputContainer}>
        <Image source={require('../../assets/images/Company02.jpg')} style={styles.profileImage} />
        <TextInput style={styles.input} placeholder="Write something..." />
        <TouchableOpacity>
          <Ionicons name="image-outline" size={30} color="#FF8B04" />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <View style={styles.container1}>
        {/* <Text style={styles.title}>Home Screen</Text> */}
        {posts.map((post, index) => (
          <Post
            key={index}
            profileImage={post.profileImage}
            profileName={post.profileName}
            postImage={post.postImage}
            postText={post.postText}
            onLike={handleLike}
            onComment={handleComment}
            onRepost={handleRepost}
            onSend={handleSend}
          />
        ))}
    </View>
    <GroupOptionsModal visible={modalVisible} onClose={() => setModalVisible(false)} />

    </ScrollView>
    </View>
  );
};

export default GroupScreen;

const styles = StyleSheet.create({
    container1: {
        flex: 1,
      },
      scrollView: {
        flexGrow: 1,
        paddingVertical: 1,
        backgroundColor: '#f0f0f0',
      },
      title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginLeft: 15,
  },
  groupImageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  groupImage: {
    width: '100%',
    height: '100%',
  },
  editIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 20,
  },
  groupDetails: {
    padding: 15,
  },
  groupName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  inviteSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  inviteButton: {
    flexDirection: 'row',
    backgroundColor: '#FF8B04',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',  // Center text & icon
    width: '85%',  // Full width
  },
  inviteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight:500,
    marginLeft: 5,
  },
  manageButton: {
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  manageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  separator: {
    height: 2,
    backgroundColor: '#ccc',
    marginVertical: 15,
  },
  postInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
});

