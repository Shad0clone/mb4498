import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import axios from 'axios';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';  // 🚀 For Back button

export default function ViewBooksScreen() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  });

  const navigation = useNavigation();  // 🚀 Hook for navigation

  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    axios.get('http://10.250.60.106/BookCircleBackend/getBooks.php')
      .then(response => {
        console.log('Fetched books:', response.data.books);  // Debug log
        setBooks(response.data.books);
      })
      .catch(error => {
        console.error(error);
        alert('Error fetching books!');
      });
  };

  const handleDelete = (id) => {
    axios.post('http://10.250.60.106/BookCircleBackend/deleteBook.php', { id: id })
      .then(response => {
        if (response.data.status === 'success') {
          alert('Book deleted!');
          fetchBooks(); // Refresh list
        } else {
          alert('Error deleting book: ' + response.data.message);
        }
      })
      .catch(error => {
        console.error(error);
        alert('Error deleting book!');
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
    >
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.header}>My Borrowed Books</Text>

      {/* 🚀 Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {/* 🚀 Refresh button */}
      <TouchableOpacity style={styles.refreshButton} onPress={fetchBooks}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>

      {/* 🚀 Book list */}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemText}>Lent to: {item.friend}</Text>
            <Text style={styles.itemText}>Due: {item.dueDate}</Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 20
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
  backButton: {
    backgroundColor: '#555',  // Dark gray
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 10
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  refreshButton: {
    backgroundColor: '#0288D1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 20
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3
  },
  itemTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    marginBottom: 5
  },
  itemText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#555'
  },
  deleteButton: {
    backgroundColor: '#E53935',  // Red
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  }
});
