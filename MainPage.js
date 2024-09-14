import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const MainPage = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Hello, Sir Alex', 
      headerTitleAlign: 'center',
      headerLeft: () => (
        <Image 
          source={require('./assets/search.png')} 
          style={styles.searchIcon}
        />
      ),
      headerRight: () => (
        <Image 
          source={require('./assets/sir_alex.png')} 
          style={styles.avatar}
        />
      ),
      headerStyle: {
        backgroundColor: '#a6b2b9', 
        height: 150,  
      },
    });
  }, [navigation]);

  const [firms, setFirms] = useState(null);

  const renderFirms = () => {
    axios.get("https://carfix-production.up.railway.app/firms")
      .then(response => {
        console.error("Full API Response:", response);  // Log the full API response for debugging
        console.log("Data from API:", response.data);  // Log what the `response.data` looks like

        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          setFirms(response.data);
        } else {
          console.error("Expected an array, but got something else:", response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching firms:", error);
      });
  };

  useEffect(() => {
    renderFirms();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Brands</Text>
        <View style={styles.underline} />
      </View>
      
      <View style={styles.boxContainer}>
        {!firms ? (
          <Text>Loading...</Text>
        ) : (
          Array.isArray(firms) && firms.length > 0 ? (
            firms.map((element, index) => {
              const base64Image = `data:image/png;base64,${element.image}`;
              return (
                <View key={index} style={styles.brandBox}>
                  <Image 
                    source={{ uri: base64Image }} 
                    style={styles.brandImage}
                  />
                  <Text style={styles.brandText}>{element.name}</Text>
                </View>
              );
            })
          ) : (
            <Text>No firms found</Text>  // Fallback in case the array is empty or firms is not an array
          )
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16, 
    backgroundColor: '#f0f0f0',
  },
  titleContainer: {
    alignSelf: 'stretch', 
    marginTop: 20, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 10,
    paddingLeft: 10,
  },
  underline: {
    borderBottomColor: '#000',
    borderBottomWidth: 2, 
    width: '100%', 
  },
  boxContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap',     
    justifyContent: 'space-between',
    marginTop: 20,       
  },
  brandBox: {
    backgroundColor: '#d0d8db', 
    borderRadius: 10, 
    width: '45%', 
    aspectRatio: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom: 20, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, 
    shadowRadius: 5, 
    elevation: 5, 
  },
  brandImage: {
    width: 70, 
    height: 70,
    marginBottom: 10, 
  },
  brandText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  searchIcon: {
    width: 35,
    height: 35,
    marginLeft: 15,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 37.5, 
    marginRight: 5,
    borderWidth: 2,
    borderColor: '#000',
    position: 'absolute',
    top: -35,
    right: 5,
  },
});

export default MainPage;
