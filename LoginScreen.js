import React, { useState } from 'react';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, StyleSheet, Image, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';

export default function LoginScreen({ navigation }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);  // State to track login status
  const [users, setUsers] = useState([]);  // State to store all users from the database

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://carfix-production.up.railway.app/users/login', {
        username,
        password,
      });

      const token = response.data.jwt;

      // If token is received, login was successful
      if (token) {
        await AsyncStorage.setItem('authToken', token);  // Save token securely in AsyncStorage
        setLoginStatus('OK');  // Set login status to "OK"
        
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'You are now logged in.',
        });

        // Navigate to MainPage
        navigation.navigate('MainPage');
      } else {
        setLoginStatus(JSON.stringify(response.data, null, 2));  // No token found, set loginStatus to response data
        fetchAllUsers();  // Fetch all users if login fails
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
      setLoginStatus(JSON.stringify(error.response?.data, null, 2));  // Set loginStatus to error response data
      fetchAllUsers();  // Fetch all users in case of error
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: errorMessage,
      });
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('https://carfix-production.up.railway.app/users');
      
      console.log("Fetched users data:", response.data); // Debugging: Log the data structure
      
      // Ensure that the response data is an array
      if (Array.isArray(response.data)) {
        setUsers(response.data);  // Set the users to the state if it's an array
      } else {
        console.error('Expected an array but received:', response.data);
        setUsers([]); // Set to an empty array if the data isn't an array
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error fetching users',
        text2: error.message || 'Could not retrieve users from the database',
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.loginText}>LOGIN</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#E3D9CC"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#E3D9CC"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Image 
        style={styles.image} 
        source={require('./assets/woman-with-wrench.png')} 
      />

      <Text style={styles.footerText}>
        You don't have an account?
      </Text>

      <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
        <View>
          <Text style={styles.signupText}>Sign up here</Text>
        </View>
      </TouchableWithoutFeedback>

      {/* Display login status for debugging purposes */}
      <Text style={styles.loginStatusText}>
        {loginStatus && (
          <>
            <Text>Login Status:</Text>
            <Text>{loginStatus}</Text>
          </>
        )}
      </Text>

      {/* Display all users if login fails */}
      {loginStatus === 'Null' && users.length > 0 && (
        <View style={styles.usersContainer}>
          <Text style={styles.usersTitle}>Users in the Database:</Text>
          {users.map((user, index) => (
            <Text key={index} style={styles.userText}>
              {user.username} - {user.email}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loginText: {
    fontSize: 43,
    fontWeight: 'bold',
    marginBottom: 70,
    fontFamily: 'Tapestry_400Regular',
  },
  input: {
    width: '88%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#6E7E85',
    borderRadius: 10, 
    marginBottom: 20,
    backgroundColor: '#6E7E85', 
    color: '#ffff', 
    fontFamily: 'Times New Roman',
    fontSize: 18, 
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6E7E85',
    padding: 10,
    borderRadius: 20,
    width: '40%',
    height: '6%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 18,
    fontFamily: 'Taviraj_400Regular',
  },
  image: {
    width: 170,
    height: 170,
    marginTop: 30,
    marginLeft: 190,
  },
  footerText: {
    marginTop: 50,
    fontSize: 18,
    color: '#000',
    fontFamily: 'Taviraj_400Regular', 
  },
  signupText: {
    fontSize: 18,
    textDecorationLine: 'underline',
    color: '#000',
    fontFamily: 'Taviraj_400Regular', 
  },
  loginStatusText: {
    marginTop: 20,
    fontSize: 18,
    color: 'red',  // Display status in red for easier visibility during debugging
  },
  usersContainer: {
    marginTop: 30,
  },
  usersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userText: {
    fontSize: 16,
    color: '#000',
  },
});
