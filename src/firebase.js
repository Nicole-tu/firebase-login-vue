import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyBphGlAl87A5zhpIO0_9fQT7JN20F3HMh8',
  authDomain: 'supplies-44ee7.firebaseapp.com',
  databaseURL: 'https://supplies-44ee7.firebaseio.com',
  projectId: 'supplies-44ee7'
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users');
const categoryCollection = db.collection('categories');

auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    const { displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData } = user;
  }
});

// export utils/refs
export {
  firebase,
  db,
  auth,
  usersCollection,
  categoryCollection
}
