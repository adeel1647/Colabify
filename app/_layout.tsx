import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StripeProvider publishableKey="pk_test_yourPublishableKeyHere">
        <SafeAreaView style={styles.container}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="signin" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen name="signupPassword" options={{ headerShown: false }} />
            <Stack.Screen name="Analytics" options={{ headerShown: false }} />
            <Stack.Screen name="myNetwork" options={{ headerTitle: "Manage my network" }} />
            <Stack.Screen name="myProfile" options={{ headerShown: false }} />
            <Stack.Screen name="groupcreation" options={{ headerShown: false }} />
            <Stack.Screen name="invitations" options={{ headerShown: false }} />
            <Stack.Screen name="forget-password" options={{ headerShown: false }} />
            <Stack.Screen name="BoostDetailsScreen" options={{ headerShown: false }} />
            <Stack.Screen name="StripePaymentScreen" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </StripeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // optional
  },
});
