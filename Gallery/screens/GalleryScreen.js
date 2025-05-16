import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Appbar, Card, Text, Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const images = [
  {
    id: '1',
    title: 'Radio City Lights, NYC',
    uri: require('../assets/pexels-josh-hild-1270765-2422588.jpg'),
  },
  {
    id: '2',
    title: 'GUM Department Store, Moscow',
    uri: require('../assets/pexels-pixabay-415980.jpg'),
  },
  {
    id: '3',
    title: 'Louvre Museum, Paris',
    uri: require('../assets/pexels-imlfernandez-949589-1926404.jpg'),
  },
];

export default function GalleryScreen({ navigation }) {
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    const favs = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    setFavorites(favs);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const getFilteredImages = () => {
    return favoritesOnly
      ? images.filter((img) => favorites.some((fav) => fav.id === img.id))
      : images;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Picture', { image: item })}>
      <Card style={styles.card}>
        <Card.Cover source={item.uri} />
        <Card.Content>
          <Text variant="titleMedium">{item.title}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Gallery" />
      </Appbar.Header>

      <View style={styles.toggleRow}>
        <Text>Show Favorites Only</Text>
        <Switch value={favoritesOnly} onValueChange={setFavoritesOnly} />
      </View>

      <FlatList
        contentContainerStyle={styles.list}
        data={getFilteredImages()}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 16, marginHorizontal: 16, borderRadius: 10, elevation: 3 },
  list: { paddingVertical: 16 },
  toggleRow: {
    flexDirection: 'row',                           
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 10,
    alignItems: 'center',
  },
});
