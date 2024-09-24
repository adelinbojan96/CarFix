import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, CheckBox } from 'react-native';

const AddProduct = ({ route, navigation }) => {
  const { username } = route.params;
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(''); // New state for quantity
  const [selectedFirm, setSelectedFirm] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [firms, setFirms] = useState([
    { label: 'Audi', checked: false },
    { label: 'Mercedes', checked: false },
    { label: 'Dacia', checked: false }
  ]);

  const handleFirmSelection = (index) => {
    const updatedFirms = firms.map((firm, i) => ({
      ...firm,
      checked: i === index
    }));
    setFirms(updatedFirms);
    setSelectedFirm(firms[index].label);
  };

  const handleChoosePhoto = () => {
    // code to choose a photo from gallery
  };

  const handleSaveProduct = () => {
    // code to save the product
    console.log('Product saved:', { productName, productDescription, price, quantity, selectedFirm });

    // navigate to MainPage
    navigation.navigate('MainPage', { username });
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

        {/* New Quantity Input */}
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
                source={imageUri ? { uri: imageUri } : require('./assets/sir_alex.png')} 
                style={styles.productImage} 
              />
               <Text style={styles.editPictureText}>Edit picture</Text>
            </TouchableOpacity>
          </View>
        </View>

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
