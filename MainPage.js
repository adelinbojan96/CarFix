import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Animated, Easing, View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

const MainPage = ({ navigation, route }) => {
  const { username } = route.params;

  const [profileImageUri, setProfileImageUri] = useState(null);
  const searchBarWidth = useRef(new Animated.Value(0)).current; 
  const [searchExpanded, setSearchExpanded] = useState(false); 
  const [searchText, setSearchText] = useState('');
  const [searchBarColor, setSearchBarColor] = useState('#a6b2b9');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8082/users/profile-image?username=${username}`)
      .then(response => {
        const base64Image = response.data;
        if (base64Image) {
          const imageUri = `data:image/png;base64,${base64Image}`;
          setProfileImageUri({ uri: imageUri });
        }
      })
      .catch(error => {
        console.error('Error fetching profile image:', error);
      });

    navigation.setOptions({
      headerTitle: () => (
        <Animated.View style={[styles.searchContainer, { width: searchBarWidth, backgroundColor: searchBarColor }]}>
          {searchExpanded ? (
            <>
              <TextInput
                style={styles.searchInput}
                placeholder="Type here..."
                value={searchText}
                onChangeText={setSearchText}
              />
              <TouchableOpacity onPress={handleSearchSubmit}>
                <Image 
                  source={require('./assets/send_icon.png')} 
                  style={styles.sendIcon}
                />
              </TouchableOpacity>
            </>
          ) : null }
        </Animated.View>
      ),
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity onPress={toggleSearchBar}>
          <Image 
            source={require('./assets/search.png')} 
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { formerUsername: username })}>
          {profileImageUri ? (
            <Image 
              source={profileImageUri} 
              style={styles.avatar}
            />
          ) : (
            <Text style={styles.noImageText}>No image</Text>
          )}
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#a6b2b9',
        height: 150,
      },
    });
  }, [username, profileImageUri, searchExpanded, searchBarColor]);

  const [firms, setFirms] = useState(null);

  const renderFirms = () => {
    axios.get("http://localhost:8082/api/brands")
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

  const toggleSearchBar = () => {
    if (searchExpanded) {
      setSearchBarColor('#a6b2b9');
      Animated.timing(searchBarWidth, {
        toValue: 0, 
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false
      }).start(() => setSearchExpanded(false));
    } else {
      setSearchExpanded(true); 
      setSearchBarColor('white');
      Animated.timing(searchBarWidth, {
        toValue: 250,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false
      }).start();
    }
  };

  const handleSearchSubmit = () => {
    if (searchText.trim()) {
      navigation.navigate('SearchPage', { searchText });
    }
    toggleSearchBar();
  };

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
        onPress={() => navigation.navigate('Messages', { username })}>
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
  searchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: 10,
  paddingLeft: 10,
  overflow: 'hidden',
  height: 40,
  justifyContent: 'center', 
  borderWidth: 0,     
  boxShadow: 'none',
  },
  searchInput: {
  flex: 1,
  height: 40,
  paddingLeft: 10,
  paddingRight: 10,
  borderRadius: 20,
  outline: 'none',    
  borderWidth: 0,     
  boxShadow: 'none',  
  },
  sendIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
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
    bottom: -20,
    right: 5,
  },
  noImageText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
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
