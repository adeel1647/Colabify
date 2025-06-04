import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useStripe, CardField } from '@stripe/stripe-react-native';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

const StripePaymentScreen = () => {
  const { confirmPayment } = useStripe();
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();

  const postId = typeof params.postId === 'string' ? params.postId : '';
  const amount = typeof params.amount === 'string' ? parseFloat(params.amount) : 0;

  const [cardDetails, setCardDetails] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!postId || !amount || isNaN(amount)) {
      Alert.alert('Invalid Payment', 'Missing or invalid post ID or amount.');
      router.back();
    }
  }, []);

  const handlePayment = async () => {
    if (!cardDetails?.complete) {
      Alert.alert('Incomplete Card Info', 'Please enter complete card details.');
      return;
    }
    if (!email) {
      Alert.alert('Email Required', 'Please enter your email for billing.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('https://your-backend.com/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(amount * 100) }),
      });

      const { clientSecret } = await response.json();

      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        type: 'Card',
        billingDetails: { email },
      });

      if (error) {
        Alert.alert('Payment Failed', error.message);
      } else if (paymentIntent) {
        Alert.alert('Success', 'Payment Successful!');
        router.back();
        console.log('Boosted Post ID:', postId);
      }
    } catch (err) {
      console.error('Payment error:', err);
      Alert.alert('Error', 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!postId || !amount || isNaN(amount)) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Invalid payment details. Please try again.</Text>
      </View>
    );
  }

   return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🚀 Boost Your Post</Text>
        <Text style={styles.subText}>Pay ${amount.toFixed(2)} to boost your post for 24 hours.</Text>

        <TextInput
          placeholder="Enter Billing Email"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="Enter Your Name"
          keyboardType="text"
          style={styles.input}
          autoCapitalize="yes"
          placeholderTextColor="#888"
        />

        <CardField
          postalCodeEnabled={false}
          placeholder={{ number: '•••• •••• •••• ••••' }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={setCardDetails}
        />

        <View style={styles.paymentMethods}>
          <Text style={styles.methodsTitle}>We Accept:</Text>
          <View style={styles.iconsRow}>
            <Image source={{ uri: 'https://img.icons8.com/color/48/000000/visa.png' }} style={styles.icon} />
            <Image source={{ uri: 'https://img.icons8.com/color/48/000000/mastercard-logo.png' }} style={styles.icon} />
            <Image source={{ uri: 'https://img.icons8.com/color/48/000000/amex.png' }} style={styles.icon} />
          </View>
        </View>

       <View style={styles.bottomButtonContainer}>
      <TouchableOpacity
        style={[styles.payButton, loading && { opacity: 0.7 }]}
        onPress={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.payButtonText}>💳 Pay ${amount.toFixed(2)}</Text>
        )}
      </TouchableOpacity>
    </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default StripePaymentScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9fafb',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 10,
    color: '#FF8B04',
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardContainer: {
    height: 50,
    marginVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  card: {
    backgroundColor: '#f5f5f5',
  },
  paymentMethods: {
    marginTop: 10,
    marginBottom: 30,
  },
  methodsTitle: {
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
  },
  iconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 32,
    marginRight: 12,
    resizeMode: 'contain',
  },
  payButton: {
    backgroundColor: '#FF8B04',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#0a74da',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomButtonContainer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: 20,
},

});