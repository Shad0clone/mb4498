import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function AddBookScreen() {
  const [title, setTitle] = useState('');
  const [friend, setFriend] = useState('');
  const [dueDate, setDueDate] = useState('');

  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleAddBook = () => {
    axios.post('http://10.0.2.2/BookCircleBackend/addBook.php', {
      title: title,
      friend: friend,
      dueDate: dueDate
    })
    .then(response => {
      alert('Book entry added!');
      setTitle('');
      setFriend('');
      setDueDate('');
    })
    .catch(error => {
      console.error(error);
      alert('Error adding book!');
    });
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
    >
      <Image
        source={require('../assets/icon.png')}
        style={styles.logo}
      />

      <Text style={styles.header}>BookCircle ~ Add Book</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Book Title:</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />

        <Text style={styles.label}>Friend's Name:</Text>
        <TextInput style={styles.input} value={friend} onChangeText={setFriend} />

        <Text style={styles.label}>Due Date:</Text>
        <TextInput style={styles.input} value={dueDate} onChangeText={setDueDate} placeholder="YYYY-MM-DD" />

        <TouchableOpacity style={styles.button} onPress={handleAddBook}>
          <Text style={styles.buttonText}>Add Book</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('View Books')}
        >
          <Text style={styles.secondaryButtonText}>Go to View Books</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 10
  },
  header: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 26,
    color: '#fff',
    alignSelf: 'center',
    marginBottom: 20
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 15
  },
  button: {
    backgroundColor: '#F57C00',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  secondaryButton: {
    backgroundColor: '#0288D1',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

