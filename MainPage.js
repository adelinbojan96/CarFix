import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

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
        height: 150,  // Keep the larger header height
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Brands text */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Brands</Text>
        <View style={styles.underline} />
      </View>
      
      {/* Container for brand boxes */}
      <View style={styles.boxContainer}>
        <View style={styles.brandBox}>
          <Image 
            source={require('./assets/audi.png')} 
            style={styles.brandImage}
          />
          <Text style={styles.brandText}>Audi</Text>
        </View>
        <View style={styles.brandBox}>
          <Image 
            source={require('./assets/mercedes.png')} 
            style={styles.brandImage}
          />
          <Text style={styles.brandText}>Mercedes</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
