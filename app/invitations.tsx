// import React from 'react';
// import { View, ScrollView, StyleSheet ,TouchableOpacity} from 'react-native';
// import Header from '../components/Header';
// import InvitationCard from '../components/InvitationCard';
// import { FontAwesome } from '@expo/vector-icons';

// const Network: React.FC = () => {
//   const invitations = [
//     {
//       profileImage: require('../assets/images/Profile-Picture1.jpg'),
//       profileName: 'John Doe',
//       position: 'Software Engineer at Company X',
//       mutualConnections: '3 mutual connections',
//       timeAgo: 'Yesterday',
//     },
//     {
//       profileImage: require('../assets/images/Profile-Picture1.jpg'),
//       profileName: 'Jane Smith',
//       position: 'Marketing Manager at Company Y',
//       mutualConnections: '5 mutual connections',
//       timeAgo: '2 days ago',
//     },
//     // Add more invitations as needed...
//   ];

//   const handleClose = () => {
//     console.log('Invitation closed!');
//   };

//   const handleAccept = () => {
//     console.log('Invitation accepted!');
//   };

//   return (
//     <View style={styles.container}>
//       <Header />
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         {invitations.map((invitation, index) => (
//           <InvitationCard
//             key={index}
//             profileImage={invitation.profileImage}
//             profileName={invitation.profileName}
//             position={invitation.position}
//             mutualConnections={invitation.mutualConnections}
//             timeAgo={invitation.timeAgo}
//             onClose={handleClose}
//             onAccept={handleAccept}
//           />
//         ))}
//       </ScrollView>
//     </View>
    
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//     paddingTop: 1,
//   },
//   scrollView: {
//     flexGrow: 1,
//     paddingVertical: 10,
//   },
// });

// export default Network;


import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import InvitationCard from '../components/InvitationCard';
import Header from '../components/Header';

const Invitations: React.FC = () => {
  const invitations = [
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'John Doe',
      position: 'Software Engineer at Company X',
      mutualConnections: '3 mutual connections',
      timeAgo: 'Yesterday',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'Jane Smith',
      position: 'Marketing Manager at Company Y',
      mutualConnections: '5 mutual connections',
      timeAgo: '2 days ago',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'John Doe',
      position: 'Software Engineer at Company X',
      mutualConnections: '3 mutual connections',
      timeAgo: 'Yesterday',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'Jane Smith',
      position: 'Marketing Manager at Company Y',
      mutualConnections: '5 mutual connections',
      timeAgo: '2 days ago',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'John Doe',
      position: 'Software Engineer at Company X',
      mutualConnections: '3 mutual connections',
      timeAgo: 'Yesterday',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'Jane Smith',
      position: 'Marketing Manager at Company Y',
      mutualConnections: '5 mutual connections',
      timeAgo: '2 days ago',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'John Doe',
      position: 'Software Engineer at Company X',
      mutualConnections: '3 mutual connections',
      timeAgo: 'Yesterday',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'Jane Smith',
      position: 'Marketing Manager at Company Y',
      mutualConnections: '5 mutual connections',
      timeAgo: '2 days ago',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'John Doe',
      position: 'Software Engineer at Company X',
      mutualConnections: '3 mutual connections',
      timeAgo: 'Yesterday',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'Jane Smith',
      position: 'Marketing Manager at Company Y',
      mutualConnections: '5 mutual connections',
      timeAgo: '2 days ago',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'John Doe',
      position: 'Software Engineer at Company X',
      mutualConnections: '3 mutual connections',
      timeAgo: 'Yesterday',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'Jane Smith',
      position: 'Marketing Manager at Company Y',
      mutualConnections: '5 mutual connections',
      timeAgo: '2 days ago',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'John Doe',
      position: 'Software Engineer at Company X',
      mutualConnections: '3 mutual connections',
      timeAgo: 'Yesterday',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'Jane Smith',
      position: 'Marketing Manager at Company Y',
      mutualConnections: '5 mutual connections',
      timeAgo: '2 days ago',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'John Doe',
      position: 'Software Engineer at Company X',
      mutualConnections: '3 mutual connections',
      timeAgo: 'Yesterday',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'Jane Smith',
      position: 'Marketing Manager at Company Y',
      mutualConnections: '5 mutual connections',
      timeAgo: '2 days ago',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'John Doe',
      position: 'Software Engineer at Company X',
      mutualConnections: '3 mutual connections',
      timeAgo: 'Yesterday',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'Jane Smith',
      position: 'Marketing Manager at Company Y',
      mutualConnections: '5 mutual connections',
      timeAgo: '2 days ago',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'John Doe',
      position: 'Software Engineer at Company X',
      mutualConnections: '3 mutual connections',
      timeAgo: 'Yesterday',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'Jane Smith',
      position: 'Marketing Manager at Company Y',
      mutualConnections: '5 mutual connections',
      timeAgo: '2 days ago',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'John Doe',
      position: 'Software Engineer at Company X',
      mutualConnections: '3 mutual connections',
      timeAgo: 'Yesterday',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'Jane Smith',
      position: 'Marketing Manager at Company Y',
      mutualConnections: '5 mutual connections',
      timeAgo: '2 days ago',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'John Doe',
      position: 'Software Engineer at Company X',
      mutualConnections: '3 mutual connections',
      timeAgo: 'Yesterday',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'Jane Smith',
      position: 'Marketing Manager at Company Y',
      mutualConnections: '5 mutual connections',
      timeAgo: '2 days ago',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'John Doe',
      position: 'Software Engineer at Company X',
      mutualConnections: '3 mutual connections',
      timeAgo: 'Yesterday',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'Jane Smith',
      position: 'Marketing Manager at Company Y',
      mutualConnections: '5 mutual connections',
      timeAgo: '2 days ago',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'John Doe',
      position: 'Software Engineer at Company X',
      mutualConnections: '3 mutual connections',
      timeAgo: 'Yesterday',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'Jane Smith',
      position: 'Marketing Manager at Company Y',
      mutualConnections: '5 mutual connections',
      timeAgo: '2 days ago',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'John Doe',
      position: 'Software Engineer at Company X',
      mutualConnections: '3 mutual connections',
      timeAgo: 'Yesterday',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'Jane Smith',
      position: 'Marketing Manager at Company Y',
      mutualConnections: '5 mutual connections',
      timeAgo: '2 days ago',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'John Doe',
      position: 'Software Engineer at Company X',
      mutualConnections: '3 mutual connections',
      timeAgo: 'Yesterday',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'Jane Smith',
      position: 'Marketing Manager at Company Y',
      mutualConnections: '5 mutual connections',
      timeAgo: '2 days ago',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'John Doe',
      position: 'Software Engineer at Company X',
      mutualConnections: '3 mutual connections',
      timeAgo: 'Yesterday',
    },
    {
      profileImage: require('../assets/images/Profile-Picture2.jpg'),
      profileName: 'Jane Smith',
      position: 'Marketing Manager at Company Y',
      mutualConnections: '5 mutual connections',
      timeAgo: '2 days ago',
    },
    // Add more invitations as needed...
  ];

  const handleClose = () => {
    console.log('Invitation closed!');
  };

  const handleAccept = () => {
    console.log('Invitation accepted!');
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {invitations.map((invitation, index) => (
          <InvitationCard
            key={index}
            profileImage={invitation.profileImage}
            profileName={invitation.profileName}
            position={invitation.position}
            mutualConnections={invitation.mutualConnections}
            timeAgo={invitation.timeAgo}
            onClose={handleClose}
            onAccept={handleAccept}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    // paddingTop: -90,
    marginTop:-27,
  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: 10,
  },
});

export default Invitations;

