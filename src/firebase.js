import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyBphGlAl87A5zhpIO0_9fQT7JN20F3HMh8',
  authDomain: 'supplies-44ee7.firebaseapp.com',
  databaseURL: 'https://supplies-44ee7.firebaseio.com',
  projectId: 'supplies-44ee7',
  storageBucket: 'gs://supplies-44ee7.appspot.com'
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage().ref();

// collection references
const usersCollection = db.collection('users');
const categoryCollection = db.collection('categories');
const subCategoryCollection = db.collection('subcategories');
const inventoryCollection = db.collection('inventories');

export {
  firebase,
  db,
  auth,
  storage,
  usersCollection,
  categoryCollection,
  subCategoryCollection,
  inventoryCollection
}
