import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown:false}} />
      <Stack.Screen name="index" options={{headerShown:false}} />
      <Stack.Screen name="signin" options={{headerShown:false}} />
      <Stack.Screen name="signup" options={{headerShown:false}} />
      <Stack.Screen name="signupPassword" options={{headerShown:false}} />
      <Stack.Screen name="Analytics" options={{headerShown:false}} />
      <Stack.Screen name="myNetwork" options={{ headerTitle: "Manage my network" }} />
      <Stack.Screen name="myProfile" options={{headerShown:false}} />
      <Stack.Screen name="groupcreation" options={{headerShown:false}} />
      <Stack.Screen name="invitations" options={{headerShown:false}} />

    </Stack>
  );
}