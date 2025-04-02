import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const MyNetwork: React.FC = () => {
  const handleManageNetwork = () => {
    console.log('Manage network!');
    // router.push('/invitations');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.manageNetworkBox}>
          <Text style={styles.manageNetworkText}>Connections</Text>
          <TouchableOpacity onPress={handleManageNetwork}>
            <FontAwesome name="houzz" size={24} color="grey" style={styles.manageNetworkIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.manageNetworkBox}>
          <Text style={styles.manageNetworkText}>People I follow</Text>
          <TouchableOpacity onPress={handleManageNetwork}>
            <FontAwesome name="male" size={24} color="grey" style={styles.manageNetworkIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.manageNetworkBox}>
          <Text style={styles.manageNetworkText}>Pages</Text>
          <TouchableOpacity onPress={handleManageNetwork}>
            <FontAwesome name="podcast" size={24} color="grey" style={styles.manageNetworkIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.manageNetworkBox}>
          <Text style={styles.manageNetworkText}>Newsletters</Text>
          <TouchableOpacity onPress={handleManageNetwork}>
            <FontAwesome name="language" size={24} color="grey" style={styles.manageNetworkIcon} />
          </TouchableOpacity>
        </View>

        {/* <View style={styles.manageNetworkBox}>
          <Text style={styles.manageNetworkText}>Manage my network</Text>
          <TouchableOpacity onPress={handleManageNetwork}>
            <FontAwesome name="angle-right" size={24} color="grey" style={styles.manageNetworkIcon} />
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </View>
  );
}

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
    padding: 20,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 1,
  },
  manageNetworkText: {
    fontSize: 16,
    color: '#333',
  },
  manageNetworkIcon: {
    marginLeft: 10,
  },
});

export default MyNetwork;

