# ChefList

ChefList allows users to manage ingredients for recipes by tracking quantities and total calories — perfect for anyone organizing meal plans or grocery prep.

---

## Design and Purpose

**ChefList** is designed to help users:
- Add ingredients and specify quantities
- View a list of all ingredients added
- Automatically calculate total calories
- Remove ingredients from the list

This tool is great for home cooks, students, or anyone tracking what's going into their meals.

---

## Features

- Add ingredients with manual quantity entry
- Display list of all ingredients added
- Show total calories at the top of the app
- Remove ingredients individually
- Validates input to prevent empty or invalid data

---

## ⚒ Core Components Used

This app uses the following React Native core components:

- `View` – for layout containers
- `Text` – for titles, labels, and item display
- `TextInput` – for user entry of ingredients and quantity
- `TouchableOpacity` – for interactive buttons
- `FlatList` – to render the scrollable list of ingredients
- `Alert` – for validation error prompts
- `StyleSheet` – for styling

---

## Basic Use Instructions

1. Type an **ingredient** (e.g., "Tomato")
2. Type the **quantity** (e.g., "2")
3. Tap **"Add Ingredient"** to add it to the list
4. See it appear in the list below with quantity like `×2`
5. View the **total calorie count** at the top
6. Tap **Delete** to remove any item from the list

---

## Screenshots
- Screenshot 1: Initial empty screen
- Screenshot 2: List with added ingredients
- Screenshot 3: Error handling


![alt text](Screenshots\main.png.png)
![alt text](Screenshots\add.png.png)
![alt text](Screenshots\error.png.png)