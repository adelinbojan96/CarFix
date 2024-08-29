import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

export default function RegisterScreen({ navigation }) {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if(password !== confirmPassword)
    {
      Toast.show({
        type: 'error',
        text1: 'Password Mismatch',
        text2: 'Confirm Password does not match with the password.',
      });
    }else{
      axios.post('http://localhost:8082/users/register', {
        username: username,
        email: email,
        password: password,
      })
      .then(response => {
        Toast.show({
          type: 'success',
          text1: 'Sign Up Successful',
          text2: 'Welcome aboard!',
        });
        navigation.navigate('Login')
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Sign up failed. Please try again.',
          text2: error.message,
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.registerText}>REGISTER</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#E3D9CC"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#E3D9CC"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#E3D9CC"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#E3D9CC"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      <Image 
        style={styles.image} 
        source={require('./assets/man-with-items.png')} 
      />

      <Text style={styles.footerText}>
        You already have an account?
      </Text>

      <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
        <View>
          <Text style={styles.loginLinkText}>Go to login</Text>
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
  registerText: {
    fontSize: 43,
    fontWeight: 'bold',
    marginBottom: 40,
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
    width: 180,
    height: 162,
    marginTop: 30,
    marginRight: 130,
  },
  footerText: {
    marginTop: 30,
    fontSize: 18,
    color: '#000',
    fontFamily: 'Taviraj_400Regular', 
  },
  loginLinkText: {
    fontSize: 18,
    textDecorationLine: 'underline',
    color: '#000',
    fontFamily: 'Taviraj_400Regular', 
  },
});
