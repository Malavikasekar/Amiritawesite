# Android App for Amirita Water Orders

You are an expert AI agent (like me). Your task is to build a new Android mobile app from scratch to display incoming water bottle orders for "Amirita Water".

## Tech Stack
Please build this app using **Expo / React Native**. 

## Firebase Details
The app needs to connect to an existing Firebase project and read data from Firestore.

**Firebase Configuration:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB-hQapVwgsfZQGkK05G6b6-U2bZrEUssI",
  authDomain: "malexsa.firebaseapp.com",
  projectId: "malexsa",
  storageBucket: "malexsa.firebasestorage.app",
  messagingSenderId: "323296404784",
  appId: "1:323296404784:web:e01e9906326a0a3e4414f5",
  measurementId: "G-LNLFCF44RK"
};
```

**Firestore Data Structure:**
The data is stored in a collection called `orders`. 
Each document in this collection has the following fields:
- `Customer_Name` (String)
- `Mobile_Number` (String)
- `Delivery_Date` (String - YYYY-MM-DD)
- `Order_500ml` (String - e.g., "2 case(s) = 48 bottles" or "—")
- `Order_250ml` (String - e.g., "1 case(s) = 48 bottles" or "—")
- `Estimated_Total` (String - e.g., "₹480")
- `createdAt` (Firestore Timestamp)

## App Requirements
1. **Initialize Project:** Create a new Expo project using `npx create-expo-app`.
2. **Install Firebase:** Install the `firebase` package and set up the initialization file with the config provided above.
3. **UI/UX Design:** Create a clean, modern, and beautiful dashboard screen. Use a premium aesthetic (maybe with a subtle blue/aqua color palette to match the water theme).
4. **Order List:** Fetch the documents from the `orders` collection in real-time (using `onSnapshot`) and display them in a scrollable list. Order them by `createdAt` descending (newest first).
5. **Order Cards:** Each order in the list should be displayed as a nicely styled card showing the customer's name, phone number, the items they ordered, the total price, and the expected delivery date.
6. **Security Rules Note:** In order for this app to read data without authentication, make sure you remind the user to update their Firestore security rules to `allow read: if true;` on the `orders` collection.

Please ask me for permission to create the new folder and run the initialization commands, and then proceed step-by-step to build this app.
