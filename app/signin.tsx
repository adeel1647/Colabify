import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView,ActivityIndicator , Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import Checkbox from 'expo-checkbox';
import { Alert } from 'react-native';
import { API_URL } from '@/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signin() {
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        Alert.alert('Login Failed', data.message || 'Something went wrong');
      } else {
        console.log('Login success:', data);
        await AsyncStorage.setItem('userData', JSON.stringify(data));
        router.push('/home');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred during login');
    } finally {
      setIsLoading(false);
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
        <View style={styles.forgetPasswordContainer}>
  <TouchableOpacity onPress={() => router.push('/forget-password')}>
    <Text style={styles.forgetPasswordText}>Forget Password?</Text>
  </TouchableOpacity>
</View>

        <TouchableOpacity 
  style={[styles.button, isLoading && { opacity: 0.6 }]} 
  onPress={handleLogin}
  disabled={!agree || isLoading}
>
  {isLoading ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : (
    <Text style={styles.buttonText}>Continue</Text>
  )}
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
    marginTop: 40,
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
  forgetPasswordContainer: {
  alignItems: 'flex-end',
  marginVertical: 10,
},
forgetPasswordText: {
  color: '#FF8B04',
  fontWeight: '600',
  fontSize: 14,
},

});
