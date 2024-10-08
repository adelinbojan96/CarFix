import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

const Messages = ({ navigation, route }) => {
  const { username } = route.params; 
  const [contactsData,setContactsData] = useState(null);

  const renderContacts = () => {
    axios.get("https://unknown-charil-g3z4-dc070d62.koyeb.app/users/"+username)
    .then(response => {
      if (Array.isArray(response.data)) {
        setContactsData(response.data);
      } else {
        console.error("Expected an array, but got something else:", response.data);
      }
    })
    .catch(error => {
      console.error("Error fetching firms:", error);
    });
  }

  useEffect(()=>{
    renderContacts();
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Contacts</Text>
      </View>
      {contactsData == null ? <Text>"Loading..."</Text> : 
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {contactsData.map((contact) => (
          <TouchableOpacity 
            key={contact.id} 
            style={styles.contactContainer}
            onPress={() => 
              navigation.navigate('DirectMessage', { 
                contactName: contact.name, 
                contactRole: contact.role,
                username // Pass the username to DirectMessage.js
              })
            }
          >
            <Image source={{ uri: contact.avatar }} style={styles.avatar} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactRole}>Role: {contact.role}</Text>
            </View>
            <View style={styles.contactActions}>
              <Text style={styles.messageCount}>
                {contact.messages} {contact.messages === 1 ? 'message' : 'messages'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#a6b2b9', 
    padding: 20,
    justifyContent: 'flex-end', 
    alignItems: 'center',  
    height: 100,  
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'bottom',
    color: '#000',
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6ddd1', 
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    height: 80, 
  },
  avatar: {
    width: 60,
    height: 60, 
    borderRadius: 30, 
    marginRight: 15, 
  },
  contactInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  contactRole: {
    fontSize: 14,
    color: '#333',
  },
  contactActions: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  messageCount: {
    fontSize: 14,
    color: '#7897a3', 
    marginBottom: 5,
  },
});

export default Messages;
