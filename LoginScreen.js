import React, { useState } from 'react';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { Alert } from 'react-native';
import { View, Text, TextInput, StyleSheet, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
  axios.post('https://carfix-production.up.railway.app/users/login', {
    username: username,
    password: password,
  },{withCredentials: true})
  .then(response => {
    const token = response.data.jwt;

    Toast.show({
      type: 'success',
      text1: 'Login Successful',
      text2: `JWT: ${token}`,
    });

    navigation.navigate('MainPage');
  })
  .catch(error => {
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
    Toast.show({
      type: 'error',
      text1: 'Login failed. Please try again.',
      text2: errorMessage,
    });
  });
};


  return (
    <View style={styles.container}>
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

    </View>
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
});
