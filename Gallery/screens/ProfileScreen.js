import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
  Appbar,
  TextInput,
  Button,
  Text,
  Switch,
  Avatar,
  RadioButton,
  Menu,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const countries = ['United States', 'India', 'France', 'Germany', 'Japan'];

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [country, setCountry] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  // Load saved data on screen mount
  useEffect(() => {
    loadProfile();
  }, []);

  // Load profile from AsyncStorage
  const loadProfile = async () => {
    try {
      const savedName = await AsyncStorage.getItem('name');
      const savedEmail = await AsyncStorage.getItem('email');
      const savedGender = await AsyncStorage.getItem('gender');
      const savedNotif = await AsyncStorage.getItem('notifications');
      const savedCountry = await AsyncStorage.getItem('country');

      if (savedName) setName(savedName);
      if (savedEmail) setEmail(savedEmail);
      if (savedGender) setGender(savedGender);
      if (savedNotif) setNotifications(JSON.parse(savedNotif));
      if (savedCountry) setCountry(savedCountry);
    } catch (error) {
      Alert.alert("Error", "Failed to load profile.");
    }
  };

  // Save profile to AsyncStorage
  const saveProfile = async () => {
    if (!name || !email || !gender || !country) {
      Alert.alert("Incomplete", "Please fill in all fields.");
      return;
    }

    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('gender', gender);
      await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
      await AsyncStorage.setItem('country', country);
      Alert.alert("Success", "Profile saved successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to save profile.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
      </Appbar.Header>

      <View style={styles.container}>
        <Avatar.Image
          size={80}
          source={require('../assets/avatar.png')} // Add your avatar image to assets
          style={{ marginBottom: 20, alignSelf: 'center' }}
        />

        <TextInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          left={<TextInput.Icon icon="account" />}
          style={styles.input}
        />

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          left={<TextInput.Icon icon="email" />}
          style={styles.input}
        />

        <Text style={{ marginBottom: 5 }}>Gender</Text>
        <RadioButton.Group onValueChange={setGender} value={gender}>
          <View style={styles.radioRow}>
            <RadioButton value="Male" /><Text>Male</Text>
            <RadioButton value="Female" /><Text>Female</Text>
            <RadioButton value="Other" /><Text>Other</Text>
          </View>
        </RadioButton.Group>

        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button mode="outlined" onPress={() => setMenuVisible(true)} style={styles.input}>
              {country || 'Select Country'}
            </Button>
          }
        >
          {countries.map((c) => (
            <Menu.Item key={c} onPress={() => { setCountry(c); setMenuVisible(false); }} title={c} />
          ))}
        </Menu>

        <View style={styles.row}>
          <Text>Enable Notifications</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>

        <Button icon="content-save" mode="contained" onPress={saveProfile}>
          Save Profile
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { marginBottom: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});
