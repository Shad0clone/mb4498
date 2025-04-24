// ChefList App - JavaScript Version (No Emoji Version)
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [ingredientsList, setIngredientsList] = useState([]);

  const ingredientInfo = {
    tomato: { calories: 22 },
    onion: { calories: 40 },
    garlic: { calories: 5 },
    carrot: { calories: 25 },
    egg: { calories: 78 },
    milk: { calories: 103 },
    bread: { calories: 79 },
    cheese: { calories: 113 },
    chicken: { calories: 239 },
    fish: { calories: 206 },
    rice: { calories: 206 },
    apple: { calories: 95 },
    banana: { calories: 105 },
    potato: { calories: 163 },
    default: { calories: 100 }
  };

  const addIngredient = () => {
    const qty = parseInt(quantity);
    if (ingredient.trim() === '' || isNaN(qty) || qty < 1) {
      Alert.alert('Invalid input', 'Please enter a valid ingredient and quantity.');
      return;
    }

    const cleanName = ingredient.trim().toLowerCase();
    const existingIndex = ingredientsList.findIndex(item => item.name.toLowerCase() === cleanName);

    if (existingIndex !== -1) {
      const updatedList = [...ingredientsList];
      updatedList[existingIndex].count += qty;
      setIngredientsList(updatedList);
    } else {
      setIngredientsList(prevList => [...prevList, { key: Date.now().toString(), name: ingredient, count: qty }]);
    }

    setIngredient('');
    setQuantity('1');
  };

  const deleteIngredient = (key) => {
    setIngredientsList(prevList => prevList.filter(item => item.key !== key));
  };

  const getIngredientInfo = (name) => {
    const cleanName = name.toLowerCase().split(/[^a-z]/)[0];
    return ingredientInfo[cleanName] || ingredientInfo.default;
  };

  const totalCalories = ingredientsList.reduce((sum, item) => {
    const info = getIngredientInfo(item.name);
    return sum + (info.calories * item.count);
  }, 0);

  const renderItem = ({ item }) => {
    const info = getIngredientInfo(item.name);
    return (
      <View style={styles.card}>
        <View style={styles.textSection}>
          <Text style={styles.cardText}>{item.name}</Text>
                    <Text style={styles.cardCount}>×{item.count}</Text>
        </View>
        <TouchableOpacity onPress={() => deleteIngredient(item.key)} style={styles.cardDelete}>
          <Text style={styles.cardDeleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ChefList</Text>
      <Text style={styles.totalCal}>Total Calories: {totalCalories}</Text>
      <Text style={styles.label}>Ingredient</Text>
      <TextInput
        style={styles.input}
        placeholder="Add an ingredient"
        value={ingredient}
        onChangeText={text => setIngredient(text)}
        placeholderTextColor="#999"
      />
      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        placeholder="Quantity (e.g. 1, 2)"
        value={quantity}
        onChangeText={text => setQuantity(text)}
        keyboardType="numeric"
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
        <Text style={styles.addButtonText}>Add Ingredient</Text>
      </TouchableOpacity>
      <FlatList
        data={ingredientsList}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 5,
    color: '#333',
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fdf6f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#6a4c93',
  },
  totalCal: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 10,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#ff8c42',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff4e6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  textSection: {
    flex: 1,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  cardCal: {
    fontSize: 14,
    color: '#888',
  },
  cardCount: {
    fontSize: 14,
    color: '#444',
  },
  cardDelete: {
    backgroundColor: '#e63946',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  cardDeleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
