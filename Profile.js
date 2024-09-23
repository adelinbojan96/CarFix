import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, Image, TouchableOpacity, StyleSheet, 
  Dimensions, Alert, Platform 
} from 'react-native';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const Profile = ({ route, navigation }) => {
  const { formerUsername } = route.params;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImageUri, setProfileImageUri] = useState(null);  // No default image
  const [newProfileImageUri, setNewProfileImageUri] = useState(null); // For mobile
  const [newProfileImageFile, setNewProfileImageFile] = useState(null); // For web

  useEffect(() => {
    axios.get(`http://localhost:8082/users/profile-image?username=${formerUsername}`)
      .then(response => {
        const base64Image = response.data; 
        if (base64Image) {
          // Construct the data URI
          const imageUri = `data:image/png;base64,${base64Image}`;
          setProfileImageUri({ uri: imageUri });
        }
      })
      .catch(error => {
        console.error('Error fetching profile image:', error);
      });
  }, [formerUsername]);

  const uploadImage = async () => {
    try {
      const formData = new FormData();

      if (Platform.OS === 'web') {
        if (newProfileImageFile) {
          formData.append('image', newProfileImageFile);
        }
      } else {
        if (newProfileImageUri) {
          const file = {
            uri: newProfileImageUri.uri,
            type: 'image/png', 
            name: 'profile_image.png',
          };
          formData.append('image', file);
        }
      }

      await axios.post(
        `http://localhost:8082/users/upload-profile-image?username=${encodeURIComponent(formerUsername)}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error.response ? error.response.data : error.message);
      alert('Failed to upload image');
    }
  };

  const handleTakePhoto = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setNewProfileImageUri(uri);
        setProfileImageUri({ uri });
      }
    });
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setNewProfileImageUri(uri);
        setProfileImageUri({ uri });
      }
    });
  };

  const selectImage = () => {
    if (Platform.OS === 'web') {
      document.getElementById('fileInput').click();
    } else {
      Alert.alert(
        "Select Image",
        "Choose an option",
        [
          { text: "Take Photo", onPress: handleTakePhoto },
          { text: "Choose from Library", onPress: handleChoosePhoto },
          { text: "Cancel", style: "cancel" }
        ]
      );
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewProfileImageFile(file); // Store the File object for upload
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result.split(',')[1];
        const imageUri = `data:image/png;base64,${base64Image}`;
        setProfileImageUri({ uri: imageUri });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!username || !email || (password && password !== confirmPassword)) {
      Alert.alert('Please fill out all fields and make sure passwords match.');
      return;
    }

    const profileData = {
      username,
      email,
      password: password || null, 
    };

    try {
      await axios.post(`http://localhost:8082/users/profile?formerUsername=${formerUsername}`, profileData);
      console.log('Profile updated successfully');

      // Upload image only if a new one was selected
      if (Platform.OS === 'web' ? newProfileImageFile : newProfileImageUri) {
        await uploadImage();
      }

      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }

    // Navigate back to MainPage with the updated username
    navigation.navigate('MainPage', { username });
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={selectImage}>
          {profileImageUri ? (
            <Image
              source={profileImageUri}
              style={styles.profileImage}
            />
          ) : (
            <Text style={styles.noImageText}>No image available</Text>
          )}
          <Text style={styles.editPictureText}>Edit picture</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit your profile</Text>

        {/* Hidden file input for web */}
        {Platform.OS === 'web' && (
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
          />
        )}
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
  noImageText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  editPictureText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
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
