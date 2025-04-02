import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../../components/Header';

const NotificationPage: React.FC = () => {
  const notifications = [
    {
      profileImage: require('../../assets/images/google-48.png'),
      description: 'Sundar Pichai has endorsed your skills in "Machine Learning" and "Data Science". He mentioned that your recent project on predictive analytics was impressive.',
      time: '2h',
    },
    {
      profileImage: require('../../assets/images/img1.jpg'),
      description: 'Satya Nadella liked your recent post about the impact of AI on cloud computing. He commented that your insights into Azure s new features were spot-on.',
      time: '5h',
    },
    {
      profileImage: require('../../assets/images/microsoft.png'),
      description: 'Satya Nadella liked your recent post about the impact of AI on cloud computing. He commented that your insights into Azure s new features were spot-on.',
      time: '5h',
    },
    {
      profileImage: require('../../assets/images/Profile-Picture5.jpg'),
      description: 'Tim Cook commented on your article about the future of augmented reality in consumer technology. He mentioned that your analysis on Apples ARKit advancements was quite insightful.',
      time: '8h',
    },
    {
      profileImage: require('../../assets/images/img6.jpg'),
      description: 'Tim Cook commented on your article about the future of augmented reality in consumer technology. He mentioned that your analysis on Apples ARKit advancements was quite insightful.',
      time: '8h',
    },
    {
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      description: 'Charlie Green shared your post.',
      time: '3d',
    },
    {
      profileImage: require('../../assets/images/Profile-Picture3.jpg'),
      description: 'Arvind Krishna sent you a connection request with a note saying he was impressed by your work on quantum computing. He is interested in discussing potential collaborations in AI and quantum technologies',
      time: '1d',
    },
    {
      profileImage: require('../../assets/images/microsoft.png'),
      description: 'Satya Nadella liked your recent post about the impact of AI on cloud computing. He commented that your insights into Azure s new features were spot-on.',
      time: '5h',
    },
    {
      profileImage: require('../../assets/images/img4.jpg'),
      description: 'Tim Cook commented on your article about the future of augmented reality in consumer technology. He mentioned that your analysis on Apples ARKit advancements was quite insightful.',
      time: '8h',
    },
    {
      profileImage: require('../../assets/images/ibm.png'),
      description: 'Bob Brown started following you.',
      time: '1d',
    },
    {
      profileImage: require('../../assets/images/img3.jpg'),
      description: 'Satya Nadella liked your recent post about the impact of AI on cloud computing. He commented that your insights into Azure s new features were spot-on.',
      time: '5h',
    },
    {
      profileImage: require('../../assets/images/img2.jpg'),
      description: 'Tim Cook commented on your article about the future of augmented reality in consumer technology. He mentioned that your analysis on Apples ARKit advancements was quite insightful.',
      time: '8h',
    },
    {
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      description: 'Charlie Green shared your post.',
      time: '3d',
    },
    {
      profileImage: require('../../assets/images/img1.jpg'),
      description: 'Arvind Krishna sent you a connection request with a note saying he was impressed by your work on quantum computing. He is interested in discussing potential collaborations in AI and quantum technologies',
      time: '1d',
    },
    {
      profileImage: require('../../assets/images/amazon.png'),
      description: 'Jeff Bezos shared your post on the latest trends in e-commerce and how AI is revolutionizing online shopping experiences. He highlighted your perspective on Amazons approach to customer personalization.',
      time: '3d',
    },
    {
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      description: 'Satya Nadella liked your recent post about the impact of AI on cloud computing. He commented that your insights into Azure s new features were spot-on.',
      time: '5h',
    },
    {
      profileImage: require('../../assets/images/img6.jpg'),
      description: 'Tim Cook commented on your article about the future of augmented reality in consumer technology. He mentioned that your analysis on Apples ARKit advancements was quite insightful.',
      time: '8h',
    },
    {
      profileImage: require('../../assets/images/ibm.png'),
      description: 'Bob Brown started following you.',
      time: '1d',
    },
    {
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      description: 'Charlie Green shared your post.',
      time: '3d',
    },
    {
      profileImage: require('../../assets/images/microsoft.png'),
      description: 'Satya Nadella liked your recent post about the impact of AI on cloud computing. He commented that your insights into Azure s new features were spot-on.',
      time: '5h',
    },
    {
      profileImage: require('../../assets/images/Profile-Picture5.jpg'),
      description: 'Tim Cook commented on your article about the future of augmented reality in consumer technology. He mentioned that your analysis on Apples ARKit advancements was quite insightful.',
      time: '8h',
    },
  ];

  return (

    <View style={styles.container}>

      <Header />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {notifications.map((notification, index) => (
          <View key={index} style={styles.notificationContainer}>
            <Image source={notification.profileImage} style={styles.profileImage} />
            <View style={styles.notificationContent}>
              <Text style={styles.notificationDescription}>{notification.description}</Text>

            </View>
            <TouchableOpacity>
              <Text style={styles.notificationTime}>{notification.time}</Text>
              <FontAwesome name="ellipsis-v" size={20} color="grey" style={styles.ellipsisIcon} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollView: {
    padding: 10,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 1,
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#333',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  ellipsisIcon: {
    marginLeft: 4,
    marginTop:3,
  },
});

export default NotificationPage;
