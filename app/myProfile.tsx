import React, {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Post from '@/components/GroupPost';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/config';
import ChnageProfilePhotoModal from './groupcreation/Modal/ChnageProfilePhotoModal';
import ChangeCoverPhotoModal from './groupcreation/Modal/ChnageCoverPhotoModal';
import PostLoadingSkeleton from '@/components/PostLoadingSkeleton';
import ProfileLoadingSkeleton from '@/components/ProfileLoadingSkeleton';

interface PostData {
  _id: string;
  caption: string;
  images: string[];
  createdAt: string;
  likes:string[];
  shares:string[];
  comments:string[];
  userId: {
    _id: string;
    email: string;
  };
}

const MyProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);

  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          const userId = parsedUser._id;
  
          const response = await fetch(`${API_URL}/api/users/${userId}`);
          const data = await response.json();
  
          if (response.ok) {
            setUser(data); // 👈 Set user first
          } else {
            Alert.alert('Error', 'Failed to fetch user data.');
          }
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };
  
    fetchUserData();
  }, []);
  
  // 👉 Now, watch `user` and fetch posts after user is ready
  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;
  
      try {
        const response = await fetch(`${API_URL}/api/posts/user/${user._id}`);
        const result = await response.json();
  
        if (!response.ok) {
          console.error('Failed to fetch posts:', result?.message || 'Unknown error');
          return;
        }
  
        const postsArray = result.data; // 👈 correctly extract array
  
        if (!Array.isArray(postsArray)) {
          console.error('Posts data is not an array:', postsArray);
          return;
        }
  
        const postsWithUserData = postsArray.map((post) => ({
          ...post,
          profileName: `${user.firstName} ${user.lastName}`,
          profileImage: user.profilePic
            ? { uri: `${API_URL}/uploads/${user.profilePic}` }
            : { uri: 'https://www.pngarts.com/files/5/Cartoon-Avatar-PNG-Photo.png' },
          postImages: post.images.map(img => ({ uri: `${API_URL}/uploads/postImages/${img}` })),
          postDate: formatPostDate(post.createdAt),
          likeCount: post.likes ? post.likes.length : 0,
          commentCount: post.comments ? post.comments.length : 0,
          shareCount: post.shares ? post.shares.length : 0,
        }));
  
        setPosts(postsWithUserData);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, [user]);  
  

    const formatPostDate = (dateString: string) => {
      const postDate = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
    
      if (diffInSeconds < 60) {
        return 'Just added';
      }
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) {
        return `${diffInMinutes} min ago`;
      }
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) {
        return `${diffInHours} hr${diffInHours > 1 ? 's' : ''} ago`;
      }
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
      }
    
      // If more than 7 days, show full date
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      return postDate.toLocaleDateString(undefined, options); 
    };

  const profileImageSource = user?.profilePic
  ? { uri: `${API_URL}/uploads/${user.profilePic}` }
  : { uri: 'https://www.pngarts.com/files/5/Cartoon-Avatar-PNG-Photo.png' };

  const coverprofileImageSource = user?.coverPic
  ? { uri: `${API_URL}/uploads/coverPics/${user.coverPic}` }
  : { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png' };

    
    const handleLike = () => {
      console.log('Liked!');
    };
  
    const handleComment = () => {
      console.log('Commented!');
    };
  
    const handleSend = () => {
      console.log('Sent!');
    };
    const formatConnections = (connections: any) => {
      if (connections === 0) {
        return '0 connections';
      } else if (connections < 100) {
        return `${connections} connections`;
      } else if (connections >= 1000) {
        return `${Math.floor(connections / 1000) * 1000}+ connections`;
      } else {
        return `${Math.floor(connections / 100) * 100}+ connections`;
      }
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <TextInput style={styles.searchBar} placeholder="Search" />       
      </View>
      
      {loading || !user ? (  // 👈 Show skeleton if loading or user not ready
      <>
        <ProfileLoadingSkeleton />
        <PostLoadingSkeleton />
        <PostLoadingSkeleton />
        <PostLoadingSkeleton />
      </>
    ) : (
      <>
      {/* Background Image and Profile Section */}
      <View style={styles.backgroundContainer}>
        <Image source={coverprofileImageSource} style={styles.backgroundImage} />
        <TouchableOpacity style={styles.editBackgroundIcon} onPress={() => setModalVisible(true)}>
          <FontAwesome name="camera" size={20} color="black" />
        </TouchableOpacity>
        <Image source={profileImageSource} style={styles.profileImage} />
        <TouchableOpacity style={styles.addIcon} onPress={() => setModalVisible2(true)}>
          <FontAwesome name="plus-circle" size={23} color="#FF8B04" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editProfileIcon} onPress={() => router.push(`/groupcreation/AddBioScreen?id=${user?._id}`)}>
          <FontAwesome name="pencil" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Profile Information */}
      <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
      {user?.workExperience && user.workExperience.length > 0 && (
  <Text style={styles.info1}>
    {`${user.workExperience[0].jobTitle} at ${user.workExperience[0].company}`}
  </Text>
)}

{user?.education && user.education.length > 0 && (
  <Text style={styles.info1}>
    {`${user.education[0].institution} - ${user.education[0].degree}`}
  </Text>
)}
      {user?.bio && <Text style={styles.info2}>{user.bio}</Text>}
      {user?.address && <Text style={styles.info3}>{user.address}</Text>}
      <Text style={styles.info4}>{formatConnections(user?.connections)}</Text>
             {/* Manage Button */}
             <TouchableOpacity style={styles.manageButton} onPress={() => router.push(`/groupcreation/ProfileSettingsScreen?id=${user?._id}`)}>
               <Text style={styles.manageText}>Manage Profile</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.manageButton} onPress={() => router.push('/Analytics')}>
               <Text style={styles.manageText}>Analytics</Text>
             </TouchableOpacity>
     
           {/* Separator */}
           <View style={styles.separator} />
           <View style={styles.postInputContainer}>
                   <Image source={profileImageSource} style={styles.profileImage1} />
                   <TextInput style={styles.input} placeholder="Write something..." />
                   <TouchableOpacity>
                     <Ionicons name="image-outline" size={30} color="#FF8B04" />
                   </TouchableOpacity>
                 </View>
                 <View style={styles.separator} />
      <View style={styles.container1}>

      {posts.map((post, index) => (
            <Post
              key={index}
              profileImage={post.profileImage}
              profileName={post.profileName}
              postImages={post.postImages}
              postText={post.caption}
              postDate={post.postDate}
              onLike={handleLike}
              onComment={handleComment}
              onSend={handleSend}
              likesCount={post.likeCount}
              commentsCount={post.commentCount}
              sharesCount={post.shareCount}
            />
          ))}
    </View>
      <ChangeCoverPhotoModal visible={modalVisible} userId={user?._id} onClose={() => setModalVisible(false)} />
      <ChnageProfilePhotoModal visible={modalVisible2} userId={user?._id} onClose={() => setModalVisible2(false)} />
      </>
    )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  container1: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
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
    left: 95,
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
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 14,
    marginRight:10,
    backgroundColor: '#f9f9f9',
  },
  profileImage1: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default MyProfile;
