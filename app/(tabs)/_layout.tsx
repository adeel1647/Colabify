import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { Home, Users, PlusCircle, Bell, Newspaper } from 'lucide-react-native'; // Modern Lucide Icons

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF8B04', // Premium blue for active tab
        tabBarInactiveTintColor: '#A0A0A0', // Soft gray for inactive tabs
        tabBarStyle: {
          backgroundColor: '#fff', // Clean white background
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 3, // Smooth shadow effect
          height: 65, // Extra space for better UX
          paddingBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center' }}>
              <Home color={color} size={30} strokeWidth={2} />
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="network"
        options={{
          title: "Network",
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center' }}>
              <Users color={color} size={30} strokeWidth={2} />
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="newpost"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                backgroundColor: '#FF8B04',
                borderRadius: 50,
                padding: 12,
                marginBottom: 20, // Floating effect
              }}
            >
              <PlusCircle color="#fff" size={36} strokeWidth={2.5} />
            </View>
          ),
          tabBarActiveTintColor: 'red', // Green for Post tab
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Alerts",
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center' }}>
              <Bell color={color} size={30} strokeWidth={2} />
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="pages"
        options={{
          title: "Pages",
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center' }}>
              <Newspaper     color={color} size={30} strokeWidth={2} />
            </View>
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
