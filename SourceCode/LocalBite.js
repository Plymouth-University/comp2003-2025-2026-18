use("LocalBite");

// Optional: clean start 
db.users.drop();
db.restaurants.drop();
db.menuItems.drop();
db.authentication.drop();

// Create collections
db.createCollection("users");
db.createCollection("restaurants");
db.createCollection("menuItems");
db.createCollection("authentication");

// ----------------------
// 1) USERS (with roles)
// ----------------------

// Main Admin
const mainAdminId = ObjectId();
db.users.insertOne({
  _id: mainAdminId,
  name: "System Admin",
  email: "admin@localbite.com",
  phone: "0700000099",
  role: "ADMIN",
  isMainAdmin: true,
  restaurantId: null,
  createdAt: new Date()
});

// Normal users (guests)
const johnUserId = ObjectId();
const sarahUserId = ObjectId();

db.users.insertMany([
  {
    _id: johnUserId,
    name: "John Doe",
    email: "john@example.com",
    phone: "0700000001",
    role: "USER",
    isMainAdmin: false,
    restaurantId: null,
    createdAt: new Date()
  },
  {
    _id: sarahUserId,
    name: "Sarah Smith",
    email: "sarah@example.com",
    phone: "0700000002",
    role: "USER",
    isMainAdmin: false,
    restaurantId: null,
    createdAt: new Date()
  }
]);

// ----------------------
// 2) RESTAURANTS
// (link back to users)
// ----------------------

const localKitchenId = ObjectId();
const tasteOfAfricaId = ObjectId();

// Restaurant users (staff/owners)
const localKitchenOwnerId = ObjectId();
const tasteOfAfricaOwnerId = ObjectId();

db.users.insertMany([
  {
    _id: localKitchenOwnerId,
    name: "Ayo Williams",
    email: "ayo@localkitchen.com",
    phone: "0700000101",
    role: "RESTAURANT_USER",
    isMainAdmin: false,
    restaurantId: localKitchenId,
    createdAt: new Date()
  },
  {
    _id: tasteOfAfricaOwnerId,
    name: "Kemi Ade",
    email: "kemi@tasteofafrica.com",
    phone: "0700000102",
    role: "RESTAURANT_USER",
    isMainAdmin: false,
    restaurantId: tasteOfAfricaId,
    createdAt: new Date()
  }
]);

db.restaurants.insertMany([
  {
    _id: localKitchenId,
    name: "Local Kitchen",
    address: "15 Ocean Street, Plymouth",
    cuisine: "Caribbean",
    ownerUserId: localKitchenOwnerId,
    staffUserIds: [localKitchenOwnerId],
    createdAt: new Date()
  },
  {
    _id: tasteOfAfricaId,
    name: "Taste of Africa",
    address: "44 Stone Lane, Plymouth",
    cuisine: "African",
    ownerUserId: tasteOfAfricaOwnerId,
    staffUserIds: [tasteOfAfricaOwnerId],
    createdAt: new Date()
  }
]);

// ----------------------
// 3) MENU ITEMS
// (linked to restaurantId)
// ----------------------

db.menuItems.insertMany([
  {
    _id: ObjectId(),
    restaurantId: localKitchenId,
    name: "Jollof Rice",
    price: 8.50,
    isAvailable: true,
    createdAt: new Date()
  },
  {
    _id: ObjectId(),
    restaurantId: localKitchenId,
    name: "Jerk Chicken Wings",
    price: 6.00,
    isAvailable: true,
    createdAt: new Date()
  },
  {
    _id: ObjectId(),
    restaurantId: tasteOfAfricaId,
    name: "Fried Plantain",
    price: 4.00,
    isAvailable: true,
    createdAt: new Date()
  }
]);

// ----------------------
// 4) AUTHENTICATION
// (link by userId + role in token later)
// ----------------------

db.authentication.insertMany([
  {
    _id: ObjectId(),
    userId: johnUserId,
    username: "john_doe",
    passwordHash: "hashedpassword123",
    createdAt: new Date()
  },
  {
    _id: ObjectId(),
    userId: sarahUserId,
    username: "sarah_smith",
    passwordHash: "hashedpassword456",
    createdAt: new Date()
  },
  {
    _id: ObjectId(),
    userId: localKitchenOwnerId,
    username: "ayo_local",
    passwordHash: "hashedpassword789",
    createdAt: new Date()
  }
]);
db.achievements.insertMany([  
  {
    title: "Visit a Thai restaurant 5 times",
    description: "Explore Thai cuisine",
    cuisineTag: "Thai", // links to restaurant.cuisine
    targetVisits: 5,
    reward: 100,
    createdAt: new Date()
  },
  {
    title: "Place your first order",
    description: "Complete your first order",
    cuisineTag: null,
    targetVisits: 1,
    reward: 50,
    createdAt: new Date()
  },
  {
    title: "Place 10 orders",
    description: "Complete 10 orders",tD
    cuisineTag: null,
    targetVisits: 10,
    reward: 200,
    createdAt: new Date()
  }
]);

// ----------------------
// QUICK CHECKS
// ----------------------

// Show restaurant users + their restaurant
db.users.find({ role: "RESTAURANT_USER" });

// Show menu for Local Kitchen
db.menuItems.find({ restaurantId: localKitchenId });

// Show restaurants with owner
db.restaurants.find({});



