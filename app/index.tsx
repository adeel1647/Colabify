import React from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {Link, router } from 'expo-router';

export default function FirstPage() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/adaptive-icon.png')} style={styles.image} />
      <Text style={styles.title}>COLLABIFY</Text>


      <View style={styles.bottomContainer}>
      <Text style={styles.paragraph}>
        By clicking Agree & Join or Continue,you agree to the Collabify User Agreement, Privacy Policy, and Cookie Policy
      </Text>
      
      <TouchableOpacity style={styles.button1} onPress={() => router.push('/home')}>
        <Text style={styles.buttonText1}>Agree & Join</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button}>
      <Image source={require('../assets/images/google-48.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button}>
      <Image source={require('../assets/images/facebook-48.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Continue with Facebook</Text>
      </TouchableOpacity>
      
      <Text style={styles.signInText} onPress={() => router.push('/signin')}>Sign in</Text>
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 70,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 100,
    marginBottom: 20,
    bottom:80
  },
  title: {
    width: 350,
    height: 100,
    fontSize: 25,
    textAlign:"center",
    fontWeight: '500',
    bottom:110,
    marginBottom: 140,
    marginTop:20,
    letterSpacing:10,
  },
  paragraph: {
    fontSize: 11,
    textAlign: 'center',
    marginTop:20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button1: {
    backgroundColor: '#FF8B04',
    // backgroundColor: '#2657d1',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: '#050505',
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText1: {
    color: '#fff',
    fontSize: 17.5,
  },
  buttonText: {
    color: '#050505',
    fontSize: 17.5,
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 20,
  },
  signInText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF8B04',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FF8B04',
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'transparent',
  }  
  
});
