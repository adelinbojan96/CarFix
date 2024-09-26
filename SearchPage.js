import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const SearchPage = ({ route }) => {
  const { username, category, searchText } = route.params;

  return (
    <View style={styles.container}>
      {/* Main Content Section */}
      <View style={styles.mainContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>Skoda Products</Text>
          <View style={styles.underline} />
        </View>

        <ScrollView contentContainerStyle={styles.productList}>
          {/* Example Product Card 1 */}
          <View style={styles.productCard}>
            <Image
              style={styles.productImage}
              source={{ uri: './assets/sir_alex.png' }} 
            />
            <View style={styles.productTextContainer}>
              <Text style={styles.productTitle}>Bujiie Skoda Octavia 2010</Text>
              <Text style={styles.productSubtitle}>Distribuitor clujean</Text>
            </View>
          </View>

          {/* Example Product Card 2 */}
          <View style={styles.productCard}>
            <Image
              style={styles.productImage}
              source={{ uri: './assets/sir_alex.png' }} 
            />
            <View style={styles.productTextContainer}>
              <Text style={styles.productTitle}>Distribuție curea Skoda 2010</Text>
            </View>
          </View>

          {/* Example Product Card 3 */}
          <View style={styles.productCard}>
            <Image
              style={styles.productImage}
              source={{ uri: './assets/sir_alex.png' }} 
            />
            <View style={styles.productTextContainer}>
              <Text style={styles.productTitle}>Pompa Skoda Octavia 2011</Text>
            </View>
          </View>
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
});

export default SearchPage;
