import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PictureScreen({ route, navigation }) {
  const { image } = route.params;
  const [isFav, setIsFav] = useState(false);

  const toggleFavorite = async () => {
    const favs = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    let updatedFavs;

    if (isFav) {
      updatedFavs = favs.filter((item) => item.id !== image.id);
    } else {
      updatedFavs = [...favs, image];
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavs));
    setIsFav(!isFav);
  };

  const checkFavorite = async () => {
    const favs = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    setIsFav(favs.some((item) => item.id === image.id));
  };

  useEffect(() => {
    checkFavorite();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={image.uri} style={styles.fullImage} />
      <Text variant="headlineSmall" style={{ marginVertical: 12 }}>{image.title}</Text>
      <IconButton
        icon={isFav ? "heart" : "heart-outline"}
        iconColor={isFav ? "red" : "gray"}
        size={30}
        onPress={toggleFavorite}
      />
      <Button mode="contained" onPress={() => navigation.goBack()}>Back to Gallery</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 16 },
  fullImage: { width: '100%', height: 300, borderRadius: 10 },
});

