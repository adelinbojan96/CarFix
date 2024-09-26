import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const SearchPage = ({ route }) => {
  const { username, criteria, searchText } = route.params;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //helper function to format date (DD/MM/YY HH:MM)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = String(date.getFullYear()).slice(-2); 
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let response;
        if (criteria === 'Category') {
          response = await axios.get(`http://localhost:8082/api/products/retrieveCategory`, {
            params: { text: searchText}, 
          });
        } else if (criteria === 'Search') {
          response = await axios.get(`http://localhost:8082/api/products/retrieveName`, {
            params: { text: searchText }, 
          });
        }
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [criteria, searchText, username]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  const pageTitle =
    criteria === 'Category'
      ? `${searchText} Products`
      : `Products that contain "${searchText}"`;

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>{pageTitle}</Text>
          <View style={styles.underline} />
        </View>

        <ScrollView contentContainerStyle={styles.productList}>
          {products.map((product, index) => (
            <View key={index} style={styles.productCard}>
              <Image
                style={styles.productImage}
                source={{ uri: `data:image/png;base64,${product.image}` }}
              />
              <View style={styles.productTextContainer}>
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={styles.productSubtitle}>{formatDate(product.created_at)}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  titleContainer: {
    alignSelf: 'stretch',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start',
    paddingLeft: 10,
  },
  underline: {
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    marginTop: 5,
    width: '100%',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  productList: {
    paddingVertical: 10,
    marginTop: 10,
  },
  productCard: {
    backgroundColor: '#d3dce4',
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
    flexDirection: 'row',
    borderColor: '#ccc',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 10,
  },
  productTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  productSubtitle: {
    fontSize: 14,
    color: '#555',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default SearchPage;
