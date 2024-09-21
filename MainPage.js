import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const MainPage = ({ navigation, route }) => {
  const { username } = route.params; // getting the username from route params

  useEffect(() => {
  
    navigation.setOptions({
      headerTitle: `Welcome, ${username}`, 
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('SearchPage')}>
          <Image 
            source={require('./assets/search.png')} 
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile', {formerUsername: username})}>
          <Image 
            source={require('./assets/sir_alex.png')} 
            style={styles.avatar}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#a6b2b9', 
        height: 150,  
      },
    });
  }, [username, navigation]);

  const [firms, setFirms] = useState(null);

  const renderFirms = () => {
    axios.get("https://painful-essie-g3z4-21d8c9bb.koyeb.app/api/brands")
      .then(response => {
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
    <View style={{ flex: 1 }}>
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
                  <TouchableOpacity 
                    key={index} 
                    style={styles.brandBox} 
                    onPress={() => navigation.navigate('SearchPage')}>
                    <Image 
                      source={{ uri: base64Image }} 
                      style={styles.brandImage}
                    />
                    <Text style={styles.brandText}>{element.name}</Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text>No firms found</Text> 
            )
          )}
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.floatingButton} 
        onPress={() => navigation.navigate('Messages')}>
        <Image 
          source={require('./assets/message_icon.png')} 
          style={styles.messageIcon}
        />
      </TouchableOpacity>

    </View>
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
    marginBottom: 40, 
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
  floatingButton: {
    position: 'absolute',
    bottom: 30, 
    right: 30, 
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a6b2b9',  
    elevation: 8,            
  },
  messageIcon: {
    width: 40,
    height: 40,
  },
});

export default MainPage;
