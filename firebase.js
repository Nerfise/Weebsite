// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

// Firebase configuration (from your code)
const firebaseConfig = {
  apiKey: "AIzaSyDa2YV_Gkd0FmZl6Ba-RzT_6MXl4VgWPR4",
  authDomain: "sari-sari-store-ee5a6.firebaseapp.com",
  projectId: "sari-sari-store-ee5a6",
  storageBucket: "sari-sari-store-ee5a6.appspot.com",
  messagingSenderId: "631953152475",
  appId: "1:631953152475:web:c32b5b136abcef4fb92ffe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Function to update order status
export const updateOrderStatus = async (orderId, newStatus) => {
  const orderRef = doc(firestore, 'orders', orderId);
  await updateDoc(orderRef, { status: newStatus });
};

export { firestore };
