import { initializeApp, getApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  //   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  //   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  //   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  //   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: 'AIzaSyAieG_nA4MxXPEReeDfj5ALhh2-Yk5iVcc',
  authDomain: 'leetcode-pj.firebaseapp.com',
  projectId: 'leetcode-pj',
  storageBucket: 'leetcode-pj.firebasestorage.app',
  messagingSenderId: '639772381275',
  appId: '1:639772381275:web:c1cd87661c2eaa0e35af7e',
}

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)
const firestore = getFirestore(app)

export { auth, firestore, app }
