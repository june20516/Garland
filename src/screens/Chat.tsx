import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface Message {
  _id: string;
  text: string;
  createdAt: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const bubbles: Message[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            createdAt: new Date(data.createdAt.seconds * 1000), // Firestore timestamp to JavaScript Date object
          };
        });

        setMessages(bubbles);
      });

    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    if (text.length > 0) {
      await firestore().collection('messages').add({
        text: text,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text style={styles.message}>{item.text}</Text>
        )}
        keyExtractor={item => item._id}
        inverted
      />
      <TextInput style={styles.input} value={text} onChangeText={setText} />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    marginVertical: 2,
  },
});

export default Chat;
