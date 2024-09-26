import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { Taviraj_400Regular } from '@expo-google-fonts/taviraj';
import { Tapestry_400Regular } from '@expo-google-fonts/tapestry';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import MainPage from './MainPage';
import Profile from './Profile';
import SearchPage from './SearchPage';
import Messages from './Messages';
import DirectMessage from './DirectMessage';
import AddProduct from './AddProduct';
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Taviraj_400Regular,
        Tapestry_400Regular,
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="MainPage" 
          component={MainPage} 
          options={{ 
            headerTitle: ' ',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#a6b2b9',
              height: 260,
            },
            headerTitleStyle: {
              fontSize: 24,
            },
            headerLeft: null,
          }} 
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile} 
          options={{
            headerTitle: 'Profile',
            headerTitleAlign: 'center',
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="AddProduct" 
          component={AddProduct} 
          options={{
            headerTitle: 'Add your product',
            headerTitleAlign: 'center',
            headerShown: false,
          }} 
        /> 
        <Stack.Screen 
          name="SearchPage" 
          component={SearchPage} 
          options={{
            headerTitle: 'Market Products',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#a6b2b9',
              height: 150,
            },
            headerTitleStyle: {
              fontSize: 24,
            },
            headerLeft: null,
          }}
        />
        <Stack.Screen 
          name="Messages" 
          component={Messages} 
         options={{ 
           headerShown: false,
          }} 
        />    
        <Stack.Screen 
          name="DirectMessage" 
          component={DirectMessage} 
          options={{
            headerShown: false,
          }} 
        />            
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
