import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Modal, View, Image, TouchableOpacity, Dimensions, FlatList, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/config';

interface PostProps {
  profileImage: any;
  profileName: string;
  postImages: any[];  // ➡️ changed from single postImage to multiple
  postText: string;
  postDate: string;
  onLike: (postId: string) => void;
  onComment: () => void;
  onSend: (postText: string) => void;
  likesCount: number;
  commentsCount: number;
  postId: string;
  isLiked: boolean;
  comments: Comment[];
  sharesCount: number;
}
type Comment = {
  commentId: string;
  text: string;
  userId: string;
  userName: string;
  userProfileImage: { uri: string };
  createdAt: string;
};


const { width } = Dimensions.get('window');

const Post: React.FC<PostProps> = ({
  profileImage,
  profileName,
  isLiked,
  postImages,
  postText,
  postDate,
  postId,
  onLike,
  onComment,
  onSend,
  likesCount,
  commentsCount,
  sharesCount,
  comments: commentsProp,
}) => {
  const [showFullText, setShowFullText] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
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

  const handleLikePress = async () => {
    setLikeLoading(true);
    await onLike(postId);
    setLikeLoading(false);
  };


  const toggleText = () => {
    setShowFullText(!showFullText);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [sendingComment, setSendingComment] = useState(false);
const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    setComments(commentsProp || []);
  }, [commentsProp]);
  const sendComment = async () => {
  if (!commentText.trim()) return;

  try {
    const response = await fetch(`${API_URL}/api/posts/${postId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add auth token here if needed
      },
      body: JSON.stringify({
        userId: user._id,
        text: commentText.trim(),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Assuming post.comments is updated on backend and returned in `data.post.comments`
      setComments(data.post.comments.map((c: any) => c.text)); // extract texts only for display
      setCommentText('');
    } else {
      alert(data.message || 'Failed to add comment');
    }
  } catch (error) {
    console.error('Error posting comment:', error);
    alert('Error posting comment');
  }
  finally {
    setSendingComment(false);
  }
};



  const renderImages = () => {
    const imagesToShow = postImages.slice(0, 4);
  
    if (postImages.length === 1) {
      return (
        <Image source={imagesToShow[0]} style={styles.singleImage} />
      );
    } else if (postImages.length === 2) {
      return (
        <View style={styles.row}>
          {imagesToShow.map((img, index) => (
            <Image key={index} source={img} style={styles.halfImage} />
          ))}
        </View>
      );
    } else if (postImages.length === 3) {
      return (
        <View style={styles.column}>
          <View style={styles.row}>
            <Image source={imagesToShow[0]} style={styles.halfImage} />
            <Image source={imagesToShow[1]} style={styles.halfImage} />
          </View>
          <Image source={imagesToShow[2]} style={styles.fullImageBelow} />
        </View>
      );
    } else {
      return (
        <View style={styles.column}>
          <View style={styles.row}>
            <Image source={imagesToShow[0]} style={styles.halfImage} />
            <Image source={imagesToShow[1]} style={styles.halfImage} />
          </View>
          <View style={styles.row}>
            <Image source={imagesToShow[2]} style={styles.halfImage} />
            <View style={{ position: 'relative' }}>
              <Image source={imagesToShow[3]} style={styles.halfImage} />
              {postImages.length > 4 && (
                <View style={styles.overlay}>
                  <Text style={styles.overlayText}>+{postImages.length - 4}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      );
    }
  };  

  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={profileImage} style={styles.profileImage} />
        <View style={styles.headerText}>
          <Text style={styles.profileName}>{profileName}</Text>
          <Text style={styles.postDate}>{postDate}</Text>
        </View>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>+ Follow</Text>
        </TouchableOpacity>
      </View>

      <Text
        style={styles.postText}
        numberOfLines={showFullText ? undefined : 4}
        ellipsizeMode="tail"
      >
        {postText}
      </Text>

      {postText.length > 100 && (
        <TouchableOpacity onPress={toggleText}>
          <Text style={styles.showMoreText}>
            {showFullText ? 'Show Less' : 'Show More'}
          </Text>
        </TouchableOpacity>
      )}

{postImages.length > 0 && renderImages()}

      <View style={styles.separator} />

      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={handleLikePress} style={styles.iconButton} disabled={likeLoading}>
  {likeLoading ? (
    <ActivityIndicator size="small" color="grey" />
  ) : (
    <>
      <FontAwesome name="thumbs-up" size={21} color={isLiked ? '#FF8B04' : 'grey'} />
      <Text style={styles.iconLabel}>Like ({likesCount})</Text>
    </>
  )}
</TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconButton}>
  <FontAwesome name="comment" size={21} color="grey" />
  <Text style={styles.iconLabel}>Comment ({commentsCount})</Text>
</TouchableOpacity>


        <TouchableOpacity onPress={onSend} style={styles.iconButton}>
          <FontAwesome name="send" size={21} color="grey" />
          <Text style={styles.iconLabel}>Share </Text>
        </TouchableOpacity>

<Modal
  visible={modalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <ScrollView>
        {/* Post header inside modal */}
        <View style={styles.header}>
          <Image source={profileImage} style={styles.profileImage} />
          <View style={styles.headerText}>
            <Text style={styles.profileName}>{profileName}</Text>
            <Text style={styles.postDate}>{postDate}</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={{ fontSize: 18 }}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Post text */}
        <Text style={styles.postText}>{postText}</Text>

        {/* Post images */}
        {postImages.length > 0 && renderImages()}

        {/* Comments section */}
     <View style={{ marginTop: 15 }}>
  <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Comments:</Text>
 {commentsProp.map(comment => (
  <View key={comment.commentId} style={styles.commentContainer}>
    <Image source={comment.userProfileImage} style={{ width: 24, height: 24, borderRadius: 12, marginRight: 10 }} />
    <View>
      <Text style={{ fontWeight: 'bold' }}>{comment.userName}</Text>
      <Text>{comment.text}</Text>
    </View>
  </View>
))}

</View>


      </ScrollView>

      {/* Add comment input */}
      <View style={styles.commentInputContainer}>
        <TextInput
          placeholder="Write a comment..."
          value={commentText}
          onChangeText={setCommentText}
          style={styles.commentInput}
        />
      <TouchableOpacity
  onPress={sendComment}
  style={styles.sendCommentButton}
  disabled={sendingComment}
>
  {sendingComment ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : (
    <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
  )}
</TouchableOpacity>


      </View>
    </View>
  </View>
</Modal>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    width: width - 20,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  profileName: {
    fontSize: 15,
    fontWeight: '500',
  },
  postDate: {
    fontSize: 11,
    color: 'grey',
    marginTop: 2,
  },
  followButton: {
    padding: 5,
    backgroundColor: '#FF8B04',
    borderRadius: 5,
  },
  followButtonText: {
    color: '#fff',
  },
  postText: {
    fontSize: 13,
    marginBottom: 5,
  },
  showMoreText: {
    fontSize: 13,
    color: '#FF8B04',
    marginBottom: 10,
  },
  singleImage: {
    width: '100%',
    height: width - 40,
    borderRadius: 10,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  column: {
    marginTop: 10,
  },
  halfImage: {
    width: (width - 30) / 2.1,
    height: (width - 30) / 2.1,
    borderRadius: 10,
    marginRight: 5,
  },
  fullImageBelow: {
    width: '100%',
    height: (width - 30) / 2,
    borderRadius: 10,
    marginTop: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  gridItem: {
    width: (width - 30) / 2,
    height: (width - 30) / 2,
    margin: 2,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  overlayText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconButton: {
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    maxHeight: '80%',
    padding: 15,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  sendCommentButton: {
    backgroundColor: '#FF8B04',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  commentText: {
    fontSize: 14,
    marginBottom: 5,
  },
  commentContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 8,
},

});

export default Post;
