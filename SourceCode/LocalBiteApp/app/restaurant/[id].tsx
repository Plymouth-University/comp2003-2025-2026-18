import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";

/* SAME THEME */
const COLORS = {
  bg: "#0f0a05",
  surface: "#1a1208",
  surface2: "#120c06",
  border: "#2a1a0c",
  text: "#ffffff",
  muted: "#f0c7a0",
  muted2: "#c9a27a",
  accent: "#ff8c1a",
  danger: "#ff6b6b",
};

type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  minutes: number;
  price: "$" | "$$" | "$$$";
  distanceKm: number;
  imageUrl: string;
};

type Dish = {
  id: string;
  name: string;
  desc: string;
  price: string;
  spicy?: boolean;
  veg?: boolean;
};

/* ✅ Use the SAME restaurants list you used in Discover (add/remove as you like) */
const RESTAURANTS: Restaurant[] = [
 {
    id: "1",
    name: "The Thai House",
    cuisine: "Thai",
    rating: 4.7,
    price: "$$",
    minutes: 18,
    distanceKm: 1.2,
    imageUrl:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Himalayan Spice",
    cuisine: "Indian",
    rating: 4.6,
    price: "$$",
    minutes: 22,
    distanceKm: 2.4,
    imageUrl:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Bella Italia",
    cuisine: "Italian",
    rating: 4.4,
    price: "$$",
    minutes: 15,
   distanceKm: 0.9,
    imageUrl:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Smashland Burgers",
    cuisine: "American",
    rating: 4.3,
    price: "$$",
    minutes: 12,
    distanceKm: 1.0,
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "The Little Kitchen",
    cuisine: "Cafe",
    rating: 4.5,
    price: "$$",
    minutes: 10,
   distanceKm: 0.6,
    imageUrl:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Mr Wok Thai Fish Bar and Grill",
    cuisine: "Thai",
    rating: 4.2,
    price: "$$",
    minutes: 25,
   distanceKm: 3.1,
    imageUrl:
      "https://images.unsplash.com/photo-1552611052-33e04de081de?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "7",
    name: "Asian Noodle Bar",
    cuisine: "Chinese",
    rating: 4.8,
    price: "$$",
    minutes: 20,
    distanceKm: 1.5,
    imageUrl:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1200&q=80&auto=format&fit=crop",

  },
  {
    id: "8",
    name: "Imperial Garden",
    cuisine: "Chinese",
    rating: 4.1,
    price: "$$",
    minutes: 17,
    distanceKm: 1.1,
    imageUrl:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "9",
    name: "The Plymouth Stable",
    cuisine: "Italian",
    rating: 4.6,
    price: "$$",
    minutes: 14,
   distanceKm: 0.8,
    imageUrl:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "10",
    name: "Bombay Burger Kitchen",
    cuisine: "American",
    rating: 4.4,
    price: "$$",
    minutes: 16,
    distanceKm: 1.9,
    imageUrl:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "11",
    name: "Boston Tea Party",
    cuisine: "Cafe", 
    rating: 4.3,
    price: "$$",
    minutes: 9,
   distanceKm: 0.5,
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "12",
    name: "Veggie Perrin's",
    cuisine: "Indian",
    rating: 4.9,
    price: "$$",
    minutes: 23,
    distanceKm: 2.7,
    imageUrl:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "13",
    name: "Can'n Jaspers",
    cuisine: "American",
    rating: 4.3,
    price: "$$",
    minutes: 23,
    distanceKm: 2.7,
    imageUrl:
      "https://images.unsplash.com/photo-1550317138-10000687a72b?w=1200&q=80&auto=format&fit=crop",
  },
{
    id: "14",
    name: "Desire Plymouth",
    cuisine: "Italian",
    rating: 4.7,
    price: "$$",
    minutes: 23,
    distanceKm: 2.7,
    imageUrl:
      "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=1200&q=80&auto=format&fit=crop",
  },
];

