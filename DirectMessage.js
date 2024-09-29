import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import axios from 'axios';


const DirectMessage = ({ route }) => {

  const [messagesData, setMessagesData] = useState(null);
  const { contactName, username } = route.params;  
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [profileImageUri, setProfileImageUri] = useState(null);

  const renderMessages = () => {
    axios.get("http://localhost:8082/messages/conversation?sender="+contactName+"&receiver="+username)
    .then(response => {
      if (Array.isArray(response.data)) {
        setMessagesData(response.data);
      } else {
        console.error("Expected an array, but got something else:", response.data);
      }
    })
    .catch(error => {
      console.error("Error fetching firms:", error);
    });
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); 
      }
    );
    renderMessages();
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);


  const sendMessage = () => {
    axios.post('http://localhost:8082/messages', {
      senderUsername: username,
      receiverUsername: contactName,
      message: message
    })
    .then(response => {
      setMessage("");
    })
    .catch(error => {
      console.log(error);
    });
  }
    useEffect(() => {
    axios.get(`http://localhost:8082/users/profile-image?username=${contactName}`)
      .then(response => {
        const base64Image = response.data; 
        if (base64Image) {
          //construct the data URI
          const imageUri = `data:image/png;base64,${base64Image}`;
          setProfileImageUri({ uri: imageUri });
        }
      })
      .catch(error => {
        console.error('Error fetching profile image:', error);
      });
  }, [contactName]);
 return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  >
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{contactName}</Text>
        <Image source={profileImageUri} style={styles.avatar} />
      </View>

      {messagesData == null ? <Text>"Loading..."</Text> : 
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {
        messagesData.map((message, index) => (
          <View 
            key={index} 
            style={[
              styles.messageBubble, 
              message.sender === username ? styles.userMessage : styles.contactMessage
            ]}
          >
            <Image source={{ uri: message.senderAvatar }} style={styles.bubbleAvatar} />
            <View style={styles.bubbleContent}>
              <Text style={styles.messageText}>{message.text}</Text>
              <Text style={styles.messageTime}>{message.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      }

      <View style={[styles.inputContainer]}>
        <TextInput
          style={styles.input}
          placeholder="Write your message"
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
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
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#788B91',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 80,
    position: 'relative',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    position: 'absolute',
    right: 20,
    bottom: 5,
  },
  messagesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  messageBubble: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    borderRadius: 15,
    maxWidth: '80%',
  },
  contactMessage: {
    alignSelf: 'flex-start', 
    backgroundColor: '#dfe7ed',
    marginRight: 'auto',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#c6dae0',
    marginLeft: 'auto',
  },
  bubbleAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  bubbleContent: {
    flex: 1,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  messageTime: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
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


export default DirectMessage;
