import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import GroupOptionsModal from './groupcreation/Modal/GroupOptionsModal';
import ChangeCoverPhotoModal from './groupcreation/Modal/ChnageCoverPhotoModal';
import Post from '@/components/GroupPost';

const MyProfile: React.FC = () => {
  const router = useRouter();
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
        profileImage: require('../assets/images/my-profile-image.jpg'),
        profileName: 'John Doe',
        postImage: require('../assets/images/LinkedIn-Post1.jpg'),
        postText: 'Teamwork combines unique skills and perspectives, creating results greater than the sum of individual efforts. Effective teamwork drives innovation, enhances problem-solving, and boosts productivity. It builds a culture of support and accountability, where challenges are tackled together and successes are shared. True teamwork relies on communication, trust, and a shared vision, fostering an environment where everyone thrives',
      },
      {
        profileImage: require('../assets/images/my-profile-image.jpg'),
        profileName: 'Jane Smith',
        postImage: require('../assets/images/LinkedIn-Post2.jpg'),
        postText: 'Discover the latest trends and strategies in online business. Learn from industry experts, gain valuable insights, and find out how to grow your business effectively. Whether you are experienced or just starting out, this webinar offers practical tips and tools for success. Do not miss this opportunity to network and enhance your online business skills.',
      },
      {
        profileImage: require('../assets/images/my-profile-image.jpg'),
        profileName: 'Alice Johnson',
        postImage: require('../assets/images/LinkedIn-Post3.jpg'),
        postText: 'This is the content of post 3',
      },
      {
        profileImage: require('../assets/images/my-profile-image.jpg'),
        profileName: 'Gary Vaynerchuk',
        postImage: require('../assets/images/LinkedIn-Post5.jpg'),
        postText: '',
      },
      {
        profileImage: require('../assets/images/my-profile-image.jpg'),
        profileName: 'Charlie Davis',
        postImage: require('../assets/images/LinkedIn-Post4.jpg'),
        postText: 'This is the content of post 5',
      },
      {
        profileImage: require('../assets/images/my-profile-image.jpg'),
        profileName: 'John Doe',
        postImage: require('../assets/images/LinkedIn-Post1.jpg'),
        postText: 'Teamwork combines unique skills and perspectives, creating results greater than the sum of individual efforts. Effective teamwork drives innovation, enhances problem-solving, and boosts productivity. It builds a culture of support and accountability, where challenges are tackled together and successes are shared. True teamwork relies on communication, trust, and a shared vision, fostering an environment where everyone thrives',
      },
      
    ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <TextInput style={styles.searchBar} placeholder="Search" />       
      </View>

      {/* Background Image and Profile Section */}
      <View style={styles.backgroundContainer}>
        <Image source={require('../assets/images/my-profile-bi.png')} style={styles.backgroundImage} />
        <TouchableOpacity style={styles.editBackgroundIcon} onPress={() => setModalVisible(true)}>
          <FontAwesome name="camera" size={20} color="black" />
        </TouchableOpacity>
        <Image source={require('../assets/images/my-profile-image.jpg')} style={styles.profileImage} />
        <TouchableOpacity style={styles.addIcon} onPress={() => setModalVisible(true)}>
          <FontAwesome name="plus-circle" size={23} color="#FF8B04" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editProfileIcon} onPress={() => router.push('/groupcreation/AddBioScreen')}>
          <FontAwesome name="pencil" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Profile Information */}
      <Text style={styles.name}>Parami Ashinsana</Text>
      <Text style={styles.info1}>Student at Institute of Software Engineering (IJSE)</Text>
      <Text style={styles.info2}>IJSE-Institute of Software Engineering ▪️ IJSE-Institute of Software Engineering </Text>
      <Text style={styles.info3}>Kaluthara District, Western Province, Sri Lanka</Text>
      <Text style={styles.info4}>3000+ connections</Text>
             {/* Manage Button */}
             <TouchableOpacity style={styles.manageButton} onPress={() => router.push('/groupcreation/ProfileSettingsScreen')}>
               <Text style={styles.manageText}>Manage Profile</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.manageButton} onPress={() => router.push('/Analytics')}>
               <Text style={styles.manageText}>Analytics</Text>
             </TouchableOpacity>
     
           {/* Separator */}
           <View style={styles.separator} />
           <View style={styles.postInputContainer}>
                   <Image source={require('../assets/images/my-profile-image.jpg')} style={styles.profileImage1} />
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
      <ChangeCoverPhotoModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    marginTop: 13,
  },
  container1: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  backgroundContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  backgroundImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  editBackgroundIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    position: 'absolute',
    bottom: -40,
    left: 10,
    borderWidth: 3,
    borderColor: '#fff',
  },
  addIcon: {
    position: 'absolute',
    bottom: -35,
    left: 90,
  },
  editProfileIcon: {
    position: 'absolute',
    bottom: -40,
    right: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'left',
  },
  info1: {
    textAlign: 'left',
    color: '#262626',
    marginBottom: 5,
    fontSize: 15,
  },
  info2: {
    fontSize: 13,
    textAlign: 'left',
    color: '#404040',
    marginBottom: 5,
  },
  info3: {
    fontSize: 12,
    textAlign: 'left',
    color: '#666',
    marginBottom: 5,
  },
  info4: {
    textAlign: 'left',
    color: '#FF8B04',
    marginBottom: 5,
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
  profileImage1: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default MyProfile;
