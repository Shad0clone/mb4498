import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddBookScreen from './screens/AddBookScreen';
import ViewBooksScreen from './screens/ViewBooksScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Add Book">
        <Stack.Screen name="Add Book" component={AddBookScreen} />
        <Stack.Screen name="View Books" component={ViewBooksScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
