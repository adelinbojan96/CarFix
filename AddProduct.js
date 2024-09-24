import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Image, CheckBox, Alert, Platform 
} from 'react-native';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const AddProduct = ({ route, navigation }) => {
  const { username } = route.params;
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedFirm, setSelectedFirm] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [firms, setFirms] = useState([]); 

  // Fetch firms from the database when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8082/api/brands')
      .then(response => {
        if (Array.isArray(response.data)) {
          const fetchedFirms = response.data.map(firm => ({
            label: firm.name,
            checked: false
          }));
          setFirms(fetchedFirms);
        } else {
          console.error('Expected an array, but got something else:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching firms:', error);
      });
  }, []);

  const handleFirmSelection = (index) => {
    const updatedFirms = firms.map((firm, i) => ({
      ...firm,
      checked: i === index
    }));
    setFirms(updatedFirms);
    setSelectedFirm(updatedFirms[index].label); // Update the selected firm
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImageUri(uri); // Update the image URI
      }
    });
  };

  const handleTakePhoto = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImageUri(uri); // Update the image URI
      }
    });
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // Store the File object for upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUri(reader.result); // Show the selected image
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSaveProduct = async () => {
    //validate form fields and firm selection
    if (!productName || !productDescription || !price || !quantity || !selectedFirm) {
      alert('All fields are required! Please fill all fields and select a firm before submitting.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', productName);
      formData.append('description', productDescription);
      formData.append('price', price);
      formData.append('quantity', quantity);
      formData.append('firm', selectedFirm);
      formData.append('username', username);
      if (imageUri) {
        formData.append('image', {
          uri: imageUri,
          type: 'image/png', // Change as needed based on image type
          name: 'product_image.png', // Change as needed
        });
      }

      await axios.post('http://localhost:8082/api/products/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Product saved successfully');
      navigation.navigate('MainPage', { username });
    } catch (error) {
      console.error('Error saving product:', error.response ? error.response.data : error.message);
      alert('Failed to save product');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Product</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Product name</Text>
        <TextInput 
          style={styles.input} 
          value={productName} 
          onChangeText={setProductName} 
          placeholder="Enter product name" 
        />

        <Text style={styles.label}>Product description</Text>
        <TextInput 
          style={styles.input} 
          value={productDescription} 
          onChangeText={setProductDescription} 
          placeholder="Enter product description" 
        />

        <Text style={styles.label}>Price</Text>
        <TextInput 
          style={styles.input} 
          value={price} 
          onChangeText={setPrice} 
          placeholder="Enter price" 
          keyboardType="numeric"
        />

        <Text style={styles.label}>Quantity</Text>
        <TextInput 
          style={styles.input} 
          value={quantity} 
          onChangeText={setQuantity} 
          placeholder="Enter quantity" 
          keyboardType="numeric" 
        />

        <View style={styles.selectionContainer}>
          <View style={styles.firmContainer}>
            <Text style={styles.label}>Firm</Text>
            {firms.map((firm, index) => (
              <View key={index} style={styles.checkboxContainer}>
                <CheckBox
                  value={firm.checked}
                  onValueChange={() => handleFirmSelection(index)}
                />
                <Text style={styles.firmLabel}>{firm.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.pictureContainer}>
            <Text style={styles.label}>Image</Text>
            <TouchableOpacity onPress={handleChoosePhoto}>
              <Image 
                source={imageUri ? { uri: imageUri } : require('./BujiiBE/src/main/resources/static/no-image.png')} // Adjust path accordingly
                style={styles.productImage} 
              />
              <Text style={styles.editPictureText}>Edit picture</Text>
            </TouchableOpacity>
          </View>
        </View>

        {Platform.OS === 'web' && (
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
          />
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProduct}>
          <Text style={styles.saveButtonText}>Save Product</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    marginBottom: 1, //should be 20
    backgroundColor: '#a6b2b9', 
    padding: 20, 
    borderRadius: 10,
    width: '100%', 
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
    marginBottom: 15,
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  firmContainer: {
    width: '45%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  firmLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
  },
  pictureContainer: {
    width: '45%',
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginTop: 10,
  },
  editPictureText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
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
});

export default AddProduct;
