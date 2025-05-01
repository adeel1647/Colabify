import Post from '@/components/GroupPost';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import GroupOptionsModal from './Modal/GroupOptionsModal';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { API_URL } from '@/config';
import GroupSkeletonLoader from '@/components/GroupSkeletonLoader';
import ChnageGroupCoverPhotoModal from './Modal/ChnageGroupCoverPhotoModal';

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
interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  profilePic: string;
}
const GroupScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const { groupId } = useLocalSearchParams(); 
    const [groupData, setGroupData] = useState<any>(null);
    const [user, setUser] = useState<any>(null);

    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchGroupData = async () => {
        try {
          const response = await fetch(`${API_URL}/api/pages/${groupId}`);
          const data = await response.json();
          if (data.success) {
            setGroupData(data.page);
          } else {
            console.log('Page not found');
          }
        } catch (error) {
          console.error('Error fetching group data:', error);
        }
      };
    
      if (groupId) {
        fetchGroupData();
      }
    }, [groupId]);

    const formatNumber = (num: number): string => {
      if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
      if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
      return num.toString();
    };
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
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/groupPosts/page/${groupId}`);
        const json = await response.json();
    
        if (!json.success || !Array.isArray(json.data)) {
          throw new Error('Invalid data format from API');
        }
    
        const postsData: PostData[] = json.data;
    
        const postsWithUserData = await Promise.all(
          postsData.map(async (post) => {
            const userResponse = await fetch(`${API_URL}/api/users/${post.userId}`);
            const userData: UserData = await userResponse.json();
    
            return {
              ...post,
              profileName: `${userData.firstName} ${userData.lastName}`,
              profileImage: userData.profilePic
                ? { uri: `${API_URL}/uploads/${userData.profilePic}` }
                : { uri: 'https://www.pngarts.com/files/5/Cartoon-Avatar-PNG-Photo.png' },
              postImages: post.images.map(img => ({ uri: `${API_URL}/uploads/postImages/${img}` })),
              postDate: formatPostDate(post.createdAt),
              likeCount: post.likes?.length || 0,
              commentCount: post.comments?.length || 0,
              shareCount: post.shares?.length || 0,
            };
          })
        );
    
        setPosts(postsWithUserData);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    useEffect(() => {
        fetchPosts();
      }, []);
    
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
      const coverImageSource = groupData?.groupCoverImage
      ? { uri: `${API_URL}/uploads/groupCoverPics/${groupData.groupCoverImage}` }
      : { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqrHGTJmmEhKGi4hX0cvzXTrK_x2mO257ST0jsmyuvjpUEvH7Ctt0BIB6xJpIb603rdEo&usqp=CAU' };

      const profileImageSource = groupData?.groupProfilePic
          ? { uri: `${API_URL}/uploads/groupProfilePics/${groupData.groupProfilePic}` }
          : { uri: 'https://www.pngarts.com/files/5/Cartoon-Avatar-PNG-Photo.png' };
          
        
  return (
    <>
     {(!groupData) ? (
      <GroupSkeletonLoader />
    ) : (    
    <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.headerTitle}>{groupData?.name}</Text>
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
      <Image
  source={coverImageSource}
  style={styles.groupImage}
/>
        <TouchableOpacity style={styles.editIcon} onPress={() => setModalVisible2(true)}>
          <Ionicons name="camera" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Group Details */}
      <View style={styles.groupDetails}>
      <TouchableOpacity onPress={() => router.push('/groupcreation/GroupInfoScreen')}>
        <Text style={styles.groupName}>{groupData.name}</Text>
        <View style={styles.groupInfo}>
          <Ionicons name="earth" size={18} color="#888" />
          <Text style={styles.infoText}> {groupData.privacy} Group · {formatNumber(groupData.members.length)} Members</Text>
        </View>
      </TouchableOpacity>

        {/* Invite Section */}
        <View style={styles.inviteSection}>
        <Image
  source={profileImageSource}
  style={styles.profileImage}
/>
          <TouchableOpacity style={styles.inviteButton}>
            <Ionicons name="person-add-outline" size={18} color="#fff" />
            <Text style={styles.inviteText}>Invite</Text>
          </TouchableOpacity>
        </View>

        {/* Manage Button */}
        <TouchableOpacity style={styles.manageButton} onPress={() => router.push({ pathname: '/groupcreation/SettingsScreen', params: { groupId } })}> 
          <Text style={styles.manageText}>Manage Group</Text>
        </TouchableOpacity>
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Post Input Section */}
      <View style={styles.postInputContainer}>
      <Image
  source={profileImageSource}
  style={styles.profileImage}
/>
        <TextInput style={styles.input} placeholder="Write something..." />
        <TouchableOpacity onPress={() => router.push({ pathname: '/groupcreation/PostScreen', params: { groupId } })}>
          <Ionicons name="image-outline" size={30} color="#FF8B04" />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <View style={styles.container1}>
  {posts.length === 0 ? (
    <Image
      source={{ uri: 'https://img.republicworld.com/rimages/1kutzil5lj0nvfsf_1596544016_16_9.jpeg' }}
      style={styles.noPostsImage}
      resizeMode="contain"
    />
  ) : (
    posts.map((post, index) => (
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
    ))
  )}
</View>

    <GroupOptionsModal visible={modalVisible} onClose={() => setModalVisible(false)} />

    </ScrollView>

    </View>
)}
    <ChnageGroupCoverPhotoModal visible={modalVisible2} userId={groupId} onClose={() => setModalVisible2(false)} />
  </>

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
  noPostsImage: {
    width: '100%',
    height: 250,
    marginTop: 50,
    alignSelf: 'center',
  }
  
});

