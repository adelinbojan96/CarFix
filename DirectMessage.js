import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';

const messagesData = [
  {
    id: 1,
    sender: 'idk',
    text: 'Nu te supara, ai zis ca vrei sa ti dau bujia.',
    time: 'mon, 7:24',
    senderAvatar: 'https://via.placeholder.com/20',
  },
  {
    id: 2,
    sender: 'Janos Varga',
    text: 'N-am dc sa ma supar, numa cred ca esti tepar.',
    time: 'tue, 9:42',
    senderAvatar: 'https://via.placeholder.com/20',
  },
  {
    id: 3,
    sender: 'idk',
    text: 'Am produse vandute la mai multa lume, nu doar tie. Uita-te la rating pe profil. Hai noroc si trai bun familiei. 👌👍👍',
    time: 'wed, 14:42',
    senderAvatar: 'https://via.placeholder.com/20',
  },
];

const DirectMessage = ({ route }) => {
  const { contactName, username } = route.params;  

  const [keyboardVisible, setKeyboardVisible] = useState(false);

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

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

 return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  >
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{contactName}</Text>
        <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.avatar} />
      </View>

      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messagesData.map((message, index) => (
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

      <View style={[styles.inputContainer]}>
        <TextInput
          style={styles.input}
          placeholder="Write your message"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendButton}>
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
    alignSelf: 'flex-end', 
    backgroundColor: '#dfe7ed',
    marginLeft: 'auto',
  },
  userMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#c6dae0',
    marginRight: 'auto',
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