/*  Different dishes per restaurant */
const MENU_BY_RESTAURANT: Record<string, Dish[]> = {
  "1": [
 { id: "1-1", name: "Pad Thai", desc: "Stir fried rice noodles with egg, tofu, peanuts", price: "£9.00" },
 { id: "1-2", name: "Green Curry", desc: "Thai green curry with chicken and bamboo shoots", price: "£9.50", spicy: true },
 { id: "1-3", name: "Tom Yum Soup", desc: "Hot and sour Thai soup with prawns", price: "£6.50", spicy: true },
 { id: "1-4", name: "Thai Fried Rice", desc: "Jasmine rice stir fried with vegetables", price: "£8.00", veg: true },
 { id: "1-5", name: "Chicken Satay", desc: "Grilled chicken skewers with peanut sauce", price: "£7.50" },
 { id: "1-6", name: "Massaman Curry", desc: "Rich Thai curry with potatoes and peanuts", price: "£9.50" },
 { id: "1-7", name: "Spring Rolls", desc: "Crispy vegetable spring rolls", price: "£5.00", veg: true },
 { id: "1-8", name: "Thai Basil Chicken", desc: "Chicken stir fried with Thai basil", price: "£9.00" },
 { id: "1-9", name: "Papaya Salad", desc: "Fresh papaya salad with lime dressing", price: "£6.50", spicy: true },
 { id: "1-10", name: "Mango Sticky Rice", desc: "Sweet mango with coconut sticky rice", price: "£5.50", veg: true }
],

"2": [
 { id: "2-1", name: "Chicken Tikka Masala", desc: "Grilled chicken in creamy tomato curry", price: "£10.00" },
 { id: "2-2", name: "Lamb Rogan Josh", desc: "Slow cooked lamb curry with spices", price: "£11.50" },
 { id: "2-3", name: "Vegetable Biryani", desc: "Fragrant basmati rice with vegetables", price: "£9.00", veg: true },
 { id: "2-4", name: "Butter Chicken", desc: "Creamy tomato butter chicken curry", price: "£10.50" },
 { id: "2-5", name: "Paneer Tikka", desc: "Grilled paneer cubes with spices", price: "£8.00", veg: true },
 { id: "2-6", name: "Garlic Naan", desc: "Soft naan bread with garlic butter", price: "£3.00", veg: true },
 { id: "2-7", name: "Chicken Biryani", desc: "Spiced rice with marinated chicken", price: "£10.00" },
 { id: "2-8", name: "Dal Tadka", desc: "Yellow lentils tempered with spices", price: "£8.50", veg: true },
 { id: "2-9", name: "Samosa", desc: "Crispy pastry filled with potatoes and peas", price: "£4.50", veg: true },
 { id: "2-10", name: "Gulab Jamun", desc: "Sweet fried dough balls in syrup", price: "£4.00", veg: true }
],

"3": [
 { id: "3-1", name: "Spaghetti Bolognese", desc: "Classic Italian pasta with beef sauce", price: "£10.50" },
 { id: "3-2", name: "Carbonara", desc: "Pasta with pancetta, egg and parmesan", price: "£11.00" },
 { id: "3-3", name: "Margherita Pizza", desc: "Tomato, mozzarella and basil", price: "£9.00", veg: true },
 { id: "3-4", name: "Lasagne", desc: "Layered pasta with beef ragu and cheese", price: "£11.50" },
 { id: "3-5", name: "Penne Arrabbiata", desc: "Penne pasta in spicy tomato sauce", price: "£9.50", spicy: true, veg: true },
 { id: "3-6", name: "Garlic Bread", desc: "Toasted bread with garlic butter", price: "£4.00", veg: true },
 { id: "3-7", name: "Chicken Alfredo", desc: "Creamy pasta with grilled chicken", price: "£11.50" },
 { id: "3-8", name: "Risotto Funghi", desc: "Creamy mushroom risotto", price: "£10.00", veg: true },
 { id: "3-9", name: "Calzone", desc: "Folded pizza with cheese and ham", price: "£10.50" },
 { id: "3-10", name: "Tiramisu", desc: "Coffee flavoured Italian dessert", price: "£5.50", veg: true }
],

"4": [
 { id: "4-1", name: "Smash Classic Burger", desc: "Double smashed beef patties with cheese and pickles", price: "£10.50" },
 { id: "4-2", name: "BBQ Bacon Burger", desc: "Beef patty with crispy bacon and BBQ sauce", price: "£11.00" },
 { id: "4-3", name: "Cheese Smash Burger", desc: "Classic smash burger with melted cheddar", price: "£9.50" },
 { id: "4-4", name: "Chicken Smash Burger", desc: "Crispy chicken fillet burger with lettuce", price: "£9.00" },
 { id: "4-5", name: "Veggie Smash Burger", desc: "Plant-based burger with fresh salad", price: "£8.50", veg: true },
 { id: "4-6", name: "Loaded Fries", desc: "Fries topped with cheese sauce and bacon bits", price: "£6.50" },
 { id: "4-7", name: "Classic Fries", desc: "Crispy golden fries", price: "£3.50", veg: true },
 { id: "4-8", name: "Onion Rings", desc: "Crispy battered onion rings", price: "£4.50", veg: true },
 { id: "4-9", name: "Chicken Tenders", desc: "Crispy fried chicken strips", price: "£7.00" },
 { id: "4-10", name: "Chocolate Milkshake", desc: "Thick chocolate milkshake", price: "£4.50", veg: true },
 { id: "4-11", name: "Vanilla Milkshake", desc: "Classic vanilla milkshake", price: "£4.50", veg: true }
],

"5": [
 { id: "5-1", name: "Avocado Toast", desc: "Sourdough toast with smashed avocado", price: "£7.50", veg: true },
 { id: "5-2", name: "Eggs Benedict", desc: "Poached eggs with hollandaise sauce", price: "£8.50" },
 { id: "5-3", name: "Full English Breakfast", desc: "Eggs, sausage, bacon, beans and toast", price: "£9.50" },
 { id: "5-4", name: "Pancakes", desc: "Stack of pancakes with maple syrup", price: "£7.00", veg: true },
 { id: "5-5", name: "Club Sandwich", desc: "Chicken, bacon, lettuce sandwich", price: "£8.50" },
 { id: "5-6", name: "Chicken Wrap", desc: "Grilled chicken with salad in wrap", price: "£7.50" },
 { id: "5-7", name: "Veggie Omelette", desc: "Omelette with peppers and mushrooms", price: "£7.00", veg: true },
 { id: "5-8", name: "Latte", desc: "Freshly brewed coffee with milk", price: "£3.50", veg: true },
 { id: "5-9", name: "Cappuccino", desc: "Espresso with steamed milk foam", price: "£3.50", veg: true },
 { id: "5-10", name: "Chocolate Brownie", desc: "Rich chocolate brownie", price: "£4.00", veg: true }
],

"6": [
 { id: "6-1", name: "Chicken Chow Mein", desc: "Stir fried noodles with chicken", price: "£9.00" },
 { id: "6-2", name: "Beef Chow Mein", desc: "Egg noodles with beef and vegetables", price: "£9.50" },
 { id: "6-3", name: "Vegetable Noodles", desc: "Stir fried noodles with vegetables", price: "£8.00", veg: true },
 { id: "6-4", name: "Chicken Fried Rice", desc: "Fried rice with chicken and egg", price: "£8.50" },
 { id: "6-5", name: "Sweet & Sour Chicken", desc: "Crispy chicken in sweet sour sauce", price: "£9.50" },
 { id: "6-6", name: "Hot & Sour Soup", desc: "Spicy Chinese soup with tofu", price: "£5.50", spicy: true },
 { id: "6-7", name: "Spring Rolls", desc: "Crispy vegetable rolls", price: "£4.50", veg: true },
 { id: "6-8", name: "Chicken Dumplings", desc: "Steamed dumplings with soy sauce", price: "£6.50" },
 { id: "6-9", name: "Kung Pao Chicken", desc: "Chicken stir fried with peanuts", price: "£9.50", spicy: true },
 { id: "6-10", name: "Egg Fried Rice", desc: "Classic Chinese fried rice", price: "£7.50", veg: true }
],
"7": [
 { id: "7-1", name: "Chicken Chow Mein", desc: "Stir fried noodles with chicken and vegetables", price: "£9.00" },
 { id: "7-2", name: "Beef Noodle Soup", desc: "Rich broth with beef slices and noodles", price: "£9.50" },
 { id: "7-3", name: "Vegetable Chow Mein", desc: "Egg noodles stir fried with mixed vegetables", price: "£8.00", veg: true },
 { id: "7-4", name: "Prawn Noodles", desc: "Stir fried noodles with prawns and soy sauce", price: "£9.50" },
 { id: "7-5", name: "Chicken Fried Rice", desc: "Fried rice with egg and chicken", price: "£8.50" },
 { id: "7-6", name: "Spring Rolls", desc: "Crispy vegetable rolls", price: "£4.50", veg: true },
 { id: "7-7", name: "Hot & Sour Soup", desc: "Spicy Chinese soup with tofu", price: "£5.50", spicy: true },
 { id: "7-8", name: "Sweet & Sour Chicken", desc: "Crispy chicken in sweet sour sauce", price: "£9.50" },
 { id: "7-9", name: "Chicken Dumplings", desc: "Steamed dumplings with soy sauce", price: "£6.50" },
 { id: "7-10", name: "Egg Fried Rice", desc: "Classic Chinese fried rice", price: "£7.50", veg: true }
],

"8": [
 { id: "8-1", name: "Sweet & Sour Chicken", desc: "Crispy chicken with sweet sour sauce", price: "£9.50" },
 { id: "8-2", name: "Beef Black Bean", desc: "Beef stir fried with black bean sauce", price: "£10.00" },
 { id: "8-3", name: "Vegetable Stir Fry", desc: "Mixed vegetables in soy garlic sauce", price: "£8.00", veg: true },
 { id: "8-4", name: "Chicken Fried Rice", desc: "Rice stir fried with egg and chicken", price: "£8.50" },
 { id: "8-5", name: "Prawn Crackers", desc: "Crispy prawn crackers snack", price: "£3.50" },
 { id: "8-6", name: "Spring Rolls", desc: "Crispy vegetable spring rolls", price: "£4.50", veg: true },
 { id: "8-7", name: "Kung Pao Chicken", desc: "Chicken stir fried with peanuts", price: "£9.50", spicy: true },
 { id: "8-8", name: "Duck Noodles", desc: "Roast duck with egg noodles", price: "£10.50" },
 { id: "8-9", name: "Egg Fried Rice", desc: "Traditional Chinese fried rice", price: "£7.50", veg: true },
 { id: "8-10", name: "Fortune Cookies", desc: "Sweet crispy cookies with message", price: "£2.50", veg: true }
],

"9": [
 { id: "9-1", name: "Classic Margherita Pizza", desc: "Tomato, mozzarella and basil", price: "£9.50", veg: true },
 { id: "9-2", name: "Pepperoni Pizza", desc: "Pizza with pepperoni and cheese", price: "£10.50" },
 { id: "9-3", name: "BBQ Chicken Pizza", desc: "Pizza topped with BBQ chicken", price: "£11.00" },
 { id: "9-4", name: "Garlic Bread", desc: "Toasted bread with garlic butter", price: "£4.00", veg: true },
 { id: "9-5", name: "Pasta Alfredo", desc: "Creamy pasta with parmesan sauce", price: "£10.50" },
 { id: "9-6", name: "Spaghetti Bolognese", desc: "Pasta with beef tomato sauce", price: "£10.50" },
 { id: "9-7", name: "Chicken Wings", desc: "Crispy wings with BBQ sauce", price: "£7.50" },
 { id: "9-8", name: "Veggie Pizza", desc: "Pizza topped with vegetables", price: "£9.50", veg: true },
 { id: "9-9", name: "Chocolate Brownie", desc: "Warm brownie dessert", price: "£4.50", veg: true },
 { id: "9-10", name: "Milkshake", desc: "Vanilla or chocolate milkshake", price: "£4.00", veg: true }
],

"10": [
 { id: "10-1", name: "Classic Bombay Burger", desc: "Spiced beef burger with chutney", price: "£9.50" },
 { id: "10-2", name: "Chicken Masala Burger", desc: "Grilled chicken burger with masala sauce", price: "£9.50" },
 { id: "10-3", name: "Paneer Burger", desc: "Indian paneer patty burger", price: "£8.50", veg: true },
 { id: "10-4", name: "Masala Fries", desc: "Fries tossed in Indian spices", price: "£4.50", veg: true },
 { id: "10-5", name: "Chicken Tikka Wrap", desc: "Wrap filled with chicken tikka", price: "£8.50" },
 { id: "10-6", name: "Veggie Samosa", desc: "Crispy pastry with potato filling", price: "£4.00", veg: true },
 { id: "10-7", name: "Butter Chicken Bowl", desc: "Rice with butter chicken curry", price: "£10.00" },
 { id: "10-8", name: "Loaded Fries", desc: "Fries topped with cheese and chicken", price: "£6.50" },
 { id: "10-9", name: "Mango Lassi", desc: "Sweet yogurt mango drink", price: "£3.50", veg: true },
 { id: "10-10", name: "Gulab Jamun", desc: "Indian sweet syrup balls", price: "£4.00", veg: true }
],

"11": [
 { id: "11-1", name: "Avocado Toast", desc: "Sourdough toast with smashed avocado", price: "£7.50", veg: true },
 { id: "11-2", name: "Eggs Benedict", desc: "Poached eggs with hollandaise", price: "£8.50" },
 { id: "11-3", name: "Full English Breakfast", desc: "Eggs, bacon, sausage, beans and toast", price: "£10.00" },
 { id: "11-4", name: "Pancakes", desc: "Stack of pancakes with maple syrup", price: "£7.50", veg: true },
 { id: "11-5", name: "Club Sandwich", desc: "Chicken bacon sandwich", price: "£8.50" },
 { id: "11-6", name: "Granola Bowl", desc: "Granola with yogurt and berries", price: "£6.50", veg: true },
 { id: "11-7", name: "Latte", desc: "Fresh milk coffee", price: "£3.50", veg: true },
 { id: "11-8", name: "Cappuccino", desc: "Espresso with milk foam", price: "£3.50", veg: true },
 { id: "11-9", name: "Chocolate Brownie", desc: "Rich chocolate brownie", price: "£4.00", veg: true },
 { id: "11-10", name: "Tea Pot", desc: "Classic English tea", price: "£3.00", veg: true }
],

"12": [
 { id: "12-1", name: "Vegetable Curry", desc: "Mixed vegetables in Indian curry", price: "£9.00", veg: true },
 { id: "12-2", name: "Paneer Butter Masala", desc: "Paneer cubes in creamy sauce", price: "£9.50", veg: true },
 { id: "12-3", name: "Vegetable Biryani", desc: "Fragrant rice with vegetables", price: "£9.00", veg: true },
 { id: "12-4", name: "Dal Tadka", desc: "Yellow lentil curry", price: "£8.00", veg: true },
 { id: "12-5", name: "Aloo Gobi", desc: "Potato and cauliflower curry", price: "£8.50", veg: true },
 { id: "12-6", name: "Chana Masala", desc: "Chickpeas cooked with spices", price: "£8.50", veg: true },
 { id: "12-7", name: "Garlic Naan", desc: "Indian bread with garlic butter", price: "£3.00", veg: true },
 { id: "12-8", name: "Veg Samosa", desc: "Crispy pastry with potato filling", price: "£4.00", veg: true },
 { id: "12-9", name: "Mango Lassi", desc: "Sweet yogurt mango drink", price: "£3.50", veg: true },
 { id: "12-10", name: "Gulab Jamun", desc: "Indian sweet dessert", price: "£4.00", veg: true }
],

"13": [
 { id: "13-1", name: "Classic Beef Burger", desc: "Grilled beef burger with lettuce and cheese", price: "£9.50" },
 { id: "13-2", name: "Double Cheese Burger", desc: "Double beef patty with cheese", price: "£10.50" },
 { id: "13-3", name: "Chicken Burger", desc: "Crispy chicken fillet burger", price: "£9.00" },
 { id: "13-4", name: "Fish Burger", desc: "Breaded fish fillet burger", price: "£9.00" },
 { id: "13-5", name: "Veggie Burger", desc: "Vegetarian burger with plant patty", price: "£8.50", veg: true },
 { id: "13-6", name: "Loaded Fries", desc: "Fries topped with cheese and bacon", price: "£6.50" },
 { id: "13-7", name: "Onion Rings", desc: "Crispy fried onion rings", price: "£4.50", veg: true },
 { id: "13-8", name: "Chicken Nuggets", desc: "Crispy nuggets with dip", price: "£6.00" },
 { id: "13-9", name: "Milkshake", desc: "Vanilla or chocolate shake", price: "£4.00", veg: true },
 { id: "13-10", name: "Ice Cream Sundae", desc: "Vanilla ice cream with chocolate syrup", price: "£4.50", veg: true }
],

"14": [
 { id: "14-1", name: "Spaghetti Carbonara", desc: "Pasta with pancetta, egg and parmesan", price: "£11.00" },
 { id: "14-2", name: "Chicken Alfredo", desc: "Creamy pasta with grilled chicken", price: "£11.50" },
 { id: "14-3", name: "Margherita Pizza", desc: "Tomato, mozzarella and basil", price: "£9.50", veg: true },
 { id: "14-4", name: "Pepperoni Pizza", desc: "Classic pizza with pepperoni and mozzarella", price: "£10.50" },
 { id: "14-5", name: "Lasagne", desc: "Layered pasta with beef ragu and cheese", price: "£11.50" },
 { id: "14-6", name: "Penne Arrabbiata", desc: "Penne pasta with spicy tomato sauce", price: "£9.50", spicy: true, veg: true },
 { id: "14-7", name: "Garlic Bread", desc: "Toasted bread with garlic butter", price: "£4.00", veg: true },
 { id: "14-8", name: "Chicken Caesar Salad", desc: "Romaine lettuce with grilled chicken and parmesan", price: "£9.00" },
 { id: "14-9", name: "Mushroom Risotto", desc: "Creamy risotto with mushrooms and parmesan", price: "£10.50", veg: true },
 { id: "14-10", name: "Tiramisu", desc: "Classic Italian coffee dessert", price: "£5.50", veg: true },
 { id: "14-11", name: "Gelato", desc: "Italian ice cream with mixed flavours", price: "£4.50", veg: true }
]

};

