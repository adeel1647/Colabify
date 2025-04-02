// import React from 'react';
// import { View, ScrollView, StyleSheet ,TouchableOpacity} from 'react-native';
// import Header from '../../components/Header';
// import InvitationCard from '../../components/InvitationCard';
// import { FontAwesome } from '@expo/vector-icons';

// const Network: React.FC = () => {
//   const invitations = [
//     {
//       profileImage: require('../../assets/images/Profile-Picture1.jpg'),
//       profileName: 'John Doe',
//       position: 'Software Engineer at Company X',
//       mutualConnections: '3 mutual connections',
//       timeAgo: 'Yesterday',
//     },
//     {
//       profileImage: require('../../assets/images/Profile-Picture1.jpg'),
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
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Header from '../../components/Header';
import InvitationCard from '../../components/InvitationCard';
import NetworkCard from '../../components/NetworkCard'; // Import the new NetworkCard component
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const Network: React.FC = () => {
  const invitations = [
    {
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'John Doe',
      position: 'Software Engineer at Company X',
      mutualConnections: '3 mutual connections',
      timeAgo: 'Yesterday',
    },
    {
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Jane Smith',
      position: 'Marketing Manager at Company Y',
      mutualConnections: '5 mutual connections',
      timeAgo: '2 days ago',
    },
    
    // Add more invitations as needed...
  ];

  const networkCards = [
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image1.jpg'),
      profileImage: require('../../assets/images/Profile-Picture1.jpg'),
      profileName: 'Alice Johnson',
      position: 'Data Scientist at Tech Corp',
      mutualConnections: 'John and 46 other mutual connections',
    },
    {
      backgroundImage: require('../../assets/images/Background-Image2.jpg'),
      profileImage: require('../../assets/images/Profile-Picture2.jpg'),
      profileName: 'Bob Williams',
      position: 'UX Designer at Creative Ltd',
      mutualConnections: 'Sarah and 30 other mutual connections',
    }
    // Add more cards as needed...
  ];

  const handleClose = () => {
    console.log('Invitation closed!');
  };

  const handleAccept = () => {
    console.log('Invitation accepted!');
  };

  const handleManageNetwork = () => {
    console.log('Manage network!');
    router.push('/myNetwork');
  };

  const handleManageInvitation = () => {
    console.log('Manage invitations!');
    router.push('/invitations');
  };

  const handleConnect = () => {
    console.log('Connect button pressed!');
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.manageInvitationBox}>
          <Text style={styles.manageInvitationText}>Invitations (119)</Text>
          <TouchableOpacity onPress={handleManageInvitation}>
            <FontAwesome name="angle-right" size={24} color="grey" style={styles.manageNetworkIcon} />
          </TouchableOpacity>
        </View>

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

        {/* <View style={styles.manageNetworkBox}>
          <Text style={styles.manageNetworkText}>Manage my network</Text>
          <TouchableOpacity onPress={handleManageNetwork}>
            <FontAwesome name="angle-right" size={24} color="grey" style={styles.manageNetworkIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.customBox}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Job search smarter</Text>
            <TouchableOpacity onPress={handleManageNetwork}>
              <FontAwesome name="close" size={24} color="grey" />
            </TouchableOpacity>
          </View>

          <Text style={styles.descriptionText}>
            See who's viewed your profile and directly message recruiters with InMail
          </Text>

          <View style={styles.profileContainer}>
            <Image source={require('../../assets/images/Profile-Picture1.jpg')} style={styles.profileImage} />
            <Image source={require('../../assets/images/Profile-Picture2.jpg')} style={styles.profileImage} />
            <Image source={require('../../assets/images/Profile-Picture3.jpg')} style={styles.profileImage} />
            <Text style={styles.profileText}>Stephon Jorge and millions of other members use Premium</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleManageNetwork}>
            <Text style={styles.buttonText}>Try Premium for LKR0</Text>
          </TouchableOpacity>

          <Text style={styles.smallText}>1-month free trial. Cancel anytime</Text>
        </View> */}

        <View style={styles.networkCardsContainer}>
          <Text style={styles.networkCardsTitle}>People you may know based on your recent activities</Text>
          <View style={styles.networkCardsRow}>
            {networkCards.map((card, index) => (
              <NetworkCard
                key={index}
                backgroundImage={card.backgroundImage}
                profileImage={card.profileImage}
                profileName={card.profileName}
                position={card.position}
                mutualConnections={card.mutualConnections}
                onConnect={handleConnect}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  manageNetworkBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 5,
  },
  manageNetworkText: {
    fontSize: 16,
    color: '#333',
  },
  manageInvitationBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 5,
  },
  manageInvitationText: {
    fontSize: 16,
    color: '#333',
  },
  manageNetworkIcon: {
    marginLeft: 10,
  },
  customBox: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  profileText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#fccc79',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
  },
  networkCardsContainer: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  networkCardsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  networkCardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default Network;































































