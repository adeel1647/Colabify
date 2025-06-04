// Post.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

interface PostProps {
  profileImage: any;
  profileName: string;
  postImages: any[];
  postText: string;
  postDate: string;
  postId: string;
  onLike: (postId: string) => void;
  onComment: () => void;
  onSend: () => void;
  onBoost: (postId: string) => void;
  likesCount: number;
  isLiked: boolean;
  commentsCount: number;
  sharesCount: number;
}

const { width } = Dimensions.get('window');

const Post: React.FC<PostProps> = ({
  profileImage,
  profileName,
  postImages,
  isLiked,
  postText,
  postDate,
  postId,
  onLike,
  onComment,
  onSend,
  onBoost,
  likesCount,
  commentsCount,
  sharesCount,
}) => {
  const [showFullText, setShowFullText] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const navigation = useNavigation();

  const toggleText = () => {
    setShowFullText(!showFullText);
  };
  const handleLikePress = async () => {
    setLikeLoading(true);
    await onLike(postId);
    setLikeLoading(false);
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
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Image source={profileImage} style={styles.profileImage} />
    <View style={styles.headerText}>
      <Text style={styles.profileName}>{profileName}</Text>
      <Text style={styles.postDate}>{postDate}</Text>
    </View>
  </View>

 <TouchableOpacity
  style={styles.boostButton}
  onPress={() => onBoost(postId)}
>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <FontAwesome5 name="rocket" size={14} color="white" style={{ marginRight: 6 }} />
    <Text style={styles.boostButtonText}>Boost</Text>
  </View>
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
      
              <TouchableOpacity onPress={onComment} style={styles.iconButton}>
                <FontAwesome name="comment" size={21} color="grey" />
                <Text style={styles.iconLabel}>Comment ({commentsCount})</Text> 
              </TouchableOpacity>
      
              <TouchableOpacity onPress={onSend} style={styles.iconButton}>
                <FontAwesome name="send" size={21} color="grey" />
                <Text style={styles.iconLabel}>Share ({sharesCount})</Text> 
              </TouchableOpacity>
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
  justifyContent: 'space-between',
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
    justifyContent: 'center',
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
  boostButton: {
  backgroundColor: '#FF8B04',
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 16,
},

boostButtonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 15,
},
});

export default Post;
