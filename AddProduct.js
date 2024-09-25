import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Image, Alert, Platform 
} from 'react-native';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Checkbox from '@react-native-community/checkbox';

const CheckboxComponent = Platform.OS === 'web' 
  ? ({ value, onValueChange }) => (
      <input type="checkbox" checked={value} onChange={e => onValueChange(e.target.checked)} />
    )
  : Checkbox;

const AddProduct = ({ route, navigation }) => {
  const { username } = route.params;

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedFirm, setSelectedFirm] = useState('');
  const [imageUri, setImageUri] = useState(null); //for image preview
  const [imageFile, setImageFile] = useState(null); //for image upload
  const [firms, setFirms] = useState([]); 

  useEffect(() => {
    //fetch firms from backend
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
    setSelectedFirm(updatedFirms[index].label);
  };

  const handleChoosePhoto = () => {
    if (Platform.OS === 'web') {
      document.getElementById('fileInput').click();
    } else {
      launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.error('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          setImageUri(asset.uri);
          setImageFile(asset);
          console.log('Image selected:', asset.uri);
        }
      });
    }
  };

  //handle file selection on web
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); 
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUri(reader.result);
        console.log('Image selected (web):', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSaveProduct = async () => {
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

      if (Platform.OS === 'web') {
        if (imageFile) {
          formData.append('image', imageFile);
          console.log('Appending image for web:', imageFile);
        }
      } else {
        if (imageUri && imageFile) {
          const fileName = imageFile.fileName || 'product_image.png'; 
          const fileType = imageFile.type || 'image/png';

          formData.append('image', {
            uri: imageUri,
            type: fileType, 
            name: fileName,
          });
          console.log('Appending image for mobile:', imageUri, fileType, fileName);
        }
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
        <Text style={styles.label}>Product Name</Text>
        <TextInput 
          style={styles.input} 
          value={productName} 
          onChangeText={setProductName} 
          placeholder="Enter product name" 
        />

        <Text style={styles.label}>Product Description</Text>
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
                <CheckboxComponent
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
                key={imageUri} 
                source={imageUri ? { uri: imageUri } : require('./BujiiBE/src/main/resources/static/no-image.png')} 
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

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5dfd5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
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
