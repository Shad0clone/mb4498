// App.js
import * as React from 'react';
import { NavigationContainer, DefaultTheme as NavLightTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, MD3LightTheme as PaperLightTheme, adaptNavigationTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import GalleryScreen from './screens/GalleryScreen';
import PictureScreen from './screens/PictureScreen';
import ProfileScreen from './screens/ProfileScreen';

const { LightTheme: CombinedLightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavLightTheme,
  materialLight: PaperLightTheme,
});

const theme = {
  ...PaperLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    primary: '#6200ee',
    secondary: '#03dac6',
    background: '#ffffff',
    surface: '#f2f2f2',
    onSurface: '#000000',
  },
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function GalleryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Gallery" component={GalleryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Picture" component={PictureScreen} options={{ title: 'View Picture' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={CombinedLightTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: { backgroundColor: '#ffffff' },
            tabBarActiveTintColor: '#6200ee',
            tabBarInactiveTintColor: 'gray',
            tabBarIcon: ({ color, size }) => {
              const iconName = route.name === 'GalleryTab' ? 'photo-library' : 'person';
              return <MaterialIcons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="GalleryTab" component={GalleryStack} options={{ title: 'Gallery' }} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
