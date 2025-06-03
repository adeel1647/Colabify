import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import { API_URL } from '@/config';

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: verify email+phone, 2: reset password
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleVerify = async () => {
  if (!email.trim() || !phone.trim()) {
    Alert.alert('Validation Error', 'Please enter both email and mobile number.');
    return;
  }
  setIsLoading(true);
  try {
    const response = await fetch(`${API_URL}/api/users/request-password-reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), mobileNumber: phone.trim() }),  // Changed here
    });
    const data = await response.json();
    if (!response.ok) {
      Alert.alert('Verification Failed', data.message || 'Email and mobile number do not match.');
    } else {
      setStep(2);
    }
  } catch (error) {
    Alert.alert('Error', 'An error occurred during verification.');
  } finally {
    setIsLoading(false);
  }
};


  const handleResetPassword = async () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert('Validation Error', 'Please fill both password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/users/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), newPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        Alert.alert('Reset Failed', data.message || 'Failed to reset password.');
      } else {
        Alert.alert('Success', 'Password reset successfully. Please login.');
        router.push('/signin');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during password reset.');
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
          <Text style={styles.topic}>Reset Password</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.secondtopic}>or</Text>
          <Text style={styles.thirdtopic} onPress={() => router.push('/signin')}> Login Collabify</Text>
        </View>
        <View style={styles.bottomContainer}></View>

        {step === 1 && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Phone"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
            <TouchableOpacity
              style={[styles.button, isLoading && { opacity: 0.6 }]}
              onPress={handleVerify}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Verify</Text>
              )}
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>New Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity
              style={[styles.button, isLoading && { opacity: 0.6 }]}
              onPress={handleResetPassword}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Reset Password</Text>
              )}
            </TouchableOpacity>
          </>
        )}
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