// import React from 'react';
// import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
// import Header from '../../components/Header';
// import InvitationCard from '../../components/InvitationCard';
// import { FontAwesome } from '@expo/vector-icons';
// import { router } from 'expo-router';

// const Network: React.FC = () => {
//   const invitations = [
//     {
//       profileImage: require('../../assets/images/Profile-Picture1.jpg'),
//       profileName: 'John Doe',
//       position: 'Software Engineer at Company X',
//       mutualConnections: '3 mutual connections',
//       timeAgo: 'Yesterday',
//     },
//     {
//       profileImage: require('../../assets/images/Profile-Picture1.jpg'),
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

//   const handleManageNetwork = () => {
//     console.log('Manage network!');
//     router.push('/myNetwork');
//   };

//   const handleManageInvitation = () => {
//     console.log('Manage invitations!');
//     router.push('/invitations');
//   };

//   return (
//     <View style={styles.container}>
//       <Header />
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         <View style={styles.manageInvitationBox}>
//           <Text style={styles.manageInvitationText}>Invitations (119)</Text>
//           <TouchableOpacity onPress={handleManageInvitation}>
//             <FontAwesome name="angle-right" size={24} color="grey" style={styles.manageNetworkIcon} />
//           </TouchableOpacity>
//         </View>

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

//         <View style={styles.manageNetworkBox}>
//           <Text style={styles.manageNetworkText}>Manage my network</Text>
//           <TouchableOpacity onPress={handleManageNetwork}>
//             <FontAwesome name="angle-right" size={24} color="grey" style={styles.manageNetworkIcon} />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.customBox}>
//           <View style={styles.headerContainer}>
//             <Text style={styles.headerText}>Job search smarter</Text>
//             <TouchableOpacity onPress={handleManageNetwork}>
//               <FontAwesome name="close" size={24} color="grey" />
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.descriptionText}>
//            See who's viewed your profile and directly message recruiters with InMail
//           </Text>

//           <View style={styles.profileContainer}>
//             <Image source={require('../../assets/images/Profile-Picture1.jpg')} style={styles.profileImage} />
//             <Image source={require('../../assets/images/Profile-Picture2.jpg')} style={styles.profileImage} />
//             <Image source={require('../../assets/images/Profile-Picture3.jpg')} style={styles.profileImage} />
//             <Text style={styles.profileText}>Stephon Jorge and millions of other members use Premium</Text>
//           </View>

//           <TouchableOpacity style={styles.button} onPress={handleManageNetwork}>
//             <Text style={styles.buttonText}>Try Premium for LKR0</Text>
//           </TouchableOpacity>

//           <Text style={styles.smallText}>1-month free trail Cancel anytime</Text>
//         </View>
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
//   manageNetworkBox: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//     marginTop: 5,
//   },
//   manageNetworkText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   manageInvitationBox: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//     marginTop: 5,
//   },
//   manageInvitationText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   manageNetworkIcon: {
//     marginLeft: 10,
//   },
//   customBox: {
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//     marginVertical: 10,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   headerText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   descriptionText: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 10,
//   },
//   profileContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   profileImage: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     marginRight: 5,
//   },
//   profileText: {
//     fontSize: 11,
//     color: '#666',
//     marginLeft: 10,
//   },
//   button: {
//     backgroundColor: '#fccc79',
//     borderRadius: 10,
//     paddingVertical: 10,
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#333',
//     fontWeight: 'bold',
//   },
//   smallText: {
//     fontSize: 11,
//     color: '#999',
//     textAlign: 'center',
//   },
// });

// export default Network;









