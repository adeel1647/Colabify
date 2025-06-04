import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { router } from 'expo-router';

const BoostDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { postId } = route.params as { postId: string };

  const handleBoostNow = () => {
  router.push({
    pathname: "/StripePaymentScreen",
    params: {
      postId,
      amount: 4.99,
      description: "Boost Post for 24 Hours",
    },
  });
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FontAwesome5 name="rocket" size={36} color="#FF8B04" style={{ marginBottom: 20 }} />
      <Text style={styles.title}>Boost Your Post</Text>

      <Text style={styles.description}>
        Boosting your post will prioritize it at the top of users’ feeds, increasing visibility,
        engagement, and interactions. Boosted posts appear with a "Promoted" tag and receive
        enhanced exposure for 24 hours.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Boost?</Text>
        <View style={styles.bullet}>
          <MaterialIcons name="trending-up" size={20} color="#FF8B04" />
          <Text style={styles.bulletText}>Increase your post reach up to 3x more users</Text>
        </View>
        <View style={styles.bullet}>
          <Ionicons name="ios-eye" size={20} color="#FF8B04" />
          <Text style={styles.bulletText}>More visibility and higher engagement</Text>
        </View>
        <View style={styles.bullet}>
          <FontAwesome5 name="crown" size={18} color="#FF8B04" />
          <Text style={styles.bulletText}>Appear at the top of the feed for 24 hours</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Price</Text>
        <Text style={styles.priceText}>💰 $4.99 USD (One-time for 24 hours)</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentBox}>
          <FontAwesome5 name="cc-stripe" size={28} color="#6772e5" />
          <Text style={styles.paymentText}>Stripe - Secure Credit/Debit Card Payment</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.boostButton} onPress={handleBoostNow}>
        <Text style={styles.boostButtonText}>Boost Now with Stripe</Text>
      </TouchableOpacity>

      <Text style={styles.disclaimer}>
        By tapping "Boost Now", you agree to our terms of service and understand that your post
        will be promoted for 24 hours.
      </Text>
    </ScrollView>
  );
};

export default BoostDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  bullet: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bulletText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#333',
  },
  priceText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  paymentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 12,
    borderRadius: 10,
  },
  paymentText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#333',
  },
  boostButton: {
    marginTop: 30,
    backgroundColor: '#FF8B04',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  boostButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disclaimer: {
    marginTop: 20,
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
  },
});
