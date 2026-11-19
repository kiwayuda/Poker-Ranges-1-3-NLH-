// Firebase web config for the "Fishing 101" project.
// These values identify the project; they are not secrets. What protects each player's data is the
// Firestore security rule (users/{uid} readable and writable only by that user) and the authorized domains
// list in Firebase Authentication.
export const firebaseConfig = {
  apiKey: "AIzaSyDUPnwVsVbywGvTLfKSZRZ7x2hC6oUfR3c",
  authDomain: "fishing-101-318b1.firebaseapp.com",
  projectId: "fishing-101-318b1",
  storageBucket: "fishing-101-318b1.firebasestorage.app",
  messagingSenderId: "973433846732",
  appId: "1:973433846732:web:a850ce8f5759e336483b69"
};
