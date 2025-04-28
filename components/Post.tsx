import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

interface PostProps {
  profileImage: any;
  profileName: string;
  postImage: any;
  postText: string;
  postDate: string;
  onLike: () => void;
  onComment: () => void;
  onSend: () => void;
  likesCount: number;    // ➡️ new
  commentsCount: number; // ➡️ new
  sharesCount: number;   // ➡️ new
}


const { width } = Dimensions.get('window');

const Post: React.FC<PostProps> = ({
  profileImage,
  profileName,
  postImage,
  postText,
  postDate,
  onLike,
  onComment,
  onSend,
  likesCount,
  commentsCount,
  sharesCount,
}) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
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

      <Image source={postImage} style={styles.postImage} />
      <View style={styles.separator} />

      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={onLike} style={styles.iconButton}>
          <FontAwesome name="thumbs-up" size={21} color="grey" />
          <Text style={styles.iconLabel}>Like ({likesCount})</Text>
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
  postImage: {
    width: '100%',
    height: width - 40,
    borderRadius: 10,
    marginBottom: 10,
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
});

export default Post;