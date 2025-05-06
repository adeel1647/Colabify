import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF8B04',
        tabBarInactiveTintColor: '#A0A0A0',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 3,
          height: 65,
          paddingBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-outline" size={30} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="network"
        options={{
          title: "Network",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-group-outline" size={30} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="newpost"
        options={{
          title: "",
          tabBarIcon: () => (
            <View
              style={{
                position: 'absolute',
                top: -30, 
                backgroundColor: '#FF8B04',
                borderRadius: 50, 
                width: 65, 
                height: 65,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 12,
                elevation: 10,
                transform: [{ scale: 1.1 }], 
                borderWidth: 4, 
                borderColor: '#fff', 
                backgroundColor: 'linear-gradient(180deg, rgba(255, 139, 4, 1) 0%, rgba(255, 150, 70, 1) 100%)', 
              }}
            >
              <MaterialCommunityIcons name="plus" size={40} color="#fff" />
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Alerts",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell-outline" size={30} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="pages"
        options={{
          title: "Pages",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="file-document-multiple-outline" size={30} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
