import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import Post from '../../components/Post';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/config';
import PostLoadingSkeleton from '@/components/PostLoadingSkeleton';

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

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        console.log("userID",parsedUser._id);
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
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
  if (!user || !user._id) {
    console.error("User is not logged in or user._id is missing");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/posts/`);
    const postsData: PostData[] = await response.json();

    const postsWithUserData = await Promise.all(
      postsData.map(async (post) => {
        const userResponse = await fetch(`${API_URL}/api/users/${post.userId._id}`);
        const userData: UserData = await userResponse.json();

        const isLiked = post.likes?.includes(user._id); // ✅ safe now

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
          postId: post._id,
          isLikedByUser: isLiked,
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
  if (user) {
    fetchPosts();
  }
}, [user]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLike = async (postId: string) => {
  if (!user || !user._id) {
    console.error('User not logged in');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/posts/${postId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: user._id }),
    });

    const result = await response.json();
    console.log(result.message); // 'Post liked' or 'Post unliked'

    // Optionally re-fetch posts to update the UI
    fetchPosts();
  } catch (error) {
    console.error('Failed to toggle like:', error);
  }
};


  const handleComment = () => {
    console.log('Commented!');
  };
  
  const handleSend = () => {
    console.log('Sent!');
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {loading ? (
          <>
            <PostLoadingSkeleton />
            <PostLoadingSkeleton />
            <PostLoadingSkeleton />
          </>
        ) : (
          posts.map((post, index) => (
            <Post
              key={index}
              postId={post._id}
              profileImage={post.profileImage}
              profileName={post.profileName}
              postImages={post.postImages}
              postText={post.caption}
              postDate={post.postDate}
              onLike={() => handleLike(post._id)} 
              onComment={handleComment}
              onSend={handleSend}
              likesCount={post.likeCount}
              commentsCount={post.commentCount}
              sharesCount={post.shareCount}
              isLiked={post.isLikedByUser}

            />
          ))
        )}
      </ScrollView>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: 1,
    backgroundColor: '#f0f0f0',
  },
});
