import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import Checkbox from 'expo-checkbox';
import { Alert } from 'react-native';
import { API_URL } from '@/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signin() {
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        Alert.alert('Login Failed', data.message || 'Something went wrong');
      } else {
        console.log('Login success:', data);
        await AsyncStorage.setItem('userData', JSON.stringify(data));
        // Navigate to home
        router.push('/home');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred during login');
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/images/collabify2.png')} style={styles.image} />
        </View>

        <View style={styles.header}>
          <Text style={styles.topic}>Sign in</Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.secondtopic}>or</Text>
          <Text style={styles.thirdtopic} onPress={() => router.push('/signup')}>  Join Collabify</Text>
        </View>

        <View>
          <TouchableOpacity style={styles.button9}>
            <Image source={require('../assets/images/google-48.png')} style={styles.icon} />
            <Text style={styles.buttonText9}>Sign in with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button9}>
            <Image source={require('../assets/images/apple-logo-50.png')} style={styles.icon} />
            <Text style={styles.buttonText9}>Sign in with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button9}>
            <Image source={require('../assets/images/facebook-48.png')} style={styles.icon} />
            <Text style={styles.buttonText9}>Sign in with Facebook</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine}></View>
          <Text style={styles.separatorText}>or</Text>
          <View style={styles.separatorLine}></View>
        </View>

        <View style={styles.bottomContainer}></View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter your Email" 
            keyboardType="email-address" 
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput 
              style={[styles.input, { flex: 1 }]} 
              placeholder="Enter your Password" 
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Image 
                source={require('../assets/images/eye-24.png')} 
                style={styles.passwordicon} 
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={agree}
              onValueChange={setAgree}
              color={agree ? '#FF8B04' : '#FF8B04'}
              
            />
            <Text style={styles.checkboxLabel}>Remember me.</Text>
            <Text style={styles.checkboxLabel2}>Learn more</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
          disabled={!agree}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#777',
  },
  bottomContainer: {
    marginTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 50,
    marginRight: 10,
  },
  topic: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  secondtopic: {
    fontSize: 12,
    fontWeight: '400',
  },
  thirdtopic: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FF8B04',
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 20,
  },
  passwordicon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  button9: {
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
  buttonText9: {
    color: '#050505',
    fontSize: 17.5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: '#b9babd',
  },
  input: {
    height: 40,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#FF8B04',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 9.5,
    color: '#777',
  },
  checkboxLabel2: {
    marginLeft: 9.5,
    color: '#FF8B04',
  },
});