export default function RestaurantDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const restaurant = useMemo(
    () => RESTAURANTS.find((r) => r.id === id),
    [id]
  );

  const menu = useMemo(() => MENU_BY_RESTAURANT[id ?? ""] ?? [], [id]);

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={{ color: COLORS.text, padding: 16 }}>Restaurant not found.</Text>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>Go back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <View style={styles.headerRow}>
        <Pressable onPress={() => router.back()} style={styles.iconBtn}>
          <MaterialIcons name="arrow-back" size={22} color={COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{restaurant.name}</Text>
      </View>

      <Image source={{ uri: restaurant.imageUrl }} style={styles.hero} />

      <View style={styles.metaCard}>
        <Text style={styles.metaLine}>
          {restaurant.cuisine} • {restaurant.price} • {restaurant.minutes} min • {restaurant.distanceKm.toFixed(1)} km
        </Text>
        <View style={styles.ratingRow}>
          <MaterialIcons name="star" size={18} color={COLORS.accent} />
          <Text style={styles.ratingText}>{restaurant.rating.toFixed(1)}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Popular dishes</Text>

      <FlatList
        data={menu}
        keyExtractor={(d) => d.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.dishCard}>
            <View style={{ flex: 1 }}>
              <View style={styles.dishTopRow}>
                <Text style={styles.dishName}>{item.name}</Text>
                <Text style={styles.dishPrice}>{item.price}</Text>
              </View>
              <Text style={styles.dishDesc}>{item.desc}</Text>

              <View style={styles.badgesRow}>
                {item.spicy ? <Badge text="Spicy" /> : null}
                {item.veg ? <Badge text="Veg" /> : null}
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: COLORS.muted, paddingHorizontal: 16 }}>
            No menu items yet.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { color: COLORS.text, fontSize: 18, fontWeight: "900" },

  hero: { width: "100%", height: 190 },

  metaCard: {
    marginHorizontal: 16,
    marginTop: -16,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  metaLine: { color: COLORS.muted, fontWeight: "700" },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10 },
  ratingText: { color: COLORS.text, fontWeight: "900" },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
  },

  dishCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 12,
  },
  dishTopRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  dishName: { color: COLORS.text, fontWeight: "900", fontSize: 16 },
  dishPrice: { color: COLORS.accent, fontWeight: "900" },
  dishDesc: { color: COLORS.muted, marginTop: 6 },

  badgesRow: { flexDirection: "row", gap: 8, marginTop: 10 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: COLORS.surface2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  badgeText: { color: COLORS.muted, fontWeight: "800", fontSize: 12 },

  backBtn: {
    margin: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    alignItems: "center",
  },
  backText: { color: COLORS.bg, fontWeight: "900" },
});
