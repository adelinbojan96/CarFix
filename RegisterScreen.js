import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

export default function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.registerText}>REGISTER</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#E3D9CC"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#E3D9CC"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#E3D9CC"
        secureTextEntry={true}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#E3D9CC"
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button}>
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
