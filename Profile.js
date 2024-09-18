import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';

const Profile = ({ route }) => {
  const { formerUsername } = route.params;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

const handleSave = () => {
  if (!username || !email || !password || !confirmPassword) {
    alert('Please write on each text field');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  const userCreateDto = {
    username: username,
    email: email,
    password: password,
  };

  console.log('Request Data:', { formerUsername, ...userCreateDto });

  axios.post(`http://localhost:8082/users/profile?formerUsername=${formerUsername}`, userCreateDto)
    .then(response => {
      console.log('Response:', response.data);
      alert('Profile updated successfully');
      navigation.navigate('MainPage', { username });
    })
    .catch(error => {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
      alert('Failed to update profile');
    });
};



  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image 
          source={require('./assets/sir_alex.png')} 
          style={styles.profileImage}
        />
        <Text style={styles.headerText}>  Edit your profile</Text>
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput 
            style={styles.input} 
            value={username} 
            onChangeText={setUsername} 
            placeholder="New Username" 
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail} 
            placeholder="New Email" 
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput 
            style={styles.input} 
            value={password} 
            onChangeText={setPassword} 
            placeholder="New Password" 
            secureTextEntry 
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput 
            style={styles.input} 
            value={confirmPassword} 
            onChangeText={setConfirmPassword} 
            placeholder="Confirm Password" 
            secureTextEntry 
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Buttons Section */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Upload a product</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Become a seller</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5dfd5',
    padding: 20,
    justifyContent: 'flex-end', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#a6b2b9', 
    padding: 20, 
    borderRadius: 10,
    width: '100%', 
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#000', 
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    backgroundColor: '#f9f1e8',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 40, 
  },
  inputGroup: {
    marginBottom: 15,
    position: 'relative',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#d0bfae',
    padding: 10,
    borderRadius: 20, 
    borderWidth: 1,
    borderColor: '#000',
  },
  saveButton: {
    backgroundColor: '#d0bfae', 
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#a6b2b9', 
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Profile;
