// Index.tsx
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Post from '../../components/Post';
import Header from '../../components/Header';


export default function Home() {
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
    // <ScrollView contentContainerStyle={styles.container}>
    //   <Text style={styles.title}>Home Screen</Text>
    //   {posts.map((post, index) => (
    //     <Post
    //       key={index}
    //       profileImage={post.profileImage}
    //       profileName={post.profileName}
    //       postImage={post.postImage}
    //       postText={post.postText}
    //       onLike={handleLike}
    //       onComment={handleComment}
    //       onRepost={handleRepost}
    //       onSend={handleSend}
    //     />
    //   ))}
    // </ScrollView>
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollView}>
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});