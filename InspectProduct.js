import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';

const InspectProduct = ({ route }) => {
  const { product, username } = route.params;
  const [message, setMessage] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Offset for iOS to avoid overlapping
    >
      <View style={styles.container}>
        {/* Product Info Section */}
        <View style={styles.productCard}>
          <Image
            style={styles.productImage}
            source={{ uri: `data:image/png;base64,${product.image}` }}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productTitle}>{product.title}</Text>
            {/* Stock Status */}
            <Text style={product.quantity > 0 ? styles.inStock : styles.outOfStock}>
              {product.quantity > 0 ? 'In stock' : 'No more in stock'}
            </Text>
            <Text style={styles.productSubtitle}>Price: ${product.price}</Text>
          </View>
          <View style={styles.sellerInfo}>
            <Image
              style={styles.sellerAvatar}
              source={{ uri: `data:image/png;base64,${product.seller_picture}` }} 
            />
            <Text style={styles.sellerName}>{product.seller_name}</Text>
          </View>
        </View>

        <Text style={styles.description}>Description: {product.description}</Text>

        {/* Message Input Section */}
        <View style={[styles.inputContainer]}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={(text) => setMessage(text)}
            placeholder="Send a message..."
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => {
              console.log('Message sent:', message);
              setMessage('');
            }}
          >
            <Text style={styles.sendText}>➤</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productSubtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  sellerInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 5,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  inStock: {
    fontSize: 16,
    color: 'green',
    marginBottom: 5, // Moved margin-bottom to match placement below title
  },
  outOfStock: {
    fontSize: 16,
    color: 'red',
    marginBottom: 5, // Moved margin-bottom to match placement below title
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderColor: '#ddd',
    position: 'absolute', // Absolute position to stick to bottom
    bottom: 0, // Align to bottom
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    backgroundColor: '#e6ddd1',
    borderRadius: 20,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#788B91',
    borderRadius: 20,
    padding: 10,
  },
  sendText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default InspectProduct;
