// // Header.tsx
// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
// import { FontAwesome } from '@expo/vector-icons';

// interface HeaderProps {
//   profileImage: ImageSourcePropType;
//   smallText: string;
//   onPendingPress: () => void;
//   onPostPress: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ profileImage, smallText, onPendingPress, onPostPress }) => {
//   return (
//     <View style={styles.headerContainer}>
//       <Image source={profileImage} style={styles.profileImage} />
//       <Text style={styles.smallText}>{smallText}</Text>
//       <View style={styles.rightIcons}>
//         <TouchableOpacity style={styles.pendingIcon} onPress={onPendingPress}>
//           <FontAwesome name="clock-o" size={24} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.postButton} onPress={onPostPress}>
//           <Text style={styles.postButtonText}>Post</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   smallText: {
//     flex: 1,
//     fontSize: 18,
//     color: '#000',
//   },
//   rightIcons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   pendingIcon: {
//     marginRight: 10,
//   },
//   postButton: {
//     backgroundColor: '#FF8B04',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   postButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default Header;



// Header.tsx
import React from 'react';
import { View, TextInput, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface HeaderProps {
  profileImage: any;
  smallText: string;
  onPendingPress: () => void;
  onPostPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ profileImage, smallText, onPendingPress, onPostPress }) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={profileImage} style={styles.profileImage} />
      <Text style={styles.smallText}>{smallText}</Text>
      {/* <TouchableOpacity onPress={onPendingPress} style={styles.iconButton}>
        <FontAwesome name="clock-o" size={24} color="#c7c7c7" />
      </TouchableOpacity> */}
      {/* <TouchableOpacity onPress={onPostPress} style={styles.iconButton}>
        <FontAwesome name="send" size={24} color="black" />
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.postButton} onPress={onPostPress}>
              <Text style={styles.postButtonText}>   Post   </Text>
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginRight: 10,
  },
  postButton: {
    padding: 5,
    backgroundColor: '#FF8B04',
    borderRadius: 15,
    marginLeft: 15,
  },
  postButtonText: {
    color: 'white',
    fontSize: 20,

  },
  smallText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default Header;

