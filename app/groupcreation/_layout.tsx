import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="ProfileSettingsScreen" options={{headerShown:false}} />
      <Stack.Screen name="AddBioScreen" options={{headerShown:false}} />
      <Stack.Screen name="AddDescriptionScreen" options={{headerShown:false}} />
      <Stack.Screen name="CreatePostScreen" options={{headerShown:false}} />
      <Stack.Screen name="GroupInfoScreen" options={{headerShown:false}} />
      <Stack.Screen name="GroupScreen" options={{headerShown:false}} />
      <Stack.Screen name="GroupSettingsScreen" options={{headerShown:false}} />
      <Stack.Screen name="InviteMembersScreen" options={{headerShown:false}} />
      <Stack.Screen name="PostScreen" options={{headerShown:false}} />
      <Stack.Screen name="SettingsScreen" options={{headerShown:false}} />
      <Stack.Screen name="CreateGroupScreen" options={{headerShown:false}} />
      <Stack.Screen name="AddEducationScreen" options={{headerShown:false}} />
      <Stack.Screen name="AddWorkExperienceScreen" options={{headerShown:false}} />
      <Stack.Screen name="UpdateAddressScreen" options={{headerShown:false}} />
      <Stack.Screen name="BoostDetailsScreen" options={{headerShown:false}} />

    </Stack>
  );
}