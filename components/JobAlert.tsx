// JobAlert.tsx
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { API_URL } from '@/config';

interface JobAlertProps {
  pageImage: any;
  pageName: string;
  pageDescription: string;
  description: string;
  onClose: () => void;
}

const JobAlert: React.FC<JobAlertProps> = ({ pageImage, pageName, description, pageDescription, onClose }) => {
  return (
    <View style={styles.jobContainer}>
      <Image source={pageImage} style={styles.pageImage} />
      <View style={styles.textContainer}>
        <Text style={styles.pageName}>{pageName}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.privacyContainer}>
  <FontAwesome
    name={pageDescription === 'Public' ? 'globe' : 'lock'}
    size={14}
    color="#FF8B04"
    style={styles.privacyIcon}
  />
  <Text style={styles.privacyText}>
    {pageDescription === 'Public' ? 'Public' : 'Private'}
  </Text>
</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  jobContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    // borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  pageImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  pageName: {
    fontSize: 15,
    fontWeight: '400',
  },
  description: {
    fontSize: 12,
    color: '#1f1e1e',
  },
  pageDescription: {
    fontSize: 12,
    color: '#8a8a8a',
  },
  privacyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  
  privacyIcon: {
    marginRight: 5,
  },
  
  privacyText: {
    fontSize: 12,
    color: '#8a8a8a',
  },
  
});

export default JobAlert;
